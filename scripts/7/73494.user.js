// ==UserScript==
// @name           Tribalwars-mill-bookmaker--plapl.com
// @namespace      tribalwars.ae
// @description	   يقوم السكربات بي عرض الرسائل في عضوية الاعب المتحاور معه و بي هدي الطريقه ريح ترتاح من البحث عن الرسائل
// @author         Roman S. (Zombie74)
// @include        http://ae*.tribalwars.ae/*
// @exclude        http://ae*.tribalwars.ae/guest.php*
// @exclude        http://forum.tribalwars.ae/*
// ==/UserScript==





// Aktuell installierte Version:
var vers_ist = "مفهرس الرسائل و منضمها اصدار 0.9.1";

// Aktueller Dateipfad:
var url = document.location.href;

// Welt:
var welt = url.split(".")[0].replace("http://ae", "");

// Dorf-ID:
var dorf_id = url.split("village=")[0].split("&")[0];





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
	
	// Einstellungen (Entfernungen):
	if(url.match(/einstellung=nachrichten/)) {
		// Anzahl als GM-Value speichern:
		GM_setValue("Anzahl-" + welt, prompt("عدد رسايل التي يتم عرضها في صفحة الاعب:", GM_getValue("Anzahl-" + welt)));
	}
	
	// Neue Zeile und Zellen erstellen:
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
	th[0].innerHTML = "<a href='http://www.plapl.com/showthread.php?t=12890' target='Forum' title='الموضوع في المنتدى \"" + version.split(" <span")[0] + "\" '>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((GM_getValue("Anzahl-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://ae" + welt + ".tribalwars.ae/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten''>حفظ إعدادات</a>";
		td[1].innerHTML = "<span class='grey'>وحتى الآن ، لا يتم حفظ أي إعدادات</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://ae" + welt + ".tribalwars.ae/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten''>إعدادات</a>";
		var anzahl = GM_getValue("Anzahl-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:55px;'>عدد الرسائل في الصفحه الاعب</b>" + anzahl.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		(GM_getValue("Anzahl-" + welt) == undefined)) {
		if(confirm(vers_ist + " الآن تركيب \n\n اضغط على موافق لعرض الإعدادات لعرض آخر الأخبار صنع")) {
			document.location.href = "http://ae" + welt + ".tribalwars.ae/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Anzahl-" + welt, "3");
		}
	}
}





// Nachrichten:
if(url.match(/mode=view/)) {
	var tabelle  = document.getElementsByClassName("vis")[1];
	var titel = tabelle.getElementsByTagName("tr")[0].getElementsByTagName("th")[1].innerHTML;
	var spieler = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("a")[0];
	var spieler_name = spieler.innerHTML;
	var spieler_id = spieler.href.split("id=")[1];
	
	// Link zur aktuellen Mail erstellen:
	var mail_link = "<a href='" + url + "' target='_blank'>" + titel + "</a>";
	
	// Werte als GM-Value speichern:
	if(GM_getValue(spieler_id + "-" + welt) == undefined) {
		GM_setValue(spieler_id + "-" + welt, mail_link);
	}
	else {
		// Nur speichern wenn der Link zu dieser Mail noch nicht existiert:
		if(GM_getValue(spieler_id + "-" + welt).indexOf(mail_link) == -1) {
			// Gespeicherte Mails in Array aufsplitten:
			var mails = GM_getValue(spieler_id + "-" + welt).split(";");
			// Neue Mailliste zusammensetzen:
			for(i=0; i<GM_getValue("Anzahl-" + welt)-1; i++) {
				mail_link += ";" + mails[i];
			}
			GM_setValue(spieler_id + "-" + welt, mail_link);
		}
	}
}





// Spielerprofil:
if(url.match(/screen=info_player/)) {
	var spieler_id = url.split("id=")[1];
	var letzte = GM_getValue(spieler_id + "-" + welt).split(";");
	
	// Tabelle:	
	var tabelle = document.getElementsByClassName("vis")[2];
	var zeilen = tabelle.getElementsByTagName("tr").length;
	var colspan = 1;
	if(zeilen > 1) {
		colspan = 2;
	}
	
	// Letzte Nachrichten:
	var mails = "<tr><th colspan='" + colspan + "'>";
	mails += "<p style='margin-top:10px; margin-bottom:0; padding-bottom:0; text-align:center; line-height:0'><a target='_blank' href='http://www.plapl.com/forum.php'><img src='http://feeds.feedburner.com/plapl.2.gif' alt='بلابل' style='border:0' width='400' height='60'></a></p>";
	mails += "اخر محدثات دارت بينك و بين الاعب (اقصى عدد <span class='grey'>" + GM_getValue("Anzahl-" + welt) + ")</span>  ";
	mails += "<a href='http://ae" + welt + ".tribalwars.ae/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=nachrichten' title='تعديل على السكربات | " + vers_ist + "'><img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' /></a></th>";
	mails += "</th></tr>";
	
	// Anzahl der letzten Nachrichten ermitteln:
	var anzahl = letzte.length;
	// Mails durchlaufen
	for(i=0; i<anzahl; i++) {
		mails += "<tr><td colspan='" + colspan + "'>" + letzte[i] + "</td></tr>";
	}
	
	// Mails in Tabelle einfügen:
	tabelle.innerHTML += mails;
}