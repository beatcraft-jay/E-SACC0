import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Person, Envelope, Phone, House } from 'react-bootstrap-icons';

// Placeholder for AppLayout (consistent with Dashboard.jsx, Loans.jsx, NotFound.jsx)
function AppLayout({ children }) {
  return (
    <div className="min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <div className="d-flex align-items-center justify-content-center rounded bg-primary text-white" style={{ width: '40px', height: '40px' }}>
              <House size={24} />
            </div>
            <span>E-SACCO</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/loans">Loans</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  );
}

function Profile() {
  // Mock user data
  const user = {
    isAuthenticated: true, // Change to false to test unauthenticated state
    firstName: 'Ssentema',
    lastName: 'Derrick',
    memberNumber: '12345',
    email: 'derrick.doe@example.com',
    phone: '+256 712 345 678',
    address: '123 Kampala road, Kampala, Uganda',
  };

  // State for edit form
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Reset form data when cancelling
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving profile changes
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  if (!user.isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Person size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your profile.</p>
        <Button href="/" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div className="main-text">
        {/* Header */}
        <h1 className="main-text display-6 mb-4">Profile</h1>

        {/* Profile Overview */}
        <Card className="shadow mb-4">
          <Card.Header className='shadow'>
            <Card.Title as="h5">Personal Information</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-1"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p className="mb-1"><strong>Member Number:</strong> {user.memberNumber}</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
                <p className="mb-1"><strong>Address:</strong> {user.address}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Edit Profile Form */}
        <Card className='shadow'>
          <Card.Header className='shadow'>
            <Card.Title as="h5">Edit Profile</Card.Title>
          </Card.Header>
          <Card.Body>
            {editMode ? (
              <Form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                  <Button variant="outline-secondary" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <Button variant="primary" onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Profile;