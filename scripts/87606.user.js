// ==UserScript==
// @name			AAGS
// @namespace		AllyAttacksGeneralScript
// @include			http://s9.de.ikariam.com/index.php?view=embassyGeneralAttacksToAlly*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://home.arcor.de/fwbflbed/627user.js
// @require			http://home.arcor.de/fwbflbed/573user.js
// @require			http://home.arcor.de/fwbflbed/577user.js
//
// @version			1.10
// ==/UserScript==


ScriptUpdater.check(87606, "1.10");


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
	"1-Schiff-Nerv-Angriffe":{
		html:'<p>Hier sind Optionen zu finden um die 1-Schiff-Nerv-Angriffe auszublenden, wenn diese übermäßig viele werden.</p>',
		fields:{
			attOnRoute:{
				type:'checkbox',
				text:'Ausblenden aller 1-Schiff <b>Angriffe</b> mit der Mission: "Hafen einnehmen <b>(unterwegs)</b>"',
				value:false,
			},
			// attAtPort:{
				// type:'checkbox',
				// text:'Ausblenden aller 1-Schiff <b>Hafenbesatzungen</b> mit der Mission: "Hafen einnehmen"',
				// value:false,
			// },
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
			'User-agent': 'Mozilla/5.0',
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
			'User-agent': 'Mozilla/5.0',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;	
			try {
				var cid = cityIdForLink;
				var ccoord = (((content.split('id="infocontainer"')[0]).split('id="breadcrumbs"')[1]).split('[')[1]).split(']')[0];
				// console.log(ccoord);	
					
				var cname = ((((content.split(', '+cid+', ')[2]).split('class="cityactions"')[0]).split('<td colspan="3">')[1]).split('</td>')[0]).replace(/^\s+|\s+$/g,"");
				// alert(cname);	
				var cowner = (((((content.split(', '+cid+', ')[2]).split('class="cityactions"')[0]).split('<tr class="owner alt">')[1]).split('<td colspan="2">')[1]).split('</td>')[0]).replace(/^\s+|\s+$/g,"");
				console.log(cowner+' '+cname+' '+ccoord);
					
				var alliTest = (((((content.split(', '+cid+', ')[2]).split('class="cityactions"')[0]).split('<tr class="ally">')[1]).split('<td colspan="2">')[1]).split('</td>')[0]).replace(/^\s+|\s+$/g,"");
				if (alliTest.indexOf('</a>') > -1) {
					var alli = ((alliTest.split('</a>')[0]).split('">')[1]).replace(/^\s+|\s+$/g,"");
				} else {
					var alli = '-';
				}
				
				// alert(alli);	
				var alliId = '';
				if(!(alli == '-')) {
					alliId = ((((((content.split(', '+cid+', ')[2]).split('class="cityactions"')[0]).split('<tr class="ally">')[1]).split('</a>')[1]).split('allyId=')[1]).split('"')[0]).replace(/^\s+|\s+$/g,"");
				// alert(alliId);
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
				// alert('err--getInfosFromCityId\n' + err);
			}
		}
	});
};
getInfosFromAttackerName = function(attackerNameForLink, m) {
	GM_xmlhttpRequest({
		method:'GET',
		url: 'http://' + gameServer + '/index.php?view=highscore&highscoreType=offense&searchUser=' + attackerNameForLink,
		headers: {
			'User-agent': 'Mozilla/5.0',
			'Accept': 'application/atom+xml,application/xml,text/xml', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;
			try {
				var results = ((content.split('class="table01">')[1]).split('class="contentBox01h"')[0]).split('<tr');
				var aally = '';
				var aallyid = '';
				for (var k = 0; k < results.length; ++k) {
					try {
						var searchName = ((results[k].split('class="name">')[1]).split('</td>')[0]).replace(/^\s+|\s+$/g,"");
						if(searchName == attackerNameForLink) {
							aally = ((results[k].split('class="allytag">')[1]).split('</a>')[0]).split('">')[1];
							aallyid = ((results[k].split('class="allytag">')[1]).split('allyId=')[1]).split('">')[0];
						}
					} catch (err) {
						// alert('getInfosFromAttackerName - Zeile 168 ' + err);
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
				// alert('getInfosFromAttackerName - Zeile 181 ' + err);
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
			url: 'http://www.caipiranha.de/FAIR/alat/AA.php?pid='+playerID+'&aid='+allyID+'&valkey='+passKey,
			data: 'mydata=' + stringToSend + addString,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			onload: function(response) {
				var content = response.responseText;
				var result = content.match(/Access\sdenied/g);
				if(result) {
					//console.log('Fehlende Berechtigung(en)!\n\nDu bist entweder nicht berechtigt dieses Skript zu verwenden oder hast das falsche Passwort eingegeben!');
				}
			}
		});	
	} else {
		//console.log('Deine Player-ID und Ally-ID wurden noch nicht gespeichert.\nBitte aktualisiere die Seite noch einmal, dann sollte es funktionieren!');
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
Array.prototype.array_value_delete = function(position) {
	for (var x = 0; x < this.length; ++x) {
		if (x >= position) {
			this[x] = this[x + 1];
		}
	} this.pop();
};

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
// get options for 1-Ship-Attacks
var aOR = Config.get('attOnRoute');
var aAP = Config.get('attAtPort');


var baseElement = document.getElementsByClassName('table01')[0];
var attackWaves = baseElement.getElementsByClassName('rowRanks');
var attacks = 0;
var shipattacks = 0;
var tempName = '';
var tempTown = '';
var counter = 0;
var temporTime = '';
var endZeit = 0;
var ZeitID = '';
var Angegriffene = '';

var shipWaveAttackerNames = new Array();
var shipWaveCounter = new Array();
var shipWaveTownID = new Array();
var shipWaveTime = new Array();
var shipWaveAngegriffene = new Array();

var addString = '';
	for (var k = 0; k < attackWaves.length; ++k) {
		try {
			if ((attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.innerHTML == 'Hafen einnehmen (unterwegs)') && (attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML == '1'))  {
				if (!(Config.get('attOnRoute'))) {
					if (tempName == '') {
						counter = 1;
						tempName = attackWaves[k].getElementsByTagName('a')[0].innerHTML;
						tempTown = (attackWaves[k].getElementsByTagName('a')[0].href).split('cityId=')[1];
						Angegriffene = (attackWaves[k].getElementsByTagName('a')[1].innerHTML).replace(/&nbsp;/g,' ');
						
						temporTime = (attackWaves[k].firstChild.nextSibling.innerHTML).replace(/^\s+|\s+$/g,"");
						endZeit = ((temporTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"");
						ZeitID = (temporTime.split('id="')[1]).split('"')[0];
					} else {
						if((tempName == attackWaves[k].getElementsByTagName('a')[0].innerHTML) && (tempTown == (attackWaves[k].getElementsByTagName('a')[0].href).split('cityId=')[1])) {
							counter = counter + 1;
							temporTime = (attackWaves[k].firstChild.nextSibling.innerHTML).replace(/^\s+|\s+$/g,"");
							if (endZeit < ((temporTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"")) {
								endZeit = ((temporTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"");
								ZeitID = (temporTime.split('id="')[1]).split('"')[0];
							}
							var neuAngegriffener = (attackWaves[k].getElementsByTagName('a')[1].innerHTML).replace(/&nbsp;/g,' ');
							if(Angegriffene.indexOf(neuAngegriffener) == -1) {
								Angegriffene += ', ' + neuAngegriffener;
							} 
						} else {
							shipWaveAttackerNames.push(tempName);
							shipWaveCounter.push(counter);
							shipWaveTownID.push(tempTown);
							shipWaveTime.push(endZeit + '<ID>' + ZeitID);
							shipWaveAngegriffene.push(Angegriffene);
						
							counter = 1;
							tempName = attackWaves[k].getElementsByTagName('a')[0].innerHTML;
							tempTown = (attackWaves[k].getElementsByTagName('a')[0].href).split('cityId=')[1];
							temporTime = (attackWaves[k].firstChild.nextSibling.innerHTML).replace(/^\s+|\s+$/g,"");
							endZeit = ((temporTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"");
							ZeitID = (temporTime.split('id="')[1]).split('"')[0];
							Angegriffene = (attackWaves[k].getElementsByTagName('a')[1].innerHTML).replace(/&nbsp;/g,' ');
						}
					}
					attacks = 1;
				} //else {
					// shipattacks = 1;
				// }
				
			} else {
			
			// hier geht dann eigentlich normal weiter!!
				// if (!(Config.get('attAtPort')) && (!(attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.innerHTML == 'Hafen einnehmen')) && (!(attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML == '1'))) {
					var tempTime = (attackWaves[k].firstChild.nextSibling.innerHTML).replace(/^\s+|\s+$/g,"");
					var enddate = ((tempTime.split('enddate:')[1]).split(',')[0]).replace(/^\s+|\s+$/g,"");
					var timeID = (tempTime.split('id="')[1]).split('"')[0];
					time.push(enddate + '<ID>' + timeID);
					action.push(attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
					units.push(attackWaves[k].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
					var aElements = attackWaves[k].getElementsByTagName('a');
					attackerNames.push(aElements[0].innerHTML);
					attackerCid.push((aElements[0].href).split('cityId=')[1]);
					var name = (aElements[1].innerHTML).replace(/&nbsp;/g,' ');
					allyMember.push(name);
					defenderCid.push((aElements[1].href).split('cityId=')[1]);
					attacks = 1;
				// } else {
					// shipattacks = 1;
				// }
			}
		} catch(err) {
			// alert('test1' + err);
		}
	}
	if (!(Config.get('attOnRoute'))) {
		// falls der letzte angezeigte Angriff eine Schiffs-Nerv-Welle ist:
		if ((tempName != '') && (tempTown != '')) {
			shipWaveAttackerNames.push(tempName);
			shipWaveCounter.push(counter);
			shipWaveTownID.push(tempTown);
			shipWaveTime.push(endZeit + '<ID>' + ZeitID);
			shipWaveAngegriffene.push(Angegriffene);
		
		}
	}

	// jetzt überprüfen ob durch das unsortierte Anzeigen in der Generalsansicht nicht doch noch Wellenanzeigen "eingespart" werden können:
	if (!(Config.get('attOnRoute'))) {
		for (var i = 0; i < shipWaveAttackerNames.length; ++i) {
			for (var j = i+1; j < shipWaveAttackerNames.length; ++j) {
				
				if (shipWaveAttackerNames[i] == shipWaveAttackerNames[j]) {
					if (shipWaveTownID[i] == shipWaveTownID[j]) {
						
						shipWaveCounter[i] = shipWaveCounter[i] + shipWaveCounter[j];
						
						if (shipWaveAngegriffene[i] != shipWaveAngegriffene[j]) {
							var jAngegriffene = shipWaveAngegriffene[j].split(', ');
							for (var k = 0; k < jAngegriffene.length; ++k) {
								if(shipWaveAngegriffene[i].indexOf(jAngegriffene[k]) == -1) {
									shipWaveAngegriffene[i] += ', ' + jAngegriffene[k];
								}
							}
						}
						
						iZeit = parseInt(shipWaveTime[i].split('<ID>')[0]);
						jZeit = parseInt(shipWaveTime[j].split('<ID>')[0]);
						if (iZeit < jZeit) {
							shipWaveTime[i] = shipWaveTime[j];
						}
						
						shipWaveAttackerNames.array_value_delete(j);
						shipWaveCounter.array_value_delete(j);
						shipWaveTownID.array_value_delete(j);
						shipWaveTime.array_value_delete(j);
						shipWaveAngegriffene.array_value_delete(j);
						
					}
				}
			}
		}
		// das Ganze noch ein zweites Mal, da bei ersten Mal einige Angriffe nicht zusammengefasst werden (warum auch immer) !?
		for (var i = 0; i < shipWaveAttackerNames.length; ++i) {
			for (var j = i+1; j < shipWaveAttackerNames.length; ++j) {
				
				if (shipWaveAttackerNames[i] == shipWaveAttackerNames[j]) {
					if (shipWaveTownID[i] == shipWaveTownID[j]) {
						
						shipWaveCounter[i] = shipWaveCounter[i] + shipWaveCounter[j];
						
						if (shipWaveAngegriffene[i] != shipWaveAngegriffene[j]) {
							var jAngegriffene = shipWaveAngegriffene[j].split(', ');
							for (var k = 0; k < jAngegriffene.length; ++k) {
								if(shipWaveAngegriffene[i].indexOf(jAngegriffene[k]) == -1) {
									shipWaveAngegriffene[i] += ', ' + jAngegriffene[k];
								}
							}
						}
						
						iZeit = parseInt(shipWaveTime[i].split('<ID>')[0]);
						jZeit = parseInt(shipWaveTime[j].split('<ID>')[0]);
						if (iZeit < jZeit) {
							shipWaveTime[i] = shipWaveTime[j];
						}
						
						shipWaveAttackerNames.array_value_delete(j);
						shipWaveCounter.array_value_delete(j);
						shipWaveTownID.array_value_delete(j);
						shipWaveTime.array_value_delete(j);
						shipWaveAngegriffene.array_value_delete(j);
						
					}
				}
			}
		}
	}
	
if (attacks) {
	attackerNamesNormal = attackerNames;
	attackerCidNormal = attackerCid;
	if (!(Config.get('attOnRoute'))) {
		attackerNames = attackerNames.concat(shipWaveAttackerNames);
		attackerCid = attackerCid.concat(shipWaveTownID);
	}
	// if (!(attacks) && Config.get('attOnRoute')) {
		// // nur 1-Schiff-Angriffe, die aber nicht angezeigt werden sollen
		// stringToSend = '<attack0>Derzeit werden keine Mitglieder Deiner Allianz angegriffen.';
		// continueProcessing2();
	// } else {
		processAttackers();
	// }

	/*
	Abfolge:
	-> processAttackers()
	-> getInfosFromAttackerName()
	-> processCityIds()
	-> getInfosFromCityId()
	-> continueProcessing()
	-> continueProcessing2()
	*/
	
} else {
	stringToSend = '<attack0>Derzeit werden keine Mitglieder Deiner Allianz angegriffen.';
	continueProcessing2();
}	


continueProcessing = function() {
	stringToSend = '<attack0>';
	
	for (var i = 0; i < attackerNamesNormal.length; ++i) {		// for each attack
	
		var attackString = '<attack><line>';
		attackString += time[i] + '<line>';
		attackString += action[i] + '<line>';
		attackString += units[i] + '<line>';
		attackString += attackerNamesNormal[i] + '<line>';
		
		// attacker city id -> infos aus cityInfoarray holen
		for (var j = 0; j < cityInfoArray.length; ++j) {
			if(cityInfoArray[j].cityId == attackerCidNormal[i]) {
				if(cityInfoArray[j].owner == attackerNamesNormal[i]) {
					attackString += cityInfoArray[j].alliance + '<line>';
					attackString += cityInfoArray[j].allianceId + '<line>';
				} else {
					for (var k = 0; k < attackerInfoArray.length; ++k) {
						if(attackerInfoArray[k].attackerName == attackerNamesNormal[i]) {
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
	
	// jetzt das Ganze noch für Schiffs-Nerv-Wellen:
	for (var i = 0; i < shipWaveAttackerNames.length; ++i) {		// for each attack
	
		var shipWaveString = '<attack><line>';
		shipWaveString += shipWaveTime[i] + '<line>';
		shipWaveString += 'Hafen einnehmen (unterwegs)<line>';
		shipWaveString += '<span style=color:red;>'+shipWaveCounter[i]+'x</span> 1<line>';
		shipWaveString += shipWaveAttackerNames[i] + '<line>';
		
		// attacker city id -> infos aus cityInfoarray holen
		for (var j = 0; j < cityInfoArray.length; ++j) {
			if(cityInfoArray[j].cityId == shipWaveTownID[i]) {
				if(cityInfoArray[j].owner == shipWaveAttackerNames[i]) {
					shipWaveString += cityInfoArray[j].alliance + '<line>';
					shipWaveString += cityInfoArray[j].allianceId + '<line>';
				} else {
					for (var k = 0; k < attackerInfoArray.length; ++k) {
						if(attackerInfoArray[k].attackerName == shipWaveAttackerNames[i]) {
							shipWaveString += attackerInfoArray[k].attackerAlliance + '<line>';
							shipWaveString += attackerInfoArray[k].attackerAllianceId + '<line>';
						}
					}
				}
				shipWaveString += cityInfoArray[j].cityId + '<line>';
				shipWaveString += cityInfoArray[j].cityName + '<line>';
				shipWaveString += cityInfoArray[j].coordinates + '<line>';
			}
		}
		
		shipWaveString += shipWaveAngegriffene[i] + '<line>FAIR<line><line><line><line>';
		
		stringToSend += shipWaveString;
	}
	
	continueProcessing2();
};	




setInterval("document.location.reload()", 540000); // page reload every 9 minutes