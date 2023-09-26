import { Route, Routes } from 'react-router-dom';
import RoutingPath from './routing';
import MainPage from 'src/pages/MainPage/MainPage';
import UserPage from 'src/pages/UserPage/UserPage';

const RootRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutingPath.DefaultPage} element={<MainPage />} />
      <Route path={RoutingPath.UserPage} element={<UserPage />} />
    </Routes>
  );
};

export default RootRouter;
