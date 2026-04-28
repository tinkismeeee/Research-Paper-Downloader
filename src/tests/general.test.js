import { OpenAlex } from '../apis/openalex.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import * as constants from '../const/const.js';
test('Open browser', async () => {
	const test = new OpenAlex();
	const doi = '10.1101/2021.10.26.21265516';
	const data = await test.fetchPaperData(doi);
	await test.checkIfPdfUrlsAvailable(data);
});
