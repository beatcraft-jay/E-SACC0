import { Link, useLocation } from 'react-router-dom';
import { Nav, Card, Image, Button } from 'react-bootstrap';
import {
  BsBank,
  BsCreditCard,
  BsPiggyBank,
  BsReceipt,
  BsGraphUp,
  BsPerson,
  BsQuestionCircle,
  BsChat,
  BsBell,
  BsGear,
} from 'react-icons/bs'; // Use react-icons/bs
import img1 from '../assets/img/img1.jpeg';

// Mock useUser hook
function useUser() {
  return {
    isAuthenticated: true,
    name: 'Ssentema Derrick',
    avatar: img1, // Use a local placeholder
  };
}

// SignInButton component
function SignInButton({ className }) {
  return (
    <Button as={Link} to="/signin" className={`btn btn-primary w-100 ${className}`}>
      Sign In
    </Button>
  );
}

const mainNavigation = [
  { title: 'Dashboard', url: '/dashboard', icon: BsReceipt },
  { title: 'Savings', url: '/savings', icon: BsPiggyBank },
  { title: 'Loans', url: '/loans', icon: BsCreditCard },
  { title: 'Shares', url: '/shares', icon: BsGraphUp },
  { title: 'Transactions', url: '/transactions', icon: BsReceipt },
  { title: 'Forum', url: '/forum', icon: BsChat },
];

const secondaryNavigation = [
  { title: 'Notifications', url: '/notifications', icon: BsBell },
  { title: 'Profile', url: '/profile', icon: BsPerson },
  { title: 'Support', url: '/support', icon: BsQuestionCircle },
  { title: 'Settings', url: '/settings', icon: BsGear },
];

function AppSidebar({ isOpen }) {
  const location = useLocation();
  const { name, avatar, isAuthenticated } = useUser();

  return (
    <div
      className={`main-text sidebar ${isOpen ? 'd-block' : 'd-none d-lg-block'} position-fixed top-0 start-0 h-100`}
      style={{ zIndex: 1000, width: '250px' }}
    >
      <Card className="bg h-100 border-end rounded-0">
        <Card.Header>
          <div className="logo-area d-flex align-items-center gap-3">
            <div>
              <Image
                src="../assets/img/LOGO.png"
                width={60}
                height={60}
                alt="E-SACCO logo"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=';
                }}
              />
            </div>
            <div>
              <h1 className="h6 fw-semibold mt-4 mb-0">E-SACCO</h1>
              <p className="text-muted small">Smart saving</p>
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
                  className={`nav-btn-bg d-flex align-items-center gap-2 py-2 px-3 rounded ${
                    location.pathname === item.url ? 'bg-primary text-white' : ''
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.title}</span>
                </Nav.Link>
              ))}
            </div>
            <div className="px-4 py-2">
              <h6 className="text-muted fw-semibold">Account</h6>
              {secondaryNavigation.map((item) => (
                <Nav.Link
                  as={Link}
                  to={item.url}
                  key={item.title}
                  className={`nav-btn-bg d-flex align-items-center gap-2 py-2 px-3 rounded ${
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
            <Link to="/profile" className="text-decoration-none">
              <div className="logo-area d-flex align-items-center gap-3 rounded">
                <Image
                  src={avatar}
                  roundedCircle
                  width={50}
                  height={50}
                  alt="User avatar"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA4IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=';
                  }}
                />
                <div className="flex-grow-1">
                  <p className="text-sm mb-0 mt-3 text-truncate">{name}</p>
                  <p className="text-muted small">Member</p>
                </div>
              </div>
            </Link>
          ) : (
            <SignInButton className="w-100" />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default AppSidebar;