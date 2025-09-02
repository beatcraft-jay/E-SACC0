import { useState } from 'react';
import { Button, Card, Form, InputGroup, ListGroup, Badge, Dropdown } from 'react-bootstrap';
import { BsChat, BsPeople, BsQuestionCircle, BsPinAngle, BsPaperclip, BsThreeDots, BsEmojiSmile, BsPlusCircle, BsCheck2, BsCheck2All } from 'react-icons/bs';
import { format } from 'date-fns';
import AppLayout from '../components/AppLayout.jsx';
import jane from '../assets/img/jane.jpeg';
import mike from '../assets/img/mike.jpeg';

// Mock useAuth hook
function useAuth() {
  return {
    isAuthenticated: true,
    user: { id: '1', name: 'John Doe' },
  };
}

// Mock conversation data
const mockConversations = {
  individual: [
    {
      id: '1',
      user: { id: '2', name: 'Jane Smith', avatar: jane },
      lastMessage: 'Can we discuss the loan terms?',
      lastMessageTime: new Date(),
      pinned: false,
      unread: false,
      messages: [
        { id: 'm1', senderId: '2', content: 'Can we discuss the loan terms?', time: new Date(), status: 'delivered' },
        { id: 'm2', senderId: '1', content: 'Sure, let me check the details.', time: new Date(Date.now() - 3600000), status: 'sent' },
        { id: 'm3', senderId: '2', content: 'so?', time: new Date(), status: 'delivered' },
        { id: 'm4', senderId: '1', content: 'so you are currently not eligible for a loan. keep saving and try again in a few months, thank you.', time: new Date(Date.now() - 3600000), status: 'sent' },
      ],
    },
    {
      id: '2',
      user: { id: '3', name: 'Mike Johnson', avatar: mike },
      lastMessage: 'Thanks for the dividend update!',
      lastMessageTime: new Date(Date.now() - 86400000),
      pinned: true,
      unread: true,
      messages: [
        { id: 'm3', senderId: '3', content: 'Thanks for the dividend update!', time: new Date(Date.now() - 86400000), status: 'delivered' },
      ],
    },
  ],
  group: [
    {
      id: 'g1',
      name: 'Investors Group',
      members: ['2', '3', '4'],
      lastMessage: 'Meeting scheduled for next week.',
      lastMessageTime: new Date(Date.now() - 7200000),
      pinned: false,
      unread: true,
      messages: [
        { id: 'gm1', senderId: '2', content: 'Meeting scheduled for next week.', time: new Date(Date.now() - 7200000), status: 'delivered' },
      ],
    },
  ],
  support: [
    {
      id: 's1',
      name: 'SACCO Support',
      lastMessage: 'Your loan application is under review.',
      lastMessageTime: new Date(Date.now() - 43200000),
      pinned: false,
      unread: true,
      messages: [
        { id: 'sm1', senderId: 'system', content: 'Your loan application is under review.', time: new Date(Date.now() - 43200000), status: 'delivered' },
      ],
    },
  ],
};

