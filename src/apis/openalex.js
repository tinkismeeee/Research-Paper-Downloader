import axios from 'axios';
import { URLS } from '../const/const.js';

export class OpenAlex {
	async fetchPaperData(doi) {
		try {
			const request = await axios.get(`${URLS.OPENALEX_INDEX}:${doi}`);
			const response = request.data;
			if (response && response.id) {
				return response;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async checkIfPdfUrlsAvailable(data) {
		try {
			// rarely works
			const primaryLocationPdfUrl = data.primary_location?.pdf_url;
			const bestOALocationPdfUrl = data.best_oa_location?.pdf_url;
			if (primaryLocationPdfUrl == null && bestOALocationPdfUrl == null) {
				console.log('No PDF URLs available');
				return null;
			}
			return primaryLocationPdfUrl || bestOALocationPdfUrl;
		} catch (error) {
			return null;
		}
	}

	async checkIfOpenAccess(data) {
		try {
			return data.open_access.is_oa;
		} catch (error) {
			return false;
		}
	}
}

export default OpenAlex;
