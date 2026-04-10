import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {groupFavoriteOffersByCity} from '../../utils/offers-utils';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useSelector((state: RootState) => state.OFFERS.favorites);
  const groupedFavoriteOffers = groupFavoriteOffersByCity(favoriteOffers);
  const cityNames = Object.keys(groupedFavoriteOffers);

  if (favoriteOffers.length === 0) {
    return <FavoritesEmpty />;
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>

          <ul className="favorites__list">
            {cityNames.map((cityName) => (
              <li className="favorites__locations-items" key={cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{cityName}</span>
                    </a>
                  </div>
                </div>

                <div className="favorites__places">
                  {groupedFavoriteOffers[cityName].map((offer) => (
                    <article className="favorites__card place-card" key={offer.id}>
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <a href={`/offer/${offer.id}`}>
                          <img
                            className="place-card__image"
                            src={offer.previewImage}
                            width="150"
                            height="110"
                            alt={offer.title}
                          />
                        </a>
                      </div>

                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">&euro;{offer.price}</b>
                            <span className="place-card__price-text">&#47;&nbsp;night</span>
                          </div>

                          <button
                            className="place-card__bookmark-button place-card__bookmark-button--active button"
                            type="button"
                          >
                            <svg className="place-card__bookmark-icon" width="18" height="19">
                              <use xlinkHref="#icon-bookmark" />
                            </svg>
                            <span className="visually-hidden">In bookmarks</span>
                          </button>
                        </div>

                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{width: `${Math.round(offer.rating) * 20}%`}} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>

                        <h2 className="place-card__name">
                          <a href={`/offer/${offer.id}`}>{offer.title}</a>
                        </h2>
                        <p className="place-card__type">{offer.type}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
