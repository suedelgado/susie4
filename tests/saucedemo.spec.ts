import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { InventoryPage } from "../pages/InventoryPage.ts";
import { CartPage } from "../pages/CartPage.ts";
import { CheckoutPage } from "../pages/CheckoutPage.ts";

const CONTRASENA = "secret_sauce";

type Paginas = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

// Fixtures: cada prueba recibe sus páginas ya creadas
const test = base.extend<Paginas>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
    cartPage: async ({ page }, use) => use(new CartPage(page)),
    checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

test.beforeEach(async ({ loginPage }) => {
    await loginPage.abrir();
});

test("login exitoso con standard_user", async ({ loginPage, inventoryPage }) => {
    await loginPage.iniciarSesion("standard_user", CONTRASENA);
    await inventoryPage.verificarCargada();
    await expect(inventoryPage.productos).toHaveCount(6);
});

test("usuario bloqueado ve un mensaje de error", async ({ loginPage }) => {
    await loginPage.iniciarSesion("locked_out_user", CONTRASENA);
    await loginPage.verificarError("Sorry, this user has been locked out.");
});

test("ordenar productos por precio de menor a mayor", async ({ loginPage, inventoryPage }) => {
    await loginPage.iniciarSesion("standard_user", CONTRASENA);
    await inventoryPage.ordenarPor("lohi");

    const precios = await inventoryPage.obtenerPrecios();
    const ordenados = [...precios].sort((a, b) => a - b);
    expect(precios).toEqual(ordenados);
});

test("agregar y quitar productos del carrito", async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.iniciarSesion("standard_user", CONTRASENA);
    await inventoryPage.agregarAlCarrito("Sauce Labs Backpack");
    await inventoryPage.agregarAlCarrito("Sauce Labs Bike Light");
    await expect(inventoryPage.contadorCarrito).toHaveText("2");

    await inventoryPage.irAlCarrito();
    await cartPage.verificarProductos(["Sauce Labs Backpack", "Sauce Labs Bike Light"]);

    await cartPage.quitarProducto("Sauce Labs Backpack");
    await cartPage.verificarProductos(["Sauce Labs Bike Light"]);
    await expect(inventoryPage.contadorCarrito).toHaveText("1");
});

test("compra completa de principio a fin", async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.iniciarSesion("standard_user", CONTRASENA);
    await inventoryPage.agregarAlCarrito("Sauce Labs Onesie");
    await inventoryPage.irAlCarrito();
    await cartPage.irAlCheckout();

    await checkoutPage.llenarDatos("Susana", "Delgado", "12345");
    await checkoutPage.finalizarCompra();
    await checkoutPage.verificarCompraExitosa();
});
