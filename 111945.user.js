// ==UserScript==
// @name           Mission LazyEye Script
// @namespace      Conster
// @description    Tells you if the current mission has an ally, event, or item drop
// @version        1.03
// @include        http://*animecubed.com/billy/bvs/themesdifficulty.html
// @include        http://*animecubed.com/billy/bvs/missions/mission1.html
// @include        http://*animecubed.com/billy/bvs/itemorder.html
// @include        http://*animecubed.com/billy/bvs/villagefields.html
// @include        http://*animecubed.com/billy/bvs/team.html
// @include        http://*animecubed.com/billy/bvs/pages/main.html
// @include        http://*animecubed.com/billy/bvs/drifter.html
// @history        1.03 Proctor a Chunin Exam fixed, script now accounts for Flipper autograph
// @history        1.025b Blindfighting, Deliver a Scout's Message, Escort a Bridge Builder fixed
// @history        1.025a Jungle Nin RNG missions fixed
// @history        1.025 Get Yourself a Harem, Rock Head fixed
// @history        1.02  Forgot to add in the code for advanced lookup - fixed now
// @history        1.015 Companion Cube, Seasons Don't Fear fixed
// @history        1.01  Solved the "does the mission end in an exclamation mark?" issue
// @history        1.00  Start
// ==/UserScript==
//DONE: basic missions
//DONE: advanced missions
//DONE: themes check
//DONE: themes mission-check
//DONE: Items check
//DONE: 1-only items mission-check
//DONE: Quest-related items mission-check
//DONE: keys check
//DONE: keys mission-check
//DONE: Allies check
//DONE: Allies mission-check
//DONE: register "You got blahblah"
//POSSIBLE TODO: give info on ally levelup missions
//POSSIBLE TODO: RedEye jutsu info
var offsethours = 7;		//your timezone difference with Billy - hours
var offsetminutes = 0;		//your timezone difference with Billy - minutes
//example 1: 17:20 to you is 10:20 in Billy - houroffset = 7; minutesoffset = 0;
//example 2: 5:50 to you is 10:20 in Billy - houroffset = -5; minutesoffset = 30; OR houroffset = -4; minutesoffset = -30;
var dayrollhours = 5;		//normally 5, for 5:15 AM, but might be 4:15 AM or 6:15 AM - if so, adjust by -1 or +1
var dayrollminutes = 15;	//normally 15, for 5:15 AM
var stuffs = [];	var themes = [];	var advanced = [];
var driftstyle = "-";	var playername = "";	
var keydata = "";	var themedata = "";	var itemdata = "";	var allydata = "";
var keysarray = [];	var themesarray = [];	var itemsarray = [];	var alliesarray = [];
var workingURL = location.href;
loadPlayerName();
if (workingURL.indexOf("themesdifficulty.html") != -1) {
	checkThemes();
} else if (workingURL.indexOf("itemorder.html") != -1) {
	checkItems();
} else if (workingURL.indexOf("villagefields.html") != -1) {
	checkKeys();
} else if (workingURL.indexOf("team.html") != -1) {
	checkAllies();
} else if (workingURL.indexOf("main.html") != -1) {
	checkDriftStyleMain();
} else if (workingURL.indexOf("drifter.html") != -1) {
	checkDriftStyleDrift();
} else {
	loadStuff();
	getGM();
	checkRewards();
	missionStuff();
}

