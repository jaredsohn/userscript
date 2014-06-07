// ==UserScript==

// @name           EarthLost Hilfe

// @description    Zeigt in der Übersicht eine kleine Zusatz Statistik. Beim versenden der Flotte die genaue Ankunftszeit sowie in Spioberichten die Benötigten Snatcher/Bomber.

// @version        1.0.9

// @license        null

// @include 		 http://*.earthlost.de/*

// @include 		 https://*msg4u*

// ==/UserScript==





/*mal kleiner Changelog ^^
1.0.9 (25.08.11)
- Format für Ankunft der Flotte geändert ;)


1.0.8 (24.07.11)

- Ändern des Fenstertitels, wenn Scans, Ticker oder sonstige Nachrichten vorhanden sind.



1.0.7 (30.06.11)

- Beheben Ankunftszeit der Flotten. (Wird nun unter dem Text "Flotte(n) versenden" angezeigt)



1.0.6

- Flotten versendet: Gesamt Ressourcen werden angezeigt die Transportiert werden (Idee von *Zensiert*: ich denke, derjenige weiß bescheid ;) )

- Produktion (Schiffe): Angriffs-, Verteidungskraft und Schildpunkte werden angezeigt (Mit Forschungen, Cookies müssen erlaubt sein, vorher auf die Forschungsseite gehen, damit dieser gesetzt werden kann.)

- paar kleinigkeiten am Code :P



1.0.5 

- Übersicht: Bei den Ausstehenden Ereignissen wird die Forschung angezeigt

- Produktion (Schiffe): Angriffs-, Verteidungskraft und Schildpunkte werden angezeigt (Ohne Forschungen)

- paar kleinigkeiten am Code :P

*/



var rundenAufxStellen = 2;  // auf wieviele Nachkommastellen die Durchschnittspunkte gerundet werden





// Wenn man sich auf der Übersichtsseite befindert, werden Durchschnittspunkte, 

// Punkte in Bau und die Benötigten HRs angezeigt.

// Befindert man sich auf der "Flotte versenden"-seite, wird die Ankunftszeit angezeigt.

// zeigt im spiobericht die benötigten Snatcher sowie Bomber an.

docE = document.documentElement;

