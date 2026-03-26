import {useState} from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import {CITIES} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../store';
import {State} from '../../store';
import {changeCity} from '../../store/action';
import CitiesList from '../../components/cities-list/cities-list';
import {SortType} from '../../const';
import Sorting from '../../components/sorting/sorting';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === currentCity);
  const isEmpty = filteredOffers.length === 0;
  const sortedOffers = [...filteredOffers];

  switch (currentSort) {
    case SortType.PriceLowToHigh:
      sortedOffers.sort((offerA, offerB) => offerA.price - offerB.price);
      break;
    case SortType.PriceHighToLow:
      sortedOffers.sort((offerA, offerB) => offerB.price - offerA.price);
      break;
    case SortType.TopRatedFirst:
      sortedOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
      break;
    case SortType.Popular:
    default:
      break;
  }

  return (
    <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>

      <CitiesList
        cities={CITIES}
        currentCity={currentCity}
        onCityClick={(city) => dispatch(changeCity(city))}
      />

      <div className="cities">
        <div
          className={`cities__places-container container ${
            isEmpty ? 'cities__places-container--empty' : ''
          }`}
        >
          {isEmpty ? (
            <>
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in {currentCity}
                  </p>
                </div>
              </section>

              <div className="cities__right-section" />
            </>
          ) : (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>

                <Sorting
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />

                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={sortedOffers}
                    cardClassName="cities"
                    handleHover={setActiveOfferId}
                  />
                </div>
              </section>

              <div className="cities__right-section">
                <Map
                  offers={sortedOffers}
                  activeOfferId={activeOfferId}
                  mapClassName="cities__map map"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
