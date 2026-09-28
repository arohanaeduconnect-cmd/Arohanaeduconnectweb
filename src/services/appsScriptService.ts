import { StudentRegistration } from '../types';

export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbw-TH7-VPhHEUU5rj1QG93pP1tmUEaBhMTHvzglJfQMz9A7fF-YmwWGDTkMj2TfF_NIkw/exec';
const APPS_SCRIPT_STORAGE_KEY = 'arohana_apps_script_url';

/**
 * Returns the configured Google Apps Script Web App endpoint URL.
 * Checks localStorage first, then environment variable, then the default URL.
 */
export const getAppsScriptEndpointUrl = (): string => {
  const customUrl = localStorage.getItem(APPS_SCRIPT_STORAGE_KEY);
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim();
  }
  const envUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return DEFAULT_APPS_SCRIPT_URL;
};

/**
 * Allows updating the Apps Script URL dynamically (e.g. via settings or admin).
 */
export const setAppsScriptEndpointUrl = (url: string | null) => {
  if (url && url.trim().length > 0) {
    localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(APPS_SCRIPT_STORAGE_KEY);
  }
};

/**
 * Checks whether the endpoint URL has been configured with a valid Apps Script Web App URL.
 */
export const isAppsScriptUrlConfigured = (url: string = getAppsScriptEndpointUrl()): boolean => {
  if (!url || !url.trim()) {
    return false;
  }
  const clean = url.trim();
  if (clean.includes('PASTE_YOUR_APPS_SCRIPT_URL') || clean.includes('YOUR_APPS_SCRIPT_URL')) {
    return false;
  }
  return clean.startsWith('http://') || clean.startsWith('https://');
};

/**
 * Submits a student registration to the Google Apps Script Web App endpoint.
 * Accounts for Google Apps Script CORS limitations:
 * 1. Submits via backend proxy (/api/submit-inquiry) when available, completely avoiding browser CORS limitations and preflights.
 * 2. In standalone mode, falls back to direct 'text/plain;charset=utf-8' POST request with 'redirect: follow'.
 * 3. Does not show success until the submission is explicitly confirmed by the backend / endpoint.
 * 4. Never exposes private credentials.
 */
