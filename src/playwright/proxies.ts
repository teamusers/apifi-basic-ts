import { chromium } from 'playwright';

const proxy = '120.237.144.57';

const browser = await chromium.launch({
    headless: false,
    // Using the "proxy" option
    proxy: {
        // Pass in the server URL
        server: proxy,
        
    },
});

// const proxy = 'my.proxy.com:3001';
// const username = 'someUsername';
// const password = 'password123';

// const browser = await chromium.launch({
//     headless: false,
//     proxy: {
//         server: proxy,
//         username,
//         password,
//     },
// });
// Proxy will now be authenticated

const page = await browser.newPage();
await page.goto('https://google.com');

await page.waitForTimeout(10000);
await browser.close();