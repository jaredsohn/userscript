// ==UserScript==
// @name           BvS Kaiju Drop tracker
// @namespace      BvS-Conster
// @description    BvS Kaiju Drop tracker 0.7.3: Tells you what a kaiju drops and if you have the drop already
// @include        http://*animecubed.com/billy/bvs/villagemonsterfight.html
// @include        http://*animecubed.com/billy/bvs/village.html
// @include        http://*animecubed.com/billy/bvs/pages/main.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        0.7.3
// @history        0.7.3 (08/02/2011) Fixed bug, Added Makenshi and Dorcas.
// @history        0.7.2 (07/08/2011) Added Fayt, Jadian, Jasticus, Zenovia.
// @history        0.7.1 (03/04/2011) Fixed FrostMist and Div-R-EON spelling issue.
// @history        0.7.0 (02/08/2011) Changed script for new summon message wording and added other missing kaijus.
// @history        0.6.3 (06/19/2010) Added Shanks and Ham.
// @history        0.6.2 (05/21/2010) Fixed 'Persocomps' name and added Robert the Sage.
// @history        0.6.1 (04/23/2010) Fixed 'Persocoms' drop name.
// @history        0.6.0 (04/22/2010) Added support to find current kaiju on the village page, new feature to alert you when you don't have a kaiju drop, and fixed some recent kaiju name changes.
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////
/////////		Options
/////////			Customizable
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

var alertMeOnDropIDontHave = true;		//true or false	

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////
/////////		MAIN PROGRAM		DON'T TOUCH!!!!
/////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const VERSION = "0.7.3";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSKaijuDropTracker", "http://rveach.romhack.org/BvS/bvs_kaiju_drop_tracker.user.js", VERSION);
} catch(e) {};

var drops = new Array();
var items = new Array();

function createDrops() {
	drops["AgentBrand"]             = "Catgirl Entourage";
	drops["Alchemists"]             = "Red Water";
	drops["Amalga"]                 = "Amalga Eye";
	drops["Astaroth"]               = "Broforce";
	drops["AzoJason"]               = "Merchant Sigil";
	drops["Bishounen"]              = "Perfect Hair";
	drops["Cardcatchers"]           = "Claw Card";
	drops["Celeste"]                = "Poisoned Daggers";
	drops["Console Elitists"]       = "Money Printer";
	drops["Crazed Mimiga"]          = "Polar Star";
	drops["Dakralai"]               = "Hacksaw";
	drops["Dave"]                   = "Driving Music";
	drops["Demon of the Sand"]      = "Spirit of the Demon of the Sand";
	drops["Div-R-EON"]              = "B-Class Laser";
	drops["Dorcas"]                 = "Kitty Ears";
	drops["Drazhar"]                = "Firebrand";
	drops["Drift Racers"]           = "Late-Night Snack";
	drops["Evanjellyons"]           = "Plug Suit";
	drops["EvilTaxi"]               = "Tire Tracks";
	drops["Evil Taxi"]              = "Tire Tracks";
	drops["Fanboys"]                = "Book of Spoilers";
	drops["Fayt"]                   = "Noble Phantasm";
	drops["Forum Trolls"]           = "Troll Account";
	drops["FrostMist"]              = "Cold Hard Cash";
	drops["Giant Cockroach"]        = "Carapace Armor";
	drops["Go Players"]             = "Go Piece";
	drops["Ham"]                    = "Something Good";
	drops["Hungry"]                 = "Big Mouth";
	drops["Jadian"]                 = "Ultra Dessert";
	drops["Jasticus"]               = "Beta Reader";
	drops["J-Rock Bands"]           = "Groupies";
	drops["Jkeezer"]                = "Helix Tattoo";
	drops["Kukaichi"]               = "Jutsu Barrage";
	drops["Mad Scientists"]         = "Lab Coat";
	drops["MageOhki"]               = "Pink Skull";
	drops["Magical Girls"]          = "Magical Wand";
	drops["Makenshi"]               = "Flask of Mist";
	drops["McSmashy"]               = "Huggly Teddybear";
	drops["Millennium"]             = "Dramatic Monologue";
	drops["Nine-Tailed Fox"]        = "Spirit of the Nine-Tailed Fox";
	drops["Nine Thousands"]         = "Power Over 9000";
	drops["Ninja Bears"]            = "Bear Coat";
	drops["Persocomps"]             = "Persocomp";
	drops["Pokermans"]              = "Pokerballs";
	drops["Pro Wrestlers"]          = "Shiny Belt";
	drops["Psycho Hikers"]          = "Granola Camouflage";
	drops["Robert the Sage"]        = "Senjutsu Reserves";
	drops["Robot Monkeys"]          = "Monkey Cymbals";
	drops["Shanks"]                 = "Lightning Draw";
	drops["Shin Goji"]              = "Rocket Punch";
	drops["Storm Riders"]           = "Regalia";
	drops["Super Robots"]           = "Soul of Steel";
	drops["Vampires"]               = "Vampire Cloak";
	drops["Velidra"]                = "Control Rod";
	drops["Vysaga"]                 = "Student ID";
	drops["Xochitl"]                = "Thunderclaw Ring";
	drops["Zenovia"]                = "Frozen Rose";
	drops["Zodiac Girlyboys"]       = "Fruits Basket";

	drops["Arms Dealers"]           = "Surplus Ordnance";
	drops["Bartenders"]             = "Crystal Tumblers";
	drops["Bootleggers"]            = "Makeshift Booth";
	drops["Celebrity Chefs"]        = "Quality Cookware";
	drops["Drama Llama"]            = "Flaming Spit Technique";
	drops["Game Show Hosts"]        = "Parting Gifts";
	drops["Ghosts in the Machine"]  = "Time Reversal Cube";
	drops["Metal Idol"]             = "Sad Robot";
	drops["Model Builders"]         = "Remote Scout";
	drops["Personal Trainers"]      = "Training Montage";
	drops["Psycho Zombja Girl"]     = "Zombja Survival Guide";
	drops["Sexy Lady Cops"]        = "'Goodbye Kitten' Pink Taser";
	drops["Street Mimes"]           = "Avant-Guards";
	drops["The Spanish Imposition"] = "Pokey Stick";
}