if (document.location.href.search("intro")>0) {

	// zeigt diverse "Statistiken" in der übersicht

	// Fertigstellung der Forschung als countdown

	//

	showIntro();

	var divTag = document.createElement("div");

	divTag.id = "div1";

	divTag.setAttribute("align","center");

	divTag.style.margin = "0px auto";

	divTag.className ="cost";

	divTag.innerHTML = "";

	document.getElementsByClassName("transcell")[1].appendChild(divTag);

		if( docE.getElementsByClassName("event_forschung").length > 0 ) {

			prev = docE.getElementsByClassName("event_forschung")[0].previousSibling.attributes[0].nodeValue.split(", ");

			zeitDatum = prev[1].split(" ")[0].split("."); // [0] = monat | [1] = tag | [2] = jahr

			zeitZeit = prev[1].split(" ")[1].split(":"); // [0] = stunde | [1] = min | [2] = sek

			dateString = zeitDatum[2] +","+ zeitDatum[1] +","+ zeitDatum[0] +","+ zeitZeit[0]+':' +zeitZeit[1]+':'+ zeitZeit[2];

			endZeit = Date.parse( dateString );

			var aktiv = window.setInterval(forschungCalc, 250);

		} else {

			document.getElementById("div1").innerHTML = "Es wird momentan nicht geforscht!";

		}

} else if (document.location.href.search("flotten4")>0) { // abgesendet 

	showRes();

} else if (document.location.href.search("research")>0) {

	writeCookie();

} else if (document.location.href.search("flotten2")>0) { // absenden 

	//

	// zeigt die genaue ankunft einer flotte beim versenden an

	//

	var classes = document.getElementsByClassName("transcell")[0]

	var divTag = document.createElement("div");

	divTag.id = "div1";

	divTag.setAttribute("align","center");

	divTag.style.margin = "0px auto";

	divTag.className ="dynamicDiv";

	divTag.innerHTML = "";

	classes.appendChild(divTag);

	var aktiv = window.setInterval(checkFleet, 250);

} else if (document.location.href.search("messages")>0) {

	//

	// zeigt die benötigten snatcher und bomber direkt im spiobericht an

	//

	dark = docE.getElementsByClassName("dark");

	light = docE.getElementsByClassName("light");

	var ress = 0;

	for (i = 0; i < 3;i++) {

			ress+=parseInt(dark[i].childNodes[1].childNodes[0].nodeValue.replace(/\D/g,""));			

	}

	for (o = 0; o < 2;o++) {

			ress+=parseInt(light[o].childNodes[1].childNodes[0].nodeValue.replace(/\D/g,""));				

	}

	bomber = parseInt(light[2].childNodes[1].childNodes[0].nodeValue.replace(/\D/g,""))/100;

	varGrey = docE.getElementsByClassName("grey")[0].childNodes[0].childNodes[0];

	varGrey.appendChild(document.createTextNode("Ben"+unescape("%F6")+"tigte Snatcher: " + number_format(Math.ceil(ress/10000), 0, ".", ".")  ));

	varGrey.appendChild(document.createElement('BR'));

	varGrey.appendChild(document.createTextNode( "Ben"+unescape("%F6")+"tigte Bomber: " +  number_format(Math.ceil(bomber), 0, ".", ".") ) );

} else if (document.location.href.search("produktion") >0 ) {

	// zeigt in der Produktionsübersicht an, welche werte produziert werden

	// attkraft, deffkraft und die schildpunkte

	// (ohne forschung)

	if (document.getElementById("Prod") != null) {

		mom_paket = document.getElementById("Prod").firstChild.nodeValue;//.replace("x", "");

		if (document.getElementById("Prod").childNodes.length >= 2 ) {

			mom_paket = mom_paket.replace(/\D/g, "");

			x=1;

		} else {

			mom_paket=1;

			x=0;

		}

		mom_schifftyp = document.getElementById("Prod").childNodes[x].firstChild.nodeValue;

		re_vals=werte(mom_paket, mom_schifftyp);

		att=re_vals[0]; deff=re_vals[1]; schilde=re_vals[2];

		i=0;

		while (i < document.getElementById("shipslist").childNodes.length) {

			werte=getSchiffe(i);

			att+= werte[0] * werte[1]; deff+= werte[0] * werte[2]; schilde+= werte[0]* werte[3];

			i++;

		}

		var element = document.getElementsByClassName("transcell")[1];

		element.appendChild(document.createElement('BR'));

		element.appendChild(document.createTextNode("Angriff:"+ number_format(att.toFixed(rundenAufxStellen), 2, ",", ".") ));

		element.appendChild(document.createElement('BR'));

		element.appendChild(document.createTextNode("Verteidigung:"+ number_format(deff.toFixed(rundenAufxStellen), 2, ",", ".") ));

		element.appendChild(document.createElement('BR'));

		element.appendChild(document.createTextNode("Schildpunkte:"+ number_format(schilde.toFixed(rundenAufxStellen), 2, ",", ".") ));

	} else {

		var element = document.getElementsByClassName("transcell")[1];

		element.appendChild(document.createElement('BR'));

		element.appendChild(document.createTextNode("Es wird momentan nichts Produziert!"));

	}

}







//

// FUNKTIONEN //

//

