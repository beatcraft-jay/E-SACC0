import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { CreditCard, ArrowDownLeft, ArrowUpRight } from 'react-bootstrap-icons';
import { format } from 'date-fns';

// Format currency for Ugandan Shillings
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'USH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Transaction icon mapping
function getTransactionIcon(type) {
  switch (type) {
    case 'loan_disbursement':
      return <CreditCard className="h-4 w-4 text-primary" />;
    case 'loan_repayment':
      return <ArrowDownLeft className="h-4 w-4 text-warning" />;
    default:
      return <ArrowUpRight className="h-4 w-4 text-success" />;
  }
}

// Transaction color mapping
function getTransactionColor(type) {
  switch (type) {
    case 'loan_disbursement':
      return 'text-primary';
    case 'loan_repayment':
      return 'text-warning';
    default:
      return 'text-success';
  }
}

// Placeholder for AppLayout (consistent with Dashboard.jsx)
function AppLayout({ children }) {
  return <div className="container py-4">{children}</div>;
}

function Loans() {
  // Mock user authentication
  const isAuthenticated = true; // Change to false to test unauthenticated state

  // Mock loan data
  const mockLoansData = {
    activeLoans: [
      {
        _id: '1',
        amount: 5000,
        purpose: 'Business Expansion',
        status: 'active',
        repaymentDue: '2025-12-01',
      },
      {
        _id: '2',
        amount: 3000,
        purpose: 'Personal Use',
        status: 'pending',
        repaymentDue: '2026-01-15',
      },
    ],
    loanTransactions: [
      {
        _id: '1',
        transactionType: 'loan_disbursement',
        description: 'Business Loan Disbursed',
        amount: 5000,
        date: new Date(),
      },
      {
        _id: '2',
        transactionType: 'loan_repayment',
        description: 'Monthly Repayment',
        amount: 500,
        date: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
  };

  // State for loan application form
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');

  const handleApplyLoan = (e) => {
    e.preventDefault();
    // Simulate loan application (mock action)
    alert(`Loan application submitted: ${formatCurrency(loanAmount)} for ${loanPurpose}`);
    setLoanAmount('');
    setLoanPurpose('');
  };

  if (!isAuthenticated) {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '24rem' }}>
          <div className="text-center">
            <h3 className="mb-2">Sign In Required</h3>
            <p className="text-muted">Please sign in to view your loans.</p>
          </div>
        </div>
    );
  }

  return (
      <div className="my-4">
        {/* Header */}
        <h1 className="display-6 fw-bold mb-4">Loans</h1>

        {/* Loan Application Form */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Apply for a Loan</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleApplyLoan}>
              <Form.Group className="mb-3">
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter amount (USH)"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  type="text"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="e.g., Business, Personal"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Apply Now
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Active Loans */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Active Loans</Card.Title>
          </Card.Header>
          <Card.Body>
            {mockLoansData.activeLoans.length > 0 ? (
              <div>
                {mockLoansData.activeLoans.map((loan) => (
                  <div
                    key={loan._id}
                    className="d-flex align-items-center justify-content-between p-3 border rounded mb-3"
                  >
                    <div>
                      <p className="fw-medium mb-1">{loan.purpose}</p>
                      <p className="text-muted small">Due: {loan.repaymentDue}</p>
                    </div>
                    <div className="text-end">
                      <p className="fw-bold mb-1">{formatCurrency(loan.amount)}</p>
                      <span className={`badge ${loan.status === 'active' ? 'bg-primary' : 'bg-secondary'}`}>
                        {loan.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <CreditCard size={32} className="mb-3" />
                <h3 className="mb-2">No Active Loans</h3>
                <p className="text-muted mb-0">Apply for a loan to get started.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Loan Transactions */}
        <Card>
          <Card.Header>
            <Card.Title as="h5">Recent Loan Transactions</Card.Title>
          </Card.Header>
          <Card.Body>
            {mockLoansData.loanTransactions.length > 0 ? (
              <div>
                {mockLoansData.loanTransactions.map((transaction) => (
                  <div key={transaction._id} className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-light p-2">
                      {getTransactionIcon(transaction.transactionType)}
                    </div>
                    <div className="flex-grow-1">
                      <p className="fw-medium mb-1">{transaction.description}</p>
                      <p className="text-muted small">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className={`fw-bold ${getTransactionColor(transaction.transactionType)}`}>
                      {transaction.transactionType === 'loan_disbursement' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <CreditCard size={32} className="mb-3" />
                <h3 className="mb-2">No Transactions</h3>
                <p className="text-muted mb-0">Your loan transactions will appear here.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Loans;