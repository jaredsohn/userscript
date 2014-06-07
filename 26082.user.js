// ==UserScript==
// @author      Ben
// @namespace	http://userscripts.org/
// @name	Travian Reports Info Box
// @description	Display a box with the village reports on the karte page
// @include     http://s*.travian.*/karte.php*
// @include     http://s*.travian3.*/karte.php*
// @include     http://welt*.travian.*/karte.php*
// @exclude     http://s*.travian.*/karte.php?d*
// @exclude     http://s*.travian3.*/karte.php?d*
// @exclude     http://welt*.travian.*/karte.php?d*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.1
// ==/UserScript==

/*********************************************************/
//Part of the code was taken or inspired by the scripts
//Travian: Resource++ v4
//Travian Task Queue


//History
//v1.1 Compatible with Travian Plus

/*********************************************************/
// Settings you can modify

var reportsInfoBoxWidth = 500;
var stayStillms = 1000; // time you must stay in an area of the map to have the information loaded
var defaultreportsInfoBoxTitleON = "Reports Info Box ON";
var defaultreportsInfoBoxTitleOFF = "Reports Info Box OFF";
var displayReportDetailsImgTitle = "Extend to have report details.";
var hideReportDetailsImgTitle = "Hide report details.";

/*********************************************************/
// General variables you should not modify

var reportsInfoBoxButtonOff, reportsInfoBoxButtonOn;

var reportsInfoBox = null, reportsInfoBoxTitle = null;
var reportsInfoON = true;

var villageInformationTable = new Array();

function villageInformation() {
	var reportsInfoBoxBody = null;
	var timeoutId;
	var villageName;
	var detailedReportsList;
}

/*********************************************************/
//launch main function after doc is loaded
window.addEventListener('load', loadReportsInfoBox, true);

//main function
function loadReportsInfoBox() {
	_log(2, "-> loadReportsInfoBox()");

	GM_registerMenuCommand("Travian Reports Info Box erase persistent data", cleanOptions);

	reportsInfoON = getOption("reportsInfoON", false);

	_log(3, "loadReportsInfo : Reports Info Box is " + (reportsInfoON ? "ON": "OFF"));
	if (!reportsInfoBox) makeReportsInfoBox(); //let's create the reports info box
	if (reportsInfoON) attachReportsInfoBoxMouseEvents(); //let's create the mouseevents
	_log(3, "<- loadReportsInfoBox");

}

function attachReportsInfoBoxMouseEvents() {

	_log(3, "-> attachReportsInfoBoxMouseEvents()");
	var karteMap = document.getElementById("karte");
	for (var i = 0; i < 49; ++i) {
		var karteArea = karteMap.childNodes[i];

		karteArea.addEventListener("mouseover", getVillageInformation, true);

		karteArea.addEventListener("mouseout", abortGetVillageInformation, true);

	}
	_log(3, "<- attachReportsInfoBoxMouseEvents");
}

function dettachReportsInfoBoxMouseEvents() {
	_log(3, "-> dettachReportsInfoBoxMouseEvents()");

	var karteMap = document.getElementById("karte");

	for (var i = 0; i < 49; ++i) {
		var karteArea = karteMap.childNodes[i];

		karteArea.removeEventListener("mouseover", getVillageInformation, true);

		karteArea.removeEventListener("mouseout", abortGetVillageInformation, true);

	}
	_log(3, "<- dettachReportsInfoBoxMouseEvents");
}

