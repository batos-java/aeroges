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

  // Déterminer la couleur de la bordure gauche
  const borderColor = authorization.type === 'ASA' 
    ? 'border-blue-500' 
    : 'border-green-500';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 relative ${borderColor}`}
    >
      {/* Header avec badges */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs ${
            authorization.type === 'ASA'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {authorization.type}
          </span>
          {isExpired() && (
            <span className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-700">
              Expiré
            </span>
          )}
          {isExpiringSoon() && !isExpired() && (
            <span className="px-2 py-1 rounded-md text-xs bg-yellow-100 text-yellow-700">
              Bientôt
            </span>
          )}
        </div>
      </div>

      {/* Numéro d'autorisation */}
      <p className="text-gray-800 mb-3 text-sm">
        #{authorization.number}
      </p>

      {/* Informations avec icônes */}
      <div className="space-y-2.5">
        {/* Compagnie */}
        <div className="flex items-center gap-2.5 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate text-sm">{authorization.company}</span>
        </div>
        
        {/* Type d'appareil et immatriculation */}
        <div className="flex items-center gap-2.5 text-gray-700">
          <Plane className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm">{authorization.aircraftType} - {authorization.registration}</span>
        </div>

        {/* Itinéraire (uniquement pour ASA) */}
        {authorization.type === 'ASA' && (
          <div className="flex items-center gap-2.5 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate text-sm">{authorization.route}</span>
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center gap-2.5 text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm">
            {new Date(authorization.validFrom).toLocaleDateString('fr-FR')} - {new Date(authorization.validTo).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      {/* Bouton d'édition */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="absolute bottom-3 right-3 text-gray-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-md"
        title="Modifier"
        aria-label="Modifier l'autorisation"
      >
        <Edit className="w-4 h-4" />
      </button>
    </div>
  );
}