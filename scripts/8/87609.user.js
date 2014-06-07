// ==UserScript==
// @name			AA
// @namespace		AA
// @include			http://s9.de.ikariam.com/index.php*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://home.arcor.de/fwbflbed/627user.js
// @require			http://home.arcor.de/fwbflbed/573user.js
// @require			http://home.arcor.de/fwbflbed/577user.js
//
// @version			1.10
// ==/UserScript==


ScriptUpdater.check(87609, "1.10");

// ==========================================================================================================================================
// =============================================================== CSS-Styles ===============================================================
// ==========================================================================================================================================
GM_addStyle('.centr { text-align: center; } ');
GM_addStyle('.padding { padding: 0 !important; } ');
GM_addStyle('.garnision { background-color: #FFD0BF !important; } ');
GM_addStyle('.bruch { background-color: #FCE656 !important; } ');
GM_addStyle('.diplo { background-color: #ADD8E6 !important; } ');
GM_addStyle('.contentBox01h .eventbar2closed { background-image: url("skin/interface/x674_dropdown.gif"); background-position: 0 0; height: 22px; line-height: 22px; position: relative; } ');
GM_addStyle('.contentBox01h .eventbar2closed:hover { background-position: 0 -23px; } ');
GM_addStyle('.contentBox01h .eventbar2open { background-image: url("skin/interface/x674_dropdown.gif"); background-position: 0 -46px; height: 22px; line-height: 22px; position: relative; } ');
GM_addStyle('.contentBox01h .eventbar2open:hover { background-position: 0 -69px; } ');
GM_addStyle('.eventbarText { font-size: 11px; padding-left: 20px; } ');

// ==========================================================================================================================================
// ============================================================ Global variables ============================================================
// ==========================================================================================================================================
var gameServer = top.location.host;
var playerID = '';
var allyID = '';
var passKey = '';

var ikaTimeElement = document.getElementById('servertime').innerHTML;
var month = parseInt(ikaTimeElement.substring(3,5)) - 1;
if(ikaTimeElement.substring(12,13) == ':') {
	var ikaTimeDate = new Date(ikaTimeElement.substring(6,10), month, ikaTimeElement.substring(0,2), ikaTimeElement.substring(11,12), ikaTimeElement.substring(13,15), ikaTimeElement.substring(16));
} else {
	var ikaTimeDate = new Date(ikaTimeElement.substring(6,10), month, ikaTimeElement.substring(0,2), ikaTimeElement.substring(11,13), ikaTimeElement.substring(14,16), ikaTimeElement.substring(17));
}
var ikaTime = ikaTimeDate.getTime();
var timeDifference = parseInt((new Date().getTime() - ikaTime)/1000);


// ==========================================================================================================================================
// ================================================================= Options ================================================================
// ==========================================================================================================================================
Config.scriptName = "Angriffe auf die Allianz";
Config.tabs = {
	"Allgemein":{
		html:'<p>Hier muss das Passwort eingegeben werden, um Zugriff auf die Daten zu erhalten.</p>',
		fields:{
			passKey:{
				type:'text',
				label:'Passwort',
				width:100,
			},
		}
	},
	"Info":{
		html:'<p>Wer nicht weis, wofür dieses Skript gedacht ist, wird damit nichts anfangen können.<br>Alle anderen wissen wohin sie sich bei Fragen und/oder Problemen wenden müssen ;-)</p>',
	}
};
IkaTools.addOptionsLink("Angriffe auf die Allianz");


// ==========================================================================================================================================
// ================================================================ Functions ===============================================================
// ==========================================================================================================================================

appending = function(element, className, parent, text, span) {
	var newElement = document.createElement(element);
	newElement.className = className;
	if (span) {
		newElement.setAttribute('colSpan',span);
	}
	if (text) {
		var newText = document.createTextNode(text);
		newElement.appendChild(newText);
	}
	parent.appendChild(newElement);
	return newElement;
};

