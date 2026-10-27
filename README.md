# OOP Challenge

Calculadora de consola en TypeScript que usa una clase `Calculator` para sumar y restar dos números, validando la entrada del usuario.

## Requisitos

- Node.js 23.6 o superior (ejecuta TypeScript directamente)

## Cómo ejecutarlo

```bash
npm start
```

El programa pide dos números y muestra su suma y su resta. Si escribes algo que no es un número, muestra un mensaje de error.

## Pruebas de Playwright (SauceDemo)

Suite de 5 pruebas con Page Object Model contra https://www.saucedemo.com. Las clases de páginas están en `pages/` y las pruebas en `tests/`.

```bash
npx playwright install chromium   # solo la primera vez
npm test                          # ejecuta las pruebas
npm run report                    # abre el reporte HTML
```

Si una prueba falla, en `test-results/` se guardan la captura de pantalla, el video y el trace (`npx playwright show-trace <ruta>/trace.zip`).
