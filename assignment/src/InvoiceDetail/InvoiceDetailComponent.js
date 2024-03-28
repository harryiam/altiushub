import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, Button, Grid } from '@mui/material';

const InvoiceDetailView = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(!id);


  const initialInvoice = {
    id: id || '', 
    date: '2024-03-28',
    invoiceNumber: '123456',
    customerName: 'John Doe',
    billingAddress: '123 Main St, Anytown, USA',
    shippingAddress: '456 Elm St, Anytown, USA',
    GSTIN: 'ABC123',
    items: [
      { name: 'Item 1', quantity: 2, price: 50 },
      { name: 'Item 2', quantity: 1, price: 100 }
    ],
    billSundrys: [
      { name: 'Tax', amount: 10 },
      { name: 'Shipping', amount: 20 }
    ],
    totalAmount: 220
  };

  const formik = useFormik({
    initialValues: initialInvoice,
    validate: values => {
      const errors = {};

      if (!values.customerName) {
        errors.customerName = 'Required';
      }
      if (!values.billingAddress) {
        errors.billingAddress = 'Required';
      }
      if (!values.shippingAddress) {
        errors.shippingAddress = 'Required';
      }
      if (!values.GSTIN) {
        errors.GSTIN = 'Required';
      }

      if (values.items) {
        values.items.forEach((item, index) => {
          if (!item.name || !item.quantity || !item.price) {
            errors.items = errors.items || [];
            errors.items[index] = {};
            if (!item.name) errors.items[index].name = 'Required';
            if (!item.quantity) errors.items[index].quantity = 'Required';
            if (!item.price) errors.items[index].price = 'Required';
          }
        });
      }


      if (values.billSundrys) {
        values.billSundrys.forEach((sundry, index) => {
          if (!sundry.name || !sundry.amount) {
            errors.billSundrys = errors.billSundrys || [];
            errors.billSundrys[index] = {};
            if (!sundry.name) errors.billSundrys[index].name = 'Required';
            if (!sundry.amount) errors.billSundrys[index].amount = 'Required';
          }
        });
      }

      return errors;
    },
    onSubmit: values => {
      console.log('Submitted Values:', values);
      setIsEditing(false);
    },
  });

  const handleAddItem = () => {
    formik.setValues({
      ...formik.values,
      items: [...formik.values.items, { name: '', quantity: '', price: '' }]
    });
  };

  const handleAddSundry = () => {
    formik.setValues({
      ...formik.values,
      billSundrys: [...formik.values.billSundrys, { name: '', amount: '' }]
    });
  };

  return (
    <div>
      <h1>{id ? 'Edit Invoice' : 'Create Invoice'}</h1>
      {isEditing ? (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="customerName"
                name="customerName"
                label="Customer Name"
                value={formik.values.customerName}
                onChange={formik.handleChange}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
              />
            </Grid>
            {formik.values.items.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].name`}
                    name={`items[${index}].name`}
                    label="Item Name"
                    value={item.name}
                    onChange={formik.handleChange}
                    error={formik.touched.items && formik.errors.items && formik.errors.items[index]?.name}
                    helperText={formik.touched.items && formik.errors.items && formik.errors.items[index]?.name}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].quantity`}
                    name={`items[${index}].quantity`}
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.items && formik.errors.items && formik.errors.items[index]?.quantity}
                    helperText={formik.touched.items && formik.errors.items && formik.errors.items[index]?.quantity}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    id={`items[${index}].price`}
                    name={`items[${index}].price`}
                    label="Price"
                    type="number"
                    value={item.price}
                    onChange={formik.handleChange}
                    error={formik.touched.items && formik.errors.items && formik.errors.items[index]?.price}
                    helperText={formik.touched.items && formik.errors.items && formik.errors.items[index]?.price}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleAddItem}>Add Item</Button>
            </Grid>
            {/* Bill Sundries */}
            {formik.values.billSundrys.map((sundry, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`billSundrys[${index}].name`}
                    name={`billSundrys[${index}].name`}
                    label="Sundry Name"
                    value={sundry.name}
                    onChange={formik.handleChange}
                    error={formik.touched.billSundrys && formik.errors.billSundrys && formik.errors.billSundrys[index]?.name}
                    helperText={formik.touched.billSundrys && formik.errors.billSundrys && formik.errors.billSundrys[index]?.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={`billSundrys[${index}].amount`}
                    name={`billSundrys[${index}].amount`}
                    label="Amount"
                    type="number"
                    value={sundry.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.billSundrys && formik.errors.billSundrys && formik.errors.billSundrys[index]?.amount}
                    helperText={formik.touched.billSundrys && formik.errors.billSundrys && formik.errors.billSundrys[index]?.amount}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleAddSundry}>Add Sundry</Button>
            </Grid>
            {/* Buttons based on mode */}
            <Grid item xs={12}>
              <Button type="submit">Save</Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              {id && <Button>Delete</Button>}
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>
          <p>ID: {formik.values.id}</p>
          <p>Date: {formik.values.date}</p>
          <p>Invoice Number: {formik.values.invoiceNumber}</p>
          <p>Customer Name: {formik.values.customerName}</p>
          <p>Billing Address: {formik.values.billingAddress}</p>
          <p>Shipping Address: {formik.values.shippingAddress}</p>
          <p>GSTIN: {formik.values.GSTIN}</p>
          <h2>Items</h2>
          <ul>
            {formik.values.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}, Price: {item.price}
              </li>
            ))}
          </ul>
          <h2>Bill Sundries</h2>
          <ul>
            {formik.values.billSundrys.map((sundry, index) => (
              <li key={index}>
                {sundry.name}: {sundry.amount}
              </li>
            ))}
          </ul>
          <p>Total Amount: {formik.values.totalAmount}</p>
          {id && <Button onClick={() => setIsEditing(true)}>Update</Button>}
        </div>
      )}
    </div>
  );
}

export default InvoiceDetailView;
