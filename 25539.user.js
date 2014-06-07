// ==UserScript==
// @author      Ben
// @namespace	http://userscripts.org/
// @name		Travian Sort Villages
// @description	Allow to sort your Villages
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.3
// ==/UserScript==
// Altough the word cookie appears troughout the code, no cookie is used anymore.
// Instead I use GM_setValue and GM_getValue to store the persistent data localy. 

function getCookie(c_name) {

	c_name = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + c_name;
	return GM_getValue(c_name);

}

function setCookie(c_name, value, expiredays) {

	c_name = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + c_name;
	GM_setValue(c_name, value);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var villageHtmlTable = document.evaluate("//div[@id='lright1']/table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var cookieTable;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateVillageTbodyTable() {

	var villageNumber = this.id.split(";")[0];
	var direction = this.id.split(";")[1];

	var position = 0;
	var found = false;
	var i;
	for (i = 0; i < cookieTable.length && !found; ++i) {
		if (cookieTable[i][0] == villageNumber) {
			position = cookieTable[i][1];
			found = true;
		}
	}

	if (direction == "up") {
		var found = false;
		var j;

		for (j = 0; j < cookieTable.length && !found; ++j) {
			if (cookieTable[j][1] == (position - 1)) {

				found = true;
			}
		}

		if (found) {

			villageHtmlTable.firstChild.insertBefore(villageHtmlTable.firstChild.childNodes[position], villageHtmlTable.firstChild.childNodes[position - 1]);

			cookieTable[j - 1][1]++;
			cookieTable[i - 1][1]--;

			writeCookie();

		}

	} else {

		var found = false;
		var j;
		for (j = 0; j < cookieTable.length && !found; ++j) {
			if (cookieTable[j][1] == (position + 1)) {

				found = true;
			}
		}
		if (found) {

			villageHtmlTable.firstChild.insertBefore(villageHtmlTable.firstChild.childNodes[position], villageHtmlTable.firstChild.childNodes[position + 1].nextSibling);

			cookieTable[j - 1][1]--;
			cookieTable[i - 1][1]++;

			writeCookie();
		}

	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fillCookieTable(cookieValue) {

	cookieValues = cookieValue.split(";");

	for (var i = 0; cookieValues[i]; ++i) {
		var villageNumber = cookieValues[i].split("=")[0];
		var villagePosition = parseInt(cookieValues[i].split("=")[1]);
		cookieTable[villagePosition] = new Array();
		cookieTable[villagePosition][0] = villageNumber;
		cookieTable[villagePosition][1] = villagePosition;
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function writeCookie() {
	var cookieValue = "";
	var separator = "";
	for (var k = 0; k < cookieTable.length; ++k) {
		cookieValue = cookieValue + separator + cookieTable[k][0] + "=" + cookieTable[k][1];
		separator = ";";
	}

	setCookie("traviansortvillages", cookieValue, 30);

}

function cleanCookie() {
	var response = confirm("Are you sure you want to delete the stored order of your villages ?");
	if (response) setCookie("traviansortvillages", "", 30);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createOrderedVillageTbodyTable(villageHtmlTbody) {

	var orderedVillageTbodyTable = new Array();

	for (var villageHtmlTableLine = villageHtmlTbody.firstChild; villageHtmlTableLine; villageHtmlTableLine = villageHtmlTableLine.nextSibling) {

		var villageNumber = villageHtmlTableLine.firstChild.getElementsByTagName('a')[0].href.split("=")[1].split("&")[0];

		var position = 0;
		var found = false;
		var i;

		for (i = 0; i < cookieTable.length && !found; ++i) {
			if (cookieTable[i][0] == villageNumber) {
				position = cookieTable[i][1];
				found = true;
			} else {
				position = i + 1;
			}

		}

		if (!found) {
			cookieTable[i] = new Array();
			cookieTable[i][0] = villageNumber;
			cookieTable[i][1] = position;
		}

		orderedVillageTbodyTable[position] = villageHtmlTableLine;

		var upLinkCell = document.createElement('td');

		var upLink = document.createElement('img');
		upLink.src = 'data:image/gif;base64,R0lGODlhDQAMAIAAAJqamv%2F%2F%2FyH5BAAAAP8ALAAAAAANAAwAAAITjI%2Bpi8AH4ot00Zuubrq%2BD4ZgAQA7';
		upLink.id = villageNumber + ";up";
		upLink.style.cursor = 'pointer';

		upLink.addEventListener("click", updateVillageTbodyTable, true);
		upLinkCell.appendChild(upLink);

		var downLinkCell = document.createElement('td');

		var downLink = document.createElement('img');
		downLink.src = 'data:image/gif;base64,R0lGODlhDQAMAIAAAP%2F%2F%2F5qamiH5BAAAAAAALAAAAAANAAwAAAIShI%2Bpy90BY0SypgqXZdMFB4IFADs%3D';
		downLink.id = villageNumber + ";down";
		downLink.style.cursor = 'pointer';

		downLink.addEventListener("click", updateVillageTbodyTable, true);
		downLinkCell.appendChild(downLink);

		orderedVillageTbodyTable[position].insertBefore(downLinkCell, orderedVillageTbodyTable[position].firstChild);
		orderedVillageTbodyTable[position].insertBefore(upLinkCell, downLinkCell);

	}

	return orderedVillageTbodyTable;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

GM_registerMenuCommand("Travian Sort Village erase persistent data", cleanCookie);

if (villageHtmlTable) {

	var cookie = getCookie('traviansortvillages');

	cookieTable = new Array();

	if (cookie) {
		fillCookieTable(cookie);
	}

	var orderedVillageTbodyTable = createOrderedVillageTbodyTable(villageHtmlTable.firstChild);

	var orderedVillageTbody = document.createElement('tbody');

	for (var j = 0; j < orderedVillageTbodyTable.length; ++j) {
		orderedVillageTbody.appendChild(orderedVillageTbodyTable[j]);
	}

	villageHtmlTable.replaceChild(orderedVillageTbody, villageHtmlTable.firstChild);

}