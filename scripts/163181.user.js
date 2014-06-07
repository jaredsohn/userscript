// ==UserScript==
// @name           BvS Item Checker
// @namespace      http://userscripts.org/scripts/show/163181
// @description    Helps you find out which items you are missing in BvS
// @include        http://www.animecubed.com/billy/bvs/itemorder.html
// @include        http://animecubed.com/billy/bvs/itemorder.html
// @icon           data:image/vnd.microsoft.icon;base64,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
// @version        1.39
// @history        1.39 MegaPlow was incorrectly listed as SnowPlow - update from taltamir 
// @history        1.38 first version by taltamir. Changed snowman desired count from 1 to 11 (it's bonus stacks up to 11 times).  Added the five missing pets. Split up special and unobtainable categories. Update from taltamir.
// @history        1.37 Moved Snow Items and now count them.
// @history        1.36 Added Two Kaiju Drops, More Pocketwatchs, and Shoveling Items
// @history        1.35 Added Pets removed a few unobtainable items
// @history        1.34 Added Pet and Pachinko items
// @history        1.33 Fixed Beat-Up Teddy's capitalization
// @history        1.32 Added Sleek Keel [Kurokage]
// @history        1.31 Added Flask of Mist and Kitty Ears [HirumaTeri]
// @history        1.30 Added Mirror Shard to General category
// @history        1.30 Added Framed Certificate to Sponsor category
// @history        1.30 Added watches
// @history        1.30 Removed the update checker
// @history        1.29 Changed the names of Fayt/Jadian/Jasticus/Zenovia Drop
// @history        1.28 Added Adonis DNA, Tangerine Pantsu, Sandwich Gatari, Badger items, Fayt/Jadian/Jasticus/Zenovia Drop [Sena]
// @history        1.27 Fixed Silver Petals, Explosing Tags (-s suffix was missing)
// @history        1.26 Added Glowslinging Category [worldslaya]
// @history        1.26 Added Glissando, Key Signature, Semiquaver [worldslaya]
// @history        1.26 Added Flower Wars Category. [worldslaya]
// @history        1.26 Added Cardboard Hanafuda Deck, Floral Hanafuda Deck, Mulberry Hanafuda Deck, and Lycoral Hanafuda Deck [worldslaya]
// @history        1.25 Added Mondo Keycard to BillyCon category [Fiachra]
// @history        1.24 Added 11DBHK's Head-Sized Cookie to Holiday category [North]
// @history        1.24 Added a sccript icon (works on GM v0.9.0+)
// @history        1.23 Added Season Five Collection to WorldKaiju category
// @history        1.23 Added Broforce, B-Class Laser to Kaiju - Minor category
// @history        1.23 Added M Ball to Arena category
// @history        1.23 Added Cheeky Stop Sign to Special category
// @history        1.22 Added Control Rod to Kaiju - Minor category
// @history        1.22 Added Locket of Lei, Matches of Supe to Holiday category [worldslaya]
// @history        1.22 Added Holiday - Candyween category [worldslaya]
// @history        1.22 Added Billy Bromide, Emosuke Bromide, Lil' Ro Bromide, Lil' Shammy Bromide, Robogirl Bromide, Stalkergirl Bromide to Holiday - Candyween category [worldslaya]
// @history        1.22 Added Professor's Hat, Utility Belt to General category
// @history        1.22 Added Ninja Tortoise to Special category
// @history        1.21 Added Fruit Stand to BillyCon category
// @history        1.20 Moved Headband of Awesome to Minor Kaiju category
// @history        1.19 Added BillyCon category
// @history        1.19 Moved BillyCon Emblem to BillyCon category
// @history        1.19 Added Novelty Bullcrap, Manly Apron
// @history        1.18 Added Player Pin, Franklin Badge, Evil's Bane
// @history        1.17 Added Cold Hard Cash
// @history        1.16 Added Sharktooth Necklace, Jutsu Barrage
// @history        1.16 Added the ability to show completed categories after hiding them
// @history        1.15 You may now hide completed categories
// @history        1.14 Moved Tiny Bees to a separate category, added Something Good and Lightning Draw
// @history        1.13 Added Senjutsu Reserves
// @history        1.12 Moved The Final Countdown and The Touch to Special/Unobtainable, added Mahjong Sets
// @history        1.11 Changed Destiny Warrior to Shadow Warrior, Destiny Fulfilled to Ancestor Spirit
// @history        1.10 Changed Persocom to Persocomp
// @history        1.09 Added Wasteland categories, removed the old ones
// @history        1.08 Added Book of the Twilight, new sponsor items [Ren Po Ken(i), TheSpy]
// @history        1.07 Added Knightmare Mark 86, sponsor items [Guess, TheSpy]
// @history        1.06 Added 50 Monochrome Pheromone requirement for Reaper Driving Gloves [blueddict]
// @history        1.05 Moved non-loopable items to a separate category, added CAPSLOCK, reordered categories
// @history        1.04 Added different styles for different type of items, added PizzaWitch ingredients check
// @history        1.03 Bug fix
// @history        1.02 A major rewrite
// @history        1.01 Small fixes [portwizard]
// @history        1.00 Initial release
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2011, Lunatrius; 2013, DTC
// ==/UserScript==

