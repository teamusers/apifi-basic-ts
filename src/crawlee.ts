import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request, enqueueLinks }) => {
        console.log('URL: ', request.url);
        console.log('Title: ', $('title').text());

        // We only want to enqueue the URLs from the first page.
        if (request.label === 'START') {
            await enqueueLinks({
                // The selector is from our earlier code.
                selector: 'a[href*="/product/"]',
                // The baseUrl option automatically resolves relative URLs.
                baseUrl: new URL(request.url).origin,
            });
        }

        // We copied and pasted the extraction code
        // from the previous lesson
        const title = $('h3').text().trim();
        const price = $('h3 + div').text().trim();
        const description = $('div[class*="Text_body"]').text().trim();

        // Instead of saving the data to a variable,
        // we immediately save everything to a file.
        await Dataset.pushData({
            title,
            description,
            price,
        });
    },
});

await crawler.addRequests([{
    url: 'https://demo-webstore.apify.org/search/on-sale',
    // By labeling the Request, we can very easily
    // identify it later in the requestHandler.
    userData: {
        label: 'START',
    },
}]);

await crawler.run();