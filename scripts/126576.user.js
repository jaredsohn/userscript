// ==UserScript==
// @name          USARMY Historie Durchschnitt
// @author        Thomas Büning
// @namespace     http://usinfantry.derchaot.bplaced.de
// @description   Berechnet einen Durchschnitt für Einnahmen bei Gefechten,Diensten und Spenden in der Historie.
// @include       http://usarmy.schulterglatze.de/masterfile/history
// @include       http://usarmy.schulterglatze.de/masterfile/history/combat
// @include       http://usarmy.schulterglatze.de/masterfile/history/sergeantduty
// @include       http://usarmy.schulterglatze.de/masterfile/history/assignments
// @include       http://usarmy.schulterglatze.de/masterfile/history/donate
// ==/UserScript==

//Spendendurchschnitt
if(location.pathname == "/masterfile/history/donate") {
	var spendenanzahl = document.getElementsByClassName("feldpost_box")[0].getElementsByClassName("link")[0].innerHTML;
	var spendenanzahl = parseInt(spendenanzahl);
	var spendensummestr = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[0].innerHTML;
	var spendensumme = spendensummestr.replace(/\./gi, "");
	spendensumme = spendensumme.replace(/\,/g, ".");
	var durchschnitt = spendensumme / spendenanzahl;
	durchschnitt *= 100; //Fuer 2 nachkommastellen
	durchschnitt = Math.round(durchschnitt);
	durchschnitt /= 100; //Um wieder die alte Zahl zu bekommen, nur gerundet
	var ergebnis = "<font color='#FF973B'>" + durchschnitt + "</font>";
	var neuereihe = "<tr><td><font color='#FF973B'>Ø Durchschnitt</font></td><td></td><td></td><td class='rechts'>" + ergebnis + "</td><td></td></tr>";
	document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].insertAdjacentHTML("BeforeEnd", neuereihe);
}

//Einsatz Durschnitt
if(location.pathname == "/masterfile/history/assignments") {
	var einsatzzahl = document.getElementsByClassName("feldpost_box")[0].getElementsByClassName("link")[0].innerHTML;
	einsatzzahl = parseInt(einsatzzahl);
	var einsatzsumme = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[0].innerHTML;
	einsatzsumme = einsatzsumme.replace(/\./gi, "");
	einsatzsumme = einsatzsumme.replace(/\,/g, ".");
	var durchschnitt = einsatzsumme / einsatzzahl;
	durchschnitt *= 100; //Fuer 2 nachkommastellen
	durchschnitt = Math.round(durchschnitt);
	durchschnitt /= 100; //Um wieder die alte Zahl zu bekommen, nur gerundet
	var ergebnis = "<font color='#FF973B'>" + durchschnitt + "</font>";
	var neuereihe = "<tr><td><font color='#FF973B'>Ø Durchschnitt</font></td><td class='rechts'>" + ergebnis + "</td></tr>";
	document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].insertAdjacentHTML("BeforeEnd", neuereihe);
}

//Einsatz Dienste
if(location.pathname == "/masterfile/history/sergeantduty") {
	var dienstzahl = document.getElementsByClassName("feldpost_box")[0].getElementsByClassName("link")[0].innerHTML;
	dienstzahl = parseInt(dienstzahl);
	var dienstsumme = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[0].innerHTML;
	dienstsumme = dienstsumme.replace(/\./gi, "");
	dienstsumme = dienstsumme.replace(/\,/g, ".");
	var durchschnitt = dienstsumme / dienstzahl;
	durchschnitt *= 100; //Fuer 2 nachkommastellen
	durchschnitt = Math.round(durchschnitt);
	durchschnitt /= 100; //Um wieder die alte Zahl zu bekommen, nur gerundet
	var ergebnis = "<font color='#FF973B'>" + durchschnitt + "</font>";
	var neuereihe = "<tr><td><font color='#FF973B'>Ø Durchschnitt</font></td><td class='rechts'>" + ergebnis + "</td></tr>";
	document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].insertAdjacentHTML("BeforeEnd", neuereihe);
}

//Gefechte
if(location.pathname == "/masterfile/history/combat" || location.pathname == "/masterfile/history") {
	var gefechtzahl = document.getElementsByClassName("feldpost_box")[0].getElementsByClassName("link")[0].innerHTML;
	gefechtzahl = parseInt(gefechtzahl);
	var punktesumme = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[0].innerHTML;
	punktesumme = punktesumme.replace(/\./gi, "");
	if(punktesumme.charAt(0) == "-") {
		punktesumme = punktesumme.replace(/\-/g, "");
		var punkteschnitt = punktesumme / gefechtzahl;
		punkteschnitt *= 100;
		punkteschnitt = Math.round(punkteschnitt);
		punkteschnitt /= 100;
		punkteschnitt = "-" + punkteschnitt;
	} else {
		var punkteschnitt = punktesumme / gefechtzahl;
		punkteschnitt *= 100;
		punkteschnitt = Math.round(punkteschnitt);
		punkteschnitt /= 100;
	}
	var punkteergebnis = "<font color='#FF973B'>" + punkteschnitt + "</font>";

	var kopfgeldsumme = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[1].innerHTML;
	kopfgeldsumme = kopfgeldsumme.replace(/\./gi, "");
	var kopfgeldschnitt = kopfgeldsumme / gefechtzahl;
	kopfgeldschnitt *= 100;
	kopfgeldschnitt = Math.round(kopfgeldschnitt);
	kopfgeldschnitt /= 100;
	var kopfgeldergebnis = "<font color='#FF973B'>" + kopfgeldschnitt + "</font>";

	var geldsumme = document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].getElementsByClassName("rechts")[2].innerHTML;
	geldsumme = geldsumme.replace(/\./gi, "");
	if(geldsumme.charAt(0) == "-") {
		geldsumme = geldsumme.replace(/\-/g, "");
		var geldschnitt = geldsumme / gefechtzahl;
		geldschnitt *= 100;
		geldschnitt = Math.round(geldschnitt);
		geldschnitt /= 100;
		geldschnitt = "-" + punkteschnitt;
	} else {
		var geldschnitt = geldsumme / gefechtzahl;
		geldschnitt *= 100;
		geldschnitt = Math.round(geldschnitt);
		geldschnitt /= 100;
	}
	var geldergebnis = "<font color='#FF973B'>" + geldschnitt + "</font>";
	var neuereihe = "<tr><td><font color='#FF973B'>Ø Durchschnitt</font></td><td></td><td></td><td></td><td></td><td class='rechts'>" + punkteergebnis + "</td><td class='rechts'>" + kopfgeldergebnis + "</td><td></td><td class='rechts'>" + geldergebnis + "</td><td></td></tr>";
	document.getElementsByClassName("feldpost_box")[0].getElementsByTagName("table")[0].getElementsByTagName("tfoot")[0].insertAdjacentHTML("BeforeEnd", neuereihe);
}