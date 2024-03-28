import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';
import InvoiceForm from '../InvoiceForm/InvoiceForm'; 

const ListViewComponent = () => {

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); 
  const [showAddForm, setShowAddForm] = useState(false); 

  const invoices = [
    { id: 1, invoiceNumber: 'INV001', amount: 100 },
    { id: 2, invoiceNumber: 'INV002', amount: 200 },
    { id: 3, invoiceNumber: 'INV003', amount: 150 },
    { id: 4, invoiceNumber: 'INV004', amount: 250 },
    { id: 5, invoiceNumber: 'INV005', amount: 180 },
    { id: 6, invoiceNumber: 'INV006', amount: 300 },
    { id: 7, invoiceNumber: 'INV007', amount: 220 },
    { id: 8, invoiceNumber: 'INV008', amount: 180 },
    { id: 9, invoiceNumber: 'INV009', amount: 350 },
    { id: 10, invoiceNumber: 'INV010', amount: 400 },
  ];

  // Pagination handlers
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate pagination indexes
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div>
      {/* Show add button or add form based on state */}
      {showAddForm ? (
        <div>
          <InvoiceForm onCancel={() => setShowAddForm(false)} />
        </div>
      ) : (
        <div>
          <Button onClick={() => setShowAddForm(true)} variant="contained" color="primary">Add</Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Number</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.slice(startIndex, endIndex).map((invoice) => (
                  <TableRow key={invoice.id} component={Link} to={`/invoice-detail/${invoice.id}`}>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={Math.ceil(invoices.length / rowsPerPage)} page={page} onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default ListViewComponent;
