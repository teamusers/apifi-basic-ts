import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

const page = await browser.newPage();

await page.goto('https://google.com')

// Click the "I agree" button
// await page.click('button:has-text("I agree")');

// Type the query into the search box
await page.type('input[title="Search"]', 'hello world');

// Press enter
await page.keyboard.press('Enter');

// Click the first result
await page.click('.g a');

await page.waitForLoadState('load');

// Grab the title and set it to a variable
const title = await page.title();

// Log the title to the console
console.log(title);

// Take the screenshot and write it to the filesystem
await page.screenshot({ path: 'screenshot.png' });

// // wait for 10 seconds before shutting down
// await page.waitForTimeout(10000)

// await browser.close();