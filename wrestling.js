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

        // console.log("Winner:", winner.name);
        // console.log("Finisher:", winner.finisher);
        // console.log("Catchphrase:", winner.catchphrase);
        
        // if (loser.title !== "None") {
        //     console.log(winner.name + " wins the " + loser.title);
        //     winner.title = loser.title;
        //     loser.title = "None";
        // }

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

// Creating instances of Matches
const match1 = new Match(
    roman,
    cody,
    "Undisputed Title Match",
    "Wrestlemania"
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
const roster = [roman, cody, seth, laKnight];

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

// // Run Matches
// for (const match of matchCard) {
//     match.startMatch();
//     match.getWinner();
// }

// // Show Final Stats
// console.log("FINAl STATS");
// for(const wrestler of roster) {
//     console.log(wrestler.name);
//     console.log("Wins:", wrestler.wins);
//     console.log("Losses", wrestler.losses);
//     console.log("Title:", wrestler.title);
//     console.log ("-----------")
// }