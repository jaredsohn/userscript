// ==UserScript==
// @name           Daily Plunder Amount
// @namespace      DailyPlunderAmount
// @include        http://s9.de.ikariam.com/index.php?view=militaryAdvisorCombatReports
// ==/UserScript==


GM_addStyle('#smallImg { position: relative; height: 14px; padding: 5px 0; }');
GM_addStyle('.myContent { background-color:#fff3d9 !important; margin-top: 0 !important; margin-bottom: 0 !important; }');
GM_addStyle('.th0 { width: 37px; }');
GM_addStyle('.th1 { width: 36px; }');
GM_addStyle('.trHeight { height: 20px; }');
GM_addStyle('.td0Res { padding-left: 2px; font-size: 10px; vertical-align: middle !important; }');
GM_addStyle('.tdRes { text-align: center; font-size: 10px; vertical-align: middle !important; }');
GM_addStyle('.tdRes1 { color:green; }');


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
resURL = function(res) {
	return '<img id="smallImg" src="http://' + gameServer + '/skin/resources/icon_' + res + '.gif" />';
};
getCR = function(adress, j) {
	GM_xmlhttpRequest({
		method:'GET',
		url: adress,
		headers: {
			'User-agent': 'Mozilla/3.0',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;
			var tag = yesterday.substring(0,2);
			try {
				var split = (((content.split('<div id="cityNav"')[0]).split('<li class="wood">')[1]).split('</span>')[1]).split('</li>')[0];
				var amount = split.replace(/^\s+|\s+$/g,"");
				wood += parseInt(amount);
				window['td1_' +  tag].innerHTML = convertNumber(wood);
			} catch (err) {
				//alert(err);
			}
			try {
				var split2 = (((content.split('<div id="cityNav"')[0]).split('<li class="wine">')[1]).split('</span>')[1]).split('</li>')[0];
				var amount2 = split2.replace(/^\s+|\s+$/g,"");
				wine += parseInt(amount2);
				window['td2_' +  tag].innerHTML = convertNumber(wine);
			} catch (err) {
				//alert(err);
			}
			try {
				var split3 = (((content.split('<div id="cityNav"')[0]).split('<li class="marble">')[1]).split('</span>')[1]).split('</li>')[0];
				var amount3 = split3.replace(/^\s+|\s+$/g,"");
				marble += parseInt(amount3);
				window['td3_' +  tag].innerHTML = convertNumber(marble);
			} catch (err) {
				//alert(err);
			}
			try {
				var split4 = (((content.split('<div id="cityNav"')[0]).split('<li class="glass">')[1]).split('</span>')[1]).split('</li>')[0];
				var amount4 = split4.replace(/^\s+|\s+$/g,"");
				glass += parseInt(amount4);
				window['td4_' +  tag].innerHTML = convertNumber(glass);
			} catch (err) {
				//alert(err);
			} 
			try {
				var split5 = (((content.split('<div id="cityNav"')[0]).split('<li class="sulfur">')[1]).split('</span>')[1]).split('</li>')[0];
				var amount5 = split5.replace(/^\s+|\s+$/g,"");
				sulfur += parseInt(amount5);
				window['td5_' +  tag].innerHTML = convertNumber(sulfur);
			} catch (err) {
				//alert(err);
			} 
			if(j > 0) {
				j--;
				calculating(j);
			} else if(j == 0) {
				var saveString = wood + ':' + wine + ':' + marble + ':' + glass + ':' + sulfur;
				GM_setValue(yesterday, saveString);

				//##############################################
                //     Hier muss der Export zur Externen PHP-Seite hin
                //##############################################
           		var saveString2 = yesterday + ':' + saveString;
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://www.caipiranha.de/FAIR/raids/authsave.php?pid='+playerID+'&aid='+allyID,
                    data: 'mydata=' + saveString2,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onload: function(response) {
                        var content = response.responseText;
                        var result = content.match(/Access\sdenied/g);
                        if(result) {
                            alert('Fehlende Berechtigung(en)!\n\nDu bist entweder nicht berechtigt dieses Skript zu verwenden oder hast das falsche Passwort eingegeben!');
                        } else {
							//#####################
							// Jetzt noch erneut die Main-Funktion aufrufen mit Index-1 und alle Zahlen wieder löschen!
							date = new Array();
							urls = new Array();
							wood = 0;
							wine = 0;
							marble = 0;
							glass = 0;
							sulfur = 0;
							crSites = new Array();
							
							tage -= 1;
							if(tage > 0) {
								mainFunct(tage);
							}
						}
                    }
                });	
			}
		}
	});
};
getLinks = function(adress, j) {
	GM_xmlhttpRequest({
		method:'GET',
		url: adress,
		headers: {
			'User-agent': 'Mozilla/3.0',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;
			var splitTable = (content.split('class="operations"')[1]).split('</table>')[0];
			var trs = splitTable.split('<tr>');
			try {
				for(var i = 1; i < 11; ++i) {
					var battleDate = ((trs[i].split('class="date">')[1]).split('</td>')[0]).replace(/^\s+|\s+$/g,"").split(' ')[0];
					if(dateComparison(battleDate)) {
						date.push(battleDate);
						var link = ((trs[i].split('href="')[1]).split('"')[0]).replace(/&amp;/, '&');
						urls.push(link);
					}
				}
			} catch (err) {
				//alert(err);
			}
			if(j == 0) {
				calculating(urls.length - 1);
			}
		}
	});
};
function calculating(param) {
	getCR(urls[param], param);
}
dateComparison = function(param1) {
	if (yesterday == param1) {
		return true;
	} else {
		return false;
	}
};
getValueProcessing = function(param1) {
	var split = param1.split(':');
	var numbers = new Array();
	for each(num in split) {
		numbers.push(convertNumber(num));
	}
	return numbers;
};
convertNumber = function(number){
	var thousands = '';
	if (number.toString().length > 4) {
		number = (number/1000).toFixed(1);
		thousands = '<b>k</b>';
	}
	number = number.toString().replace(/\./g,',') 
	number += thousands;
	return number;
};
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
	return dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2];
};
getInfosFromSite = function(urlToParse, functionToCall) {
	GM_xmlhttpRequest({
		method:'GET',
		url: urlToParse,
		headers: {
			'User-agent': 'Mozilla/4.0',
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


//########################################################################################################

var gameServer = top.location.host;
var playerID = '';
var allyID = '';

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
mainFunct = function(day_k) {
    // get date of the according day and format it 
    yesterday = new Date(new Date().getTime() - day_k*24*60*60*1000);
    yesterday = fmtDate(yesterday);


    // only process CRs if the according day hasn't already been calculated
    if(GM_getValue(yesterday) == null) {
        // getting first 10 CRs
        var battleTable = document.getElementsByClassName('operations')[0];
        var battleTableRows = battleTable.getElementsByTagName('tr');
		
		for(var k = 0; k < 10; ++k) {
			if(battleTableRows[k].innerHTML.search(/date/) != -1) {
				var datetime = battleTableRows[k].getElementsByClassName('date')[0].firstChild.data.replace(/^\s+|\s+$/g,"").split(' ');
				
				if(dateComparison(datetime[0])) {
					date.push(datetime[0]);
					urls.push(battleTableRows[k].getElementsByTagName('a')[0].href);
				}
			}
        }

        // getting urls for next 10,20,30,... CRs
        var battleSitesObject = document.getElementsByClassName('all')[0];
        var battleSites = battleSitesObject.getElementsByTagName('a');
        for each (site in battleSites) {
            crSites.push(site.href);
        }
        
        // getting Links for each CR and
        var i = crSites.length - 1;
        for each (site in crSites) {
            getLinks(site, i);
            --i;
        }
    } else {
		tage -= 1;
		if(tage > 0) {
			mainFunct(tage);
		}
	}
}

//###################################################################################################


var leftBox = document.createElement('div');
leftBox.className = 'dynamic';

var h3header = appending('h3', 'header', leftBox, 'Plünderübersicht');
var divContent = appending('div', 'content myContent', leftBox);

var table = appending('table', '', divContent);
	var thead = appending('thead', '', table);
		var tr1 = appending('tr', '', thead);
			var th0 = appending('th', 'th0', tr1);
			var th1 = appending('th', 'th1', tr1);
				th1.innerHTML = resURL('wood');
			var th1 = appending('th', 'th1', tr1);
				th1.innerHTML = resURL('wine');
			var th1 = appending('th', 'th1', tr1);
				th1.innerHTML = resURL('marble');
			var th1 = appending('th', 'th1', tr1);
				th1.innerHTML = resURL('glass');
			var th1 = appending('th', 'th1', tr1);
				th1.innerHTML = resURL('sulfur');
	var tbody = appending('tbody', '', table);
	
	for(var i = 1; i < 7; ++i) {
		var day = new Date(new Date().getTime() - i*24*60*60*1000);
		day = fmtDate(day);
		
		var tag = day.substring(0,2);
		
		if(GM_getValue(day) == null) {
			// if the day hasn't been saved yet
			window['tr_' + tag] = appending('tr', 'trHeight', tbody);
				window['td0_' +  tag] = appending('td', 'td0Res', window['tr_' +  tag], day.substring(0,6));
				window['td1_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
				window['td1_' +  tag].innerHTML = '0';
				window['td2_' +  tag] = appending('td', 'tdRes', window['tr_' +  tag]);
				window['td2_' +  tag].innerHTML = '0';
				window['td3_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
				window['td3_' +  tag].innerHTML = '0';
				window['td4_' +  tag] = appending('td', 'tdRes', window['tr_' +  tag]);
				window['td4_' +  tag].innerHTML = '0';
				window['td5_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
				window['td5_' +  tag].innerHTML = '0';			
		} else {
			// if the day has already been saved
			try {
				var numbers = getValueProcessing(GM_getValue(day));
				window['tr_' + tag] = appending('tr', 'trHeight', tbody);
					window['td0_' +  tag] = appending('td', 'td0Res', window['tr_' +  tag], day.substring(0,6));
					window['td1_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
					window['td1_' +  tag].innerHTML = numbers[0];
					window['td2_' +  tag] = appending('td', 'tdRes', window['tr_' +  tag]);
					window['td2_' +  tag].innerHTML = numbers[1];
					window['td3_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
					window['td3_' +  tag].innerHTML = numbers[2];
					window['td4_' +  tag] = appending('td', 'tdRes', window['tr_' +  tag]);
					window['td4_' +  tag].innerHTML = numbers[3];
					window['td5_' +  tag] = appending('td', 'tdRes tdRes1', window['tr_' +  tag]);
					window['td5_' +  tag].innerHTML = numbers[4];	
			} catch (err) {
				// alert(err);
			} 
		}
	}
	var tr_link = appending('tr', 'trHeight', tbody);
		var td0_link = appending('td', 'tdRes', tr_link, '', 6);
		td0_link.innerHTML = '<a href="http://www.caipiranha.de/FAIR/raids/raids.php?pid='+playerID+'&aid='+allyID+'" target="_blank">erweiterte Ansicht</a>'
	
var divFooter = appending('div', 'footer', leftBox);

var boxTop = document.getElementById('container2');
boxTop.insertBefore(leftBox, document.getElementById('mainview'));




//###################################################################################################

var yesterday = 0;
var date = new Array();
var urls = new Array();
var wood = 0;
var wine = 0;
var marble = 0;
var glass = 0;
var sulfur = 0;
var crSites = new Array();
	
	
var tage = 6;

//GM_deleteValue('26.02.2011');

mainFunct(tage);


