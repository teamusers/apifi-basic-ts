import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Listen for all requests
page.on('request', (req) => {
    // If the URL doesn't include our keyword, ignore it
    if (!req.url().includes('followings')) return;

    // Convert the request URL into a URL object
    const url = new URL(req.url());

    // Print the search parameters in object form
    console.log(Object.fromEntries(url.searchParams));
});

// Notice that the callback function is now async
page.on('response', async (res) => {
    if (!res.request().url().includes('followings')) return;

    // Grab the response body in JSON format
    try {
        const json = await res.json();
        console.log(json);
    } catch (err) {
        console.error(`Response wasn't JSON or failed to parse response.`)
    }
});

const blockedExtensions = ['.png', '.css', '.jpg', '.jpeg', '.pdf', '.svg'];

// Only listen for requests with one of our blocked extensions
// Abort all matching requests
// cache disabled
page.route(`**/*{${blockedExtensions.join(',')}}`, async (route) => route.abort());

// Use CDP session to block resources
// // cache enabled
// const client = await page.context().newCDPSession(page);
// await client.send('Network.setBlockedURLs', { urls: blockedExtensions });

// // Only listen for requests matching this regular expression
// page.route(/soundcloud.com\/tiesto/, async (route) => {
//     // Continue  the route, but replace "tiesto" in the URL with "mestomusic"
//     return route.continue({ url: route.request().url().replace('tiesto', 'mestomusic') });
// });


await page.goto('https://soundcloud.com/tiesto/following');

// await page.waitForTimeout(10000);
// await browser.close();