function getSchiffe(i) { // gibt die anzahl + werte der schiffe (inkl. forschung) zurück

	schleife_anzahl=document.getElementById("TR"+i).childNodes[1].firstChild.firstChild.nodeValue.replace(/\D/g,"");

	if ( document.getElementById("TR"+i).childNodes[2].childNodes.length >= 2) {

		schleife_typ = document.getElementById("TR"+i).childNodes[2].childNodes[1].firstChild.nodeValue;

		schleife_paket = document.getElementById("TR"+i).childNodes[2].firstChild.nodeValue.replace(/\D/g,"");

	} else { // einzel pakete

		schleife_typ = document.getElementById("TR"+i).childNodes[2].firstChild.firstChild.nodeValue;	

		schleife_paket=1;

	} 

	werte=schiffswerte(schleife_typ);

	forschungen=checkCookie("forschungen").split("_"); // replace(/\D/g,"")

	for (i = 0; i < forschungen.length; i++) {

		if (forschungen[i].replace(/\d/g,"").replace("=","") == werte[3]) {

			schildstufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

		if (forschungen[i].replace(/\d/g,"").replace("=","") == werte[4]) {

			waffe1stufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

		if (forschungen[i].replace(/\d/g,"").replace("=","") == werte[5]) {

			waffe2stufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

	}

	if (isNaN(schildstufe)) schildstufe=0;

	if (isNaN(waffe1stufe)) waffe1stufe=0;

	if (isNaN(waffe2stufe)) waffe2stufe=0;

	return new Array (parseInt(schleife_anzahl*schleife_paket), (werte[0]*(1+(waffe1stufe+waffe2stufe)/100)), (werte[1]*(1+(waffe1stufe+waffe2stufe)/100)), (werte[2]*(1+schildstufe/100)));

}





function schiffswerte(schiffstyp) { // gibt die jeweiligen werte zurück

	switch (schiffstyp) {

		case 	"unbemannte Sonde": werte = new Array(0, 0, 50, "", "", ""); break;

		case 	"Snatcher": werte = new Array(0, 15, 100, "", "", ""); break;

		case 	"Rettungsschiff": werte = new Array(0, 0, 400, "", "", ""); break;

		case 	"Handelsschiff": werte = new Array(0, 0, 500, "", "", ""); break;

		case 	"Handelsriese": werte = new Array(0, 0, 1500, "Phasenwechselschild", "", ""); break;

		case 	"A-Glider": werte = new Array(100, 120, 300, "Impulslaserkanone", "Rotationsschild"); break;

		case 	"Noulon": werte = new Array(218, 218, 500,"Rotationsschild" , "HiGS-Laserkanone", ""); break;

		case 	"schwerer Bomber": werte = new Array(1000, 1000, 2000, "Quantenschild", "Atomsprengkopf", ""); break;

		case 	"Kolonisationsschiff": werte = new Array(0, 0, 800, "Rotationsschild", "", ""); break;

		case 	"Trugar": werte = new Array(1300, 1400, 2600, "Phasenwechselschild", "HiGS-Laserkanone", "Wasserstoffrakete"); break;

		case 	"Violo": werte = new Array(1000, 1900, 3100, "Phasenwechselschild", "Tachyonenwerfer", "Wasserstoffrakete"); break;

		case 	"Narubu": werte = new Array(1600, 1000, 2000, "Phasenwechselschild", "Elektronenkanone", "Wasserstoffrakete"); break;

		case 	"Neomar": werte = new Array(4000, 8000, 17000, "Plasmaschild", "Elektronenkanone", "Wasserstoffrakete"); break;

		case 	"Bloodhound": werte = new Array(10000, 500, 9000, "Quantenschild", "Tachyonenwerfer", "Photonenrakete"); break;

		case 	"Kemzen": werte = new Array(7500, 5000, 12000, "Quantenschild", "HiGS-Laserkanone", "Photonenrakete"); break;

		case 	"Zemar": werte = new Array(15000, 50000, 66000, "Plasmaschild", "Tachyonenwerfer", "Photonenrakete"); break;

		case 	"Finur": werte = new Array(30000, 25000, 32000, "Neodemschild", "Tachyonenwerfer", "Photonenrakete"); break;

		case 	"Luxor": werte = new Array(50000, 20000, 20000, "Plasmaschild", "Flickswerfer", "Photonenrakete"); break;

		case 	"Grandor": werte = new Array(1800000, 1800000, 2000000, "Plasmaschild", "Flickswerfer", "Photonenrakete"); break;

		case 	"Invasionseinheit":  werte = new Array(0, 0, 10000, "Phasenwechselschild", "HiGS-Laserkanone", "Photonenrakete"); break;

		default: werte = new Array ( 0, 0,0, "", "", ""); break

	} // att, deff, schilde

	return werte;

}





function werte( anzahl , schiffstyp) {

	anzahl = parseInt(anzahl);

	schiffwerte=schiffswerte(schiffstyp);

	forschungen=checkCookie("forschungen").split("_"); // replace(/\D/g,"")

	for (i = 0; i < forschungen.length; i++) {

		if (forschungen[i].replace(/\d/g,"").replace("=","") == schiffwerte[3]) {

			schildstufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

		if (forschungen[i].replace(/\d/g,"").replace("=","") == schiffwerte[4]) {

			waffe1stufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

		if (forschungen[i].replace(/\d/g,"").replace("=","") == schiffwerte[5]) {

			waffe2stufe = parseInt(forschungen[i].replace(/\D/g,""));

		} 

	}

	if (isNaN(schildstufe)) schildstufe=0;

	if (isNaN(waffe1stufe)) waffe1stufe=0;

	if (isNaN(waffe2stufe)) waffe2stufe=0;

	att = (schiffwerte[0]*(1+(waffe1stufe+waffe2stufe)/100));

	deff= (schiffwerte[1]*(1+(waffe1stufe+waffe2stufe)/100));

	sp= (schiffwerte[2]*(1+schildstufe/100));

	var1 = anzahl * att ; var2 = anzahl * deff; var3 = anzahl * sp;

	erg = new Array(var1, var2, var3);

	return erg;

}







function getStufe(research) {

	anfang=docE.innerHTML.search(''+research+'</a>", "');

	if (anfang > 0) {

		stufe = docE.innerHTML.substr(docE.innerHTML.indexOf('", ', anfang+(''+research+'</a>", "').length)+3 , 2).replace(/\D/g,"");

		return parseInt(stufe);

	} else {

		return 0;

	}

}



function writeCookie() {

	research=new Array("Impulslaserkanone",  "HiGS-Laserkanone", "Elektronenkanone",  "Tachyonenwerfer","Flickswerfer", "Wasserstoffrakete", "Photonenrakete", "Atomsprengkopf", "Rotationsschild","Phasenwechselschild", "Quantenschild", "Neodemschild",  "Plasmaschild");

	cookiestr="";

	for (i=0; i < research.length;i++) {

		cookiestr+=research[i] +"="+getStufe(research[i])+"_"

	}

	var ablauf = new Date();

	var infuenfTagen = ablauf.getTime() + (2 * 24 * 60 * 60 * 1000);

	ablauf.setTime(infuenfTagen);

	document.cookie = "forschungen="+cookiestr+"; expires=" + ablauf.toGMTString();	

}





function checkCookie(cookieName) {

	var theCookie=""+document.cookie;

 	var ind=theCookie.indexOf(cookieName);

 	if (ind==-1 || cookieName=="") return ""; 

 	var ind1=theCookie.indexOf(';',ind);

 	if (ind1==-1) ind1=theCookie.length; 

 	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));

}





// 

// Berechnet die Ankunftszeit der Flotten.

//

function fleet(value) {

	elTime = document.getElementById("clock").firstChild.nodeValue.split(":");

	flugdauer = document.getElementById("dauer").firstChild.nodeValue;		

	dateString = new Date().getFullYear() +","+ (new Date().getMonth()+1)+","+ new Date().getDate() +","+ elTime[0]+':' +elTime[1]+':'+ elTime[2];

	time = Date.parse( dateString );

			// 6 == unter einem tag; no-split;

			// 7 == unter einem tag; split;

			// 8 == über einem tag; no-split;

			// 9 == über einem tag; split;

	if (flugdauer.split(" ").length == 6+value) { 

		hours = flugdauer.split(" ")[1+value].split(":")[0]*60*60*1000; // stunden in MS

		mins = flugdauer.split(" ")[1+value].split(":")[1]*60*1000; // minuten ins MS;

		seks = flugdauer.split(" ")[1+value].split(":")[2]*1000; // sek in MS

		ankunft = new Date(time+hours+mins+seks);

		_min = ankunft.getMinutes();

		_hour = ankunft.getHours();

		_sec = ankunft.getSeconds();
		if (_min < 10) {

			_min = "0"+_min; }

		if (_hour < 10) {

			_hour = "0"+_hour; }	

		if (_sec < 10) {

			_sec = "0"+_sec; }					

			ankunft =  _hour + ":" + _min + ":" + _sec + " am " + wochenTag(ankunft.getDay()) + " ("+ ankunft.getDate()+"."+(ankunft.getMonth()+1)+ "."+ankunft.getFullYear() +")";

	}

	else if (flugdauer.split(" ").length == 8+value){ 	

		tage = flugdauer.split(" ")[1+value].split(":")[0]*60*60*24*1000; // tage in MS

		hours = flugdauer.split(" ")[3+value].split(":")[0]*60*60*1000; // stunden in MS

		mins = flugdauer.split(" ")[3+value].split(":")[1]*60*1000; // minuten ins MS;

		seks = flugdauer.split(" ")[3+value].split(":")[2]*1000; // sek in MS

		ankunft = new Date(time+tage+hours+mins+seks);

		_min = ankunft.getMinutes();

		_hour = ankunft.getHours();

		_sec = ankunft.getSeconds();

		if (_min < 10) {

			_min = "0"+_min; }

		if (_hour < 10) {

			_hour = "0"+_hour; }	

		if (_sec < 10) {

			_sec = "0"+_sec; }					

			ankunft =  _hour + ":" + _min + ":" + _sec + " am " + wochenTag(ankunft.getDay()) + " (" + ankunft.getDate()+"."+(ankunft.getMonth()+1)+ "."+ankunft.getFullYear() + ")";

	}


	document.getElementById("div1").innerHTML = "Ankunft: " + ankunft;

}



function changeTitle(to, png) {

	if (document.getElementsByClassName("blackcell")[6].innerHTML.indexOf("/msg/"+png+".png") != -1) { // png wurde gefunden

		if (top.document.title.indexOf("Earth Lost") != -1 ) {

			top.document.title = to;

		} else {

			if (top.document.title.indexOf(to) === -1 ) {

				top.document.title = to + " "+ top.document.title ;

			} 

		}

	} else {

		top.document.title = top.document.title.replace(to, "");

	}

}


function wochenTag(day) {
	switch (day) {
		case 0: return "Sonntag";		
		case 1: return "Montag";
		case 2: return "Dienstag";
		case 3: return "Mittwoch";
		case 4: return "Donnerstag";
		case 5: return "Freitag"; 
		case 6: return "Samstag";
		}
}



//

// Zeigt die Punkte in Bau, Durschnittsplanipunkte sowie Benötigte HRs an.

//

function showIntro() {

	var summe = 0; 

	

	// /msg/3.png -> Flottenereignisse -

	// /msg/6.png -> Funkverkehr - 

	// /msg/8.png -> Allianz

	// /msg/9.png -> Handel - 

	// /msg/19.png -> Spionage - 

	// /msg/13.png -> Ticker - 

	// /msg/0.png -> PN -

	

	//Earth Lost - Revolution NOW!

	

	changeTitle("Flottenereignisse!", 3);

	changeTitle("PN!", 0);

	changeTitle("Ticker!", 13);

	changeTitle("Allianz!", 8);

	changeTitle("Handel!", 9);

	changeTitle("Spionage!", 19);

	changeTitle("Funkverkehr!", 6);

	

	if (top.document.title === "") 

		top.document.title = "Earth Lost - Revolution NOW!";

	

	

	

	for (i = 1; i < 5;i++) {

		summe+=parseInt(document.getElementsByClassName("blackcell")[i].firstChild.nodeValue.replace(/\D/g,""));

	}

	// Gebäude in Bau

	var ptsGes = 0;

	for (i = 0; i < docE.getElementsByClassName("event_bau").length; i++) {

		ptsGes += gebaude(docE.getElementsByClassName("event_bau")[i].childNodes[1].childNodes[0].nodeValue);

	}

	// Bauaufträge

	for (i = 0; i < docE.getElementsByClassName("event_bauauftrag").length; i++) {

		ptsGes += gebaude(docE.getElementsByClassName("event_bauauftrag")[i].childNodes[1].childNodes[0].nodeValue);

	}

	planis = document.getElementsByClassName("light")[7].childNodes[1].firstChild.nodeValue.split("(")[0];

	punkte = document.getElementsByClassName("dark")[9].childNodes[1].firstChild.nodeValue.split("(")[0].replace(/\D/g, "");

	var element = document.getElementsByClassName("transcell")[0];

	element.appendChild(document.createTextNode("Durchschnitt Planipunkte: " + number_format((punkte/planis).toFixed(rundenAufxStellen), 2, ",", ".") +" Punkte"));

	element.appendChild(document.createElement('BR'));

	// danke :)

	if( docE.getElementsByClassName("event_forschung").length > 0 ){

	 var typ = docE.getElementsByClassName("event_forschung")[0].childNodes[1].childNodes[0].nodeValue.replace(" ", "");

	} else {

	 var typ = "";

	}

	//auch für das danke, nicht auf die idee gekommen :P

	var bgesamt = docE.getElementsByClassName("event_bauauftrag").length + docE.getElementsByClassName("event_bau").length;

	element.appendChild(document.createTextNode("Punkte in Bau: " + number_format(ptsGes , 0, ",", ".") + " (" + bgesamt + " Auftr"+ unescape("%E4")+"ge - " + number_format((ptsGes/bgesamt).toFixed(rundenAufxStellen), 2, ",", ".") + " Punkte pro Auftrag)" ));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode("Forschung: "+ number_format(forschung(typ), 0, ",", ".") +" Punkte"));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode( "Ben"+unescape("%F6")+"tigte HRs: " + number_format(Math.ceil(summe/100000), 0, ",", ".")  ) );

}



//

// zeigt die transportierten ressourcen an

//

function showRes() {

	dark = docE.getElementsByClassName("dark");

	light = docE.getElementsByClassName("light");

	eisen=0; titan=0;wasser=0;wasserstoff=0;nahrung=0;

 	for (i = 0; i < dark.length;i++) {

		eisen+=parseInt(dark[i].childNodes[1].childNodes[2].nodeValue.replace(/\D/g,"") );

		titan+=parseInt(dark[i].childNodes[1].childNodes[4].nodeValue.replace(/\D/g,""));

		wasser+=parseInt(dark[i].childNodes[1].childNodes[6].nodeValue.replace(/\D/g,""));

		wasserstoff+=parseInt(dark[i].childNodes[1].childNodes[8].nodeValue.replace(/\D/g,""));

		nahrung+=parseInt(dark[i].childNodes[1].childNodes[10].nodeValue.replace(/\D/g,""));

	}

	for (o = 0; o < light.length;o++) {

		eisen+=parseInt(light[o].childNodes[1].childNodes[2].nodeValue.replace(/\D/g,""));			

		titan+=parseInt(light[o].childNodes[1].childNodes[4].nodeValue.replace(/\D/g,""));

		wasser+=parseInt(light[o].childNodes[1].childNodes[6].nodeValue.replace(/\D/g,""));

		wasserstoff+=parseInt(light[o].childNodes[1].childNodes[8].nodeValue.replace(/\D/g,""));

		nahrung+=parseInt(light[o].childNodes[1].childNodes[10].nodeValue.replace(/\D/g,""));			

	}

	var element = document.getElementsByClassName("transcell")[0];

	element.appendChild(document.createTextNode("Eisen: "+ number_format(eisen, 0, ".", ".") ));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode("Titan: " + number_format(titan, 0, ".", ".") ));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode("Wasser: " + number_format(wasser, 0, ".", ".") ));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode("Wasserstoff: " + number_format(wasserstoff, 0, ".", ".") ));

	element.appendChild(document.createElement('BR'));

	element.appendChild(document.createTextNode("Nahrung: " + number_format(nahrung, 0, ".", ".") ));

}



