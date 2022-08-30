export async function sleep(delay:number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}


export function write(text:string) {
    const terminal = document.getElementById("terminal");
    const line = document.createTextNode(text);
    terminal?.append(line);
}

export function writeLine(text:string) {
    write(text);

    const terminal = document.getElementById("terminal");
    terminal?.append(document.createElement("br"));
}


export async function readLine() {
    const input = document.createElement("input");
    input.setAttribute("id", "editor");
    input.setAttribute("type", "text");

    let enterWasHit = false;
    let text = "";
    input.onkeydown = (e) => {
        if (e.key === "Enter") {
            enterWasHit = true;
            let text = input.value;

            const br = document.createElement("br");
            input.parentNode?.insertBefore(br, input.nextSibling);
            input.parentNode?.replaceChild(document.createTextNode(text), input);
        }
    }

    const terminal = document.getElementById("terminal");
    terminal?.append(input);
    input.focus();

    return new Promise(async (resolve) => {
        while(enterWasHit === false) {
            await sleep(50);
        }
        resolve(input.value);
    });
}