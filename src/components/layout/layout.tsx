import {Outlet, useLocation} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AppRoute, AuthorizationStatus} from '../../const';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
};

function Layout({authorizationStatus}: LayoutProps): JSX.Element {
  const {pathname} = useLocation();

  const isLoginPage = pathname === AppRoute.Login;
  const isFavoritesPage = pathname === AppRoute.Favorites;

  return (
    <>
      <Header
        authorizationStatus={authorizationStatus}
        isLoginPage={isLoginPage}
      />
      <Outlet/>
      {isFavoritesPage && <Footer/>}
    </>
  );
}

export default Layout;
