// src/components/MainLayout.jsx
import Header from '../Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>{children}</div>
    </>
  );
};

export default MainLayout;