function makeReportsInfoBox() {
	_log(3, "-> makeReportsInfoBox()");

	//Let's make the table itself
	reportsInfoBox = document.createElement('table');
	reportsInfoBox.id = 'reportsInfoBox';
	reportsInfoBox.setAttribute('style', 'z-index:100;clear:both;position:absolute;width:' + reportsInfoBoxWidth + 'px;');
	reportsInfoBox.setAttribute('cellspacing', 1);
	reportsInfoBox.setAttribute('cellpadding', 1);
	reportsInfoBox.className = 'tbg';

	var listCoords = getOption(reportsInfoBox.id, "undefined");
	if (listCoords != "undefined") {
		reportsInfoBox.style.top = listCoords.split('_')[0];
		reportsInfoBox.style.left = listCoords.split('_')[1];
	}

	//Let's make the table header
	var reportsInfoBoxHeader = document.createElement('tHead');
	reportsInfoBoxHeader.style.cursor = 'move';
	reportsInfoBoxHeader.appendChild(document.createElement('tr'));

	//Predefine the 2 kinds of button ON and OFF
	reportsInfoBoxButtonOn = document.createElement('td');
	reportsInfoBoxButtonOn.setAttribute("style", 'width:15px;');
	reportsInfoBoxButtonOn.appendChild(makeEventLinkA('>', '#', turnOnReportsInfo));
	reportsInfoBoxButtonOn.className = 'rbg';

	reportsInfoBoxButtonOff = document.createElement('td');
	reportsInfoBoxButtonOff.setAttribute("style", 'width:15px;');
	reportsInfoBoxButtonOff.appendChild(makeEventLinkA('X', '#', turnOffReportsInfo));
	reportsInfoBoxButtonOff.firstChild.setAttribute("style", 'color:red;');
	reportsInfoBoxButtonOff.className = 'rbg';

	//Let's make the table title
	reportsInfoBoxTitle = document.createElement('td');
	reportsInfoBoxTitle.setAttribute("style", 'width:' + (reportsInfoBoxWidth - 15) + 'px;');
	reportsInfoBoxTitle.className = 'rbg';
	reportsInfoBoxTitle.innerHTML = reportsInfoON ? defaultreportsInfoBoxTitleON: defaultreportsInfoBoxTitleOFF;

	makeDraggable(reportsInfoBoxTitle, reportsInfoBox);

	//Fill in the table header
	reportsInfoBoxHeader.firstChild.appendChild(reportsInfoON ? reportsInfoBoxButtonOff: reportsInfoBoxButtonOn);
	reportsInfoBoxHeader.firstChild.appendChild(reportsInfoBoxTitle);

	reportsInfoBox.appendChild(reportsInfoBoxHeader);

	//Let's make the table body
	reportsInfoBox.appendChild(document.createElement('tbody'));

	//Let's make the table footer
	var reportsInfoBoxFooter = document.createElement('tFoot');

	reportsInfoBox.appendChild(reportsInfoBoxFooter);

	document.body.appendChild(reportsInfoBox);
}

function turnOnReportsInfo() {
	reportsInfoON = true;
	setOption("reportsInfoON", true);

	reportsInfoBox.tHead.rows[0].replaceChild(reportsInfoBoxButtonOff, reportsInfoBox.tHead.rows[0].cells[0]);
	reportsInfoBoxTitle.innerHTML = defaultreportsInfoBoxTitleON;
	reportsInfoBox.appendChild(document.createElement('tbody'));

	attachReportsInfoBoxMouseEvents();
}

function turnOffReportsInfo() {
	reportsInfoON = false;
	setOption("reportsInfoON", false);
	reportsInfoBox.tHead.rows[0].replaceChild(reportsInfoBoxButtonOn, reportsInfoBox.tHead.rows[0].cells[0]);
	reportsInfoBoxTitle.innerHTML = defaultreportsInfoBoxTitleOFF;
	reportsInfoBox.removeChild(reportsInfoBox.tBodies[0]);

	dettachReportsInfoBoxMouseEvents();

}


function abortGetVillageInformation(ev) {
	_log(3, "mouseOUT triggered on : " + ev.target.href);

	var villageNumber = ev.target.href.split("=")[1].split("&")[0];

	if (villageInformationTable[villageNumber] && villageInformationTable[villageNumber].timeoutId) window.clearTimeout(villageInformationTable[villageNumber].timeoutId);
}

function getVillageInformation(ev) {

	_log(3, "-> getVillageInformation(" + ev.target.href + ")");

	var villageHref = ev.target.href;

	var villageNumber = villageHref.split("=")[1].split("&")[0];

	if (!villageInformationTable[villageNumber]) villageInformationTable[villageNumber] = new villageInformation();

	villageInformationTable[villageNumber].timeoutId = window.setTimeout(function() {
		displayVillageInformation(villageNumber, villageHref);
	},
	stayStillms);

	_log(3, "<- getVillageInformation(" + villageHref + ")");

}

function displayVillageInformation(villageNumber, villageHref) {

	_log(3, "-> displayVillageInformation(" + villageNumber + ")");

	if (villageInformationTable[villageNumber].reportsInfoBoxBody && villageInformationTable[villageNumber].villageName) { //we have the village info, we display it
		reportsInfoBox.tHead.rows[0].cells[1].innerHTML = villageInformationTable[villageNumber].villageName;
		reportsInfoBox.replaceChild(villageInformationTable[villageNumber].reportsInfoBoxBody, reportsInfoBox.tBodies[0]);

	} else { //we don't have the village info yet, so lets request it

		_log(2, "displayVillageInformation : We dont have the village info, we request it.");
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", villageHref, true);
		httpRequest.onreadystatechange = function() {
			displayVillageInformationCallBack(httpRequest, villageNumber);
		};

		httpRequest.send(null);
	}

	_log(3, "<- displayVillageInformation(" + villageNumber + ")");

}

