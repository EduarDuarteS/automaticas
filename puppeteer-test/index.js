const puppeteer = require('puppeteer');
 
//Principal flow
//It creates a new user and then does a login

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');

  await page.waitFor(2000);

  //console.log(await page.content());
  await page.screenshot({path: 'example.png'});
  await page.click('button')
  await page.waitFor(2000);

  await page.screenshot({path: 'example.png'});

  await (await page.$('input[formcontrolname=\'firstName\']')).type('Jhonatan');
  await (await page.$('input[formcontrolname=\'lastName\']')).type('Guzmán');
  await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
  await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
  await page.click('button')

  await page.waitFor(2000);
  await page.screenshot({path: 'example.png'});

  await (await page.$('input[formcontrolname=\'username\']')).type('Jhonnyguzz');
  await (await page.$('input[formcontrolname=\'password\']')).type('mypassword');
  await page.click('button')

  await page.waitFor(2000);
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();