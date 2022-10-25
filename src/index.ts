import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';
// import { parse } from 'json2csv';
// import { writeFileSync } from 'fs';

const response = await gotScraping('https://demo-webstore.apify.org/search/on-sale');
const html = response.body;

const $ = cheerio.load(html);
const titleElement = $('title');
const titleText = titleElement.text();
console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
console.log(titleText);
console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
const results = [];

const products = $('a[href*="/product/"]');
for (const product of products) {
    const element = $(product);

    // const title = product.querySelector('h3').textContent.trim();
    // const price = product.querySelector('div[class*="price"]').textContent.trim();

    const title = element.find('h3').text();
    const price = element.find('div[class*="price"]').text();

    results.push({
        title,
        price,
    });
    console.log(element.text());
}
console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
console.log(results);
// const csv = parse(results);
// console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
// console.log(csv);

// writeFileSync('products.csv', csv);

const response2 = await gotScraping('https://demo-webstore.apify.org/');
const html2 = response2.body;

const $2 = cheerio.load(html2);

const links = $2('a');
console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
for (const link of links) {
    const url = $2(link).attr('href');
    console.log(url);
}

const WEBSITE_URL = 'https://demo-webstore.apify.org/';

const productLinks = $2('main.fit a[href*="/product/"]');
console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
for (const link of productLinks) {
    const relativeUrl:string = $2(link).attr('href') as string;
    const absoluteUrl = new URL(relativeUrl, WEBSITE_URL)
    console.log(absoluteUrl);
}