//

// zeit die restzeit der forschun unter "Ausstehende Ereignisse" an.

//

function forschungCalc() { 

	elTime = document.getElementById("clock").firstChild.nodeValue.split(":");

	dateString = new Date().getFullYear() +","+ (new Date().getMonth()+1)+","+ new Date().getDate() +","+ elTime[0]+':' +elTime[1]+':'+ elTime[2];

	startZeit = Date.parse( dateString );

	forschung = docE.getElementsByClassName("event_forschung")[0].childNodes[1].firstChild.nodeValue;

	stufe =  docE.getElementsByClassName("event_forschung")[0].childNodes[3].firstChild.nodeValue;

	document.getElementById("div1").innerHTML = "Fertigstellung von "+ forschung + " "+ stufe+ ": " + dateDiff(startZeit, endZeit);	

}



//

// überprüft, welcher flugtyp gewählt wurde

//

function checkFleet() {

	if (docE.innerHTML.search("Achtung: Bei Stationi") > 0 ) {

			fleet(0);

	} else {

		if (docE.innerHTML.search("flyeachid") > 0) {

			if(document.getElementById("flyeachid").checked == true) {

				fleet(1);

			}else {

				fleet(0);

			}

		}else {

			fleet(0);

		}

	}

}



//

// Ermittel den Punktewert eines Gebäudes