// browser compatibility
function addStyle(css){
    var head = document.getElementsByTagName("head")[0];
    if (!head)
        return;
    var style = document.createElement("style");
    style.type = "text/css";
    style.textContent = css;
    head.appendChild(style);
}

// nifty stuff
var divMain = null;
var myItems = new Array();
var pwIngredients = [];
pwIngredients["Polyester Delivery Jacket"] = [
	[1, "Polyester Delivery Jacket"]
];
pwIngredients["Streamlined Delivery Jacket"] = [
	[100, "Regular Fur Piece"],
	[200, "Wooden Tile"]
];
pwIngredients["Reinforced Delivery Jacket"] = [
	[50, "Quality Fur Piece"],
	[50, "Rubber Bits"],
	[100, "Ceramic Tile"],
	[5, "Ruby Ryo Coin"]
];
pwIngredients["Wasteland Delivery Jacket"] = [
	[1, "Dustcloak of Sneaking"],
	[5, "Indestructible Thread"],
	[30, "Steel Tile"],
	[3, "Sapphire Ryo Coin"]
];
pwIngredients["Dimensional Delivery Jacket"] = [
	[20, "Essence of Earth"],
	[1, "Mottled Wing"],
	[1, "SNAKE Oil Lite"],
	[2, "Emerald Ryo Coin"]
];
pwIngredients["Hushed as the Wood"] = [
	[1, "Kimono of Shadows"],
	[6, "Drunken Pirate Flag"],
	[1, "Screaming Rune"],
	[2, "Diamond Ryo Coin"]
];
pwIngredients["Scuffed Delivery Hat"] = [
	[1, "Scuffed Delivery Hat"]
];
pwIngredients["Reinforced Delivery Hat"] = [
	[1, "Blue Flower Hairpin"],
	[500, "Exploding Tags"]
];
pwIngredients["Monochrome Delivery Hat"] = [
	[100, "Note Page"],
	[10, "Heck Butterfly"],
	[10, "Swallowtail Butterfly"],
	[5, "Ruby Ryo Coin"]
];
pwIngredients["Wasteland Delivery Hat"] = [
	[1, "Solid Shades"],
	[100, "Storybook Page"],
	[1, "Hat of Sakyura"],
	[3, "Sapphire Ryo Coin"]
];
pwIngredients["Virtual Delivery Hat"] = [
	[20, "Essence of Fire"],
	[20, "Essence of Wind"],
	[1, "Holy Spur"],
	[2, "Polar Star"],
	[3, "Emerald Ryo Coin"]
];
pwIngredients["Stalwart as the Mount"] = [
	[1, "Laughing Rune"],
	[2, "SNAKE Oil"],
	[6, "Manji Headlights"],
	[1, "Cowl of the Second HoCage"],
	[2, "Diamond Ryo Coin"],
	[5, "Spirit of the Demon of the Sand"]
];
pwIngredients["Tattered Driving Gloves"] = [
	[1, "Tattered Driving Gloves"]
];
pwIngredients["Stitched Driving Gloves"] = [
	[50, "Filtered Thread"],
	[50, "Silver Petals"]
];
pwIngredients["Leather Driving Gloves"] = [
	[10, "Wasteland Hide Piece"],
	[10, "Fanboy Shirt"],
	[10, "Copper Ring"],
	[3, "Ruby Ryo Coin"]
];
pwIngredients["Reaper Driving Gloves"] = [
	[50, "Monochrome Pheromone"],
	[5, "Soul Glove"],
	[10, "Gold Ring"],
	[1, "Pistol of Repeating"],
	[3, "Sapphire Ryo Coin"]
];
pwIngredients["Twilight Gauntlets"] = [
	[20, "Essence of Water"],
	[10, "Platinum Ring"],
	[1, "Finite Spiral"],
	[2, "Emerald Ryo Coin"]
];
pwIngredients["Fierce as the Flame"] = [
	[1, "Raging Rune"],
	[5, "Spirit of the Nine-Tailed Fox"],
	[10, "Cobalt Ring"],
	[6, "Red and Black Shades"],
	[2, "Diamond Ryo Coin"],
	[10, "Cobalt Sliver"]
];
pwIngredients["Tacky Keychain"] = [
	[1, "Tacky Keychain"]
];
pwIngredients["Functional Keychain"] = [
	[20, "Metal Scraps"],
	[100, "Kunai"]
];
pwIngredients["Trendy Keychain"] = [
	[50, "ShinyShiny"],
	[20, "Poison Needles"],
	[10, "Copper Coin"],
	[3, "Ruby Ryo Coin"]
];
pwIngredients["Monochrome Keychain"] = [
	[5, "Dark Draft"],
	[50, "Hot Picture of Robogirl"],
	[10, "Silver Coin"],
	[4, "Sapphire Ryo Coin"]
];
pwIngredients["Digital Keychain"] = [
	[20, "Essence of Lightning"],
	[1, "Soundless Jade"],
	[10, "Gold Coin"],
	[1, "Grind Core"]
];
pwIngredients["Swift as the Wind"] = [
	[1, "Crying Rune"],
	[1, "Sho Nuff Elixir"],
	[1, "Scythe of Razing"]
];

