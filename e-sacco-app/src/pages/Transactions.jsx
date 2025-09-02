import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, GraphUp } from 'react-bootstrap-icons'; // Replaced TrendingUp with GraphUp
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';

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
    case 'deposit':
    case 'interest':
      return <ArrowUpRight className="h-4 w-4 text-success" />;
    case 'withdrawal':
    case 'fee':
      return <ArrowDownLeft className="h-4 w-4 text-danger" />;
    case 'loan_disbursement':
      return <CreditCard className="h-4 w-4 text-primary" />;
    case 'loan_repayment':
      return <ArrowDownLeft className="h-4 w-4 text-warning" />;
    case 'share_purchase':
    case 'dividend':
      return <GraphUp className="h-4 w-4 text-primary" />; // Replaced TrendingUp
    default:
      return <Wallet className="h-4 w-4" />;
  }
}

// Transaction color mapping
function getTransactionColor(type) {
  switch (type) {
    case 'deposit':
    case 'interest':
      return 'text-success';
    case 'withdrawal':
    case 'fee':
      return 'text-danger';
    case 'loan_disbursement':
      return 'text-primary';
    case 'loan_repayment':
      return 'text-warning';
    case 'share_purchase':
    case 'dividend':
      return 'text-primary';
    default:
      return 'text-dark';
  }
}

function Transactions() {
  // Mock user authentication
  const isAuthenticated = true; // Change to false to test unauthenticated state

  // Mock transaction data
  const mockTransactions = [
    {
      _id: '1',
      transactionType: 'deposit',
      description: 'Monthly Savings Deposit',
      amount: 1000,
      date: new Date(),
      category: 'savings',
    },
    {
      _id: '2',
      transactionType: 'withdrawal',
      description: 'ATM Withdrawal',
      amount: 500,
      date: new Date(Date.now() - 86400000),
      category: 'savings',
    },
    {
      _id: '3',
      transactionType: 'loan_disbursement',
      description: 'Business Loan Disbursed',
      amount: 5000,
      date: new Date(Date.now() - 2 * 86400000),
      category: 'loans',
    },
    {
      _id: '4',
      transactionType: 'share_purchase',
      description: 'Purchased 100 Shares',
      amount: 1000,
      date: new Date(Date.now() - 3 * 86400000),
      category: 'shares',
    },
  ];

  // State for filtering transactions
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all'
    ? mockTransactions
    : mockTransactions.filter((tx) => tx.category === filter);

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Wallet size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your transactions.</p>
        <Button href="/" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }
  

  return (
      <div>
        {/* Header */}
        <h1 className=" display-6 mb-4">Transactions</h1>

        {/* Filter Transactions */}
        <Card className="shadow main-text mb-4">
          <Card.Header className='shadow'>
            <Card.Title as="h5">Filter Transactions</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Transactions</option>
                <option value="savings">Savings</option>
                <option value="loans">Loans</option>
                <option value="shares">Shares</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Transaction History */}
        <Card className='shadow'>
          <Card.Header className='shadow main-text'>
            <Card.Title as="h5">Transaction History</Card.Title>
          </Card.Header>
          <Card.Body>
            {filteredTransactions.length > 0 ? (
              <div>
                {filteredTransactions.map((transaction) => (
                  <div key={transaction._id} className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-light p-2">
                      {getTransactionIcon(transaction.transactionType)}
                    </div>
                    <div className="flex-grow-1">
                      <p className="main-text fw-medium mb-1">{transaction.description}</p>
                      <p className="small-text small">
                        {format(transaction.date, 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className={`head-text ${getTransactionColor(transaction.transactionType)}`}>
                      {['deposit', 'interest', 'loan_disbursement', 'dividend'].includes(transaction.transactionType) ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <Wallet size={32} className="mb-3" />
                <h3 className="mb-2">No Transactions</h3>
                <p className="text-muted mb-0">Your transaction history will appear here.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Transactions;