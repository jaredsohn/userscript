/**
Copyright 2007 Richard Laffers (edited by Sotos)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author      Sotos/Kartalos
// @email	SotosK@freemail.gr
// @namespace	http://userscripts.org/
// @name	Trooptool Updater GR (gr2)
// @description	Update your troop tool with one click from the rally point. (Ready for s2.travian.gr)
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.0(GR) Beta
// ==/UserScript==

var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var sLang = "gr";
var sGetParameters = "";
var sCurrentServer = "s2.travian.gr";    // Set this to the server's url to override automatic server detection
                            // (i.e. s1.travian.net)
                            // Dont set it if you're playing on multiple servers simultaneously!
							//Allready set for s2.travian.gr

var sAuthKey;

var init = detectLanguage() && initialize();

if(init) {
	// Images
	var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";

	//Styles
	var cssStyle = "";
	cssStyle += ".ttu_draghandle {font-size: 120%; font-weight:bold;}";
	cssStyle += ".ttu_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
	cssStyle +=	"#ttu_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
	cssStyle += ".handle {cursor: move;}";


	GM_addStyle(cssStyle);
	window.addEventListener('load', onLoad, false);
} else {
        _log(0, "Initialization failed");
    alert("Initialization failed, Travian Task Queue is not running");
}

switch(sLang) {
	case "sk":
		aLangStrings = ["Vlastne jednotky", "Navrat z", "Podpora pre", "Jednotky od", "Utok na", "Lupez proti", "Spehovanie v", "Preskumat opustene udolie", "Zajate jednotky od", "Prebehol pokus o aktualizaciu.", "Aktualizacia uspesna", "Aktualizacia zlyhala!", "Nastavit Troop Tool Updater", "Aktualizovat Troop Tool", "Troop tool Updater:", "Skopiruj sem autentifikacny kluc zo svojho profilu v Troop Tool-e"];
		break;
        case "ua":
                aLangStrings = ["?????? ???????", "?????????? ?", "???????????? ???", "??????? ??????", "????? ??", "????????????? ????? ??", "???????? ?????", "????????? ???????? ??????", "???????? ??????? ??????", "Update attempted with unknown result.", "Your troops were successfully updated.", "Update failed!", "Troop Tool Updater setup", "Update Troop Tool", "Troop tool Updater:", "Enter the authentication key from your Troop tool profile"];
                break;
	case "gr":
                aLangStrings = ["ÄéêÜ ìïõ óôñáôåýìáôá", "ÅðéóôñïöÞ áðü", "Åíßó÷õóç ãéá", "ôá óôñáôåýìáôá ôïõ",  "Åðßèåóç åíáíôßïí", "ÅéóâïëÞ áñðáãÞò åíáíôßïí", "Áíß÷íåõóç ôïõ", "ÅéóâïëÞ åãêáôáëåéììÝíçò üáóçò", "ÖõëáêéóìÝíá óôñáôåýìáôá áðü", "Ç áíáíÝùóç ðÝôõ÷å ìå áâÝâáéï áðïôÝëåóìá!", "Ôá óôñáôåýìáôá óáò Ý÷ïõí áíáíåùèåß.", "Ç áíáíÝùóç áðÝôõ÷å!", "ÅãêáôÜóôáóç ôïõ Troop Tool Updater", "ÁíáíÝùóå ôï Troop Tool", "Troop tool Updater:", "ÅéóÜãåôå ôï êëåéäß áõèåíôéêïðïéÞóçò áðï ôï 'My profile' ôïõ Troop tool óáò"];
		break;
	case "en":
	case "com":
	case "uk":
	default:
		aLangStrings = ["Own troops", "Return from", "Reinforcements for", "Reinforcements from", "Attack", "Raid", "Spy", "Preskumat opustene udolie", "Captured at", "Update attempted with unknown result.", "Your troops were successfully updated.", "Update failed!", "Troop Tool Updater setup", "Update Troop Tool", "Troop tool Updater:", "Enter the authentication key from your Troop tool profile"];
		break;
}

// Do not change the array below!
var aLangStringsMaster = ["user_own_troops", "user_return_from", "user_troops_for", "user_troops_of", "user_attack_to", "user_raid_to", "user_spy_at", "user_explore_oasis", "user_captured_troops", "Update attempted with unknown result.", "Your troops were successfully updated.", "Update failed!", "Troop Tool Updater setup", "Update Troop Tool", "Troop tool Updater:", "Enter the authentication key from your Troop tool profile"];

/**
* Custom log function .
* @param {int} level
* @param:{int} msg Message to log.
*/
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
		GM_log(msg);
}

