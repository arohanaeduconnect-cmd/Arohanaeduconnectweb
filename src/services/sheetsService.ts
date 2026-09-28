import { StudentRegistration, SheetLeadRecord } from '../types';

const SHEET_ID_KEY = 'arohana_sheets_spreadsheet_id';
const LOCAL_LEADS_KEY = 'arohana_local_leads';
export const SHEET_TAB_NAME = 'Student Enquiries';

export const DEFAULT_HEADERS = [
  'Timestamp (IST)',
  'Student Name',
  'Parent / Guardian Name',
  'WhatsApp Number',
  'Email Address',
  'Current Qualification',
  'Course Interested In',
  'Preferred Location',
  'Approx Budget / Year',
  'Student Message / Questions',
  'Admission Status',
];

/**
 * Extracts clean Google Spreadsheet ID from raw input or full Google Sheets URL
 */
export const extractSpreadsheetId = (input: string): string => {
  if (!input) return '';
  const trimmed = input.trim();
  // Matches https://docs.google.com/spreadsheets/d/([a-zA-Z0-9-_]+)
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // If the user pasted an ID that has query params or fragments
  const clean = trimmed.split('?')[0].split('#')[0].replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return clean;
};

export const getStoredSpreadsheetId = (): string | null => {
  const raw = localStorage.getItem(SHEET_ID_KEY);
  return raw ? extractSpreadsheetId(raw) : null;
};

export const setStoredSpreadsheetId = (id: string | null) => {
  if (id) {
    const cleanId = extractSpreadsheetId(id);
    localStorage.setItem(SHEET_ID_KEY, cleanId);
  } else {
    localStorage.removeItem(SHEET_ID_KEY);
  }
};

export const getLocalLeads = (): SheetLeadRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveLocalLead = (lead: StudentRegistration): SheetLeadRecord => {
  const existing = getLocalLeads();
  const newLead: SheetLeadRecord = {
    ...lead,
    id: 'LEAD-' + Date.now().toString(36).toUpperCase(),
    submittedAt: lead.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New Inquiry',
  };
  existing.unshift(newLead);
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(existing));
  return newLead;
};

/**
 * Inspects a spreadsheet to find its tabs and verify accessibility
 */
export const getSpreadsheetMetadata = async (
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheetNames: string[]; targetTab: string }> => {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  if (!cleanId || cleanId.length < 15) {
    throw new Error('Invalid Google Spreadsheet ID or URL. Please provide a valid Google Sheet link.');
  }

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}?fields=properties.title,sheets.properties.title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(
        'Google Sheet not found. Please verify the link or ID and ensure the sheet is accessible by your account.'
      );
    }
    const errJson = await res.json().catch(() => null);
    const errDetails = errJson?.error;
    if (errDetails?.status === 'PERMISSION_DENIED') {
      const isScopeError = errDetails?.details?.some(
        (d: any) => d.reason === 'ACCESS_TOKEN_SCOPE_INSUFFICIENT'
      );
      if (isScopeError) {
        throw new Error(
          'Your Google session needs Spreadsheet access. Please sign out and sign in again to grant permissions.'
        );
      }
      throw new Error('Permission denied. Please ensure you are signed in with the Google account that has access to this sheet.');
    }
    throw new Error(errDetails?.message || 'Could not access the specified Google Sheet.');
  }

  const json = await res.json();
  const sheets: any[] = json.sheets || [];
  const sheetNames = sheets.map((s) => s.properties?.title).filter(Boolean);
  const title = json.properties?.title || 'Google Sheet';
  
  // Prefer 'Student Enquiries' if it exists, otherwise use the first sheet tab
  const hasEnquiries = sheetNames.includes(SHEET_TAB_NAME);
  const targetTab = hasEnquiries ? SHEET_TAB_NAME : sheetNames[0] || 'Sheet1';

  return {
    title,
    sheetNames,
    targetTab,
  };
};

/**
 * Ensures headers are present on the target tab
 */
