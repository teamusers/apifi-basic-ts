import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// await page.addInitScript(() => {
//     // Override the prototype
//     Node.prototype.addEventListener = () => { /* do nothing */ };
// });

await page.goto('https://google.com/');

const returnMessage = () => 'Apify academy!';

const randomString = Math.random().toString(36).slice(2);

await page.evaluate(() => {
    document.body.style.background = 'green';
});

await page.evaluate(({ randomString }) => {
    document.querySelector('title')!.textContent = randomString;
}, { randomString });

await page.exposeFunction(returnMessage.name, returnMessage);

const msg = await page.evaluate(() => returnMessage());

console.log(msg);

await page.waitForTimeout(10000)

await browser.close();