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

function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;