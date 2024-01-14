// client/src/pages/Invoice.js
import React  from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Invoice({ user, saasUsage }) {


  const generateInvoice = () => {
    const input = document.getElementById('invoice-content');

    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="invoice-container p-6 bg-white rounded-lg shadow-md mx-auto max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">Invoice</h2>
      <div id="invoice-content" className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-gray-700">
          <strong>Customer:</strong> {user.displayName}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>SaaS Usage Details:</strong>
        </p>
        <p className="text-gray-700">Total Users: {saasUsage.totalUsers}</p>
        <p className="text-gray-700">Storage Usage: {saasUsage.storageUsage} GB</p>
        {/* Add more details as needed */}
      </div>
      <button
        className="button bg-indigo-600 text-white py-2 px-4 rounded-full"
        onClick={generateInvoice}
      >
        Generate Invoice
      </button>
    </div>
  );
}

export default Invoice;
