import { useState } from 'react';
import { Button, Card, Form, Modal, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import { BsArrowUpRight, BsCash, BsBook, BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Mock useAuth hook (consistent with Loans.jsx)
function useAuth() {
  return {
    isAuthenticated: true,
  };
}

// Format currency for Ugandan Shillings
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Transaction icon mapping
function getTransactionIcon(type) {
  switch (type) {
    case 'purchase':
      return <BsArrowUpRight className="h-4 w-4 text-primary" />;
    case 'dividend':
      return <BsCash className="h-4 w-4 text-success" />;
    default:
      return <BsArrowUpRight className="h-4 w-4 text-primary" />;
  }
}

// Transaction color mapping
function getTransactionColor(type) {
  switch (type) {
    case 'purchase':
      return 'text-primary';
    case 'dividend':
      return 'text-success';
    default:
      return 'text-primary';
  }
}

// Calculate ownership percentage
function calculateOwnershipPercentage(userShares, totalSaccoShares) {
  return ((userShares / totalSaccoShares) * 100).toFixed(2);
}

// Determine share value trend
function getShareValueTrend(currentValue, previousValue) {
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return {
    percentage: change.toFixed(2),
    isUp: change >= 0,
  };
}

function Shares() {
  const { isAuthenticated } = useAuth();
  const [shareAmount, setShareAmount] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Mock shares data
  const mockSharesData = {
    totalShares: 2000000, // User's total shares value (UGX)
    totalSaccoShares: 1000000000, // Total SACCO shares value (UGX)
    shareTransactions: [
      {
        _id: '1',
        transactionType: 'purchase',
        description: 'Purchased 100 Shares',
        amount: 1000000,
        date: new Date(),
      },
      {
        _id: '2',
        transactionType: 'dividend',
        description: 'Dividend Payment',
        amount: 200000,
        date: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
    // Mock historical share value data (UGX)
    shareValueHistory: [
      { date: new Date(Date.now() - 86400000 * 2), value: 1900000 }, // 2 days ago
      { date: new Date(Date.now() - 86400000), value: 1950000 }, // Yesterday
      { date: new Date(), value: 2000000 }, // Today
    ],
  };

  const handlePurchaseShares = (e) => {
    e.preventDefault();
    const amount = parseFloat(shareAmount);
    if (amount < 10000 || amount > 1000000) {
      alert('Share purchase amount must be between UGX 10,000 and UGX 1,000,000.');
      return;
    }
    alert(`Shares purchased: ${formatCurrency(amount)}`);
    setShareAmount('');
  };

  const handleShowTerms = () => setShowTermsModal(true);
  const handleCloseTerms = () => setShowTermsModal(false);

  // Tooltip render function
  const renderTooltip = (props) => (
    <Tooltip id="share-amount-tooltip" {...props}>
      Amount: UGX 10,000 - UGX 1,000,000<br />
      Share Price: UGX 10,000 per share<br />
      Minimum Purchase: 1 share
    </Tooltip>
  );

  // Calculate ownership percentage
  const ownershipPercentage = calculateOwnershipPercentage(
    mockSharesData.totalShares,
    mockSharesData.totalSaccoShares
  );

  // Calculate share value trend (compare latest two values)
  const latestValue = mockSharesData.shareValueHistory[mockSharesData.shareValueHistory.length - 1].value;
  const previousValue = mockSharesData.shareValueHistory[mockSharesData.shareValueHistory.length - 2].value;
  const { percentage: trendPercentage, isUp } = getShareValueTrend(latestValue, previousValue);

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <BsArrowUpRight size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your shares.</p>
        <Button as={Link} to="/signin" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="display-6 mb-4">Shares</h1>

      {/* Shares Overview */}
      <Card className="main-text shadow mb-4">
        <Card.Header className="shadow">
          <Card.Title as="h5">Shares Overview</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <p className="main-text fw-medium mb-1">Total Shares Value</p>
              <p className=" small">+5.2% annual return</p>
            </div>
            <div className="text-end">
              <p className="head-text mb-1">{formatCurrency(mockSharesData.totalShares)}</p>
              <p className="small d-flex align-items-center justify-content-end">
                {isUp ? (
                  <BsArrowUp className="me-1 text-success" />
                ) : (
                  <BsArrowDown className="me-1 text-danger" />
                )}
                {Math.abs(trendPercentage)}% {isUp ? 'increase' : 'decrease'} (last day)
              </p>
            </div>
          </div>
          <div>
            <p className="main-text fw-medium mb-1">Your Ownership in SACCO</p>
            <ProgressBar
              now={ownershipPercentage}
              label={`${ownershipPercentage}%`}
              variant="primary"
              className="mb-2"
            />
            <p className="small">
              You own {ownershipPercentage}% of the SACCO's total shares.
            </p>
          </div>
        </Card.Body>
      </Card>

      {/* Purchase Shares */}
      <Card className="main-text shadow mb-4">
        <Card.Header className="shadow">
          <Card.Title as="h5">Purchase Shares</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handlePurchaseShares}>
            <Form.Group className="mb-3">
              <Form.Label>Amount (UGX)</Form.Label>
              <OverlayTrigger placement="right" overlay={renderTooltip}>
                <Form.Control
                  type="number"
                  value={shareAmount}
                  onChange={(e) => setShareAmount(e.target.value)}
                  placeholder="Enter amount (UGX)"
                  required
                  min="10000"
                  max="1000000"
                />
              </OverlayTrigger>
            </Form.Group>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Button variant="primary" type="submit">
                Purchase Shares
              </Button>
              <Button variant="link" onClick={handleShowTerms}>
                <BsBook size={16} className="me-1" />
                Terms and Conditions
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Terms and Conditions Modal */}
      <Modal className="main-text shadow" show={showTermsModal} onHide={handleCloseTerms} centered>
        <Modal.Header className="bg" closeButton>
          <Modal.Title>Share Purchase Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>1. Share Price</h5>
          <p>Each share is priced at UGX 10,000, with a minimum purchase of 1 share.</p>
          <h5>2. Purchase Limits</h5>
          <p>Share purchases must be between UGX 10,000 and UGX 1,000,000 per transaction.</p>
          <h5>3. Dividends</h5>
          <p>Dividends are paid annually based on SACCO performance, typically at 5-7% of share value.</p>
          <h5>4. Withdrawal</h5>
          <p>Shares can be withdrawn after a 6-month lock-in period, subject to SACCO approval.</p>
          <h5>5. Fees</h5>
          <p>A non-refundable processing fee of UGX 5,000 is charged per purchase transaction.</p>
          <h5>6. Risks</h5>
          <p>Share value may fluctuate based on SACCO performance. Investments are subject to market risks.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTerms}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Recent Share Transactions */}
      <Card className="main-text shadow">
        <Card.Header className="shadow">
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
                    <p className="main-text fw-medium mb-1">{transaction.description}</p>
                    <p className="small">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className={`head-text ${getTransactionColor(transaction.transactionType)}`}>
                    {transaction.transactionType === 'purchase' ? '+' : ''}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="main-text d-flex flex-column align-items-center justify-content-center min-h-200px">
              <BsArrowUpRight size={32} className="mb-3" />
              <h3 className="mb-2">No Share Transactions</h3>
              <p className="mb-0">Your share transactions will appear here.</p>
            </div>
          )}
        </Card.Body>
      </Card>
      <Footer/>
    </div>
  );
}

export default Shares;