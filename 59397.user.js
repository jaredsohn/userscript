// ==UserScript==
// @name           Extend Formulawan
// @author         Bouvere
// @version        0.0.1
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://www.formulawan.de/*
// @description    Dieses Skript fÃ¼gt Formulawan einige Neuerungen und Verbesserungen hinzu.
// ==/UserScript==

function Linkoeffnen(Link){
	GM_xmlhttpRequest({
		method: "GET",
		url:Link,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:""
		});
}

if (location.search.split("=")[1] == "Detail_Championnat;id") {
	var Tabelle = document.getElementsByTagName("table")[1].rows;
	for (var Reihe = 1; Reihe < Tabelle.length; Reihe++) {
		var Punkte = parseInt(Tabelle[Reihe].cells[3].innerHTML);
		var Ausdruck = />(\d)</;
		Ausdruck.exec(Tabelle[Reihe].cells[4].innerHTML);
		var Tage = parseInt(RegExp.$1);
		var Zelle = Tabelle[Reihe].insertCell(5);
		Zelle.innerHTML = Math.round(Punkte/Tage);
	}
	Tabelle[0].appendChild(document.createElement("th"));
	Tabelle[0].cells[5].innerHTML = "P/T";
	
	var Knopf = document.createElement("a");
	Knopf.setAttribute("class","button");
	Knopf.setAttribute("onclick","javascript:Tagesendstand();");
	Knopf.setAttribute("href","javascript:;");
	Knopf.innerHTML = "Voraussichtlicher Tagesendstand";
	document.getElementById("innerContent").insertBefore(Knopf,document.getElementsByTagName('h2')[3]);
	
	unsafeWindow.Tagesendstand = function() {
		var WochenTag = new Date().getDay();
		var Tabelle = document.getElementsByTagName('table')[1].rows;
		var DatenArray = new Array();
		for (var Reihe = 0; Reihe < Tabelle.length; Reihe++) {
			var Punkte = parseInt(Tabelle[Reihe].cells[3].innerHTML);
			var Ausdruck = />(\d)</;
			Ausdruck.exec(Tabelle[Reihe].cells[4].innerHTML);
			var Tage = parseInt(RegExp.$1);
			var Fahrer = Tabelle[Reihe].cells[1].innerHTML;
			var Rennstall = Tabelle[Reihe].cells[2].innerHTML;
			if (Tage <= (WochenTag+6) % 7) {
				Tage++;
				Punkte += Math.round(Punkte/(Tage - 1));
			}
			if (Tabelle[Reihe].getAttribute("class") == "me") {
				var Name = Rennstall;
				Tabelle[Reihe].removeAttribute("class");
			}
			DatenArray.push(new Array(Fahrer,Rennstall,Punkte,Tage));
		}
		DatenArray.sort(function(a,b) {return b[2] - a[2]});
		var Abw = 0;
		var Reihe = 0;
		while (Reihe++ < Tabelle.length-1) {
			if ((Reihe != 1) && (DatenArray[Reihe][2] == DatenArray[Reihe-1][2])) Abw++; else Abw = 0;
			Tabelle[Reihe].cells[0].innerHTML = Reihe - Abw;
			Tabelle[Reihe].cells[1].innerHTML = DatenArray[Reihe][0];
			Tabelle[Reihe].cells[2].innerHTML = DatenArray[Reihe][1];
			Tabelle[Reihe].cells[3].innerHTML = DatenArray[Reihe][2];
			Tabelle[Reihe].cells[4].innerHTML = '<center>' + DatenArray[Reihe][3] + '</center>';
			Tabelle[Reihe].cells[5].innerHTML = Math.round(DatenArray[Reihe][2]/DatenArray[Reihe][3]);
			if (DatenArray[Reihe][1] == Name) {
				Tabelle[Reihe].setAttribute("class","me",0);
			}
		}
	}
} else if (location.search.split("=")[1] == "Gestion;id") {
	for (var i = 0; i < 4; i++) document.getElementsByTagName("strong")[i + 2].innerHTML += ": " + document.getElementsByClassName("statBar")[i].title;
} else if (location.search.split("=")[1] == "garage") {
	var div = document.getElementById("innerContent");
	var Knopf = document.createElement("a");
	Knopf.setAttribute("class","button");
	Knopf.setAttribute("onclick","return confirm('Alle Wagen reparieren?');");
	Knopf.setAttribute("href","?action=garage;all");
	Knopf.innerHTML = "Alle Wagen reparieren";
	div.insertBefore(Knopf,document.getElementsByTagName('h2')[1]);
} else if (location.search.split("=")[1] == "garage;all") {
	var Links = document.getElementsByClassName("action action_repair");
	var i = Links.length;
	while (i-- > 0) Linkoeffnen(Links[i].href);
	location.replace("http://www.formulawan.de/Fenetre_Voiture.php?action=garage");
}