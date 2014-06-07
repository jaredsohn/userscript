// ==UserScript==
// @name			AAGS
// @namespace		AllyAttacksGeneralScript
// @include			http://s9.de.ikariam.com/index.php?view=embassyGeneralAttacksToAlly*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://home.arcor.de/fwbflbed/627user.js
// @require			http://home.arcor.de/fwbflbed/573user.js
// @require			http://home.arcor.de/fwbflbed/577user.js
//
// @version			1.03
// ==/UserScript==


ScriptUpdater.check(87606, "1.03");


var gameServer = top.location.host;
var stringToSend = '';


Config.scriptName = "Angriffe auf die Allianz - Generals-Skript";
Config.tabs = {
	"Allgemein":{
		html:'<p>Hier muss das Generals-Passwort eingegeben werden, um Daten übertragen zu können.</p>',
		fields:{
			gPassKey:{
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
IkaTools.addOptionsLink("Angriffe auf die Allianz - Generals-Skript");

Array.prototype.contains = function (elem) {
  var i;
  for (i = 0; i < this.length; i++) {
    if (this[i] == elem) {
      return true;
    }
  }

  return false;
};
function CityInfos(cid, cname, ccoord, cowner, calli, calliId) {
	this.cityId = cid;
	this.cityName = cname;
	this.coordinates = '[' + ccoord + ']';
	this.owner = cowner;
	this.alliance = calli;
	this.allianceId = calliId;
}
function AttackerInfos(aname, aally, aallyid) {
	this.attackerName = aname;
	this.attackerAlliance = aally;
	this.attackerAllianceId = aallyid;
}
getInfosFromSite = function(urlToParse, functionToCall) {
	GM_xmlhttpRequest({
		method:'GET',
		url: urlToParse,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://home.arcor.de'
		},
		onload: function(response) {
			var content = response.responseText;
			functionToCall(content);
		}
	});
};
getPlayerId = function(textToParse) {
	playerID = (((textToParse.split('id="options_debug"')[1]).split('</td>')[0]).split('<td>')[1]).replace(/^\s+|\s+$/g,"");
	GM_setValue('myPlayerID', playerID);
};
getAllyId = function(textToParse) {
	allyID = ((((textToParse.split('id="allyinfo"')[1]).split('</tbody>')[0]).split('view=sendIKMessage&msgType=51&allyId=')[1]).split('">')[0]).replace(/^\s+|\s+$/g,"");
	GM_setValue('myAllyID', allyID);
};
getInfosFromCityId = function(cityIdForLink, i) {
	GM_xmlhttpRequest({
		method:'GET',
		url: 'http://' + gameServer + '/index.php?view=island&cityId=' + cityIdForLink,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;	
			try {
				var cid = cityIdForLink;
				var ccoord = (((content.split('id="infocontainer"')[0]).split('id="breadcrumbs"')[1]).split('[')[1]).split(']')[0];
				
				
				var cname = (((((content.split(', '+cid+', ')[2]).split('?view=transport&amp;destinationCityId='+cid)[0]).split('class="citylevel"')[0]).split('</span>')[1]).split('</li')[0]).replace(/^\s+|\s+$/g,"");
				var cowner = (((((content.split(', '+cid+', ')[2]).split('?view=transport&amp;destinationCityId='+cid)[0]).split('Spieler:')[1]).split('</span>')[1]).split('<a')[0]).replace(/^\s+|\s+$/g,"");
				var alli = ((((((content.split(', '+cid+', ')[2]).split('?view=transport&amp;destinationCityId='+cid)[0]).split('class="ally"')[1]).split('<a')[1]).split('</a')[0]).split('>')[1]).replace(/^\s+|\s+$/g,"");
				var alliId = '';
				if(alli != '-') {
					alliId = ((((((content.split(', '+cid+', ')[2]).split('?view=transport&amp;destinationCityId='+cid)[0]).split('class="ally"')[1]).split('</a>')[1]).split('href="')[1]).split('"')[0]).split('allyId=')[1];
				} else {
					alliId = false;
				}
			
				var infos = new CityInfos(cid, cname, ccoord, cowner, alli, alliId);			
				cityInfoArray.push(infos);			
				if(i != 0) {
					--i;
					getInfosFromCityId(httpRequestIds[i], i);
				} else if (i == 0) {
					continueProcessing();
				}
			} catch (err) {
				// console.debug('err--getInfosFromCityId', err);
			}
		}
	});
};
getInfosFromAttackerName = function(attackerNameForLink, m) {
	GM_xmlhttpRequest({
		method:'GET',
		url: 'http://' + gameServer + '/index.php?view=highscore&highscoreType=defense&searchUser=' + attackerNameForLink,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;	
			try {
				var results = ((content.split('class="table01">')[2]).split('class="contentBox01h"')[0]).split('<tr');
				var aally = '';
				var aallyid = '';
				for each (var result in results) {
					try {
						var searchName = (result.split('class="name">')[1]).split('</td>')[0];
						if(searchName == attackerNameForLink) {
							aally = ((result.split('class="allytag">')[1]).split('</a>')[0]).split('">')[1];
							aallyid = ((result.split('class="allytag">')[1]).split('allyId=')[1]).split('">')[0];
						}
					} catch (err) {
						//alert(err);
					}
				}
				
				var infos = new AttackerInfos(attackerNameForLink, aally, aallyid);
				attackerInfoArray.push(infos);
				if(m != 0) {
					--m;
					getInfosFromAttackerName(httpRequestAttackers[m], m);
				} else if(m == 0) {	
					processCityIds();
				}
			} catch (err) {
				//alert(err);
			}
		}
	});
};
	 
continueProcessing2 = function() {	 
	if((GM_getValue('myAllyID') != null) && (GM_getValue('myPlayerID') != null)) {
		// now determine the update time (adapted to s9.de.ikariam.com - time)
		var ikaTimeElement = document.getElementById('servertime').innerHTML;
		var month = parseInt(ikaTimeElement.substring(3,5)) - 1;
		if(ikaTimeElement.substring(12,13) == ':') {
			var ikaTimeDate = new Date(ikaTimeElement.substring(6,10), month, ikaTimeElement.substring(0,2), ikaTimeElement.substring(11,12), ikaTimeElement.substring(13,15), ikaTimeElement.substring(16));
		} else {
			var ikaTimeDate = new Date(ikaTimeElement.substring(6,10), month, ikaTimeElement.substring(0,2), ikaTimeElement.substring(11,13), ikaTimeElement.substring(14,16), ikaTimeElement.substring(17));
		}
		var ikaTime = ikaTimeDate.getTime();
		var timeDifference = parseInt((new Date().getTime() - ikaTime)/1000);
		
		var updateTime = (new Date().getTime() - (timeDifference)*1000);
		var passKey = Config.get('gPassKey');
		stringToSend = '<time>' + updateTime + stringToSend;

		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://dafreac.bplaced.net/alat/AA.php?pid='+playerID+'&aid='+allyID+'&valkey='+passKey,
			data: 'mydata=' + stringToSend,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			onload: function(response) {
				var content = response.responseText;
				var result = content.match(/Access\sdenied/g);
				if(result) {
					alert('Fehlende Berechtigung(en)!\n\nDu bist entweder nicht berechtigt dieses Skript zu verwenden oder hast das falsche Passwort eingegeben!');
				}
			}
		});	
	} else {
		alert('Deine Player-ID und Ally-ID wurden noch nicht gespeichert.\nBitte aktualisiere die Seite noch einmal, dann sollte es funktionieren!');
	}
};