function Forum() {
  const { isAuthenticated, user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message || !selectedConversation) return;
    const { type, id } = selectedConversation;
    setConversations({
      ...conversations,
      [type]: conversations[type].map((conv) =>
        conv.id === id
          ? {
              ...conv,
              lastMessage: message,
              lastMessageTime: new Date(),
              unread: false,
              messages: [
                ...conv.messages,
                { id: `m${conv.messages.length + 1}`, senderId: user.id, content: message, time: new Date(), status: 'sent' },
              ],
            }
          : conv
      ),
    });
    setMessage('');
  };

  const handlePinConversation = (type, id) => {
    setConversations({
      ...conversations,
      [type]: conversations[type].map((conv) =>
        conv.id === id ? { ...conv, pinned: !conv.pinned } : conv
      ),
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedConversation) {
      const { type, id } = selectedConversation;
      setConversations({
        ...conversations,
        [type]: conversations[type].map((conv) =>
          conv.id === id
            ? {
                ...conv,
                lastMessage: `File: ${file.name}`,
                lastMessageTime: new Date(),
                unread: false,
                messages: [
                  ...conv.messages,
                  { id: `m${conv.messages.length + 1}`, senderId: user.id, content: `File: ${file.name}`, time: new Date(), status: 'sent' },
                ],
              }
            : conv
        ),
      });
      alert(`Uploading file: ${file.name}`);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleConversationAction = (action, conv) => {
    switch (action) {
      case 'block':
        alert(`Blocked ${conv.user ? conv.user.name : conv.name}`);
        break;
      case 'mute':
        alert(`Muted ${conv.user ? conv.user.name : conv.name}`);
        break;
      case 'delete':
        alert(`Deleted conversation with ${conv.user ? conv.user.name : conv.name}`);
        setConversations({
          ...conversations,
          [conv.type]: conversations[conv.type].filter((c) => c.id !== conv.id),
        });
        if (selectedConversation?.id === conv.id) setSelectedConversation(null);
        break;
      default:
        break;
    }
  };

  const handleNewConversation = (type) => {
    alert(`Start a new ${type} conversation`);
    // Add logic to create a new conversation or group
  };

  // Calculate unread message count for a conversation
  const getUnreadCount = (conv, userId) => {
    return conv.messages.filter((msg) => msg.senderId !== userId && msg.status === 'delivered').length;
  };

  const renderConversationList = (type, title, icon, conversationsList) => (
    <Card className="shadow main-text mb-3 conversation-card">
      <Card.Header className="shadow d-flex align-items-center justify-content-between">
        <Card.Title as="h5" className="d-flex align-items-center mb-0">
          {icon}
          <span className="ms-2">{title}</span>
        </Card.Title>
        {type !== 'support' && (
          <BsPlusCircle
            size={20}
            className="text-primary cursor-pointer"
            onClick={() => handleNewConversation(type)}
            title={`Start new ${type} conversation`}
          />
        )}
      </Card.Header>
      <Card.Body className="p-0 conversation-card-body">
        <ListGroup variant="flush">
          {conversationsList.length > 0 ? (
            conversationsList.map((conv) => {
              const unreadCount = getUnreadCount(conv, user.id);
              return (
                <ListGroup.Item
                  key={conv.id}
                  action
                  active={selectedConversation?.id === conv.id && selectedConversation?.type === type}
                  onClick={() => setSelectedConversation({ ...conv, type })}
                  className="d-flex accordion align-items-center gap-2 px-3 py-2"
                >
                  {type === 'individual' && (
                    <img
                      src={conv.user.avatar}
                      alt={conv.user.name}
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                  )}
                  {type === 'group' && <BsPeople size={40} className="text-primary" />}
                  {type === 'support' && <BsQuestionCircle size={40} className="text-info" />}
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex align-items-center gap-2">
                      <p className="fw-medium mb-1 text-truncate">{conv.user ? conv.user.name : conv.name}</p>
                      {unreadCount > 0 && (
                        <Badge bg="danger" pill className="unread-badge">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted small text-truncate mb-0" style={{ maxWidth: '100%' }}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-1">
                    <p className="text-muted small mb-0">{format(conv.lastMessageTime, 'MMM dd')}</p>
                    <span className={conv.unread ? 'text-muted' : 'text-primary'}>
                      {conv.unread ? <BsCheck2 size={16} className="tick" /> : <BsCheck2All size={16} className="tick" />}
                    </span>
                    {conv.pinned && <BsPinAngle size={16} className="text-primary" />}
                    {type === 'group' && <Badge bg="secondary">{conv.members.length} members</Badge>}
                  </div>
                </ListGroup.Item>
              );
            })
          ) : (
            <div className="p-3 text-center">
              {icon}
              <p className="text-muted">No {title.toLowerCase()} found.</p>
            </div>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <BsPerson size={48} className="text-warning mb-3" />
          <h1 className="h3 mb-2">Sign In Required</h1>
          <p className="text-muted mb-4">Please sign in to access the forum.</p>
          <Button href="/signin" variant="primary" size="lg">
            Sign In
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
      <div >
        <h1 className="display-6 mb-4">Community Forum</h1>
        <div className="row g-4">
          {/* Left Column: Three Rows for Conversations */}
          <div className="col-lg-4">
            {renderConversationList(
              'individual',
              'Individual Chats',
              <BsChat size={20} className="text-primary" />,
              conversations.individual
            )}
            {renderConversationList(
              'group',
              'Group Chats',
              <BsPeople size={20} className="text-primary" />,
              conversations.group
            )}
            {renderConversationList(
              'support',
              'Support Messages',
              <BsQuestionCircle size={20} className="text-info" />,
              conversations.support
            )}
          </div>

          {/* Right Column: Chat Area (Phone-like) */}
          <div className="col-lg-8">
            <Card className="shadow main-text phone-chat">
              <Card.Header className="shadow d-flex align-items-center justify-content-between">
                <Card.Title as="h5" className="mb-0">
                  {selectedConversation
                    ? `Chat with ${selectedConversation.user ? selectedConversation.user.name : selectedConversation.name}`
                    : 'Select a Conversation'}
                </Card.Title>
                {selectedConversation && (
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="chat-options" className="p-0">
                      <BsThreeDots size={20} className="text-light" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleConversationAction('block', selectedConversation)}>
                        Block
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleConversationAction('mute', selectedConversation)}>
                        Mute
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleConversationAction('delete', selectedConversation)}>
                        Delete Conversation
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handlePinConversation(selectedConversation.type, selectedConversation.id)}>
                        {selectedConversation.pinned ? 'Unpin' : 'Pin'} Conversation
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Card.Header>
              <Card.Body className="bg chat-area">
                {selectedConversation ? (
                  <div className="d-flex flex-column gap-3">
                    {selectedConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex ${msg.senderId === user.id ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        {msg.senderId !== user.id && selectedConversation.type === 'individual' && (
                          <img
                            src={selectedConversation.user.avatar}
                            alt={selectedConversation.user.name}
                            className="rounded-circle me-2"
                            width="32"
                            height="32"
                          />
                        )}
                        <div
                          className={`p-2 rounded ${msg.senderId === user.id ? 'bg-primary text-white' : 'bg-light'}`}
                          style={{ maxWidth: '70%', wordBreak: 'break-word' }}
                        >
                          <p className="mb-1">{msg.content}</p>
                          <p className="text-muted small mb-0">
                            {format(msg.time, 'HH:mm')} • {msg.status}{' '}
                            <span className={msg.status === 'sent' ? 'text-muted' : 'text-primary'}>
                              {msg.status === 'sent' ? <BsCheck2 size={14} className="tick" /> : <BsCheck2All size={14} className="tick" />}
                            </span>
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
                      <InputGroup.Text className="position-relative">
                        <BsEmojiSmile
                          className="cursor-pointer"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                        {showEmojiPicker && (
                          <div className="position-absolute bottom-100 mb-2 p-2 bg-white border rounded shadow">
                            {['😊', '👍', '😂', '❤️', '🚀'].map((emoji) => (
                              <span
                                key={emoji}
                                className="emoji cursor-pointer me-2"
                                onClick={() => handleEmojiSelect(emoji)}
                              >
                                {emoji}
                              </span>
                            ))}
                          </div>
                        )}
                      </InputGroup.Text>
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