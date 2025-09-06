// src/pages/Index.jsx
import { Button, Card, Form } from 'react-bootstrap';
import { BsBank, BsShieldCheck, BsPhone, BsGraphUp, BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// SignInButton component
function SignInButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}

const features = [
  {
    icon: BsShieldCheck,
    title: 'Secure Banking',
    description:
      'Bank-level security with end-to-end encryption to protect your funds and data.',
  },
  {
    icon: BsPhone,
    title: 'Mobile First',
    description:
      'Access your accounts anywhere, anytime with our responsive web application.',
  },
  {
    icon: BsGraphUp,
    title: 'Grow Your Savings',
    description:
      'Competitive interest rates and flexible savings options to help you reach your goals.',
  },
  {
    icon: BsBank,
    title: 'Member Owned',
    description:
      "As a cooperative, we're owned by our members and focused on your financial success.",
  },
];

export default function Index() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    console.log('Index toggle: setting theme to', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={`min-vh-100 main-text ${theme}`}>
      {/* Header */}
      <header
        className="border-bottom py-3 sticky-top"
        style={{ background: 'var(--foreground-color)', opacity: 1 }}
      >
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
            <div className="d-flex align-items-center gap-3">
              <SignInButton variant="primary" size="sm">
                Sign In
              </SignInButton>
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

      {/* Hero Section */}
      <section className="ebg py-5">
        <div className="container text-center">
          <div className="mx-auto" style={{ maxWidth: '48rem' }}>
            <h2 className="display-4 fw-bold mb-4">
              Your Digital Savings & Credit Cooperative
            </h2>
            <p className="lead small-text mb-4">
              Join thousands of members who trust E-SACCO for secure savings,
              affordable loans, and financial growth. Banking made simple,
              transparent, and member-focused.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <SignInButton size="lg" className="px-4">
                Get Started Today
              </SignInButton>
              <Button variant="outline-primary" size="lg" className="px-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ebg py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="h2 fw-bold mb-3">Why Choose E-SACCO?</h3>
            <p
              className="small-text lead"
              style={{ maxWidth: '40rem', margin: 'auto' }}
            >
              Experience modern banking with the personal touch of a cooperative
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {features.map((feature, index) => (
              <div key={index} className="col">
                <Card className="h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <feature.icon size={24} className="text-primary" />
                      </div>
                    </div>
                    <h4 className="fw-semibold mb-2">{feature.title}</h4>
                    <p className="small-text small">{feature.description}</p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ebg py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
            <div className="col">
              <div className="h3 fw-bold text-primary mb-2">10,000+</div>
              <div className="small-text">Active Members</div>
            </div>
            <div className="col">
              <div className="h3 fw-bold text-primary mb-2">USH 2B+</div>
              <div className="small-text">Total Savings</div>
            </div>
            <div className="col">
              <div className="h3 fw-bold text-primary mb-2">5.5%</div>
              <div className="small-text">Annual Interest Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary">
        <div className="container text-center">
          <h3 className="h2 fw-bold mb-3">
            Ready to Start Your Financial Journey?
          </h3>
          <p
            className="lead small-text mb-4"
            style={{ maxWidth: '40rem', margin: 'auto' }}
          >
            Join E-SACCO today and take control of your financial future with
            our comprehensive savings and lending solutions.
          </p>
          <SignInButton variant="outline-light" size="lg" className="px-4">
            Join E-SACCO Now
          </SignInButton>
        </div>
      </section>
    </div>
  );
}