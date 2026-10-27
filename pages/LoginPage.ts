import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usuario: Locator;
    readonly contrasena: Locator;
    readonly botonLogin: Locator;
    readonly mensajeError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usuario = page.getByTestId("username");
        this.contrasena = page.getByTestId("password");
        this.botonLogin = page.getByTestId("login-button");
        this.mensajeError = page.getByTestId("error");
    }

    async abrir(): Promise<void> {
        await this.page.goto("/");
    }

    async iniciarSesion(usuario: string, contrasena: string): Promise<void> {
        await this.usuario.fill(usuario);
        await this.contrasena.fill(contrasena);
        await this.botonLogin.click();
    }

    async verificarError(texto: string): Promise<void> {
        await expect(this.mensajeError).toContainText(texto);
    }
}
