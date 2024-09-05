// app/components/SearchBar.tsx
import React from "react";
import { Search } from "lucide-react"; // Importer l'icône de recherche depuis lucide-react
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const SearchBar: React.FC = () => {
    return (
        <div className="flex items-center rounded-md bg-white w-2/3">
            <Input
                type="text"
                placeholder="compétences, catégories..."
                className="flex-1 p-2 border-transparent outline-none text-gray-800 focus:border-transparent focus:ring-0"
            />
            <Button className="p-2 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md transition-colors">
                <Search className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default SearchBar;
