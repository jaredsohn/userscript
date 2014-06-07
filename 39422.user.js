// Greasemonkey script: Craigslist Hide-a-Neighborhood (1.0.3)
// Copyright (c) 2008, Justin Woolley
// Portions of code reused from: Greasemonkey script: craigslist pic-only filter (1.0)
// Copyright (c) 2006, Joseph Purcell
// Released under the GNU General Public Licence.

// ==UserScript==
// @name                Craigslist Hide-a-Neighborhood
// @author		Justin Woolley
// @namespace		http://www.pseudochaos.org
// @description         Filters out entries from specific neighborhoods when searching craigslist
// @include             http://*.craigslist.org/*
// @date		2008-29-12
// @version		1.0.3
// ==/UserScript==

var NEIGHBORHOOD_COOKIE_NAME = "filterNeighborhoods";
var DISPLAY_COOKIE_NAME = "showInterface";
var DAYS_TO_EXPIRE = 60;
var DIV_COLOR = "#ddb";
var SPAN_WIDTH = 200;
var OPEN_TOGGLE_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANBSURBVHjaYvz//z8DNsAu4ikNpBKA2BWIVYAYxH8KxHeAeDcQL/j5ZvtTbHoBAogR3VCgYYpAKgeIixgIgz4gngI0/D6yIEAAoRgKNBDksvkwfnZ2EIONjS6DvLwEg4SEEMOLF+8YHj58wXDkyGWGqVPXIZuTCDR4AYwDEEBwQ5ENTEz0YiguDmfg4uLA6cRv334w9PauZJg/fxuGwQABBDYUaKAckP0QJJCXF8JQUBDKQCyYMGE1w6RJa2BceaDBjwACiAnKAYdfQoInQ35+CAPIImIxSD1IH7I5AAHEyCbsAYrVJyDO2fNzGXh5uRhIBZ8/f2MwNkyGuxYggFiARBqIlQv0NhcXJ8Pfv/8Z/v37z7Bh6QGGv3/+MbBzsKIYAIqBb19+MOibqTJo6SuCxUD6QPonQ4IhGSCAQIY6gVgmZpoMf/7+QyQLZiYGBXERBj0DJQYmJia4+Pv3nxk2bDjKIKMgjqIepB8KnAACiAWasBkkJUUZfv3+C1fk4GXKcGzbWQYhYT4GYSAGgT9//jK8evmeQVlbjoGFnRVFPUg/FKgABBDICULgJMXJwfDz1184BjqPgVuMn+HypXsMv3//Aat+9/YTw8nTNxkMrLRQ1IIwSD8UCAEEEMjQdyDWqzefGL7//IuC1fSVGU6eucXw4vk7hp8/fzNcOH+HQQTo7Z+//2GoBemHgncAAQQy9CaIdffOM4YfP/9gYEWgwadP3QTKP2U4feEeg4yKNFZ1IP1QcBMggEBhugOI7U8ev8Kgoq6EkVx4hQQYDh29xnDp4l0GDRt9hu8//mJNViD9ULADIIBALl0GYq1fvYvh/YevQE1/MLC2hQ7Df25uBjZuLqzyIH0g/VCwDCCAmEDZCsiYCOKtWLwF6JW/GJiJjZ1B3VQbqxwIg/RBwUSQeQABxALjAHH+3h2HgYmdg8E70I3o3LR1/S4GkD4kcxgAAgicqqHlYSKIvW3DboZ1yzcz/PzxE69hIHmQOpB6pFIKXK4CBBDe8tTDz5lBQ1uNQRyYsPn4eRk+ffzM8PL5a4YbV28x7Ni0F2d5ChBAuEr+fCgmBCZCwxGl5AcIIEYi6yh1IJYA4hfQdI23jgIIMACEf89x28+h8gAAAABJRU5ErkJggg==";
var CLOSED_TOGGLE_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANjSURBVHjaYvz//z8DNsAu4ikNpBKA2BWIVYAYxH8KxHeAeDcQL/j5ZvtTbHoBAogR3VCgYYpAKgeIixgIgz4gngI0/D6yIEAAoRgKNBDksvkwfnZ2EIONjS6DvLwEg4SEEMOLF+8YHj58wXDkyGWGqVPXIZuTCDR4AYwDEEBwQ5ENTEz0YiguDmfg4uLA6cRv334w9PauZJg/fxuGwQABBDYUaKAckP0QJJCXF8JQUBDKQCyYMGE1w6RJa2BceaDBjwACiAnKAYdfQoInQ35+CAPIImIxSD1IH7I5AAHEyCbsAYrVJyDO2fNzGXh5ueCuOHXkGoOukTIDJxc7Xtd+/vyNwdgwGe5agABiZuZSKQEy7HOB3ray1mMABTEMb1x2iOH2xUcMHz5+ZZCWFwfrQJaHYVZWVgYmJkaGUyevge0ACCAWIOEEYpmYaTL8+fsPxQWSUsIMLk6GDB8/fGXYsPAAg4axIoOathxW14L0Q4ETQACxQBM2g6SkKMOv339RFIKsEBDgYVBTl2VQUpZkOHf2NsP6RQcYzJ10GUTEBVAdANQPBSoAAQQyVAicpDg5GH7+QjP0HyS5sbAwM4gD06mTixGDHDAYVq84wCAoI8Tg4GWKSOOc8OQnBBBAIEPfAbHEqzefGISE+FEM/fsPkTH+/PnL8PbNR4bbt54wMHKyMWibajB8/4lwxLt3n+BMgAACGXoTZOjdO88YuPS5MVz6FxjOb4CGXb3ygOHYyRsMSvrKDPb+VmD5Hz//wNWC9EPBTYAAAhm6AxT7J49fYVBRV0Ix9OuXnwyXL91nuHv/OcN/Li4GA2cTsPj3H38xIgqkHwp2AAQQKJ3Cc9PspZ0MHByINLl/7QEGfmF+Bl0rXQZWNhac6fTHj58MqdHl8HQKEEBMoGwFZEwE8VYs3gL00l84NvOwYtCy1GP4+58RRRwdg/RBwUSQeQABBLMeZGj+3h2HGdg5OBi8A91g5Q3D39//8Oamret3MYD0IZnDABBA4LwPLQ8TQextG3YzrFu+meEn0Ev4AEgepA6kHqmUAperAAGEtzz18HNm0NBWYxAHJmw+fl6GTx8/M7x8/prhxtVbDDs27cVZngIEEK6SPx+KCYGJ0HBEKfkBAoiRyDpKHZSWgfgFNF3jraMAAgwAD8J7X+O/0w0AAAAASUVORK5CYII=";
var TOGGLE_OPEN_ALT_TEXT = "Hide Neighborhood Filter";
var TOGGLE_CLOSED_ALT_TEXT = "Show Neighborhood Filter";		
	
