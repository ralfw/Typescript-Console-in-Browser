/*
1. deno bundle main.ts main.js --config tsconfig.json
2. open index.html from a web server (double clicking the file won't work due to CORS restrictions)
*/
// import { write, writeLine, readLine } from "./hosts/browserio.ts"

/*
deno run index.ts
*/
import { write, writeLine, readLine } from "./hosts/terminalio.ts"

export async function main() {
    write("Name: ");
    let name = await readLine();
    writeLine("Hello, " + name + "!");
}