// ==UserScript==
// @name        Strategus Sorted Inventory
// @namespace   http://strategus.c-rpg.net/DoD_Wolper
// @description Sorts the inventory on the cRPG Strategus website, appends the cRPG-Layout to the website and improves some other stuff
// @include     http://strategus.c-rpg.net/*
// @downloadURL http://userscripts.org/scripts/source/152233.user.js
// @updateURL   http://userscripts.org/scripts/source/152233.meta.js
// @version     4.1
// ==/UserScript==

const cPageMap = "MAP";
const cPageInventory = "inv";
const cPageFaction = "faction";
const cPageShop = "buy";
const cPageShopAll = "buy=all";
const cPageTowncenter = "towncenter";

var itemOrigin = new Object();
itemOrigin["good"] = new Array("Chalk", "Slate", "Fine Tapestry", "Ornate Carpets", "Salted Clams", "Wrought Iron Bars", "Camel Milk", "Wild Horse Steak", "Oak Timber", "Bananas", "Hemp", "Birch Bark", "Sandstone", "Onions", "Diamonds", "Dyes", "Tanned Leather", "Spruce Lumber", "Giant Crabs", "Whale Oil", "Dried Horse Meat", "Radishes", "Ceramic Bowls", "Silk Hats", "Brass Bars", "Iron Tools", "Gold Bars", "Baked Bricks", "Fine Woodcuts", "Embroidered Hats", "Pearls", "Concrete", "Rubies", "Dates", "Root Carvings", "Steppe Tea", "Goat Cheese", "Preserved Goat Bladders", "Silver Chalices", "Silver Jewelry", "Dried Goat Meat", "Colored Sands", "Gold Ore", "Silk Cloth", "Beautiful Paintings", "Fresh Shrimp", "Ceder Timber", "Ash Sapling", "Mining Tools", "Linen", "Fine-bred Mountain Goats", "Yew Seedlings", "Zinc Ore", "Smoked Salmon", "Northern Perch", "Raw Ammolite", "Preserved Crayfish", "Oak Furniture", "Delicious Apples", "Jet Jewelry", "Raw Obsidian", "Musical Instruments", "Bear Hides", "Fox Furs", "Olive Oil", "Elegant Curtains", "Dried Herring", "Amber Jewelry", "Dried Beef", "Wooden Reliefs", "Cow Hides", "Sun Dried Bricks", "Eels", "Fine Eel Skin Hoses", "Glass Chalices", "Well-bred Cows", "Emeralds", "Olives", "Fine Cutlery", "Striped Bass", "Sugarcane", "Trained Donkeys", "Albino Donkeys", "Velvet", "Well-Bred Sheep", "Marble", "Clay", "Peppered Pickles", "Ceramic Sculptures", "Salted Cod", "Eelskin", "Carrots", "Copper Ore", "Red Potatoes", "Reindeer Antlers", "Onyx", "Hemp Rope", "Coconuts", "Malachite", "Tiger Fur", "Iron Bars", "Brass Sheets", "Elm Timber", "Smoked Codfish", "Granite", "Quartz", "Pumpkins", "Jasper Gems", "Dried Potatoes", "Horse Saddles", "Dried Eel", "Dried Corn", "Boar Tusks", "Bejeweled Cutlery", "White Seedy Bread", "Salted Mackerel", "Strong Barrels", "Large Eggs", "Apple Pies", "Amber Gems", "Dried Leather", "Healthy Pigs", "Iron Ore", "Fine Lamb Wool", "Exotic Flowers", "Ale", "Fox Furs", "Marble Sculptures", "Heavy Waybread", "Carved Oak Planks", "Spices", "Goat Milk", "Pure White Candles", "Camel Hooves", "Bear Meat", "Chicken Feathers", "Frog Legs", "Dried Reindeer Meat", "Silver Bars", "Gold Jewelry", "Pig Iron Ingots", "Linen", "Rock Salt", "Cured Leather", "Fine-coated Mules", "Raw Hides", "Pork Ribs", "Sapphires", "Mushrooms", "Mysterious Meat", "Wooden Sculptures", "Iron Jewelry", "Wolf Pelts", "Wheat", "Raw Wool", "Albino Chicken", "Silver Ore", "Stone Reliefs", "Strong Nord Ale", "Spiced Strongwine", "Pigeons", "Bear Skins", "Limestone", "Bee Wax", "Fine Wool", "Dried Bear Meat", "Tents", "Dried Camel Meat", "Hops", "Nickel Bars", "Barley", "Lutefisk", "Boar Ribs", "Crabs", "Snake Meat", "Yeast", "Wheat Flour", "Dog Meat", "Honey", "Kitten", "Exotic Chalk", "Exotic Ornate Carpets", "Exotic Wrought Iron Bars", "Exotic Camel Milk", "Exotic Wild Horse Steak", "Exotic Bananas", "Exotic Hemp", "Exotic Birch Bark", "Exotic Diamonds", "Exotic Tanned Leather", "Exotic Dried Horse Meat", "Exotic Silk Hats", "Exotic Brass Bars", "Exotic Concrete", "Exotic Rubies", "Exotic Root Carvings", "Exotic Steppe Tea", "Exotic Preserved Goat Bladders", "Exotic Silver Jewelry", "Exotic Colored Sands", "Exotic Beautiful Paintings", "Exotic Silk Cloth", "Exotic Ceder Timber", "Exotic Ash Sapling", "Exotic Mining Tools", "Exotic Jet Jewelry", "Exotic Musical Instruments", "Exotic Olive Oil", "Exotic Wooden Reliefs", "Exotic Eels", "Exotic Emeralds", "Exotic Trained Donkeys", "Exotic Well-Bred Sheep", "Exotic Marble", "Exotic Clay", "Exotic Ceramic Sculptures", "Exotic Eelskin", "Exotic Carrots", "Exotic Onyx", "Exotic Hemp Rope", "Exotic Malachite", "Exotic Tiger Fur", "Exotic Elm Timber", "Exotic Quartz", "Exotic Jasper Gems", "Exotic Dried Corn", "Exotic White Seedy Bread", "Exotic Fine Lamb Wool", "Exotic Ale", "Exotic Heavy Waybread", "Exotic Carved Oak Planks", "Exotic Camel Hooves", "Exotic Bear Meat", "Exotic Chicken Feathers", "Exotic Dried Reindeer Meat", "Exotic Silver Bars", "Exotic Pig Iron Ingots", "Exotic Rock Salt", "Exotic Cured Leather", "Exotic Wooden Sculptures", "Exotic Mysterious Meat", "Exotic Raw Wool", "Exotic Albino Chicken", "Exotic Silver Ore", "Exotic Spiced Strongwine", "Exotic Bear Skins", "Exotic Limestone", "Exotic Bee Wax", "Exotic Dried Camel Meat", "Exotic Boar Ribs", "Exotic Snake Meat", "Exotic Wheat Flour", "Exotic Dog Meat", "Exotic Honey", "Exotic Kitten", "Exotic Slate", "Exotic Oak Timber", "Exotic Baked Bricks", "Exotic Radishes", "Exotic Embroidered Hats", "Exotic Dates", "Exotic Gold Ore", "Exotic Smoked Salmon", "Exotic Delicious Apples", "Exotic Dried Beef", "Exotic Fine Eel Skin Hoses", "Exotic Albino Donkeys", "Exotic Red Potatoes", "Exotic Coconuts", "Exotic Dried Potatoes", "Exotic Horse Saddles", "Exotic Dried Eel", "Exotic Bejeweled Cutlery", "Exotic Exotic Flowers", "Exotic Fox Furs", "Exotic Marble Sculptures", "Exotic Spices", "Exotic Pure White Candles", "Exotic Frog Legs", "Exotic Linen", "Exotic Fine-coated Mules", "Exotic Wolf Pelts", "Exotic Wheat", "Exotic Stone Reliefs", "Exotic Pigeons", "Exotic Dried Bear Meat", "Exotic Tents", "Exotic Hops", "Exotic Barley");
itemOrigin["place"] = new Array("Ada Kulun", "Aab", "Alburq Castle", "Ahmerrad", "Aldelen", "Almerra Castle", "Amashke", "Ambean", "Amere", "Asugan Castle", "Ayn Assuadi", "Ayyike", "Azgad", "Balanli", "Bardaq Castle", "Bariyye", "Bhulaban", "Bazeck", "Buillin", "Bulugha Castle", "Bulugur", "Burglen", "Buvran", "Caraf Castle", "Chaeza", "Chalbek Castle", "Chelez", "Chide", "Culmarr Castle", "Curaw", "Curin Castle", "Dashbigha", "Derchios Castle", "Dhibbain", "Dhirim", "Dirigh Aban", "Dirigsene", "Distar Castle", "Dramug Castle", "Dugan", "Dumar", "Durquba", "Durrin Castle", "Dusturil", "Ehlerdah", "Elberl", "Emer", "Emirin", "Ergellon Castle", "Epeshe", "Etrosq Castle", "Fearichen", "Fedner", "Fenada", "Fisdnar", "Fishara", "Gisim", "Glunmar", "Grunwalder Castle", "Habba", "Haen", "Halmar", "Hanun", "Haringoth Castle", "Hawaha", "Hrus Castle", "Ibdeles", "Ibdeles Castle", "Ibiran", "Ichamur", "Ilvia", "Iqbayl", "Ismirala", "Ismirala Castle", "Istiniar", "Iyindah", "Jameyyed Castle", "Jamiche", "Jamiche Castle", "Jayek", "Jeirbe Castle", "Jelbegi", "Jelbegi Castle", "Jelkala", "Karindi", "Kedelke", "Kelredan Castle", "Khudan", "Knudarr Castle", "Kulum", "Kwynn", "Malayurg Castle", "Maras Castle", "Mawiti", "Mazen", "Mazigh", "Mechin", "Mijayet", "Mit Nun", "Narra", "Nelag Castle", "Nemeja", "Nomar", "Odasan", "Pagundur", "Peshmi", "Praven", "Qalyut", "Radoghir Castle", "Rduna", "Rebache", "Reindi Castle", "Reveran", "Reyvadin", "Rindyar Castle", "Rivacheg", "Rizi", "Ruldi", "Ruluns", "Rushdigh", "Ruvar", "Ryibelet", "Ryibelet Castle", "Samarra Castle", "Saren", "Sargoth", "Sarimish", "Sekhtem", "Senuzgda Castle", "Serindiar", "Shariz", "Shapeshte", "Sharwa Castle", "Shibal Zumr", "Shulus", "Slezkh", "Slezkh Castle", "Sumbuja", "Sungetche Castle", "Suno", "Tadsamesh", "Tahlberl", "Tamnuh", "Tash Kulun", "Tazjunat", "Tebandra", "Tehlrog Castle", "Teramma Castle", "Tevarin Castle", "Tilimsal", "Tilbaut Castle", "Tihr", "Tismirr", "Tosdhar", "Tshibtin", "Tulbuk", "Tulbuk Castle", "Tulga", "Udiniad", "Uhhun", "Uhhun Castle", "Ulburban", "Unriya", "Unuzdaq Castle", "Ushkuru", "Uslum", "Uxkhal", "Uzgha", "Vayejeg", "Veidar", "Veluca", "Vezin", "Vyincourd Castle", "Wercheg", "Weyyah Castle", "Yalen", "Yalibe", "Yaragar", "Yruma Castle", "Zagush", "New Ada Kulun", "New Ahmerrad", "New Almerra Castle", "New Amashke", "New Ambean", "New Asugan Castle", "New Ayn Assuadi", "New Ayyike", "New Bardaq Castle", "New Bhulaban", "New Bulugur", "New Caraf Castle", "New Chaeza", "New Dashbigha", "New Derchios Castle", "New Dhirim", "New Dirigh Aban", "New Distar Castle", "New Dugan", "New Durquba", "New Ehlerdah", "New Dusturil", "New Emer", "New Emirin", "New Ergellon Castle", "New Habba", "New Halmar", "New Hawaha", "New Ichamur", "New Ismirala", "New Jameyyed Castle", "New Jelbegi", "New Karindi", "New Kedelke", "New Kelredan Castle", "New Knudarr Castle", "New Kwynn", "New Malayurg Castle", "New Mazigh", "New Mechin", "New Mit Nun", "New Narra", "New Nomar", "New Peshmi", "New Qalyut", "New Reindi Castle", "New Rindyar Castle", "New Samarra Castle", "New Sargoth", "New Senuzgda Castle", "New Serindiar", "New Shibal Zumr", "New Shulus", "New Slezkh", "New Sumbuja", "New Sungetche Castle", "New Tadsamesh", "New Tamnuh", "New Tash Kulun", "New Tilbaut Castle", "New Tilimsal", "New Tshibtin", "New Tulbuk", "New Tulbuk Castle", "New Uhhun", "New Ulburban", "New Unriya", "New Unuzdaq Castle", "New Uzgha", "New Vyincourd Castle", "New Weyyah Castle", "New Yalibe", "New Yaragar", "New Yruma Castle", "New Zagush", "Nova Aab", "Nova Amere", "Nova Chide", "Nova Burglen", "Nova Curaw", "Nova Dhibbain", "Nova Durrin Castle", "Nova Fenada", "Nova Grunwalder Castle", "Nova Ibiran", "Nova Ismirala Castle", "Nova Jelbegi Castle", "Nova Mawiti", "Nova Mijayet", "Nova Radoghir Castle", "Nova Rduna", "Nova Rebache", "Nova Reyvadin", "Nova Saren", "Nova Sarimish", "Nova Sekhtem", "Nova Shariz", "Nova Sharwa Castle", "Nova Slezkh Castle", "Nova Tahlberl", "Nova Tazjunat", "Nova Tismirr", "Nova Tosdhar", "Nova Tulga", "Nova Uhhun Castle", "Nova Uslum", "Nova Uxkhal", "Nova Vayejeg", "Nova Veluca");

