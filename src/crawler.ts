// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

const WEBSITE_URL = 'https://demo-webstore.apify.org/';

const response = await gotScraping('https://demo-webstore.apify.org/');
const html = response.body;
const $ = cheerio.load(html);

const productLinks = $('a[href*="/product/"]');

const productsToScrape = [];
for (const link of productLinks) {
    const relativeUrl:string = $(link).attr('href') as string;
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);
    productsToScrape.push(absoluteUrl.href);
}

for (const link of productsToScrape) {
    // Everything else is exactly the same.
    // We only wrapped the code in try/catch blocks.
    // The try block passes all errors into the catch block.
    // So, instead of crashing the crawler, they can be handled.
    try {
        // The try block attempts to execute our code
        const productResponse = await gotScraping(link);
        const productHTML = productResponse.body;
        const $$ = cheerio.load(productHTML);
        const productPageTitle = $$('h3').text();
        console.log(productPageTitle);
    } catch (error) {
        // In the catch block, we handle errors.
        // This time, we will just print
        // the error message and the url.
        console.error((error as Error).message, link)
    }
}