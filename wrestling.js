const resultsDiv = document.getElementById("results");
const entranceSound = new Audio("sounds/entrance.mp3");
const runButton = document.getElementById("runPPV");

// Main wrestling class definition
class Wrestler {
    constructor(name, brand, finisher, catchphrase, title, gender, image, height, weight, hometown) {
        this.name = name;
        this.brand = brand;
        this.finisher = finisher;
        this.catchphrase = catchphrase;
        this.title = title;
        this.gender = gender;
        this.image = image;
        this.height = height
        this.weight = weight;
        this.hometown = hometown;
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
            mainEventBanner = `<div class="main-banner">🔥 MAIN EVENT 🔥</div>`;
        }

        // Belt display if title match
        let beltHTML = "";

        if (this.isTitleMatch) {
            let beltImage = ""
        
            if (this.wrestler1.gender === "male") {
                beltImage = "images/titles/UndisputedWWEChampionship.png";
            } else {
                beltImage = "images/titles/WomansChampionship.png";
            }
            beltHTML = `<img src = "${beltImage}" class = "belt">`;
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
                    <div class = "wrestler-stats">
                        <p>Height: ${this.wrestler1.height}</p>
                        <p>Weight: ${this.wrestler1.weight}</p>
                        <p>From: ${this.wrestler1.hometown}</p>
                    </div>
                </div>

                <div class="vs-text">VS</div>

                <div>
                    <img src="${this.wrestler2.image}">
                    <h2>${this.wrestler2.name}</h2>
                    <div class = "wrestler-stats">
                        <p>Height: ${this.wrestler2.height}</p>
                        <p>Weight: ${this.wrestler2.weight}</p>
                        <p>From: ${this.wrestler2.hometown}</p>
                    </div>
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
            }

            nightNumber++;
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
    "None",
    "male",
    "images/male/RomanReigns.png",
    "6'3",
    "265",
    "Pensacola, Florida"
);

const cody = new Wrestler(
    "Cody Rhodes", 
    "Raw", 
    "Cross Rhodes",
    "Finish the Story",
    "None",
    "male",
    "images/male/CodyRhodes.png",
    "6'2",
    "222",
    'Atlanta, Georgia'
);

const seth = new Wrestler(
    "Seth Rollins", 
    "Raw", 
    "Curb Stomp",
    "Burn It Down",
    "None",
    "male",
    "images/male/SethRollins.png",
    "6'1",
    "225",
    "Davenport, Iowa"
);

const laKnight = new Wrestler(
    "LA Knight", 
    "SmackDown", 
    "BFT",
    "YEAH!",
    "None",
    "male",
    "images/male/LaKnight.png",
    "6'1",
    "240",
    "Hagerstown, Maryland"
);

const gunther = new Wrestler(
    "Gunther",
    "Raw",
    "PowerBomb",
    "The Ring General",
    "None",
    "male",
    "images/male/Gunther.png",
    "6'4",
    "250",
    "Vienna, Austria"
);

const jey = new Wrestler(
    "Jey Uso",
    "Raw",
    "Uso Splash",
    "Yeet!",
    "None",
    "male",
    "images/male/JeyUso.png",
    "6'2",
    "240",
    "San Francisco, California"
);

const jimmy = new Wrestler(
    "Jimmy Uso",
    "SmackDown",
    "Uso Splash",
    "Nobody's Bitch!",
    "None",
    "male",
    "images/male/JimmyUso.png",
    "6'3",
    "250",
    "San Francisco, California"
);

const drew = new Wrestler(
    "Drew McIntyre",
    "Raw",
    "Claymore Kick",
    "Scottish Warrior",
    "Undisputed WWE Universal Champion",
    "male",
    "images/male/DrewMcintyre.png",
    "6'3",
    "275",
    "Ayr, Scotland"
);

const sami = new Wrestler(
    "Sami Zayn",
    "Raw",
    "Helluva Kick",
    "Let's Go!",
    "None",
    "male",
    "images/male/SamiZayn.png",
    "6'1",
    "212",
    "Montreal, Quebec"
);

const ko = new Wrestler(
    "Kevin Owens",
    "SmackDown",
    "Stunner",
    "Fight Owens Fight",
    "None",
    "male",
    "images/male/KevinOwens.png",
    "6'0",
    "266",
    "Marieville, Quebec, Canada"
);

const logan = new Wrestler(
    "Logan Paul",
    "SmackDown",
    "KO Punch",
    "Prime Time",
    "None",
    "male",
    "images/male/LoganPaul.png",
    "6'2",
    "220",
    "Westlake, Ohio"
);

const orton = new Wrestler(
    "Randy Orton",
    "SmackDown",
    "RKO",
    "The Viper",
    "None",
    "male",
    "images/male/RandyOrton.png",
    "6'5",
    "275",
    "St. Louis, Missouri"
);

const styles = new Wrestler(
    "AJ Styles",
    "SmackDown",
    "Phenomenal Forearm",
    "The Phenomenal One",
    "None",
    "male",
    "images/male/AjStyles.png",
    "5'11",
    "220",
    "Gainsville, Georgia"
);

const rey = new Wrestler(
    "Rey Mysterio",
    "SmackDown",
    "619",
    "Who's That Jumpin' Out The Sky",
    "None",
    "male",
    "images/male/ReyMysterio.png",
    "5'6",
    "175",
    "San Diego, California"
);

const balor = new Wrestler(
    "Finn Balor",
    "Raw",
    "Coup de Grace",
    "Prince",
    "None",
    "male",
    "images/male/FinnBalor.png",
    "5'11",
    "190",
    "Bray, County Wicklow, Ireland"
);

