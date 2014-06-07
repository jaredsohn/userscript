// ==UserScript==
// @name           BvS Kaiju Drop tracker
// @namespace      BvS-Conster
// @description    Tells you what a kaiju drops
// @include        http://*animecubed.com/billy/bvs/villagemonsterfight.html
// ==/UserScript==

function what_drop() {
	var drops = new Array();
	drops["AgentBrand"]             = "Catgirl Entourage";
	drops["Alchemists"]             = "Red Water";
	drops["Amalga"]                 = "Amalga Eye";
	drops["AzoJason"]               = "Merchant Sigil";
	drops["Bishounen"]              = "Perfect Hair";
	drops["Cardcatchers"]           = "Claw Card";
	drops["Celeste"]                = "Poisoned Daggers";
	drops["Console Elitists"]       = "Money Printer";
	drops["Crazed Mimiga"]          = "Polar Star";
	drops["Dakralai"]               = "Hacksaw";
	drops["Dave"]                   = "Driving Music";
	drops["Demon of the Sand"]      = "Spirit of the Demon of the Sand";
	drops["Drazhar"]                = "Firebrand";
	drops["Drift Racers"]           = "Late-Night Snack";
	drops["Evangelions"]            = "Plug Suit";
	drops["EvilTaxi"]               = "Tire Tracks";
	drops["Evil Taxi"]              = "Tire Tracks";
	drops["Fanboys"]                = "Book of Spoilers";
	drops["Forum Trolls"]           = "Troll Account";
	drops["Giant Cockroach"]        = "Carapace Armor";
	drops["Go Players"]             = "Go Piece";
	drops["Hungry"]                 = "Big Mouth";
	drops["J-Rock Bands"]           = "Groupies";
	drops["Jkeezer"]                = "Helix Tattoo";
	drops["Mad Scientists"]         = "Lab Coat";
	drops["MageOhki"]               = "Pink Skull";
	drops["Magical Girls"]          = "Magical Wand";
	drops["McSmashy"]               = "Huggly Teddybear";
	drops["Millennium"]             = "Dramatic Monologue";
	drops["Nine-Tailed Fox"]        = "Spirit of the Nine-Tailed Fox";
	drops["Ninja Bears"]            = "Bear Coat";
	drops["Persocoms"]              = "Persocom";
	drops["Pokermans"]              = "Pokerballs";
	drops["Pro Wrestlers"]          = "Shiny Belt";
	drops["Psycho Hikers"]          = "Granola Camouflage";
	drops["Robot Monkeys"]          = "Monkey Cymbals";
	drops["Shin Goji"]              = "Rocket Punch";
	drops["Storm Riders"]           = "Regalia";
	drops["Super Robots"]           = "Soul of Steel";
	drops["Super Saiyans"]          = "Power over 9000";
	drops["Vampires"]               = "Vampire Cloak";
	drops["Vysaga"]                 = "Student ID";
	drops["Xochitl"]                = "Thunderclaw Ring";
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
	var kaijuNameElement = document.evaluate("//font[@style='font-size: 20px;']/b", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var kaijuname = null;
	if (kaijuNameElement != null) {
		kaijuname = kaijuNameElement.innerHTML;
	}
	if (kaijuname != null) {
		drop = drops[kaijuname];
	}
	if (drop == null) {
		drop = "Kaiju Memento";
	}
	var location = "<a href=\"http://bvs.wikidot.com/items:" + drop + "\" target=\"_blank\">" + drop + 

"</a><br/>";

	kaijuNameElement.innerHTML += (" - drops " + location);
	return drop;
}

var wot = "bla";
wot = what_drop();