// ==UserScript==
// @name           MonsterStats2
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/familiar.php*
// @include        *kingdomofloathing.com/topmenu.php*
// @include        *kingdomofloathing.com/compactmenu.php*
// @include        *kingdomofloathing.com/maint.php*
// @include        *kingdomofloathing.com/account.php*
// @include        *kingdomofloathing.com/main*.html*
// @include        *kingdomofloathing.com/rats.php*
// @include        *kingdomofloathing.com/barrels.php*
// @include        *127.0.0.1:600*/fight.php*
// @include        *127.0.0.1:600*/main.php*
// @include        *127.0.0.1:600*/charpane.php*
// @include        *127.0.0.1:600*/inventory.php*
// @include        *127.0.0.1:600*/familiar.php*
// @include        *127.0.0.1:600*/topmenu.php*
// @include        *127.0.0.1:600*/compactmenu.php*
// @include        *127.0.0.1:600*/maint.php*
// @include        *127.0.0.1:600*/account.php*
// @include        *127.0.0.1:600*/main*.html*
// @include        *127.0.0.1:600*/rats.php*
// @include        *127.0.0.1:600*/barrels.php*
// @exclude        http://images.kingdomofloathing.com/*
// @exclude        http://forums.kingdomofloathing.com/*
// @description    Version 9.2
// ==/UserScript==


/********************************** Recent Changes **********************************************
Recent Updates:
9.2 Properly handle stat days vs in-run moon sign (broken for post ronin SC)
    Fix damage for Kodiak Moment
    Initial handling for Monster Manuel
9.1 Changed options to work with the new options menu layout.
    Added a bunch of Zombie skills, new familiars, objects, etc.
9.0 Rewrite by garbled
8.5 Updated volley/brero formulas
    Changed monster hit calculation to match new formulas
    Modified the MonsterStats box (enlarged text, removed monster elemental hits [It's not being used])
    Fixed the meat parser (again)
    Added Nemesis familiars
    Fixed ducks on a string problem
    Skills are now properly counted even when you have skills that are "forgotten"
8.4 Added SFF to fairy array (how'd I miss that?)
    Bugfixed the auto-updater
8.3 Restored meat-drop calculations
    Corrected Envy penalty
    Auto-update is fixed (I think)
8.2 Restored AFH parser
    Changed how critcial hit modifiers are accounted for
8.1 Skills once again respect Bad Moon and Hardcore
    Revived Compact Mode compatibility
    Cleaned the code base (removed LSE, !potion tracking)
    Updated arrays (must think of some way to automate this)
8.0 Skills now respect Bad Moon and Hardcore
    Fixed familiar weight calculation
    Fixed a whole buncha' stuff that broke in my absence
7.9 Switch to AFH's data
    Maybe some bugfixes
********************************************************************************************/

var primary;

//Original script
function MonsterStats()
{
	var me = this;
	primary = this;

	// cache GM api references for later use
	me.GM_log = GM_log;
	me.GM_getValue = GM_getValue;
	me.GM_setValue = GM_setValue;

	me.GM_registerMenuCommand = GM_registerMenuCommand;
	me.GM_xmlhttpRequest = GM_xmlhttpRequest;

	// Set info about the script.  So the script knows about... itself.
	// Why am I not using constants for these?  I probably should. Let me think on that.
	scriptVer = 9.2;
	scriptName = "MonsterStats2";
	scriptURL = "http://userscripts.org/scripts/source/141942.meta.js";
	scriptSite = "http://userscripts.org/scripts/review/141942";

	me.KW_PREFIX = 'KW7';
	me.R_PREFIX = 'R7';
	me.Y_PREFIX = 'Y8';
	me.N_PREFIX = 'N8';
	me.UFI_PREFIX = 'U2';

	// Since we kludge a bit of wikification in here (because the WikiLink script can't access the content we added), here's the wrapper to
	// put around the entry name.
	me.wikiWrapperPre = '<font size=1>&nbsp;<sup><a tabindex="-1" href="http://kol.coldfront.net/thekolwiki/index.php/';
	me.wikiWrapperPost = '" TARGET="_blank">w</a></sup></font>&nbsp;';

	// To support color-coded elemental names (and overcome some legacy / non-standard naming conventions like "FIRE") we remap to something we can
	// easily display in the table
	me.elementalTypes = [["HOT","<font color=red>Hot</font>"],["FIRE","<font color=red>Hot</font>"],["COLD","<font color=blue>Cold</font>"],
	    ["SLEAZE","<font color=blueviolet>Sleaze</font>"],["SLEAZY","<font color=blueviolet>Sleaze</font>"],["STENCH","<font color=green>Stench</font>"],
	    ["STINKY","<font color=green>Stench</font>"],["SPOOKY","<font color=grey>Spooky</font>"]];

	// Character Class Titles
	me.characterClasses = [["Seal Clubber","Muscle",["Lemming Trampler","Tern Slapper","Puffin Intimidator","Ermine Thumper","Penguin Frightener","Malamute Basher","Narwhal Pummeler","Otter Crusher","Caribou Smacker","Moose Harasser","Reindeer Threatener","Ox Wrestler","Walrus Bludgeoner","Whale Boxer","Seal Clubber"]],
	                          ["Turtle Tamer","Muscle",["Toad Coach","Skink Trainer","Frog Director","Gecko Supervisor","Newt Herder","Frog Boss","Iguana Driver","Salamander Subduer","Bullfrog Overseer","Rattlesnake Chief","Crocodile Lord","Cobra Commander","Aligator Subjugator","Asp Master","Turtle Tamer"]],
	                          ["Pastamancer","Mysticality",["Dough Acolyte","Yeast Scholar","Noodle Neophyte","Starch Savant","Carbohydrate Cognoscenti","Spaghetti Sage","Macaroni Magician","Vermicelli Enchanter","Linguini Thaumaturge","Ravioli Sorcerer","Manicotti Magus","Spaghetti Spellbinder","Canneloni Conjurer","Angel-Hair Archmage","Pastamancer"]],
	                          ["Sauceror","Mysticality",["Allspice Acolyte","Cilantro Seer","Parsley Enchanter","Sage Sage","Rosemary Diviner","Thyme Wizard","Tarragon Thaumaturge","Oreganoccultist","Basillusionist","Coriander Conjurer","Bay Leaf Brujo","Sesame Soothsayer","Marinara Mage","Alfredo Archmage","Sauceror"]],
	                          ["Accordion Thief","Moxie",["Polka Criminal","Mariachi Larcenist","Zydeco Rogue","Chord Horker","Chromatic Crook","Squeezebox Scoundrel","Concertina Con Artist","Button Box Burglar","Hurdy-Gurdy Hooligan","Sub-Sub-Apprentice Accordion Thief","Sub-Apprentice Accordion Thief","Pseudo-Apprentice Accordion Thief ","Hemi-Apprentice Accordion Thief","Apprentice Accordion Thief","Accordion Thief"]],
	                          ["Disco Bandit","Moxie",["Funk Footpad","Rhythm Rogue","Chill Crook","Jiggy Grifter","Beat Snatcher","Sample Swindler","Move Buster","Jam Horker","Groove Filcher","Vibe Robber","Boogie Brigand","Flow Purloiner","Jive Pillager","Rhymer And Stealer","Disco Bandit"]]];

	// Some monsters share names-- this is bad because it's sometimes hard to tell them apart.  So we look for other text on
	// the page to help identify which version of a monster it is-- this table maps from monster name through text-to-find to
	// disambiguated monster name.  Then there's the matter of mapping the disambiguated name to 3 non-standardized data sources,
	// but that's handled elsewhere.
//["7-FOOT DWARF","moil","7-FOOT DWARF (MOIL)"],["7-FOOT DWARF","Royale","7-FOOT DWARF (ROYALE)"],
	me.monsterNameModifiers = [
		["ORCISH FRAT BOY","paddling","ORCISH FRAT BOY (PADDLING)"],["ORCISH FRAT BOY","French Maid","ORCISH FRAT BOY (FRENCH MAID)"],
		["ORCISH FRAT BOY","Sorority Orcs","ORCISH FRAT BOY (SORORITY ORCS)"],["NINJA SNOWMAN","lunch","NINJA SNOWMAN (CHOPSTICKS)"],
		["NINJA SNOWMAN","carrot nose","NINJA SNOWMAN (HILT/MASK)"],["NINJA SNOWMAN","several","NINJA SNOWMAN (HILT/MASK)"],
		["NINJA SNOWMAN","a shuriken","NINJA SNOWMAN (HILT/MASK)"],["NINJA SNOWMAN","focuses his chi","NINJA SNOWMAN (HILT/MASK)"],
		["NINJA SNOWMAN","focus his chi","NINJA SNOWMAN (HILT/MASK)"],
		["TRIPPY FLOATING HEAD","religion","TRIPPY FLOATING HEAD (RELIGION)"],
		["TRIPPY FLOATING HEAD","stench","TRIPPY FLOATING HEAD (STENCH)"],["TRIPPY FLOATING HEAD","Todd","TRIPPY FLOATING HEAD (TODD)"],
		["ANIMATED NIGHTSTAND","pawing the","ANIMATED NIGHTSTAND (MAHOGANY)"],
		["ANIMATED NIGHTSTAND","bite you","ANIMATED NIGHTSTAND (MAHOGANY)"],
		["ANIMATED NIGHTSTAND","possesses","ANIMATED NIGHTSTAND (WHITE)"],["KNIGHT","coiled snake","KNIGHT (SNAKE)"],
		["KNIGHT","snarling wolf","KNIGHT (WOLF)"]];

	// Familiars are numbered in KoL-- this is a magic decoder ring going from number to familiar.
	// Note that javascript arrays are zero-based and the familiar numbering is one-based, so the first entry is blank.
	// Also, Familiar 13 doesn't exist because of Jick's aversion to the number 13.
	me.familiarDecoder = ["","Mosquito","Leprechaun","Levitating Potato","Angry Goat",
	    "Sabre-Toothed Lime","Fuzzy Dice","Spooky Pirate Skeleton","Barrrnacle","Howling Balloon Monkey",
	    "Stab Bat","Grue","Blood-Faced Volleyball","","Ghuol Whelp","Baby Gravy Fairy","Cocoabo",
	    "Star Starfish","Hovering Sombrero","Ghost Pickle on a Stick","Killer Bee","Whirling Maple Leaf",
	    "Coffee Pixie","Cheshire Bat","Jill-O-Lantern","Hand Turkey","Crimbo Elf","Hanukkimbo Dreidl",
	    "Baby Yeti","Feather Boa Constrictor","Emo Squid","Personal Raincloud","Clockwork Grapefruit",
	    "MagiMechTech MicroMechaMech","Flaming Gravy Fairy","Frozen Gravy Fairy","Stinky Gravy Fairy",
	    "Spooky Gravy Fairy","Inflatable Dodecapede","Pygmy Bugbear Shaman","Doppelshifter","Attention-Deficit Demon",
	    "Cymbal-Playing Monkey","Temporal Riftlet","Sweet Nutcracker","Pet Rock","Snowy Owl",
	    "Teddy Bear","Ninja Pirate Zombie Robot","Sleazy Gravy Fairy","Wild Hare","Wind-up Chattering Teeth",
	    "Spirit Hobo","Astral Badger","Comma Chameleon","Misshapen Animal Skeleton","Scary Death Orb",
	    "Jitterbug","Nervous Tick","Reassembled Blackbird","Origami Towel Crane","Ninja Snowflake","Evil Teddy Bear",
	    "Toothsome Rock","","Ancient Yuletide Troll","Dandy Lion", "O.A.F.", "Penguin Goodfella",
	    "Jumpsuited Hound Dog","Green Pixie","Ragamuffin Imp","Exotic Parrot","Wizard Action Figure",
	    "Gluttonous Green Ghost","Casagnova Gnome","Hunchbacked Minion","Crimbo P. R. E. S. S. I. E.",
	    "Bulky Buddy Box","Teddy Borg","RoboGoose","El Vibrato Megadrone","Mad Hatrack","Adorable Seal Larva",
	    "Untamed Turtle","Animated Macaroni Duck","Pet Cheezling","Autonomous Disco Ball","Mariachi Chihuahua",
	    "Hobo Monkey","Llama Lama","Cotton Candy Carnie","Disembodied Hand","Black Cat","Uniclops","Psychedelic Bear",
	    "Baby Mutant Rattlesnake","Mutant Fire Ant","Mutant Cactus Bud","Mutant Gila Monster","Cuddlefish",
	    "Sugar Fruit Fairy","Imitation Crab","Pair of Ragged Claws","Magic Dragonfish","Frumious Bandersnatch",
	    "Midget Clownfish","Syncopated Turtle","Grinning Turtle","Purse Rat","Wereturtle","Baby Sandworm",
	    "Slimeling","He-Boulder","Rock Lobster","Urchin Urchin","Grouper Groupie","Squamous Gibberer",
	    "Dancing Frog","Chauvinist Pig","Stocking Mimic","Snow Angel","Jack-in-the-Box","BRICKO chick","Baby Bugged Bugbear",
	    "","","","","","","","","","Underworld Bonsai","Rogue Program","Mini-Hipster","Pottery Barn Owl",
	    "Hippo Ballerina","Knob Goblin Organ Grinder","Piano Cat","Dramatic Hedgehog",
	    "Smiling Rat","Robot Reindeer","Holiday Log","","Obtuse Angel","Reconstituted Crow",
	    "Li'l Xenomorph","Dataspider","Pair of Stomping Boots","Feral Kobold","Fancypants Scarecrow","",
	    "Bloovian Groose","Blavious Kloop","Peppermint Rhino","Tickle-Me Emilio","","Happy Medium","Artistic Goth Kid",
	    "Flaming Face","Reagnimated Gnome","Hovering Skull"];

	// Rather annoyingly, some familiars can't be identified in the charpane by number or name-- so we remap from image name to familiar.
	me.familiarImageNameDecoder = [["hat2","Hovering Sombrero"],["sgfairy","Spooky Gravy Fairy"],["npzr","Ninja Pirate Zombie Robot"],
	    ["slgfairy","Sleazy Gravy Fairy"],["hare","Wild Hare"],["chatteeth","Wind-up Chattering Teeth"],["ghobo","Spirit Hobo"],
	    ["badger","Astral Badger"],["commacha","Comma Chameleon"],["animskel","Misshapen Animal Skeleton"],["orb","Scary Death Orb"],
	    ["jitterbug","Jitterbug"],["tick","Nervous Tick"],["blackbrid1","Reassembled Blackbird"],["crane1","Origami Towel Crane"],
	    ["snowflake","Ninja Snowflake"],["teddybear","Evil Teddy Bear"],["pettoothrock","Toothsome Rock"],["crimbotroll","Ancient Yuletide Troll"],
	    ["dandylion","Dandy Lion"],["oaf","O.A.F."],["goodfella","Penguin Goodfella"],["hounddog.gif","Jumpsuited Hound Dog"],
	    ["pictsie","Green Pixie"],["ragimp","Ragamuffin Imp"],["parrot","Exotic Parrot"],["waf","Wizard Action Figure"],
	    ["ggg","Gluttonous Green Ghost"],["cassagnome","Casagnova Gnome"],["hunchback","Hunchbacked Minion"],["pressiebot","Crimbo P. R. E. S. S. I. E."],
	    ["wcb","Bulky Buddy Box"],["teddyborg","Teddy Borg"],["robogoose","RoboGoose"],["megadrone","El Vibrato Megadrone"],
	    ["hatrack","Mad Hatrack"],["seallarva","Adorable Seal Larva"],["untamed","Untamed Turtle"],["macaroniduck","Animated Macaroni Duck"],
	    ["cheezblob","Pet Cheezling"],["discoball","Autonomous Disco Ball"],["chihuahua","Mariachi Chihuahua"],
	    ["hobomonkey","Hobo Monkey"],["llama","Llama Lama"],["cccarnie","Cotton Candy Carnie"],["dishand","Disembodied Hand"],
	    ["blackcat","Black Cat"],["uniclops","Uniclops"],["dancebear","Pyschedelic Bear"],["rattlesnake","Baby Mutant Rattlesnake"],
	    ["fireant","Mutant Fire Ant"],["cactusbud","Mutant Cactus Bud"],["gilamonster","Mutant Gila Monster"],
	    ["cuddlefish","Cuddlefish"],["sugarfairy","Sugar Fruit Fairy"],["crab","Imitation Crab"],["raggedclaws","Pair of Ragged Claws"],
	    ["dragonfishfam","Magic Dragonfish"],["bandersnatch","Frumious Bandersnatch"],["midgetclownfish","Midget Clownfish"],
	    ["syncturtle","Syncopated Turtle"],["grinturtle","Grinning Turtle"],["purserat","Purse Rat"],
	    ["turtle","Wereturtle"],["babyworm","Baby Sandworm"],["slimeling","Slimeling"],["heboulder","He-Boulder"],
	    ["rocklobster","Rock Lobster"],["urchin","Urchin Urchin"],["grouper2","Grouper Groupie"],["gibberer","Squamous Gibberer"],
	    ["dancfrog","Dancing Frog"],["chauvpig","Chauvinist Pig"],["smimic","Stocking Mimic"],["snowangel","Snow Angel"],
	    ["jackinthebox","Jack-in-the-Box"]];

	// Some familiars enhance stat gains like a Blood-Faced Volleyball.  Here's a list of them.
	me.volleyballFamiliars = ["Blood-Faced Volleyball","Cheshire Bat","Jill-O-Lantern","Pygmy Bugbear Shaman",
	    "Cymbal-Playing Monkey","Spirit Hobo","Nervous Tick","Ancient Yuletide Troll","Penguin Goodfella",
	    "Gluttonous Green Ghost","Hunchbacked Minion","Frumious Bandersnatch","Grinning Turtle",
	    "Chauvinist Pig","Baby Bugged Bugbear","Dramatic Hedgehog","Smiling Rat",
	    "Li'l Xenomorph","Bloovian Groose","Happy Medium","Artistic Goth Kid","Hovering Skull"];

	// Some familiars enhance stat gains like a Hovering Sombrero.
	me.sombreroFamiliars = ["Hovering Sombrero","Crimbo P. R. E. S. S. I. E.","Baby Sandworm"];

	// The collective brightness of the two moons impacts the behavior of certain items, effects, and familiars.  This array converts from
	// Moon Image Numbers to effective brightness.  The logic is patterned after Tard's framework script (all hail Tard!).
	// me.moonBrightnessNew includes modifiers for the effect of the minimoon.
	// There's a subarray per moon graphic (with a placeholder 0 array for moon0, which does not exist), with the first
	// element being the unmodified moon, the second for moon#a, the third for moon#b.
	me.moonBrightness = [[0,0,0],[0,1,1],[1,0,2],[2,1,3],[3,2,4],[4,3,3],[3,4,2],[2,3,1],[1,2,0]];
	me.freestandingMinimoonBrightness = [0,1,0];

	//                    Moon      0(fake) 1       2       3       4       5       6       7       8
	me.grimaciteUnitsRonald =  [[0,0,0],[0,0,0],[0,1,2],[0,1,0],[0,1,0],[0,1,1],[0,0,1],[0,0,1],[0,0,1]];
	me.grimaciteUnitsGrimace = [[0,0,0],[4,3,3],[3,4,2],[2,3,1],[1,2,0],[0,1,1],[1,0,2],[2,1,3],[3,2,4]];
	me.freestandingMiniMoonGrimaciteUnits = [0,0,1];

	// Certain moon configurations indicate stat days.  This is an easy decoder.
	// Decoder: [[Moon Combination], Musc_Day, Mys_Day, Mox_Day], ...
	me.statDays = [["1,1",0,0,1],["5,3",0,1,0],["1,5",1,0,0],["2,5",1,0,0],["5,7",0,1,0],["8,8",0,0,1]];

	//--------------------------------------------
	// Monster Level Modifiers
	//--------------------------------------------

	// ARRAY: me.itemMLModifiers
	// DESCRIPTION: List of items that impact Monster Level if they are equipped.
	// NOTES: We read these off of the charpage IFF we have reason to believe they have changed.
	// FORMAT: [["Item Name"], Levels of INCREASE to ML]
	me.itemMLModifiers = [["old patched suit-pants",40],["hockey stick of furious angry rage",30],["vinyl shield",25],
		["stainless steel scarf",20],["ice sickle",15],["creepy-ass club",15],["evil-ass club",15],
		["frigid-ass club",15],["hot-ass club",15],["nasty-ass club",15],["C.A.R.N.I.V.O.R.E. button",15],
		["hipposkin poncho",10],["dreadlock whip",10],["rave whistle",10],["curmudgel",8],["serpentine sword",10],
		["snake shield",0],["bad-ass club",10],["hippo whip",10],["spiky turtle helmet",8],["buoybottoms",7],
		["grumpy old man charm bracelet",7],["squeaky staff",6],["giant needle",5],["annoying pitchfork",5],
		["goth kid t-shirt",5],["ring of aggravate monster",5],["bat whip",5],["beer bong",5],["rattail whip",5],
		["tail o' nine cats",5],["tin star",5],["can cannon",3],["world\'s smallest violin",5],["flaming familiar ",5],
		["magic whistle",4],[" brand sword",3],["styrofoam crossbow",3],["styrofoam staff",3],["styrofoam sword",3],
		["hipposkin poncho",10],["nasty rat mask",-5],["Drowsy Sword",-10],["bugged balaclava",20],
		["bone spurs",20],["cane mail shirt",20],["Boris\'s Helm (askew)",15],["astral belt",20]];

	// Outfits that when equipped have a net impact Monster Level above and beyond the effects of their component parts.
	me.outfitMLModifiers = [["Furry Suit",5]];

	// Items that impact ML based on the number of active grimacite (darkness) moon units.  The second element is the
	// amount to increase ML per grimacite-unit.
	me.grimaciteMLModifiers = [["Grimacite guayabara",10],["Grimacite gown",10],["depleted Grimacite hammer",5]];

	// ARRAY: me.effectMLModifiers
	// DESCRIPTION: List of effects that impact Monster Level if they are active.
	// NOTES: We read these off of the charPANE (vs charPAGE) every time it is refreshed (usually once per action or round of combat)
	// FORMAT: [["Effect Name"], Levels of INCREASE to ML]
	me.effectMLModifiers = [["Slimebreath",50],["Unpopular",30],["Digitally Converted",30],["Memory of Aggressiveness",30],
		["Bilious",25],["Grimace",25],["The Great Tit's Blessing",20],["Contemptible Emanations",20],["Chihuahua Underfoot",20],
		["Grulched",20],["Lapdog",20],["Fondid",15],["The Cupcake of Wrath",10],["Extremely Poor Taste",10],["Spangled Star",10],
		["Eau D'enmity",5],["Gelded",5],["Mysteriously Handsome",6],["A Little Bit Evil",2],["Fearless",-10],
		["Assaulted with Pepper",20],["Overconfident",30],["Song of Cockiness",30],["Zomg WTF",30],["Simply Irritable",15]];

	//--------------------------------------------
	// Item Drop Rate Modifiers
	//--------------------------------------------

	// ARRAY: me.itemItemDropModifiers
	// DESCRIPTION: List of items that impact the Item Drop rate if they are equipped.
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Item Name"], Percentage (as decimal) to increase item drop rate (0.25 = 25%)]
	me.itemItemDropModifiers = [["Grimacite go-go boots",0.30],["hypnodisk",0.25],["Grimacite gorget",0.25],
		["C.H.U.M. lantern",0.30],["baneful bandolier", 0.30],["miniature gravy-covered maypole",0.25],
		["Mr. Accessory Jr.",0.25],["plexiglass pants",0.20],["bounty-hunting helmet",0.20],["glowing esca",0.20],
		["merkin take-bag",0.15],["ice pick",0.15],["bounty-hunting pants",0.15],["bounty-hunting rifle",0.15],
		["flaming pink shirt",0.15],["Radio KoL Maracas",0.15],["plastic pumpkin bucket",0.13],["little box of fireworks",0.125],
		["Order of the Silver Wossname",0.11],["Red Balloon of Valor",0.11],["Uranium Omega of Temperance",0.11],
		["bottle-rocket crossbow",0.10],["Baron von Ratsworth's monocle",0.10],["Coily",0.10],["flamin' bindle",0.10],
		["freezin' bindle",0.10],["sleazy bindle",0.10],["spooky bindle",0.10],["stinkin\' bindle",0.10],
		["PVC staff",0.10],["Lead Zeta of Chastity",0.10],["Purple Horseshoe of Honor",0.10],["Crimbo ukelele",0.10],
		["mayfly bait necklace",0.10],["Bag o' Tricks",0.10],["spiky turtle shield",0.10],["straw hat",0.10],
		["Aluminum Epsilon of Humility",0.09],["Blue Diamond of Honesty",0.09],["Zinc Delta of Tranquility",0.08],
		["Green Clover of Justice",0.08],["Nickel Gamma of Frugality",0.07],["Yellow Moon of Compassion",0.07],
		["lucky rabbit's foot",0.07],["Iron Beta of Industry",0.06],["Orange Star of Sacrifice",0.06],
		["Mayflower bouquet",0.05],["Copper Alpha of Sincerity",0.05],["Pink Heart of Spirit",0.05],
		["bubble bauble bow",0.05],["octopus's spade",0.05],["makeshift cape",0.05],[">duck-on-a-string",0.05],
		["miner's helmet",0.05],["bat hat",0.05],["duct tape sword",0.05],["pixel boomerang",0.05],
		["fancy opera glasses",0.05],["roboduck-on-a-string",0.05],["vampire duck-on-a-string",0.05],
		["duct-tape sword",0.05],["Grateful Undead T-shirt",0.05],["cyber-mattock",05],["molten medallion",0.05],
		["monstrous monocle",0.05],["musty moccasins",0.05],["Panda outfit",0.05],["Toddler-sized Dragon Costume",0.05],
		["gnauga hide whip",0.03],["Mr. Container",0.03],["hemp backpack",0.02],["Newbiesport� backpack",0.01],
		["aerated diving helmet",-0.5],["rusty diving helmet",-0.50],["makeshift SCUBA gear",-1.00],
		["astral mask",0.2],["Camp Scout backpack",0.15]];

	// ARRAY: me.outfitItemDropModifiers
	// DESCRIPTION: List of outfits that effect Item Drop
	// NOTES: Read from the charPAGE
	// FORMAT: ["Outfit Name", Percentage as decimal to increase item drop rate]
	me.outfitItemDropModifiers = [["Bounty-Hunting Rig",0.15],["Pork Elf Prizes",0.11],["Encephalic Ensemble",0.05]];
		
	// ARRAY: me.effectItemDropModifiers
	// DESCRIPTION: List of effects that impact the Item Drop rate if they are equipped.
	// NOTES: We read these off of the charPANE (vs charPAGE) every time it refreshes (usually once per action or round of combat)
	// FORMAT: ["Effect Name", Percentage (as decimal) to increase item drop rate (0.25 = 25%)]
	me.effectItemDropModifiers = [["One Very Clear Eye",1.00],["Your #1 Problem",1.00],["Melancholy Burden",0.6],["Eggs-tra Sensory Perception",0.5],
		["Perceptive Pressure",0.5],["The Vitus Virus",0.5],["Black Tongue",0.3],["Blue Tongue",0.3],
		["Cupcake of Choice",0.3],["Mmmmmelon",0.3],["Hoity Toity",0.3],["Swimming Head",0.25],
		["The Ballad of Richie Thingfinder",0.2],["Fat Leon\'s Phat Loot Lyric",0.2],["Disco Concentration",0.2],
		["Hella Smooth", 0.2],["Dance Interpreter",0.2],["Holiday Bliss", 0.2],["Dilated Pupils",0.2],
		["Peeled Eyeballs",0.15],["Dancing Prowess",0.15],["Heart of Lavender",0.1],["Ocelot Eyes",0.1],
		["Bootyliciousness",0.1],["Eye of the Seal",0.1],["Hip to Be Square Dancin\'",0.1],["Hustlin\'",0.1],
		["Techno Bliss", 0.1],["Ermine Eyes",0.05],["Object Detection",0.05],["La Bamba",0.03],["Wasabi Sinuses",-0.1],
		["Braaaaaains", -0.5],["Socialismydia",0.5],["Temporary Blindness",-0.75],["Polka Face",0.5],
		["Expert Timing",0.2],["Song of Fortune",0.25],["Scavengers Scavenging",0.20],["Super Vision",0.25]];

	// ARRAY: me.skillItemDropModifiers
	// DESCRIPTION: List of skills that impact the Item Drop rate
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe anything has changed
	// FORMAT: [["Skill Name"], Percentage (as decimal) to increase item drop rate (0.25 = 25%)]
	me.skillItemDropModifiers = [["Envy",0.3],["Mad Looting Skillz",0.2],["Powers of Observatiogn",0.1],
		["Natural Born Scrabbler",0.05],[">Greed",-0.15]];

	// ARRAY: me.moonPhaseItemDropModifiers
	// DESCRIPTION: List of things that impact the Item Drop rate based on collective moon brightness
	// NOTES: We use the formula X + (Y * me.moonBrightness)
	// FORMAT: [["Modifier Name"], Static Part of the Modifier (X), Scaling Part of the Modifier (Y)]
	me.moonPhaseItemDropModifiers = [["Jekyllin hide belt",15,5]];

	// ARRAY: me.familiarItemDropModifiers
	// DESCRIPTION: List of familiars that impact Item Drop rate
	// NOTES: We check familiar and familiar weight off of the charPANE (vs charPAGE) every time it refreshes (usually once per action or round of combat)
	// FORMAT: ["Familiar Name"]
	me.familiarItemDropModifiers = ["Baby Gravy Fairy","Flaming Gravy Fairy","Frozen Gravy Fairy",
		"Stinky Gravy Fairy","Spooky Gravy Fairy","Sleazy Gravy Fairy","Coffee Pixie","Crimbo Elf",
		"Pygmy Bugbear Shaman","Attention-Deficit Demon","Jitterbug","Dandy Lion","Jumpsuited Hound Dog",
		"Green Pixie","Sugar Fruit Fairy","Syncopated Turtle","Slimeling","Grouper Groupie","Dancing Frog",
		"Hippo Ballerina","Piano Cat","Obtuse Angel","Li'l Xenomorph","Pair of Stomping Boots",
		"Blavious Kloop","Peppermint Rhino","Reagnimated Gnome"];
	// Xenomorph is a hack

	//--------------------------------------------
	// Meat Drop Rate Modifiers
	//--------------------------------------------

	// ARRAY: me.itemMeatDropModifiers
	// DESCRIPTION: List of items that impact the Meat Drop rate if they are equipped.
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Item Name"], Percentage (as decimal) to increase meat drop rate (0.25 = 25%)]
	me.itemMeatDropModifiers = [["lucky Tam O'Shanter",0.5],["lucky Tam O'Shatner",0.5],["Mayflower bouquet",0.1],
		["Grimacite gauntlets",0.30],["Origami pasties",0.30],["Grimacite galoshes",0.25],["Coily",0.25],
		["incredibly dense meat gem",0.25],["poodle skirt", 0.25],["duct-tape shirt",0.20],["stainless steel slacks",0.20],
		["natty blue ascot",0.2],["navel ring of navel gazing",0.2],["bottle-rocket crossbow",0.15],
		["meatspout staff",0.15],["Baron von Ratsworth's money clip",0.15],["bobble-hip hula elf doll",0.15],
		["ice skates",0.15],["evil flaming eyeball pendant",0.15],["Spooky Putty leotard",0.15],
		["pulled porquoise pendant",0.15],["cup of infinite pencils",0.15],["Radio KoL Bottle Opener",0.15],
		["Order of the Silver Wossname",0.11],["bewitching boots",0.10],["brazen bracelet",0.10],["bitter bowtie",0.1],
		["Shagadelic Disco Banjo",0.10],["mayfly bait necklace",0.10],["booty chest charrrm bracelet",0.10],
		[">porquoise necklace",0.10],["toy train",0.10],["toy crazy train",0.10],["toy maglev monorail",0.10],
		["Ye Olde Navy Fleece",0.10],["ratskin belt",0.10],["ancient turtle shell helmet",0.1],["fish bazooka",0.1],
		["lucky rabbit\'s foot",0.07],["tiny plastic hermit",0.06],["muculent machete",0.05],["7-ball",0.05],
		["tip jar",0.05],["world\'s smallest violin",0.05],["fancy opera glasses",0.05],["tiny plastic Baron von Ratsworth",0.03],
		["tiny plastic the Man",0.03],["white collar",0.03],["penguin whip",0.03],["tiny plastic fat stack of cash",0.03],
		[">box-in-the-box-in-the-box<",0.03],[">box-in-the-box<",0.02],["acoustic guitarrr",0.08],
		[">box<",0.01],["origami pasties",0.3],["Bag o' Tricks",0.15]];

	// ARRAY: me.effectMeatDropModifiers
	// DESCRIPTION: List of effects that impact the Meat Drop rate if they are active.
	// NOTES: We read these off of the charPANE (vs charPAGE) every time it refreshes (usually once per action or round of combat)
	// FORMAT: [["Effect Name"], Percentage (as decimal) to increase meat drop rate (0.25 = 25%)]
	me.effectMeatDropModifiers = [["Sinuses For Miles",2.00],["Braaaaaains",2.00],["Preternatural Greed",1.00],
		["Low on the Hog",1.00],["Cravin\' for a Ravin\'",1.00],["Carrion\' On",0.6],["Egg-stortionary Tactics",0.5],
		["Braaains",0.5],["The Ballad of Richie Thingfinder",0.5],["Polka of Plenty",0.5],["Winklered",0.4],
		["Hella Smooth",0.4],["Black Tongue",0.3],["Red Tongue",0.3],["Your Cupcake Senses Are Tingling",0.3],
		["Night Vision",0.3],["Can't Be a Chooser",0.3],["Flashing Eyes",0.3],["Wasabi Sinuses",0.3],
		["Disco Nirvana",0.30],["Make Meat FA$T!",0.20],["Blackberry Polteness",0.20],["Swimming with Sharks",0.2],
		["Material Witness",0.15],["Heart of Pink",0.2],["Sticky Fingers",0.2],["Material Witness",0.1],
		["Livin' Large",0.1],["Cranberry Cordiality",0.1],["Je Ne Sais Porquoise",0.06],["Peeled Eyeballs",-0.2],
		["Big Veiny Brain",-0.2],["Polka Face",0.5],["Dances with Tweedles",0.4],["Song of Fortune",0.5]];

	// ARRAY: me.skillMeatDropModifiers
	// DESCRIPTION: List of skills that impact the Meat Drop rate
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Skill Name"], Percentage (as decimal) to increase meat drop rate (0.25 = 25%)]
	me.skillMeatDropModifiers = [[">Greed",0.50],["Nimble Fingers",0.2],["Expert Panhandling",0.1],
		["Gnefarious Pickpocketing",0.1],["Thrift and Grift",0.1],["Envy",-0.25],["Undying Greed",0.25]];

	// ARRAY: me.familiarMeatDropModifiers
	// DESCRIPTION: List of familiars that impact Meat Drop rate
	// NOTES: We check familiar and familiar weight off of the charPANE (vs charPAGE) every time it refreshes (usually once per action or round of combat)
	// FORMAT: ["Familiar Name"]
	me.familiarMeatDropModifiers = ["Leprechaun","Coffie Pixie","Cheshire Bat","Hand Turkey",
		"Attention-Deficit Demon","Cymbal-Playing Monkey","Jitterbug","Nervous Tick","Casagnova Gnome",
		"Hunchbacked Minion","Hobo Monkey","He-Boulder","Urchin Urchin","Dancing Frog","Chauvinist Pig",
		"Hippo Ballerina","Knob Goblin Organ Grinder","Piano Cat","Bloovian Groose","Blavious Kloop",];

	//--------------------------------------------
	// Initiative Modifiers
	//--------------------------------------------

	// ARRAY: me.itemInitiativeModifiers
	// DESCRIPTION: List of items that impact the player's initiative rate if they are equipped.
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Item Name"], Percentage (as decimal) to increase initiative
	me.itemInitiativeModifiers = [["Brimstone Boxers",0.5],["rickety old unicycle",0.5],["little round pebble",0.5],
		["Loathing Legion rollerblades",0.5],
		["beaten-up Chucks",0.4],["mostly rat-hide leggings",0.4],["slime-covered compass",0.4],["shark tooth necklace",0.35],
		["pink pinkslip slip",0.35],["Travoltan trousers",0.3],["Bonerdagon necklace",0.3],["rusty compass",0.3],
		["Crimbo pants",0.3],["Tropical Crimbo Shorts",0.3],["cyorg stompin' boot",0.3],["furniture dolly",0.3],
		["intergalactic pom poms",0.3],["Mer-kin sneakmask",0.3],["tortoboggan shield",0.3],
		["costume sword",0.3],["plexiglass pants",0.25],["blackberry moccasins",0.25],["Lord Spookyraven's ear trumpet",0.25],
		["Greek Pasta of Peril",0.25],["teflon swim fins",0.25],["Boris\'s Helm",0.25],["Boris\'s Helm (askew)",0.25],
		["Grimacite gat",0.2],["chopsticks",0.20],
		["Grimacite greaves",0.2],["penguin shorts",0.2],["tortoboggan",0.20],["crown-shaped beanie",0.2],
		["penguinskin mini-kilt",0.2],["penguinskin mini-skirt",0.2],["Super Magic Power Sword X",0.2],
		["worn tophat",0.2],["mer-kin hookspear",0.2],["star pants",0.2],["wiffle-flail",0.20],["hors d'oeuvre tray",0.2],
		["evil flaming eyeball pendant",0.15],["origami riding crop",0.15],["makeshift skirt",0.15],
		["cold ninja mask",0.15],["ice skates",0.15],["leotarrrd",0.15],["pixel sword",0.15],["Spooky Putty leotard",0.15],
		["crowbarrr",0.15],["plastic guitar",0.15],["Pasta of Peril",0.15],["tail o' nine cats",0.15],
		["sk8board",0.15],["stainless steel slacks",0.15],["clockwork pants",0.1],["pig-iron shinguards",0.1],
		["crowbarrr",0.1],["gnatwing earring",0.15],["Disco 'Fro Pick",0.11],["clockwork pants",0.1],
		["infernal insoles",0.1],["shiny hood ornament",0.1],["propeller beanie",0.1],["boxing glove on a spring",0.1],
		["octopus's spade",0.1],["wheel",0.1],["1-ball",0.05],["antique greaves",-0.1],["antique helmet",-0.1],
		["antique shield",-0.1],["giant discarded plastic fork",-0.1],["cement sandals",-0.1],["rusty metal greaves",-0.1],
		["slime-covered greaves",-0.1],["slime-covered shovel",-0.1],[">grave robbing shovel",-0.1],
		["rusty grave robbing shovel",-0.1],["Amulet of Yendor",-0.1],["wumpus-hair loincloth",0.1],
		["outrageous sombrero",-0.2],["tap shoes",-0.2],["jungle drum",-02],["antique spear",-0.3],
		["Slow Talkin' Elliot's dogtags",-0.3],["buoybottoms",-0.3],["solid gold pegleg",-0.5],["velcro boots",-0.5],
		["aerated diving helmet",-0.5], ["rusty diving helmet",-0.5],["makeshift SCUBA gear",-1]
		,];

	// ARRAY: me.outfitInitiativeModifiers
	// DESC.: Outfits that affect initiative.
	// NOTES: Read from charPane.
	// FORMAT: ["Outfit Name",Percentage as decimal to increase initiative]
	//me.outfitInitiativeModifiers = [["8-Bit Finery",0.1],["Tapered Threads",0.3]]
	
	// ARRAY: me.effectInitiativeModifiers
	// DESCRIPTION: List of effects that impact the player's initiative if they are active.
	// NOTES: We read these off of the charPANE (vs charPAGE) every time it refreshes (usually once per action or round of combat)
	// FORMAT: ["Effect Name", Percentage (as decimal) to increase initiative (0.25 = 25%)]
	me.effectInitiativeModifiers = [["Memory of Speed",2],["Hiding in Plain Sight",1],["Sizzling with Fury",0.6],
		["Ass Over Teakettle",0.5],["Hustlin'",0.5],["White-boy Angst",0.5],["Springy Fusilli",0.4],
		["Blessing of Pikachutlotal",0.3],["All Fired Up",0.3],["Well-Swabbed Ear",0.3],["Ticking Clock",0.3],
		["Old School Pompadour",0.3],["Arse-a'fire",0.25],["Provacative Perkiness",0,2],["Metal Speed",0.2],
		["No Vertigo",0.2],["Hombre Muerto Caminando",0.2],["Cletus's Canticle of Celerity",0.2],
		["Heart of Yellow",0.2],["Sugar Rush",0.2],["5 Pounds Lighter",0.1],["Head on Fire, Ass Catching",0.1],
		["Sweet and Yellow",0.1],["Temporary Blindness",-0.3],["Black Face",-0.4],["Extreme Muscle Relaxation",-0.5],
		["Barking Dogs",-0.5],["Braaains",-0.5], ["Cunctatitis",-100],["Tranquilized Mind",-10],
		["Fast as Lightning", 0.5],["Natural 20",1],["Natural 1",-1],];

	// ARRAY: me.skillInitiativeModifiers
	// DESCRIPTION: List of skills that impact the player's initiative
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Skill Name"], Percentage (as decimal) to increase initiative (0.25 = 25%)]
	me.skillInitiativeModifiers = [["Overdeveloped Sense of Self Preservation",0.2],["Slimy Shoulders",0.2],
		["Lust",0.5],["Sloth",-0.25],["Hunter\'s Sprint",1],["Legendary Impatience",1]];

	// We should not trust init data from people with the following effects:
	me.suspectedeffectInitiativeModifiers = ["Slimy Shoulders"];

	// Here are the names of all known outfit graphics without effects.  Since we don't know if any of them have Initiative Effects, if a player is wearing one
	// we should not trust their data.
	me.outfitGraphics = [["pixelcostume.gif","8-Bit Finery"],["pixelcostume_f.gif","8-Bit Finery"],["bowcostume.gif","Bow Tux"],
		["bowcostume_f.gif","Bow Tux"],["crimbocostume.gif","Crimbo Duds"],["crimbocostume_f.gif","Crimbo Duds"],
		["crimborgsuit.gif","Crimborg Assault Armor"],["crimborgsuit_f.gif","Crimborg Assault Armor"],
		["zombiepiratecostume.gif","Cursed Zombie Pirate Costume"],["zombiepiratecostume_f.gif","Cursed Zombie Pirate Costume"],
		["viboutfit.gif","El Vibrato Relics"],["viboutfit_f.gif","El Vibrato Relics"],["gnaugacostume.gif","Gnuaga Hides"],
		["gnaugacostume_f.gif","Gnauga Hides"],["rkolcostume.gif","Radio Free Regalia"],["rkolcostume_f.gif","Radio Free Regalia"],
		["orbisoncostume.gif","Roy Orbison Disguise"],["orbisoncostume_f.gif","Roy Orbison Disguise"],
		["ducttapeoutfit.gif","Tapered Threads"],["ducttapeoutfit_f.gif","Tapered Threads"],["clowncostume.gif","Terrifying Clown Suit"],
		["clowncostume_f.gif","Terrifying Clown Suit"],["tropicaloutfit.gif","Tropical Crimbo Duds"],
		["tropicaloutfit_f.gif","Tropical Crimbo Duds"],["dnaoutfit.gif","Mutant Couture"],["dnaoutfit_f.gif","Mutant Couture"],
		["radioheadoutfit.gif","Primitive Radio Duds"],["radioheadoutfit_f.gif","Primitive Radio Duds"],
		["snowmanoutfit.gif","Snowman Suit"],["snowmanoutfit_f.gif","Snowman Suit"]];

	//--------------------------------------------
	// Stat Gain Modifiers
	//--------------------------------------------

	// ARRAY: me.itemStatGainModifiers
	// DESCRIPTION: List of items that impact the stat gains if they are equipped.
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Item Name", Additional Stat Points ]
	me.itemStatGainModifiers = [["pilgrim shield",3],["sugar shirt",3],["Spooky Putty mitre",3],["ice baby",3],
		["wax lips",3],["naughty fortune teller",2.5],["V for Vivala mask",2],["ocarina of space",2],
		["flaming juggler's balls",2],["little box of fireworks",1.5],["extra-large palm-frond toupee",2],["Mayflower bouquet",1.25],
		["ga-ga radio",1],["Radio KoL Antenna Ball",1],["white whip",1],["Operation Patriot Shield",3],
		["deck of tropical cards",1],["Tiki lighter",1],["tropical paperweight",1],["Juju Mojo Mask",2],
		["astral shirt",3],["shining halo",3],["Loathing Legion necktie",4]];

	// Array for skills that affect stat gain.
	//me.skillStatGainModifiers = [["Pride",4],["Gluttony",-2]]
	
	// ARRAY: me.effectStatGainModifiers
	// DESCRIPTION: List of effects that impact the stat gains if they are active.
	// NOTES: We read these off of the charPAGE (vs charPANE) IFF we have reason to believe they have changed.
	// FORMAT: [["Effect Name", Additional Stat Points ]
	me.effectStatGainModifiers = [["Proficient Pressure",8],["Phoenix, Right?",6],["Crimbo Nostalgia",5],
		["Moon'd",5],["No Worries",3],["Aloysius' Antiphon of Aptitude",3],["Wistfully Nostalgic",3],
		["Black Tongue",3],["Shiny Happy Cupcake",3],["Orange Tongue",3],["Memento Moir",3],["Good with the Ladies",3],
		["Liquid Courage",3],["Liquid Courage",3],["Papowerful",2],["Big Veiny Brain",2],["Heart of White",1],
		["Peeled Eyeballs",-1],["Wasabi Sinuses",-1],["The Vitus Virus",-5],["Gaze of the Volcano God",3]];

	//--------------------------------------------
	// Critical Hit Rate Modifiers
	// NOTE: These may move to the PlayerStats script soon.
	//--------------------------------------------

	// ARRAY: me.criticalHitItems
	// DESCRIPTION: List of items that impact the critical hit rate when equipped
	// NOTES: Only the highest critical hit multiplier applies
	//        We read these off of the charPAGE (vs charPANE) IFF we have reason to believe anything has changed
	// FORMAT: [["Item Name"], X in the numerator of the base Critical Hit rate formula ( X/11 ). Script assumes 1/11 without a match.]
	me.criticalHitItems = [["Spirit Precipice",5],["stainless steel shillelagh",4],["clockwork crossbow",3],
		["hamethyst earring",3],["toy ray gun",3],["hamethyst bracelet",3],
		["Hammer of Smiting",3],["rusty speargun",3],["slime-covered club",3],["clockwork staff",3],
		["clockwork sword",3],["slime-covered speargun",3],["repeating crossbow",3],["kneecapping stick",3],
		["4-dimensional guitar",3],["black sword",3],["giant cactus quill",3],["lucky lighter",2],
		["white hat hacker T-shirt",2],["ridiculously overelaborate ninja weapon",2],["enchanted brass knuckles",2],
		["giant discarded plastic fork",2],["spooky bicycle chain",2],["Elmley shades",2],["pointed stick",2],
		["prehistoric spear",2],["Super Magic Power Sword X",2],["yohohoyo",2],["vorpal blade",2],
		["armgun",2]];

	// ARRAY: me.stackableCriticalHitModifiers
	// DESCRIPTION: List of things that impact the critical hit rate when equipped
	// NOTES: These get added to whatever Critical Hit rate ends up being after the me.criticalHitItems are applied.
	//        We read these off of the charPAGE (vs charPANE) IFF we have reason to believe anything has changed
	// FORMAT: [["Modifier Name"], Amount to Add to the final numerator in the critical hit formula]
	me.stackableCriticalHitModifiers = [["Eye of the Stoat",0.5],["The Vole",1],["V for Vivala",1]];

	// The damn Sword of Inappropriate Prepositions scrambles some of the monster names.  So we have to correct for that.  *sighs*
	me.prepositionCorrections = [["COUNTRY BATS", "SWARM OF COUNTRY BATS"], ["URGE","URGE TO STARE AT YOUR HANDS"],
		["HEDGEROW","BUSTLE IN THE HEDGEROW"], ["ANGELS?","GATHERING OF ANGELS?"], ["GENTLE RACE","ELDERS OF THE GENTLE RACE"],
		["NEW WAVE", "THE SPIRIT OF NEW WAVE"], ["KILLER BEES","SWARM OF KILLER BEES"], ["TWEEZERS","Giant Pair of Tweezers"],
		["RANDOM ENCOUNTERS","IRRITATING SERIES OF RANDOM ENCOUNTERS"],["WHITE SATIN","KNIGHT IN WHITE SATIN"],
		["FELONIA","FELONIA, QUEEN OF THE SPOOKY GRAVY FAIRIES"], ["HYPNOTIST", "HYPNOTIST OF HEY-DEZE"]];
};
//---------------------------------------------
//---------------------------------------------
//                Main Code
//---------------------------------------------
//---------------------------------------------
// And FINALLY... the SCRIPT ITSELF.