var openToggleImage;
var closedToggleImage;

var isListingsPage = false;
var numHiddenListings = 0;

//===BEGIN FUNCTIONS===

//returns an array of exluded neighborhoods, based unchecked on checkbox state
document.getBlacklist = function(event){
	var blacklist = new Array();
	var checkboxArray = document.getElementsByName("nbchbx");

	for (var i = 0; i < checkboxArray.length; i++) {
		if (!checkboxArray[i].checked){
			blacklist.push(checkboxArray[i].value);	
		}
	}
	return blacklist;
}

document.getPath = function(){
	var domain = "http://" + document.domain;
	return document.location.href.substring(domain.length).split("?")[0];
}

document.getCookie = function(cookieName) {
	var results = document.cookie.match("(^|;) ?" + cookieName + "=([^;]*)(;|$)");
	if (results) {
		return unescape(results[2]);
	}
    return results;
}

document.getCookieExpiration = function() {
	var expDate=new Date();
	expDate.setDate(expDate.getDate()+ DAYS_TO_EXPIRE);
	return expDate.toGMTString();	
}
document.setNeighborhoodCookie = function(){
	document.cookie = NEIGHBORHOOD_COOKIE_NAME + "="  + document.getBlacklist().toString()
		+ "; expires=" + document.getCookieExpiration() + "; path=" + document.getPath();
}

document.setDisplayCookie = function(show){
	var value = show ? "1" : "0";
	document.cookie = DISPLAY_COOKIE_NAME + "=" + value
	+ "; expires=" + document.getCookieExpiration() + "; path=" + document.getPath();
}

document.applyCookie = function(cookieName){
	var entries = document.getCookie(NEIGHBORHOOD_COOKIE_NAME).split(",");
	var checkboxArray = document.getElementsByName("nbchbx");

	for (var i = 0; i < entries.length; i++) {
		for (var j = 0; j < checkboxArray.length; j++) {
			if (entries[i].toLowerCase() == checkboxArray[j].value.toLowerCase()) {
				checkboxArray[j].checked = false;
			}
		}
	}
	document.filterNeighborhood(document.getBlacklist());
}

