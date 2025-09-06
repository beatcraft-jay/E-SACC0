// src/pages/Faqs.jsx
import { useState } from 'react';
import { Button, Card, Form, Accordion } from 'react-bootstrap';
import { BsQuestionCircle, BsPerson } from 'react-icons/bs';
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';
import { useTheme } from '../context/ThemeContext';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
  };
}

// Mock FAQ data with categories and timestamps
const faqData = [
  { _id: '1', category: 'general', q: 'What is an e-Sacco?', a: 'An e-Sacco is a digital platform that allows members to save, borrow, and manage their contributions online instead of using traditional paper-based methods.', date: new Date() },
  { _id: '2', category: 'general', q: 'How do I register as a member?', a: 'Simply sign up on the app by providing your personal details, national ID, phone number, and creating a secure password.', date: new Date(Date.now() - 86400000) },
  { _id: '3', category: 'general', q: 'Is there a membership fee?', a: 'Yes, most e-Saccos require a small one-time registration fee or a minimum deposit to activate your account.', date: new Date(Date.now() - 2 * 86400000) },
  { _id: '4', category: 'account', q: 'How do I deposit money into my account?', a: 'You can deposit money using mobile money (MTN, Airtel), bank transfer, or at an authorized Sacco agent.', date: new Date() },
  { _id: '5', category: 'account', q: 'Can I withdraw my savings anytime?', a: 'Yes, withdrawals can be made via mobile money or bank transfer, but some Saccos may require notice or maintain a minimum balance.', date: new Date(Date.now() - 86400000) },
  { _id: '6', category: 'loans', q: 'What types of loans are available?', a: 'We offer short-term emergency loans, development loans, and group loans depending on your savings history and eligibility.', date: new Date() },
  { _id: '7', category: 'loans', q: 'How is loan eligibility determined?', a: 'Loan eligibility is based on your savings balance, contribution history, and the Sacco’s specific policies.', date: new Date(Date.now() - 86400000) },
  { _id: '8', category: 'loans', q: 'How long does it take to get a loan approved?', a: 'Loan approval usually takes between a few hours to 2 working days depending on the type and amount requested.', date: new Date(Date.now() - 2 * 86400000) },
  { _id: '9', category: 'loans', q: 'What are the interest rates on loans?', a: 'Interest rates vary by loan type, but e-Sacco loans generally have lower rates compared to banks and microfinance institutions.', date: new Date() },
  { _id: '10', category: 'loans', q: 'Can I repay my loan early?', a: 'Yes, you can repay your loan early without penalties, and this can improve your future loan limits.', date: new Date(Date.now() - 86400000) },
  { _id: '11', category: 'account', q: 'How do I check my balance?', a: 'Simply log into the app and your savings, loan balance, and contributions will be displayed on your dashboard.', date: new Date() },
  { _id: '12', category: 'account', q: 'Can I contribute on behalf of another member?', a: 'Yes, as long as you know their member ID, you can contribute on their behalf through the payment options.', date: new Date(Date.now() - 86400000) },
  { _id: '13', category: 'security', q: 'Is my money safe?', a: 'Yes, all transactions are secured with encryption, and funds are held in regulated financial institutions.', date: new Date() },
  { _id: '14', category: 'loans', q: 'What happens if I miss a loan repayment?', a: 'Missed payments may attract penalties, and your credit score within the Sacco may be affected.', date: new Date(Date.now() - 86400000) },
  { _id: '15', category: 'general', q: 'Can I invite friends and family to join?', a: 'Absolutely! You can share your referral code and help others enjoy the benefits of the e-Sacco.', date: new Date() },
  { _id: '16', category: 'general', q: 'Does the app work offline?', a: 'Some features like balance checking may require internet, but basic SMS-based services are available for offline users.', date: new Date(Date.now() - 86400000) },
  { _id: '17', category: 'general', q: 'What devices can I use?', a: 'The app works on any smartphone with internet access, and you can also access it through the web portal.', date: new Date() },
  { _id: '18', category: 'support', q: 'Is customer support available?', a: 'Yes, we have 24/7 customer support available via in-app chat, email, and phone.', date: new Date(Date.now() - 86400000) },
  { _id: '19', category: 'account', q: 'Can I have multiple accounts?', a: 'Each member is allowed one personal account, but you can also join group accounts if available.', date: new Date() },
  { _id: '20', category: 'account', q: 'How do I update my personal information?', a: 'Go to settings > profile and update your details. Some changes may require verification for security reasons.', date: new Date(Date.now() - 86400000) },
];

function Faqs() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme(); // Use ThemeContext for styling
  const [filter, setFilter] = useState('all');

  const filteredFaqs = filter === 'all'
    ? faqData
    : faqData.filter((faq) => faq.category === filter);

  const handleResetFilter = () => {
    setFilter('all');
  };

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className={`d-flex flex-column align-items-center justify-content-center min-vh-100 main-text ${theme}`}>
          <BsPerson size={48} className="text-warning mb-3" />
          <h1 className="h3 mb-2">Sign In Required</h1>
          <p className="text-muted mb-4">Please sign in to view FAQs.</p>
          <Button href="/signin" variant="primary" size="lg">
            Sign In
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
      <div className="main-text">
        <h1 className="display-6 mb-4">FAQs</h1>

        {/* Filter Card */}
        <Card className="shadow mb-4">
          <Card.Header className="shadow d-flex align-items-center justify-content-between">
            <Card.Title as="h5">Filter FAQs</Card.Title>
            <Button variant="outline-primary" size="sm" onClick={handleResetFilter}>
              Show All FAQs
            </Button>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All FAQs</option>
                <option value="general">General</option>
                <option value="account">Account</option>
                <option value="loans">Loans</option>
                <option value="security">Security</option>
                <option value="support">Support</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>

        {/* FAQ List */}
        <Card className="shadow">
          <Card.Header className="shadow main-text">
            <Card.Title as="h5">Frequently Asked Questions</Card.Title>
          </Card.Header>
          <Card.Body>
            {filteredFaqs.length > 0 ? (
              <Accordion defaultActiveKey="0" className="main-text">
                {filteredFaqs.map((faq) => (
                  <Accordion.Item eventKey={faq._id} key={faq._id}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-3">
                        <BsQuestionCircle size={16} className="text-primary" />
                        <span>{faq.q}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="accordion">
                      <p className="mb-1">{faq.a}</p>
                      <p className="small-text small">
                        Last updated: {format(faq.date, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <BsQuestionCircle size={32} className="mb-3" />
                <h3 className="mb-2">No FAQs Found</h3>
                <p className="mb-0">No FAQs match the selected category.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Faqs;