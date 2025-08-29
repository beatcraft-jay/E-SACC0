import { Container, Row, Col } from 'react-bootstrap';
import AppSidebar from './AppSidebar.jsx';
import Header from './Header.jsx';

function AppLayout({ children }) {
  return (
    <div className="min-vh-100">
      <Row className="g-0">
        <Col xs="auto">
          <AppSidebar />
        </Col>
        <Col>
          <Header />
          <main className="p-4 bg-light">
            <Container className="mx-auto" style={{ maxWidth: '1280px' }}>
              {children}
            </Container>
          </main>
        </Col>
      </Row>
    </div>
  );
}

export default AppLayout;