//returns the neighborhood value from the enclosing font element
document.getNeighborhoodValue = function (fontElem) {
	var list1 = fontElem.innerHTML.split("("), value; 
	
	if (list1.length > 1) {
		value = list1[1].split(")")[0];
	}
	return value;
}

//removes entries in excluded neighborhoods from the listing
document.filterNeighborhood = function (blacklist) {
	var ps = document.getElementsByTagName("p"), neighborhood, hide;
	numHiddenListings = 0;
	for ( i = 0; i < ps.length; i++)
	{
		fontElem = ps[i].getElementsByTagName("font")[0];
		nxt  = ps[i].innerHTML.indexOf("next 100 postings");
		if ((!fontElem) && (nxt == -1)) {
				ps[i].style.display = "block";
		}		
		else {
			
			if (fontElem) {
				hide = false;
				neighborhood = document.getNeighborhoodValue(fontElem);

				for (var j = 0; j < blacklist.length && !hide; j++) {		
					hide = (neighborhood.toLowerCase() == blacklist[j].toLowerCase());
				}
				
				if (hide) {
					ps[i].style.display = "none";
					numHiddenListings++;
				}
				else {
					ps[i].style.display = "block";
				}
			}
		}	
	}
}

/* This was split out from the handler so we can do it on page load as well */
document.toggleDisplay = function () {
	if (filterDiv.style.display == "none") {
		filterDiv.style.display = "block";
		document.getElementById("toggleLink").removeChild(closedToggleImage);
		document.getElementById("toggleLink").appendChild(openToggleImage);
	}
	else {
		filterDiv.style.display = "none";
		document.getElementById("toggleLink").removeChild(openToggleImage);
		document.getElementById("toggleLink").appendChild(closedToggleImage);
	}

	return true;
}

document.toggleHandler = function (event) {
	if (filterDiv.style.display == "none") {
		document.setDisplayCookie(true);
	}
	else {
		document.setDisplayCookie(false);
	}
	document.toggleDisplay();
	return true;
}

document.neighborhoodCheckboxHandler = function (event) {
	var stateChange;

	if (event.target.checked) {
		stateChange = "checked";
	}
	else {
		stateChange = "unchecked";
	}
	document.filterNeighborhood(document.getBlacklist());
	document.setNeighborhoodCookie();
}

document.saveHandler = function (event) {
	document.filterNeighborhood(document.getBlacklist());
	document.setNeighborhoodCookie();
}

document.selectAllHandler = function (event) {
	var numEntries = 0;
	var checkboxArray = document.getElementsByName("nbchbx");
	
	for (var i = 0; i < checkboxArray.length; i++) {
		checkboxArray[i].checked = true;
		numEntries++;
	}
	
	document.filterNeighborhood(document.getBlacklist());
	document.setNeighborhoodCookie();
}

document.deselectAllHandler = function (event) {
	var numEntries = 0;	
	var checkboxArray = document.getElementsByName("nbchbx");

	
	for (var i = 0; i < checkboxArray.length; i++) {
		checkboxArray[i].checked = false;
		numEntries++;
	}
	
	document.filterNeighborhood(document.getBlacklist());
	document.setNeighborhoodCookie();	
}

document.cookieHandler = function(event){
	alert(document.getCookie(NEIGHBORHOOD_COOKIE_NAME));
}

function createTable(numRows, numCols) {
	var table = document.createElement("table");
	
	for (var i = 0; i < numRows; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < numCols; j++) {
			row.insertCell(0);
		}
	}
	return table;
}

function createNeighborhoodCheckboxSpan(val, lbl, checked) {
	var span = document.createElement("span");
	span.setAttribute("style", "display:inline-block; padding: 2px; width:auto");
	span.setAttribute("name", "nbhdspan");
	
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.name = "nbchbx";
	checkbox.id = val;
	checkbox.value = val;
	checkbox.checked = checked;
	checkbox.addEventListener("click", document.neighborhoodCheckboxHandler, true);
	span.appendChild(checkbox);
	
	var label = document.createElement("label");
	label.setAttribute("for", checkbox.id);
	label.setAttribute("style", "font-size:small; vertical-align:text-top");
	label.appendChild(document.createTextNode(lbl));	
	span.appendChild(label);	
	
	return span;
}

