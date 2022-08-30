//import { write, writeLine, readLine } from "./hosts/browserio.ts"
import { write, writeLine, readLine } from "./hosts/terminalio.ts"

import { GuessANumberGame, GuessClassifications } from "./guessinggame.ts"
import { readNumber, readRangeLimit } from "./ui.ts"


export async function main() {
    writeLine("Welcome to Guess A Number!");
    writeLine("  What's the range for the number?");
    const lowerLimit = await readRangeLimit("    Lower limit (>=0): ");
    const upperLimit = await readRangeLimit("    Upper limit (<=64): ");
    writeLine(`Thanks! A number to guess has been generated.\nNow start guessing a number in the range ${lowerLimit}..${upperLimit}...`);

    const game = new GuessANumberGame(lowerLimit, upperLimit);

    while(true) {
        const guess = await readNumber("  Your guess: ");

        const classification = game.classify(guess);

        switch (classification) {
            case GuessClassifications.found:
                writeLine("Congratulations!!! You guessed the number correctly.")
                return;
            case GuessClassifications.hot:
                writeLine("Hot! But not quite right.");
                break;
            case GuessClassifications.cold:
                writeLine("Cold! This is not going in the right direction.")
                break;
        }
    }
}