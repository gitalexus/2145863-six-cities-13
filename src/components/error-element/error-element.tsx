import { ErrorCause } from '../../constants/errors';
import { fetchFavoritesApiAction, fetchNeighborsApiAction, fetchOfferApiAction, fetchOffersApiAction, fetchReviewsApiAction } from '../../store/api-actions';
import { ServerFullOffer } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import css from './error-element.module.css';

const ErrorMessage = {
	[ErrorCause.FetchOffers]: 'Could not fetch offers!',
	[ErrorCause.FetchOffer]: 'Could not fetch offer!',
	[ErrorCause.FetchNearPlaces]: 'Could not fetch near palces!',
	[ErrorCause.FetchReviews]: 'Could not fetch reviews!',
	[ErrorCause.FetchFavorites]: 'Could not fetch favorites!',
	[ErrorCause.Unknown]: 'Unknown error!',
};

type ErrorElementProps = {
	cause: ErrorCause;
	offerId?: ServerFullOffer['id'];
}

type ErrorFunctionType = {
	[key in ErrorCause]: () => Promise<void> | void;
	// [key in ErrorCause]: () => Promise<ServerOffer[]> | Promise<ServerFullOffer>| void;
};

function ErrorElement({cause, offerId}: ErrorElementProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// const ErrorFunction: Record<string, ()=> any> = {
	const ErrorFunction: ErrorFunctionType = {
		[ErrorCause.FetchOffers]: () => dispatch(fetchOffersApiAction()) ,
		[ErrorCause.FetchOffer]: () => offerId && dispatch(fetchOfferApiAction({offerId})),
		[ErrorCause.FetchNearPlaces]: () => offerId && dispatch(fetchNeighborsApiAction({offerId})),
		[ErrorCause.FetchReviews]: () => offerId && dispatch(fetchReviewsApiAction({offerId})),
		[ErrorCause.FetchFavorites]: () => dispatch(fetchFavoritesApiAction()),
		[ErrorCause.Unknown]: () => navigate(0),
	};

	const handleButtonClick = () => {
		ErrorFunction[cause]();
	};

	return (
		<div className={css.container}>
			<p className="message">{ErrorMessage[cause]}</p>
			<button
				onClick={handleButtonClick}
				className='button form__submit'
			>
				Try again!
			</button>
		</div>
	);
}

export default ErrorElement;
export {ErrorMessage};
