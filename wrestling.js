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
        this.rivals =[];
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

        this.rating = 0;
        this.history = [];
        this.crowdReaction = "";
        this.isTitleMatch = false;
    }

    startMatch() {
        console.log("Event:", this.eventName);
        console.log(this.wrestler1.name + " vs " + this.wrestler2.name);
        console.log("Stipulation", this.stipulation);
    }

    getWinner() {
        const winner = Math.random() > 0.5 ? this.wrestler1 : this.wrestler2;
        const loser = winner === this.wrestler1 ? this.wrestler2 : this.wrestler1;

        winner.recordWin();
        loser.recordLoss()

        // Title Change Logic
        if (this.isTitleMatch && loser.title !== "None") {
            console.log("TITLE CHANGE!"); 
            winner.title = loser.title;
            loser.title = "None"; 
        }

        this.history.push({
            winner: winner.name,
            loser: loser.name,
            event: this.eventName
        });

        console.log("Winner:", winner.name);
        console.log("-----------");
    }

    rateMatch() {
        this.rating = Math.floor(Math.random() * 5) + 1;
        console.log("Match Rating:", "⭐".repeat(this.rating));
    }

    reactCrowd() {
        const reactions = [
        "🔥 HUGE POP",
        "😐 Mixed Reaction",
        "👎 Loud Boos",
        "👏 Standing Ovation"
        ];
        const index = Math.floor(Math.random() * reactions.length);
        this.crowdReaction = reactions[index];
        console.log("Crowd Reaction:", this.crowdReaction);
    }
}

// PPV Class Definition
class PPV {
    constructor(name) {
        this.name = name;
        this.nights =[];
        this.history = [];
    }

    addNight(matches) {
        this.nights.push(matches);
    }

    run() {
         console.log("PPV:", this.name);

        let bestMatch = null;
        let bestRating = 0;
        let nightNumber = 1;

        for (const night of this.nights) {
            console.log("Night", nightNumber);

            for (const match of night) {
                match.startMatch();
                match.getWinner();
                match.reactCrowd();
                match.rateMatch();

                this.history.push({
                    match: match.wrestler1.name + " vs " + match.wrestler2.name,
                    event: this.name
                });

                if (match.rating > bestRating) {
                    bestRating = match.rating;
                    bestMatch = match;
                }
            }

            nightNumber++;
        }

        if (bestMatch) {
            console.log("MATCH OF THE NIGHT:");
            console.log(bestMatch.wrestler1.name, "vs", bestMatch.wrestler2.name);
            console.log("Rating:", "⭐".repeat(bestRating));
        }
    }
}


// Creating instances of Wrestlers
// Men Wrestlers
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

const jey = new Wrestler(
    "Jey Uso",
    "Raw",
    "Uso Splash",
    "Yeet!",
    "None"
);

const jimmy = new Wrestler(
    "Jimmy Uso",
    "SmackDown",
    "Uso Splash",
    "Nobody's Bitch!",
    "None"
);

const drew = new Wrestler(
    "Drew McIntyre",
    "Raw",
    "Claymore Kick",
    "Scottish Warrior",
    "None"
);

const sami = new Wrestler(
    "Sami Zayn",
    "Raw",
    "Helluva Kick",
    "Let's Go!",
    "None"
);

const ko = new Wrestler(
    "Kevin Owens",
    "SmackDown",
    "Stunner",
    "Fight Owens Fight",
    "None"
);

const logan = new Wrestler(
    "Logan Paul",
    "SmackDown",
    "KO Punch",
    "Prime Time",
    "United States Champion"
);

const orton = new Wrestler(
    "Randy Orton",
    "SmackDown",
    "RKO",
    "The Viper",
    "None"
);

const styles = new Wrestler(
    "AJ Styles",
    "SmackDown",
    "Phenomenal Forearm",
    "The Phenomenal One",
    "None"
);

const rey = new Wrestler(
    "Rey Mysterio",
    "SmackDown",
    "619",
    "Who's That Jumpin' Out The Sky",
    "None"
);

const balor = new Wrestler(
    "Finn Balor",
    "Raw",
    "Coup de Grace",
    "Prince",
    "None"
);

const priest = new Wrestler(
    "Damian Priest",
    "Raw",
    "South of Heaven",
    "Archer of Infamy",
    "None"
);