//



function gebaude(typ) {

	if (escape(typ) == "Hauptquartier") {

				pts = 6;

			} else if (escape(typ) == "Biozelle") {

				pts = 1;

			} else if (escape(typ) == "Bunker") {

				pts = 3;

			} else if (escape(typ) == "Farm") {

				pts = 2;

			} else if (escape(typ) == "Eisenmine") {

				pts = 4;

			} else if (escape(typ) == "Titanmine") {

				pts = 4;

			} else if (escape(typ) == "Bohrturm") {

				pts = 2;

			} else if (escape(typ) == "Chemiefabrik") {

				pts = 3;

			} else if (escape(typ) == "Recyclingcenter") {

				pts = 5;

			} else if (escape(typ) == "Nahrungssilo") {

				pts = 1;

			} else if (escape(typ) == "Eisenspeicher") {

				pts = 1;

			} else if (escape(typ) == "Titanspeicher") {

				pts = 1;

			} else if (escape(typ) == "Wasserspeicher") {

				pts = 1;

			} else if (escape(typ) == "Wasserstoffspeicher") {

				pts = 1;

			} else if (escape(typ) == "Universit%E4t") {

				pts = 2;

			} else if (escape(typ) == "Vergn%FCgungszentrum") {

				pts = 10;

			} else if (escape(typ) == "Schiffsfabrik") {

				pts = 15;

			} else if (escape(typ) == "Verteidigungsstation") {

				pts = 2;

			} else if (escape(typ) == "Flottenkontrollzentrum") {

				pts = 5;

			} else if (escape(typ) == "Schildgenerator") {

				pts = 10;

			} else if (escape(typ) == "Intergalaktischer Weltraumhafen") {

				pts = 250;

			} else if (escape(typ) == "Palast") {

				pts = 250;

			} else if (escape(typ) == "Kernforschungszentrum") {

				pts = 250;

			} else if (escape(typ) == "Statue des Imperators") {

				pts = 250;

			} else {

				pts=0;

			}

			return pts;

}



