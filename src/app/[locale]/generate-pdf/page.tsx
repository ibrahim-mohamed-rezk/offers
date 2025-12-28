"use client";

import { useState, useEffect } from "react";
import { Client, UnitType } from "@/types/client-data";
import apartmentsData from "@/libs/data/apartments_data.json";
import customersData from "@/libs/data/customers_data.json";
import officesData from "@/libs/data/offices_data.json";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function GeneratePDFPage() {
  const [unitType, setUnitType] = useState<UnitType>("commercial");
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [generating, setGenerating] = useState<string | null>(null);
  
  // Bulk generation state
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalToGenerate, setTotalToGenerate] = useState(0);

  useEffect(() => {
    // Load clients based on selected unit type
    switch (unitType) {
      case "residential":
        setClients(apartmentsData.العملاء);
        break;
      case "commercial":
        setClients(customersData.العملاء);
        break;
      case "administrative":
        setClients(officesData.العملاء);
        break;
    }
  }, [unitType]);

  const filteredClients = clients.filter((client) =>
    client.اسم_العميل.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDFBlob = async (clientName: string): Promise<Blob | null> => {
    try {
      const pageMap = {
        residential: "residentialUnit",
        commercial: "commercialUnit",
        administrative: "AdministrativeUnit",
      };
      
      const targetUrl = `${window.location.origin}/en/${pageMap[unitType]}?client=${encodeURIComponent(clientName)}`;
      
      const response = await fetch(
        `/api/pdf?url=${encodeURIComponent(targetUrl)}`
      );
      
      if (response.ok) {
        return await response.blob();
      }
    } catch (error) {
      console.error(`Error generating PDF for ${clientName}:`, error);
    }
    return null;
  };

  const handleGeneratePDF = async (clientName: string) => {
    setGenerating(clientName);
    const blob = await generatePDFBlob(clientName);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${clientName}-offer.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert("Failed to generate PDF");
    }
    setGenerating(null);
  };

  const handleGenerateAll = async () => {
    if (filteredClients.length === 0) return;
    
    setIsGeneratingAll(true);
    setTotalToGenerate(filteredClients.length);
    setProgress(0);
    
    const zip = new JSZip();
    
    for (let i = 0; i < filteredClients.length; i++) {
      const client = filteredClients[i];
      const blob = await generatePDFBlob(client.اسم_العميل);
      
      if (blob) {
        zip.file(`${client.اسم_العميل}-offer.pdf`, blob);
      }
      
      setProgress(i + 1);
    }
    
    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${unitType}-offers.zip`);
    } catch (error) {
      console.error("Error generating ZIP:", error);
      alert("Error generating ZIP file");
    } finally {
      setIsGeneratingAll(false);
      setProgress(0);
      setTotalToGenerate(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Generate Client PDFs
        </h1>

        {/* Unit Type Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Unit Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setUnitType("residential")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                unitType === "residential"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Residential ({apartmentsData.عدد_العملاء})
            </button>
            <button
              onClick={() => setUnitType("commercial")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                unitType === "commercial"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Commercial ({customersData.عدد_العملاء})
            </button>
            <button
              onClick={() => setUnitType("administrative")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                unitType === "administrative"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Administrative ({officesData.عدد_العملاء})
            </button>
          </div>
        </div>

        {/* Search and Bulk Action */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
            <div className="w-full md:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search Clients
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter client name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleGenerateAll}
              disabled={isGeneratingAll || filteredClients.length === 0}
              className={`w-full md:w-auto px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                isGeneratingAll || filteredClients.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isGeneratingAll ? "Generating ZIP..." : "Download All as ZIP"}
            </button>
          </div>

          {/* Progress Bar */}
          {isGeneratingAll && (
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Generating PDFs...</span>
                <span>{progress} / {totalToGenerate}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(progress / totalToGenerate) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Client List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Clients ({filteredClients.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredClients.map((client, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {client.اسم_العميل}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {client.الوحدات.length} unit(s)
                  </p>
                </div>
                <button
                  onClick={() => handleGeneratePDF(client.اسم_العميل)}
                  disabled={generating === client.اسم_العميل || isGeneratingAll}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    generating === client.اسم_العميل || isGeneratingAll
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {generating === client.اسم_العميل
                    ? "Generating..."
                    : "Generate PDF"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