function displayVillageInformationCallBack(httpRequest, villageNumber) {
	_log(3, "-> displayVillageInformationCallBack(" + villageNumber + ")");

	if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok the request is over	
		var sResponse = httpRequest.responseText;

		if (!sResponse) { // error retrieving the response				
			_log(1, "displayVillageInformationCallBack : We didn't get any response. ");

			villageInformationTable[villageNumber] = null; //we dealocate the village info so a new request can be made later
			return;
		}

		_log(2, "displayVillageInformationCallBack(" + villageNumber + ") : Received response.");

		_log(3, sResponse);

		fillInVillageInfo(villageInformationTable[villageNumber], sResponse); //could be done inline, but for clarity
		displayVillageInformation(villageNumber);

	}

	_log(3, "<- displayVillageInformationCallBack()");
}

function fillInVillageInfo(villageInfo, sResponse) {

	_log(3, "-> fillInReportsInfoBox()");

	sResponse = sResponse.split('<div id="lmid2">')[1].split('<div class="map_details_actions">')[0];

	villageInfo.villageName = sResponse.split(new RegExp("</?h1>", "gi"))[1];

	_log(2, "fillInReportsInfoBox villageName : " + villageInfo.villageName);

	var villageReports = sResponse.split(new RegExp("</?li>", "gi"));

	_log(2, "number of reports available = " + ((villageReports.length - 1) / 2));

	villageInfo.reportsInfoBoxBody = document.createElement('tbody');
	for (var i = 1; i < villageReports.length; i = i + 2) {

		var row = document.createElement('tr');

		var secondCell = document.createElement('td');
		secondCell.innerHTML = villageReports[i];

		_log(2, i + " : " + secondCell.firstChild.innerHTML);

		var firstCell = document.createElement('td');
		firstCell.setAttribute("style", "width:15px;");
		firstCell.appendChild(displayReportDetailsImg(villageInfo, i, secondCell.firstChild.href));

		row.appendChild(firstCell);
		row.appendChild(secondCell);

		villageInfo.reportsInfoBoxBody.appendChild(row);
		villageInfo.reportsInfoBoxBody.appendChild(document.createElement('tr'));

	}

	_log(3, "<- fillInReportsInfoBox()");

}

function displayReportDetailsImg(villageInfo, position, reportHref) {
	var img = document.createElement('img');
	img.title = displayReportDetailsImgTitle;

	img.src = 'data:image/gif;base64,R0lGODlhDQAMAIAAAP%2F%2F%2F5qamiH5BAAAAAAALAAAAAANAAwAAAIShI%2Bpy90BY0SypgqXZdMFB4IFADs%3D';
	img.addEventListener('click',
	function() {
		_log(3, "displayReportDetailsImg : click triggered");
		displayReportDetails(villageInfo, position, reportHref);
	},
	false);
	img.style.cursor = 'pointer';
	return img;
}

function displayReportDetails(villageInfo, position, reportHref) {

	_log(3, "-> displayReportDetails(" + villageInfo.villageName + ")");

	if (!villageInfo.detailedReportsList) villageInfo.detailedReportsList = new Array();

	if (villageInfo.detailedReportsList[position]) { //we have the detail of the report, we display it
		villageInfo.reportsInfoBoxBody.rows[position].appendChild(villageInfo.detailedReportsList[position]);
		villageInfo.reportsInfoBoxBody.rows[position - 1].cells[0].replaceChild(hideReportDetailsImg(villageInfo, position), villageInfo.reportsInfoBoxBody.rows[position - 1].cells[0].firstChild);

	} else { //we dont have the detail of the report, we need to request it
		if (!reportHref) {
			_log(1, "displayReportDetails : We dont have the report detail info and we dont have an href to request it!");

		} else {

			_log(2, "displayReportDetails : We dont have the report detail info, we request it.");

			var httpRequest = new XMLHttpRequest();
			httpRequest.open("GET", reportHref, true);
			httpRequest.onreadystatechange = function() {
				displayReportDetailsCallBack(villageInfo, position, httpRequest);
			};

			httpRequest.send(null);
		}
	}
	_log(3, "<- displayReportDetails");
}