var playerName = null;
var pageURL = document.location.href;
var itemPage = false;
var kaijuName = null;
var kaijuNameElement = null;
var kaijuDate = null;
var drop = null;

function getKaiju() {
	if (pageURL.indexOf("villagemonsterfight.html") != -1) {
		kaijuNameElement = document.evaluate("//font[@style='font-size: 20px;']/b", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

		if (kaijuNameElement != null) {
			kaijuName = kaijuNameElement.innerHTML;
			kaijuDate = GM_getValue(playerName + "_kaijudate", "");

			if (kaijuDate == "")
				kaijuDate = ".*";

			return true;
		}
	} else if (pageURL.indexOf("village.html") != -1) {
		kaijuNameElement = document.forms.namedItem("kat");

		if (kaijuNameElement != null) {	//kaiju in village currently
			kaijuNameElement = kaijuNameElement;

			var snap = document.evaluate("//li[starts-with(@class, 'alt')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var temp;
			var match;

			for (var i = 0; temp = snap.snapshotItem(i); i++) {
				if (match = temp.textContent.match(/(.*) Attack! (\d+\/\d+) \(\w+ \- \d+:\d+\): .* has summoned (.*) to your village! Your entire village has \d+ days? to defeat it \(.* HP\) for a great bonus, or else disaster will befall you!/)) {
					//summoned kaiju
					break;
				} else if (match = temp.textContent.match(/(.*) Attack! (\d+\/\d+) \(\w+ \- \d+:\d+\): (.*) wandered into your village! Your entire village has \d+ days? to defeat it \(.* HP\) for a great bonus, or else disaster will befall you!/)) {
					//wandering kaiju
					break;
				}
			}

			if (temp) {
				kaijuName = match[1].trim();
				kaijuDate = match[2].trim();

				GM_setValue(playerName + "_kaijudate", kaijuDate);

				return true;
			}
		}
	} else {
		itemPage = true;

		GM_setValue(playerName + "_kaijudate", "");
	}

	return false;
}

function getKaijuDrop() {
	if (kaijuName != null) {
		drop = drops[kaijuName];
	}
	if (drop == null) {
		drop = "Kaiju Memento";
	}
}

function getUserItems() {
	var div = document.getElementById("pitem");

	if (div) {
		var list = div.textContent.split("\n");
		var temp;

		for (var i = 0; i < list.length; i++) {
			temp = list[i];
			if ((temp == null) || (temp.length == 0))
				continue;

			temp = temp.split(":")[0].trim();

			items.push(temp);
		}

		return true;
	}

	return false;
}

window.addEventListener("load", load, false);

function load(e) {
	try {
		var temp = document.getElementsByName("player");
		if ((temp != null) && (temp.length > 0))
			playerName = temp[0].value;
		else
			return;

		if (getKaiju()) {
			createDrops();
			getKaijuDrop();

			var temp = GM_getValue(playerName + "_items", "");

			if ((temp != null) && (temp != ""))
				items = temp.split(",");

			var size;
			var extraText;
			var extraText2;
			var color;

			if (pageURL.indexOf("villagemonsterfight.html") != -1) {
				extraText = " (" + kaijuDate + ")";
				extraText2 = "";
				size = "+0";
				color = "black";
			} else if (pageURL.indexOf("village.html") != -1) {
				extraText = "";
				extraText2 = kaijuName + " (" + kaijuDate + ")";
				size = "-1";
				color = "white";
			}

			var text =
				extraText + "<font size='" + size + "'>" + extraText2 + "<br/>Drops: "
				+ "<a href=\"http://bvs.wikidot.com/items:" + drop + "\" target=\"_blank\" style='color: " + color + "'>"
				+ drop + "</a><br/>";

			if (items.length == 0) {
				//never saved items to tell

				text += "<font color='red'>Don't have your items logged yet!<br/>Go to the expanded main page!</font>";
			} else if (items.indexOf(drop) == -1) {
				//don't have drop

				text += "<font color='red'>You don't have this drop!</font>";

				if (alertMeOnDropIDontHave) {
					var save = "|" + kaijuName + "|" + kaijuDate + "|";
					temp = GM_getValue(playerName + "_alert", "");

					if ((temp == null) || (temp.length == 0) || (!temp.match(save))) {
						if (kaijuDate == ".*")
							kaijuDate = "???";

						alert("BvS Kaiju Drop Tracker Alert!\n\nThe kaiju '" + kaijuName + "' is in the village currently and you don't have its drop '" + drop.replace(/'/g,"") + "'!");

						GM_setValue(playerName + "_alert", save);
					}
				}
			} else {
				//have drop

				text += "<font color='green'>You have this drop already!</font>";				
			}

			text += "</font>";

			kaijuNameElement.innerHTML += text;
		} else if (itemPage) {
			//save all items listed

			if (getUserItems()) {
				GM_setValue(playerName + "_items", items.join(","));
			}			
		}
	}
	catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}