import React from 'react';

const LoanForm = () => {
  return (
    <div className="mb-4">
      <h3>Apply for Loan</h3>
      <form>
        <div className="form-group">
          <label>Loan Amount</label>
          <input type="number" className="form-control" placeholder="Enter amount" />
        </div>
        <div className="form-group">
          <label>Loan Purpose</label>
          <input type="text" className="form-control" placeholder="Purpose of the loan" />
        </div>
        <button type="submit" className="btn btn-primary">Apply</button>
      </form>
    </div>
  );
};

export default LoanForm;