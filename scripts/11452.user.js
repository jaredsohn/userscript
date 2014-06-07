// Tard's KoL Scripts
// Copyright (c) 2006, Byung Kim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Tard's KoL Scripts - Choice Adventure Rewards
// @namespace      http://kol.dashida.com
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.html
// @include        *kingdomofloathing.com/choice.php
// @include        *kingdomofloathing.com/basement.php
// @include        *127.0.0.1:*/main_c.html
// @include        *127.0.0.1:*/main.html
// @include        *127.0.0.1:*/choice.php
// @include        *127.0.0.1:*/basement.php
// @description    Version 2.4
// ==/UserScript==


/********************************** Change Log **********************************************
Refer to the following for past updates:
http://kol.dashida.com/

Refer to the following for current updates:
http://somestranger.kol.googlepages.com

Version Updates:
2.4-NS13 unofficial
- added NS13 and Worm Wood content
- made fixes and reformatted some long descriptions
2.4 (picklish)
- added remaining missing choice adventures
- fixed existing errors
2.3 (flatluigi)
- added most missing choice advs
- NOTE: astral advs and the Louvre not included.
- NOTE: effects of Strung-Up Quartet hasn't been completely decided, given ones are the mostly accepted
2.2
- Fixed "Take a Look, it's in a Book!" choices (Thanks Beatrix Kiddo)

********************************************************************************************/

