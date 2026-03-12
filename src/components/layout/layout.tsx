import {Outlet, useLocation} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AuthorizationStatus, AppRoute} from '../../const';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
};

function Layout({authorizationStatus}: LayoutProps): JSX.Element {
  const {pathname} = useLocation();

  const isLoginPage = pathname === AppRoute.Login.toString();
  const isFavoritesPage = pathname === AppRoute.Favorites.toString();
  const isMainPage = pathname === AppRoute.Root.toString();

  let pageClassName = 'page';

  if (isMainPage) {
    pageClassName = 'page page--gray page--main';
  }

  if (isLoginPage) {
    pageClassName = 'page page--gray page--login';
  }

  return (
    <div className={pageClassName}>
      <Header
        authorizationStatus={authorizationStatus}
        isLoginPage={isLoginPage}
      />
      <Outlet />
      {isFavoritesPage && <Footer />}
    </div>
  );
}

export default Layout;
