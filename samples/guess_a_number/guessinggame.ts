export enum GuessClassifications {
    cold,
    hot,
    found
}


export class GuessANumberGame {
    private _prevDiff:number;
    private _numberToGuess:number;

    constructor(private lowerLimit:number, private upperLimit:number) {
        this._numberToGuess = Math.floor(Math.random() * (upperLimit + 1 - lowerLimit)) + lowerLimit;
        this._prevDiff = 999;
    }

    classify(guess:number): GuessClassifications {
        const diff = Math.abs(guess - this._numberToGuess);

        let classification = GuessClassifications.found;
        if (diff != 0)
            if (diff > this._prevDiff)
                classification = GuessClassifications.cold;
            else
                classification = GuessClassifications.hot;

        this._prevDiff = diff;
        return classification;
    }

    get numberToGuess():number { return this._numberToGuess; }
}