var fwIngredients = [];
fwIngredients["Cardboard Hanafuda Deck"] = [
	[100, "Note Page"]
];
fwIngredients["Floral Hanafuda Deck"] = [
	[100, "Smokeblossom"],
	[300, "Note Page"],
	[50, "Copper Dust"],
	[1, "Cardboard Hanafuda Deck"]
];
fwIngredients["Mulberry Hanafuda Deck"] = [
	[500, "Note Page"],
	[100, "Silver Dust"],
	[200, "Smokeblossom"],
	[100, "Tasty Twig"],
	[100, "Exploding Tags"],
	[1, "Floral Hanafuda Deck"]
];
fwIngredients["Lycoral Hanafuda Deck"] = [
	[1100, "Silver Petals"],
	[500, "Storybook Page"],
	[1000, "Cobalt Dust"],
	[300, "Smokeblossom"],
	[250, "Tasty Twig"],
	[500, "Exploding Tags"],
	[1, "Mulberry Hanafuda Deck"]
];

var mjIngredients = [];
mjIngredients["Ashen Mahjong Set"] = [
	[136, "Ash-Covered Tile"]
];
mjIngredients["Wooden Mahjong Set"] = [
	[136, "Wooden Tile"],
	[1, "Ashen Mahjong Set"]
];
mjIngredients["Ceramic Mahjong Set"] = [
	[136, "Ceramic Tile"],
	[1, "Wooden Mahjong Set"]
];
mjIngredients["Steel Mahjong Set"] = [
	[136, "Steel Tile"],
	[1, "Ceramic Mahjong Set"]
];

var sIngredients = [];
sIngredients["Snowman"] = [
    [11, "Snowman"]
];
sIngredients["Snowshovel"] = [
    [5, "Snowman"]
];
sIngredients["SnowPlow"] = [
    [5, "Snowshovel"]
];

// table style
addStyle([
	".itemsNormal {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsNormal thead {background-color: #DCB48C;}",
	".itemsNormal thead tr th {border: 1px outset #DCB48C; cursor: pointer;}",
	".itemsNormal tbody {background-color: #DCB48C;}",
	".itemsNormal tbody tr th {background-color: #DCB48C; border: 1px outset #DCB48C; width: 50%;}",
	".itemsNormal tbody tr td {background-color: #EAD8C3; padding: 3px;}",
	".itemsNormal a {color: #A10000;}",

	".itemsSingle {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsSingle thead {background-color: #8CDCB4;}",
	".itemsSingle thead tr th {border: 1px outset #8CDCB4; cursor: pointer;}",
	".itemsSingle tbody {background-color: #8CDCB4;}",
	".itemsSingle tbody tr th {background-color: #8CDCB4; border: 1px outset #8CDCB4; width: 50%;}",
	".itemsSingle tbody tr td {background-color: #C3EAD8; padding: 3px;}",
	".itemsSingle a {color: #A10000;}",

	".itemsWasteland {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsWasteland thead {background-color: #CE8CDC;}",
	".itemsWasteland thead tr th {border: 1px outset #CE8CDC; cursor: pointer;}",
	".itemsWasteland tbody {background-color: #CE8CDC;}",
	".itemsWasteland tbody tr th {background-color: #CE8CDC; border: 1px outset #CE8CDC; width: 50%;}",
	".itemsWasteland tbody tr td {background-color: #E2C3EA; padding: 3px;}",
	".itemsWasteland a {color: #A10000;}",

	".itemsPizzaWitch {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsPizzaWitch thead {background-color: #8CB4DC;}",
	".itemsPizzaWitch thead tr th {border: 1px outset #8CB4DC; cursor: pointer;}",
	".itemsPizzaWitch tbody {background-color: #8CB4DC;}",
	".itemsPizzaWitch tbody tr th {background-color: #8CB4DC; border: 1px outset #8CB4DC; width: 50%;}",
	".itemsPizzaWitch tbody tr td {background-color: #C3D8EA; padding: 3px;}",
	".itemsPizzaWitch a {color: #A10000;}",

	".itemsMahjong {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsMahjong thead {background-color: #8CDCCD;}",
	".itemsMahjong thead tr th {border: 1px outset #8CDCCD; cursor: pointer;}",
	".itemsMahjong tbody {background-color: #8CDCCD;}",
	".itemsMahjong tbody tr th {background-color: #8CDCCD; border: 1px outset #8CDCCD; width: 50%;}",
	".itemsMahjong tbody tr td {background-color: #C3EAE1; padding: 3px;}",
	".itemsMahjong a {color: #A10000;}",

	".itemsFlowerwars {width: 100%; border-spacing: 1px; font-size:12px; background-color: #000000; margin-bottom: 4px;}",
	".itemsFlowerwars thead {background-color: #8CDCCD;}",
	".itemsFlowerwars thead tr th {border: 1px outset #8CDCCD; cursor: pointer;}",
	".itemsFlowerwars tbody {background-color: #8CDCCD;}",
	".itemsFlowerwars tbody tr th {background-color: #8CDCCD; border: 1px outset #8CDCCD; width: 50%;}",
	".itemsFlowerwars tbody tr td {background-color: #C3EAE1; padding: 3px;}",
	".itemsFlowerwars a {color: #A10000;}"
].join("\n"));

