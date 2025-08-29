import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Envelope, Phone, Chat } from 'react-bootstrap-icons';
import AppLayout from '../components/AppLayout.jsx';

function Support() {
  // Mock user authentication
  const isAuthenticated = true; // Change to false to test unauthenticated state

  // State for support form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submitting support request
    alert(`Support request submitted: ${name}, ${email}, ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <AppLayout>
      <div className="my-4">
        {/* Header */}
        <h1 className="display-6 fw-bold mb-4">Support</h1>

        {/* Contact Information */}
        <Card className="mb-4">
          <Card.Header>
            <Card.Title as="h5">Contact Us</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-1"><Envelope className="me-2" /> <strong>Email:</strong> support@esacco.co.ke</p>
                <p className="mb-1"><Phone className="me-2" /> <strong>Phone:</strong> +254 712 345 678</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1"><Chat className="me-2" /> <strong>Live Chat:</strong> Available 9 AM - 5 PM</p>
                <p className="mb-1"><strong>Address:</strong> 123 Nairobi Street, Nairobi, Kenya</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Support Form */}
        <Card>
          <Card.Header>
            <Card.Title as="h5">Submit a Support Request</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={!isAuthenticated}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={!isAuthenticated}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue"
                  required
                  disabled={!isAuthenticated}
                />
              </Form.Group>
              {isAuthenticated ? (
                <Button variant="primary" type="submit">
                  Submit Request
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-muted mb-3">Please sign in to submit a support request.</p>
                  <Button href="/" variant="primary">
                    Sign In
                  </Button>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </AppLayout>
  );
}

export default Support;