// ==UserScript==
// @name           DS - Erinnerung
// @namespace      Die Stämme
// @description    Version 0.9.4 | Ermöglicht im Browsergame "Die Stämme" das hinterlegen von Erinnerungen, welche dann beim nächsten Login angezeigt werden. 
// @autor          Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==



// Aktuell installierte Version:
var vers_ist = "DS - Erinnerung 0.9.4";


// Aktueller Dateipfad:
var url = document.location.href;


// PA-Check:
function pa_chek() {
    var links = document.getElementsByTagName("a");
    for(var i=0; i<links.length; i++) {
        if(links[i].href.match(/screen=memo/)) {    
            return(true);
        }
    }
    return(false);
};  


// Nur bei PA ausführen:
if(pa_chek()) {
	// Einstellungen:
	if(url.match(/screen=settings&mode=settings/)) {
		// Welt:
		var teil = url.split(".");
		var welt = teil[0].replace("http://de", "");
		
		
		// Dorf-ID:
		var nummer = url.split("village=");
		var numm = nummer[1].split("&");
		var dorf_id = numm[0];
			
		
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
		
		if(url.match(/einstellung=erinnerung/)) {
			// Stammestag & ID als GM-Value speichern:
			GM_setValue("Erinnerung", prompt("Erinnerungstext:", GM_getValue("Erinnerung")));
		}
		
		var tr = new Array();
		tr[0] = document.createElement("tr");
		tr[1] = document.createElement("tr");
		var th = new Array();
		th[0] = document.createElement("th");
		var td = new Array();
		td[0] = document.createElement("td");
		td[1] = document.createElement("td");
		
		
		
		
		th[0].setAttribute("colspan", "2");
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=102009' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	
		if((GM_getValue("Erinnerung") == undefined)) {
			td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=erinnerung'>Einstellungen speichern</a>";
			td[1].innerHTML = "<span class='grey'>Momentan ist kein Erinnerungstext gespeichert</span>";
		}
		else {
			td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=erinnerung''>Einstellungen ändern</a>";
			var erinnerung = GM_getValue("Erinnerung");
			td[1].innerHTML += "<b style='padding-right:27px;'>Erinnerung:</b>" + erinnerung;
		}
	
		tr[0].appendChild(th[0]);
		tr[1].appendChild(td[0]);
		tr[1].appendChild(td[1]);
		
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
	}
	
	
	
	
	// Logout:
	if(url.match(/log/)) {
		// Keine Erinnerung gespeichert:
		if(GM_getValue("Erinnerung") == undefined) {
			if(confirm("DS - Erinnerung:\n\nMomentan ist keine Erinnerung gespeichert.\nMöchtest Du beim nächsten Login an etwas erinnert werden?")) {
				GM_setValue("Erinnerung", prompt("Erinnerung:\nHier bitte den Text eingeben, welcher Dir beim nächsten Login als Erinnerung angezeigt werden soll."));
		   }
		}
		// Erinnerung gespeichert:
		else {
			if(confirm("DS - Erinnerung:\nMomentan ist eine Erinnerung gespeichert.\n--------------------------------------------------------------\n\n" + GM_getValue("Erinnerung") + "\n\n--------------------------------------------------------------\nMöchtest Du den Erinnerungstext jetzt bearbeiten?")) {
				GM_setValue("Erinnerung", prompt("Erinnerung:\nDies ist der gespeicherte Text, welcher Dir beim nächsten Login als Erinnerung angezeigt werden soll.", GM_getValue("Erinnerung")));
		   }
		}
	}
	
	
	// Login:
	if(url.match(/intro$/)) {
		if((GM_getValue("Erinnerung") != undefined )) {
			if(confirm("DS - Erinnerung:\n--------------------\n\n" + GM_getValue("Erinnerung") + "\n\n--------------------------------------------------\nSoll die Erinnerung jetzt gelöscht werden?")) {
				GM_deleteValue("Erinnerung");
		   }
		}
	}
}
