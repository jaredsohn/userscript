// ==UserScript==
// @name           BvS Loop Helper
// @namespace      rvLoop
// @description    BvS Loop Helper 1.1.2
// @include        http://*animecubed.com/billy/bvs/*
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.1.2
// @history        1.1.2  Fixed bugs with Party Room, daily usage, and Peeping.
// @history        1.1.1  Fixed more FF4 bugs, should be working almost 100%
// @history        1.1.0  Fixed some bugs with FF4 so it works again, still working on it, send me bugs
// @history        1.0.3  Added Legacy's Jonin Ascension Quest
// @history        1.0.2  Added an end to Speed Looping
// @history        1.0.1e Fixed bug with Terri as one of your chunin level ally.
// @history        1.0.1d Fixed quickteams if you had no quickteams.
// @history        1.0.1c Halfway completed most of the path for Special Jonin.
// @history        1.0.1b Increased appetite by 20 when become Chunin.
// @history        1.0.1b Added methods of getting Special Jonin Ranking XP. (Redo setup)
// @history        1.0.1a Increased appetite by 20 when become Special Jonin.
// @history        1.0.1  Added Hotkey support.
// @history        1.0.1  Added use of Tsukiballs.
// ==/UserScript==

var VERSION = "1.1.2";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSLoopHelper", "http://rveach.romhack.org/BvS/bvs_loop_helper.user.js", VERSION);
} catch(e) {};

/*
*****************************
************Loop*************
*****************************

Stamina Bonuses (in order of use)
	Appetite				Varaiable
	Super Potion				+130 Stamina, 60 Appetite
	Golden Potion				+300 Stamina, 100 Appetite
	TACO					Variable, 60 appetite

	Arena					+50
	Z-Reward				+200
	Favor					+300/+600
	Student Stamina				Variable
	Ramen (and maybe more Appetite)		+40 - +80 Appetite
	Watchin' Shows				100-200 stamina and +50 - +100 Appetite

Looping Level = 19 + Season

0) Setup:
	a) Ask user how he wants to loop
		0) HotKey Selection
		1) Loop Allies
			i) Level 2 Chunin Allies
				Terri, Trapchan, Tsukasa (TODO), Red Rover, Meatballs, Spot (TODO)
			ii) Jonin Allies  (TODO)
				Annie, Bruce Sr., Haus, K-Dog, K.Y., Rover's Mom, Smokey the Bear, Triple H, J-Diddy, The Rack
		2) Sp. Jonin Ranking
			i) Run Parties
			ii) Silver Elixir
			iii) Use pure stamina
		3) Jonin Handling (TODO)
			i) Go Sanin
		4) Smoke Bombs
			i) Allow use of Smoke Bombs
			ii) Stop script when smoke bomb limit hit or out of smokes
		5) Appetite (Allow use of)
			i) Ninja Ons
			ii) Tacos
			iii) Golden Potions
			iv) Super Potions
		6) Kaiju Attack (genin only)
			i) wait for kaiju to be summoned
			ii) Use Tsukiballs
			iii) How many times to attack kaiju
		7) Juice (TODO)
			i) allow use of juice
			i) can use some juice on +1 appetite item
			ii) MPH, Stamina
		8) Misc
			i) Play jackpot for more NinjaOns
			ii) Allow use of Z-Reward (TODO)
			iii) Buy Z-Reward if none are left (TODO)
			iv) Play Darts for Tsukasa (TODO)
			v) Allow buy of Arena Stamina (TODO)
		9) Teams
			i) Farm Team:
				Stalker, Pinky, Olmek, Emosuke, TACOs, Proof Reader
			ii) Fill-in Allies: (TODO)
				???


1) One Time (TODO)
	a) Force 'Flip Out' theme

2) Always
	a) If stamina is lower than required for mission
		i) Use up appetite/bonuses (TODO)
			Will depend on if looping level is reached and what
			bonuses are available and how much stamina is needed to loop
	b) Use Arena Fights, if have any (only buy-in once if Jonin or lower)
	c) Force SuperChunin Sponsor item (TODO)
	d) Consume NinjaOns (if any and allowed to)
	Z) Use Juices if allowed to? (TODO)

3) At Jonin+:
	a) if not-looping level,
		i) if not Sanin, go Sanin? (TODO)
		ii) Load level team
			Stalkergirl, Pinky, Timmy/Smith
		iii) Run A/AA Tai rank missions
			1) if looping level, then goto [3b]
			2) continue iii
		iv) use up some stamina bonuses, and rerun [3a]
	b) if looping level,
		i) Run 'Peeping' Quest, if Dou is not maxed
			1) Use jutsu 'Flock of Seagulls' and allies from the list:
				Tempest Kitsune, Meatballs, Red Rover, Master P
			2) Go back to [3b]
		i) Load 'jonin farm' team that user specified
		ii) Run A/AA rank missions until stamina is depleted
			1) Escape out of Stamina Missions
		iii) Dump non-looping items (TODO)
			1) Donate/Mill contracts
			2) sell any items in shop not needed
			3) Use Lottery tickets
		iv) Goto 'loop' quest and loop
		v) Goto [4]

4) At Genin:
	a) Load Team
		i) Flipper and Stalkergirl (if have her)
	b) Run 'Watchin' Shows' Quest if have it
	c) If doesn't have Stalkergirl
		i) Run quest to get her
			1) Stop Script if don't have a Medicinal Herb
		ii) Go back to [4]
	d) If user wants Meatballs as a Level 2 ally
		i) Run 'Tragic Story' quest
			1) Buy 5 kunai if user doesn't have them (TODO)
		ii) Go back to [4]
	e) If level is less than 12,
		i) If user allows attacking kaiju and hasn't attacked the kaiju the number of times,
			1) Go attack kaiju specified number of times
				i) If kaiju isn't summoned, stop script if user has it set to
			2) Go back to [4]
		ii) Run D-Rank missions
			1) if level is 12 or higher, then go back to [4]
	f) Go to quests to run Chunin Ascension Quests
		i) If 'Chunin Exam Part 1' is available,
			1) Run it and skip the Exam
			2) Go back to [4]
		ii) If 'Forest of Death' is available,
			1) Run it all the way through
			2) Go back to [4]
		iii) If 'Final Fight' is available,
			1) Run it
				i) Part 2: If don't have 8 jutsus,
					1) Go to jutsu menu and buy 8 cheapest if can
						i) Run missions for more Jutsu XP if needed (TODO)
				ii) Part 4: If don't have 6 allies,
					1) Run missions for more Allies (TODO)
				iii) Epilogue: goto [5]
TODO: bloodline check and 40+ D rank missions
TODO: get shorty if don't have enough bloodlines or if required for future stuff

TODO: attack kaiju at Chunin+?

5) At Chunin:
	a) Load Team
		i) If running D mission
			Flipper, Billy/K-Dog, and Stalkergirl
		ii) If running C mission
			Stalkergirl, Timmy (if have him), and Billy, Level Ally, or K-Dog
TODO: allow user to specify someone other than Billy/K-Dog?
	b) If missing Billy, Pinky, Emosuke, Lil' Ro, or Red Rover (if required),
		i) Run D-Gen missions to get missing allies
			Smoke out of missions with no benefits.
	c) If Level stat (Taijutsu if Terri is required, otherwise Genjutsu) is less then 13,
		i) Run the appropriate C rank missions.
			No smoking. Switch allies if an Ally can be leveled. Run Red-Eye when possible.
TODO: don't get final level until have future required allies? Smoke out if needed?
TODO: Spot? Tsukasa?
	d) If Trapchan 2 is required,
		i) If don't have Trapchan 1,
			1) Run C-Gen missions until he is gotten.
				Smoke out of missions that don't have him.
			2) Go back to [5d].
		ii) Go to quests and run 'Wild Child'.
	e) If Terri 1 is required and don't have her,
		i) Run C-Tai missions until she is gotten.
				Smoke out of missions that don't have her.
	f) If don't have Timmy,
		i) Goto quests and run the Sp. Jonin Ascension quest.
	g) If have Timmy and don't have 30 Timmy Missions,
		i) If don't have 3+ allies Leveled,
			1) Run C-Gen Missions to level final allies.
				No smoking unless getting close to the 30 required missions.
			2) Go back to [5g].
		ii) If have 3+ allies Leveled,
TODO: should these allies be missing Jonin allies user specified?
			1) If missing K.Y.,
				i) Run C-Gen missions until she is gotten or the 30 is reached.
					No smoking.
				ii) Go back to [5g].
			2) If missing Bruce Sr.,
				i) Run C-Tai missions until he is gotten or the 30 is reached.
					No smoking.
				ii) Go back to [5g].
			3) Otherwise, run C rank missions in the lowest Stat.
				No Smoking.
			4) Go back to [5g].
	h) Finish Sp. Jonin Ascension quest.
	i) Goto [6].

6) At Sp. Jonin:
	a) Load Team
		Stalkergirl, Timmy/Smith/Billy, Pinky
	b) If doesn't have Pinky,
		i) Run B-Tai missions until she is gotten.
			Smoke out of missions that don't have her.
	c) If Total Levels is less than 41,
		i) Run B rank missions in the lowest level stat.
			No smoking. Get other allies if required (Jonin and Crazy Love Triangle).
	d) If Missing 3 Jonins, 300k Ranking, or Crazy Love Triangle
TODO: help out in village
		i) If Ranking is less than 260k
TODO: make this a custom number?
			1) If allowed to use Parties, run a Party
			2) If allowed to use a 'Silver Elixir', consume 1
TODO: what happens when out of appetite?
			3) Go back to [6d]
		ii) Run B rank missions in the stat of the missing ally
			Stalker = Nin, Billy = Gen, etc.
TODO: Jonin allies
			If no ally is missing, then run Tai.
			No smoking unless Ranking XP is 300k+.
	e) Run Jonin Ascension Quest,
		i) Part 4: Buy and use 'Mind Body Switch Technique'.
		ii) Part 5: Buy and use 'Fire Style: Fireball Jutsu'.
		iii) Part 6: Switch to Jonin Ascension team.
		iv) Part 9: Switch to 'Crazy Love Traingle' team.
	f) Goto [3].

TODO: bloodline check

*****************************
*****************************
*****************************
*/

var floater = null;
var storage;
var playerName = null;
var parsedPage = false;
var pageURL = null;
var pageIdentity = null;

var alertOnce = null;
var playerData = new Array();
//Setup ("Done" - this player has been setuped, [Number] - Setup Step on)
//LevelAllies
//JoninAllies

//Season, Level (total level count), Rank, (Dou/Gen/Nin/Tai)Level (base level for each jutsu), 
//Stamina, Jutsu, Ranking, 
//HangoutBloodline (still have use of mysterious bloodline),
//HasKaiju (kaiju in village),
//HasIngredients (can search for ingredients)

//NinjaOnBonus
//StudentBonus (still has student bonus to use), StudentStamina (stamina gained from students)
//VideoBonus (still has video bonus to use)
//FoodBonus (still has food bonus to use)
//DailyBonus (still has daily bonus to use)
//HasFavors (has favor screen), FavorBonus (still has favor bonus to use)
//HasRamen (can eat more ramen)
//HasVacation (has vacation screen), VacationBonus (when last vacation was)

//CurrentDayroll
//CurrentTeam

var playerAction = null;

var levelAP = [
	0,	1500,	2000,	3000,	3500,	4500,	6000,	8500,	10500,	16000,	26000,	40000,
	60000,	80000,	110000,	160000,	210000,	300000,	330000,	360000,

	400000 + 0*50000,
	400000 + 1*50000,
	400000 + 2*50000,
	400000 + 3*50000,
	400000 + 4*50000,
	400000 + 5*50000,
	400000 + 6*50000,
	400000 + 7*50000,
	800000 + 0*100000,
	800000 + 1*100000,
	800000 + 2*100000,
	800000 + 3*100000,
	800000 + 4*100000,
	800000 + 5*100000,
	800000 + 6*100000
];

var geninAllies = null;

var missions = new Object();
// ally, jutsu, special

// D-Rank
missions["Babysit the Ninja Academy"] = new Array("Pinky", "", "");
missions["Catch a Fly"] = new Array("Bugman", "", "");
missions["Check out a Ninja Centerfold"] = new Array("Billy", "", "");
missions["Clean the Ninja Dog Pen"] = new Array("Red Rover", "", "");
missions["Hiding!"] = new Array("Pinky", "", "");
missions["Hiding in Smoke"] = new Array("Emosuke", "", "");
missions["Inscribe Scrolls"] = new Array("Billy", "", "");
missions["Missing Pet Tora"] = new Array("Billy", "", "");
missions["Ninja Academy Demonstration"] = new Array("Lil' Ro", "", "");
missions["Practice Spying"] = new Array("Emosuke", "", "");
missions["Shake off a Genjutsu!"] = new Array("", "Mind Body Switch Technique", "");
missions["Sneak out of Detention"] = new Array("Billy", "", "");

// C-Rank
missions["Angry Villagers!"] = new Array("Trapchan", "", "");
missions["Clear Out the Forest of Death!"] = new Array("K.Y.", "", "");
missions["Interrupt a Meeting!"] = new Array("Red Rover 2", "", "");
missions["Leap a Gorge!"] = new Array("Terri 2", "", "");
missions["Overthrow a Captain!"] = new Array("Meatballs 2", "", "");
missions["Strike Down a Sentry!"] = new Array("Spot 2", "", "");
missions["Challenge a Dojo Master!"] = new Array("Bruce Sr.", "", "");
missions["Ride your ninja Kite!"] = new Array("Terri", "", "");
missions["Undermine A Wall!"] = new Array("Yuri 2", "", "");

// B-Rank
missions["Confess their Emo Love!"] = new Array("Pinky 2", "", "");
missions["Tame a Scout Wolf!"] = new Array("Rover's Mom", "", "");
missions["Chase down Timmy!"] = new Array("Mr. Smith", "", "");
missions["Cut through a Platoon!"] = new Array("Smokey the Bear", "", "");
missions["Defend the WhiteEye Princess!"] = new Array("Stalkergirl 2", "", "");
missions["Teach a Class!"] = new Array("Annie 2", "", "");
missions["Defeat an Evil Pirate!"] = new Array("Billy 2", "", "");
missions["Proctor a Chunin Exam!"] = new Array("Annie", "", "");