//

// Gibt die Punkte von der aktuellen Forschung zurück

//

function forschung(typ) {

	if (escape(typ) == "Feststoffantrieb") {

				pts = 25;

			} else if (escape(typ) == "Ionenantrieb") {

				pts = 50;

			} else if (escape(typ) == "Tesonenantrieb") {

				pts = 100;

			} else if (escape(typ) == "Verzerrungsantrieb") {

				pts = 200;

			} else if (escape(typ) == "Impulslaserkanone") {

				pts = 20;

			} else if (escape(typ) == "HiGS-Laserkanone") {

				pts = 30;

			} else if (escape(typ) == "Elektronenkanone") {

				pts = 30;

			} else if (escape(typ) == "Tachyonenwerfer") {

				pts = 50;

			} else if (escape(typ) == "Flickswerfer") {

				pts = 25;

			} else if (escape(typ) == "Wasserstoffrakete") {

				pts = 40;

			} else if (escape(typ) == "Photonenrakete") {

				pts = 80;

			} else if (escape(typ) == "Atomsprengkopf") {

				pts = 120;

			} else if (escape(typ) == "Rotationsschild") {

				pts = 20;

			} else if (escape(typ) == "Phasenwechselschild") {

				pts = 50;

			} else if (escape(typ) == "Quantenschild") {

				pts = 100;

			} else if (escape(typ) == "Neodemschild") {

				pts = 150;

			} else if (escape(typ) == "Plasmaschild") {

				pts = 150;

			} else if (escape(typ) == "Radartechnologie") {

				pts = 125;

			} else if (escape(typ) == "Spionagetechnologie") {

				pts = 25;

			} else if (escape(typ) == "Orbitaltransmitter") {

				pts = 125;

			} else if (escape(typ) == "Planetentechnologie") {

				pts = 750;

			} else if (escape(typ) == "Politik") {

				pts = 1000;

			} else if (escape(typ) == "Handelsmacht") {

				pts = 250;

			} else {

				pts=0;

			}

			return pts;

}