function checkCurrentViewEqual(name)	{
	if(getRequestParam('view') == name)	{
		return true;
	} else {
		return false;
	}
}

function checkCurrentTabEqual(name)	{
	if(getRequestParam('tab') == name)	{
		return true;
	} else {
		return false;
	}
}

function checkCurrentActionEqual(name)	{
	if(getRequestParam('action') == name)	{
		return true;
	} else {
		return false;
	}
}

function checkCurrentMissionEqual(name)	{
	if(getRequestParam('mission') == name)	{
		return true;
	} else {
		return false;
	}
}

function checkCurrentMission(name)	{
	var mission = document.getElementsByClassName('job')[0];
	if(mission.nextSibling.nextSibling.innerHTML == name)	{
		return true;
	} else {
		return false;
	}
}

function getRequestParam( name )
{
	var site = window.location.href;
	try {
		var retVal = site.split(name+'=')[1];
	} catch (err) {
		return false;
	}
	try {
		return retVal.split('&')[0];
	} catch (err) {
		return retVal;
	}
}
// =====================================================================================
// ######## function to convert the JS Date format into a more readable format #########
// =====================================================================================
fmtDate = function(param1) {
	var dateArray = new Array();
	dateArray[0] = param1.getDate();
	if (dateArray[0].toString().length == 1) {
		dateArray[0] = '0' + dateArray[0];
	}
	dateArray[1] = param1.getMonth() + 1;
	dateArray[2] = param1.getFullYear();
	if (dateArray[1].toString().length == 1) {
		dateArray[1] = '0' + dateArray[1];
	}
	dateArray[3] = param1.getHours();
	if (dateArray[3].toString().length == 1) {
		dateArray[3] = '0' + dateArray[3];
	}
	dateArray[4] = param1.getMinutes();
	if (dateArray[4].toString().length == 1) {
		dateArray[4] = '0' + dateArray[4];
	}
	dateArray[5] = param1.getSeconds();
	if (dateArray[5].toString().length == 1) {
		dateArray[5] = '0' + dateArray[5];
	}
	return dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2] + ' ' + dateArray[3] + ':' + dateArray[4] + ':' +dateArray[5];
};
// =========================================
// ######## for the Pulldown Div's #########
// =========================================
function showHideBlock(elementID, ownElement) {
	var box = document.getElementById(elementID);
	if(box.style.display == 'none') {
		box.style.display = '';
		ownElement.className = 'eventbar2open eventbarText';
	} else {
		box.style.display = 'none';
		ownElement.className = 'eventbar2closed eventbarText';
	}
}
// ========================================================================
// ######## General function for getting Data from external sites #########
// ========================================================================
function getExternalPage(page, functionToCall) {
	GM_xmlhttpRequest({
		method:'GET',
		url: page,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://home.arcor.de'
		},
		onload: function(response) {
			functionToCall(response.responseText);
		}
	});
}

// ======================================================
// ######## functions for PLAYER-ID and ALLY-ID #########
// ======================================================
getPlayerId = function(textToParse) {
	playerID = (((textToParse.split('id="options_debug"')[1]).split('</td>')[0]).split('<td>')[1]).replace(/^\s+|\s+$/g,"");
	GM_setValue('myPlayerID', playerID);
};

getAllyId = function(textToParse) {
	allyID = ((((textToParse.split('id="allyinfo"')[1]).split('</tbody>')[0]).split('view=sendIKMessage&msgType=51&allyId=')[1]).split('">')[0]).replace(/^\s+|\s+$/g,"");
	GM_setValue('myAllyID', allyID);
};