// remove leading and trailing whitespace
function strip(str)
{
	str = str.replace(/^\s+/, "");
	str = str.replace(/\s+$/, "");
	str = str.replace(/\s+/g, " ");
	return str;
}

// remove an element from the array (with the given value)
Array.prototype.remove = function(arrayItem) {
	for(var arrayIndex = 0; arrayIndex < this.length; arrayIndex++) {
		if(arrayItem == this[arrayIndex]) {
			this.splice(arrayIndex, 1);
			return true;
		}
	}
	return false;
}

// remove element from the array up to the specified item (with the given value)
Array.prototype.removeTo = function(arrayItem) {
	for(var arrayIndex = 0; arrayIndex < this.length; arrayIndex++) {
		if(typeof(this[arrayIndex]) == "object") {
			for(var arrayIndex2 = 0; arrayIndex2 < this[arrayIndex].length; arrayIndex2++) {
				if(arrayItem == this[arrayIndex][arrayIndex2]) {
					this.splice(0, arrayIndex + 1);
					return true;
				}
			}
		}
		else {
			if(arrayItem == this[arrayIndex]) {
				this.splice(0, arrayIndex + 1);
				return true;
			}
		}
	}
	return false;
}

// get item count
function getCount(item) {
	for(var iItem = 0; iItem < myItems.length; iItem++) {
		if(myItems[iItem][1] == item) {
			return myItems[iItem][0];
		}
	}
	return 0;
}

// create the table containing item information
function generateTable(caption, have, need, type) {
	if(!divMain)
		return;

	// table
	var table = document.createElement("table");
	table.className = "items" + type;
	divMain.appendChild(table);

	// table header
	var thead = document.createElement("thead");
	table.appendChild(thead);

	// table header - row
	var thead_tr = document.createElement("tr");
	thead.appendChild(thead_tr);

	// table header column
	var thead_tr_th = document.createElement("th");
	thead_tr_th.setAttribute("colspan", "2");
	thead_tr_th.innerHTML = caption;
	thead_tr.appendChild(thead_tr_th);

	// table body
	var tbody = document.createElement("tbody");
	tbody.style.display = "none";
	table.appendChild(tbody);

	// table body - sub header row
	var tbody_tr = document.createElement("tr");
	tbody.appendChild(tbody_tr);

	// table body - sub header column 1
	var tbody_tr_th1 = document.createElement("th");
	tbody_tr_th1.innerHTML = "Already have";
	tbody_tr.appendChild(tbody_tr_th1);

	// table body - sub header column 2
	var tbody_tr_th2 = document.createElement("th");
	tbody_tr_th2.innerHTML = "Still need";
	tbody_tr.appendChild(tbody_tr_th2);

	// table body row
	var tbody_tr = document.createElement("tr");
	tbody.appendChild(tbody_tr);

	// table body column 1
	var tbody_tr_td1 = document.createElement("td");
	tbody_tr_td1.setAttribute("valign", "top");
	tbody_tr_td1.innerHTML = have;
	tbody_tr.appendChild(tbody_tr_td1);

	// table body column 2
	var tbody_tr_td2 = document.createElement("td");
	tbody_tr_td2.setAttribute("valign", "top");
	tbody_tr_td2.innerHTML = need;
	tbody_tr.appendChild(tbody_tr_td2);

	// add the click handler
	thead_tr_th.addEventListener('click', function() {
		if(tbody.style.display == "none") {
			tbody.style.display = "";
			thead_tr_th.style.borderStyle = "inset";
			thead_tr_th.style.color = "yellow";
		}
		else {
			tbody.style.display = "none";
			thead_tr_th.style.borderStyle = "outset";
			thead_tr_th.style.color = "";
		}
	}, true);
}

