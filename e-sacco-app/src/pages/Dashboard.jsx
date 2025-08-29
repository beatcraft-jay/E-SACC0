import { format } from 'date-fns';
import {
  BsArrowUpRight,
  BsArrowDownLeft,
  BsCreditCard,
  BsPiggyBank,
  BsGraphUp,
  BsWallet,
  BsPlus,
  BsEye,
  BsPerson,
} from 'react-icons/bs'; // Use react-icons/bs
import { Button, Card, Placeholder } from 'react-bootstrap';
import AppLayout from '../components/AppLayout.jsx'; // Use real AppLayout

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
  };
}

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
      return <BsArrowUpRight className="h-4 w-4 text-success" />;
    case 'withdrawal':
    case 'fee':
      return <BsArrowDownLeft className="h-4 w-4 text-danger" />;
    case 'transfer':
      return <BsArrowUpRight className="h-4 w-4 text-primary" />;
    case 'loan_disbursement':
      return <BsCreditCard className="h-4 w-4 text-purple" />;
    case 'loan_repayment':
      return <BsArrowDownLeft className="h-4 w-4 text-warning" />;
    default:
      return <BsWallet className="h-4 w-4" />;
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
    case 'transfer':
      return 'text-primary';
    case 'loan_disbursement':
      return 'text-purple';
    case 'loan_repayment':
      return 'text-warning';
    default:
      return 'text-dark';
  }
}

// Custom Empty State Component for Bootstrap
function EmptyState({ children, className }) {
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      {children}
    </div>
  );
}

function EmptyStateIcon({ children }) {
  return <div className="mb-3">{children}</div>;
}

function EmptyStateContent({ children }) {
  return <div className="text-center">{children}</div>;
}

function EmptyStateTitle({ children }) {
  return <h3 className="mb-2">{children}</h3>;
}

function EmptyStateDescription({ children }) {
  return <p className="text-muted mb-0">{children}</p>;
}

function EmptyStateAction({ children }) {
  return <div className="mt-3">{children}</div>;
}

// Placeholder for CreateSampleDataButton
function CreateSampleDataButton() {
  return (
    <Button variant="primary" size="sm">
      Create Demo Data
    </Button>
  );
}