export const ensureSheetHeaders = async (
  accessToken: string,
  spreadsheetId: string,
  tabName: string
) => {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  // Check if first row already has data
  try {
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/'${encodeURIComponent(tabName)}'!A1:K1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (checkRes.ok) {
      const data = await checkRes.json();
      if (data.values && data.values.length > 0 && data.values[0].length > 0) {
        // Headers already present
        return;
      }
    }
  } catch {
    // Continue to write headers
  }

  // Write headers to row 1
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/'${encodeURIComponent(tabName)}'!A1:K1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [DEFAULT_HEADERS] }),
    }
  );
};

/**
 * Creates a new Google Spreadsheet for Arohana Edu Connect admissions
 */
export const createAdmissionsSpreadsheet = async (
  accessToken: string,
  title: string = 'Arohana Edu Connect - Student Admissions 2026'
): Promise<{ id: string; url: string; title: string }> => {
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: SHEET_TAB_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const contentType = createRes.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const errJson = await createRes.json();
      const errDetails = errJson?.error;
      if (errDetails?.status === 'PERMISSION_DENIED') {
        const isScopeError = errDetails?.details?.some(
          (d: any) => d.reason === 'ACCESS_TOKEN_SCOPE_INSUFFICIENT'
        );
        if (isScopeError) {
          throw new Error(
            'Google Sheets permission required: Please click "Re-Authorize Google Sheets" to grant access to spreadsheets in your Google account.'
          );
        }
      }
      throw new Error(`Google Sheets API Error: ${errDetails?.message || createRes.statusText}`);
    }
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errText.substring(0, 150)}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  // Initialize Header Row
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${SHEET_TAB_NAME}'!A1:K1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [DEFAULT_HEADERS] }),
    }
  );

  setStoredSpreadsheetId(spreadsheetId);

  return {
    id: spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    title,
  };
};

/**
 * Appends a new student registration to the connected Google Sheet
 */
export const appendRegistrationToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  data: StudentRegistration
) => {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const metadata = await getSpreadsheetMetadata(accessToken, cleanId);
  const tabName = metadata.targetTab;

  // Make sure headers are populated
  await ensureSheetHeaders(accessToken, cleanId, tabName);

  const timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const row = [
    timestamp,
    data.studentName,
    data.parentName || 'N/A',
    data.whatsapp.startsWith('+91') ? data.whatsapp : `+91 ${data.whatsapp}`,
    data.email || 'N/A',
    data.qualification,
    data.specificCourseDetails
      ? `${data.courseInterested} (${data.specificCourseDetails})`
      : data.courseInterested,
    data.preferredLocation,
    data.budget || 'Open / Need guidance',
    data.message || 'N/A',
    'New Inquiry',
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/'${encodeURIComponent(tabName)}'!A:K:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [row],
      }),
    }
  );

  if (!appendRes.ok) {
    const contentType = appendRes.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const errJson = await appendRes.json();
      throw new Error(`Failed to append to Google Sheet: ${errJson.error?.message || appendRes.statusText}`);
    }
    const errorText = await appendRes.text();
    throw new Error(`Failed to append to Google Sheet: ${errorText.substring(0, 120)}`);
  }

  return await appendRes.json();
};

/**
 * Fetches existing student rows from the Google Sheet
 */
export const fetchSheetRecords = async (
  accessToken: string,
  spreadsheetId: string
): Promise<SheetLeadRecord[]> => {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const metadata = await getSpreadsheetMetadata(accessToken, cleanId);
  const tabName = metadata.targetTab;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/'${encodeURIComponent(tabName)}'!A2:K`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const errJson = await res.json();
      throw new Error(errJson.error?.message || 'Failed to fetch sheet rows');
    }
    throw new Error('Spreadsheet not reachable. Please verify the ID/URL and check permissions.');
  }

  const json = await res.json();
  const rows: any[][] = json.values || [];

  return rows.map((r, idx) => ({
    id: `SHEET-ROW-${idx + 2}`,
    submittedAt: r[0] || '',
    studentName: r[1] || '',
    parentName: r[2] || '',
    whatsapp: r[3] || '',
    email: r[4] || '',
    qualification: r[5] || '',
    courseInterested: r[6] || '',
    preferredLocation: r[7] || '',
    budget: r[8] || '',
    message: r[9] || '',
    status: r[10] || 'New Inquiry',
  }));
};
