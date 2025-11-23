import { ArrowLeft, Trash2, Calendar, Building2, Plane, MapPin, Radio, Download, Edit } from 'lucide-react';
import { Authorization } from '../App';

interface AuthorizationDetailsProps {
  authorization: Authorization;
  onBack: () => void;
  onDelete: (id: string) => void;
  onEdit: (auth: Authorization) => void;
}

export function AuthorizationDetails({ authorization, onBack, onDelete, onEdit }: AuthorizationDetailsProps) {
  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette autorisation ?')) {
      onDelete(authorization.id);
    }
  };

  const handleExportPDF = async () => {
    // Utiliser jsPDF pour générer le PDF
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    // Configuration
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Titre
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.text('AeroGes', margin, y);
    
    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Autorisation de survol et d\'atterrissage', margin, y);

    y += 15;
    
    // Badge Type
    if (authorization.type === 'ASA') {
      doc.setFillColor(219, 234, 254);
      doc.setTextColor(29, 78, 216);
    } else {
      doc.setFillColor(243, 232, 255);
      doc.setTextColor(107, 33, 168);
    }
    doc.setFontSize(14);
    doc.rect(margin, y - 5, 30, 10, 'F');
    doc.text(authorization.type, margin + 5, y + 2);

    y += 20;

    // Numéro d'autorisation
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Numéro d\'autorisation', margin, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(authorization.number, margin, y);

    y += 15;

    // Compagnie
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Compagnie / Opérateur', margin, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(authorization.company, margin, y);

    y += 12;

    // Type d'aéronef
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Type d\'aéronef', margin, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(authorization.aircraftType, margin, y);

    y += 12;

    // Immatriculation
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Immatriculation', margin, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(authorization.registration, margin, y);

    y += 12;

    // Champs spécifiques ASA
    if (authorization.type === 'ASA') {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Call Sign', margin, y);
      y += 6;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(authorization.callSign, margin, y);

      y += 12;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Itinéraire', margin, y);
      y += 6;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(authorization.route, margin, y);

      y += 12;
    }

    // Période de validité
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Période de validité', margin, y);
    y += 6;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const validFrom = new Date(authorization.validFrom).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const validTo = new Date(authorization.validTo).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    doc.text(`Du ${validFrom}`, margin, y);
    y += 6;
    doc.text(`Au ${validTo}`, margin, y);

    y += 15;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const createdAt = new Date(authorization.createdAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Document généré par AeroGes le ${createdAt}`, margin, y);

    // Sauvegarder le PDF
    doc.save(`AeroGes_${authorization.type}_${authorization.number}.pdf`);
  };

  const isExpired = () => {
    const today = new Date();
    const validTo = new Date(authorization.validTo);
    return validTo < today;
  };

  const daysRemaining = () => {
    const today = new Date();
    const validTo = new Date(authorization.validTo);
    const diff = Math.ceil((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const days = daysRemaining();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Exporter en PDF"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(authorization)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-2 rounded-lg ${
            authorization.type === 'ASA'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}>
            {authorization.type}
          </span>
          {isExpired() ? (
            <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
              Expiré
            </span>
          ) : days <= 7 ? (
            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
              Expire dans {days} jour{days > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              Valide
            </span>
          )}
        </div>

        {/* Authorization Number */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">Numéro d'autorisation</p>
          <p className="text-gray-900">{authorization.number}</p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-500 text-sm mb-1">Compagnie / Opérateur</p>
              <p className="text-gray-900">{authorization.company}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Plane className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-1">Aéronef</p>
              <p className="text-gray-900">{authorization.aircraftType}</p>
              <p className="text-gray-600 text-sm mt-1">Immat: {authorization.registration}</p>
            </div>
          </div>

          {authorization.type === 'ASA' && (
            <>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Radio className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">Call Sign</p>
                  <p className="text-gray-900">{authorization.callSign}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">Itinéraire</p>
                  <p className="text-gray-900">{authorization.route}</p>
                </div>
              </div>
            </>
          )}

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-500 text-sm mb-1">Période de validité</p>
              <p className="text-gray-900">
                Du {new Date(authorization.validFrom).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-gray-900">
                Au {new Date(authorization.validTo).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Créé le {new Date(authorization.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}