export const submitToGoogleAppsScript = async (
  formData: StudentRegistration
): Promise<{ success: boolean; message: string; data?: any; syncedToSheets?: boolean }> => {
  const endpointUrl = getAppsScriptEndpointUrl();

  if (!isAppsScriptUrlConfigured(endpointUrl)) {
    throw new Error(
      `Apps Script endpoint is not configured yet. Please set your Google Apps Script Web App deployment URL.`
    );
  }

  const now = new Date();
  const formattedIst = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Clean 10-digit WhatsApp number (prevents Google Sheets formula parse error caused by leading '+')
  const rawDigits = (formData.whatsapp || '').toString().replace(/\D/g, '');
  const cleanPhone = rawDigits.length === 12 && rawDigits.startsWith('91') ? rawDigits.slice(2) : rawDigits;
  const standardPhone = cleanPhone || formData.whatsapp.trim();
  const formattedPhoneWithCode = `+91 ${cleanPhone}`;
  const safeTextPhone = `'${standardPhone}`;

  const payload = {
    // Primary field mappings - clean 10 digits without leading '+' to avoid formula errors
    studentName: formData.studentName.trim(),
    parentName: formData.parentName?.trim() || 'N/A',
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

    email: formData.email?.trim() || 'N/A',
    emailAddress: formData.email?.trim() || 'N/A',
    qualification: formData.qualification,
    currentQualification: formData.qualification,
    courseInterested: formData.specificCourseDetails
      ? `${formData.courseInterested} - ${formData.specificCourseDetails}`
      : formData.courseInterested,
    course: formData.specificCourseDetails
      ? `${formData.courseInterested} - ${formData.specificCourseDetails}`
      : formData.courseInterested,
    courseStream: formData.courseInterested,
    specificCourseDetails: formData.specificCourseDetails?.trim() || 'N/A',
    courseDetails: formData.specificCourseDetails?.trim() || 'N/A',
    specialization: formData.specificCourseDetails?.trim() || 'N/A',
    course_details: formData.specificCourseDetails?.trim() || 'N/A',
    preferredLocation: formData.preferredLocation,
    location: formData.preferredLocation,
    budget: formData.budget || 'Open / Need guidance',
    budgetPerYear: formData.budget || 'Open / Need guidance',
    message: formData.message?.trim() || 'N/A',
    questions: formData.message?.trim() || 'N/A',

    // Alternate common field names for Google Sheet column scripts
    student_name: formData.studentName.trim(),
    name: formData.studentName.trim(),
    parent_name: formData.parentName?.trim() || 'N/A',

    // Metadata
    timestamp: now.toISOString(),
    submittedAt: formattedIst,
    status: 'New Inquiry',
    source: 'Arohana Edu Connect Web Portal',
    endpointUrl,
  };

  // 1. Try server-side proxy route first (completely bypasses browser CORS issues)
  try {
    const proxyRes = await fetch('/api/submit-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (proxyRes.ok) {
      const resultJson = await proxyRes.json();
      if (resultJson.success) {
        return {
          success: true,
          message:
            resultJson.message ||
            'Your inquiry has been successfully received and recorded in our admissions database.',
          data: resultJson.data,
          syncedToSheets: resultJson.syncedToSheets,
        };
      }
      throw new Error(resultJson.error || 'Server rejected the submission.');
    }
  } catch (proxyError: any) {
    // If backend route is not available or threw an explicit validation error, inspect
    if (proxyError.message && !proxyError.message.includes('fetch')) {
      throw proxyError;
    }
    // Otherwise fallback to direct endpoint fetch below
  }

  // 2. Direct fallback to Apps Script Web App endpoint
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with HTTP ${response.status}: ${response.statusText}`);
    }

    const responseText = await response.text();

    if (
      responseText.includes('找不到以下指令碼函式：doPost') ||
      responseText.includes('Script function not found: doPost') ||
      responseText.includes('找不到以下指令碼函式') ||
      responseText.includes('Script function not found')
    ) {
      throw new Error(
        'Google Apps Script endpoint is reached, but the script is missing the required "doPost(e)" handler function. Please copy the Code.gs template from Settings and re-deploy (Deploy > Manage deployments > Edit > New version).'
      );
    }

    if (
      (responseText.trim().startsWith('<') || responseText.includes('<!DOCTYPE')) &&
      responseText.includes('errorMessage')
    ) {
      throw new Error(
        'Google Apps Script returned an execution error. Please check your Apps Script execution log or sheet permissions.'
      );
    }

    let resultJson: any = null;
    try {
      resultJson = JSON.parse(responseText);
    } catch {
      if (responseText.trim().startsWith('<') || responseText.includes('<!DOCTYPE')) {
        throw new Error(
          'Google Apps Script returned an unexpected HTML response. Ensure the Web App returns JSON via ContentService and is deployed with "Who has access: Anyone".'
        );
      }
      resultJson = { raw: responseText };
    }

    if (resultJson) {
      if (resultJson.status === 'error' || resultJson.result === 'error') {
        throw new Error(resultJson.message || 'Google Apps Script reported an error while saving to Google Sheets.');
      }
      if (resultJson.success === false) {
        throw new Error(resultJson.error || 'Submission was rejected by Google Apps Script.');
      }

      const isConfirmed =
        resultJson.status === 'success' ||
        resultJson.result === 'success' ||
        resultJson.success === true ||
        resultJson.status === 200 ||
        (typeof resultJson.raw === 'string' &&
          (resultJson.raw.toLowerCase().includes('success') ||
            resultJson.raw.toLowerCase().includes('received') ||
            resultJson.raw.toLowerCase().includes('logged') ||
            resultJson.raw.toLowerCase().includes('ok')));

      if (!isConfirmed && !resultJson.status && !resultJson.result) {
        throw new Error(
          'Google Apps Script endpoint did not confirm receipt of the submission. Please verify your Apps Script execution logs.'
        );
      }
    }

    return {
      success: true,
      message:
        resultJson?.message ||
        'Your inquiry has been successfully received and recorded in our admissions database.',
      data: resultJson,
      syncedToSheets: true,
    };
  } catch (error: any) {
    console.warn('Apps Script direct submission notice:', error?.message || error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error(
        'Unable to reach the Google Apps Script endpoint. Please verify that the Web App is deployed with "Execute as: Me" and "Who has access: Anyone".'
      );
    }
    throw error;
  }
};

/**
 * Diagnostic test helper for Google Apps Script Web App endpoints
 */
export const testAppsScriptConnection = async (
  url: string
): Promise<{ success: boolean; message: string; code?: string }> => {
  try {
    const res = await fetch('/api/test-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Backend tester not available, do simple client test
  }

  try {
    const directRes = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'ping', test: true }),
    });
    const text = await directRes.text();
    if (text.includes('找不到以下指令碼函式') || text.includes('Script function not found')) {
      return {
        success: false,
        code: 'MISSING_DOPOST',
        message: 'Connected to Web App, but missing doPost(e). Deploy a new version with Code.gs code.',
      };
    }
    return {
      success: true,
      message: 'Connection verified!',
    };
  } catch (err: any) {
    return {
      success: false,
      code: 'FAILED',
      message: err.message || 'Connection test failed.',
    };
  }
};
