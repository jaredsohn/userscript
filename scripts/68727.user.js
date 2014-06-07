// Tard's KoL Scripts
// Copyright (c) 2006, Byung Kim
// New releases Copyright (c) 2009-2013 by Hellion
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// autoUpdater used under Creative Commons License 3.0.
//
// ==UserScript==
// @name           Tard's Kol Scripts - Choice Adventure Rewards
// @version        3.15
// @namespace      http://kol.dashida.com
// @author	   Tard
// @author         Hellion
// @author         Aelsa
// @author	Buzzy (autoupdate function; see http://userscripts.org/scripts/show/52251 )
// @include *kingdomofloathing.com/choice.php*
// @include *kingdomofloathing.com/basement.php
// @include *kingdomofloathing.com/friars.php*
// @include *kingdomofloathing.com/bigisland.php*
// @include *kingdomofloathing.com/postwarisland.php*
// @include *kingdomofloathing.com/palinshelves.php
// @include *kingdomofloathing.com/clan_viplounge.php*
// @include *kingdomofloathing.com/clan_rumpus.php*
// @include *kingdomofloathing.com/campground.php*
// @include *kingdomofloathing.com/main.php
// @include *127.0.0.1:*/clan_viplounge.php*
// @include *127.0.0.1:*/clan_rumpus.php*
// @include *127.0.0.1:*/main.php
// @include *127.0.0.1:*/choice.php*
// @include *127.0.0.1:*/basement.php
// @include *127.0.0.1:*/friars.php*
// @include *127.0.0.1:*/bigisland.php*
// @include *127.0.0.1:*/postwarisland.php*
// @include *127.0.0.1:*/palinshelves.php
// @include *127.0.0.1:*/campground.php*
// @include *127.0.0.1:*/main.php
// @include *localhost:*/clan_viplounge.php*
// @include *localhost:*/clan_rumpus.php*
// @include *localhost:*/main.php
// @include *localhost:*/choice.php*
// @include *localhost:*/basement.php
// @include *localhost:*/friars.php*
// @include *localhost:*/bigisland.php*
// @include *localhost:*/postwarisland.php*
// @include *localhost:*/palinshelves.php
// @include *localhost:*/campground.php*
// @include *localhost:*/main.php
// @grant	GM_log
// @grant 	GM_getValue
// @grant 	GM_setValue
// @grant	GM_xmlhttpRequest
// @grant   GM_registerMenuCommand
// @history 3.15 new Hidden City
// @history 3.14 Dreadsylvania corrections, fix to updater
// @history 3.13 updates for Dreadsylvania
// @history 3.12 updates for AT nemesis, Vamping Out, more hobopolis stuff, parts of Violet fog, sea stuff
// @history 3.11 updates for new giant castle, suspicious guy's psych jar
// @history 3.10 refactor the actual addition of spoiler text to eliminate code duplication; add campground spoilers.
// @history 3.09 updated for new level-9 quest stuff, bugbears/zombies, skeleton usage, etc.
// @history 3.08 updated include list for new choice URL standard, added clan VIP swimming pool
// @history 3.07 added Kloop, new spooky temple
// @history 3.06 added Haunted Sorority house
// @history 3.05 added safety maps
// @history 3.04 added autoupdater
// @history 3.03 added all choices through new knob
// @history 3.02 added all antique maps through August 2010, and new Spooky Forest choice.
// @history 3.01 added Billiards room SR, new > sign choice, Reflection of a map, nemesis map choice.
// @history 3.00 major rewrite of detection logic.
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
var adventureChoiceNumber = 0, SpoilerSet, imageName;
var n = 0, sp_list = "";
var debug = false;

if (window.location.pathname == "/main.php") {	// just logged in, do certain stuff once.
	autoUpdate(68727,"3.15");
}

if (window.name == "mainpane") {
	if (inputs.length === 0) {return;}	//not in a place where we need to do anything.

	//get the adventure choice number.  Could probably do this without the for-loop.
	for (n=0; n < inputs.length; n++) {
		if (inputs[n].name === "whichchoice") {
			adventureChoiceNumber = inputs[n].value;
			break;
		}
	}
	SpoilerSet = GetSpoilersForAdvNumber(adventureChoiceNumber);
	if (SpoilerSet === undefined || SpoilerSet === null) {
		//find the adventure's image.  (in some cases this will not be the first image,
        //e.g. when you lose the Stone Wool effect when starting a Hidden Temple choice.)
		var imageName = "";
		var images = document.getElementsByTagName('img');
		for (var foo = 0; foo < images.length; foo++) {
			if (images[foo].src.indexOf('adventureimages') != -1) {
				imageName = images[foo].src.split('/')[4]; break;
			}
		}
		if (imageName != "") SpoilerSet = GetSpoilersForImageName(adventureChoiceNumber, imageName);
		if (SpoilerSet === undefined || SpoilerSet === null) {
			var bodyText = document.getElementsByTagName('body')[0].innerHTML; //textContent;
			var URL = window.location.pathname; 
			SpoilerSet = GetSpoilersForBodyText(adventureChoiceNumber, URL, imageName, bodyText);
		}
	 }
	 if (SpoilerSet !== undefined && SpoilerSet !== null) { 
		DisplaySpoilers(inputs, SpoilerSet);
	} else {    // There's always something.  Geez.
        SpoilerSet = CheckButtonText(inputs, adventureChoiceNumber);
        if (SpoilerSet !== undefined && SpoilerSet !== null) {
            DisplaySpoilersByButtonText(inputs, SpoilerSet);
        } else {
            if (debug) ShowButtonIDs(inputs);
        }
    }
}
return;

function ShowButtonIDs(inputs) {
	var cval = -1, n;
	for (n=0; n<inputs.length;n++)	{
		if (inputs[n].name==="option") {		// identify button!
			cval = inputs[n].value;
		} else if (inputs[n].type === "submit" && (cval > 0)) {	// modify button!
			inputs[n].value += " -- buttonID = " + cval + ".";
		}
	}
}

function CheckButtonText(inputs, cNum)
{
    var advOptions = {
        "594":{"check out the mini-fridge":"enable glasses or pill bottle","turn on the tv":"enable glasses or comb","take a nap":"enable pill bottle or comb","pick up the glasses":"\nafter fridge and tv: acquire glasses","pick up the comb":"\nafter nap and tv: acquire unbreakable comb","open the pill bottle":"\nafter fridge and nap: acquire lost pill bottle","walk out and back in":"keep trying","walk into the room":"get started"},
        "524":{"table of contents":"display chapter list","skip to your reward":"acquire skullheads's screw","quit reading":"leave"},
        "546":{ "visit vlad's boutique":"proceed to vlad (acquire an effect (+weapon damage / +spell damage / +DR)",
                "visit isabella's":"proceed to isabella (gain stats or meat)",
                "visit the masquerade":"proceed to masquerade (acquire an item)",
                "you know what? never mind.":"leave",
                "visit the castle":"\ntoward +weapon dmg (if you have bum & medallion) / mesmerize (if you have bum)",
                "stalk the night":"\ntoward +spell damage (if you have bum & mesmerize) / bum (Go here first)",
                "skulk in the cemetery":"\ntoward medallion (if you have bum) / +DR (if you have bum + mesmerize)",
                "come up to the lab":"\nto lab (acquire +weapon dmg effect if you have bum & medallion)",
                "to the boudoir!":"to boudoir (acquire mesmerize if you have bum)",
                "wolf out":"\nwith hamethyst medallion: effect: there wolf (30 turns: +100% weapon damage)\nwithout: nothing",
                "feed the undead hussies":"\nwith a bum enthralled: learn mesmerize\nwithout: nothing",
                "go for the bum":"enthrall a bum",
                "follow the girl":"\nwith hypnosis: effect: bat attitude (30 turns) (+100% spell damage)\nwithout hypnosis: nothing",
                "check the mausoleum":"\nwith enthralled bum:acquire hamethyst medallion\nwithout: nothing",
                "rob the grave":"with hypnosis: effect: mistified (30 turns) (dr +30)\nwithout: nothing",
                "see where the night takes you":"get it started",
                "head back to vlad's":"back to starting point",
                "drain her dry":"+(4x mainstat) muscle (max 500)",
                "redirect your desire":"toward mus or mox",
                "tell her how you feel":"toward mys or mus or meat",
                "go party":"toward mus or mox",
                "go to the bar":"toward mox",
                "enjoy your vampness":"toward mys or meat",
                "brood in solitude":"toward mus or mox",
                "go for the jugular":"+(4x mainstat) mus (max 500)",
                "go for first base":"toward mox",
                "follow her, y'all":"toward mox",
                "drink the realblud":"+(4x mainstat) mox (max 500)",
                "listen to the cheeldren of the night":"+(4x mainstat) mys (max 500)",
                "search for human prey":"+111 meat, -1 to 2 HP",
                "find other prey":"+(4x mainstat) mys (max 500)",
                "go brood in solitude":"toward mus or mox",
                "take a walk":"toward mys or meat"
            },
        "536":{ "down the hatch!":"To the Tavern",
                "have a drink":"to bar (toward pills/harness)",
                "check out the coat check":"to coat check (toward effect/EMU harness)",
                "go to your campsite, apparently":"to campsite (toward elven items/EMU helmet)",
                "go back to the glowy tavern":"back to start (Tavern)",
                "try that one door":"to Sleeping quarters (distention pill/dog hair pill/back to start)",
                "try the other door, man":"to Warehouse (HP regen effect/EMU harness/back to start)",
                "follow captain smirk":"distention pill",
                "follow the green girl":"synthetic dog hair pill",
                "take the glowing door":"back to start (tavern)",
                "cross to the cross":"effect: heal thy nanoself (10 turns: regen 10-20HP/turn)",
                "be the duke of the hazard":"to lab (EMU harness)",
                "down the hatch":"back to start (tavern)",
                "enter the transporter":"E.M.U. harness",
                "go back the way you came":"back to warehouse",
                "exit, stage left":"to warehouse (effect/EMU harness/start)",
                "stage right, even":"to hallway (hardtack&squeeze/EMU helmet)",
                "back to the tavern":"back to start (tavern)",
                "try the port door":"to closet (2 hardtack and 2 squeeze)",
                "try the starboard door":"to lab (EMU helmet)",
                "try the aft door":"back to start (tavern)",
                "go through the circle":"2 elven hardtack, 2 elven squeeze)",
                "step through the transporter":"EMU helmet",
                "take the silver door":"to sleeping quarters (distention/dog hair/back to start)",
                "take the purple door":"to hallway (toward EMU helmet/hardtack&squeeze)"

            }
        }
    if (advOptions[cNum] !== undefined) return advOptions[cNum];
    else return null;
}

function DisplaySpoilersByButtonText(inputs, SpoilerSet) {
    var btn, bval, i, n;

    for (n = 0; n < inputs.length; n++) {
        btn = inputs[n];
        if (btn.type === "submit") {
            bval = btn.value.toLowerCase();
            i = bval.indexOf("[");
            if (i != -1) bval = bval.substring(0, i -1);
            if (debug && SpoilerSet[bval] === undefined) SpoilerSet[bval] = "(button #" + btn.value + ")";
            btn.value += " -- " + SpoilerSet[bval];
        }
    }   
}

//all choice.php buttons have an "option=" setting in their form definition;
//usually a number from 1-6, which corresponds to our array of spoiler text strings.
//this allows us to handle choices where some buttons go missing depending on your game circumstance.
//Buff areas, on the other hand, have no such values and must simply be updated in order.
function DisplaySpoilers(inputs, SpoilerSet) {
	var cval = -1, n;
	var displayText = "";
	for (n=0; n<inputs.length;n++)	{
		if (inputs[n].name==="option") {		// identify button!
			cval = inputs[n].value;
		} else if (inputs[n].type === "submit" && (cval > 0)) {	// modify button!
            if (debug && SpoilerSet[cval] === undefined) displayText = "(button #" + cval + ")";
            else if (SpoilerSet[cval] !== "") displayText = " -- " + SpoilerSet[cval];
			inputs[n].value += displayText + ""; 
		}
	}
	if (cval === -1) {			// got here without setting a button value? not a Choice.php button set.
		cval = 1;			// just run through all submit text and put in our info in sequence.
		for (n=0; n<inputs.length; n++) {
			if (inputs[n].type === "submit") {
				inputs[n].value += " -- " + SpoilerSet[cval++] + "";
			}
		}
	}
}

