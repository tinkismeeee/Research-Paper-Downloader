import { chromium } from 'rebrowser-playwright';
import axios from 'axios';
import * as constants from '../const/const.js';
import { time } from 'console';

export class Browser {
	static buffer = 1000;
	constructor() {
		if (!Browser.instance) {
			Browser.instance = this;
			this.browser = null;
			this.launchPromise = null;
			this.userAgent = null;
			process.on('exit', async () => {
				await this.close();
			});
		}
		return Browser.instance;
	}

	async delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async get_user_agent() {
		try {
			const request = await axios.get(constants.URLS.USER_AGENT);
			const response = await request.data;
			if (response && response.length > 0) {
				return response[Math.floor(Math.random() * response.length)];
			} else {
				return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61';
			}
		} catch (error) {
			// Default useragent in case of error
			return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61';
		}
	}
	async launch_browser() {
		// Return existing browser if already launched
		if (this.browser) {
			return this.browser;
		}
		// If a launch is already in progress, do not start another one
		if (this.launchPromise) {
			return this.launchPromise;
		}
		// If no launch in progress, start a new one
		this.launchPromise = this._launch_browser();
		try {
			this.browser = await this.launchPromise;
			return this.browser;
		} finally {
			this.launchPromise = null;
		}
	}

	async _launch_browser() {
		try {
			this.userAgent = await this.get_user_agent();
			const isLinux = process.platform === 'linux';
			const baseArgs = [
				'--no-sandbox',
				'--mute-audio',
				'--disable-setuid-sandbox',
				'--ignore-certificate-errors',
				'--ignore-certificate-errors-spki-list',
				'--ignore-ssl-errors',
				// ANTI-DETECTION: Core automation hiding
				'--disable-blink-features=AutomationControlled',
				'--disable-automation',
				'--disable-extensions',
				// ANTI-DETECTION: Window behavior
				'--start-maximized',
				'--window-position=0,0',
				// ANTI-DETECTION: Disable telemetry and tracking features
				'--disable-client-side-phishing-detection',
				'--disable-component-update',
				'--disable-default-apps',
				'--disable-domain-reliability',
				'--disable-features=TranslateUI',
				'--disable-hang-monitor',
				'--disable-ipc-flooding-protection',
				'--disable-popup-blocking',
				'--disable-prompt-on-repost',
				'--disable-sync',
				// ANTI-DETECTION: WebRTC hardening
				'--disable-webrtc-hw-encoding',
				'--disable-webrtc-hw-decoding',
				'--force-webrtc-ip-handling-policy=disable_non_proxied_udp',
				// ANTI-DETECTION: Disable GPU features that leak info
				'--disable-gpu-sandbox',
				'--disable-accelerated-2d-canvas',
				'--disable-gpu-compositing',
				// ANTI-DETECTION: Disable features that identify headless mode
				'--disable-backgrounding-occluded-windows',
				'--disable-renderer-backgrounding',
				'--disable-background-timer-throttling',
				'--disable-save-password-bubble',
				'--disable-infobars',
				// ANTI-DETECTION: Navigator properties
				'--disable-features=site-per-process',
				'--disable-features=IsolateOrigins',
				// ANTI-DETECTION: Timing attack prevention
				'--disable-features=ReduceUserAgent',
				'--disable-features=ScriptStreaming',
				// PERFORMANCE: Stability
				'--disable-breakpad',
				'--no-first-run',
				'--no-default-browser-check',
				'--no-zygote',
				// ANTI-DETECTION: Make WebDriver undetectable
				'--enable-features=NetworkService,NetworkServiceInProcess',
			];
			const platformStabilityArgs = isLinux
				? [
						'--single-process', // Safe on Linux with proper memory management
						'--disable-dev-shm-usage',
						'--disable-software-rasterizer',
						'--disable-http-cache',
						'--disk-cache-size=1',
					]
				: [
						// Windows-specific stability (avoid --single-process which crashes Chromium context)
						'--disable-background-networking',
						'--disable-preconnect',
						'--disable-web-resources',
						'--disable-component-extensions-with-background-pages',
						'--disable-translate',
						'--disable-sync-on-cellular',
						'--disable-device-discovery-notifications',
						'--disable-default-language',
						'--disable-print-preview',
					];
			const launchTimeout = isLinux ? 90000 : 120000;
			const args = [...baseArgs, ...platformStabilityArgs];
			const browser = await chromium.launch({
				headless: constants.PlaywrightConfig.headless,
				args: args,
				timeout: launchTimeout,
			});
			await this.delay(Browser.buffer);
			return browser;
		} catch (error) {
			//console.error("Error launching browser:", error);
			throw error;
		}
	}

	async get_page(url) {
		if (!this.browser) {
			await this.launch_browser();
		}
		if (!this.userAgent) {
			this.userAgent = await this.get_user_agent();
		}
		const context = await this.browser.newContext({
			userAgent: this.userAgent,
		});
		const page = await context.newPage();
		await page.goto(url, {
			waitUntil: 'domcontentloaded',
			timeout: constants.Constants.Timeout,
		});
		return page;
	}

	async close() {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
			this.userAgent = null;
			// console.log("Browser closed successfully");
		}
	}
}

export default Browser;
