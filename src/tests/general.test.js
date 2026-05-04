import { OpenAlex } from '../apis/openalex.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import * as constants from '../const/const.js';
import { CookieChecker } from '../utils/cookieProcess.js';
test('General test', async () => {
	// const cookie = JSON.parse(fs.readFileSync('cookie.json', 'utf-8'), null, 4);
	// console.log(JSON.stringify(cookie['.www.biorxiv.org'][cookie['.www.biorxiv.org'].length - 1], null, 4));
	const cookieChecker = new CookieChecker();
	console.log(await cookieChecker.checkCookieExpire('www.biorxiv.org'));
});
