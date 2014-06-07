// ==UserScript==
// @name           Quick Boat Search
// @description    Add a page to famanager.com showing the boats available at a glance
// @include        http://famanager.com/*
// @copyright      Matthias Buchner
// @version        1.0.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==
var URL = "http://famanager.com/index.php?f=add_reserv";
var MORNING_RESERVATION = "1";
var AFTERNOON_RESERVATION = "2";


var WEEK_DAY = new Array(7);
WEEK_DAY[0] = "Sun";
WEEK_DAY[1] = "Mon";
WEEK_DAY[2] = "Tue";
WEEK_DAY[3] = "Wed";
WEEK_DAY[4] = "Thu";
WEEK_DAY[5] = "Fri";
WEEK_DAY[6] = "Sat";

var boatList = ['117', '118', '122', '124', '139', '147', '151', '168','173','179','182','191','204', '224']
var boatDescriptions = {'117': {'name': '2003 Crest Pontoon'}, '118':{'name':'08 Bayliner 175'}, '122':{'name':'2006 Moomba Outback V'}, '124':{'name':'2002 Moomba Mobius'}, '139':{'name':'2006 Sea Ray 185 Sport'}, '147': {'name': '2004 Tige 22i'}, '151':{'name':'2009 Moomba Outback V-Drive'}, '168': {'name':'2008 Blue Sun Tracker Party Barge'}, '173': {'name': '2005 Bayliner 215'}, '179':{'name':'Formula 235 with Mercruiser'},'182': {'name': '19 Foot Ski Centurion'}, '191': {'name': '2006 Bayliner 175'}, '204':{'name':'92 Invader FISHING BOAT'}, '224': {'name':'2011 Green Sun Tracker'} };

var dateList = new Array();
var requestPool = new Array();

var DAYS = 7; //search through the DAYS next days

//http://www.greywyvern.com/code/php/binary2base64
var LEFT_ARROW_IMAGE_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8//8/AyWAiViFib1PmbGJsxChkek/O6fSj99/bjMwMDCS5ILE3qfM/1jY1Rh+fL795+c30rwAdbLVv19fL7mZyDP8+f2LeAOgmm1+/P59yNNUnvXIbQaG379+EGcATPPXn78O+FooMDx4z8Dw7P0/hl/EGvDg2Uv7zz9+HvC1UGR4/J6B4fG7Xwzvv/5h+P3zOwNRsbC/12ifjO+aoNfv/63T1FRgePHuL8O7zz8YeH78ID4MnmwOWX/35jnvEyeuMDx98Ynhx08WnC7AGQtPNodte/Pilu2fDw8Yfv5hJj4M0Aw58urFfTeh//cIxEK2NU6Dnm6N2P3m+U0//Olg6tF/eNPz/z/bvjHL+mOTYqRbbsQFAAMAsq+Rb+nIQZQAAAAASUVORK5CYII%3D";

var LEFT_ARROW_IMAGE = "<img style=\"margin-top:-7px\" align=\"middle\" src="+LEFT_ARROW_IMAGE_DATA+" />";
var RIGHT_ARROW_IMAGE = "<img style=\"margin-top:-7px; -moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;\" align=\"middle\" src=" + LEFT_ARROW_IMAGE_DATA + " />";

var MORNING_CSS = "-moz-border-radius:25px 10px 25px 10px / 10px 25px 10px 25px; border-radius: 25px 10px / 10px 25px; background-color:#0C2DC2; color:white;";

var AFTERNOON_CSS = "-moz-border-radius:25px 10px 25px 10px / 10px 25px 10px 25px; border-radius: 25px 10px / 10px 25px; background-color:#cc6600; color:white;";

function buildRequestData(resMemberId, calYear, calMonth, calDay, resType) {
//example: showpopup=1&f=add_reserv&res_member_id=B0001914&cal_year=2010&cal_month=09&restype=2&resdate=09-30-2010&resvid=0

	return "showpopup=1&f=add_reserv&res_member_id="+resMemberId+"&cal_year="+calYear+"&cal_month="+leftZeroPadding(calMonth)+"&restype="+resType+"&resdate="+leftZeroPadding(calMonth)+"-"+leftZeroPadding(calDay)+"-"+calYear+"&resvid=0";
}

function leftZeroPadding(val) {
	val = "" + val;
	if ( val.length == 1 ) {
		val = "0" + val;
	}
	return val;
}

function extractAvailableBoats(htmlData) {	
	var availableBoats = new Array();
		
	for (var i = 0; i < boatList.length; i++) {
		var searchPattern = "selectboat(" + boatList[i] + ")";
		if ( -1 != htmlData.indexOf(searchPattern) ) {
			availableBoats.push(boatList[i]);
		}
	}
	
	return availableBoats;
}