function GetSpoilersForAdvNumber(advNumber) {
	//data format: advOption[adventureNumber] = array of strings.
	//array element 0 = dummy value, since buttons are numbered 1-N; 
	//for historical reasons, many of these dummy values are the names of the adventures.
	//elements 1-N are spoiler text for the respective buttons.
	var advOptions = {
		// The Dungeons of Doom
		"3":["The Oracle Will See You Now","nothing","nothing","enable reading of plus sign"],
		"25":["Ouch! You bump into a door","magic lamp","Monster: mimic","nothing (no adv loss)"],

		// South of the Border
		"4":["Finger-Lickin'... Death.","+500 meat or -500 meat","-500 meat; chance of poultrygeist","nothing (no adv loss)"],

		// Spooky Gravy Barrow
		"5":["Heart of Very, Very Dark Darkness","without inexplicably glowing rock: proceed to choice of (lose all HP/nothing)\n with rock: proceed to choice of (Continue to Felonia/nothing)","nothing",""],
		"6":["Darker Than Dark","-all HP","nothing",""],
		"7":["How Depressing","with spooky glove equipped: proceed to Continue to Felonia\n without glove equipped: nothing","nothing",""],
		"8":["On the Verge of a Dirge","proceed to Queen Felonia","proceed to Queen Felonia","proceed to Queen Felonia"],

		// Castle (Wheel)
		"9":["cwheel1","Pay the Bills (Mysticality Bonus)","Feed the Cat (Moxie Bonus)","Take out the Garbage (Muscle Bonus)"],
		"10":["cwheel2","Guard the Back Door","Take out the Garbage (Muscle Bonus)","Pay the Bills (Mysticality Bonus)"],
		"11":["cwheel3","Feed the Cat (Moxie Bonus)","Pay the Bills (Mysticality Bonus)","Guard the Back Door"],
		"12":["cwheel4","Take out the Garbage (Muscle Bonus)","Guard the Back Door","Feed the Cat (Moxie Bonus)"],

		// Knob Harem
		"14":["A Bard Day's Night","Knob Goblin harem veil","Knob Goblin harem pants","+90-110 meat"],
		
		// The eXtreme Slope
		"15":["Yeti Nother Hippy","eXtreme mittens","eXtreme scarf","+200 meat"],
		"16":["Saint Beernard","snowboarder pants","eXtreme scarf","+200 meat"],
		"17":["Generic Teen Comedy Snowboarding Adventure","eXtreme mittens","snowboarder pants","+200 meat"],
        "575":["Duffel on the Double","\none piece of the eXtreme outfit that you are missing\n(random piece if you have all three)","jar of frostigkraut","nothing (no adv loss)"],
		
		// Itznotyerzitz Mine
		"18":["A Flat Miner","miner's pants","7-Foot Dwarven mattock","+100 meat"],
		"19":["100% Legal","miner's helmet","miner's pants","+100 meat"],
		"20":["See You Next Fall","miner's helmet","7-Foot Dwarven mattock","+100 meat"],

		// Pirate's Cove
		"22":["The Arrrbitrator","eyepatch","swashbuckling pants","+100 meat"],
		"23":["Barrie Me at Sea","stuffed shoulder parrot, -5 meat","swashbuckling pants","+100 meat"],
		"24":["Amatearrr Night","stuffed shoulder parrot, -3 HP","+100 meat","eyepatch"],

		// Spooky Forest
		"26":["A Three-Tined Fork","Proceed to choice of SC/TT starter items","Proceed to choice of PM/S starter items","Proceed to choice of DB/AT starter items"],
		"27":["Footprints","seal-skull helmet, seal-clubbing club","helmet turtle, turtle totem"],
		"28":["A Pair of Craters","pasta spoon, ravioli hat","saucepan, spices"],
		"29":["The Road Less Visible","disco ball, disco mask","mariachi pants, stolen accordion"],
		"45":["Maps and Legends","Spooky Temple map","nothing (no adv loss)","nothing (no adv loss)"],
		"46":["An Interesting Choice","+5-10 Mox","+5-10 Mus","Monster: spooky vampire"],
		"47":["Have a Heart","bottle(s) of used blood","nothing (no adv loss)"],
		"502":["Arboreal Respite","\nProceed to choice of meat/vampire hearts/barskin&Sapling","\nProceed to choice of (spooky mushrooms or larva)/(Meat & coin)/(mox/mus/vampire)","\nProceed to choice of \n(choice of class starter items)/Spooky-Gro Fertilizer/Spooky Temple Map"],
		"503":["The Road Less Traveled","Gain (some) Meat","Talk to Vampire Hunter:\nreceive wooden stakes (1st time only)\nOR Trade in hearts/nothing","talk to Hunter\n(Sell bar skins/buy sapling)"],
		"504":["Tree's Last Stand","\nSell 1 skin","\nSell all skins","\nacquire Spooky Sapling","nothing"],
		"505":["Consciousness of a Stream","\nMosquito larva (first time after quest) OR 3 spooky mushrooms","\n300 meat and tree-holed coin (first time) OR nothing","Proceed to choice of Mox/Mus/Fight a Vampire"],
		"506":["Through Thicket and Thinnet","\nProceed to choice of class starting items","\nAcquire spooky-gro fertilizer","\nProceed to choice of Spooky Temple Map/nothing/nothing"],
		"507":["O Lith, Mon","acquire Spooky Temple Map","nothing (no turn loss)","nothing (no turn loss)"],
		
		//48-71 are the Violet Fog; can't really label those.
		
		// Cola Battlefield
		"40":["The Effervescent Fray","Cloaca-Cola fatigues","Dyspepsi-Cola shield","+15 Mys"],
		"41":["Smells Like Team Spirit","Dyspepsi-Cola fatigues","Cloaca-Cola helmet","+15 Mus"],
		"42":["What is it Good For?","Dyspepsi-Cola helmet","Cloaca-Cola shield","+15 Mox"],

        // Violet fog --can only spoil a few of these...
        "62":["The Big Scary Place","Cerebral Cloche","back to the maze","back to the maze","back to the maze"],
        "63":["The Big Scary Place","Cerebral Crossbow","back to the maze","back to the maze","back to the maze"],
        "64":["The Big Scary Place","Cerebral Culottes","back to the maze","back to the maze","back to the maze"],
        "65":["The Prince of Wishful Thinking","+(mainstat*3/8 to 5/9) Mus","back to the maze","back to the maze","back to the maze"],
        "66":["The Prince of Wishful Thinking","+(mainstat*3/8 to 5/9) Mys","back to the maze","back to the maze","back to the maze"],
        "67":["The Prince of Wishful Thinking","+(mainstat*3/8 to 5/9) Mox","back to the maze","back to the maze","back to the maze"],
        "68":["She's So Unusual","ice stein","back to the maze","back to the maze","back to the maze"],
        "69":["She's So Unusual","munchies pill","back to the maze","back to the maze","back to the maze"],
        "70":["She's So Unusual","homeopathic healing powder","back to the maze","back to the maze","back to the maze"],
        "71":["A Journey to the Center of Your Mind","\n(5 turns of 20-ML monsters","\n(5 turns of 53-ML monsters","\n5 turns of 145-ML monsters"],
		// Whitey's Grove
		"73":["Don't Fence Me In","+20-30 Mus","white picket fence","piece of wedding cake (always)\n also white rice (first 3 or 5 times/day)"],
		"74":["The Only Thing About Him is the Way That He Walks","+20-30 Mox","3 boxes of wine","mullet wig"],
		"75":["Rapido!","+20-30 Mys","3 jars of white lightning","white collar"],

		// Knob Shaft
		"76":["Junction in the Trunction","3 chunks of cardboard ore","3 chunks of styrofoam ore","3 chunks of bubblewrap ore"],

		// Haunted Billiards Room
		"77":["Minnesota Incorporeals","+(mainstat) Mox (max 50)","Proceed to choice of (Mys/key/nothing)/Mus/nothing","Leave (no adventure loss)"],
		"78":["Broken","Proceed to choice of +Mys, Spookyraven library key, or nothing","+(mainstat) Mus (max 50)","Leave (no adventure loss)"],
		"79":["A Hustle Here, a Hustle There","\n with Chalky Hand effect: Acquire Spookyraven library key (one time drop)\nwithout Chalky Hand effect: No Reward (lose an adventure)","+(mainstat) Mys (max 50)","Leave (no adventure loss)"],
		"330":["A Shark's Chum","\n+10 Mus, +10 Mys, +10 Mox, improve VIP Pool table skill","Monster: hustled spectre"],

		// The Haunted Bedroom
		"82":["nightstand","old leather wallet","+(mainstat) Mus (max 200)","Monster: animated nightstand"],
		"83":["darkstand","old coin purse","Monster: animated nightstand","\ntattered wolf standard (SC)\ntattered snake standard (TT)\nEnglish to A. F. U. E. Dictionary (PM or S)\nbizarre illegible sheet music (DB or AT)\n All can only be found with Lord Spookyraven's spectacles equipped\n(all are one time drops)"],
		"84":["carvestand","400-600 meat","+(mainstat) Mys (max 200)","Lord Spookyraven's spectacles (one time drop)"],
		"85":["woodstand","+(mainstat) Mox (max 200)","Spookyraven ballroom key \n(only after choosing top drawer; one time drop)","Monster: remains of a jilted mistress"],

		// The Haunted Gallery
		"89":["Out in the Garden","\nwithout tattered wolf standard: Monster: Knight (wolf)\nwith tattered wolf standard and SC class: Gain Snarl of the Timberwolf skill (one time)","without tattered snake standard: Monster: Knight (snake)\nwith tattered snake standard and TT class: gain Spectral Snapper skill (one time)","without Dreams and Lights effect: Effect: Dreams and Lights;\nwith Dreams and Lights effect: lose 24-30 HP","leave (no adv loss)\n(banishes this choice for 10 turns)"],

		// The Haunted Library (Take A Look, It's In A Book")
		"80":["Rise of the House","\nproceed to choice of nothing/nothing/nothing","\nLearn a random cooking recipe","\nProceed to choice of Mox/Mys/Skill for Myst classes","nothing (no adv loss)"],
		"81":["Fall of the House","\nproceed to choice of unlock gallery-key adventure/nothing/nothing","\nLearn a random cocktailcrafting recipe","\n+(mainstat) Mus (max 75) and lose 10-15 HP (Spooky)","nothing (no adv loss)"],
		"86":["Read Chapter 1: The Arrival","nothing","nothing","nothing"],
		"87":["Chapter 2: Stephen and Elizabeth","nothing","\nunlock Gallery Key adventure in Conservatory","nothing"],
		"88":["Naughty, Naughty...","\n+(mainstat) Mys (max 75)","\n+(mainstat) Mox (max 75)","\nwithout English to A. F. U. E. Dictionary: -10-15 HP (Spooky), \nwith Dictionary and P/SR class: gain new Skill (one time)"],
		"163":["Melvil Dewey Would Be Ashamed","\nNecrotelicomnicon (spooky cookbook)","\nCookbook of the Damned (stinky cookbook)","\nSinful Desires (sleazy cookbook)","nothing (no adventure loss)"],

		// The Haunted Ballroom
		"90":["Curtains","\nwith bizarre illegible sheet music as DB: unlock Tango of Terror\nwith sheet music as AT: unlock Dirge of Dreadfulness\notherwise: Monster: Ghastly Organist","+(mainstat) Mox (max 150)","nothing (no adventure loss)"],
		//91-105 are the Louvre... can't really label those.
		"106":["Strung-Up Quartet","+5 ML","+5% Noncombat","+5% item drops","turn song off"],

		// The Haunted Bathroom
		"105":["Having a Medicine Ball","with antique hand mirror, +(mainstat*1.2) Mys (max 300)\notherwise +(mainstat) Mys (max 200)","Proceed to choice of Mus/Mys/Mox spleen items","(every five times until defeat) Monster: Guy Made of Bees"],
		"107":["Bad Medicine is What You Need","antique bottle of cough syrup (Mys spleen item)","tube of hair oil (Mox spleen item)","bottle of ultravitamins (Mus spleen item)","nothing (no adventure loss)"],
		"402":["Don't Hold a Grudge","+(2x mainstat?) Mus (max 125)","+(2-2.5x mainstat) myst (max 250)","+(2x mainstat?) Mox (max 125)"],

		// Sleazy Back Alley
		"21":["Under the Knife","Change gender of character","nothing",""],
		"108":["Aww, Craps","+4-5 Mox","randomly +31-40 meat and +6-8 Mox or -2 HP","randomly +41-49 meat. +6-8 Mox and Effect: Smugness or -ALL HP","nothing (no adv loss)"],
		"109":["Dumpster Diving","Monster: drunken half-orc hobo","+4-5 Mox and +3-4 meat","Mad Train wine"],
		"110":["The Entertainer","+4-5 Mox","+2-4 Mox and +2-4 Mus","+15 meat and sometimes +6-8 Mys","nothing (no adv loss)"],
		"112":["Please, Hammer","Harold's hammer head and Harold's hammer handle (start miniquest)","nothing (no adv loss)","+5-6 Mus"],
		
		// Outskirts of Cobb's Knob
		"111":["Malice in Chains","+4-5 Mus","randomly +6-8 Mus or -1-? HP","Monster: sleeping Knob Goblin Guard"],
		"113":["Knob Goblin BBQ","\nwithout unlit birthday cake: -2 HP\nwith unlit birthday cake: light cake and -2 HP", "Monster: Knob Goblin Barbecue Team", "randomly one of: bowl of cottage cheese,\nKnob Goblin pants, Knob Goblin tongs, or Kiss the Knob apron", ""],
		"118":["When Rocks Attack", "+30 meat", "nothing (no adv loss)", "", ""],
		"120":["Ennui is Wasted on the Young", "randomly +4-5 Mus and -2 HP \nor +7-8 Mus and Effect: Pumped Up", "\nice-cold Sir Schlitz", "\n+2-3 Mox and a lemon", "\nnothing (no adv loss)"],
		
		//Inside Cobb's Knob
		"522":["Welcome To The Footlocker","\nacquire a missing piece of the Elite Guard outfit\nor a Jelly Donut, if outfit is complete","nothing (no adv loss)"],
		
		// The Haunted Pantry
		"114":["The Baker's Dilemma", "unlit birthday cake (start miniquest)", "nothing (no adv loss)", "+4-5 Mox and +16-19 meat"],
		"115":["Oh No, Hobo","Monster: drunken half-orc hobo","\nwithout at least 6 meat: nothing\nwith at least 6 meat, -5 meat and Effect: Good Karma","+3-4 Mys, +3-4 Mox, and +5-10 meat",""],
		"116":["The Singing Tree", "\nwith at least 1 meat: +4-5 Mys and -1 meat\nwith no meat: nothing", "\nwith at least 1 meat: +4-5 Mox and -1 meat\nwith 0 meat: nothing", "with at least 1 meat, -1 meat and randomly one of:\nwhiskey and soda or +4-5 Mys and -2 HP or +7-8 Mys\nwith no meat: nothing", "nothing (no adv loss)"],
		"117":["Trespasser", "Monster: Knob Goblin Assistant Chef", "+6-8 Mys or +4 Mys and -2 HP", "Get 1-4 of:\nasparagus knife, chef's hat,\nmagicalness-in-a-can, razor-sharp can lid,\nor stalk of asparagus"],

		// The Hidden Temple
		"123":["At Least It's Not Full Of Trash","lose all HP","unlock Dvorak's Revenge adventure","lose all HP"],
		"125":["No Visible Means of Support","lose all HP","lose all HP","unlock the Hidden City"],

		// The Palindome
		"2":["Denim Axes Examined","with rubber axe: trade for denim axe \nwithout: nothing","nothing",""],
		"126":["Sun at Noon, Tan Us","+(mainstat) Mox (max 250)","+(1.5*mainstat) Mox (max 350) OR Effect: Sunburned","Effect: Sunburned"],
		"127":["No sir, away!","3 papayas","\nwith at least 3 papayas: +(mainstat) all stats (max 300), lose 3 papayas \nwithout: lose 60-68 HP","+(mainstat) all stats (max 100)"],
		"129":["Do Geese See God?","get photograph of God","nothing (no adv loss?)"],
		"130":["Rod Nevada, Vendor","get hard rock candy","nothing (no adv loss?)"],
		"131":["Dr. Awkward","Monster: Dr. Awkward","Monster: Dr. Awkward","Monster: Dr. Awkward"],
		"180":["A Pre-War Dresser Drawer, Pa!","with Torso Awaregness: Ye Olde Navy Fleece \nwithout: +200-300 meat","nothing (no adv loss)"],

		// The Arid, Extra-Dry Desert
		"132":["Let's Make a Deal!","broken carburetor","unlock An Oasis"],
		
		// Pyramid
		"134":["Wheel in the Pyramid,","move lower chamber","nothing (no adv loss)"],
		"135":["Wheel in the Pyramid,","move lower chamber","nothing (no adv loss)"],

		// The Hippy Camp
		"136":["Peace Wants Love","filthy corduroys","filthy knitted dread sack","+210-300 meat"],
		"137":["An Inconvenient Truth","filthy knitted dread sack","filthy corduroys","+207-296 meat"],
		"139":["Bait and Switch","+50 Mus","2-5 handfuls of ferret bait","Monster: War Hippy (space) cadet"],
		"140":["The Thin Tie-Dyed Line","2-5 water pipe bombs","+50 Mox","Monster: War Hippy drill sergeant"],
		"141":["Blockin' Out the Scenery","+50 Myst"," 2 of: \ncruelty-free wine, handful of walnuts, Genalen Bottle, mixed wildflower greens, thistle wine","nothing (put on your Frat Warrior outfit, doofus!)"],
		"142":["Blockin' Out the Scenery","+50 Myst"," 2 of: \ncruelty-free wine, handful of walnuts, Genalen Bottle, mixed wildflower greens, thistle wine","start the war"],

		// The Orcish Frat House
		"72":["Lording Over The Flies","trade flies for around the worlds","nothing",""],
		"138":["Purple Hazers","Orcish cargo shorts","Orcish baseball cap","homoerotic frat-paddle"],
		"143":["Catching Some Zetas","+50 Mus","6-7 sake bombers","Monster: War Pledge"],
		"144":["One Less Room Than In That Movie","+50 Mus","2-5 beer bombs","Monster: Frat Warrior drill sergeant"],
		"145":["Fratacombs","+50 Mus","2 of: brain-meltingly-hot chicken wings, frat brats, \nknob ka-bobs, can of Swiller, melted Jell-o shot","nothing (put on your War Hippy Outfit, doofus!)"],
		"146":["Fratacombs","+50 Mus","2 of: brain-meltingly-hot chicken wings, frat brats, \nknob ka-bobs, can of Swiller, melted Jell-o shot","start the war"],
		"181":["Chieftain of the Flies","trade flies for around the worlds","nothing"],

		// The Barn
		"147":["Cornered!","send ducks to the Granary (no element)","send ducks to the Bog (stench; weak vs cold, sleaze)","send ducks to the Pond (cold; weak vs. hot, spooky)\n(step 1 of the shortcut--USE CHAOS BUTTERFLY IN COMBAT)"],
		"148":["Cornered Again!","send ducks to the Back 40 (hot; weak vs. stench, sleaze)\n(step 2 of the shortcut--USE CHAOS BUTTERFLY IN COMBAT)","send ducks to the Family Plot (spooky; weak vs. hot, stench)"],
		"149":["How Many Corners Does this Stupid Barn Have!?","send ducks to the Shady Thicket (no element)","send ducks to the Other Back 40 (sleaze; weak vs cold, spooky)\nIf you've used a chaos butterfly in combat and done steps 1 and 2: \nhalve number of ducks in each area "],

		//The Fun House
		"151":["Adventurer, $1.99","\nwith at least 4 Clownosity: continue towards Beelzebozo \notherwise: take damage","nothing (no adventure loss)"],
		"152":["Lurking at the Threshold","Monster: Beelzebozo","nothing"],

		// The Defiled Alcove
		"153":["Turn Your Head and Coffin","+40-60 Mus","+200-300 meat","half-rotten brain","nothing (no adv loss)"],
		"154":["Doublewide","Monster: conjoined zmombie","nothing"],

		// The Defiled Nook
		"155":["Skull, Skull, Skull","\nnormally: +40-60 Mox\nin Zombie Slayer path: acquire talkative skull\n(if you don't already have one)","+200-300 meat","rusty bonesaw","debonair deboner","nothing (no adv loss)"],
		"156":["Pileup","Monster: giant skeelton","nothing"],

		// The Defiled Niche
		"157":["Urning Your Keep","+40-70 Mys","plus-sized phylactery (first time only)","+200-300 meat","nothing (no adv loss)"],
		"158":["Lich in the Niche","Monster: gargantulihc","nothing"],

		// The Defiled Cranny
		"159":["Go Slow Past the Drawers","+200-300 meat","+40-50 HP/MP, +20-30 Mus, Mys and Mox","can of Ghuol-B-Gone","nothing (no adv loss)"],
		"160":["Lunchtime","Monster: huge ghuol","nothing"],
		"523":["Death Rattlin'","+200-300 meat","+40-50 HP/MP, +20-30 Mus, Mys and Mox","can of Ghuol-B-Gone","Monster: swarm of ghuol whelps","nothing (no adv loss)"],
		
		// The Haert
		"527":["The Haert of darkness","Monster: Bonerdagon","nothing (no adv loss)"],

		// The Deep Fat Friars' Gate
		"161":["Bureaucracy of the Damned","\nwith Azazel's 3 items, gain Steel reward \nwithout: nothing","\nwith Azazel's three items, gain Steel reward \nwithout: nothing","\nwith Azazel's three items, gain Steel reward \nwithout: nothing","\nnothing (no adv loss)"],

		// The Goatlet
		"162":["Between a Rock and Some Other Rocks","in Mining gear: allow access to the Goatlet \notherwise, nothing","nothing (no adv loss)"],

		// The Stately Pleasure Dome
		"164":["Down by the Riverside",
			 "\n+(mainstat) Mus (max 150)",
			 "\n+80-100 MP and Effect: Spirit of Alph\n(step 1 of not-a-pipe (go to Mansion) or fancy ball mask (go to Windmill))",
			 "\nMonster: Roller-skating Muse"],
		"165":["Beyond Any Measure",
			 "\nwith Rat-Faced, Effect: Night Vision (step 2 of flask of amontillado (go to Mansion))\nwithout, nothing",
			 "\nwith Bats in the Belfry, Effect: Good with the Ladies (step 2 of Can-Can skirt (go to Windmill))\nwithout, nothing",
			 "\n+(mainstat) Myst (max 150)","nothing (no adventure loss)"],
		"166":["Death is a Boat",
			 "\nwith No Vertigo: S.T.L.T \nwithout: nothing",
			 "\n+(mainstat) Mox (max 150)",
			 "\nwith Unusual Fashion Sense: albatross necklace \nwithout: nothing"],
		
		// The Mouldering Mansion
		"167":["It's a Fixer-Upper",
			 "\nMonster: raven",
			 "\n+(mainstat) Myst (max 150)",
			 "\n+40-49 HP and MP, Effect: Bats in the Belfry\n(step 1 of S.T.L.T. (go to Windmill) or Can-Can skirt (go to Dome))"],
		"168":["Midst the Pallor of the Parlor",
			 "\n+(mainstat) Mox (max 150)",
			 "\nwith Spirit of Alph, Effect: Feelin' Philosophical (step 2 of not-a-pipe (go to Windmill)\nwithout, Monster: Black Cat",
			 "\nwith Rat-Faced, Effect: Unusual Fashion Sense (step 2 of albatross necklace (go to Dome))\nwithout, nothing"],
		"169":["A Few Chintz Curtains, Some Throw Pillows...",
			 "\nwith Night Vision: flask of Amontillado \nwithout: nothing",
			 "\n+(mainstat) Mus (max 150)",
			 "\nwith Dancing Prowess: fancy ball mask \nwithout: nothing"],

		// The Rogue Windmill
		"170":["La Vie Boheme",
			 "\n+80-100 HP and Effect: Rat-Faced\n(step 1 of flask of Amontillado (go to Dome) or albatross necklace (go to Mansion))",
			 "\nMonster: Sensitive poet-type",
			 "\n+(mainstat) Mox (max 150)"],
		"171":["Backstage at the Rogue Windmill",
			 "\nwith Bats in the Belfry, Effect: No Vertigo (step 2 of S.T.L.T (go to Dome))\nwithout, nothing",
			 "\n+(mainstat) Mus (max 150)",
			 "\nwith Spirit of Alph, Effect: Dancing Prowess (Step 2 of fancy ball mask (go to Mansion))\nwithout, nothing"],
		"172":["Up in the Hippo Room",
			 "\nwith Good with the Ladies, acquire Can-Can skirt \nwithout, Monster: Can-can dancer",
			 "\nwith Feelin' Philosophical, acquire not-a-pipe \nwithout, nothing",
			 "\n+(mainstat) Myst (max 150)"],

        //The Frat/Hippy Battlefield
        "173":["The Last Stand, Man","\nMonster: The Big Wisniewski\n(use flaregun in combat for Wossname)","\nMonster: The Man \n(use flaregun in combat for Wossname)"],
        "174":["The Last Stand, Bra","\nMonster: The Big Wisniewski\n(use flaregun in combat for ","\nMonster: The Man\n(use flaregun in combat for Wossname)"],

        //Black Forest
        "177":["The Blackberry Cobbler","acquire blackberry slippers","acquire blackberry moccasins","acquire blackberry combat boots","acquire blackberry galoshes","leave (no adv loss)\n(cobbler will not reappear for 30 turns)"],

		//The Penultimate Fantasy Airship
		"178":["Hammering the Armory","get bronze breastplate","nothing (no adv loss)"],
		"182":["Random Lack of an Encounter","with +20 ML or more: Monster: MagiMechTech MechaMech\notherwise: Monster: (a random airship monster that is not the Mech)","Penultimate Fantasy chest","+18-39 to all stats, lose 40-50 HP","model airship (quest item for giant castle)"],

		// Barrrney's Bar
		"184":["That Explains All The Eyepatches","\nMyst class: +(1-2x Myst) offstats (max 300), +(2-3x Myst) Myst (max 400), gain 3 drunkenness \notherwise: Monster: tipsy pirate","\nMoxie class: +(1-2x Mox) offstats (max 300), +(2-3x Mox) Mox (max 400), gain 3 drunkenness \notherwise, acquire shot of rotgut","\nMuscle class: +(1-2x Mus) offstats (max 300), +(2-3x Mus) Mus (max 400), gain 3 drunkenness \notherwise, acquire shot of rotgut"],
		"185":["Yes, You're a Rock Starrr","\n2-5 bottles of gin, rum, vodka, and/or whiskey","\n2-3 of grog, monkey wrench, redrum, rum and cola, spiced rum, strawberry daiquiri","\n+50-100 to each stat (scales with drunkenness) OR Monster: tetchy pirate (if at exactly 1 drunkenness)"],
		"186":["A Test of Testarrrsterone","\nMyst class: +(some) all stats (max 100)\notherwise: +(some) Mus and Mox (max 100)","+(some) all stats (max 300), gain 3 drunkenness","+(2x mainstat) Mox (max 150)"],
		"187":["Arrr You Man Enough?","Play Insult Beer Pong","nothing (no adv loss)"],
		"188":["The Infiltrationist","\nin frat outfit: Cap'm Caronch's dentures \notherwise -95-105 HP","\nin mullet wig and with briefcase: Cap'm Caronch's dentures \notherwise -95-105 HP","\nin frilly skirt and with 3 hot wings: Cap'm Caronch's dentures \notherwise -90-100 HP"],
		
		// The F'c'le
		"189":["O Cap'm, My Cap'm","gain stats or items from the Sea","nothing (no adv loss)","open Nemesis Lair area"],
		"191":["Chatterboxing","+~110 Mox","\nwith valuable trinket:\nbanish Chatty Pirate for 20 adventures (no adv loss)\nwithout: lose ~14 HP ","+~110 Mus","+~110 Myst, lose ~15 HP"],
		
		// Sewers
		"197":["Somewhat Higher and Mostly Dry","gain sewer exploration points","fight a sewer monster","increase sewer noncombat rate"],
		"198":["Disgustin' Junction","gain sewer exploration points","fight a sewer monster","improve sewer exploration point gain"],
		"199":["The Former or the Ladder","gain sewer exploration points","fight a sewer monster","with someone in cage: free them \nwith nobody in cage: waste a turn"],
		
		// Hobopolis
		"200":["Enter The Hoboverlord","Monster: Hodgman","nothing (no adv loss)"],
		"201":["Home in the Range","Monster: Ol' Scratch","nothing (no adv loss)"],
		"202":["Bumpity Bump Bump","Monster: Frosty","nothing (no adv loss)"],
		"203":["","Monster: Oscus","nothing (no adv loss)"],
		"204":["","Monster: Zombo","nothing (no adv loss)"],
		"205":["","Monster: Chester","nothing (no adv loss)"],
		"206":["Getting Tired","cause Tirevalanche (multikills hot hobos)","increase size of impending Tirevalanche","nothing (no adv loss)"],
		"207":["Hot Dog!","9000-11000 meat to your clan coffers OR a lot of hot damage","nothing (no adv loss)"],
		"208":["Ah, So That's Where They've All Gone","decrease stench level of the Heap","nothing (no adv loss)"],
        "211":["Despite All Your Rage","\nfree yourself","\nif a clanmate has freed you: leave cage (no adv loss)\notherwise, keep waiting"],
        "212":["Despite All Your Rage","\nfree yourself","\nif a clanmate has freed you: leave cage (no adv loss)\notherwise, keep waiting"],
		"213":["Piping Hot","decrease heat level of Burnbarrel Blvd","nothing (no adv loss)"],
		"214":["You vs. The Volcano","increase stench level of the Heap","nothing (no adv loss)"],
		"215":["Piping Cold","decrease heat level of Burnbarrel Blvd","reduce crowd size in PLD\n(makes it easier to get into the club)","increase cold level in Exposure Esplanade"],
		"216":["The Compostal Service","decrease spook level of the Burial Ground","nothing (no adv loss)"],
		"217":["There Goes Fritz!","multikill frozen hobos (repeatable)","multikill frozen hobos (repeatable)","multikill as many frozen hobos as possible (1 time only)"],
		"218":["I Refuse!","acquire 3 random items and set stench level to 0","set stench level to 0 (no adv loss?)"],
		"219":["The Furtivity of My City","monster: sleaze hobo","increase stench level of the Heap","4000-6000 meat to your clan coffers"],
		"220":["Returning to the Tomb","9000-11000 meat to your clan coffers","nothing (no adv loss)"],
		"221":["A Chiller Night","learn some dance moves","waste a turn","nothing (no adv loss)"],
		"222":["A Chiller Night","multikill zombie hobos","nothing (no adv loss)"],
		"223":["Getting Clubbed","if crowd level is low enough, Proceed to Exclusive! (fight, multikill, or stats) \notherwise: nothing","lower the crowd level","enable dancing in the Burial Ground"],
		"224":["Exclusive!","Monster: Sleaze Hobo","multikill 10% of remaining sleazy hobos","+(3x mainstat) all stats (max 1000)"],
		"225":["Attention -- A Tent!","with instrument and no other same-class player already there, get on stage to perform\n otherwise, nothing (no adv loss)","Proceed to Working the Crowd (view performance, multikill, or collect nickels)","nothing (no adv loss)"],
		"226":["Here You Are, Up On Stage","gauge the size of the crowd and assist with the multikill","screw up the run"],
		"227":["Working the Crowd","gauge the size of the crowd","multikill normal hobos","farm nickels","nothing (no adv loss)"],
		"231":["The Hobo Marketplace","Proceed to choice of (food/booze/a mugging)","Proceed to choice of ((hats/pants/accessories), (combat items/muggers/entertainment), or (valuable trinkets))","Proceed to choice of buffs/tattoo/muggers/MP restore"],
		"233":["Food Went A-Courtin'","Proceed to choice of Mus/Mys/Mox foods","Proceed to choice of Mus/Mys/Mox boozes","Monster: gang of hobo muggers"],
		"235":["Food, Glorious Food","Proceed to buy Muscle food","Proceed to buy Mysticality food","Proceed to buy Moxie food"],
        "237":["","eat a 5-full food (gain 60-80 adv, 200-400 Mus)","leave (no further turn loss)"],
        "238":["","eat a 5-full food (gain 60-80 adv, 200-400 Mys)","leave (no further turn loss)"],
        "239":["","eat a 5-full food (gain 60-80 adv, 200-400 Mox)","leave (no further turn loss)"],
		"240":["Booze, Glorious Booze","Proceed to buy Muscle booze","Proceed to buy Mysticality booze","Proceed to buy Moxie food"],
        "242":["","consume a 5-drunk drink (gain 40-60 adv, 500-1000 Mus)","leave (no further turn loss)"],
        "243":["","consume a 5-drunk drink (gain 40-60 adv, 500-1000 Mys)","leave (no further turn loss)"],
        "244":["","consume a 5-drunk drink (gain 40-60 adv, 500-1000 Mox)","leave (no further turn loss)"],
		"245":["Math Is Hard","Proceed to choice of (hats/pants/accessories)","Proceed to choice of (combat items/muggers/entertainment)","Proceed to choice of (valuable trinkets/nothing)"],
        "247":["","acquire 3 valuable trinkets","leave (no further turn loss)"],
		"248":["Garment District","Proceed to choice of (fedora/tophat/wide-brimmed hat)","Proceed to choice of (leggings/dungarees/suit-pants)","Proceed to choice of (shoes/stogie/soap)"],
        "250":["","acquire crumpled fedora","acquire battered old top hat","acquire shapeless wide-brimmed hat","leave (no further turn loss)"],
        "251":["","acquire mostly rat-hide leggings","acquire hobo dungarees","acquire old patched suit-pants","leave (no further turn loss)"],
        "252":["","acquire old soft shoes","acquire hobo stogie","acquire rope with some soap on it","leave (no further turn loss)"],
		"253":["Housewares","Proceed to choice of (hubcap/caltrop/6-pack of pain)","Monster: gang of hobo muggers","Proceed to choice of (music/pets/muggers)"],
        "255":["","acquire sharpened hubcap","acquire very large caltrop","acquire The Six-Pack of Pain","leave (no further turn loss)"],
		"256":["Entertainment","Proceed to buy instrument","Proceed to try for a hobo monkey","Monster: gang of hobo muggers"],
        "258":["\nacquire class-based instrument:\n SC: sealskin drum\nTT: washboard shield\nPM: spaghetti-box banjo\nS: marinara jug\nDB: makeshift castanets\nAT: left-handed melodica","leave (no further turn loss)"],
		"259":["We'll Make Great...","hobo monkey OR +200 to each stat OR Monster: muggers","hobo monkey OR +200 to each stat OR Monster: muggers","hobo monkey OR +200 to each stat OR Monster: muggers"],
        "261":["","acquire hobo monkey (familiar hatchling)","leave (no further turn loss)"],
		"262":["Salud","+50% spell damage, +50 spell damage, lose 30-50MP per combat (20 turns)","Proceed to choice of (tanning/paling)","Proceed to choice of (buffs/other buffs/tattoos etc.)"],
		"264":["Tanning Salon","+50% Moxie (20 turns)","+50% Mysticality (20 turns)"],
		"265":["Another Part of the Market","Proceed to choice of (spooky resistance/sleaze resistance)","Proceed to choice of (stench resistance/+50% Muscle)","Proceed to choice of (tattoo/muggers/MP restore)"],
		"267":["Let's All Go To The Movies","Superhuman Spooky Resistance (20 adv)","Superhuman Sleaze Resistance (20 adv)","nothing"],
		"268":["It's fun to stay there","Superhuman Stench resistance (20 adv)","+50% Muscle (20 adv)","nothing"],
		"269":["Body Modifications","Proceed to choice of (tattoo/nothing)","Monster: gang of hobo muggers","refill all MP and Buff: -100% Moxie, gain MP during combat (20 adv)"],
		"273":["The Frigid Air","frozen banquet","8000-12000 meat to your clan coffers","nothing (no adv loss)"],
        "275":["Triangle, Man","dinged-up triangle","leave (no further turn loss)"],
        "291":["","jar of squeeze","nothing"],
        "292":["","bowl of fishysoisse","nothing"],
        "293":["","deadly lampshade","nothing"],
        "294":["","lewd playing card","nothing"],
        "295":["","concentrated garbage juice","nothing"],
        "296":["","get out of now-closed instance of hobopolis"],


        // Arrrboretum
        "209":["Timbarrrr!","sack of Crotchety Pine saplings","sack of Saccharine Maple saplings","sack of Laughing Willow saplings"],
        
        // llama gong
		"276":["The Gong Has Been Bung","spend 3 turns at Roachform","spend 12 turns at Mt. Molehill","Form of...Bird! (15 adv)"],
		// Roachform
		"278":["Enter the Roach","+(mainstat) Mus (max 200)\n leads to choice of Mox/Mus/MP, then to Mus/allstat/itemdrop/ML buffs", "+(mainstat) myst (max 200)\n leads to choice of Mys/Mus/MP, then to Myst/allstat/itemdrop/ML buffs","+(mainstat) Mox (max 200)\n leads to choice of Mox/Mys/MP, then to Mox/allstat/itemdrop/ML buffs"],
		"279":["It's Nukyuhlur - the 'S' is Silent.","+(mainstat) Mox (max 200)\n leads to choice of +30% Mus/+10% all stats/+30 ML","+(mainstat) Mus (max 200)\n leads to choice of +30% Mus/+10% all stats/+50% item drops","+(mainstat) MP (max 200)\n leads to choice of +30% Mus/+50% item drops/+30 ML"],
		"280":["Eek!  Eek!","+(mainstat) myst (max 200)\n leads to choice of +30% Myst/+30 ML/+10% all stats","+(mainstat) Mus (max 200)\n leads to choice of +50% item drops/+10% all stats/+30% Myst","+(mainstat) MP (max 200)\n leads to choice of +30 ML/+30% Myst/+50% item drops"],
		"281":["A Meta-Metamorphosis","+(mainstat) Mox (max 200)\n leads to choice of +30 ML/+30% Mox/+10% all stats","+(mainstat) myst (max 200)\n leads to choice of +30 ML/+30% Mox/+50% item drops","+(mainstat) MP (max 200)\n leads to choice of +30% Mox/+10% all stats/+50% item drops"],
		"282":["You've Got Wings, But No Wingman","+30% Muscle (20 turns)","+10% all stats (20 turns)","+30 ML (20 turns)"],
		"283":["Time Enough At Last!","+30% Muscle (20 turns)","+10% all stats (20 turns)","+50% item drops (20 turns)"],
		"284":["Scavenger is your Middle Name","+30% Muscle (20 turns)","+50% item drops (20 turns)","+30 ML (20 turns)"],
		"285":["Bugging Out","+30% myst (20 turns)","+30 ML (20 turns)","+10% all stats (20 turns)"],
		"286":["A Sweeping Generalization","+50% item drops (20 turns)","+10% all stats (20 turns)","+30% myst (20 turns)"],
		"287":["In the Frigid Aire","+30 ML (20 turns)","+30% myst (20 turns)","+50% item drops (20 turns)"],
		"288":["Our House","+30 ML (20 turns)","+30% Moxie (20 turns)","+10% all stats (20 turns)"],	
		"289":["Workin' For the Man","+30 ML (20 turns)","+30% Moxie (20 turns)","+50% item drops (20 turns)"],	
		"290":["The World's Not Fair","+30% Moxie (20 turns)","+10% all stats (20 turns)","+50% item drops (20 turns)"],
		
		//Haiku Dungeon
		"297":["Gravy Fairy Ring","2-3 of Knob, Knoll, and/or spooky mushroom","fairy gravy boat","nothing (no adv loss)"],
		
		//underwater
		"298":["In the Shade","\nwith soggy seed packet and glob of green slime: \nacquire 2 of sea avocado, sea carrot, sea cucumber, sea honeydew, sea lychee, or sea tangelo\nwithout: nothing","nothing (no adv loss)"],
		"299":["Down at the Hatch","first time: free Big Brother\nafterward: upgrade monsters in the Wreck for 20 turns","nothing (no adv loss)"],
        "302":["","acquire bubbling tempura batter, learn skill: Tempuramancy"],
        "303":["","acquire globe of Deep Sauce, learn skill: Deep Saucery"],
		"304":["A Vent Horizon","first 3 times: summon bubbling tempura batter","nothing (no adv loss)"],
		"305":["There is Sauce at the Bottom of the Ocean","with Mer-kin pressureglobe, first 3 times: acquire globe of Deep Sauce\n without: nothing (no adv loss)","nothing (no adv loss)"],
        "306":["Not a Micro Fish","learn skill: Harpoon! (if SC) or Summon Leviatuga (if TT)"],
        "307":["Ode to the Sea","acquire item: seaode, learn skill: Salacious Cocktailcrafting"],
        "308":["Boxing the Juke","acquire skill: Donho's Bubbly Ballad"],
		"309":["Barback","first 3 times: acquire Seaode","nothing (no adv loss)"],
        "310":["The Economist of Scales","rough fish scale","pristine fish scale","leave (no adv loss)"],
		"311":["Heavily Invested in Pun Futures","Proceed to trade dull/rough fish scales","nothing (no adv loss)"],
        "312":["Into the Outpost","\nif lockkey dropped from mer-kin burglar: possible stashbox","\nif lockkey dropped from mer-kin warrior: possible stashbox","\nif lockkey dropped from mer-kin healer: possible stashbox","nothing (no adv loss)"],
		"403":["Picking Sides","skate blade (allows fighting ice skates)","brand new key (allows fighting roller skates)"],
		
        //317-345 covers a bunch of single-option turtle-taming adventures which don't really need spoiling.
        //
		//slimetube
		"326":["Showdown","Monster: Mother Slime","nothing (no adv loss)"],
		"337":["Engulfed!","\nfirst time: enable an equipment-sliming\nafterward: nothing (no adv loss)","\nfirst time (and only 5 times per tube, total): increase tube ML by 20\nafterward: nothing (no adv loss)","nothing (no adv loss)"],
		
		//agua bottle
		"349":["The Primordial Directive","after using memory of some delicious amino acids: progress to fight monsters\nbefore: nothing","+10 Mox","without memory of some delicious amino acids: acquire memory of some delicious etc.\nwith: nothing"],
		"350":["Soupercharged","Monster: Cyrus","nothing"],
		"352":["Savior Faire","+25 Mox","+25 Mus","+25 Myst"],
		"353":["Bad Reception Down Here","Indigo Party Invitation (leads to Moxie choices)","Violet Hunt Invitation (leads to stat/fam wt choices)"],
		"354":["","+some Mox (max 200?)","+15% Moxie (20 turns)"],
		"355":["","+some mus, myst, and mox (max ???)","+4 lb familiar weight (20 turns)"],
		"356":["A Diseased Procurer","Blue Milk Club Card (leads to stats/item drop buff)","Mecha Mayhem Club Card (leads to Muscle choices)"],
		"357":["Painful, Circuitous Logic","+some Mus (max 200?)","+15% Muscle (20 turns)"],
		"358":["Brings All the Boys to the Blue Yard","+some Mus, Myst, Mox (max 200 each)","+20% item drops (20 turns)"],
		"361":["Give it a Shot","'Smuggler Shot First' button (leads to Myst choices)","Spacefleet Communicator Badge (leads to stats/meat drop buff)"],
		"362":["A Bridge Too Far","+some mus, myst, and mox (max 200?)","+35% meat drops (20 turns)"],
		"363":["","+some Myst (max 200?)","+15% Myst (20 turns)"],
		"364":["","+some Mox (max 200?)","Supreme Being Glossary (advance quest state)","+some Mus (max 200?)"],
		"365":["None Shall Pass","-30 meat, +50 Mus","-60 meat, multi-pass (advance quest state)","nothing (no adv loss??)"],
		"392":["The Elements of Surprise...","\nCorrect order is: Sleaze/Spooky/Stench/Cold/Hot"],
		
		//marbles
		"393":["The Collector","lose 1 of each marble, gain 32768 meat, qualify for trophy","nothing"],
		
		//Down the rabbit hole
		"441":["The Mad Tea Party","\nacquire a buff based on your hat name","nothing"],
		"442":["A Moment of Reflection",
			"\nas Seal Clubber: Walrus Ice Cream or yellow matter custard\nas Pastamancer: eggman noodles or yellow matter custard\notherwise: yellow matter custard",
			"\nas Sauceror: vial of jus de larmes or delicious comfit\nas Accordion Thief: missing wine or delicious comfit\notherwise: delicious comfit",
			"\nas Disco Bandit: Lobster qua Grill or monster: croqueteer\nas Turtle Tamer: beautiful soup or monster: croqueteer\notherwise: monster: croqueteer",
			"\nwith beautiful soup, lobster qua grill, missing wine, walrus ice cream, and humpty dumplings:\nacquire ittah bittah hookah\n(if you already have an ittah bittah hookah: 20 turns of a random effect)\nwithout all 5 courses: nothing",
			"\nplay a chess puzzle",
			"\nnothing"],
			//Seal Clubber
		"444":["The Field of Strawberries","walrus ice cream","yellow matter custard"],
			//Pastamancer
		"445":["The Field of Strawberries","eggman noodles","yellow matter custard"],
			//Accordion Thief
		"446":["A Caucus Racetrack","missing wine","delicious comfit"],
			//Sauceror
		"447":["A Caucus Racetrack","vial of jus de larmes","delicious comfit"],
			//Turtle Tamer
		"448":["The Croquet Grounds","beautiful soup","monster: croqueteer"],
			//Disco Bandit
		"449":["The Croquet Grounds","Lobster qua Grill","monster: croqueteer"],
		"450":["The Duchess' Cottage",
			"\nwith beautiful soup, lobster qua grill, missing wine, walrus ice cream, and humpty dumplings: \nacquire ittah bittah hookah\n(if you already have an ittah bittah hookah: 20 turns of a random effect)\nwithout all 5 courses: nothing",
			"nothing"],
			
		//Enormous > sign
		"451":["Typographical Clutter","acquire (","lose 30 meat, +10-15 Mox\nOR\ngain 500 meat, +10-15 Mox","acquire + (first time) or +10-15 Mus","+10-15 myst, +100 MP","teleportitis (5 turns)"],
			
		//Professor Jacking
		"452":["Leave a message and I'll call you back","\nwith raisin in machine: kill spider\nwithout: lose (all?) HP",
													  "\nif spider alive: tiny fly glasses\nif spider dead: Flyest of Shirts (if torso-aware)/nothing",
													  "\nif fruit in machine: 3 fruit\notherwise nothing"],
		"453":["Getting a leg up","Monster: jungle scabie","gain 30-40 mus, mys, and mox","acquire hair of the calf"],
		"454":["Just Like the Ocean Under the Moon","Monster: smooth jazz scabie","gain 90-100 HP and 90-100 MP"],
		"455":["Double Trouble in the Stubble","gain 50-60 mus, mys, and mox","\nwith can-you-dig-it:acquire legendary beat\nwithout: lose (lots of) HP"],
		"456":["Made it, Ma!  Top of the world!","Monster: The Whole Kingdom","effect: Hurricane Force","acquire a dance upon the palate (first time only)","gain 31-40 mus, mys, and mox"],
		
											
		//Kegger in the woods
		"457":["Oh no!  Five-Oh!","\nClose area and receive reward:\n<10 numbers: Bronze Handcuffs\n10-19: cuffs, Silver Keg\n20+:cuffs, keg, bottle of GoldSchnockered","nothing (keep area open)"],
		
		//New tavern
		"496":["Crate Expectations","acquire 3 base boozes","clear square (no adv loss)"],
		"511":["If it's tiny, is it still a mansion?","Monster: Baron von Ratsworth","nothing (no adv loss)"],
		"512":["Hot and Cold Running Rats","monster: drunken rat","nothing (no adv loss)"],
		"513":["Staring Down the Barrel","3-5 ice-cold willers","clear square (no adv loss)"],
		"514":["1984 Had Nothing On This Cellar","3-5 rat whiskers or smiling rat familiar","clear square (no adv loss)"],
		"515":["A Rat's Home...","3 bottles of tequila","clear square (no adv loss)"],
		
		//Lab
		"516":["Mr. Alarm, I Presarm","unlock Whitey's Grove, continue quest"],
		//Neckback Crick
		"497":["SHAFT!","Monster: unearthed monstrosity","nothing"],
		
		// vamp out
//		"546":["Interview with You","","","","nothing (no turn loss)"],
		
		// haunted sorority house
		"548":["Necbromancer","monster: Necbromancer","nothing (no adventure loss)"],
		"549":["Dark in the attic",
				"\n3 haunted house sorority staff guides (first time only)\notherwise no turn loss",
				"\nGhost trap",
				"\nIncrease ML",
				"\nDecrease ML",
				"\nWith silver shotgun shell: clear many werewolves\nwithout: nothing"],
		"550":["The Unliving room",
				"\nIncrease ML",
				"\nDecrease ML",
				"\nWith chainsaw chain:clear many zombies\nwithout: nothing",
				"\nWith funhouse mirror:clear many skeletons\nwithout: nothing",
				"\nitem of haunted sorority makeup"],
		"551":["Debasement",
				"\nProceed to choice of chainsaw chain/silver shotgun shell/funhouse mirror",
				"\nWith plastic vampire fangs:clear many vampires (one time only)\nwithout:nothing",
				"\nIncrease ML",
				"\nDecrease ML"],
		"552":["Prop Deportment",
				"Chainsaw chain",
				"Proceed to Reloading Bench (silver shotgun shell)",
				"Funhouse mirror"],
		"553":["Relocked and reloaded",
				"Silver shotgun shell",
				"Silver shotgun shell",
				"Silver shotgun shell",		
				"Silver shotgun shell",
				"Silver shotgun shell",
				"Nothing"],
		"554":["Behind the spooky curtain",
				"\nProceed to choice of staff guides/ghost trap/ML/werewolf-slaying",
				"\nProceed to choice of ML/zombie-slaying/skeleton-slaying/random make-up item",
				"\nProceed to choice of (chainsaw chain/shotgun shell/funhouse mirror)/vampire-slaying/ML"],
		
		// Kloop:
		"560":["Foreshadowing Demon!","\nEnables choice of Thorax/Bat-in-Spats adventure","nothing (no adv loss)"],
		"561":["You must choose your destruction!","\nEnable fight with Thorax","\nEnable fight with Bat-in-Spats"],
		"563":["A test of your mettle","\nProceed to choice of Thorax or Bat-in-Spats","\nnothing (no adv loss)"],
		"564":["A maelstrom of trouble","\nEnable option to fight boss demons (Pinch or Thugs)","\nnothing (no adv loss)"],
		"565":["To get groped or get mugged?","\nMonster: The Terrible Pinch","\nMonster: Thug 1 and Thug 2"],
		"566":["A choice to be made","\nProceed to choice of The Terrible Pinch or Thugs 1 and 2","\nnothing (no adv loss)"],
		"567":["You may be on thin ice","\nenable option to fight boss demons (Mammon or Snitch)","nothing (no adv loss)"],
		"568":["Some Sounds Most Unnerving","\nMonster: Mammon the Elephant","\nMonster: The Large-Bellied Snitch"],
		"569":["One More demon to slay","\nProceed to choice of Mammon or Snitch","\nnothing (no turn loss)"],
			
		// New hidden temple!
		"581":["Such Great Depths","acquire glowing fungus","effect: Hidden Power (+15 all stats)","Monster: clan of cave bars"],
		"582":["Fitting In","\nProceed to choice of Mys gain/Hidden City Unlock item/buff extension + 3 turns",
				"\nProceed to Hidden Heart of the Hidden Temple\n(Hidden City unlock path)",
				"\nProceed to choice of (glowing fungus/buff/fight clan of cave bars)"],
		"579":["Such Great Heights",
				"\n+(some) Mys","acquire The Nostril of the Serpent\n(first time only)","+3 Adv, +3 turns of effects (first time only)"],
//		can't do 580 directly, it's a multi-part choice.  bah.
//		"580":["Hidden Heart (pikachu)",
//				"unlock hidden city",
//				"\nwith Nostril of the Serpent: Unconfusing buttons\nwithout: Confusing buttons",
//				"+(some) Moxie, effect: somewhat poisoned"],
		"584":["Unconfusing Buttons",
				"set Hidden Heart adv to Stone (mus/buttons/moxie",
				"set Hidden Heart adv to sun (calendar fragment/buttons/moxie",
				"set hidden heart adv to gargoyle (+MP/buttons/moxie",
				"set hidden heart adv to Pikachulotl (hidden city unlock/buttons/moxie"],

		//Twin Peak
		"605":["Welcome to the Great Overlook Lodge","/nstart the quest process"],
		"606":["Lost in the Great Overlook Lodge",
			"\nproceed to Room 237 (need at least 4 levels of stench resistance)",
			"\nproceed to Go Check It Out! (need at least +50% item drop (not including your familiar)",
			"\nproceed to There's Always Music In the Air (need jar of oil (made from drops at Oil Peak)",
			"\nproceed to To Catch a Killer (need at least +40% combat initiative)",
			"\nnothing (no turn loss?)"],
		"607":["Room 237","\n with 4 or more levels of stench resistance: advance quest status\nwithout: nothing",
			"\nnothing"],
		"608":["Go Check It Out!","\nwith at least +50% item drop: advance quest status\nwithout: nothing",
			"\nnothing"],
		"609":["There's Always Music in the Air","\nwith jar of oil: advance quest status\nwithout: nothing",
			"\nnothing"],
		"610":["To Catch a Killer","\nwith at least +40% combat init: complete this zone\nwithout: nothing",
			"\nnothing"],
		"616":["He Is the Arm, and He Sounds Like This","\nadvance quest status"],
		"617":["Now It's Dark","\ncomplete the zone (receive gold wedding ring)"],
		"618":["Cabin Fever","\nkeep zone open","\ncomplete the zone (no gold wedding ring)"],

		//A-Boo Peak:
		"611":["The Horror...","take increasing Cold & spooky damage, advance zone completion percentage",
			"\nleave (no damage, no advancement)"],
		
		//multi-using skeletons
		"603":["Skeletons and The Closet",
			"\nacquire effect: Skeletal Warrior, 30 turns (delevel, physical damage)",
			"\nacquire effect: Skeletal Cleric, 30 turns (hot damage, restore HP)",
			"\nacquire effect: Skeletal Wizard, 30 turns (cold damage, restore MP)",
			"\nacquire effect: Skeletal Rogue, 30 turns (first-round physical damage, bonus meat drop)",
			"\nacquire effect: Skeletal Buddy, 30 turns (+2 stats/fight, delevel enemy defense each round)",
			"\ndo nothing (cancel using the skeleton)\n\nnote that acquiring multiple effects simultanously gives additional bonuses\n"
			],

		//mimes?
		"612":["Behind the world there is a door...","\nProceed to Behind The Door There is a Fog","\nleave (no adv loss)"],
		"613":["Behind the door there is a fog",
			"\nsee part of a message",
			"\nMonster: 4-shadowed mime",
			"\nproceed to anvil (choice of soul fragment smithings)",
			"\nwith soul coin: acquire class-based skill recording\nwithout: nothing (turn is lost)"],
		"614":["Near the fog there is an... anvil?",
			"soul doorbell",
			"soul mask",
			"soul knife",
			"soul coin",
			"nothing",
			"nothing"],

		//Camp scouts
		"595":["Fire!  I... have made... Fire!",
			"+3 PvP fights (if hippy stone is already broken)",
			"regenerate 3-5 MP and 3-5 HP per combat"],

		//Gnome at Susie:
		"597":["",
			"\ngnome breathes underwater; reduce pressure penalty by 10%",
			"\ngnome blocks attacks",
			"\ngnome attacks in combat",
			"\ngnome grants adventures like a riftlet",
			"\ngnome delevels like a barrrnacle"],
	
		//Bugbear path
		"588":["Machines!",
			"\n(should be set to 2)",
			"\n(should be set to 4)",
			"\n(should be set to 8)"],
		"589":["Autopsy Auturvy",
			"\nwith tweezers: advance zone\nwithout: nothing",		
			"\nwith tweezers: advance zone\nwithout: nothing",		
			"\nwith tweezers: advance zone\nwithout: nothing",		
			"\nwith tweezers: advance zone\nwithout: nothing",		
			"\nwith tweezers: advance zone\nwithout: nothing",		
			"\nnothing"],
		"590":["Not Alone in the Dark",
			"\nfight Black Ops Bugbear, or nothing",
			"\nincrease fight chance when looking for a fight",
			"\nnothing (no adv loss)"],
		//Old Man's Bathtub
		"637":["First Mate set 1",
			"\nadd Bristled Man-o-War to available monsters",
			"\nblock the Deadly Hydra's crew-stealing (lose 3 crayons)",
			"\nlose 1 crew, gain 20-23 bubbles",
			"\nblock the giant man-eating shark's crew-stealing (lose 14-16 bubbles)"],
		"638":["First Mate set 2",
			"\nadd Deadly Hydra to available monsters",
			"\ngain 13-19 bubbles",
			"\nlose 1 crew, gain 4 bubbles",
			"\nblock the Fearsome Giant Squid's crew-stealing (lose 13-20 bubbles)"],
		"639":["First Mate set 3",
			"\nincrease frequency of log NCs from 1/5 to 1/4 (lose 8 crew, 2-3 crayons, 17-20 bubbles)",
			"\ngain 3 crayons",
			"\ngain 3 crayons and 16 bubbles (lose 2 crew)",
			"\ngain 5 crew (lose 6-16 bubbles, lose 2 crayons)"],
		"636":["First Mate set 4",
			"\nadd Cray-Kin to available monsters",
			"\ngain 3 crew (lose 8-10 bubbles)",
			"\ngain 2 crayons, 8-11 bubbles",
			"\nblock the Ferocious Roc's crew-stealing (lose 2 crayons)"],

        //crackpot mystic
        "641":["Stupid Pipes.","lose 250 HP (reduced by Hot Resist","acquire flickering pixel","leave (no adv loss?)"],
        "642":["You're Freaking Kidding Me","\nwith at least 100 in all stats: pass\notherwise: fail","acquire flickering pixel","leave (no adv loss?"],
        "643":["Great. A Stupid Door. What's Next?","Monster: Anger Man","nothing (no adv loss)"],
        "644":["Snakes","\nwith 50 or more Moxie: pass\nelse: fail","acquire flickering pixel","nothing (no adv loss?)"],
        "645":["So... Many... Skulls...","lose 250 HP (reduced by Spooky Resist","acquire flickering pixel","leave (no adv loss?)"],
        "646":["Oh No... A Door...","Monster: Fear Man","leave (no adv loss)"],
        "647":["A Stupid Dummy. Also, a Straw Man.","\nwith 100 or more weapon damage: pass\nelse: fail","acquire flickering pixel","leave (no adv loss?)"],
        "648":["Slings and Arrows","\nwith 100 or more HP: pass\nelse: fail","acquire flickering pixel","leave (no adv loss)"],
        "649":["A Door. Figures.","Monster: Doubt Man","leave (no adv loss)"],
        "650":["This Is Your Life.  Your Horrible, Horrible Life.","\nwith 100 or more MP: pass\nelse: fail","acquire flickering pixel","leave (no adv loss)"],
        "651":["The Wall of Wailing","with 10 (?) or more prismatic damage: pass\nelse: fail","acquire flickering pixel","leave (no adv loss)"],
        "652":["A Door. Too Soon...","Monster: Regret Man","leave (no adv loss)"],

		//Chinatown tenement
        "654":["Courier? I don't even...","Monster: Yakuza Courier"],
        "655":["They Have a Fight, Triangle Loses","acquire strange goggles"],
        "656":["Wheels Within Wheels","Monster: Chief Electronic Overseer"],
		"657":["You grind 16 rats, and Whaddya Get?",
			"\nwith 30 gold pieces: proceed to Debasement (no adv loss)\nwithout: nothing (no adv loss",
			"\nnothing (no adv loss)"],
		"658":["Debasement","\nMonster: The Server","\nleave (will need to re-acquire 30 gold pieces)"],
        //GameInform Magazine:
        //659-665 are generated per magazine use and have no set correct answer.

        //??
        "689":["The Final Reward","fat loot token"],
        "690":["The First Chest Isn't the Deepest.","item: ???","skip to room 8 (no adv loss)","nothing (no adv loss, progress to next room)"],
        "691":["Second Chest","item: ???","skip to room 13 (no adv loss)","nothing (no adv loss, progress to next room)"],
        "692":["A door","trigger trap","pass (no adv loss, 50% chance for key to break)","chance to pass (with no adv loss) or to trigger trap","pass if Mus is high enough","pass if Myst is high enough","pass if Mox is high enough","?","leave (no progress, no adv loss)"],
        "693":["It's Almost Certainly a Trap","\nwith appropriate resistance: 1/2 of Max HP in damage, +(some) stats (based on resistance level)\nwithout: Ow.","pass (no adv loss)","leave (no adv loss)"],

		//New giant castle
		"669":["The Fast and the Furry-ous","proceed to Out in the Open Source","gain ~210 Moxie","?","nothing (no adv loss?)"],
		"670":["You Don't Mess Around with Gym","\nfirst time: massive dumbbell\nafter: nothing (no adv loss)",
			"\nGain ~200 Muscle",
			"\nany 2 of: pec oil, Squat-Thrust Magazine, Giant Jar of Protein Powder",
			"\nwith amulet of plot significant equipped: unlock ground floor\nwithout: nothing (no adv loss)",
			"\nLeave (no adv loss)"],
		"671":["Out in the Open Source",
			"\nwith massive dumbbell: unlock ground floor\nwithout: nothing\nwith dumbbell and ground floor unlocked: snide message (no adv loss)",
			"Gain ~200 Mysticality",
			"O'RLY manual, open sauce",
			"Proceed to You Don't Mess Around with Gym"],
		"672":["There's No Ability Like Possibility","\nacquire 3 of:\ngiant heirloom grape tomato, open sauce, pec oil, probability potion,\nstolen sushi, worthless gewgaw, worthless knick-knack, worthless trinket, Ye Olde Meade",
			"\neffect: Nothing is Impossible (30 turns of +100% spell damage)",
			"Leave (no adv loss)"],
		"673":["Putting Off is Off-Putting","very overdue library book","effect: Trash-wrapped (30 turns of +10 DR)","nothing (no adv loss)"],
		"674":["Huzzah!","pewter claymore","\neffect: Pretending to Pretend (30 turns of +100% weapon damage","nothing (no adv loss)"],
		"675":["Melon Collie and the Infinite Lameness",
			"\nmonster: Goth Giant",
			"\nwith drum 'n' bass 'n' drum 'n' bass record: proceed to Chore Wheel\nwith record and Chore wheel done: waste turn\nwithout: ?",
			"3 thin black candles",
			"Proceed to Copper Feel\n(complete quest/open HitS/gear)"],
		"676":["Flavor of a Raver","Monster: Raver Giant","+1,000 MP, +1,000 HP",
			"\nfirst time: drum 'n' bass 'n' drum 'n' bass record\nafter: nothing (no adv loss)",
			"\nProceed to Yeah, You're for Me, Punk Rock Giant"],
		"677":["Copper Feel",
			"\nwith model airship: proceed to Chore Wheel\nwith model airship and Chore wheel done: waste turn\nwithout model airship: fight Steampunk Giant",
			"\nfirst time:steam-powered model rocketship (opens Hole in the Sky)\nafter: nothing (no adv loss)",
			"\nbrass gear",
			"\nProceed to Melon Collie and the Infinite Lameness\n(Goth Giant/complete quest/3 thin black candles)"],
		"678":["Yeah, You're For Me, Punk Rock Giant",
			"\nmonster: Punk Rock Giant","500-550 meat","Proceed to Copper Feel \n(complete quest/open HitS/fight Steampunk Giant)","Proceed to Flavor of a Raver \n(Raver Giant/+MP,HP/acquire quest item)"],
		"679":["Keep On Turnin' the Wheel in the Sky","\ncomplete giant trash quest"],
		"680":["Are You a Man or a Mouse?","proceed to Chore Wheel (complete giant trash quest)"],

        //the sea
        "396":["Woolly Scaly Bully","lose 200-300 HP","lose 200-300 HP","enable The Case of the Closet non-combat (sawdust)"],
        "397":["Bored Of Education","lose 200-300 HP","enable No Rest for the Room non-combat (cancersticks)","lose 200-300 HP"],
        "398":["A Mer-kin Graffiti","enable Raising Cane non-combat (wordquizzes)","lose 200-300 HP","lose 200-300 HP"],
        "399":["The Case of the Closet","fight Mer-kin monitor","acquire Mer-kin sawdust"],
        "400":["No Rest for the Room","fight Mer-kin teacher","acquire Mer-kin cancerstick"],
        "401":["Raising Cane","fight Mer-kin punisher","\nacquire first item that you don't have from Mer-kin facecowl, mer-kin waistrope, or mer-kin wordquiz\n(acquire 3 wordquizzes if you have a mer-kin bunwig in inventory)"],
        "403":["Picking Sides","skate blade","brand new key"],
        "701":["Ators gonna Ate","acquire one of:\nMer-kin dodgeball, Mer-kin dragnet, Mer-kin headguard, Mer-kin switchblade, Mer-Kin thighguard, or Mer-kin fastjuice\n(cannot receive equipment that you already have)","leave"],
        "705":["Halls Passing in the Night","fight mer-kin specter","acquire mer-kin sawdust","acquire mer-kin cancerstick","\nacquire first item that you don't have from mer-kin facecowl, mer-kin waistrope or mer-kin wordquiz\n (acquire 3 wordquizzes if you have mer-kin bunwig in inventory)"],

        //hacienda (AT volcano island)
        "409":["","proceed to A Short Hallway"],
        "410":["A Short Hallway","\nto left side (kitchen/bedroom/storeroom)\ngo this way if you've seen:\npotato peeler, empty sardine can, apple core, silver pepper-mill, lid from can of sterno,\nempty teacup, small crowbar,pair of needle-nose pliers, or empty rifle cartridge","\nto right side (bedroom/library/parlour)\ngo this way if you've seen:\nlong nightcap with pom-pom on the end, dirty sock, toothbrush, or errant cube of chalk from the pool table.\n(Go this way first to maximize odds of seeing useful clues.)"],
        "411":["Hallway Left","to Kitchen\ngo this way for: potato peeler, empty sardine can, apple core","to Dining Room\ngo this way for: silver pepper-mill, lid from a can of sterno, empty teacup","to Storeroom\ngo this way for: small crowbar, pair of needle-nose pliers, empty rifle cartridge","leave"],
        "412":["Hallway Right","to Bedroom\ngo this way if you've seen:\nlong nightcap with a pom-pom on the end, dirty sock, or toothbrush","to Library\n(no clues point here)","to Parlour\ngo this way if you've seen:\nerrant cube of chalk from the pool table","leave"],
        "413":["Kitchen","\nhacienda key (guaranteed if you've seen a potato peeler)\nOR fight sleepy mariachi OR silver cheese slicer","\nhacienda key (guaranteed if you've seen an empty sardine can) OR 5 taco shells OR (see a clue)","\nhacienda key (guaranteed if you've seen an apple core)\n OR fettucini Inconnu OR fight sleepy mariachi OR (see a clue)","leave"],
        "414":["Dining Room","\nhacienda key (guaranteed if you've seen a silver pepper mill)\nOR fight alert mariachi OR silver salt-shaker","\nhacienda key (guaranteed if you've seen a lid from a can of sterno)\nOR fight a mariachi OR 3 cans of sterno OR (see a clue)","\nhacienda key (guaranteed if you've seen an empty teacup)\nOR silver pate knife","leave"],
        "415":["Storeroom","hacienda key (guaranteed if you've seen a small crowbar)\nOR fight surprised mariachi OR fancy beef jerky OR (See a clue)","\nhacienda key (guaranteed if you've seen a pair of needle-nose pliers)\nOR fight surprised mariachi OR pipe wrench OR (see a clue)","\nhacienda key (guaranteed if you've seen an empty rifle cartridge)\nOR fight a mariachi OR gun cleaning kit","leave"],
        "416":["Bedroom","\nhacienda key (guaranteed if you've seen a long nightcamp with a pom-pom on the end\nOR fight alert mariachi OR sleep mask","\nhacienda key (guaranteed if you've seen a dirty sock)\nOR fight a mariachi OR sock garters OR (see a clue)","\nhacienda key (guaranteed if you've seen a toothbrush)\nOR fight a mariachi OR mariachi toothpaste","\nleave"],
        "417":["Library","\nfight surprised mariachi OR heavy leather-bound tome OR hacienda key OR (see a clue)","\nfight a mariachi OR 150-220 meat OR hacienda key OR (see a clue)","\nfight a mariachi OR leather bookmark OR hacienda key OR (see a clue)","leave (no adv loss)"],
        "418":["Parlour","hacienda key (guaranteed if you've seen an errant cube of chalk)\nOR fight a mariachi OR ivory cue ball OR (see a clue)","\nfight mariachi OR decanter of fine Scotch OR hacienda key OR (see a clue)","\nfight mariachi OR expensive cigar OR hacienda key","leave"],
        "440":["Puttin' on the Wax","record an album","leave (no adv loss)"],

        //Greatest American Pants
        "508":["Pants-Gazing","\n5 turns of Super Skill (combat skills/spells cost 0)","\n10 turns of Super Structure (+500 DA, +5 resistance to all elements)","\n20 turns of Super Vision (+20% item drop)","\n20 turns of Super Speed (+100% Moxie)","\n10 turns of Super Accuracy (+30% chance of critical hit)","nothing (no charge expended)"],

        //SSPD tattoos
        "521":["A Wicked Buzz","increase SSPD tattoo completion"],
        //puzzle box
        "525":["","nothing","nothing","nothing","nothing","nothing","nothing","exit"],

        //clan VIP pool
        "585":["Screwing Around!",""],

        //snow suit
        "640":["Tailor the Snow Suit","fam attacks 80% for 3-12 (physical)","fam attacks 100% for 1-10 (cold)","\n+10% item drops, 10% chance to drop carrot (up to 3x/day)","restore 1-20 HP/combat","restore 1-10 MP/combat"],
        
        //Degueulasse Marais
        "696":["Stick a Fork In It","\nOpen the Dark and Spooky Swamp","\nOpen the Wildlife Sanctuarrrrrrgh"],
        "697":["Sophie's Choice","\nOpen the Corpse Bog","\nOpen the Ruined Wizard Tower"],
        "698":["From Bad to Worst","Open Swamp Beaver Territory","Open the Weird Swamp Village"],

        //KOLHS
        "700":["Delirium in the Cafeterium","\nwith Jamming with the Jocks intrinsic: gain (10-30?) Mus, Mys, and Mox\nwithout: lose (5-20?) HP","\nwith Nerd is the Word intrinsic: gain (10-30?) Mus, Mys, and Mox\nwithout: lose (5-20?) HP","with Greaser Lightnin' intrinsic: gain (10-30?) Mus, Mys, and Mox\nwithout: lose (5-20?) HP"],
        "772":["Saved by the Bell","effect: School Spirited","effect: Poetically Licensed","Yearbook Club Camera, monster photo assignment","effect: Cut But Not Dried","effect: Isskay like an Ashtray","craft items with drops from Chemistry class","craft items with drops from Art Class","craft items with drops from Shop Class","Leave (no adv loss)"],

        //Friar
        "720":["The Florist Friar","","","","","","","","","",""],
        //Dreadsylvania
        "721":["The Cabin in the Dreadsylvanian woods","to kitchen\n(dread tarragon/grind old dry bone/banish stench monsters)","to basement\n(kruegerrands/+spooky dmg buff/Auditor's badge/lock impression","to attic\n(musicbox parts/lower werewolves/lower vampires/gain mox)","?","mark on your map permanently","leave (no adv loss?)"],
        "722":["The Kitchen in the woods","acquire dread tarragon","\nas muscle class with old dry bone: grind it into bone flour\notherwise: nothing (keep choosing)","banish stench monsters","leave (back to cabin)"],
        "723":["What Lies Beneath (the cabin)","5-7 Kruegerrands (1st 10 players/instance) or nothing (keep going)","effect: bored stiff (+100 spooky damage)","\nwith replica key: Auditor's Badge (only 1 badge per instance)\notherwise nothing","complicated lock impression","?","leave (back to cabin)"],
        "724":["Where It's Attic","\nas AT: acquire intricate music box parts","lower werewolves in forest","lower vampires in the castle","gain (some) moxie"],
        "725":["The Tallest Tree in the Forest","\nAs Muscle class: to Top of the tree (shake down fruit/banish sleaze monsters/moon amber)\nelse unable to proceed","\nto fire tower (lower ghosts in village/kruegerrands/gain (some) muscle)","to base (wait for shaken fruit/acquire seed pod)","?","mark on your map permanently","leave (no adv loss)"],
        "726":["Top of the Tree, Ma!","\nshake down fruit to a waiting clanmate","banish sleaze monsters from forest","moon-amber (only 1 piece per instance)","leave (back to tallest tree)"],
        "727":["All Along the Watchtower","\nlower ghosts in village","7-11 Kruegerrands (1st 10 players/instance) or nothing (keep going)","gain (some) Muscle","?","??","leave (back to tallest tree)"],
        "728":["Treebasing","\nreceive shaken fruit (when clanmate shakes it down)","Dreadsylvanian seed pod","folder (owl)","?","?","leave (back to tallest tree)"],
        "729":["Below the Roots","\nto Hot Coals (banish hot monsters/+hot damage buff/cool iron ingot)","\nto Heart of the Matter (banish cold monsters/gain myst/+maxHP & HPRegen buff)","\nto Once Midden Twice Shy (lower bugbears/kruegerrands)","?","mark on your map permanently","leave (no adv loss)"],
        "730":["Hot Coals","banish hot monsters from forest","effect: Dragged through the coals (+100 hot damage, 100 turns)","convert old ball and chain into cool iron ingot","leave (back to Below the Roots)"],
        "731":["The Heart of the Matter","banish cold monsters from forest","gain (some) Myst","effect: Nature's Bounty (+300 MaxHP, +0-180 HPRegen) (100 turns)","leave (back to Below the Roots)"],
        "732":["Once Midden, Twice Shy","lower bugbears in forest","5-6 Kruegerrands (1st 10 players per instance only) or nothing (keep going)","?","??","???","leave (back to Below the Roots)"],
        "733":["Dreadsylvanian Village Square","to schoolhouse (lower ghosts in village/ghost pencil/gain myst)","to blacksmith (banish cold monsters/kruegerrands)","to gallows (banish spooky monsters from village/dreadsylvanian clockwork key)","?","mark on your map permanently","leave (no adv loss)"],
        "734":["Fright School","lower ghosts in village","\nghost pencil (1st 10 players per instance only) or nothing (keep going)","gain (some) Myst","?","??","leave (back to village square)"],
        "735":["Smith, Black as Night","banish hot monsters from village","5-6 Kruegerrands","to anvil (?/?/?)","?","?","leave (back to village square)"],
        "736":["Gallows","banish spooky monsters from village","\nwait to acquire (hangman's hood/cursed ring finger ring/dreadsylvanian clockwork key)","wait here for another clanmate","drop clanmate (so they acquire item)","leave (back to village square)"],
        "737":["The Even More Dreadful Part of Town","\nto sewers (banish stench monsters from village/effect:+stench damage)","\nto tenements (reduce skeletons in castle/banish sleaze monsters from village/gain muscle)","\nas Moxie class: to shack (kruegerrands/replica key/polished moon-amber/mechanical songbird/lengths of old fuse)\notherwise nothing (stay in this choice)","?","mark on your map permanently","Leave (no adv loss)"],
        "738":["A Dreadful Smell","banish stench monsters from village","effect: Sewer-drenched (+100 stench damage) (100 turns)","?","??","???","leave (back to tenements)"],
        "739":["The Tinker's. Damn.","5-6 kruegerrands","replica key","polished moon-amber","unwound mechanical songbird","3 lengths of old fuse","leave (back to tenements)"],
        "740":["Eight,Nine, Tenement","lower skeletons in castle","banish sleaze monsters in village","gain (some) Muscle","?","??","leave (back to tenements)"],
        "741":["The Old Duke's Estate","\nTo family plot (lower zombies/kruegerrands/effect:sleaze damage)","to servant quarters (banish hot monsters/gain mox)","to bedroom (lower werewolves in woods/eau de mort/???)","?","mark on your map permanently","leave (no adv loss)"],
        "742":["The Plot Thickens","lower zombies in village","5-6 Kruegerrands","\neffect: Fifty Ways to Bereave Your Lover (+100 Sleaze damage) (100 turns)","?","??","leave (back to duke's estate)"],
        "743":["No Quarter","banish hot monsters from village","gain (some) moxie","?","??","???","leave (back to duke's estate)"],
        "744":["The Master Suite","lower werewolves in forest","eau de mort","\nwith 10 ghost threads: make ghost shawl\notherwise nothing (keep going)","?","?","leave (back to duke's estate)"],
        "745":["This hall is really great","To ballroom (lower vampires/gain moxie)","to kitchen (banish cold monsters/effect: +100 cold damage)","To dining room (dreadful roast/banish stench monsters/wax banana)","?","mark on your map permanently","leave (no adv loss)"],
        "746":["The Belle of the Ballroom","lower vampires in castle","gain (some) Moxie","","","","leave (back to Hall)"],
        "747":["Cold Storage","banish cold monsters from castle","effect: Staying Frosty (+100 cold damage) (100 turns)","?","??","???","Leave (back to Hall)"],
        "748":["Dining In (The Castle)","dreadful roast","banish stench monsters in castle","wax banana (1 per instance only)","","","Leave (back to Hall)"],
        "749":["tower most tall","\nto lab (reduce bugbears in woods/reduce zombies in village/The Machine)","\nTo Library (reduce skeletons in castle/gain myst/recipe for moon-amber necklace)","\nTo bedroom (banish sleaze monsters from castle/krueggerands/effect:+MaxMP&MPregen)","?","mark on your map permanently","leave (no adv loss)"],
        "750":["working in the lab, late one night","lower bugbears in forest","lower zombies in village","\nto The Machine (learn new skill)\n (2 clanmates required)\n (must be unlocked with Skull Capacitor)","bloody kiwitini","","leave (back to Tower)"],
        "751":["Among the Quaint and Curious Tomes","reduce skeletons in castle","gain (some) Myst","learn recipe for moon-amber necklace","","","leave (back to Tower)"],
        "752":["In the Boudoir","banish sleaze monster from castle","5-6 Krueggerands","effect: Magically Fingered (+150 MaxHP, +50 MP Regen) (100 turns)","","","leave (back to Tower)"],
        "753":["The Dungeons","\nTo cell block (banish spooky monsters from castle/gain Musc/restore MP)","\nTo boiler room (banish hot monsters from castle/kruegerrands/gain Mus+Mys+Mox)","\nTo guardroom (agaricus/effect:spore-wreathed)","?","mark on your map permanently","leave (no adv loss)"],
        "754":["Live from Dungeon Prison","banish spooky monsters from castle","gain (some) Musc","restore (some) MP","?","??","leave (back to dungeon)"],
        "755":["The Hot Bowels","banish hot monsters from castle","5-6 krueggerands","gain (some) Mus + Mys + Mox","?","??","leave (back to dungeon)"],
        "756":["Among the Fungus","stinking agaricus","effect: spore-wreathed (reduce enemy defense by 20%) (100 turns)","?","??","???","leave (back to dungeon)"],
        "758":["End of the Path","monster: Falls-From-Sky OR Great Wolf of the Air","leave (no adv loss)"],
        "759":["You're about to fight city hall","monster: Mayor Ghost OR Zombie Homeowners Association","leave (no adv loss)"],
        "760":["Holding Court","monster: Count Drunkula OR The Unkillable Skeleton","leave (no adv loss)"],
        "761":["Staring Upwards...","\nreceive blood kiwi (after clanmate shakes it down) or keep waiting for the shake","leave (back to Base of Tree)"],
        "762":["Try New Extra-Strength Anvil","cooling iron helmet","cooling iron breastplate","cooling iron greaves","4","5","leave (no adv loss?)"],
        "764":["The Machine","help someone get a skill","help someone get a skill","wait to get a skill","keep waiting","Leave"],
        "765":["Hello, Gallows","keep waiting","leave (back to Gallows choice)"],
        "771":["It Was All a Horrible, Horrible Dream","leave (no adv loss?)"],

        //Mini-Adventurer
        "768":["The Littlest Identity Crisis","\nL1: does physical damage\nL5:volleyball\nL10: does cold damage\nL15: removes debuffs","\nL1: volleyball\nL5: starfish\nL10: does physical damage, delevels\nL15: does spooky damage","\nL1:Potato (block attacks)\nL5: Ghuol Whelp\nL10: Leprechaun\nL15: does prismatic damage","\nL1: Leprechaun\nL5: does Hot/Cold damage\nL10: cold-aligned starfish\nL15: gives buffs at start of combat","\nL1:Delevels\nL5: fairy\nL10: steals HP\nL15: Does physical deleveling attacks","L1: gives buffs at start of combat\nL5: ghuol whelp\n:10: fairy\nL15: sombrero"],

        //tonic djinn
        "778":["If You Could Only See","(some) meat","(some) Mus","(some) Mys","(some) Mox","5","nothing (tonic djinn not consumed)"],

        //new hidden temple
        "780":["Action Elevator","\nwith Thrice-Cursed effect: monster: ancient protector spirit\nelse nothing (no adv loss)","increase your cursedness","\nbanish pygmy witch lawyers from office building","4","5","leave (no adv loss)"],
        "781":["Earthbound and down","open Hidden Apartment Building","receive stone triangle","3","4","5","leave (no adv loss)"],
        "783":["Water You Dune","open Hidden Hospital","receive stone triangle","3","4","5","leave (no adv loss)"],
        "784":["You, M.D.","monster: ancient protector spirit","2","3","4","5","leave (no adv loss)"],
        "785":["Air Apparent","open Hidden Office Building","receive stone triangle","3","4","5","leave (no adv loss)"],
        "786":["Working Holiday","\nwith complete McClusky file:monster: ancient protector spirit\nelse nothing","get paperclip to complete McClusky file","monster: pygmy witch accountant","4","5","leave (no adv loss)"],
        "787":["Fire When Ready","open Hidden Bowling Alley","receive stone triangle","3","4","5","leave (no adv loss)"],
        "788":["Life is Like A Cherry of Bowls","\n1st 4 times: progress\n5th time: monster: ancient protector spirit","2","3","4","5","leave (no adv loss)"],

        "789":["Where Does the Loan Ranger Take His Garbagester?","\nacquire 2 Hidden City monster-drop items","banish pygmy janitors","3","4","5","leave (no adv loss)"],
//        from: tongue depressor, bowling ball, short-handled mop,\nsurgical apron,pill cup, surgical mask,\bloodied surgical dungarees,colorful toad,pygmy briefs,\gold B.A. token, half-size scalpel, bone abacus, head mirror",

        "791":["Legend of the Temple in the Hidden City","\nwith 4 triangular pieces: fight boss\nwithout: nothing (no adv loss)","2","3","4","5","leave (no adv loss)"]

		
			
	};
	if (advOptions[advNumber] !== undefined) { return advOptions[advNumber]; }
	else { return null; }
}