/**
 * Performs some initial checkings on conditions that have to be met to run the script
 *
 * @return true if initialization was successful, false otherwise
 */
function initialize() {

    if (typeof GM_getValue == "undefined") {
        alert('This script requires Greasemonkey v0.3 or newer, please upgrade to latest version!');
        _log(0, "The current version of Greasemonkey is too old");
        return false;
    }

    if (sCurrentServer != "") {
        return true;
    }

    // check what Travian server we're using
    var re = new RegExp("^http://(.+\.travian3?\.[a-zA-Z.]+)(\/.*)?$", "i");
	var server = re.exec(window.location.href);
    if ((server) && (server[1])) {
        sCurrentServer = server[1] + "_";
        _log(1, "using settings for server '" + server[1] + "'");
        return true;
    }
    else {
         _log(0, "ERROR, unknown Travian server!");
        return false;
    }
}

/**
 * Detects the language used based on the server's url
 *
 * @return true if the language is successfully detected, false otherwise
 */
function detectLanguage() {
	//if(sLang != "") {return true;}
	var re = null; re = new RegExp("([a-zA-Z]{2,3})(\/.*)?$", "i");
	var lang = re.exec(window.location.href);

    if(!lang) {
            _log(0, "failed to detect language automatically!");
		if(sLang == "") sLang = "en";
        return true;
	} else {
        sLang = lang[1];
            _log(2, "detected language '" + sLang + "'");
        return true;
    }
}


function GM_get(url, callback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: callback,
	});
}

function handleUpdateTroops(httpRequest, options) {
		_log(3, "-> handleUpdateTroops()");
	var oMsg = xpath("id('ttu_message')/div");
	if(oMsg.snapshotLength > 0) {
		oMsg = oMsg.snapshotItem(0);
		var bAddMsg = true;
	} else {
		var bAddMsg = false;
	}

	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {  // error retrieving the response
				if(!bAddMsg) printMsg( t("Update attempted with unknown result."), true );
				else addMsg(t("Update attempted with unknown result."), oMsg);
				return;
			}
			var re = new RegExp('<title>(.*)</title>', 'i');
			var aMatchResults = sResponse.match(re);
			if(aMatchResults[1] == "Success") {
				if(!bAddMsg) printMsg(t("Your troops were successfully updated."));  //Your troops were updated.
				else addMsg(t("Your troops were successfully updated."), oMsg);
			} else {
				if(!bAddMsg) printMsg(t("Update failed!"), true); // Update error.
				else addMsg(t("Update failed!"), oMsg);
			}
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}

	}
		_log(3, "<- handleUpdateTroops()");
}

function addMsg(sMsg, obj) {
	obj.innerHTML += "<br/>" + sMsg ;
}

function printMsg(sMsg,bError) {
		_log(3, "-> printMsg()");
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(1, sWhen + sMsg);
	//alert(sMsg);

	// delete old message
	var oOldMessage = $("ttu_message");
	if(oOldMessage) {
			_log(3, "Removing the old message." +oOldMessage);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}

	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttu_message\").parentNode.removeChild(document.getElementById(\"ttu_message\"));' class='ttu_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

	var sBgColor = (bError) ? "#FFB89F" : "#90FF8F";
	var oMsgBox = document.createElement("div");
	//oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
	oMsgBox.innerHTML = "<div id='ttu_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
	oMsgBox.style.backgroundColor = sBgColor;
	var msgCoords = getOption("MSG_POSITION", "215px_215px");
	msgCoords = msgCoords.split("_");
	oMsgBox.style.top = msgCoords[0];
	oMsgBox.style.left = msgCoords[1];
	oMsgBox.id = "ttu_message";
	document.body.appendChild(oMsgBox);
	makeDraggable($('ttu_draghandle_msg'));
		_log(3, "<- printMsg()");
}

/**
 * Retrieves the value corresponding do the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name          The name of the variable
 * @param defaultValue  default value if name is not found
 */
function getVariable(name, defaultValue) {
		_log(3, "-> getVariable()");

    if(!defaultValue) { var defaultValue = ''; }

    name = sCurrentServer + name;
    var data = GM_getValue(name, defaultValue);

        _log(3, "<- getVariable()");
    return data;
}

/**
 * Sets the value for the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name  The name of the variable
 * @param value The value to be assigned
 */
function setVariable(name, value) {
		_log(3, "-> setVariable()");

    name = sCurrentServer + name;
    GM_setValue(name, value);

        _log(3, "<- setVariable()");
    return true;
}

