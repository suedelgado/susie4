import * as readline from "node:readline/promises";

class Calculator {
    number1: number;
    number2: number;

    constructor(number1: number, number2:number) {
        if (Number.isNaN(number1) || Number.isNaN(number2)) {
            throw new Error("La calculadora solo acepta números válidos.");
        }
        this.number1 = number1;
        this.number2 = number2;

    }

    sumar(): number {
        return this.number1 + this.number2;
    }

    restar(): number {
        return this.number1 - this.number2;
    }

}

function convertirANumero(texto: string): number {
    if (texto.trim() === "") {
        throw new Error("No escribiste ningún número.");
    }
    const numero = Number(texto);
    if (Number.isNaN(numero)) {
        throw new Error(`"${texto}" no es un número válido.`);
    }
    return numero;
}

async function main() {
    const consola = readline.createInterface({ input: process.stdin, output: process.stdout });

    try {
        const texto1 = await consola.question("Escribe el primer número: ");
        const texto2 = await consola.question("Escribe el segundo número: ");

        const calculadora = new Calculator(convertirANumero(texto1), convertirANumero(texto2));

        console.log(`Suma: ${calculadora.sumar()}`);
        console.log(`Resta: ${calculadora.restar()}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("Ocurrió un error inesperado.");
        }
    } finally {
        consola.close();
    }
}

main();
