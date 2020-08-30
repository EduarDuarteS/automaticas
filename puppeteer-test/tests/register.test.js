const puppeteer = require('puppeteer');

describe("Register Users", () => {

    test('Should register a new user', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
      
        await page.waitFor(3000);
        await page.click('button')
        await page.waitFor(3000);
      
        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitFor(3000);
    
        let message = await page.$eval('[class=\'alert alert-success\']', el => el.innerText)
    
        await browser.close();
    
        expect(message).toEqual('Registration successful')

    }, 20000)
});