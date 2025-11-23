import { useState, useEffect } from 'react';
import { Plus, Filter, Search, Plane, Bell, BellOff } from 'lucide-react';
import { AuthorizationList } from './components/AuthorizationList';
import { AuthorizationForm } from './components/AuthorizationForm';
import { TextExtractor } from './components/TextExtractor';
import { AuthorizationDetails } from './components/AuthorizationDetails';
import { InstallPrompt } from './components/InstallPrompt';

export type AuthorizationType = 'ASA' | 'AEA';

export interface ASAAuthorization {
  id: string;
  type: 'ASA';
  number: string;
  company: string;
  aircraftType: string;
  registration: string;
  callSign: string;
  route: string;
  validFrom: string;
  validTo: string;
  createdAt: string;
}

export interface AEAAuthorization {
  id: string;
  type: 'AEA';
  number: string;
  company: string;
  aircraftType: string;
  registration: string;
  validFrom: string;
  validTo: string;
  createdAt: string;
}

export type Authorization = ASAAuthorization | AEAAuthorization;

type View = 'list' | 'add' | 'extract' | 'details';

export default function App() {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedAuth, setSelectedAuth] = useState<Authorization | null>(null);
  const [editingAuth, setEditingAuth] = useState<Authorization | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ASA' | 'AEA'>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  // Charger les données depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('aeroges-authorizations');
    if (stored) {
      setAuthorizations(JSON.parse(stored));
    }
    
    // Vérifier les permissions de notification
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    localStorage.setItem('aeroges-authorizations', JSON.stringify(authorizations));
  }, [authorizations]);

  // Vérifier les autorisations expirantes et envoyer des notifications
  useEffect(() => {
    if (!notificationsEnabled || authorizations.length === 0) return;

    const checkExpiringAuthorizations = () => {
      const today = new Date();
      const notificationDays = [7, 3, 1]; // Notifier 7, 3 et 1 jour(s) avant expiration

      authorizations.forEach(auth => {
        const validTo = new Date(auth.validTo);
        const daysRemaining = Math.ceil((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Vérifier si une notification a déjà été envoyée pour cette autorisation et ce nombre de jours
        const notificationKey = `notif-${auth.id}-${daysRemaining}`;
        const alreadyNotified = localStorage.getItem(notificationKey);

        if (notificationDays.includes(daysRemaining) && !alreadyNotified) {
          new Notification('AeroGes - Expiration proche', {
            body: `L'autorisation ${auth.type} #${auth.number} de ${auth.company} expire dans ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''}.`,
            icon: '/favicon.ico',
            tag: auth.id,
          });
          localStorage.setItem(notificationKey, 'true');
        }
      });
    };

    // Vérifier immédiatement
    checkExpiringAuthorizations();

    // Vérifier toutes les heures
    const interval = setInterval(checkExpiringAuthorizations, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authorizations, notificationsEnabled]);

  const toggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Les notifications ne sont pas supportées par votre navigateur.');
      return;
    }

    if (Notification.permission === 'granted') {
      setNotificationsEnabled(!notificationsEnabled);
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('AeroGes', {
          body: 'Les notifications sont maintenant activées !',
        });
      }
    } else {
      alert('Les notifications ont été bloquées. Veuillez les autoriser dans les paramètres de votre navigateur.');
    }
  };

  const addAuthorization = (auth: Omit<Authorization, 'id' | 'createdAt'>) => {
    const newAuth: Authorization = {
      ...auth,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    } as Authorization;
    setAuthorizations([newAuth, ...authorizations]);
    setCurrentView('list');
  };

  const updateAuthorization = (auth: Omit<Authorization, 'id' | 'createdAt'>) => {
    if (!editingAuth) return;
    
    const updatedAuth: Authorization = {
      ...auth,
      id: editingAuth.id,
      createdAt: editingAuth.createdAt,
    } as Authorization;
    
    setAuthorizations(authorizations.map(a => a.id === editingAuth.id ? updatedAuth : a));
    setEditingAuth(null);
    setCurrentView('list');
  };

  const editAuthorization = (auth: Authorization) => {
    setEditingAuth(auth);
    setCurrentView('add');
  };

  const deleteAuthorization = (id: string) => {
    setAuthorizations(authorizations.filter(auth => auth.id !== id));
    setCurrentView('list');
  };

  const viewDetails = (auth: Authorization) => {
    setSelectedAuth(auth);
    setCurrentView('details');
  };

  const filteredAuthorizations = authorizations.filter(auth => {
    const matchesSearch = 
      auth.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auth.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auth.registration.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || auth.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="bg-indigo-600 p-2.5 rounded-lg flex-shrink-0">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-indigo-900 truncate">AeroGes</h1>
                <p className="text-gray-500 text-xs truncate">Gestion des autorisations</p>
              </div>
            </div>
            {currentView === 'list' && (
              <button
                onClick={toggleNotifications}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
                aria-label={notificationsEnabled ? 'Notifications activées' : 'Notifications désactivées'}
              >
                {notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-indigo-600" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
              </button>
            )}
          </div>

          {/* Search Bar - Only on list view */}
          {currentView === 'list' && (
            <>
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une autorisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>

              {/* Filter Tabs */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    filterType === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Tout
                </button>
                <button
                  onClick={() => setFilterType('ASA')}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    filterType === 'ASA'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  ASA
                </button>
                <button
                  onClick={() => setFilterType('AEA')}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    filterType === 'AEA'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  AEA
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {currentView === 'list' && (
          <AuthorizationList
            authorizations={filteredAuthorizations}
            onViewDetails={viewDetails}
            onDelete={deleteAuthorization}
            onEdit={editAuthorization}
          />
        )}

        {currentView === 'add' && (
          <AuthorizationForm
            onSubmit={editingAuth ? updateAuthorization : addAuthorization}
            onCancel={() => {
              setEditingAuth(null);
              setCurrentView('list');
            }}
            editingAuth={editingAuth}
          />
        )}

        {currentView === 'extract' && (
          <TextExtractor
            onExtracted={addAuthorization}
            onCancel={() => setCurrentView('list')}
          />
        )}

        {currentView === 'details' && selectedAuth && (
          <AuthorizationDetails
            authorization={selectedAuth}
            onBack={() => setCurrentView('list')}
            onDelete={deleteAuthorization}
            onEdit={editAuthorization}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {currentView === 'list' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentView('extract')}
              className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-colors"
            >
              <Search className="w-5 h-5" />
              Extraire
            </button>
            <button
              onClick={() => setCurrentView('add')}
              className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>
        </nav>
      )}
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}