function processAttackers() {
	// create new Array to store all different attacker names for getting their alliances
	for (var i = 0; i < attackerNames.length; ++i) {
		if(!(httpRequestAttackers.contains(attackerNames[i]))) {
			httpRequestAttackers.push(attackerNames[i]);
		}
	}
	// now make an >>HTTP-REQUEST<< for each attacker in that array
	var k = httpRequestAttackers.length - 1;
	getInfosFromAttackerName(httpRequestAttackers[k], k);
}

function processCityIds() {
	// create new Array to store all different cityIds (attacker and defender), so that there is just 1 HTTP-Request for each city
	for (var i = 0; i < attackerCid.length; ++i) {
		if(!(httpRequestIds.contains(attackerCid[i]))) {
			httpRequestIds.push(attackerCid[i]);
		}
	}
	for (var i = 0; i < defenderCid.length; ++i) {
		if(!(httpRequestIds.contains(defenderCid[i]))) {
			httpRequestIds.push(defenderCid[i]);
		}
	}
	// now make an >>HTTP-REQUEST<< for each cityId in that array
	var j = httpRequestIds.length - 1;
	getInfosFromCityId(httpRequestIds[j], j);
}

//##############################################################

var time = new Array();
var action = new Array();
var units = new Array();
var attackerNames = new Array();
var attackerCid = new Array();
var allyMember = new Array();
var defenderCid = new Array();
var playerID = '';
var allyID = '';

