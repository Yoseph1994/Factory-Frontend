import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Share } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                             window.navigator.standalone === true;
    setIsStandalone(isStandaloneMode);

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIPhone = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
    if (isIPhone && isSafari && !isStandaloneMode) {
      setIsIOS(true);
    }

    // Capture Chrome/Android PWA install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // If already installed or dismissed, hide
  if (isStandalone || isDismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  return (
    <>
      <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-white">Install Plastix ERP on your Phone</span>
            <span className="text-slate-400 hidden sm:inline ml-1.5">• Open instantly from home screen without browser bars</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-3 h-3" />
            <span>Install App</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* iOS Safari Home Screen Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Install on iPhone / iPad</h3>
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                <span>Tap the <strong className="text-slate-900">Share button</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> at the bottom of Safari.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                <span>Scroll down and tap <strong className="text-slate-900">"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                <span>Tap <strong className="text-slate-900">"Add"</strong> in the top right corner. The app icon will appear on your phone!</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-6 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