// A-Rank
missions["Seal a Vampire!"] = new Array("", "", "Stamina");

// AA-Rank
missions["Act in the Kage's Place"] = new Array("", "", "Stamina");


window.addEventListener("load", load, false);
window.addEventListener("keyup", hotkey, false);

function hotkey(e) {
	try {
		if ((playerAction == null) || (playerData["Setup"] != "Done"))
			return;
		
		var key = playerData["Hotkey"];
		
		if ((key == "Disabled") || (key == null)) 
			return;
		
		var shift = (key.startsWith("Shift + "));
		
		if (shift) {
			if (!e.shiftKey)
				return;
			
			key = key.substring(8);
		}
		
		if (key == String.fromCharCode(e.keyCode)) {
			floater.doAction();
		}
	}
	catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function load(e) {
	try {
		var temp = document.getElementByName("player");
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playerName = temp.value;
		pageURL = document.location.href;

		storage = new DOMStorage("local", "rvLoop");
		floater = new SpeedFloater();

		getGM();

//alert("pageIdentity = " + pageIdentity);

		applyGM();
	}
	catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function getGM() {
	playerData = JSON.parse(GM_getValue(playerName, "{}"));
}

function saveGM() {
	if (playerData["Hide"] != true) {
		if (alertOnce == null) {
			playerData["alertOnce"] = null;
		} else if (alertOnce != playerData["alertOnce"]) {
			playerData["alertOnce"] = alertOnce;

			alert(alertOnce);
		}
	}

	GM_setValue(playerName, JSON.stringify(playerData));
}

function parsePage() {
	if (parsedPage)
		return;

	parsedPage = true;

	var temp;
	var text;
	var match;
	var snap;

	if (pageURL.match("pages.main\\.html")) {
		pageIdentity = "main";

		var full = (document.getElementByName("showall") == null);

////////////////////////////// Get Dayroll

		var previousDayroll = playerData["CurrentDayroll"];

		snap = document.evaluate("//b[contains(text(),'Daily Report (')]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			if (match = snap.snapshotItem(0).textContent.match("(\\d+/\\d+)")) {
				playerData["CurrentDayroll"] = match[1];
			}
		}

		if (playerData["CurrentDayroll"] != previousDayroll) {
			resetStuff(true);
		}

////////////////////////////// Get Side Bar and Table Stuff
		playerData["NinjaOnBonus"] = 0;

		snap = document.evaluate("//tr/td/center/table//center/table//table/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		ParsePlayerSideBar(snap);

////////////////////////////// Get Current Team
		playerData["CurrentTeam"] = new Array();

		snap = document.evaluate("//b[text()='Current Team:']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			ParseCurrentTeamSpan(snap.snapshotItem(0));
		}

		if (full) {
			playerData["LoopingLevel"] = 35;

			snap = document.evaluate("//b[text()='Key Signature']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				playerData["LoopingLevel"] -= 2;
			}

			playerData["MaxLevel"] = 18 + playerData["Season"] * 2;

			snap = document.evaluate("//b[text()='Knightmare Frame']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				playerData["MaxLevel"] += 5;
			}

			snap = document.evaluate("//b[text()='Knightmare Mark 86']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				playerData["MaxLevel"] += 5;
			}

			if (playerData["MaxLevel"] > 75)
				playerData["MaxLevel"] = 75;

////////////////////////////// Get Allies
			playerData["Allies"] = new Array();

			snap = document.evaluate("//tr[3]/td[3]/center/table/tbody/tr/td/table/tbody/tr/td/span/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			if ((snap != null) && (snap.snapshotLength > 0)) {
				for (var i = 0; temp = snap.snapshotItem(i); i++) {
					playerData["Allies"].push(new Array("", Allies.getAllyName(temp.src)));
				}
			}

////////////////////////////// Get Jutsus

			snap = document.evaluate("//b[contains(text(),'Jutsu:')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				playerData["BoughtJutsus"] = new Array();

				try {
					temp = snap.snapshotItem(0).nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.rows[0].cells[0].firstChild.children;

					for (var i = 0; i < temp.length; i++) {
						playerData["BoughtJutsus"].push(temp[i].textContent.trim());
					}
				}
				catch(e) {
				}
			}

			// TODO: get items?
		} else {
////////////////////////////// Update Allies with Current Team
			if (!Allies.update()) {
				playerAction = new PlayerAction("Show Full Main Page", "showall");
			}
		}

////////////////////////////// Simple Various

		playerData["HangoutBloodline"] = (document.getElementByName("hangout") != null);

		//TODO: get bloodline count

		var temp = document.getElementByName("students");
		playerData["StudentBonus"] = (temp != null);

		if (temp) {
			if (match = temp.parentNode.textContent.match("Up to (\\d+) Stamina")) {
				playerData["StudentStamina"] = parseInt(match[1]);
			}
		}

		playerData["VideoBonus"] = (document.getElementByName("videochallenge") != null);
		playerData["FoodBonus"] = (document.getElementByName("givefood") != null);
		playerData["DailyBonus"] = (document.getElementByName("bonusget") != null);
		playerData["HasFavors"] = (document.getElementByName("sandstorm") != null);
		if (!playerData["HasFavors"])
			playerData["FavorBonus"] = false;

//////////////////////////////
	} else if (pageURL.match("sandstorm\\.html")) {
		pageIdentity = "favor";

		playerData["HasFavors"] = true;
		playerData["FavorBonus"] = (document.getElementByName("sandconfirm") != null);
	} else if (pageURL.match("village\\.html")) {
		pageIdentity = "village";

		playerData["HasKaiju"] = (document.getElementByName("kat") != null);
		playerData["HasRamen"] = (document.getElementByName("ramentobuy") != null);
		playerData["HasVacation"] = (document.getElementByName("ninjabeach") != null);
		playerData["HasIngredients"] = (document.getElementByName("ingredientplace") != null);

		if (!playerData["HasKaiju"])
			playerData["KaijuCount"] = 0;

		//TODO: get if can help out with village
		//TODO: get if have contracts to give/mill to village
	} else if (pageURL.match("villagemonsterfight\\.html")) {
		pageIdentity = "kaiju";

		snap = document.evaluate("//font[contains(text(),'Number of times fought today')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			if (match = snap.snapshotItem(0).textContent.match("today: (\\d+)")) {
				playerData["KaijuCount"] = parseInt(match[1]);
			}
		}
	} else if (pageURL.match("villagebeach\\.html")) {
		pageIdentity = "vacation";

		//TODO: get current vacation stamina
	} else if (pageURL.match("partyhouse\\.html")) {
		if (document.getElementByName("ninrou") != null) {
			pageIdentity = "jackpot";

			snap = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/table[2]/tbody/tr/td/form/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				if (match = snap.snapshotItem(0).textContent.match("(\\d+)\\s+NinjaOn")) {
					var pos = Items.getConsumablePos("NinjaOn");

					if (pos == -1)
						playerData["Consumables"].push(0, "NinjaOn", parseInt(match[1]), 0);
					else
						playerData["Consumables"][pos][2] += parseInt(match[1]);
				}
			}
		} else if (document.getElementByName("el") != null) {
			pageIdentity = "lottery";

			var number = document.getElementByName("numberroll");
			if (number != null) {
				if (match = number.form.previousSibling.textContent.match("you have (\\d+)")) {
					number.value = parseInt(match[1]);
				}
			}
		} else if (document.getElementByName("pr") != null) {
			pageIdentity = "partyroom";
			
			snap = document.evaluate("//center/table/tbody/tr/td/a/table/tbody/tr/td/table/tbody/tr/td/font/center/center/table/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				if (match = snap.snapshotItem(0).textContent.match("(\\+\\d+) to your daily XP ranking!")) {
					playerData["Ranking"] += parseInt(match[1]);
					playerData["UseSpecialRanking"] = true;
				}
			}
		} else {
			pageIdentity = "partyhouse";
		}
	} else if (pageURL.match("shop\\.html")) {
		pageIdentity = "shop";
	} else if (pageURL.match("oneuseitems\\.html")) {
		pageIdentity = "consume";

////////////////////////////// Use of NinjaOns and Non-Stamina Items
		temp = document.getElementById("pitem");
		if (temp != null) {
			if (temp.textContent.indexOf("NinjaOn Used!") != -1) {
				// sort of a hack, but oh well
				playerData["NinjaOnBonus"] = 50;
			}
			if (temp.textContent.indexOf("+100,000 Daily XP Ranking") != -1) {
				// sort of a hack, but oh well
				playerData["Ranking"] += 100000;
				playerData["UseSpecialRanking"] = true;
			}
		}

////////////////////////////// Stamina and Appetite Remaining
		playerData["Appetite"] = 0;
		playerData["Stamina"] = 0;

		snap = document.evaluate("//td[contains(text(),'Appetite Remaining:')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			temp = snap.snapshotItem(0).firstChild.nextSibling;

			playerData["Appetite"] = parseInt(temp.textContent);
			playerData["Stamina"] = parseInt(temp.nextElementSibling.textContent);
		}

////////////////////////////// Consumable Items
		playerData["Consumables"] = new Array();

		var consumeables = document.getElementsByName("onetimeused");
		if (consumeables != null) {
			for (var i = 0; i < consumeables.length; i++) {
				temp = consumeables[i];
				var id = temp.value;

				temp = temp.nextSibling;
				var name = temp.textContent.trim();

				temp = temp.parentNode.nextSibling;
				var quantity = temp.textContent.trim().replace(" left", "");

				temp = temp.nextSibling;
				var cost = temp.textContent.trim();

				playerData["Consumables"].push(new Array(id, name, quantity, cost));
			}
		}

//////////////////////////////
	} else if (pageURL.match("missionstart\\.html")) {
		pageIdentity = "missionstart";

		snap = document.evaluate("//center/table/tbody/tr/td/font/font/table/tbody/tr/td/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			temp = snap.snapshotItem(2);
			playerData["Stamina"] = parseInt(temp.textContent);
		}

		if (document.getElementByName("megamis") == null) {
			playerData["MegaMission"] = false;
			playerData["AllowMegaMission"] = false;
		} else {
			playerData["AllowMegaMission"] = true;
			snap = document.evaluate("//b[text()='Turn MegaMissions Off >']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			playerData["MegaMission"] = ((snap != null) && (snap.snapshotLength > 0));
		}

		playerData["CurrentMission"] = null;
		playerData["CurrentMissionType"] = null;
		playerData["RedEyeMission"] = null;

		//TODO: get highest normal mission ranking (D - AA)
		//		set rank on this?
	} else if (pageURL.match("missions.mission1\\.html")) {
		pageIdentity = "mission";

		snap = document.evaluate("//center/table/tbody/tr/td/center/b[text()='Error!']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			playerAction = new PlayerAction("Fix Mission Error", "minim2");
		} else {
			var preview = (document.getElementByName("attempt") != null);

			if (!preview)
				pageIdentity += "end";

////////////////////////////// Get Side Bar and Table Stuff
			snap = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td[2]/table/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			ParsePlayerSideBar(snap);

////////////////////////////// Get MegaMission Status
			snap = document.evaluate("//i[text()='MegaMissions Enabled!']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			playerData["MegaMission"] = ((snap != null) && (snap.snapshotLength > 0));
//////////////////////////////

			playerData["CurrentMission"] = null;
			playerData["RedEyeMission"] = null;

			snap = document.evaluate("//i[contains(text(),'The RedEye whirls..')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			playerData["RedEyeMission"] = ((snap != null) && (snap.snapshotLength > 0));

			if (preview) {
////////////////////////////// Get Mission Name
				snap = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/center/div/div/div/div/center/font/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					playerData["CurrentMission"] = snap.snapshotItem(0).textContent;
				}

////////////////////////////// Get Mission Jutsus
				playerData["Jutsus"] = new Array();

				snap = document.evaluate("//input[contains(@id,'jutsu')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					for (var i = 0; temp = snap.snapshotItem(i); i++) {
						playerData["Jutsus"].push(new Array(temp.id.replace("jutsu",""), temp.parentNode.nextSibling.nextSibling.firstChild.firstChild.textContent));
					}
				}
			} else {
////////////////////////////// Get Ally Finds
				snap = document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/center/table/tbody/tr/td/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					for (var i = 0; temp = snap.snapshotItem(i); i++) {
						if (temp.src.match("/billy/layout/nin/")) {
							Allies.add("", Allies.getAllyName(temp.src));
						}
					}
				}

////////////////////////////// Get Mission Type
				playerData["CurrentMissionType"] = null;

				snap = document.evaluate("//form[@name='domission']//img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					var src = snap.snapshotItem(0).src;
					var pos = src.lastIndexOf("/")+1;

					playerData["CurrentMissionType"] = src.substring(pos).replace("nextmission", "").replace(".gif", "");
				}

////////////////////////////// Get RedEye Jutsus
				snap = document.evaluate("//center/table/tbody/tr/td[contains(text(),'You analyzed a Jutsu')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					var text = snap.snapshotItem(0).children[1].textContent;
					text = text.substring(0, text.length - 1).trim();

					if (playerData["BuyJutsus"] == null)
						playerData["BuyJutsus"] = new Array(new Array("", text, 0));
					else
						playerData["BuyJutsus"].push(new Array("", text, 0));
				}

////////////////////////////// Get Timmy Missions
				snap = document.evaluate("//center/table/tbody/tr/td[contains(text(),'Timmy Missions Completed')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((snap != null) && (snap.snapshotLength > 0)) {
					if (match = snap.snapshotItem(0).textContent.match(": (\\d+)")) {
						playerData["TimmyMissions"] = parseInt(match[1]);
					}
				}

////////////////////////////// Get Mission AP
				switch (playerData["Rank"]) {
				case "Special Jonin (Genjutsu)":
				case "Special Jonin (Ninjutsu)":
				case "Special Jonin (Taijutsu)":
					// TODO ranking XP countdown
					snap = document.evaluate("//table/tbody/tr/td[contains(text(),' Ranking')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


					break;
				case "Jonin":
				case "Sannin":
				case "R00t":
					if (playerData["TotalAP"] == null) {
						playerData["TotalAP"] = 0;
						playerData["TotalMissions"] = 0;
					}

					// TODO: Mega Mission AP versus Normal Mission AP?

					snap = document.evaluate("//table/tbody/tr/td/font[contains(text(),' Tai AP')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if ((snap != null) && (snap.snapshotLength > 0)) {
						if (match = snap.snapshotItem(0).textContent.match("(\\d+) Tai AP")) {
							if (playerData["MegaMission"]) {
								playerData["TotalAP"] += parseInt(match[1]);
								playerData["TotalMissions"] += 11;
							} else {
								playerData["TotalAP"] += parseInt(match[1]);
								playerData["TotalMissions"]++;
							}
						}
					}
					break;
				}
			}
		}
	} else if (pageURL.match("quests\\.html")) {
		pageIdentity = "quest";

		snap = document.evaluate("//center/table/tbody/tr/td/center/table/tbody/tr/td/table/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		ParsePlayerSideBar(snap);

		temp = document.getElementByName("questcontinue");

		if (temp != null) {
			pageIdentity += "continue";

			var temp2 = temp.parentNode;
			playerData["CurrentQuest"] = new Array();

			playerData["CurrentQuest"][0] = temp.previousSibling.previousSibling.previousSibling.previousSibling.textContent;

			if (match = temp2.textContent.match("You are currently on Part (\\d+) of (\\d+) of the Quest")) {
				playerData["CurrentQuest"][1] = parseInt(match[1]);
			} else if (temp2.textContent.match("Epilogue")) {
				playerData["CurrentQuest"][1] = "Epilogue";
			} else if (temp2.textContent.match("Prologue")) {
				playerData["CurrentQuest"][1] = "Prologue";
			}
		} else {
			playerData["CurrentQuest"] = null;

			playerData["WatchShows"] = (document.getElementByName("quest8") != null);
			playerData["Peeping"] = (document.getElementByName("quest92") != null);
		}
	} else if (pageURL.match("questattempt\\.html")) {
		pageIdentity = "questattempt";

		snap = document.evaluate("//center/table/tbody/tr/td/center/table/tbody/tr/td/table/tbody/tr/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		ParsePlayerSideBar(snap);

		playerData["CurrentQuest"] = null;

		snap = document.evaluate("//center/table/tbody/tr/td/table/tbody/tr/td/center/table/tbody/tr/td/center/table/tbody/tr/td/center", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			temp = snap.snapshotItem(0);

			playerData["CurrentQuest"] = new Array();
			playerData["CurrentQuest"][0] = temp.children[0].textContent;

			temp = temp.children[2];

			if (match = temp.textContent.match("Part (\\d+) of (\\d+)")) {
				playerData["CurrentQuest"][1] = parseInt(match[1]);
			} else if (temp.textContent.match("Epilogue")) {
				playerData["CurrentQuest"][1] = "Epilogue";
			} else if (temp.textContent.match("Prologue")) {
				playerData["CurrentQuest"][1] = "Prologue";
			}
		}

////////////////////////////// Get Mission Jutsus
		playerData["Jutsus"] = new Array();

		snap = document.evaluate("//input[@name='usejutsu' and @type!='hidden']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			for (var i = 0; temp = snap.snapshotItem(i); i++) {
				playerData["Jutsus"].push(new Array(temp.id, (i == 0 ? "None" : temp.parentNode.nextSibling.nextSibling.firstChild.firstChild.textContent)));
			}
		}
/////////////////////////////
	} else if (pageURL.match("bvs.arena\\.html")) {
		pageIdentity = "arena";

		playerData["ArenaFights"] = null;

		snap = document.evaluate("//center/table/tbody/tr/td[text()='Battles Left today:']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			if (match = snap.snapshotItem(0).parentNode.children[1].textContent.match("(\\d+)")) {
				playerData["ArenaFights"] = parseInt(match[1]);
			}
		}

		playerData["HasArenaStamina"] = null;

		snap = document.evaluate("//input[@value='16']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			playerData["HasArenaStamina"] = !snap.snapshotItem(0).disabled;
		}

		snap = document.evaluate("//center/table/tbody/tr/td/font/form", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			if (match = snap.snapshotItem(0).textContent.match("so far today:\\s+(\\d+)")) {
				playerData["ArenaBuyin"] = parseInt(match[1]);
			}
		}
	} else if (pageURL.match("team\\.html")) {
		pageIdentity = "team";

		if (document.getElementByName("conteam") == null) {
			snap = document.evaluate("//center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/font/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				temp = snap.snapshotItem(2);

				playerData["TeamChanges"] = parseInt(temp.textContent);
			}

			playerData["CurrentTeam"] = new Array();

			snap = document.evaluate("//center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td//center/center/table/tbody/tr/td/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				for (var i = 0; temp = snap.snapshotItem(i); i++) {
					playerData["CurrentTeam"].push(new Array("", Allies.getAllyName(temp.src)));
				}
			}

			playerData["Allies"] = new Array();

			snap = document.evaluate("//center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td//div/table/tbody/tr/td/label/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if ((snap != null) && (snap.snapshotLength > 0)) {
				for (var i = 0; temp = snap.snapshotItem(i); i++) {
					playerData["Allies"].push(new Array(document.getElementByName("teammate" + i).value, Allies.getAllyName(temp.src)));
				}
			}
		} else {
			pageIdentity += "confirm";

			// TODO: nothing?
		}
	} else if (pageURL.match("jutsu\\.html")) {
		pageIdentity = "jutsu";

		snap = document.evaluate("//center/table/tbody/tr/td/center[contains(text(),'You learned')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			var text = snap.snapshotItem(0).children[1].textContent;
			text = text.substring(0, text.length - 1);

			if (playerData["Jutsus"] == null) {
				playerData["Jutsus"] = new Array(new Array("", text));
			} else {
				playerData["Jutsus"].push(new Array("", text));
			}
		}

		playerData["BoughtJutsus"] = new Array();

		snap = document.evaluate("//div[@id='jknown']//li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			for (var i = 0; temp = snap.snapshotItem(i); i++) {
				var text = temp.innerHTML;
				// bug with McM's font stuff on jutsu bought list
				text = text.replaceAll("<font style=\"font-size:10px\">", "");

				var pos = text.indexOf("<");
				if (pos == -1)
					pos = text.length;

				playerData["BoughtJutsus"].push(text.substring(0, pos).trim());
			}
		}

		playerData["BuyJutsus"] = new Array();

		snap = document.getElementsByName("jutsutolearn");
		if (snap != null) {
			for (var i = 0; i < snap.length; i++) {
				temp = snap[i].nextSibling;

				var text;
				var test;

				if (temp.innerHTML == null) {
					text = temp.textContent;
					test = temp.nextSibling.textContent;
				} else {
					test = text = temp.innerHTML;
				}

				var pos = text.indexOf("<");
				if (pos == -1)
					pos = text.length;

				if (match = test.match("XP: (((?:(?:\\d+,)+)?\\d+))")) {
					playerData["BuyJutsus"].push(new Array(snap[i].value, text.substring(0, pos).trim(), parseInt(match[1].replaceAll(",", ""))));
				}
			}
		}

		//TODO: get jutsu xp
	} else if (pageURL.match("jutsuorder\\.html")) {
		pageIdentity = "jutsuorder";

		//TODO: get current jutsus and if they are hidden or not
	} else if (pageURL.match("villagemarketplace\\.html")) {
		pageIdentity = "marketplace";
	} else if (pageURL.match("/bucket\\.html")) {
		pageIdentity = "bucket";
	} else if (pageURL.match("chuninexam\\.html")) {
		pageIdentity = "chuninexam";

		snap = document.evaluate("//b[text()='A WINNER IS YOU!']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			playerAction = new PlayerAction("Goto Quests for Chunin Ascension", "minim4");
		}
	} else if (pageURL.match("loop\\.html")) {
		pageIdentity = "loop";

		temp = document.getElementByName("blood");
		if (temp) {
			if (playerData["Season"] < 110)
				temp.checked = true;

			temp = document.getElementByName("loopc");
			if (temp) {
				temp.checked = true;

				temp.scrollIntoView();
			}

			document.getElementByName("pconf").focus();
		}

		if (!temp) {
			pageIdentity += "2";
		}
	} else {
		// alertOnce = "Unknown page: " + pageURL;
	}
}