var httpRequestAttackers = new Array();
var attackerInfoArray = new Array();

var httpRequestIds = new Array();
var cityInfoArray = new Array();


// set player-ID and Ally-ID
if(GM_getValue('myPlayerID') == null) {
	getInfosFromSite('http://s9.de.ikariam.com/index.php?view=options&page=game', getPlayerId);
} else {
	playerID = GM_getValue('myPlayerID');
}
if(GM_getValue('myAllyID') == null) {
	getInfosFromSite('http://s9.de.ikariam.com/index.php?view=diplomacyAdvisorAlly', getAllyId);
} else {
	allyID = GM_getValue('myAllyID');
}


var baseElement = document.getElementsByClassName('table01')[0];
var attackWaves = baseElement.getElementsByClassName('rowRanks');
try {
	for each(attack in attackWaves) {
		var tempTime = (attack.firstChild.nextSibling.innerHTML).replace(/^\s+|\s+$/g,"");
		var enddate = ((tempTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"");
		var timeID = (tempTime.split('id="')[1]).split('"')[0];
		time.push(enddate + '<ID>' + timeID);
		action.push(attack.firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		units.push(attack.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		var aElements = attack.getElementsByTagName('a');
		attackerNames.push(aElements[0].innerHTML);
		attackerCid.push((aElements[0].href).split('cityId=')[1]);
		var name = (aElements[1].innerHTML).replace(/&nbsp;/g,' ');
		allyMember.push(name);
		defenderCid.push((aElements[1].href).split('cityId=')[1]);
	}

	processAttackers();

	/*
	Abfolge:
	-> processAttackers()
	-> getInfosFromAttackerName()
	-> processCityIds()
	-> getInfosFromCityId()
	-> continueProcessing()
	-> continueProcessing2()
	*/
	
} catch (err) {
	//alert(err);
	stringToSend = '<attack0>Derzeit werden keine Mitglieder Deiner Allianz angegriffen.';
	continueProcessing2();
}	


continueProcessing = function() {
	stringToSend = '<attack0>';
	for (var i = 0; i < attackerNames.length; ++i) {		// for each attack
		var attackString = '<attack><line>';
		attackString += time[i] + '<line>';
		attackString += action[i] + '<line>';
		attackString += units[i] + '<line>';
		attackString += attackerNames[i] + '<line>';
		
		// attacker city id -> infos aus cityInfoarray holen
		for (var j = 0; j < cityInfoArray.length; ++j) {
			if(cityInfoArray[j].cityId == attackerCid[i]) {
				if(cityInfoArray[j].owner == attackerNames[i]) {
					attackString += cityInfoArray[j].alliance + '<line>';
					attackString += cityInfoArray[j].allianceId + '<line>';
				} else {
					for (var k = 0; k < attackerInfoArray.length; ++k) {
						if(attackerInfoArray[k].attackerName == attackerNames[i]) {
							attackString += attackerInfoArray[k].attackerAlliance + '<line>';
							attackString += attackerInfoArray[k].attackerAllianceId + '<line>';
						}
					}
				}
				attackString += cityInfoArray[j].cityId + '<line>';
				attackString += cityInfoArray[j].cityName + '<line>';
				attackString += cityInfoArray[j].coordinates + '<line>';
			}
		}
		
		attackString += allyMember[i] + '<line>';
		
		// defender city id -> infos aus cityInfoarray holen
		for (var j = 0; j < cityInfoArray.length; ++j) {
			if(cityInfoArray[j].cityId == defenderCid[i]) {
				attackString += cityInfoArray[j].alliance + '<line>';
				attackString += cityInfoArray[j].allianceId + '<line>';
				attackString += cityInfoArray[j].cityId + '<line>';
				attackString += cityInfoArray[j].cityName + '<line>';
				attackString += cityInfoArray[j].coordinates;
			}
		}
		
		stringToSend += attackString;
	}
	continueProcessing2();
};	




setInterval("document.location.reload()", 540000); // page reload every 9 minutes