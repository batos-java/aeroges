import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      // Empêcher le mini-infobar par défaut
      e.preventDefault();
      // Sauvegarder l'événement pour l'utiliser plus tard
      setDeferredPrompt(e);
      // Afficher le bouton d'installation personnalisé
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Vérifier si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Afficher le prompt d'installation
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Installation: ${outcome}`);

    // Réinitialiser le prompt différé
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Se souvenir que l'utilisateur a refusé
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  // Ne pas afficher si l'utilisateur a déjà refusé
  useEffect(() => {
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed === 'true') {
      setShowPrompt(false);
    }
  }, []);

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-indigo-600 text-white p-4 rounded-xl shadow-2xl z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-indigo-700 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3 mb-3">
        <Download className="w-6 h-6 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold mb-1">Installer AeroGes</h3>
          <p className="text-sm text-indigo-100">
            Installez l'application sur votre appareil pour un accès rapide et une utilisation hors ligne.
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Installer
        </button>
        <button
          onClick={handleDismiss}
          className="px-4 py-2 text-white hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
}
