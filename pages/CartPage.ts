import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly productos: Locator;
    readonly botonCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productos = page.getByTestId("inventory-item");
        this.botonCheckout = page.getByTestId("checkout");
    }

    async verificarProductos(nombres: string[]): Promise<void> {
        await expect(this.productos.getByTestId("inventory-item-name")).toHaveText(nombres);
    }

    async quitarProducto(nombreProducto: string): Promise<void> {
        await this.productos
            .filter({ hasText: nombreProducto })
            .getByRole("button", { name: "Remove" })
            .click();
    }

    async irAlCheckout(): Promise<void> {
        await this.botonCheckout.click();
    }
}