function missionStuff() {
	//mission name
	var missionEl = document.evaluate("//font/b", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var mainstatT = missionEl.parentNode.parentNode.previousSibling.textContent;
	var missionT = missionEl.textContent.toLowerCase();
	if (missionT.charAt(missionT.length-1) == "!") {
		missionT = missionT.substring(0,missionT.length-1);	//exclamation marks are too annoying to check :|
	}
	//crank level
	var crankEl = document.evaluate("//font", document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
	var crankT = crankEl.textContent;
	var crankI = 0;
	if (crankEl.textContent.indexOf("Crank Level") != -1) {
		crankT = crankEl.textContent;
		crankI = parseInt(crankT.substring(crankT.indexOf(":")+2));
		var flipper = /[\d] free Crank/.exec ( document.body.innerHTML );
		if (flipper != null) {
			var subtract = parseInt(flipper[0].substring(0,1));
			crankI = Math.max(0,crankI - subtract);
		}
	}
	//mission description
	var misdescEl = missionEl.parentNode.nextSibling.nextSibling;
	var misdescT = misdescEl.textContent;
	//mission difficulty and successes
	var misdif = document.evaluate("//div[contains(@class,'misonestat_')]", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var misdifs = [];
	for (var _i = 0; node = misdif.snapshotItem(_i); _i++) {
		var difsucT = node.lastChild.lastChild.lastChild.lastChild.textContent;
		var sucIndex = difsucT.indexOf("Successes");
		var diffI = parseInt(difsucT.substring(11,sucIndex-3));
		var succI = parseInt(difsucT.substring(sucIndex+10));
		var temparr = [];
		temparr[0] = diffI-crankI;	temparr[1] = succI-crankI;
		misdifs[_i] = temparr;
	}
	var basicmis = "";
	basicmis = basicmis + missionT+" - " + mainstatT + " - " + misdifs[0];
	if((missionT.indexOf("monument") != -1) && (misdescT.indexOf("The Pure Awesome") != -1)) {
		//wasteland monument mission
		basicmis = "wasteland monument";
	}
	var spoils = stuffs[basicmis];
	if (spoils != null && spoils != "") {
		if (spoils.indexOf("THEME") != -1) {
			if (themesarray[2].indexOf("oldtheme") == -1) {//switching themes: check date
				var d = calculateDate();
				var curyear = d.getFullYear();		var curmonth = d.getMonth()+1;	var curday = d.getDate();
				var curdate = 1000*curyear+50*curmonth+curday;
				var olddate = 1000*parseInt(themesarray[3])+50*parseInt(themesarray[4])+parseInt(themesarray[5]);
				if (curdate > olddate) {
					themesarray[1] = themesarray[2];
					themesarray[2] = "oldtheme";
					themesarray[3] = curyear;
					themesarray[4] = curmonth;
					themesarray[5] = curday;
					themedata  = themesarray[0]+","+themesarray[1]+","+themesarray[2]+",";
					themedata += themesarray[3]+","+themesarray[4]+","+themesarray[5];
					GM_setValue(playername+"_themes", themedata);
				}
			}
			basicmis = basicmis + " - " + themesarray[1];
			spoils = themes[basicmis];
			if (spoils != null) {
				missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
			} else {
				missionEl.parentNode.parentNode.innerHTML += "-<br>";
			}
		} else if (spoils.indexOf("ADVANCED1111") != -1) {	//we're dealing with Noodle Shop or Hopeless
			spoils = advanced[misdescT];
			if (spoils.indexOf("Hopeless") != -1) {
				if (keysarray[2] == 1) {	spoils = "-";	}
			} else if (spoils.indexOf("Noodle Shop") != -1) {
				if (keysarray[4] == 1) {	spoils = "-";	}
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("ADVANCED") != -1) {	//regular drops
			spoils = advanced[misdescT];
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("Key:") != -1) {
			if (spoils.indexOf("Chosen") != -1) {
				if (keysarray[0] == 1) {	spoils = "-";	}
			} else if (spoils.indexOf("Filthy") != -1) {
				if (keysarray[1] == 1) {	spoils = "-";	}
			} else if (spoils.indexOf("Delicious") != -1) {
				if (keysarray[3] == 1) {	spoils = "-";	}
			} else if (spoils.indexOf("Dance Floor") != -1) {
				if (keysarray[5] == 1) {	spoils = "-";	}
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("Ally:") != -1) {
			var allyname = spoils.substring(6);
			var havethisally = alliesarray[allyToInt(allyname)];
			if (havethisally == 1) {		spoils = "-";	}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("1111:") != -1) {//only 1 obtainable (also Disembodied Head)
			spoils = "Item: "+spoils.substring(5);
			var index = itemToInt(spoils);
			if (index == 2) {//Disembodied Head: check for the ally Chunks as well
				var index2 = allyToInt("Chunks");
				if ((itemsarray[index] == 1) || (alliesarray[index2] == 1)) {
					//already have a Disembodied Head, or already have Chunks
					spoils = "-";
				}
			} else {
				if (itemsarray[index] == 1) {
					//already have this item
					spoils = "-";
				}
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("DDDD:") != -1) {		//only 1 obtainable, requires drift style
			spoils = "Item: "+spoils.substring(5);
			var index = itemToInt(spoils);
			if (index == 19) {				//Mark 86 Turbo, requires Racer's Edge
				if ((itemsarray[index] == 1) || driftstyle.indexOf("Racer's Edge") == -1) {
					//already have this, or wrong drift style
					spoils = "-";
				}
			} else if ((index == 17) || (index == 18)) {	//Drivetrain or Engine, require Shift to Drift
				if ((itemsarray[index] == 1) || driftstyle.indexOf("Shift to Drift") == -1) {
					//already have this, or wrong drift style
					spoils = "-";
				}
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("QQQQ:") != -1) {//need to be on quest, only 1 obtainable (Hollow Jaw checks Hollow Leg)
			spoils = "Item: "+spoils.substring(5);
			var index = itemToInt(spoils);
			if (index == 0) {	//Hollow Jaw
				if (itemsarray[index] == 1) {//already have a Hollow Leg
					spoils = "-";
				}
			} else {		//a Chunk
				var index2 = allyToInt("Chunks");
				if ((itemsarray[index] == 1) || (alliesarray[index2] == 1)) {
					//already have this part, or already have Chunks
					spoils = "-";
				}
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else if (spoils.indexOf("JJJJ:") != -1) {		//Unfinished Compositions
			spoils = "Item: "+spoils.substring(5);
			var index = itemToInt(spoils);//this is 20
			var nextamount = 8*parseInt(themesarray[0])+parseInt(itemsarray[index])+1;
			var curamount = 0;
			if (basicmis.indexOf("first") != -1) {		curamount = 1;
			} else if (basicmis.indexOf("second") != -1) {	curamount = 2;
			} else if (basicmis.indexOf("third") != -1) {	curamount = 3;
			} else if (basicmis.indexOf("fourth") != -1) {	curamount = 4;
			} else if (basicmis.indexOf("fifth") != -1) {	curamount = 5;
			} else if (basicmis.indexOf("sixth") != -1) {	curamount = 6;
			} else if (basicmis.indexOf("seventh") != -1) {	curamount = 7;
			} else if (basicmis.indexOf("eighth") != -1) {	curamount = 8;
			}
			if (curamount != nextamount) {	//not at the appropiate amount of Unfinished Compositions
				spoils = "-";
			}
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		} else {
			missionEl.parentNode.parentNode.innerHTML += spoils+"<br>";
		}
	} else if (spoils != null) { 
		missionEl.parentNode.parentNode.innerHTML += "-<br>";
	} else {
		missionEl.parentNode.parentNode.innerHTML += "huh? <br>";
	}
}		








function loadPlayerName() {
	try {
		var temp = document.getElementsByName("player")[0];
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playername = temp.value;
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function loadStuff() {
	//D Gen
	stuffs["babysit the ninja academy - Genjutsu - 6,2"] = "Ally: Pinky";
	stuffs["catch a fly - Genjutsu - 6,1"] = "Ally: Bugman";
	stuffs["check out a ninja centerfold - Genjutsu - 5,2"] = "Ally: Billy";
	stuffs["clean the ninja dog pen - Genjutsu - 5,1"] = "Ally: Red Rover";
	stuffs["find that smell - Genjutsu - 6,1"] = "Event: +1500 Friend Points";
	stuffs["hiding - Genjutsu - 6,1"] = "Ally: Pinky";
	stuffs["hiding in smoke - Genjutsu - 6,1"] = "Ally: Emosuke";
	stuffs["inscribe scrolls - Genjutsu - 4,2"] = "Ally: Billy";
	stuffs["keep a signal fire going - Genjutsu - 6,1"] = "Event: +1500 XP";
	stuffs["missing pet tora - Genjutsu - 5,1"] = "Ally: Billy";
	stuffs["ninja academy demonstration - Genjutsu - 4,2"] = "Ally: Lil' Ro";
	stuffs["practice spying - Genjutsu - 6,2"] = "Ally: Emosuke";
	stuffs["shake off a genjutsu - Genjutsu - 8,2"] = "-";
	stuffs["sneak out of detention - Genjutsu - 4,2"] = "Ally: Billy";
	stuffs["the ninja-mas spirit - Genjutsu - 4,2"] = "Item: Ninja-Mas Star";//PERM!
	//D Nin
	stuffs["blindfighting - Ninjutsu - 5,2"] = "Ally: Bruce Jr.";
	stuffs["deliver a scout's message - Ninjutsu - 6,1"] = "Ally: Pinky";
	stuffs["eat your fill - Ninjutsu - 4,3"] = "-";
	stuffs["escort a bridge builder - Ninjutsu - 7,2"] = "-";
	stuffs["feed the scouts - Ninjutsu - 7,1"] = "Ally: Pinky";
	stuffs["feel the flow - Ninjutsu - 6,1"] = "Ally: Pinky";
	stuffs["fix branches - Ninjutsu - 7,1"] = "Ally: Emosuke";
	stuffs["give a jonin medical attention - Ninjutsu - 8,1"] = "QQQQ: Body Chunk (only if on \"Chunks\"!)";
	stuffs["haul garbage - Ninjutsu - 7,1"] = "Item: Shogi Piece";
	stuffs["mark explosive tags - Ninjutsu - 5,2"] = "Event: +10 Stamina";
	stuffs["ninja leaping practice - Ninjutsu - 5,2"] = "Ally: Emosuke";
	stuffs["practice hand symbols - Ninjutsu - 4,3"] = "Ally: Emosuke";
	stuffs["report a spy - Ninjutsu - 9,1"] = "-";
	stuffs["report a village breach - Ninjutsu - 7,2"] = "Ally: Billy";
	stuffs["transport ingredients - Ninjutsu - 5,2"] = "Item: Exploding Tags";
	stuffs["tree climbing training - Ninjutsu - 7,1"] = "Event: +1500 Jutsu XP";
	stuffs["the hoclaus - Ninjutsu - 4,2"] = "Item: Ninja-Mas Ornament";//PERM
	//D Tai
	stuffs["catching kunai - Taijutsu - 8,1"] = "Item: Kunai";
	stuffs["clean the pool - Taijutsu - 8,1"] = "-";
	stuffs["eat your ninja ration - Taijutsu - 5,2"] = "Ally: Lil' Bo";
	stuffs["feed the summons - Taijutsu - 6,1"] = "Ally: Lil' Whitey";
	stuffs["find medicinal herbs - Taijutsu - 7,1"] = "Item: Medicinal Herbs";
	stuffs["fire - Taijutsu - 8,2"] = "-";
	stuffs["help fix the village wall - Taijutsu - 5,2"] = "Event: +10 Stamina";
	stuffs["learn insignia - Taijutsu - 3,4"] = "Ally: Emosuke";
	stuffs["long range kunai practice - Taijutsu - 7,1"] = "Event: +10 Stamina";
	stuffs["mudslide rescue - Taijutsu - 7,2"] = "-";
	stuffs["prune treetops - Taijutsu - 4,2"] = "-";
	stuffs["save an academy student - Taijutsu - 8,2"] = "Ally: Pinky";
	stuffs["sew uniforms - Taijutsu - 6,1"] = "Ally: Billy";
	stuffs["sharpen kunai - Taijutsu - 5,2"] = "Event: +100 Chakra";
	//D Rare
	stuffs["help out a soul reaper - Genjutsu - 6,3"] = "Item: Swallowtail Butterfly";//PERM
	stuffs["save the soul reaper - Taijutsu - 7,2"] = "Item: Heck Butterfly";//PERM
	//C Gen
	stuffs["angry villagers - Genjutsu - 8,4"] = "Ally: Trapchan";
	stuffs["assassin defense - Genjutsu - 8,5"] = "-";
	stuffs["clear an area of deadly insects - Genjutsu - 8,4"] = "-";
	stuffs["clear out the forest of death - Genjutsu - 7,5"] = "Ally: K.Y.";
	stuffs["defend an outpost - Genjutsu - 5,6"] = "Event: +100 Chakra";
	stuffs["drug a diplomat - Genjutsu - 5,7"] = "Event: +100 Chakra";
	stuffs["finish a delivery - Genjutsu - 8,3"] = "-";
	stuffs["hunt down a monster - Genjutsu - 8,5"] = "Event: +1500 Friend Points";
	stuffs["interrupt a meeting - Genjutsu - 8,3"] = "-";
	stuffs["leap a gorge - Genjutsu - 8,3"] = "-";
	stuffs["locate a spy - Genjutsu - 5,6"] = "Event: Minor Village Contract";
	stuffs["overthrow a captain - Genjutsu - 5,6"] = "-";
	stuffs["sabotage a scientist - Genjutsu - 8,3"] = "Event: Minor Village Contract";
	stuffs["strike down a sentry - Genjutsu - 8,3"] = "-";
	stuffs["subdue attack dogs - Genjutsu - 8,3"] = "Item: Dog Treats";
	//C Nin
	stuffs["bring relief to a village - Ninjutsu - 5,5"] = "-"; //no longer Eyedrops?
	stuffs["explore the north - Ninjutsu - 5,6"] = "-";
	stuffs["flatter an ambassador - Ninjutsu - 7,3"] = "-";
	stuffs["hide from a search party - Ninjutsu - 9,3"] = "Ally: Master P";
	stuffs["light a fire - Ninjutsu - 5,6"] = "-";
	stuffs["repel an attack - Ninjutsu - 8,5"] = "-";
	stuffs["traverse the great desert - Ninjutsu - 7,4"] = "Ally: Mr. Sandman";
	stuffs["wrestle a bear - Ninjutsu - 5,6"] = "Event: +4000 XP";
	//C Tai
	stuffs["challenge a dojo master - Taijutsu - 6,6"] = "Ally: Bruce Sr.";
	stuffs["distract a guard - Taijutsu - 7,6"] = "Event: +10 Stamina";
	stuffs["fix a water supply - Taijutsu - 8,3"] = "-";
	stuffs["flatter a party - Taijutsu - 9,3"] = "-";
	stuffs["impersonate a diplomat - Taijutsu - 7,4"] = "-";
	stuffs["impersonate a star - Taijutsu - 10,3"] = "-";
	stuffs["pick up after a reaper - Taijutsu - 7,3"] = "Item: Soul Glove";//PERM
	stuffs["ride your ninja kite - Taijutsu - 5,6"] = "Ally: Terri";
	stuffs["sabotage armor - Taijutsu - 9,4"] = "Event: +1500 Friend Points";
	stuffs["undermine a wall - Taijutsu - 7,4"] = "-";
	stuffs["weaken a guardpost - Taijutsu - 9,3"] = "Event: +1500 XP";
	stuffs["withstand a poisoning - Taijutsu - 9,3"] = "-";	//no longer Antibiotics?
	//C Rare
	stuffs["create an image for the village monument - Ninjutsu - 7,5"] = "Ally: Triple H";
	stuffs["write a ninja essay - Genjutsu - 7,5"] = "Item: Note Page";
	//B Gen
	stuffs["be on iron chef - Genjutsu - 11,7"] = "-";
	stuffs["create a magic onion pancake - Genjutsu - 11,7"] = "-";
	stuffs["defeat an evil pirate - Genjutsu - 12,8"] = "-";
	stuffs["determine panty type - Genjutsu - 12,9"] = "-";
	stuffs["discover a cure - Genjutsu - 11,7"] = "Ally: Sicko";
	stuffs["map a secret base - Genjutsu - 9,9"] = "-";
	stuffs["placate a hungry panda - Genjutsu - 11,6"] = "Ally: Pandabear";
	stuffs["proctor a chunin exam - Genjutsu - 11,9"] = "Ally: Annie";
	stuffs["pull a jonin up from a cliff - Genjutsu - 11,7"] = "-";
	stuffs["sneak through air ducts - Genjutsu - 11,7"] = "-";
	stuffs["test food for poison - Genjutsu - 12,9"] = "-";
	stuffs["uncover a ninja haunting - Genjutsu - 11,8"] = "Event: Minor Village Contract";
	stuffs["win a dark tournament - Genjutsu - 12,9"] = "-";
	//B Nin
	stuffs["catch a ninja fish - Ninjutsu - 10,9"] = "-";
	stuffs["chase down timmy - Ninjutsu - 10,8"] = "Ally: Mr. Smith";
	stuffs["complete the night class - Ninjutsu - 11,9"] = "-";
	stuffs["cut through a platoon - Ninjutsu - 11,8"] = "Ally: Smokey the Bear";
	stuffs["defend the whiteeye princess - Ninjutsu - 12,6"] = "-";
	stuffs["order coffee - Ninjutsu - 12,7"] = "-";
	stuffs["perform secret acupuncture - Ninjutsu - 10,9"] = "-";
	stuffs["pretend to be a rock - Ninjutsu - 11,8"] = "-";
	stuffs["protect a young king - Ninjutsu - 12,7"] = "-";
	stuffs["row a gondola - Ninjutsu - 12,8"] = "Event: +20 Stamina";
	stuffs["teach a class - Ninjutsu - 12,12"] = "-";
	//B Tai
	stuffs["backflip over a thankgiving dinner - Taijutsu - 9,8"] = "-";
	stuffs["confess their emo love - Taijutsu - 11,9"] = "-";
	stuffs["convince a fanboy to bathe - Taijutsu - 11,8"] = "Event: +4000 XP";
	stuffs["count pokermans - Taijutsu - 11,9"] = "-";
	stuffs["disrupt an orchestra - Taijutsu - 11,8"] = "-";
	stuffs["fight a cardboard robot - Taijutsu - 12,8"] = "THEME";
	themes["fight a cardboard robot - Taijutsu - 12,8 - WhiteEye"] = "Item: Manji Headlights";
	stuffs["hunt a doppleganger demon - Taijutsu - 12,6"] = "-";
	stuffs["impress a ninja lord - Taijutsu - 11,6"] = "-";
	stuffs["interrogate an enemy ninja - Taijutsu - 10,6"] = "Ally: The Scar";
	stuffs["read a horrible manga - Taijutsu - 10,7"] = "Event: Minor Village Contract";
	stuffs["rock out on stage - Taijutsu - 9,7"] = "Item: Emo Rock CDs";
	stuffs["reunite souls - Taijutsu - 12,5"] = "-";
	stuffs["sneak up on a pirate - Taijutsu - 11,7"] = "THEME";
	themes["sneak up on a pirate - Taijutsu - 11,7 - Legacy"] = "Item: Drunken Pirate Flag";
	stuffs["split a fortress wall - Taijutsu - 10,8"] = "-";
	stuffs["star in a shoujo manga - Taijutsu - 11,7"] = "Event: Minor Village Contract";
	stuffs["tame a scout wolf - Taijutsu - 9,9"] = "Ally: Rover's Mom";
	stuffs["take out a diplomat - Taijutsu - 11,7"] = "Event: Minor Village Contract";
	//B Rare
	stuffs["clean up a shexy pahty - Genjutsu - 12,6"] = "Ally: Yuri";
	stuffs["have a shexy pahty - Taijutsu - 12,6"] = "Ally: J-Diddy";
	//A Gen
	stuffs["assemble a silver monkey - Genjutsu - 15,9"] = "-";
	stuffs["capture a control point - Genjutsu - 15,12"] = "-";
	stuffs["catch a legendary spy - Genjutsu - 14,7"] = "-";
	stuffs["defend a movie star - Genjutsu - 13,10"] = "Event: +500 Chakra";
	stuffs["deflect a deadly hail - Genjutsu - 14,7"] = "-";
	stuffs["fight off a demon raid - Genjutsu - 10,20"] = "-";
	stuffs["find magic feathers - Genjutsu - 17,12"] = "-";
	stuffs["hide in a shadow - Genjutsu - 14,8"] = "Ally: Big Shammy";
	stuffs["master an ancient form - Genjutsu - 16,14"] = "THEME";
	themes["master an ancient form - Genjutsu - 16,14 - RedEye"] = "Item: Red And Black Shakes";
	stuffs["protect the ancient tree - Genjutsu - 18,8"] = "Event: Major Village Contract";
	stuffs["stop a fire with your mind - Genjutsu - 14,16"] = "Event: Major Village Contract";
	stuffs["take off every zig - Genjutsu - 17,9"] = "Event: Minor Village Contract";
	stuffs["test the special jonin - Genjutsu - 13,11"] = "-";
	stuffs["win a reality show - Genjutsu - 10,7"] = "Event: +4000 XP";
	//A Nin
	stuffs["block a crumbling dam - Ninjutsu - 13,8"] = "-";
	stuffs["break the fourth wall - Ninjutsu - 16,9"] = "Event: Major Village Contract";
	stuffs["catch a bullet - Ninjutsu - 7,16"] = "-";
	stuffs["cross the moat - Ninjutsu - 15,9"] = "Event: Minor Village Contract";
	stuffs["cut lightning - Ninjutsu - 13,15"] = "-";
	stuffs["destroy an evil fortress - Ninjutsu - 14,8"] = "Ally: Z-Dog";
	stuffs["diagnose a patient - Ninjutsu - 17,9"] = "-";
	stuffs["eat your way out of an avalanche - Ninjutsu - 14,14"] = "Event: Major Village Contract";
	stuffs["fend off vampires - Ninjutsu - 17,9"] = "-";
	stuffs["impersonate a village leader - Ninjutsu - 13,8"] = "Event: +4000 Friend Points";
	stuffs["impersonate a work of art - Ninjutsu - 18,15"] = "-";
	stuffs["overthrow a nation - Ninjutsu - 8,14"] = "-";
	stuffs["reboot - Ninjutsu - 16,11"] = "-";
	stuffs["release a five-pronged seal - Ninjutsu - 14,8"] = "-";
	stuffs["rescue a princess - Ninjutsu - 13,9"] = "QQQQ: Right Leg Chunk (only if on \"Chunks\"!)";
	stuffs["retrieve your favorite show - Ninjutsu - 8,12"] = "Event: +4000 XP";
	stuffs["seasons don't fear the reaper - Ninjutsu - 15,10"] = "-";
	stuffs["talk a guard into defecting - Ninjutsu - 15,7"] = "Ally: Big Ro";
	stuffs["undermine a tower - Ninjutsu - 18,9"] = "-";
	//A Tai
	stuffs["beat up a whale - Taijutsu - 14,11"] = "1111: Goo Stabilization Recipe";//ONLY ONE
	stuffs["become the king of fighters - Taijutsu - 16,12"] = "Event: Minor Village Contract";
	stuffs["calm a crazy housecat - Taijutsu - 14,9"] = "QQQQ: Left Leg Chunk (only if on \"Chunks\"!)";
	stuffs["crush a forest of evil - Taijutsu - 14,9"] = "Ally: Big Bo";
	stuffs["cure a parasite - Taijutsu - 13,9"] = "Event: Major Village Contract";
	stuffs["d-d-d-d-d-duel - Taijutsu - 16,11"] = "-";
	stuffs["defeat the army of darkness - Taijutsu - 17,12"] = "-";
	stuffs["exorcise a haunted graveyard - Taijutsu - 13,15"] = "-";
	stuffs["fight a giant briefcase - Taijutsu - 16,12"] = "Event: +2000 Ryo";
	stuffs["fight off a strike force - Taijutsu - 13,8"] = "-";
	stuffs["finish a theme song - Taijutsu - 17,13"] = "-";
	stuffs["fly a giant robot - Taijutsu - 17,10"] = "-";
	stuffs["get past temple guards - Taijutsu - 16,9"] = "-";
	stuffs["get the cake - Taijutsu - 16,13"] = "-";
	stuffs["help the heroes of justice - Taijutsu - 15,13"] = "-";
	stuffs["protect your companion cube - Taijutsu - 17,12"] = "-";
	stuffs["read an ancient text - Taijutsu - 14,17"] = "Event: Major Village Contract";
	stuffs["seal a vampire - Taijutsu - 13,9"] = "Event: +20 Stamina";
	stuffs["smuggle rebels through a war - Taijutsu - 14,9"] = "-";
	stuffs["stop an assassination - Taijutsu - 14,7"] = "-";
	stuffs["switch golden idols - Taijutsu - 18,11"] = "-";
	stuffs["write mission text - Taijutsu - 17,10"] = "-";
	//A Rare
	stuffs["withstand the eyepatch of the soul - Taijutsu - 20,15"] = "-";
	//AA Gen	
	stuffs["eat the tasty - Genjutsu - 25,25"] = "Key: Delicious";
	stuffs["get yourself a harem - Genjutsu - 17,10"] = "-";
	stuffs["mind the gap - Genjutsu - 25,25"] = "Key: Dance Floor";
	stuffs["outwit a sicilian when death is on the line - Genjutsu - 19,10"] = "Event: +500 Chakra";
	stuffs["tunnel to the earth's core - Genjutsu - 18,11"] = "Event: Minor Village Contract";
	stuffs["win the race - Genjutsu - 19,12"] = "-";
	//AA Nin
	stuffs["cause a giant avalanche - Ninjutsu - 19,12"] = "-";
	stuffs["death from all sides - Ninjutsu - 18,10"] = "Event: +4000 Jutsu XP";
	stuffs["hold off a missing-nin - Ninjutsu - 17,14"] = "Event: Minor Village Contract";
	stuffs["infiltrate the snow village - Ninjutsu - 18,10"] = "-";
	stuffs["jonin at risk - Ninjutsu - 19,12"] = "Event: Major Village Contract";
	stuffs["leap over a mountain - Ninjutsu - 17,12"] = "-";
	stuffs["mysterious visitors - Ninjutsu - 19,15"] = "-";
	stuffs["rescue the princess - Ninjutsu - 19,12"] = "-";
	stuffs["rock head - Ninjutsu - 19,16"] = "-";
	//AA Tai
	stuffs["act in the kage's place - Taijutsu - 18,12"] = "Event: +20 Stamina";
	stuffs["a fray - Taijutsu - 18,13"] = "-";
	stuffs["eat a cathedral - Taijutsu - 18,13"] = "-";
	stuffs["find the ultimate answer - Taijutsu - 19,13"] = "Event: Major Village Contract";
	stuffs["fix the monument - Taijutsu - 18,12"] = "Event: Minor Village Contract";
	stuffs["get your lame on - Taijutsu - 18,13"] = "-";
	stuffs["it is dark - Taijutsu - 19,10"] = "-";
	stuffs["split an atom - Taijutsu - 17,15"] = "-";
	stuffs["turn on a robot girl - Taijutsu - 18,11"] = "-";
	stuffs["wrestle a turkish giant - Taijutsu - 19,13"] = "Event: +4000 Friend Points";
	//AA Rare
	stuffs["colleccrank>=1%%@# syntax error - Ninjutsu - 25,25"] = "Item: Errant Bit";
	stuffs["outwit the bad guys - Genjutsu - 19,10"] = "Event: Major Village Contract";
	stuffs["stall an invasion - Taijutsu - 20,15"] = "-";
	//S
	stuffs["bench press a whale - Taijutsu - 22,13"] = "Item: Restraining Order (S2+)";
	stuffs["cut to the front of the line - Ninjutsu - 20,15"] = "Item: Gothic Album (S2+)";
	stuffs["divert a waterfall - Taijutsu - 22,15"] = "Event: Major Village Contract";
	stuffs["dodge lasers - Genjutsu - 22,15"] = "Event: Major Village Contract";
	stuffs["do your taxes - Ninjutsu - 21,16"] = "Event: Major Village Contract";
	stuffs["fool the planet - Genjutsu - 20,13"] = "Item: Pink Hair Dye (S2+)";
	stuffs["get to bed - Genjutsu - 22,13"] = "Event: Major Village Contract";
	stuffs["survive the blind date - Ninjutsu - 20,13"] = "Event: Major Village Contract";
	stuffs["flaw in the world - Taijutsu - 25,25"] = "Key: Filthy";
	stuffs["flaw in the world - Genjutsu - 25,25"] = "ADVANCED1111";	//S, Monochrome - Key
	advanced["You rush onto a battlefield, but notice a strange anomaly.."] = "Key: Noodle Shop";
	//Reaper Gen
	stuffs["a-level! fight an arrancar - Genjutsu - 15,11"] = "-";
	stuffs["a-level! sew together a plushie - Genjutsu - 10,6"] = "Ally: Fletch";
	stuffs["b-level! cut down a boss demon - Genjutsu - 9,6"] = "Event: +2000 Ryo";
	stuffs["b-level! snap a photo of a vice captain - Genjutsu - 9,7"] = "Event: +2000 Ryo";
	stuffs["c-level! fight off a hollow - Genjutsu - 6,5"] = "-";
	stuffs["c-level! patrol the city - Genjutsu - 5,9"] = "-";
	stuffs["c-level! train your spirit energy  - Genjutsu - 6,5"] = "-";
	stuffs["d-level! count the substitute souls - Genjutsu - 7,3"] = "Ally: TicTac";
	stuffs["d-level! explore the society - Genjutsu - 7,2"] = "-";
	stuffs["d-level! patrol the grounds - Genjutsu - 8,2"] = "-";
	//Reaper Nin
	stuffs["a-level! destroy a hollow stronghold - Ninjutsu - 15,11"] = "QQQQ: Hollow Jaw (only if on \"All You Can Eat 2\"!)";
	stuffs["a-level! protect a possessed bird - Ninjutsu - 12,5"] = "Ally: Hermano";
	stuffs["b-level! cover up an investigation - Ninjutsu - 10,7"] = "Event: +2000 Ryo";
	stuffs["b-level! duel a captain - Ninjutsu - 10,6"] = "-";
	stuffs["b-level! get a deal at the shop - Ninjutsu - 9,9"] = "Ally: MC Stripeypants";
	stuffs["c-level! chicken whistle - Ninjutsu - 8,5"] = "-";
	stuffs["c-level! track a rogue reaper - Ninjutsu - 7,5"] = "Event: +1500 XP";
	stuffs["d-level! defend a seal - Ninjutsu - 6,3"] = "-";
	//Reaper Tai
	stuffs["a-level! research a hollow evolution - Taijutsu - 11,8"] = "Ally: Strawberry";
	stuffs["a-level! seal a rip between worlds - Taijutsu - 15,11"] = "-";
	stuffs["b-level! catch a mischievous soul - Taijutsu - 9,8"] = "-";
	stuffs["b-level! teach a new soul reaper - Taijutsu - 10,7"] = "-";
	stuffs["c-level! craft a barrier - Taijutsu - 8,5"] = "-";
	stuffs["c-level! sneak a soul to school - Taijutsu - 9,3"] = "-";
	stuffs["d-level! go grocery shopping - Taijutsu - 7,4"] = "Ally: Robogirl";
	stuffs["d-level! sense a monster - Taijutsu - 5,4"] = "-";
	//Reaper Rare
	stuffs["c-level! cross over a spirit - Ninjutsu - 8,3"] = "Ally: Strawberry";
	//Monochrome Gen
	stuffs["basketball woes - Genjutsu - 20,18"] = "-";
	stuffs["blend in - Genjutsu - 15,22"] = "-";
	stuffs["false tutor - Genjutsu - 24,15"] = "-";
	stuffs["get a date - Genjutsu - 23,17"] = "-";
	stuffs["hang out at school - Genjutsu - 17,21"] = "-";
	stuffs["listen in on gossip - Genjutsu - 17,19"] = "-";
	stuffs["patrol the school - Genjutsu - 15,23"] = "-";
	stuffs["take a photo - Genjutsu - 15,21"] = "-";
	stuffs["time to kill - Genjutsu - 20,17"] = "-";
	stuffs["withstand the eye - Genjutsu - 16,22"] = "-";
	//Monochrome Nin
	stuffs["cover for a buddy - Ninjutsu - 16,22"] = "-";
	stuffs["chalk assassin - Ninjutsu - 20,19"] = "-";
	stuffs["get out of chores - Ninjutsu - 16,17"] = "-";
	stuffs["hide in a locker - Ninjutsu - 16,18"] = "Ally: Sporty";
	stuffs["hunt for clues - Ninjutsu - 25,21"] = "-";
	stuffs["puppy of doom - Ninjutsu - 20,18"] = "-";
	stuffs["text in class - Ninjutsu - 16,22"] = "-";
	//Monochrome Tai
	stuffs["make the team - Taijutsu - 16,18"] = "-";
	stuffs["math problem - Taijutsu - 25,25"] = "-";
	stuffs["peep - Taijutsu - 19,20"] = "Ally: Scary";
	stuffs["return an insult - Taijutsu - 16,22"] = "-";
	//Monochrome Rare
	stuffs["dance demon - Ninjutsu - 26,19"] = "Ally: Hotsumoto";
	stuffs["deadly locker - Taijutsu - 35,7"] = "Ally: Smiley";
	stuffs["desk trap - Taijutsu - 19,18"] = "Item: Stark Moonlight";
	stuffs["dodge detention - Taijutsu - 32,7"] = "Item: Monochrome Flower";
	stuffs["hallway monitor - Genjutsu - 20,21"] = "Item: Nightshade";
	stuffs["killer bus - Taijutsu - 19,17"] = "Item: Dayshade";
	stuffs["pencil attack - Ninjutsu - 19,17"] = "Ally: Blind Fury";
	stuffs["pool party - Ninjutsu - 20,19"] = "Item: Dark Water";
	stuffs["sit through class - Taijutsu - 7,32"] = "Item: Monochrome Flower";
	stuffs["suffocating library - Taijutsu - 11,36"] = "Item: Ebony Sand";
	stuffs["flaw in the world - Ninjutsu - 25,25"] = "Key: Chosen";
	//stuffs["flaw in the world - Genjutsu - 25,25"] = "ADVANCED1111";	//S, Monochrome - Key
	advanced["You notice an otherworldly crack in the walls.."] = "Key: Hopeless";
	//Outskirts Gen
	stuffs["wander the sands - Genjutsu - 13,9"] = "Item: Ash-Covered Ring";
	stuffs["wander the sands - Genjutsu - 14,6"] = "Item: Tangled Metal";
	stuffs["wander the sands - Genjutsu - 14,7"] = "Item: Ash-Covered Tile/Broken Machinery";
	stuffs["wander the sands - Genjutsu - 14,8"] = "Item: Ash-Covered Shaft";
	stuffs["wander the sands - Genjutsu - 14,9"] = "Item: Threadbare Robes";
	stuffs["wander the sands - Genjutsu - 15,8"] = "Item: Ash-Covered Coin";
	stuffs["wander the sands - Genjutsu - 18,15"] = "Item: Cracked Glasses";
	stuffs["wander the sands - Genjutsu - 19,10"] = "Item: Ash-Covered Gem";
	stuffs["wander the sands - Genjutsu - 19,12"] = "Item: Ash-Covered Rare Ring";
	//Outskirts Nin
	stuffs["wander the sands - Ninjutsu - 13,9"] = "-";
	stuffs["wander the sands - Ninjutsu - 14,8"] = "Item: Ash-Covered Shaft/Burnt Scroll";
	stuffs["wander the sands - Ninjutsu - 14,9"] = "Item: Ash-Covered Gem/Broken Spyglass/Cracked Vial/Threadbare Robes";
	stuffs["wander the sands - Ninjutsu - 15,8"] = "Item: Ash-Covered Tile";
	stuffs["wander the sands - Ninjutsu - 17,13"] = "Item: Ash-Covered Rare Coin";
	stuffs["wander the sands - Ninjutsu - 17,14"] = "Item: Cracked Glasses";
	//Outskirts Tai
	stuffs["wander the sands - Taijutsu - 14,9"] = "Item: Crumbling Minerals";
	stuffs["wander the sands - Taijutsu - 15,8"] = "Item: Cracked Vial";
	stuffs["wander the sands - Taijutsu - 18,13"] = "ADVANCED";//2 missions, different blurbs and item
	advanced["You trek deep into the Outskirts, over crumbling ruins.."] = "Item: Ash-Covered Rare Shaft";
	advanced["You trek deep into the Outskirts, climbing mountains of gore.."] = "Item: Ash-Covered Coin";
	stuffs["wander the sands - Taijutsu - 17,13"] = "Ally: Good Boy";
	//Outskirts Allies
	stuffs["desert encounter - Taijutsu - 12,9"] = "Ally: The Twins";
	stuffs["desert encounter - Ninjutsu - 12,9"] = "Ally: Sticky";
	stuffs["desert encounter - Ninjutsu - 13,9"] = "Ally: Flutie";
	stuffs["desert encounter - Genjutsu - 13,9"] = "Ally: Tubby";
	//Inner Wastelands - Gen
	stuffs["land shark - Genjutsu - 32,6"] = "Ally: Jaws";
	stuffs["the inner wastelands - Genjutsu - 18,8"] = "Item: Ash-Covered Rare Ring";
	stuffs["the inner wastelands - Genjutsu - 18,9"] = "Item: Ash-Covered Rare Shaft";
	stuffs["the inner wastelands - Genjutsu - 19,9"] = "Item: Note Page";
	stuffs["the inner wastelands - Genjutsu - 20,8"] = "1111: Disembodied Head";//ONLY 1, not if you have Chunks as ally
	//Inner Wastelands - Nin
	stuffs["carnivore plants - Ninjutsu - 32,6"] = "Ally: Venus";
	stuffs["the inner wastelands - Ninjutsu - 18,8"] = "Item: Ash-Covered Coin";
	stuffs["the inner wastelands - Ninjutsu - 18,9"] = "Item: Ash-Covered Rare Coin";
	stuffs["the inner wastelands - Ninjutsu - 19,9"] = "Item: Ash-Covered Gem";
	stuffs["the inner wastelands - Ninjutsu - 20,8"] = "QQQQ: Left Arm Chunk (only if on \"Chunks\"!)";
	//Inner Wastelands - Tai
	stuffs["explosive mudslide - Taijutsu - 32,6"] = "Ally: Palmface";
	stuffs["the inner wastelands - Taijutsu - 18,8"] = "Item: Ash-Covered Coin";
	stuffs["the inner wastelands - Taijutsu - 18,9"] = "Item: Ash-Covered Rare Gem";
	stuffs["the inner wastelands - Taijutsu - 19,9"] = "Item: Ash-Covered Gem";
	stuffs["the inner wastelands - Taijutsu - 20,8"] = "QQQQ: Right Arm Chunk (only if on \"Chunks\"!)";
	//Not Wasteland Disease
	stuffs["wasteland monument"] = "Item: Ash-Covered Rune";
	stuffs["blinding heat - Genjutsu - 22,10"] = "Item: Glassed Sand";
	stuffs["hide from unicorns - Taijutsu - 22,10"] = "Item: Ash-Covered Tile";
	stuffs["hunt the desert fanboy - Taijutsu - 22,10"] = "Item: Fanboy Shirt";
	stuffs["hunt the rubber pirates - Ninjutsu - 22,10"] = "Item: Rubber Bits";
	stuffs["hunt the sandfurry - Ninjutsu - 22,10"] = "Item: Furry Swatch";
	stuffs["hunt the sandfurry - Ninjutsu - 30,8"] = "Item: Furry Swatch";
	stuffs["hunt the wampus - Genjutsu - 22,10"] = "Item: Wampus Pelt";
	stuffs["sandcorn - Taijutsu - 22,10"] = "Item: Ash-Covered Gem";
	stuffs["surf the sand dunes - Genjutsu - 22,10"] = "Item: Ash-Covered Tile";
	stuffs["werehouse - Ninjutsu - 22,10"] = "Item: Ash-Covered Tile";
	stuffs["sand demon - Taijutsu - 30,8"] = "-";
	stuffs["trophy monster - Genjutsu - 30,8"] = "-";
	//BurgerNinja
	stuffs["may i take your order - Doujutsu - 3,2"] = "Item: Greassy Burger";
	stuffs["may i take your order - Doujutsu - 4,1"] = "ADVANCED";//either nothing, or Greassy Burger
	advanced["\"FORTY SEVEN BURGERS NOW.\""] = "-";
	advanced["\"Umm, six fries, a burger, two ChunkNuggets..\""] = "Item: Greassy Burger";
	stuffs["may i take your order - Doujutsu - 4,2"] = "Item: Greassy Fries";
	stuffs["may i take your order - Doujutsu - 5,1"] = "Item: Greassy Nuggets";
	stuffs["may i take your order - Doujutsu - 6,1"] = "ADVANCED";//either Greassy Fries, or Greassy Burger
	advanced["\"Two burgers, extra pickles, three fries, two skinned children, and a large diet soda.\""] = "Item: Greassy Fries";
	advanced["\"I'd like, ahhh, a shake, and a soda, and two burgers..\""] = "Item: Greassy Burger";
	stuffs["may i take your order - Doujutsu - 7,1"] = "Item: 'Diet' Soda";
	stuffs["may i take your order - Doujutsu - 8,1"] = "Item: Greassy Nuggets";
	stuffs["shift change - Doujutsu - 3,5"] = "Event: Major Village Contract";
	stuffs["shift change - Doujutsu - 4,4"] = "Event: Major Village Contract";
	stuffs["shift change - Doujutsu - 5,3"] = "Event: Major Village Contract";
	stuffs["study the menu - Doujutsu - 5,5"] = "-";//jutsu
	stuffs["sobbing - Doujutsu - 11,4"] = "Ally: Su-chan";
	stuffs["grill monkey - Doujutsu - 11,4"] = "Ally: Lulu";
	stuffs["clean the grates - Doujutsu - 5,5"] = "Item: Pigeon Chunks";
	stuffs["drive-thru - Doujutsu - 6,3"] = "Item: Green Potatoes";
	stuffs["dumpster diving - Doujutsu - 6,2"] = "Item: Mystery Meat";
	stuffs["empty the shake tank - Doujutsu - 4,5"] = "Item: Curdled Powder";
	stuffs["engineer lunch - Doujutsu - 8,6"] = "1111: KnightFrame A";//only 1
	stuffs["robotic builders - Doujutsu - 6,6"] = "1111: KnightFrame B";//only 1
	stuffs["archaeologist's lunch out - Doujutsu - 4,7"] = "1111: KnightFrame C";//only 1
	stuffs["airship mechanics - Doujutsu - 7,6"] = "1111: KnightFrame D";//only 1
	stuffs["traveling brigands - Doujutsu - 3,9"] = "1111: KnightFrame E";//only 1
	//PW - missions
	stuffs["add some toppings - Doujutsu - 15,27"] = "Item: Unknown Pizza";
	stuffs["be in an advertisement - Doujutsu - 15,25"] = "-";
	stuffs["clean the oven - Doujutsu - 25,30"] = "-";
	stuffs["clean up the garage - Doujutsu - 15,35"] = "1111: Scuffed Delivery Hat";//PW GEAR
	stuffs["count change - Doujutsu - 15,27"] = "-";
	stuffs["flip a pie - Doujutsu - 16,35"] = "Item: Unknown Pizza";
	stuffs["iron the pizzalaundry - Doujutsu - 15,30"] = "1111: Polyester Delivery Jacket";//PW GEAR
	stuffs["lugging crap - Doujutsu - 20,25"] = "-";
	stuffs["sort the employee lounge - Doujutsu - 17,25"] = "1111: Tattered Driving Gloves";//PW GEAR
	stuffs["stoke the fire - Doujutsu - 20,25"] = "-";//jutsu
	stuffs["take an order - Doujutsu - 17,37"] = "-";
	stuffs["taste test - Doujutsu - 14,27"] = "Item: Unknown Pizza";
	stuffs["tell everyone about pizzawitch - Doujutsu - 20,15"] = "-";
	stuffs["the fryer - Doujutsu - 14,25"] = "-";
	stuffs["wash cici's ride - Doujutsu - 15,35"] = "1111: Tacky Keychain";//PW GEAR
	stuffs["wash the windows - Doujutsu - 13,17"] = "-";
	//PW - higher missions
	stuffs["fix the drink machine - Doujutsu - 25,27"] = "Item: 'Diet' Soda";
	stuffs["greass fire - Doujutsu - 35,30"] = "-";//jutsu
	stuffs["pizza party - Doujutsu - 17,7"] = "Ally: Blondie";
	stuffs["refill the rides - Doujutsu - 30,30"] = "-";
	stuffs["robotic frat boys - Doujutsu - 20,23"] = "-";
	stuffs["samurai pizza cats - Doujutsu - 5,21"] = "-";
	//Witching Hour
	stuffs["code corruption - Doujutsu - 120,10"] = "DDDD: Mark 86 Drivetrain";//1 - must have Shift to Drift active
	stuffs["monster suit - Doujutsu - 20,35"] = "Event: +2000 Ryo";
	stuffs["the fields - Doujutsu - 15,35"] = "Event: +2000 Ryo";
	stuffs["the darkest hour - Doujutsu - 26,30"] = "Event: +2000 Ryo";
	stuffs["the darkness of the soul - Doujutsu - 120,10"] = "DDDD: Mark 86 Engine";//1 - must have Shift to Drift active
	stuffs["the jungle - Doujutsu - 30,30"] = "Event: +2000 Ryo";
	stuffs["the pit - Doujutsu - 30,30"] = "Event: +2000 Ryo";
	stuffs["the spire - Doujutsu - 20,28"] = "Event: +2000 Ryo";
	stuffs["the world above - Doujutsu - 15,30"] = "DDDD: Mark 86 Turbo";//1 - must have Racer's Edge active
	//Jungle Gen
	stuffs["ravine - Genjutsu - 30,105"] = "Event: +1% Item Find Chance";
	stuffs["vine forest - Genjutsu - 40,85"] = "Event: +1% Item Find Chance";
	stuffs["flower field - Genjutsu - 50,55"] = "THEME";
	themes["flower field - Genjutsu - 50,55 - RNG"] = "Item: Green Filament";
	stuffs["lonely field - Genjutsu - 40,85"] = "THEME";
	themes["lonely field - Genjutsu - 40,85 - RNG"] = "Item: White Filament";
	stuffs["outcropping - Genjutsu - 30,100"] = "THEME";
	themes["outcropping - Genjutsu - 30,100 - RNG"] = "Item: Green Filament";
	stuffs["the first monument - Genjutsu - 110,40"] = "JJJJ: Unfinished Composition";//1st
	stuffs["the second monument - Genjutsu - 110,40"] = "JJJJ: Unfinished Composition";//2nd
	stuffs["the third monument - Genjutsu - 110,40"] = "JJJJ: Unfinished Composition";//3rd
	stuffs["the eighth monument? - Genjutsu - 110,35"] = "JJJJ: Unfinished Composition";//8th
	//Jungle Nin
	stuffs["dark canopy - Ninjutsu - 40,70"] = "Event: +1% Item Find Chance";
	stuffs["noises - Ninjutsu - 40,80"] = "Event: +1% Item Find Chance";
	stuffs["park ruins - Ninjutsu - 30,100"] = "Event: +1% Item Find Chance";
	stuffs["sinkholes - Ninjutsu - 55,50"] = "Event: +2% Item Find Chance";
	stuffs["sloping hill - Ninjutsu - 50,60"] = "THEME";
	themes["sloping hill - Ninjutsu - 50,60 - Legacy"] = "Item: Tarnished Wheel";
	stuffs["flower field - Ninjutsu - 30,90"] = "THEME";
	themes["flower field - Ninjutsu - 30,90 - RNG"] = "Item: Red Filament";
	stuffs["outcropping - Ninjutsu - 30,100"] = "THEME";
	themes["outcropping - Ninjutsu - 30,100 - RNG"] = "Item: Red Filament";
	stuffs["the fourth monument - Ninjutsu - 110,40"] = "JJJJ: Unfinished Composition";//4th
	stuffs["the fifth monument - Ninjutsu - 105,50"] = "JJJJ: Unfinished Composition";//5th
	//Jungle Tai
	stuffs["heavy trees - Taijutsu - 50,65"] = "Event: +2% Item Find Chance";
	stuffs["ruined roadway - Taijutsu - 30,100"] = "Event: +1% Item Find Chance";
	stuffs["sprint downhill - Taijutsu - 30,90"] = "Event: +2% Item Find Chance";
	stuffs["tall grass - Taijutsu - 55,55"] = "Event: +2% Item Find Chance";
	stuffs["flower field - Taijutsu - 40,80"] = "THEME";
	themes["flower field - Taijutsu - 40,80 - RNG"] = "Item: Blue Filament";
	stuffs["outcropping - Taijutsu - 30,100"] = "THEME";
	themes["outcropping - Taijutsu - 30,100 - RNG"] = "Item: Blue Filament";
	stuffs["the sixth monument - Taijutsu - 105,50"] = "JJJJ: Unfinished Composition";//6th
	stuffs["the seventh monument - Taijutsu - 110,45"] = "JJJJ: Unfinished Composition";//7th
	//Jungle Rare
	stuffs["cityscape - Genjutsu - 50,60"] = "THEME";
	themes["cityscape - Genjutsu - 50,60 - Legacy"] = "Item: Tarnished Wheel";
	stuffs["lookout tower - Ninjutsu - 40,85"] = "THEME";
	themes["lookout tower - Ninjutsu - 40,85 - Legacy"] = "Item: Tarnished Wheel";
	stuffs["search party - Taijutsu - 40,80"] = "THEME";
	themes["search party - Taijutsu - 40,80 - Legacy"] = "Item: Tarnished Wheel";
	//Jungle renamed after The Look
	stuffs["field of loneliness - Genjutsu - 40,85"] = "THEME";
	themes["field of loneliness - Genjutsu - 40,85 - RNG"] = "Item: White Filament";
	stuffs["field of skulls - Genjutsu - 50,55"] = "THEME";
	themes["field of skulls - Genjutsu - 50,55 - RNG"] = "Item: Green Filament";
	stuffs["skeletal forest - Genjutsu - 40,85"] = "Event: +1% Item Find Chance";
	stuffs["field of skulls - Ninjutsu - 30,90"] = "THEME";
	themes["field of skulls - Ninjutsu - 30,90 - RNG"] = "Item: Red Filament";
	stuffs["hill of bones - Ninjutsu - 50,60"] = "THEME";
	themes["hill of bones - Ninjutsu - 50,60 - Legacy"] = "Item: Tarnished Wheel";
	stuffs["crumbling world - Taijutsu - 30,90"] = "Event: +2% Item Find Chance";
	stuffs["field of skulls - Taijutsu - 40,80"] = "THEME";
	themes["field of skulls - Taijutsu - 40,80 - RNG"] = "Item: Blue Filament";
	stuffs["the crumbling desert - Taijutsu - 55,55"] = "Event: +2% Item Find Chance";
	stuffs["wall of corruption - Taijutsu - 50,65"] = "Event: +2% Item Find Chance";
}

function checkThemes() {
	var entries = document.evaluate("//font[@style='font-size: 12px;']",
				document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var hasrng = 0;
	for (var i = 0; i < entries.snapshotLength; i++) {
		if (entries.snapshotItem(i).textContent.indexOf("RNG-related") != -1) {		hasrng = 1;	}
	}
	var curblurb = "";	var maybenew = "";	var newblurb = "";
	//possibilities: None, None-->X, X, X-->None, X-->Y
	if (entries.snapshotItem(0).textContent.indexOf("to this tomorrow") != -1) {
		//switching to No Theme tomorrow: 4 is current theme's blurb
		newblurb = "-";
		curblurb = entries.snapshotItem(4).textContent;
	} else if (entries.snapshotItem(0).textContent.indexOf("Currently") != -1) {
		//current theme is No Theme: 4 MAY BE tomorrow's theme's blurb?		UNTESTED
		curblurb = "-";
		maybenew = entries.snapshotItem(3).textContent;
		if (maybenew.indexOf("to this tomorrow") != -1) {
			newblurb = entries.snapshotItem(4).textContent;
		}
	} else {
		//2 is blurb for current theme; if 3 is "(Changing to this tomorrow!)", 4 is the blurb for tomorrow's theme
		curblurb = entries.snapshotItem(2).textContent;
		maybenew = entries.snapshotItem(3).textContent;
		if (maybenew.indexOf("to this tomorrow") != -1) {
			newblurb = entries.snapshotItem(4).textContent;
		}//no need for else clause: if no new theme specified, leave it blank
	}
	var curtheme = "";	var newtheme = "";
	if (curblurb.indexOf("Legacy-related") != -1) {
		curtheme = "Legacy";
	} else if (curblurb.indexOf("WhiteEye-related") != -1) {
		curtheme = "WhiteEye";
	} else if (curblurb.indexOf("RedEye-related") != -1) {
		curtheme = "RedEye";
	} else if (curblurb.indexOf("RNG-related") != -1) {
		curtheme = "RNG";
	} else {
		curtheme = "-";
	}
	if (newblurb.length == 0) {
		//not changing themes tomorrow
		newtheme = "oldtheme";
	} else if (newblurb.indexOf("Legacy-related") != -1) {
		newtheme = "Legacy";
	} else if (newblurb.indexOf("WhiteEye-related") != -1) {
		newtheme = "WhiteEye";
	} else if (newblurb.indexOf("RedEye-related") != -1) {
		newtheme = "RedEye";
	} else if (newblurb.indexOf("RNG-related") != -1) {
		newtheme = "RNG";
	} else {
		newtheme = "-";
	}
	var d = calculateDate();
	var curyear = d.getFullYear();		var curmonth = d.getMonth()+1;	var curday = d.getDate();
	var curdate = curyear+","+curmonth+","+curday;
	themedata = hasrng+","+curtheme+","+newtheme+","+curdate;
	GM_setValue(playername+"_themes", themedata);
}

function checkItems() {
//list of checks:
//Hollow Leg - excludes All You Can Eat 2 for Hollow Jaws
//Goo Stabilization Recipe
//Disembodied Head, Body/Right Leg/Left Leg/Right Arm/Left Arm Chunk - alternatively, Chunks the ally
//KnightFrame A,B,C,D,E - alternatively, Knightmare Frame
//PW Hat, Jacket, Gloves, Boots - alternatively, stronger version
//Mark 86 Drivetrain/Engine/Turbo - alternatively, KnightFrame 86
//Unfinished Compositions amount
	itemsarray = [0, 0, 0,0,0,0,0,0, 0,0,0,0,0, 0,0,0,0, 0,0,0, 0];
	var snap = document.evaluate("//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/font[1]/text()|//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/text()",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snap.snapshotLength-1; i += 2) {
		var v = itemToInt(snap.snapshotItem(i+1).textContent);
		if (v == 99) {		//Knightmare Frame:
			itemsarray[8] = 1;
			itemsarray[9] = 1;
			itemsarray[10] = 1;
			itemsarray[11] = 1;
			itemsarray[12] = 1;
		} else if (v == 100) {	//Knightmare Mark 86
			itemsarray[17] = 1;
			itemsarray[18] = 1;
			itemsarray[19] = 1;
		} else if (v == 20) {	//Unfinished Composition
			itemsarray[20] = parseInt(snap.snapshotItem(i).textContent);
		} else if (v == 0) {	//Hollow Leg OR Hollow Jaw - for this step, ignore Hollow Jaws
			if (snap.snapshotItem(i+1).textContent.indexOf("Jaw") == -1) {
				itemsarray[0] = 1;
			}
		} else if (v != -1) {
			itemsarray[v] = 1;
		}
	}
	itemdata = itemsarray[0];
	for (var i = 1; i < itemsarray.length; i++) {
		itemdata += "," + itemsarray[i];
	}
	GM_setValue(playername+"_items", itemdata);
}

function checkKeys() {
	var keysarray = [0,0,0,0,0,0];//Chosen, Filthy, Hopeless, Delicious, Noodle Shop, Dance Floor
	var keychosen = document.evaluate("//option [@value='22']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keychosen.snapshotLength != 0) {	keysarray[0] = 1;	}
	var keyfilthy = document.evaluate("//option [@value='20']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keyfilthy.snapshotLength != 0) {	keysarray[1] = 1;	}
	var keyhopeless = document.evaluate("//option [@value='23']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keyhopeless.snapshotLength != 0) {	keysarray[2] = 1;	}
	var keydelicious = document.evaluate("//option [@value='26']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keydelicious.snapshotLength != 0) {	keysarray[3] = 1;	}
	var keynoodleshop = document.evaluate("//option [@value='21']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keynoodleshop.snapshotLength != 0) {	keysarray[4] = 1;	}
	var keydancefloor = document.evaluate("//option [@value='27']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (keydancefloor.snapshotLength != 0) {	keysarray[5] = 1;	}
	keydata = keysarray[0]+","+keysarray[1]+","+keysarray[2]+","+keysarray[3]+","+keysarray[4]+","+keysarray[5];
	GM_setValue(playername+"_keys", keydata);
}

function checkAllies() {
	alliesarray = [	0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,
			0,0,0,0,
			0,0,0,0,0,0,
			0,0,0,0,0,
			0,0,0,0,0,
			0,0,0,0,
			0,0,0,
			0,0,0,0,0,0,0,0];
		//00-08: Pinky, Bugman, Billy, Red Rover, Emosuke, Lil' Ro, Bruce Jr., Lil' Bo, Lil' Whitey
		//09-15: Trapchan, K.Y., Master P, Mr. Sandman, Bruce Sr., Terri, Triple H
		//16-24: Sicko, Pandabear, Annie, Mr. Smith, Smokey the Bear, The Scar, Rover's Mom, Yuri, J-Diddy
		//25-28: Big Shammy, Z-Dog, Big Ro, Big Bo
		//29-34: Fletch, TicTac, Hermano, MC Stripeypants, Strawberry, Robogirl
		//35-39: Sporty, Scary, Hotsumoto, Smiley, Blind Fury
		//40-44: Good Boy, The Twins, Sticky, Flutie, Tubby
		//45-48: Jaws, Venus, Palmface, Chunks (used for body parts)
		//49-51: Su-chan, Lulu, Blondie (Cipher (99) is used for Lulu AND Su-chan)
		//52-59: filler space for future allies
	var snap = document.evaluate("//div[@id='teamrep']/table/tbody/tr/td/label/b/text()",
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snap.snapshotLength; i++) {
		var v = allyToInt(snap.snapshotItem(i).textContent);
		if (v == 99) {
			//you have Cipher!
			alliesarray[49] = 1;
			alliesarray[50] = 1;
		} else if (v != -1) {
			alliesarray[v] = 1;
		}
	}
	allydata = alliesarray[0];
	for (var i = 1; i < alliesarray.length; i++) {
		allydata += "," + alliesarray[i];
	}
	GM_setValue(playername+"_allies", allydata);
}

function allyToInt(name) {
	if (name.indexOf("Pinky") != -1) {	return 0;
	} else if (name.indexOf("Bugman") != -1) {	return 1;
	} else if (name.indexOf("Billy") != -1) {	return 2;
	} else if (name.indexOf("Red Rover") != -1) {	return 3;
	} else if (name.indexOf("Emosuke") != -1) {	return 4;
	} else if (name.indexOf("Lil' Ro") != -1) {	return 5;
	} else if (name.indexOf("Bruce Jr.") != -1) {	return 6;
	} else if (name.indexOf("Lil' Bo") != -1) {	return 7;
	} else if (name.indexOf("Lil' Whitey") != -1) {	return 8;
	} else if (name.indexOf("Trapchan") != -1) {	return 9;
	} else if (name.indexOf("K.Y.") != -1) {	return 10;
	} else if (name.indexOf("Master P") != -1) {	return 11;
	} else if (name.indexOf("Mr. Sandman") != -1) {	return 12;
	} else if (name.indexOf("Bruce Sr.") != -1) {	return 13;
	} else if (name.indexOf("Terri") != -1) {	return 14;
	} else if (name.indexOf("Triple H") != -1) {	return 15;
	} else if (name.indexOf("Sicko") != -1) {	return 16;
	} else if (name.indexOf("Pandabear") != -1) {	return 17;
	} else if (name.indexOf("Annie") != -1) {	return 18;
	} else if (name.indexOf("Mr. Smith") != -1) {	return 19;
	} else if (name.indexOf("Smokey the Bear") != -1) {	return 20;
	} else if (name.indexOf("The Scar") != -1) {	return 21;
	} else if (name.indexOf("Rover's Mom") != -1) {	return 22;
	} else if (name.indexOf("Yuri") != -1) {	return 23;
	} else if (name.indexOf("J-Diddy") != -1) {	return 24;
	} else if (name.indexOf("Big Shammy") != -1) {	return 25;
	} else if (name.indexOf("Z-Dog") != -1) {	return 26;
	} else if (name.indexOf("Big Ro") != -1) {	return 27;
	} else if (name.indexOf("Big Bo") != -1) {	return 28;
	} else if (name.indexOf("Fletch") != -1) {	return 29;
	} else if (name.indexOf("TicTac") != -1) {	return 30;
	} else if (name.indexOf("Hermano") != -1) {	return 31;
	} else if (name.indexOf("MC Stripeypants") != -1) {	return 32;
	} else if (name.indexOf("Strawberry") != -1) {	return 33;
	} else if (name.indexOf("Robogirl") != -1) {	return 34;
	} else if (name.indexOf("Sporty") != -1) {	return 35;
	} else if (name.indexOf("Scary") != -1) {	return 36;
	} else if (name.indexOf("Hotsumoto") != -1) {	return 37;
	} else if (name.indexOf("Smiley") != -1) {	return 38;
	} else if (name.indexOf("Blind Fury") != -1) {	return 39;
	} else if (name.indexOf("Good Boy") != -1) {	return 40;
	} else if (name.indexOf("The Twins") != -1) {	return 41;
	} else if (name.indexOf("Sticky") != -1) {	return 42;
	} else if (name.indexOf("Flutie") != -1) {	return 43;
	} else if (name.indexOf("Tubby") != -1) {	return 44;
	} else if (name.indexOf("Jaws") != -1) {	return 45;
	} else if (name.indexOf("Venus") != -1) {	return 46;
	} else if (name.indexOf("Palmface") != -1) {	return 47;
	} else if (name.indexOf("Chunks") != -1) {	return 48;
	} else if (name.indexOf("Su-chan") != -1) {	return 49;
	} else if (name.indexOf("Lulu") != -1) {	return 50;
	} else if (name.indexOf("Blondie") != -1) {	return 51;
	} else if (name.indexOf("Cipher") != -1) {	return 99;
	} else {					return -1;
	}
}

function itemToInt(name) {
		if (name.indexOf("Hollow Leg") != -1) {				return 0;
		} else if (name.indexOf("Hollow Jaw") != -1) {			return 0;
		} else if (name.indexOf("Goo Stabilization Recipe") != -1) {	return 1;
		} else if (name.indexOf("Disembodied Head") != -1) {		return 2;
		} else if (name.indexOf("Body Chunk") != -1) {			return 3;
		} else if (name.indexOf("Right Leg Chunk") != -1) {		return 4;
		} else if (name.indexOf("Left Leg Chunk") != -1) {		return 5;
		} else if (name.indexOf("Right Arm Chunk") != -1) {		return 6;
		} else if (name.indexOf("Left Arm Chunk") != -1) {		return 7;
		} else if (name.indexOf("KnightFrame A") != -1) {		return 8;
		} else if (name.indexOf("KnightFrame B") != -1) {		return 9;
		} else if (name.indexOf("KnightFrame C") != -1) {		return 10;
		} else if (name.indexOf("KnightFrame D") != -1) {		return 11;
		} else if (name.indexOf("KnightFrame E") != -1) {		return 12;
		} else if (name.indexOf("Knightmare Frame") != -1) {		return 99;//8,9,10,11,12
		} else if (name.indexOf("Delivery Hat") != -1) {		return 13;
		} else if (name.indexOf("Stalwart as the Mount") != -1) {	return 13;
		} else if (name.indexOf("Delivery Jacket") != -1) {		return 14;
		} else if (name.indexOf("Hushed as the Wood") != -1) {		return 14;
		} else if (name.indexOf("Driving Gloves") != -1) {		return 15;
		} else if (name.indexOf("Twilight gauntlets") != -1) {		return 15;
		} else if (name.indexOf("Fierce as the Flame") != -1) {		return 15;
		} else if (name.indexOf("Keychain") != -1) {			return 16;
		} else if (name.indexOf("Swift as the Wind") != -1) {		return 16;
		} else if (name.indexOf("Mark 86 Drivetrain") != -1) {		return 17;
		} else if (name.indexOf("Mark 86 Engine") != -1) {		return 18;
		} else if (name.indexOf("Mark 86 Turbo") != -1) {		return 19;
		} else if (name.indexOf("Knightmare Mark 86") != -1) {		return 100;//17,18,19
		} else if (name.indexOf("Unfinished Composition") != -1) {	return 20;
		} else {							return -1;
		}
	}

function checkDriftStyleMain() {
	var snap = document.evaluate("//tbody/tr/td/b",
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snap.snapshotLength; i++) {
		var v = snap.snapshotItem(i).textContent;
		if (v.indexOf("Shift to Drift") != -1) {
			driftstyle = "Shift to Drift";
		} else if (v.indexOf("Racer's Edge") != -1) {
			driftstyle = "Racer's Edge";
		}
		GM_setValue(playername+"_drift",driftstyle);
	}
}

function checkDriftStyleDrift() {
	var snap = document.evaluate("//font/b[2]",
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (snap.snapshotLength != 0) {
		var v = snap.snapshotItem(0).textContent;
		if (v.indexOf("Shift to Drift") != -1) {
			driftstyle = "Shift to Drift";
		} else if (v.indexOf("Racer's Edge") != -1) {
			driftstyle = "Racer's Edge";
		}
		GM_setValue(playername+"_drift",driftstyle);
	}
}

function checkRewards() {
	var snap = document.evaluate("//tbody/tr/td/b",
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nomatchfound = true;
	for (var i = 0; nomatchfound && (i < snap.snapshotLength); i++) {
		var v = snap.snapshotItem(i);
		var reward = v.textContent;
		if (allyToInt(reward) != -1) {			//we just got an ally!
			alliesarray[allyToInt(reward)] = 1;		nomatchfound = false;
		} else if (itemToInt(reward) != -1) {		//we just got an item!
			if (itemToInt(reward) != 0) {		//ignore Hollow Jaws (can't get Hollow Leg from regular missions)
				itemsarray[itemToInt(reward)] = 1;		nomatchfound = false;
			}
		} else {					//let's check the keys
			if (reward.indexOf("Chosen") != -1) {
				keysarray[0] = 1;			nomatchfound = false;
			} else if (reward.indexOf("Filthy") != -1) {
				keysarray[1] = 1;			nomatchfound = false;
			} else if (reward.indexOf("Hopeless") != -1) {
				keysarray[2] = 1;			nomatchfound = false;
			} else if (reward.indexOf("Delicious") != -1) {
				keysarray[3] = 1;			nomatchfound = false;
			} else if (reward.indexOf("Noodle Shop") != -1) {
				keysarray[4] = 1;			nomatchfound = false;
			} else if (reward.indexOf("Dance Floor") != -1) {
				keysarray[5] = 1;			nomatchfound = false;
			}
		}
	}
	if (nomatchfound) {	//even if you found something, it's not a scarce thing - no need to update
	} else {		//ally, item or key found - update the GM values
		keydata = keysarray[0]+","+keysarray[1]+","+keysarray[2]+","+keysarray[3]+","+keysarray[4]+","+keysarray[5];
		GM_setValue(playername+"_keys", keydata);
		allydata = alliesarray[0];
		for (var i = 1; i < alliesarray.length; i++) {
			allydata += "," + alliesarray[i];
		}
		GM_setValue(playername+"_allies", allydata);
		itemdata = itemsarray[0];
		for (var i = 1; i < itemsarray.length; i++) {
			itemdata += "," + itemsarray[i];
		}
		GM_setValue(playername+"_items", itemdata);
	}
}

function calculateDate() {
	var d = new Date();
	var curtime = d.getHours()*60+d.getMinutes() - offsethours*60 - offsetminutes - dayrollhours*60 - dayrollminutes;
	var curhour = (curtime - curtime%60)/60;
	var curminutes = curtime%60;
	var curyear = d.getFullYear();		var curmonth = d.getMonth();	var curday = d.getDate();
	var nd = new Date(curyear, curmonth, curday, curhour, curminutes);
	return nd;
}

function getGM() {
	driftstyle = GM_getValue(playername+"_drift", "-");

	keydata = GM_getValue(playername+"_keys", "0,0,0,0,0");
	keysarray = keydata.split(",");
	themedata = GM_getValue(playername+"_themes", "0,\"-\",oldtheme,1900,1,1");
	themesarray = themedata.split(",");
	itemdata = GM_getValue(playername+"_items", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	itemsarray = itemdata.split(",");
	allydata = GM_getValue(playername+"_allies", 
	"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
	alliesarray = allydata.split(",");
}