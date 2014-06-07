// ==UserScript==
// @name           Max Defense
// @description    Enhances Dark Throne Attack List and Profiles
// @include        http://www.darkthrone.com/userlist/*
// @include	   http://www.darkthrone.com/viewprofile/index/*
// @include        *darkthrone.com/userlist/*
// @include	   *darkthrone.com/viewprofile/index/*
// @author	   De KERK !!!
// @author	   Je moeder
// ==/UserScript==

var stats = new Array(24);
stats[0] = new Array(1, 74);
stats[1] = new Array(5, 91);
stats[2] = new Array(10, 91);
stats[3] = new Array(15, 91);
stats[4] = new Array(20, 162);
stats[5] = new Array(25, 162);
stats[6] = new Array(30, 162);
stats[7] = new Array(35, 162);
stats[8] = new Array(40, 305);
stats[9] = new Array(45, 305);
stats[10] = new Array(50, 335);
stats[11] = new Array(55, 335);
stats[12] = new Array(60, 335);
stats[13] = new Array(65, 335);
stats[14] = new Array(70, 335);
stats[15] = new Array(75, 335);
stats[16] = new Array(80, 335);
stats[17] = new Array(85, 335);
stats[18] = new Array(90, 385);
stats[19] = new Array(95, 385);
stats[20] = new Array(100, 385);
stats[21] = new Array(105, 385);
stats[22] = new Array(110, 385);
stats[23] = new Array(115, 385);

var allys = new Array("IC", "Incinerators", "Dark Force Alliance", "DFA", "The Great Elves", "TGE", "Vampyric Legion", "VL");

var page = document.URL.substr(document.URL.lastIndexOf(".com/") + 5);

if (page.indexOf("/") > 0) {
	page = page.substr(0, page.indexOf("/"));
}

switch (page) {
	case "userlist": {
		populate_userlist_page();
	}
	break;
	case "viewprofile": {
		populate_viewprofile_page();
	}
	break;
}

function populate_userlist_page() {
	var userTable = document.getElementById("user_list");
	
	modify_userlist_page(userTable);
	
	var trElements = userTable.getElementsByTagName("tr");

	trElements[0].getElementsByTagName("th")[6].innerHTML = "MAX Defense";

	for (var i = 1; i < trElements.length; i++) {
		var tdElements = trElements[i].getElementsByTagName("td");
	
		table_cell_fill(trElements[i], 6, calc_max_defense(tdElements[4].textContent, tdElements[3].textContent));
	}
}

function populate_viewprofile_page() {
	var statsTable = document.getElementById("statistics");
	
	modify_viewprofile_page(statsTable);
	
	var trElements = statsTable.getElementsByTagName("tr");
	
	table_cell_fill(trElements[trElements.length - 1], 0, "MAX Defense");
	
	var army = trElements[2].getElementsByTagName("td")[1].textContent;
	var level = document.getElementsByClassName("level")[0].lastChild.textContent;
	
	table_cell_fill(trElements[trElements.length - 1], 1, calc_max_defense(level, army));
	
	if (!validate_attack_target(document.getElementById("comments_width_div"))) {
		var otrElements = document.getElementById("orders").getElementsByTagName("tr");
		
		otrElements[3].getElementsByTagName("a")[0].setAttribute("href", "");
		otrElements[3].getElementsByTagName("a")[0].setAttribute("style", "text-decoration: line-through;");
		
		otrElements[5].getElementsByTagName("a")[0].setAttribute("href", "");
		otrElements[5].getElementsByTagName("a")[0].setAttribute("style", "text-decoration: line-through;");
	}
}

function modify_viewprofile_page(tElement) {
	table_add_rows(tElement, 1, 2);
}

function modify_userlist_page(tElement) {
	table_add_columns(tElement, 1);
	
	add_element_to_parent(tElement, "col", 1);
	
	modify_tag_attribute(tElement, "col", "style", "");
}

function table_add_columns(tElement, cols) {
	var trElements = tElement.getElementsByTagName("tr");
	
	for (var i = 0; i < trElements.length; i++) {
		var nName = trElements[i].cells[0].nodeName;
		
		for (var c = 0; c < cols; c++) {
			trElements[i].appendChild(document.createElement(nName));
		}
	}
}