function applyGM() {
	if (playerData["Setup"] != "Done") {
		if ((playerData["Setup"] == undefined) || (playerData["Setup"] == ""))
			playerData["Setup"] = 0;
	} else if (playerData["Hide"] == true) {
		playerAction = null;
	} else {
		parsePage();

		if (playerAction != null) {
			;
		} else if (pageIdentity == "loop2") {
			playerAction = new PlayerAction("Go back to Main", "mainform2");
		} else {
////////////////////////////// Data Setup
			if ((playerData["CurrentTeam"] == null) || (playerData["TaiAPMin"] == null)) {
				playerAction = new PlayerAction("Show Main Page", "minim1");
			} else if ((playerData["LoopingLevel"] == null) || (playerData["MaxLevel"] == null)) {
				if (pageIdentity == "main") {
					playerAction = new PlayerAction("Show Full Main Page", "showall");
				} else {
					playerAction = new PlayerAction("Show Main Page", "minim1");
				}
			} else if (playerData["Allies"] == null) {
				if (pageIdentity == "main") {
					playerAction = new PlayerAction("Show Full Main Page", "showall");
				} else {
					playerAction = new PlayerAction("Show Team Page", "minim7");
				}
			} else if (playerData["BuyJutsus"] == null) {
				playerAction = new PlayerAction("Show Jutsu Page", "minim9");
			} else if (playerData["BoughtJutsus"] == null) {
				if (pageIdentity == "main") {
					playerAction = new PlayerAction("Show Full Main Page", "showall");
				} else {
					playerAction = new PlayerAction("Show Jutsu Page", "minim9");
				}
			} else if ((playerData["HasArenaStamina"] == null) || (playerData["ArenaFights"] == null)) {
				playerAction = new PlayerAction("Show Arena Page", "minim10");
			} else if ((playerData["Consumables"] == null) || (playerData["Appetite"] == null)) {
				playerAction = new PlayerAction("Show Consumables", "minim11");
////////////////////////////// Game Play Mechanics
			} else {
				applyGameplayMechanics();
			}
//////////////////////////////
		}
	}

	saveGM();

	floater.draw();
}

