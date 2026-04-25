import { Browser } from "../browser/browser.js";
import test from "node:test";
import assert from "node:assert/strict";

test("Fetch useragent", async () => {
	const browser = new Browser();
	console.log(await browser.get_user_agent());
});
