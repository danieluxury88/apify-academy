import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.6.0.min.js' });

const products = await page.evaluate(() => {
    const productCards = Array.from($('a[class*="ProductCard_root"]'));

    return productCards.map((element) => {
        const card = $(element);

        const name = card.find('h3[class*="ProductCard_name"]').text();
        const price = card.find('div[class*="ProductCard_price"]').text();

        return {
            name,
            price,
        };
    });
});

console.log(products);

await page.waitForTimeout(10000);

await browser.close();