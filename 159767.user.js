// ==UserScript==
// @name        SVA Provider
// @author      Malte Kastner (m.kastner@his.de)
// @namespace   sva
// @description SVA Provider zum Bereitstellen von gebuchten Stunden für andere Dienste
// @include     http://qissva.his.de/qisserver/rds?ws=ws*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// ==/UserScript==

var myInterval; // Für den Fall, dass Daten nicht gleich vorliegen

// WS STATE

// Anmeldung notwendig
 if($('#asdf').size() != 0){
	if($(':contains("Anmeldung fehlgeschlagen")').size() == 0){
		if((document.location+"").indexOf("noLogin=noLogin") == -1){
			myInterval=setInterval(login,500);
			$('form:first').attr('action', 'http://qissva.his.de/qisserver/rds?ws=ws&state=user&type=1&category=auth.login&startpage=portal.vm&breadCrumbSource=portal');
		}
		//$('form:first').attr('action', 'http://qissva.his.de/qisserver/rds?ws=ws&state=user&type=1&category=auth.login&startpage=portal.vm&breadCrumbSource=portal');
	}
}
// Der Consumer benötigt die asi, um weitere Aktionen ausführenzu können
else if((document.location+"").indexOf('http://qissva.his.de/qisserver/rds?ws=ws&state=user&type=0') !== -1){
	svaLocation = $("a:contains('Zeiterfassung')").attr('href');
	
	asi = getAsi(svaLocation);
	obj = new Object();
	obj.name = 'asi';
	obj.value = asi;
	//alert(Ext.util.JSON.encode(arr));
	callback(obj);
}
// Ein Reload der Seite wurde angeordnet
else if((document.location+"").indexOf("reload=reload") !== -1){
	obj = new Object();
	obj.name = 'reload';
	obj.value = 'reload';
	callback(obj);
}
// Die Zeiterfassung kann geparsed werden
else {
	obj = new Object();
	obj.name = 'hours';
	obj.value = parseHours();
	callback(obj);
}

//TOOLS
function getAsi(orig){
	var pathArray = orig.split('asi=');
	return pathArray[1];
}

/**
Rückmeldung an den Consumer im JSON-Stil
*/
function callback(obj){
	window.parent.postMessage(JSON.stringify(obj), '*');
}
function login(){
	$('input.submit').click();
	window.clearInterval(myInterval);
	obj = new Object();
	obj.name = 'loginComplete';
	obj.value = 'loginComplete';
	callback(obj);
}

function parseHours(){
	rows = getRowContents();
	dates = getDateHours(rows);
	return dates;
}

function getRowContents(){
	rowPattern = />[0-9]+.[0-9]+\.[0-9]+<[\s\S]*?\<\/table/g; //.*?(\<tr class\="sva_gerade"\>|\</table\>)
	
	docContent = $(document.body).html();
	return docContent.match(rowPattern);
}

/**
Liefert ein Array von Stunden-Objekten für den ausgewählten Monat
 class{
  date - Datum
  hoursArray - Einzelbuchungen für den Tag
  mins - Am Tag gebuchter Minuten-Anteil
  hours - Am Tag gebuchter Stunden-Anteil
 }
 */
function getDateHours(rows){
	retArray = new Array();
	for (var i = 0; i < rows.length; ++i){
		curObj = new Object();
		datePattern = /[0-9]+.[0-9]+\.[0-9]+/;
		curObj.date = rows[i].match(datePattern);
		
		curObj.hoursArray = new Array();
		
		hourTrPattern = /<tr[\s\S]*?colspan="2" align="right" nowrap="">[0-9]+:[0-9]+<\/td[\s\S]*?<\/tr/g;
		hourTr = rows[i].match(hourTrPattern);
		minSum = 0;
		if(hourTr){
			for (var j = 0; j < hourTr.length; ++j){
				hourTestPattern = /0:00[\s\S]*?colspan="2" align="right" nowrap="">[0-9]+:[0-9]+<\/td/;
				hoursTest = hourTr[j].match(hourTestPattern);
				if (!hoursTest){
					hourPattern = /colspan="2" align="right" nowrap="">[0-9]+:[0-9]+<\/td/;
					hours = hourTr[j].match(hourPattern);
				
					curHour = hours[0].replace('colspan="2" align="right" nowrap="">','');
					curHour = curHour.replace('</td','');
					curObj.hoursArray.push(curHour);
					minSum += getMins(curHour);
				}
			}
		}
		curObj.mins = minSum%60;
		curObj.hours = (minSum-curObj.mins)/60;
		retArray.push(curObj);
	}
	return retArray;
}

function getMins(curHour){
	time = curHour.split(':');
	return ((time[0]*60) + (time[1]*1));
}