function applyGameplayMechanics() {
	var temp;

////////////////////////////// Use NinjaOns
	if ((playerData["NinjaOnBonus"] < 50) && (playerData["AllowNinjaOn"] == "Y")) {
		var skip = false;
		temp = Items.getConsumable("NinjaOn");
		playerAction = null;

		if ((temp == null) || (temp[2] < 10)) {
			if (playerData["AllowJackpot"] == "Y") {
				if (pageIdentity == "partyhouse") {
					playerAction = new PlayerAction("Goto Jackpot for NinjaOns", "pminim5");
				} else if (pageIdentity == "jackpot") {
					document.getElementByName("rowone").checked = true;
					document.getElementByName("rowtwo").checked = true;
					document.getElementByName("rowthree").checked = true;
					document.getElementByName("rowfour").checked = true;
					document.getElementByName("rowfive").checked = true;
					document.getElementByName("multijack").checked = true;

					playerAction = new PlayerAction("Play Jackpot for NinjaOns", "ninrou");
				} else {
					playerAction = new PlayerAction("Goto Jackpot for NinjaOns", "minim5");
				}

				return;
			} else if (temp == null) {
				skip = true;
			}
		}

		if (!skip) {
			if (pageIdentity == "consume") {
				setCheckedValue("onetimeused", temp[0]);
				document.getElementByName("onetimenumber").value = (50 - playerData["NinjaOnBonus"]) / 5;

				playerAction = new PlayerAction("Consume NinjaOns", "otime");
			}

			if (playerAction == null) {
				playerAction = new PlayerAction("Goto Consumables For NinjaOns", "minim11");
			}

			return;
		}
	}

	var canLoop = (playerData["TaiLevel"] >= playerData["LoopingLevel"]);

////////////////////////////// Stamina Refill
	if ((pageIdentity != "mission") && (((playerData["Rank"] == "Jonin") && (playerData["Stamina"] < 100)) ||
	   ((playerData["Rank"] != "Jonin") && (playerData["Stamina"] < 10)))) {
		// TODO: do other stamina refills

		if (playerData["Appetite"] >= 100) {
			if (pageIdentity == "consume") {
				if (canLoop) {
					alertOnce = "use up your appetite to loop";
				} else {
					alertOnce = "use up your appetite for stamina";
				}
				// TODO: drink more appetite???
				return;
			} else {
				playerAction = new PlayerAction("Show Consumables", "minim11");
			}
		}

		if (playerAction == null) {
			if ((!canLoop) && (playerData["Stamina"] < 10)) {
				// TODO: night team
				alertOnce = "Form night team";

				return;
			}
		} else {
			return;
		}
	}
	
////////////////////////////// Basic Quest Handling
	if (playerData["CurrentQuest"] != null) {
		var cont = false;
		var notFound = false;
		var contName;

		if (Quests.isOnQuestPage()) {
			contName = Quests.getFormName();
		}

		switch (playerData["CurrentQuest"][0]) {
		case "Watchin' Your Shows":
			cont = true;

			if (playerData["CurrentQuest"][1] == "Epilogue")
				playerData["WatchShows"] = false;
			break;
		case "Stalkergirl":
			cont = true;

			if (playerData["CurrentQuest"][1] == "Epilogue")
				Allies.add("", "Stalkergirl");
			break;
		case "Very Tragic Story":
			cont = true;

			if (playerData["CurrentQuest"][1] == "Epilogue")
				Allies.add("", "Meatballs");
			break;
		case "Forest of Death":
			cont = true;
			break;
		case "Final Fight":
			cont = true;

			switch (playerData["CurrentQuest"][1]) {
			case 1:
				// TODO: bloodline check?
				break;
			case 2:
				if (playerData["BoughtJutsus"].length < 8) {
					if (pageIdentity == "jutsu") {
						var temp = Jutsus.getCheapest();

						if (Jutsus.buy(temp[1])) {
							playerAction = new PlayerAction("Buy '" + temp[1] + "'", "jutsu");
						} else {
							alertOnce = "Do more missions for Jutsu XP";
							// TODO
						}
					} else {
						playerAction = new PlayerAction("Buy Jutsus", "minim9");
					}
					return;
				}
				break;
			case 3:
				// TODO: 40+ d-rank missions?
				break;
			case 4:
				if (playerData["Allies"].length < 6) {
					alertOnce = "Get more allies.";
					// TODO: get more allies
					return;
				}
				break;
			case "Epilogue":
				Allies.add("", "K-Dog");

				if (playerData["Appetite"] != null)
					playerData["Appetite"] += 20;
				break;
			}

			break;
		case "Wild Child":
			cont = true;

			if (playerData["CurrentQuest"][1] == "Epilogue")
				Allies.add("", "Trapchan 2");
			break;
		case "The Student Becomes the Teacher (Genjutsu S2+)":
		case "The Student Becomes the Teacher (Ninjutsu S2+)":
		case "The Student Becomes the Teacher (Taijutsu S2+)":
		case "The Student Becomes the Teacher (Season 2+)":
			cont = true;
			playerData["CurrentQuest"][0] = "The Student Becomes the Teacher (Season 2+)";

			switch (playerData["CurrentQuest"][1]) {
			case 3:
				if (!Allies.has("Timmy")) {
					Allies.add("", "Timmy");
					playerData["TimmyMissions"] = 0;
				}

				cont = (playerData["TimmyMissions"] >= 30);
				break;
			case 4:
				cont = (Allies.countLeveled() >= 3);
				break;
			case "Epilogue":
				Allies.add("", "Cato");

				if (playerData["Appetite"] != null)
					playerData["Appetite"] += 20;
				break;
			}
			break;
		case "Jonin Ascension (S2+ RedEye)":
		case "Jonin Ascension (S2+ WhiteEye)":
		case "Jonin Ascension (S2+ Legacy)":
		case "Jonin Ascension (Season 2+)":
			cont = true;
			playerData["CurrentQuest"][0] = "Jonin Ascension (Season 2+)";
			var jutsuName = null;

			switch (playerData["CurrentQuest"][1]) {
			case 4:
				jutsuName = "Mind Body Switch Technique";
			case 5:
				if (jutsuName == null)
					jutsuName = "Fire Style: Fireball Jutsu";

				if (playerData["BoughtJutsus"].indexOf(jutsuName) == -1) {
					if (pageIdentity == "jutsu") {
						if (Jutsus.buy(jutsuName)) {
							playerAction = new PlayerAction("Buy '" + jutsuName + "'", "jutsu");
						} else {
							alertOnce = "Do more missions for Jutsu XP for '" + jutsuName + "'";
							// TODO
						}
					} else {
						playerAction = new PlayerAction("Buy Jutsu", "minim9");
					}
				} else if ((pageIdentity == "questattempt") && (playerData["Jutsus"].length > 0)) {
					Jutsus.apply(jutsuName);
				}
				break;
			case 6:
				if (Allies.countJoninAscension() < 3) {
					cont = false;
				} else {
					var team = new Array();

					for (var i = 0; (team.length < 3) && (i < Allies.joninAscension.length); i++) {
						if (Allies.has(Allies.joninAscension[i]))
							team.push(Allies.joninAscension[i]);
					}

					if (Allies.loadTeam(team))
						return;
				}
				break;
			case 7:
				// TODO: 3+ bloodlines?
				break;
			case 8:
				if (playerData["Ranking"] < 300000) {
					cont = false;
				}
				break;
			case 9:
				if (((!Allies.has("Pinky 2")) && (!Allies.has("Pinky 3"))) || ((!Allies.has("Stalkergirl 2")) && (!Allies.has("Stalkergirl 3"))) || (!Allies.has("Billy 2"))) {
					cont = false;
				}

				Allies.loadTeam(new Array("Pinky", "Stalkergirl", "Billy"));
				break;
			case "Epilogue":
				Allies.add("", "Olmek");
				break;
			}
			break;
		case "Peeping":
			cont = true;

			switch (playerData["CurrentQuest"][1]) {
			case 1:
				var jutsuName = null;
				var team = new Array();

				if ((Allies.has("Tempest Kitsune")) && (team.length < 3))	// +3 levels/range
					team.push("Tempest Kitsune");
				if ((Allies.has("Meatballs")) && (team.length < 3))		// +1 level * Ally Level
					team.push("Meatballs");
				if ((Allies.has("Red Rover")) && (team.length < 3))		// +2 levels
					team.push("Red Rover");
				if ((Allies.has("Master P")) && (team.length < 3))		// +2 strength
					team.push("Master P");

				if (Allies.loadTeam(team)) {
					return;
				}

				jutsuName = "Flock of Seagulls";

				if (playerData["BoughtJutsus"].indexOf(jutsuName) == -1) {
					if (pageIdentity == "jutsu") {
						if (Jutsus.buy(jutsuName)) {
							playerAction = new PlayerAction("Buy '" + jutsuName + "'", "jutsu");
						} else {
							alertOnce = "Do more missions for Jutsu XP for '" + jutsuName + "'";
							// TODO
						}
					} else {
						playerAction = new PlayerAction("Buy Jutsu", "minim9");
					}
				} else if (pageIdentity == "questattempt") {
					if (playerData["Jutsus"].length > 0) {
						Jutsus.apply(jutsuName);
					}

					if ((playerData["Chakra"] < 120) && (contName != "goquest")) {
						playerAction = new PlayerAction("Recharge chakra", "chakra");
					}
				}
				break;
			case "Epilogue":
				playerData["Peeping"] = false;
				break;
			}
			break;
		default:
			notFound = true;
			break;
		}

		if ((cont) || (notFound)) {
			Quests.finish(cont, contName);
			return;
		}
	}

	if (playerData["ArenaFights"] > 0) {
		if (pageIdentity == "arena") {
			if (playerData["ArenaBuyin"] == 0) {
				// TODO: setup option

				switch (playerData["Rank"]) {
				case "Genin":
				case "Chunin":
				case "Special Jonin (Genjutsu)":
				case "Special Jonin (Ninjutsu)":
				case "Special Jonin (Taijutsu)":
					playerAction = new PlayerAction("Buy more Fights", "buyfights");
					return;
					break;
				}
			}

			var temp = document.getElementByName("megaarena");
			if (temp != null)
				temp.checked = true;

			playerAction = new PlayerAction("Arena Fight", "arenafight");
		} else {
			playerAction = new PlayerAction("Goto Arena Page", "minim10");
		}
		return;
	}

	// TODO: get allies outside of your rank if player skipped them
	// TODO: patrol/collect if Less than Jonin

	switch (playerData["Rank"]) {
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	case "Genin":
		var loadTeam = false;
		var hasStalkergirl = Allies.has("Stalkergirl");
		var hasMeatballs = ((playerData["LevelAllies"].indexOf("Meatballs") == -1) || (Allies.has("Meatballs")));

		var team = new Array("Flipper");
		if (hasStalkergirl)
			team.push("Stalkergirl");

		// TODO: smoke out of mission with the highest Stat Level
		
		if (Allies.loadTeam(team)) {
			return;
		} else {
			if (playerData["WatchShows"]) {
				if (pageIdentity == "quest") {
					playerAction = new PlayerAction("Watchin' Your Shows", "quest8");
				} else {
					playerAction = new PlayerAction("Goto Quests for Show Watching", "minim4");
				}
			} else if (pageIdentity == "chuninexam") {
				if (document.getElementByName("skipchu") != null) {
					playerAction = new PlayerAction("Skip Exam", "skipchu");
				}
			} else if (!hasStalkergirl) {
				if (pageIdentity == "quest") {
					if (document.getElementByName("quest134") == null)
						alertOnce = "Get a 'Medicinal Herb' to continue!";
					else
						playerAction = new PlayerAction("Stalkergirl", "quest134");
				} else {
					playerAction = new PlayerAction("Goto Quests for Stalkergirl", "minim4");
				}
			} else if (!hasMeatballs) {
				if (pageIdentity == "quest") {
					if (document.getElementByName("quest100") == null)
						alertOnce = "Get 5 'Kunai's to continue!";
					else
						playerAction = new PlayerAction("Very Tragic Story", "quest100");
				} else {
					playerAction = new PlayerAction("Goto Quests for Meatballs", "minim4");
				}
			} else if (playerData["Level"] < 12) {
				if (playerData["AttackKaiju"] > 0) {
					if ((playerData["HasKaiju"] == null) || (playerData["KaijuCount"] == null)) {
						if (pageIdentity == "village")
							playerAction = new PlayerAction("Check Kaiju", "kat");
						else
							playerAction = new PlayerAction("Goto Village for Kaiju", "minim6");

						return;
					} else if ((playerData["HasKaiju"] == false) && (playerData["WaitKaiju"] == "Y")) {
						alertOnce = "Waiting for kaiju to be summoned!";
						return;
					} else if ((playerData["HasKaiju"] == true) && (playerData["KaijuCount"] < playerData["AttackKaiju"])) {
						if (pageIdentity == "kaiju") {
							if (playerData["AllowTsukiballs"] == "Y") {
								var temp = document.getElementByName("tsukiball");

								if (temp != null)
									temp.checked = true;
							}

							playerAction = new PlayerAction("Attack Kaiju", "kat");
						} else if (pageIdentity == "village") {
							playerAction = new PlayerAction("Goto Kaiju", "kat");
						} else {
							playerAction = new PlayerAction("Goto Kaiju", "minim6");
						}
						return;
					}
				}

				
				applyMissionMechanics("D", "", null, "Level");
				return;
			} else if (pageIdentity != "quest") {
				playerAction = new PlayerAction("Goto Quests for Chunin Ascension", "minim4");
			} else {
				if (document.getElementByName("questchu1") != null) {
					playerAction = new PlayerAction("Chunin Exam Part 1", "questchu1");
				} else if (document.getElementByName("quest60") != null) {
					playerAction = new PlayerAction("Forest of Death", "quest60");
				} else if (document.getElementByName("quest86") != null) {
					playerAction = new PlayerAction("Final Fight", "quest86");
				} else {
					alertOnce = "Failed to find the Chunin Ascension Test!";
				}
			}
		}
		break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	case "Chunin":
		var hasBilly = Allies.has("Billy");
		var hasPinky = Allies.has("Pinky");
		var hasEmosuke = Allies.has("Emosuke");
		var hasLilRo = Allies.has("Lil' Ro");
		var hasTimmy = Allies.has("Timmy");
		var extraName = playerData["LevelAllies"];
		var hasExtra = new Array();
		var stage;
		var doQuests = false;
		var countLeveled = Allies.countLeveled();

		if ((!hasLilRo) && ((Jutsus.canBuy("Mind Body Switch Technique")) || (Jutsus.hasBought("Mind Body Switch Technique"))))
			hasLilRo = true;

		hasExtra[-1] = true;
		hasExtra[0] = ((extraName[0] == null) || (Allies.has(extraName[0])));
		hasExtra[1] = ((extraName[1] == null) || (Allies.has(extraName[1])));
		hasExtra[2] = ((extraName[2] == null) || (Allies.has(extraName[2])));

		var levelStat = (extraName.indexOf("Terri") != -1 ? "Tai" : "Gen");
		var missionRank = "C";
		
		if (playerData["TimmyMissions"] == null)
			playerData["TimmyMissions"] = 0;

		// TODO: Spot
		// TODO: Tsukasa

		// Stage 1 - Pre-C Rank Allies
		// Stage 2 - Level in Specific Stat and Look for Allies too
		// Stage 3 - Ally hunt before getting Timmy
		// Stage 4 - Run Timmy Missions (possible) and finish leveling Allies

		geninAllies = new Array("Billy", "Pinky", "Emosuke", "Lil' Ro");
		if (extraName.indexOf("Red Rover") != -1)
			geninAllies.push("Red Rover");

		if ((!hasBilly) || (!hasPinky) || (!hasEmosuke) || (!hasLilRo) || (!hasExtra[extraName.indexOf("Red Rover")])) {
			stage = 1;

			missionRank = "D";
			levelStat = "Gen";
		} else if (playerData[levelStat + "Level"] < 13) {
			stage = 2;

			// TODO: start search for Trapchan/Terri early
		} else if (!hasExtra[extraName.indexOf("Trapchan")]) {
			stage = 3;

			levelStat = "Gen";
		} else if (!hasExtra[extraName.indexOf("Terri")]) {
			stage = 3;
		} else if ((extraName.indexOf("Trapchan") != -1) && (!Allies.has("Trapchan 2"))) {
			if (playerData["CurrentQuest"] != null) {
				; // will run quest down below
			} else if (pageIdentity == "quest") {
				if (document.getElementByName("quest52") == null) {
					alertOnce = "Visit 'Hidden Forbidden Holy Ground' to continue!";
				} else {
					playerAction = new PlayerAction("Wild Child", "quest52");
				}
				
				return;
			} else {
				playerAction = new PlayerAction("Goto Quests to Level Trapchan", "minim4");
				return;
			}
		} else if ((!hasTimmy) || (playerData["CurrentQuest"] == null)) { // or has 30 timmy quests
			if (playerData["CurrentQuest"] != null) {
				; // already running quest
			} else if (pageIdentity == "quest") {
				if (document.getElementByName("quest66") != null) { // Gen
					playerAction = new PlayerAction("The Student Becomes the Teacher (Season 2+)", "quest66");
				} else if (document.getElementByName("quest152") != null) { // Tai
					playerAction = new PlayerAction("The Student Becomes the Teacher (Season 2+)", "quest152");
				} else {
					alertOnce = "Get a 'Village At War' to continue!";
				}
				return;
			} else {
				playerAction = new PlayerAction("Goto Quests for Chunin Ascension", "minim4");
				return;
			}
		} else if ((hasTimmy) && (playerData["TimmyMissions"] < 30)) {
			stage = 4;
		} else if (countLeveled < 3) {
			stage = 4;
		}

		var team = new Array();

///////////////////// Must Have Allies
		team.push("Stalkergirl");

		if (hasTimmy) {
			team.push("Timmy");
		}

		var newAlly = Missions.hasNewAlly();	// new Ally 1
		var newLeveledAlly;			// Ally 2+

		if ((newAlly != null) && (Allies.isAllyLeveled(newAlly))) {
			newLeveledAlly = Allies.getAllyWithoutLevel(newAlly);
			newAlly = null;

			if (countLeveled < 3) {
				team.push(newLeveledAlly);
			}
		}

		if (stage == 4) {
			if ((countLeveled == 3) && (playerData["TimmyMissions"] < 30)) {
				if (!Allies.has("K.Y.")) {
					levelStat = "Gen";
				} else if (!Allies.has("Bruce Sr.")) {
					levelStat = "Tai";
				} else {
					levelStat = "Gen";

					if (playerData["NinLevel"] < playerData[levelStat + "Level"])
						levelStat = "Nin";
					if (playerData["TaiLevel"] < playerData[levelStat + "Level"])
						levelStat = "Tai";
				}

				// TODO switch to farm team?
				team.push("Billy");
			} else {
				levelStat = "Gen";
			}
		}
/////////////////////

		if (team.length < 3) {
			if (missionRank == "D")
				team.push("Flipper");

			if ((team.length == 2) && (Allies.has("Billy"))) {
				// TODO: chunin farm team
				team.push("Billy");
			}

			// last resort
			if (team.length == 2) {
				team.push("K-Dog");
			}
		}




		if (Allies.loadTeam(team)) {
			return;
		} else {
			var reason;
			var jutsu = (playerData["SmokeMissions"] == "Y" ? "Escape Jutsu" : null);
			// TODO: out of smoke bombs or limit hit

			switch (stage) {
			case 1:
			case 3:
				reason = "get Allies";		break;
			case 2:	reason = "Level";		break;
			case 4:	reason = "Finish";		break;
			}

			if (missionRank == "D") {
				switch (newAlly) {
				case "Billy":
				case "Pinky":
				case "Emosuke":
					jutsu = null;
					break;
				case "Lil' Ro":
					if (!hasLilRo)
						jutsu = null;
					break;
				}

				for (var i = 0; i < 3; i++) {
					if (Allies.equals(extraName[i], newAlly)) {
						jutsu = null;
						break;
					}
				}

				if (playerData["RedEyeMission"] == true)
					jutsu = null;
			} else if (missionRank == "C") {
				if ((stage == 2) || ((newLeveledAlly != null) && (countLeveled < 3)))
					jutsu = null;
				else if ((stage == 3) && (newAlly != null) && (!hasExtra[extraName.indexOf(newAlly)]))
					jutsu = null;
				else if ((stage == 4) && (playerData["TimmyMissions"] < 30 - (3 - countLeveled)))
					jutsu = null;

				if ((jutsu != null) && (Allies.isJonin(newAlly)) && (playerData["JoninAllies"].indexOf(newAlly) != -1)) {
					jutsu = null;
				}
			}

			applyMissionMechanics(missionRank, levelStat, jutsu, reason);
			return;
		}
		break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	case "Special Jonin (Genjutsu)":
	case "Special Jonin (Ninjutsu)":
	case "Special Jonin (Taijutsu)":
		var hasBilly = Allies.has("Billy 2");
		var hasPinky = (Allies.has("Pinky 2")) || (Allies.has("Pinky 3"));
		var hasStalkergirl = (Allies.has("Stalkergirl 2")) || (Allies.has("Stalkergirl 3"));
		var extraName = playerData["JoninAllies"];
		var hasExtra = new Array();
		var countJonin = Allies.countJoninAscension();
		var hasCLT = ((hasBilly) && (hasPinky) && (hasStalkergirl));
		var hasRanking = (playerData["Ranking"] >= 300000);
		var stage;
		var missionStat;
		var missionRank = "B";

		hasExtra[-1] = true;
		hasExtra[0] = ((extraName[0] == null) || (Allies.has(extraName[0])));
		hasExtra[1] = ((extraName[1] == null) || (Allies.has(extraName[1])));

		// Stage 1 - Find Pinky 2 (B Rank) (And any Jonin)
		// Stage 2 - Level Stats (B Rank) (And any Jonin)
		// Stage 3 - Find Allies or Ranking

		// TODO: Jonin Allies
		// TODO: PH Jonin Allies
		// TODO: Haus
		// TODO: Triple H

		if (!hasPinky) {
			stage = 1;
			missionStat = "Tai";
		} else if (playerData["Level"] < 41) {
			stage = 2;
			missionStat = "Gen";

			if (playerData["NinLevel"] < playerData[missionStat + "Level"])
				missionStat = "Nin";
			if (playerData["TaiLevel"] < playerData[missionStat + "Level"])
				missionStat = "Tai";
		} else if (playerData["SpecialRanking"] == null) {
			alertOnce = "Rerun Setup and select a way to get Ranking XP.";
			return;
		} else if ((countJonin < 3) || (!hasRanking) || (!hasCLT)) {
			var smoke;
// TODO: use village help out if haven't yet

			if ((playerData["UseSpecialRanking"] != true) && (playerData["Ranking"] < 260000)) {
				switch (playerData["SpecialRanking"]) {
				case "Party":
					if (pageIdentity == "partyhouse") {
						playerAction = new PlayerAction("Goto Party Room for Ranking XP", "pminim11");
					} else if (pageIdentity == "partyroom") {
						document.getElementsByName("partytype")[2].checked = true;

						playerAction = new PlayerAction("Have a party", "pr");
					} else {
						playerAction = new PlayerAction("Goto Party Room for Ranking XP", "minim5");
					}

					return;
					break;
				case "Stamina":
					break;
				case "Appetite":
// TODO: use 1 silver elixir
alertOnce ="Use up Appetite on a Silver Elixir";
return;
					break;
				}
			}

			stage = 3;
		} else {
			if (playerData["CurrentQuest"] != null) {
				; // already running quest
			} else if (pageIdentity == "quest") {
				var temp = document.getElementByName("quest113"); // redeye
				if (temp == null)
					temp = document.getElementByName("quest81"); // legacy

				if (temp != null) {
					playerAction = new PlayerAction("Jonin Ascension (Season 2+)", temp.name);
				} else {
// TODO: other Ascension quests may have different numbers
					alertOnce = "Get a 'Jonin Council' to continue!";
				}
				return;
			} else {
				playerAction = new PlayerAction("Goto Quests for Jonin Ascension", "minim4");
				return;
			}
		}

		var newAlly = Missions.hasNewAlly();	// new Ally 1
		var newLeveledAlly;			// Ally 2+

		var team = new Array();
///////////////////// Must Have Allies
		team.push("Stalkergirl");

		if ((newAlly != null) && (Allies.isAllyLeveled(newAlly))) {
			newLeveledAlly = Allies.getAllyWithoutLevel(newAlly);
			newAlly = null;

			if (newLeveledAlly == "Billy") {
				team.push(newLeveledAlly);
			}
		}

		if (team.length == 1) {
			if ((!Allies.hasInTeam("Timmy")) && (Allies.has("Mr. Smith")))
				team.push("Mr. Smith");
			else
				team.push("Timmy");
		}

		team.push("Pinky");
/////////////////////

		if (Allies.loadTeam(team)) {
			return;
		} else {
			var reason;

			switch (stage) {
			case 1:	reason = "find Pinky 2";	break;
			case 2:	reason = "Level";		break;
			case 3:
				if (!hasCLT) {
					reason = "Find Love Triangle";
				} else if (!hasRanking) {
					reason = "Get Ranking XP";
				} else {
					reason = "Find Allies";
				}
				break;
			}

			var jutsu = (playerData["SmokeMissions"] == "Y" ? "Escape Jutsu" : null);
			// TODO: out of smoke bombs or limit hit

			switch (stage) {
			case 2:
				jutsu = null;
				break;
			case 3:
				if (!hasStalkergirl) {
					missionStat = "Nin";
				} else if (!hasBilly) {
					missionStat = "Gen";
				} else if (countJonin < 3) {
alertOnce ="Find remaining Jonins";
return;
				} else {
					missionStat = "Tai";
				}

				if (!hasRanking)
					jutsu = null;
				break;
			}

			switch (newLeveledAlly) {
			case "Pinky":
			case "Stalkergirl":
			case "Billy":
				jutsu = null;
				break;
			}

			if ((countJonin < 3) && (!hasExtra[extraName.indexOf(newAlly)]))
				jutsu = null;

			applyMissionMechanics(missionRank, missionStat, jutsu, reason);
			return;
		}

		break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	case "Jonin":
	case "Sannin":
	case "R00t":
		if (playerData["Season"] >= 111) {
			alertOnce = "Done speedlooping.";
			return;
		}

		if (canLoop) {
			if ((playerData["Peeping"] == true) && (playerData["DouLevel"] < playerData["MaxLevel"])) {
				if (pageIdentity != "quest") {
					playerAction = new PlayerAction("Goto Quests for Peeping", "minim4");
				} else {
					playerAction = new PlayerAction("Peeping", "quest92");
				}
				return;
			}

			var loop = true;

			// TODO: use up lottery
			// TODO: sell contracts

			if ((playerData["Stamina"] >= 10) || (playerData["Appetite"] == null) ||
			    (playerData["Appetite"] >= 100) || (pageIdentity == "mission"))
				loop = false;
					
			if (loop) {
				if ((pageIdentity == "questcontinue") || (pageIdentity == "questattempt")) {
					alertOnce = "finish quest to loop";
				} else if (pageIdentity == "loop") {
					playerAction = (new PlayerAction("Loop after entering Password", "loop")).addSpecial(Specials.loopPassword);
				} else if (pageIdentity != "quest") {
					playerAction = new PlayerAction("Goto Quests to Loop", "minim4");
				} else {
					playerAction = new PlayerAction("Into the Loop", "questloop");
				}

				return;
			}
		}

		var team = new Array();

		if (canLoop) {
			team.push(playerData["Farm1"]);
			team.push(playerData["Farm2"]);
			team.push(playerData["Farm3"]);
		} else {
			var timmy = Allies.get("Timmy");

			team.push("Pinky");
			team.push("Stalkergirl");
			if (Allies.has("Timmy 2"))
				team.push("Timmy");
			else if (Allies.has("Mr. Smith"))
				team.push("Mr. Smith");
			else
				team.push("Timmy");
		}

		if (Allies.loadTeam(team)) {
			return;
		} else {
			var reason;
			var rank;
			var stat;
			var jutsu = null;

			if (canLoop) {
				reason = "Run down Stamina";
				stat = "";

				// TODO: out of smoke bombs or limit hit
				if ((Missions.hasStaminaBonus()) && (playerData["SmokeMissions"] == "Y"))
					jutsu = "Escape Jutsu";
			} else {
				reason = "Level Tai";
				stat = "Tai";
			}

			switch (playerData["Rank"]) {
			case "Sannin":
			case "R00t":
				rank = "AA";
				break;
			default:
				rank = "A";
				break;
			}

			applyMissionMechanics(rank, stat, jutsu, reason);
			return;
		}
		break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
}

function applyMissionMechanics(rank, stat, jutsu, runName) {
	var missionCost = getMissionCost();

	if (pageIdentity == "missionstart") {
		switch (playerData["Rank"]) {
		case "Jonin":
		case "Sannin":
		case "R00t":
			if (playerData["AllowMegaMission"] != false) {
				if ((!playerData["MegaMission"]) && (playerData["Stamina"] >= 100)) {
					playerAction = new PlayerAction("Turn On MegaMission", "megamis");
					return;
				} else if ((playerData["Stamina"] < missionCost) && (playerData["MegaMission"])) {
					playerAction = new PlayerAction("Turn Off MegaMission", "megamis");
					return;
				}
			}
			break;
		}

		playerAction = new PlayerAction("Run " + rank + (stat != "" ? "-" + stat : "") + " to " + runName, "misform" + (stat == "" ? "" : stat.charAt(0).toLowerCase()) + rank.toLowerCase());
	} else if (pageIdentity == "missionend") {
		switch (playerData["Rank"]) {
		case "Jonin":
		case "Sannin":
		case "R00t":
			if (playerData["AllowMegaMission"] != false) {
				if (playerData["Stamina"] >= missionCost) {
					if ((!playerData["MegaMission"]) && (playerData["Stamina"] >= 100)) {
						playerAction = new PlayerAction("Go Turn On MegaMission", "minim2");
						return;
					}
				} else if (playerData["MegaMission"]) {
					playerAction = new PlayerAction("Go Turn Off MegaMission", "minim2");
					return;
				}
			}
			break;
		}

		var force = rank.toLowerCase() + stat.toLowerCase();

		if (force == playerData["CurrentMissionType"])
			playerAction = new PlayerAction("Run another Mission", "domission");
		else
			playerAction = new PlayerAction("Change Mission Type", "backmission");
	} else if (pageIdentity == "mission") {
		if ((jutsu == null) && (playerData["RedEyeMission"])) {
			jutsu = "RedEye";
		}

		Jutsus.apply(jutsu);

		playerAction = new PlayerAction("Run Mission to " + runName, "attempt");
	} else {
		playerAction = new PlayerAction("Goto Missions", "minim2");
	}

	return;
}

//////////////////////////////

function getMissionCost() {
	return (playerData["MegaMission"] == true ? 100 : 10);
}

function EstimateLoopCost() {
	if ((playerData["TotalAP"] == null) || (playerData["TotalMissions"] == 0))
		return null;

	if (playerData["TaiLevel"] >= playerData["LoopingLevel"])
		return 0;

	var apNeeded = playerData["TaiAPMax"] - playerData["TaiAPMin"];

	for (var i = playerData["TaiLevel"] + 1; i < playerData["LoopingLevel"]; i++) {
		apNeeded += levelAP[i];
	}

	var missionCost = 10;
	if (playerData["MissionStaminaBonus"] != null)
		missionCost -= playerData["MissionStaminaBonus"];

	var staminaNeeded = Math.ceil(apNeeded * missionCost / Math.floor(playerData["TotalAP"] / playerData["TotalMissions"]));

	var remaining = staminaNeeded % missionCost;

	if (remaining == 0)
		return staminaNeeded;
	return (staminaNeeded); // - remaining + missionCost);
}

function ParseCurrentTeamSpan(item) {
	playerData["CurrentTeam"] = new Array();

	do {
		if ((item.localName != null) && (item.localName.toLowerCase() == "span")) {
			var temp = item.firstChild;

			if ((temp != null) && (temp.src != null))
				playerData["CurrentTeam"].push(new Array("", Allies.getAllyName(temp.src)));
		}

		item = item.nextSibling;
	} while ((item != null) && (item.localName != null));
}

function ParsePlayerSideBar(snap) {
	var beforeSeason = playerData["Season"];

	playerData["Season"] = null;
	playerData["Level"] = null;
	playerData["Rank"] = null;
	playerData["Stamina"] = null;
	playerData["Ranking"] = null;
	playerData["GenLevel"] = null;
	playerData["NinLevel"] = null;
	playerData["TaiLevel"] = null;

	if ((snap != null) && (snap.snapshotLength > 0)) {
		for (var i = 0; temp = snap.snapshotItem(i); i++) {
			text = temp.textContent;

////////////////////////////// Main Page Stuff
			if (match = text.match("NinjaOn Bonus!.*\\+(\\d+)%")) {
				playerData["NinjaOnBonus"] = parseInt(match[1]);
			} else if (match = text.match("Level:\\s+(\\d+)\\s+\\-\\s+(.*)")) {
				playerData["Level"] = parseInt(match[1]);
				playerData["Rank"] = match[2];
////////////////////////////// Non-Main Page Stuff
			} else if (text.match("Team:")) {
				ParseCurrentTeamSpan(temp.firstChild);
			} else if (match = text.match("Level\\s+(\\d+):\\s*(.*)")) {
				playerData["Level"] = parseInt(match[1]);
				playerData["Rank"] = match[2];

				if (playerData["Rank"].indexOf("Sp. Jonin") == 0) {
					playerData["Rank"] = "Special" + playerData["Rank"].substring(3, 14) + "jutsu)";
				}
////////////////////////////// Normal Stuff
			} else if (match = text.match("Season (\\d+)!")) {
				playerData["Season"] = parseInt(match[1]);
			} else if (match = text.match("(.*)jutsu: (\\d+).*\\((\\d+)/(\\d+)\\s+AP\\)")) {
				playerData[match[1] + "Level"] = parseInt(match[2]);
				playerData[match[1] + "APMin"] = parseInt(match[3]);
				playerData[match[1] + "APMax"] = parseInt(match[4]);

				// TODO: get other stats?
			} else if (match = text.match("Chakra: (-?\\d+)/\\d+")) {
				playerData["Chakra"] = parseInt(match[1]);
			} else if (match = text.match("Stamina: (-?\\d+)")) {
				playerData["Stamina"] = parseInt(match[1]);

				if (match = text.match("(-?\\+?\\d+) Stamina per Mission")) {
					playerData["MissionStaminaBonus"] = parseInt(match[1]);
				}
			} else if (match = text.match("Jutsu XP: (\\d+)")) {
				playerData["Jutsu"] = parseInt(match[1]);

				if (match = text.match("(-?\\d+) (XP for Ranking )?today")) {
					playerData["Ranking"] = parseInt(match[1]);
				}
				break;
			}
		}
	}

	if (beforeSeason != playerData["Season"]) {
		resetStuff(false);
	}
}

function resetStuff(dayroll) {
	playerData["Appetite"] = null;
	playerData["ArenaFights"] = null;
	playerData["UseSpecialRanking"] = false;

	if (dayroll) {
		playerData["HasArenaStamina"] = null;
		playerData["WatchShows"] = null;
		playerData["HasKaiju"] = null;
		playerData["KaijuCount"] = 0;
		playerData["HasArenaStamina"] = null;
		playerData["ArenaBuyin"] = null;
	} else {
		playerData["Allies"] = null;
		playerData["BuyJutsus"] = null;
		playerData["BoughtJutsus"] = null;
		playerData["CurrentMission"] = null;
		playerData["CurrentQuest"] = null;
		playerData["TimmyMissions"] = 0;
		playerData["Peeping"] = null;
	}

	// TODO: reset stuff
}

////////////////////////////// Player Action

function PlayerAction(name, form) {
	this.actionName = name;
	this.formName = form;
	this.special = null;

	this.submit = function() {
		if ((this.special == null) || (this.special())) {
			var form = document.getElementByName(this.formName);
			form.submit();
		}
	};

	this.addSpecial = function(newSpecial) {
		this.special = newSpecial;
		return this;
	};
}

var Specials = new Object();

Specials.loopPassword = function() {
	if (document.getElementByName("pconf").value == "") {
		alert("Enter your password to continue!");

		document.getElementByName("loopc").scrollIntoView();
		document.getElementByName("pconf").focus();

		return false;
	}

	return true;
};

////////////////////////////// Items

var Items = new Object();

// 0 - id
// 1 - name
// 2 - quantity
// 3 - appetite

Items.getConsumablePos = function(name) {
	if (playerData["Consumables"] != null) {
		for (var i = 0; i < playerData["Consumables"].length; i++) {
			if (playerData["Consumables"][i][1] == name)
				return i;
		}
	}

	return -1;
};

Items.getConsumable = function(name) {
	var pos = Items.getConsumablePos(name);
	if (pos == -1)
		return null;

	return playerData["Consumables"][pos];
};

////////////////////////////// Jutsus

var Jutsus = new Object();

// -- Jutsus
// 0 - id
// 1 - name
// -- BuyJutsus
// 0 - id
// 1 - name
// 2 - cost

Jutsus.getCheapest = function() {
	var cheapest = null;

	if (playerData["BuyJutsus"] != null) {
		for (var i = 0; i < playerData["BuyJutsus"].length; i++) {
			if ((cheapest == null) || (playerData["BuyJutsus"][i][2] < cheapest[2]))
				cheapest = playerData["BuyJutsus"][i];
		}
	}

	return cheapest;
};

Jutsus.canBuy = function(name) {
	if (playerData["BuyJutsus"] != null) {
		for (var i = 0; i < playerData["BuyJutsus"].length; i++) {
			if (playerData["BuyJutsus"][i][1] == name) {
				return true;
			}
		}
	}

	return false;
};

Jutsus.buy = function(name) {
	if ((playerData["BuyJutsus"] != null) && (playerData["Jutsu"] != null)) {
		for (var i = 0; i < playerData["BuyJutsus"].length; i++) {
			if (playerData["BuyJutsus"][i][1] == name) {
				if (playerData["Jutsu"] >= playerData["BuyJutsus"][i][2]) {
					var temp = document.getElementById("a" + playerData["BuyJutsus"][i][0]);

					if (temp == null) {
						// RedEye Jutsu

						snap = document.evaluate("//table/tbody/tr/td/input[@value='" + playerData["BuyJutsus"][i][0] + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						if ((snap != null) && (snap.snapshotLength > 0)) {
							temp = snap.snapshotItem(0);
						}
					}

					if (temp != null) {
						temp.checked = true;
						return true;
					}
				}

				break;
			}
		}
	}

	return false;
};

Jutsus.getPos = function(name) {
	if (playerData["Jutsus"] != null) {
		for (var i = 0; i < playerData["Jutsus"].length; i++) {
			if (playerData["Jutsus"][i][1] == name)
				return i;
		}
	}

	return -1;
};

Jutsus.get = function(name) {
	var pos = Jutsus.getPos(name);
	if (pos == -1)
		return null;

	return playerData["Jutsus"][pos];
};

Jutsus.has = function(name) {
	return (Jutsus.getPos(name) != -1);
};

Jutsus.getBoughtPos = function(name) {
	if (playerData["BoughtJutsus"] != null) {
		return playerData["BoughtJutsus"].indexOf(name);
	}

	return -1;
};

Jutsus.hasBought = function(name) {
	return (Jutsus.getBoughtPos(name) != -1);
};

Jutsus.apply = function(name) {
	if (name == null)
		return;

	var jutsu = Jutsus.get(name);
	if (jutsu == null) {
		if (jutsu == null) {
			Jutsus.apply("Advanced RedEye");
			return;
		}

		alert("Failed to apply jutsu: '" + name + "'");
		return;
	}

	var temp;

	if (pageIdentity.indexOf("mission") != -1)
		temp = document.getElementById("jutsu" + jutsu[0]);
	else if (pageIdentity == "questattempt")
		temp = document.getElementById(jutsu[0]);
	else {
		alert("Failed to apply jutsu on unknown page");
		return;
	}

	if (temp == null) {
		alert("Failed to apply jutsu: '" + name + "'");
	} else {
		temp.checked = true;
	}
};

////////////////////////////// Allies

var Allies = new Object();

// 0 - id
// 1 - name

Allies.createNewQuickTeam = function(ally1, ally2, ally3) {
	var spot = document.getElementByName("quickteam");
	if (spot == null) {
		spot = document.getElementByName("qteam");
		if (spot == null) {
			alertOnce = "Failed to build Quick Team area!";
			return;
		}
		spot = spot.children[0];

		var element = document.createElement('DIV');
		var text = "<table><tbody><tr><td style=\"font-family: arial; border: 1px dotted black; padding: 3px;\">";
		text += "<b>QuickTeams</b>: <font style=\"font-size: 12px;\">(Select team, and hit \"Use Quickteam\" - bypasses confirmation screen)</font><br>";
		text += "<input type=\"radio\" id=\"noneqt\" checked=\"\" value=\"\" name=\"quickteam\"> <label for=\"noneqt\">None</label><br>";
		text += "<a style=\"color: rgb(161, 0, 0);\" onfocus=\"this.blur();\" href=\"javascript:document.qteam.submit();\"><b>Use Quickteam &gt;</b></a>";
		text += "<noscript><input type=\"submit\" VALUE=\"Use Quickteam\"></noscript>";
		text += "<font style=\"font-size: 10px;\"><br>(Teams in <font color=\"#cc0000\">red</font> have allies that are different Levels than listed, so may have different effects)</font>";
		text += "</td></tr></tbody></table>";
		text += "<br>";

		element.innerHTML = text;
		spot.parentNode.insertBefore(element, spot.children[spot.children - 1]);

		spot = document.getElementByName("quickteam");
	}

	if (spot == null) {
		alertOnce = "Failed to apply Temporary Quick team!";
		return;
	}

	spot = spot.nextSibling.nextSibling.nextSibling.nextSibling;

	var element = document.createElement('DIV');

	var text = "<input type='radio' id='tempqt' value='";

	ally1 = Allies.get(ally1);

	text += ally1[0];
	if (ally2 != null) {
		ally2 = Allies.get(ally2);
		text += "^" + ally2[0];
	}
	if (ally3 != null) {
		ally3 = Allies.get(ally3);
		text += "^" + ally3[0];
	}

	text += "' name='quickteam'><label for='tempqt'><b>Temporary Quickteam</b>: <font style='font-size: 12px;'>";

	text += ally1[1];
	if (ally2 != null) {
		text += ", " + ally2[1];
	}
	if (ally3 != null) {
		text += ", " + ally3[1];
	}

	text += "<br></font></label>";

	element.innerHTML = text;
	spot.parentNode.insertBefore(element, spot);

	element.parentNode.scrollIntoView();
	document.getElementsByName("quickteam")[1].checked = true;
};

Allies.getAllyName = function(src) {
	var pos = src.lastIndexOf("/")+1;
	var text = src.substring(pos).replaceAll("_", " ").replaceAll(" Lvl. ", " ").replaceAll("%27", "'").replace("ss\\.gif", "").replace(/s?\.gif/, "");

	// bug fixes
	if (text == "Meatball")
		text = "Meatballs";
	else if (text == "The HoClau")
		text = "The HoClaus";

	return text;
};

Allies.canAllyLevel = function(name) {
	if ((name != null) && (Allies.isAllyLeveled(name))) {
		var currentAlly = Allies.get(Allies.getAllyWithoutLevel(name));

		if (currentAlly == null)
			return false;

		return (Allies.getAllyLevel(currentAlly[1]) + 1 == Allies.getAllyLevel(name));
	}

	return false;
};

Allies.getAllyWithoutLevel = function(name) {
	if (name.endsWith(" \\d+")) {
		var pos = name.lastIndexOf(" ");
		return name.substring(0, pos);
	}

	return name;
};

Allies.getAllyLevel = function(name) {
	var match;

	if (match = name.match(" (\\d+)")) {
		return parseInt(match[1]);
	}

	return 1;
};

Allies.isAllyLeveled = function(name) {
	return (Allies.getAllyLevel(name) > 1);
};

Allies.update = function() {
	var rtrn = true;

	if (playerData["Allies"] != null) {
		for (var i = 0; i < playerData["CurrentTeam"].length; i++) {
			var pos = Allies.getPos(playerData["CurrentTeam"][i][1]);
			var found = (pos == -1 ? null : playerData["Allies"][pos][1]);

			if (found != playerData["CurrentTeam"][i][1]) {
				if (found == null) {
					playerData["Allies"].push(new Array("", playerData["CurrentTeam"][i][1]));
				} else {
					playerData["Allies"][pos][1] = playerData["CurrentTeam"][i][1];
				}

				rtrn = false;
			}
		}
	} else {
		rtrn = false;
	}

	return rtrn;
};

Allies.getPos = function(name) {
	if (playerData["Allies"] != null) {
		for (var i = 0; i < playerData["Allies"].length; i++) {
			if (Allies.equals(name, playerData["Allies"][i][1]))
				return i;
		}
	}

	return -1;
};

Allies.get = function(name) {
	var pos = Allies.getPos(name);
	if (pos == -1)
		return null;

	return playerData["Allies"][pos];
};

Allies.has = function(name) {
	return (Allies.getPos(name) != -1);
};

Allies.add = function(id, name) {
	var pos = Allies.getPos(Allies.getAllyWithoutLevel(name));

	if (pos == -1) {
		playerData["Allies"].push(new Array(id, name));
	} else {
		playerData["Allies"][pos][0] = id;
		playerData["Allies"][pos][1] = name;
	}
};

Allies.getTeamPos = function(name) {
	if (playerData["CurrentTeam"] != null) {
		for (var i = 0; i < playerData["CurrentTeam"].length; i++) {
			if (Allies.equals(name, playerData["CurrentTeam"][i][1]))
				return i;
		}
	}

	return -1;
};

Allies.hasInTeam = function(name) {
	return (Allies.getTeamPos(name) != -1);
};

Allies.hasTeam = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (!Allies.hasInTeam(arr[i]))
			return false;
	}

	return true;
};

