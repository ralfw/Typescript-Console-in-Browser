// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

async function sleep(delay) {
    return new Promise((resolve)=>setTimeout(resolve, delay));
}
function write(text) {
    const terminal = document.getElementById("terminal");
    const line = document.createTextNode(text);
    terminal?.append(line);
}
function writeLine(text) {
    write(text);
    const terminal = document.getElementById("terminal");
    terminal?.append(document.createElement("br"));
}
async function readLine() {
    const input = document.createElement("input");
    input.setAttribute("id", "editor");
    input.setAttribute("type", "text");
    let enterWasHit = false;
    input.onkeydown = (e)=>{
        if (e.key === "Enter") {
            enterWasHit = true;
            let text = input.value;
            const br = document.createElement("br");
            input.parentNode?.insertBefore(br, input.nextSibling);
            input.parentNode?.replaceChild(document.createTextNode(text), input);
        }
    };
    const terminal = document.getElementById("terminal");
    terminal?.append(input);
    input.focus();
    return new Promise(async (resolve)=>{
        while(enterWasHit === false){
            await sleep(50);
        }
        resolve(input.value);
    });
}
async function readNumber(prompt) {
    while(true){
        write(prompt);
        const text = await readLine();
        const n = parseInt(text, 10);
        if (isNaN(n)) continue;
        if (n < 0) continue;
        return n;
    }
}
async function main() {
    writeLine("Welcome to Guess A Number!");
    writeLine("  What's the range for the number?");
    const lowerLimit = await readNumber("    Lower limit: ");
    const upperLimit = await readNumber("    Upper limit: ");
    writeLine("  Thanks! A number to guess has been generated. Now start guessing...");
    writeLine(lowerLimit + ".." + upperLimit);
}
export { main as main };
