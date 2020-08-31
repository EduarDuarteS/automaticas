const { webkit } = require('playwright');

describe("Login and Logout Users", () => {

    let browser
    let page

    beforeEach(async () => {
        browser = await webkit.launch();
        page = await browser.newPage();
        await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
    })

    afterEach(async () => {
        await browser.close();
    })

    test('Login with created user', async () => {
        await page.waitForTimeout(3000);
        await page.click('button')
        await page.waitForTimeout(3000);
      
        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitForTimeout(3000);

        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
        await page.click('button')
        await page.waitForTimeout(3000);

        let welcome = await page.$eval('h1', el => el.innerText)
        expect(welcome).toEqual('Hi Jhonatan!')

    }, 18000)

    test('Logout', async () => {
        await page.waitForTimeout(3000);
        await page.click('button')
        await page.waitForTimeout(3000);
      
        await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
        await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');

        await page.click('button')
        await page.waitForTimeout(3000);

        await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
        await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
        await page.click('button')
        await page.waitForTimeout(3000)

        await page.click('a[href=\'/login\']')

        expect(page.url()).toEqual('https://angular-6-registration-login-example.stackblitz.io/login')

    }, 18000)

});