var allItems = new Array();
allItems[0]  = new Array("00", "Trading goods", "equip_inv.png", 0);
allItems[1]  = new Array("01", "Horses", "equip_horse.png", 1, 2, 3, 4, 10, 5, 6, 7, 8, 524, 525, 9, 526, 527);
allItems[2]  = new Array("14", "Throwing", "equip_throw.png", 23, 25, 528, 26, 28, 29, 536, 32, 534, 34, 529, 5142, 46, 537, 47, 48, 535, 36, 38, 30, 539, 40, 42, 44, 538); 
allItems[3]  = new Array("02", "Body armors", "equip_body.png", 364, 369, 366, 368, 370, 372, 373, 374, 375, 376, 412, 413, 371, 378, 377, 379, 431, 432, 5393, 5498, 381, 382, 384, 383, 386, 385, 390, 389, 4722, 5500, 391, 5169, 387, 388, 394, 392, 399, 393, 395, 396, 398, 416, 400, 417, 419, 472, 418, 403, 434, 420, 5501, 437, 397, 438, 3971, 404, 440, 367, 365, 401, 402, 414, 415, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 433, 5394, 5919, 442, 443, 3130, 444, 3137, 4952, 445, 4723, 5502, 447, 405, 454, 5738, 5741, 5507, 407, 408, 409, 410, 411, 459, 5506, 441, 448, 450, 458, 461, 4947, 4948, 4949, 4950, 4951, 446, 5916, 460, 451, 4957, 439, 5505, 4958, 5918, 449, 455, 457, 5739, 5740, 5742, 456, 452, 435, 406, 4955, 453, 4720, 4956, 5504, 5509, 5499, 462, 463, 4953, 4954, 436, 3972, 5917, 469, 5496, 464, 465, 466, 467, 5508, 473, 474, 475, 4721, 476, 477, 478, 480, 5503, 5497, 468, 547, 541, 545, 471, 380, 470, 479); 
allItems[4]  = new Array("03", "Head armors", "equip_head.png", 273, 283, 255, 256, 257, 258, 259, 260, 261, 262, 279, 280, 284, 5915, 263, 295, 268, 264, 265, 266, 267, 294, 298, 299, 5162, 270, 272, 274, 275, 276, 277, 278, 309, 495, 271, 286, 281, 285, 5484, 5168, 287, 288, 289, 290, 291, 292, 312, 348, 282, 269, 300, 293, 296, 5914, 302, 297, 301, 307, 303, 5159, 5160, 5161, 304, 353, 5155, 5156, 5157, 5163, 5164, 5165, 305, 317, 319, 321, 306, 308, 311, 3968, 5733, 310, 326, 347, 349, 350, 5158, 5730, 5737, 314, 323, 313, 320, 322, 330, 549, 4938, 5385, 5386, 315, 324, 325, 5486, 5487, 5913, 5494, 318, 327, 329, 328, 5492, 5736, 338, 5483, 5488, 5489, 5734, 5910, 494, 5493, 5731, 331, 504, 546, 5490, 332, 335, 4944, 5491, 333, 363, 4939, 4942, 5166, 334, 336, 337, 361, 3969, 4941, 4945, 5167, 5482, 5735, 5912, 316, 339, 359, 4943, 5485, 362, 5384, 340, 360, 507, 341, 4940, 5495, 5732, 5911, 342, 503, 540, 5885, 343, 4946, 5388, 5389, 506, 5390, 5391, 5392, 344, 345, 346, 351, 352, 356, 5154, 354, 355, 357, 5387, 358, 509, 492, 5383); 
allItems[5]  = new Array("04", "Leg armors", "equip_leg.png", 218, 219, 220, 5479, 5480, 5727, 5906, 222, 223, 221, 224, 4936, 225, 226, 228, 5153, 227, 229, 5907, 230, 3966, 4937, 5729, 5728, 234, 5908, 235, 238, 233, 3967, 5909, 236, 232, 4935, 244, 237, 231, 239, 243, 240, 242, 241); 
allItems[6]  = new Array("05", "Hand armors", "equip_hand.png", 245, 246, 5884, 253, 251, 252, 247, 248, 249, 550, 543, 542, 254, 5481, 533); 
allItems[7]  = new Array("06", "Polearms", "equip_polearm.png", 552, 89, 90, 91, 491, 132, 111, 101, 93, 92, 5371, 94, 99, 100, 123, 95, 107, 133, 116, 103, 104, 108, 4754, 96, 109, 4753, 112, 98, 120, 122, 110, 102, 5856, 118, 5855, 113, 106, 5857, 119, 105, 114, 5858, 117, 4692, 124, 115, 97, 126, 128, 531, 532, 530); 
allItems[8]  = new Array("07", "Two handed", "equip_twohand.png", 502, 129, 130, 137, 131, 136, 139, 134, 138, 519, 147, 143, 140, 189, 142, 149, 135, 150, 146, 148, 145, 144, 517, 518, 151, 152, 153, 154, 158, 141, 155, 156, 3320, 157, 159, 522, 521, 160);
allItems[9]  = new Array("08", "One handed", "equip_onehand.png", 489, 161, 162, 164, 165, 166, 168, 500, 3322, 167, 173, 172, 5900, 551, 171, 554, 169, 163, 178, 174, 170, 5372, 177, 180, 175, 184, 179, 185, 187, 183, 181, 190, 186, 499, 191, 188, 200, 192, 197, 196, 201, 182, 176, 205, 206, 202, 194, 3195, 195, 3194, 193, 207, 4755, 516, 203, 211, 209, 208, 204, 213, 198, 520, 215, 212, 3192, 214, 3196, 3298, 217, 3190, 216, 210, 3193, 3323, 199, 510, 523, 3191); 
allItems[10] = new Array("09", "Shields", "equip_shield.png", 490, 497, 488, 508, 52, 49, 53, 58, 51, 50, 54, 60, 59, 55, 74, 75, 79, 56, 57, 62, 80, 505, 496, 498, 61, 493, 72, 64, 66, 70, 73, 501, 77, 85, 76, 71, 83, 86, 81, 82, 78, 63, 65, 67, 68, 69, 84, 87, 544, 548, 88); 
allItems[11] = new Array("10", "Bows", "equip_bow.png", 17, 16, 18, 19, 21, 5141, 22, 20); 
allItems[12] = new Array("11", "Arrows", "equip_arrow.png", 481, 482, 484, 483);
allItems[13] = new Array("12", "Crossbows", "equip_crossbow.png", 11, 12, 13, 14, 15); 
allItems[14] = new Array("13", "Bolts", "equip_bolt.png", 485, 486);

