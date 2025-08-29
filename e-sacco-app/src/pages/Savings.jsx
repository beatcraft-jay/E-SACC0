import { useState } from 'react';
import { Button, Card, Form, Modal, Row, Col } from 'react-bootstrap';
import { PiggyBank, ArrowUpRight, ArrowDownLeft, Phone, Building } from 'react-bootstrap-icons';
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
  const isAuthenticated = true;

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
        date: new Date(Date.now() - 86400000),
      },
    ],
  };

  // State for new savings account form
  const [accountName, setAccountName] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('MTN');
  const [transactionType, setTransactionType] = useState('deposit');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    alert(`Savings account created: ${accountName}`);
    setAccountName('');
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    alert(`Deposit of ${formatCurrency(amount)} to ${selectedAccount} initiated via ${network} (${phoneNumber})`);
    setShowDepositModal(false);
    setAmount('');
    setPhoneNumber('');
    setSelectedAccount('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(`Withdrawal of ${formatCurrency(amount)} from ${selectedAccount} to ${network} (${phoneNumber}) initiated`);
    setShowWithdrawModal(false);
    setAmount('');
    setPhoneNumber('');
    setSelectedAccount('');
  };

  const openDepositModal = () => {
    setTransactionType('deposit');
    setShowDepositModal(true);
  };

  const openWithdrawModal = () => {
    setTransactionType('withdrawal');
    setShowWithdrawModal(true);
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
    <div className="my-4">
      {/* Header */}
      <h1 className="display-6 fw-bold mb-4">Savings</h1>

      {/* Action Buttons */}
      <Card className="mb-4">
        <Card.Header>
          <Card.Title as="h5">Quick Actions</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Button 
                variant="success" 
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                onClick={openDepositModal}
              >
                <ArrowUpRight size={20} />
                <span>Add Money to Savings</span>
              </Button>
            </Col>
            <Col md={6}>
              <Button 
                variant="outline-danger" 
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                onClick={openWithdrawModal}
              >
                <ArrowDownLeft size={20} />
                <span>Withdraw Money</span>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

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
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title as="h5" className="mb-0">Your Savings Accounts</Card.Title>
          <div>
            <Button variant="outline-primary" size="sm" className="me-2" onClick={openDepositModal}>
              Add Money
            </Button>
            <Button variant="outline-danger" size="sm" onClick={openWithdrawModal}>
              Withdraw
            </Button>
          </div>
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
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
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

      {/* Deposit Modal */}
      <Modal show={showDepositModal} onHide={() => setShowDepositModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Money to Savings</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDeposit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Select Account</Form.Label>
              <Form.Select 
                value={selectedAccount} 
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option value="">Choose account...</option>
                {mockSavingsData.savingsAccounts.map(account => (
                  <option key={account._id} value={account.accountName}>
                    {account.accountName} - {formatCurrency(account.balance)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Mobile Money Network</Form.Label>
              <Form.Select 
                value={network} 
                onChange={(e) => setNetwork(e.target.value)}
                required
              >
                <option value="MTN">MTN Mobile Money</option>
                <option value="Airtel">Airtel Money</option>
                <option value="Africell">Africell Money</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 0771234567"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDepositModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Deposit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Withdrawal Modal */}
      <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Money from Savings</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleWithdraw}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Select Account</Form.Label>
              <Form.Select 
                value={selectedAccount} 
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option value="">Choose account...</option>
                {mockSavingsData.savingsAccounts.map(account => (
                  <option key={account._id} value={account.accountName}>
                    {account.accountName} - {formatCurrency(account.balance)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Mobile Money Network</Form.Label>
              <Form.Select 
                value={network} 
                onChange={(e) => setNetwork(e.target.value)}
                required
              >
                <option value="MTN">MTN Mobile Money</option>
                <option value="Airtel">Airtel Money</option>
                <option value="Africell">Africell Money</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 0771234567"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowWithdrawModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Confirm Withdrawal
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Savings;