// ===========================================================================================================================================
// ============================================================== AA Functions ===============================================================
// ===========================================================================================================================================
function createAllianceAttacksDiv(allyName, boxNo) {

	var crTop = document.getElementById('mainview');

	var newBox = document.createElement('div');
	newBox.className = 'contentBox';
	newBox.id = 'attacksOnAlliance' + boxNo;

	var h3header = appending('h3', 'header', newBox);
		h3header.innerHTML = 'Angriffe auf ' + allyName + ' - (';
	var divContent = appending('div', 'content', newBox);
	var table = appending('table', 'locationEvents', divContent);
	table.setAttribute('width', '100%');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('border', '0');
		var tbody = appending('tbody', '', table);
			var trHead = appending('tr', '', tbody);
			trHead.setAttribute('style', 'font-weight: bold; background-color: rgb(250, 234, 198); background-repeat: repeat-x;');
				var tdHead1 = appending('td', 'centr', trHead, 'Ankunft / Dauer');
					tdHead1.setAttribute('style', 'background-repeat: repeat-x; width: 50px; padding: 0pt;');
				var tdHead2 = appending('td', 'centr', trHead, 'Mission / Aktion');
					tdHead2.setAttribute('style', 'width: 60px;');
				var tdHead3 = appending('td', 'centr', trHead, 'Einheiten');
					tdHead3.setAttribute('style', 'width: 40px;  padding: 0pt;');
				var tdHead4 = appending('td', 'centr', trHead, 'Angreifer');
					tdHead4.setAttribute('style', 'width: 70px; padding: 0pt;');
				var tdHead6 = appending('td', 'centr', trHead, 'Angriff aus');
					tdHead6.setAttribute('style', 'width: 60px; padding: 0pt;');
				var tdHead7 = appending('td', 'centr', trHead, 'Ally-Mitglied');
					tdHead7.setAttribute('style', 'width: 75px; padding: 0pt;');
				var tdHead8 = appending('td', 'centr', trHead, 'Ziel');
					tdHead8.setAttribute('style', 'width: 50px;');
		
	var divFooter = appending('div', 'footer', newBox);
	document.getElementById('mainview').appendChild(newBox);
}

function receiveAllyAttacksData(page, functionToCall, allyName, boxNo) {
	if((GM_getValue('myAllyID') != null) && (GM_getValue('myPlayerID') != null)) {
		GM_xmlhttpRequest({
			method:'GET',
			url: 'http://www.caipiranha.de/FAIR/alat/getPage.php?pid='+playerID+'&aid='+allyID+'&valkey='+passKey+'&value='+page,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Referer': 'http://home.arcor.de'
			},
			onload: function(response) {
				functionToCall(response.responseText, allyName, boxNo);
			}
		});
	} else {
		alert('Deine Player-ID und Ally-ID wurden noch nicht gespeichert.\nBitte aktualisiere die Seite noch einmal, dann sollte es funktionieren!');
	}
}

function processAttacksPage(content, allyName, boxNo) {
	var result = content.match(/Access\sdenied/g);
	var box = document.getElementById('attacksOnAlliance' + boxNo);
	if(!(result)) {
		try {
			var updateTime = (content.split('<time>')[1]).split('<attack0>')[0];
			if(updateTime < (new Date().getTime() - (15*60+timeDifference)*1000)) {
				if(updateTime > (new Date().getTime() - (120*60+timeDifference)*1000)) {
					var color = '<span style="color: orange">';
				} else {
					var color = '<span style="color: red">';
				}
			} else {
				var color = '<span style="color: green">';
			}
			
			updateTime = fmtDate(new Date(parseInt(updateTime)));
			box.getElementsByTagName('h3')[0].innerHTML += color + updateTime + '</span>)';
			
			var stringToParse = (content.split('<attack0>')[1]).split('</body>')[0];
			if(stringToParse == 'Derzeit werden keine Mitglieder Deiner Allianz angegriffen.') {
				var stringToParse = 'Derzeit werden keine Mitglieder der Allianz ' + allyName + ' angegriffen.'
				var newTr = document.createElement('tr');
				appending('td', 'centr', newTr, stringToParse, 7);
				box.getElementsByTagName('tbody')[0].appendChild(newTr);
				if(allyName == 'FAIR') {
					receiveAllyAttacksData('AA2', processAttacksPage, 'FAIRw', 2);
				}
			} else {
				parseAttackString(stringToParse, allyName, boxNo);
			}
		} catch (err) {
			//alert(err);
		}
	} else {
		newBox.innerHTML = '';
		alert('Fehlende Berechtigung(en)!\n\nDu bist entweder nicht berechtigt dieses Skript zu verwenden oder hast das falsche Passwort eingegeben!');
	}
}

