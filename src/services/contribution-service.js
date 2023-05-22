/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from "axios";
import { latestContribution, user } from "../stores";

export const contributionService = {
	baseUrl: "http://Ujin:4000", // placemark hapi v2

	async login(email, password) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				user.set({
					email: email,
					token: response.data.token
				});
				localStorage.contribution = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		user.set({
			email: "",
			token: ""
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("contribution");
	},

	async signup(firstName, lastName, email, password) {
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

	reload() {
		const contributionCredentials = localStorage.contribution;
		if (contributionCredentials) {
			const savedUser = JSON.parse(contributionCredentials);
			user.set({
				email: savedUser.email,
				token: savedUser.token
			});
			axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
		}
	},
	
	async contribute(id, contribution) {
		try {
			const response = await axios.post(this.baseUrl + "/api/locations/" + id + "/contributions", contribution);
			latestContribution.set(contribution);
			return response.status == 200;
		} catch (error) {
			return false;
		}
	},
	

	async getLocations() {
		try {
			const response = await axios.get(this.baseUrl + "/api/locations");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getLocation(id) {
		try {
			const response = await axios.get(this.baseUrl + "/api/locations/" + id);
			return response.data;
		} catch (error) {
			return [];
		}
	},
	async getContributions() {
		try {
			const response = await axios.get(this.baseUrl + "/api/contributions");
			return response.data;
		} catch (error) {
			return [];
		}
	}
};

