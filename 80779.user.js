// ==UserScript==
// @name				DSrunTimeOfConfirming
// @author				Heinzel
// @namespace			http://userscripts.org
// @description			Die Zeit beim "Angriff-Bestaetigen"-Fenster laeuft weiter und bleibt nicht statisch
// @include			http://de*.die-staemme.de/game.php*screen=place*try=confirm*
// ==/UserScript==


// Version: 1.0.1

// Changelog
//	1.0.1: Bugfix: falscher Monat wurde angezeigt (Darstellung von 0-11)

function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function addLeadingZero(number) {
	number = number.toString();
	if(parseInt(number, 10) < 10) {
		number = "0" + number.toString();
	}
	
	return number;
}

function recalcArrival() {
	var duration = _evaluate('//td[.="Dauer:"]/parent::tr')[0].getElementsByTagName("td")[1].textContent.split(":");
	var serverTime = document.getElementById("serverTime").textContent;
	var serverDate = document.getElementById("serverDate").textContent.split("/");
	
	var now = new Date(serverDate[1] + " " + serverDate[0] + " " + serverDate[2] + ", " + serverTime);
	var arrivalObj = now;
	arrivalObj.setHours(now.getHours()+parseInt(duration[0], 10));
	arrivalObj.setMinutes(now.getMinutes()+parseInt(duration[1], 10));
	arrivalObj.setSeconds(now.getSeconds()+parseInt(duration[2], 10));
	
	var arrival = 	"am " + addLeadingZero(arrivalObj.getDate()) + 
					"." + addLeadingZero(arrivalObj.getMonth()+1) + 
					". um " + addLeadingZero(arrivalObj.getHours()) + 
					":" + addLeadingZero(arrivalObj.getMinutes()) + 
					":" + addLeadingZero(arrivalObj.getSeconds()) + " Uhr";
	
	var arrivalField = document.getElementById("date_arrival");
	if(arrivalObj.getHours() < 8) {
		arrival += "<br /><span class=\"warn\">Nachtbonus aktiv!</span>";
	}
	
	arrivalField.innerHTML = arrival;
}

(function main() {
	arrivalTimer = window.setInterval(recalcArrival, 120);
})();