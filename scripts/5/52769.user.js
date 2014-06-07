// ==UserScript==
// @name           DS - Berichte durchschalten
// @namespace      Die Stämme
// @description	   Ermöglicht im Browsergame "Die Stämme" das Wechseln der Berichte mit den Tasten 4 (<<) und 6 (>>)
// @author         
// @include        http://*.die-staemme.de/*
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Berichte durchschalten 0.9.5";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Dorf-ID:
var nummer = url.split("village=");
var numm = nummer[1].split("&");
var DorfID = numm[0];
	

// Einstellungen:
if(url.match(/screen=settings&mode=settings/)) {
	var vers = vers_ist.split(" ");
	var version = "";
	for(v=0; v<vers.length; v++) {
		if(v < vers.length-1) {
			version += vers[v] + " ";
		}
		else {
			version += "<span class='grey'>" + vers[v] + "</span>";
		}
	}
	
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	th[1] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	
	
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101828' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	tr[0].appendChild(th[0]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
}


// Nur auf Berichte anwenden:
if(url.indexOf("screen=report&mode=all&view=") > -1) {
	
	var vis = document.getElementsByClassName("vis").length-1;
	var tabelle = document.getElementsByClassName("vis")[vis];
	var links = tabelle.getElementsByTagName("a").length;
	
	// Test auf PA:
	var test = tabelle.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
	
	// Ohne PA:
	if(test == "Löschen") {
		// Links festlegen:
		// Mittlerer Bericht:
		if(links == 4) {
			var link_weiter = tabelle.getElementsByTagName("a")[0].href;
			var link_loesch = tabelle.getElementsByTagName("a")[1].href;
			var link_back = tabelle.getElementsByTagName("a")[2].href;
			var link_next = tabelle.getElementsByTagName("a")[3].href;
	
			tabelle.getElementsByTagName("td")[0].innerHTML += "&nbsp;<span class='grey'>[W]</span>";
			tabelle.getElementsByTagName("td")[1].innerHTML += "&nbsp;<span class='grey'>[X]</span>";
			tabelle.getElementsByTagName("td")[2].innerHTML += "&nbsp;<span class='grey'>[4]</span>";
			tabelle.getElementsByTagName("td")[3].innerHTML += "&nbsp;<span class='grey'>[6]</span>";
		}
		// 1. oder letzter Bericht:
		else {
			var check = tabelle.getElementsByTagName("a")[2].innerHTML;

			var link_weiter = tabelle.getElementsByTagName("a")[0].href;
			var link_loesch = tabelle.getElementsByTagName("a")[1].href;
			var link_next = tabelle.getElementsByTagName("a")[2].href;
			var link_back = tabelle.getElementsByTagName("a")[2].href;			

			tabelle.getElementsByTagName("td")[0].innerHTML += "&nbsp;<span class='grey'>[W]</span>";
			tabelle.getElementsByTagName("td")[1].innerHTML += "&nbsp;<span class='grey'>[X]</span>";

			if(check == "&lt;&lt;") {
				tabelle.getElementsByTagName("td")[2].innerHTML += "&nbsp;<span class='grey'>[4]</span>";
			}
			else {
				tabelle.getElementsByTagName("td")[2].innerHTML += "&nbsp;<span class='grey'>[6]</span>";
			}
		}
		
		// Links mit tasten anwählen ( << 4 | 5 >> )
		document.addEventListener('keypress', function(event) {	
			var key = event.which.toString(); 
	
			// Welche Taste wurde gedrückt?
			switch(key) {
				// [w] = Weiterleiten
				case "119":
				document.location.href = link_weiter;
				break;
		
				// [x] = Löschen
				case "120":
				document.location.href = link_loesch;
				break;
		
				// [4] = <<:
				case "52":
				document.location.href = link_back;
				break;
				
				// [6] = >>:
				case "54":
				document.location.href = link_next;
				break;
			}
		}, true);
	}
	
	// Mit PA:
	else {
		// Links festlegen:
		// Mittlerer Bericht:
		if(links == 5) {
			var link_weiter = tabelle.getElementsByTagName("a")[0].href;
			var link_versch = tabelle.getElementsByTagName("a")[1].href;
			var link_loesch = tabelle.getElementsByTagName("a")[2].href;
			var link_back = tabelle.getElementsByTagName("a")[3].href;
			var link_next = tabelle.getElementsByTagName("a")[4].href;
	
			tabelle.getElementsByTagName("td")[0].innerHTML += "&nbsp;<span class='grey'>[W]</span>";
			tabelle.getElementsByTagName("td")[1].innerHTML += "&nbsp;<span class='grey'>[V]</span>";
			tabelle.getElementsByTagName("td")[2].innerHTML += "&nbsp;<span class='grey'>[X]</span>";
			tabelle.getElementsByTagName("td")[3].innerHTML += "&nbsp;<span class='grey'>[4]</span>";
			tabelle.getElementsByTagName("td")[4].innerHTML += "&nbsp;<span class='grey'>[6]</span>";
		}
		// 1. oder letzter Bericht:
		else {
			var check = tabelle.getElementsByTagName("a")[3].innerHTML;

			var link_weiter = tabelle.getElementsByTagName("a")[0].href;
			var link_versch = tabelle.getElementsByTagName("a")[1].href;
			var link_loesch = tabelle.getElementsByTagName("a")[2].href;
			var link_back = tabelle.getElementsByTagName("a")[3].href;
			var link_next = tabelle.getElementsByTagName("a")[3].href;
	
			tabelle.getElementsByTagName("td")[0].innerHTML += "&nbsp;<span class='grey'>[W]</span>";
			tabelle.getElementsByTagName("td")[1].innerHTML += "&nbsp;<span class='grey'>[V]</span>";
			tabelle.getElementsByTagName("td")[2].innerHTML += "&nbsp;<span class='grey'>[X]</span>";

			if(check == "&lt;&lt;") {
				tabelle.getElementsByTagName("td")[3].innerHTML += "&nbsp;<span class='grey'>[4]</span>";
			}
			else {
				tabelle.getElementsByTagName("td")[3].innerHTML += "&nbsp;<span class='grey'>[6]</span>";
			}
		}
		
		// Links mit tasten anwählen ( << 4 | 5 >> )
		document.addEventListener('keypress', function(event) {	
			var key = event.which.toString(); 
	
			// Welche Taste wurde gedrückt?
			switch(key) {
				// [w] = Weiterleiten
				case "119":
				document.location.href = link_weiter;
				break;
		
				// [v] = Verschieben
				case "118":
				document.location.href = link_versch;
				break;
		
				// [x] = Löschen
				case "120":
				document.location.href = link_loesch;
				break;
		
				// [4] = <<:
				case "52":
				document.location.href = link_back;
				break;
				
				// [6] = >>:
				case "54":
				document.location.href = link_next;
				break;
			}
		}, true);
	}
}