if (window.location.pathname == "/main_c.html" || window.location.pathname == "/main.html") {

	setTimeout('if (window["checkForUpdate"]) checkForUpdate("choiceadv","2.4","Choice Adventure","http://somestranger.kol.googlepages.com/tardskolscripts_choiceadv.user.js");',1000);

} else if (window.name == "mainpane") {
	var advOptions = new Array();


	// Cola Battlefield
	advOptions.push(["Smells Like Team Spirit","Dyspepsi-Cola fatigues","Cloaca-Cola helmet","+15 Mus"]);
	advOptions.push(["The Effervescent Fray","Cloaca-Cola fatigues","Dyspepsi-Cola shield","+15 Mys"]);
	advOptions.push(["What is it Good For?","Dyspepsi-Cola helmet","Cloaca-Cola shield","+15 Mox"]);

	// Dungeons of Doom
	advOptions.push(["Ouch! You bump into a door","-50 Meat, magic lamp","-5000 Meat, Monster: mimic","nothing"]);
	advOptions.push(["The Oracle Will See You Now","nothing","nothing","enable reading of plus sign"]);

	// Extreme Slope
	advOptions.push(["Generic Teen Comedy Snowboarding Adventure","eXtreme mittens","snowboarder pants","+200 meat"]);
	advOptions.push(["Saint Beernard","snowboarder pants","eXtreme scarf","+200 meat"]);
	advOptions.push(["Yeti Nother Hippy","eXtreme mittens","eXtreme scarf","+200 meat"]);

	// Haunted Ballroom
	// "Curtains"
	advOptions.push(["You walk into the empty Ballroom","\nw/bizarre illegible sheet music as DB: learn Tango of Terror\nw/bizarre illegible sheet music as AT: learn Dirge of Dreadfulness\nelse Monster: Ghastly Organist","+1*(mainstat) Mox (max 150)","nothing"]);
	advOptions.push(["Strung-Up Quartet","+5 monster level","-5% combat rate","+5% item drops", "turn song off"]);

	// Haunted Bathroom
	advOptions.push(["Having a Medicine Ball","with antique hand mirror, +1.2*(mainstat) Myst (max 200) \nelse +0.8*(mainstat) Mox (max 150)","Bad Medicine (choose from 3 items)","(every fifth time until defeat) Monster: Guy Made of Bees"]);
	advOptions.push(["Bad Medicine is What You Need","antique bottle of chough syrup","tube of hair oil","bottle of ultravitamins"]);

	// Haunted Billiards Room
	advOptions.push(["Minnesota Incorporeals","+10-50 Mox","Continue sequence (+Mys, +Mus, library key, or nothing)","Leave (no adventure loss)"]);
	advOptions.push(["Broken","Continue sequence (Can get +50 Mys, library key, or nothing)","+10-50 Mus","Leave (no adventure loss)"]);
	advOptions.push(["A Hustle Here, a Hustle There","\nw/out Chalky Hand effect: nothing (lose an adventure);\n with Chalky Hand effect: Spookyraven library key (one time drop)","+10-50 Mys","Leave (no adventure loss)"]);

	// Haunted Gallery
	advOptions.push(["Out in the Garden","SC with tattered wolf standard: learn Snarl of the Timberwolf\n else Monster: Knight (wolf)","TT with tattered snake standard: learn Spectral Snapper\n else Monster: Knight (snake)\n","Effect: Dreams and Lights\n(with Dreams and Lights effect: lose 20-30 HP)"]);

	// Itznotyerzitz Mine
	advOptions.push(["See You Next Fall","miner's helmet","7-Foot Dwarven mattock","+100 meat"]);
	advOptions.push(["A Flat Miner","miner's pants","7-Foot Dwarven mattock","+100 meat"]);
	advOptions.push(["100% Legal","miner's helmet","miner's pants","+100 meat"]);

	// Knob Shaft
	advOptions.push(["Junction in the Trunction","3 chunks of cardboard ore","3 chunks of styrofoam ore","3 chunks of bubblewrap ore"]);

	// Knob Harem
	advOptions.push(["A Bard Day's Night","Knob Goblin harem veil","Knob Goblin harem pants","+90-110 meat"]);
	
	// Outskirts of Cobb's Knob
	advOptions.push(["Malice in Chains","+4-5 Mus","randomly +6-8 Mus or -1-? HP","Monster: sleeping Knob Goblin Guard"]);
    advOptions.push(["Knob Goblin BBQ","\nw/out unlit birthday cake: -2 HP\nw/unlit birthday cake: light cake and -2 HP", "Monster: Knob Goblin Barbecue Team", "randomly one of: bowl of cottage cheese,\nKnob Goblin pants, Knob Goblin tongs, or Kiss the Knob apron", ""]);
    advOptions.push(["When Rocks Attack", "+30 Meat", "nothing (no adv loss)", "", ""]);
    advOptions.push(["Ennui is Wasted on the Young", "randomly +4-5 Mus and -2 HP or +7-8 Mus and Effect: Pumped Up", "ice-cold Sir Schlitz", "+2-3 Mox and lemon", "nothing (no adv loss)"]);
	
	// Orcish Frat House
	advOptions.push(["Lording Over The Flies","trade flies for around the worlds","nothing",""]);

	// Palindome
	advOptions.push(["Denim Axes Examined","with rubber axe: trade for denim axe \nw/out: nothing","nothing",""]);

	// Pirate's Cove
	advOptions.push(["Amatearrr Night","stuffed shoulder parrot, -3 HP","+100 Meat","eyepatch"]);
	advOptions.push(["Barrie Me at Sea","stuffed shoulder parrot, -5 Meat","swashbuckling pants","+100 Meat"]);
	advOptions.push(["The Arrrbitrator","eyepatch","swashbuckling pants","+100 Meat"]);

	// Sleazy Back Alley
	advOptions.push(["Under the Knife","Change gender of character","nothing",""]);
	advOptions.push(["Aww, Craps","+4-5 Mox","randomly +31-40 Meat and +6-8 Mox or -2 HP","randomly +41-49 Meat. +6-8 Mox and Effect: Smugness or -ALL HP","nothing (no adv loss)"]);
	advOptions.push(["Dumpster Diving","Monster: drunken half-orc hobo","+4-5 Mox and +3-4 Meat","Mad Train wine"]);
	advOptions.push(["The Entertainer","+4-5 Mox","+2-4 Mox and +2-4 Mus","+15 Meat and sometimes +6-8 Mys","nothing (no adv loss)"]);
	advOptions.push(["Please, Hammer","Harold's hammer head and Harold's hammer handle (start miniquest)","nothing (no adv loss)","+5-6 Mus"]);
	
	// South of the Border
	advOptions.push(["Finger-Lickin'... Death.","+500 meat or -500 meat","-500 meat; chance of poultrygeist","nothing"]);

	// Spooky Gravy Barrow
	advOptions.push(["Heart of Very, Very Dark Darkness","w/out inexplicably glowing rock: proceed to Darker Than Dark; with rock: proceed to How Depressing","nothing",""]);
	advOptions.push(["Darker Than Dark","-all HP","nothing",""]);
	advOptions.push(["How Depressing","with spooky glove equipped: proceed to On the Verge of a Dirge; without: nothing","nothing",""]);
	advOptions.push(["On the Verge of a Dirge","proceed to Queen Felonia","proceed to Queen Felonia","proceed to Queen Felonia"]);

	// Spooky Forest
	advOptions.push(["An Interesting Choice","Moxie stat points","Muscle stat points","Monster: spooky vampire"]);
	advOptions.push(["A Three-Tined Fork","Muscle starter items","Myst starter items","Moxie starter items"]);
	advOptions.push(["Footprints","SC items","TT items",""]);
	advOptions.push(["A Pair of Craters","PM items","SR items",""]);
	advOptions.push(["The Road Less Visible","DB items","AT items",""]);
	advOptions.push(["Have a Heart","bottle of used blood","",""]);
	advOptions.push(["Maps and Legends","Spooky Temple map","nothing (no adv loss)","nothing (no adv loss)"]);
	
	// The Haunted Pantry
	advOptions.push(["Oh No, Hobo","Monster: drunken half-orc hobo","\nw/out at least 6 meat: nothing\nwith at least 6 meat, -5 Meat and Effect: Good Karma","+3-4 Mys, +3-4 Mox, and +5-10 Meat",""]);
    advOptions.push(["The Baker's Dilemma", "unlit birthday cake (start miniquest)", "nothing (no adv loss)", "+4-5 Smarm and +16-19 Meat"]);
    advOptions.push(["The Singing Tree", "\nw/at least 1 meat: +4-5 Mys and -1 Meat\nw/no meat: nothing", "\nw/at least 1 meat: +4-5 Mox and -1 Meat\nw/0 meat: nothing", "w/at least 1 meat, -1 meat and randomly one of:\nwhiskey and soda or +4-5 Mys and -2 HP or +7-8 Mys\nw/no meat: nothing", "nothing (no adv loss)"]);
    advOptions.push(["Tresspasser", "Monster: Knob Goblin Assistant Chef", "+6-8 Mys or +4 Mys and -2 HP", "Get 1-4 of:\nasparagus knife, chef's hat,\nmagicalness-in-a-can, razor-sharp can lid,\nor stalk of asparagus"]);

	// Whitey's Grove
	advOptions.push(["Don't Fence Me In","+20-30 Mus","white picket fence","piece of wedding cake"]);
	advOptions.push(["The Only Thing About Him is the Way That He Walks","+20-30 Mox","3 boxes of wine","mullet wig"]);
	advOptions.push(["Rapido!","+20-30 Mys","3 jars of white lightning","white collar"]);

	// Haunted Library
	advOptions.push(["Melvil Dewey Would Be Ashamed","Necrotelicomnicon (spooky book)","Cookbook of the Damned (stench book)","Sinful Desires (sleaze book)","nothing"]);
	
	// Haunted Library ("Take A Look, It's In A Book")
	advOptions.push(["Rise of the House","Chapter Choices (No rewards)","Learn a random cooking recipe","Chapter Choices (+Mox, +Mys, or Skill for P/SR)","Leave"]);
	advOptions.push(["Fall of the House","Chapter Choices (unlock one time adventure or nothing)","Learn a cocktailcrafting recipe","+14-75 Mus and  lose 10-15 HP (Spooky Damage)","Leave"]);
	advOptions.push(["Chapter 2: Stephen and Elizabeth","Read the chapter (No rewards)","Read the chapter (unlocks one-time Polo Tombstone adventure in Conservatory)","Read the chapter (No rewards)"]);
	advOptions.push(["Naughty, Naughty...","+14-75 Mys","+14-75 Mox","w/out English to A. F. U. E. Dictionary: -10-15 HP (Spooky Damage); \nwith Dictionary and P/SR class: gain new Skill (one time)"]);
	advOptions.push(["Read Chapter 1: The Arrival","Read the chapter (No rewards)","Read the chapter (No rewards)","Read the chapter (No rewards)"]);

	// Fernswarthy's Basement
	advOptions.push(["twojackets","Moxie","Muscle",""]);
	advOptions.push(["twopills","Muscle","Mysticality",""]);
	advOptions.push(["figurecard","Mysticality","Moxie",""]);

	// Castle (Wheel)
	advOptions.push(["cwheel1","Pay the Bills (Mysticality Bonus)","Feed the Cat (Moxie Bonus)","Take out the Garbage (Muscle Bonus)"]);
	advOptions.push(["cwheel2","Guard the Back Door","Take out the Garbage (Muscle Bonus)","Pay the Bills (Mysticality Bonus)"]);
	advOptions.push(["cwheel3","Feed the Cat (Moxie Bonus)","Pay the Bills (Mysticality Bonus)","Guard the Back Door"]);
	advOptions.push(["cwheel4","Take out the Garbage (Muscle Bonus)","Guard the Back Door","Feed the Cat (Moxie Bonus)"]);

	// The Haunted Bedroom
	advOptions.push(["darkstand","old coin purse","Monster: animated nightstand","\nWith Lord Spookyraven's spectacles equipped\nclass quest item (one time drop)"]);
	advOptions.push(["carvestand","400-600 Meat","+1*(mainstat) Mys (max 200)","Lord Spookyraven's spectacles (one time drop)"]);
	advOptions.push(["nightstand","old leather wallet","+1*(mainstat) Musc (max 200)","Monster: animated nightstand"]);
	advOptions.push(["woodstand","+1*(mainstat) Mox (max 200)","Spookyraven ballroom key\n(only after checking top drawer at least once, one time drop)","Monster: remains of a jilted mistress"]);
	
	//The Cyrpt
	advOptions.push(["Turn Your Head and Coffin","+40-60 Mus","200-300 meat","half-rotten brain","nothing"]);
	advOptions.push(["Urning Your Keep","+40-60 Myst","plus-sized phylactery","200-300 meat","nothing"]);
	advOptions.push(["Skull, Skull, Skull","+40-60 Mox","200-300 meat","rusty bonesaw","nothing"]);
	advOptions.push(["Go Slow Past the Drawers","200-300 meat","40-50 HP & MP, +20-30 all stats","can of Ghuol-B-Gone","nothing"]);
	
	// The Worm Wood
	advOptions.push(["Down by the Riverside","+1*(mainstat) Mus (max 150)","Spirit of Alph\n(not-a-pipe or fancy ball mask, step 1)","Monster: roller-skating Muse"]);
	advOptions.push(["Beyond Any Measure","Night Vision\n(with Rat-Faced, flask of Amontillado step 2)","Good with the Ladies\n(with Bats in the Belfry, Can-can skirt step 2)","+1*(mainstat) Myst (max 150)","nothing"]);
	advOptions.push(["Death is a Boat","S.T.L.T. (with No Vertigo)","+1*(mainstat) Mox (max 150)","albatross necklace (with Unusual Fashion Sense)"]);
	
	advOptions.push(["It's a Fixer-Upper","Monster: Raven","+1*(mainstat) Myst (max 150)","Bats in the Belfry\n(S.T.L.T. or Can-can skirt, step 1)"]);
	advOptions.push(["Midst the Pallor of the Parlor","+1*(mainstat) Mox (max 150)","Feelin' Philosophical\n(not-a-pipe step 2, with Spirit of Alph)","Unusual Fashion Sense\n(albatross necklace step 2, with Rat-Faced)"]);
	advOptions.push(["A Few Chintz Curtains, Some Throw Pillows, It","flask of Amontillado (with Night Vision)","+1*(mainstat) Mus (max 150)","fancy ball mask (with Dancing Prowess)"]);
	
	advOptions.push(["La Vie Boheme","Rat-Faced\n(albatross necklace or flask of Amontillado, step 1)","Monster: Sensitive poet-type","+1*(mainstat) Mox (max 150)"]);
	advOptions.push(["Backstage at the Rogue Windmill","No Vertigo\n(S.T.L.T. step 2, with Bats in the Belfry)","+1*(mainstat) Musc (max 150)","Dancing Prowess\n(fancy ball mask step 2, with Spirit of Alph)"]);
	advOptions.push(["Up in the Hippo Room","Can-Can skirt (with Good with the Ladies)\nelse Monster: Can-can dancer","not-a-pipe (with Feelin' Philosophical)","+1*(mainstat) Myst (max 150)"]);
	
	//Hidden Temple
	advOptions.push(["At Least It's Not Full Of Trash","lose HP","pass test","lose HP"]);
	advOptions.push(["No Visible Means of Support","lose HP","lose HP","unlock The Hidden City"]);
	
	//The Arid, Extra-Dry Desert
	advOptions.push(["Let's Make a Deal!","broken carburetor","unlock Oasis"]);
	
	//The Hippy Camp (war)
	advOptions.push(["Peace Wants Love","filthy corduroys","filthy knitted dread sack","+210-300 meat"]);
	advOptions.push(["An Inconvenient Truth","filthy knitted dread sack","filthy corduroys","+210-300 meat"]);
	advOptions.push(["Bait and Switch","+50 Musc","2-5 handfuls of ferret bait","Monster: War Hippy (space) cadet"]);
	advOptions.push(["The Thin Tie-Dyed Line","2-5 water pipe bombs","+50 Mox","Monster: War Hippy drill sergeant"]);
	advOptions.push(["Blockin' Out the Scenery","+50 Myst","hippy foods","In Frat Warrior Fatigues: start the war\nIn Frat Boy Ensemble: nothing"]);
	
	//Orcish Frat House (war)
	advOptions.push(["Purple Hazers","Orcish cargo shorts","Orcish baseball cap","homoerotic frat-paddle"]);

	advOptions.push(["Catching Some Zetas","+50 Musc","6-7 sake bombers","Monster: War Pledge"]);
	advOptions.push(["One Less Room Than In That Movie","+50 Mox","2-5 beer bombs","Monster: Frat Warrior drill sergeant"]);
	advOptions.push(["Fratacombs","+50 Musc","frat foods","In War Hippy Fatigues: start the war\nIn Filthy Hippy Disguise: nothing"]);
	
	//McMillicancuddy's Farm
	advOptions.push(["Cornered!","Open The Granary (meaty ducks)","Open The Bog (stench ducks)","Open The Pond (cold ducks)"]);
	advOptions.push(["Cornered Again!","Open The Back 40 (hot ducks)","Open The Family Plot (spooky ducks)"]);
	advOptions.push(["How Many Corners Does this Stupid Barn Have!?","Open The Shady Thicket (booze ducks)","Open The Other Back 40 (sleaze ducks)"]);

//	advOptions.push(["","","",""]);

	window.addEventListener("load",function(e) {
		bodyHTML = document.getElementsByTagName('body')[0].innerHTML;
		for (var i in advOptions) {
			strSearch = (window.location.pathname == "/basement.php" || bodyHTML.indexOf("cwheel") != -1 || bodyHTML.indexOf("One Nightstand") != -1 ? advOptions[i][0] + ".gif" : advOptions[i][0] );
			if (bodyHTML.indexOf(strSearch) != -1) {
				aF = document.getElementsByTagName('input');
				n = 0;
				for (var j=0;j<aF.length;j++) {
					if (aF[j] && aF[j].type == "submit") {
						aF[j].value += " -- " + advOptions[i][(n+1)] + "";
						n++;
					}
				}
				break;
			}
		}
	},false);
}
