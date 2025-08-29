import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { GraphUp } from 'react-bootstrap-icons'; // Replaced TrendingUp with GraphUp
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
  return <GraphUp className="h-4 w-4 text-primary" />;
}

// Transaction color mapping
function getTransactionColor(type) {
  return 'text-primary';
}

function Shares() {
  // Mock user authentication
  const isAuthenticated = true; // Change to false to test unauthenticated state

  // Mock shares data
  const mockSharesData = {
    totalShares: 2000,
    shareTransactions: [
      {
        _id: '1',
        transactionType: 'purchase',
        description: 'Purchased 100 Shares',
        amount: 1000,
        date: new Date(),
      },
      {
        _id: '2',
        transactionType: 'dividend',
        description: 'Dividend Payment',
        amount: 200,
        date: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
  };

  // State for purchase shares form
  const [shareAmount, setShareAmount] = useState('');

  const handlePurchaseShares = (e) => {
    e.preventDefault();
    // Simulate purchasing shares
    alert(`Shares purchased: ${formatCurrency(shareAmount)}`);
    setShareAmount('');
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <GraphUp size={48} className="text-warning mb-3" /> {/* Replaced TrendingUp */}
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your shares.</p>
        <Button href="/" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div className="my-4">
        {/* Header */}
        <h1 className="display-6 fw-bold mb-4">Shares</h1>

        {/* Shares Overview */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Shares Overview</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="fw-medium mb-1">Total Shares Value</p>
                <p className="text-muted small">+5.2% annual return</p>
              </div>
              <div className="text-end">
                <p className="fw-bold mb-1">{formatCurrency(mockSharesData.totalShares)}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Purchase Shares */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Purchase Shares</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handlePurchaseShares}>
              <Form.Group className="mb-3">
                <Form.Label>Amount (KES)</Form.Label>
                <Form.Control
                  type="number"
                  value={shareAmount}
                  onChange={(e) => setShareAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Purchase Shares
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Recent Share Transactions */}
        <Card>
          <Card.Header>
            <Card.Title as="h5">Recent Share Transactions</Card.Title>
          </Card.Header>
          <Card.Body>
            {mockSharesData.shareTransactions.length > 0 ? (
              <div>
                {mockSharesData.shareTransactions.map((transaction) => (
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
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <GraphUp size={32} className="mb-3" /> {/* Replaced TrendingUp */}
                <h3 className="mb-2">No Share Transactions</h3>
                <p className="text-muted mb-0">Your share transactions will appear here.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Shares;