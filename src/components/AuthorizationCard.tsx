import { Authorization } from '../App';
import { Calendar, Building2, Plane, MapPin, Edit } from 'lucide-react';

interface AuthorizationCardProps {
  authorization: Authorization;
  onClick: () => void;
  onEdit: () => void;
}

export function AuthorizationCard({ authorization, onClick, onEdit }: AuthorizationCardProps) {
  const isExpiringSoon = () => {
    const today = new Date();
    const validTo = new Date(authorization.validTo);
    const daysUntilExpiry = Math.ceil((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
  };

  const isExpired = () => {
    const today = new Date();
    const validTo = new Date(authorization.validTo);
    return validTo < today;
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
        isExpired()
          ? 'border-red-500'
          : isExpiringSoon()
          ? 'border-yellow-500'
          : 'border-indigo-500'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            authorization.type === 'ASA'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}>
            {authorization.type}
          </span>
          {isExpired() && (
            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
              Expiré
            </span>
          )}
          {isExpiringSoon() && !isExpired() && (
            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
              Bientôt
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm">#{authorization.number}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{authorization.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700">
          <Plane className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{authorization.aircraftType} - {authorization.registration}</span>
        </div>

        {authorization.type === 'ASA' && (
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{authorization.route}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600 text-sm mt-3 pt-2 border-t border-gray-100">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>
            {new Date(authorization.validFrom).toLocaleDateString('fr-FR')} - {new Date(authorization.validTo).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-500 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          title="Modifier"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}