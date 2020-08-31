const { chromium } = require('playwright');

describe("Register Users", () => {

    let browser
    let page

    beforeEach(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
    })

    afterEach(async () => {
        await browser.close();
    })

    test('Should register a new user', async () => {
        await page.waitForTimeout(3000);
        await page.click('button')
        await page.waitForTimeout(3000);
      
        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitForTimeout(3000);
    
        let message = await page.$eval('[class=\'alert alert-success\']', el => el.innerText)
        expect(message).toEqual('Registration successful')

    }, 10000)

    test('Should get error message', async () => {
        await page.waitForTimeout(3000);
        await page.click('button')
        await page.waitForTimeout(3000);
      
        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitForTimeout(3000);
    
        await page.click('a[class=\'btn btn-link\']')
        await page.waitForTimeout(3000);

        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitForTimeout(3000);

        let message = await page.$eval('[class=\'alert alert-danger\']', el => el.innerText)
        expect(message).toEqual('Username \"Jhonnyguzz\" is already taken')

    }, 18000)
});