//

// Rundet x auf n Nachkommastellen.

//

function runde(x, n) {

  if (n < 1 || n > 14) return false;

  var e = Math.pow(10, n);

  var k = (Math.round(x * e) / e).toString();

  if (k.indexOf('.') == -1) k += '.';

	k += e.toString().substring(1);

  return k.substring(0, k.indexOf('.') + n+1);

}



function number_format(numeral, decimals, dec_point, thousands_sep) {

	var neu = '';

	// Runden

	var f = Math.pow(10, decimals);

	numeral = '' + parseInt(numeral * f + (.5 * (numeral > 0 ? 1: -1))) / f;

	// Komma ermittlen

	var idx = numeral.indexOf('.');

	// fehlende Nullen einfügen

	if(idx != -1) {

		numeral += (idx == -1 ? '.': '') + f.toString().substring(1);

	}

	// Nachkommastellen ermittlen

	idx = numeral.indexOf('.');

	if(idx == -1) 

		idx = numeral.length;

	else 

		neu = dec_point + numeral.substr(idx + 1, decimals);

	// Tausendertrennzeichen

	while(idx > 0) {

		if(idx - 3 > 0)

			neu = thousands_sep + numeral.substring(idx - 3, idx) + neu;

		else

			neu = numeral.substring(0, idx) + neu;

		idx -= 3;

		}

	return neu;

}





