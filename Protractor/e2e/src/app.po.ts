import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    console.log("entro a navigateTo");
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    console.log("entro a getTitleText");
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
