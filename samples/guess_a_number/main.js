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
var GuessClassifications;
(function(GuessClassifications) {
    GuessClassifications[GuessClassifications["cold"] = 0] = "cold";
    GuessClassifications[GuessClassifications["hot"] = 1] = "hot";
    GuessClassifications[GuessClassifications["found"] = 2] = "found";
})(GuessClassifications || (GuessClassifications = {}));
class GuessANumberGame {
    _prevDiff;
    _numberToGuess;
    constructor(lowerLimit, upperLimit){
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        this._numberToGuess = Math.floor(Math.random() * (upperLimit + 1 - lowerLimit)) + lowerLimit;
        this._prevDiff = 999;
    }
    classify(guess) {
        const diff = Math.abs(guess - this._numberToGuess);
        let classification = GuessClassifications.found;
        if (diff != 0) if (diff > this._prevDiff) classification = GuessClassifications.cold;
        else classification = GuessClassifications.hot;
        this._prevDiff = diff;
        return classification;
    }
    get numberToGuess() {
        return this._numberToGuess;
    }
    lowerLimit;
    upperLimit;
}
async function readNumber(prompt) {
    while(true){
        write(prompt);
        const text = await readLine();
        const n = parseInt(text, 10);
        if (isNaN(n)) continue;
        return n;
    }
}
async function readRangeLimit(prompt) {
    while(true){
        const n = await readNumber(prompt);
        if (n < 0 || n > 64) continue;
        return n;
    }
}
async function main() {
    writeLine("Welcome to Guess A Number!");
    writeLine("  What's the range for the number?");
    const lowerLimit = await readRangeLimit("    Lower limit (>=0): ");
    const upperLimit = await readRangeLimit("    Upper limit (<=64): ");
    writeLine(`Thanks! A number to guess has been generated.\nNow start guessing a number in the range ${lowerLimit}..${upperLimit}...`);
    const game = new GuessANumberGame(lowerLimit, upperLimit);
    while(true){
        const guess = await readNumber("  Your guess: ");
        const classification = game.classify(guess);
        switch(classification){
            case GuessClassifications.found:
                writeLine("Congratulations!!! You guessed the number correctly.");
                return;
            case GuessClassifications.hot:
                writeLine("Hot! But not quite right.");
                break;
            case GuessClassifications.cold:
                writeLine("Cold! This is not going in the right direction.");
                break;
        }
    }
}
export { main as main };
