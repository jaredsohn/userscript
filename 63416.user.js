// ==UserScript==
// @name           [DTE] Overview
// @description    Enhances Dark Throne overview page
// @include        http://www.darkthrone.com/overview*
// @include		   http://www.darkthrone.com/training*
// @author		   theZero
// @author		   zerovolcom87@gmail.com
// ==/UserScript==

var page = document.URL.substr(document.URL.indexOf(".com/") + 5);

if (page.indexOf("?") > 0) {
	page = page.substr(0, page.indexOf("?"));
}

switch (page) {
	case "overview": {
		window.addEventListener("unload", page_unload_handler, false);
		
		populate_overview_page();
		
		document.getElementById("planner").value = GM_getValue("overview_text");
	}
	break;
	case "training": {
		populate_training_page();
	}
	break;
}

function populate_overview_page() {
	var statsTable = document.getElementsByClassName("section table")[0];
	
	modify_overview_page(statsTable);
	
	table_cell_fill(statsTable, 0, 4, "Population");
	
	table_cell_fill(statsTable, 0, 5, find_available_citizens());
	
	var trainCitizensBtn = document.createElement("button");
	
	trainCitizensBtn.addEventListener("click", button_click_handler, false);
	
	trainCitizensBtn.appendChild(document.createTextNode("Train Citizens"));
	
	table_cell_fill(statsTable, 1, 5, trainCitizensBtn);
	
	table_cell_fill(statsTable, 2, 4, "Gold Per Day");
	
	table_cell_fill(statsTable, 2, 5, find_estimated_gold_per_day());
}

function populate_training_page() {
	var avail_cit = GM_getValue("avail_citizens");
	
	document.getElementById("qty_c2").value = avail_cit;
	
	GM_setValue("avail_citizens", 0);
}

function modify_overview_page(rElement) {
	table_add_columns(rElement, 2);
	
	add_element_to_parent(rElement, "col", 2);
	
	modify_tag_attribute(rElement, "col", "width", "16.666666666666666666666666666667%");

	var liElement = document.createElement("li");
	
	liElement.className = "section";
	
	liElement.appendChild(document.createElement("h3"));
	
	liElement.appendChild(document.createElement("p"));
	
	liElement.getElementsByTagName("h3")[0].innerHTML = "Planner";
	
	liElement.getElementsByTagName("p")[0].appendChild(document.createElement("textarea"));
	
	liElement.getElementsByTagName("textarea")[0].rows = 20;
	
	liElement.getElementsByTagName("textarea")[0].id = "planner";
	
	var style = document.createElement("style");
	
	style.type = "text/css";
	
	style.innerHTML = "textarea { width:100% }";
	
	liElement.getElementsByTagName("textarea")[0].appendChild(style);
	
	list_add_item(document.getElementsByTagName("ul")[7], liElement, 0);
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

function modify_tag_attribute(rElement, tName, aKey, aValue) {
	var tElements = document.getElementsByTagName(tName);
	
	for (var i = 0; i < tElements.length; i++) {
		tElements[i].setAttribute(aKey, aValue);
	}
}

function add_element_to_parent(rElement, tName, count) {
	var parent = rElement.getElementsByTagName(tName)[0].parentNode;
	
	for (var i = 0; i < count; i++) {
		parent.appendChild(document.createElement(tName));
	}
}

function list_add_item(ulElement, aElement, index) {
	ulElement.insertBefore(aElement, ulElement.getElementsByTagName("li")[2]);
}

function page_unload_handler() {
	var text = document.getElementById("planner").value;
	
	GM_setValue("overview_text", text);
}

function table_cell_fill(tElement, rIndex, cIndex, vElement) {	
	if (vElement.type == "submit") {
		tElement.getElementsByTagName("tr")[rIndex].getElementsByTagName("td")[cIndex].appendChild(vElement);
	}
	else {
		tElement.getElementsByTagName("tr")[rIndex].getElementsByTagName("td")[cIndex].innerHTML = vElement;
	}
}

function find_available_citizens() {
	var avail_citizens = document.getElementsByClassName("sbl-stats")[0].innerHTML.split("<br>")[1].split(" ")[4];
	
	GM_setValue("avail_citizens", avail_citizens);
	
	return format_number_commas(avail_citizens);
}

function find_estimated_gold_per_day() {
	var gpt = document.getElementsByClassName("section table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[3].innerHTML;
	
	gpt = gpt.replace(",", "");
	
	return format_number_commas(gpt * 48);
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

function button_click_handler() {
	var form = document.createElement("form");
	
	form.display = "none";
	
	document.getElementsByClassName("section table")[0].appendChild(form);
	
	form.method = "POST";
	
	form.action = "http://www.darkthrone.com/training";
	
	form.submit();
}
