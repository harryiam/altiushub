import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import './InvoiceForm.css'; // Import the CSS file

const InvoiceForm = () => {
  const initialValues = {
    Date: '',
    InvoiceNumber: '',
    CustomerName: '',
    BillingAddress: '',
    ShippingAddress: '',
    GSTIN: '',
    Items: [],
    BillSundrys: [],
    TotalAmount: ''
  };

  const handleSubmit = (values) => {
    console.log(values);
    window.location.href = '/';
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div className="form-container">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label className="form-label" htmlFor="Date">Date:</label>
              <Field className="form-input" id="Date" name="Date" type="date" />
            </div>

            <div className="form-array">
              <h2>Items</h2>
              <FieldArray name="Items">
                {({ push, remove }) => (
                  <div>
                    {values.Items.map((item, index) => (
                      <div key={index} className="form-array-item">
                        <Field name={`Items[${index}]`} className="form-input" />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>Add Item</button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="form-array">
              <h2>Bill Sundrys</h2>
              <FieldArray name="BillSundrys">
                {({ push, remove }) => (
                  <div>
                    {values.BillSundrys.map((item, index) => (
                      <div key={index} className="form-array-item">
                        <Field name={`BillSundrys[${index}]`} className="form-input" />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>Add Bill Sundry</button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="TotalAmount">Total Amount:</label>
              <Field className="form-input" id="TotalAmount" name="TotalAmount" type="number" />
            </div>

            <div className="button-group">
              <button className="submit-button" type="submit">Submit</button>
              <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvoiceForm;
