import { Authorization } from '../App';
import { AuthorizationCard } from './AuthorizationCard';
import { FileX } from 'lucide-react';

interface AuthorizationListProps {
  authorizations: Authorization[];
  onViewDetails: (auth: Authorization) => void;
  onDelete: (id: string) => void;
  onEdit: (auth: Authorization) => void;
}

export function AuthorizationList({ authorizations, onViewDetails, onDelete, onEdit }: AuthorizationListProps) {
  if (authorizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <FileX className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-center">Aucune autorisation trouvée</p>
        <p className="text-sm text-center mt-2">
          Commencez par extraire ou ajouter une autorisation
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {authorizations.map(auth => (
        <AuthorizationCard
          key={auth.id}
          authorization={auth}
          onClick={() => onViewDetails(auth)}
          onEdit={() => onEdit(auth)}
        />
      ))}
    </div>
  );
}