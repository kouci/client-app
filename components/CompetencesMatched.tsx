// app/components/CompetencesMatched.tsx
import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react"; // Importer les icônes pour les états

interface Competence {
    name: string;
    author: string;
    startDate: string;
    status: "en-attente" | "en-cours" | "termine";
}

const competences: Competence[] = [
    {
        name: "Développement Frontend",
        author: "Jean Dupont",
        startDate: "2024-01-15",
        status: "en-cours",
    },
    {
        name: "Analyse des Données",
        author: "Marie Curie",
        startDate: "2024-02-10",
        status: "en-attente",
    },
    {
        name: "Conception UI/UX",
        author: "Paul Éluard",
        startDate: "2024-03-05",
        status: "termine",
    },
];

const CompetencesMatched: React.FC = () => {
    const getStatusIcon = (status: Competence["status"]) => {
        switch (status) {
            case "en-attente":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "en-cours":
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            case "termine":
                return <XCircle className="w-5 h-5 text-green-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Compétences Matchées</h2>
            <ul className="space-y-4">
                {competences.map((competence, index) => (
                    <li
                        key={index}
                        className="flex items-start p-4 border rounded-md shadow-sm bg-white"
                    >
                        <div className="flex-shrink-0 mr-4">
                            {getStatusIcon(competence.status)}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                                {competence.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Auteur: {competence.author}
                            </p>
                            <p className="text-sm text-gray-600">
                                Date de début: {competence.startDate}
                            </p>
                            <p className="text-sm text-gray-600">
                                État: {competence.status.replace("-", " ")}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompetencesMatched;