/**
* @param key: name of the parameter in the TTQ_OPTIONS variable
* @param defaultValue: this is returned if the parameter is not found
* @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
*/
function getOption(key, defaultValue, type) {
        _log(3, "-> getOption()");

    var options = getVariable('TTU_OPTIONS', '');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if(myOption < 0) {return defaultValue;}
	switch(type) {
		case "boolean":
			var myOption = ( options[myOption + 1] == "true") ? true:false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = options[myOption + 1];
			break;
	}
        _log(3, "<- getOption()");
    return myOption;
}

function setOption(key, value) {
        _log(3, "-> setOption()");

    var options = getVariable('TTU_OPTIONS', '');
	if(options != '') options = options.split(",");
	else options = [];
    var myOption = options.indexOf(key);
	if(myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}

    setVariable('TTU_OPTIONS', options.join(","));
        _log(3, "<- setOption()");
}

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		switch(dragObject.id) {
			case "ttq_message":
				var key = "MSG_POSITION";
				break;
			case "timerform_wrapper":
				var key = "FORM_POSITION";
				break;
			case "ttq_history":
				var key = "HISTORY_POSITION";
				break;
			case "ttq_tasklist":
			default:
				var key = "LIST_POSITION";
				break;
		}
		setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;
	if(target.getAttribute('DragObj')){
		return false;
	}
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/** Kudos to QP for writing this function. */
function coordsXYToZ(x, y) {
	x = parseInt(x);
	y = parseInt(y);
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}

function t(str) {
	var index = aLangStringsMaster.indexOf(str);
	var sTranslatedStr =  aLangStrings[index];
	if(sTranslatedStr) {
		return sTranslatedStr;
	} else {
		return str;
	}
}

function $(id) {
  return document.getElementById(id);
}

function createLink() {
		_log(3, "-->createLink");
		_log(2, "sAuthKey = "+sAuthKey);
	var xpathRes = xpath("id('lmid2')//a[@href='warsim.php']");
	if(xpathRes.snapshotLength < 0) {
			_log(1, "This is not Rally point.")
		return false;
	}
	if(!sAuthKey) {
		var oLink = document.createElement("a");
		oLink.id = "setupTT";
		oLink.innerHTML = t("Troop Tool Updater setup");
		oLink.title = t("Troop Tool Updater setup");
		oLink.href = "#";
		oLink.addEventListener('click',	promptKey, false);
	} else {
		var oLink = document.createElement("a");
		oLink.id = "updateTT";
		oLink.innerHTML = t("Update Troop Tool");
		oLink.title = t("Update Troop Tool");
		oLink.href = "#";
		oLink.addEventListener('click',	startUpdate, false);
	}

			//_log(3, "........" + xpathRes.snapshotItem(0).parentNode.innerHTML);
	var oPar = xpathRes.snapshotItem(0).parentNode;
	oPar.innerHTML += " | ";
	oPar.appendChild(oLink);

		_log(3, "<--createLink");
}

function startUpdate() {
		_log(3, "-->startUpdate");
	//parse page

	var aTroops = parse();
	aTroops.push("end");
	var re = /[0-9]{6}\|[0-9]{6}/;

	//send data
	var key = getVariable("TTU_KEY", false);
	if(key == false) {
			_log(1, "No troop tool URL is set!");
		promptKey();
		return false;
	} else if(aTroops.length == 0) {
		_log(1, "No troops were found.");
	} else {
			_log(2, "Sending troops...");

		var bHaveCoords = false;
		bDoSend = false;
		var j = 1;
		for(var i=0; i < aTroops.length; i++) {
			if(!bHaveCoords && !re.test(aTroops[i])) {
					_log(3, "no coords yet, this is not coord");
				continue;
			} else if(!bHaveCoords && re.test(aTroops[i])) {
					_log(3, "no coords yet, this is coords");
				var aCoord = aTroops[i].split("|");
				url = key + "&fc="+aCoord[0]+"&tc="+aCoord[1];
				bHaveCoords = true;
			} else if(re.test(aTroops[i])) {
					_log(3, "coords yes, this is next coord");
				bDoSend = true;
				i--;
			} else if(aTroops[i] == "end") {
					_log(3, "coords yes, this is end");
				bDoSend = true;
			} else {
					_log(3, "coords yes, this is number");
				if(j<12) url += "&t"+j+"="+aTroops[i];  //j can be max 11 (11 types of units), but the array may contain a 12th dummy member
				j++;

			}

			if(bDoSend) {
					_log(2, "URL is \n"+url)
				GM_get(url, handleUpdateTroops);
				bHaveCoords = false;
				bDoSend = false;
				url = "";
				j=1;;
			}
		}

	}

		_log(3, "<--startUpdate");
}

