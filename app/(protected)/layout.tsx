"use client";
import React, { useState } from "react";
import { LogOut, CheckCircle, UserPlus } from "lucide-react"; // Importer les icônes nécessaires
import CompetencesMatched from "@/components/CompetencesMatched";
import AdhesionRequest from "@/components/AdhesionRequest";
import SearchBar from "@/components/SearchBar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [activeSection, setActiveSection] = useState<
        "competences" | "adhesion"
    >("competences");

    return (
        <div className="flex h-screen">
            <aside className="w-[20rem] bg-white flex-shrink-0 p-2 flex flex-col justify-between overflow-y-auto">
                <div>
                    <h2 className="text-base font-bold mb-4">SHARY</h2>

                    <div className="flex space-x-2 mb-4">
                        <div
                            onClick={() => setActiveSection("competences")}
                            className={`flex items-center justify-center flex-1 p-2 cursor-pointer text-sm ${
                                activeSection === "competences"
                                    ? "border-b-4 border-gray-500"
                                    : "border-b-4 border-transparent text-gray-400"
                            }`}
                        >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Compétences
                        </div>
                        <div
                            onClick={() => setActiveSection("adhesion")}
                            className={`flex items-center justify-center flex-1 p-2 cursor-pointer text-sm ${
                                activeSection === "adhesion"
                                    ? "border-b-4 border-gray-500"
                                    : "border-b-4 border-transparent text-gray-400"
                            }`}
                        >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Adhésion
                        </div>
                    </div>

                    <div className="text-sm">
                        {activeSection === "competences" && (
                            <CompetencesMatched />
                        )}
                        {activeSection === "adhesion" && <AdhesionRequest />}
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => console.log("Logout")}
                        className="w-full flex items-center text-left p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
               
                <div className="flex justify-center mb-4">
                    <SearchBar />
                </div>
             
                {children}
            </main>
        </div>
    );
};

export default ProtectedLayout;