function createOptionButtons() {
	var table = createTable(1, 2);
	
	var selectAllButton = document.createElement("button");
	selectAllButton.name = "selectAll";
	selectAllButton.width = 30;
	selectAllButton.height = 15;
	var btext = document.createTextNode("Select All");
	selectAllButton.appendChild(btext);
	selectAllButton.addEventListener("click", document.selectAllHandler, true);
	table.rows[0].cells[0].appendChild(selectAllButton);
	
	var deselectAllButton = document.createElement("button");
	deselectAllButton.name = "deselectAll";
	deselectAllButton.width = 30;
	deselectAllButton.height = 15;
	var btext2 = document.createTextNode("Deselect All");
	deselectAllButton.appendChild(btext2);
	deselectAllButton.addEventListener("click", document.deselectAllHandler, true);
	table.rows[0].cells[1].appendChild(deselectAllButton);
	
	return table;
}

//expand all spans to the same width
function resizeNeighborhoodSpans(spanList) {
	for (var i = 0; i < spanList.length; i++) {
		spanList[i].style.width =  SPAN_WIDTH;
	}
}

function createFilterDiv() {
	var neighborhoodList =  document.getElementsByName("neighborhood")[0].options;
	var filterDiv = document.createElement("div");
	filterDiv.id = "filterdiv";
	filterDiv.style.width = "95%";
	filterDiv.style.display = "none";	

	var span;
	var label;
	var n1;
	
	//skipping "all neigborhoods" at index 0
	for (var i = 1; i < neighborhoodList.length; i++) {
		n1 = neighborhoodList[i].innerHTML;
		span = createNeighborhoodCheckboxSpan(n1, n1, true);
		filterDiv.appendChild(span);
	}
	filterDiv.appendChild(createOptionButtons());
	filterDiv.style.backgroundColor = "#eee";
	
	return filterDiv;
}

function createToggleImages() {
	openToggleImage = document.createElement("img");
	openToggleImage.setAttribute("src", OPEN_TOGGLE_SRC);
	openToggleImage.setAttribute("id", "openToggleImg");
	openToggleImage.setAttribute("alt", TOGGLE_OPEN_ALT_TEXT);
	openToggleImage.setAttribute("title", TOGGLE_OPEN_ALT_TEXT);
	openToggleImage.style.border = "none";
	openToggleImage.style.verticalAlign = "bottom";
			
	closedToggleImage = document.createElement("img")
	closedToggleImage.setAttribute("src", CLOSED_TOGGLE_SRC);
	closedToggleImage.setAttribute("id", "closedToggleImg");
	closedToggleImage.setAttribute("alt", TOGGLE_CLOSED_ALT_TEXT);
	closedToggleImage.setAttribute("title", TOGGLE_CLOSED_ALT_TEXT);
	closedToggleImage.style.border = "none";
	closedToggleImage.style.verticalAlign = "bottom";
}

function createToggleTd() {
	var toggle = document.createElement("a");
	toggle.id = "toggleLink";
	toggle.href = "#";
	toggle.style.outline = "none";
	toggle.appendChild(closedToggleImage);
	toggle.addEventListener("click", document.toggleHandler, true);
	
	return toggle;
}
//===END FUNCTIONS===

//===BEGIN SCRIPT EXECUTION===
// Make sure we've got a listings search results page with neighborhoods
isListingsPage = document.location.href.indexOf("search") > 0 &&
document.getElementsByName("neighborhood").length > 0;

if (isListingsPage) {	
	var filterDiv = createFilterDiv();
	document.getElementsByTagName("blockquote")[0].appendChild(filterDiv);
	resizeNeighborhoodSpans(document.getElementsByName("nbhdspan"));
	createToggleImages();
	
	var buttonDiv = document.createElement("span");
	buttonDiv.appendChild(createToggleTd());
	buttonDiv.style.textAlign = "left";
	
	var spacerSpan = document.createElement("span");
	spacerSpan.style.width = "100%";
	spacerSpan.style.paddingRight = "10px";

	var neighborhoodSelect = document.getElementsByName("neighborhood")[0];
	neighborhoodSelect.parentNode.insertBefore(buttonDiv, neighborhoodSelect.nextSibling);
	buttonDiv.parentNode.insertBefore(spacerSpan, buttonDiv);
	document.applyCookie();
	
	var showNeighborhoodUi = document.getCookie(DISPLAY_COOKIE_NAME);
	if ((showNeighborhoodUi.length > 0) && (showNeighborhoodUi == "1")) {
		document.toggleDisplay();	
	}
} 
//===END SCRIPT EXECUTION===