// FUNCTION : me.wikify
// PARAMS: EntryName (string of name of entry in wikipedia)
// NOTES: This is just a clean way to slap the KoL Visual Wiki URL wrapper around an entry name.
//        The only reason this exists in this script is because the me.wikify script can't modify the content we add.
//        We used to convert spaces into underscores, escape out special characters, etc... turns out the Wiki will
//        do that for us.  So now we let it.
MonsterStats.prototype.wikify = function(EntryName)
{
	var me = this;
	  return me.wikiWrapperPre + EntryName + me.wikiWrapperPost;
}

// Currently we store the visibility of various parts of the MonsterStats table as a cookie.
// I think I may now know how to avoid needing cookies, so hopefully this will go away soon.
MonsterStats.prototype.getCookieValue = function(cookieName) {
	var me = this;
		var rawCookies = me.doc.cookie;
	var cookieBase = cookieName + "=";
	// See if it's any stored cookie for this page other than the first
	var cookieStartIndex = rawCookies.indexOf("; " + cookieBase);
	if (cookieStartIndex == -1) {
	    // It wasn't, so check to see if it's the first cookie.
	    cookieStartIndex = rawCookies.indexOf(cookieBase);
	    if (cookieStartIndex != 0)
	      return null;
	} else {
	   cookieStartIndex = cookieStartIndex + 2;
	}

	// Find the beginning of the next cookie after the requested one, if there is one
	var cookieEndIndex = me.doc.cookie.indexOf(";", cookieStartIndex);
	if (cookieEndIndex == -1) {
	  // Must have been the last cookie, so go for the gusto.
	    cookieEndIndex = rawCookies.length;
	}
        return unescape(rawCookies.substring(cookieStartIndex + cookieName.length+1, cookieEndIndex));
};

MonsterStats.prototype.dumpDebugInfo = function() {
	var me = this;
	    var mainPageBody = me.doc.getElementsByTagName("body")[0];

    var textToAdd = me.getDebugTable();
    mainPageBody.innerHTML =	mainPageBody.innerHTML + textToAdd;
}


// FUNCTION: me.imgToFamiliar
// PARAMS: imgLink (string of URL to image representing familiar in the charpane)
// RESULT: string of full familiar name
// AUTHOR: Picklish
// NOTE: Returns 0 if match fails.
//       Slight modifications for clarity and compactness made by Numfar

MonsterStats.prototype.imgToFamiliar = function(imgLink) {
	var me = this;
	    var imgMatch = imgLink.match(/\/familiar([0-9]+)\.gif$/)

    if (imgMatch && imgMatch[0] && parseInt(imgMatch[1]))
    {
	  var familiarName = me.familiarDecoder[imgMatch[1]];
	  if (familiarName != "") { return familiarName } else { return 0 }
    }
    // Not all familiars follow the above pattern.
    // I'm not quite sure why in the world that is. -Picklish
    imgMatch = imgLink.match(/\/([^\/]*)\.gif$/);
    if (!imgMatch || !imgMatch[0] || !imgMatch[1])
    {
	  // Bail out-- this isn't an image of a familiar
	  // or it's a new pattern we don't recognize.
        return 0;
    }
    for (decoderIndex in me.familiarImageNameDecoder) {
	if (imgMatch[1] == me.familiarImageNameDecoder[decoderIndex] [0]) { return me.familiarImageNameDecoder[decoderIndex] [1]; }
    }

    // Okay we've totally struck out.  Give up.
    return 0;
}


MonsterStats.prototype.updateScriptBox = function() {
	var me = this;
//  Currently, I'm only adding the box if there's a problem-- people were complaining about it.
//  Eventually this behavior will be configurable.
//  else {
//    mainPageBody.innerHTML = oldHTML + me.addedHTML + '</table></center>';
//     var textToAdd = me.getDebugTable();
//     mainPageBody.innerHTML =	mainPageBody.innerHTML + textToAdd;
//  }
}

