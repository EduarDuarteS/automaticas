# Taller 2 - E2E Testing

## PlayWright

Playwright está diseñado para automatizar el amplio y creciente conjunto de capacidades del navegador web que utilizan las aplicaciones de una sola página y las aplicaciones web progresivas.

* Escenarios que abarcan varias páginas, dominios e iframes
* Espere automáticamente a que los elementos estén listos antes de ejecutar acciones (como hacer clic, rellenar)
* Interceptar la actividad de la red para realizar copias de seguridad y simular solicitudes de red
* Emular dispositivos móviles, geolocalización, permisos
* Soporte para componentes web a través de selectores de perforación de sombras
* Eventos de entrada nativos para mouse y teclado
* Cargar y descargar archivos

## Cuadro comparativo

||Cypress|Protractor|Puppeteer|PlayWright|
|--- |--- |--- |--- |--- |
|Interfaz gráfica|Sí|No|No|No|
|Generador de configuración|Sí|Sí (Con angular CLI)|No|No|
|Locators para AngularJS|No|Sí|No|No|
|Integración con Test frameworks|No, interno (sintaxis jasmine)|Jasmine, Mocha, Cucumber|Principalmente todos|Jest/Jasmine/AVA/Mocha|
|Sistemas operativos|Mac, Linux|Mac, Linux, Windows|Mac, Linux, Windows|Mac, Linux (Con dependencias), Windows|
|Grabación de pruebas|Sí|No|No|No|
|Selenium backend|No|Sí|No|No|
|Time-traveling|Sí|No|No|No|
