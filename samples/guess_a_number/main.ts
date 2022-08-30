/*
1. deno bundle main.ts main.js --config tsconfig.json
2. open index.html from a web server (double clicking the file won't work due to CORS restrictions)
*/
import { write, writeLine, readLine } from "./hosts/browserio.ts"

/*
deno run index.ts
*/
//import { write, writeLine, readLine } from "./hosts/terminalio.ts"


async function readNumber(prompt:string): Promise<number> {
    while(true) {
        write(prompt);
        const text = await readLine();
        const n = parseInt(text, 10);
        if (isNaN(n)) continue;
        if (n<0) continue;
        return n;
    }
}


export async function main() {
    writeLine("Welcome to Guess A Number!");
    writeLine("  What's the range for the number?");
    const lowerLimit = await readNumber("    Lower limit: ");
    const upperLimit = await readNumber("    Upper limit: ");
    writeLine("  Thanks! A number to guess has been generated. Now start guessing...");
    writeLine(lowerLimit + ".." + upperLimit);
}