function formatDate(date) {
	return (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
}

function formatDisplayDate(date) {
	return leftZeroPadding(date.getMonth()+1) + "/" + leftZeroPadding(date.getDate());
}

function getDayName(date) {
	return WEEK_DAY[date.getDay()];
}

function makePOSTRequest(url, parameters, requestId, date, resType) {
  requestPool[requestId] = false;
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
	 requestPool[requestId] = new XMLHttpRequest();
	 if (requestPool[requestId].overrideMimeType) {
		// set type accordingly to anticipated content type
		//requestPool[requestId].overrideMimeType('text/xml');
		requestPool[requestId].overrideMimeType('text/html');
	 }
  } else if (window.ActiveXObject) { // IE
	 try {
		requestPool[requestId] = new ActiveXObject("Msxml2.XMLHTTP");
	 } catch (e) {
		try {
		   requestPool[requestId] = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
	 }
  }
  if (!requestPool[requestId]) {
	 alert('Cannot create XMLHTTP instance');
	 return false;
  }
  
  requestPool[requestId].onreadystatechange = function() {requestCallback(requestId, date, resType);}
  requestPool[requestId].open('POST', url, true);
  requestPool[requestId].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  requestPool[requestId].send(parameters);
}

function requestCallback(requestId, date, resType) {
	if (requestPool[requestId].readyState == 4) {
		if (requestPool[requestId].status == 200) {
			var availableBoats = extractAvailableBoats( requestPool[requestId].responseText );
			 
			for ( var i=0; i<availableBoats.length; i++) {				
				if (resType==MORNING_RESERVATION) {
					var cell = document.getElementById( "am-" + formatDate(date) + "-" + availableBoats[i] );
					cell.innerHTML += "AM";
				} else {
					var cell = document.getElementById( "pm-" + formatDate(date) + "-" + availableBoats[i] );
					cell.innerHTML += "PM";
				}
			}
	
			responseReceived ++;
		} else {
			alert('There was a problem with the request.');
		}
	}
}

function buildQuickBoatSearchPage() {

    var bannerDiv = document.createElement('div');
	bannerDiv.setAttribute("id", "bannerId");
	bannerDiv.innerHTML = "<b>Quick Boat Search</b> is designed specially for Famanager.com<br/><font size=\"1\">By Matthias Buchner - <a href='http://codebazaar.blogspot.com/'>codebazaar.blogspot.com</a> - Copyright 2010</font><br/><br/>"

	bannerDiv.innerHTML += "<span style='" + MORNING_CSS + "'>AM</span> Available in the morning<br/>";
	bannerDiv.innerHTML += "<span style='" + AFTERNOON_CSS + "'>AM</span> Available in the afternoon<br/><br/>";

 	return bannerDiv;
}

function initializeDateList(oDate) {
	dateList[0] = new Date( oDate );
	for (var i=1; i<DAYS; i++) {
		dateList[i] = new Date( dateList[0] );
		dateList[i].setDate( dateList[i].getDate() + i );
	}
}

function searchAndDisplayBoats() {
	responseReceived = 0;	
	
	for (var i=0; i<dateList.length; i++) {
		var formatedDate = formatDate(dateList[i]);
		
		var requestBody = buildRequestData("B0001914", dateList[i].getFullYear(), dateList[i].getMonth()+1, dateList[i].getDate(), MORNING_RESERVATION);
		makePOSTRequest( URL, 
						requestBody, 
						i*2,
						dateList[i],
						MORNING_RESERVATION);
		
		requestBody = buildRequestData("B0001914", dateList[i].getFullYear(), dateList[i].getMonth()+1, dateList[i].getDate(), AFTERNOON_RESERVATION);
		makePOSTRequest( URL, 
						requestBody,
						i*2+1,
						dateList[i],
						AFTERNOON_RESERVATION);
	}
	
}

function buildResultTableHeader() {
	var tableElement = document.createElement('table');
	tableElement.setAttribute('id','results');
	tableElement.setAttribute('cellspacing','0');
	tableElement.setAttribute('cellpadding','4');
	tableElement.setAttribute('border','1');
	tableElement.setAttribute("style", "border-top:none;border-left:none;border-right:none;padding-left:10px");

	var navTrEl = document.createElement("tr");
	
	var previousWeekTdEl = document.createElement("td");
	previousWeekTdEl.setAttribute("colspan", "4");
	previousWeekTdEl.setAttribute("align", "left");
	previousWeekTdEl.setAttribute("style", "border-top:none;border-left:none;border-right:none;");
	previousWeekTdEl.addEventListener("click", function() { displayPreviousWeek() }, true);
	previousWeekTdEl.innerHTML = LEFT_ARROW_IMAGE + "Previous Week";
	navTrEl.appendChild(previousWeekTdEl);	
	
	var nextWeekTdEl = document.createElement("td");
	nextWeekTdEl.setAttribute("colspan", "4");
	nextWeekTdEl.setAttribute("align", "right");
	nextWeekTdEl.setAttribute("style", "border-top:none;border-left:none;border-right:none");
	nextWeekTdEl.addEventListener("click", function() { displayNextWeek() }, true);
	nextWeekTdEl.innerHTML = "Next Week" + RIGHT_ARROW_IMAGE;
	navTrEl.appendChild(nextWeekTdEl);	
	
	tableElement.appendChild(navTrEl);		
	
	var headRowElement = document.createElement("tr");
	
	var headBoatNamesCellElement = document.createElement("td");
	headBoatNamesCellElement.innerHTML = "Boats";
	headRowElement.appendChild(headBoatNamesCellElement);
	
	for (var i=0; i<dateList.length; i++) {
		var headDateCellElement = document.createElement("td");
		headDateCellElement.innerHTML = getDayName(dateList[i]) + ", " + formatDisplayDate(dateList[i]);
		headRowElement.appendChild(headDateCellElement);
	}
	
	tableElement.appendChild(headRowElement);	
		
	for (var i=0; i<boatList.length; i++) {
		var rowElement = document.createElement("tr");
		rowElement.setAttribute("height", "30px");
		
		var boatNamesCellElement = document.createElement("td");
		
		boatNamesCellElement.innerHTML = "<a href='index.php?f=member_fleet_view&v_id="+ boatList[i]  +"'>" + getBoatName(boatList[i]) + "</a>"			
		rowElement.appendChild(boatNamesCellElement);
					
		for (var j=0; j<dateList.length; j++) {
			var availabilityCellElement = document.createElement("td");
			availabilityCellElement.appendChild( buildAvaibilityResultCell(dateList[j], boatList[i]) );
			
			rowElement.appendChild(availabilityCellElement);
		}
		tableElement.appendChild(rowElement);
	}

	return tableElement;
}

function displayNextWeek() {
	updateGrid( DAYS );
}

function displayPreviousWeek() {
	updateGrid( -DAYS );
}

function updateGrid(dayShift) {
	var currentDate = dateList[0];
	currentDate.setDate( currentDate.getDate() + dayShift);
	
	initializeDateList( currentDate );
	
	var currentTableEl = document.getElementById("results");
	var bannerDivEl = document.getElementById("bannerId");
	
	if ( currentTableEl != null ) {
		
		bannerDivEl.removeChild(currentTableEl);
	}
	
	bannerDivEl.appendChild( buildResultTableHeader() );
	
	searchAndDisplayBoats();
}

function buildAvaibilityResultCell(date, boatId) {
	var tableEl = document.createElement("table");
	tableEl.setAttribute("width", "100%");
	var rowEl = document.createElement("tr");
	
	var morningEl = document.createElement("td");
	morningEl.setAttribute("width", "50%");
	morningEl.setAttribute("align", "center");
	
	var morningDivEl = document.createElement("div");
	morningDivEl.setAttribute("style", MORNING_CSS );
	morningDivEl.setAttribute("id", "am-" + formatDate(date) + "-" + boatId);
	morningEl.appendChild(morningDivEl);
	rowEl.appendChild(morningEl);
	
	var afternoonEl = document.createElement("td");
	afternoonEl.setAttribute("width", "50%");
	afternoonEl.setAttribute("align", "center");
	
	var afternoonDivEl = document.createElement("div");
	afternoonDivEl.setAttribute("style", AFTERNOON_CSS);
	afternoonDivEl.setAttribute("id", "pm-" + formatDate(date) + "-" + boatId);
	afternoonEl.appendChild(afternoonDivEl);
	rowEl.appendChild(afternoonEl);
	
	tableEl.appendChild(rowEl);
	
	return tableEl;
}

function getBoatName(boatId) {
	return boatDescriptions[ boatId ].name;
}

function contains(array, obj) {
	//does not work in ie6? too bad...
    return (array.indexOf(obj) != -1);
}

function findMainArea () {
    var tb = document.getElementsByTagName('table')[3];
	var tr = tb.getElementsByTagName('tr')[0];
	
    var tdElementList = tr.getElementsByTagName('td');
	
    for (var i=0; i<tdElementList.length; i++) {
        if ( tdElementList[i].width == "954" ) {
			return tdElementList[i];            
        }
    }

    return null;
}

function displayQuickBoatSearchPage() {
    var mainAreaElement = findMainArea();
    mainAreaElement.innerHTML = "";
	
	var topBanner = buildQuickBoatSearchPage();
	
	mainAreaElement.appendChild(topBanner);	
	
	initializeDateList( new Date() );
	updateGrid( 0 );
}

function addQuickBoatSearchLink() {
	var makeReservationDiv = document.getElementsByClassName("menu_item")[2].parentNode;

	var quickBoatSearchDiv = document.createElement("div");
	quickBoatSearchDiv.setAttribute("style", "width: 188px;");
	quickBoatSearchDiv.setAttribute("class", "mnpMenuRow");
	//not onclick!
	quickBoatSearchDiv.addEventListener("click", displayQuickBoatSearchPage, true);
	quickBoatSearchDiv.innerHTML = "&nbsp;<img width='6' height='5' border='0' src='../images/arrow_orange.gif'>&nbsp;<a href='#' class='menu_item'>Quick Boat Search</a>";

	makeReservationDiv.parentNode.insertBefore(quickBoatSearchDiv,makeReservationDiv);
	makeReservationDiv.parentNode.insertBefore(document.createElement("br"),makeReservationDiv);
}

addQuickBoatSearchLink();