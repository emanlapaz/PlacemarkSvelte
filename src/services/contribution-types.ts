export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	_id: string;
}

export interface LoggedInUser {
	email: string;
	token: string;
	_id: string;
}

export interface Location {
	town: string;
	county: string;
	country: string;
	_id: string;
}

export interface Contribution {
	placemarkName: string;
	description: string;
	rating: number,
	category: string;
	location: Location;
	contributor: LoggedInUser;
	lat: number;
	lng: number;
	_id: string;
}

export interface LocationContributions {
	location: Location;
	contributions: Contribution[];
}