function GetSpoilersForImageName(advNumber, imageName) {
	//data format: advOptions[adventureNumber][imageName] = array of strings.
	//array element 0 = optional ID text; 1-n = spoiler text.
	var advOptions = {
		"580":{
			"door_stone.gif":["",
				"+100 (?) Mus",
				"\nwith Nostril of the Serpent: choose door setting\nwithout: Confusing Buttons",
				"+(some) Moxie, effect: somewhat poisoned"],
			"door_sun.gif":["",
				"ancient calendar fragment",
				"\nwith Nostril of the Serpent: choose door setting\nwithout: Confusing Buttons",
				"+(some) Moxie, effect: somewhat poisoned"],
			"door_gargoyle.gif":["",
				"+(some) MP",
				"\nwith Nostril of the Serpent: choose door setting\nwithout: Confusing Buttons",
				"+(some) Moxie, effect: somewhat poisoned"],
			"door_pikachu.gif":["",
				"\nto Hidden City unlock (must have 3 turns left)",
				"\nwith Nostril of the Serpent: choose door setting\nwithout: Confusing Buttons",
				"+(some) Moxie, effect: somewhat poisoned"]
		},
		"535":{ 
			"rs_3doors.gif":["Anyway, somebody went through a lot",
				"to Pool (toward EMU parts or +mys buff or elfpacks)",
				"To Armory (toward EMU joystick/elfpacks or +mus/mox buffs)",
				"to Mess (toward effects or EMU rocket)"],
			"rs_junction.gif":["A blond-haired disembodied head",
				"to EMU joystick",
				"to elven packs",
				"back to Lobby"],
			"elf_headcrab.gif":["vast bank of television screens",
				"to EMU rocket thrusters",
				"effect: +5 myst substat/fight"],
			"elfscientist.gif":["could sure use those thrusters",
				"EMU rocket thrusters"],
			"elfdonfreeman.gif":["There are two joysticks on it",
				"EMU joystick"],
			"rs_portal.gif":["through into the shaft",
				"medi-pack and magi-pack"],
			"surv_overarmed.gif":["down the hallway to the armory",
				"to Lobby",
				"to Keycard",
				"to Romance (choice of buffs)"],
			"rs_2doors.gif":["sliding towards the male elf",
				"effect: +5 mus substat/fight",
				"effect: +5 mox substat/fight"],
			"surv_unlikely.gif":["You follow the signs to the Mess",
				"to Lobby",
				"to Romance (choice of buffs)",
				"to Headcrab (effect or EMU rocket thrusters)"],
			"rs_door.gif":["You follow the map to the secret bunker",
				"to Lobby"],
			"elfordbrimley.gif":["doesn't look swimmable",
				"to Lobby",
				"to Headcrab (Effect or EMU rocket thrusters)",
				"to Keycard"]
		}
	};
	if ((advOptions[advNumber] !== undefined) && (advOptions[advNumber][imageName] !== undefined)) {
		 return advOptions[advNumber][imageName]; 
	}
	else { return null; }
}