function parseAttackString(stringToParse, allyName, boxNo) {
	try {
		var numberOfAttacks = stringToParse.split('<attack>');
		var newTime = document.createElement('script');
		newTime.setAttribute('type', 'text/javascript');	
		var newTimeInsert = 'Event.onDOMReady(function() {';
		
		for (var i = 1; i < numberOfAttacks.length; ++i) {
		
			var informations = (numberOfAttacks[i]).split('<line>');
			
			var j = 1;
			var newTr = document.createElement('tr');
				var td1 = document.createElement('td');
					td1.setAttribute('id', 'researchCountDown'+attackCounter[attackCounterI]+'');
					td1.setAttribute('title', 'Ankunftszeit');
					newTr.appendChild(td1);
					
					var timeElements = informations[1].split('<ID>');
					var curTime = parseInt((new Date().getTime() - (timeDifference)*1000)/1000);
					
					newTimeInsert += 'getCountdown({enddate: '+timeElements[0]+', currentdate: '+curTime+', el: "researchCountDown'+attackCounter[attackCounterI]+'"}); ';
					
					++attackCounterI;
					
				var td2 = appending('td', 'centr', newTr);
					td2.innerHTML = informations[2];
				var td3 = appending('td', 'centr', newTr);
					td3.innerHTML = informations[3];
				var td4 = appending('td', 'centr', newTr);
					if(informations[6] != 'undefined') {
						td4.innerHTML = informations[4] + ' (<a href="?view=sendIKMessage&allyId='+informations[6]+'">' + informations[5] + '</a>)';
					} else {
						td4.innerHTML = informations[4] + ' (-)';
					}
				var td5 = appending('td', 'centr', newTr);
					td5.innerHTML = '<a href="?view=island&cityId='+informations[7]+'">' + informations[8] + ' ' + informations[9] + '</a>';
				var td6 = appending('td', 'centr', newTr);
					td6.innerHTML = informations[10] + ' (' + informations[11] + ')';
				var td7 = appending('td', 'centr', newTr);
					td7.innerHTML = '<a href="?view=island&cityId='+informations[13]+'">' + informations[14] + ' ' + informations[15] + '</a>';

			document.getElementById('attacksOnAlliance' + boxNo).getElementsByTagName('tbody')[0].appendChild(newTr);
		}
		newTimeInsert += '} )';
		newTime.innerHTML = newTimeInsert;
		document.getElementsByTagName('body')[0].appendChild(newTime);	
	} catch(err) {
		alert('ERROR\n Es hat sich ein Fehler beim Darstellen der Angriffe ereignet.\n\n' + err);
	}
	if(allyName == 'FAIR') {
		receiveAllyAttacksData('AA2', processAttacksPage, 'FAIRw', 2);
	}
}

function allyReihenfolge() {
	
}

// ===========================================================================================================================================
// ============================================================== NV Functions ===============================================================
// ===========================================================================================================================================

