// ==UserScript==
// @name           DS - Rangliste rechtsbündig
// @namespace      Die Stämme
// @description    Zeigt im Browsergame "Die Stämme" alle Zahlen in den Ranglisten rechtsbündig an
// @autor          Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==



// Aktuell installierte Version:
var vers_ist = "DS - Rangliste rechtsbündig 0.9.2";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var welt = teil[0].replace("http://de", "");


// Dorf-ID:
var nummer = url.split("village=");
var numm = nummer[1].split("&");
var dorf_id = numm[0];
	

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
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101830' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	tr[0].appendChild(th[0]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
}






// Rangliste rechtsbündig:
if(url.match(/screen=ranking/)) {
	var zeilen = document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;
	var zellen = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[0].getElementsByTagName("th").length;
	for(i=1; i<zeilen; i++) {
		for(x=0; x<zellen; x++) {
			var links = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[x].getElementsByTagName("a").length;
			if(links == 0) {
				document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML = "<span style='display: block; padding-right:2px; text-align:right;'>" + document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML + "<span>";
			}
			else {
				document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML = "<span style='display: block; padding-left:2px;'>" + document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[x].innerHTML + "<span>";
			}
		}	
	}
}