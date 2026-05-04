import ms from 'ms';
import { DateTime } from 'luxon';
import console from 'node:console';
import fs from 'fs';
import { compose } from 'node:stream';

export class CookieChecker {
	async delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Get the latest cookie for a specific URL if it exists
	async getLatestCookie(url) {
		try {
			// Parse the cookie string into an object
			const cookie = JSON.parse(fs.readFileSync('cookie.json', 'utf-8'), null, 4);
			const latestCookie = cookie[`.${url}`][cookie[`.${url}`].length - 1];
			const cookieObject = latestCookie.cookies;
			return {
				cookies: cookieObject,
			};
		} catch (error) {
			return {
				cookies: null,
			};
		}
	}

	async checkCookieExpire(url) {
		try {
			const cookie = await this.getLatestCookie(url);
			if (!cookie || !cookie.cookies || cookie.cookies.length === 0) {
				return true;
			}
			// console.log(cookie);
			// cf_clearance expire time
			const expireTime = cookie?.cookies?.[0]?.expires;
			if (!expireTime) {
				return true;
			}
			// Check if cookie will expire in the next 24 hours (in ms)
			if (Date.now() >= expireTime * 1000 - 86400 * 1000) {
				return true;
			}
			return false;
		} catch (error) {
			// Cookie not found or error occurred
			return true;
		}
	}
}

export default CookieChecker;
