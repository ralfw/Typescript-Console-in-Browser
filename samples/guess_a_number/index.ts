/*
Run main.ts like this:

deno run index.ts

main() is called in index.ts to exlcude this call from main.ts.
That way main.ts can also be used in the browser by only changing the
imported host.

Run main.ts either through index.html or index.ts.

main.ts must export a function like this:

export function main() {...}

and import the stdin/out functions like this:

import { write, writeLine, readLine } from "./hosts/XXXhost.ts"

Replace XXXhost.ts with either browserhost or terminalhost.
*/

import { main } from "./main.ts";

await main();