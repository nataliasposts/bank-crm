import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RootRouter from './routes/RootRouter';

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <MainLayout>
          <RootRouter />
        </MainLayout>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
