import { Navbar, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Bell, Search } from 'react-bootstrap-icons';

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

function Header() {
  const { isAuthenticated } = useUser();
  const dashboardData = isAuthenticated ? mockDashboardData : null;

  return (
    <Navbar bg="white" className="border-bottom px-4 py-3" sticky="top">
      <div className="d-flex align-items-center gap-3 w-100">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-lg-none"
            onClick={() => {
              // Simulate sidebar toggle (client-side only, no SidebarProvider)
              document.querySelector('.sidebar')?.classList.toggle('d-none');
            }}
          >
            ☰
          </Button>
          <Form className="position-relative" style={{ maxWidth: '400px' }}>
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3" size={16} />
            <FormControl
              type="search"
              placeholder="Search transactions, accounts..."
              className="ps-5"
            />
          </Form>
        </div>
        <div className="ms-auto">
          <Button variant="link" className="position-relative p-0">
            <Bell size={20} />
            {dashboardData && dashboardData.unreadNotificationsCount > 0 && (
              <Badge
                bg="danger"
                className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '20px', height: '20px', fontSize: '10px' }}
              >
                {dashboardData.unreadNotificationsCount > 9
                  ? '9+'
                  : dashboardData.unreadNotificationsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;