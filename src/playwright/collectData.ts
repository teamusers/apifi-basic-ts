import { chromium } from 'playwright';
import { load } from 'cheerio';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

const $ = load(await page.content());

const productCards = Array.from($('a[class*="ProductCard_root"]'))

const products = productCards.map((element) => {
    const card = $(element);

    const name = card.find('h3[class*="ProductCard_name"]').text();
    const price = card.find('div[class*="ProductCard_price"]').text();

    return {
        name,
        price,
    };
});

console.log(products);

await browser.close();