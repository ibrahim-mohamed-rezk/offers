"use client";

import React, { useState } from "react";
import { Printer, Loader2 } from "lucide-react";

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PrintButton: React.FC<PrintButtonProps> = ({ contentRef }) => {
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    try {
      setLoading(true);
      const currentUrl = window.location.href;
      // Construct the API URL
      const apiUrl = `/api/pdf?url=${encodeURIComponent(currentUrl)}`;
      
      // Trigger download
      window.open(apiUrl, '_blank');
    } catch (error) {
      console.error("Failed to trigger PDF download", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePrint}
      disabled={loading}
      className="fixed bottom-8 right-8 z-[9999] bg-[#ffcf57] hover:bg-[#ffb000] text-[#444] p-4 rounded-full shadow-lg transition-all duration-300 print:hidden flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      title="Export as PDF"
      aria-label="Export as PDF"
    >
      {loading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <Printer size={24} />
      )}
      <span className="sr-only">Export as PDF</span>
    </button>
  );
};

export default PrintButton;
