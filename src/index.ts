import inquirer from 'inquirer';
import { Crawlee } from './crawlee.js';
import { Crawlee2 } from './crawlee2.js';
import { Crawler } from './crawler.js';
import { DatasetSample } from './dataset.js';
import { Final } from './final.js';
import { Main } from './main.js';

inquirer.prompt([{type:"list", name:"apify", choices: ["crawlee", "crawlee2", "crawler", "dataset", "final", "main"]}]).then((ans) => {
    console.log('@@ans ', ans);
    switch(ans?.apify) {
        case 'crawlee':
            Crawlee();
            break;
        case 'crawlee2':
            Crawlee2();
            break;
        case 'crawler':
            Crawler();
            break;
        case 'dataset':
            DatasetSample();
            break;
        case 'final':
            Final();
            break;
        case 'main':
            Main();
            break;
        default:
            break;
    }
});