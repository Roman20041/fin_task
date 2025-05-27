import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент заголовка приложения
 * @returns {JSX.Element} Шапка сайта с навигацией
 */
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <h1>Last.fm Clone</h1>
        <nav className="nav-links">
          <Link to="/">Top Artists</Link>
          <Link to="/tracks">Top Tracks</Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 