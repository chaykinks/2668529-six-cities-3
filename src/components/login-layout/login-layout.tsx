import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AuthorizationStatus } from '../../const';

function LoginLayout(): JSX.Element {
  return (
    <>
      <Header
        authorizationStatus={AuthorizationStatus.NoAuth}
        isLoginPage
      />
      <Outlet />
    </>
  );
}

export default LoginLayout;
