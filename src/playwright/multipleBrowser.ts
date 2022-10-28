import { chromium, devices } from 'playwright';

// Launch the browser
const browser = await chromium.launch({ headless: false });

const iPhone = devices['iPhone 11 Pro'];
// Create a new context for our iPhone emulation
const iPhoneContext = await browser.newContext({ ...iPhone });
// Open a page on the newly created iPhone context
const iPhonePage = await iPhoneContext.newPage();

const android = devices['Galaxy Note 3'];
// Create a new context for our Android emulation
const androidContext = await browser.newContext({ ...android });
// Open a page on the newly created Android context
const androidPage = await androidContext.newPage();

// Go to deviceinfo.me on both at the same time
await Promise.all([iPhonePage.goto('https://www.deviceinfo.me/'), androidPage.goto('https://www.deviceinfo.me/')]);

for (const context of browser.contexts()) {
    // In Playwright, lots of events are supported in the "on" function of
    // a BrowserContext instance
    context.on('request', (req) => req.url() === 'https://www.deviceinfo.me/' && console.log('Site visited'));
}

// Wait for 10 seconds on both before shutting down
// await Promise.all([iPhonePage.waitForTimeout(10000), androidPage.waitForTimeout(10000)]);

// await browser.close();