function displayReportDetailsCallBack(villageInfo, position, httpRequest) {
	_log(3, "-> displayReportDetailsCallBack : " + villageInfo.reportsInfoBoxBody.rows[position - 1].cells[1].firstChild.innerHTML);

	if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok the request is over	
		var sResponse = httpRequest.responseText;

		if (!sResponse) { // error retrieving the response				
			_log(1, "displayReportDetailsCallBack : We didn't get any response. ");

			return;
		}

		_log(2, "displayReportDetailsCallBack : Received response.");
		_log(3, sResponse);

		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = sResponse.split('<div id="lmid2">')[1].split('</div>')[0];

		var newCell = document.createElement('td');
		newCell.setAttribute('colspan', '2');

		newCell.appendChild(tempDiv.childNodes[3]);

		villageInfo.detailedReportsList[position] = newCell;

		displayReportDetails(villageInfo, position); //now that we have the detail of the report we can display it
	}

	_log(3, " <- displayReportDetailsCallBack");

}

function hideReportDetailsImg(villageInfo, position) {
	var img = document.createElement('img');
	img.title = hideReportDetailsImgTitle;

	img.src = 'data:image/gif;base64,R0lGODlhDQAMAIAAAJqamv%2F%2F%2FyH5BAAAAP8ALAAAAAANAAwAAAITjI%2Bpi8AH4ot00Zuubrq%2BD4ZgAQA7';
	img.addEventListener('click',
	function() {
		_log(3, "hideReportDetailsImg : click triggered");
		hideReportDetails(villageInfo, position);
	},
	false);
	img.style.cursor = 'pointer';
	return img;

}

function hideReportDetails(villageInfo, position) {
	_log(3, "-> hideReportDetails(" + villageInfo.villageName + ")");
	villageInfo.reportsInfoBoxBody.rows[position - 1].cells[0].replaceChild(displayReportDetailsImg(villageInfo, position), villageInfo.reportsInfoBoxBody.rows[position - 1].cells[0].firstChild);
	villageInfo.reportsInfoBoxBody.rows[position].removeChild(villageInfo.reportsInfoBoxBody.rows[position].cells[0]);
	_log(3, "<- hideReportDetails()");

}

function makeEventLinkA(text, href, event) {
	var link = document.createElement('a');
	link.href = href;
	link.appendChild(document.createTextNode(text));
	link.addEventListener('click', event, false);
	return link;
}

//************************ Drag n drop*******************************
// from Risi of http://userscripts.org/, a little modified for my needs
var mouseOffset = null;
var dragObject = null;

function mouseCoords(ev) {
	return {
		x: ev.pageX,
		y: ev.pageY
	};
}
function getMouseOffset(target, ev) {
	var docPos = getPosition(target);
	var mousePos = mouseCoords(ev);
	return {
		x: mousePos.x - docPos.x,
		y: mousePos.y - docPos.y
	};
}
function getPosition(e) {
	var left = 0;
	var top = 0;
	while (e.offsetParent) {
		left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
		e = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
	top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
	return {
		x: left,
		y: top
	};
}
function mouseMove(ev) {
	var target = ev.target;
	var mousePos = mouseCoords(ev);
	if (dragObject) {
		dragObject.style.position = 'absolute';
		dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
		dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
	}
	return false;
}
function mouseUp(ev) {
	if (dragObject) {
		setOption(dragObject.id, dragObject.style.top + '_' + dragObject.style.left);
	}
	dragObject = null;
	document.removeEventListener("mousemove", mouseMove, false);
	document.removeEventListener("mouseup", mouseUp, false);
}

function makeDraggable(item, toDragObject) {
	if (!item) return;
	_log(3, "-> makeDraggable : " + item.innerHTML);
	item.addEventListener('mousedown',
	function(ev) {
		_log(3, "-> mousedown triggered on " + item.innerHTML);
		dragObject = toDragObject;
		mouseOffset = getMouseOffset(toDragObject, ev);
		_log(3, mouseOffset.x + " " + mouseOffset.y);

		document.addEventListener("mousemove", mouseMove, false);
		document.addEventListener("mouseup", mouseUp, false);

		return false;
	},
	false);
}
function setOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	GM_setValue(key, value);
}
function getOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	return GM_getValue(key, value);
}
function cleanOptions() {
	var response = confirm("Are you sure you want to delete the stored options ?");
	if (response) {
		setOption("reportsInfoON", "");
		setOption('reportsInfoBox', "");

	}
}

/************************ End Drag n drop*******************************/

//Logging functions from Risi of http://userscripts.org/

var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quiet, 2 - verbose, 3 - detailed
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg);
}
