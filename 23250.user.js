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
// @include	   *kingdomofloathing.com/friars.php*
// @include	   *kingdomofloathing.com/bigisland.php*
// @include	   *kingdomofloathing.com/postwarisland.php*
// @include        *kingdomofloathing.com/palinshelves.php
// @include        *127.0.0.1:*/main_c.html
// @include        *127.0.0.1:*/main.html
// @include        *127.0.0.1:*/choice.php
// @include        *127.0.0.1:*/basement.php
// @include	   *127.0.0.1:*/friars.php*
// @include	   *127.0.0.1:*/bigisland.php*
// @include	   *127.0.0.1:*/postwarisland.php*
// @include        *127.0.0.1:*/palinshelves.php
// @description    Version 2.5
// ==/UserScript==


/********************************** Change Log **********************************************
Refer to the following for past updates:
http://kol.dashida.com/

Refer to the following for current updates:
http://somestranger.kol.googlepages.com

Version Updates:
2.5 (Aelsa)
- updated to what's currently on the wiki (Feb 08)
- added the non-adventure choices (Friars, Arena etc.)
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

	setTimeout('if (window["checkForUpdate"]) checkForUpdate("choiceadv","2.5","Choice Adventure","http://somestranger.kol.googlepages.com/tardskolscripts_choiceadv.user.js");',1000);

} else if (window.name == "mainpane") {
	var advOptions = new Array();

	// Note: Do not alphabetize these groups unless you want to fix the string comparison code too
	// (It gets confused between "A Few Chintz Curtains" and the "Curtains" adventure in the Haunted Ballroom, and between "A Pre-War Dresser Drawer" and "One Nightstand")

	// The Mouldering Mansion
	advOptions.push(["It's a Fixer-Upper","Monster: raven","+mainstat Mysticality (max 150)","+40-49 HP and MP, Effect: Bats in the Belfry"]);
	advOptions.push(["Midst the Pallor of the Parlor","+70-150 Moxie","with Spirit of Alph, Effect: Feelin' Philosophical \nw/out, Monster: Black Cat","with Rat-Faced, Effect: Unusual Fashion Sense \nw/out, nothing"]);
	advOptions.push(["A Few Chintz Curtains, Some Throw Pillows...","with Night Vision: flask of Amontillado \nw/out: nothing","+mainstat Muscle (max 150)","with Dancing Prowess: fancy ball mask \nw/out: nothing"]);

	// The Palindome
	advOptions.push(["No sir, away!","3 papayas","\nwith at least 3 papayas: +<300 to all stats, lose 3 papayas \nw/out: lose 60-68 HP","+<100 to all stats"]);
	advOptions.push(["A Pre-War Dresser Drawer, Pa!","with Torso Awaregness: Ye Olde Navy Fleece \nw/out: +200-300 meat","nothing (no adv loss)"]);
	advOptions.push(["Sun at Noon, Tan Us","+mainstat in Moxie (max 250)","+1.5*mainstat in Moxie (max 350) OR Effect: Sunburned","Effect: Sunburned"]);
	advOptions.push(["Drawn Onward","\nwith photo of God, hard rock candy, ketchup hound and ostrich egg on the shelves: \nmeet Dr. Awkward and get beaten up \nwithout: nothing (no adv loss)","nothing (no adv loss)"]);
	advOptions.push(["Denim Axes Examined","with rubber axe: trade for denim axe \nw/out: nothing","nothing",""]);
	advOptions.push(["Dr. Awkward","Monster: Dr. Awkward","Monster: Dr. Awkward","Monster: Dr. Awkward"]);





	// The Arid, Extra-Dry Desert
	advOptions.push(["Let's Make a Deal!","broken carburetor","unlock An Oasis"]);

	// The Barn
	advOptions.push(["Cornered!","send ducks to the Granary","send ducks to the Bog","send ducks to the Pond \n(step 1 of the shortcut)"]);
	advOptions.push(["Cornered Again!","send ducks to the Back 40 \n(step 2 of the shortcut)","send ducks to the Family Plot"]);
	advOptions.push(["How Many Corners Does this Stupid Barn Have!?","send ducks to the Shady Thicket","send ducks to the Other Back 40 \nIf you've used a chaos butterfly in combat and done steps 1 and 2: \nhalve number of ducks in each area "]);

	// Barrrney's Bar
	advOptions.push(["A Test of Testarrrsterone","if Myst is highest base stat: +<100 to each stat \notherwise: +<100 Muscle and Moxie","+<300 to each stat, gain 3 drunkenness","+<150 Moxie"]);
	advOptions.push(["That Explains All The Eyepatches","\nif Myst is highest base stat: +<200(?) to each stat, gain 3 drunkenness \notherwise: Monster: tipsy pirate","\nif Mox is highest base stat: +<300 Mus and Mys, +<400 Mox, gain 3 drunkenness \notherwise, acquire shot of rotgut","\nif Mus is highest base stat, +<300 Mys and Mox, +<400 Mus, gain 3 drunkenness \notherwise, acquire shot of rotgut"]);
	advOptions.push(["Yes, You're a Rock Starrr","\nacquire 2-5 of bottle of gin, bottle of rum, bottle of vodka, bottle of whiskey","\nacquire 2-3 of grog, monkey wrench, redrum, rum and cola, spiced rum, strawberry daiquiri","\n+50-100 to each stat (scales with drunkenness)"]);
	advOptions.push(["The Infiltrationist","\nin frat outfit: Cap'm Caronch's dentures \notherwise -95-105 HP","\nin mullet wig and with briefcase: Cap'm Caronch's dentures \notherwise -95-105 HP","\nin frilly skirt and with 3 hot wings: Cap'm Caronch's dentures \notherwise -90-100 HP"]);

	// Castle (Wheel)
	advOptions.push(["cwheel1","Pay the Bills (Mysticality Bonus)","Feed the Cat (Moxie Bonus)","Take out the Garbage (Muscle Bonus)"]);
	advOptions.push(["cwheel2","Guard the Back Door","Take out the Garbage (Muscle Bonus)","Pay the Bills (Mysticality Bonus)"]);
	advOptions.push(["cwheel3","Feed the Cat (Moxie Bonus)","Pay the Bills (Mysticality Bonus)","Guard the Back Door"]);
	advOptions.push(["cwheel4","Take out the Garbage (Muscle Bonus)","Guard the Back Door","Feed the Cat (Moxie Bonus)"]);

	// Cola Battlefield
	advOptions.push(["Smells Like Team Spirit","Dyspepsi-Cola fatigues","Cloaca-Cola helmet","+15 Mus"]);
	advOptions.push(["The Effervescent Fray","Cloaca-Cola fatigues","Dyspepsi-Cola shield","+15 Mys"]);
	advOptions.push(["What is it Good For?","Dyspepsi-Cola helmet","Cloaca-Cola shield","+15 Mox"]);

	// The Deep Fat Friars' Gate
	advOptions.push(["Bureaucracy of the Damned","\nwith Azazel's 3 items, gain Steel reward \nw/out: nothing","\nwith Azazel's three items, gain Steel reward \nw/out: nothing","\nwith Azazel's three items, gain Steel reward \nw/out: nothing","\nnothing (no adv loss)"]);

	// The Defiled Alcove
	advOptions.push(["Doublewide","Monster: conjoined zmombie","nothing"]);
	advOptions.push(["Turn Your Head and Coffin","+40-60 Mus","+200-300 meat","half-rotten brain","nothing (no adv loss)"]);

	// The Defiled Cranny
	advOptions.push(["Lunchtime","Monster: huge ghuol","nothing"]);
	advOptions.push(["Go Slow Past the Drawers","+200-300 meat","+40-50 HP/MP, +20-30 Mus, Mys and Mox","can of Ghuol-B-Gone","nothing (no adv loss)"]);

	// The Defiled Niche
	advOptions.push(["Lich in the Niche","Monster: gargantulihc","nothing"]);
	advOptions.push(["Urning Your Keep","+40-70 Mys","plus-sized phylactery (first time only)","+200-300 meat","nothing (no adv loss)"]);

	// The Defiled Nook
	advOptions.push(["Pileup","Monster: giant skeelton","nothing"]);
	advOptions.push(["Skull, Skull, Skull","+40-60 Mox","+200-300 meat","rusty bonesaw","nothing (no adv loss)"]);

	// The Dungeons of Doom
	advOptions.push(["Ouch! You bump into a door","-50 Meat, magic lamp","-5000 Meat, Monster: mimic","nothing"]);
	advOptions.push(["The Oracle Will See You Now","nothing","nothing","enable reading of plus sign"]);

	// The eXtreme Slope
	advOptions.push(["Generic Teen Comedy Snowboarding Adventure","eXtreme mittens","snowboarder pants","+200 meat"]);
	advOptions.push(["Saint Beernard","snowboarder pants","eXtreme scarf","+200 meat"]);
	advOptions.push(["Yeti Nother Hippy","eXtreme mittens","eXtreme scarf","+200 meat"]);

	// The F'c'le
	advOptions.push(["Chatterboxing","+~110 Moxie","without valuable trinket: lose ~14 HP \nwith valuable trinket: banish Chatty Pirate for <20 adventures \n(no adventure loss)","+~110 Muscle","+~110 Mysticality, lose ~15 HP"]);

	// Fernswarthy's Basement
	advOptions.push(["twojackets","Moxie","Muscle",""]);
	advOptions.push(["twopills","Muscle","Mysticality",""]);
	advOptions.push(["figurecard","Mysticality","Moxie",""]);

	//The Fun House
	advOptions.push(["Adventurer, $1.99","\nwith at least 4 Clownosity: continue towards Beelzebozo \notherwise: take damage","nothing (no adventure loss)"]);
	advOptions.push(["Lurking at the Threshold","Monster: Beelzebozo","nothing"]);

	// The Goatlet
	advOptions.push(["Between a Rock and Some Other Rocks","in Mining gear: allow access to the Goatlet \notherwise, nothing","nothing (no adv loss)"]);

	// The Haunted Ballroom
	advOptions.push(["Curtains","\nwith bizarre illegible sheet music as DB: unlock Tango of Terror\nwith bizarre illegible sheet music as AT: unlock Dirge of Dreadfulness\notherwise: Monster: Ghastly Organist","+44-150 Mox (scales up with you)","nothing (no adventure loss)"]);
	advOptions.push(["Strung-Up Quartet","increase monster level by 5","decrease combat frequency by 5%","increase item drops by 5%","turn song off"]);

	// The Haunted Bathroom
	advOptions.push(["Having a Medicine Ball","with antique hand mirror, Myst substats \notherwise Mox substats    (both scale up with you to max 150)","Bad Medicine (choose from 3 spleen items)","(every five times until defeat) Monster: Guy Made of Bees"]);
	advOptions.push(["Bad Medicine is What You Need","Myst item","Mox item","Mus item","nothing (no adventure loss)"]);

	// The Haunted Bedroom
	advOptions.push(["darkstand","old coin purse","Monster: animated nightstand","\ntattered wolf standard (SC)\ntattered snake standard (TT)\nEnglish to A. F. U. E. Dictionary (P or SR)\nbizarre illegible sheet music (DB or AT)\n All can only be found with Lord Spookyraven's spectacles equipped\n(all are one time drops)"]);
	advOptions.push(["carvestand","400-600 Meat","+50-200 Mys","Lord Spookyraven's spectacles (one time drop)"]);
	advOptions.push(["nightstand","old leather wallet","+50-200 Mus","Monster: animated nightstand"]);
	advOptions.push(["woodstand","+50-200 Mox","Spookyraven ballroom key \n(only after checking top drawer at least once, one time drop)","Monster: remains of a jilted mistress"]);

	// Haunted Billiards Room
	advOptions.push(["Minnesota Incorporeals","+50 Mox","Continue adventure sequence \n(Can get +50 Mys, +50 Mus, Spookyraven library key, or nothing)","Leave (no adventure loss)"]);
	advOptions.push(["Broken","Continue adventure sequence \n(Can get + 50 Mys, Spookyraven library key, or nothing)","+50 Mus","Leave (no adventure loss)"]);
	advOptions.push(["A Hustle Here, a Hustle There","\nw/out Chalky Hand effect: No Reward (lose an adventure);\n with Chalky Hand effect: Acquire Spookyraven library key (one time drop)","+50 Mys","Leave (no adventure loss)"]);

	// Haunted Gallery
	advOptions.push(["Out in the Garden","\nw/out tattered wolf standard: Monster: Knight (wolf)\nwith tattered wolf standard and SC class: Gain Snarl of the Timberwolf skill (one time)","w/out tattered snake standard: Monster: Knight (snake)\nwith tattered snake standard and TT class: gain Spectral Snapper skill (one time)","w/out Dreams and Lights effect: Effect: Dreams and Lights; with Dreams and Lights effect: lose 24-30 HP"]);

	// Haunted Library (Take A Look, It's In A Book")
	advOptions.push(["Rise of the House","Chapter choices (nothing)","\nLearn a random cooking recipe","\nChapter Choices (+Mox, +Mys, or Skill for P/SR)","nothing (no adv loss)"]);
	advOptions.push(["Fall of the House","Chapter Choices \n(unlock one time adventure or nothing)","Learn a random cocktailcrafting recipe","\n+14-75 Mus and  lose 10-15 HP (Spooky)","nothing (no adv loss)"]);
	advOptions.push(["Chapter 2: Stephen and Elizabeth","nothing","\nunlock one-time Polo Tombstone adventure in Conservatory","nothing"]);
	advOptions.push(["Naughty, Naughty...","+14-75 Mys","+14-75 Mox","w/out English to A. F. U. E. Dictionary: -10-15 HP (Spooky); \nwith Dictionary and P/SR class: gain new Skill (one time)"]);
	advOptions.push(["Read Chapter 1: The Arrival","nothing","nothing","nothing"]);
	advOptions.push(["Melvil Dewey Would Be Ashamed","\nNecrotelicomnicon (spooky cookbook)","\nCookbook of the Damned (stinky cookbook)","\nSinful Desires (sleazy cookbook)","Nothing (no adventure loss)"]);

	// The Haunted Pantry
	advOptions.push(["Oh No, Hobo","Monster: drunken half-orc hobo","\nw/out at least 6 meat: nothing\nwith at least 6 meat, -5 Meat and Effect: Good Karma","+3-4 Mys, +3-4 Mox, and +5-10 Meat",""]);
    advOptions.push(["The Baker's Dilemma", "unlit birthday cake (start miniquest)", "nothing (no adv loss)", "+4-5 Smarm and +16-19 Meat"]);
    advOptions.push(["The Singing Tree", "\nw/at least 1 meat: +4-5 Mys and -1 Meat\nw/no meat: nothing", "\nw/at least 1 meat: +4-5 Mox and -1 Meat\nw/0 meat: nothing", "w/at least 1 meat, -1 meat and randomly one of:\nwhiskey and soda or +4-5 Mys and -2 HP or +7-8 Mys\nw/no meat: nothing", "nothing (no adv loss)"]);
    advOptions.push(["Trespasser", "Monster: Knob Goblin Assistant Chef", "+6-8 Mys or +4 Mys and -2 HP", "Get 1-4 of:\nasparagus knife, chef's hat,\nmagicalness-in-a-can, razor-sharp can lid,\nor stalk of asparagus"]);

	// The Hidden Temple
	advOptions.push(["At Least It's Not Full Of Trash","lose all HP","unlock Dvorak's Revenge adventure","lose all HP"]);
	advOptions.push(["No Visible Means of Support","lose all HP","lose all HP","unlock the Hidden City"]);

	// The Hippy Camp
	advOptions.push(["Peace Wants Love","filthy corduroys","filthy knitted dread sack","+210-300 meat"]);
	advOptions.push(["An Inconvenient Truth","filthy knitted dread sack","filthy corduroys","+207-296 meat"]);
	advOptions.push(["Bait and Switch","+50 Muscle","acquire 2-5 handfuls of ferret bait","Monster: War Hippy (space) cadet"]);
	advOptions.push(["Blockin' Out the Scenery","+50 Mysticality"," acquire 2 of: \ncruelty-free wine, handful of walnuts, Genalen Bottle, mixed wildflower greens, thistle wine","in Frat Warrior Fatigues: start the war \notherwise: nothing"]);
	advOptions.push(["The Thin Tie-Dyed Line","acquire 2-5 water pipe bombs","+50 Moxie","Monster: War Hippy drill sergeant"]);

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
    advOptions.push(["Ennui is Wasted on the Young", "randomly +4-5 Mus and -2 HP \nor +7-8 Mus and Effect: Pumped Up", "\nice-cold Sir Schlitz", "\n+2-3 Mox and lemon", "\nnothing (no adv loss)"]);
	
	// The Orcish Frat House
	advOptions.push(["Lording Over The Flies","trade flies for around the worlds","nothing",""]);
	advOptions.push(["Purple Hazers","Orcish cargo shorts","Orcish baseball cap","homoerotic frat-paddle"]);
	advOptions.push(["Catching Some Zetas","+50 Muscle","6-7 sake bombers","Monster: War Pledge"]);
	advOptions.push(["Fratacombs","+50 Muscle","acquire 2 of: brain-meltingly-hot chicken wings, frat brats, \nknob ka-bobs, can of Swiller, melted Jell-o shot","in War Hippy Fatigues: start the war \notherwise: nothing"]);
	advOptions.push(["One Less Room Than In That Movie","+50 Muscle","acquire 2-5 beer bombs","Monster: Frat Warrior drill sergeant"]);

	//The Penultimate Fantasy Airship
	advOptions.push(["Random Lack of an Encounter","fight a random monster","Penultimate Fantasy chest","+18-39 to all stats, lose 40-50 HP"]);

	// Pirate's Cove
	advOptions.push(["Amatearrr Night","stuffed shoulder parrot, -3 HP","+100 Meat","eyepatch"]);
	advOptions.push(["Barrie Me at Sea","stuffed shoulder parrot, -5 Meat","swashbuckling pants","+100 Meat"]);
	advOptions.push(["The Arrrbitrator","eyepatch","swashbuckling pants","+100 Meat"]);

	// The Rogue Windmill
	advOptions.push(["La Vie Boheme","+80-100 HP and Effect: Rat-Faced","Monster: Sensitive poet-type","+mainstat Moxie (max 150)"]);
	advOptions.push(["Backstage at the Rogue Windmill","with Bats in the Belfry, Effect: No Vertigo \nw/out, nothing","+mainstat Muscle (max 150)","with Spirit of Alph, Effect: Dancing Prowess \nw/out, nothing"]);
	advOptions.push(["Up in the Hippo Room","with Good with the Ladies, acquire Can-Can skirt \nw/out, Monster: Can-can dancer","with Feelin' Philosophical, acquire not-a-pipe \nw/out, nothing","+mainstat Mysticality (max 150)"]);

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
	advOptions.push(["An Interesting Choice","+5-10 Moxie","+5-10 Muscle","Monster: spooky vampire"]);
	advOptions.push(["A Three-Tined Fork","Muscle starter items","Myst starter items","Moxie starter items"]);
	advOptions.push(["Footprints","SC items","TT items",""]);
	advOptions.push(["A Pair of Craters","PM items","SR items",""]);
	advOptions.push(["The Road Less Visible","DB items","AT items",""]);
	advOptions.push(["Have a Heart","bottle of used blood","",""]);
	advOptions.push(["Maps and Legends","Spooky Temple map","nothing (no adv loss)","nothing (no adv loss)"]);
	
	// The Stately Pleasure Dome
	advOptions.push(["Down by the Riverside","+mainstat Muscle (max 150)","+80-100 MP and Effect: Spirit of Alph","Monster: Roller-skating Muse"]);
	advOptions.push(["Beyond Any Measure","with Rat-Faced, Effect: Night Vision \nw/out, nothing","with Bats in the Belfry, Effect: Good with the Ladies, \nw/out, nothing","+mainstat Mysticality (max 150)","nothing (no adventure loss)"]);
	advOptions.push(["Death is a Boat","with No Vertigo: S.T.L.T \nw/out: nothing","+mainstat Moxie (max 150)","with Unusual Fashion Sense: albatross necklace \nw/out: nothing"]);

	// Whitey's Grove
	advOptions.push(["Don't Fence Me In","+20-30 Mus","white picket fence","piece of wedding cake"]);
	advOptions.push(["The Only Thing About Him is the Way That He Walks","+20-30 Mox","3 boxes of wine","mullet wig"]);
	advOptions.push(["Rapido!","+20-30 Mys","3 jars of white lightning","white collar"]);


	// Buff areas

	// The Friars
	advOptions.push(["Brother Flying Burrito, the Deep Fat Friar","+~25% food drops for 20 adventures"]);
	advOptions.push(["Brother Corsican, the Deep Fat Friar","+2 familiar experience per combat adventure \nfor 20 adventures"]);
	advOptions.push(["Brother Smothers, the Deep Fat Friar","+~25% booze drops for 20 adventures"]);

	// The Nuns
	advOptions.push(["Get Healed","+1,000 HP"]);
	advOptions.push(["Get a Massage","+1,000 HP, +1,000 MP"]);

	// The Arena
	advOptions.push(["Party with the free spirits","+5 stats per fight for 20 adventures","+~20% item drops for 20 adventures","+5lb familiar weight for 20 adventures"]);
	advOptions.push(["Try to get into the music","+10% to all attributes for 20 adventures","+40% meat from monsters for 20 adventures","increases initiative(?) for 20 adventures"]);


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
