import { useState } from 'react';
import { X } from 'lucide-react';
import { Authorization, AuthorizationType } from '../App';

interface AuthorizationFormProps {
  onSubmit: (auth: Omit<Authorization, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  editingAuth?: Authorization | null;
}

export function AuthorizationForm({ onSubmit, onCancel, editingAuth }: AuthorizationFormProps) {
  const [type, setType] = useState<AuthorizationType>(editingAuth?.type || 'ASA');
  const [formData, setFormData] = useState({
    number: editingAuth?.number || '',
    company: editingAuth?.company || '',
    aircraftType: editingAuth?.aircraftType || '',
    registration: editingAuth?.registration || '',
    callSign: editingAuth?.type === 'ASA' ? editingAuth.callSign : '',
    route: editingAuth?.type === 'ASA' ? editingAuth.route : '',
    validFrom: editingAuth?.validFrom || '',
    validTo: editingAuth?.validTo || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'ASA') {
      // RÈGLE MÉTIER: Ajouter 3 jours à la date de fin pour les ASA
      let adjustedValidTo = formData.validTo;
      if (adjustedValidTo) {
        const endDate = new Date(adjustedValidTo);
        endDate.setDate(endDate.getDate() + 3);
        adjustedValidTo = endDate.toISOString().split('T')[0];
      }

      onSubmit({
        type: 'ASA',
        number: formData.number,
        company: formData.company,
        aircraftType: formData.aircraftType,
        registration: formData.registration,
        callSign: formData.callSign,
        route: formData.route,
        validFrom: formData.validFrom,
        validTo: adjustedValidTo,
      });
    } else {
      onSubmit({
        type: 'AEA',
        number: formData.number,
        company: formData.company,
        aircraftType: formData.aircraftType,
        registration: formData.registration,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2>{editingAuth ? 'Modifier l\'autorisation' : 'Nouvelle autorisation'}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Selection */}
        <div>
          <label className="block text-gray-700 mb-2">Type d'autorisation</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType('ASA')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                type === 'ASA'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              ASA
            </button>
            <button
              type="button"
              onClick={() => setType('AEA')}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                type === 'AEA'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              AEA
            </button>
          </div>
        </div>

        {/* Common Fields */}
        <div>
          <label className="block text-gray-700 mb-2">Numéro d'autorisation</label>
          <input
            type="text"
            required
            value={formData.number}
            onChange={(e) => handleChange('number', e.target.value)}
            placeholder={type === 'ASA' ? 'ex: 0001/OL/ANAC/DG/DTA/SRTA/25' : 'ex: 00001/ANAC/DG/DSA'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Compagnie / Opérateur</label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Type d'aéronef</label>
          <input
            type="text"
            required
            value={formData.aircraftType}
            onChange={(e) => handleChange('aircraftType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Immatriculation</label>
          <input
            type="text"
            required
            value={formData.registration}
            onChange={(e) => handleChange('registration', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        {/* ASA-specific fields */}
        {type === 'ASA' && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Call Sign</label>
              <input
                type="text"
                required
                value={formData.callSign}
                onChange={(e) => handleChange('callSign', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Itinéraire</label>
              <input
                type="text"
                required
                value={formData.route}
                onChange={(e) => handleChange('route', e.target.value)}
                placeholder="ex: GOOY - FCBB - GOOY"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Validity Period */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 mb-2">Valide du</label>
            <input
              type="date"
              required
              value={formData.validFrom}
              onChange={(e) => handleChange('validFrom', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Jusqu'au</label>
            <input
              type="date"
              required
              value={formData.validTo}
              onChange={(e) => handleChange('validTo', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Info pour ASA */}
        {type === 'ASA' && formData.validTo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              ℹ️ Pour les ASA, 3 jours seront automatiquement ajoutés à la date de fin (date finale : {' '}
              {new Date(new Date(formData.validTo).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')})
            </p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}