function parse() {
		_log(3, "-->parse");

	var aTroops = new Array();
	var matches, coordOrigin, coordPosition, table;
	var keywords = t('user_own_troops')+"|"+
                t('user_return_from')+"|"+
                t('user_troops_for')+"|"+
                t('user_troops_of')+"|"+
                t('user_attack_to')+"|"+
                t('user_raid_to')+"|"+
                t('user_spy_at')+"|"+
                t('user_explore_oasis')+"|"+
                t('user_captured_troops');
	var re = new RegExp("(" + keywords + ")");
	var re2 = new RegExp(">[0-9]{1,}</td>", "g");
	var skip = 0;

	var tables = xpath("id('lmid2')/table");
	if(tables.snapshotLength < 1) {
		_log(2, "No tables with troops found on this page.");
		return false;
	}

	var aTroops = new Array();
	for(var i=0; i < tables.snapshotLength; i++) {
			//_log(2, tables.snapshotItem(i));

		table = tables.snapshotItem(i).innerHTML; //_log(3, table);

		//coordinates
		matches = table.match(/<a href="karte\.php\?d=[0-9]{6}/gi); _log(3, matches);
		coordOrigin = matches[0].match(/[0-9]{6}/);
		coordOrigin = coordOrigin[0];
		if(matches[1] != undefined) {
			coordPosition = matches[1].match(/[0-9]{6}/);
			coordPosition = coordPosition[0];
		} else {
			coordPosition = coordOrigin;
		}

		//action
		matches = table.match(re); //_log(2, i+". searching for keywords:\nexpression= " +re+ "\nmatches\n" +matches);
                if(matches == null) {
                    _log(1, "Warning: Unrecognized key word.")
                    continue;
                }
		switch(matches[1]) {
				case t("user_own_troops"):// my troops at home
				case t("user_return_from"):
				case t("user_attack_to"):
				case t("user_raid_to"):
				case t("user_spy_at"):
				case t("user_explore_oasis"):
					coordPosition = coordOrigin;
					break;
				case t("user_troops_for"): //my troops stationed elsewhere
                                case t("user_captured_troops"):
						_log(2, "Reinforcements");
					break;
				case t("user_troops_of"): //other troops. go to the next table
						_log(2, "Other troops");
					skip = 1;
		}
		if(skip) {
			skip = 0;
			continue;
		}

		//add new set, or add to an existing one
		matches = table.match(re2);
		if(matches == null || matches.length < 10) continue; //this is not my attack/raid/reinforcement
		var pos = aTroops.indexOf(coordOrigin + '|' + coordPosition); //_log(3, "position = "+pos);
		if(pos > -1) {
			for(var thisMatch in matches) {
				thisMatch = parseInt(thisMatch);
				var thisNum = matches[thisMatch].match(/[0-9]+/);  //_log(3, "add "+thisNum[0] + " to " + aTroops[(pos + 1 + thisMatch)]);
                                if(thisNum > 0) {
				    aTroops[pos + 1 + thisMatch] = parseInt(aTroops[pos + 1 + thisMatch]) + parseInt(thisNum);
                                }
			}

		} else {
			aTroops.push(coordOrigin + '|' + coordPosition);
			for(var thisMatch in matches) {
				var thisNum = matches[thisMatch].match(/[0-9]+/); //_log(3, "new "+thisNum[0]);
				aTroops.push(parseInt(thisNum[0]));
			}
                        aTroops.push(0);  //dummy space for hero from subsequent tables (if he is not present in this one)
		}
		_log(2, "aTroops:\n"+aTroops);


	}

	return aTroops;

		_log(3, "<--parse");
}

function promptKey() {
		_log(3, "-->promptKey");
	//var sAuthKey = getVariable("TTU_KEY", false);
	var newKey = false;
	var newKey = prompt(t("Troop tool Updater:") + "\n" + t("Enter the authentication key from your Troop tool profile") + "\n", sAuthKey);
	var re = /^http[s]?:\/\/[./?=&a-zA-Z0-9\-]*$/i;
//	if(re.test(newKey)) {
    if (1){
        _log(2, "zadana platna adresa");
		setVariable("TTU_KEY", newKey);
		location.reload();
	} else {
			_log(2, "zadana NEplatna adresa!");
	}
		_log(3, "<--promptKey");
}

function onLoad() {
	sAuthKey = getVariable("TTU_KEY", false);
	GM_registerMenuCommand(t("Troop Tool Updater setup"), promptKey);
	var re = /.*build\.php.*/i;
	if (re.test(window.location.href)) {
		createLink();
	}
}