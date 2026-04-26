import { useState } from 'react';
import { useInventory } from '../../contexts/InventoryContext';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import jsPDF from 'jspdf';

type ReportType = 'inventory' | 'entries' | 'exits' | 'sales';

export function Reports() {
  const { products, movements, sales, getTotalInventoryValue } = useInventory();
  const [reportType, setReportType] = useState<ReportType>('inventory');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    // Header
    doc.setFillColor(58, 58, 58);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('SISTEMA DE INVENTARIO', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text('REFACCIONARIA', pageWidth / 2, 30, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);
    yPos = 50;

    // Date
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${now.toLocaleDateString('es-MX')} ${now.toLocaleTimeString('es-MX')}`, 14, yPos);
    yPos += 10;

    // Report Title
    const reportTitles = {
      inventory: 'REPORTE DE INVENTARIO GENERAL',
      entries: 'REPORTE DE ENTRADAS AL INVENTARIO',
      exits: 'REPORTE DE SALIDAS DEL INVENTARIO',
      sales: 'REPORTE DE VENTAS'
    };

    doc.setFontSize(16);
    doc.setTextColor(255, 87, 34);
    doc.text(reportTitles[reportType], 14, yPos);
    yPos += 3;
    doc.setDrawColor(255, 87, 34);
    doc.setLineWidth(0.5);
    doc.line(14, yPos, pageWidth - 14, yPos);
    yPos += 10;

    // Period info
    if (startDate && endDate && reportType !== 'inventory') {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Período: ${startDate} - ${endDate}`, 14, yPos);
      yPos += 10;
    }

    doc.setTextColor(0, 0, 0);

    switch (reportType) {
      case 'inventory':
        generateInventoryPDF(doc, yPos);
        break;
      case 'entries':
        generateEntriesPDF(doc, yPos);
        break;
      case 'exits':
        generateExitsPDF(doc, yPos);
        break;
      case 'sales':
        generateSalesPDF(doc, yPos);
        break;
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    const reportNames = {
      inventory: 'Inventario',
      entries: 'Entradas',
      exits: 'Salidas',
      sales: 'Ventas'
    };

    doc.save(`Reporte_${reportNames[reportType]}_${now.toISOString().split('T')[0]}.pdf`);
  };

  const generateInventoryPDF = (doc: jsPDF, startY: number) => {
    let yPos = startY;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const totalValue = getTotalInventoryValue();
    const lowStock = products.filter(p => p.cantidad <= p.stockMinimo);

    // Summary Box
    doc.setFillColor(250, 250, 250);
    doc.rect(14, yPos, pageWidth - 28, 30, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, yPos, pageWidth - 28, 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN', 18, yPos + 8);

    doc.setFont('helvetica', 'normal');
    doc.text(`Total de productos: ${products.length}`, 18, yPos + 16);
    doc.text(`Valor total: $${totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, 18, yPos + 22);
    doc.text(`Productos con stock bajo: ${lowStock.length}`, 18, yPos + 28);

    yPos += 40;

    // Products Table Header
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLE DE PRODUCTOS', 14, yPos);
    yPos += 8;

    doc.setFillColor(58, 58, 58);
    doc.rect(14, yPos, pageWidth - 28, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('CÓDIGO', 16, yPos + 5);
    doc.text('NOMBRE', 45, yPos + 5);
    doc.text('CANTIDAD', 110, yPos + 5);
    doc.text('COSTO', 140, yPos + 5);
    doc.text('VALOR', 170, yPos + 5);

    doc.setTextColor(0, 0, 0);
    yPos += 10;

    // Products
    products.forEach((product, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }

      const valorTotal = product.cantidad * product.costo;
      const bgColor = index % 2 === 0 ? 255 : 249;

      doc.setFillColor(bgColor, bgColor, bgColor);
      doc.rect(14, yPos - 2, pageWidth - 28, 10, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(product.codigo, 16, yPos + 4);
      doc.text(product.nombre.substring(0, 30), 45, yPos + 4);

      if (product.cantidad <= product.stockMinimo) {
        doc.setTextColor(255, 87, 34);
        doc.text(`${product.cantidad} ⚠`, 110, yPos + 4);
        doc.setTextColor(0, 0, 0);
      } else {
        doc.text(product.cantidad.toString(), 110, yPos + 4);
      }

      doc.text(`$${product.costo.toFixed(2)}`, 140, yPos + 4);
      doc.text(`$${valorTotal.toFixed(2)}`, 170, yPos + 4);

      yPos += 10;
    });

    // Low Stock Alert
    if (lowStock.length > 0) {
      yPos += 10;
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 87, 34);
      doc.text('⚠ ALERTAS DE STOCK MÍNIMO', 14, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 8;

      lowStock.forEach((product) => {
        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(`• ${product.nombre} (${product.codigo})`, 16, yPos);
        doc.text(`Stock: ${product.cantidad} | Mínimo: ${product.stockMinimo}`, 20, yPos + 5);
        yPos += 12;
      });
    }
  };

  const generateEntriesPDF = (doc: jsPDF, startY: number) => {
    let yPos = startY;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    let filteredMovements = movements.filter(m => m.tipo === 'entrada');
    if (startDate && endDate) {
      filteredMovements = filteredMovements.filter(m => m.fecha >= startDate && m.fecha <= endDate);
    }

    const totalEntries = filteredMovements.reduce((sum, m) => sum + m.cantidad, 0);

    // Summary
    doc.setFillColor(250, 250, 250);
    doc.rect(14, yPos, pageWidth - 28, 20, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, yPos, pageWidth - 28, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN', 18, yPos + 8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de movimientos: ${filteredMovements.length}`, 18, yPos + 14);
    doc.text(`Total de unidades: ${totalEntries}`, 120, yPos + 14);

    yPos += 30;

    // Table Header
    doc.setFillColor(40, 202, 66);
    doc.rect(14, yPos, pageWidth - 28, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('FECHA', 16, yPos + 5);
    doc.text('PRODUCTO', 45, yPos + 5);
    doc.text('CÓDIGO', 110, yPos + 5);
    doc.text('CANT.', 140, yPos + 5);
    doc.text('USUARIO', 165, yPos + 5);

    doc.setTextColor(0, 0, 0);
    yPos += 10;

    // Entries
    filteredMovements.forEach((movement, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }

      const bgColor = index % 2 === 0 ? 255 : 249;
      doc.setFillColor(bgColor, bgColor, bgColor);
      doc.rect(14, yPos - 2, pageWidth - 28, 10, 'F');

      doc.setFontSize(8);
      doc.text(movement.fecha, 16, yPos + 4);
      doc.text(movement.productoNombre.substring(0, 25), 45, yPos + 4);
      doc.text(movement.productoCodigo, 110, yPos + 4);
      doc.text(`+${movement.cantidad}`, 140, yPos + 4);
      doc.text(movement.usuario, 165, yPos + 4);

      yPos += 10;
    });
  };

  const generateExitsPDF = (doc: jsPDF, startY: number) => {
    let yPos = startY;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    let filteredMovements = movements.filter(m => m.tipo === 'salida');
    if (startDate && endDate) {
      filteredMovements = filteredMovements.filter(m => m.fecha >= startDate && m.fecha <= endDate);
    }

    const totalExits = filteredMovements.reduce((sum, m) => sum + m.cantidad, 0);

    // Summary
    doc.setFillColor(250, 250, 250);
    doc.rect(14, yPos, pageWidth - 28, 20, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, yPos, pageWidth - 28, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN', 18, yPos + 8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de movimientos: ${filteredMovements.length}`, 18, yPos + 14);
    doc.text(`Total de unidades: ${totalExits}`, 120, yPos + 14);

    yPos += 30;

    // Table Header
    doc.setFillColor(255, 87, 34);
    doc.rect(14, yPos, pageWidth - 28, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('FECHA', 16, yPos + 5);
    doc.text('PRODUCTO', 45, yPos + 5);
    doc.text('CÓDIGO', 110, yPos + 5);
    doc.text('CANT.', 140, yPos + 5);
    doc.text('USUARIO', 165, yPos + 5);

    doc.setTextColor(0, 0, 0);
    yPos += 10;

    // Exits
    filteredMovements.forEach((movement, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }

      const bgColor = index % 2 === 0 ? 255 : 249;
      doc.setFillColor(bgColor, bgColor, bgColor);
      doc.rect(14, yPos - 2, pageWidth - 28, 10, 'F');

      doc.setFontSize(8);
      doc.text(movement.fecha, 16, yPos + 4);
      doc.text(movement.productoNombre.substring(0, 25), 45, yPos + 4);
      doc.text(movement.productoCodigo, 110, yPos + 4);
      doc.text(`-${movement.cantidad}`, 140, yPos + 4);
      doc.text(movement.usuario, 165, yPos + 4);

      yPos += 10;
    });
  };

  const generateSalesPDF = (doc: jsPDF, startY: number) => {
    let yPos = startY;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    let filteredSales = sales;
    if (startDate && endDate) {
      filteredSales = filteredSales.filter(s => s.fecha >= startDate && s.fecha <= endDate);
    }

    const totalAmount = filteredSales.reduce((sum, s) => sum + s.total, 0);
    const totalUnits = filteredSales.reduce((sum, s) => sum + s.cantidad, 0);

    // Summary
    doc.setFillColor(250, 250, 250);
    doc.rect(14, yPos, pageWidth - 28, 25, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(14, yPos, pageWidth - 28, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN', 18, yPos + 8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de ventas: ${filteredSales.length}`, 18, yPos + 14);
    doc.text(`Total de unidades: ${totalUnits}`, 18, yPos + 20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 202, 66);
    doc.text(`Ingresos totales: $${totalAmount.toFixed(2)}`, 120, yPos + 17);
    doc.setTextColor(0, 0, 0);

    yPos += 35;

    // Table Header
    doc.setFillColor(40, 202, 66);
    doc.rect(14, yPos, pageWidth - 28, 8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('FECHA', 16, yPos + 5);
    doc.text('PRODUCTO', 45, yPos + 5);
    doc.text('CANT.', 100, yPos + 5);
    doc.text('P. UNIT.', 120, yPos + 5);
    doc.text('TOTAL', 150, yPos + 5);
    doc.text('USUARIO', 175, yPos + 5);

    doc.setTextColor(0, 0, 0);
    yPos += 10;

    // Sales
    filteredSales.forEach((sale, index) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }

      const bgColor = index % 2 === 0 ? 255 : 249;
      doc.setFillColor(bgColor, bgColor, bgColor);
      doc.rect(14, yPos - 2, pageWidth - 28, 10, 'F');

      doc.setFontSize(8);
      doc.text(sale.fecha, 16, yPos + 4);
      doc.text(sale.productoNombre.substring(0, 20), 45, yPos + 4);
      doc.text(sale.cantidad.toString(), 100, yPos + 4);
      doc.text(`$${sale.precioUnitario.toFixed(2)}`, 120, yPos + 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`$${sale.total.toFixed(2)}`, 150, yPos + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(sale.usuario, 175, yPos + 4);

      yPos += 10;
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          GENERADOR DE REPORTES
        </h2>
        <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
          Genere reportes profesionales en PDF
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        {/* Report Configuration */}
        <div className="border border-[#ddd] bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            <FileText size={20} />
            CONFIGURACIÓN DEL REPORTE
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Tipo de Reporte
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as ReportType)}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
              >
                <option value="inventory">Inventario General</option>
                <option value="entries">Entradas al Inventario</option>
                <option value="exits">Salidas del Inventario</option>
                <option value="sales">Reporte de Ventas</option>
              </select>
            </div>

            {reportType !== 'inventory' && (
              <>
                <div>
                  <label className="mb-2 flex items-center gap-2 font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                    <Calendar size={14} />
                    Fecha Inicio (Opcional)
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                    <Calendar size={14} />
                    Fecha Fin (Opcional)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                  />
                </div>
              </>
            )}

            <button
              onClick={generatePDF}
              className="flex w-full items-center justify-center gap-2 bg-[#FF5722] px-6 py-4 text-white transition-all hover:bg-[#e64a19]"
              style={{ fontSize: '1rem', fontWeight: 600 }}
            >
              <Download size={20} />
              GENERAR PDF
            </button>
          </div>
        </div>

        {/* Report Preview Info */}
        <div className="border border-[#ddd] bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            <Filter size={20} />
            INFORMACIÓN DEL REPORTE
          </h3>

          {reportType === 'inventory' && (
            <div className="space-y-3">
              <div className="border-l-4 border-[#FF5722] bg-[#fafafa] p-4">
                <p className="mb-2 font-mono uppercase tracking-wider text-[#FF5722]" style={{ fontSize: '0.75rem' }}>
                  Reporte de Inventario General
                </p>
                <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
                  • Lista completa de productos<br />
                  • Valor total del inventario<br />
                  • Alertas de stock mínimo<br />
                  • Información de proveedores
                </p>
              </div>
              <div className="bg-[#fafafa] p-4">
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Total de productos: {products.length}
                </p>
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Valor total: ${getTotalInventoryValue().toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          )}

          {reportType === 'entries' && (
            <div className="space-y-3">
              <div className="border-l-4 border-[#28ca42] bg-[#fafafa] p-4">
                <p className="mb-2 font-mono uppercase tracking-wider text-[#28ca42]" style={{ fontSize: '0.75rem' }}>
                  Reporte de Entradas
                </p>
                <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
                  • Todas las entradas registradas<br />
                  • Fechas y usuarios responsables<br />
                  • Cantidades ingresadas<br />
                  • Motivos de entrada
                </p>
              </div>
              <div className="bg-[#fafafa] p-4">
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Total entradas: {movements.filter(m => m.tipo === 'entrada').length}
                </p>
                {startDate && endDate && (
                  <p style={{ fontSize: '0.85rem' }} className="text-[#666]">
                    Período: {startDate} - {endDate}
                  </p>
                )}
              </div>
            </div>
          )}

          {reportType === 'exits' && (
            <div className="space-y-3">
              <div className="border-l-4 border-[#FF5722] bg-[#fafafa] p-4">
                <p className="mb-2 font-mono uppercase tracking-wider text-[#FF5722]" style={{ fontSize: '0.75rem' }}>
                  Reporte de Salidas
                </p>
                <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
                  • Todas las salidas registradas<br />
                  • Fechas y usuarios responsables<br />
                  • Cantidades retiradas<br />
                  • Motivos de salida
                </p>
              </div>
              <div className="bg-[#fafafa] p-4">
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Total salidas: {movements.filter(m => m.tipo === 'salida').length}
                </p>
                {startDate && endDate && (
                  <p style={{ fontSize: '0.85rem' }} className="text-[#666]">
                    Período: {startDate} - {endDate}
                  </p>
                )}
              </div>
            </div>
          )}

          {reportType === 'sales' && (
            <div className="space-y-3">
              <div className="border-l-4 border-[#28ca42] bg-[#fafafa] p-4">
                <p className="mb-2 font-mono uppercase tracking-wider text-[#28ca42]" style={{ fontSize: '0.75rem' }}>
                  Reporte de Ventas
                </p>
                <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
                  • Historial completo de ventas<br />
                  • Ingresos totales<br />
                  • Productos vendidos<br />
                  • Usuarios que realizaron ventas
                </p>
              </div>
              <div className="bg-[#fafafa] p-4">
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Total ventas: {sales.length}
                </p>
                <p className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  Ingresos: ${sales.reduce((sum, s) => sum + s.total, 0).toFixed(2)}
                </p>
                {startDate && endDate && (
                  <p style={{ fontSize: '0.85rem' }} className="text-[#666]">
                    Período: {startDate} - {endDate}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="border border-[#ddd] bg-[#fafafa] p-6">
        <h4 className="mb-3" style={{ fontSize: '1rem', fontWeight: 600 }}>
          📋 Información sobre Reportes PDF
        </h4>
        <ul className="space-y-2 text-[#666]" style={{ fontSize: '0.9rem' }}>
          <li>• Los reportes se generan en formato PDF profesional con diseño corporativo</li>
          <li>• Incluyen encabezado con logo, fecha de generación y número de páginas</li>
          <li>• Puede filtrar reportes de entradas, salidas y ventas por rango de fechas</li>
          <li>• El reporte de inventario incluye valor total y alertas visuales de stock mínimo</li>
          <li>• Tablas con colores y formato profesional para fácil lectura</li>
        </ul>
      </div>
    </div>
  );
}