function table_add_rows(tElement, rows, cols) {
	tElement = tElement.getElementsByTagName("tr")[0].parentNode;

	for (var i = 0; i < rows; i++) {
		var trElement = document.createElement("tr");
		
		for (var c = 0; c < cols; c++) {
			trElement.appendChild(document.createElement("td"));
		}
		
		tElement.appendChild(trElement);
	}
}

function add_element_to_parent(rElement, tName, count) {
	var parent = rElement.getElementsByTagName(tName)[0].parentNode;
	
	for (var i = 0; i < count; i++) {
		parent.appendChild(document.createElement(tName));
	}
}

function modify_tag_attribute(rElement, tName, aKey, aValue) {
	var tElements = rElement.getElementsByTagName(tName);

	if (aValue === "") {
		var colSize = 0;
		var modSize = 8;
		
		for (var i = 0; i < tElements.length - 1; i++) {
			var att = tElements[i].getAttribute(aKey);
			
			att = att.substr(att.indexOf(" ") + 1, 2);
			
			colSize += att % modSize;
			
			tElements[i].setAttribute(aKey, "width: " + Math.floor(att / modSize) * modSize + "%");
		}
		
		tElements[tElements.length - 1].setAttribute(aKey, "width: " + colSize + "%");
	}
	else {
		for (var i = 0; i < tElements.length; i++) {
			tElements[i].setAttribute(aKey, aValue);
		}
	}
}

function table_cell_fill(trElement, col, aValue) {
	var tdElements = trElement.getElementsByTagName("td");
	
	tdElements[col].innerHTML = aValue;
}

function calc_max_defense(level, army) {
	var dpp = 0; //defense per person
	var dpw = 0; //defense per weapens person
	var fb = 0; //fort bonus
	var rb = 0.05; //race bonus
	var cb = 0.05; //class bonus
	var defense = 0; //max defence
	var bdp = 0; //bonus defense percent
	var BU = 0;
	var rest = 0;
	var amorybonus = 0;

	if(army == 0){
		return 0;
	}

	army = army.replace(",", "");
	
	fb = (level - (level % 5)) /100 ;

	if(level < 15 )			{dpw = 71;}  	/* Initial Armory     */
	if(level < 40 && level > 14)	{dpw = 124;}	/* Leather Armory 1   */
	if(level < 60 && level > 39)	{dpw = 285;}	/* Leather Armory 2   */
	if(level < 80 && level > 59)	{dpw = 570;}	/* Chainmail Armory 1 */
	if(level < 100 && level > 79)	{dpw = 855;}	/* Chainmail Armory 2 */
	if(level < 120 && level > 99)	{dpw = 1140;}	/* Chainmail Armory 3 */
	if(level < 140 && level > 119)	{dpw = 285;}	/* Plate Armory 1     */
	if(level > 139)			{dpw = 1710;}	/* Plate Armory 2     */
	
	if(level < 10)			{dpp = 3;}
	if(level < 50 && level >9)	{dpp = 20;}
	if(level < 90 && level >49)	{dpp = 50;}
	if(level > 89)			{dpp = 100;}

	if(level > 24)	{BU = (army * 200);}
	if(level > 74)	{BU = BU + ((army - army %10) * 500);}
	if(level > 104)	{BU = BU + ((army - army %10) * 2000);}

	defense = (dpw * army) + (dpp * army) + BU ;

	defense = defense * (0.10 + fb + (level / 100)) + defense ;	
	
	
	return format_number_commas(Math.round(defense));
}

function format_number_commas(value) {
	value = String(value);
	
	var format = "";
	
	if (value < 9999) {
		return value;
	}
	
	var index = (value.length % 3 == 0) ? 3 : value.length % 3;
	
	format += value.substr(0, index);
	
	for (var i =0, count = Math.floor((value.length - index) / 3); i < count; i++, index += 3) {
		format += ",";
		
		format += value.substr(index, 3);
	}
	
	return format;
}

function validate_attack_target(cElement) {
	var text = cElement.textContent;
	
	for (var i = 0; i < allys.length; i++) {
		if (text.indexOf(allys[i]) > 0) {
			return false;
		}
	}
	
	return true;
}