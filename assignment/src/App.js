import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListViewComponent from './InvoiceList/ListViewComponent';
import InvoiceDetailComponent from './InvoiceDetail/InvoiceDetailComponent';
import './App.css';
class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="heading" style={{ color: 'blue' }}>Altius Hub</h1>
          <div className="sidebar">
            <Link to="/invoices">Invoices</Link>
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/invoices" element={<ListViewComponent />} />
              <Route path="/invoice-detail/:id" element={<InvoiceDetailComponent />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default AppComponent;
