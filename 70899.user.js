// ==UserScript==
// @name           DS - UserScript-Sammler
// @namespace      Die Stämme
// @description	   Version 0.9.1 | Sammelt alle im Forum vorgestellten UserScripts und speichert diese als Liste.
// @include        http://de*.die-staemme.de/*
// @include        http://forum.die-staemme.de/*
// @include        http://localhost/DS-X/*
// @include        http://*ds-x.bplaced.net/*
// ==/UserScript==




// Aktuelle URL:
var url = document.location.href;

// Aktuelle Version:
var vers_ist = "DS - UserScript-Sammler 0.9.1";

// URL zu DS-X:
var url_dsx = "http://www.ds-x.bplaced.net";



// Testinfo an|aus (true|false):
// var test = true;
var test = false;
var testinfo = vers_ist + " | Testinfo:\n";
testinfo += "___________________________________________________________________________\n";
testinfo += "\n";





function order(a, b)	{
	a = a.toLowerCase();
	a = a.replace(/ä/g,"a");
	a = a.replace(/ö/g,"o");
	a = a.replace(/ü/g,"u");
	a = a.replace(/ß/g,"s");

	b = b.toLowerCase();
	b = b.replace(/ä/g,"a");
	b = b.replace(/ö/g,"o");
	b = b.replace(/ü/g,"u");
	b = b.replace(/ß/g,"s");

	return(a==b)?0:(a>b)?1:-1;
}


// Funktion zum löschen der GM-Values:
function del_gm_values() {
	// Soll die Liste gelöscht werden?
	if(confirm("Soll die gespeicherte Liste gelöscht werden?")) {
		// Gespeicherte Autoren auslesen:
		var autoren = GM_getValue("Scriptautoren");
		
		// Liste in Array aufsplitten:
		autoren = autoren.split(";").sort(order);
		
		// GM-Value löschen:
		for(var a=0; a<autoren.length; a++) {
			// Scriptlisten löschen:
			GM_deleteValue("Scriptliste-" + user_name);
		}
		// Autorenliste löschen:
		GM_deleteValue("Scriptautoren");
		
		// Hinweis ausgeben:
		alert("Liste wurde gelöscht");
	}
}
// In GM-Menü einfügen:
GM_registerMenuCommand("DS-X | Liste Löschen", del_gm_values);





