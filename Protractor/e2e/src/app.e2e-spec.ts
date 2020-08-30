'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { link } from 'fs';

const expectedH1 = 'Tour of Heroes';
const expectedTitle = `${expectedH1}`;
const targetHero = { id: 15, name: 'Magneta' };
const targetHeroDashboardIndex = 3;
const nameSuffix = 'X';
const newHeroName = targetHero.name + nameSuffix;

class Hero {
  id: number;
  name: string;

  // Factory methods

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
    let stringsFromA = await li.all(by.css('a')).getText();
    let strings = stringsFromA[0].split(' ');
    return { id: +strings[0], name: strings[1] };
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
      id: +_id.substr(_id.indexOf(' ') + 1),
      name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Proyecto base', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topHeroes: element.all(by.css('app-root app-dashboard > div h4')),

      appHeroesHref: navElts.get(1),
      appHeroes: element(by.css('app-root app-heroes')),
      allHeroes: element.all(by.css('app-root app-heroes li')),
      selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),

      heroDetail: element(by.css('app-root app-hero-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Pruebas pedidas de protractor', () => {

    //Bucar Narco -> "Na"
    it('1. Buscar héroes', () => {

      //1. se ingresan los caracteres "Na"
      // element(by.id('search-box')).click();
      getPageElts().searchBox.sendKeys('Na');
      browser.waitForAngular();
      browser.sleep(1000);

      //2. Se revisan que los resultados de la busqueda sean 3 elementos
      expect(getPageElts().searchResults.count()).toBe(3);
    });

    //2. Eliminar un héroe
    it(`2. Eliminar un Heroe de la lista`, async () => {

      // A. Navegar a "/heroes" dando click en su boton
      const linkHeroes = element.all(by.css('app-root nav a')).get(1);
      linkHeroes.click();
      // console.log(element.querySelectorAll('.link').length);
      browser.sleep(1000);

      // B. Contar Heroes de la lista
      const listHeroes = await toHeroArray(element.all(by.css('app-root app-heroes li')));
      var numHeroes = listHeroes.length;
      // console.log("#heroes ", numHeroes);

      // C. elimnar un heroe
      let li = element(by.cssContainingText('li span.badge', '12')).element(by.xpath('../..'));
      li.element(by.buttonText('x')).click();
      browser.sleep(1000);

      // D. validar que la lista tenga un heroe menos
      const listHeroesAf = await toHeroArray(element.all(by.css('app-root app-heroes li')));
      let numHeroesAf = listHeroesAf.length;
      // console.log("#heroes ", numHeroesAf);

      // E. Validar que tenga un heroe menos en la lista
      expect(numHeroesAf).toEqual(numHeroes - 1, 'cantidad heroes');

    });

    // 3. Editar un héroe
    it(`3. Editar un Heroe`, async () => {

      // A. Regresar al Dashboard
      element.all(by.css('app-root nav a')).get(0).click();
      expect(browser.getTitle()).toEqual(expectedTitle);

      //A. se ingresan los caracteres "Tornado"
      getPageElts().searchBox.sendKeys('Tornado');
      browser.waitForAngular();
      // browser.sleep(2000);

      // B. Seleccionar el Heroe a editar
      getPageElts().searchResults.click();
      // browser.sleep(2000);

      // C. Editar el nombre del Heroe
      let input = element(by.css('input'));
      input.sendKeys("ooooo");
      // browser.sleep(2000);

      // D. Guardar la Edición 
      element.all(by.css('app-root button')).get(1).click();
      // browser.sleep(5000);

      // E. Validar la Edición 
      element.all(by.css('app-root nav a')).get(1).click();
      const listHeroes = await toHeroArray(element.all(by.css('app-root app-heroes li')));
      const expectedHeroes = listHeroes.filter(h => h.name === 'Tornadoooooo');
      expect('Tornadoooooo').toEqual(expectedHeroes[0].name);

    });

    // 4. Navegar a un héroe desde el dashboard
    it(`4. Navegar a un héroe desde el dashboard`, async () => {
      // A. Regresar al Dashboard
      element.all(by.css('app-root nav a')).get(0).click();
      expect(browser.getTitle()).toEqual(expectedTitle);

      // B. Navegar al heroe Celeritas desde el dasboard
      element.all(by.css('div a')).get(1).click();
      // browser.sleep(1000);

      // C. Validar que se encuentre cargado el heroe CELERITAS Details
      const name = await getPageElts().heroDetail.element(by.css('h2')).getText();
      expect('CELERITAS Details').toEqual(name);
    });

    // 5. Navegar a un héroe desde la lista de héroes
    it(`5. Navegar a un héroe desde la lista de héroes`, async () => {

      // A. Navegamos en el tour of Heroes
      element.all(by.css('app-root nav a')).get(1).click();
      // browser.sleep(10000);

      // B. Seleccionamos a Bombasto para navegar a el
      let li = element(by.cssContainingText('li span.badge', '13')).element(by.xpath('../..'));

      // C. Damos click en el heroe de la lista "Bombasto"
      li.click();
      // browser.sleep(3000);

      // C. Validar que se encuentre cargado el heroe BOMBASTO Details
      const name = await getPageElts().heroDetail.element(by.css('h2')).getText();
      expect('BOMBASTO Details').toEqual(name);
    });

  });

  it(`has title '${expectedTitle}'`, () => {
    // A. Regresar al Dashboard
    element.all(by.css('app-root nav a')).get(0).click();
    expect(browser.getTitle()).toEqual(expectedTitle);
  });

  it(`has h1 '${expectedH1}'`, () => {
    expectHeading(1, expectedH1);
  });

  const expectedViewNames = ['Dashboard', 'Heroes'];
  it(`has views ${expectedViewNames}`, () => {
    let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
    expect(viewNames).toEqual(expectedViewNames);
  });

  it('has dashboard as the active view', () => {
    let page = getPageElts();
    expect(page.appDashboard.isPresent()).toBeTruthy();
  });

});


function addToHeroName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
  let hTag = `h${hLevel}`;
  let hText = element(by.css(hTag)).getText();
  expect(hText).toEqual(expectedText, hTag);
};

function getHeroAEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getHeroLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toHeroArray(allHeroes: ElementArrayFinder): Promise<Hero[]> {
  let promisedHeroes = await allHeroes.map(Hero.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>>Promise.all(promisedHeroes);
}