function GetSpoilersForBodyText(advNumber, URL, imageName, bodyText) {
	//data format:
	// advOption[adventureNumber][Url-or-imagename][sequencenumber] = array of strings.
	//array element 0 = required ID text (can be any part of HTML); 1-n = spoiler text.
	var i = 0, advOptions ={
    "0": {
        "/friars.php": {
            "0": [
                "Brother Flying Burrito, the Deep Fat Friar",
                "+30% food drops (20 adv)"
            ],
            "1": [
                "Brother Corsican, the Deep Fat Friar",
                "+2 familiar experience per combat (20 adv)"
            ],
            "2": [
                "Brother Smothers, the Deep Fat Friar",
                "+30% booze drops (20 adv)"
            ]
        },
        "/basement.php": {
            "0": [
                "twojackets",
                "+(mainstat) Mox",
                "+(mainstat) Mus"
            ],
            "1": [
                "twopills",
                "+(mainstat) Mus",
                "+(mainstat) Myst"
            ],
            "2": [
                "figurecard",
                "+(mainstat) Myst",
                "+(mainstat) Mox"
            ]
        },
        "/bigisland.php": {
            "0": [
                "Get Healed",
                "+1,000 HP"
            ],
            "1": [
                "Get a Massage",
                "+1,000 HP, +1,000 MP"
            ],
            "2": [
                "Party with the free spirits",
                "+5 stats per combat (20 adv)",
                "+20% item drops (20 adv)",
                "+5lb familiar weight (20 adv)"
            ],
            "3": [
                "Try to get into the music",
                "+10% all stats (20 adv)",
                "+40% meat drops (20 adv)",
                "+50% initiative (20 adv)"
            ]
        },
        "/postwarisland.php": {
            "0": [
                "Get Healed",
                "+1,000 HP"
            ],
            "1": [
                "Get a Massage",
                "+1,000 HP, +1,000 MP"
            ],
            "2": [
                "Party with the free spirits",
                "+5 stats per combat (20 adv)",
                "+20% item drops (20 adv)",
                "+5lb familiar weight (20 adv)"
            ],
            "3": [
                "Try to get into the music",
                "+10% all stats (20 adv)",
                "+40% meat drops (20 adv)",
                "+50% initiative (20 adv)"
            ]
        },
        "/palinshelves.php": {
            "0": [
                "Drawn Onward",
                "\nwith photo of God, hard rock candy, ketchup hound and ostrich ",
                "nothing (no adv loss)"
            ]
        },
        "/clan_viplounge.php": {
            "0": [
                "You approach the pool table.",
                "+5 lb familiar weight/+50% weapon damage (10 adv)",
                "+10 MP/turn, +50% spell damage (10 adv)",
                "+10% item drops, +50% initiative (10 adv)"
            ],
            "1": [
                "You change into your swimsuit",
                "\nGet into the pool",
                "+30 init, +25 stench damage, +20 ML (50 turns)",
                "\ndecreased chance of random PvP, +NC (50 turns)"
            ]
        },
        "/clan_rumpus.php": {
            "0": [
                "This jukebox has a staggering",
                "+10% meat drops (10 turns)",
                "+3 stats per combat (10 turns)",
                "+10% item drops (10 turns)",
                "+20% initiative (10 turns)",
                "buy a different piece of clan furniture for this spot"
            ],
            "1": [
                "There's a ball pit here with",
                "+(balls/100)% to all stats (20 turns)"
            ],
            "2": [
                "Unfortunately for you, only the three least popular flavors",
                "an item giving +30 Mox (10 turns)",
                "an item giving +30 Mus (10 turns)",
                "an item giving +30 Mysticality (10 turns)",
                "buy a different piece of clan furniture for this spot"
            ]
        },
	"/campground.php": {
		"0": [
		    "Discount Telescope Warehouse.",
		    "+(5-35)% to all stats (10 turns)",
		    "See what's in the NS tower"
		]
	}
    }
};
	if (advNumber === 0) {
		for (i in advOptions[0][URL]) {
			if (bodyText.indexOf(advOptions[0][URL][i][0]) !== -1) {
				return advOptions[0][URL][i];
			}
		}
		return null;
	} else {
		for (i in advOptions[advNumber]) {
			if (bodyText.indexOf(advOptions[advNumber][i][0]) !== -1) {
				return advOptions[advNumber][i];
			}
		}
	}
	return null;
}