var items = document.getElementsByClassName("item");
var itemsSorted = [];
var itemCount = [];
var categoryCount = new Array();

function getCategoryById(id)
{
	for(var i = 0; i < allItems.length; i++)
	{
		if(allItems[i].indexOf(parseInt(id), 3) >= 0)
			return i;
	}
	return 0;
}

function getSortingById(id)
{
	for(var i = 0; i < allItems.length; i++)
	{
		var x = allItems[i].indexOf(parseInt(id), 3);
		if(x >= 0)
		{
			if(x < 10)
				x = "000" + x;
			else if(x < 100)
				x = "00" + x;
			else if(x < 100)
				x = "0" + x;
			return allItems[i][0] + "_" + x;
		}
	}
	return "0";
}

function sortItems()
{
	var funcSort = function(a, b)
	{
		akey = a.getAttribute("sort");
		bkey = b.getAttribute("sort");
		asubkey = parseInt(a.getAttribute("itemcondition"));
		bsubkey = parseInt(b.getAttribute("itemcondition"));
		if (akey == bkey)
		{
			if(asubkey < bsubkey) return 1;
			if(asubkey > bsubkey) return -1;
			return 0;
		}
		if (akey < bkey) return -1;
		if (akey > bkey) return 1;
	}
	
	itemsSorted.sort(funcSort);
	
	for(var i = 0; i < itemsSorted.length; i++)
	{
		itemsSorted[i].parentNode.appendChild(itemsSorted[i]);
	}
}

