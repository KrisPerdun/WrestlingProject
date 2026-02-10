// Main wrestling class definition
class Wrestler {
    constructor(name, brand, finisher, catchphrase, title) {
        this.name = name;
        this.brand = brand;
        this.finisher = finisher;
        this.catchphrase = catchphrase;
        this.title = title;
        this.wins = 0;
        this.losses = 0;
    }

    intro() {
        console.log(this.name + " says " + this.catchphrase);
    }

    recordWin() {
        this.wins++;
    }
 
    recordLoss() {
        this.losses++;
    }  
     
}

// Match class definition
class Match {
    constructor(wrestler1, wrestler2, stipulation, eventName) {
        this.wrestler1 = wrestler1;
        this.wrestler2 = wrestler2;
        this.stipulation = stipulation;
        this.eventName = eventName;

        this.history = [];
    }

    startMatch() {
        console.log("Event:", this.eventName);
        console.log(this.wrestler1.name + " vs " + this.wrestler2.name);
        console.log("Stipulation", this.stipulation);
    }

    getWinner() {
        const winner =
            Math.random() > 0.5 ? this.wrestler1 : this.wrestler2;

        const loser =
            winner === this.wrestler1 ? this.wrestler2 : this.wrestler1;

        winner.recordWin();
        loser.recordLoss()

        this.history.push({
            winner: winner.name,
            loser: loser.name,
            event: this.eventName
        });

        console.log("Winner:", winner.name);
        console.log("-----------");
    }
}

// PPV Class Definition
class PPV {
    constructor(name) {
        this.name = name;
        this.nights =[];
    }

    addNight(matches) {
        this.nights.push(matches);
    }

    run() {
        console.log("PPV:", this.name);

        let nightNumber = 1;
        for (const night of this.nights) {
            console.log("Nights", nightNumber);

            for (const match of night) {
                match.startMatch();
                match.getWinner();
            }

            nightNumber++;
        }
    }
}


// Creating instances of Wrestlers
const roman = new Wrestler(
    "Roman Reigns", 
    "SmackDown", 
    "Spear", 
    "Acknowledge Me", 
    "Undisputed WWE Universal Champion"
);

const cody = new Wrestler(
    "Cody Rhodes", 
    "Raw", 
    "Cross Rhodes",
    "Finish the Story",
    "None"
);

const seth = new Wrestler(
    "Seth Rollins", 
    "Raw", 
    "Curb Stomp",
    "Burn It Down",
    "World Heavyweight Champion"
);

const laKnight = new Wrestler(
    "LA Knight", 
    "SmackDown", 
    "BFT",
    "YEAH!",
    "None"
);

const gunther = new Wrestler(
    "Gunther",
    "Raw",
    "PowerBomb",
    "The Ring General",
    "Intercontinental Champion"
);

const rhea = new Wrestler(
    "Rhea Ripley",
    "Raw",
    "Riptide",
    "This is My Brutality",
    "Woman's World Champion"
);

const bianca = new Wrestler(
    "Bianca Belair",
    "SmackDown",
    "KOD",
    "The EST of WWE",
    "None"
)

// Creating instances of Matches
const match1 = new Match(
    roman,
    cody,
    "Undisputed Title Match",
    "WrestleMania"
);

const match2 = new Match(
    seth,
    laKnight,
    "No Disqualification",
    "Backlash"
);

//Storing Matches in an Array []
const matchCard = [match1, match2];

//Storing Roster in an Array[]
const roster = [roman, cody, seth, laKnight, gunther, rhea, bianca];

// Creating instances of PPV and running it
const wrestleMania = new PPV("WrestleMania");

wrestleMania.addNight([match1]);
wrestleMania.addNight([match2]);

wrestleMania.run();

function showRankings(roster) {
    const sorted = [...roster].sort((a, b) => b.wins - a.wins);

    console.log("RANKINGS");
    let rank = 1;
    for (const wrestler of sorted) {
        console.log(
            rank + ". " +
            wrestler.name +
            " (" + wrestler.wins + " wins)"
        );
        rank++
    }
}

showRankings(roster);

function runBrandPPV(ppvName, matches,brand) {
    console.log("PPV:", ppvName, "(" + brand + " ONLY");

    for (const match of matches) {
        if (match.wrestler1.brand === brand && match.wrestler2.brand == brand) {
            match.startMatch();
            match.getWinner();
        } else {
            console.log("Match skipped (wrong brand):", match.wrestler1.name, "vs", match.wrestler2.name);
        }
    }
}

function showPPVRecap(matches) {
    console.log("PPV RECAP RESULTS");

    for (const match of matches) {
        console.log("Match:", match.wrestler1.name, "vs", match.wrestler2.name);

        for (const results of match.history) {
            console.log(
                "Event:", results.event
            );
        }
    }
}