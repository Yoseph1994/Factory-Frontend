import React, { useState, useEffect } from 'react';
import { Download, X, Share, Building2, MoreVertical, Smartphone } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  useEffect(() => {
    // 1. Check if already running in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;
    if (isStandalone) {
      return;
    }

    // 2. Check if user dismissed in this session
    const isDismissed = sessionStorage.getItem('pwa_install_dismissed');
    if (isDismissed) {
      return;
    }

    // 3. Detect device
    const ua = (window.navigator.userAgent || '').toLowerCase();
    const isIPhoneOrIPad = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobileDevice = isIPhoneOrIPad || /android|webos|blackberry|iemobile|opera mini/.test(ua) || window.innerWidth < 768;

    if (isIPhoneOrIPad) {
      setIsIOS(true);
    }

    // 4. Capture any early captured event
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
    }

    // 5. Setup event listeners
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleEarlyEvent = () => {
      if (window.deferredPWAInstallPrompt) {
        setDeferredPrompt(window.deferredPWAInstallPrompt);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('pwa-install-ready', handleEarlyEvent);

    // If on mobile device, display install sheet after brief delay
    let timer = null;
    if (isMobileDevice) {
      timer = setTimeout(() => {
        setShowPrompt(true);
      }, 600);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('pwa-install-ready', handleEarlyEvent);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.deferredPWAInstallPrompt;

    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setShowPrompt(false);
          setDeferredPrompt(null);
          window.deferredPWAInstallPrompt = null;
        }
      } catch (err) {
        console.warn('PWA prompt error:', err);
        if (isIOS) {
          setShowIOSGuide(true);
        } else {
          setShowAndroidGuide(true);
        }
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // If Chrome hasn't fired the event yet or browser is in a webview
      setShowAndroidGuide(true);
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
              onClick={handleInstallClick}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 active:scale-95"
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

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Install on iPhone (Safari)</h3>
              </div>
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Apple requires saving through Safari in 3 quick taps:
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
                <span>Tap <strong className="text-slate-900">"Add"</strong> in the top-right corner. The Plastix ERP icon will appear on your phone screen!</span>
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

      {/* Android Browser Fallback Guide Modal (If Chrome delayed the prompt event) */}
      {showAndroidGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Install on Android</h3>
              </div>
              <button 
                onClick={() => setShowAndroidGuide(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="space-y-3.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <span>Tap your browser's <strong className="text-slate-900">Menu icon</strong> (the 3 vertical dots <MoreVertical className="w-4 h-4 inline text-slate-900" /> at the top right of Chrome).</span>
              </li>
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <span>Tap <strong className="text-slate-900">"Install app"</strong> or <strong className="text-slate-900">"Add to Home screen"</strong>.</span>
              </li>
              <li className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <span>Tap <strong className="text-slate-900">"Install"</strong> to add the app icon directly to your phone.</span>
              </li>
            </ol>

            <button
              onClick={() => {
                setShowAndroidGuide(false);
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
