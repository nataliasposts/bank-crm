import { ReactNode } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import MainLayoutWrapper from './MainLayoutWrapper';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <MainLayoutWrapper>
      <Header />
      {children}
      <Footer />
    </MainLayoutWrapper>
  );
};

export default MainLayout;
