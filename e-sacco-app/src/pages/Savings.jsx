import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { PiggyBank, ArrowUpRight, ArrowDownLeft } from 'react-bootstrap-icons';
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';

// Format currency for Kenyan Shillings
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Transaction icon mapping
function getTransactionIcon(type) {
  switch (type) {
    case 'deposit':
      return <ArrowUpRight className="h-4 w-4 text-success" />;
    case 'withdrawal':
      return <ArrowDownLeft className="h-4 w-4 text-danger" />;
    default:
      return <PiggyBank className="h-4 w-4 text-primary" />;
  }
}

// Transaction color mapping
function getTransactionColor(type) {
  switch (type) {
    case 'deposit':
      return 'text-success';
    case 'withdrawal':
      return 'text-danger';
    default:
      return 'text-primary';
  }
}

function Savings() {
  // Mock user authentication
  const isAuthenticated = true; // Change to false to test unauthenticated state

  // Mock savings data
  const mockSavingsData = {
    savingsAccounts: [
      {
        _id: '1',
        accountName: 'Main Savings',
        accountNumber: 'SA123',
        balance: 8000,
        status: 'active',
      },
      {
        _id: '2',
        accountName: 'Emergency Fund',
        accountNumber: 'SA456',
        balance: 2000,
        status: 'active',
      },
    ],
    recentTransactions: [
      {
        _id: '1',
        transactionType: 'deposit',
        description: 'Monthly Deposit',
        amount: 1000,
        date: new Date(),
      },
      {
        _id: '2',
        transactionType: 'withdrawal',
        description: 'ATM Withdrawal',
        amount: 500,
        date: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
  };

  // State for new savings account form
  const [accountName, setAccountName] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Simulate creating a new account
    alert(`Savings account created: ${accountName}`);
    setAccountName('');
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <PiggyBank size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your savings.</p>
        <Button href="/" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="my-4">
        {/* Header */}
        <h1 className="display-6 fw-bold mb-4">Savings</h1>

        {/* Create Savings Account */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Create New Savings Account</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleCreateAccount}>
              <Form.Group className="mb-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g., Main Savings"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Savings Accounts */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Your Savings Accounts</Card.Title>
          </Card.Header>
          <Card.Body>
            {mockSavingsData.savingsAccounts.length > 0 ? (
              <div>
                {mockSavingsData.savingsAccounts.map((account) => (
                  <div
                    key={account._id}
                    className="d-flex align-items-center justify-content-between p-3 border rounded mb-3"
                  >
                    <div>
                      <p className="fw-medium mb-1">{account.accountName}</p>
                      <p className="text-muted small">{account.accountNumber}</p>
                    </div>
                    <div className="text-end">
                      <p className="fw-bold mb-1">{formatCurrency(account.balance)}</p>
                      <span className={`badge ${account.status === 'active' ? 'bg-primary' : 'bg-secondary'}`}>
                        {account.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <PiggyBank size={32} className="mb-3" />
                <h3 className="mb-2">No Savings Accounts</h3>
                <p className="text-muted mb-0">Create your first savings account to get started.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <Card.Header>
            <Card.Title as="h5">Recent Savings Transactions</Card.Title>
          </Card.Header>
          <Card.Body>
            {mockSavingsData.recentTransactions.length > 0 ? (
              <div>
                {mockSavingsData.recentTransactions.map((transaction) => (
                  <div key={transaction._id} className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-light p-2">
                      {getTransactionIcon(transaction.transactionType)}
                    </div>
                    <div className="flex-grow-1">
                      <p className="fw-medium mb-1">{transaction.description}</p>
                      <p className="text-muted small">
                        {format(transaction.date, 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className={`fw-bold ${getTransactionColor(transaction.transactionType)}`}>
                      {transaction.transactionType === 'deposit' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <PiggyBank size={32} className="mb-3" />
                <h3 className="mb-2">No Transactions</h3>
                <p className="text-muted mb-0">Your savings transactions will appear here.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </AppLayout>
  );
}

export default Savings;