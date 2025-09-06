import { useEffect } from 'react';
import { Navbar, Form, Button, Badge } from 'react-bootstrap';
import { BsBell, BsSearch, BsSun, BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Mock useUser hook for authentication
function useUser() {
  return {
    isAuthenticated: true,
  };
}

// Mock dashboard data for notifications
const mockDashboardData = {
  unreadNotificationsCount: 5,
};

function Header({ onToggleSidebar }) {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useUser();
  const dashboardData = isAuthenticated ? mockDashboardData : null;

  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Header: Error accessing localStorage:', error);
    }
  }, [theme]);

  return (
    <Navbar className="border-bottom px-4 py-3" sticky="top">
      <div className={`main-text ${theme} ebg d-flex align-items-center gap-3 w-100`}>
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-lg-none"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            ☰
          </Button>
          <Form className="position-relative" style={{ maxWidth: '400px' }}>
            <BsSearch
              className="position-absolute top-50 start-0 translate-middle-y ms-3"
              size={16}
              aria-hidden="true"
            />
            <Form.Control
              type="search"
              placeholder="Search transactions, accounts..."
              className="ps-5"
              aria-label="Search transactions or accounts"
            />
          </Form>
        </div>
        <div className="ms-auto d-flex align-items-center gap-1">
          <Form.Check
            type="switch"
            id="header-theme-toggle"
            label={
              <span className="d-flex align-items-center">
                {theme === 'light' ? <BsSun size={20} aria-hidden="true" /> : <BsMoon size={20} aria-hidden="true" />}
              </span>
            }
            checked={theme === 'dark'}
            onChange={handleThemeToggle}
            aria-label="Toggle theme"
            className="me-1"
          />
          <Button
            as={Link}
            to="/notifications"
            variant="link"
            className="nav-btn-bg position-relative p-0"
            aria-label={`Notifications${dashboardData?.unreadNotificationsCount > 0 ? ` with ${dashboardData.unreadNotificationsCount} unread` : ''}`}
          >
            <BsBell size={20} aria-hidden="true" />
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