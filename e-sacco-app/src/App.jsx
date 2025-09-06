// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Notifications from './pages/Notifications.jsx';
import Settings from './pages/Settings.jsx';
import Forum from './pages/Forum.jsx';
import Faqs from './pages/Faqs.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import AppLayout from './components/AppLayout.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-vh-100" style={{ position: 'relative' }}>
                  <Index />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/dashboard"
              element={<AppLayout><Dashboard /></AppLayout>}
            />
            <Route
              path="/loans"
              element={<AppLayout><Loans /></AppLayout>}
            />
            <Route
              path="/profile"
              element={<AppLayout><Profile /></AppLayout>}
            />
            <Route
              path="/savings"
              element={<AppLayout><Savings /></AppLayout>}
            />
            <Route
              path="/shares"
              element={<AppLayout><Shares /></AppLayout>}
            />
            <Route
              path="/support"
              element={<AppLayout><Support /></AppLayout>}
            />
            <Route
              path="/transactions"
              element={<AppLayout><Transactions /></AppLayout>}
            />
            <Route
              path="/notifications"
              element={<AppLayout><Notifications /></AppLayout>}
            />
            <Route
              path="/settings"
              element={<AppLayout><Settings /></AppLayout>}
            />
            <Route
              path="/forum"
              element={<AppLayout><Forum /></AppLayout>}
            />
            <Route
              path="/faqs"
              element={<AppLayout><Faqs /></AppLayout>}
            />
            <Route
              path="*"
              element={<AppLayout><NotFound /></AppLayout>}
            />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;