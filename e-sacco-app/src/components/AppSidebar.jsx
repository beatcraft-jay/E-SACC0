import { Link, useLocation } from 'react-router-dom';
import { Nav, Card, Image } from 'react-bootstrap';
import {
  Building,
  CreditCard,
  PiggyBank,
  Receipt,
  GraphUp,
  Person,
  QuestionCircle,
} from 'react-bootstrap-icons';

// Mock useUser hook
function useUser() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/32',
  };
}

// Mock SignInButton component
function SignInButton({ className }) {
  return (
    <button className={`btn btn-primary w-100 ${className}`}>
      Sign In
    </button>
  );
}

const mainNavigation = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Receipt, // No direct equivalent for LayoutDashboard; using Receipt as placeholder
  },
  {
    title: 'Savings',
    url: '/savings',
    icon: PiggyBank,
  },
  {
    title: 'Loans',
    url: '/loans',
    icon: CreditCard,
  },
  {
    title: 'Shares',
    url: '/shares',
    icon: GraphUp, // Replaced TrendingUp
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: Receipt,
  },
];

const secondaryNavigation = [
  {
    title: 'Profile',
    url: '/profile',
    icon: Person,
  },
  {
    title: 'Support',
    url: '/support',
    icon: QuestionCircle, // Replaced HelpCircle
  },
];

function AppSidebar() {
  const location = useLocation();
  const { name, avatar, isAuthenticated } = useUser();

  return (
    <Card className="h-100 border-end rounded-0" style={{ width: '250px' }}>
      <Card.Header className="p-4">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center rounded bg-primary text-white" style={{ width: '40px', height: '40px' }}>
            <Building size={24} /> {/* Replaced Building2 */}
          </div>
          <div>
            <h1 className="h6 fw-semibold mb-0">E-SACCO</h1>
            <p className="text-muted small">Digital Banking</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <Nav className="flex-column">
          <div className="px-4 py-2">
            <h6 className="fw-semibold text-muted">Banking Services</h6>
            {mainNavigation.map((item) => (
              <Nav.Link
                as={Link}
                to={item.url}
                key={item.title}
                className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${
                  location.pathname === item.url ? 'bg-primary text-white' : ''
                }`}
              >
                <item.icon size={16} />
                <span>{item.title}</span>
              </Nav.Link>
            ))}
          </div>
          <div className="px-4 py-2">
            <h6 className="fw-semibold text-muted">Account</h6>
            {secondaryNavigation.map((item) => (
              <Nav.Link
                as={Link}
                to={item.url}
                key={item.title}
                className={`d-flex align-items-center gap-2 py-2 px-3 rounded ${
                  location.pathname === item.url ? 'bg-primary text-white' : ''
                }`}
              >
                <item.icon size={16} />
                <span>{item.title}</span>
              </Nav.Link>
            ))}
          </div>
        </Nav>
      </Card.Body>
      <Card.Footer className="p-4">
        {isAuthenticated ? (
          <div className="d-flex align-items-center gap-3 p-2 rounded bg-light">
            <Image
              src={avatar}
              roundedCircle
              width={32}
              height={32}
              alt="User avatar"
            />
            <div className="flex-grow-1">
              <p className="text-sm fw-medium mb-0 text-truncate">{name}</p>
              <p className="text-muted small">Member</p>
            </div>
          </div>
        ) : (
          <SignInButton className="w-100" />
        )}
      </Card.Footer>
    </Card>
  );
}

export default AppSidebar;