function addItemEvents()
{
	for(var i = 0; i < itemsSorted.length; i++)
	{
	    (function (i) {
	        itemsSorted[i].getElementsByTagName("img")[0].onclick = function () {
	        	var id = itemsSorted[i].getAttribute("itemid");
	        	if(id != "0")
					popupShow("http://c-rpg.net/index.php?page=itemdetail&id=" + id) 
	        }; 
	    }) (i); 
	}
}

function showAllItems()
{
	var shoppages = document.getElementById("shoppages").childNodes;
	for(var i = 0; i < shoppages.length; i++)
	{
		shoppages[i].setAttribute("style", "");
	}
}

function addShopTabAll()
{
	var tab = document.getElementById("all_tab");
	if("" + tab == "null")
	{
		tab = document.createElement("a");
		tab.setAttribute("id", "all_tab");
		tab.setAttribute("class", "shop_type");
		tab.setAttribute("href", "?buy=all");
		var img = document.createElement("img");
		img.setAttribute("src", "img/equip_inv.png");
		tab.appendChild(img);
		document.getElementById("shoptabs").appendChild(tab);
	}
	tab.setAttribute("onclick", "setTab('#all_tab', '#itp_type_all');");
}

function addShopItemConditionSelect()
{
	var select = document.createElement("select");
	select.setAttribute("id", "showShopItemsByCondition");
	select.setAttribute("style", "text-align: center;");
	var opt;
	for(var i = 3; i >= -2; i--)
	{
		opt = document.createElement("option");
		//if(GM_getValue("showShopItemsByCondition", -2) == i)
		//	opt.setAttribute("selected", "selected");
		opt.innerHTML = (i > 0 ? "+" : "") + i;
		select.appendChild(opt);
	}
	select.addEventListener("change", updateShopView, false);
	var tab = document.getElementById("buy_page");
	tab.insertBefore(select, tab.firstChild);
	tab.insertBefore(document.createTextNode("Hide items lower than level "), select)
}

function updateShopView()
{
	var select = document.getElementById("showShopItemsByCondition");
	var showCondition = select.options[select.options.selectedIndex].value;
	//GM_setValue("showShopItemsByCondition", showCondition);

	for(var i = 0; i < itemsSorted.length; i++)
	{
		var condition = parseInt(itemsSorted[i].getAttribute("itemcondition"));
		itemsSorted[i].setAttribute("style", (condition < showCondition ? "display: none;" : ""));
	}
}

function addInventoryOverView()
{
	var div = document.createElement("div");
	var str = "";
	
	str += "<table width='100%' border='0'>";
	str += "<tr><td valign='top'><table border='0'>";
	for(var i = 0; i < categoryCount.length; i++)
	{
		str += "<tr><td><img src='/img/" + allItems[i][2] + "' width='15px'></td>";
		str += "<td>" + allItems[i][1] + ": <td align='right'><strong>" + categoryCount[i] + "</strong></td></tr>";
		if((i == 2) || (i == 6) || (i == 10))
			str += "</table></td><td valign='top'><table border='0'>";
	}
	str += "</table></td></tr>";
	str += "</table>";
	
	div.innerHTML = str;
	itemsSorted[0].parentNode.insertBefore(div, itemsSorted[0].parentNode.firstChild);
}

function pageIs(page)
{
	if((page == cPageMap) && (document.location.href.indexOf("http://strategus.c-rpg.net/index.php") >= 0))
		return true;
	if(document.location.href.indexOf("http://strategus.c-rpg.net/news.php?" + page) >= 0)
		return true;
	return false;
}

function popupShow(url)
{
	var popup = document.createElement("div");
	popup.setAttribute("id", "popupframe");
	var frm = document.createElement("iframe");
	frm.setAttribute("allowtransparency", "true");
	frm.setAttribute("src", url);
	var btn = document.createElement("img");
	btn.setAttribute("src", "http://c-rpg.net/img/border_close_button.png");
	btn.setAttribute("title", "Close");
	btn.addEventListener("click", popupClose, false);
	popup.addEventListener("click", popupClose, false);
	popup.appendChild(frm);
	popup.appendChild(btn);
	document.body.appendChild(popup);
}

function popupClose()
{
	var popup = document.getElementById("popupframe");
	if(popup != null)
		popup.parentNode.removeChild(popup);
}

