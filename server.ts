import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.resolve(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function getStoredInquiries(): any[] {
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveInquiries(inquiries: any[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not save inquiries to file:', err);
  }
}

export const DEFAULT_APPS_SCRIPT_URL =
  process.env.VITE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbw-TH7-VPhHEUU5rj1QG93pP1tmUEaBhMTHvzglJfQMz9A7fF-YmwWGDTkMj2TfF_NIkw/exec';

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Arohana Edu Connect Admission Server',
  });
});

// Endpoint Diagnostic Tester
app.post('/api/test-endpoint', async (req: Request, res: Response) => {
  const targetUrl = (req.body.url || DEFAULT_APPS_SCRIPT_URL).trim();

  if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
    res.status(400).json({
      success: false,
      reachable: false,
      code: 'INVALID_URL',
      message: 'Please provide a valid HTTP/HTTPS Google Apps Script Web App URL.',
    });
    return;
  }

  try {
    const testPayload = {
      action: 'test_connection',
      studentName: 'Diagnostic Ping',
      parentName: 'System Test',
      whatsapp: '+91 70129 08174',
      email: 'test@arohanaedu.com',
      qualification: 'Plus Two / 12th Completed',
      courseInterested: 'Diagnostic Check',
      preferredLocation: 'Kerala',
      budget: 'Open / Need guidance',
      message: 'Automated test ping from Arohana Edu Connect backend server',
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(testPayload),
    });

    const responseText = await response.text();

    if (
      responseText.includes('找不到以下指令碼函式：doPost') ||
      responseText.includes('Script function not found: doPost') ||
      responseText.includes('找不到以下指令碼函式') ||
      responseText.includes('Script function not found')
    ) {
      res.json({
        success: false,
        reachable: true,
        code: 'MISSING_DOPOST',
        message:
          'Apps Script endpoint was reached, but the deployed script is missing the "doPost(e)" handler function. Please paste the provided Code.gs script in Apps Script editor, and deploy a New Version (Deploy > Manage deployments > Edit > New version).',
      });
      return;
    }

    if (
      responseText.includes('accounts.google.com') ||
      responseText.includes('Sign in - Google Accounts') ||
      responseText.includes('ServiceLogin')
    ) {
      res.json({
        success: false,
        reachable: true,
        code: 'AUTH_REQUIRED',
        message:
          'Apps Script requires Google login. Please re-deploy the Web App with "Who has access: Anyone".',
      });
      return;
    }

    let parsed: any = null;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = { raw: responseText };
    }

    if (parsed && (parsed.status === 'success' || parsed.result === 'success' || parsed.success === true)) {
      res.json({
        success: true,
        reachable: true,
        code: 'CONNECTED_ACTIVE',
        message: 'Google Apps Script Web App is connected and responding with confirmation!',
        data: parsed,
      });
      return;
    }

    res.json({
      success: true,
      reachable: true,
      code: 'CONNECTED_RAW',
      message: 'Connected to Apps Script endpoint. Response received.',
      data: parsed,
    });
  } catch (err: any) {
    res.status(502).json({
      success: false,
      reachable: false,
      code: 'FETCH_ERROR',
      message: err.message || 'Unable to reach the Google Apps Script endpoint.',
    });
  }
});

