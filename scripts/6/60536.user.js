// ==UserScript==
// @name          Ikariam - Pillage Link Generator
// @version       1.3
// @namespace     sugarfrog
// @description   Grab City ID from Diplomacy page
// @include       http://s*.ikariam.*
// @exclude       http://board.ikariam.*/*
// @require http://sizzlemctwizzle.com/updater.php?id=60536&days=7
// ==/UserScript==

/** Version Notes
 *  1.0 :: Retrieves CityID from Diplomacy page and generate pillage link
 *  1.1 :: removed a completely unnecessary json include line that was causing alert
 *         to popup
 *  1.2 :: Update City name parser - a previous version of Ikariam caused extra characters
 *  1.3 :: include the updater
 */

// Global
var DEBUG = true;
var GARRISONFOUND = false;

var game = document.location.hostname;
var view = document.getElementsByTagName("body")[0].id;

var urlPrefix = "http://"+game+"/index.php?view=plunder&destinationCityId=";
var urlArray = new Array();
var cityName = new Array();
var j = 0;
var indexCityId = 3;
var indexCityName = 31;
var player = "";

var bulletImg = "http://" + game +"/skin/resources/icon_actionpoints.gif";
var css = 
	" #mainCityCDiv 			{ margin: 0px; padding: 0px;} "
	+ "#CityCoordinates			{ padding: 9px 22px; width: 228px; } "
	+ "#CityCoordinates .player		{ font-weight: 700; width: 228px; text-align: center; } "
	+ "#CityCoordinates ul.userCity		{ margin: 12px; } "
	+ "#CityCoordinates ul.userCity li	{ list-style-type: square ; } "
	+ "#CityCoordinates ul.userCity li a	{ margin: 3px; font-weight: 500; font-size: 12px; text-align: left; } "
	+ "#closing 				{ padding: 0px; margin: 0px; }"
	;
//	+ "#CityCoordinates .userCity		{ margin: 3px; font-weight: 500; font-size: 12px; text-align: left; white-space:nowrap; }"
	
log("game -- " + game);
log("view -- " + view);

function log(msg) {
    if (DEBUG) {
        GM_log(msg);
    }
}

if (game != false && view == "sendIKMessage") {

    var dropDownVal = document.getElementById('treaties');
	
	if (dropDownVal != undefined) {
		for (var i=0; i<dropDownVal.childNodes.length; i++) {
		
			var msgObj = dropDownVal.childNodes[i];
			var msgText = dropDownVal.childNodes[i].innerHTML;

			if (msgText != undefined && isGarrisonMsg(msgText)) {
				setUrl(msgObj);
				setCityName(msgText);
				GARRISONFOUND = true;
				j++;
			}
		}
		setPlayerName();
		addGlobalStyle(css);
	}

	//if (GARRISONFOUND && cityName.length > 0)
		createDiv();
}

function createDiv() {
	var divContent = "<h3 class='header'><u>Player</u>: <span class='player'>" + player + "</span></h3>";

	/**
	 * Concatenate city info
	 */
	divContent += "<div id='CityCoordinates'>";

	if (cityName.length == 0) {
		divContent += "<div class='userCity'>No Information Retrieved</div>";
	} else {
		divContent += "<ul class='userCity'>";
		for (var i = 0; i < cityName.length; i++) {
			divContent += "<li><a href="+urlArray[i]+">"+cityName[i]+"</a></li>";
		}
		divContent += "</ul>";
	}
	
	divContent +="</div>";
	/**
	 * End : Concatenate city info
	 */	
	divContent += "<img id='closing' src=http://" + game + "/skin/layout/bg_sidebox_footer.gif";
	
	var newDiv = document.createElement("div");
	newDiv.id = "mainCityCDiv";
	document.getElementById('backTo').appendChild(newDiv);
	document.getElementById('mainCityCDiv').innerHTML = divContent;
}

function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

function setCityName(nameTxt) {
	cityName[j] = trim(nameTxt.substring(indexCityName));
	log('!' + cityName[j] + '!');

}

function setUrl(id) {
	urlArray[j] = urlPrefix + id.value.substring(indexCityId);
	log(urlArray[j]);
	return;
}

function isGarrisonMsg (msg) {
	if (msg.indexOf("Request garrison right in") != -1) {
		return true;
	} else {
		return false;
	}
}

function setPlayerName() {
	var elem = document.getElementById('mailRecipient');
	player = elem.childNodes[3].innerHTML;
	log(player);
}

function trim(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};