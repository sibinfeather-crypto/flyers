import React, { useState, useRef } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  ShieldAlert, 
  Key, 
  Megaphone, 
  Phone, 
  Instagram, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const StoreSettingsTab: React.FC = () => {
  const { 
    storeSettings, 
    updateStoreSettings, 
    resetCatalogToDefault, 
    exportData, 
    importData, 
    products, 
    orders 
  } = useCatalog();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ ...storeSettings });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(formData);
    showNotice('success', 'Store settings updated and applied across the website!');
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `theflyers_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('success', 'Catalog & settings backup file downloaded!');
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importData(content);
        if (result.success) {
          showNotice('success', result.message);
        } else {
          showNotice('error', result.message);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmReset = () => {
    resetCatalogToDefault();
    setFormData({ ...storeSettings });
    setConfirmResetOpen(false);
    showNotice('success', 'Catalog restored to factory defaults!');
  };

  return (
    <div className="space-y-6 font-tech text-xs">
      {/* Notice Banner */}
      {notification && (
        <div className={`p-3 rounded border flex items-center space-x-2 ${
          notification.type === 'success' 
            ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300' 
            : 'bg-red-950/50 border-red-700 text-red-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. Header Announcement Ticker */}
        <div className="bg-[#111116] border border-neutral-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-[#E8302B]" />
              <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider">
                Top Announcement Marquee Bar
              </h4>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.enableMarquee}
                onChange={(e) => setFormData({ ...formData, enableMarquee: e.target.checked })}
                className="w-4 h-4 rounded bg-[#181820] border-neutral-700 text-[#E8302B] focus:ring-0"
              />
              <span className="text-neutral-300 font-semibold">Enable Marquee</span>
            </label>
          </div>

          <div>
            <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
              Marquee Ticker Text (Continuous Loop)
            </label>
            <input
              type="text"
              value={formData.marqueeAnnouncement}
              onChange={(e) => setFormData({ ...formData, marqueeAnnouncement: e.target.value })}
              placeholder="e.g. PAN-INDIA EXPRESS SHIPPING • 71.5K+ COMMUNITY • 100% TESTED GENUINE SPARES"
              className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B]"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Displays across the top red ribbon with smooth infinite scroll animation.
            </p>
          </div>
        </div>

        {/* 2. Contact & Social Channels */}
        <div className="bg-[#111116] border border-neutral-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
            <Phone className="w-4 h-4 text-[#E8302B]" />
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider">
              Store Contact & Social Details
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                WhatsApp Order Number (10 digits)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                Display Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                Instagram Handle
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                Followers Counter Badge
              </label>
              <input
                type="text"
                value={formData.followersCount}
                onChange={(e) => setFormData({ ...formData, followersCount: e.target.value })}
                placeholder="71.5K+"
                className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B]"
              />
            </div>
          </div>
        </div>

        {/* 3. Security & Admin Passcode */}
        <div className="bg-[#111116] border border-neutral-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
            <Key className="w-4 h-4 text-[#E8302B]" />
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider">
              Admin Portal Security
            </h4>
          </div>

          <div className="max-w-md">
            <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
              Admin Master Passcode
            </label>
            <input
              type="text"
              value={formData.adminPasscode}
              onChange={(e) => setFormData({ ...formData, adminPasscode: e.target.value })}
              className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none focus:border-[#E8302B] font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Required to access this Admin Control Panel. Default: <code className="text-neutral-400">flyers2026</code>
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase tracking-wider rounded red-glow flex items-center space-x-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>SAVE STORE SETTINGS</span>
          </button>
        </div>
      </form>

      {/* 4. Data Backup, Export & Factory Reset */}
      <div className="bg-[#111116] border border-neutral-800 p-5 rounded-lg space-y-4 pt-6 mt-8">
        <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
          <Settings className="w-4 h-4 text-[#E8302B]" />
          <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider">
            Catalog Database & Backup Tools
          </h4>
        </div>

        <p className="text-neutral-400 text-xs">
          Currently managing <strong className="text-white">{products.length} products</strong> and <strong className="text-white">{orders.length} order inquiries</strong>. Download a snapshot anytime or restore to factory defaults.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Export JSON */}
          <button
            onClick={handleDownloadBackup}
            className="px-4 py-2 bg-[#1b1b24] hover:bg-[#252532] border border-neutral-700 rounded text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-[#E8302B]" />
            <span>Download Catalog JSON</span>
          </button>

          {/* Import JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleRestoreFile}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#1b1b24] hover:bg-[#252532] border border-neutral-700 rounded text-neutral-200 flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>Restore from JSON File</span>
          </button>

          {/* Factory Reset */}
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-950/70 border border-red-800 rounded text-red-300 flex items-center gap-2 transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
            <span>Reset to Factory Catalog</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121217] border border-red-800 p-6 rounded-lg shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-racing font-bold uppercase">
                Confirm Factory Reset?
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              This will restore all products, track tyres, and sample orders to the original initial catalog setup. Any custom products added locally will be replaced.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-racing font-bold uppercase rounded"
              >
                Yes, Reset Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