function setStylesheets()
{
	var css = "";
	
	// Inventory/Towncenter
	if(pageIs(cPageShop))
	{
		css += ".conditionbad { background-color: rgba(200, 0, 0, 0.1); }";
		css += ".conditiongood { background-color: rgba(0, 200, 0, 0.1); }";
	}
	else
	{
		css += ".conditionbad { background-color: rgba(100, 0, 0, 0.1); } ";
		css += ".conditiongood { background-color: rgba(0, 100, 0, 0.1); } ";
	}
	css += ".myown { background-color: rgba(0, 0, 255, 0.1) !important; } ";
	css += ".cheap { background-color: rgba(0, 100, 0, 0.1); } ";
	css += ".cheaper { background-color: rgba(0, 200, 0, 0.1); } ";

	// Popup
	css += "#popupframe { background: url('http://c-rpg.net/img/bgoverlay75.png') repeat scroll 0 0 transparent; width: 100%; height: 100%; top: 0; left: 0; position: fixed; z-index: 99; }";
	css += "#popupframe iframe { position: absolute; top: 120px; left: 250px; width: 676px; height: 600px; z-index: 100; border: none; }";
	css += "#popupframe img { z-index: 101; position: absolute; top: 120px; left: 864px; padding: 10px; cursor: pointer; }";

	// Buttons Player-Info
	css += "#player_info { overflow: hidden; } ";
	css += "#player_info li.sendaction { float: left; font-size: 0; overflow: hidden; vertical-align: middle; text-align: center; color: black; opacity: 0.8; margin-top: 5px; }";
	css += "#player_info li.sendaction:after { font-size: 12px; font-weight: bold; line-height: 22px; }";
	css += "#player_info li.sendaction:hover { color: white; opacity: 1.0; }";

	css += "#player_info li.sendaction:nth-of-type(8) { width: 92px; margin-left: 5px; background: url(http://img13.imageshack.us/img13/430/attackplayerbutton.png) transparent no-repeat; }";
	css += "#player_info li.sendaction:nth-of-type(8):after { content: 'Attack'; }";
	
	css += "#player_info li.sendaction:nth-of-type(9) { width: 180px; margin-left: -9px; background: url(http://i.imgur.com/hBUwq.png) transparent no-repeat; }";
	css += "#player_info li.sendaction:nth-of-type(9):after { content: 'Enter fief' }";

	css += "#player_info li.sendaction:nth-of-type(9):not(:last-child) { width: 90px; margin-left: -9px; background: url(http://img542.imageshack.us/img542/9219/tradeplayerbutton.png) transparent no-repeat; }";
	css += "#player_info li.sendaction:nth-of-type(9):not(:last-child):after { content: 'Follow'; }";
	
	css += "#player_info li.sendaction:nth-of-type(10) { width: 97px; margin-left: -5px; background: url(http://img547.imageshack.us/img547/6402/followplayerbutton.png) transparent no-repeat; }";
	css += "#player_info li.sendaction:nth-of-type(10):after { content: 'Trade'; clear: both; }";

	// Cursors
	/*
	css += "#player_info li.sendaction:nth-of-type(9) { cursor: url(http://img855.imageshack.us/img855/7936/followmousepointer.png), pointer; }";
	css += "#player_info li.sendaction:nth-of-type(8) { cursor: url(http://img846.imageshack.us/img846/3710/attackmousepointer.png), pointer; }";
	css += "#player_info li.sendaction:nth-of-type(9):not(:last-child) { cursor: url(http://img826.imageshack.us/img826/4296/trademousepointer.png), pointer; }";
	css += "#player_info li.sendaction:nth-of-type(10) { cursor: url(http://img855.imageshack.us/img855/7936/followmousepointer.png), pointer; }";
	*/
	
	// Buttons Player-Menu
	//css += "#player_menu { overflow: hidden; }";
	css += "#player_menu li:first-of-type, #player_menu li#move_player, #player_menu li#stop_player { float: right; font-size: 0px; overflow: hidden; vertical-align: middle; text-align: center; color: black; opacity: 0.7; margin-top: 5px; margin-bottom: 5px; }";
	css += "#player_menu li:first-of-type:after, #player_menu li#move_player:after, #player_menu li#stop_player:after { font-size: 12px; font-weight: bold; line-height: 22px; }";
	css += "#player_menu li#move_player:active { color: red; opacity: 1.0; }";
	css += "#player_menu li:first-of-type:hover, #player_menu li#move_player:hover, #player_menu li#stop_player:hover { color: white; opacity: 1.0; }";
	
	css += "#player_menu li#stop_player { width: 92px; background: url(http://img13.imageshack.us/img13/430/attackplayerbutton.png) transparent no-repeat; }";
	css += "#player_menu li#stop_player:after { content: 'Stop'; }";
	
	css += "#player_menu li#move_player { width: 90px; margin-left: -9px; background: url(http://img542.imageshack.us/img542/9219/tradeplayerbutton.png) transparent no-repeat; }";
	css += "#player_menu li#move_player:after { content: 'Move'; }";
	
	css += "#player_menu li:first-of-type { width: 97px; margin-right: 20px; margin-left: -5px; background: url(http://img547.imageshack.us/img547/6402/followplayerbutton.png) transparent no-repeat; }";
	css += "#player_menu li:first-of-type:after { content: 'My Stats'; }";
	
	css += "#player_menu li:nth-of-type(3):not(#stop_player) { clear: both; }";
	css += "#player_menu li:nth-of-type(4) { clear: both; }";

	css += "#player_menu li[id^='location'] { color: darkred; }";
	css += "#player_menu li[id^='hero']:not(:first-of-type) { color: darkgreen; }";

	css += "#player_menu { min-height: 50px; }";

	// Mainheader from cRPG
	css += "#chatlink { display: none; }";
	//css += "#settings { display: none; }";
	css += "#settings #showpartynames, #settings #showtownnames, #settings #showpartiesarmysizethreshold, #settings label[for=showpartynames], #settings label[for=showtownnames], #settings label[for=showpartiesarmysizethreshold] { display: none; }";
	css += "#settings label a { color: red; position: relative; top: -35px; left: 180px; }";
	css += "#settings {"
		 + "	background: url(http://c-rpg.net/img/bg_info.png) no-repeat scroll 0 0 transparent;"
		 + "	color: #DDBE8F;"
		 + "	height: 49px;"
		 + "	padding: 11px 0 0 5px;"
		 + "	position: absolute;"
		 + "	top: 10px;"
		 + "	width: 262px;"
		 + "}";
	
	// cRPG-Layout
	css	+= "#headerCRPG {"
		 + "	height: 110px;"
		 + "	left: 0;"
		 + "	position: absolute;"
		 + "	right: 0;"
		 + "	top: 0;"
		 + "	z-index: 2;"
		 + "}"
		 + "#headerCRPG h1 {"
		 + "	background: url(http://c-rpg.net/img/bg_logo_strategus.png) no-repeat scroll 0 0 transparent;"
		 + "	height: 96px;"
		 + "	left: 275px;"
		 + "	position: absolute;"
		 + "	top: 16px;"
		 + "	width: 77px;"
		 + "	z-index: 3;"
		 + "}"
		 + "#headerCRPG h1 span {"
		 + "	display: none;"
		 + "}"
		 + "#headerCRPG h2 {"
		 + "	font-size: 15px;"
		 + "	margin: 0px;"
		 + "}"
		 + "#headerCRPG .info {"
		 + "	background: url(http://c-rpg.net/img/bg_info.png) no-repeat scroll 0 0 transparent;"
		 + "	color: #DDBE8F;"
		 + "	height: 49px;"
		 + "	left: 10px;"
		 + "	padding: 11px 0 0 15px;"
		 + "	position: absolute;"
		 + "	top: 10px;"
		 + "	width: 252px;"
		 + "}"
		 + "#headerCRPG .info .char {"
		 + "	display: block;"
		 + "	font-size: 15px;"
		 + "	font-weight: bold;"
		 + "	height: 21px;"
		 + "	line-height: 19px;"
		 + "}"
		 + "#headerCRPG .info .itemCRPG {"
		 + "	background-position: left center;"
		 + "	background-repeat: no-repeat;"
		 + "	display: inline-block;"
		 + "	font-size: 12px;"
		 + "	font-weight: bold;"
		 + "	line-height: 16px;"
		 + "	padding-left: 18px;"
		 + "}"
		 + "#headerCRPG .info .itemCRPG + .itemCRPG {"
		 + "	margin-left: 10px;"
		 + "}"
		 + "#headerCRPG .info a.itemCRPG {"
		 + "	color: #DDBE8F;"
		 + "	text-decoration: none;"
		 + "}"
		 + "#headerCRPG .info a.itemCRPG:hover {"
		 + "	color: white;"
		 + "}"
		 + "#headerCRPG .info .itemCRPG.gold {"
		 + "	background-image: url(http://c-rpg.net/img/hi_gold.png);"
		 + "}"
		 + "#headerCRPG .info .itemCRPG.message {"
		 + "	background-image: url(http://c-rpg.net/img/hi_message.png);"
		 + "}"
		 + "#headerCRPG .info .itemCRPG.battle {"
		 + "	background-image: url(http://c-rpg.net/img/hi_battle.png);"
		 + "}"
		 + "#headerCRPG .info .itemCRPG.generation {"
		 + "	background-image: url(http://c-rpg.net/img/hi_emblem.png);"
		 + "}"
		 + "#headerCRPG .info .itemCRPG.level {"
		 + "	background-image: url(http://c-rpg.net/img/hi_sword.png);"
		 + "}"
		 + "#headerCRPG .nav {"
		 + "	background: url(http://c-rpg.net/img/bg_pole.png) no-repeat scroll right 18px transparent;"
		 + "	left: 349px;"
		 + "	position: absolute;"
		 + "	top: 0;"
		 + "	white-space: nowrap;"
		 + "	z-index: 4;"
		 + "}"
		 + "#headerCRPG .nav .dynamic, #headerCRPG .nav .static {"
		 + "	display: inline-block;"
		 + "	vertical-align: top;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary {"
		 + "	margin: 4px 0 0 2px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a {"
		 + "	background: url(http://c-rpg.net/img/button_gray_center.png) no-repeat scroll left center transparent;"
		 + "	display: inline-block;"
		 + "	height: 26px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a span {"
		 + "	border-left: 1px solid rgba(255, 255, 255, 0.5);"
		 + "	border-right: 1px solid rgba(0, 0, 0, 0.25);"
		 + "	color: rgba(0, 0, 0, 0.75);"
		 + "	display: inline-block;"
		 + "	font-size: 12px;"
		 + "	font-weight: bold;"
		 + "	height: 20px;"
		 + "	line-height: 18px;"
		 + "	margin: 3px 0;"
		 + "	padding: 2px 10px 0;"
		 + "	text-decoration: none;"
		 + "	text-shadow: 0 1px 0 white;"
		 + "	text-transform: uppercase;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a span {"
		 + "	line-height: 20px;"
		 + "	padding: 0 10px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:hover span {"
		 + "	color: black;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:first-child {"
		 + "	background-clip: content-box, padding-box;"
		 + "	background-image: url(http://c-rpg.net/img/button_gray_center.png), url(http://c-rpg.net/img/button_gray_start.png);"
		 + "	background-origin: content-box, padding-box;"
		 + "	background-position: left center, left center;"
		 + "	padding-left: 15px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:last-child {"
		 + "	background-clip: content-box, padding-box;"
		 + "	background-image: url(http://c-rpg.net/img/button_gray_center.png), url(http://c-rpg.net/img/button_gray_end.png);"
		 + "	background-origin: content-box, padding-box;"
		 + "	background-position: right center, right center;"
		 + "	padding-right: 15px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:only-child {"
		 + "	background-clip: content-box, padding-box, padding-box;"
		 + "	background-image: url(http://c-rpg.net/img/button_gray_center.png), url(http://c-rpg.net/img/button_gray_start.png), url(http://c-rpg.net/img/button_gray_end.png);"
		 + "	background-origin: content-box, padding-box, padding-box;"
		 + "	background-position: right center, left center, right center;"
		 + "	padding-left: 15px;"
		 + "	padding-right: 15px;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:first-child span {"
		 + "	border-left: 0 none;"
		 + "	padding-left: 0;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:last-child span {"
		 + "	border-right: 0 none;"
		 + "	padding-right: 0;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:only-child span {"
		 + "	border-left: 0 none;"
		 + "	border-right: 0 none;"
		 + "	padding-left: 0;"
		 + "	padding-right: 0;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:hover {"
		 + "	background-image: url(http://c-rpg.net/img/button_gold_center.png);"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:first-child:hover {"
		 + "	background-image: url(http://c-rpg.net/img/button_gold_center.png), url(http://c-rpg.net/img/button_gold_start.png);"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:last-child:hover {"
		 + "	background-image: url(http://c-rpg.net/img/button_gold_center.png), url(http://c-rpg.net/img/button_gold_end.png);"
		 + "}"
		 + "#headerCRPG .nav .dynamic .primary a:only-child:hover {"
		 + "	background-image: url(http://c-rpg.net/img/button_gold_center.png), url(http://c-rpg.net/img/button_gold_start.png), url(http://c-rpg.net/img/button_gold_end.png);"
		 + "}"
		 + "#headerCRPG .nav .dynamic .secondary {"
		 + "	height: 20px;"
		 + "	margin: 4px 0 0 3px;"
		 + "	text-align: right;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .secondary a {"
		 + "	background-attachment: scroll, scroll;"
		 + "	background-clip: border-box, padding-box;"
		 + "	background-color: transparent;"
		 + "	background-image: url(http://c-rpg.net/img/bg_tab_small_start.png), url(http://c-rpg.net/img/bg_tab_small_end.png);"
		 + "	background-origin: border-box, border-box;"
		 + "	background-position: left center, right center;"
		 + "	background-repeat: no-repeat, no-repeat;"
		 + "	background-size: auto auto, auto auto;"
		 + "	border-left: 8px solid transparent;"
		 + "	color: rgba(222, 200, 166, 0.5);"
		 + "	display: inline-block;"
		 + "	font-size: 12px;"
		 + "	font-weight: bold;"
		 + "	line-height: 17px;"
		 + "	margin-right: 2px;"
		 + "	padding-right: 8px;"
		 + "	text-decoration: none;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .secondary a:hover {"
		 + "	color: #DEC8A6;"
		 + "}"
		 + "#headerCRPG .nav .dynamic .secondary a.current {"
		 + "	color: #DEC8A6;"
		 + "	font-weight: bold;"
		 + "}"
		 + "#headerCRPG .nav .static {"
		 + "	padding-right: 10px;"
		 + "}"
		 + "#headerCRPG .nav .static a {"
		 + "	background-position: left top;"
		 + "	background-repeat: no-repeat;"
		 + "	display: inline-block;"
		 + "	margin-top: 16px;"
		 + "	vertical-align: top;"
		 + "}"
		 + "#headerCRPG .nav .static a span {"
		 + "	display: none;"
		 + "}"
		 + "#headerCRPG .nav .static a.donate {"
		 + "	background-image: url(http://c-rpg.net/img/bg_flag_donate.png);"
		 + "	height: 39px;"
		 + "	width: 24px;"
		 + "}"
		 + "#headerCRPG .nav .static a.forum {"
		 + "	background-image: url(http://c-rpg.net/img/bg_flag_forum.png);"
		 + "	height: 37px;"
		 + "	width: 26px;"
		 + "}"
		 + "#headerCRPG .nav .static a.download {"
		 + "	background-image: url(http://c-rpg.net/img/bg_flag_download.png);"
		 + "	height: 47px;"
		 + "	width: 24px;"
		 + "}"
		 + "#headerCRPG .nav .static a.help {"
		 + "	background-image: url(http://c-rpg.net/img/bg_flag_help.png);"
		 + "	height: 44px;"
		 + "	width: 18px;"
		 + "}";
	
	// Viewer
	css += "#sv-overlay { background: url(../img/sub_t.png) no-repeat scroll center top border-box, url(../img/sub_b.png) no-repeat scroll center bottom border-box, url(../img/sub_c.png) repeat-y scroll center top padding-box transparent; }";
	css += "#sv-overlay { border-bottom: 22px solid transparent; border-top: 22px solid transparent; width: 300px; left: 10px; }";
	css += "#sv-overlay { position: fixed !important; bottom: 10px; top: auto !important; left: 10px !important; }";
	css += "#sv-overlay span { color: black; padding-left: 20px; font-size: 12px; }";
	css += "#sv-overlay span[id^='sv'] { color: darkblue; padding-left: 0px; }";
	
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet){
		styleElement.styleSheet.cssText = css;
	} else {
		styleElement.appendChild(document.createTextNode(css));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function addSomeNiceStuff(strategusUsername)
{
	var e1, e2, e3, e4;
	var hd = document.createElement("div");
	hd.setAttribute("id", "headerCRPG");
	e1 = document.createElement("h1");
	e1.innerHTML = "<span>cRPG beta</span>";
	hd.appendChild(e1);

	// Info	
	e1 = document.createElement("div");
	e1.setAttribute("class", "info");
	// Username
	e2 = document.createElement("div");
	e2.setAttribute("class", "char");
	e2.innerHTML = strategusUsername;
	e1.appendChild(e2);
	// Gold
	e2 = document.createElement("div");
	e2.setAttribute("class", "itemCRPG gold");
	e2.innerHTML = "0"; // TODO: Gold
	e1.appendChild(e2);
	// Messages
	e2 = document.createElement("a");
	e2.setAttribute("class", "itemCRPG message");
	e2.setAttribute("title", "Show messages");
	e2.setAttribute("href", "#");
	e2.innerHTML = "Messages";
	e2.addEventListener("click", function() { popupShow("http://c-rpg.net/index.php?page=messenger"); }, false);		
	e1.appendChild(e2);
	hd.appendChild(e1);
	
	// Nav
	e1 = document.createElement("div");
	e1.setAttribute("class", "nav");
	// Dynamic
	e2 = document.createElement("div");
	e2.setAttribute("class", "dynamic");
	// secondary
	e3 = document.createElement("div");
	e3.setAttribute("class", "secondary");
	// Chat
	e4 = document.createElement("a");
	e4.setAttribute("title", "Join our chat channel #mount&amp;blade-crpg @ qnet.org");
	e4.setAttribute("target", "_blank");
	e4.setAttribute("href", "http://webchat.quakenet.org/?channels=mount%26blade-crpg");
	e4.innerHTML = "Join chat";
	e3.appendChild(e4);
	// Map settings
/*	e4 = document.createElement("a");
	e4.setAttribute("title", "Show map settings");
	e4.setAttribute("href", "#");
	e4.setAttribute("onmouseover", "Javascript:document.getElementById('settings').setAttribute('style', 'display: block;');");
	e4.setAttribute("onmouseout", "Javascript:document.getElementById('settings').setAttribute('style', 'display: hidden;');");
	e4.innerHTML = "Map settings";
	e3.appendChild(e4);*/
	e2.appendChild(e3);

	// primary
	e3 = document.createElement("div");
	e3.setAttribute("class", "primary");
	// cRPG
	e4 = document.createElement("a");
	e4.setAttribute("title", "Visit cRPG-website");
	e4.setAttribute("href", "http://c-rpg.net/");
	e4.setAttribute("target", "_blank");
	e4.innerHTML = "<span>cRPG</span>";
	e3.appendChild(e4);
	// Factions
	e4 = document.createElement("a");
	e4.setAttribute("title", "Show Strategus factions");
	e4.setAttribute("href", "#");
	e4.addEventListener("click", function() { popupShow("http://c-rpg.net/index.php?page=strategusinfofaction"); }, false);
	e4.innerHTML = "<span>Factions</span>";
	e3.appendChild(e4);
	// Locations
	e4 = document.createElement("a");
	e4.setAttribute("title", "Show Strategus locations");
	e4.setAttribute("href", "#");
	e4.addEventListener("click", function() { popupShow("http://c-rpg.net/index.php?page=strategusinfolocation"); }, false);
	e4.innerHTML = "<span>Locations</span>";
	e3.appendChild(e4);
	// Heroes
	e4 = document.createElement("a");
	e4.setAttribute("title", "Search for Strategus heroes");
	e4.setAttribute("href", "#");
	e4.addEventListener("click", function() { popupShow("http://c-rpg.net/index.php?page=strategusinfohero"); }, false);
	e4.innerHTML = "<span>Heroes</span>";
	e3.appendChild(e4);
	// cRPG Battles
	e4 = document.createElement("a");
	e4.setAttribute("title", "Visit cRPG battle page");
	e4.setAttribute("href", "http://c-rpg.net/index.php?page=battlesupcoming");
	e4.setAttribute("target", "_blank");
	e4.innerHTML = "<span>Battles</span>";
	e3.appendChild(e4);
	e2.appendChild(e3);
	e1.appendChild(e2);
	// Static
	e2 = document.createElement("div");
	e2.setAttribute("class", "static");
	e2.innerHTML = '<a class="forum" target="_blank" href="http://c-rpg.net/?page=forumlogin" title="Visit forums"><span>Forum</span></a>'
				 + '<a class="download" target="_blank" href="http://c-rpg.net/cRPGLauncher.exe" title="Download latest version"><span>Download</span></a>'
				 + '<a class="donate" target="_blank" href="http://c-rpg.net/?page=donate" title="Help with a donation"><span>Donate</span></a>'
				 + '<a class="help" target="_blank" href="http://wiki.c-rpg.net/index.php?title=Skills" title="Find more information in the wiki"><span>Help</span></a>';
	e1.appendChild(e2);
	hd.appendChild(e1);
	document.getElementById("header").appendChild(hd);
}

function echo(str)
{
	console.log(str);
}

function sortedInventoryMain()
{
	var strategusUsername = "None";
	if(!pageIs(cPageMap))
	{
		strategusUsername = document.getElementsByTagName("h2")[0].innerHTML;
		//GM_setValue("strategusUsername", strategusUsername);
	}
	else
	{
		//strategusUsername = GM_getValue("strategusUsername", "None");
	}

	setStylesheets();
	addSomeNiceStuff(strategusUsername);
	
	for(var i = 0; i < allItems.length; i++)
	{
		categoryCount[i] = 0;
		for(var j = 3; j < allItems[i].length; j++)
			itemCount[j] = 0;
	}

	for(var i in items)
	{
		if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
			itemsSorted.push(items[i]);
		}
	}
	
	for(var i = 0; i < items.length; i++)
	{
		var img = items[i].getElementsByClassName("header")[0].getElementsByTagName("img")[0];
		var itemId = "0";
		var itemCondition = "0";
		if(img.hasAttribute("rel"))
		{
			var rel = img.getAttribute("rel");
			itemId = rel.substring(16, rel.indexOf("&m="));
			itemCondition = rel.substring(rel.indexOf("&m=") + 3);
		}
		itemsSorted[i].setAttribute("itemid", itemId);
		itemsSorted[i].setAttribute("sort", getSortingById(itemId));
		itemsSorted[i].setAttribute("itemcondition", itemCondition);
		if(parseInt(itemCondition) < 0)
			itemsSorted[i].setAttribute("class", itemsSorted[i].getAttribute("class") + " conditionbad");
		else if(parseInt(itemCondition) > 0)
			itemsSorted[i].setAttribute("class", itemsSorted[i].getAttribute("class") + " conditiongood");
		itemsSorted[i].parentNode = items[i].parentNode;
		
		var desc = itemsSorted[i].getElementsByClassName("desc")[0].innerHTML;
		var a = desc.indexOf("Number: ");
		var count = desc.slice(desc.indexOf("<strong>", a) + 8, desc.indexOf("</strong>", a)).replace(",", "").replace(".", "");
		itemCount[itemId] += parseInt(count);
		categoryCount[getCategoryById(itemId)] += parseInt(count);
		
		if(itemId == "0")
		{
			var name = items[i].getElementsByClassName("header")[0].getElementsByClassName("name")[0].innerHTML;
			var origin = "<i>" + itemOrigin["place"][itemOrigin["good"].indexOf(name)] + "</i>";
			if(pageIs(cPageFaction))
				origin = "<br/>" + origin;
			itemsSorted[i].getElementsByClassName("desc")[0].innerHTML += origin;
		}
	}
	
	if(pageIs(cPageTowncenter))
	{
		var table = document.getElementsByClassName("towncenter")[0];
		var trs = table.getElementsByTagName("tr");
		for(var i = 0; i < trs.length; i++)
		{
			var tds = trs[i].getElementsByTagName("td");
			if(tds.length > 9)
			{
				var or = itemOrigin["place"][itemOrigin["good"].indexOf(tds[4].innerHTML.trim())];
				if("" + or != "undefined")
					tds[4].innerHTML += "<br><i>(" + or + ")</i>"
				if(tds[9].innerHTML == strategusUsername)
					trs[i].setAttribute("class", trs[i].getAttribute("class") + " myown");
				if(parseFloat(tds[6].innerHTML.replace(",", "")) < parseFloat(tds[5].innerHTML))
					trs[i].setAttribute("class", trs[i].getAttribute("class") + " cheap");
				if(parseFloat(tds[8].innerHTML.replace(",", "")) < parseFloat(tds[5].innerHTML))
					trs[i].setAttribute("class", trs[i].getAttribute("class") + " cheaper");
			}
		}
	}		
	
	if(pageIs(cPageInventory) || pageIs(cPageFaction))
	{
		sortItems();
	}
	
	if(pageIs(cPageShop))
	{
		addShopTabAll();
		addShopItemConditionSelect();
		updateShopView();
	}
	
	if(pageIs(cPageShop) || pageIs(cPageInventory) || pageIs(cPageFaction))
	{
		addItemEvents();
	}
	
	if(pageIs(cPageShopAll))
		showAllItems();
	
	if(pageIs(cPageInventory))
		addInventoryOverView();
}

sortedInventoryMain();
