import React from 'react';

const Transactions = () => {
  return (
    <div>
      <h3>Recent Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>2023-11-01</td>
            <td>Member Deposit</td>
            <td>500,000 UGX</td>
          </tr>
          <tr>
            <td>2023-10-30</td>
            <td>Loan Disbursed</td>
            <td>1,000,000 UGX</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;