Allies.loadTeam = function(arr) {
	if (!Allies.hasTeam(arr)) {
		if (pageIdentity == "team") {
			Allies.createNewQuickTeam(arr[0], arr[1], arr[2]);
			playerAction = new PlayerAction("Load New Team", "qteam");
		} else {
			playerAction = new PlayerAction("Switch Team", "minim7");
		}

		return true;
	}

	return false;
};

Allies.displayCurrentTeam = function() {
	var text;

	if (playerData["CurrentTeam"] != null) {
		text = "";

		for (var i = 0; i < playerData["CurrentTeam"].length; i++) {
			if (i)
				text += ", ";
			text += playerData["CurrentTeam"][i][1];
		}
	} else {
		text = null;
	}

	return text;
};

Allies.countLeveled = function() {
	var count = 0;

	if (playerData["Allies"] != null) {
		for (var i = 0; i < playerData["Allies"].length; i++) {
			if (playerData["Allies"][i][1].match("\\d+$"))
				count++;
		}
	}

	return count;
};

Allies.joninAscension = new Array("Annie", "Bruce Sr.", "Haus", "K-Dog", "K.Y.", "Rover's Mom", "Smokey the Bear", "Triple H", "J-Diddy", "The Rack");

Allies.isJonin = function(name) {
	for (var i = 0; i < Allies.joninAscension.length; i++) {
		if (Allies.equals(name, Allies.joninAscension[i])) {
			return true;
		}
	}

	return false;
};

