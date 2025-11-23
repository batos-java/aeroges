import { useState } from 'react';
import { X, Sparkles, AlertCircle, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { Authorization, AuthorizationType } from '../App';

interface TextExtractorProps {
  onExtracted: (auth: Omit<Authorization, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function TextExtractor({ onExtracted, onCancel }: TextExtractorProps) {
  const [text, setText] = useState('');
  const [extractedData, setExtractedData] = useState<Omit<Authorization, 'id' | 'createdAt'> | null>(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError('');
    setUploadedFileName(file.name);

    try {
      if (file.type.startsWith('image/')) {
        // OCR pour les images
        await processImage(file);
      } else if (file.type === 'application/pdf') {
        // Extraction de texte pour les PDF
        await processPDF(file);
      } else {
        setError('Format de fichier non supporté. Utilisez une image (JPG, PNG) ou un PDF.');
      }
    } catch (err) {
      setError('Erreur lors du traitement du fichier.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processImage = async (file: File) => {
    try {
      const Tesseract = await import('tesseract.js');
      
      const { data: { text: extractedText } } = await Tesseract.recognize(
        file,
        'fra+eng',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              console.log(`Progression OCR: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );

      // Ajouter le texte extrait au texte existant au lieu de le remplacer
      setText(prev => prev ? `${prev}\n\n${extractedText}` : extractedText);
      // Ne pas extraire automatiquement - laisser l'utilisateur ajouter du texte si besoin
    } catch (err) {
      setError('Erreur lors de l\'extraction du texte de l\'image.');
      console.error(err);
    }
  };

  const processPDF = async (file: File) => {
    try {
      // Utiliser PDF.js depuis CDN (plus fiable pour PWA/build)
      const pdfjsLib = (window as any).pdfjsLib;
      
      if (!pdfjsLib) {
        setError('Chargement de PDF.js en cours... Veuillez réessayer dans quelques secondes.');
        return;
      }
      
      // Le worker est déjà configuré dans index.html
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      // Extraire le texte de toutes les pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      // Ajouter le texte extrait au texte existant au lieu de le remplacer
      setText(prev => prev ? `${prev}\n\n${fullText}` : fullText);
      // Ne pas extraire automatiquement - laisser l'utilisateur ajouter du texte si besoin
    } catch (err) {
      setError('Erreur lors de l\'extraction du texte du PDF.');
      console.error(err);
    }
  };

  const extractData = (textToExtract?: string) => {
    const sourceText = textToExtract || text;
    setError('');
    
    // Simple extraction logic - can be enhanced with more sophisticated parsing
    const lines = sourceText.split('\n').map(line => line.trim()).filter(line => line);
    
    try {
      // Detect authorization type
      // Support ASA, OVF (overflight), LND (landing)
      const typeMatch = sourceText.match(/\b(ASA|AEA|OVF.*LND|LND.*OVF|OVF\s*&\s*.*\s*LND|LND\s*&\s*.*\s*OVF|AUTORISATION\s*D['']?EXPLOITATION|EXPLOITATION\s*D['']?AÉRONEF|EXPLOITATION\s*D['']?AERONEF)\b/i);
      if (!typeMatch) {
        setError('Type d\'autorisation non détecté (ASA, OVF/LND)');
        return;
      }
      
      // Check if it's an AEA - not supported for auto-extraction
      const detectedType = typeMatch[1].toUpperCase();
      if (detectedType.includes('EXPLOITATION') || detectedType.includes('AÉRONEF') || detectedType.includes('AERONEF') || detectedType === 'AEA') {
        setError('Les AEA nécessitent une saisie manuelle. Veuillez utiliser le bouton "Ajouter manuellement" pour créer une autorisation AEA.');
        return;
      }
      
      // If OVF or LND detected, it's an ASA
      let type: AuthorizationType = 'ASA';
      if (!detectedType.includes('OVF') && !detectedType.includes('LND') && detectedType !== 'ASA') {
        setError('Type d\'autorisation non supporté. Seules les ASA peuvent être extraites automatiquement.');
        return;
      }

      // Extract authorization number - Enhanced patterns
      // ASA: 2398/OL/ANAC/DG/DTA/SRTA/25
      // AEA: 1601/ANAC/DG/DSA
      let numberMatch = sourceText.match(/(?:n[°o]|number|autorisation|PMT\s*NR|permit\s*nr)[:\s]*([A-Z0-9\-\/]+)/i);
      
      // For AEA, also try to find number in format "1601/ANAC/DG/DSA" without prefix
      if (!numberMatch && type === 'AEA') {
        numberMatch = sourceText.match(/\b(\d{4}\/ANAC\/DG\/[A-Z]+)\b/i);
      }
      
      const number = numberMatch ? numberMatch[1] : '';

      // Extract company name - Enhanced to stop at newline or next field
      const companyMatch = sourceText.match(/(?:compagnie|operator|opérateur|airline)[:\s]*([A-Z][A-Z\s&]+?)(?:\n|AIRCRAFT|TYPE|REGISTRATION|$)/i);
      let company = companyMatch ? companyMatch[1].trim() : '';
      
      // Try narrative format for AEA: "exploité pour le compte de la compagnie JETSTREAM AVIATION CONGO est autorisé"
      if (!company) {
        const narrativeCompanyMatch = sourceText.match(/(?:pour\s+le\s+compte\s+de\s+la\s+compagnie|de\s+la\s+compagnie|compagnie)\s+([A-Z][A-Z\s&]+?)(?:\s+est\s+autorisé|\s+pour|,|\.|\n|$)/i);
        company = narrativeCompanyMatch ? narrativeCompanyMatch[1].trim() : '';
      }

      // Extract aircraft type - Enhanced to handle multiple formats
      // Format 1: "AIRCRAFT TYPE :CL60"
      // Format 2: "de marque et type ERJ170-200STD"
      let aircraftMatch = sourceText.match(/(?:type|aircraft\s*type)[:\s]*([A-Z0-9\-]+)/i);
      if (!aircraftMatch) {
        // Try narrative format: "de marque et type ERJ170-200STD, immatriculé"
        aircraftMatch = sourceText.match(/(?:marque\s*et\s*type|type\s*et\s*marque)\s+([A-Z0-9\-]+)/i);
      }
      const aircraftType = aircraftMatch ? aircraftMatch[1].replace(/,.*/, '').trim() : '';

      // Extract registration - Enhanced to handle multiple formats
      // Format 1: "REGISTRATION :9H-VFA"
      // Format 2: "immatriculé P4-EMB"
      let registrationMatch = sourceText.match(/(?:immatriculation|registration|reg)[:\s]*([A-Z0-9\-]+)/i);
      if (!registrationMatch) {
        // Try narrative format: "immatriculé P4-EMB"
        registrationMatch = sourceText.match(/immatriculé[e]?\s+([A-Z0-9\-]+)/i);
      }
      const registration = registrationMatch ? registrationMatch[1].replace(/\s*(OR|OU)\s*SUB.*/i, '').trim() : '';

      // Extract dates - Enhanced to support multiple formats
      // Supports: DD/MM/YYYY, YYYY-MM-DD, 23NOV 2025, 13 juillet 2025, etc.
      const datePattern = /((\d{1,2}\s+(?:janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)\s+\d{4}))|(\d{1,2}[A-Z]{3}\s*\d{4})|(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})|(\d{4}[-\/]\d{2}[-\/]\d{2})/gi;
      const dates = sourceText.match(datePattern);
      
      let validFrom = '';
      let validTo = '';
      
      if (dates && dates.length >= 2) {
        validFrom = convertToISODate(dates[0]);
        validTo = convertToISODate(dates[dates.length - 1]);
      } else if (dates && dates.length === 1) {
        // If only one date, use it as start date
        validFrom = convertToISODate(dates[0]);
      }

      if (type === 'ASA') {
        // Extract call sign - Enhanced to handle various formats
        const callSignMatch = sourceText.match(/(?:call\s*sign|indicatif|callsign)[:\s]*([A-Z0-9]+)/i);
        const callSign = callSignMatch ? callSignMatch[1] : '';

        // Extract route - Enhanced to detect IATA/ICAO codes in chronological order
        // Look for patterns like: FNLU, FCBB appearing in schedule
        let route = '';
        
        // First try to find "SCHEDULE:" section and extract airports in order
        const scheduleMatch = sourceText.match(/SCHEDULE[:\s]+([\s\S]*?)(?:\n\n\n|PURPOSE|VALIDITY|$)/i);
        if (scheduleMatch) {
          const scheduleText = scheduleMatch[1];
          console.log('🔍 Schedule text found:', scheduleText);
          
          // Split into lines and process each line
          const scheduleLines = scheduleText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          console.log('📄 Schedule lines:', scheduleLines);
          
          // Find lines that contain flight segments (with dash/hyphen and airport codes)
          const flightSegmentLines = scheduleLines.filter(line => {
            // Must contain a dash/hyphen AND at least 2 ICAO codes
            const hasDash = line.includes('-') || line.includes('–') || line.includes('—');
            const airportCodes = line.match(/\b[A-Z]{4}\b/g);
            return hasDash && airportCodes && airportCodes.length >= 2;
          });
          
          console.log('🛫 Flight segment lines:', flightSegmentLines);
          
          const routeAirports: string[] = [];
          
          flightSegmentLines.forEach((line, index) => {
            // Extract all airport codes from the line
            const airports = line.match(/\b[A-Z]{4}\b/g);
            console.log(`  Segment ${index + 1} line: "${line}"`);
            console.log(`  Segment ${index + 1} airports:`, airports);
            
            if (airports && airports.length >= 2) {
              // Take first and last airport code from the line
              // Usually format: CALLSIGN ORIGIN TIME DATE - DESTINATION
              const origin = airports[0];
              const destination = airports[airports.length - 1];
              
              if (routeAirports.length === 0) {
                // First segment: add both origin and destination
                routeAirports.push(origin);
                routeAirports.push(destination);
              } else {
                // Subsequent segments: add only destination
                routeAirports.push(destination);
              }
            }
          });
          
          console.log('📍 Final route airports:', routeAirports);
          
          if (routeAirports.length > 0) {
            route = routeAirports.join(' - ');
          }
        }
        
        console.log('🎯 Final route:', route);
        
        // Fallback to direct pattern matching
        if (!route) {
          const routeMatch = sourceText.match(/(?:route|itinéraire|itineraire)[:\s]*([^\n]+)/i) ||
                            sourceText.match(/([A-Z]{4}\s*[-–]\s*[A-Z]{4}(?:\s*[-–]\s*[A-Z]{4})*)/i);
          route = routeMatch ? routeMatch[1].trim() : '';
        }

        // RÈGLE MÉTIER: Ajouter 3 jours à la date de fin pour les ASA
        if (validTo) {
          const endDate = new Date(validTo);
          endDate.setDate(endDate.getDate() + 3);
          validTo = endDate.toISOString().split('T')[0];
        }

        setExtractedData({
          type: 'ASA',
          number,
          company,
          aircraftType,
          registration,
          callSign,
          route,
          validFrom,
          validTo,
        });
      } else {
        setExtractedData({
          type: 'AEA',
          number,
          company,
          aircraftType,
          registration,
          validFrom,
          validTo,
        });
      }
    } catch (err) {
      setError('Erreur lors de l\'extraction des données. Veuillez vérifier le format du texte.');
      console.error('Extraction error:', err);
    }
  };

  const convertToISODate = (dateStr: string): string => {
    // Try to convert various date formats to ISO format (YYYY-MM-DD)
    const parts = dateStr.split(/[-\/]/);
    
    if (parts.length === 3) {
      // If year is 2 digits, convert to 4 digits
      if (parts[2].length === 2) {
        parts[2] = '20' + parts[2];
      }
      
      // Check if it's DD/MM/YYYY or YYYY/MM/DD
      if (parts[0].length === 4) {
        // YYYY-MM-DD
        return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
      } else {
        // DD-MM-YYYY
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    
    // Handle date format like 23NOV 2025
    const monthMap: { [key: string]: string } = {
      'JAN': '01', 'JANUARY': '01', 'JANVIER': '01',
      'FEB': '02', 'FEBRUARY': '02', 'FEVRIER': '02', 'FÉVRIER': '02',
      'MAR': '03', 'MARCH': '03', 'MARS': '03',
      'APR': '04', 'APRIL': '04', 'AVRIL': '04',
      'MAY': '05', 'MAI': '05',
      'JUN': '06', 'JUNE': '06', 'JUIN': '06',
      'JUL': '07', 'JULY': '07', 'JUILLET': '07',
      'AUG': '08', 'AUGUST': '08', 'AOUT': '08', 'AOÛT': '08',
      'SEP': '09', 'SEPTEMBER': '09', 'SEPTEMBRE': '09',
      'OCT': '10', 'OCTOBER': '10', 'OCTOBRE': '10',
      'NOV': '11', 'NOVEMBER': '11', 'NOVEMBRE': '11',
      'DEC': '12', 'DECEMBER': '12', 'DECEMBRE': '12', 'DÉCEMBRE': '12'
    };
    
    // Format: 23NOV 2025
    let datePattern = /(\d{1,2})([A-Z]{3})\s*(\d{4})/i;
    let dateMatch = dateStr.match(datePattern);
    if (dateMatch) {
      const day = dateMatch[1].padStart(2, '0');
      const month = monthMap[dateMatch[2].toUpperCase()];
      const year = dateMatch[3];
      return `${year}-${month}-${day}`;
    }
    
    // Format: 13 juillet 2025, 11 janvier 2026
    datePattern = /(\d{1,2})\s+([a-zéû]+)\s+(\d{4})/i;
    dateMatch = dateStr.match(datePattern);
    if (dateMatch) {
      const day = dateMatch[1].padStart(2, '0');
      const monthName = dateMatch[2].toUpperCase();
      const month = monthMap[monthName];
      const year = dateMatch[3];
      if (month) {
        return `${year}-${month}-${day}`;
      }
    }
    
    return dateStr;
  };

  const handleSubmit = () => {
    if (extractedData) {
      onExtracted(extractedData);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2>Extraction automatique</h2>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Extraction automatique pour les ASA uniquement.</strong><br />
          Collez le texte du message WhatsApp, ou importez une image/PDF contenant les informations de l'autorisation ASA. 
          L'IA extraira automatiquement les données pertinentes.
        </p>
        <p className="text-xs text-blue-700 mt-2">
          ℹ️ Pour les AEA, veuillez utiliser le bouton "Ajouter manuellement".
        </p>
      </div>

      {/* Info: Combinaison possible */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-amber-800">
          💡 <strong>Astuce :</strong> Vous pouvez combiner les méthodes ! Importez une image/PDF <strong>puis</strong> ajoutez du texte complémentaire dans la zone ci-dessous avant d'extraire.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Importer un fichier</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={isProcessing}
          />
          <label
            htmlFor="file-upload"
            className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isProcessing
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                : 'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                <span className="text-indigo-600">Traitement en cours...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-indigo-600" />
                <span className="text-indigo-600">
                  {uploadedFileName || 'Importer une image ou un PDF'}
                </span>
              </>
            )}
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Formats supportés: JPG, PNG, PDF
        </p>
      </div>

      {/* Text Input Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Ou coller le texte directement</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Collez ici le texte du message WhatsApp contenant les informations de l'autorisation..."
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
          disabled={isProcessing}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {!extractedData ? (
        <button
          onClick={() => extractData()}
          disabled={!text.trim() || isProcessing}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Extraire les données
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 mb-3">Données extraites avec succès !</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">{extractedData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro:</span>
                <span className="text-gray-900">{extractedData.number || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Compagnie:</span>
                <span className="text-gray-900">{extractedData.company || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type d'aéronef:</span>
                <span className="text-gray-900">{extractedData.aircraftType || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Immatriculation:</span>
                <span className="text-gray-900">{extractedData.registration || '-'}</span>
              </div>
              {extractedData.type === 'ASA' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Call Sign:</span>
                    <span className="text-gray-900">{extractedData.callSign || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Itinéraire:</span>
                    <span className="text-gray-900">{extractedData.route || '-'}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Période:</span>
                <span className="text-gray-900">
                  {extractedData.validFrom && extractedData.validTo
                    ? `${new Date(extractedData.validFrom).toLocaleDateString('fr-FR')} - ${new Date(extractedData.validTo).toLocaleDateString('fr-FR')}`
                    : '-'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setExtractedData(null);
                setError('');
                setText('');
                setUploadedFileName('');
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Réessayer
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}