MonsterStats.prototype.getDebugTable = function() {
	var me = this;
	    var kwMonsters = [];
    var kwml = me.GM_getValue(me.KW_PREFIX + '-MonsterList','');
    eval(kwml);
    var kwMonstersB = new Array();
    for (arrayIndex in kwMonsters) {
      if ((kwMonstersB.indexOf(kwMonsters[arrayIndex]) == -1) && (kwMonsters[arrayIndex] != ''))
        kwMonstersB[arrayIndex] = kwMonsters[arrayIndex];
    }
    var yml = me.GM_getValue(me.Y_PREFIX + '-MonsterList','');
    var yMonsters = '';
    eval(yml);
    for (arrayIndex in yMonsters) {
      if ((kwMonstersB.indexOf(yMonsters[arrayIndex]) == -1) && (yMonsters[arrayIndex] != ''))
        kwMonstersB.push(yMonsters[arrayIndex]);
    }
    kwMonstersB.sort();

    var textToAdd = '<table style="border: 1px solid blue; margin-bottom: 4px;">' +
        '<tr><th>Monster Name</th><th>QN Data</th><th>Yiab Data</th><th>Ragnok Data</th><th>N3RD Data</th>' +
        '<th>HP</th><th>XP</th><th>Def</th><th>Atk</th><th>Req To Hit</th><th>Req to Evade</th><th>Elemental Def</th><th>Elemental Atk</th>' +
        '<th>Yiab RAW</th><th>Meat Drop RAW</th><th>N3RD RAW</th></tr>';
    for (monsterIndex in kwMonsters) {
      var storedMonster = me.GM_getValue(me.KW_PREFIX + '-' + kwMonstersB[monsterIndex],';;;;;;;');
      if (storedMonster == ';;;;;;;') { var kwDataPresent = '<b>N</b>'; } else { var kwDataPresent = 'Y'; }
      var storedMonsterParts = storedMonster.split(";");
      var yiabData = me.GM_getValue(me.Y_PREFIX + '-' + kwMonstersB[monsterIndex],'MISSING');
      if (yiabData == 'MISSING') { var yiabDataPresent = '<b>N</b>'; } else { var yiabDataPresent = 'Y'; }
      var ragnokData = me.GM_getValue(me.Y_PREFIX + '-' + kwMonstersB[monsterIndex],'MISSING');
      if (ragnokData == 'MISSING') { var ragnokDataPresent = '<b>N</b>'; } else { var ragnokDataPresent = 'Y'; }
      var n3rdData = me.GM_getValue(me.N_PREFIX + '-' + kwMonstersB[monsterIndex],'MISSING');
      if (n3rdData == 'MISSING') { var n3rdDataPresent = '<b>N</b>'; } else { var n3rdDataPresent = 'Y'; }
      if (storedMonsterParts[6] == '') { storedMonsterParts[6] = 'none';}
      if (storedMonsterParts[7] == '') { storedMonsterParts[7] = 'none';}
      textToAdd = textToAdd + '<tr style="border: 1px solid blue;"><td style="border: 1px solid blue;"><b>' + kwMonstersB[monsterIndex] + '</b></td>' +
          '<td>' + kwDataPresent + '</td>' +
          '<td>' + yiabDataPresent + '</td>' +
          '<td>' + ragnokDataPresent + '</td>' +
          '<td>' + n3rdDataPresent + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[0] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[1] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[2] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[3] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[4] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[5] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[6] + '</td>' +
          '<td style="border: 1px solid blue;">' + storedMonsterParts[7] + '</td>' +
          '<td>' + yiabData + '</td>' +
          '<td>' + storedMonsterParts[9] + '</td>' +
          '<td>' + n3rdData + '</td>' +
          '</tr>';
    }
    textToAdd = textToAdd + '</table>';

    return textToAdd;
}

// Support function to trim whitespace off of both ends of a string.
MonsterStats.prototype.trimString = function(targetString) {
	var me = this;
  if (targetString != undefined) {
  targetString = targetString.replace( /^\s+/g, "" );
  targetString = targetString.replace( /\s+$/g, "" );
  return targetString;
  }
}

MonsterStats.prototype.makeTagsRenderable = function(targetString) {
	var me = this;
  if (targetString != undefined) {
  targetString = targetString.replace(/\"/g,".");
  targetString = targetString.replace(/\(/g,".");
  targetString = targetString.replace(/\)/g,".");
  targetString = targetString.replace( /[<]/g, " &lt;" );
  targetString = targetString.replace( /[>]/g, "&gt; " );
  targetString = targetString.replace(/\&ntilde\;/g,"�");
  targetString = targetString.toUpperCase();
  //targetString = targetString.replace( /[']/g, "~" );
  return targetString;
  }
}

MonsterStats.prototype.buildDebugRow = function(roundNumber, damageAmount, damageType, rawText) {
	var me = this;
	  return '<tr><td><font size=-2>' + (roundNumber + 1) + '</font></td><td><font size=-2>' + damageAmount + '</font></td><td><font size=-2>' + damageType + '</font></td><td><font size=-2>' + me.makeTagsRenderable(rawText) + '</font></td></tr>';
}

MonsterStats.prototype.sanitizeMonsterName = function(monsterName) {
	var me = this;

  monsterName = me.trimString(monsterName.toUpperCase());
  if ( (monsterName.indexOf('A ') == 0) || (monsterName.indexOf('AN ') == 0) || (monsterName.indexOf('THE ') == 0) ) {
      monsterName = monsterName.substring(monsterName.indexOf(' ') + 1);
  }
  monsterName = me.trimString(monsterName);
  for (correctionIndex in me.prepositionCorrections) {
    if (monsterName.indexOf(me.prepositionCorrections[correctionIndex] [0]) != -1) {
      monsterName = me.prepositionCorrections[correctionIndex] [1];
    }
  }
  return monsterName;
}

MonsterStats.prototype.harvestMafiaData = function() {
	var me = this;
	var curDate = new Date();

	me.addedHTML = me.addedHTML +
	    '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Statistical data is missing or more than one day old.  Checking Mafia for latest version of data.</font></td></tr>';

	//me.updateScriptBox();
	// Get QuantumNightmare's latest data
	me.GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://kolmafia.svn.sourceforge.net/viewvc/kolmafia/src/data/monsters.txt',
	    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	    onload: function(responseDetails) {
	if (responseDetails.status == "200") {
	  me.GM_setValue(me.KW_PREFIX + "_Last_Checked", curDate.toString());

	  var strHTML = responseDetails.responseText;
	  var kwMonsterList = 'var kwMonsters=["';
          var firstPart = strHTML.substring(strHTML.indexOf('"Handyman" Jay Android'));
          var linesToProcess = firstPart;
          linesToProcess = linesToProcess.toUpperCase();
          linesToProcess = linesToProcess.split("\n");
          var debugOutput = '';

          for (var i = 0; i < linesToProcess.length; i++) {
          	var curLine = me.trimString(linesToProcess[i]);
	  	var lineChunk = curLine.split("	");

		if (lineChunk[0].substring(0,1) == "#") {
			continue;
		}
		if (lineChunk[0].length == 0) {
			continue;
		}
		var monsterName = lineChunk[0].replace(/\"/g,"\\\"");
		lineChunk[1] = lineChunk[1].replace(/\[.*\]/g, "-999");

          	var curMonster = '';
		var curHP = 0;
		var curATK = 0;
		var curXP = 0;
		var curDEF = 0;
		var curELEMENT = '';
                var elementalDefenses = '';
                var elementalAttacks = '';
		var curINIT = 999;
		var curPHY = 'none';
		var curMEAT = '';
		var j = 0;
		var k = 0;

		j = lineChunk[1].indexOf('HP: ')+4;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-4 != -1)
			curHP = me.trimString(lineChunk[1].substring(j, k));

		j = lineChunk[1].indexOf('DEF: ')+5;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-5 != -1)
			curDEF = me.trimString(lineChunk[1].substring(j, k));

		j = lineChunk[1].indexOf('ATK: ')+5;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-5 != -1) {
			curATK = me.trimString(lineChunk[1].substring(j, k));
			curXP = curATK / 4;
		}

		j = lineChunk[1].indexOf('EXP: ')+5;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-5 != -1) {
			curXP = me.trimString(lineChunk[1].substring(j, k));
		}

		// for now, skip things we have minimal data on, for speed
		// XXX - less useful to skip with monster Manuel
		//if (curHP == 0 && curDEF == 0 && curATK == 0)
		//	continue;

		j = lineChunk[1].indexOf('E: ')+3;
		if (j-3 != -1) {
			k = lineChunk[1].indexOf(' ', j);
			if (k == -1)
				k = lineChunk[1].length;
			curELEMENT = me.trimString(lineChunk[1].substring(j, k));
			elementalDefenses = me.harvestElements(curELEMENT);
			elementalAttacks = elementalDefenses;
		}

		j = lineChunk[1].indexOf('ED: ');
		while (j != -1) {
			j += 4;
			k = lineChunk[1].indexOf(' ', j);
			if (k == -1)
				k = lineChunk[1].length;
			curELEMENT = me.trimString(lineChunk[1].substring(j, k));
			elementalDefenses = elementalDefenses + ', ' + me.harvestElements(curELEMENT);
			j = lineChunk[1].indexOf('ED: ',k);
		}

		j = lineChunk[1].indexOf('EA: ');
		while (j != -1) {
			j += 4;
			k = lineChunk[1].indexOf(' ', j);
			if (k == -1)
				k = lineChunk[1].length;
			curELEMENT = me.trimString(lineChunk[1].substring(j, k));
			elementalAttacks = elementalAttacks + ', ' + me.harvestElements(curELEMENT);
			j = lineChunk[1].indexOf('EA: ',k);
		}

		j = lineChunk[1].indexOf('INIT: ')+6;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-6 != -1)
			curINIT = me.trimString(lineChunk[1].substring(j, k));

		j = lineChunk[1].indexOf('MEAT: ')+6;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-6 != -1)
			curMEAT = me.trimString(lineChunk[1].substring(j, k));

		j = lineChunk[1].indexOf(' P: ')+4;
		k = lineChunk[1].indexOf(' ', j);
		if (k == -1)
			k = lineChunk[1].length;
		if (j-4 != -1)
			curPHY = me.trimString(lineChunk[1].substring(j, k));

		curMonster = curHP + ';' + curXP + ';' + curDEF + ';' + curATK + ';';
		k = parseInt(curDEF)+10;
                curMonster = curMonster + k;
		k = parseInt(curATK)+10;
                curMonster = curMonster + ';' + k;
		curMonster = curMonster + ';' + elementalDefenses + ';' + elementalAttacks + ';';
		curMonster = curMonster + curINIT + ';' + curMEAT + ';' + curPHY;
		
		monsterName = me.sanitizeMonsterName(monsterName);

		me.GM_setValue(me.KW_PREFIX +'-' + monsterName, curMonster);
		kwMonsterList = kwMonsterList + monsterName + '","';

		//debugOutput = debugOutput + '\n' +monsterName + ': ' + curMonster;// + '    (' + originalLine + ')';
          }
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated statistical data from Mafia.</font></td></tr>';
          kwMonsterList = kwMonsterList + '"];';
          me.GM_setValue(me.KW_PREFIX + '-MonsterList',kwMonsterList);
          //me.updateScriptBox();
	} else {
          var strHTML = 'Error: ' + responseDetails.status;
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to update statistical data from Mafia (' + strHTML + ').<BR>Using cached data if available.</font></td></tr>';
          //me.updateScriptBox();
        }
    }
  });
}

MonsterStats.prototype.toggleDebugMode = function(){
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var debugMode = me.GM_getValue(me.charName + '-DebugMode',0);

  if (debugMode == 0) { debugMode = 1; var debugText = 'On';} else { debugMode = 0; var debugText='Off';}

  var indicatorElement = me.doc.getElementById("dmindicator");

  if (indicatorElement) {
    indicatorElement.innerHTML = debugText;
    //alert('Debug Mode ' + debugText);
  }

  me.GM_setValue(me.charName + '-DebugMode',debugMode);
}

MonsterStats.prototype.toggleSubmitMode = function(){
	var me = this;
	  var submitMode = me.GM_getValue('AllowDataSubmission',1);

  if (submitMode == 0) { submitMode = 1; var submitModeText = 'On';} else { submitMode = 0; var submitModeText='Off';}

  var indicatorElement = me.doc.getElementById("smindicator");

  if (indicatorElement) {
    indicatorElement.innerHTML = submitModeText;
  }

  me.GM_setValue('AllowDataSubmission',submitMode);
}

MonsterStats.prototype.toggleDebugVisibility = function(){
	var me = this;

  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var showDebug = me.GM_getValue(me.charName + '-ShowDebug',0);

  var debugTable = me.doc.getElementById("debugtable");
  if (showDebug == 0) { showDebug = 1; debugTable.style.display ='inline';} else { showDebug = 0; debugTable.style.display = 'none';}
  me.GM_setValue(me.charName + '-ShowDebug',showDebug);
}

MonsterStats.prototype.requestHarvestKittiwakeData = function(){
	var me = this;
	var curDate = new Date();
	var mainPageBody= me.doc.getElementsByTagName("body")[0];
	var oldHTML = mainPageBody.innerHTML;
	me.addedHTML = '';
	var dateElement = me.doc.getElementById("kwdate");

	if (dateElement) {
		dateElement.innerHTML = 'Re-harvesting...';
	}

	me.harvestMafiaData();

	if (dateElement) {
		dateElement.innerHTML = curDate.toString();
		alert('Data harvest complete.');
	}
}

// Modified to pull mafia data
MonsterStats.prototype.harvestYiabData = function() {
	var me = this;
  var curDate = new Date();

  me.addedHTML = me.addedHTML +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Item-drop data is missing or more than one day old.  Checking Mafia for latest version.</font></td></tr>';
  //me.updateScriptBox();

  // Get Yiab's latest item-drop data
  me.GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://kolmafia.svn.sourceforge.net/viewvc/kolmafia/src/data/monsters.txt',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
      if (responseDetails.status == "200") {
        me.GM_setValue(me.Y_PREFIX + "_Last_Checked", curDate.toString());

        var yMonsterList = 'var yMonsters=["';
        var strHTML = responseDetails.responseText;
        //var rawData = strHTML.substring(strHTML.indexOf('<!-- start content -->') + 22, strHTML.indexOf('<!-- end content -->')-1);
        //rawData = rawData.substring(rawData.indexOf('<p>')+3,rawData.indexOf('</p>')-1);

        var rawData = strHTML.substring(strHTML.indexOf('"Handyman" Jay Android'));

        var itemChunks = rawData.split('\n');

        for (var i = 0; i < itemChunks.length; i++) {

	  var lineChunks = itemChunks[i].split("	");
	  if (lineChunks[0].substring(0,1) == "#") {
		continue;
	  }
	  var monsterName = lineChunks[0].replace(/\"/g,"\\\"");
	  var curMonsterName = me.sanitizeMonsterName(me.trimString(monsterName.toUpperCase()));

	  var curDropInfo = '';
	  for (j=2; j < lineChunks.length; j++) { // skip name and stats

	    var drop = lineChunks[j].substring(0, lineChunks[j].lastIndexOf(' '));
	    var pct = lineChunks[j].substring(lineChunks[j].indexOf('(')+1, lineChunks[j].indexOf(')'));
	    //drop = drop.replace(/\'/g, "");
	    if (j != 2)
		curDropInfo = curDropInfo + '|';
	    curDropInfo = curDropInfo + drop + '=' + pct;
	  }    
          me.GM_setValue(me.Y_PREFIX + '-' + curMonsterName, curDropInfo);
          yMonsterList = yMonsterList + curMonsterName + '","';
        }
        me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated Item-Drop data from Mafia.</font></td></tr>';
        yMonsterList = yMonsterList + '"];';
        me.GM_setValue(me.Y_PREFIX + '-MonsterList',yMonsterList);
        //me.updateScriptBox();
      }
    }
  });
}

MonsterStats.prototype.requestHarvestYiabData = function(){
	var me = this;
	  var curDate = new Date();
  var mainPageBody= me.doc.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  me.addedHTML = '';

  var dateElement = me.doc.getElementById("ydate");

  if (dateElement) {
    dateElement.innerHTML = 'Re-harvesting...';
  }

  me.harvestYiabData();

  if (dateElement) {
    dateElement.innerHTML = curDate.toString();
    alert('Data harvest complete.');
  }
}

MonsterStats.prototype.harvestRagnokData = function() { var me = this;
  var curDate = new Date();

  me.addedHTML = me.addedHTML +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Meat-drop data is missing or more than one day old.  Checking TheKoLWiki for latest version.</font></td></tr>';
  //me.updateScriptBox();

  // Get Yiab's latest meat-drop data
  me.GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://kol.coldfront.net/thekolwiki/index.php/Parseable_Meat_Statistics',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
	if (responseDetails.status == "200") {
	  me.GM_setValue(me.R_PREFIX + "_Last_Checked", curDate.toString());

	  var strHTML = responseDetails.responseText;

	  var listItemElements = strHTML.split("||");
          for (var i=0; i < listItemElements.length; i++ ) {
            var curListItem = listItemElements[i];
            var curMonster = new Array();

              if (curListItem.indexOf('min') != -1 && curListItem.indexOf('max') != -1) {
                curMonster[0] = curListItem.substring(1, curListItem.indexOf(':'));
                curMonster[1] = curListItem.substring(curListItem.indexOf('min'));
		curMonster[1] = curMonster[1].substring(curMonster[1].indexOf('=') + 1, curMonster[1].indexOf('|'));
                curMonster[2] = curListItem.substring(curListItem.indexOf('max'));
                curMonster[2] = curMonster[2].substring(curMonster[2].indexOf('=') + 1, curMonster[2].indexOf('|'));
                curMonster[3] = curListItem.substring(curListItem.indexOf('avg'));
                curMonster[3] = curMonster[3].substring(curMonster[3].indexOf('=') + 1, curMonster[3].indexOf('|'));
	      }

              curMonster[0] = me.sanitizeMonsterName(curMonster[0]);
              me.GM_setValue(me.R_PREFIX + '-' + curMonster[0], curMonster[1] + ';' + curMonster[2] + ';' + curMonster[3]);
          }
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated statistical data from TheKoLWiki.</font></td></tr>';
          //me.updateScriptBox();
        } else {
          var strHTML = 'Error: ' + responseDetails.status;
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to update statistical data from TheKoLWiki (' + strHTML + ').<BR>Using cached data if available.</font></td></tr>';
          //me.updateScriptBox();

        }
    }
  });
}
MonsterStats.prototype.requestHarvestRagnokData = function(){
	var me = this;
	  var curDate = new Date();
  var mainPageBody= me.doc.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  me.addedHTML = '';

  var dateElement = me.doc.getElementById("rdate");

  if (dateElement) {
    dateElement.innerHTML = 'Re-harvesting...';
  }

  me.harvestRagnokData();

  if (dateElement) {
    dateElement.innerHTML = curDate.toString();
    alert('Data harvest complete.');
  }
}

MonsterStats.prototype.harvestN3RDData = function() { var me = this;
  var curDate = new Date();

  me.addedHTML = me.addedHTML +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Initiative data is missing or more than one day old.  Checking N3RD&#8217;s post at the Hardcore OxygeNation forums for the latest data.</font></td></tr>';
  //me.updateScriptBox();

  // Get N3RD's latest initiative data
  me.GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://forums.hardcoreoxygenation.com/viewtopic.php?t=1795',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
	if (responseDetails.status == "200") {
	  me.GM_setValue(me.N_PREFIX + "_Last_Checked", curDate.toString());

	  var strHTML = responseDetails.responseText;

	  var startOfDataMarker = '8-bit Realm';
	  var endOfDataMarker = 'People deserving of mad props:';

	  strHTML = strHTML.substring(strHTML.indexOf(startOfDataMarker) + startOfDataMarker.length);
	  strHTML = strHTML.substring(0,strHTML.indexOf(endOfDataMarker) + endOfDataMarker.length);

	  var listItemElements = strHTML.split("<br />");
          for (var i=0; i < listItemElements.length; i++ ) {
            var curListItem = listItemElements[i];
            //if (i < 10) { alert(curListItem + ': ' + (curListItem.indexOf('init') != -1) + ', ' +(curListItem.indexOf('italic') == 0)); }

            if ((me.trimString(curListItem) != '') && ((curListItem.indexOf('init') != -1) || (curListItem.indexOf('Init') != -1)) && (curListItem.indexOf('font-weight: bold') == -1) && (curListItem.indexOf('font-style: italic') == -1)) {

              if (curListItem.indexOf('italic') != -1) { curListItem = curListItem.substring(curListItem.indexOf('>') + 1); }

              var endOfMonsterNamePos = curListItem.indexOf(' -');
              if (endOfMonsterNamePos < 0) { endOfMonsterNamePos = curListItem.indexOf('&')-1; }


/*              var firstLessThanSignPos = curListItem.indexOf('<');
              if ((firstLessThanSignPos != -1) && (firstLessThanSignPos < endOfMonsterNamePos)) { endOfMonsterNamePos = firstLessThanSignPos; }
              //if (i < 15) { alert(curListItem + '\n: ' + endOfMonsterNamePos); }
              var curMonster = me.sanitizeMonsterName(me.trimString(curListItem.substring(0,endOfMonsterNamePos)));
              var secondHalf = curListItem.substring(endOfMonsterNamePos);
              secondHalf = secondHalf.substring(secondHalf.indexOf('<span')+1);
              var curInit = secondHalf.substring(secondHalf.indexOf('>')+1);
              curInit = me.trimString(curInit.substring(0,curInit.indexOf('init')-1));*/
              var curMonster = me.sanitizeMonsterName(me.trimString(curListItem.substring(0,endOfMonsterNamePos)));
              var curInit = curListItem.substring(curListItem.indexOf('>')+1);
              if (curInit.indexOf('init') != -1) {
                curInit = me.trimString(curInit.substring(0,curInit.indexOf('init')-1));
              } else {
                curInit = me.trimString(curInit.substring(0,curInit.indexOf('Init')-1));
              }

              var curConfirmationLevel = 'unknown';
              if (curListItem.indexOf('color: red') != -1) { curConfirmationLevel = 'Not Yet Tested'; }
              if (curListItem.indexOf('color: goldenrod') != -1) { curConfirmationLevel = 'Unconfirmed'; }
              if (curListItem.indexOf('color: green') != -1) { curConfirmationLevel = 'Confirmed'; }

              //me.GM_log(curMonster + ': ' + curInit + '; ' + curConfirmationLevel);
              me.GM_setValue(me.N_PREFIX + '-' + curMonster, curInit + ';' + curConfirmationLevel);
            }



          }
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated initiative data from Hardcore Oxygenation Forums.</font></td></tr>';
          //me.updateScriptBox();
        } else {
          var strHTML = 'Error: ' + responseDetails.status;
          me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to update initiative data from Hardcore Oxygenation Forums (' + strHTML + ').<BR>Using cached data if available.</font></td></tr>';
          //me.updateScriptBox();

        }
    }
  });
}

MonsterStats.prototype.requestHarvestN3RDData = function(){
	var me = this;
	  var curDate = new Date();
  var mainPageBody= me.doc.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  me.addedHTML = '';

  var dateElement = me.doc.getElementById("ndate");

  if (dateElement) {
    dateElement.innerHTML = 'Re-harvesting...';
  }

  me.harvestN3RDData();

  if (dateElement) {
    dateElement.innerHTML = curDate.toString();
    alert('Data harvest complete.');
  }
}

// FUNCTION: me.harvestElements
// PARAMS: sourceLine (string with the line of monsterdata from which to
//         harvest elemental atk and def indicators)

MonsterStats.prototype.harvestElements = function(sourceLine) {
	var me = this;
	                  var resultText = '';
                  var elementParts = sourceLine;

                    for(element in me.elementalTypes) {
                      if (elementParts.indexOf(me.elementalTypes[element] [0]) != -1) {
	if (resultText == '') {
                          resultText = me.elementalTypes[element] [1];
                        } else {
                          resultText = resultText + ', ' + me.elementalTypes[element] [1];
                        }

                        if (elementParts.indexOf('(') != -1) {
                          resultText = resultText + ' ' + elementParts.substring(elementParts.indexOf('('),elementParts.indexOf(')')+1);
                        } else { resultText = resultText + ' (TBD%)'; }
                      }
                    }

                  return resultText;
}

MonsterStats.prototype.storeCriticalHitModifiers = function(charPageBody) {
	var me = this;
		// Starts off at 1 (implied over 11).
  var totalCriticalHitModifier = 1;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  // Only the highest modifier ITEM counts--
  // they're ordered in the array from high to low modifers, so bail when you find the first one.
  for (cHItemIndex in me.criticalHitItems) {
    if (charPageBody.indexOf(me.criticalHitItems[cHItemIndex] [0]) != -1) {
      totalCriticalHitModifier = totalCriticalHitModifier + me.criticalHitItems[cHItemIndex] [1];
      modifierItems = modifierItems + me.criticalHitItems[cHItemIndex] [0] + '(x' + Number(me.criticalHitItems[cHItemIndex] [1]) + ')\\n';
      break;
    }
  }

  // Other modifiers STACK.  So just add them on.
  for (cHOtherIndex in me.stackableCriticalHitModifiers) {
    if(charPageBody.indexOf(me.stackableCriticalHitModifiers[cHOtherIndex] [0]) != -1)	{
      totalCriticalHitModifier = totalCriticalHitModifier + Number(me.stackableCriticalHitModifiers[cHOtherIndex] [1]);
      modifierItems = modifierItems + me.stackableCriticalHitModifiers[cHOtherIndex] [0] + '(+' + me.stackableCriticalHitModifiers[cHOtherIndex] [1] + ')\\n';
    }
  }

  me.GM_setValue(me.charName + '-CHModifierValue', String(totalCriticalHitModifier));
  me.GM_setValue(me.charName + '-CHModifiers', modifierItems);
}

MonsterStats.prototype.storeAscensionNumber = function(charPageBody) {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  if (charPageBody.indexOf('Ascensions:') != -1) {
	// then store the number of completed ascensions
    var ascensionNumber = charPageBody.substring(charPageBody.indexOf('Ascensions:'));
    ascensionNumber = ascensionNumber.substring(ascensionNumber.indexOf('<b>')+3);
    ascensionNumber = ascensionNumber.substring(0,ascensionNumber.indexOf('</b>'));
    ascensionNumber = me.trimString(ascensionNumber);
    me.GM_setValue(me.charName + '-Ascension',ascensionNumber);
  } else {
    me.GM_setValue(me.charName + '-Ascension','0');
  }
}