Allies.countJoninAscension = function() {
	var count = 0;

	for (var i = 0; i < Allies.joninAscension.length; i++) {
		if (Allies.has(Allies.joninAscension[i])) {
			count++;
		}
	}

	return count;
};

Allies.equals = function(input, arraytest) {
	if (arraytest == null)
		return (input == null);

	return (arraytest.match("^" + input + "( \\d+)?$") != null);
};

////////////////////////////// Missions

var Missions = new Object();

Missions.getForm = function(rank, stat) {
	return "misform" + stat.charAt(0).toLowerCase() + rank.toLowerCase();
};

Missions.isEndType = function(rank, stat) {
	return (playerData["CurrentMissionType"] == rank.toLowerCase() + stat.toLowerCase());
};

Missions.hasNewAlly = function() {
	var mission = missions[playerData["CurrentMission"]];

	if ((mission != null) && (mission[0] != "")) {
		var currentAlly = Allies.get(Allies.getAllyWithoutLevel(mission[0]));

		if (currentAlly == null) {
			if (Allies.isAllyLeveled(mission[0]))
				return null;

			return mission[0];
		}

		if (Allies.getAllyLevel(currentAlly[1]) < Allies.getAllyLevel(mission[0]))
			return mission[0];
	}

	return null;
};

Missions.hasStaminaBonus = function() {
	var mission = missions[playerData["CurrentMission"]];

	return ((mission != null) && (mission[2] == "Stamina"));
};

