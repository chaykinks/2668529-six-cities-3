import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AuthorizationStatus } from '../../const';

type MainLayoutProps = {
  authorizationStatus: AuthorizationStatus;
};

function MainLayout({ authorizationStatus }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Header authorizationStatus={authorizationStatus} />
      <Outlet />
    </>
  );
}

export default MainLayout;