// Student Inquiry Submission (Proxy + Safe Local Store)
app.post('/api/submit-inquiry', async (req: Request, res: Response) => {
  const body = req.body || {};

  // Validate required fields
  if (!body.studentName || !body.studentName.trim()) {
    res.status(400).json({ success: false, error: 'Student name is required.' });
    return;
  }
  if (!body.whatsapp || !body.whatsapp.trim()) {
    res.status(400).json({ success: false, error: 'WhatsApp number is required.' });
    return;
  }
  if (!body.qualification) {
    res.status(400).json({ success: false, error: 'Current qualification is required.' });
    return;
  }
  if (!body.courseInterested) {
    res.status(400).json({ success: false, error: 'Interested course is required.' });
    return;
  }
  if (!body.preferredLocation) {
    res.status(400).json({ success: false, error: 'Preferred location is required.' });
    return;
  }

  const now = new Date();
  const formattedIst = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const inquiryId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  // Clean 10-digit WhatsApp number (prevents formula parse error in Google Sheets caused by leading '+')
  const rawDigits = (body.whatsapp || '').toString().replace(/\D/g, '');
  const cleanPhone = rawDigits.length === 12 && rawDigits.startsWith('91') ? rawDigits.slice(2) : rawDigits;
  const standardPhone = cleanPhone || body.whatsapp.trim();
  const formattedPhoneWithCode = `+91 ${cleanPhone}`;
  const safeTextPhone = `'${standardPhone}`;

  const leadRecord = {
    id: inquiryId,
    studentName: body.studentName.trim(),
    parentName: body.parentName?.trim() || 'N/A',

    // Primary clean 10-digit fields (prevents formula parse error in Google Sheets)
    whatsapp: standardPhone,
    whatsappNumber: standardPhone,
    phone: standardPhone,
    phoneNumber: standardPhone,
    mobile: standardPhone,
    mobileNumber: standardPhone,
    contact: standardPhone,
    contactNumber: standardPhone,
    studentPhone: standardPhone,
    whatsapp_number: standardPhone,
    phone_number: standardPhone,
    mobile_number: standardPhone,

    // Formatted and safe text variants
    formattedWhatsapp: formattedPhoneWithCode,
    formatted_whatsapp: formattedPhoneWithCode,
    safeWhatsapp: safeTextPhone,
    safe_whatsapp: safeTextPhone,
    safePhone: safeTextPhone,
    countryCode: '+91',

    email: body.email?.trim() || 'N/A',
    emailAddress: body.email?.trim() || 'N/A',
    qualification: body.qualification,
    currentQualification: body.qualification,
    courseInterested: body.courseInterested,
    course: body.courseInterested,
    courseStream: body.courseStream || body.courseInterested,
    specificCourseDetails: body.specificCourseDetails?.trim() || 'N/A',
    courseDetails: body.courseDetails?.trim() || body.specificCourseDetails?.trim() || 'N/A',
    specialization: body.specialization?.trim() || body.specificCourseDetails?.trim() || 'N/A',
    preferredLocation: body.preferredLocation,
    location: body.preferredLocation,
    budget: body.budget || 'Open / Need guidance',
    budgetPerYear: body.budget || 'Open / Need guidance',
    message: body.message?.trim() || 'N/A',
    questions: body.message?.trim() || 'N/A',

    // Alternate common sheet column fields
    student_name: body.studentName.trim(),
    name: body.studentName.trim(),
    parent_name: body.parentName?.trim() || 'N/A',

    // Metadata
    timestamp: now.toISOString(),
    submittedAt: formattedIst,
    status: 'New Inquiry',
    source: 'Arohana Edu Connect Web Portal',
    syncedToSheets: false,
    syncStatus: 'pending',
    syncDetails: '',
  };

  // Target Google Apps Script URL
  const targetUrl = (body.endpointUrl || DEFAULT_APPS_SCRIPT_URL).trim();

  // Forward to Google Apps Script Web App
  let appsScriptConfirmed = false;
  let appsScriptErrorDetails = '';

  if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
    try {
      const gsResponse = await fetch(targetUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(leadRecord),
      });

      const responseText = await gsResponse.text();

      if (
        responseText.includes('找不到以下指令碼函式：doPost') ||
        responseText.includes('Script function not found: doPost') ||
        responseText.includes('找不到以下指令碼函式') ||
        responseText.includes('Script function not found')
      ) {
        appsScriptErrorDetails =
          'Apps Script endpoint reached, but active deployment is missing "doPost(e)".';
      } else {
        let parsed: any = null;
        try {
          parsed = JSON.parse(responseText);
        } catch {
          parsed = { raw: responseText };
        }

        if (
          parsed &&
          (parsed.status === 'success' ||
            parsed.result === 'success' ||
            parsed.success === true ||
            (typeof parsed.raw === 'string' &&
              (parsed.raw.toLowerCase().includes('success') ||
                parsed.raw.toLowerCase().includes('received') ||
                parsed.raw.toLowerCase().includes('logged'))))
        ) {
          appsScriptConfirmed = true;
          leadRecord.syncedToSheets = true;
          leadRecord.syncStatus = 'synced';
          leadRecord.syncDetails = 'Synced to Google Sheets via Apps Script Web App';
        } else {
          appsScriptErrorDetails =
            parsed?.message || 'Apps Script returned non-confirmation response.';
        }
      }
    } catch (fetchErr: any) {
      appsScriptErrorDetails = fetchErr.message || 'Network error reaching Google Apps Script.';
    }
  }

  if (!appsScriptConfirmed) {
    leadRecord.syncedToSheets = false;
    leadRecord.syncStatus = 'saved_local_pending_sync';
    leadRecord.syncDetails =
      appsScriptErrorDetails || 'Stored in admissions database, pending Google Sheets push';
  }

  // Persist inquiry to local store
  const existingInquiries = getStoredInquiries();
  existingInquiries.unshift(leadRecord);
  saveInquiries(existingInquiries);

  // Return confirmed response
  res.json({
    success: true,
    message: appsScriptConfirmed
      ? 'Your inquiry has been successfully received and recorded in our admissions database.'
      : 'Your registration has been confirmed and logged in the Arohana admissions database.',
    syncedToSheets: appsScriptConfirmed,
    leadId: inquiryId,
    notice: appsScriptConfirmed ? undefined : appsScriptErrorDetails,
    data: {
      studentName: leadRecord.studentName,
      course: leadRecord.courseInterested,
      location: leadRecord.preferredLocation,
      whatsapp: leadRecord.whatsapp,
      time: formattedIst,
    },
  });
});

// List Inquiries (for Admin / Admissions staff)
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = getStoredInquiries();
  res.json({
    total: inquiries.length,
    inquiries,
  });
});

// Retry Pending Syncs
app.post('/api/retry-sync', async (req: Request, res: Response) => {
  const targetUrl = (req.body.url || DEFAULT_APPS_SCRIPT_URL).trim();
  const inquiries = getStoredInquiries();
  const pending = inquiries.filter((inq) => !inq.syncedToSheets);

  if (pending.length === 0) {
    res.json({ success: true, message: 'All inquiries are already synced.', syncedCount: 0 });
    return;
  }

  let syncedCount = 0;
  for (const inq of pending) {
    try {
      const gsResponse = await fetch(targetUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(inq),
      });
      const responseText = await gsResponse.text();
      if (!responseText.includes('找不到以下指令碼函式') && !responseText.includes('Script function not found')) {
        inq.syncedToSheets = true;
        inq.syncStatus = 'synced';
        inq.syncDetails = 'Synced via retry batch';
        syncedCount++;
      }
    } catch {
      // Continue to next
    }
  }

  saveInquiries(inquiries);
  res.json({
    success: true,
    message: `Synced ${syncedCount} of ${pending.length} pending inquiries to Google Sheets.`,
    syncedCount,
  });
});

// Start Server & Handle Vite / Static
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arohana Edu Connect server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.warn('Server start error:', err);
});
