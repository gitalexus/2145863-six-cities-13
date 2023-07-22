import {faker} from '@faker-js/faker';
import {
	ServerOffer,
	ServerFullOffer,
	ServerLocation,
	CityName,
	Rating,
	ServerRewiew,
	ServerCommentWithOfferId} from '../types/offer';
import { CITIES, CitiesGPS, OFFER_TYPES, LOCATION_RADIUS } from '../constants';
import { TemporalData } from '../constants';

function getMockLocation(city: CityName, isOffer = true): ServerLocation {

	if (isOffer) {
		const placeLocation = faker.location.nearbyGPSCoordinate({
			isMetric: true,
			origin: [CitiesGPS[city].latitude, CitiesGPS[city].longitude],
			radius: LOCATION_RADIUS,
		});

		return {
			latitude: placeLocation[0],
			longitude: placeLocation[1],
			zoom: faker.number.int({min: 1, max: 16}),
		};
	}

	return {
		latitude: CitiesGPS[city].latitude,
		longitude: CitiesGPS[city].longitude,
		zoom: faker.number.int({min: 1, max: 16}),
	};
}

function createMockOffer(): ServerOffer {
	const city = faker.helpers.arrayElement(CITIES);
	const type = faker.helpers.arrayElement(OFFER_TYPES);
	let title = `${faker.company.buzzAdjective()} ${type} ${faker.company.buzzPhrase()}`;
	title = title[0]?.toUpperCase() + title?.slice(1);

	return {
		id: faker.string.nanoid(),
		title: title,
		type: type,
		price: faker.number.int({min: 50, max: 1500}),
		city: {
			name: city,
			location: getMockLocation(city, false),
		},
		location: getMockLocation(city),
		isFavorite: faker.datatype.boolean(),
		isPremium: faker.datatype.boolean(),
		rating: faker.number.float({min: 1, max: 5, precision: 0.1}) as Rating,
		previewImage: faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'}),
	};
}

function createFullMockOffer(mockOffer: ServerOffer): ServerFullOffer {
	return {
		...mockOffer,
		description: faker.helpers.multiple(faker.commerce.productDescription, {count: {min: 1, max: 4}}),
		bedrooms: faker.number.int({min: 1, max: 5}),
		goods: Array.from({length: faker.number.int({min: 4, max: 10})}, faker.commerce.product),
		host: {
			name: faker.person.fullName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		images: Array(faker.number.int({min: 1, max: 6}))
			.fill(null)
			.map(() => faker.image.urlLoremFlickr({width: 260, height: 200, category: 'interior,room,modern,apartment'})),
		maxAdults: faker.number.int({min: 1, max: 5}),
	};
}

function createMockReviw(): ServerRewiew {
	return {
		id: faker.string.nanoid(),
		date: faker.date.between(
			{from: TemporalData.CommentMinDate, to: TemporalData.CommentMaxDate})
			.toISOString(),
		user: {
			name: faker.person.firstName(),
			avatarUrl: faker.image.avatar(),
			isPro: faker.datatype.boolean(),
		},
		comment: Array.from({length: faker.number.int({min: 1, max: 5})}, faker.company.buzzPhrase).join(' '),
		rating: faker.number.int({min: 1, max: 5}) as Rating,
	};
}

const offers: ServerOffer[] = Array.from({length: TemporalData.OfferAmount}, createMockOffer);
const fullOffers: ServerFullOffer[] = offers.map((offer) => createFullMockOffer(offer));
const reviews: ServerCommentWithOfferId[] = [];

offers.forEach((offer) => {
	const commnetsAmoutn = faker.number.int({min: 0, max: TemporalData.CommentMaxAmount});

	for (let i = 0; i < commnetsAmoutn; i++) {
		reviews.push({...createMockReviw(), offerId: offer.id});
	}
});

function getMockNeighbourPlaces(): ServerOffer[] {
	const placesAmount = faker.number.int({min: 3, max: 6});
	const places = Array.from(
		{length: placesAmount},
		(): ServerOffer => ({...offers[Math.floor(Math.random() * offers.length)]})
	);

	return places;
}

export {offers, fullOffers, reviews, getMockNeighbourPlaces};
