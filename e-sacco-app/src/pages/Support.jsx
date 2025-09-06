import { useState, useEffect } from 'react';
import { Accordion, Button, Card, Form, Toast, ToastContainer } from 'react-bootstrap';
import {
  BsEnvelope,
  BsPhone,
  BsChat,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsPerson,
  BsSearch,
  BsHouse,
  BsQuestionCircle
} from 'react-icons/bs';
import AppLayout from '../components/AppLayout.jsx';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true,
    preferences: { theme: 'light' }, // Mock theme preference
    submitSupportRequest: (data) => {
      console.log('Submitting support request:', data);
      return true; // Mock success
    },
  };
}

function Support() {
  const { isAuthenticated, preferences, submitSupportRequest } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: 'success' });
  const [faqSearch, setFaqSearch] = useState('');
  const [isChatOnline, setIsChatOnline] = useState(false);

  // Mock live chat availability (9 AM - 5 PM EAT)
  useEffect(() => {
    const checkChatAvailability = () => {
      const now = new Date();
      const hours = now.getHours(); // EAT is UTC+3, no adjustment needed
      setIsChatOnline(hours >= 9 && hours < 17);
    };
    checkChatAvailability();
    const interval = setInterval(checkChatAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  

  const faqs = [
    { question: 'How do I reset my password?', answer: 'Go to your profile settings, click on "Change Password", and follow the instructions. If you forgot your password, use the "Forgot Password" option on the login page.' },
    { question: 'How can I check my savings balance?', answer: 'After signing in, navigate to the "Savings" tab in your dashboard to see your balance and recent transactions.' },
    { question: 'How long does a withdrawal take?', answer: 'Withdrawals usually take between 24–48 hours depending on your bank or mobile money provider (MTN or Airtel).' },
    { question: 'How do I apply for a loan?', answer: 'Navigate to the "Loans" tab, select "Apply for a Loan", and complete the application form. You’ll receive a response within 48 hours.' },
    { question: 'What payment methods are supported?', answer: 'E-SACCO supports MTN Mobile Money, Airtel Money, and bank account transfers. Manage your payment methods in Settings.' },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = submitSupportRequest(formData);
    setIsSubmitting(false);
    setShowToast({
      show: true,
      message: success ? 'Support request submitted successfully!' : 'Failed to submit support request.',
      type: success ? 'success' : 'danger',
    });
    setFormData({ name: '', email: '', category: '', message: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <BsPerson size={48} className="text-warning mb-3" />
          <h1 className="h3 mb-2">Sign In Required</h1>
          <p className="text-muted mb-4">Please sign in to access support.</p>
          <Button href="/signin" variant="primary" size="lg">
            Sign In
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
      <div className="main-text">
        <h1 className="display-6 mb-2">Support</h1>
        <p className="small-text mb-4">Need help? Reach out to us via any of the channels below.</p>

        {/* Contact Information */}
        <Card className="mb-4 profile-card shadow">
          <Card.Header className="shadow">
            <Card.Title as="h5" className="mb-0 d-flex align-items-center gap-2">
              <BsEnvelope size={20} /> Contact Us
            </Card.Title>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-2 d-flex align-items-center gap-2">
                  <BsEnvelope size={20} className="text-primary" />
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@esacco.co.ug" className="text-primary">support@esacco.co.ug</a>
                </p>
                <p className="mb-2 d-flex align-items-center gap-2">
                  <BsPhone size={20} className="text-primary" />
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+256712345678" className="text-primary">+256 712 345 678</a>
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-2 d-flex align-items-center gap-2">
                  <BsChat size={20} className="text-primary" />
                  <strong>Live Chat:</strong>{' '}
                  <Button
                    variant={isChatOnline ? 'outline-primary' : 'outline-secondary'}
                    href="/forum"
                    size="sm"
                    aria-label="Start live chat"
                  >
                    {isChatOnline ? 'Online (9 AM - 5 PM)' : 'Offline'}
                  </Button>
                </p>
                <p className="mb-2 d-flex align-items-center gap-2">
                  <BsHouse size={20} className="text-primary" />
                  <strong>Address:</strong> 123 Salaama road, Kampala, Uganda
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top">
              <h6 className="mb-3">Follow us</h6>
              <div className="d-flex gap-3">
                <a
                  href="https://facebook.com/esacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary fs-4 social-icon"
                  aria-label="Follow E-SACCO on Facebook"
                >
                  <BsFacebook />
                </a>
                <a
                  href="https://x.com/esacco_ug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info fs-4 social-icon"
                  aria-label="Follow E-SACCO on X"
                >
                  <BsTwitter />
                </a>
                <a
                  href="https://instagram.com/esacco_ug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger fs-4 social-icon"
                  aria-label="Follow E-SACCO on Instagram"
                >
                  <BsInstagram />
                </a>
                <a
                  href="https://linkedin.com/company/esacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary fs-4 social-icon"
                  aria-label="Follow E-SACCO on LinkedIn"
                >
                  <BsLinkedin />
                </a>
                <a
                  href="https://youtube.com/@esacco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger fs-4 social-icon"
                  aria-label="Follow E-SACCO on YouTube"
                >
                  <BsYoutube />
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Support Form */}
        <Card className="mb-4 profile-card shadow">
          <Card.Header className="shadow">
            <Card.Title as="h5" className="mb-0 d-flex align-items-center gap-2">
              <BsChat size={20} /> Submit a Support Request
            </Card.Title>
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  isInvalid={!!errors.name}
                  aria-describedby="nameError"
                />
                <Form.Control.Feedback type="invalid" id="nameError">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  isInvalid={!!errors.email}
                  aria-describedby="emailError"
                />
                <Form.Control.Feedback type="invalid" id="emailError">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  isInvalid={!!errors.category}
                  aria-describedby="categoryError"
                >
                  <option value="">Select a category</option>
                  <option value="account">Account Issues</option>
                  <option value="loans">Loans</option>
                  <option value="payments">Payments</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" id="categoryError">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your issue (minimum 10 characters)"
                  required
                  isInvalid={!!errors.message}
                  aria-describedby="messageError"
                />
                <Form.Control.Feedback type="invalid" id="messageError">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting || !isAuthenticated}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
              {!isAuthenticated && (
                <div className="text-center mt-3">
                  <p className="text-muted mb-3">Please sign in to submit a support request.</p>
                  <Button href="/signin" variant="primary">
                    Sign In
                  </Button>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>

        {/* FAQ Section */}
        <Card className="profile-card shadow">
          <Card.Header className="shadow">
            <Card.Title as="h5" className="mb-0 d-flex align-items-center gap-2">
              <BsQuestionCircle size={20} /> Frequently Asked Questions (FAQ)
            </Card.Title>
          </Card.Header>
          <Card.Body className="p-4">
            <Form.Group className="mb-4">
              <Form.Label>Search FAQs</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <BsSearch />
                </span>
                <Form.Control
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search questions or answers..."
                  aria-label="Search FAQs"
                />
              </div>
            </Form.Group>
            <Accordion>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body className='accordion'>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))
              ) : (
                <p className="text-muted">No FAQs match your search.</p>
              )}
            </Accordion>
            <div className="text-center mt-3">
              <a href="/faqs" className="text-primary" aria-label="View all FAQs">
                View All FAQs
              </a>
            </div>
          </Card.Body>
        </Card>

        {/* Rate Our Support */}
        <div className="text-center mt-4">
          <p className="small-text mb-3">Help us improve our support services!</p>
          <Button
            variant="outline-primary"
            href="/feedback"
            aria-label="Rate our support services"
          >
            Rate Our Support
          </Button>
        </div>

        {/* Toast Notification */}
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast({ ...showToast, show: false })}
            show={showToast.show}
            delay={3000}
            autohide
            bg={showToast.type}
          >
            <Toast.Header>
              <strong className="me-auto">{showToast.type === 'success' ? 'Success' : 'Error'}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{showToast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
  );
}

export default Support;