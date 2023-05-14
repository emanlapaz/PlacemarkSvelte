/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from "axios";
import { user } from "../stores";

export const contributionService = {
	baseUrl: "http://localhost:4000", // hapi donation 4

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

	async contribute(contribution) {
		try {
			const response = await axios.post(this.baseUrl + "/api/categories/" + contribution.category + "/contributions", contribution);
			return response.status == 200;
		} catch (error) {
			return false;
		}
	},

	async getCategories() {
		try {
			const response = await axios.get(this.baseUrl + "/api/categories");
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