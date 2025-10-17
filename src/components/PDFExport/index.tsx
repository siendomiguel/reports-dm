import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

function PDFExportButton(): JSX.Element {
  const handleExportToPDF = async () => {
    // Dynamic import to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.querySelector('article');

    if (!element) {
      console.error('No article element found to export');
      return;
    }

    const opt = {
      margin: 1,
      filename: `report-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      className={styles.pdfButton}
      onClick={handleExportToPDF}
      aria-label="Export to PDF"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Export to PDF
    </button>
  );
}

export default function PDFExport(): JSX.Element {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <PDFExportButton />}
    </BrowserOnly>
  );
}