// ...
function normalCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.remove(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	items2.sort();
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	items.sort();
	for(var i = 0; i < items.length; i++) {
		need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Normal");
}

// ...
function singleCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.remove(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	items2.sort();
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	if(have.length == 0) {
		// need
		items.sort();
		for(var i = 0; i < items.length; i++) {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Single");
}

// ...
function wastelandCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.pop();
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Wasteland");
}

// ...
function pizzawitchCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		var item = "";
		if(typeof(items[i]) == "string") {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
			item = items[i];
		}
		else {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i][0] + "\" target=\"_blank\">" + items[i][0] + "</a><br/>";
			item = items[i][0];
		}

		try {
			var ingredients = pwIngredients[item];
			if(ingredients.length > 0) {
				need += "<ul style=\"margin-top:0px;\">";
				for(var j = 0; j < ingredients.length; j++) {
					var itemNeed = ingredients[j][0];
					var itemName = ingredients[j][1];
					var itemHave = getCount(itemName);
					need += "<li>" + itemNeed + " <a href=\"http://bvs.wikidot.com/items:" + itemName + "\" target=\"_blank\">" + itemName + "</a> (<font style=\"color:" + (itemNeed <= itemHave ? "green" : "red") + ";\">" + itemHave + "</font>)</li>";
				}
				need += "</ul>";
			}
		}
		catch(e) {
			// nothing
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "PizzaWitch");
}

// ...
function mahjongCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		var item = "";
		if(typeof(items[i]) == "string") {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
			item = items[i];
		}
		else {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i][0] + "\" target=\"_blank\">" + items[i][0] + "</a><br/>";
			item = items[i][0];
		}

		try {
			var ingredients = mjIngredients[item];
			if(ingredients.length > 0) {
				need += "<ul style=\"margin-top:0px;\">";
				for(var j = 0; j < ingredients.length; j++) {
					var itemNeed = ingredients[j][0];
					var itemName = ingredients[j][1];
					var itemHave = getCount(itemName);
					need += "<li>" + itemNeed + " <a href=\"http://bvs.wikidot.com/items:" + itemName + "\" target=\"_blank\">" + itemName + "</a> (<font style=\"color:" + (itemNeed <= itemHave ? "green" : "red") + ";\">" + itemHave + "</font>)</li>";
				}
				need += "</ul>";
			}
		}
		catch(e) {
			// nothing
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Mahjong");
}

// ...
function flowerwarsCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		var item = "";
		if(typeof(items[i]) == "string") {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
			item = items[i];
		}
		else {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i][0] + "\" target=\"_blank\">" + items[i][0] + "</a><br/>";
			item = items[i][0];
		}

		try {
			var ingredients = fwIngredients[item];
			if(ingredients.length > 0) {
				need += "<ul style=\"margin-top:0px;\">";
				for(var j = 0; j < ingredients.length; j++) {
					var itemNeed = ingredients[j][0];
					var itemName = ingredients[j][1];
					var itemHave = getCount(itemName);
					need += "<li>" + itemNeed + " <a href=\"http://bvs.wikidot.com/items:" + itemName + "\" target=\"_blank\">" + itemName + "</a> (<font style=\"color:" + (itemNeed <= itemHave ? "green" : "red") + ";\">" + itemHave + "</font>)</li>";
				}
				need += "</ul>";
			}
		}
		catch(e) {
			// nothing
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Flowerwars");
}

// ...
function badgerCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a><br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		var item = "";
		if(typeof(items[i]) == "string") {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
			item = items[i];
		}
		else {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i][0] + "\" target=\"_blank\">" + items[i][0] + "</a><br/>";
			item = items[i][0];
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Flowerwars");
}