// ==================================================================
// ######## Button Functions for Messages Spy Report Saving #########
// ==================================================================
function createOptionsLayer(position, width, left, top) {	
	var layer = document.createElement("div");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = "alliance-options";
	style.nodeValue = "-moz-border-radius:5px;margin:2px auto;padding:1px;width:"+width+"px;position: relative;left: "+left+"px;"+position+": "+top+"px;";
	layer.setAttributeNode(id);
	layer.setAttributeNode(style);
	
	
	var title = document.createElement("div");
	var tn = document.createTextNode("für Allianz-Interna");
	title.appendChild(tn);
	style = document.createAttribute("style");
	style.nodeValue = "color:#b03937;text-align:left;font-size:9px;";
	title.setAttributeNode(style);

	var content = document.createElement("div");
	id = document.createAttribute("id");
	style = document.createAttribute("style");
	id.nodeValue = "alliance-options-content";
	style.nodeValue = "color:#542c0f;text-align:center;-moz-border-radius:2px;padding:2px;border:1px solid #e4b873;background-color:#faeac6;font-size:9px;opacity: .9;";
	content.setAttributeNode(id);
	content.setAttributeNode(style);

	content.appendChild(title);
	layer.appendChild(content);
	
	return layer;
}
function createAllyInputField() {
	var input = document.createElement('input');
	input.id = 'AllyDefinerInput';
	input.size = 8;
	input.maxLength = 5;
	input.align = 'center';
	input.defaultValue = 'Allianz?';
	var style = document.createAttribute("style");
	style.nodeValue = 'font-size:9px;color:#542c0f;';
	input.setAttributeNode(style);
	return input;
}
function createAllySaveButton(text, i) {
	var button = document.createElement("button");
	button.id = 'AllyDefinerButton'+i;
	var style = document.createAttribute("style");
	style.nodeValue = "display:inline;width:auto;white-space:nowrap;border:2px double #5d4c2f;border-top-color:#c9a584;border-left-color:#c9a584;background:#eccf8e url(input/button.gif) repeat-x;font-weight:bold;font-size:9px;align:center;color:#542c0f;";
	button.setAttributeNode(style);
	button.appendChild(document.createTextNode(text));
	return button;
}
function createButton(id_value, text) {
	var button = document.createElement("button");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = id_value;
	style.nodeValue = "display:inline;width:auto;white-space:nowrap;border:3px double #5d4c2f;border-top-color:#c9a584;border-left-color:#c9a584;background:#eccf8e url(input/button.gif) repeat-x;font-weight:bold;font-size:9px;align:center;color:#542c0f;";
	button.setAttributeNode(id);
	button.setAttributeNode(style);
	button.appendChild(document.createTextNode(text));
	return button;
}
function saveAllyMessages(startNode) {
console.debug('startNode: ', startNode);
	var alliance = startNode.getElementsByTagName('input')[0].value;
	if((alliance != 'Allianz?') && (alliance != '')) {
		GM_setValue('allianceNameFromSpyReport', alliance);
		startNode.getElementsByTagName('input')[0].style.display = 'none';
		startNode.getElementsByTagName('button')[0].style.display = 'none';
		
		var main = startNode.firstChild.lastChild;
		if (main.id == "alliance-options-informations") {
			main.parentNode.removeChild(main);
		}
		
		var button = createButton('ally-nachrichtenverkehr', 'Speichere Spionagebericht');
		startNode.firstChild.appendChild(button);
		button.addEventListener('click', function(e) {sendRequest('http://www.caipiranha.de/FAIR/alat/saveNachrichten.php', e.target.parentNode.parentNode.parentNode.parentNode.previousSibling, e.target.parentNode); e.preventDefault();}, false);
	} else {
		var main = startNode.firstChild.lastChild;
		if (main.id != "alliance-options-informations") {
			var text = document.createElement("div");
			id = document.createAttribute("id");
			style = document.createAttribute("style");
			id.nodeValue = "alliance-options-informations";
			style.nodeValue = "border-top:1px solid #808080;padding:2px;";
			text.setAttributeNode(id);
			text.setAttributeNode(style);
			startNode.firstChild.appendChild(text);
		}	
		startNode.firstChild.lastChild.innerHTML += '<span style="color:red">FEHLER!<br>Bitte Allianz angeben von der dieser SB stammt!</span><br>';
	}
}

