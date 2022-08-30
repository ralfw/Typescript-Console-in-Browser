//import {readLine, write} from "./hosts/browserio.ts";
import {readLine, write} from "./hosts/terminalio.ts";

export async function readNumber(prompt:string): Promise<number> {
    while(true) {
        write(prompt);
        const text = await readLine();
        const n = parseInt(text, 10);
        if (isNaN(n)) continue;
        return n;
    }
}


export async function readRangeLimit(prompt:string): Promise<number> {
    while(true) {
        const n = await readNumber(prompt);
        if (n<0 || n>64) continue;
        return n;
    }
}