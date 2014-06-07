// Tard's KoL Scripts
// Copyright (c) 2006, Byung Kim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Data and calculation sources:
// Kingdom of Loathing Familiar Tool by Xylpher (#540421) http://www.few.vu.nl/~rminne/kol/kolfamiliars.php
// Vladjimir (#243023) http://www.the-rye.dreamhosters.com/familiars/
//
// ==UserScript==
// @name           Tard's Cake-Shaped Arena Trainer
// @namespace      http://kol.dashida.com
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.html
// @include        *kingdomofloathing.com/arena.php
// @include        *127.0.0.1:*/main_c.html
// @include        *127.0.0.1:*/main.html
// @include        *127.0.0.1:*/arena.php
// @description    Version 1.56
// ==/UserScript==


/********************************** Change Log **********************************************

Latest Updates:
1.56 (by Hellion), 15Feb2011
	- added through obtuse angel.  still need real data for hedgehog.
1.55 (by Hellion), 18Nov2010 
	- added through smiling rat.  need real data for piano cat, dramatic hedgehog.
1.54 (by Hellion), 03Aug2010
  - added through mini-hipster, updated other "provisional" values.
  - expanded variable names for readability.  
1.53 (by Hellion), 15Oct2009
  - added through chauvinist pig 
1.52 (by Hellion), 03Aug2009
  - added he-boulder 
1.51 (by Hellion) 
 - added baby sandworm
1.5 (by Hellion) 
 - added familiars from Disembodied Hand (92) to Wereturtle (110)
 - fixed issue with Full Mode, which recently bolded the familiar weight.
1.4 (by Svidrigailov)
- Added O.A.F., Penguin Goodfella, Green Pixie, Ragamuffin Imp, Exotic Parrot
1.3
- Fixed numbers for Ninja Snowflake (thanks seether295), Added Dandy Lion
1.2
- Added Ninja Snowflake
1.1
- Added Jitterbug, Nervous Tick, Origami Towel Crane, Evil Teddy Bear, Toothsome Rock, Ancient Yuletide Troll
1.0
- Added Misshapen Animal Skeleton, Scary Death Orb

********************************************************************************************/
if (window.location.pathname == "/main_c.html" || window.location.pathname == "/main.html") {

	setTimeout('if (window["checkForUpdate"]) checkForUpdate("cakearena","1.4","Cake-Shaped Arena","http://somestranger.kol.googlepages.com/tardskolscripts_cakearena.user.js");',1000);

} else if (window.name == "mainpane") {
	var allFams = new Array();
	allFams["familiar1"] = [2,1,3,0]; // Mosquito
	allFams["familiar2"] = [1,3,0,2]; // Leprechaun
	allFams["familiar3"] = [0,1,2,3]; // Levitating Potato
	allFams["familiar4"] = [3,0,2,1]; // Angry Goat
	allFams["familiar5"] = [3,0,2,1]; // Sabre-Toothed Lime
	allFams["familiar6"] = [2,2,2,2]; // Fuzzy Dice
	allFams["familiar7"] = [2,3,1,0]; // Spooky Pirate Skeleton
	allFams["familiar8"] = [0,2,1,3]; // Barrrnacle
	allFams["familiar9"] = [1,3,2,0]; // Howling Balloon Monkey
	allFams["familiar10"] = [3,2,1,0]; // Stab Bat
	allFams["familiar11"] = [2,0,1,3]; // Grue
	allFams["familiar12"] = [0,1,3,2]; // Blood-faced Volleyball
	allFams["familiar13"] = [-1,-1,-1,-1]; // 
	allFams["familiar14"] = [1,2,0,3]; // Ghuol Whelp
	allFams["familiar15"] = [0,3,1,2]; // Baby Gravy Fairy
	allFams["familiar16"] = [2,3,0,1]; // Cocoabo
	allFams["familiar17"] = [2,1,3,0]; // Star Starfish
	allFams["hat2"] = [0,3,2,1]; // Hovering Sombrero
	allFams["familiar19"] = [3,1,0,2]; // Ghost Pickle on a Stick
	allFams["familiar20"] = [3,1,2,0]; // Killer Bee
	allFams["familiar21"] = [3,1,2,0]; // Whirling Maple Leaf
	allFams["familiar22"] = [1,1,3,2]; // Coffee Pixie
	allFams["familiar23"] = [1,2,3,1]; // Cheshire Bat
	allFams["familiar24"] = [3,1,2,1]; // Jill-O-Lantern
	allFams["familiar25"] = [3,2,1,1]; // Hand Turkey
	allFams["familiar26"] = [1,2,1,3]; // Crimbo Elf
	allFams["familiar27"] = [2,1,3,1]; // Hanukkimbo Dreidl
	allFams["familiar28"] = [3,1,1,2]; // Baby Yeti
	allFams["familiar29"] = [2,3,1,1]; // Feather Boa Constrictor
	allFams["familiar30"] = [1,3,1,2]; // Emo Squid
	allFams["familiar31"] = [2,1,3,1]; // Personal Raincloud
	allFams["familiar32"] = [3,2,0,1]; // Clockwork Grapefruit
	allFams["familiar33"] = [3,0,1,2]; // MagiMechTech MicroMechaMech
	allFams["familiar34"] = [2,3,1,2]; // Flaming Gravy Fairy
	allFams["familiar35"] = [2,3,1,2]; // Frozen Gravy Fairy
	allFams["familiar36"] = [2,3,1,2]; // Stinky Gravy Fairy
	allFams["sgfairy"] = [3,3,1,2]; // Spooky Gravy Fairy
	allFams["familiar38"] = [3,2,2,1]; // Inflatable Dodecapede
	allFams["familiar39"] = [1,3,1,2]; // Pygmy Bugbear Shaman
	allFams["familiar40"] = [3,3,3,3]; // Doppelshifter
	allFams["familiar41"] = [1,1,3,2]; // Attention-Deficit Demon
	allFams["familiar42"] = [1,2,3,1]; // Cymbal-Playing Monkey
	allFams["familiar43"] = [1,3,1,2]; // Temporal Riftlet
	allFams["familiar44"] = [2,3,1,2]; // Sweet Nutcracker
	allFams["familiar45"] = [-1,-1,-1,-1]; // Pet Rock
	allFams["familiar46"] = [3,2,2,2]; // Sleeping Snowy Owl
	allFams["familiar47"] = [2,3,1,2]; // Teddy Bear
	allFams["npzr"] = [3,3,3,3]; // Ninja Pirate Zombie Robot
	allFams["slgfairy"] = [3,3,2,1]; // Sleazy Gravy Fairy
	allFams["hare"] = [1,3,2,0]; // Wild Hare
	allFams["chatteeth"] = [3,0,2,1]; // Wind-up Chattering Teeth
	allFams["ghobo"] = [2,1,3,0]; // Spirit Hobo
	allFams["badger"] = [3,0,2,3]; // Astral Badger
	allFams["commacha"] = [0,0,0,2]; //Comma Chameleon
	allFams["animskel"] = [3,2,1,2]; //Misshapen Animal Skeleton
	allFams["orb"] = [3,2,1,0]; //Scary Death Orb
	allFams["jitterbug"] = [1,3,2,2]; //Jitterbug
	allFams["tick"] = [1,3,2,2]; //Nervous Tick
	allFams["blackbird1"] = [0,0,0,0]; //Reassembled Blackbird
	allFams["crane1"] = [3,1,0,2]; //Origami Towel Crane
	allFams["snowflake"] = [3,0,3,3]; //Ninja Snowflake
	allFams["teddybear"] = [3,2,0,1]; //Evil Teddy Bear
	allFams["pettoothrock"] = [-1,-1,-1,-1]; //Toothsome Rock
	allFams["crimbotroll"] = [2,3,1,0]; //Ancient Yuletide Troll
	allFams["dandylion"] = [0,3,2,1]; //Dandy Lion
	allFams["oaf"] = [0,0,0,0]; //O.A.F.
	allFams["goodfella"] = [3,2,1,0]; //Penguin Goodfella
	allFams["hounddog"] = [1,3,3,2]; //Jumpsuited Hound Dog
	allFams["pictsie"] = [3,2,0,2]; //Green Pixie
	allFams["ragimp"] = [3,3,3,3]; //Ragamuffin Imp
	allFams["parrot"] = [3,3,1,0]; //Exotic Parrot
	allFams["waf"] = [2,3,2,2]; //Wizard Action Figure
	allFams["ggg"] = [2,3,3,1]; //Gluttonous Green Ghost
	allFams["cassagnome"] = [0,1,3,2]; //Casagnova Gnome
	allFams["hunchback"] = [1,3,0,2]; //Hunchbacked Minion
	allFams["pressiebot"] = [3,2,0,1]; //Crimbo PRESSIE
	allFams["wcb"] = [-1,-1,-1,-1]; //Bulky Buddy Box
	allFams["teddyborg"] = [3,2,0,1]; //Teddy Borg
	allFams["robogoose"] = [2,3,1,0]; //Robogoose
	allFams["megadrone"] = [3,3,3,3]; //El Vibrato Megadrone
	allFams["hatrack"] = [3,0,1,2]; //Mad hatrack
	allFams["hobomonkey"] = [0,3,3,3]; //Hobo Monkey
	allFams["Llama"] = [1,2,3,2]; //Llama lama
	allFams["Cccarnie"] = [1,1,1,1]; //Cotton Candy Carnie :: 
	allFams["Dishand"] = [3,0,2,2]; // Disembodied Hand
	allFams["Blackcat2"] = [-1,-1,-1,-1]; //Black Cat
	allFams["Uniclops"] = [2,2,3,1]; //Uniclops
	allFams["Dancebear"] = [1,2,1,3]; // Psychedelic Bear
	allFams["rattlesnake"] = [3,1,0,2]; //  Baby Mutant Rattlesnake
	allFams["fireant"] = [3,0,2,2]; // Mutant Fire Ant
	allFams["cactusbud"] = [3,2,2,0]; // Mutant Cactus Bud
	allFams["gilamonster"] = [3,2,2,0]; // Mutant Gila Monster
	allFams["cuddlefish"] = [0,3,3,1]; // Cuddlefish
	allFams["sugarfairy"] = [0,3,2,3]; // Sugar Fruit Fairy
	allFams["crab"] = [3,2,2,1]; // Imitation Crab
	allFams["raggedclaws"] = [2,2,2,2]; // Pair of Ragged Claws
	allFams["dragonfishfam"] = [1,2,0,1]; // Magic Dragonfish
	allFams["bandersnatch"] = [2,2,0,2]; //  Frumious Bandersnatch
	allFams["midgetclownfish"] = [0,2,2,1]; //  Midget Clownfish
	allFams["syncturtle"] = [0,3,2,2]; // Syncopated Turtle
	allFams["grinturtle"] = [1,0,3,0]; // Grinning Turtle
	allFams["purserat"] = [0,0,0,0]; // Purse Rat
	allFams["turtle"] = [3,0,2,1]; //  Wereturtle  ::  20May2009
	allFams["babyworm"] = [3,2,3,2]; // baby sandworm :: 11Jul2009
	allFams["heboulder"] = [3,3,2,1]; // he-boulder  :: 03Aug2009
	allFams["rocklobster"] = [3,2,1,2]; 
	allFams["slimeling"] = [3,2,2,3];
	allFams["urchin"] = [3,0,2,3];
	allFams["grouper2"] = [0,3,2,2];
	allFams["gibberer"] = [1,2,2,2];
	allFams["dancfrog"] = [1,2,2,3];	
	allFams["chauvpig"] = [0,3,2,1]; // end of update 15Oct2009
	allFams["Smimic"] = [0,0,0,0]; // Mimic--doesn't do well in the arena.
	allFams["Snowangel"] = [2,1,3,2];
	allFams["Jackinthebox"] = [0,0,0,0];
	allFams["Brickochick"] = [1,2,2,1];
	allFams["Babybugbug"] = [-1,-1,-1,-1]; // too bugged to boogie in the arena.
	allFams["Uwbonsai"] = [3,1,3,0];
	allFams["Tronguy"] = [3,2,2,0];
	allFams["Minihipster"] = [0,3,2,1]; // end of update Aug2010
	allFams["sp_owl"] = [3,1,2,0];
	allFams["Hippofam"] = [3,2,3,0];
	allFams["organgoblin"] = [0,3,2,1];
	allFams["pianocat"] = [1,2,2,0];	
	allFams["Dramahog"] = [1,1,1,1];	// info unavailable as of 11/18/2010--still not in on 2/15/2011!  who's slacking on the spading??
	allFams["Smilerat"] = [1,3,1,0];
	allFams["roboreindeer"] = [3,3,3,3];
	allFams["holidaylog"] = [-1,-1,-1,-1]; // it's log!
	allFams["obtuseangel"] = [3,0,3,3]; // end of update 15Feb2011
//	allFams[""] = [,,,];
	
	
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://' + window.location.host + '/charpane.php',
    headers: {'Accept': 'text/html',},	//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				strHTML = responseDetails.responseText;
				isFullMode = (strHTML.indexOf("Level") != -1);
				var i1 = strHTML.indexOf("familiar.php");
				var i2 = strHTML.indexOf("itemimages/",i1);
				var i3 = strHTML.indexOf(".gif",i2);
				famType = strHTML.substring(i2+11,i3);
				famWgt = (isFullMode ? strHTML.match(/\d+<\/b> pound/)[0].replace(/<\/b> pound/,"") : strHTML.match(/\d+ lb/)[0].replace(/ lb/,""));
// GM_log("famWgt = "+famWgt);
				bodyHTML = document.getElementsByTagName("table")[3].innerHTML;
				arenaType = bodyHTML.match(/itemimages\/[^\.]+\.gif/g);
				arenaWeight = bodyHTML.match(/\d+\slb/g);
				arenaEnemy = new Array();
				for (var i=0;i<=4;i++) {
					arenaEnemy[arenaEnemy.length] = [arenaType[i].replace(/itemimages\//,"").replace(/\.gif/,""),arenaWeight[i].replace(/\slb/,"")];
				}
				// arenaEnemy[i] becomes equal to [imagename, weight].
				
				famStrengths = allFams[famType];
				// r will contain [enemy index, event index, performance indicator]
				r = new Array();
				if (famStrengths && famStrengths[0] != -1) {
					for (var i in arenaEnemy) {	// for each arena opponent...
						thisEnemy = arenaEnemy[i];
						enemyType = thisEnemy[0];
						enemyWeight = thisEnemy[1];
						enemyStrengths = allFams[enemyType];
						for (j=0;j<=3;j++) {	// for each event...
							if (enemyStrengths[j] == -1) {			// familiar can't compete.  Should never happen, included for completeness only.
								enemyPerformance = 1000;
							} else if (enemyStrengths[j] == 0) {	// familiar sucks at this, its performance is uniformly bad.
								enemyPerformance = 5;
							} else {								// otherwise it goes by weight + (3*rating).
								enemyPerformance = Number(enemyWeight) + enemyStrengths[j]*3;
							}
							
							// how heavy does my familiar need to be to beat this opponent in this event?
							famWinWgt = (Number(enemyPerformance) + 3) - 3*famStrengths[j];
							
							// if my fam can win this fight and is not weak at it, add it to the list of potential match-ups.
							if (famWgt >= famWinWgt && famStrengths[j] != 0) r.push([i,j,Number(famWgt) - Number(famWinWgt)])
						}
					}
					// sort all the potential match-ups so that the one that I win by the smallest weight margin ends up in slot 0.
					r.sort(function(a,b) {
					return (a[2] < b[2] ? -1 : 1);
					});
					
					// if slot 0 is populated, use it to set up the button selections.
					if (r[0]) { setTimeout('' +
						'document.forms["compete"].whichopp['+r[0][0]+'].checked = true;' +
						'document.forms["compete"].event['+r[0][1]+'].checked = true;' +
						'document.forms["compete"].elements[10].style.background = "#0f0";' +
					'',100); 
					} 
					// otherwise, note our failure to divine a suitable matchup.
					else { setTimeout('' + 
						'document.forms["compete"].elements[10].style.background = "#f00";',
						100);
					}
				}
				// familiar doesn't fight right: note inability to pick a suitable matchup.
				else { setTimeout('' + 
						'document.forms["compete"].elements[10].style.background = "#f00";',
						100);
				}
			}
    }
	});
}
