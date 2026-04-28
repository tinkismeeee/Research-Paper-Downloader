import { Browser } from "../browser/browser.js";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import * as constants from "../const/const.js";
test("Open browser", async () => {
	const browser = new Browser();
	const page = await browser.get_page(constants.TestUrls.browserscan);
	// console.log(await page.title());
});