/****************************************************/
/*													*/
/*	Die Stämme allgemein:							*/
/*													*/
/****************************************************/
if(url.match(/game.php/)) {
	var url = document.location.href;
	// Welt:
	var teil = url.split(".");
	var land = url.substr(7, 2);
	var welt = teil[0].replace("http://" + land, "");
	
	// Dorf-ID:
	var dorf_id  = document.location.href.split("village=")[1].split("&")[0];

	// Adressen:
	var adresse = new Array();
	adresse["de"] = ".die-staemme.";
	adresse["ch"] = ".staemme.";
	adresse["nl"] = ".tribalwars.";
		
		
	
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
		if(url.match(/einstellung=sammler/)) {
			// Ingame-Link an/aus als GM-Value speichern:
			if(confirm("Ingame-Link:\n\nSollen ingame ein Link zu DS-X eingebaut werden?")) {
				GM_setValue("Ingame", "an");		
			}
			else {
				GM_setValue("Ingame", "aus");		
			}
			// Ankunft anzeigen:
			if(confirm("Forum-Link:\n\nSoll im DS-Forum ein Link zu DS-X eingebaut werden?")) {
				GM_setValue("Forum", "an");		
			}
			else {
				GM_setValue("Forum", "aus");		
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
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101958' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
		td[0].setAttribute("style", "vertical-align:top;");
		
		if((GM_getValue("Ingame") == undefined) || 
			(GM_getValue("Forum") == undefined)) {
			td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=sammler''>Einstellungen speichern</a>";
			td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine bzw. nicht alle Einstellungen gespeichert</span>";
		}
		else {
			td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=sammler''>Einstellungen ändern</a>";
			var ingame = GM_getValue("Ingame");
			var forum = GM_getValue("Forum");
			
			td[1].innerHTML += "<b style='padding-right:14px;'>Ingame-Link:</b>" + ingame.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
			td[1].innerHTML += "<b style='padding-right:22px;'>Forum-Link:</b>" + forum.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		}
		
		tr[0].appendChild(th[0]);
		tr[1].appendChild(td[0]);
		tr[1].appendChild(td[1]);
		
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
	}
	else {
		if((url.match(/screen=/)) && (
			(GM_getValue("Ingame") == undefined) || 
			(GM_getValue("Forum") == undefined))) {
			if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der Entfernungen vorzunehmen")) {
				document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=sammler";
			}
			else {
				// Standardwerte als GM-Value speichern
				GM_setValue("Ingame", "an");
				GM_setValue("Forum", "an");
			}
		}
	}


	if(GM_getValue("Ingame") == "an") {
		// DSX-Link:
		document.getElementById("menu_row2").innerHTML += "<td style='border-left: 2px solid #dfcca6;'><a href='" + url_dsx + "' target='DSX' title='DSX - Die Stämme Extended'>DSX</a></td>";
	}
	
	
	// Weltliste auslesen:
	var gm_weltliste = GM_getValue("Welten");
	
	// Neue Liste erstellen:
	if(gm_weltliste == undefined) {
		gm_weltliste = welt;
	}
	
	// Bestehende Liste erweitern:
	else {
		var gm_welten = gm_weltliste.split(",");
		var gm_welt_saved = false;
		for(i=0; i<gm_welten.length; i++) {
			if(gm_welten[i] == welt) {
				gm_welt_saved = true;
			}
		}

		if(gm_welt_saved != true && welt != undefined) {
			gm_welten.push(welt);
		}
		gm_welten.sort();
		gm_weltliste = gm_welten.join(",");
	}
	// Welten als GM-Value speichern:
	GM_setValue("Welten", gm_weltliste);
	
	// Testinfo erweitern:
	testinfo += "Welten: " + gm_weltliste + "\n";
	testinfo += "\n";
	testinfo += "Welt: " + welt + "\n";
	testinfo += "Dorf-ID: " + dorf_id + "\n";

	
	if(url.match(/info_player/)) {
		var pl_id   = url.split("id=")[1];
		var pl_name = document.getElementsByTagName("h2")[0].innerHTML.split("Spieler ")[1];
				
		// Spieler-ID als GM-Value speichern:
		GM_setValue("Spieler-ID-W-" + welt, pl_id);
		
		// Testinfo erweitern:
		testinfo += "\n";
		testinfo += "Spieler-ID: " + pl_id + "\n";
		testinfo += "Spieler-Name: " + pl_name + "\n";
	}
	
	if(test) {
		alert(testinfo);
	}
}


// Nur eigene Welten auswählbar machen:
if(url.match(/weltdaten/)) {
	var welten = GM_getValue("Welten").split(",");
	for(var i=0; i<welten.length; i++) {
		// 
		var w_id = "welt_opt_" + welten[i];
		var style = document.getElementById(w_id).getAttribute("style").replace("none", "show");
		document.getElementById(w_id).setAttribute("style", style);
	}
}


/****************************************************/
/*													*/
/*	Forum allgemein:								*/
/*													*/
/****************************************************/
// Forum
if(url.match(/forum.die-staemme.de/)) {
	if(GM_getValue("Forum") == "an") {
		// Zelle mit Link zu DS-X erstellen:
		var ziel = '<td class="vbmenu_control" style="vertical-align:middle; overflow:hidden;"><a href="' + url_dsx + '" target="DS-X" title="DS-X | Die Stämme  Extended">DS-X</a></td>';
		
		// Tabelle festlegen:
		var tabelle = document.getElementsByTagName("table")[3].getElementsByTagName("tr")[0].innerHTML
		
		// Link zu DS-X einfügen:
		document.getElementsByTagName("table")[3].getElementsByTagName("tr")[0].innerHTML = tabelle + ziel;
	}
	
	// Daten auslesen:
	var player  = document.getElementsByClassName("smallfont")[0].getElementsByTagName("a")[0];
	var pl_name = player.innerHTML;
	var pl_link = player.href.split("?u=")[1];	
	
	// Werte als GM-Value speichern:
	GM_setValue("User-Name", pl_name);
	GM_setValue("User-ID", pl_link);
}





