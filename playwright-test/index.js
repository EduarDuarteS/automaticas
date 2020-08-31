const { webkit } = require('playwright');

//Principal flow
//It creates a new user and then does a login
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');

  await page.click('button')
  await page.waitForTimeout(3000)

  await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
  await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
  await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
  await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
  await page.click('button')

  await page.waitForTimeout(2000);
  await page.screenshot({path: 'example.png'});

  await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
  await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
  await page.click('button')

  await page.waitForTimeout(2000);
  await page.screenshot({path: 'example.png'});

  await browser.close();

})();