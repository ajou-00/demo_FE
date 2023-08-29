import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Store } from './pages/Store';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import NotFound from './pages/404';
import Result from './components/Result';
import { MainPage } from './pages/MainPage';

function App() {
  
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