// ==============================================================================
// ######## Functions for actual saving and sending Messages Spy Report #########
// ==============================================================================
function sendRequest(url, startNode, startNodeBox) {
	var report = startNode.getElementsByClassName('report')[0];
	var sendString = splitSpyReport(report);
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: url +'?pid=79769&aid=3464&valkey=c2p602b',
		data: 'mydata=' + encodeURIComponent(sendString),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function(r) {
			if (r.readyState == 4) {
				if (r.status == 200) {
					var main = startNodeBox.lastChild;

					if (main.id != "alliance-options-informations") {
						var text = document.createElement("div");
						id = document.createAttribute("id");
						style = document.createAttribute("style");
						id.nodeValue = "alliance-options-informations";
						style.nodeValue = "border-top:1px solid #808080;padding:2px;";
						text.setAttributeNode(id);
						text.setAttributeNode(style);
						startNodeBox.appendChild(text);
					}	
					
					startNodeBox.lastChild.innerHTML += r.responseText;
				} else {
					alert("There was a problem with the request. Please try again! ("+r.status+")");
				}
			}
		}
	});
}
function splitSpyReport(element) {
	var retVal = '<message0>';
	if(element.innerHTML == ' Momentan sind keine Nachrichten verfügbar.') {
		retVal += 'Momentan sind keine Nachrichten verfügbar.';
	} else {
		var rows = element.getElementsByTagName('tr');
		retVal += GM_getValue('allianceNameFromSpyReport');  // Allianz
		for (var i = 1; i < rows.length; ++i) {
			var columns = rows[i].getElementsByTagName('td');
			var messageString = '<message>'; 
			
			var links = columns[0].getElementsByTagName('a');
			if(links.length == 2) {
				messageString += '<line><a href="'+links[0].href+'">'+links[0].innerHTML+'</a>';
				messageString += '<line><a href="'+links[1].href+'">'+links[1].innerHTML+'</a>';
			} else {
				messageString += '<line>-<line><a href="'+links[0].href+'">'+links[0].innerHTML+'</a>';
			}
			
			messageString += '<line>'+columns[1].innerHTML;
			messageString += '<line>'+columns[2].innerHTML;
			
			var links = columns[3].getElementsByTagName('a');
			if(links.length == 2) {
				messageString += '<line><a href="'+links[1].href+'">'+links[1].innerHTML+'</a>';
				messageString += '<line><a href="'+links[0].href+'">'+links[0].innerHTML+'</a>';
			} else {
				messageString += '<line><a href="'+links[0].href+'">'+links[0].innerHTML+'</a><line>-';
			}
			
			retVal += messageString;
		}
	}
	return retVal;
}

