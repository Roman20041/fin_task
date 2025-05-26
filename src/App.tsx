import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Search from './pages/Search';
import './styles/App.css';

/**
 * Главный компонент приложения
 * @returns {JSX.Element} Приложение с маршрутизацией и общей структурой
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={TopArtists} />
            <Route path="/tracks" component={TopTracks} />
            <Route path="/search" component={Search} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
