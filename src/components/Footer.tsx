import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент подвала сайта
 * @returns {JSX.Element} Футер с навигацией, выбором языка и информацией
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Last.fm</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><Link to="/track-my-music">Track My Music</Link></li>
            <li><Link to="/community">Community Guidelines</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Network</h4>
          <ul>
            <li><Link to="/pro">Last.fm Pro</Link></li>
            <li><Link to="/download">Download Scrobbler</Link></li>
            <li><Link to="/api">API</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cookies">Cookie Information</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com/lastfm" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com/lastfm" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com/lastfm" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="language-selector">
            <span>Language: </span>
            <select>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
              <option value="pl">Polski</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="tr">Türkçe</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="copyright">
            <span>Powered by Last.fm Clone</span>
          </div>
          <div className="cbs-logo">
            <span>CBS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 