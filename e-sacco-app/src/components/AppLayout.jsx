// src/components/AppLayout.jsx
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AppSidebar from './AppSidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(false);
        console.log('AppLayout: Sidebar closed due to desktop resize');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      console.log('AppLayout: Sidebar toggled to', !prev);
      return !prev;
    });
  };

  return (
    <div className="min-vh-100" style={{ position: 'relative' }}>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => {
            setIsSidebarOpen(false);
            console.log('AppLayout: Backdrop clicked, closing sidebar');
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
      <Row className="g-0">
        {/* Sidebar */}
        <Col xs="auto">
          <AppSidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />
        </Col>

        {/* Main Content */}
        <Col className="main-content">
          <Header onMenuClick={toggleSidebar} />
          <main className="p-3" style={{ paddingBottom: '60px', minHeight: 'calc(100vh - 120px)' }}>
            <Container fluid style={{ maxWidth: '1280px' }}>
              {children}
            </Container>
          </main>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}

export default AppLayout;