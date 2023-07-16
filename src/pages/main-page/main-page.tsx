import { Helmet } from 'react-helmet-async';
import { ServerOffer } from '../../types/offer';
import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import OfferList from '../../components/offer-list/offer-list';
import Sort from '../../components/sort/sort';
import { useState } from 'react';


type MainPageProps = {
	offers: ServerOffer[];
};

/**
 * Компонент главного экрана
 * @component
 * @param placesCount общее количество найденный мест
 * @param favoriteCount Количество избранных
 */

function MainPage({offers}: MainPageProps): React.JSX.Element {
	const [activeCard, setActiveCard] = useState(offers[0]?.id);
	const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;
	return (
		<div className="page page--gray page--main">
			<Helmet>
				<title>6 Cities</title>
			</Helmet>
			<Header favoriteAmount={favoriteAmount} />

			<main className="page__main page__main--index">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<LocationsList />
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container container">
						<section className="cities__places places">
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">{offers.length} places to stay in Amsterdam</b>
							<Sort />
							<OfferList offers={offers} activeCard={activeCard} />
						</section>
						<div className="cities__right-section">
							<section className="cities__map map"></section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainPage;
