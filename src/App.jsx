import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Home, Search, MovieDetails, Movies, NotFound } from './pages';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movies/:category" element={<Movies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
