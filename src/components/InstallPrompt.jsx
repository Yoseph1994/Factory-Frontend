import React, { useState, useEffect } from 'react';
import { Download, X, Share, Building2, Check, ArrowRight } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // 1. Check if already installed as standalone PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;
    if (isStandalone) {
      return; // Already running as installed PWA app, do not prompt
    }

    // 2. Check if user already dismissed in this browser session
    const isDismissed = sessionStorage.getItem('pwa_install_dismissed');
    if (isDismissed) {
      return;
    }

    // 3. Detect mobile device (screen size or mobile user agent)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIPhoneOrIPad = /iphone|ipad|ipod/.test(ua);
    const isAndroidOrMobile = /android|webos|blackberry|iemobile|opera mini/.test(ua) || window.innerWidth < 768;

    if (isIPhoneOrIPad || isAndroidOrMobile) {
      setIsMobile(true);
      if (isIPhoneOrIPad) {
        setIsIOS(true);
      }
      
      // Delay showing by 800ms so the initial page renders smoothly first
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 800);

      return () => clearTimeout(timer);
    }

    // 4. Listen for native Android/Chrome beforeinstallprompt event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPWAInstallPrompt = e;
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback for Android browsers if event is delayed
      alert("To install: Tap your browser's menu (⋮) in the top right, then tap 'Install app' or 'Add to Home screen'.");
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Install Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 flex justify-center pointer-events-none animate-in slide-in-from-bottom duration-300">
        <div className="bg-slate-950 text-white rounded-2xl p-5 shadow-2xl border border-slate-800 max-w-md w-full pointer-events-auto flex flex-col space-y-4 ring-1 ring-white/10">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-base tracking-tight text-white flex items-center space-x-2">
                  <span>Plastix ERP</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                    APP
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Factory Operations on your Phone
                </div>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              title="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            Install the app on your home screen for instant one-tap launch, full-screen dashboard without browser bars, and shop-floor telemetry.
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={handleInstall}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Install to Home Screen</span>
            </button>
            <button
              onClick={handleDismiss}
              className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Maybe Later
            </button>
          </div>

        </div>
      </div>

      {/* iOS Safari Step-by-Step Home Screen Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Install on iPhone</h3>
              </div>
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Apple requires installing directly through Safari in 3 quick taps:
            </p>

            <ol className="space-y-3.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <span>Tap the <strong className="text-slate-900">Share icon</strong> <Share className="w-4 h-4 inline mx-1 text-blue-600" /> at the bottom bar of Safari.</span>
              </li>
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <span>Scroll down and tap <strong className="text-slate-900">"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <span>Tap <strong className="text-slate-900">"Add"</strong> in the top-right. The app icon will appear on your phone screen!</span>
              </li>
            </ol>

            <button
              onClick={() => {
                setShowIOSGuide(false);
                setShowPrompt(false);
                sessionStorage.setItem('pwa_install_dismissed', 'true');
              }}
              className="w-full mt-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
