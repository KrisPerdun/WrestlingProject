const resultsDiv = document.getElementById("results");
const entranceSound = new Audio("sounds/entrance.mp3");
const runButton = document.getElementById("runPPV");

// Main wrestling class definition
class Wrestler {
    constructor(name, brand, finisher, catchphrase, title, gender, image) {
        this.name = name;
        this.brand = brand;
        this.finisher = finisher;
        this.catchphrase = catchphrase;
        this.title = title;
        this.gender = gender;
        this.image = image;

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

    getWinner() {
        const winner = Math.random() > 0.5 ? this.wrestler1 : this.wrestler2;
        const loser = winner === this.wrestler1 ? this.wrestler2 : this.wrestler1;

        winner.recordWin();
        loser.recordLoss();

        this.history.push({
            winner: winner.name,
            loser: loser.name,
            event: this.eventName
        });
    }

    rateMatch() {
        this.rating = Math.floor(Math.random() * 5) + 1;
    }
            //,
    reactCrowd() {
        if (this.rating === 5) {
            this.crowdReaction = "👏 Standing Ovation";
        }
        else if (this.rating === 4) {
            this.crowdReaction = "🔥 HUGE POP";
        }
        else if (this.rating === 3) {
            this.crowdReaction =  "😐 Mixed Reaction";
        }
        else {
            this.crowdReaction = "👎 Loud Boos";
        }
    }

    printSummary() {

        const div = document.createElement("div");
        div.className = "match-card fade-in";

        // MAIN EVENT banner
        let mainEventBanner = "";
        if (this.isTitleMatch) {
            div.classList.add("main-event");
            mainEventBanner = `<div class="main-banner">🔥 MAIN EVENT 🔥</div>`;
        }

        // Belt display if title match
        let beltHTML = "";
        if (this.isTitleMatch) {
            beltHTML = `<img src="titles/UndisputedWWEChampionship.png" class="belt">`;
        }

        // Glow based on rating
        if (this.rating === 5) div.classList.add("glow-5");
        if (this.rating === 4) div.classList.add("glow-4");
        if (this.rating <= 2) div.classList.add("glow-2");

        div.innerHTML = `
            ${mainEventBanner}
            ${beltHTML}

            <div class="match-images">

                <div>
                    <img src="${this.wrestler1.image}">
                    <h2>${this.wrestler1.name}</h2>
                </div>

                <div class="vs-text">VS</div>

                <div>
                    <img src="${this.wrestler2.image}">
                    <h2>${this.wrestler2.name}</h2>
                </div>

            </div>

            <p class="winner">
                Winner: <b>${this.history[this.history.length - 1].winner}</b>
            </p>

            <p>Crowd: ${this.crowdReaction}</p>
            <p>Rating: ${"⭐".repeat(this.rating)}</p>
        `;

        resultsDiv.appendChild(div);
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
                match.getWinner();
                match.rateMatch();
                match.reactCrowd();
                match.printSummary();

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
    "Undisputed WWE Universal Champion",
    "male",
    "images/male/RomanReigns.png"
);

const cody = new Wrestler(
    "Cody Rhodes", 
    "Raw", 
    "Cross Rhodes",
    "Finish the Story",
    "None",
    "male",
    "images/male/CodyRhodes.png"
);

const seth = new Wrestler(
    "Seth Rollins", 
    "Raw", 
    "Curb Stomp",
    "Burn It Down",
    "World Heavyweight Champion",
    "male",
    "images/male/SethRollins.png"
);

const laKnight = new Wrestler(
    "LA Knight", 
    "SmackDown", 
    "BFT",
    "YEAH!",
    "None",
    "male",
    "images/male/LaKnight.png"
);

const gunther = new Wrestler(
    "Gunther",
    "Raw",
    "PowerBomb",
    "The Ring General",
    "Intercontinental Champion",
    "male",
    "images/male/Gunther.png"
);

const jey = new Wrestler(
    "Jey Uso",
    "Raw",
    "Uso Splash",
    "Yeet!",
    "None",
    "male",
    "images/male/JeyUso.png"
);

const jimmy = new Wrestler(
    "Jimmy Uso",
    "SmackDown",
    "Uso Splash",
    "Nobody's Bitch!",
    "None",
    "male",
    "images/male/JimmyUso.png"
);

const drew = new Wrestler(
    "Drew McIntyre",
    "Raw",
    "Claymore Kick",
    "Scottish Warrior",
    "None",
    "male",
    "images/male/DrewMcintyre.png"
);

const sami = new Wrestler(
    "Sami Zayn",
    "Raw",
    "Helluva Kick",
    "Let's Go!",
    "None",
    "male",
    "images/male/SamiZayn.png"
);

const ko = new Wrestler(
    "Kevin Owens",
    "SmackDown",
    "Stunner",
    "Fight Owens Fight",
    "None",
    "male",
    "images/male/KevinOwens.png"
);

const logan = new Wrestler(
    "Logan Paul",
    "SmackDown",
    "KO Punch",
    "Prime Time",
    "United States Champion",
    "male",
    "images/male/LoganPaul.png"
);

const orton = new Wrestler(
    "Randy Orton",
    "SmackDown",
    "RKO",
    "The Viper",
    "None",
    "male",
    "images/male/RandyOrton.png"
);

const styles = new Wrestler(
    "AJ Styles",
    "SmackDown",
    "Phenomenal Forearm",
    "The Phenomenal One",
    "None",
    "male",
    "images/male/AjStyles.png"
);

const rey = new Wrestler(
    "Rey Mysterio",
    "SmackDown",
    "619",
    "Who's That Jumpin' Out The Sky",
    "None",
    "male",
    "images/male/ReyMysterio.png"
);

const balor = new Wrestler(
    "Finn Balor",
    "Raw",
    "Coup de Grace",
    "Prince",
    "None",
    "male",
    "images/male/FinnBalor.png"
);

const priest = new Wrestler(
    "Damian Priest",
    "Raw",
    "South of Heaven",
    "Archer of Infamy",
    "None",
    "male",
    "images/male/DamianPriest.png"
);

const sheamus = new Wrestler(
    "Sheamus",
    "Raw",
    "Brogue Kick",
    "Fella",
    "None",
    "male",
    "images/male/Sheamus.png"
);

const miz = new Wrestler(
    "The Miz",
    "Raw",
    "Skull Crushing Finale",
    "Awesome!",
    "None",
    "male",
    "images/male/TheMiz.png"
);

const solo = new Wrestler(
    "Solo Sikoa",
    "SmackDown",
    "Samoan Spike",
    "Enforcer",
    "None",
    "male",
    "images/male/SoloSikoa.png"
);

//Women Wrestlers

const rhea = new Wrestler(
    "Rhea Ripley",
    "Raw",
    "Riptide",
    "This is My Brutality",
    "Woman's World Champion",
    "female",
    "images/female/RheaRipley.png"
);

const bianca = new Wrestler(
    "Bianca Belair",
    "SmackDown",
    "KOD",
    "The EST of WWE",
    "None",
    "female",
    "images/female/BiancaBelair.png"
);

const becky = new Wrestler(
    "Becky Lynch",
    "Raw",
    "Manhandle Slam",
    "The Man",
    "None",
    "female",
    "images/female/BeckyLynch.png"
);

const charlotte = new Wrestler(
    "Charlotte Flair",
    "SmackDown",
    "Natural Selection",
    "The Queen",
    "None",
    "female",
    "images/female/CharlotteFlair.png"
);

const bayley = new Wrestler(
    "Bayley",
    "SmackDown",
    "Rose Plant",
    "Role Model",
    "None",
    "female",
    "images/female/Bayley.png"
);

const asuka = new Wrestler(
    "Asuka",
    "Raw",
    "Asuka Lock",
    "Nobody is Ready for Asuka",
    "None",
    "female",
    "images/female/Asuka.png"
);

const iyo = new Wrestler(
    "Iyo Sky",
    "SmackDown",
    "Over the Moonsault",
    "Genius of the Sky",
    "None",
    "female",
    "images/female/IyoSky.png"
);

const liv = new Wrestler(
    "Liv Morgan",
    "Raw",
    "Oblivion",
    "Watch Me",
    "None",
    "female",
    "images/female/LivMorgan.png"
);

const nia = new Wrestler(
    "Nia Jax",
    "SmackDown",
    "Annihilator",
    "Irresistible Force",
    "None",
    "female",
    "images/female/NiaJax.png"
);

const jade = new Wrestler(
    "Jade Cargill",
    "SmackDown",
    "Jaded",
    "That Bitch Show",
    "None",
    "female",
    "images/female/JadeCargill.png"
);

const tiffany = new Wrestler(
    "Tiffany Stratton",
    "SmackDown",
    "Prettiest Moonsault Ever",
    "It's Tiffy Time",
    "None",
    "female",
    "images/female/TiffanyStratton.png"
);

const raquel = new Wrestler(
    "Raquel Rodriguez",
    "Raw",
    "Tejana Bomb",
    "Big Mami Cool",
    "None",
    "female",
    "images/female/RaquelRodriguez.png"
);

const natalya = new Wrestler(
    "Natalya",
    "Raw",
    "Sharpshooter",
    "Queen of Harts",
    "None",
    "female",
    "images/female/Natalya.png"
);

const roxanne = new Wrestler(
    "Roxanne Perez",
    "Raw",
    "Pop Rocks",
    "The Prodigy",
    "None",
    "female",
    "images/female/RoxannePerez.png"
);

const zelina = new Wrestler(
    "Zelina Vega",
    "SmackDown",
    "Code Red",
    "La Muñeca",
    "None",
    "female",
    "images/female/ZelinaVega.png"
);

//Storing Roster in an Array[]
const roster = [roman, cody, seth, laKnight, gunther, jey, jimmy, drew, sami, ko, logan, orton, styles, rey, balor, priest, sheamus, miz, solo, rhea, bianca, becky, charlotte, bayley, asuka, iyo, liv, nia, jade, tiffany, raquel, natalya, roxanne, zelina];

function generateMatches(roster, eventName) {
    const matches = [];
    const shuffled = roster.slice();

    // Shuffle roster
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    const maxMatches = 5;
    let used = [];

    for (let i = 0; i < shuffled.length && matches.length < maxMatches; i++) {

        if (used.includes(shuffled[i])) continue;

        for (let j = i + 1; j < shuffled.length; j++) {

            if (used.includes(shuffled[j])) continue;

            // Only match same gender
            if (shuffled[i].gender === shuffled[j].gender) {

                const match = new Match(shuffled[i], shuffled[j], "Singles Match", eventName);
                matches.push(match);

                used.push(shuffled[i], shuffled[j]);
                break;
            }
        }
    }

    return matches;
}

function moveChampionsToMainEvent(matches) {

    let championMatchIndex = -1;

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].wrestler1.title !== "None" || matches[i].wrestler2.title !== "None") {
            championMatchIndex = i;
            matches[i].isTitleMatch = true;
            break;
        }
    }

    // If no champion found, FORCE one
    if (championMatchIndex === -1) {
        console.log("⚠️ No champion found. Forcing Main Event Title Match.");

        const randomMatch = matches[matches.length - 1];
        randomMatch.isTitleMatch = true;
        return;
    }

    // Move champion match to last slot (Main Event)
    const mainEvent = matches.splice(championMatchIndex, 1)[0];
    matches.push(mainEvent);
}



