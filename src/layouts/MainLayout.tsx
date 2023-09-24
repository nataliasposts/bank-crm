import { ReactNode } from 'react';
import MainLayoutWrapper from './MainLayoutWrapper';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainLayoutWrapper>
      <Header />
      {children}
      <Footer />
    </MainLayoutWrapper>
  );
};

export default MainLayout;
