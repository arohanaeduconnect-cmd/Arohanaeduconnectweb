import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logout } from '../services/authService';
import {
  createAdmissionsSpreadsheet,
  fetchSheetRecords,
  getSpreadsheetMetadata,
  setStoredSpreadsheetId,
  extractSpreadsheetId,
  SHEET_TAB_NAME,
} from '../services/sheetsService';
import { SheetLeadRecord } from '../types';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  spreadsheetId: string | null;
  onAuthChange: (user: User | null, token: string | null) => void;
  onSpreadsheetChange: (sheetId: string | null) => void;
  localLeads: SheetLeadRecord[];
  onSyncLeads: () => Promise<void>;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  spreadsheetId,
  onAuthChange,
  onSpreadsheetChange,
  localLeads,
  onSyncLeads,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPermissionError, setIsPermissionError] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sheetRecords, setSheetRecords] = useState<SheetLeadRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'status' | 'records'>('status');
  const [manualSheetInput, setManualSheetInput] = useState('');
  const [connectedSheetTitle, setConnectedSheetTitle] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async (forceConsent = true) => {
    setLoading(true);
    setError(null);
    setIsPermissionError(false);
    try {
      const res = await googleSignIn(forceConsent);
      if (res) {
        onAuthChange(res.user, res.accessToken);
        setSuccessMsg(`Signed in successfully as ${res.user.email} with Sheets access granted.`);
        setTimeout(() => setSuccessMsg(null), 5000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to authenticate with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSheet = async () => {
    if (!accessToken) {
      setError('Please sign in with Google first.');
      return;
    }
    setLoading(true);
    setError(null);
    setIsPermissionError(false);
    try {
      const sheet = await createAdmissionsSpreadsheet(accessToken);
      onSpreadsheetChange(sheet.id);
      setConnectedSheetTitle(sheet.title);
      setSuccessMsg(`Created new Google Sheet: "${sheet.title}"`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Could not create Google Sheet.';
      setError(msg);
      if (msg.includes('permission') || msg.includes('access token') || msg.includes('Re-Authorize')) {
        setIsPermissionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConnectManualInput = async () => {
    if (!manualSheetInput.trim()) return;
    const cleanId = extractSpreadsheetId(manualSheetInput);
    if (!cleanId || cleanId.length < 15) {
      setError('Please enter a valid Google Spreadsheet URL or ID (e.g. from https://docs.google.com/spreadsheets/d/...)');
      return;
    }

    setLoading(true);
    setError(null);
    setIsPermissionError(false);

    try {
      if (accessToken) {
        const metadata = await getSpreadsheetMetadata(accessToken, cleanId);
        setConnectedSheetTitle(metadata.title);
        setStoredSpreadsheetId(cleanId);
        onSpreadsheetChange(cleanId);
        setSuccessMsg(`Successfully connected to "${metadata.title}" (Tab: '${metadata.targetTab}')`);
      } else {
        setStoredSpreadsheetId(cleanId);
        onSpreadsheetChange(cleanId);
        setSuccessMsg('Linked Google Sheet ID. Sign in with Google to enable automatic sync.');
      }
      setManualSheetInput('');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Could not access the spreadsheet.';
      setError(msg);
      if (msg.includes('permission') || msg.includes('access token') || msg.includes('grant permissions')) {
        setIsPermissionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRecords = async () => {
    if (!spreadsheetId) {
      setError('No spreadsheet linked yet.');
      return;
    }
    if (!accessToken) {
      setError('Please sign in with Google to fetch live records from your spreadsheet.');
      return;
    }
    setLoading(true);
    setError(null);
    setIsPermissionError(false);
    try {
      const recs = await fetchSheetRecords(accessToken, spreadsheetId);
      setSheetRecords(recs);
      setActiveTab('records');
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Failed to load records from sheet.';
      setError(msg);
      if (msg.includes('permission') || msg.includes('access token') || msg.includes('re-auth')) {
        setIsPermissionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to disconnect your Google account? Student leads will continue to be safely stored locally on this device.'
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await logout();
      onAuthChange(null, null);
      setSuccessMsg('Disconnected Google account.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#CBDFF2] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#123B6D] to-[#0A2548] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] text-[#00A6A6]">table_chart</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Google Sheets Admissions Desk</h3>
              <p className="text-xs text-slate-300">Live student lead logging &amp; cloud spreadsheet management</p>
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

        {/* Tab switcher */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50 gap-2">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'border-[#00A6A6] text-[#123B6D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Connection &amp; Setup
          </button>
          <button
            onClick={() => {
              setActiveTab('records');
              if (accessToken && spreadsheetId) {
                handleFetchRecords();
              }
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'records'
                ? 'border-[#00A6A6] text-[#123B6D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Live Records</span>
            {spreadsheetId && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#EAF2FB] text-[#123B6D] text-[10px] font-bold">
                {sheetRecords.length > 0 ? sheetRecords.length : localLeads.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-rose-600 flex-shrink-0 mt-0.5">error</span>
                <p className="flex-1 font-medium leading-relaxed">{error}</p>
              </div>
              {isPermissionError && (
                <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-rose-700">Need to grant Google Sheets permission?</span>
                  <button
                    onClick={() => handleGoogleLogin(true)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    Re-Authorize Google Sheets
                  </button>
                </div>
              )}
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600 flex-shrink-0">check_circle</span>
              <p className="flex-1 font-medium leading-relaxed">{successMsg}</p>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Account Status Card */}
              <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-[#CBDFF2] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#123B6D] uppercase tracking-wider">
                    Google Authentication
                  </span>
                  {user && accessToken ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Connected with Sheets Scope
                    </span>
                  ) : user ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      Needs Sheets Re-Auth
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                      Not Signed In
                    </span>
                  )}
                </div>

                {user ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="w-11 h-11 rounded-full border border-[#CBDFF2]"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#123B6D] text-white flex items-center justify-center font-bold text-base">
                          {(user.displayName || user.email || 'A')[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-[#123B6D]">
                          {user.displayName || 'Authorized Counsellor'}
                        </h4>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGoogleLogin(true)}
                        disabled={loading}
                        className="px-3.5 py-1.5 rounded-xl bg-[#EAF2FB] hover:bg-[#CBDFF2] text-[#123B6D] text-xs font-bold border border-[#CBDFF2] transition-all cursor-pointer"
                        title="Re-run Google consent to ensure Sheets scopes are granted"
                      >
                        Re-Authorize
                      </button>
                      <button
                        onClick={handleDisconnect}
                        disabled={loading}
                        className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Connect your Google Workspace account (e.g. <code>arohanaeduconnect@gmail.com</code>) to automatically log every incoming student admission registration directly to your official Google Sheet.
                    </p>
                    <button
                      onClick={() => handleGoogleLogin(true)}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-sm transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      </svg>
                      <span>Sign in with Google (Grant Sheets Access)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Spreadsheet Target Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#123B6D] uppercase tracking-wider">
                    Target Spreadsheet
                  </span>
                  {spreadsheetId && (
                    <span className="text-[11px] font-bold text-[#00A6A6]">
                      {connectedSheetTitle || 'Arohana Admissions'}
                    </span>
                  )}
                </div>

                {spreadsheetId ? (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono break-all text-slate-700">
                      ID: {spreadsheetId}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00A6A6] hover:bg-[#008686] text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        Open in Google Sheets
                      </a>
                      <button
                        onClick={handleFetchRecords}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EAF2FB] hover:bg-[#123B6D] text-[#123B6D] hover:text-white text-xs font-semibold transition-all border border-[#CBDFF2] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                        Fetch Live Rows
                      </button>
                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            'Unlink this spreadsheet from the app? The Google Sheet file in your Drive will not be deleted.'
                          );
                          if (confirmed) {
                            onSpreadsheetChange(null);
                            setStoredSpreadsheetId(null);
                            setConnectedSheetTitle(null);
                          }
                        }}
                        className="text-xs text-slate-500 hover:text-rose-600 underline ml-auto cursor-pointer"
                      >
                        Unlink Sheet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600">
                      No Google Sheet is currently linked. You can automatically create a pre-formatted Arohana Admissions Sheet, or paste any Google Sheet link/ID.
                    </p>
                    
                    {/* Auto-create button */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleCreateSheet}
                        disabled={loading || !accessToken}
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                          accessToken
                            ? 'bg-[#123B6D] hover:bg-[#0A2548] text-white'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">add_box</span>
                        Auto-Create Admissions Sheet (2026)
                      </button>
                    </div>

                    {/* Manual Paste Link or ID */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <label className="text-[11px] font-bold text-slate-600 block">
                        Or paste any Google Sheet URL or Spreadsheet ID:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0X.../edit"
                          value={manualSheetInput}
                          onChange={(e) => setManualSheetInput(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A6A6]"
                        />
                        <button
                          onClick={handleConnectManualInput}
                          disabled={loading || !manualSheetInput.trim()}
                          className="px-4 py-2 rounded-xl bg-[#00A6A6] text-white text-xs font-bold hover:bg-[#008686] transition-all cursor-pointer disabled:opacity-50"
                        >
                          Connect
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Want to create a fresh sheet manually in your Drive?</span>
                        <a
                          href="https://sheets.new"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00A6A6] font-bold underline inline-flex items-center gap-0.5 hover:text-[#008686]"
                        >
                          Open sheets.new <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Local Leads Queue Status */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 text-[24px]">save</span>
                  <div>
                    <h5 className="text-xs font-bold text-amber-900">
                      {localLeads.length} Lead(s) Stored Locally
                    </h5>
                    <p className="text-[11px] text-amber-700">
                      Every submission is safeguarded on-device in case of network disruptions.
                    </p>
                  </div>
                </div>
                {spreadsheetId && accessToken && localLeads.length > 0 && (
                  <button
                    onClick={onSyncLeads}
                    disabled={loading}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Sync All to Sheet
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#123B6D]">
                  {sheetRecords.length > 0
                    ? `Showing ${sheetRecords.length} record(s) from Google Sheet`
                    : `Showing ${localLeads.length} local lead(s)`}
                </span>
                <div className="flex gap-2">
                  {accessToken && spreadsheetId && (
                    <button
                      onClick={handleFetchRecords}
                      disabled={loading}
                      className="px-3 py-1.5 rounded-lg bg-[#EAF2FB] text-[#123B6D] hover:bg-[#123B6D] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      Refresh
                    </button>
                  )}
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#123B6D] text-white sticky top-0">
                    <tr>
                      <th className="p-3 font-semibold">Student Name</th>
                      <th className="p-3 font-semibold">WhatsApp</th>
                      <th className="p-3 font-semibold">Course</th>
                      <th className="p-3 font-semibold">Location</th>
                      <th className="p-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(sheetRecords.length > 0 ? sheetRecords : localLeads).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400">
                          No registrations recorded yet. Submit the registration form to see leads here!
                        </td>
                      </tr>
                    ) : (
                      (sheetRecords.length > 0 ? sheetRecords : localLeads).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-[#123B6D]">{row.studentName}</td>
                          <td className="p-3 text-slate-600">{row.whatsapp}</td>
                          <td className="p-3 text-slate-800 font-medium">{row.courseInterested}</td>
                          <td className="p-3 text-slate-600">{row.preferredLocation}</td>
                          <td className="p-3 text-slate-500 text-[11px]">{row.submittedAt}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#00A6A6]">lock</span>
            <span>Secured via Google Workspace Sheets API</span>
          </div>
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
