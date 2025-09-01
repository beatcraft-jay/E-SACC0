import { useState } from 'react';
import { Button, Card, Form, Badge } from 'react-bootstrap';
import { BsBell, BsPerson } from 'react-icons/bs';
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
  };
}

// Mock notification data
const mockNotifications = [
  {
    _id: '1',
    type: 'transaction',
    message: 'Your deposit of USH 1,000 was successful.',
    date: new Date(),
    read: false,
  },
  {
    _id: '2',
    type: 'loan',
    message: 'Your loan application has been approved!',
    date: new Date(Date.now() - 86400000),
    read: false,
  },
  {
    _id: '3',
    type: 'system',
    message: 'System maintenance scheduled for tomorrow at 2 AM.',
    date: new Date(Date.now() - 2 * 86400000),
    read: true,
  },
];

function Notifications() {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter((notification) => notification.type === filter);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <BsPerson size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to view your notifications.</p>
        <Button href="/signin" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div>
        <h1 className="display-6 mb-4">Notifications</h1>

        {/* Filter and Actions */}
        <Card className="shadow main-text mb-4">
          <Card.Header className="shadow d-flex align-items-center justify-content-between">
            <Card.Title as="h5">Filter Notifications</Card.Title>
            <Button variant="outline-primary" size="sm" onClick={handleMarkAllRead}>
              Mark All as Read
            </Button>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Notifications</option>
                <option value="transaction">Transactions</option>
                <option value="loan">Loans</option>
                <option value="system">System</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Notification List */}
        <Card className='shadow'>
          <Card.Header className='shadow main-text'>
            <Card.Title as="h5">Recent Notifications</Card.Title>
          </Card.Header>
          <Card.Body>
            {filteredNotifications.length > 0 ? (
              <div className='main-text'>
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="d-flex align-items-center gap-3 mb-3 p-2 border-bottom"
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-light p-2">
                      <BsBell size={16} className={notification.read ? 'text-muted' : 'text-primary'} />
                    </div>
                    <div className="flex-grow-1">
                      <p className={`fw-medium mb-1 ${notification.read ? 'text-muted' : ''}`}>
                        {notification.message}
                      </p>
                      <p className="text-muted small">
                        {format(notification.date, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center min-h-200px">
                <BsBell size={32} className="mb-3" />
                <h3 className="mb-2">No Notifications</h3>
                <p className="text-muted mb-0">You have no notifications at this time.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
  );
}

export default Notifications;