/****************************************************/
/*													*/
/*	Test ob UserScripts bereits gespeichert ist:	*/
/*													*/
/****************************************************/
// Nur innerhalb der Themenübersicht und den Suchergebnissen anwenden:
if((url.match(/forumdisplay/)) || (url.match(/searchid/))) {
	var tabelle = document.getElementById("threadslist");
	var zeilen = tabelle.getElementsByTagName("tr").length;
	
	for(var i=2; i<zeilen; i++) {
		var zeile = tabelle.getElementsByTagName("tr")[i];
		var zelle = zeile.getElementsByTagName("td")[2];
		var links = zelle.getElementsByTagName("a").length;
		var spans = zelle.getElementsByTagName("span").length-1;
		var autor = zelle.getElementsByTagName("span")[spans].innerHTML;
		
		var titel = zelle.getElementsByTagName("a")[0].innerHTML;
		if(titel.match(/\<img/)) {
			link_ID = zelle.getElementsByTagName("a")[1].href.split("t=")[1];
		}
		else {
			link_ID = zelle.getElementsByTagName("a")[0].href.split("t=")[1];
		}
		
		var scriptliste = GM_getValue("Scriptliste-" + autor);
		
		if((scriptliste != undefined) && (scriptliste.indexOf(link_ID) > -1)) {
			zelle.getElementsByTagName("span")[spans].innerHTML += " | <b style='color:#090;'>UserScript</b>";
		}
	}
}





