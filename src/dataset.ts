import { Dataset } from 'crawlee';

// Configuration.getGlobalConfig().set('purgeOnStart', false);

export const DatasetSample = async () => {
    const { items } = await Dataset.getData();

    let mostExpensive;
    
    console.log('All items over $50 USD:');
    for (const { title, price } of items) {
        // Use a regular expression to filter out the
        // non-number and non-decimal characters
        const numPrice = Number(price.replace(/[^0-9.]/g, ''));
        if (numPrice > 50) console.table({ title, price });
        if (numPrice > mostExpensive?.price) mostExpensive = { title, price };
    }
    
    console.log('Most expensive product:');
    console.table(mostExpensive);
}