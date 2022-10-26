import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

export const Final = async () => {
    const BASE_URL = 'https://demo-webstore.apify.org';

    const response = await gotScraping(`${BASE_URL}/search/on-sale`);
    const $ = cheerio.load(response.body);
    
    const productLinks = [];
    
    for (const product of $('a[href*="product"]')) {
        const relative:string = $(product).attr('href') as string;
        const url = new URL(relative, BASE_URL);
        productLinks.push(url);
    }
    
    // A new array to save each product in
    const results = [];
    
    // An optional array we can push to when we hit an error
    const errors = [];
    
    for (const url of productLinks) {
        try {
            // we download HTML of each country page.
            const productResponse = await gotScraping(url);
            const $$ = cheerio.load(productResponse.body);
    
            // And this is where we use data collection logic.
            // Don't forget to update $ to $$, or you'll get errors.
            const title = $$('h3').text().trim();
            const price = $$('h3 + div').text().trim();
            const description = $$('div[class*="Text_body"]').text().trim();
    
            results.push({
                title,
                description,
                price,
            });
        } catch (error) {
            // Push information about the error to the
            // "errors" array so we can check it later
            errors.push({
                url,
                err: (error as Error).message,
            });
        }
    }
    
    console.log(`${results.length} results:`);
    console.log(results);
}