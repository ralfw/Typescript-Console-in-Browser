The purpose of this project is to make it easy to move Typescript
programs running in a terminal window with console IO to the browser.

If nothing more than simple reading/writing from stdin/out is needed
for user interaction, then this can be done in a browser window
using HTML as well.

Coding
------

The root for the program code is main.ts. The entry point is a function
with this signature:

    export async function main() {...}

To read data from the console use readLine() like this:

    const text = await readLine();

To write data to the console use write()/writeLine like this:

    write("Hello, ");
    write("World!");

    writeLine("Hello, World!");

These IO functions have to be imported from one of two modules depending on where main.ts
is supposed to be executed:

- when running the code in a desktop terminal window:

import { write, writeLine, readLine } from "./hosts/terminalio.ts"

- when running the code in a browser window:

import { write, writeLine, readLine } from "./hosts/browserio.ts"


Running
-------

The code in main.ts (and possibly other files imported) is not run directly.
Rather an intermediary is started: an index.* file.

Use index.ts to run the code in a terminal window like this:

    deno run index.ts // index.ts and main.ts must be in the same directory

And use index.html to run the code in a browser. For that main.ts
needs to be converted to Javascript. That's done with

    deno bundle main.ts main.js --config tsconfig.json

After that only index.html and main.js need to be in the same directory.
Please note: index.html needs to opened from a web server due to
CORS restrictions. Check out a hello-world example here:

https://typescript-console-in-browser.netlify.app/helloworld/index.html

This is where the demo/ directory tree got deployed.


New Project
-----------

To set up a new project create a directory with this content:

hosts/
    browserio.ts
    terminalio.ts
index.html
index.ts
main.ts
tsconfig.json

The only file to modify is main.ts.