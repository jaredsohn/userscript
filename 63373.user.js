// ==UserScript==
// @name           TravianInfoAttacchi
// @author         OIRAD
// @namespace      http://userscripts.org/users/120446
// @include        http://*.travian.*/build.php?*gid=16*
// @include        http://*.travian.*/build.php?id=39*
// ==/UserScript==

var theads = document.getElementById("build").getElementsByTagName("table");
for(var i = 0; i < theads.length; i++){
	var attackData = theads[i].innerHTML;
	var coordBegin = attackData.indexOf("karte.php?d=") + 12;
	var coordEnd = attackData.indexOf("&",coordBegin);
	var coordZText = attackData.substring(coordBegin,coordEnd);
	var coordsO;
	var coordsA;
	var coord
	
	var attackURL = attackData.substring(attackData.indexOf("karte.php?d="),attackData.indexOf('"',coordBegin));
	if(coordZText.length >= 4 && coordZText.length <= 8){
		coordsA = getCoords(coordZText);
		var attackerA = theads[i].getElementsByTagName("a")[0].childNodes[0];		
		attackerA.nodeValue = attackerA.nodeValue + "(" + coordsA[0] + "|" + coordsA[1] + ")";
	} else {
		continue;
	}
	
	
	coordBegin = attackData.indexOf("karte.php?d=",coordEnd) + 12;
	coordEnd = attackData.indexOf("&",coordBegin);
	coordZText = attackData.substring(coordBegin,coordEnd);	
	if(coordZText.length >= 4 && coordZText.length <= 8){
		coordsO = getCoords(coordZText);
		var ownA = theads[i].getElementsByTagName("a")[1].childNodes[0];		
		ownA.nodeValue = ownA.nodeValue + "(" + coordsO[0] + "|" + coordsO[1] + ")";
	} else {
		continue;
	}
	var tBodies = theads[i].getElementsByTagName("tbody");
	
	var newTr = document.createElement("tr");
	var newTd = document.createElement("td");
	newTd.setAttribute("colspan","11");
	newTd.setAttribute("id","newTd" + i);

	
	var distA = distance ();	
	var distT = Math.ceil(distA * 100) / 100;	
	var dist = document.createTextNode("Caselle = " + distT + " | ");
	var cataT = WayTimecata ();	
	var cata = document.createTextNode("Cata = " + cataT + ' h. | ');
	var comaT = WayTimecoma ();	
	var coma = document.createTextNode("Comandante = " + comaT + " h. ");
	newTd.appendChild(dist);
	newTd.appendChild(cata);
	newTd.appendChild(coma);
	newTr.appendChild(newTd);
	
	tBodies[tBodies.length - 1].appendChild(newTr);
	
}









function getCoords(coordText){
	var coordZ = parseInt(coordText,10);
	var coordX = (coordZ % 801) - 401;
	var coordY = 400 - ((coordZ - (coordZ % 801)) / 801);
	var coords = new Array(coordX,coordY);
	return coords;
}



function distance () {

var attX = coordsA[0];	
var attY = coordsA[1];	
var difX = coordsO[0];	
var difY = coordsO[1];	

			// absolute X und Y Werte
			x_abs = Math.abs(attX - difX);
			y_abs = Math.abs(attY - difY);
			

			// Kartenumbruch
			Kartenumbruch();

			// Wegberechnung
			distance_atter = Math.sqrt(x_abs * x_abs + y_abs * y_abs);
return (distance_atter);
		}


function WayTimecata () {

			distance_atter = distance ();

			// Zeitberechnung
			var Velocità_atter;
			Velocità_atter = 3;

			time = Math.round(distance_atter / Velocità_atter * 3600);

			// Zeitformatierung
			input = Number(time);
			
			ConvertSecToHHMMSS(1);

return (HH + ":" + MM + ":" + SS);
		}

function WayTimecoma () {

			distance_atter = distance ();

			// Zeitberechnung
			var Velocità_atter;
			Velocità_atter = 4;

			time = Math.round(distance_atter / Velocità_atter * 3600);

			// Zeitformatierung
			input = Number(time);
			
			ConvertSecToHHMMSS(1);

return (HH + ":" + MM + ":" + SS);
		}

function Kartenumbruch () {
			if (x_abs > 250)
				x_abs = 501 - x_abs;
			if (y_abs > 250)
				y_abs = 501 - y_abs;
		}

function ConvertSecToHHMMSS (bigger24) {
			// Konvertiert input zu HH:MM:SS
			HH = 0;
			MM = 0;
			SS = 0;

				HH = (input - input % 3600) / 3600;
				MM = (input % 3600 - input % 3600 % 60) / 60;
				SS = (input - HH * 3600 - MM * 60);
			
			// Formatierungen (<0, >24h, fuehrende Null)
			if (SS < 0) {
				SS = SS + 60;
				MM--;
			}

			if (MM < 0) {
				MM = MM + 60;
				HH--;
			}

			if (HH < 0) {
				HH = HH + 24;
			}

			if (bigger24 == 0) {
				if (HH > 23) {
					HH = HH % 24;
				}
			}
			
			if (MM < 10) 
				MM = "0" + MM;
			if (SS < 10) 
				SS = "0" + SS;
		}

