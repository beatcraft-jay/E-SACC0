import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';

// Placeholder for AppLayout (consistent with Dashboard.jsx, Loans.jsx)
function AppLayout({ children }) {
  return <div className="container py-4">{children}</div>;
}

function NotFound() {
  return (
    <AppLayout>
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <ExclamationTriangle size={48} className="text-warning mb-3" />
        <h1 className="display-4 fw-bold mb-3">404 - Page Not Found</h1>
        <p className="lead text-muted mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg" className="px-4">
          Return to Home
        </Button>
      </div>
    </AppLayout>
  );
}

export default NotFound;