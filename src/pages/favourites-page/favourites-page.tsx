import OffersList from '../../components/offers-list/offers-list';
import {Offer} from '../../types/offer';

type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>

          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#todo">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>

              <div className="favorites__places">
                <OffersList offers={favoriteOffers} cardClassName="favorites" />
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
