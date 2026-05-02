export const URLS = {
	USER_AGENT: 'https://jnrbsn.github.io/user-agents/user-agents.json',
	OPENALEX_INDEX: 'https://api.openalex.org/works/doi',
	SCINET: 'https://sci-net.xyz/',
	ARXIV: 'https://arxiv.org/',
	BIORXIV: 'https://www.biorxiv.org/',
	MEDRXIV: 'https://www.medrxiv.org/',
	DLDJournal: 'https://www.dldjournalonline.com/',
};

export const PlaywrightConfig = {
	headless: false,
};

export const Paths = {
	UA: './src/browser/useragent.json',
};

export const Constants = {
	MAX_RETRIES: 3,
	Timeout: 10000,
};

export const TestUrls = {
	creepjs: 'https://abrahamjuliot.github.io/creepjs/',
	botcheck: 'https://botcheck.luminati.io/',
	fvpro: 'https://fv.pro/',
	pixelscan: 'https://pixelscan.net/',
	browserscan: 'https://www.browserscan.net/bot-detection',
};