function dateDiff(start, ende) {

	ms = ende-start; //millisekunden 

	sekunden = Math.floor(ms/1000%60); 

	minuten = Math.floor(ms/1000/60%60); 

	stunden = Math.floor(ms/60/60/1000); 

	tage = Math.floor(ms/60/60/1000/24); 

	if (stunden < 10) {

		stunden= "0"+stunden;}

	if (minuten < 10) {

		minuten= "0"+minuten;}

	if (sekunden < 10) {

		sekunden= "0"+sekunden;}

	if (tage == 1) { // wenn 1 tag verbleiben

		if (Math.floor(stunden%24) < 10) {

			stunden = "0"+Math.floor(stunden%24);

		} else {

			stunden = Math.floor(stunden%24);

		}

		countdown= "1 Tag - " + stunden + ":" +minuten + ":"+sekunden; 	

	} else if (tage == 0) { // wenn unter 1 tag

		countdown= stunden + ":" +minuten + ":"+sekunden; 

	} else { // wenn über 1 tag

		if (Math.floor(stunden%24) < 10) {

			stunden = "0"+Math.floor(stunden%24);

		} else {

			stunden = Math.floor(stunden%24);

		}

		countdown= tage+" Tage - " + stunden + ":" +minuten + ":"+sekunden; 	

	}

	return countdown;  

}