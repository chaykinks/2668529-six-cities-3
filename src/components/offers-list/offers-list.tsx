import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  cardClassName: string;
  onCardHover?: (offerId: number | null) => void;
};

function OffersList({offers, cardClassName, onCardHover}: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardClassName={cardClassName}
          onHover={onCardHover}
        />
      ))}
    </>
  );
}

export default OffersList;