MonsterStats.prototype.storeAllItems = function(charPageBody) {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var targetCells = charPageBody.substring(charPageBody.indexOf('Equipment:'));
  targetCells = targetCells.substring(0,targetCells.indexOf('</table'));
  var lastIndex = 0;
  var itemList = '';

  while (targetCells.indexOf('<b',lastIndex) != -1) {
    var newItem = targetCells.substring(targetCells.indexOf('<b',lastIndex)+3);
    var itemList = itemList + me.trimString(newItem.substring(0,newItem.indexOf('</b'))) + ', ';
    lastIndex = targetCells.indexOf('<b',lastIndex) + 1;
  }

  if (itemList != '') { itemList= itemList.substring(0,itemList.length-2); }
  me.GM_setValue(me.charName + '-ItemList',itemList);

}

MonsterStats.prototype.storeAllSkills = function(charPageBody) {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var targetCells = charPageBody.substring(charPageBody.indexOf('Skills:'));
  var lastIndex = 0;
  var skillList = '';

  while (targetCells.indexOf('<a',lastIndex) != -1) {
    var newItem = targetCells.substring(targetCells.indexOf('<a',lastIndex)+1);
    newItem = newItem.substring(newItem.indexOf('>')+1);
    newItem = newItem.substring(0,newItem.indexOf('<'));
    if (newItem.indexOf('(') != -1) { newItem = newItem.substring(0,newItem.indexOf('(')); }

    var skillList = skillList + me.trimString(newItem) + ', ';
    lastIndex = targetCells.indexOf('<a',lastIndex) + 1;
  }

  if (skillList != '') { skillList= skillList.substring(0, skillList.length-2); }
  me.GM_setValue(me.charName + '-SkillList',skillList);
}
MonsterStats.prototype.storeMonsterLevelModifierItems = function(charPageBody) {	var me = this;

  var totalLevelModifier = 0;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;

  for (itemMLModifierIndex in me.itemMLModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.itemMLModifiers[itemMLModifierIndex] [0], lastFoundIndex) != -1)	 {
	  // avoid double-counting items that have identically named graphics (chopsticks vs chopsticks.gif, etc)
	  if ((charPageBody.indexOf(me.itemMLModifiers[itemMLModifierIndex] [0], lastFoundIndex)) !=
	    (charPageBody.indexOf(me.itemMLModifiers[itemMLModifierIndex] [0] + '.gif', lastFoundIndex))) {
	    var bonus = me.itemMLModifiers[itemMLModifierIndex] [1];

            // detect snake synergy
            if (me.itemMLModifiers[itemMLModifierIndex][0] == 'snake shield')  {
              if(modifierItems.indexOf('serpentine sword') != -1) {
                bonus = 10;
              }
            }
            if (bonus > 0) {
	      modifierItems = modifierItems + '   ' + me.itemMLModifiers[itemMLModifierIndex] [0] +
	          ' (+' + bonus + ');\\n';
            }
	    totalLevelModifier += bonus;
	  }
	  lastFoundIndex = charPageBody.indexOf(me.itemMLModifiers[itemMLModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  var curGrimaciteUnits = me.GM_getValue('GrimaciteUnits',0);
  for (grimaciteMLModifierIndex in me.grimaciteMLModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.grimaciteMLModifiers[grimaciteMLModifierIndex] [0], lastFoundIndex) != -1)	 {
	  if ((charPageBody.indexOf(me.grimaciteMLModifiers[grimaciteMLModifierIndex] [0], lastFoundIndex)) !=
	      (charPageBody.indexOf(me.grimaciteMLModifiers[grimaciteMLModifierIndex] [0] + '.gif', lastFoundIndex))) {
	    var curModifierImpact = curmoonGrimaciteUnits * Number(me.grimaciteMLModifiers[grimaciteMLModifierIndex] [1]);
	    totalLevelModifier = Number(totalLevelModifier) + curModifierImpact;
	    modifierItems = modifierItems + '   ' + me.grimaciteMLModifiers[grimaciteMLModifierIndex] [0] +
	        ' (+' + curModifierImpact + ');\\n';
	  }
	  lastFoundIndex = charPageBody.indexOf(me.grimaciteMLModifiers[grimaciteMLModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-MLItemsModifier', totalLevelModifier);
  me.GM_setValue(me.charName + '-MLItems', modifierItems);
}

MonsterStats.prototype.storeItemDropRateModifierSkills = function(charPageBody) {
	var me = this;
	  var totalDropRateModifier = 0;
  var modifierSkills = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  var curModifierImpact = 0;
  var charPageBody = charPageBody;
  if (charPageBody.indexOf("show permanent") != -1) {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("show permanent"));
  } else {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("(P) = Permanent skill"));
  }

  for (skillItemDropModifierIndex in me.skillItemDropModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.skillItemDropModifiers[skillItemDropModifierIndex] [0], lastFoundIndex) != -1)	 {
	  totalDropRateModifier = totalDropRateModifier + Number(me.skillItemDropModifiers[skillItemDropModifierIndex] [1]);
	  modifierSkills = modifierSkills + '   ' + me.skillItemDropModifiers[skillItemDropModifierIndex] [0] + ' (+' +
	      me.skillItemDropModifiers[skillItemDropModifierIndex] [1] * 100 + '%);\\n';
	  lastFoundIndex = charPageBody.indexOf(me.skillItemDropModifiers[skillItemDropModifierIndex] [0], lastFoundIndex) + 1;
	}
  }
  me.GM_setValue(me.charName + '-ItemDropRateSkills', modifierSkills);
  me.GM_setValue(me.charName + '-ItemDropRateSkillsModifier', String(totalDropRateModifier));
}

