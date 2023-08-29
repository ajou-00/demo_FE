import { Routes, Route, Router } from 'react-router-dom';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Store } from './pages/Store';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import NotFound from './pages/404';
import Result from './components/Result';
import { MainPage } from './pages/MainPage';
import { Login } from './pages/Login';

function App() {
  const [condition, setCondition] = useState<boolean>(true);

  return (
    <div>
      {condition ? (
        <Routes>
          <Route path="/" element={<Login condition={condition} setCondition={setCondition} />} />
        </Routes>
      )
        :
        <div>
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

        </div>
      }
    </div>
  )

}

export default App;
