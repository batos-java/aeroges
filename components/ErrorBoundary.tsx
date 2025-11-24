import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleResetData = () => {
    if (window.confirm('⚠️ ATTENTION : Cela va supprimer TOUTES vos autorisations enregistrées. Êtes-vous sûr ?')) {
      try {
        // Sauvegarder les credentials
        const username = localStorage.getItem('app_username');
        const password = localStorage.getItem('app_password');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const lastLogin = localStorage.getItem('lastLogin');

        // Nettoyer toutes les données
        localStorage.clear();

        // Restaurer les credentials
        if (username) localStorage.setItem('app_username', username);
        if (password) localStorage.setItem('app_password', password);
        if (isAuthenticated) localStorage.setItem('isAuthenticated', isAuthenticated);
        if (lastLogin) localStorage.setItem('lastLogin', lastLogin);

        // Recharger
        window.location.reload();
      } catch (e) {
        console.error('Error resetting data:', e);
        alert('Erreur lors de la réinitialisation. Veuillez vider le cache du navigateur manuellement.');
      }
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-red-900">Erreur de l'application</h2>
                <p className="text-sm text-gray-600">Une erreur inattendue s'est produite</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                L'application a rencontré un problème et ne peut pas continuer.
              </p>
              {this.state.error && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    Détails techniques
                  </summary>
                  <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-32 bg-white p-2 rounded border">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>

            <div className="space-y-3">
              <Button
                onClick={this.handleReload}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recharger l'application
              </Button>

              <Button
                onClick={this.handleResetData}
                className="w-full bg-red-600 hover:bg-red-700"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Réinitialiser toutes les données
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Si le problème persiste, essayez de réinitialiser les données ou de vider le cache de votre navigateur.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
