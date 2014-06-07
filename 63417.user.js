// ==UserScript==
// @name           [DTE] Attack List
// @description    Enhances Dark Throne Attack List and Profiles
// @include        http://www.darkthrone.com/userlist/*
// @include		   http://www.darkthrone.com/viewprofile/index/*
// @author		   theZero
// @author		   zerovolcom87@gmail.com
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

	trElements[0].getElementsByTagName("th")[6].innerHTML = "Max Defense";

	for (var i = 1; i < trElements.length; i++) {
		var tdElements = trElements[i].getElementsByTagName("td");
	
		table_cell_fill(trElements[i], 6, calc_max_defense(tdElements[4].textContent, tdElements[3].textContent));
	}
}

function populate_viewprofile_page() {
	var statsTable = document.getElementById("statistics");
	
	modify_viewprofile_page(statsTable);
	
	var trElements = statsTable.getElementsByTagName("tr");
	
	table_cell_fill(trElements[trElements.length - 1], 0, "Max Defense");
	
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
	var fb = 0; //fort bonus
	var rb = 0.05; //race bonus
	var cb = 0.05; //class bonus
	var defense = 0;
	var bdp = 0; //bonus defense percent
	
	if (army == 0) {
		return 0;
	}
	
	for (var i = 0; i < stats.length; i++) {
		if (level < 5) {
			dpp = stats[i][1];
			
			break;
		}
		else if (level >= stats[i][0] && level < stats[i+1][0]) {
			dpp = stats[i][1];
			
			fb = stats[i][0] / 100;
			
			break;
		}
	}
	
	army = army.replace(",", "");
	
	defense = army * dpp;

	bdp = fb + rb + cb;
	
	defense += defense * bdp;
	
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
