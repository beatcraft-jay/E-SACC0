import { Navbar, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { BsBell, BsSearch } from 'react-icons/bs'; // Use react-icons/bs
import { Link } from 'react-router-dom'; // Add missing import

// Mock useUser hook
function useUser() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
  };
}

// Mock dashboard data
const mockDashboardData = {
  unreadNotificationsCount: 5, // Mock notification count
};

function Header({ onToggleSidebar }) {
  const { isAuthenticated } = useUser();
  const dashboardData = isAuthenticated ? mockDashboardData : null;

  return (
    <Navbar bg="white" className="border-bottom px-4 py-3" sticky="top">
      <div className="main-text d-flex align-items-center gap-3 w-100">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-lg-none"
            onClick={onToggleSidebar}
          >
            ☰
          </Button>
          <Form className="position-relative" style={{ maxWidth: '400px' }}>
            <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" size={16} />
            <FormControl
              type="search"
              placeholder="Search transactions, accounts..."
              className="ps-5"
            />
          </Form>
        </div>
        <div className="ms-auto">
          <Button
            as={Link}
            to="/notifications"
            variant="link"
            className="nav-btn-bg position-relative p-0"
          >
            <BsBell size={20} />
            {dashboardData && dashboardData.unreadNotificationsCount > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {dashboardData.unreadNotificationsCount > 9
                  ? '9+'
                  : dashboardData.unreadNotificationsCount}
                <span className="visually-hidden">unread notifications</span>
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;