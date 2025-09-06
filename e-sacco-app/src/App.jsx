import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Index from './pages/Index.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Loans from './pages/Loans.jsx';
import NotFound from './pages/NotFound.jsx';
import Profile from './pages/Profile.jsx';
import Savings from './pages/Savings.jsx';
import Shares from './pages/Shares.jsx';
import Support from './pages/Support.jsx';
import Transactions from './pages/Transactions.jsx';
import SignIn from './pages/SignIn.jsx';
import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import AppSidebar from './components/AppSidebar.jsx';
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import Forum from './pages/Forum.jsx';
import Faqs from './pages/Faqs.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
    <NotificationProvider>
    <BrowserRouter>
      <div className="d-flex">
        <AppSidebar isOpen={sidebarOpen} />
        <div className="main-content flex-grow-1">
          <Header onToggleSidebar={toggleSidebar} />
          <main className="container py-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/shares" element={<Shares />} />
            <Route path="/support" element={<Support />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
    </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;