function Dashboard() {
  const { isAuthenticated } = useAuth();

  // Mock dashboard data
  const dashboardData = {
    user: { firstName: 'Ssentema', memberNumber: '12345' },
    totalSavings: 10000,
    totalLoanBalance: 5000,
    totalShares: 2000,
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
    activeLoans: [
      {
        _id: '1',
        amount: 5000,
        status: 'active',
      },
    ],
    recentTransactions: [
      {
        _id: '1',
        transactionType: 'deposit',
        description: 'Monthly Deposit',
        amount: 1000,
        _creationTime: new Date(),
      },
      {
        _id: '2',
        transactionType: 'withdrawal',
        description: 'ATM Withdrawal',
        amount: 500,
        _creationTime: new Date(Date.now() - 86400000), // Yesterday
      },
    ],
  };

  // Simulate loading state (optional, can be toggled for testing)
  const isLoading = false;

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <BsPerson size={48} className="text-warning mb-3" /> {/* Use BsPerson */}
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your dashboard.</p>
        <Button href="/signin" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="my-4">
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col">
                <Placeholder as={Card} animation="glow">
                  <Card.Body>
                    <Placeholder xs={6} />
                    <Placeholder xs={8} />
                  </Card.Body>
                </Placeholder>
              </div>
            ))}
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-4 mt-4">
            <div className="col">
              <Placeholder as={Card} animation="glow">
                <Card.Body>
                  <Placeholder xs={12} style={{ height: '20rem' }} />
                </Card.Body>
              </Placeholder>
            </div>
            <div className="col">
              <Placeholder as={Card} animation="glow">
                <Card.Body>
                  <Placeholder xs={12} style={{ height: '20rem' }} />
                </Card.Body>
              </Placeholder>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!dashboardData) {
    return (
      <AppLayout>
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '24rem' }}>
          <div className="text-center" style={{ maxWidth: '28rem' }}>
            <EmptyState>
              <EmptyStateIcon>
                <BsWallet size={32} />
              </EmptyStateIcon>
              <EmptyStateContent>
                <EmptyStateTitle>Welcome to E-SACCO!</EmptyStateTitle>
                <EmptyStateDescription>
                  Get started by creating demo data to explore all the features, or set up your real account.
                </EmptyStateDescription>
              </EmptyStateContent>
            </EmptyState>
            <div className="mt-4">
              <CreateSampleDataButton />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const {
    user: dashboardUser,
    totalSavings,
    totalLoanBalance,
    totalShares,
    savingsAccounts,
    activeLoans,
    recentTransactions,
  } = dashboardData;

  return (
      <div>
        {/* Welcome Section */}
        <div className="mb-4">
          <h1 className="display-6">Welcome back, {dashboardUser.firstName}!</h1>
          <p className="main-text text-muted">
            Member #{dashboardUser.memberNumber} • Last login: {format(new Date(), 'PPp')}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h6">Total Savings</Card.Title>
                <BsPiggyBank className="text-success" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="head-text h3 text-success">{formatCurrency(totalSavings)}</div>
                <p className="small-text text-muted small">+2.5% from last month</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h6">Active Loans</Card.Title>
                <BsCreditCard className="text-warning" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="head-text h3 text-warning">{formatCurrency(totalLoanBalance)}</div>
                <p className="small-text text-muted small">
                  {activeLoans.length} active loan{activeLoans.length !== 1 ? 's' : ''}
                </p>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h6">Shares Value</Card.Title>
                <BsGraphUp className="text-primary" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="head-text h3 text-primary">{formatCurrency(totalShares)}</div>
                <p className="small-text text-muted small">+5.2% annual return</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h6">Net Worth</Card.Title>
                <BsWallet className="text-purple" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="head-text h3 text-purple">
                  {formatCurrency(totalSavings + totalShares - totalLoanBalance)}
                </div>
                <p className="small-text text-muted small">Total assets</p>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Savings Accounts and Recent Transactions */}
        <div className="row row-cols-1 row-cols-lg-2 g-4 mt-4">
          {/* Savings Accounts */}
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h5">Savings Accounts</Card.Title>
                <Button variant="outline-dark" size="sm">
                  <BsPlus className="me-2" size={16} />
                  New Account
                </Button>
              </Card.Header>
              <Card.Body>
                <div>
                  {savingsAccounts.map((account) => (
                    <div
                      key={account._id}
                      className="d-flex align-items-center justify-content-between p-3 border rounded mb-3"
                    >
                      <div>
                        <p className="main-text fw-medium mb-1">{account.accountName}</p>
                        <p className="small-text text-muted small">{account.accountNumber}</p>
                      </div>
                      <div className="text-end">
                        <p className="main-text mb-1">{formatCurrency(account.balance)}</p>
                        <span
                          className={`badge px-4 py-2 ${account.status === 'active' ? 'bg-dark' : 'bg-secondary'}`}
                        >
                          {account.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {savingsAccounts.length === 0 && (
                    <EmptyState className="min-h-200px">
                      <EmptyStateIcon>
                        <BsPiggyBank size={32} />
                      </EmptyStateIcon>
                      <EmptyStateContent>
                        <EmptyStateTitle>No Savings Accounts</EmptyStateTitle>
                        <EmptyStateDescription>
                          Create your first savings account to get started
                        </EmptyStateDescription>
                      </EmptyStateContent>
                      <EmptyStateAction>
                        <Button size="sm">Create Account</Button>
                      </EmptyStateAction>
                    </EmptyState>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div className="col">
            <Card className='shadow'>
              <Card.Header className="main-text shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h5">Recent Transactions</Card.Title>
                <Button variant="outline-dark" size="sm">
                  <BsEye className="me-2" size={16} />
                  View All
                </Button>
              </Card.Header>
              <Card.Body>
                <div>
                  {recentTransactions.map((transaction) => (
                    <div key={transaction._id} className="main-text d-flex align-items-center gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle bg-light p-2">
                        {getTransactionIcon(transaction.transactionType)}
                      </div>
                      <div className="flex-grow-1">
                        <p className="fw-medium mb-1">{transaction.description}</p>
                        <p className="small-text text-muted small">
                          {format(transaction._creationTime, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className={`main-text ${getTransactionColor(transaction.transactionType)}`}>
                        {['deposit', 'interest'].includes(transaction.transactionType)
                          ? '+'
                          : '-'}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </div>
                    </div>
                  ))}
                  {recentTransactions.length === 0 && (
                    <EmptyState className="min-h-200px">
                      <EmptyStateIcon>
                        <BsWallet size={32} />
                      </EmptyStateIcon>
                      <EmptyStateContent>
                        <EmptyStateTitle>No Transactions</EmptyStateTitle>
                        <EmptyStateDescription>
                          Your transaction history will appear here
                        </EmptyStateDescription>
                      </EmptyStateContent>
                    </EmptyState>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;