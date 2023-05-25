import axios from "axios";
import { latestContribution, loggedInUser } from "../stores";
import type { Location, LocationContributions, Contribution } from "./contribution-types";

export const contributionService = {
	baseUrl: "http://Ujin:4000", // placemark hapi v2

	async login(email: string, password: string): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				loggedInUser.set({
					email: email,
					token: response.data.token,
					_id: response.data.id
				});
				localStorage.donation = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		loggedInUser.set({
			email: "",
			token: "",
			_id: ""
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("contribution");
	},

	async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	checkPageRefresh() {
		if (!axios.defaults.headers.common["Authorization"]) {
			const contributionCredentials = localStorage.contribution;
			if (contributionCredentials) {
				const savedUser = JSON.parse(contributionCredentials);
				loggedInUser.set({
					email: savedUser.email,
					token: savedUser.token,
					_id: savedUser._id
				});
				axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
			}
		}
	},
	
	async contribute(contribution: Contribution) {
		try {
			const response = await axios.post(this.baseUrl + "/api/contributions", contribution);
			latestContribution.set(contribution);
			return response.status == 200;
		} catch (error) {
			return false;
		}
	},
	

	async getLocations(): Promise<Location[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/locations");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getContributions(): Promise<Contribution[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/contributions");
			return response.data;
		} catch (error) {
			return [];
		}
	},
	async getContributionsByLocation(location: Location): Promise<Contribution[]> {
		try {
			const response = await axios.get(`${this.baseUrl}/api/locations/${location._id}/contributions`);
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getContributionsByLocations(): Promise<LocationContributions[]> {
		const contributionsByLocation: LocationContributions[] = [];
		const locations = await contributionService.getLocations();
		for (let i = 0; i < locations.length; i++) {
			const contributions = {
				location: locations[i],
				contributions: await contributionService.getContributionsByLocation(locations[i])
			};
			contributionsByLocation.push(contributions);
		}
		return contributionsByLocation;
	}
};

