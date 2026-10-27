import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly nombre: Locator;
    readonly apellido: Locator;
    readonly codigoPostal: Locator;
    readonly botonContinuar: Locator;
    readonly botonFinalizar: Locator;
    readonly mensajeCompleto: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombre = page.getByTestId("firstName");
        this.apellido = page.getByTestId("lastName");
        this.codigoPostal = page.getByTestId("postalCode");
        this.botonContinuar = page.getByTestId("continue");
        this.botonFinalizar = page.getByTestId("finish");
        this.mensajeCompleto = page.getByTestId("complete-header");
    }

    async llenarDatos(nombre: string, apellido: string, codigoPostal: string): Promise<void> {
        await this.nombre.fill(nombre);
        await this.apellido.fill(apellido);
        await this.codigoPostal.fill(codigoPostal);
        await this.botonContinuar.click();
    }

    async finalizarCompra(): Promise<void> {
        await this.botonFinalizar.click();
    }

    async verificarCompraExitosa(): Promise<void> {
        await expect(this.mensajeCompleto).toHaveText("Thank you for your order!");
    }
}
