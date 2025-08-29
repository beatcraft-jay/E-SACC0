import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Envelope, Phone, Chat, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'react-bootstrap-icons';
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
              <p className="mb-1"><Envelope className="me-2" /> <strong>Email:</strong> support@esacco.co.ug</p>
              <p className="mb-1"><Phone className="me-2" /> <strong>Phone:</strong> +256 712 345 678</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><Chat className="me-2" /> <strong>Live Chat:</strong> Available 9 AM - 5 PM</p>
              <p className="mb-1"><strong>Address:</strong> 123 Salaama road, Kampala, Uganda</p>
            </div>
          </div>
          
          {/* Social Media Section */}
          <div className="mt-4 pt-3 border-top">
            <h6 className="mb-3">Follow us on social media</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                  <Facebook size={16} />
                  <span>Facebook</span>
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <Button variant="outline-info" className="d-flex align-items-center gap-2">
                  <Twitter size={16} />
                  <span>Twitter</span>
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <Button variant="outline-danger" className="d-flex align-items-center gap-2">
                  <Instagram size={16} />
                  <span>Instagram</span>
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </Button>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <Button variant="outline-danger" className="d-flex align-items-center gap-2">
                  <Youtube size={16} />
                  <span>YouTube</span>
                </Button>
              </a>
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
  );
}

export default Support;