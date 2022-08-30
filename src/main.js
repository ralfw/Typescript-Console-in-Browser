// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

async function sleep(delay) {
    return new Promise((resolve)=>setTimeout(resolve, delay));
}
function write(text) {
    const terminal = document.getElementById("terminal");
    const lines = text.split("\n");
    for(var i = 0; i < lines.length; i++){
        if (i > 0) terminal?.append(document.createElement("br"));
        const line = document.createTextNode(lines[i]);
        terminal?.append(line);
    }
}
function writeLine(text) {
    write(text + "\n");
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
async function main() {
    write("Nam\ne: ");
    let name = await readLine();
    writeLine("Hello, " + name + "!");
}
export { main as main };
