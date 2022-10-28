import { chromium } from 'playwright';

const emailsToSend = [
    {
        to: 'abcdef123randomFakeEmail@gmail.com',
        subject: 'Hello',
        body: 'This is a message.',
    },
    {
        to: 'testingtesting12345903@aol.com',
        subject: 'Testing',
        body: 'I love the academy!'
    },
    {
        to: 'jimmyJohnBillyBob420@academy.net',
        subject: 'Apify is awesome!',
        body: 'Some content.'
    }
];

// Launch a browser and open a page
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://www.yahoo.com/');

// Agree to the cookies terms, then click on the "Sign in" button
// await page.click('button[name="agree"]');
await page.waitForSelector('a:has-text("Sign in")');

await page.click('a:has-text("Sign in")');
await page.waitForLoadState('load');

// Type in the username and continue forward
await page.type('input[name="username"]', 'darnelski@yahoo.com');
await page.click('input[name="signin"]');

// Type in the password and continue forward
await page.type('input[name="password"]', 'YOUR-PASSWORD-HERE');
await page.click('button[name="verifyPassword"]');
await page.waitForLoadState('load');

// Grab the cookies from the default browser context,
// which was used to log in
const cookies = await browser.contexts()[0].cookies();

await page.close();

// Create an array of promises, running the cookie passing
// and email sending logic each time
const promises = emailsToSend.map(({ to, subject, body }) =>
    (async () => {
        // Create a fresh non-persistent browser context
        const sendEmailContext = await browser.newContext();
        // Add the cookies from the previous one to this one so that
        // we'll be logged into Yahoo without having to re-do the
        // logging in automation
        await sendEmailContext.addCookies(cookies);
        const page2 = await sendEmailContext.newPage();

        await page2.goto('https://mail.yahoo.com/');

        // Compose an email
        await page2.click('a[aria-label="Compose"]');

        // Populate the fields with the details from the object
        await page2.type('input#message-to-field', to);
        await page2.type('input[data-test-id="compose-subject"]', subject);
        await page2.type('div[data-test-id="compose-editor-container"] div[contenteditable="true"]', body);

        // Send the email
        await page2.click('button[title="Send this email"]');

        await sendEmailContext.close();
    })()
);

// Wait for all emails to be sent
await Promise.all(promises);

// Wait for 10 seconds so we can see that we have in fact
// successfully logged in
await page.waitForTimeout(10000)

await browser.close();