/****************************************************/
/*													*/
/*	UserScripts auslesen und speichern:				*/
/*													*/
/****************************************************/
// Nur innerhalb eines Themas anwenden:
if(url.match(/showthread/)) {

	// Aktueller Beitrag:
	var post_akt = document.getElementById("posts").getElementsByClassName("page")[0];
	var divs = post_akt.getElementsByTagName("table")[1].getElementsByClassName("alt1").length;
	var smallfonts = post_akt.getElementsByClassName("smallfont").length-2;
	
	var post_text   = post_akt.getElementsByTagName("table")[1].getElementsByClassName("alt1")[0].getElementsByTagName("div")[0];
	
	// Nr. des aktuellen Posts ermitteln:
	var nr = post_akt.getElementsByClassName("alt1")[0].getElementsByClassName("smallfont")[0].getElementsByTagName("a")[1].getElementsByTagName("strong")[0].innerHTML;
	
	// Nur im ersten Post anwenden:
	if((nr == "1") && (post_text.innerHTML.indexOf("Hier findet ihr eine Liste der definitiv erlaubten Userscripte:") == -1)) {
		// Anzahl der enthaltenen Links ermitteln:
		var post_links = post_text.getElementsByTagName("a").length;
		
		// Noch nicht speichern:
		var speichern   = false;
		var gesetzt     = false;
		
		// Username & Profillink:
		var navbars     = document.getElementsByClassName("navbar").length-1;
		var navibar     = document.getElementsByClassName("navbar")[navbars];
		var user_name   = post_akt.getElementsByClassName("bigusername")[0].innerHTML;
		var user_link   = post_akt.getElementsByClassName("bigusername")[0].href.split("?u=")[1];

		// Variablen vordefinieren:
		var script_name = "";
		var script_url  = "";
		var script_src  = "";
		

		// UserScript-Source im Forum:
		if(post_text.innerHTML.indexOf("==UserScript==") != -1) {
			// Scriptname:
			script_name = navibar.getElementsByTagName("strong")[0].innerHTML.replace(/&amp;/g, "&").replace(/\n/g, "").replace(/\t /g, "").replace(/"/g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
			// Vorläufig aktuelle Seite für Sourcecode:
			script_src  = url.split("&")[0];
			// Speichern:
			speichern = true;
		}
		
		
		// Alle Links im Beitrag durchlaufen:
		for(var x=0; x<post_links; x++) {
			// Link-URL:
			var script_link = post_text.getElementsByTagName("a")[x].href;
			
			// UserScript-Link:
			if(((script_link.match(/.user.js/)) || 
				(script_link.match(/userscripts.org\/scripts\/show\//)) || 
				(script_link.match(/userscripts.org\/scripts\/source\//)) || 
				(script_link.match(/userscripts.org\/scripts\/review\//))) && 
				(!script_link.match(/#/)) && 
				(gesetzt == false)) {
				
				// Link als gesetzt markieren und speichern
				gesetzt     = true;
				speichern   = true;
				script_name = navibar.getElementsByTagName("strong")[0].innerHTML.replace(/&amp;/g, "&").replace(/\n/g, "").replace(/\t /g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
				
				// UserScript bei "userscripts.org" gehostet?
				if(script_link.match(/userscripts.org/)) {
					var script_id = script_link.split("/")[5].split(".")[0];
					script_url = "http://userscripts.org/scripts/source/" + script_id + ".user.js";
					script_src = "http://userscripts.org/scripts/show/" + script_id;
				}
				// Anderer Hoster:
				else {
					script_url = script_link;
				}
			} // if-ENDE
		} // for-ENDE	
		
		
		// GM-Value:
		// Autoren-Liste bereits gespeichert:
		if(GM_getValue("Scriptautoren") != undefined) {
			// Gespeicherte Autoren auslesen:
			var autoren = GM_getValue("Scriptautoren");
			
			// Aktuelle Autor noch nicht vorhanden:
			if(autoren.indexOf(user_name) == -1) {
				autoren += ";" + user_name + "|" + user_link;
			}
			else {
				var arr_autor = autoren.split(";");
				for(var a=0; a<arr_autor.length; a++) {
					if(arr_autor[a].indexOf(user_name) != -1) {
						arr_autor[a] = user_name + "|" + user_link;
					}
				}
				autoren = arr_autor.join(";");
			}
			// Liste in Array aufsplitten:
			autoren = autoren.split(";").sort(order);
		}
		// Autoren-Liste noch nicht gespeichert:
		else {
			// Neues Array erstellen:
			var user_info = user_name + "|" + user_link;
			var autoren = new Array(user_info);
		}
		
		
		// Testinfo erweitern:
		testinfo += "Autorenliste:\n";
		
		// Alle Autoren durchlaufen
		for(var a=0; a<autoren.length; a++) {
			// Testinfo erweitern:
			testinfo += autoren[a].split("|")[0] + "\n";
		}
		
		var script_block = script_name + "|" + url.split("?t=")[1].split("&")[0] + "|" + script_url + "|" + script_src;
		
		// Script-Liste (GM-Value) bereits gespeichert:
		if(GM_getValue("Scriptliste-" + user_name) != undefined) {
			// GM-Value auslesen und in Array zerlegen:
			var scriptliste = GM_getValue("Scriptliste-" + user_name);
			
			// Aktuelles Script noch nicht in Liste enthalten:
			if(scriptliste.indexOf(script_name) == -1) {
				scriptliste += ";" + script_block;
			}
			// Aktuelles Script bereits in Liste enthalten:
			else {
				var arr_s = scriptliste.split(";");
				for(var s=0; s<arr_s.length; s++) {
					if(arr_s[s].indexOf(script_name) > -1) {
						arr_s[s] = script_block;
					}							
				}
				scriptliste = arr_s.join(";");
			}
			
			// In Array aufsplitten:
			var array_scripts = scriptliste.split(";");
			// Array sortieren:
			array_scripts.sort(order);
			// Wieder in String umwandeln:
			scriptliste = array_scripts.join(";");
		}
		// Script-Liste noch nicht gespeichert:
		else {
			// Scriptliste erweitern
			var scriptliste = script_block;					
		}
		
		
		// Testinfo erweitern:
		testinfo += "\n";
		testinfo += "Alle UserScripts von " + user_name + " | " + user_link + ":\n";
		testinfo += scriptliste.replace(/;/g, "\n\n").replace(/\|/g, "\n\t");
		testinfo += "\n";
		
		
		// Autoren-Array in String umwandeln:
		autoren = autoren.join(";");
		
		if(speichern) {
			// GM-Value speichern:
			GM_setValue("Scriptautoren", autoren);
			GM_setValue("Scriptliste-" + user_name, scriptliste);
			
			td_info = document.createElement("td");
			td_info.setAttribute("class", "alt2");
			td_info.setAttribute("style", "width:100px; color:#C00;; font-weight:900; text-align:center; border:1px outset #804000; cursor:help;");
			td_info.setAttribute("title", "Das UserScript wurde in der Liste gespeichert");
			td_info.innerHTML = "UserScript";
			
			// Info einblenden:
			document.getElementsByClassName("alt2")[3].parentNode.appendChild(td_info);
			
			// Testinfo-Ausgabe:
			if(test) {
				alert(testinfo);
			}
		} // if-ENDE
		
	} // if-Ende
}





/****************************************************/
/*													*/
/*	Liste im internen Forum aktualisieren:			*/
/*													*/
/****************************************************/
// Beitrag
if(url.match(/screen=view_thread/)) {
	// UserScript-Liste:
	var titel = "UserScript-Liste:";
	var trenn = "___________________________________________________________________________\n";
	
	// Bearbeiten:
	if(url.match(/scriptlist=update/)) {
		// Script Start-Zeit:
		var date_start = new Date();
		var time_start = date_start.getTime();
		//
		var message_box = document.getElementById("message");
		var message_alt = message_box.innerHTML;
		// UserScript-Post:
		if(message_alt.indexOf(titel) > -1) {
			// Neuer Text:
			var message_neu = "";
			message_neu += "[size=15]" + titel + "[/size]\n";
			message_neu += "[color=gray]";
			message_neu += "Hier sind einige UserScripts, nach Autor getrennt und alphabetisch sortiert, aufgelistet.\n";
			message_neu += "\n";
			message_neu += "[b]Es werden nur UserScripts aufgelistet die:[/b]\n";
			message_neu += "1. im ";
			message_neu += "[url=http://forum.die-staemme.de/index.php]Forum[/url] ";
			message_neu += "vorgestellt wurden und\n";
			message_neu += "2. im 1. Beitrag ([b]#1[/b]) entweder den [b]Quelltext[/b] oder einen [b]Installationslink[/b] (*.user.js) enthalten";
			message_neu += "[/color]\n";
			
			// Autorenliste vorhanden:
			if(GM_getValue("Scriptautoren") != undefined) {
				// Autorenliste in Array aufsplitten:
				var array_autoren = GM_getValue("Scriptautoren").split(";");
				
				// Alle gespeicherten Autoren durchlaufen:
				for(var a=0; a<array_autoren.length; a++) {
					var autor_info  = array_autoren[a];
					var autor_name  = autor_info.split("|")[0];
					var autor_link  = autor_info.split("|")[1];
					
					var script_list = GM_getValue("Scriptliste-" + autor_name);
					var scripts     = script_list.split(";").sort(order);
					
					// Message-Text erweitern:
					message_neu += trenn;
					message_neu += "\n";
					message_neu += "[url=http://forum.die-staemme.de/member.php?u=" + autor_link + "]" + autor_name + "[/url] ";
					message_neu += "\n";
					message_neu += "[b]" + (scripts.length) + "[/b] - ";
					if(scripts.length > 1) {
						message_neu += "[color=gray]UserScripts[/color] ";
					}
					else {
						message_neu += "[color=gray]UserScript[/color] ";
					}
					message_neu += "\n";
					message_neu += "\n";
					
					// Alle gespeicherten UserScripts durchlaufen: 
					for(var s=0; s<scripts.length; s++) {
						var script_info = scripts[s].split("|");
						var script_name = script_info[0];
						var forum_link  = script_info[1];
						var script_link = script_info[2];
						var script_src  = script_info[3];
						
						// Message-Text erweitern:
						message_neu += "[url=http://forum.die-staemme.de/showthread.php?t=" + forum_link + "]" + script_name.replace(/[\W]?([\(|\[]){1}[^PA][\w\W]{0,20}[sS]?[ck]?(ript)?([\)|\]]){1}[\W]?/, "") + "[/url]";
						message_neu += "\n";
					}
				} // for-ENDE

				var date_stop = new Date();
				var time_stop = date_stop.getTime();
				
				// Message-Text erweitern:
				message_neu += trenn;
				message_neu += "\n";
				message_neu += "[size=1]";
				message_neu += "[color=gray]";
				//message_neu += "Liste generiert in [b]" + (time_stop-time_start) + "[/b]ms. mit:\n";
				//message_neu += vers_ist.replace("DS - UserScript-Sammler", "[url=http://forum.die-staemme.de/showthread.php?p=1633296#post1633296]DS - UserScript-Sammler[/url]");
				message_neu += "Liste generiert in [b]" + ((time_stop-time_start)/1000).toFixed(3) + "[/b]sec. mit:\n";
				message_neu += vers_ist.replace("DS - UserScript-Sammler", "[b]DS - UserScript-Sammler[/b]");
				message_neu += "";
				message_neu += "[/color]";
				message_neu += "[/size]";
			} // if-ENDE
		} // else if-ENDE
			
		// Inhalt aktualisieren:
		message_box.innerHTML = message_neu;
		
		// Automatisch aktualisieren:
		// Formular absenden:
		document.getElementsByTagName("form")[0].submit();
	}
	// Posts:
	else {
		// Anzahl der Posts ermitteln:
		var posts = document.getElementsByClassName("text").length;
		
		// Alle Posts durchlaufen:
		for(var i=0; i<posts; i++) {
			// Post-Autor:
			var user  = document.getElementsByClassName("igmline")[i].getElementsByTagName("a")[0].innerHTML;
			// Linkleiste:
			var right  = document.getElementsByClassName("right")[i];
			// Aktualisierungslink:
			var update = right.getElementsByTagName("a")[1].href + "&scriptlist=update";
			// Aktueller Text:
			var text  = document.getElementsByClassName("text")[i].innerHTML;
			
			// Eigener Karten-Post
			if((text.indexOf(titel) > -1) && (user == " "+GM_getValue("User-Name"))) {
				// Aktualisierungslink einfügen:
				right.innerHTML = "<a href='" + update + "'>Aktualisieren</a> | " + right.innerHTML;
			}
		}
	}
}





/****************************************************/
/*													*/
/*	Gespeicherte UserScripts in DB einfügen:		*/
/*													*/
/****************************************************/
// DS-X
if((url.match(/DS-X/)) || (url.match(/ds-x/))) {
	// Login-Seite:
	if(GM_getValue("User-Name") != undefined) {
		// Cookies setzen:
		document.cookie = "Benutzer=" + GM_getValue("User-Name") + ";";
		document.cookie = "ID=" + GM_getValue("User-ID") + ";";
		// Login-Link anzeigen:
		document.getElementById("anmeldung").setAttribute("style", "display:show");
		document.getElementById("Updatelink").setAttribute("style", "display:show");
	}
	
	
	
	// Scriptliste:
	if(url.match(/scripts_update.php/)) {
		if(document.getElementById("GM_Update") != undefined) {
			// Update-Container:
			var gm_update = document.getElementById("GM_Update");
			
			// Autoren:
			var liste_a = gm_update.getElementsByClassName("liste_a")[0];
			var autoren = liste_a.innerHTML;
			var autor   = autoren.split(";");
			
			// Autorenliste als GM-Value speichern: 
			GM_setValue("Scriptautoren", autoren);
			
			// Testinfo erweitern:
			testinfo += liste_a + "\n";
			testinfo += "\n";
				
			// Alle Autoren durchlaufen
			for(var i=0; i<autor.length; i++) {
				// Name des Autors
				var name = autor[i].split("|")[0];
				var liste_s = gm_update.getElementsByClassName("liste_s")[i].innerHTML.replace(/&amp;/g, "&").replace(/\n/g, "").replace(/\t /g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
				
				// Testinfo erweitern:
				testinfo += name + "\n";
				testinfo += liste_s + "\n";
				testinfo += "\n";
								
				// Scriptliste des Autors als GM-Value speichern: 
				GM_setValue("Scriptliste-" + name, liste_s);
			}
			
			// Testinfo ausgeben:
			if(test) {
				alert(testinfo);
			}
			
			
			
		}
		else if(GM_getValue("Scriptautoren") != undefined) {
			var x = 0;
			var typ = "hidden";
			var autoren = GM_getValue("Scriptautoren").split(";");
			
			// Alle als GM-Value gespeicherten Autoren durchgehen:
			for(var a=0; a<autoren.length; a++) {
				// Formular:
				var inputform = document.getElementById("inputform");
				var autor = autoren[a].split("|");
				
				
				// Autor-Name:
				var autor_name = document.createElement("input");
				autor_name.setAttribute("type", typ);
				autor_name.setAttribute("name", "Autor_Name_" + a);
				autor_name.setAttribute("value", autor[0]);
				
				// Autor-Profillink:
				var autor_link = document.createElement("input");
				autor_link.setAttribute("type", typ);
				autor_link.setAttribute("name", "Autor_Link_" + a);
				autor_link.setAttribute("value", autor[1]);
				
				// Elemente in Formular einfügen:
				inputform.appendChild(autor_name);
				inputform.appendChild(autor_link);
				
				// 
				var scripts = GM_getValue("Scriptliste-" + autor[0]).split(";");
				
				// 
				for(var s=0; s<scripts.length; s++) {
					var script = scripts[s].split("|");
					
					// Forum-Titel:
					var forum_titel = document.createElement("input");
					forum_titel.setAttribute("type", typ);
					forum_titel.setAttribute("name", "Forum_Titel_" + x);
					forum_titel.setAttribute("value", script[0]);
					
					// Script-Name:
					var script_name = document.createElement("input");
					script_name.setAttribute("type", typ);
					script_name.setAttribute("name", "Script_Name_" + x);
					script_name.setAttribute("value", script[0]);
					
					// Script-Autor:
					var script_autor = document.createElement("input");
					script_autor.setAttribute("type", typ);
					script_autor.setAttribute("name", "Script_Autor_" + x);
					script_autor.setAttribute("value", autor[1]);
					
					// Forum-Link:
					var forum_link = document.createElement("input");
					forum_link.setAttribute("type", typ);
					forum_link.setAttribute("name", "Forum_Link_" + x);
					forum_link.setAttribute("value", script[1]);
					
					// Script-Link:
					var script_link = document.createElement("input");
					script_link.setAttribute("type", typ);
					script_link.setAttribute("name", "Script_Link_" + x);
					script_link.setAttribute("value", script[2]);
					
					// Script-Src:
					var script_src = document.createElement("input");
					script_src.setAttribute("type", typ);
					script_src.setAttribute("name", "Script_Src_" + x);
					script_src.setAttribute("value", script[3]);
				
					// Elemente in Formular einfügen:
					inputform.appendChild(forum_titel);
					inputform.appendChild(forum_link);
					inputform.appendChild(script_name);
					inputform.appendChild(script_autor);
					inputform.appendChild(script_link);
					inputform.appendChild(script_src);
					x++;
				}
			}
			// Anzahl der Autoren:
			var input_autor_nr = document.createElement("input");
			input_autor_nr.setAttribute("type", typ);
			input_autor_nr.setAttribute("name", "Autor_Nr");
			input_autor_nr.setAttribute("value", a);
			
			// Anzahl der Scripts:
			var input_script_nr = document.createElement("input");
			input_script_nr.setAttribute("type", typ);
			input_script_nr.setAttribute("name", "Script_Nr");
			input_script_nr.setAttribute("value", x);
			
			// Submit-Button:
			var input_submit = document.createElement("input");
			input_submit.setAttribute("type", "submit");
			input_submit.setAttribute("name", "Update");
			input_submit.setAttribute("class", "knopf login");
			input_submit.setAttribute("style", "-moz-border-radius-bottomleft:8px;");
			input_submit.setAttribute("value", "UserScript-DB aktualisieren");
			
			// Elemente in das Formular einfügen:
			inputform.appendChild(input_autor_nr);
			inputform.appendChild(input_script_nr);
			inputform.appendChild(input_submit);
			inputform.setAttribute("style", "display:show;");
		}
	}
}