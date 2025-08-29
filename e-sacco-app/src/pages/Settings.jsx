import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { BsGear, BsPerson } from 'react-icons/bs';
import AppLayout from '../components/AppLayout.jsx';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
    updateProfile: (data) => {
      console.log('Updating profile:', data);
      return true; // Mock success
    },
    updatePreferences: (prefs) => {
      console.log('Updating preferences:', prefs);
      return true; // Mock success
    },
  };
}

function Settings() {
  const { isAuthenticated, updateProfile, updatePreferences } = useAuth();
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '0712345678',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = updateProfile(profile);
    if (success) {
      alert('Profile updated successfully!');
    } else {
      setError('Failed to update profile.');
    }
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = updatePreferences(preferences);
    if (success) {
      alert('Preferences updated successfully!');
    } else {
      setError('Failed to update preferences.');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    alert('Password updated successfully!'); // Mock update
    setPassword('');
    setConfirmPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <BsPerson size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to manage your settings.</p>
        <Button href="/signin" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div className="my-4">
        <h1 className="display-6 fw-bold mb-4">Settings</h1>

        {/* Profile Settings */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Profile Information</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleProfileSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Save Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Notification Preferences */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Notification Preferences</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handlePreferencesSubmit}>
              <Form.Check
                type="switch"
                label="Email Notifications"
                checked={preferences.emailNotifications}
                onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                className="mb-3"
              />
              <Form.Check
                type="switch"
                label="SMS Notifications"
                checked={preferences.smsNotifications}
                onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
                className="mb-3"
              />
              <Form.Check
                type="switch"
                label="Push Notifications"
                checked={preferences.pushNotifications}
                onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
                className="mb-3"
              />
              <Button type="submit" variant="primary">
                Save Preferences
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Security Settings */}
        <Card>
          <Card.Header>
            <Card.Title as="h5">Change Password</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handlePasswordSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger small mb-3">{error}</p>}
              <Button type="submit" variant="primary">
                Change Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
  );
}

export default Settings;