// =========================================================
// ######## Function for showing Messages Overview #########
// =========================================================
function createMessageDivBox(number, ally) {
	var newBox = document.createElement('div');
	newBox.className = 'contentBox01h';
	newBox.id = 'messages-Box' + number;

	var h3header = appending('h3', 'header', newBox);
		h3header.innerHTML = 'Nachrichtenverkehr der Allianz ' + ally;
	var divContent = appending('div', 'content', newBox);
	var table = appending('table', '', divContent);
	table.setAttribute('width', '100%');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('border', '1');
	table.style.display = 'none';
	table.id = 'messages-Table' + number;
		var tbody = appending('tbody', '', table);
			tbody.id = 'messagesBoxBody' + number;
			var trHead = appending('tr', '', tbody);
			trHead.setAttribute('style', 'font-weight: bold; background-color: rgb(250, 234, 198); background-repeat: repeat-x;');
				var tdHead1 = appending('td', 'centr', trHead, 'Koord');
					tdHead1.setAttribute('style', 'background-repeat: repeat-x; width: 50px; padding: 5pt 0;');
				var tdHead2 = appending('td', 'centr', trHead, 'Absender');
					tdHead2.setAttribute('style', 'width: 110px;  padding: 5pt 0;');
				var tdHead3 = appending('td', 'centr', trHead, 'Betreff');
					tdHead3.setAttribute('style', 'width: 212px;  padding: 5pt 0;');
				var tdHead4 = appending('td', 'centr', trHead, 'Datum');
					tdHead4.setAttribute('style', 'width: 130px; padding: 5pt 0;');
				var tdHead5 = appending('td', 'centr', trHead, 'Empfänger');
					tdHead5.setAttribute('style', 'width: 110px; padding: 5pt 0;');
				var tdHead6 = appending('td', 'centr', trHead, 'Koord');
					tdHead6.setAttribute('style', 'width: 50px; padding: 5pt 0;');	

	var divPulldown = appending('div', 'eventbar2closed eventbarText', divContent);
		divPulldown.id = 'messages-PulldownDiv' + number;
	divPulldown.addEventListener('click', function(e) {showHideBlock('messages-Table'+number, this); e.preventDefault();}, false);
					
	var divFooter = appending('div', 'footer', newBox);

	document.getElementById('troopsOverview').appendChild(newBox);
}
function processMessages(content) {
	var result = content.match(/Access\sdenied/g);
	if(!(result)) {
		try {
			var alliances = content.split('[Allianz]');
			
			for(var i = 1; i < alliances.length; ++i) {
				var rows = alliances[i].split('[Zeile]');
				
				createMessageDivBox(i, rows[0]);
				
				var idToSearch = 'messagesBoxBody' + i;
				var insertBody = document.getElementById(idToSearch);
				
				for(var j = 1; j < rows.length; ++j) {
					var columns = rows[j].split('[Spalte]');
					var inserted = 0;
					
					// wenn Garnisionsrecht angefragt oder abgelehnt wird, Zeile mit Farbe unterlegen!
					var garni = (columns[3]).match(/Garnisonsrecht/g);
					if(garni) {
						var newTr = appending('tr', 'garnision', insertBody);
						inserted = 1;
					}
					// Betreff "Vertragsbruch" auch mit Farbe unterlegen
					var garni = (columns[3]).match(/Vertragsbruch/g);
					if(garni) {
						var newTr = appending('tr', 'bruch', insertBody);
						inserted = 1;
					}
					// Betreff "Diplomat kontaktieren" auch mit Farbe unterlegen
					var garni = (columns[3]).match(/Diplomat/g);
					if(garni) {
						var newTr = appending('tr', 'diplo', insertBody);
						inserted = 1;
					} 
					if(!(inserted)) {
						var newTr = appending('tr', '', insertBody);
					}
					
					var td1 = appending('td', 'centr padding', newTr);
						td1.innerHTML = columns[1];
					var td2 = appending('td', 'centr padding', newTr);
						td2.innerHTML = columns[2];
					var td3 = appending('td', 'centr padding', newTr);
						td3.innerHTML = columns[3];						
					var td4 = appending('td', 'centr padding', newTr);
						td4.innerHTML = columns[4];
					var td5 = appending('td', 'centr padding', newTr);
						td5.innerHTML = columns[5];
					var td6 = appending('td', 'centr padding', newTr);
						td6.innerHTML = columns[6];
				}
				
				// Anzahl der Nachrichten in EventBar einfügen:
				var idToSearch = 'messages-PulldownDiv' + i;
				document.getElementById(idToSearch).innerHTML = (rows.length - 1) + ' Nachrichten';
			}
		} catch (err) {
			//alert(err);
		}
	} else {
		var boxes = document.getElementsByClassName('contentBox01h');
		for each(box in boxes) {
			box.style.display = 'none';
		}
		alert('Fehlende Berechtigung(en)!\n\nDu bist entweder nicht berechtigt dieses Skript zu verwenden oder hast das falsche Passwort eingegeben!');
	}
}

// ====================================================================================================
// ========================================= Initialisierung ==========================================
// ====================================================================================================
passKey = Config.get('passKey');

if(GM_getValue('myPlayerID') == null) {
	getExternalPage('http://s9.de.ikariam.com/index.php?view=options&page=game', getPlayerId);
} else {
	playerID = GM_getValue('myPlayerID');
}
if(GM_getValue('myAllyID') == null) {
	getExternalPage('http://s9.de.ikariam.com/index.php?view=diplomacyAdvisorAlly', getAllyId);
} else {
	allyID = GM_getValue('myAllyID');
}


