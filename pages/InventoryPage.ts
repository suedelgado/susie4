import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly titulo: Locator;
    readonly productos: Locator;
    readonly nombresProductos: Locator;
    readonly preciosProductos: Locator;
    readonly ordenar: Locator;
    readonly contadorCarrito: Locator;
    readonly iconoCarrito: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titulo = page.getByTestId("title");
        this.productos = page.getByTestId("inventory-item");
        this.nombresProductos = page.getByTestId("inventory-item-name");
        this.preciosProductos = page.getByTestId("inventory-item-price");
        this.ordenar = page.getByTestId("product-sort-container");
        this.contadorCarrito = page.getByTestId("shopping-cart-badge");
        this.iconoCarrito = page.getByTestId("shopping-cart-link");
    }

    async verificarCargada(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.titulo).toHaveText("Products");
    }

    async agregarAlCarrito(nombreProducto: string): Promise<void> {
        await this.productos
            .filter({ hasText: nombreProducto })
            .getByRole("button", { name: "Add to cart" })
            .click();
    }

    async ordenarPor(opcion: "az" | "za" | "lohi" | "hilo"): Promise<void> {
        await this.ordenar.selectOption(opcion);
    }

    async obtenerPrecios(): Promise<number[]> {
        const textos = await this.preciosProductos.allTextContents();
        return textos.map((texto) => Number(texto.replace("$", "")));
    }

    async irAlCarrito(): Promise<void> {
        await this.iconoCarrito.click();
    }
}