////////////////////////////// Quests

var Quests = new Object();

Quests.isOnQuestPage = function() {
	return ((pageIdentity == "questcontinue") || (pageIdentity == "questattempt"));
};

Quests.getFormName = function() {
	if (document.getElementByName("goquestgo") != null)
		return "goquestgo";
	else if (document.getElementByName("goquest") != null)
		return "goquest";
	else if (document.getElementByName("goquest2") != null)
		return "goquest2";
	else if (document.getElementByName("attack") != null)
		return "attack";

	return null;
};

Quests.finish = function(allow, formName) {
	if (playerAction != null) {
		;
	} else if (playerData["CurrentQuest"][1] == "Epilogue") { // probably will never hit this code most of the time?
		pageIdentity = "blank";
		playerData["CurrentQuest"] = null;

		applyGameplayMechanics();
		return;
	} else if (allow) {
		if (!Quests.isOnQuestPage()) {
			playerAction = new PlayerAction("Goto Quests to Continue", "minim4");
		} else if (pageIdentity == "questcontinue") {
			playerAction = new PlayerAction("Continue Quest", "questcontinue");
		} else {
			playerAction = new PlayerAction("Do Quest", formName);
		}
	} else {
		alertOnce = "Unknown Quest, continue on your own.";
	}
};

////////////////////////////// Floater