// ===========================================================================================================================================
// ========================================= Definition des Verhaltens auf den verschiedenen Seiten ==========================================
// ===========================================================================================================================================

// internes Speichern von Nachrichtenverlauf-Spionage-Berichten
if(checkCurrentTabEqual('reports')) {
	var repors = document.getElementById('espionageReports');
	var all_reports = repors.getElementsByTagName('table');
	var report = new Array();
	
	for(var i=0; i<all_reports.length; i++) {
		if(all_reports[i].className == 'reportTable') {
			try {
				if(all_reports[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML.match(/Nachrichtenverkehr/g)) {
					report.push(all_reports[i]);
				}
			} catch(err) {
				//alert(err);
			}
		}
	}	
	
	for(var i=0; i<report.length; i++) {
		var box = createOptionsLayer('bottom', 200, 20, 0);
		var inputField = createAllyInputField();
		box.firstChild.appendChild(inputField);
		var inputFieldButton = createAllySaveButton('Speichern', i);
		box.firstChild.appendChild(inputFieldButton);
		
		var elementRow = document.createElement('tr');
		var elementColumn = document.createElement('td');
		elementColumn.setAttribute('colSpan','2');
		elementColumn.appendChild(box);
		elementRow.appendChild(elementColumn);
		
		report[i].parentNode.parentNode.parentNode.insertBefore(elementRow, report[i].parentNode.parentNode.nextSibling);
		inputFieldButton.addEventListener('click', function(e) {saveAllyMessages(e.target.parentNode.parentNode); e.preventDefault();}, false);
	}
}

// "Archiv" -> "Nachrichtenverkehr"
if(checkCurrentViewEqual('militaryAdvisorMilitaryMovements') || checkCurrentViewEqual('militaryAdvisorCombatReports') || checkCurrentViewEqual('militaryAdvisorCombatReportsArchive')) {
	
	var box = document.getElementsByClassName('yui-nav')[0];
	box.getElementsByTagName('a')[2].innerHTML = '<em>Nachrichtenverkehr</em>';
}

// Nachrichtenverkehr-Übersicht im Archiv-Tab einrichten
if(checkCurrentViewEqual('militaryAdvisorCombatReportsArchive')) {
	var box = document.getElementsByClassName('contentBox01h')[0];
	box.style.display = 'none';
	
	if((GM_getValue('myAllyID') != null) && (GM_getValue('myPlayerID') != null)) {
		getExternalPage('http://www.caipiranha.de/FAIR/alat/getPage.php?pid='+playerID+'&aid='+allyID+'&valkey='+passKey+'&value=Messages', processMessages);
	} else {
		alert('Deine Player-ID und Ally-ID wurden noch nicht gespeichert.\nBitte aktualisiere die Seite noch einmal, dann sollte es funktionieren!');
	}
}

// Angriffe auf Main und Wing Übersicht einrichten
if(checkCurrentViewEqual('militaryAdvisorMilitaryMovements')) {
	
	var attackCounterI = 0;
	var attackCounter = new Array('fleetRow0', 'fleetRow1', 'fleetRow2', 'fleetRow3', 'fleetRow4', 'fleetRow5', 'fleetRow6', 'fleetRow7', 'fleetRow8', 'fleetRow9', 'fleetRow10', 'fleetRow11', 'fleetRow12', 'fleetRow13', 'fleetRow14', 'fleetRow15', 'fleetRow16', 'fleetRow17', 'fleetRow18', 'fleetRow19', 'fleetRow20', 'fleetRow21', 'fleetRow22', 'fleetRow23', 'fleetRow24', 'fleetRow25', 'fleetRow26', 'fleetRow27', 'fleetRow28', 'fleetRow29');
	
	createAllianceAttacksDiv('FAIR', 1);
	receiveAllyAttacksData('AA', processAttacksPage, 'FAIR', 1);
	
	createAllianceAttacksDiv('FAIRw', 2);
	
}