// ...
function snowCheck(caption, items) {
	var have = "";
	var need = "";
	var items2 = new Array();

	// seperate items
	for(var i in myItems) {
		if(items.removeTo(myItems[i][1])) {
			items2.push(myItems[i][1]);
		}
	}

	// have
	for(var i = 0; i < items2.length; i++) {
        var itemThis = getCount(items2[i]);
		have += "<a href=\"http://bvs.wikidot.com/items:" + items2[i] + "\" target=\"_blank\">" + items2[i] + "</a>" + "(" + itemThis + ")" + "<br/>";
	}

	// need
	for(var i = 0; i < items.length; i++) {
		var item = "";
		if(typeof(items[i]) == "string") {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i] + "\" target=\"_blank\">" + items[i] + "</a><br/>";
			item = items[i];
		}
		else {
			need += "<a href=\"http://bvs.wikidot.com/items:" + items[i][0] + "\" target=\"_blank\">" + items[i][0] + "</a><br/>";
			item = items[i][0];
		}

		try {
			var ingredients = sIngredients[item];
			if(ingredients.length > 0) {
				need += "<ul style=\"margin-top:0px;\">";
				for(var j = 0; j < ingredients.length; j++) {
					var itemNeed = ingredients[j][0];
					var itemName = ingredients[j][1];
					var itemHave = getCount(itemName);
					need += "<li>" + itemNeed + " <a href=\"http://bvs.wikidot.com/items:" + itemName + "\" target=\"_blank\">" + itemName + "</a> (<font style=\"color:" + (itemNeed <= itemHave ? "green" : "red") + ";\">" + itemHave + "</font>)</li>";
				}
				need += "</ul>";
			}
		}
		catch(e) {
			// nothing
		}
	}

	generateTable(caption + (need.length > 0 ? "" : " [Complete]"), have.length > 0 ? have : "<i>None</i>", need.length > 0 ? need : "<i>None</i>", "Normal");
}

