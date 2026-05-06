import { ScihubSELECTORS, URLS } from '../const/const.js';
import axios from 'axios';
import { Browser } from '../browser/browser.js';
export class Scihub {
	static buffer = 1000;
	constructor() {
		if (!Scihub.instance) {
			Scihub.instance = this;
		}
		return Scihub.instance;
	}

	async delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async getUseragent() {
		try {
			const request = await axios.get(URLS.USER_AGENT);
			const response = request.data;
			if (response && response.length > 0) {
				const randomUA = response[Math.floor(Math.random() * response.length)];
				return randomUA;
			}
			return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61';
		} catch (error) {
			return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61';
		}
	}
}

export default Scihub;
