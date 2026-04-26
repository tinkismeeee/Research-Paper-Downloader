import playwright from "rebrowser-playwright";
import axios from "axios";
import fs from "fs";
import * as constants from "../const/const.js";
import { time } from "console";
export class Browser {
	static buffer = 1000;
	constructor() {
		if (!Browser.instance) {
			Browser.instance = this;
			process.on("exit", async () => {
				this.close();
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
				const obj = {
					useragent: response[Math.floor(Math.random() * response.length)],
				};
				fs.writeFileSync("./src/browser/useragent.json", JSON.stringify(obj, null, 4));
				return obj.useragent;
			} else {
				return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61";
			}
		} catch (error) {
			// Default useragent
			return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36 Unique/96.7.6401.61";
		}
	}
	async launch_browser() {
		try {
			const isLinux = process.platform === "linux";
			const baseArgs = [
				"--no-sandbox",
				"--mute-audio",
				"--disable-setuid-sandbox",
				"--ignore-certificate-errors",
				"--ignore-certificate-errors-spki-list",
				"--ignore-ssl-errors",
				// ANTI-DETECTION: Core automation hiding
				"--disable-blink-features=AutomationControlled",
				"--disable-automation",
				"--disable-extensions",
				// ANTI-DETECTION: Window behavior
				"--start-maximized",
				"--window-position=0,0",
				// ANTI-DETECTION: Disable telemetry and tracking features
				"--disable-client-side-phishing-detection",
				"--disable-component-update",
				"--disable-default-apps",
				"--disable-domain-reliability",
				"--disable-features=TranslateUI",
				"--disable-hang-monitor",
				"--disable-ipc-flooding-protection",
				"--disable-popup-blocking",
				"--disable-prompt-on-repost",
				"--disable-sync",
				// ANTI-DETECTION: WebRTC hardening
				"--disable-webrtc-hw-encoding",
				"--disable-webrtc-hw-decoding",
				"--force-webrtc-ip-handling-policy=disable_non_proxied_udp",
				// ANTI-DETECTION: Disable GPU features that leak info
				"--disable-gpu-sandbox",
				"--disable-accelerated-2d-canvas",
				"--disable-gpu-compositing",
				// ANTI-DETECTION: Disable features that identify headless mode
				"--disable-backgrounding-occluded-windows",
				"--disable-renderer-backgrounding",
				"--disable-background-timer-throttling",
				"--disable-save-password-bubble",
				"--disable-infobars",
				// ANTI-DETECTION: Navigator properties
				"--disable-features=site-per-process",
				"--disable-features=IsolateOrigins",
				// ANTI-DETECTION: Timing attack prevention
				"--disable-features=ReduceUserAgent",
				"--disable-features=ScriptStreaming",
				// PERFORMANCE: Stability
				"--disable-breakpad",
				"--no-first-run",
				"--no-default-browser-check",
				"--no-zygote",
				// ANTI-DETECTION: Make WebDriver undetectable
				"--enable-features=NetworkService,NetworkServiceInProcess",
			];
			const platformStabilityArgs = isLinux
				? [
						"--single-process", // Safe on Linux with proper memory management
						"--disable-dev-shm-usage",
						"--disable-software-rasterizer",
						"--disable-http-cache",
						"--disk-cache-size=1",
					]
				: [
						// Windows-specific stability (avoid --single-process which crashes Chromium context)
						"--disable-background-networking",
						"--disable-preconnect",
						"--disable-web-resources",
						"--disable-component-extensions-with-background-pages",
						"--disable-translate",
						"--disable-sync-on-cellular",
						"--disable-device-discovery-notifications",
						"--disable-default-language",
						"--disable-print-preview",
					];
			const launchTimeout = isLinux ? 90000 : 120000;
			const args = [...baseArgs, ...platformStabilityArgs];
			this.browser = await playwright.launch({
				headless: constants.PlaywrightConfig.headless,
				args,
				timeout: launchTimeout,
			});
			return this.browser;
		} catch (error) {
			console.error("Error launching browser:", error);
			throw error;
		}
	}
	async close() {
		if (this.browser) {
			await this.browser.close();
		}
	}
}

export default Browser;
