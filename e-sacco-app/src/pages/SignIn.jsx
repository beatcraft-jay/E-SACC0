// src/pages/SignIn.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { BsPerson, BsBank, BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/Footer.jsx';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: false, // Change to true to test authenticated state
    login: (email, password) => {
      console.log('Logging in with:', email, password);
      return email && password; // Mock success if fields are non-empty
    },
    signup: (email, password, nationalId) => {
      console.log('Signing up with:', email, password, nationalId);
      return email && password && /^[0-9]{8,12}$/.test(nationalId); // Mock success if fields are valid
    },
  };
}

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    console.log('SignIn toggle: setting theme to', newTheme);
    setTheme(newTheme);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !confirmPassword || !nationalId) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^[0-9]{8,12}$/.test(nationalId)) {
      setError('National ID must be 8-12 digits.');
      return;
    }
    const success = signup(email, password, nationalId);
    if (success) {
      navigate('/dashboard');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNationalId('');
    } else {
      setError('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    setError('');
    if (isSignUp && !nationalId) {
      setError('Please enter your National ID.');
      return;
    }
    if (isSignUp && !/^[0-9]{8,12}$/.test(nationalId)) {
      setError('National ID must be 8-12 digits.');
      return;
    }
    console.log('Google Sign-In:', { email: 'mock.google@example.com', nationalId });
    navigate('/dashboard');
    setNationalId('');
  };

  if (isAuthenticated) {
    return (
      <div className={`d-flex flex-column align-items-center justify-content-center min-vh-100 main-text ${theme}`}>
        <BsPerson size={48} className="text-primary mb-3" />
        <h1 className="h3 mb-2">Already Signed In</h1>
        <p className="text-muted mb-4">You are already signed in. Proceed to your dashboard.</p>
        <Button href="/dashboard" variant="primary" size="lg">
          Go to Dashboard
        </Button>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`main-text ebg ${theme}`}>
      {/* Header */}
      <header className="border-bottom py-3 sticky-top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded bg-primary text-white"
                style={{ width: '40px', height: '40px' }}
              >
                <BsBank size={24} />
              </div>
              <div>
                <h1 className="h5 fw-bold mb-0">E-SACCO</h1>
                <p className="small-text small">Digital Banking</p>
              </div>
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
            </div>
          </div>
        </div>
      </header>

      <Card className={`bg mx-auto ${theme}`} style={{ maxWidth: '400px', marginTop: '20px' }}>
        <Card.Header className="bg">
          <Card.Title as="h5">{isSignUp ? 'Create Account' : 'Member Login'}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  background: 'transparent',
                  color: 'var(--primary-text-color)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  background: 'transparent',
                  color: 'var(--primary-text-color)',
                  borderColor: 'var(--border-color)',
                }}
              />
            </Form.Group>
            {isSignUp && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    style={{
                      background: 'transparent',
                      color: 'var(--primary-text-color)',
                      borderColor: 'var(--border-color)',
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>National ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter your National ID (8-12 digits)"
                    required
                    style={{
                      background: 'transparent',
                      color: 'var(--primary-text-color)',
                      borderColor: 'var(--border-color)',
                    }}
                  />
                </Form.Group>
              </>
            )}
            {error && <p className="text-danger small mb-3">{error}</p>}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={handleGoogleSignIn}
            >
              {isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <p className="text-muted small mb-0">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Button
              variant="link"
              className="p-0 text-primary"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setNationalId('');
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default SignIn;