const sheamus = new Wrestler(
    "Sheamus",
    "Raw",
    "Brogue Kick",
    "Fella",
    "None"
);

const miz = new Wrestler(
    "The Miz",
    "Raw",
    "Skull Crushing Finale",
    "Awesome!",
    "None"
);

const solo = new Wrestler(
    "Solo Sikoa",
    "SmackDown",
    "Samoan Spike",
    "Enforcer",
    "None"
);

//Women Wrestlers

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
);

const becky = new Wrestler(
    "Becky Lynch",
    "Raw",
    "Manhandle Slam",
    "The Man",
    "None"
);

const charlotte = new Wrestler(
    "Charlotte Flair",
    "SmackDown",
    "Natural Selection",
    "The Queen",
    "None"
);

const bayley = new Wrestler(
    "Bayley",
    "SmackDown",
    "Rose Plant",
    "Role Model",
    "None"
);

const asuka = new Wrestler(
    "Asuka",
    "Raw",
    "Asuka Lock",
    "Nobody is Ready for Asuka",
    "None"
);

const iyo = new Wrestler(
    "Iyo Sky",
    "SmackDown",
    "Over the Moonsault",
    "Genius of the Sky",
    "None"
);

const liv = new Wrestler(
    "Liv Morgan",
    "Raw",
    "Oblivion",
    "Watch Me",
    "None"
);

const nia = new Wrestler(
    "Nia Jax",
    "SmackDown",
    "Annihilator",
    "Irresistible Force",
    "None"
);

const jade = new Wrestler(
    "Jade Cargill",
    "SmackDown",
    "Jaded",
    "That Bitch Show",
    "None"
);

const tiffany = new Wrestler(
    "Tiffany Stratton",
    "SmackDown",
    "Prettiest Moonsault Ever",
    "It's Tiffy Time",
    "None"
);

const raquel = new Wrestler(
    "Raquel Rodriguez",
    "Raw",
    "Tejana Bomb",
    "Big Mami Cool",
    "None"
);

const natalya = new Wrestler(
    "Natalya",
    "Raw",
    "Sharpshooter",
    "Queen of Harts",
    "None"
);

const shayna = new Wrestler(
    "Shayna Baszler",
    "Raw",
    "Kirifuda Clutch",
    "Queen of Spades",
    "None"
);

const zelina = new Wrestler(
    "Zelina Vega",
    "SmackDown",
    "Code Red",
    "La Muñeca",
    "None"
);

//Storing Roster in an Array[]
const roster = [roman, cody, seth, laKnight, gunther, jey, jimmy, drew, sami, ko, logan, orton, styles, rey, balor, priest, sheamus, miz, solo, rhea, bianca, becky, charlotte, bayley, asuka, iyo, liv, nia, jade, tiffany, raquel, natalya, shayna, zelina];

function generateMatches(roster, eventName) {
    const matches = [];
    const shuffled = roster.slice(); // copy roster so original stays safe

    // Shuffle roster (random order)
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    // Only 5 matches = 10 wrestlers max
    const maxMatches = 5;

    for (let i = 0; i < maxMatches * 2; i += 2) {
        if (shuffled[i + 1]) {
            const match = new Match(
                shuffled[i],
                shuffled[i + 1],
                "Singles Match",
                eventName
            );
            matches.push(match);
        }
    }

    return matches;
}

function moveChampionsToMainEvent(matches) {
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].wrestler1.title !== "None" || matches[i].wrestler2.title !== "None") {
            const mainEvent = matches.splice(i, 1)[0];
            matches.push(mainEvent);
            mainEvent.isTitleMatch = true;
            break;
        }
    }
}



// Creating instances of PPV and running it
const wrestleMania = new PPV("WrestleMania");

const night1 = generateMatches(roster, "WrestleMania Night 1");
const night2 = generateMatches(roster, "WrestleMania Night 2");

moveChampionsToMainEvent(night1);
moveChampionsToMainEvent(night2);

wrestleMania.addNight(night1);
wrestleMania.addNight(night2);

wrestleMania.run();

function showRankings(roster) {
    console.log("=== WWE POWER RANKINGS ===");

    const sorted = roster.slice();

    sorted.sort(function(a, b){
        return b.wins - a.wins;
    });

    for (const wrestler of sorted) {
        console.log(
            wrestler.name,
            "| Wins:", wrestler.wins,
            "| Losses", wrestler.losses
        );
    }
}

showRankings(roster);