MonsterStats.prototype.storeMeatDropRateModifierSkills = function(charPageBody) {
	var me = this;
	var totalDropRateModifier = 0;
  var modifierSkills = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  var curModifierImpact = 0;
  var charPageBody = charPageBody;
  if (charPageBody.indexOf("show permanent") != -1) {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("show permanent"));
  } else {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("(P) = Permanent skill"));
  }

  for (skillMeatDropModifierIndex in me.skillMeatDropModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.skillMeatDropModifiers[skillMeatDropModifierIndex] [0], lastFoundIndex) != -1)	 {
	  totalDropRateModifier = totalDropRateModifier + Number(me.skillMeatDropModifiers[skillMeatDropModifierIndex] [1]);
	  modifierSkills = modifierSkills + '   ' + me.skillMeatDropModifiers[skillMeatDropModifierIndex] [0] + ' (+' +
	      me.skillMeatDropModifiers[skillMeatDropModifierIndex] [1] * 100 + '%);\\n';
	  lastFoundIndex = charPageBody.indexOf(me.skillMeatDropModifiers[skillMeatDropModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-MeatDropRateSkills', modifierSkills);
  me.GM_setValue(me.charName + '-MeatDropRateSkillsModifier', String(totalDropRateModifier));
}

MonsterStats.prototype.storeInitiativeRateModifierSkills = function(charPageBody) {
	var me = this;
	  var totalInitiativeModifier = 0;
  var modifierSkills = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  var curModifierImpact = 0;
  var charPageBody = charPageBody;
  if (charPageBody.indexOf("show permanent") != -1) {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("show permanent"));
  } else {
    charPageBody = charPageBody.substring(0,charPageBody.indexOf("(P) = Permanent skill"));
  }

  for (skillInitiativeModifierIndex in me.skillInitiativeModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.skillInitiativeModifiers[skillInitiativeModifierIndex] [0], lastFoundIndex) != -1)	 {
	  totalInitiativeModifier = totalInitiativeModifier + Number(me.skillInitiativeModifiers[skillInitiativeModifierIndex] [1]);
	  modifierSkills = modifierSkills + '   ' + me.skillInitiativeModifiers[skillInitiativeModifierIndex] [0] + ' (+' +
	      me.skillInitiativeModifiers[skillInitiativeModifierIndex] [1] * 100 + '%);\\n';
	  lastFoundIndex = charPageBody.indexOf(me.skillInitiativeModifiers[skillInitiativeModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-InitiativeSkills', modifierSkills);
  me.GM_setValue(me.charName + '-InitiativeSkillsModifier', String(totalInitiativeModifier));
}

MonsterStats.prototype.storeInitiativeModifierItems = function(charPageBody) {
	var me = this;
	  var totalInitiativeModifier = 0;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  var curModifierImpact = 0;

  for (itemInitiativeModifierIndex in me.itemInitiativeModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.itemInitiativeModifiers[itemInitiativeModifierIndex] [0], lastFoundIndex) != -1)	 {
	  // avoid double-counting items that have identically named graphics (chopsticks vs chopsticks.gif, etc)
	  if ((charPageBody.indexOf(me.itemInitiativeModifiers[itemInitiativeModifierIndex] [0], lastFoundIndex)) !=
	    (charPageBody.indexOf(me.itemInitiativeModifiers[itemInitiativeModifierIndex] [0] + '.gif', lastFoundIndex))) {
	    totalInitiativeModifier = totalInitiativeModifier + Number(me.itemInitiativeModifiers[itemInitiativeModifierIndex] [1]);
	    modifierItems = modifierItems + '   ' + me.itemInitiativeModifiers[itemInitiativeModifierIndex] [0] + ' (+' +
	        me.itemInitiativeModifiers[itemInitiativeModifierIndex] [1] * 100 + '%);\\n';
	  }
	  lastFoundIndex = charPageBody.indexOf(me.itemInitiativeModifiers[itemInitiativeModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-ItemInitiativeModifierItems', modifierItems);
  me.GM_setValue(me.charName + '-ItemInitiativeModifier', String(totalInitiativeModifier));
}

MonsterStats.prototype.storeItemDropRateModifierItems = function(charPageBody) {
	var me = this;
	  var totalDropRateModifier = 0;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  var curModifierImpact = 0;
  var curmoonBrightness = me.GM_getValue('moonBrightness',0);

  for (itemItemDropModifierIndex in me.itemItemDropModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.itemItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex) != -1) {
	  if ((charPageBody.indexOf(me.itemItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex)) !=
	      (charPageBody.indexOf(me.itemItemDropModifiers[itemItemDropModifierIndex] [0] + '.gif', lastFoundIndex))) {
	    totalDropRateModifier = totalDropRateModifier + Number(me.itemItemDropModifiers[itemItemDropModifierIndex] [1]);
	    modifierItems = modifierItems + '   ' + me.itemItemDropModifiers[itemItemDropModifierIndex] [0] + ' (+' +
	        Math.round(me.itemItemDropModifiers[itemItemDropModifierIndex] [1] * 100) + '%);\\n';
	  }
	  lastFoundIndex = charPageBody.indexOf(me.itemItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  for (itemItemDropModifierIndex in me.moonPhaseItemDropModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex) != -1)	 {
	  if ((charPageBody.indexOf(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex)) !=
	      (charPageBody.indexOf(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [0] + '.gif', lastFoundIndex))) {
	    curModifierImpact = (Number(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [1]) +
	        (curmoonBrightness * Number(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [2])))/100;
	    totalDropRateModifier = Number(totalDropRateModifier) + curModifierImpact;
	    modifierItems = modifierItems + '   ' + me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [0] +
	        ' (+' + Math.round(curModifierImpact * 100) + '%);\\n';
	  }
	  lastFoundIndex = charPageBody.indexOf(me.moonPhaseItemDropModifiers[itemItemDropModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-ItemDropRateItems', modifierItems);
  me.GM_setValue(me.charName + '-ItemDropRateItemsModifier', String(totalDropRateModifier));
}

MonsterStats.prototype.storeMeatDropRateModifierItems = function(charPageBody) {
	var me = this;
	  var totalDropRateModifier = 0;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;

  for (itemMeatDropModifierIndex in me.itemMeatDropModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.itemMeatDropModifiers[itemMeatDropModifierIndex] [0], lastFoundIndex) != -1)	 {
	  totalDropRateModifier = Number(totalDropRateModifier) + me.itemMeatDropModifiers[itemMeatDropModifierIndex] [1];
	  modifierItems = modifierItems + '   ' + me.itemMeatDropModifiers[itemMeatDropModifierIndex] [0] + ' (+' + Math.round(100 * me.itemMeatDropModifiers[itemMeatDropModifierIndex] [1]) + '%);\\n';
	  //alert(charPageBody.substring(charPageBody.indexOf(me.itemMeatDropModifiers[itemMeatDropModifierIndex] [0], lastFoundIndex)));
	  lastFoundIndex = charPageBody.indexOf(me.itemMeatDropModifiers[itemMeatDropModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-MeatDropRateItemsModifier', String(totalDropRateModifier));
  me.GM_setValue(me.charName + '-MeatDropRateItems', modifierItems);
}

MonsterStats.prototype.storeStatGainModifierItems = function(charPageBody) {
	var me = this;
	  var totalStatGainModifier = 0;
  var modifierItems = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;

  for (itemStatGainModifierIndex in me.itemStatGainModifiers) {
	lastFoundIndex = 0;
	while (charPageBody.indexOf(me.itemStatGainModifiers[itemStatGainModifierIndex] [0], lastFoundIndex) != -1)	 {
	  totalStatGainModifier = Number(totalStatGainModifier) + me.itemStatGainModifiers[itemStatGainModifierIndex] [1];
	  modifierItems = modifierItems + '   ' + me.itemStatGainModifiers[itemStatGainModifierIndex] [0] +
	      ' (+' + me.itemStatGainModifiers[itemStatGainModifierIndex] [1] + ');\\n';
	  lastFoundIndex = charPageBody.indexOf(me.itemStatGainModifiers[itemStatGainModifierIndex] [0], lastFoundIndex) + 1;
	}
  }

  me.GM_setValue(me.charName + '-StatGainItemsModifier', String(totalStatGainModifier));
  me.GM_setValue(me.charName + '-StatGainItems', modifierItems);
}

MonsterStats.prototype.storeClassType = function(charPageBody) {	var me = this;

  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var bFound = 0;

  for (charClassIndex in me.characterClasses) {
    for	(classTitleIndex in me.characterClasses[charClassIndex] [2]) {
      if (charPageBody.indexOf(me.characterClasses[charClassIndex] [2] [classTitleIndex]) != -1) {
	me.GM_setValue(me.charName + '-Class',me.characterClasses[charClassIndex] [0]);
	if (me.characterClasses[charClassIndex] [1] == 'Muscle') {
          me.GM_setValue(me.charName + '-MuscleClass',1);
          me.GM_setValue(me.charName + '-MysticalityClass',0);
          me.GM_setValue(me.charName + '-MoxieClass',0); }
	if (me.characterClasses[charClassIndex] [1] == 'Mysticality') {
          me.GM_setValue(me.charName + '-MuscleClass',0);
          me.GM_setValue(me.charName + '-MysticalityClass',1);
          me.GM_setValue(me.charName + '-MoxieClass',0); }
	if (me.characterClasses[charClassIndex] [1] == 'Moxie') {
          me.GM_setValue(me.charName + '-MuscleClass',0);
          me.GM_setValue(me.charName + '-MysticalityClass',0);
          me.GM_setValue(me.charName + '-MoxieClass',1); }

	bFound = 1;
	break;
      }
    }
    if (bFound != 0) { break; }
  }

}

MonsterStats.prototype.storeMaxHP = function(charPaneBody) {
	var me = this;

  me.charName = me.GM_getValue('CurCharName-' + location.host,'');


  if (charPaneBody.indexOf('Lvl. ') != -1) {
	targetElements = me.doc.getElementsByTagName("tr");
	var elementIndex = 0;
	while ((elementIndex < targetElements.length) && (targetElements[elementIndex].innerHTML.indexOf('HP:') == -1)) { elementIndex = elementIndex + 1; }

	if (elementIndex < targetElements.length) {
	  var subElements = targetElements[elementIndex].getElementsByTagName("td");
	  if ((subElements) && (subElements.length > 1)) {
	    var maxHP = subElements[1].innerHTML.substring(subElements[1].innerHTML.indexOf('/') + 1);
	    if (maxHP.indexOf('<') != -1) {
	      maxHP = maxHP.substring(0, maxHP.indexOf('<'));
            }

            me.GM_setValue(me.charName + '-MaxHP',String(maxHP));
          }
        }
  } else {
        var targetElements = me.doc.getElementsByTagName("span");

	maxHP = targetElements[0].innerHTML.substring(targetElements[0].innerHTML.indexOf('/&nbsp;') + 7);

	me.GM_setValue(me.charName + '-MaxHP',String(maxHP));
  }


}

MonsterStats.prototype.storeMonsterLevelModifierEffects = function(charPaneBody) {	var me = this;

  var totalLevelModifier = 0;
  var modifierEffects = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  // Handle Ur-Kel because it depends on Player Level
  if (charPaneBody.indexOf('Ur-Kel\'s Aria of Annoyance') != -1)	 {
	var curLevelModifier = (2 * me.GM_getValue(me.charName + '-Level',1));
	modifierEffects = modifierEffects + '   Ur-Kels Aria of Annoyance (+' + curLevelModifier + ')\\n';
	totalLevelModifier = totalLevelModifier + curLevelModifier;
  }

  // Loop through all the others to see if any of them are active
  for (effectIndex in me.effectMLModifiers) {
    if (charPaneBody.indexOf(me.effectMLModifiers[effectIndex] [0]) != -1) {
      modifierEffects = modifierEffects + '   ' + me.effectMLModifiers[effectIndex] [0] +
          ' (+' + me.effectMLModifiers[effectIndex] [1] + ')\\n';
      totalLevelModifier = totalLevelModifier + Number(me.effectMLModifiers[effectIndex] [1]);
    }
  }

  modifierEffects = modifierEffects.replace(/\'/g," ");

  me.GM_setValue(me.charName + '-MLEffects', modifierEffects);
  me.GM_setValue(me.charName + '-MLEffectsModifier',totalLevelModifier);
}

MonsterStats.prototype.storeItemDropRateModifierEffects = function(charPaneBody) {	var me = this;

  var totalItemDropRateModifier = 0;
  var modifierEffects = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  for (effectIndex in me.effectItemDropModifiers) {
    if (charPaneBody.indexOf(me.effectItemDropModifiers[effectIndex] [0]) != -1) {
      modifierEffects = modifierEffects + '   ' + me.effectItemDropModifiers[effectIndex] [0] +
          ' (+' + Math.round(me.effectItemDropModifiers[effectIndex] [1] * 100) + '%)\\n';
      totalItemDropRateModifier = Number(totalItemDropRateModifier) + Number(me.effectItemDropModifiers[effectIndex] [1]);
    }
  }

  modifierEffects = modifierEffects.replace(/\'/g," ");

  me.GM_setValue(me.charName + '-ItemDropRateEffects', modifierEffects);
  me.GM_setValue(me.charName + '-ItemDropRateEffectsModifier', String(totalItemDropRateModifier));
}

MonsterStats.prototype.storeMeatDropRateModifierEffects = function(charPaneBody) {	var me = this;

  var totalMeatDropRateModifier = 0;
  var modifierEffects = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  for (effectIndex in me.effectMeatDropModifiers) {
    if (charPaneBody.indexOf(me.effectMeatDropModifiers[effectIndex] [0]) != -1) {
      modifierEffects = modifierEffects + '   ' + me.effectMeatDropModifiers[effectIndex] [0] +
          ' (+' + Math.round(me.effectMeatDropModifiers[effectIndex] [1] * 100) + '%)\\n';
      totalMeatDropRateModifier = Number(totalMeatDropRateModifier) + Number(me.effectMeatDropModifiers[effectIndex] [1]);
    }
  }

  modifierEffects = modifierEffects.replace(/\'/g," ");

  me.GM_setValue(me.charName + '-MeatDropRateEffects', modifierEffects);
  me.GM_setValue(me.charName + '-MeatDropRateEffectsModifier', String(totalMeatDropRateModifier));
}

MonsterStats.prototype.storeInitiativeModifierEffects = function(charPaneBody) {	var me = this;

  var totalInitiativeModifier = 0;
  var modifierEffects = '';
  var suspectEffects = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  for (effectIndex in me.effectInitiativeModifiers) {
    if (charPaneBody.indexOf(me.effectInitiativeModifiers[effectIndex] [0]) != -1) {
      modifierEffects = modifierEffects + '   ' + me.effectInitiativeModifiers[effectIndex] [0] +
          ' (+' + Math.round(me.effectInitiativeModifiers[effectIndex] [1] * 100) + '%)\\n';
      totalInitiativeModifier = Number(totalInitiativeModifier) + Number(me.effectInitiativeModifiers[effectIndex] [1]);
    }
  }

  modifierEffects = modifierEffects.replace(/\'/g," ");

  me.GM_setValue(me.charName + '-InitiativeEffects', modifierEffects);
  me.GM_setValue(me.charName + '-InitiativeEffectsModifier', String(totalInitiativeModifier));

  // Now check for the ones that we suspect may have an impact but we do not know how much,
  // so that we can avoid submitting init data if they are active

  for (effectIndex in me.suspectedeffectInitiativeModifiers) {
    if (charPaneBody.indexOf(me.suspectedeffectInitiativeModifiers[effectIndex] [0]) != -1) {
      suspectEffects = suspectEffects + me.suspectedeffectInitiativeModifiers[effectIndex] [0] +'; ';
    }
  }

  for (outfitIndex in me.outfitGraphics) {
    if (charPaneBody.indexOf(me.outfitGraphics[outfitIndex] [0]) != -1) {
      suspectEffects = suspectEffects + me.outfitGraphics[outfitIndex] [1] +'; ';
    }
  }

  me.GM_setValue(me.charName + '-SuspectedInitiativeEffects', suspectEffects);
}

MonsterStats.prototype.storeStatGainModifierEffects = function(charPaneBody) {
	var me = this;
	  var totalStatGainModifier = 0;
  var modifierEffects = '';
  me.charName = me.GM_getValue('CurCharName-' + location.host,'');

  for (effectIndex in me.effectStatGainModifiers) {
    if (charPaneBody.indexOf(me.effectStatGainModifiers[effectIndex] [0]) != -1) {
      modifierEffects = modifierEffects + '   ' + me.effectStatGainModifiers[effectIndex] [0] +
          ' (+' + me.effectStatGainModifiers[effectIndex] [1] + ')\\n';
      totalStatGainModifier = Number(totalStatGainModifier) + Number(me.effectStatGainModifiers[effectIndex] [1]);
    }
  }

  modifierEffects = modifierEffects.replace(/\'/g," ");

  me.GM_setValue(me.charName + '-StatGainEffects', modifierEffects);
  me.GM_setValue(me.charName + '-StatGainEffectsModifier', String(totalStatGainModifier));
}

MonsterStats.prototype.storeItemDropRateFamiliarImpact = function() {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
  var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));
  var totalItemDropRateModifier = 0;
  var modifierImpacts = '';

  for (familiarIndex in me.familiarItemDropModifiers) {
    if (me.familiarItemDropModifiers[familiarIndex] == familiarType) {
      totalItemDropRateModifier = Math.round(Math.sqrt(55 * familiarWeight) + familiarWeight - 3) / 100;
      modifierImpacts = me.familiarItemDropModifiers[familiarIndex] + ' (+' + Math.round(((totalItemDropRateModifier) * 100)*100)/100 + '%)';
      break;
    }
  }

  me.GM_setValue(me.charName + '-ItemDropRateFamiliarImpactModifier', String(totalItemDropRateModifier));
  me.GM_setValue(me.charName + '-ItemDropRateFamiliarImpact', modifierImpacts);
}

MonsterStats.prototype.storeMeatDropRateFamiliarImpact = function() {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
  var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));
  var totalMeatDropRateModifier = 0;
  var modifierImpacts = '';

  for (familiarIndex in me.familiarMeatDropModifiers) {
    if (me.familiarMeatDropModifiers[familiarIndex] == familiarType) {
      totalMeatDropRateModifier = Math.round(Math.sqrt(220*familiarWeight) + (2 * familiarWeight) - 6) / 100;
      modifierImpacts = me.familiarMeatDropModifiers[familiarIndex] + ' (+' + Math.round(((totalMeatDropRateModifier) * 100)*100)/100 + '%)';
      break;
    }
  }

  me.GM_setValue(me.charName + '-MeatDropRateFamiliarImpactModifier', String(totalMeatDropRateModifier));
  me.GM_setValue(me.charName + '-MeatDropRateFamiliarImpact', modifierImpacts);
}

MonsterStats.prototype.storeFamiliarNameAndWeight = function(charPaneBodyElement) {
	var me = this;
	  me.charName = me.GM_getValue('CurCharName-' + location.host,'');
  var familiarType = '';
  var familiarWeight = 0;

  var fontElements = me.doc.getElementsByTagName("font");

  for (var i=0; i < fontElements.length; i++ ) {
    curFontElement = me.doc.getElementsByTagName("font")[i];
    // If it contains a 'pound' it's a familiar (ex: 17 pound Baby Gravy Fairy).  So
    // just tack a wiki link onto the end of that.
    if (curFontElement.innerHTML.indexOf('pound') != -1) {
	    
	  familiarString = curFontElement.innerHTML.substring(curFontElement.innerHTML.indexOf('Familiar:'));
      familiarType = familiarString.substring(familiarString.indexOf('pound')+6);
      if (familiarType.indexOf(',') > 0) { familiarType = familiarType.substring(0,familiarType.indexOf(',')); } // Handle comma-chameleons, doppelshifters (hopefully)
      if (familiarType.indexOf('<') > 0) { familiarType = familiarType.substring(0,familiarType.indexOf('<')); } // Handle non fully-leveled-up familiars
      familiarType = me.trimString(familiarType);

      familiarWeight = familiarString.substring(familiarString.indexOf('<b>'), familiarString.indexOf('</'));
      familiarWeight = familiarWeight.substring(familiarWeight.indexOf('>')+1);
      
    }
  }

  if (familiarType == '') { // didnt' find a familiar-- perhaps we're in compact mode?  Let's try that.

    var imgElements = me.doc.getElementsByTagName("img");

    for (var i=0; i < imgElements.length; i++) {
        curImgElement = imgElements[i];

        var imgOnClick = curImgElement.getAttribute('onClick');
        var imgTitle = curImgElement.getAttribute('title');

        var imgSrc = curImgElement.getAttribute("src");

        if (!imgSrc)
        {
            continue;
        }

        familiarIdentifier = me.imgToFamiliar(imgSrc);
	if (familiarIdentifier != 0) { familiarType = familiarIdentifier }
    }
    if (charPaneBodyElement.innerHTML.indexOf(' lbs.') != -1) {
      familiarWeight = charPaneBodyElement.innerHTML.substring(charPaneBodyElement.innerHTML.indexOf(' lbs.')-2,charPaneBodyElement.innerHTML.indexOf(' lbs.'));
      if (familiarWeight.indexOf('>') != -1) { familiarWeight = familiarWeight.substring(1); }
    }
    if (charPaneBodyElement.innerHTML.indexOf(' lb.') != -1) {
      familiarWeight = 1;
    }

  }
  if (familiarType != "") {
  me.GM_setValue(me.charName + '-FamiliarType', familiarType);
  me.GM_setValue(me.charName + '-FamiliarWeight', familiarWeight);}

}


MonsterStats.prototype.checkCharPage = function() {
	var me = this;
		me.GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://'+location.host+'/' + 'charsheet.php',
	  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	  onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				me.storeAscensionNumber(responseDetails.responseText);
				me.storeAllItems(responseDetails.responseText);
				me.storeAllSkills(responseDetails.responseText);
				me.storeClassType(responseDetails.responseText);
				me.storeMonsterLevelModifierItems(responseDetails.responseText);
				me.storeCriticalHitModifiers(responseDetails.responseText);
				me.storeItemDropRateModifierItems(responseDetails.responseText);
				me.storeMeatDropRateModifierItems(responseDetails.responseText);
				me.storeInitiativeModifierItems(responseDetails.responseText);
				me.storeStatGainModifierItems(responseDetails.responseText);
				me.storeItemDropRateModifierSkills(responseDetails.responseText);
				me.storeMeatDropRateModifierSkills(responseDetails.responseText);
				me.storeInitiativeRateModifierSkills(responseDetails.responseText);
			}
	  }
	});
}

MonsterStats.prototype.checkForUpdate = function() {
	var me = primary;
	// If possible, grab the latest version of this script from UserScripts
	// and see if it's newer than this version.
	me.GM_xmlhttpRequest({
	    method: 'GET',
	    url: scriptURL,
	    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	    onload: function(responseDetails) {
		if (responseDetails.status == "200") {
			var strHTML = responseDetails.responseText;
			var newVer = strHTML.match(/description\s*Version \w+\.\w+/);
			var newVer = Number(strHTML.substring(strHTML.indexOf('Version ')+8, strHTML.indexOf('Version ')+11));
			newVer = newVer * 100;
			me.GM_setValue("scriptWebVer",newVer);
		} else {
	                me.GM_setValue("scriptWebVer","Error");
		}
	  }
	});
}

MonsterStats.prototype.checkForNewData = function() {
	var me = this;
	  var localaddedHTML = '';
  var curDate = new Date();
  var oneDay = 1000*60*60*24; // one day in milliseconds;
  var fourHours = 1000*60*60*4; // four hours in milliseconds;

  var checkedDateKW = me.GM_getValue(me.KW_PREFIX + "_Last_Checked", '');
  var checkedDateY = me.GM_getValue(me.Y_PREFIX + "_Last_Checked", '');
  var checkedDateR = me.GM_getValue(me.R_PREFIX + "_Last_Checked", '');
  var checkedDateN = me.GM_getValue(me.N_PREFIX + "_Last_Checked", '');

  if ((checkedDateKW.length == 0) || (curDate.getTime() > (Date.parse(checkedDateKW) + oneDay))) {
    me.harvestMafiaData();
  }
  else {
    localaddedHTML = localaddedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Statistical data (from Kittiwake / Hardcore Oxygenation Forums) &#60; 1 day old. Using cached data.</font></td></tr>';
    //me.updateScriptBox();
  }

	if ((checkedDateY.length == 0) || (curDate.getTime() > (Date.parse(checkedDateY) + oneDay))) {
	  me.harvestYiabData();
	} else {
	  localaddedHTML = localaddedHTML +
	      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Item-drop data (from KoL Wiki / Yiab) &#60; 1 day old. Using cached data.</font></td></tr>';
	  //me.updateScriptBox();
	}

	//if ((checkedDateR.length == 0) || (curDate.getTime() > (Date.parse(checkedDateR) + oneDay))) {
	//  me.harvestRagnokData();
	//} else {
	//  localaddedHTML = localaddedHTML +
	//      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Meat-drop data (from Subjunctive / Ragnok) &#60; 1 day old. Using cached data.</font></td></tr>';
	  //me.updateScriptBox();
	//}

	if ((checkedDateN.length == 0) || (curDate.getTime() > (Date.parse(checkedDateN) + fourHours))) {
	  me.harvestN3RDData();
	} else {
	  localaddedHTML = localaddedHTML +
	      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Initiative Data from N3RD (Hardcore Oxygenation Forums) &#60; 1 day old. Using cached data.</font></td></tr>';
	  //me.updateScriptBox();
	}

	return localaddedHTML;

}

MonsterStats.prototype.calculateDelevelsToMonster = function(pageBodyText, monsterAtk, monsterDef, baseAtk, baseDef, havemanuel) {
	var me = this;
      var combatMinDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
      var combatMaxDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
      var combatAtkOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
      var combatDefOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
      var combatDelevelText = me.GM_getValue(me.charName + '-CurMonsterDelevelText','');

      // Monster Level modifiers
      var itemsMLModifier = me.GM_getValue(me.charName + '-MLItemsModifier',0);
      var effectsMLModifier = me.GM_getValue(me.charName + '-MLEffectsModifier',0);
      var mcdMLModifier = me.GM_getValue(me.charName + '-MCDLevel', 0);
      var totalMLModifier = itemsMLModifier + effectsMLModifier + mcdMLModifier;
      var listMLItems = me.GM_getValue(me.charName + '-MLItems', '');
      var listMLEffects = me.GM_getValue(me.charName + '-MLEffects', '');
      var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
      var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));


      // Check for in-combat deleveling, if any.

      var cd = 0;
      var ca = 0;
      if (pageBodyText.indexOf('Monster attack power reduced') != -1) { 
	var j = pageBodyText.indexOf('Monster attack power reduced ') + 29;
	j = pageBodyText.indexOf('<b>', j);
	ca = Number(pageBodyText.substring(j+3, pageBodyText.indexOf('<', j+3)));
      }
      combatAtkOnlyDeleveled += ca;

      if (pageBodyText.indexOf('Monster defense reduced') != -1) { 
	var j = pageBodyText.indexOf('Monster defense reduced ') + 24;
	j = pageBodyText.indexOf('<b>', j);
	cd = Number(pageBodyText.substring(j+3, pageBodyText.indexOf('<', j+3)));
      }
	combatDefOnlyDeleveled += cd;

      var monAtkMax = monsterAtk - Number(combatMinDeleveled) - Number(combatAtkOnlyDeleveled);
      var monAtkMin = monsterAtk - Number(combatMaxDeleveled) - Number(combatAtkOnlyDeleveled);
      var monDefMax = monsterDef - Number(combatMinDeleveled) - Number(combatDefOnlyDeleveled);
      var monDefMin = monsterDef - Number(combatMaxDeleveled) - Number(combatDefOnlyDeleveled);

      if (havemanuel == 1 && unsafeWindow.monsterstats != undefined) {
	  monAtkMax = unsafeWindow.monsterstats.off;
	  monAtkMin = unsafeWindow.monsterstats.off;
	  monDefMax = unsafeWindow.monsterstats.def;
	  monDefMin = unsafeWindow.monsterstats.def;
      }

      //TODO
      if (monAtkMin == monAtkMax) {
        var monAtkText = monAtkMin;
      } else {
	var monAtkText = monAtkMin + '-' + monAtkMax;
      }

      if (monDefMin == monDefMax) {
	var monDefText = monDefMin;
      } else {
	var monDefText = monDefMin + '-' + monDefMax;
      }

      if ((monDefMin - baseDef) < 0) { minSign = ''; } else { minSign = '+'; }
      if ((monDefMax - baseDef) < 0) { maxSign = ''; } else { maxSign = '+'; }

      if (monDefMin == monDefMax) {
        var monDefPart = minSign + (monDefMin - baseDef);
      } else {
	var monDefPart = minSign + (monDefMin - baseDef) + ' to ' + maxSign + (monDefMax - baseDef);
      }

      if ((monAtkMin - baseAtk) < 0) { minSign = ''; } else { minSign = '+'; }
      if ((monAtkMax - baseAtk) < 0) { maxSign = ''; } else { maxSign = '+'; }
      if (monAtkMin == monAtkMax) {
        var monAtkPart = minSign + (monAtkMin - baseAtk);
      } else {
	var monAtkPart = minSign + (monAtkMin - baseAtk) + ' to ' + maxSign + (monAtkMax - baseAtk);
      }

	    me.GM_setValue(me.charName + '-CurMonsterLevel',(monDefMin - baseDef)+'');

      if (monDefPart == monAtkPart) {
	var textMLModiferResult = monDefPart + ' ML';
      } else {
	var textMLModiferResult = monAtkPart + ' Atk / ' + monDefPart + ' Def';
      }

      var textMLModifiers = "Items Impacting ML:\\n" + listMLItems +"\\n\\nEffects Impacting ML:\\n\\n" + listMLEffects +"\\n\\nMind Control Device: " + mcdMLModifier + "\\n\\nIn Combat Delevels:\\n" + combatDelevelText;

      // Store all of the above
      me.GM_setValue(me.charName + '-CurMonsterCombatMinDeleveled',combatMinDeleveled);
      me.GM_setValue(me.charName + '-CurMonsterCombatMaxDeleveled',combatMaxDeleveled);
      me.GM_setValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',combatAtkOnlyDeleveled);
      me.GM_setValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',combatDefOnlyDeleveled);
      me.GM_setValue(me.charName + '-CurMonsterDelevelText',combatDelevelText);
      me.GM_setValue(me.charName + '-monAtkMax',monAtkMax);
      me.GM_setValue(me.charName + '-monAtkMin',monAtkMin);
      me.GM_setValue(me.charName + '-monDefMax',monDefMax);
      me.GM_setValue(me.charName + '-monDefMin',monDefMin);
      me.GM_setValue(me.charName + '-monAtkText',monAtkText);
      me.GM_setValue(me.charName + '-monDefText',monDefText);
      me.GM_setValue(me.charName + '-textMLModiferResult',textMLModiferResult);
      me.GM_setValue(me.charName + '-textMLModifiers',textMLModifiers);

}


MonsterStats.prototype.calculateDamageToMonster = function(pageBodyText) {
	var me = this;
	  var totalDamageAmount = 0;
  var damageAmount = 0;
  var specialDamage = 0;
  var debugText = me.GM_getValue(me.charName + '-CurMonsterDamageDebug','');
  var roundCounter = me.GM_getValue(me.charName + '-RoundCounter',1);

  if (pageBodyText.indexOf('You cast Magic Missile') != -1) {
    me.GM_setValue(me.charName + '-IndeterminateDamage',1);

    var damageText = pageBodyText.match(/ (\d)d4\+\d points/);
    if (damageText && (damageText[0])) {
      var curDamageAmount = Number(damageText[0].substring(1,2)) + Number(damageText[0].substring(5,6));
      totalDamageAmount = totalDamageAmount + curDamageAmount;
      debugText = debugText + me.buildDebugRow(roundCounter, curDamageAmount, 'Magic Missile Damage',damageText[0]);
    }
  }

      // Handle elemental base dealt by the player. (like with kodiak)
      var damageText = pageBodyText.match(/\<font color\=[\"]?\w+[\"]?\>\<b\>\d+\<\/b\>\<\/font\>/g);
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          var curDamageAmount = damageText[i].substring(damageText[i].indexOf('b>')+2);
          damageAmount = curDamageAmount.substring(0,curDamageAmount.indexOf('<'));
          if (damageAmount != '') {
            debugText = debugText + me.buildDebugRow(roundCounter, damageAmount, 'Elemental Spell Damage',damageText[i]);

            specialDamage = specialDamage + Number(damageAmount);
            totalDamageAmount = totalDamageAmount + Number(damageAmount);
          }
        }
      }

      // Handle elemental SPELL dealt by the player.
      var damageText = pageBodyText.match(/\<font color\=[\"]?\w+[\"]?\>\<b\>[\+]?\d+\<\/b\>\<\/font\> ((damage)|(points))/g);
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          var curDamageAmount = damageText[i].substring(damageText[i].indexOf('b>')+2);
          damageAmount = curDamageAmount.substring(0,curDamageAmount.indexOf('<'));
          if (damageAmount != '') {
            debugText = debugText + me.buildDebugRow(roundCounter, damageAmount, 'Elemental Spell Damage',damageText[i]);

            specialDamage = specialDamage + Number(damageAmount);
            totalDamageAmount = totalDamageAmount + Number(damageAmount);
          }
        }
      }

      // Handle other elemental damage dealt by player and dual-wielding damage
      var damageText = pageBodyText.match(/\((\<font color\=[\"]?\w+[\"]?\>)?\<b\>\+\d+\<\/b\>(\<\/font\>)?\)/g);
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          var curDamageAmount = damageText[i].substring(damageText[i].indexOf('>+')+2);
          damageAmount = curDamageAmount.substring(0,curDamageAmount.indexOf('<'));
          debugText = debugText + me.buildDebugRow(roundCounter, damageAmount, 'Elemental Non-Spell Damage',damageText[i]);
          specialDamage = specialDamage + Number(damageAmount);
          totalDamageAmount = totalDamageAmount + Number(damageAmount);
        }
      }

      // First NON-elemental damage MAY be fumble damage to the player.  Skip it if so.
      if (pageBodyText.indexOf('FUMBLE!') != -1) {
	// We have to be careful to avoid jumping ahead if the clockwork apparatus converts the fumble
	// into a non-fumble.
	if ( (pageBodyText.indexOf('pair of strange mechanical arms pop') != -1) ||
	     (pageBodyText.indexOf('set of helicopter blades emerge') != -1) ||
	     (pageBodyText.indexOf('swear that you saw a yellow dog come') != -1) ||
	     (pageBodyText.indexOf('ground a boxing glove emerges from') != -1) ) {
	  var firstElementIndex = 0; // It was salvaged, so don't skip ahead.
	} else {
          var firstElementIndex = 1;
        }
      } else {
        var firstElementIndex = 0;
      }

       // Since the elemental damage is mixed into the regular damage message, we have to work around
       // it for calculating regular damage.  So we optionally match on it but parse around it if it exists.
       var damageText = pageBodyText.match(/ ((your blood, to the tune of )|(stabs you for )|(sown ))?\d+ (\([^\.]+\) )?(\w+ ){0,2}((damage)|(points)|(notches)|(to your opponent))/g);
       if (damageText) {
         for (var i = firstElementIndex; i < damageText.length; i++) {
           if (damageText[i].indexOf('sown ') == 1) { // Handle the evil, evil reap/sow message's double damage indicators.
             totalDamageAmount = totalDamageAmount - Math.round(specialDamage / 2);
             debugText = debugText + me.buildDebugRow(roundCounter, '<i>-' + Math.round(specialDamage / 2) + '</i>', 'Neg Compensation for Doubled Message (reap/sow)',damageText[i]);
             continue;
           }

           if ((damageText[i].indexOf('your blood, to the tune of ') == 1) || (damageText[i].indexOf('stabs you for ') == 1)) {
             // This looks like damage inflicted to a monster, but really it's damage inflicted to the player by their familiar.
             // The "stabs you for " is worrisome in that it's so generic, but currently all monsters that stab you have messages
             // that say "stabs you in the $bodypart" or something else that won't match.  But we MUST keep an eye out for new damage messages
             // that might match.
             continue;
           }

           if ((damageText[i].indexOf('hit points') != -1) || (damageText[i].indexOf('mana points') != -1)) {
             continue;
          }
          damageAmount = damageText[i].substring(1, damageText[i].indexOf(' ',1));

          debugText = debugText + me.buildDebugRow(roundCounter, damageAmount, 'Normal Damage',damageText[i]);

          totalDamageAmount = totalDamageAmount + Number(damageAmount);
        }
      }

      // Weird special cases that don't matchthe usual "damage" text pattern.

      // Handle damage dealt by Mosquito...
      if (pageBodyText.indexOf('sucks some blood out of your opponent and injects it into you.') != -1) {
        var bodyAfterMessage =	pageBodyText.substring(pageBodyText.indexOf('sucks some blood out of your opponent and injects it into you.')+1);
        var damageText = bodyAfterMessage.match(/You gain \d+ hit point/);
        if (damageText) {
          damageAmount = damageText[0].substring(9,damageText[0].indexOf('hit point'));
          debugText = debugText + me.buildDebugRow(roundCounter, damageAmount, 'Mosquito Damage',damageText[0]);
          totalDamageAmount = totalDamageAmount + Number(damageAmount);
        }
      }

      // Handle MP Suck by boss bat-- gets converted into HP for the Boss Bat...
      if (pageBodyText.indexOf('until he disengages, two goofy grins on his faces.') != -1) {
        var bodyAfterMessage =	pageBodyText.substring(pageBodyText.indexOf('until he disengages, two goofy grins on his faces.')+1);
        var damageText = bodyAfterMessage.match(/You lose \d+/);
        if (damageText) {
          damageAmount = Number(damageText[0].substring(9));
          debugText = debugText + me.buildDebugRow(roundCounter, '<i>-' + damageAmount + '</i>', 'Neg Compensation for Boss Bat suck-attack',damageText[0]);
          totalDamageAmount = totalDamageAmount - Number(damageAmount);
        }
      }
// Disco combo special case
var bleedDamage = pageBodyText.match(/(He|She|It) continues to bleed from (his|her|its) face, taking <b>(\d+)<\/b> damage\./);
if (bleedDamage) {
     debugText = debugText + me.buildDebugRow(roundCounter, bleedDamage[3], 'Disco Bleed Damage',bleedDamage[0]);
     totalDamageAmount = totalDamageAmount + Number(bleedDamage[3]);
}
   me.GM_setValue(me.charName + '-CurMonsterDamageDebug',debugText);
   me.GM_setValue(me.charName + '-CurRoundDamage',totalDamageAmount);
   return totalDamageAmount;
}

function getSettings() {
	//build our settings and return them for appending
	var guts = document.body.appendChild(document.createElement('div'));
	guts.id = 'monsterstatsprefs';
	var subhead = guts.appendChild(document.createElement('div'));
	subhead.className = 'subhead';
	subhead.textContent = 'MonsterStats';
	guts.appendChild(buildSettings());
	return guts;
}

function buildSettings() {

	var me = this;

	me.charName = GM_getValue('CurCharName-' + location.host,'');

	var debugMode = GM_getValue(me.charName + '-DebugMode',0);
	if (debugMode == 1) { var debugModeText = 'On'; } else { var debugModeText = 'Off'; }
	var submitMode = GM_getValue(me.charName + '-AllowDataSubmission',1);
	if (submitMode == 1) { var submitModeText = 'On'; } else { var submitModeText = 'Off'; }

	primary.checkForUpdate();
	primary.needUpdate = ((primary.GM_getValue("scriptWebVer","Error") != "Error") && (Number(primary.GM_getValue("scriptWebVer")) > Number(scriptVer)*100));
	if (primary.needUpdate) {
		var boxColor = 'red';
	} else {
		var boxColor = 'blue';
	}

	var guts = document.createElement("div");
	guts.id = scriptName;
	guts.style["border"] = "1px solid blue";
	guts.style["width"] = "100%";
	//guts.style["height"] = "200px";
	var span1 = document.createElement("span");

	var table = document.createElement("table");
	table.setAttribute('width', '100%');
	table.setAttribute('cellspacing', '0');
	table.style["border"] = 'none';

	var tr1 = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.innerHTML = '<b>Script Version:</b> ' + scriptVer;
	tr1.appendChild(td1);
	var td2 = document.createElement("td"); 
	td2.innerHTML = '<b>Current Version:</b> ' + '<a href="' + scriptSite + '" TARGET="_blank"><font color="' + boxColor + '">' + 
	    primary.GM_getValue("scriptWebVer") / 100 + '</font></a>';
	tr1.appendChild(td2);
	var td3 = document.createElement("td");
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>Monster Data Last Harvested:</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	td2.innerHTML = '<span id="kwdate">' + GM_getValue(primary.KW_PREFIX + "_Last_Checked", "Never") + '</span>';
	tr1.appendChild(td2);
	td3 = document.createElement("td");
	var spankw = document.createElement("span");
	spankw.setAttribute('id', 'harvestkwlink');
	spankw.setAttribute('style', 'text-decoration: underline;');
	spankw.innerHTML = 'Reharvest Data';
	spankw.addEventListener('click',function() { primary.requestHarvestKittiwakeData(); },false);
	td3.appendChild(spankw);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>Item Drop Data Last Harvested:</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	td2.innerHTML = '<span id="ydate">' + GM_getValue(primary.Y_PREFIX + "_Last_Checked", "Never") + '</span>';
	tr1.appendChild(td2);
        td3 = document.createElement("td");
	var spany = document.createElement("span");
	spany.setAttribute('id', 'harvestylink');
	spany.setAttribute('style', 'text-decoration: underline;');
	spany.innerHTML = 'Reharvest Data';
	spany.addEventListener('click',function() { primary.requestHarvestYiabData(); },false);
	td3.appendChild(spany);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>Monster Init Data Last Harvested:</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	td2.innerHTML = '<span id="ndate">' + GM_getValue(primary.N_PREFIX + "_Last_Checked", "Never") + '</span>';
	tr1.appendChild(td2);
        td3 = document.createElement("td");
	var spann = document.createElement("span");
	spann.setAttribute('id', 'harvestnlink');
	spann.setAttribute('style', 'text-decoration: underline;');
	spann.innerHTML = 'Reharvest Data';
	spann.addEventListener('click',function() { primary.requestHarvestN3RDData(); },false);
	td3.appendChild(spann);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>Debug Mode:</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	td2.innerHTML = '<span id="dmindicator">' + debugModeText + '<span>';
	tr1.appendChild(td2);
        td3 = document.createElement("td");
	var spandm = document.createElement("span");
	spandm.setAttribute('id', 'debugmodelink');
	spandm.setAttribute('style', 'text-decoration: underline;');
	spandm.innerHTML = 'Toggle Debug Mode';
	spandm.addEventListener('click',function() { primary.toggleDebugMode(); },false);
	td3.appendChild(spandm);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>View Data</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	//td2.innerHTML = 'Off';
	tr1.appendChild(td2);
        td3 = document.createElement("td");
	var spanvd = document.createElement("span");
	spanvd.setAttribute('id', 'dumplink');
	spanvd.setAttribute('style', 'text-decoration: underline;');
	spanvd.innerHTML = 'Show Data';
	spanvd.addEventListener('click',function() { primary.dumpDebugInfo(); },false);
	td3.appendChild(spanvd);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	tr1 = document.createElement("tr");
	td1 = document.createElement("td");
	td1.innerHTML = '<b>Submit Statistics:</b>';
	tr1.appendChild(td1);
	td2 = document.createElement("td");
	td2.innerHTML = '<span id="smindicator">' + submitModeText + '<span>';
	tr1.appendChild(td2);
        td3 = document.createElement("td");
	var spansm = document.createElement("span");
	spansm.setAttribute('id', 'submitmodelink');
	spansm.setAttribute('style', 'text-decoration: underline;');
	spansm.innerHTML = 'Toggle Statistic Submission';
	spansm.addEventListener('click',function() { primary.toggleSubmitMode(); },false);
	td3.appendChild(spansm);
	tr1.appendChild(td3);
	table.appendChild(tr1);

	span1.appendChild(table);
	guts.appendChild(span1);

	return guts;
}

// Charon's code
function buildPrefs() {
	if (!document.querySelector('#privacy'))
		return;
	if (!document.querySelector('#scripts')) {
		//scripts tab is not built, do it here
		var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
		scripts.id = 'scripts';
		var a = scripts.appendChild(document.createElement('a'));
		a.href = '#';
		var img = a.appendChild(document.createElement('img'));
		img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
		img.align = 'absmiddle';
		img.border = '0';
		img.style.paddingRight = '10px';
		a.appendChild(document.createTextNode('Scripts'));
		a.addEventListener('click', function (e) {
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			document.querySelector('.active').className = '';
			document.querySelector('#scripts').className = 'active';
			document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
			document.querySelector('#guts').appendChild(getSettings());
		}, false);
	} else {
		//script tab already exists
		document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
			//some other script is doing the activation work, just add our settings
			e.stopPropagation();
			document.querySelector('#guts').appendChild(getSettings());
		}, false);
	}
}

//--------------------------------------------
//--------------------------------------------
//          Charpane Handlers
//--------------------------------------------
//--------------------------------------------

MonsterStats.prototype.parseCharPane = function(charPaneBody) {
	var me = this;
  me.storeMonsterLevelModifierEffects(charPaneBody);
  me.storeItemDropRateModifierEffects(charPaneBody);
  me.storeMeatDropRateModifierEffects(charPaneBody);
  me.storeInitiativeModifierEffects(charPaneBody);
  me.storeStatGainModifierEffects(charPaneBody);
  me.storeMaxHP(charPaneBody);
}

MonsterStats.prototype.main = function( pathname, data )
{
	var me = this;
	me.doc = null;
	if ( typeof( data ) == 'string' )
	{
		// This is data is html so we build a an element set to stand in
		me.doc = document.createElement( 'html' );
		me.doc.cookie = document.cookie;
		me.doc.body = document.createElement( 'body' );
		me.doc.body.innerHTML = data;
		me.doc.appendChild( me.doc.body );
	}
	else
		me.doc = data.wrappedJSObject || data;

	// Do not process this document a second time
	if ( me.doc.monsterStatsProcessed )
		return;
	me.doc.monsterStatsProcessed = true;

	// Simulate getElementById and createElement if this is a plain element set and not a 'document object'
	me.doc.getElementById = me.doc.getElementById || function( id )
	{
		var objs = this.getElementsByTagName( '*'	);
		for ( var i = 0; i < objs.length; ++i )
			if ( objs[i].id && objs[i].id == id )
				return objs[i];
		return null;
	};
	me.doc.createElement = me.doc.createElement || function( tag )
	{	return document.createElement( tag );
	};

	// If the player equipped items or tinkered with familiars, reparse all the items.
	if ((pathname == "/inventory.php") || (pathname == "/familiar.php")) {
	  var pageBody = me.doc.getElementsByTagName("body")[0].innerHTML;
	  //if (pageBody.indexOf("Results:") != -1) {
	    me.checkCharPage();
	//  }
	}
	// Harvest current moon info from the topmenu
	if ((pathname == "/topmenu.php") || (pathname == "/compactmenu.php"))  {

	  var allowDataSubmission = me.GM_getValue("AllowDataSubmission",-1);
	  if (allowDataSubmission == -1) {
	    me.GM_setValue("AllowDataSubmission",me.GM_getValue('ShareInitiativeStats',1));
	  }

	  var oldmoonBrightness = me.GM_getValue('moonBrightness',0);
	  var m1 = 0;
	  var m2 = 0;
	  var m3 = 0;

	  var moons = me.doc.getElementsByTagName("body")[0].innerHTML.match(/\/s?moon(\d)(\w*).gif/gi);
	  var miniMoon = me.doc.getElementsByTagName("body")[0].innerHTML.match(/\/s?minimoon(\d*).gif/gi);

	  m1 = Number(moons[0].match(/\d/));
	  var m1ModifierIndex = 0;
	  if (moons[0].indexOf('a.gif') != -1) { m1ModifierIndex = 1; }
	  if (moons[0].indexOf('b.gif') != -1) { m1ModifierIndex = 2; }

	  m2 = Number(moons[1].match(/\d/));
	  var m2ModifierIndex = 0;
	  if (moons[1].indexOf('a.gif') != -1) { m2ModifierIndex = 1; }
	  if (moons[1].indexOf('b.gif') != -1) { m2ModifierIndex = 2; }


	  if (miniMoon && (miniMoon.length > 0)) {
	    if (miniMoon[0].indexOf('2.gif') != -1) { m3 = '2'; }
	    else { m3 = '1';}
	  }

	  var curmoonBrightness = me.moonBrightness[m1] [m1ModifierIndex] + me.moonBrightness[m2] [m2ModifierIndex] + me.freestandingMinimoonBrightness[m3];
	  var curGrimaciteUnits = me.grimaciteUnitsRonald[m1] [m1ModifierIndex] + me.grimaciteUnitsGrimace[m2] [m2ModifierIndex] + me.freestandingMiniMoonGrimaciteUnits[m3];

	/*
	  alert('Moon Info:\n' +
	      'Moon1: ' + m1 + ', ' + m1ModifierIndex + '\n' +
	      'Moon2: ' + m2 + ', ' + m2ModifierIndex + '\n' +
	      'Brightness: ' + curmoonBrightness + '\n' +
	      'Grimacite Units: ' + curGrimaciteUnits);
	*/

	  var muscleStatDay = 0;
	  var mysticalityStatDay = 0;
	  var moxieStatDay = 0;

	  for (i in me.statDays) {
	    if (me.statDays[i] [0] == m1+","+m2) {
	  //    alert('Day: ' + m1+ ',' + m2 + ':\nMus: ' + me.statDays[i] [1] +'\nMys: ' + me.statDays[i] [2] + '\nMox: ' + me.statDays[i] [3]);
	      muscleStatDay = me.statDays[i] [1];
	      mysticalityStatDay = me.statDays[i] [2];
	      moxieStatDay = me.statDays[i] [3];
	      break;
	    }
	  }

	  me.GM_setValue('me.moonBrightness',curmoonBrightness);
	  me.GM_setValue('GrimaciteUnits',curGrimaciteUnits);
	  me.GM_setValue('MuscleStatDay',muscleStatDay);
	  me.GM_setValue('MysticalityStatDay',mysticalityStatDay);
	  me.GM_setValue('MoxieStatDay',moxieStatDay);

	  // It's a new day-- we should reharvest info so that items impacted by moon phase
	  // get updated accordingly
	  if (curmoonBrightness != oldmoonBrightness) {
	//    me.checkCharPage();
	    me.checkForNewData();
	  }

	}


	//--------------------------------------------
	//--------------------------------------------
	//          Main Map Page Handler
	//--------------------------------------------
	//--------------------------------------------
	//
	// Since most players hit the main map page on login
	// it's a good time to check for script updates and
	// refresh data.

	if (pathname == "/main.php") {

	  me.checkForUpdate();
	  me.needUpdate = ((me.GM_getValue("scriptWebVer","Error") != "Error") && (Number(me.GM_getValue("scriptWebVer")) > Number(scriptVer)));

	  if (me.needUpdate) {
	  	var boxColor = 'red';
	  } else {
	  	var boxColor = 'blue';
	  }

	  var mainPageBody = me.doc.getElementsByTagName("body")[0];
	  var oldHTML = mainPageBody.innerHTML;
	  me.addedHTML = '<center><table style="border: 1px solid ' + boxColor + '; margin-bottom: 4px;" width=95% cellpadding=1 cellspacing=0>' +
	      '<tr><td bgcolor=' + boxColor + '><font color=white size=-2><b>' + scriptName + '</b> Script ' +
	      scriptVer + ':</font></td></tr>' +
	      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Installed and active.</font></td></tr>';
	  if (me.GM_getValue("scriptWebVer","Error") == "Error") {
	  	me.addedHTML = me.adDedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to check website for updated version of script.</font></td></tr>';
	  	me.updateScriptBox();
	  } else {
	    if (me.needUpdate) {
	      me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is out-of-date. Click <a href="' +
	          me.GM_getValue("scriptURL") + '" TARGET="_blank">here</a> for Version ' + me.GM_getValue("scriptWebVer") + '</font></td></tr>';
	      me.updateScriptBox();
	    } else {
	      me.addedHTML = me.addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is latest version.</font></td></tr>';
	      me.updateScriptBox();
	    }
	  }

	  var dataResults = me.checkForNewData();
	  me.addedHTML = me.addedHTML + dataResults;
	  me.updateScriptBox();

	  me.checkCharPage();

	}

	//--------------------------------------------
	//--------------------------------------------
	//          Charpane Handler
	//--------------------------------------------
	//--------------------------------------------

	// Read the buffed stats from the character pane (on the left)
	if (pathname == "/charpane.php") {

	  // Make an attempt to correctly handle multis
	  var bodyHTML = me.doc.getElementsByTagName("body")[0].innerHTML; //XXX
	  me.charName = me.doc.getElementsByTagName("b")[0].innerHTML;
	  if (me.charName.indexOf('>') != -1) { me.charName = me.charName.substring(me.charName.indexOf('>')+1); }
	  if (me.charName.indexOf('<') != -1) { me.charName = me.charName.substring(0,me.charName.indexOf('<')); }

	  me.GM_setValue("CurCharName-" + location.host,me.charName);
	  var curLevel = bodyHTML.match(/Lvl. \d+/g);
	  if (curLevel) {
	    curLevel = curLevel[0].substring(5);
	  } else {
	    curLevel = bodyHTML.match(/Level \d+/g);
	    if (curLevel) {
	      curLevel = curLevel[0].substring(6);
	    } else {
	     curLevel = 1;
	    }
	  }
	  me.GM_setValue(me.charName + '-Level', curLevel);

	  me.GM_setValue(me.charName + '-inRun', "0");
	  if (curLevel < 13)
		me.GM_setValue(me.charName + '-inRun', "1");
	  var ronin = bodyHTML.match(/Hardcore/g);
	  if (ronin)
		me.GM_setValue(me.charName + '-inRun', "1");
	  ronin = bodyHTML.match(/Ronin/g);
	  if (ronin)
		me.GM_setValue(me.charName + '-inRun', "1");

	  var mcdPos = bodyHTML.indexOf("canadia.php?place=machine");
	  	if (mcdPos == -1) {
		  mcdPos = bodyHTML.indexOf("gnomes.php?place=machine");
		}
	  	if (mcdPos == -1) {
		  mcdPos = bodyHTML.indexOf("2682");
	  	}
		if (mcdPos == -1) {
		  mcdPos = bodyHTML.indexOf("heydeze.php?place=heartbreaker");
		}
	  if (mcdPos != -1) {

	    var optionElements = me.doc.getElementsByTagName("option");
	    if (optionElements.length > 0) { // They may be running the MCD Dropdown script.  If so, read from it.

	      for (optionIndex = 0; optionIndex < optionElements.length; optionIndex++) {
	        if (optionElements[optionIndex].selected) {
		var mcdLevel = Number(optionElements[optionIndex].value);
	        }
	      }

	    } else {

	      var beginModifier = bodyHTML.indexOf("<b>",mcdPos);
	      var endModifier = bodyHTML.indexOf("</b>",beginModifier);
	      var mcdLevel = Number(bodyHTML.substring(beginModifier+3,endModifier));
	    }
	  } else {
	    var mcdLevel = 0;
	  }
	  
	  me.GM_setValue(me.charName + '-MCDLevel', mcdLevel);

	  me.parseCharPane(me.doc.getElementsByTagName("body")[0].innerHTML);

	  var rowsToProcess = me.doc.getElementsByTagName("tr");

	  for (var i = 0; i < rowsToProcess.length; i++) {
	    curRow = rowsToProcess[i];
	    if ((curRow.innerHTML.indexOf('Mysticality:') > 0) || (curRow.innerHTML.indexOf('Mys:') > 0)) {
	      var curFontElement = curRow.getElementsByTagName("font")[0];
	      if (curFontElement) {
	        var curMysticality = curFontElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMysticality",curMysticality);
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        curMysticality = curBoldElement.innerHTML.substring(curBoldElement.innerHTML.indexOf('(')+1);
	        curMysticality = curMysticality.substring(0,curMysticality.indexOf(')'));
	        me.GM_setValue(me.charName + "-UnbuffedMysticality",curMysticality);
	      } else {
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        var curMysticality = curBoldElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMysticality",curMysticality);
	        me.GM_setValue(me.charName + "-UnbuffedMysticality",curMysticality);
	      }
	    }
	    if ((curRow.innerHTML.indexOf('Muscle:') > 0) || (curRow.innerHTML.indexOf('Mus:') > 0)) {
	      var curFontElement = curRow.getElementsByTagName("font")[0];
	      if (curFontElement) {
	        var curMuscle = curFontElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMuscle",curMuscle);
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        curMuscle = curBoldElement.innerHTML.substring(curBoldElement.innerHTML.indexOf('(')+1);
	        curMuscle = curMuscle.substring(0,curMuscle.indexOf(')'));
	        me.GM_setValue(me.charName + "-UnbuffedMuscle",curMuscle);
	      } else {
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        var curMuscle = curBoldElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMuscle",curMuscle);
	        me.GM_setValue(me.charName + "-UnbuffedMuscle",curMuscle);
	      }

	    }
	    if ((curRow.innerHTML.indexOf('Moxie:') > 0) || (curRow.innerHTML.indexOf('Mox:') > 0)) {
	      var curFontElement = curRow.getElementsByTagName("font")[0];
	      if (curFontElement) {
	        var curMoxie = curFontElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMoxie",curMoxie);
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        curMoxie = curBoldElement.innerHTML.substring(curBoldElement.innerHTML.indexOf('(')+1);
	        curMoxie = curMoxie.substring(0,curMoxie.indexOf(')'));
	        me.GM_setValue(me.charName + "-UnbuffedMoxie",curMoxie);
	      } else {
	        var curBoldElement = curRow.getElementsByTagName("b")[0];
	        var curMoxie = curBoldElement.innerHTML;
	        me.GM_setValue(me.charName + "-BuffedMoxie",curMoxie);
	        me.GM_setValue(me.charName + "-UnbuffedMoxie",curMoxie);
	      }
	    }
	  }

	  if (me.GM_getValue(me.charName + '-MuscleClass',0)==1) {
	    me.GM_setValue(me.charName + '-BuffedMainstat',me.GM_getValue(me.charName + '-BuffedMuscle',0));
	    me.GM_setValue(me.charName + '-UnbuffedMainstat',me.GM_getValue(me.charName + '-UnbuffedMuscle',0));
	  }
	  if (me.GM_getValue(me.charName + '-MysticalityClass',0)==1) {
	    me.GM_setValue(me.charName + '-BuffedMainstat',me.GM_getValue(me.charName + '-BuffedMysticality',0));
	    me.GM_setValue(me.charName + '-UnbuffedMainstat',me.GM_getValue(me.charName + '-UnbuffedMysticality',0));
	  }
	  if (me.GM_getValue(me.charName + '-MoxieClass',0)==1) {
	    me.GM_setValue(me.charName + '-BuffedMainstat',me.GM_getValue(me.charName + '-BuffedMoxie',0));
	    me.GM_setValue(me.charName + '-UnbuffedMainstat',me.GM_getValue(me.charName + '-UnbuffedMoxie',0));
	  }

	  me.storeFamiliarNameAndWeight(me.doc.getElementsByTagName("body")[0]);
	  me.storeItemDropRateFamiliarImpact();
	  me.storeMeatDropRateFamiliarImpact();
	}

	//--------------------------------------------
	//--------------------------------------------
	//          Fight Page Handler
	//--------------------------------------------
	//--------------------------------------------

	if (pathname == "/fight.php") {

	    var pageBodyText = me.doc.getElementsByTagName("body")[0].innerHTML;
	    me.charName = me.GM_getValue("CurCharName-" + location.host,'');
	    var fightNumber = me.GM_getValue(me.charName + '-FightNumber',0);
	    var midFight = me.GM_getValue(me.charName + '-MidFight',0);
	    var mcurhp = -1;
	    var mdef = -1;
	    var matk = -1;
	    var mmaxhp = -1
	    var havemanuel = 0;

	    // If we're seeing a "got the jump message" and think we're still mid-fight... we're wrong.
	    // Cut our losses and start fresh.
	    if ((midFight == 1) && ((pageBodyText.indexOf('gets the jump ') != -1) || (pageBodyText.indexOf('They get the jump ') != -1) )) {
	      midFight = 0;
              me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	      me.GM_setValue(me.charName + '-RoundCounter', 0);
	      me.GM_setValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
	      me.GM_setValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
	      me.GM_setValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
	      me.GM_setValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
	      me.GM_setValue(me.charName + '-CurMonsterDelevelText','');
	      me.GM_setValue(me.charName + '-FightNumber',fightNumber + 1);
	    }

	    var roundCounter = me.GM_getValue(me.charName + '-RoundCounter',1);
	    var lastMonster = me.GM_getValue(me.charName + '-LastMonster','');
	    var itemDropModifier = 1 + Number(me.GM_getValue(me.charName + '-ItemDropRateItemsModifier',0)) + Number(me.GM_getValue(me.charName + '-ItemDropRateEffectsModifier',0)) + Number(me.GM_getValue(me.charName + '-ItemDropRateFamiliarImpactModifier',0)) + Number(me.GM_getValue(me.charName + '-ItemDropRateSkillsModifier',0));
	    var itemDropModifierInfo = 'Equipped Items affecting Item Drop Rate:\\n\\n' +me.GM_getValue(me.charName + '-ItemDropRateItems','None\\n') +
	        '\\nActive Effects affecting Item Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-ItemDropRateEffects','None\\n') +
	        '\\nSkills Impacting Item Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-ItemDropRateSkills','None\\n') +
	        '\\nFamiliar Impacting Item Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-ItemDropRateFamiliarImpact','None\\n');
	    itemDropModifierInfo = itemDropModifierInfo.replace(/\'/g," ");

	    me.GM_setValue(me.charName + '-CurItemDropModifier',(itemDropModifier-1)+'');

	    var meatDropModifier = 1 + Number(me.GM_getValue(me.charName + '-MeatDropRateItemsModifier',0)) + Number(me.GM_getValue(me.charName + '-MeatDropRateEffectsModifier',0)) + Number(me.GM_getValue(me.charName + '-MeatDropRateFamiliarImpactModifier',0)) + Number(me.GM_getValue(me.charName + '-MeatDropRateSkillsModifier',0));
	    var meatDropModifierInfo = 'Equipped Items affecting Meat Drop Rate:\\n\\n' +me.GM_getValue(me.charName + '-MeatDropRateItems','None\\n') +
	        '\\nActive Effects Impacting Meat Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-MeatDropRateEffects','None\\n') +
	        '\\nSkills Impacting Meat Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-MeatDropRateSkills','None\\n') +
	        '\\nFamiliar Impacting Meat Drop Rate:\\n\\n' + me.GM_getValue(me.charName + '-MeatDropRateFamiliarImpact','None\\n');
	    meatDropModifierInfo = meatDropModifierInfo.replace(/\'/g," ");

	    var initiativeModifier = Number(me.GM_getValue(me.charName + '-ItemInitiativeModifier',0)) + Number(me.GM_getValue(me.charName + '-InitiativeEffectsModifier',0)) + Number(me.GM_getValue(me.charName + '-InitiativeSkillsModifier',0));
	    var initiativeModifierInfo = 'Equipped Items affecting Initiative:\\n\\n' +me.GM_getValue(me.charName + '-ItemInitiativeModifierItems','None\\n') +
	        '\\nActive Effects Impacting Initiative\:\\n\\n' + me.GM_getValue(me.charName + '-InitiativeEffects','None\\n') +
	        '\\nSkills Impacting Initiative:\\n\\n' + me.GM_getValue(me.charName + '-InitiativeSkills','None\\n');

	    me.GM_setValue(me.charName + '-CurInitiativeModifier',initiativeModifier+'');

	    var suspectedInitiativeModifiers = me.GM_getValue(me.charName + '-SuspectedInitiativeEffects','');
	    var allowDataSubmission = me.GM_getValue('AllowDataSubmission',1);

	    var itemStatPoints = Number(me.GM_getValue(me.charName + '-StatGainItemsModifier',0));
	    var effectStatPoints = Number(me.GM_getValue(me.charName + '-StatGainEffectsModifier',0));
	    var familiarStatPoints = 0; // We'll update this later, once we know what level the monster is.
	    var statGainModifierInfo = 'Equipped Items affecting Stat Gain:\\n\\n' +me.GM_getValue(me.charName + '-StatGainItems','None\\n') +
	        '\\nActive Effects affecting Stat Gain:\\n\\n' + me.GM_getValue(me.charName + '-StatGainEffects','None\\n');
	        '\\nFamiliar Impacting Stat Gain:\\n\\n';// + me.GM_getValue(me.charName + '-StatGainFamiliarImpact','None\\n'); // Better to figure this out after getting Monster Level
	    var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
	    var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));


	    var fpMonsterName = me.doc.getElementById('monname').innerHTML;
	    fpMonsterName = fpMonsterName.toUpperCase();
	    if (fpMonsterName.indexOf('THE') > 0) {
	      fpMonsterName = fpMonsterName.substring(fpMonsterName.indexOf(' ')+1);
	    }
	    if (fpMonsterName.indexOf('<') > 0) {
	      fpMonsterName = fpMonsterName.substring(0,fpMonsterName.indexOf('<'));
	    }

	    // Handle special cases-- mostly places where more than one monster has the same name but
	    // different attributes.

	    var nameNeedsModifier = 0;
	    var nameGotModified = 0;

	    for (modifierIndex in me.monsterNameModifiers) {
	      if (fpMonsterName == (me.monsterNameModifiers[modifierIndex] [0])) { // this monster name is ambiguous-- clarify it
	        nameNeedsModifier = 1;
	        if (me.doc.getElementsByTagName("body")[0].innerHTML.indexOf(me.monsterNameModifiers[modifierIndex] [1]) != -1) {
	          nameGotModified = 1;
	          fpMonsterName = me.monsterNameModifiers[modifierIndex] [2];
	          break;
	        }
	      }
	    }

	    // If the current page is ambiguous but we previously tagged the monster, use that.
	    if ((midFight == 1) && (nameNeedsModifier == 1) && (nameGotModified == 0)) {
	       if (lastMonster.indexOf(fpMonsterName) != -1) {  fpMonsterName = lastMonster; }
	    }

	    fpMonsterName = me.sanitizeMonsterName(fpMonsterName);


	  // If for some reason we think we're in mid-fight with one monster but suddenly
	  // appear to be fighting a different monster-- due to a CLEESH, for example,
	  // we need to act like we've just started a new fight.
	  // TESTTESTTEST
	  if ( (midFight == 1) && (fpMonsterName != lastMonster) ) {
	        me.GM_setValue(me.charName + '-MidFight',0);
	        midFight = 0;
	  }

          // If we're at the start of a new fight, we should reset some values to their defaults.
          if (midFight == 0) {
		roundCounter=1;
	        me.GM_setValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterDelevelText','');
	        me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	        me.GM_setValue(me.charName + '-DebugFightText','');
	        me.GM_setValue(me.charName + '-IndeterminateDamage',0);
		me.GM_setValue(me.charName + '-CurMonsterBaseAtk',-1);
		me.GM_setValue(me.charName + '-CurMonsterBaseDef',-1);
		if (unsafeWindow.monsterstats != undefined) { // we have Manuel
			havemanuel = 1;
			mmaxhp = unsafeWindow.monsterstats.hp;
			mcurhp = unsafeWindow.monsterstats.hp;
			matk = unsafeWindow.monsterstats.off;
			mdef = unsafeWindow.monsterstats.def;
		}
          } else {
		roundCounter += 1;
		if (unsafeWindow.monsterstats != undefined) {
			havemanuel = 1;
			mcurhp = unsafeWindow.monsterstats.hp;
			matk = unsafeWindow.monsterstats.off;
			mdef = unsafeWindow.monsterstats.def;
		}
	  }

	  //----------------------------------------------------------------------------------------

	  // ED the undying
	  if (fpMonsterName.indexOf('ED THE UNDYING') != -1) {
		var picname = me.doc.getElementById('monpic').src;
		picname = picname.toUpperCase();
		picname = picname.substring(picname.lastIndexOf('/'));
		if (picname == "/ED.GIF")
			fpMonsterName = 'ED THE UNDYING \(1\)';
		if (picname == "/ED2.GIF")
			fpMonsterName = 'ED THE UNDYING \(2\)';
		if (picname == "/ED3.GIF")
			fpMonsterName = 'ED THE UNDYING \(3\)';
		if (picname == "/ED4.GIF")
			fpMonsterName = 'ED THE UNDYING \(4\)';
		if (picname == "/ED5.GIF")
			fpMonsterName = 'ED THE UNDYING \(5\)';
		if (picname == "/ED6.GIF")
			fpMonsterName = 'ED THE UNDYING \(6\)';
		if (picname == "/ED7.GIF")
			fpMonsterName = 'ED THE UNDYING \(7\)';
	  }


	  if (fpMonsterName.indexOf('SHADOW ') != -1) { // This is the shadow version of yourself from the NS Quest-- handle it separately.
	    if (midFight == 0) { me.GM_setValue(me.charName + '-ShadowHP',400);}

	    var shadowHPRemaining = me.GM_getValue(me.charName + '-ShadowHP',400);

	    var shadowDamage = pageBodyText.match(/You gain [0-9]+ hit points/g);

	    var damageIndex = 0;
	    while (shadowDamage && shadowDamage[damageIndex]) {
		var damageText = shadowDamage[damageIndex].substring(9);
		damageText = damageText.substring(0,damageText.indexOf(' '));
	        if (parseInt(damageText)) {
		shadowHPRemaining = shadowHPRemaining - parseInt(damageText);
	        }
	        damageIndex++;
	     }

	     shadowHPRemaining = Math.max(0,shadowHPRemaining);

	     var itemElement = me.doc.getElementById('monname');
	     var itemParent = itemElement.parentNode;
	     var newElement = me.doc.createElement("span");


	      newElement.innerHTML = '<BR><BR>' +
	          '<span style="float:right;" id="MonsterStatsTable">' +
	          '<table width=300 style="border: 1px solid blue; border-collapse: collapse; border-bottom: 1px solid blue; border-right: 1px solid blue; font-size: 85%;" id="MonsterStats">' +
	          '<tr><th style="color: white;" colspan=2 bgcolor=blue>' + fpMonsterName + 
		  ' (Round ' + roundCounter + ')</th></tr>' +
	          '<tr style=""><td><strong>HP:</strong></td><td> ' + shadowHPRemaining + ' / 96 </td></tr>' +
	          '<tr><td><strong>Chance to Dodge</strong> (Mox):</td><td> (Mostly) Undodgeable! </td></tr>' +
	          '<tr><td><strong>Chance to Hit</strong>:</td><td> Unhittable! </td></tr>' +
	          '<tr style="display: table-row;" id="ItemDropRow"><td><strong>Item Drops:</strong></td><td> Shadows do not have items. </td></tr>' +
	          '<tr style="display: table-row;" class="DropRow" id="MeatDropRow"><td><strong>Meat Drops:</strong></td><td> Or meat, for that matter. </td></tr>' +
	          '<tr style="display: table-row;" class="StatGainRow" id="StatGainRow"><td><strong>XP:</strong></td><td> 200 </td></tr>' +
	          //'<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStatsRow\',\'PlayerStatsLink\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChanceRow\',\'HitChancesLink\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'DropRow\',\'ItemDropLink\');">Drops</span></td></tr>' +
	          '</table></span>';

	     if (itemElement.nextSibling){
	        itemParent.insertBefore(newElement,itemElement.nextSibling);
	     }
	     else{
	        itemParent.appendChild(newElement);
	     }


	      // Experimental way to avoid reflow issues.  Appears to work.
	      setTimeout( "document.getElementById('MonsterStatsTable').innerHTML += '<BR>';",15);

	      if ((pageBodyText.indexOf('WINWINWIN') > 0) ||  // if we won the fight or...
	          (pageBodyText.indexOf('You lose.') != -1) ||  // we lost the fight or...
	          (pageBodyText.indexOf('You run away, ') != -1) ||
	          (pageBodyText.indexOf('you beat feet out of there') != -1) ||
	          (pageBodyText.indexOf('you make a quick getaway') != -1) ||
	          (pageBodyText.indexOf('nothing left of the monster.') != -1)) { // we ran away...
	        me.GM_setValue(me.charName + '-MidFight',0);
	        me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	        me.GM_setValue(me.charName + '-RoundCounter', 0);
	        me.GM_setValue(me.charName + '-ShadowHP',0);
	        var fightOver = 1;
	      } else {
	        me.GM_setValue(me.charName + '-MidFight',1);
	        me.GM_setValue(me.charName + '-LastMonster',fpMonsterName);
	        me.GM_setValue(me.charName + '-RoundCounter', roundCounter);
	        me.GM_setValue(me.charName + '-ShadowHP',shadowHPRemaining);
	        var fightOver = 0;
	      }


	    return;
	  }
	  //----------------------------------------------------------------------------------------
	  if (fpMonsterName.indexOf('NAUGHTY SORCERESS') != -1) { // This is the NS-- handle it separately.
	    var NSMaxHP = Math.max(400,Number(me.GM_getValue(me.charName + '-MaxHP','400')));

	    if (midFight == 0) {
		me.GM_setValue(me.charName + '-NS1HP',NSMaxHP);
		me.GM_setValue(me.charName + '-NS1Damage',0);
		me.GM_setValue(me.charName + '-NS1HealCount',0);
		me.GM_setValue(me.charName + '-RoundCounter', 0);
		me.GM_setValue(me.charName + '-IndeterminateDamage',0);
	    }

	    var NSHPRemaining = Number(me.GM_getValue(me.charName + '-NS1HP',String(NSMaxHP)));
	    var healCount = Number(me.GM_getValue(me.charName + '-NS1HealCount','0'));
	    var relevelCount = Number(me.GM_getValue(me.charName + '-NS1RelevelCount','0'));
	    var roundCounter = Number(me.GM_getValue(me.charName + '-RoundCounter','0')) + 1;
	    var itemsMLModifier = me.GM_getValue(me.charName + '-MLItemsModifier',0);
	//  NS Dispells all effects, so these get nixed.
	//    var effectsMLModifier = me.GM_getValue(me.charName + '-MLEffectsModifier',0);
	    var mcdMLModifier = me.GM_getValue(me.charName + '-MCDLevel', 0);
	    var totalMLModifier = itemsMLModifier + mcdMLModifier;
	    var listMLItems = me.GM_getValue(me.charName + '-MLItems', '');
	    var listMLEffects = 'Help, help! I am being oppressed!';
	    var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
	    var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));


	    var newDamage = Number(me.calculateDamageToMonster(pageBodyText));
	    var debugText = me.GM_getValue(me.charName + '-CurMonsterDamageDebug','');

	    var damageAmount = Number(me.GM_getValue(me.charName + '-NS1Damage','0')) + newDamage;
	    NSHPRemaining = NSHPRemaining - newDamage;

	    if ((pageBodyText.indexOf('The Sorceress pulls a tiny red vial') != -1) ||
	    (pageBodyText.indexOf('In what is probably the most disgusting display you') != -1)) {
	      healCount = healCount + 1;
	      NSHPRemaining = NSHPRemaining + 100;
	    }
	    if ((pageBodyText.indexOf('Her skin seems to shimmer for a moment.') != -1) ||
	    (pageBodyText.indexOf('Glistening bulges form') != -1)) {
	      relevelCount = relevelCount + 1;
	    }

             // Commented out because the NS' hp isn't capped
	     //NSHPRemaining = Math.min(NSMaxHP,Math.max(0,NSHPRemaining));

	     me.calculateDelevelsToMonster(pageBodyText,totalMLModifier,totalMLModifier,0,0);
	     var textMLModiferResult =  me.GM_getValue(me.charName + '-textMLModiferResult','');
	     var textMLModifiers = me.GM_getValue(me.charName + '-textMLModifiers','');

	     var itemElement = me.doc.getElementById('monname');
	     var itemParent = itemElement.parentNode;
	     var newElement = me.doc.createElement("span");

	      newElement.innerHTML = '<BR><BR>' +
	          '<span style="float:right;">' +
	          '<table width=300 style="border: 1px solid blue; border-collapse: collapse; border-bottom: 1px solid blue; border-right: 1px solid blue; font-size: 85%;" id="MonsterStats">' +
	          '<tr><th style="color: white;" colspan=2 bgcolor=blue>' + fpMonsterName + 
		  ' (Round ' + roundCounter + ')</th></tr>' +
	          '<tr style=""><td colspan=2><strong>NOTE: EXPERIMENTAL AND ALMOST CERTAINLY WRONG</strong> </td></tr>' +
	          '<tr style=""><td><strong>NS HP:</strong></td><td> ' + NSHPRemaining + ' / ' + NSMaxHP + '?</td></tr>' +
	          '<tr style=""><td><strong>Damage Dealt to NS:</strong></td><td> ' + damageAmount + '</td></tr>' +
	          '<tr style=""><td><strong>Times NS Healed:</strong></td><td> ' + healCount + ' (x 100?)</td></tr>' +
	          '<tr style=""><td><strong>Level Adjustments to NS:</strong></td><td><a tabIndex="-1" href="javascript:alert(\'' + textMLModifiers + '\');">' + textMLModiferResult + '</a></td></tr>' +
	          '<tr style=""><td><strong>Times NS Releveled:</strong></td><td> ' + relevelCount + '</td></tr>' +
	          '<tr style="display: table-row;" id="ItemDropRow"><td><strong>Item Drops:</strong></td><td> Instant Karma (Lv.13 Only) </td></tr>' +
	          '<tr style="display: table-row;" class="DropRow" id="MeatDropRow"><td><strong>Meat Drops:</strong></td><td> Really, now. </td></tr>' +
	          '<tr style="display: table-row;" class="StatGainRow" id="StatGainRow"><td><strong>XP:</strong></td><td> 500 </td></tr>' +
	          //'<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStatsRow\',\'PlayerStatsLink\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChanceRow\',\'HitChancesLink\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'DropRow\',\'ItemDropLink\');">Drops</span></td></tr>' +
	          '</table></span>';
	     if (itemElement.nextSibling){
	        itemParent.insertBefore(newElement,itemElement.nextSibling);
	     }
	     else{
	        itemParent.appendChild(newElement);
	     }

	      // Experimental way to avoid reflow issues.  Appears to work.
	      setTimeout( "document.getElementById('MonsterStatsTable').innerHTML += '<BR>';",15);

	      if ((pageBodyText.indexOf('WINWINWIN') != -1) ||  // if we won the fight or...
	          (pageBodyText.indexOf('You lose.') != -1) ||  // we lost the fight or...
	          (pageBodyText.indexOf('You run away, like a sissy little coward.') != -1) ||
	          (pageBodyText.indexOf('Uh oh.') != -1) ||
	          (pageBodyText.indexOf('This battle has taken over a half an hour and there') != -1) ||
	          (pageBodyText.indexOf('you beat feet out of there') != -1) ||
	          (pageBodyText.indexOf('you make a quick getaway') != -1) ||
	          (pageBodyText.indexOf('nothing left of the monster.') != -1)) { // we ran away...
	        me.GM_setValue(me.charName + '-MidFight',0);
	        me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	        me.GM_setValue(me.charName + '-RoundCounter', 0);
	        me.GM_setValue(me.charName + '-NS1HP',200);
					me.GM_setValue(me.charName + '-NS1Damage',0);
					me.GM_setValue(me.charName + '-NS1HealCount',0);
	        var fightOver = 1;
	      } else {
	        me.GM_setValue(me.charName + '-MidFight',1);
	        me.GM_setValue(me.charName + '-LastMonster',fpMonsterName);
	        me.GM_setValue(me.charName + '-RoundCounter', roundCounter);
	        me.GM_setValue(me.charName + '-NS1HP',String(NSHPRemaining));
					me.GM_setValue(me.charName + '-NS1Damage',String(damageAmount));
					me.GM_setValue(me.charName + '-NS1HealCount',String(healCount));
	        var fightOver = 0;
	      }

	    return;
	  }
	  //----------------------------------------------------------------------------------------
	  if (fpMonsterName.indexOf('BARON VON RATSWORTH') != -1) { // This is the Baron-- handle it separately.

	    var baronMaxHP = Math.round(Number(me.GM_getValue(me.charName + '-MaxHP','10')) * 1.2);
	    if (midFight == 0) {
		me.GM_setValue(me.charName + '-BaronHP', baronMaxHP);
		me.GM_setValue(me.charName + '-BaronDamage',0);
		me.GM_setValue(me.charName + '-RoundCounter', 0);
		me.GM_setValue(me.charName + '-IndeterminateDamage',0);
	  }
	    var mcdMLModifier = Number(me.GM_getValue(me.charName + '-MCDLevel', 0));

	    var itemDrop = 'Baron Von Ratsworth\'s monocle (100%)';

	    if (mcdMLModifier == 2) { itemDrop = 'Baron Von Ratsworth\'s money clip (100%)'; }
	    if (mcdMLModifier == 9) { itemDrop = 'Baron Von Ratsworth\'s tophat (100%)'; }

	    var BaronHPRemaining = Number(me.GM_getValue(me.charName + '-BaronHP','10'));
	    var roundCounter = Number(me.GM_getValue(me.charName + '-RoundCounter','0')) + 1;
	    var itemsMLModifier = me.GM_getValue(me.charName + '-MLItemsModifier',0);
	    var effectsMLModifier = me.GM_getValue(me.charName + '-MLEffectsModifier',0);
	    var mcdMLModifier = me.GM_getValue(me.charName + '-MCDLevel', 0);
	    var totalMLModifier = itemsMLModifier + effectsMLModifier + mcdMLModifier;
	    var listMLItems = me.GM_getValue(me.charName + '-MLItems', '');
	    var listMLEffects = me.GM_getValue(me.charName + '-MLEffects', '');
	    var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
	    var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));

	    var newDamage = Number(me.calculateDamageToMonster(pageBodyText));
	    var debugText = me.GM_getValue(me.charName + '-CurMonsterDamageDebug','');

	    // Check for delevel attacks-- for clarity, the function just stores them in GM vars
	    me.calculateDelevelsToMonster(pageBodyText,totalMLModifier,totalMLModifier,0,0);

	    // Now pull the results from the GM vars.
	    var textMLModifiers = me.GM_getValue(me.charName + '-textMLModifiers','');
	    var textMLModiferResult =  me.GM_getValue(me.charName + '-textMLModiferResult','');

	    var damageAmount = Number(me.GM_getValue(me.charName + '-BaronDamage','0')) + newDamage;
	    BaronHPRemaining = BaronHPRemaining - newDamage;


	     //BaronHPRemaining = Math.max(0,BaronHPRemaining);

	     var itemElement = me.doc.getElementById('monname');
	     var itemParent = itemElement.parentNode;
	     var newElement = me.doc.createElement("span");


	     newElement.innerHTML = '<BR><BR>' +
	          '<span style="float:right;">' +
	          '<table width=300 style="border: 1px solid blue; border-collapse: collapse; border-bottom: 1px solid blue; border-right: 1px solid blue; font-size: 85%;" id="MonsterStats">' +
	          '<tr><th style="color: white;" colspan=2 bgcolor=blue>' + fpMonsterName + 
		  ' (Round ' + roundCounter + ')</th></tr>' +
	          '<tr style=""><td colspan=2><strong>NOTE: EXPERIMENTAL AND POSSIBLY WRONG</strong> </td></tr>' +
	          '<tr style=""><td><strong>Baron HP:</strong></td><td> ' + BaronHPRemaining + ' / ' + baronMaxHP + '?</td></tr>' +
	          '<tr style=""><td><strong>Damage Dealt to Baron:</strong></td><td> ' + damageAmount + '</td></tr>' +
	          '<tr style=""><td><strong>Level Adjustments to Baron:</strong></td><td><a tabIndex="-1" href="javascript:alert(\'' + textMLModifiers + '\');">' + textMLModiferResult + '</a></td></tr>' +
	          '<tr style="display: table-row;" id="ItemDropRow"><td><strong>Item Drops:</strong></td><td> ' + itemDrop + '</td></tr>' +
	          '<tr style="display: table-row;" class="DropRow" id="MeatDropRow"><td><strong>Meat Drops:</strong></td><td> None </td></tr>' +
	          '<tr style="display: table-row;" class="StatGainRow" id="StatGainRow"><td><strong>XP:</strong></td><td> ? </td></tr>' +
	          //'<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStatsRow\',\'PlayerStatsLink\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChanceRow\',\'HitChancesLink\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'DropRow\',\'ItemDropLink\');">Drops</span></td></tr>' +
	          '</table></span>';

	     if (itemElement.nextSibling){
	        itemParent.insertBefore(newElement,itemElement.nextSibling);
	     }
	     else{
	        itemParent.appendChild(newElement);
	     }

	      // Experimental way to avoid reflow issues.  Appears to work.
	      setTimeout( "document.getElementById('MonsterStatsTable').innerHTML += '<BR>';",15);

	      if ((pageBodyText.indexOf('WINWINWIN') != -1) ||  // if we won the fight or...
	          (pageBodyText.indexOf('You lose.') != -1) ||  // we lost the fight or...
	          (pageBodyText.indexOf('You run away, like a sissy little coward.') != -1) ||
	          (pageBodyText.indexOf('Uh oh.') != -1) ||
	          (pageBodyText.indexOf('This battle has taken over a half an hour and there') != -1) ||
	          (pageBodyText.indexOf('you beat feet out of there') != -1) ||
	          (pageBodyText.indexOf('you make a quick getaway') != -1) ||
	          (pageBodyText.indexOf('nothing left of the monster.') != -1)) { // we ran away...
	        me.GM_setValue(me.charName + '-MidFight',0);
	        me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	        me.GM_setValue(me.charName + '-RoundCounter', 0);
	        me.GM_setValue(me.charName + '-BaronHP',200);
		me.GM_setValue(me.charName + '-BaronDamage',0);
	        var fightOver = 1;
	      } else {
	        me.GM_setValue(me.charName + '-MidFight',1);
	        me.GM_setValue(me.charName + '-LastMonster',fpMonsterName);
	        me.GM_setValue(me.charName + '-RoundCounter', roundCounter);
	        me.GM_setValue(me.charName + '-BaronHP',String(BaronHPRemaining));
		me.GM_setValue(me.charName + '-BaronDamage',String(damageAmount));
		var fightOver = 0;
	      }
	    return;
	  }

	    var storedMonster = me.GM_getValue(me.KW_PREFIX +'-' + fpMonsterName, '');

	    // Get which rows should be visible from the cookie if it exists.
	    var rowVisibility = me.getCookieValue("MonsterStats-" + me.charName + "-VisibleRows");
	    if (!rowVisibility) {
	      rowVisibility = 12;
	    }

	    if ((rowVisibility & 1) != 0) { var hitChanceRowVisibility = 'table-row;'; var hitChanceLinkStyle = 'line-through;';} else { var hitChanceRowVisibility = 'none;'; var hitChanceLinkStyle = 'underline;';}
	    if ((rowVisibility & 2) != 0) { var playerStatsRowVisibility = 'table-row;'; var playerStatsLinkStyle = 'line-through;';} else { var playerStatsRowVisibility = 'none;'; var playerStatsLinkStyle = 'underline;';}
	    if ((rowVisibility & 4) != 0) { var monsterInfoRowVisibility = 'table-row;'; var monsterInfoLinkStyle = 'line-through;';} else { var monsterInfoRowVisibility = 'none;'; var monsterInfoLinkStyle = 'underline;';}
	    if ((rowVisibility & 8) != 0) { var itemDropRowVisibility = 'table-row;'; var itemDropLinkStyle = 'line-through;';} else { var itemDropRowVisibility = 'none;'; var itemDropLinkStyle = 'underline;';}

	    var storedDrops = me.GM_getValue(me.Y_PREFIX + '-' + fpMonsterName, '');
	    var storedDropLines = '';
	    var storedDropElements = [];
	    var storedDropText = '';
	    if (storedDrops != '') {
	      storedDropParts = storedDrops.split('|');

	      var index = 0;
	      for (dropLines in storedDropParts) {
		storedDropElements[dropLines] = new Array(2);
	        storedDropElements[dropLines] [0] = storedDropParts[dropLines].substring(0,storedDropParts[dropLines].indexOf('='));
	        storedDropElements[dropLines] [1] = storedDropParts[dropLines].substring(storedDropParts[dropLines].indexOf('=')+1);
		if (storedDropElements[dropLines][1].indexOf('n') != -1) {
			storedDropElements[dropLines][0] = storedDropElements[dropLines][0] + ' <font size=-3>(No Pick)</font>';
			storedDropElements[dropLines][1] = storedDropElements[dropLines][1].substring(1);
		}
		if (storedDropElements[dropLines][1].indexOf('p') != -1) {
			storedDropElements[dropLines][0] = storedDropElements[dropLines][0] + ' <font size=-3>(PickPocket)</font>';
			storedDropElements[dropLines][1] = "5";
		}
		if (storedDropElements[dropLines][1].indexOf('b') != -1) {
			storedDropElements[dropLines][0] = storedDropElements[dropLines][0] + ' <font size=-3>(Bounty)</font>';
			storedDropElements[dropLines][1] = storedDropElements[dropLines][1].substring(1);
		}
		if (storedDropElements[dropLines][1].indexOf('c') != -1) {
			storedDropElements[dropLines][0] = storedDropElements[dropLines][0] + ' <font size=-3>(Conditional)</font>';
			storedDropElements[dropLines][1] = storedDropElements[dropLines][1].substring(1);
		}
		if (storedDropElements[dropLines][1].indexOf('f') != -1) {
			storedDropElements[dropLines][0] = storedDropElements[dropLines][0] + ' <font size=-3>(FIXED)</font>';
			storedDropElements[dropLines][1] = storedDropElements[dropLines][1].substring(1);
		}
	        me.GM_setValue(me.charName + '-CurItemDrop' + index++, storedDropElements[dropLines] [0] + '/' + storedDropElements[dropLines] [1]);
	      }
        me.GM_setValue(me.charName + '-CurNumItemDrops', index+'');
	      storedDrops = storedDrops.replace( /[|]/g, "%)<BR>" );
	      storedDrops = storedDrops.replace( /[=]/g, " (" );
	      storedDrops = storedDrops + '%)';
	     }
	    storedDropText = '<tr style="display: ' + itemDropRowVisibility + '" class="DropRow" id="ItemDropRow"><td style="color: white;" colspan=2 bgcolor=blue><strong>Item Drops:</strong> <span onClick=\'javascript: alert("' + itemDropModifierInfo + '");\'><u>(+' + Math.round((itemDropModifier - 1) * 1000)/10 + '%)</u></span></td></tr>';
	    for (dropLines in storedDropElements) {
	      storedDropText =	storedDropText + '<tr style="display: ' + itemDropRowVisibility + '" class="DropRow"><td style="text-align: right;">' + storedDropElements[dropLines] [0] + ':&nbsp;&nbsp;</td><td><strong>' +
	          Math.round(Number(storedDropElements[dropLines] [1]) * Number(itemDropModifier) * 10) / 10 + '%</strong> (' +
	          storedDropElements[dropLines] [1] + '%)</td></tr>';
	    }

	    var baseMeatDrops = '';
	    var storedMeatDrops = me.GM_getValue(me.KW_PREFIX + '-' + fpMonsterName,'');
	    if (storedMeatDrops != '') {
	      var ragnokParts = storedMeatDrops.split(";");
	      storedMeatDrops = ragnokParts[9];
	      baseMeatDrops = ragnokParts[9];
	      mdrop = ragnokParts[9].split('-');

	      // Apply modifiers to meat drop rate
	      if (storedMeatDrops != '') {
	          var lowMeatRate = me.trimString(mdrop[0]);
	          var highMeatRate = me.trimString(mdrop[1]);
	          if ("" + parseInt(lowMeatRate) == lowMeatRate) { // if it's a number, then...
	            lowMeatRate = Math.floor(Number(lowMeatRate) * Number(meatDropModifier));
	          }
	          if ("" + parseInt(highMeatRate) == highMeatRate) { // if it's a number, then...
	            highMeatRate = Math.ceil(Number(highMeatRate) * Number(meatDropModifier));
	          }
	          storedMeatDrops = lowMeatRate + '-' + highMeatRate;
	      }
	    }

	    var storedInitiativeRaw = me.GM_getValue(me.N_PREFIX + '-' + fpMonsterName,'');
	    var storedInitiativeQuality = 'MISSING';
	    var storedInitiative = 999;
	    if (storedInitiativeRaw != '') {
	      var storedInitiativeParts = storedInitiativeRaw.split(';');
	      storedInitiative = Number(storedInitiativeParts[0]);
	      storedInitiativeQuality = storedInitiativeParts[1];
	    }
	    // If the user found a higher one than the web page, we should let them use it until the web page is updated.
	    var userFoundInitiative = me.GM_getValue(me.UFI_PREFIX + '-UserFoundInit-' + fpMonsterName,0);
	    if (userFoundInitiative > storedInitiative) { storedInitiative = userFoundInitiative; storedInitiativeQuality = 'User Defined'; }

	    if (havemanuel == 1 && unsafeWindow.monsterstats != undefined && storedMonster.length < 1)
		storedMonster = ";;;;;;;;";

	    if (storedMonster.length < 1 && storedDrops.length > 0)
		storedMonster = ";;;;;;;;";

	    if (storedMonster.length > 0) {
	      var storedMonsterParts = storedMonster.split(";");
	      // Monster Parts decode as follows: 0: HP; 1:XP; 2: Def; 3: Atk; 4: Req To Hit; 5: Req to Always Evade; 6: Elemental Def; 7: Elemental Atk;

	      // Handle Monster Level modifiers
	      var itemsMLModifier = me.GM_getValue(me.charName + '-MLItemsModifier',0);
	      var effectsMLModifier = me.GM_getValue(me.charName + '-MLEffectsModifier',0);
	      var mcdMLModifier = me.GM_getValue(me.charName + '-MCDLevel', 0);
	      var totalMLModifier = itemsMLModifier + effectsMLModifier + mcdMLModifier;
	      var listMLItems = me.GM_getValue(me.charName + '-MLItems', '');
	      var listMLEffects = me.GM_getValue(me.charName + '-MLEffects', '');
	      var familiarType = me.GM_getValue(me.charName + '-FamiliarType','');
	      var familiarWeight = Number(me.GM_getValue(me.charName + '-FamiliarWeight',0));


	      var strippedHP = storedMonsterParts[0];
	      if (strippedHP.indexOf('-') != -1) { strippedHP = me.trimString(strippedHP.substring(strippedHP.indexOf('-')+1)); }
	      if (strippedHP.indexOf('?') != -1) { strippedHP = me.trimString(strippedHP.substring(0,strippedHP.indexOf('?'))); }
	      if (strippedHP.indexOf('[') != -1) {
		// we have a complex HP  XXX TODO XXX
		var zz = strippedHP.indexOf('MIN');
		var min = 0;
		if (zz != -1) {
			min = strippedHP.substring(zz+4,strippedHP.indexOf(')'));
			var parts = min.split(',');
			if (parts[1] == "MOX") {
				if (parts[0] > me.GM_getValue(me.charName + "-BuffedMoxie",0))
					min = me.GM_getValue(me.charName + "-BuffedMoxie",0);
				else
					min = parts[0];
			}
		}
		strippedHP = min;
	      }
		

	      var monsterHP = Number((Number(strippedHP) * 1) + totalMLModifier);
	      if ((storedMonsterParts[2].indexOf('?') != -1) && (storedMonsterParts[3].indexOf('?') == -1)) { storedMonsterParts[2] = storedMonsterParts[3]; }
	      var monsterDef = Number((storedMonsterParts[2] * 1) + totalMLModifier);
	      if ((storedMonsterParts[3].indexOf('?') != -1) && (storedMonsterParts[2].indexOf('?') == -1)) { storedMonsterParts[3] = storedMonsterParts[2]; }
	      var monsterAtk = Number((storedMonsterParts[3] * 1) + totalMLModifier);

	      if (havemanuel == 1) {
		      if (mmaxhp != -1) { monsterHP = mmaxhp; }
		      if (mdef != -1) { monsterDef = mdef; }
		      if (matk != -1) { monsterAtk = matk; }
	      }

	      me.GM_setValue(me.charName + '-CurMonsterMaxHP',monsterHP+'');

	      var baseDef = 0;
	      var baseAtk = 0;
	      if (midFight == 0 && havemanuel == 1) {
		   if (mdef != -1) {
			baseDef = mdef - totalMLModifier;
			me.GM_setValue(me.charName + '-CurMonsterBaseDef', baseDef);
		   }
		   if (matk != -1) {
			baseAtk = matk - totalMLModifier;
			me.GM_setValue(me.charName + '-CurMonsterBaseAtk', baseAtk);
		   }
	      }
	      if (unsafeWindow.monsterstats == undefined) {
	     	baseAtk = storedMonsterParts[3];
	        baseDef = storedMonsterParts[2];
	      } else {
	        if (me.GM_getValue(me.charName + '-CurMonsterBaseAtk',-1) != -1) {
			baseAtk = me.GM_getValue(me.charName + '-CurMonsterBaseAtk',-1);
	        	baseDef = me.GM_getValue(me.charName + '-CurMonsterBaseDef',-1);
	        }
	      }

	      var curDebugFightText = pageBodyText.substring(pageBodyText.indexOf("You're fighting"));
	      if (curDebugFightText.indexOf('<input') != -1) {
	        curDebugFightText = curDebugFightText.substring(0,curDebugFightText.indexOf('<input'));
	      } else {
		if (curDebugFightText.indexOf('Adventure Again') != -1) {
	          curDebugFightText = curDebugFightText.substring(0,curDebugFightText.indexOf('Adventure Again') + 16);
	        }
	      }

	      var totalDebugFightText = me.GM_getValue(me.charName + '-DebugFightText','');
	      var totalDebugFightText = totalDebugFightText + ' [' + roundCounter + '] ' + curDebugFightText;
	      //alert(totalDebugFightText);
	      me.GM_setValue(me.charName + '-DebugFightText',totalDebugFightText);

	      var monsterReqToHit = Number(baseDef) + 10 + Number(totalMLModifier);
	      var monsterReqToEvade = Number(baseAtk) + 10 + Number(totalMLModifier);

	      var strippedXP = storedMonsterParts[1];
	      if (strippedXP.indexOf('-') != -1) { strippedXP = me.trimString(strippedXP.substring(0,strippedXP.indexOf('-'))); }
	      if (strippedXP.indexOf('?') != -1) { strippedXP = me.trimString(strippedXP.substring(0,strippedXP.indexOf('?'))); }
	      //me.GM_log('XP: ' + strippedXP + ' (' + Number(strippedXP) + ')');

	      var monsterXP = Number(strippedXP);
	      var monsterLevel = (Number(baseDef) + Number(baseAtk)) / 2;

	      var monsterElementalDef = storedMonsterParts[6];
	      var monsterElementalAtk = storedMonsterParts[7];
	      if (monsterElementalDef == '') { monsterElementalDef = 'None'; } // Set Elemental type to None if needed.
	      if (monsterElementalDef == '') { monsterElementalAtk = 'None'; } // Set Elemental type to None if needed.

	      // Figure out if the Familiar impacts stat gain or not.

	      // First for volleyball types
	      for (familiarIndex in me.volleyballFamiliars) {
	        if (me.volleyballFamiliars[familiarIndex] == familiarType) {
	          familiarStatPoints = Math.round(Math.sqrt(familiarWeight)*100)/100;
	          statGainModifierInfo = statGainModifierInfo + familiarType + ' (' + familiarWeight + ' lbs): ' + familiarStatPoints + '\\n';
	          break;
	        }
	      }

	      // Then for sombrero types
	      for (familiarIndex in me.sombreroFamiliars) {
	        if (me.sombreroFamiliars[familiarIndex] == familiarType) {
	          familiarStatPoints = Math.round((Math.sqrt(familiarWeight) * (1+Math.sqrt(monsterLevel-4)))*10)/100;
	          statGainModifierInfo = statGainModifierInfo + familiarType + ' (' + familiarWeight + ' lbs): ' + familiarStatPoints + '\\n';
	          break;
	        }
	      }

	      var buffedXP = monsterXP + itemStatPoints + effectStatPoints + familiarStatPoints + Math.round((0.2 * totalMLModifier)*100)/100;
	      statGainModifierInfo = statGainModifierInfo + '+ML Stat Bonus: ' + Math.round((0.25 * totalMLModifier)*100)/100 + '\\n';
	      var statDayBonus = 0;

	      if (me.GM_getValue(me.charName + '-inRun') == "1") {
		statDayBonus = (buffedXP * 0.1);
		buffedXP = buffedXP + statDayBonus;
	        statGainModifierInfo = statGainModifierInfo + 'Moon Sign Bonus: ' + statDayBonus + '\\n';
	      } else { // Aftercore uses lunar phase

	      if (me.GM_getValue('MuscleStatDay',0) != 0) {
	        if (me.GM_getValue(me.charName + '-MuscleClass',0) != 0) {
	          statDayBonus = ((buffedXP / 2) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Mainstat): ' + statDayBonus + '\\n';
	        } else {
	          statDayBonus = ((buffedXP / 4) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Offstat): ' + statDayBonus + '\\n';
	        }
	      }
	      if (me.GM_getValue('MysticalityStatDay',0) != 0) {
	        if (me.GM_getValue(me.charName + '-MysticalityClass',0) != 0) {
	          statDayBonus = ((buffedXP / 2) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Mainstat): ' + statDayBonus + '\\n';
	        } else {
	          statDayBonus = ((buffedXP / 4) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Offstat): ' + statDayBonus + '\\n';
	        }
	      }
	      if (me.GM_getValue('MoxieStatDay',0) != 0) {
	        if (me.GM_getValue(me.charName + '-MoxieClass',0) != 0) {
	          statDayBonus = ((buffedXP / 2) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Mainstat): ' + statDayBonus + '\\n';
	        } else {
	          statDayBonus = ((buffedXP / 4) * 0.5)
	          buffedXP = buffedXP + statDayBonus;
	          statGainModifierInfo = statGainModifierInfo + 'Stat Day Bonus (Offstat): ' + statDayBonus + '\\n';
	        }
	      }
	      } // lunar phase check

	      if (buffedXP != monsterXP) {
		var buffedXPText = '<strong>' + Math.round(buffedXP *100)/100 + '</strong> ';
	      } else {
	        var buffedXPText = '';
	      }

	      // Handle Critical Hit Chance modifiers
	      var totalCHModifier = Number(me.GM_getValue(me.charName + '-CHModifierValue',1));
	      var listCHItems = me.GM_getValue(me.charName + '-CHModifiers', 'No Critical Hit Modifiers Currently Active.\\n');

	      if (listCHItems == '') { listCHItems = 'No Critical Hit Modifiers Currently Active.\\n'; }
	      listCHItems = listCHItems + '(' + (Math.round(((totalCHModifier/11) * 100) * 10) / 10) + '% Chance of Critical Hit)\\n';

	      // Get the current HP for the monster-- across rounds if we're mid-fight.
	      if ( ((midFight == 1) && (fpMonsterName == lastMonster)) || ((midFight == 1) && (fpMonsterName.indexOf(lastMonster)==0)) ) {
	        var curMonsterHP = me.GM_getValue(me.charName + '-CurMonsterHP',-999);
	      } else {
	        var curMonsterHP = monsterHP;
	      }
	      if (curMonsterHP == -999) {
	        var curMonsterHP = monsterHP;
	      }

	      // Reduce curMonsterHP by any damage done to the monster this round
	      var damageAmount = me.calculateDamageToMonster(pageBodyText);
	      curMonsterHP = curMonsterHP - damageAmount;
	      var debugText = me.GM_getValue(me.charName + '-CurMonsterDamageDebug','');

	      // compensate for Boss Bat Suck-MP attack going over max HP.
              // *** I don't think monsters have max HP, so commenting this out
	      // if (curMonsterHP  > monsterHP) { curMonsterHP = monsterHP; }

	      if (havemanuel == 1 && mcurhp != -1) { curMonsterHP = mcurhp; }

	      me.GM_setValue(me.charName + '-CurMonsterHP', curMonsterHP);

	      // Check for delevel attacks-- for clarity, the function just stores them in GM vars
	      me.calculateDelevelsToMonster(pageBodyText, monsterAtk, monsterDef, baseAtk, baseDef, havemanuel);

	      // Now pull the results from the GM vars.
	      var combatMinDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
	      var combatMaxDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
	      var combatAtkOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
	      var combatDefOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
	      var combatDelevelText = me.GM_getValue(me.charName + '-CurMonsterDelevelText','');
	      var monAtkMin = me.GM_getValue(me.charName + '-monAtkMin',0);
	      var monAtkMax = me.GM_getValue(me.charName + '-monAtkMax',0);
	      var monDefMin = me.GM_getValue(me.charName + '-monDefMin',0);
	      var monDefMax = me.GM_getValue(me.charName + '-monDefMax',0);

	      if (midFight == 0) {
	        var jumpCount = Number(me.GM_getValue(me.charName + '-' + fpMonsterName + '-MONJUMP-' + Math.round(initiativeModifier*100),0));
	        var fightCount = Number(me.GM_getValue(me.charName + '-' + fpMonsterName + '-FIGHT-' + Math.round(initiativeModifier*100),0));
	        fightCount = fightCount + 1;
	        if ((pageBodyText.indexOf('gets the jump ') != -1) || (pageBodyText.indexOf('They get the jump ') != -1)) {
	          jumpCount = jumpCount + 1;
	        }
	        me.GM_setValue(me.charName + '-' + fpMonsterName + '-MONJUMP-' + Math.round(initiativeModifier*100),jumpCount);
	        me.GM_setValue(me.charName + '-' + fpMonsterName + '-FIGHT-' + Math.round(initiativeModifier*100),fightCount);
	      }
	      var commentHP = '';

	      // Check to see if the fight is over.
	      if ((pageBodyText.indexOf('WINWINWIN') > 0) ||  // if we won the fight or...
	          (pageBodyText.indexOf('You lose.') != -1) ||  // we lost the fight or...
	          (pageBodyText.indexOf('You run away, like a sissy little coward.') != -1) ||
	          (pageBodyText.indexOf('you beat feet out of there') != -1) ||
	          (pageBodyText.indexOf('you make a quick getaway') != -1) ||
	          (pageBodyText.indexOf('nothing left of the monster.') != -1)) { // we ran away...
	        if (pageBodyText.indexOf('WINWINWIN') > 0) {
	          if ((curMonsterHP < 0) && (commentHP == '')) { curMonsterHP = 0; }
	        }

	        me.GM_setValue(me.charName + '-MidFight',0);
	        me.GM_setValue(me.charName + '-CurMonsterDamageDebug','');
	        me.GM_setValue(me.charName + '-RoundCounter', 0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
	        me.GM_setValue(me.charName + '-CurMonsterDelevelText','');
	        me.GM_setValue(me.charName + '-FightNumber',fightNumber + 1);
	        var fightOver = 1;
	        me.checkCharPage();
	      } else {
	        me.GM_setValue(me.charName + '-MidFight',1);
	        me.GM_setValue(me.charName + '-LastMonster',fpMonsterName);
	        me.GM_setValue(me.charName + '-RoundCounter', roundCounter);
	        var fightOver = 0;
	      }

	      monsterReqToHit = monsterReqToHit - combatMinDeleveled;
	      monsterReqToEvade = monsterReqToEvade - combatMinDeleveled - combatAtkOnlyDeleveled;

	    me.GM_setValue(me.charName + '-CurReqToAlwaysHit',monsterReqToHit+'');
	    me.GM_setValue(me.charName + '-CurReqToAlwaysEvade',monsterReqToEvade+'');

	      var evadePercentMin = 100-(55+(monAtkMax-(me.GM_getValue(me.charName + "-BuffedMoxie",0)))*5.5);
	      evadePercentMin = Math.round(evadePercentMin * 10) / 10; // Round to one decimal place
	      var evadeColor = 'black';
	      if (evadePercentMin < 0) { evadePercentMin = 0; evadeColor= 'red'; }
	      if (evadePercentMin > 100) { evadePercentMin = 100; evadeColor= 'green'; }

	      var evadePercentMax = 100-(55+(monAtkMin-(me.GM_getValue(me.charName + "-BuffedMoxie",0)))*5.5);
	      evadePercentMax = Math.round(evadePercentMax * 10) / 10; // Round to one decimal place
	      var evadeColor = 'black';
	      if (evadePercentMax < 0) { evadePercentMax = 0; evadeColor= 'red'; }
	      if (evadePercentMax > 100) { evadePercentMax = 100; evadeColor= 'green'; }

	      me.GM_setValue(me.charName + '-CurEvadePercentMax',evadePercentMax+'');
	      me.GM_setValue(me.charName + '-CurEvadePercentMin',evadePercentMin+'');

	      if (evadePercentMin == evadePercentMax) {
	        var evadePercentText = evadePercentMin + '%';
	      } else {
		var evadePercentText = evadePercentMin + '% - ' + evadePercentMax + '%';
	      }

	      var hitMeleePercentMin = ((me.GM_getValue(me.charName + "-BuffedMuscle",0)-monDefMax) / 12) * 100 + 50;
	      var hitMeleeColor = 'black';
	      if (hitMeleePercentMin < 0) { hitMeleePercentMin = 0; hitMeleeColor= 'red'; }
	      if (hitMeleePercentMin > 100) { hitMeleePercentMin = 100; hitMeleeColor= 'green'; }
	      hitMeleePercentMin = Math.round(hitMeleePercentMin * 10) / 10; // Round to one decimal place

	      var hitMeleePercentMax = ((me.GM_getValue(me.charName + "-BuffedMuscle",0)-monDefMin) / 12) * 100 + 50;
	      var hitMeleeColor = 'black';
	      if (hitMeleePercentMax < 0) { hitMeleePercentMax = 0; hitMeleeColor= 'red'; }
	      if (hitMeleePercentMax > 100) { hitMeleePercentMax = 100; hitMeleeColor= 'green'; }
	      hitMeleePercentMax = Math.round(hitMeleePercentMax * 10) / 10; // Round to one decimal place

	      if (hitMeleePercentMin == hitMeleePercentMax) {
	        var hitMeleePercentText = hitMeleePercentMin + '%';
	      } else {
		var hitMeleePercentText = hitMeleePercentMin + '% - ' + hitMeleePercentMax + '%';
	      }

	      var hitMysPercentMin = ((me.GM_getValue(me.charName + "-BuffedMysticality",0)-monDefMax) / 12) * 100 + 50;
	      var hitMysColor = 'black';
	      if (hitMysPercentMin < 0) { hitMysPercentMin = 0; hitMysColor= 'red'; }
	      if (hitMysPercentMin > 100) { hitMysPercentMin = 100; hitMysColor= 'green'; }
	      hitMysPercentMin = Math.round(hitMysPercentMin * 10) / 10; // Round to one decimal place

	      var hitRangedPercentMin = ((me.GM_getValue(me.charName + "-BuffedMoxie",0)-monDefMax) / 12) * 100 + 50;
	      var hitRangedColor = 'black';
	      if (hitRangedPercentMin < 0) { hitRangedPercentMin = 0; hitRangedColor= 'red'; }
	      if (hitRangedPercentMin > 100) { hitRangedPercentMin = 100; hitRangedColor= 'green'; }
	      hitRangedPercentMin = Math.round(hitRangedPercentMin * 10) / 10; // Round to one decimal place

	      var hitRangedPercentMax = ((me.GM_getValue(me.charName + "-BuffedMoxie",0)-monDefMin) / 12) * 100 + 50;
	      var hitRangedColor = 'black';
	      if (hitRangedPercentMax < 0) { hitRangedPercentMax = 0; hitRangedColor= 'red'; }
	      if (hitRangedPercentMax > 100) { hitRangedPercentMax = 100; hitRangedColor= 'green'; }
	      hitRangedPercentMax = Math.round(hitRangedPercentMax * 10) / 10; // Round to one decimal place

	      if (hitRangedPercentMin == hitRangedPercentMax) {
		var hitRangedPercentText = hitRangedPercentMin + '%';
	      } else {
		var hitRangedPercentText = hitRangedPercentMin + '% - ' + hitRangedPercentMax + '%';
	      }

	      me.GM_setValue(me.charName + '-CurHitMeleePercentMin',hitMeleePercentMin+'');
	      me.GM_setValue(me.charName + '-CurHitMeleePercentMax',hitMeleePercentMax+'');
	      me.GM_setValue(me.charName + '-CurHitRangedPercentMin',hitRangedPercentMin+'');
	      me.GM_setValue(me.charName + '-CurHitRangedPercentMax',hitRangedPercentMax+'');

	      var minSign = '';
	      var maxSign = '';
	      var combatMinDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMinDeleveled',0);
	      var combatMaxDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatMaxDeleveled',0);
	      var combatAtkOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatAtkOnlyDeleveled',0);
	      var combatDefOnlyDeleveled = me.GM_getValue(me.charName + '-CurMonsterCombatDefOnlyDeleveled',0);
	      var combatDelevelText = me.GM_getValue(me.charName + '-CurMonsterDelevelText','');
	      var textMLModiferResult =  me.GM_getValue(me.charName + '-textMLModiferResult','');
	      var textMLModifiers = me.GM_getValue(me.charName + '-textMLModifiers','');
	      var monAtkText = me.GM_getValue(me.charName + '-monAtkText','');
	      var monDefText = me.GM_getValue(me.charName + '-monDefText','');
	      var storageResultHTML = '';

	      if (storedInitiativeQuality == 'Confirmed') {
	        var initChance = Math.min(100,(100 - storedInitiative) + (initiativeModifier * 100) + Math.max(0,(Number(me.GM_getValue(me.charName + '-UnbuffedMainstat',0)) - monsterAtk)));
	        var initChanceDecoded = 'Here is how this number was determined:\\n' +
	            '(100-' + storedInitiative +
	            ') + ' + Math.round(initiativeModifier*100) +
	            ' + max(0, ' + me.GM_getValue(me.charName + '-UnbuffedMainstat',0) +
	            ' - ' + baseAtk + ' - ' + (monsterAtk - baseAtk) + ')\\n' +
	            'which is: \\n' +
	            '(100 - MonsterBaseInit) + PlayerInitiativeModifiers + \\n max(0, Unbuffed-Mainstat - MonsterBaseAtk - ExtraMonsterLevels)\\n\\n' +
	            'Formula spaded-out by members of the Hardcore Oxygenation.  You guys rock.';
	      } else {
		var initChance = 'TBD';
		var initChanceDecoded = 'The initiative value for this monster has not yet been confirmed.\\n' +
		    'You can help us remedy this by attacking this monster with your Initiative boosted\\n' +
		    'to a higher value than the Initiative currently listed for this monster.  If it\\n' +
		    'gets the jump on you anyway, that data will be captured and you will get credit for\\n' +
		    'having helped spade out one of the last remaining unknowns in the game!  Thanks!';
	      }

	      if (baseMeatDrops == storedMeatDrops) {
	        var meatDropText = '<strong>' + baseMeatDrops + '</strong>';
	      } else {
		var meatDropText = '<strong>' + storedMeatDrops + '</strong> (' + baseMeatDrops + ')';
	      }
	      setTimeout(
	        'setCookieValue = function(cookieName,cookieValue) {var today = new Date().valueOf();var t = new Date(today+14*86400000);document.cookie = cookieName + "=" + escape(cookieValue) + "; expires=" + t + "; domain=\\"kingdomofloathing.com\\"";}; ' +
	        'storeRowVisibility = function() { var rowVisibility = 0; if(document.getElementById("HitChance1Row").style.display=="table-row"){ rowVisibility = rowVisibility + 1;} if(document.getElementById("PlayerStats1Row").style.display=="table-row"){ rowVisibility = rowVisibility + 2;} if(document.getElementById("MonsterInfoRow").style.display=="table-row"){ rowVisibility = rowVisibility + 4;} if(document.getElementById("ItemDropRow").style.display=="table-row"){ rowVisibility = rowVisibility + 8;} setCookieValue("MonsterStats-' + me.charName + '-VisibleRows",rowVisibility); }; ' +
	//        'toggleRow = function (rowId,linkId) { if(document.getElementById(rowId).style.display=="table-row"){document.getElementById(rowId).style.display="none"; if (document.getElementById(linkId)) {document.getElementById(linkId).style.textDecoration="underline;";} } else{ document.getElementById(rowId).style.display="table-row"; if(document.getElementById(linkId)) {document.getElementById(linkId).style.textDecoration="line-through;";}} storeRowVisibility(); };',10);
	        'toggleRow = function (rowId,linkId) { var rowsToProcess = document.getElementsByTagName("tr"); for (rowIndex in rowsToProcess) { if (rowsToProcess[rowIndex].className == rowId) { if(rowsToProcess[rowIndex].style.display=="table-row") { rowsToProcess[rowIndex].style.display="none"; if (document.getElementById(linkId)) { document.getElementById(linkId).style.textDecoration="underline;"; } } else{ rowsToProcess[rowIndex].style.display="table-row";  if(document.getElementById(linkId)) { document.getElementById(linkId).style.textDecoration="line-through;"; } } } } storeRowVisibility(); };',10);

	     var itemElement = me.doc.getElementById('monname');
	     var itemParent = itemElement.parentNode;
	     var newElement = me.doc.createElement("span");

	     if (fightOver == 1) {
		var feedbackLink = '<a tabindex="-1" href="http://' + location.host + '/sendmessage.php?toid=1830678"><font size=-4>Send Feedback to garbled</font></a>&nbsp;&nbsp;&nbsp;';
	     } else { var feedbackLink = ''; }

	     if (me.GM_getValue(me.charName + '-IndeterminateDamage',0)==1) { var fuzzyDamageText = '<span onClick=\'javascript: alert("Some attack (probably Magic Missile) did indeterminate damage. HP is (hopefully) max possible HP.");\'><font size=-1 color=blue><u>*</u></font></span>'; } else { var fuzzyDamageText = ''; }

	     var debugMode = me.GM_getValue(me.charName + '-DebugMode',0);
	     var showDebug = me.GM_getValue(me.charName + '-ShowDebug',0);
	     var debugWrapper1 = '';
	     var debugWrapper2 = '';
	     if (showDebug == 1) { var debugVisibilityText = 'inline'; } else { var debugVisibilityText = 'none'; }
	     if (debugMode == 1) {
		 debugWrapper1 = '<table><tr><td valign=top>';
		 debugWrapper2 = '<span id="debugtabletoggle" style="text-decoration: underline;"><font size=-2>Toggle Debug Table</font></span></td><td valign=top>' +
		     '<table style="display: ' + debugVisibilityText + ';" id="debugtable" width=325><tr><th style="color: white;" colspan=4 bgcolor=blue>' +
		     '<font size=-2>Damage Debug Info</font></th></tr><tr><th style="color: white;" bgcolor=blue><font size=-2>Round</font></th>' +
		     '<th style="color: white;" bgcolor=blue><font size=-2>Damage</font></th><th style="color: white;" bgcolor=blue><font size=-2>Damage Type</font></th>' +
		     '<th style="color: white;" bgcolor=blue><font size=-2>Raw Text</font></th></tr>' + debugText +
		     '</table></td></tr>' + //<tr><td><span onClick="javascript: alert(\'' + me.makeTagsRenderable(curDebugFightText) + '\');"><u>Round Text</u></span></td><td>' +
		     //'<span onClick="javascript: alert(\'' + totalDebugFightText.length + '\n\n' + me.makeTagsRenderable(totalDebugFightText) + '\');"><u>All Text</u></span></td></tr>' +
		     '</table>';
	     }

	      newElement.innerHTML = '<BR><BR>' +
	          '<span style="float:right;" id="MonsterStatsTable">' + debugWrapper1 +
	          '<table width=300 style="border: 1px solid blue; border-collapse: collapse; border-bottom: 1px solid blue; border-right: 1px solid blue; font-size: 85%;" id="MonsterStats">' +
	          '<tr><th style="color: white;" colspan=2 bgcolor=blue>' + fpMonsterName + 
		  ' (<a tabIndex="-1" href=\"javascript:alert(\'' + textMLModifiers + '\');"><font color=white>' + textMLModiferResult + '</font></a>) (Round ' + roundCounter + ')</th></tr>' +
	          '<tr style=""><td><strong>HP:</strong></td><td> ' + curMonsterHP + fuzzyDamageText + ' / ' + monsterHP + '&nbsp;' + commentHP + '</td></tr>' +
	          '<tr><td><strong>Chance to Dodge</strong> (Mox):</td><td> ' + evadePercentText + ' </td></tr>' +
	          '<tr style="display: ' + hitChanceRowVisibility + '" class="HitChanceRow" id="HitChance1Row"><td><strong>Chance to Hit</strong> (Melee):</td><td> ' + hitMeleePercentText + ' </td></tr>' +
	          '<tr style="display: ' + hitChanceRowVisibility + '" class="HitChanceRow" id="HitChance3Row"><td><strong>Chance to Hit</strong> (Ranged):</td><td> ' + hitRangedPercentText + ' </td></tr>' +
	          '<tr style="display: ' + playerStatsRowVisibility + '" class="PlayerStatsRow" id="PlayerStats1Row"><td><strong>Req. to Always Hit</strong></td><td> ' + monsterReqToHit + ' </td></tr>' +
	          '<tr style="display: ' + playerStatsRowVisibility + '" class="PlayerStatsRow" id="PlayerStats2Row"><td><strong>Req. to Always Evade</strong></td><td> ' + monsterReqToEvade + ' Mox</td></tr>' +
	          '<tr style="display: ' + playerStatsRowVisibility + '" class="PlayerStatsRow" id="PlayerStats3Row"><td><strong>Initiative Bonus:</strong>&nbsp;<span onClick=\'javascript: alert("' + initiativeModifierInfo + '");\'><u>' + Math.round(initiativeModifier * 100) + '%</span> </td><td><strong>Init Chance:</strong> <span onClick=\'javascript: alert("' + initChanceDecoded + '");\'><u>' + initChance + '%</u></span></tr>' +
	          '<tr style="display: ' + monsterInfoRowVisibility + '" class="MonsterInfoRow" id="MonsterInfoRow"><td><strong>Atk:</strong>  ' + monAtkText + ' &nbsp;&nbsp;&nbsp;&nbsp;<strong>Def:</strong> ' + monDefText + ' </td><td><strong>XP:</strong><span onClick=\'javascript: alert("' + statGainModifierInfo + '");\'><u>(+' + Math.round((buffedXP - monsterXP)*100)/100 + ')</u></span>&nbsp;&nbsp;&nbsp; ' + buffedXPText + ' (' + monsterXP + ') </td></tr>' +
	          '<tr style="display: ' + monsterInfoRowVisibility + '" class="MonsterInfoRow" id="MonsterInfo2Row"><td><strong>Initiative:</strong> ' + storedInitiative + '&nbsp;(' + storedInitiativeQuality + ') </td></tr>' +
	          '<tr style="display: ' + monsterInfoRowVisibility + '" class="ElementRow" id="ElementRow1"><td><strong>Element:</strong></td><td> ' + monsterElementalDef + ' </td></tr>' +
		  '<tr style="display: ' + monsterInfoRowVisibility + '" class="ElementRow" id="ElementRow2"><td><strong>Phylum:</strong></td><td> ' + storedMonsterParts[10] + ' </td></tr>' +
	          storedDropText +
	          //'<tr style="display: ' + itemDropRowVisibility + '" id="ItemDropRow"><td><strong>Item Drops:</strong></td><td> ' + storedDropText + ' </td></tr>' +
	          '<tr style="display: ' + itemDropRowVisibility + '" class="DropRow" id="MeatDropRow"><td><strong>Meat Drops:</strong><span onClick=\'javascript: alert("' + meatDropModifierInfo + '");\'><u>(+' + Math.round((meatDropModifier - 1) * 1000)/10 + '%)</u></span></td><td> ' + meatDropText + ' </td></tr>' +
	//          '<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow1\',\'\'); toggleRow(\'ElementRow2\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStats1Row\',\'PlayerStatsLink\');toggleRow(\'PlayerStats2Row\',\'\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChance1Row\',\'HitChancesLink\'); toggleRow(\'HitChance3Row\',\'\'); toggleRow(\'HitChance2Row\',\'\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'ItemDropRow\',\'ItemDropLink\');toggleRow(\'MeatDropRow\',\'\');">Drops</span></td></tr>' +
	          '<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStatsRow\',\'PlayerStatsLink\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChanceRow\',\'HitChancesLink\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'DropRow\',\'ItemDropLink\');">Drops</span></td></tr>' +
	          '</table>'+ feedbackLink + debugWrapper2 +
	          storageResultHTML + '</span>';
	     if (itemElement.nextSibling){
	        itemParent.insertBefore(newElement,itemElement.nextSibling);
	     }
	     else{
	        itemParent.appendChild(newElement);
	     }


	      // Experimental way to avoid reflow issues.  Appears to work.
	      //setTimeout( "document.getElementById('MonsterStatsTable').innerHTML += '<BR>';",15);

	    var elementToTag = me.doc.getElementById("debugtabletoggle");

	    if (elementToTag) {
	      elementToTag.addEventListener('click',function() { me.toggleDebugVisibility(); },false);
	    }

	  }
	}
	if (pathname == "/account.php") {
		buildPrefs()
	}
};

MonsterStats.prototype.getValue = function(key, defVal)
{
	var me = this;
	return me.GM_getValue(me.charName + key, false) || me.GM_getValue(key, defVal == null ? '' : defVal );
};

// Each page get's it's own MonsterStats object tied onto the window object
var obj = window;
obj.ms = new MonsterStats();
// Run MonsterStats on this page
obj.ms.main( window.location.pathname, (document) );