function SpeedFloater() {
	this.window = new Window("floatingSpeedloop", storage);
	this.buttons = new Array();
	this.custom = null;
	this.defaultHeight = "450px";
	
	// Add css style for report window
	GM_addStyle("#floatingSpeedloop {border: 2px solid #000000; position: fixed; z-index: 100; " +
		"color: #000000; background-color: #FFFFFF; padding: 5; text-align: left; " +
		"overflow-y: auto; overflow-x: auto; width: 200; height: " + this.defaultHeight + "; " +
		"background: none repeat scroll 0% 0% rgb(216, 216, 255);}");

	this.draw = function() {
		try {
			var show = ((playerData["Hide"] != true) || (pageURL.match("/main\\.html")));
			this.buttons = new Array();

			if (show) {
				var text = "<center><b>Loop Helper For<br>'" + playerName + "'</b></center>";

				this.window.element.style.height = this.defaultHeight;

				if (playerData["Setup"] != "Done") {
					text += this.doSetup();
				} else {
					if (playerData["Hide"] == true)
						this.window.element.style.height = "100px";

					text += this.doDisplay();
				}

				this.window.element.innerHTML = text;

				for (var i = 0; i < this.buttons.length; i++) {
					document.getElementById(this.buttons[i][2]).addEventListener("click", this.buttons[i][3], true);
				}

				this.window.show();
			} else {
				this.window.hide();
			}
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}
	};

	this.doDisplay = function() {
		var text = "";

		if (playerData["Hide"] != true) {
			text += "<hr>";

			text += this.print("Rank", playerData["Rank"]) + "<br>";
			text += this.print("Stamina", playerData["Stamina"]) + "<br>";
			text += this.print("Current Team", Allies.displayCurrentTeam()) + "<br>";
			text += this.print("Current Mission", (playerData["CurrentMission"] == null ? null : "'" + playerData["CurrentMission"] + "'")) + "<br>";
			text += this.print("Current Quest", (playerData["CurrentQuest"] == null ? null : "'" + playerData["CurrentQuest"][0] + "'" + " Part " + playerData["CurrentQuest"][1])) + "<br>";

			text += "<hr>";

			switch (playerData["Rank"]) {
			case "Genin":
				text += this.print("Level", playerData["Level"]) + "<br>";
				text += this.print("Allies", (playerData["Allies"] == null ? null : playerData["Allies"].length)) + "<br>";
				text += this.print("Jutsus", (playerData["BoughtJutsus"] == null ? null : playerData["BoughtJutsus"].length)) + "<br>";
				break;
			case "Chunin":
				var allies = new Array();
				if (geninAllies != null) {
					for (var i = 0; i < geninAllies.length; i++) {
						var temp = Allies.get(geninAllies[i]);
						if (temp == null) {
							if ((geninAllies[i] == "Lil' Ro") && ((Jutsus.canBuy("Mind Body Switch Technique")) || (Jutsus.hasBought("Mind Body Switch Technique"))))
								;
							else
								allies.push(geninAllies[i]);
						}
					}
				}

				levelStat = (playerData["LevelAllies"].indexOf("Terri") != -1 ? "Tai" : "Gen");

				text += this.print(levelStat + " Level", playerData[levelStat + "Level"]) + "<br>";
				text += this.print("Genin Allies", (allies.length == 0 ? "Complete" : "Missing " + allies.join(", "))) + "<br>";
				text += this.print("Leveled Allies", Allies.countLeveled()) + "<br>";
				text += this.print("Timmy Missions", playerData["TimmyMissions"]) + "<br>";
				break;
			case "Special Jonin (Genjutsu)":
			case "Special Jonin (Ninjutsu)":
			case "Special Jonin (Taijutsu)":
				var clt = new Array();

				var temp = Allies.get("Pinky");
				if ((temp == null) || (Allies.getAllyLevel(temp[1]) < 2))
					clt.push("Pinky");

				temp = Allies.get("Billy");
				if ((temp == null) || (Allies.getAllyLevel(temp[1]) < 2))
					clt.push("Billy");

				temp = Allies.get("Stalkergirl");
				if ((temp == null) || (Allies.getAllyLevel(temp[1]) < 2))
					clt.push("Stalkergirl");

				text += this.print("Level", playerData["Level"]) + "<br>";
				text += this.print("Crazy Love Triangle", (clt.length == 0 ? "Complete" : "Missing " + clt.join(", "))) + "<br>";
				text += this.print("Jonin Allies", Allies.countJoninAscension()) + "<br>";
				text += this.print("Daily Ranking", formatNumber(playerData["Ranking"])) + "<br>";
				break;
			case "Jonin":
			case "Sannin":
			case "R00t":
				text += this.print("Taijutsu Level", playerData["TaiLevel"]) + "<br>";
				text += this.print("Taijutsu AP", (playerData["TaiAPMin"] == null ? null : formatNumber(playerData["TaiAPMin"]) + " (" + Math.floor(playerData["TaiAPMin"] / playerData["TaiAPMax"] * 100) + "%)")) + "<br>";
				text += this.print("Estimated Stamina Needed", EstimateLoopCost()) + "<br>";
				break;
			}

			text += "<hr>";
		}

		if (playerAction != null) {
			this.buttons.push(new Array("Action", playerAction.actionName, "performAction", floater.doAction));
		}
		if (alertOnce != null) {
			this.buttons.push(new Array("Show Alert", "Show", "showAlert", floater.doShowAlert));
		}
		if (playerData["Hide"] == true) {
			this.buttons.push(new Array("", "Show", "showAction", floater.doShow));
		} else {
			this.buttons.push(new Array("", "Hide", "hideAction", floater.doHide));
			this.buttons.push(new Array("", "Setup", "showSetup", floater.doShowSetup));
		}

		text += "<div style='position: absolute; bottom: 0; left: 15px; width: 175px; bottom: 5px;'>";
		text += "<table cellspacing='0' cellpadding='3px' width='100%' style='border-top: solid 1px black;'>";

		var double = false;
		for (var i = 0; i < this.buttons.length; i++) {
			double = (this.buttons[i][0].length == 0);
			
			text += "<tr>";
			text += "<td valign='top' style='color: black; border-bottom: solid 1px black;'>";
			
			if (double) {
				text += "<a href='javascript:;' style='text-decoration: none; color: blue;' id='" + this.buttons[i][2] + "'>" + this.buttons[i][1] + "</a>";
				i++;
			} else {
				text += this.buttons[i][0] + ":";
			}
			
			text += "</td>";
			
			if ((i < this.buttons.length) && ((!double) || (this.buttons[i][0].length == 0))) {
				text += "<td align='right' style='border-bottom: solid 1px black;'><a href='javascript:;' style='text-decoration: none; color: blue;' id='" + this.buttons[i][2] + "'>" + this.buttons[i][1] + "</a>";
			} else {
				text += "<td style='border-bottom: solid 1px black;'>&nbsp;";
			}
			
			text += "</td></tr>";
		}

		text += "</table></div>";

		return text;
	};

	this.doAction = function() {
		try {
			playerAction.submit();
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

		return false;
	};

	this.doShowAlert = function() {
		try {
			alert(alertOnce);
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

		return false;
	};

	this.doShow = function() {
		try {
			playerData["Hide"] = false;

			applyGM();
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

		return false;
	};

	this.doHide = function() {
		try {
			playerData["Hide"] = true;

			applyGM();
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

		return false;
	};
	
	this.doShowSetup = function() {
		try {
			playerData["Setup"] = 0;

			applyGM();
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

		return false;
	};

	this.doSetup = function() {
		var text = "<center>Setup - Page " + (playerData["Setup"]+1) + "</center><hr>";

		switch (playerData["Setup"]) {
		case 0:
			text += "Hotkey:<br><br>";

			var sel = new Array("Disable");
			for (var i = 65; i <= 90; i++) {
				sel.push(String.fromCharCode(i));
			}
			for (var i = 48; i <= 57; i++) {
				sel.push(String.fromCharCode(i));
			}
			for (var i = 65; i <= 90; i++) {
				sel.push("Shift + " + String.fromCharCode(i));
			}
			for (var i = 48; i <= 57; i++) {
				sel.push("Shift + " + String.fromCharCode(i));
			}
			text += createSelect("hotkey", sel, playerData["Hotkey"]) + "<br>";
			break;
		case 1:
			text += "Chunin, Level 2 Allies: <font color='red'>(Select 3)</font><br><br>";

			var allies = playerData["LevelAllies"];

			text += createCheckbox("level2", "Terri", "Terri", allies);
			text += createCheckbox("level2", "Trapchan", "Trapchan", allies);
			text += "<br>";
			text += createCheckbox("level2", "Tsukasa", "Tsukasa", allies);
			text += createCheckbox("level2", "Red Rover", "Red Rover", allies);
			text += "<br>";
			text += createCheckbox("level2", "Meatballs", "Meatballs", allies);
			text += createCheckbox("level2", "Spot", "Spot", allies);
			text += "<br>";
			break;
		case 2:
			text += "Special Jonin Ranking XP:<br><br>";

			text += createRadio("ranking1", "Party", "Run 1 party. Run missions to fill the rest.", playerData["SpecialRanking"]) + "<br>";
			text += createRadio("ranking1", "Appetite", "Eat a 'Silver Elixir'.", playerData["SpecialRanking"]) + "<br>";
			text += createRadio("ranking1", "Stamina", "Run missions to gain the XP.", playerData["SpecialRanking"]) + "<br>";
			break;
		case 3:
			text += "Jonin Ascension Allies: <font color='red'>(Select 2)</font><br><br>";

			var allies = playerData["JoninAllies"];
			var seperate = 0;

			for (var i = 0; i < Allies.joninAscension.length; i++) {
				if (Allies.joninAscension[i].startsWith("K-Dog"))
					continue;

				text += createCheckbox("jonin", Allies.joninAscension[i], Allies.joninAscension[i], allies);

				if ((seperate == 1) || (Allies.joninAscension[i].startsWith("Rover's Mom")) || (Allies.joninAscension[i].startsWith("Smokey"))) {
					text += "<br>";

					seperate = 0;
				} else {
					seperate++;
				}
			}

			break;
		case 4:
			text += "Smoke Bomb Usage:<br><br>";

			text += createCheckbox("smoke1", "Y", "Use smoke bombs to get to ally missions.", playerData["SmokeMissions"]) + "<br>";
			text += createCheckbox("smoke2", "Y", "Stop running when smoke bomb limit is hit or when smokes run out.", playerData["SmokeLimitStop"]) + "<br>";
			break;
		case 5:
			text += "Appetite Usage:<br><br>";

			text += createCheckbox("appetite1", "Y", "Allow and use 'Ninja On's.", playerData["AllowNinjaOn"]) + "<br>";
			text += createCheckbox("appetite2", "Y", "Allow and use 'TACO's.", playerData["AllowTacos"]) + "<br>";
			text += createCheckbox("appetite3", "Y", "Allow and use 'Golden Potion's.", playerData["AllowGP"]) + "<br>";
			text += createCheckbox("appetite4", "Y", "Allow and use 'Super Potion's.", playerData["AllowSP"]) + "<br>";
			break;
		case 6:
			text += "Kaiju Attack:<br><br>";

			text += createCheckbox("kaiju1", "Y", "Wait for Kaiju to be summoned.", playerData["WaitKaiju"]) + "<br>";
			text += createCheckbox("kaiju2", "Y", "Allow and use 'Tsukiballs'.", playerData["AllowTsukiballs"]) + "<br>";
			text += "<br>Number of times to attack Kaiju: " + createEditbox("kaiju3", playerData["AttackKaiju"]) + "<br>";
			break;
		case 7:
			text += "Juice Usage:<br><br>";

			text += createCheckbox("juice1", "Y", "Allow and use Juice.", playerData["AllowJuice"]) + "<br>";
			text += createCheckbox("juice2", "Y", "Use Juice for Appetite if it gets you more Stamina.", playerData["AllowJuiceAppetite"]) + "<br>";
			text += createRadio("juice3", "MPH", "Use leftover Juice for MPH.", playerData["ExtraJuice"]) + "<br>";
			text += createRadio("juice3", "Stamina", "Use leftover Juice for Stamina.", playerData["ExtraJuice"]) + "<br>";
			break;
		case 8:
			text += "Various:<br><br>";

			if (playerData["LevelAllies"].indexOf("Tsukasa") != -1)
				playerData["AllowDarts"] = "Y";

			text += createCheckbox("various1", "Y", "Allow playing of Jackpot for more 'Ninja On's.", playerData["AllowJackpot"]) + "<br>";
			text += createCheckbox("various2", "Y", "Allow buying of more 'Z-Reward's from 'ZP'.", playerData["AllowZRBuy"]) + "<br>";
			text += createCheckbox("various3", "Y", "Allow playing of Darts for Tsukasa. <font color='red'>Overridden if Tsukasa is required for Level 2 ally.</font>", playerData["AllowDarts"]) + "<br>";
			break;
		case 9:
			text += "Farm Team: <font color='red'>(This is the team to run down stamina before looping)</font><br><br>";

			var allies = new Array("Stalkergirl", "Pinky", "Billy", "Emosuke", "Olmek", "TACOS", "Proof Reader");
// TODO: remove TACOS if not going to play/buy mahjong

			text += "Ally 1: " + createSelect("farm1", allies, playerData["Farm1"]) + "<br>";
			text += "Ally 2: " + createSelect("farm2", allies, playerData["Farm2"]) + "<br>";
			text += "Ally 3: " + createSelect("farm3", allies, playerData["Farm3"]) + "<br>";
			break;
		}

		text += "<div style='position: absolute; bottom: 0; left: 15px;'><hr><input type='submit' id='loopSubmit1' value='< Previous' /> <input type='submit' id='loopSubmit2' value='Continue >' /><hr></div>";
		this.buttons.push(new Array(null, null, "loopSubmit1", floater.doSetupPrev));
		this.buttons.push(new Array(null, null, "loopSubmit2", floater.doSetupNext));

		return text;
	};

	this.doSetupNext = function() {
		try {
			var next = null;

			switch (playerData["Setup"]) {
			case 0:
				next = playerData["Setup"]+1;
				playerData["Hotkey"] = getValue("hotkey");
				break;
			case 1:
				var allies = getCheckboxValues("level2");

				if ((allies == null) || (allies.length != 3)) {
					alert("Please select 3 allies!");
					return;
				}

				next = playerData["Setup"]+1;
				playerData["LevelAllies"] = allies;
				break;
			case 2:
				playerData["SpecialRanking"] = getValue("ranking1");

				if (playerData["SpecialRanking"] == "") {
					alert("Please select 1 way of getting XP.");
					return;
				}

				next = playerData["Setup"]+1;
				break;
			case 3:
				var allies = getCheckboxValues("jonin");

				if ((allies == null) || (allies.length != 2)) {
					alert("Please select 2 allies!");
					return;
				}

				next = playerData["Setup"]+1;
				playerData["JoninAllies"] = allies;
				break;
			case 4:
				next = playerData["Setup"]+1;
				playerData["SmokeMissions"] = getValue("smoke1");
				playerData["SmokeLimitStop"] = getValue("smoke2");
				break;
			case 5:
				next = playerData["Setup"]+1;
				playerData["AllowNinjaOn"] = getValue("appetite1");
				playerData["AllowTacos"] = getValue("appetite2");
				playerData["AllowGP"] = getValue("appetite3");
				playerData["AllowSP"] = getValue("appetite4");
				break;
			case 6:
				var kaiju3 = getValue("kaiju3");

				if (parseInt(kaiju3) + "" != kaiju3) {
					alert("Please enter a valid numeric number for 'Number of attacks'");
					return;
				}

				next = playerData["Setup"]+1;
				playerData["WaitKaiju"] = getValue("kaiju1");
				playerData["AllowTsukiballs"] = getValue("kaiju2");
				playerData["AttackKaiju"] = parseInt(kaiju3);
				break;
			case 7:
				next = playerData["Setup"]+1;
				playerData["AllowJuice"] = getValue("juice1");
				playerData["AllowJuiceAppetite"] = getValue("juice2");
				playerData["ExtraJuice"] = getValue("juice3");
				break;
			case 8:
				next = playerData["Setup"]+1;
				playerData["AllowJackpot"] = getValue("various1");
				playerData["AllowZRBuy"] = getValue("various2");
				playerData["AllowDarts"] = getValue("various3");

				if (playerData["LevelAllies"].indexOf("Tsukasa") != -1)
					playerData["AllowDarts"] = "Y";
				break;
			case 9:
				var t1 = getValue("farm1");
				var t2 = getValue("farm2");
				var t3 = getValue("farm3");

				if ((t1 == t2) || (t1 == t3) || (t2 == t3)) {
					alert("You can't use the same ally more than once in a team.");
					return;
				}

				next = "Done";
				playerAction = null;
				playerData["Farm1"] = t1;
				playerData["Farm2"] = t2;
				playerData["Farm3"] = t3;
				break;
			}

			if (next != null) {
				playerData["Setup"] = next;

				if (next == "Done") {
					applyGM();
				} else {
					saveGM();

					floater.draw();
				}
			}
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}
	};

	this.doSetupPrev = function() {
		try {
			var next = null;

			if (playerData["Setup"] != 0) {
				next = playerData["Setup"] - 1;
			}

			if (next != null) {
				playerData["Setup"] = next;

				saveGM();

				floater.draw();
			}
		}
		catch(e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
		}
	};

	this.print = function(header, value) {
		return "<b>" + header + "</b>: " + (value != null ? value : "<i>Unknown</i>");
	};

	this.showErr = function(err) {
		this.window.element.innerHTML = err.message;
	};
}

////////////////////////////// HTML Creation

function createCheckbox(name, value, display, values) {
	return "<input type='checkbox' name='" + name + "' value='" + value + "'" + (values == null ? "" : (values.indexOf(value) == -1 ? "" : " checked")) + " /> " + display + " ";
}

function createRadio(name, value, display, values) {
	return "<input type='radio' name='" + name + "' value='" + value + "'" + (values == null ? "" : (values.indexOf(value) == -1 ? "" : " checked")) + " /> " + display + " ";
}

function createSelect(name, values, value) {
	var rtrn = "<select name='" + name + "'>";

	for (var i = 0; i < values.length; i++) {
		rtrn += "<option value='" + values[i] + "'" + (values[i] == value ? " selected='selected'" : "") + ">" + values[i] + "</option>";
	}

	rtrn += "</select>";

	return rtrn;
}

function createEditbox(name, value) {
	return "<input type='text' name='" + name + "' value='" + (value == null ? "" : value) + "' />";
}

function getValue(name) {
	var items = document.getElementsByName(name);

	if (items.length > 0) {
		var type = items[0].type.toLowerCase();

		if (type == "checkbox")
			return (items[0].checked ? items[0].value : "");
		else if (type == "radio") {
			for (var i = 0; i < items.length; i++) {
				if (items[i].checked)
					return items[i].value;

			}
		} else {
			return items[0].value;
		}
	}

	return "";
}

function getCheckboxValues(name) {
	var items = document.getElementsByName(name);
	var rtrn = new Array();

	for (var i = 0; i < items.length; i++) {
		if (items[i].checked)
			rtrn.push(items[i].value);
	}

	return rtrn;
}

////////////////////////////// Prototypes

String.prototype.startsWith	= function(str) { return (this.match("^"+str) == str); };
String.prototype.endsWith	= function(str) { return (this.match(str+"$") != null); };
String.prototype.trim		= function() { return this.replace(/^\s+|\s+$/g,""); };
String.prototype.replaceAll	= function(str, str2) { return (this.replace(new RegExp(str, "g"), str2)); };

Object.prototype.clone = function() {
	var newObj = (this instanceof Array) ? [] : {};

	for (i in this) {
		if (i == 'clone') continue;
		if (this[i] && typeof this[i] == "object") {
			newObj[i] = this[i].clone();
		} else {
			newObj[i] = this[i];
		}
	}

	return newObj;
};

document.getElementByName = function(str) {
	var rtrn = document.getElementsByName(str);
	if ((rtrn == null) || (rtrn.length == 0)) return null;
	return rtrn[0];
};

function setCheckedValue(radioName, value) {
	var radio = document.getElementsByName(radioName);

	for (var i = 0; i < radio.length; i++) {
		if (radio[i].value == value.toString()) {
			radio[i].checked = true;
		} else {
			radio[i].checked = false;
		}
	}
}


function formatNumber(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}

	return x1 + x2;
}


function classOf(o) {
	if (undefined === o) return "Undefined";
	if (null === o) return "Null";
	return {}.toString.call(o).slice(8, -1);
}

function isArray(o) {
	return ("Array" == classOf(o));
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function Window(id, storage)
{
	var my = this;
	my.id = id;
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;

	// Window dragging events
	my.drag = function(event) {
		if (my.moving) {
			my.element.style.left = (event.clientX - my.offsetX)+'px';
			my.element.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	};
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.element.style.left);
			var y = parseInt(my.element.style.top);
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.element.style.opacity = 1;
			window.removeEventListener('mouseup', my.stopDrag, true);
			window.removeEventListener('mousemove', my.drag, true);
		}
	};
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.element.style.left);
		my.offsetY = event.clientY - parseInt(my.element.style.top);

		if (my.offsetY > 27)
			return;

		my.moving = true;
		my.element.style.opacity = 0.75;
		event.preventDefault();
		window.addEventListener('mouseup', my.stopDrag, true);
		window.addEventListener('mousemove', my.drag, true);
	};

	my.show = function()
	{
		this.element.style.visibility = 'visible';
	};

	my.hide = function()
	{
		this.element.style.visibility = 'hidden';
	};

	my.reset = function()
	{
		storage.setItem(my.id + ".coord.x", 6);
		storage.setItem(my.id + ".coord.y", 6);

		my.element.style.left = "6px";
		my.element.style.top = "6px";
	};


	my.element = document.createElement("div");
	my.element.id = id;
	document.body.appendChild(my.element);
	my.element.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.element.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.element.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.element.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.element.style.top = "6px";
}
// End UI Window implementation

function DOMStorage(type, namespace) {
	var my = this;

	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}

	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
			return def;
		}
	};
	// Kludge, avoid Firefox crash
	my.removeItem = function(key) {
		try {
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
			GM_log(e);
		}
	};
	// Return array of all keys in this namespace
	my.keys = function() {
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0 && my.storage.getItem(key))
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
				break;
			}
			i++;
		} while (true);
		return arr;
	};
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
