import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://demo-webstore.apify.org/search/on-sale');

const products = await page.evaluate(() => {
    const productCards = Array.from(document.querySelectorAll('a[class*="ProductCard_root"]'));

    return productCards.map((element) => {
        const name = element.querySelector('h3[class*="ProductCard_name"]').textContent;
        const price = element.querySelector('div[class*="ProductCard_price"]').textContent;

        return {
            name,
            price,
        };
    });
});

console.log(products);

await page.waitForTimeout(10000);

await browser.close();