const priest = new Wrestler(
    "Damian Priest",
    "Raw",
    "South of Heaven",
    "Archer of Infamy",
    "None",
    "male",
    "images/male/DamianPriest.png",
    "6'6",
    "250",
    "New York City, New York"
);

const sheamus = new Wrestler(
    "Sheamus",
    "Raw",
    "Brogue Kick",
    "Fella",
    "None",
    "male",
    "images/male/Sheamus.png",
    "6'4",
    "267",
    "Dublin, Ireland"
);

const miz = new Wrestler(
    "The Miz",
    "Raw",
    "Skull Crushing Finale",
    "Awesome!",
    "None",
    "male",
    "images/male/TheMiz.png",
    "6'2",
    "221",
    "Cleveland, Ohio"
);

const solo = new Wrestler(
    "Solo Sikoa",
    "SmackDown",
    "Samoan Spike",
    "Enforcer",
    "None",
    "male",
    "images/male/SoloSikoa.png",
    "6'2",
    "250",
    "Las Vegas, Nevada"
);

//Women Wrestlers

const rhea = new Wrestler(
    "Rhea Ripley",
    "Raw",
    "Riptide",
    "This is My Brutality",
    "None",
    "female",
    "images/female/RheaRipley.png",
    "5'7",
    "137",
    "Adelaide, South Australia"
);

const bianca = new Wrestler(
    "Bianca Belair",
    "SmackDown",
    "KOD",
    "The EST of WWE",
    "None",
    "female",
    "images/female/BiancaBelair.png",
    "5'7",
    "165",
    "Knoxville, Tennessee"
);

const becky = new Wrestler(
    "Becky Lynch",
    "Raw",
    "Manhandle Slam",
    "The Man",
    "None",
    "female",
    "images/female/BeckyLynch.png",
    "5'6",
    "135",
    "Limerick, Ireland"
);

const charlotte = new Wrestler(
    "Charlotte Flair",
    "SmackDown",
    "Natural Selection",
    "The Queen",
    "None",
    "female",
    "images/female/CharlotteFlair.png",
    "5'10",
    "143",
    "Charlotte, North Carolina"
);

const bayley = new Wrestler(
    "Bayley",
    "SmackDown",
    "Rose Plant",
    "Role Model",
    "None",
    "female",
    "images/female/Bayley.png",
    "5'6",
    "125",
    "San Jose, California"
);

const asuka = new Wrestler(
    "Asuka",
    "Raw",
    "Asuka Lock",
    "Nobody is Ready for Asuka",
    "None",
    "female",
    "images/female/Asuka.png",
    "5'3",
    "137",
    "Osaka, Japan"
);

const iyo = new Wrestler(
    "Iyo Sky",
    "SmackDown",
    "Over the Moonsault",
    "Genius of the Sky",
    "None",
    "female",
    "images/female/IyoSky.png",
    "5'1",
    "119",
    "Kamakura, Kanagawa, Japan"
);

const liv = new Wrestler(
    "Liv Morgan",
    "Raw",
    "Oblivion",
    "Watch Me",
    "None",
    "female",
    "images/female/LivMorgan.png",
    "5'3",
    "125",
    "Morristown, New Jersey"
);

const nia = new Wrestler(
    "Nia Jax",
    "SmackDown",
    "Annihilator",
    "Irresistible Force",
    "None",
    "female",
    "images/female/NiaJax.png",
    "6'0",
    "272",
    "San Diego, California"
);

const jade = new Wrestler(
    "Jade Cargill",
    "SmackDown",
    "Jaded",
    "That Bitch Show",
    "WWE Womans Championship",
    "female",
    "images/female/JadeCargill.png",
    "5'10",
    "160",
    "Vero Beach, Florida"
);

const tiffany = new Wrestler(
    "Tiffany Stratton",
    "SmackDown",
    "Prettiest Moonsault Ever",
    "It's Tiffy Time",
    "None",
    "female",
    "images/female/TiffanyStratton.png",
    "5'7",
    "143",
    "Prior Lake, Minnesota"
);

const raquel = new Wrestler(
    "Raquel Rodriguez",
    "Raw",
    "Tejana Bomb",
    "Big Mami Cool",
    "None",
    "female",
    "images/female/RaquelRodriguez.png",
    "6'0",
    "175",
    "La Feria, Texas"
);

const natalya = new Wrestler(
    "Natalya",
    "Raw",
    "Sharpshooter",
    "Queen of Harts",
    "None",
    "female",
    "images/female/Natalya.png",
    "5'5",
    "135",
    "Calgary, ALberta, Canada"
);

const roxanne = new Wrestler(
    "Roxanne Perez",
    "Raw",
    "Pop Rocks",
    "The Prodigy",
    "None",
    "female",
    "images/female/RoxannePerez.png",
    "5'1",
    "125",
    "Laredo, Texas"
);

const zelina = new Wrestler(
    "Zelina Vega",
    "SmackDown",
    "Code Red",
    "La Muñeca",
    "None",
    "female",
    "images/female/ZelinaVega.png",
    "4'11",
    "105",
    "Queens, New York"
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
        if (
            matches[i].wrestler1.title !== "None" ||
            matches[i].wrestler2.title !== "None"
        ) {
            championMatchIndex = i;
            matches[i].isTitleMatch = true;
            break;
        }
    }

    if (championMatchIndex === -1) return;

    const mainEvent = matches.splice(championMatchIndex, 1)[0];
    matches.push(mainEvent);
}

// Creating instances of PPV and running it
const wrestleMania = new PPV("WrestleMania");

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