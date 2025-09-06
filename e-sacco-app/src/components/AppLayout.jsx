import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import AppSidebar from './AppSidebar.jsx';
import Header from './Header.jsx';

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-vh-100">
      <Row className="g-0">
        {/* Sidebar */}
        <Col xs="auto">
          <AppSidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />
        </Col>

        {/* Main Content */}
        <Col>
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="p-3 bg-light">
            <Container fluid style={{ maxWidth: '1280px' }}>
              {children}
            </Container>
          </main>
        </Col>
      </Row>
    </div>
  );
}

export default AppLayout;
