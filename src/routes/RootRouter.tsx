import { Route, Routes } from 'react-router-dom';
import RoutingPath from './routing';
import MainPage from '../pages/MainPage/MainPage';
import UserPage from '../pages/UserPage/UserPage';

const RootRouter = () => {
  return (
    <Routes>
      <Route path={RoutingPath.DefaultPage} element={<MainPage />} />
      <Route path={RoutingPath.UserPage} element={<UserPage />} />
    </Routes>
  );
};

export default RootRouter;
