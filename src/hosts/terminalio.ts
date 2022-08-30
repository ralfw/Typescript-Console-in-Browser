import { writeAllSync } from "https://deno.land/std/streams/conversion.ts";


export async function sleep(delayMsec:number) {
    return new Promise((resolve) => setTimeout(resolve, delayMsec));
}


export function write(text:string) {
    const bytes = new TextEncoder().encode(text)
    writeAllSync(Deno.stdout, bytes)
}

export function writeLine(text:string) {
    write(text);
    console.log(); // append new line
}


export async function readLine() {
    const buf = new Uint8Array(1024);
    const n = <number>await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
}