// ==UserScript==
// @name           DS - Forenlinks
// @namespace      Die Stämme
// @author         Roman-S. (Zombie74)
// @description    Version 0.9.1 | Emöglicht im Browsergame "Die Stämme" das Anpassen der Links fürs interne und externe Forum 
// @include        http://de*.die-staemme.de/*
// @include        http://ch*.staemme.ch/*
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==


// Aktuell installierte Version:
var vers_ist = "DS - Forenlinks 0.9.1";


// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");


// Dorf-ID:
var nummer = url.split("village=");
var numm = nummer[1].split("&");
var dorf_id = numm[0];
	
	
// Adressen:
var adresse = new Array();
adresse["de"] = ".die-staemme.";
adresse["ch"] = ".staemme.";
adresse["nl"] = ".tribalwars.";


// Aktuelles Datum:
var jetzt = new Date();
var tag = jetzt.getDate();
var monat = jetzt.getMonth()+1;
var jahr = jetzt.getFullYear();
var heute = tag + "." + monat + "." + jahr;
	




//******************************//
// Einstellungen:				//
//								//
//******************************//
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

	// Einstellungen (Forenlinks):
	if(url.match(/einstellung=forenlinks/)) {
		// Link zum Benutzerkontrollzentrum an/aus als GM-Value speichern:
		if(confirm("Link zum Benutzerkontrollzentrum:\n\nSoll ein direkter Link zum Benutzerkontrollzentrum des externen Forums agezeigt werden?")) {
			GM_setValue("Link-UserCp-" + welt, "an");		
		}
		else {
			GM_setValue("Link-UserCp-" + welt, "aus");		
		}
		
		// Internes Forum in neuem Tab an/aus als GM-Value speichern:
		if(confirm("Link zum Posteingang:\n\nSoll ein direkter Link zum Posteingang des externen Forums agezeigt werden?")) {
			GM_setValue("Link-Post-" + welt, "an");		
		}
		else {
			GM_setValue("Link-Post-" + welt, "aus");		
		}
		
		// Extra-Link 1:
		if(confirm("Extra Link 1:\n\nSoll ein Extra Link eingefügt werden?")) {
			GM_setValue("Link-Extra-1-" + welt, "an");	
			GM_setValue("Link-URL-1-" + welt, prompt("Link-URL:\n\nBitte die Adresse der Seite angeben", GM_getValue("Link-URL-1-" + welt)));
			GM_setValue("Link-Titel-1-" + welt, prompt("Link-Titel:\n\nBitte den Titel des Links angeben", GM_getValue("Link-Titel-1-" + welt)));
			GM_setValue("Link-IMG-1-" + welt, prompt("Link-Icon:\n\nBitte die Adresse für das Icon angeben", GM_getValue("Link-IMG-1-" + welt)));
		}
		else {
			GM_setValue("Link-Extra-1-" + welt, "aus");		
			GM_setValue("Link-URL-1-" + welt, "");
			GM_setValue("Link-Titel-1-" + welt, "");
			GM_setValue("Link-IMG-1-" + welt, "");
		}	
		
		// Extra-Link 2:
		if(confirm("Extra Link 2:\n\nSoll ein 2. Extra Link eingefügt werden?")) {
			GM_setValue("Link-Extra-2-" + welt, "an");	
			GM_setValue("Link-URL-2-" + welt, prompt("Link-URL:\n\nBitte die Adresse der Seite angeben", GM_getValue("Link-URL-2-" + welt)));
			GM_setValue("Link-Titel-2-" + welt, prompt("Link-Titel:\n\nBitte den Titel des Links angeben", GM_getValue("Link-Titel-2-" + welt)));
			GM_setValue("Link-IMG-2-" + welt, prompt("Link-Icon:\n\nBitte die Adresse für das Icon angeben", GM_getValue("Link-IMG-2-" + welt)));
		}
		else {
			GM_setValue("Link-Extra-2-" + welt, "aus");			
			GM_setValue("Link-URL-2-" + welt, "");
			GM_setValue("Link-Titel-2-" + welt, "");
			GM_setValue("Link-IMG-2-" + welt, "");	
		}	
		
		// Internes Forum in neuem Tab an/aus als GM-Value speichern:
		if(confirm("Internes Forum:\n\nSoll das interne Forum in einem neuen Tab geöffnet werden?")) {
			GM_setValue("Forum-Intern-Tab-" + welt, "an");		
		}
		else {
			GM_setValue("Forum-Intern-Tab-" + welt, "aus");		
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
	td[0].setAttribute("style", "vertical-align:top;");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?p=1633296#post1633296' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	
	if((GM_getValue("Forum-Intern-Tab-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=forenlinks''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=forenlinks''>Einstellungen ändern</a>";
		var intern_tab = GM_getValue("Forum-Intern-Tab-" + welt);
		var link_xtr_1 = GM_getValue("Link-Extra-1-" + welt);
		var link_img_1 = GM_getValue("Link-IMG-1-" + welt);
		var link_user  = GM_getValue("Link-UserCp-" + welt);
		var link_post  = GM_getValue("Link-Post-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:8px;'>Kontrollzentr.:</b>" + link_user.replace("an", "<span style='color:#090'>an</span> <span  style='color:#999'>(Es wird ein extra Link zum Benutzerkontrollzentrum des externen Forums eingeblendet)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span  style='color:#999'>Es wird kein extra Link zum Benutzerkontrollzentrum des externen Forums eingeblendet</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:8px;'>Kontrollzentr.:</b>" + link_post.replace("an", "<span style='color:#090'>an</span> <span  style='color:#999'>(Es wird ein extra Link zum Posteingang des externen Forums eingeblendet)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span  style='color:#999'>Es wird kein extra Link zum Posteingang des externen Forums eingeblendet</span>") + "<br>";
		if(link_xtr_1 != undefined) {
			var link_url_1 = GM_getValue("Link-URL-1-" + welt);
			var link_xtr_2 = GM_getValue("Link-Extra-2-" + welt);
			td[1].innerHTML += "<b style='padding-right:18px;'>Extra Link 1:</b>" + link_xtr_1.replace("an", "<span style='color:#090'>an</span> <a href='" + link_url_1 + "'><img src='" + link_img_1 + "' style='height:12px;'> " + link_url_1 + "</a> ").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		}
		if(link_xtr_2 != undefined) {
			var link_img_2 = GM_getValue("Link-IMG-2-" + welt);
			var link_url_2 = GM_getValue("Link-URL-2-" + welt);
			td[1].innerHTML += "<b style='padding-right:18px;'>Extra Link 2:</b>" + link_xtr_2.replace("an", "<span style='color:#090'>an</span> <a href='" + link_url_2 + "'><img src='" + link_img_2 + "' style='height:12px;'> " + link_url_2 + "</a> ").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		}
		td[1].innerHTML += "<b style='padding-right:12px;'>Forum in Tab:</b>" + intern_tab.replace("an", "<span style='color:#090'>an</span> <span  style='color:#999'>(Das interne Forum wird in einem neuen Tab geöffnet)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span  style='color:#999'>Das interne Forum wird im aktuellen Tab geöffnet.</span>") + "<br>";
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && (
		(GM_getValue("Link-UserCp-" + welt) == undefined) || 
		(GM_getValue("Link-Post-" + welt) == undefined) || 
		(GM_getValue("Link-Extra-1-" + welt) == undefined) || 
		(GM_getValue("Link-URL-2-" + welt) == undefined) || 
		(GM_getValue("Link-Titel-2-" + welt) == undefined) || 
		(GM_getValue("Link-IMG-2-" + welt) == undefined) || 
		(GM_getValue("Link-Extra-2-" + welt) == undefined) || 
		(GM_getValue("Link-URL-2-" + welt) == undefined) || 
		(GM_getValue("Link-Titel-2-" + welt) == undefined) || 
		(GM_getValue("Link-IMG-2-" + welt) == undefined) || 
		(GM_getValue("Forum-Intern-Tab-" + welt) == undefined))) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Forenlinks vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=forenlinks";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Link-UserCp-" + welt, "an");
			GM_setValue("Link-Post-" + welt, "an");
			GM_setValue("Link-Extra-1-" + welt, "an");
			GM_setValue("Link-URL-1-" + welt, "http://forum.die-staemme.de/showthread.php?p=1633296#post1633296");
			GM_setValue("Link-Titel-1-" + welt, "Forum | Meine UserScripts");
			GM_setValue("Link-IMG-1-" + welt, "http://forum.die-staemme.de/images/icons/icon1.gif");
			GM_setValue("Link-Extra-2-" + welt, "an");
			GM_setValue("Link-URL-2-" + welt, "http://userscripts.org/users/78709/scripts");
			GM_setValue("Link-Titel-2-" + welt, "userscripts.org | Scripts by Roman-S.");
			GM_setValue("Link-IMG-2-" + welt, "http://static.userscripts.org/images/script_icon.png");
			GM_setValue("Forum-Intern-Tab-" + welt, "an");
		}
	}
}





//******************************//
// Alle DS-Seiten:				//
//								//
//******************************//
// Forum | Benutzerkontrollzentrum:
var imgs = 0;

// Soll Link zum Benutzerkontrollzentrum angezeigt weden?
if(GM_getValue("Link-UserCp-" + welt) == "an") {
	document.getElementsByTagName("td")[2].innerHTML += "<a href='http://forum.die-staemme.de/usercp.php' target='forum' title='Forum | Benutzerkontrollzentrum' style='padding-left:5px;'><img src='http://forum.die-staemme.de/staemme/buttons/lastpost.gif' /></a>";
	imgs++;
}

// Soll Link zum Posteingang angezeigt weden?
if(GM_getValue("Link-Post-" + welt) == "an") {
	document.getElementsByTagName("td")[2].innerHTML += "<a href='http://forum.die-staemme.de/private.php' target='forum' title='Forum | Posteingang' style='padding-left:5px;'><img src='http://forum.die-staemme.de/staemme/statusicon/pm_new.gif' style='height:12px;' /></a>";
	imgs++;
}

// Soll Extra-Link-1 angezeigt weden?
if(GM_getValue("Link-Extra-1-" + welt) == "an") {
	// Link zum Thema Meine UserScripts:
	document.getElementsByTagName("td")[2].innerHTML += "<a href='" + GM_getValue("Link-URL-1-" + welt).replace(/ /g, "") + "' target='extra_1' title='" + GM_getValue("Link-Titel-1-" + welt) + "' style='padding-left:5px;'><img src='" + GM_getValue("Link-IMG-1-" + welt) + "' style='height:12px;' /></a>";
	imgs++;
}

// Soll Extra-Link-2 angezeigt weden?
if(GM_getValue("Link-Extra-2-" + welt) == "an") {
	// Link zum Thema Meine UserScripts:
	document.getElementsByTagName("td")[2].innerHTML += "<a href='" + GM_getValue("Link-URL-2-" + welt).replace(/ /g, "") + "' target='extra_2' title='" + GM_getValue("Link-Titel-2-" + welt) + "' style='padding-left:5px;'><img src='" + GM_getValue("Link-IMG-2-" + welt) + "' style='height:12px;' /></a>";
	imgs++;
}





// Ist die Blume (Neuer Beitrag) vorhanden?
var blume = document.getElementsByTagName("img")[imgs].src;

// Neuer Forenbeitrag:
if(blume.match(/ally_forum.png/)) {
	// Link zum internen Forum:
	if(GM_getValue("Forum-Intern-Tab-" + welt) == "an") {
		var forum_link = "http://de" + welt + ".die-staemme.de/forum.php";
		var forum_targ = "forum-" + welt;
		var link_title = "Neuer Beitrag im Stammesforum";
		var forum_img  = "http://de" + welt + ".die-staemme.de/graphic/dots/green.png";
		
		// Forenlink einfügen:	
		document.getElementById("menu_row").innerHTML += "<td><a href='" + forum_link + "' target='" + forum_targ + "' title='" + link_title + "'><img src='" + forum_img + "'> Forum</a></td>";
	} 
}