function autoUpdate (id, version){
	function eliminaElem(e){if(e)e.parentNode.removeChild(e)}
	function addGlobalStyle(css){var head,style;head=document.getElementsByTagName('head')[0];style=document.createElement('style');style.type='text/css';style.innerHTML=css;head.appendChild(style)}
	function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}
	
	function menuCommand (){
		GM_registerMenuCommand ("Turn auto-updater on",
								function (){
									GM_setValue ("update", new Date ().getTime ().toString () + "#1");
								});
	}
	
	function showMessage (){
		addGlobalStyle (
			"#autoUpdater_capaAutopUpdate {" +
				"position: absolute;" +
				"left: 20px;" +
				"width: 280px;" +
				"background-color: #EEE;" +
				"padding: 7px;" +
				"font-family: Calibri;" +
				"font-size: 14px;" +
				"-moz-border-radius: 5px;" +
				"border: solid thin #C7C7C7;" +
				"z-index: 100" +
			"}"
		);
	
		var t;
		
		function move2 (capa){
			if (capa.style.left == "-301px"){
				clearTimeout (t);
				eliminaElem (capa);
			}else{
				capa.style.left = parseInt (capa.style.left) - 3 + "px";
				t = setTimeout (function (){ move2 (capa); }, 20);
			}
		}
		
		function move (capa){
			if (capa.style.top == "20px"){
				clearTimeout (t);
				t = setTimeout (function (){ move2 (capa); }, 5000);
			}else{
				capa.style.top = parseInt (capa.style.top) + 1 + "px";
				t = setTimeout (function (){ move (capa); }, 20);
			}
		}
		
		var capa = document.createElement ("div");
		capa.id = "autoUpdater_capaAutopUpdate";
		capa.innerHTML = "<img style='float: left; position: relative; top: 1px;' src='data:image/png;base64,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'/>" +
						 "<span style='cursor: default; text-align: center;'>You can turn the auto-updater on in the Greasemonkey Menu Command.</span>";

		document.getElementsByTagName ("body")[0].appendChild (capa);
		
		capa.style.top = "-50px";
		capa.style.left = "20px";
		move (capa);
	}
	
	var ms = new Date ().getTime ();
	
	var update = GM_getValue ("update");
	var search = false;
	var days;
	
	if (update == undefined){
		search = true;
		
		//By default it searches updates every 1 day.
		GM_setValue ("update", (24*60*60*1000 + ms).toString () + "#1");
		days = 1;
	}else{
		days = parseInt (update.split ("#")[1]);
		if (days != 0){
			var next_ms = update.split ("#")[0];
			if (ms >= parseInt (next_ms)){
				search = true;
				
				GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
			}
		}else{
			//Register Menu Command
			menuCommand ();
		}
	}

	if (!search) return;
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: "http://userscripts.org/scripts/show/" + id,
		headers: {
					"User-agent": "Mozilla/5.0",
					"Accept": "text/html",
				 },
		onload: function (respuesta){
			var userScripts = document.implementation.createDocument ("", "", null);
			var html = document.createElement ("html");
			html.innerHTML = respuesta.responseText;
			userScripts.appendChild (html);
			
			//Get new version
			var newVersion = userScripts.getElementById ("content").getElementsByTagName ("b")[1].nextSibling.textContent;
			
			//Get the name of the script
			var name = userScripts.getElementById("details").childNodes[1].innerHTML;
			
			if (trim(newVersion) != trim(version)){
				//There's a new version
				addGlobalStyle (
					"#autoUpdater_divVersion { text-align: left; height: 140px; position: fixed; top: 10px; left: 10px; background: #EEE; border: solid thin #C7C7C7; padding: 8px; font-family: Calibri; font-size: 14px; -moz-border-radius: 5px; cursor: default; z-Index: 100;}" +
					"#autoUpdater_imgVersion { position: relative; top: 4px; margin-right: 5px; }" +
					"#autoUpdater_install { position: absolute; top: 45px; right: 8px; width: 75px; padding: 5px; border: 1px solid #DEDEDE; background-color: #F5F5F5; color: #565656; text-decoration: none; cursor: pointer; }" +
					"#autoUpdater_install img { padding: 0; margin: 0 2px 0 2px; position: relative; top: 2px; right: 4px; }" +
					"#autoUpdater_install span { position: relative; bottom: 1px; }" +
					"#autoUpdater_cancel { position: absolute; bottom: 8px; width: 75px; right: 8px; padding: 5px; border: 1px solid #DEDEDE; background-color: #F5F5F5; color: #565656; text-decoration: none; cursor: pointer; }" +
					"#autoUpdater_cancel img { padding: 0; margin: 0 2px 0 2px; position: relative; top: 2px; right: 4px; }" +
					"#autoUpdater_cancel span { position: relative; bottom: 1px;}" +
					"#autoUpdater_currentVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_newVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_versionTitle { color: #373737; }" +
					"#autoUpdater_numCurrentVersion { color: #232323; }" +
					"#autoUpdater_numNewVersion { color: #232323; }" +
					"#autoUpdater_text1 { font-size: 14px; color: #373737; position: absolute; bottom: 48px; }" +
					"#autoUpdater_text2 { font-size: 11px; color: #373737; position: absolute; bottom: 34px; left: 8px; }" +
					"#autoUpdater_text3 { font-size: 14px; color: #373737; position: absolute; bottom: 8px; left: 42px; }" +
					"#autoUpdater_input { font-family: Calibri; font-size: 14px; background: #FFF; border: solid thin #232323; color: #232323; width: 23px; height: 15px; position: absolute; bottom: 8px;}" +
					"#autoUpdater_table { border-spacing: 0 0; }" +
					"#autoUpdater_table td { font-family: Calibri; font-size: 14px; }" +
					"#autoUpdater_linkScript { font-family: Calibri; font-size: 14px; color: #000099; text-decoration: none; }"
				);
				
				var capa = document.createElement("div");
				capa.setAttribute("id", "autoUpdater_divVersion");
				capa.innerHTML = "<img id='autoUpdater_imgVersion' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg=='/><span id='autoUpdater_versionTitle'>New version available for <a id='autoUpdater_linkScript' target='_blank' href='http://userscripts.org/scripts/show/" + id + "'><b><u>" + name + "</u></b></a>!</span>" +
								 "<br/><hr/>" +
								 "<table id='autoUpdater_table'>" +
									"<tr><td id='autoUpdater_currentVersion'>Current version:</td><td id='autoUpdater_numCurrentVersion'><b>" + version + "</b></td></tr>" +
									"<tr><td id='autoUpdater_newVersion'>New version:</td><td id='autoUpdater_numNewVersion'><b>" + newVersion + "</b></td></tr>" +
								 "</table>" +
								 "<a id='autoUpdater_install' title='Install script'><center><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII=' alt='Install script'/><span><b>Install</b></span></center></a>" +
								 "<a id='autoUpdater_cancel' title='Cancel'><center><img src='data:image/png;base64,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' alt='Cancel'/><span><b>Cancel</b></span></center></a>" +
								 "<span id='autoUpdater_text1'>Search updates every:</span><br/>" +
								 "<span id='autoUpdater_text2'>(0 to turn off, max. 90)</span>" +
								 "<input id='autoUpdater_input' type='text' value='" + days + "'/><span id='autoUpdater_text3'>day/s.</span>";
				
				document.getElementsByTagName("body")[0].appendChild(capa);
				
				var ok = true;
				
				function install1 (){
					var days = parseInt (document.getElementById ("autoUpdater_input").value);
					var ms = new Date ().getTime ();
					
					if (ok){
						if (days == 0){
							GM_setValue ("update", "#0");
							
							menuCommand ();
							showMessage ();
						}else{
							GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
						}
						
						window.open ("http://userscripts.org/scripts/source/" + id + ".user.js", "_self");
						eliminaElem (document.getElementById ("autoUpdater_divVersion"));
					}
				}
				
				function install2 (install){
					install.style.background = "#E6EFC2";
					install.style.borderColor = "#C6D880";
					install.style.color = "#529214";
				}
				
				function install3 (install){
					install.style.background = "#F5F5F5";
					install.style.borderColor = "#DEDEDE";
					install.style.color = "#565656";
				}
				
				function install4 (install){
					install.style.background = "#529214";
					install.style.borderColor = "#529214";
					install.style.color = "#FFF";
				}
				
				function cancel1 (){
					if (document.getElementById ("autoUpdater_input").value == "0"){
						GM_setValue ("update", "#0");
						
						menuCommand ();
						showMessage ();
					}
					
					GM_setValue ("update", "0#" + GM_getValue ("update").split ("#")[1]);
					eliminaElem (document.getElementById ("autoUpdater_divVersion"));
				}
				
				function cancel2 (cancel){
					cancel.style.background = "#FBE3E4";
					cancel.style.borderColor = "#FFD3D5";
					cancel.style.color = "#D12F19";
				}
				
				function cancel3 (cancel){
					cancel.style.background = "#F5F5F5";
					cancel.style.borderColor = "#DEDEDE";
					cancel.style.color = "#565656";
				}
				
				function cancel4 (cancel){
					cancel.style.background = "#D12F19";
					cancel.style.borderColor = "#D12F19";
					cancel.style.color = "#FFF";
				}
				
				function input (text){
					if (text.value == "" || isNaN (text.value) || parseInt (text.value) < 0 || parseInt (text.value) > 90){
						text.style.border = "solid thin #FFB9BB";
						text.style.backgroundColor = "#FBE3E4";
						ok = false;
					}else{
						text.style.border = "solid thin #232323";
						text.style.backgroundColor = "#FFF";
						ok = true;
					}
				}
				
				//install
				var listener = document.getElementById ("autoUpdater_install");
				listener.addEventListener ("click", install1, false);
				listener.addEventListener ("mouseover", function (){ install2 (this); }, false);
				listener.addEventListener ("mouseout", function (){ install3 (this); }, false);
				listener.addEventListener ("mousedown", function (){ install4 (this); }, false);
				listener.addEventListener ("mouseup", function (){ install2 (this); }, false);
				
				//cancel
				listener = document.getElementById ("autoUpdater_cancel");
				listener.addEventListener ("click", cancel1, false);
				listener.addEventListener ("mouseover", function (){ cancel2 (this); }, false);
				listener.addEventListener ("mouseout", function (){ cancel3 (this); }, false);
				listener.addEventListener ("mousedown", function (){ cancel4 (this); }, false);
				listener.addEventListener ("mouseup", function (){ cancel2 (this); }, false);
				
				//input
				listener = document.getElementById ("autoUpdater_input");
				listener.addEventListener ("keyup", function (){ input (this); }, false);
			}
		}
	});
}

