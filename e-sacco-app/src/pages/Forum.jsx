import { useState } from 'react';
import { Button, Card, Form, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { BsChat, BsPerson, BsSearch, BsPinAngle, BsPaperclip } from 'react-icons/bs';
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true, // Change to false to test unauthenticated state
    user: { id: '1', name: 'John Doe' },
  };
}

// Mock conversation data
const mockConversations = [
  {
    id: '1',
    user: { id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/32' },
    lastMessage: 'Can we discuss the loan terms?',
    lastMessageTime: new Date(),
    pinned: false,
    messages: [
      { id: 'm1', senderId: '2', content: 'Can we discuss the loan terms?', time: new Date() },
      { id: 'm2', senderId: '1', content: 'Sure, let me check the details.', time: new Date(Date.now() - 3600000) },
    ],
  },
  {
    id: '2',
    user: { id: '3', name: 'Mike Johnson', avatar: 'https://via.placeholder.com/32' },
    lastMessage: 'Thanks for the dividend update!',
    lastMessageTime: new Date(Date.now() - 86400000),
    pinned: true,
    messages: [
      { id: 'm3', senderId: '3', content: 'Thanks for the dividend update!', time: new Date(Date.now() - 86400000) },
    ],
  },
];

function Forum() {
  const { isAuthenticated, user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState(mockConversations);

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message || !selectedConversation) return;
    setConversations(conversations.map((conv) =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            lastMessage: message,
            lastMessageTime: new Date(),
            messages: [
              ...conv.messages,
              { id: `m${conv.messages.length + 1}`, senderId: user.id, content: message, time: new Date() },
            ],
          }
        : conv
    ));
    setMessage('');
  };

  const handlePinConversation = (id) => {
    setConversations(conversations.map((conv) =>
      conv.id === id ? { ...conv, pinned: !conv.pinned } : conv
    ));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedConversation) {
      alert(`Uploading file: ${file.name}`);
      // Simulate file upload
      setConversations(conversations.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                { id: `m${conv.messages.length + 1}`, senderId: user.id, content: `File: ${file.name}`, time: new Date() },
              ],
            }
          : conv
      ));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <BsPerson size={48} className="text-warning mb-3" />
        <h1 className="h3 mb-2">Sign In Required</h1>
        <p className="text-muted mb-4">Please sign in to access the forum.</p>
        <Button href="/signin" variant="primary" size="lg">
          Sign In
        </Button>
      </div>
    );
  }

  return (
      <div className="my-4">
        <h1 className="display-6 fw-bold mb-4">Community Forum</h1>
        <div className="row g-4">
          {/* Left Column: People Interacted With */}
          <div className="col-lg-4">
            <Card>
              <Card.Header>
                <Card.Title as="h5">Conversations</Card.Title>
                <InputGroup size="sm">
                  <InputGroup.Text>
                    <BsSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conv) => (
                      <ListGroup.Item
                        key={conv.id}
                        action
                        active={selectedConversation?.id === conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className="d-flex align-items-center gap-3"
                      >
                        <img
                          src={conv.user.avatar}
                          alt={conv.user.name}
                          className="rounded-circle"
                          width="32"
                          height="32"
                        />
                        <div className="flex-grow-1">
                          <p className="fw-medium mb-1">{conv.user.name}</p>
                          <p className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                            {conv.lastMessage}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="text-muted small mb-1">
                            {format(conv.lastMessageTime, 'MMM dd')}
                          </p>
                          {conv.pinned && <BsPinAngle size={16} className="text-primary" />}
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <div className="p-3 text-center">
                      <BsChat size={32} className="mb-3" />
                      <p className="text-muted">No conversations found.</p>
                    </div>
                  )}
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100"
                  onClick={() => alert('Start a new conversation')}
                >
                  Start New Conversation
                </Button>
              </Card.Footer>
            </Card>
          </div>

          {/* Right Column: Chat Area */}
          <div className="col-lg-8">
            <Card>
              <Card.Header>
                <Card.Title as="h5">
                  {selectedConversation ? `Chat with ${selectedConversation.user.name}` : 'Select a Conversation'}
                </Card.Title>
                {selectedConversation && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handlePinConversation(selectedConversation.id)}
                  >
                    {selectedConversation.pinned ? 'Unpin' : 'Pin'} Conversation
                  </Button>
                )}
              </Card.Header>
              <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
                {selectedConversation ? (
                  <div>
                    {selectedConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.senderId === user.id ? 'justify-content-end' : ''}`}
                      >
                        <div
                          className={`p-2 rounded ${msg.senderId === user.id ? 'bg-primary text-white' : 'bg-light'}`}
                          style={{ maxWidth: '70%' }}
                        >
                          <p className="mb-1">{msg.content}</p>
                          <p className="text-muted small mb-0">
                            {format(msg.time, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <BsChat size={32} className="mb-3" />
                    <p className="text-muted">Select a conversation to start chatting.</p>
                  </div>
                )}
              </Card.Body>
              {selectedConversation && (
                <Card.Footer>
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                      <Button variant="outline-primary" as="label" htmlFor="file-upload">
                        <BsPaperclip />
                      </Button>
                      <Button type="submit" variant="primary">
                        Send
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Footer>
              )}
            </Card>
          </div>
        </div>
      </div>
  );
}

export default Forum;