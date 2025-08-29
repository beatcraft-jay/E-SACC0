import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">E-Sacco</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#members">Members</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#loans">Loans</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#transactions">Transactions</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;