// Creating instances of PPV and running it
const wrestleMania = new PPV("WrestleMania");


function showRankings(roster) {
    console.log("=== WWE POWER RANKINGS ===");

    const sorted = roster.slice();

    sorted.sort(function(a, b){
        return b.wins - a.wins;
    });

    for (const wrestler of sorted) {

        // Only show wrestlers who actually had a match
        if (wrestler.wins > 0 || wrestler.losses > 0) {
            console.log(
                wrestler.name,
                "| Wins:", wrestler.wins,
                "| Losses:", wrestler.losses
            );
        }
    }
}

showRankings(roster);

runButton.onclick = function() {
    
    entranceSound.currentTime = 0;
    entranceSound.play();

    resultsDiv.innerHTML = "";

    wrestleMania.nights = [];

    const shuffledRoster = roster.slice();
    for (let i = shuffledRoster.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledRoster[i];
        shuffledRoster[i] = shuffledRoster[j];
        shuffledRoster[j] = temp;
    }

    const rosterNight1 = shuffledRoster.slice(0, 10);
    const rosterNight2 = shuffledRoster.slice(10, 20);

    const night1 = generateMatches(rosterNight1, "WrestleMania Night 1");
    const night2 = generateMatches(rosterNight2, "WrestleMania Night 2");

    moveChampionsToMainEvent(night1);
    moveChampionsToMainEvent(night2);

    wrestleMania.addNight(night1);
    wrestleMania.addNight(night2);

    wrestleMania.run();
};