// app/components/AdhesionRequest.tsx
import React, { useState } from "react";
import { User, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"; // Importer les icônes nécessaires

interface Request {
  userName: string;
  skillsRequested: string[];
  details: string;

}

const requests: Request[] = [
  {
    userName: "Alice Dupont",
    skillsRequested: ["Développement Backend", "Gestion de base de données"],
    details: "Demande de compétences pour le projet XYZ."
   
  },
  {
    userName: "Bob Martin",
    skillsRequested: ["Analyse de données", "Machine Learning"],
    details: "Compétences requises pour une analyse approfondie des données.",
   
  },
  {
    userName: "Carla Ferrari",
    skillsRequested: ["Conception UI/UX", "Prototypage"],
    details: "Demande pour améliorer l'interface utilisateur de l'application ABC.",
  
  },
];

const handleAccept = (index: number) => {
  console.log(`Demande ${index} acceptée`);
  // Ajouter ici la logique pour accepter la demande
};

const AdhesionRequest: React.FC = () => {
  // État pour afficher ou masquer les détails
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Demande d'Adhésion</h2>
      <ul className="space-y-4">
        {requests.map((request, index) => (
          <li key={index} className="flex flex-col p-4 border rounded-md shadow-sm bg-white">
            <div className="flex-shrink-0 mb-4">
              <button
                onClick={() => handleAccept(index)}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                title="Accepter la demande"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold">{request.userName}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Compétences demandées: {request.skillsRequested.join(", ")}
              </p>
            </div>
            <button
              onClick={() => toggleDetails(index)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {expandedIndex === index ? (
                <>
                  Moins de détails <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Plus de détails <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
            {expandedIndex === index && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Détails: {request.details}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdhesionRequest;
