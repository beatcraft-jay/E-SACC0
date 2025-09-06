import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import Footer from '../components/Footer.jsx';

function AppLayout({ children }) {
  return <div className="container py-4">{children}</div>;
}

function NotFound() {
  return (
      <div className="main-text d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <ExclamationTriangle size={48} className="text-warning mb-3" />
        <h1 className="display-4 fw-bold mb-3">404 - Page Not Found</h1>
        <p className="lead small-text mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button as={Link} to="/dashboard" variant="primary" size="lg" className="px-4">
          Return to Home
        </Button>
        <Footer/>
      </div>
  );
}

export default NotFound;