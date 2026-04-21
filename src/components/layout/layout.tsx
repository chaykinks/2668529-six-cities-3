import {Outlet, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AppRoute} from '../../const';
import {getFavorites} from '../../store/offers-slice/selectors';

function Layout(): JSX.Element {
  const {pathname} = useLocation();
  const favoriteOffers = useSelector(getFavorites);

  const isLoginPage = pathname === AppRoute.Login.toString();
  const isFavoritesPage = pathname === AppRoute.Favorites.toString();
  const isMainPage = pathname === AppRoute.Root.toString();
  const isFavoritesEmpty = isFavoritesPage && favoriteOffers.length === 0;

  let pageClassName = 'page';

  if (isMainPage) {
    pageClassName = 'page page--gray page--main';
  }

  if (isLoginPage) {
    pageClassName = 'page page--gray page--login';
  }

  if (isFavoritesEmpty) {
    pageClassName = 'page page--favorites-empty';
  }

  return (
    <div className={pageClassName}>
      <Header isLoginPage={isLoginPage} />
      <Outlet />
      {isFavoritesPage && <Footer />}
    </div>
  );
}

export default Layout;
