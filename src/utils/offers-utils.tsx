import {SortType} from '../const';
import {Offer} from '../types/offer';

function getOffersByCity(offers: Offer[], city: string): Offer[] {
  return offers.filter((offer) => offer.city.name === city);
}

function sortOffers(offers: Offer[], sortType: SortType): Offer[] {
  const sortedOffers = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return sortedOffers.sort((offerA, offerB) => offerA.price - offerB.price);
    case SortType.PriceHighToLow:
      return sortedOffers.sort((offerA, offerB) => offerB.price - offerA.price);
    case SortType.TopRatedFirst:
      return sortedOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
    case SortType.Popular:
    default:
      return sortedOffers;
  }
}

function groupFavoriteOffersByCity(favouriteOffers: Offer[]): Record<string, Offer[]> {
  return favouriteOffers.reduce<Record<string, Offer[]>>((groupedOffers, offer) => {
    const cityName = offer.city.name;
    if (!groupedOffers[cityName]) {
      groupedOffers[cityName] = [];
    }
    groupedOffers[cityName].push(offer);
    return groupedOffers;
  }, {});
}

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export {getOffersByCity, sortOffers, groupFavoriteOffersByCity, capitalize};
