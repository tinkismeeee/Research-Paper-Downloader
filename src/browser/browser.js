import playwright from "rebrowser-playwright";
import axios from "axios";
import fs from "fs";

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
			const request = await axios.get("https://jnrbsn.github.io/user-agents/user-agents.json");
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

	async close() {
		if (this.browser) {
			await this.browser.close();
		}
	}
}

export default Browser;
