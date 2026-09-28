import React, { useState } from 'react';
import {
  getAppsScriptEndpointUrl,
  setAppsScriptEndpointUrl,
  isAppsScriptUrlConfigured,
  testAppsScriptConnection,
  DEFAULT_APPS_SCRIPT_URL,
} from '../services/appsScriptService';

interface AppsScriptSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndpointUpdated: (newUrl: string) => void;
}

export const AppsScriptSettingsModal: React.FC<AppsScriptSettingsModalProps> = ({
  isOpen,
  onClose,
  onEndpointUpdated,
}) => {
  const currentUrl = getAppsScriptEndpointUrl();
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  if (!isOpen) return null;

  const sampleAppsScriptCode = `// ==========================================
// Google Apps Script: Code.gs
// Arohana Edu Connect - Student Registration Receiver
// ==========================================

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // 1. Parse incoming payload from POST body or GET query parameters
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Initialize sheet headers on first submission if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
        "Student Name",
        "Parent / Guardian Name",
        "WhatsApp Number",
        "Email Address",
        "Current Qualification",
        "Course Interested In",
        "Preferred Location",
        "Approx Budget / Year",
        "Student Message / Questions",
        "Status"
      ]);
      // Format headers row
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold");
    }

    // 3. Clean & format WhatsApp phone number safely
    // Extracts clean digits and prepends with single quote (') to force Plain Text storage,
    // which completely eliminates Google Sheets formula parse errors (#ERROR!) and format errors.
    var rawPhone = String(data.whatsapp || data.whatsappNumber || data.phone || data.mobile || data.safeWhatsapp || "").trim();
    var cleanDigits = rawPhone.replace(/\\D/g, "");
    if (cleanDigits.length === 12 && cleanDigits.indexOf("91") === 0) {
      cleanDigits = cleanDigits.substring(2);
    }
    // Prefix with apostrophe to store as text in Google Sheets
    var safePhone = cleanDigits ? "'" + cleanDigits : (rawPhone ? "'" + rawPhone.replace(/^\\+/, "") : "N/A");

    // 4. Append student registration row
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.studentName || data.student_name || data.name || "N/A",
      data.parentName || data.parent_name || "N/A",
      safePhone,
      data.emailAddress || data.email || "N/A",
      data.currentQualification || data.qualification || "N/A",
      data.courseInterested || data.course || "N/A",
      data.preferredLocation || data.location || "N/A",
      data.budgetPerYear || data.budget || "Open / Need guidance",
      data.message || data.questions || "N/A",
      "New Inquiry"
    ]);

    // 5. Ensure the newly added WhatsApp cell is formatted as Plain Text (@)
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 4).setNumberFormat("@");

    // 6. Return confirmed JSON output (enables browser CORS access-control-allow-origin: *)
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      result: "success",
      message: "Student inquiry received and logged into Google Sheets successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const handleSave = () => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setAppsScriptEndpointUrl(null);
      onEndpointUpdated(DEFAULT_APPS_SCRIPT_URL);
    } else {
      setAppsScriptEndpointUrl(trimmed);
      onEndpointUpdated(trimmed);
    }
    setTestResult({
      status: 'success',
      message: 'Endpoint URL saved successfully!',
    });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleTestConnection = async () => {
    const urlToTest = inputUrl.trim();
    if (!urlToTest) {
      setTestResult({
        status: 'error',
        message: 'Please enter a valid Google Apps Script Web App URL first.',
      });
      return;
    }

    setTesting(true);
    setTestResult({ status: 'idle', message: '' });

    try {
      const res = await testAppsScriptConnection(urlToTest);
      if (res.success) {
        setTestResult({
          status: 'success',
          message: res.message || 'Connection confirmed! Web App is active and responding.',
        });
      } else {
        setTestResult({
          status: 'error',
          message: res.message || 'Connection test failed. Check script functions and deployment access ("Anyone").',
        });
      }
    } catch (err: any) {
      setTestResult({
        status: 'error',
        message: err.message || 'Connection test failed.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#CBDFF2] shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#123B6D] to-[#0A2548] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] text-[#00A6A6]">terminal</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Google Apps Script Web App Endpoint</h3>
              <p className="text-xs text-slate-300">Automatic student lead receiver without student login</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-slate-700">
          <div>
            <label className="font-bold text-[#123B6D] block text-sm mb-1.5">
              Google Apps Script Web App URL
            </label>
            <p className="text-slate-500 mb-2 leading-relaxed">
              When a student submits the registration form, their details are automatically sent directly to this Web App endpoint. No Google login is needed by students.
            </p>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A6A6] focus:ring-2 focus:ring-[#00A6A6]/20 transition-all shadow-sm"
            />
          </div>

          {/* Test Status feedback */}
          {testResult.status === 'success' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px] flex-shrink-0 mt-0.5">
                check_circle
              </span>
              <p className="font-semibold leading-relaxed">{testResult.message}</p>
            </div>
          )}

          {testResult.status === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2">
              <span className="material-symbols-outlined text-rose-600 text-[18px] flex-shrink-0 mt-0.5">
                error
              </span>
              <p className="font-semibold leading-relaxed">{testResult.message}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#123B6D] hover:bg-[#0A2548] text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              Save Endpoint URL
            </button>
            <button
              onClick={handleTestConnection}
              disabled={testing || !inputUrl.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#EAF2FB] hover:bg-[#CBDFF2] text-[#123B6D] font-bold transition-all border border-[#CBDFF2] cursor-pointer disabled:opacity-50"
            >
              {testing ? 'Testing Connection...' : 'Test Connection'}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all ml-auto cursor-pointer"
            >
              {showCode ? 'Hide Code' : 'View Apps Script Code'}
            </button>
          </div>

          {/* Apps Script Template Code Drawer */}
          {showCode && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono space-y-2 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-[11px] text-teal-400 font-bold">Google Apps Script: Code.gs</span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition-all cursor-pointer"
                >
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-[10px] leading-relaxed max-h-56 overflow-y-auto no-scrollbar whitespace-pre-wrap select-all">
                {sampleAppsScriptCode}
              </pre>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                <p className="font-semibold text-slate-300">Deployment Steps in Google Apps Script:</p>
                <ol className="list-decimal pl-4 space-y-0.5">
                  <li>In Google Sheets, go to <strong>Extensions &gt; Apps Script</strong>.</li>
                  <li>Replace the editor contents with the code above and click <strong>Save</strong>.</li>
                  <li>Click <strong>Deploy &gt; Manage deployments</strong>, click the <strong>pencil (edit)</strong> icon.</li>
                  <li>Under Version select <strong>New version</strong>, set <em>Who has access: Anyone</em>, and click <strong>Deploy</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Setup tips */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-600">
            <div className="font-bold text-[#123B6D] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#00A6A6]">info</span>
              <span>Google Sheets &amp; Deployment Guidelines</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
              <li>
                <strong>Preventing Format Errors:</strong> WhatsApp numbers are transmitted as clean 10 digits and saved as Plain Text. In Google Sheets, make sure Column D (WhatsApp Number) is set to <strong>Format &gt; Number &gt; Plain text</strong> so it does not evaluate leading plus signs or dashes as formulas.
              </li>
              <li>
                The Web App must be deployed with <strong>Who has access: Anyone</strong> (anonymous access allowed).
              </li>
              <li>
                After pasting or updating <code>Code.gs</code>, always deploy a <strong>New version</strong> via <strong>Deploy &gt; Manage deployments &gt; Edit &gt; Version: New version &gt; Deploy</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Endpoint: {isAppsScriptUrlConfigured() ? 'Active' : 'Unconfigured'}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
