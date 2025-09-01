import { useState } from 'react';
import { Button, Card, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsCreditCard, BsArrowDownLeft, BsArrowUpRight, BsBook } from 'react-icons/bs';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';

// Mock useAuth hook
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
    case 'loan_disbursement':
      return <BsCreditCard className="h-4 w-4 text-primary" />;
    case 'loan_repayment':
      return <BsArrowDownLeft className="h-4 w-4 text-warning" />;
    default:
      return <BsArrowUpRight className="h-4 w-4 text-success" />;
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

function Loans() {
  const { isAuthenticated } = useAuth();
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanType, setLoanType] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Mock loan data
  const mockLoansData = {
    activeLoans: [
      {
        _id: '1',
        amount: 5000000,
        purpose: 'Business Expansion',
        status: 'active',
        repaymentDue: '2025-12-01',
      },
      {
        _id: '2',
        amount: 3000000,
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
        amount: 5000000,
        date: new Date(),
      },
      {
        _id: '2',
        transactionType: 'loan_repayment',
        description: 'Monthly Repayment',
        amount: 500000,
        date: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
  };

  const handleApplyLoan = (e) => {
    e.preventDefault();
    alert(`Loan application submitted: ${formatCurrency(loanAmount)} for ${loanPurpose} (${loanType})`);
    setLoanAmount('');
    setLoanPurpose('');
    setLoanType('');
  };

  const handleShowTerms = () => setShowTermsModal(true);
  const handleCloseTerms = () => setShowTermsModal(false);

  // Tooltip render functions
  const renderTooltip = (props, content) => (
    <Tooltip id="loan-type-tooltip" {...props}>
      {content}
    </Tooltip>
  );

  if (!isAuthenticated) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <BsCreditCard size={48} className="text-warning mb-3" />
          <h3 className="mb-2">Sign In Required</h3>
          <p className="text-muted mb-4">Please sign in to view your loans.</p>
          <Button as={Link} to="/signin" variant="primary" size="lg">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div>
        {/* Header */}
        <h1 className="display-6 mb-4">Loans</h1>

        {/* Loan Application Form */}
        <Card className="main-text shadow mb-4">
          <Card.Header className="shadow">
            <Card.Title as="h5">Apply for a Loan</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleApplyLoan}>
            <Form.Group className="mb-3">
                <Form.Label>Loan Type</Form.Label>
                <div className="d-flex flex-column gap-2">
                  <OverlayTrigger
                    placement="right"
                    overlay={(props) =>
                      renderTooltip(
                        props,
                        'Amount: UGX 100,000 - UGX 1,000,000\nRepayment: Up to 12 months'
                      )
                    }
                  >
                    <Form.Check
                      type="radio"
                      label="Emergency Loan (2-3% per month, up to 12 months)"
                      name="loanType"
                      value="Emergency"
                      checked={loanType === 'Emergency'}
                      onChange={(e) => setLoanType(e.target.value)}
                      required
                    />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="right"
                    overlay={(props) =>
                      renderTooltip(
                        props,
                        'Amount: UGX 500,000 - UGX 10,000,000\nRepayment: Up to 24 months'
                      )
                    }
                  >
                    <Form.Check
                      type="radio"
                      label="Business Loan (1.5-2.5% per month, up to 24 months)"
                      name="loanType"
                      value="Business"
                      checked={loanType === 'Business'}
                      onChange={(e) => setLoanType(e.target.value)}
                      required
                    />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="right"
                    overlay={(props) =>
                      renderTooltip(
                        props,
                        'Amount: UGX 1,000,000 - UGX 20,000,000\nRepayment: Up to 36 months'
                      )
                    }
                  >
                    <Form.Check
                      type="radio"
                      label="Development Loan (1-2% per month, up to 36 months)"
                      name="loanType"
                      value="Development"
                      checked={loanType === 'Development'}
                      onChange={(e) => setLoanType(e.target.value)}
                      required
                    />
                  </OverlayTrigger>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter amount (UGX)"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purpose</Form.Label>
                <Form.Control
                  type="text"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder="e.g., Business Expansion, Personal Use"
                  required
                />
              </Form.Group>
              
              <div className="d-flex align-items-center gap-2 mb-3">
                <Button variant="primary" type="submit">
                  Apply Now
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
        <Modal className="main-text" show={showTermsModal} onHide={handleCloseTerms} centered>
          <Modal.Header className="bg shadow" closeButton>
            <Modal.Title>Loan Terms and Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>1. Loan Repayment Period</h5>
            <p>
              Loans must be repaid within the agreed period, ranging from 6 to 36 months, depending on the loan type and amount. Short-term loans (e.g., emergency loans) have a maximum repayment period of 12 months, while long-term loans (e.g., business or development loans) may extend up to 36 months.
            </p>
            <h5>2. Interest Rates</h5>
            <p>
              Interest is charged at a rate of 1-3% per month on a reducing balance basis, in line with common Ugandan SACCO practices. For example:
            </p>
            <ul>
              <li>Emergency Loans: 2-3% per month</li>
              <li>Business Loans: 1.5-2.5% per month</li>
              <li>Development Loans: 1-2% per month</li>
            </ul>
            <h5>3. Application Fees</h5>
            <p>
              A non-refundable application fee of UGX 20,000 is charged for processing each loan application. Additional fees may apply for loan appraisal, depending on the loan amount (e.g., 1% of the loan amount, capped at UGX 100,000).
            </p>
            <h5>4. Penalties for Late Payment</h5>
            <p>
              Late repayments incur a penalty of 5% of the overdue installment amount per month. Persistent default may lead to additional charges or legal action, as per the SACCO's policies and Ugandan financial regulations.
            </p>
            <h5>5. Collateral and Guarantors</h5>
            <p>
              Loans above UGX 5,000,000 require collateral (e.g., land title, vehicle logbook) or two guarantors who are active SACCO members. Guarantors are jointly liable for loan repayment in case of default.
            </p>
            <h5>6. Early Repayment</h5>
            <p>
              Early repayment is allowed without penalty, provided the SACCO is notified in advance. Interest is recalculated based on the remaining principal.
            </p>
            <h5>7. Default Consequences</h5>
            <p>
              Failure to repay the loan may result in seizure of collateral, deduction from savings, or legal action. Defaults may also affect your eligibility for future loans.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTerms}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Active Loans */}
        <Card className="shadow mb-4">
          <Card.Header className="main-text shadow">
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
                      <p className="main-text fw-medium mb-1">{loan.purpose}</p>
                      <p className="text-muted small">Due: {loan.repaymentDue}</p>
                    </div>
                    <div className="text-end">
                      <p className="head-text mb-1">{formatCurrency(loan.amount)}</p>
                      <span
                        className={`badge main-text px-4 py-2 ${
                          loan.status === 'active' ? 'bg-dark' : 'bg-secondary'
                        }`}
                      >
                        {loan.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="main-text d-flex flex-column align-items-center justify-content-center min-h-200px">
                <BsCreditCard size={32} className="mb-3" />
                <h3 className="mb-2">No Active Loans</h3>
                <p className="text-muted mb-0">Apply for a loan to get started.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Loan Transactions */}
        <Card className="shadow">
          <Card.Header className="main-text shadow">
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
                      <p className="main-text fw-medium mb-1">{transaction.description}</p>
                      <p className="text-muted small">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className={`head-text ${getTransactionColor(transaction.transactionType)}`}>
                      {transaction.transactionType === 'loan_disbursement' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="main-text d-flex flex-column align-items-center justify-content-center min-h-200px">
                <BsCreditCard size={32} className="mb-3" />
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