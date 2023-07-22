import type { ServerOffer } from '../../types/offer';
import CardFavorite from '../../components/card-favorite/card-favorite';
import { filterDuplicates, stringCompare } from '../../utils/common';
import Header from '../../components/header/header';
import { useDocumentTitle } from '../../hooks';
import { ULink } from '../../components/u-link/u-link';
import { AppRoute, AuthorizationStatus } from '../../constants';

type FavoritesPageProps = {
	offers: ServerOffer[];
	status: AuthorizationStatus;
}

function FavoritesPage({offers, status}: FavoritesPageProps): React.JSX.Element {
	const isAuthorized = status === AuthorizationStatus.Auth;
	const favoriteOffers = offers
		.filter((offer) => offer.isFavorite)
		.sort((a, b) => stringCompare(a.city.name, b.city.name));
	const cities = favoriteOffers
		.map((offer) => offer.city.name)
		.filter(filterDuplicates);

	useDocumentTitle(`favorite places (${favoriteOffers.length})`);

	return (
		<div className="page">
			<Header favoriteAmount={favoriteOffers.length} isAuthorized={isAuthorized} />

			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">


							{ cities.length &&
								cities.map((city) => (
									// TODO: Добавить текущий <div className="favorites__locations locations locations--current">
									<li className="favorites__locations-items" key={city}>
										<div className="favorites__locations locations">
											<div className="locations__item">
												<ULink className="locations__item-link" href="#">
													<span>{city}</span>
												</ULink>
											</div>
										</div>
										<div className="favorites__places">
											{favoriteOffers
												.filter((offer) => offer.city.name === city)
												.map((offer) => (
													<CardFavorite offer={offer} key={offer.id} />
												))}
										</div>
									</li>
								))}

						</ul>
					</section>
				</div>
			</main>
			<footer className="footer container">
				<ULink className="footer__logo-link" href={AppRoute.Root}>
					<img
						className="footer__logo"
						src="img/logo.svg"
						alt="6 cities logo"
						width={64}
						height={33}
					/>
				</ULink>
			</footer>
		</div>
	);
}

export default FavoritesPage;