// main stuff
function main() {
	var node = null;
	var snap = document.evaluate("//font/b[contains(text(),'Item Reorganization')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snap.snapshotLength; i++) {
		node = snap.snapshotItem(i);
	}

	if(node == null) {
		return;
	}

	divMain = document.createElement("div");
	node.parentNode.insertBefore(divMain, node);

	var snap = document.evaluate("//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/font[1]/text()|//ul[@id='DragContainer7']/li[not(contains(@id,'XX'))]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snap.snapshotLength; i += 2) {
		myItems.push([snap.snapshotItem(i).nodeValue, strip(snap.snapshotItem(i + 1).nodeValue)]);
	}

	var a = document.createElement("a");
	a.style.color = "#A10000";
	a.style.fontWeight = "bold";
	a.style.fontSize = "12px";
	a.style.cursor = "pointer";
	a.innerHTML = "Hide/Show completed";
	a.addEventListener('click', function() {
		var snap = document.evaluate("//table[contains(.//text(),'[Complete]')]", divMain, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < snap.snapshotLength; i++) {
			if(snap.snapshotItem(i).style.display == "")
				snap.snapshotItem(i).style.display = "none";
			else
				snap.snapshotItem(i).style.display = "";
		}
	}, true);
	divMain.appendChild(a);

	normalCheck("Arena", ["Letter of Marque", "Eye of the Tiger", "Jazz Hands", "X-Ray Specs", "Warrior of Courage", "Warrior of Power", "Warrior of Wisdom", "Matrix of Leadership", "Shadow Warrior", "NanuMachines", "The Mark of Eleventy Billion", "Aura of Gratitude", "Officer's Pay", "Thrill of Battle", "Streamlined Focus", "Warbound", "Arena Favorite", "Risky Badge", "Duelist's Aura", "Duelist's Eye", "M Ball"]);
	normalCheck("BurgerNinja/PizzaWitch", ["Knightmare Frame", "The Mark of The RNG", "PizzaWitch Key", "PizzaWitch Cape", "Knightmare Mark 86"]);
	normalCheck("General", ["Basic Ninja Gear", "Pika-Bike", "Sannin's Premium", "Stripe of Honor", "Survived the Impossible", "Glowing Mood Ring", "Monster Mask", "Sascha", "Sandwich Dispenser", "Goo Stabilization Recipe", "Gothic Album", "Pink Hair Dye", "Restraining Order", "The Five Rings", "Player Pin", "Professor's Hat", "Utility Belt", "Tangerine Pantsu", "Sandwich Gatari", "Mirror Shard", "Pet License"]);
    normalCheck("Golden", ["Pirate Hat", "Golden Band of Courage", "Golden Band of Power", "Golden Band of Wisdom", "Golden Collar of Courage", "Golden Collar of Power", "Golden Collar of Wisdom", "Golden Star of Courage", "Golden Star of Power", "Golden Star of Wisdom"]);
	normalCheck("Holiday", ["Shortbunny", "Fireworks Launcher", "11DBHK's Birthday Hat", "Book of Follet", "Whip of Rosa", "Bat of Casper", "Bow of Windia", "Hat of Sakyura", "Ninja-Mas Star", "CAPSLOCK", "Sharktooth Necklace", "Locket of Lei", "Matches of Supe", "11DBHK's Head-Sized Cookie","Ninja-Mas List"]);
	normalCheck("Holiday - Candyween", ["Robogirl Bromide", "Billy Bromide", "Stalkergirl Bromide", "Emosuke Bromide", "Lil' Ro Bromide", "Lil' Shammy Bromide"]);
	normalCheck("Kaiju - Minor", ["Amalga Eye", "Bear Coat", "Big Mouth", "Book of Spoilers", "Carapace Armor", "Catgirl Entourage", "Claw Card", "Dramatic Monologue", "Driving Music", "Firebrand", "Fruits Basket", "Go Piece", "Granola Camouflage", "Groupies", "Hacksaw", "Helix Tattoo", "Huggly Teddybear", "Kaiju Memento", "Lab Coat", "Late-Night Snack", "Magical Wand", "Merchant Sigil", "Money Printer", "Monkey Cymbals", "Perfect Hair", "Persocomp", "Pink Skull", "Plug Suit", "Poisoned Daggers", "Pokerballs", "Polar Star", "Power Over 9000", "Red Water", "Regalia", "Rocket Punch", "Shiny Belt", "Soul of Steel", "Spirit of the Demon of the Sand", "Spirit of the Nine-Tailed Fox", "Student ID", "Tire Tracks", "Troll Account", "Thunderclaw Ring", "Vampire Cloak", "Senjutsu Reserves", "Something Good", "Lightning Draw", "Jutsu Barrage", "Cold Hard Cash", "Headband of Awesome", "Control Rod", "Broforce", "B-Class Laser", "Frozen Rose", "Noble Phantasm", "Beta Reader", "Ultra Dessert", "Flask of Mist", "Kitty Ears","Little Wooden Cubes","Monoract"]);
	normalCheck("Kaiju - Major", ["Avant-Guards", "Crystal Tumblers", "Flaming Spit Technique", "'Goodbye Kitten' Pink Taser", "Makeshift Booth", "Parting Gifts", "Pokey Stick", "Quality Cookware", "Remote Scout", "Sad Robot", "Surplus Ordnance", "Time Reversal Cube", "Training Montage", "Zombja Survival Guide"]);
	normalCheck("Party House", ["Claymore", "Dartboard", "Over 11000", "Pinchy Claw", "Sevens Trophy", "The Glow", "Party Animal", "Adonis DNA"]);
	normalCheck("Party House - Wheel", ["Codec", "K-Dog's Headband", "Love Love Paradise", "Necklace of the First HoCage", "Stealth Suit"]);
	normalCheck("R00t", ["Book of the Twilight", "Crusader's Sword", "Daybreak", "Eleven Tails", "Epitaph of the Twilight", "Iron Bond", "Kimono of Shadows", "Lycoris", "R00t Password", "Spear of Wotan", "Aromatic Grass", "Risky Coffee", "Tri-Edge"]);
	normalCheck("R00t - Lost Weapons", ["Holy Spur", "Mottled Wing", "Wanton Rose", "Finite Spiral", "Voice Enslaver", "Tickling Death", "Prancing Haze", "Soundless Jade"]);
	normalCheck("Reaper/Monochrome", ["Hollow Leg", "Blue Flower Hairpin", "Heck Butterfly", "Silver Hairpin", "Soul Glove", "Swallowtail Butterfly", "Sword of the Reaper", "Dark Band", "Ancestor Spirit", "Loyal Sacrifice", "Sight Beyond Sight", "Eclipsed"]);
	normalCheck("Referral", ["Helper Pin", "Coolness Badge", "11DBHK's Purple Shades", "11DBHK's Gold Necklace", "Aviator Goggles", "Pat on the Back", "Piece of the Action"]);
	normalCheck("Shop", ["Chakra Armor", "Desert Robes", "Dog Collar", "Giant Fan", "Knapsack", "Ninja Dog", "Ninja Puppet", "Trench Knife"]);
	normalCheck("Wasteland", ["Basic Blueprints", "Ancient Blueprints", "Storm's Embrace", "Storm's Fury", "Storm's Path"]);
	normalCheck("World Kaiju", ["K-Belt", "Special Attack Uniform", "Season One Collection", "Season Two Collection", "Season Three Collection", "Season Four Collection", "Season Five Collection"]);
	normalCheck("Zombja", ["Boomstick", "Flamethrower", "Nonja Chef", "Nonja Sidekick", "Dirty Shovel", "Z-Virus"]);
	normalCheck("BillyCon", ["BillyCon Emblem", "Novelty Bullcrap", "Manly Apron", "Fruit Stand", "Mondo Keycard"]);
	normalCheck("Special", ["The Final Countdown", "The Touch", "Cheeky Stop Sign"]);
	normalCheck("Unobtainable", ["Secret Tech", "ProTip"]);
	normalCheck("Non-Loopable", ["RingEye", "The Note", "The Tote", "The Cote", "Ninpo Mask", "Counterfeit Permit", "Captain's Jacket", "Hall Pass", "Awesome Pants", "Substitute Soul Reaper Badge", "Soul Candy", "PizzaWitch Uniform", "License to Speed", "Wired Reflexes"]);
	normalCheck("Glowslinging", ["Semiquaver", "Glissando", "Key Signature"]);
	normalCheck("Pachinko", ["Dragon Tattoo", "Pinky Finger", "Pompadour", "Ten-Ton Hammer", "Wooden Sword"]);
    normalCheck("BillyTV", ["The Eleven"]);
    snowCheck("Snow", ["Snowman","Snowshovel", "MegaPlow"]);
	singleCheck("Chaos & Order", ["Franklin Badge", "Evil's Bane"]);
	singleCheck("Sponsor", ["Enormous Hammer", "ElevenCannon", "Dresden's File", "Tiny Bear Pistols", "SuperChunin", "Manly Tears", "555 Phone", "Framed Certificate", "Sleek Keel"]);
	singleCheck("Valentine", ["Beat-Up Teddy", "Creepy Love Letter", "Emo Valentine", "Pink Bouquet"]);
	singleCheck("Tiny Bees", ["Tiny Bee Rifle", "Tiny Bee Pistols", "Tiny Bee 2.0", "Tiny BeeZooka"]);
	singleCheck("Pets", ["Pet - Ninja Kitty", "Pet - Cave Puppy", "Pet - Awkward Penguin", "Pet - Ninja Tortoise", "Pet - Honey Badger", "Pet - Ninja Squirrel", "Pet - Fanboy Sidekick", "Pet - COURAGE WOLF", "Pet - Blazing Phoenix", "Pet - Red Herring", "Pet - 1.1 Tailed Fox"]);
	wastelandCheck("Wasteland Cloaks", ["Basic Dustcloak", "Weighted Dustcloak", "Wasteland Dustcloak", "Dustcloak of Sneaking"]);
	wastelandCheck("Wasteland Scythes", ["Makeshift Scythe", "Silver Scythe", "Wasteland Scythe", "Scythe of Razing"]);
	wastelandCheck("Wasteland Pistols", ["Makeshift Pistol", "Average Pistol", "Wasteland Pistol", "Pistol of Repeating"]);
	wastelandCheck("Wasteland Shades", ["Desert Shades", "Solid Shades"]);
	wastelandCheck("Wasteland Boots", ["Fur-Lined Boots", "Quality Boots", "Wasteland Boots", "Boots of Walking"]);
	wastelandCheck("Wasteland Cowls", ["Basic Cowl", "Dark Cowl", "Wasteland Cowl", "Cowl of the Second HoCage"]);
	pizzawitchCheck("PizzaWitch Jackets", ["Polyester Delivery Jacket", "Streamlined Delivery Jacket", "Reinforced Delivery Jacket", "Wasteland Delivery Jacket", "Dimensional Delivery Jacket", "Hushed as the Wood"]);
	pizzawitchCheck("PizzaWitch Hats", ["Scuffed Delivery Hat", "Reinforced Delivery Hat", "Monochrome Delivery Hat", "Wasteland Delivery Hat", "Virtual Delivery Hat", "Stalwart as the Mount"]);
	pizzawitchCheck("PizzaWitch Gloves", ["Tattered Driving Gloves", "Stitched Driving Gloves", "Leather Driving Gloves", ["Reaper Driving Gloves", "Shikai Driving Gloves", "Bankai Driving Gloves", "Cobra Kai Driving Gloves"], "Twilight Gauntlets", "Fierce as the Flame"]);
	pizzawitchCheck("PizzaWitch Keychains", ["Tacky Keychain", "Functional Keychain", "Trendy Keychain", "Monochrome Keychain", "Digital Keychain", "Swift as the Wind"]);
	mahjongCheck("Mahjong Sets", ["Ashen Mahjong Set", "Wooden Mahjong Set", "Ceramic Mahjong Set", "Steel Mahjong Set"]);
	flowerwarsCheck("Hanafuda Decks", ["Cardboard Hanafuda Deck", "Floral Hanafuda Deck", "Mulberry Hanafuda Deck", "Lycoral Hanafuda Deck"]);
	badgerCheck("Badger", ["Card Badger Hat", "Card Badger Binder", "Card Badger Playmat", "Ultra Badger"]);
	badgerCheck("Watches", ["Crushed Pocketwatch", "Wrecked Pocketwatch", "Smashed Pocketwatch", "Broken Pocketwatch", "Cracked Pocketwatch","Tarnished Pocketwatch","Dinged Pocketwatch","New Pocketwatch"]);
}

// ...
main();