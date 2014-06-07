// ==UserScript==
// @name           SZS Komfort Patch
// @namespace      Namespace
// @version        2.1.2
// @include        http://szs.looki.de/*
// @exclude        http://szs.looki.de/szsb.html*
// @exclude        http://szs.looki.de/szss.html*
// @resource       GMwavaudio http://freewavesamples.com/files/90%27s-Office-Phone.wav
// @updateURL      http://userscripts.org/scripts/source/129346.meta.js
// @downloadURL    http://userscripts.org/scripts/source/129346.user.js
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_getResourceURL
// ==/UserScript==


function doService () {

	// Alert-Sound
	var au = document.createElement('audio');
	au.src = GM_getResourceURL("GMwavaudio");
	au.setAttribute('id', 'GMwavaudio');
	document.body.appendChild(au);

	// Aktuelle URL
	var aktuelleUrl = document.URL;
	var premium = false;

	// Login-Focus
	if(aktuelleUrl.indexOf('login.php')!=-1){
		document.getElementsByName('code')[0].focus();
	} else if(document.getElementsByTagName('body')[0].innerHTML.indexOf('Persönliches')!=-1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('Logbuch')!=-1){

		// Konfiguration
		// Aktive Spieler -> Eigenen Usernamen ermitteln
		if(aktuelleUrl.indexOf('aktivespieler.php')!=-1){
			var tdNrUserName = 25;
			var anzahlTdTags = document.getElementsByTagName('td').length-1;
			while(tdNrUserName < anzahlTdTags && document.getElementsByTagName('td')[tdNrUserName].innerHTML.indexOf('<font color="red">')==-1){
				tdNrUserName++;
			}
			if(document.getElementsByTagName('td')[tdNrUserName].innerHTML.indexOf('<font color="red">')!=-1){
				var eigenerUserName = document.getElementsByTagName('td')[tdNrUserName].innerHTML.replace(/[\S\s]*<font color="red">/,'').replace(/<\/font>[\S\s]*/,'');
				GM_setValue("KP_UserName", eigenerUserName);
			}
			// Uhrzeit anpassen
			var resetTime = 5;
			if(isSommerzeit(new Date())){
				resetTime = 6;
			}
			document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace('4:15', resetTime + ':15');
		}

		// Aktive Stämme -> Eigenen Stamm ermitteln
		if(aktuelleUrl.indexOf('aktivpunkte.php')!=-1){
			var tdNrStammName = 25;
			var anzahlTdTags = document.getElementsByTagName('td').length-1;
			while(tdNrStammName < anzahlTdTags && document.getElementsByTagName('td')[tdNrStammName].innerHTML.indexOf('<font color="red">')==-1 && document.getElementsByTagName('td')[tdNrStammName].innerHTML.indexOf('<a href="stamminfo.php?stammid=')==-1){
				tdNrStammName++;
			}
			if(document.getElementsByTagName('td')[tdNrStammName].innerHTML.indexOf('<font color="red">')!=-1 && document.getElementsByTagName('td')[tdNrStammName].innerHTML.indexOf('<a href="stamminfo.php?stammid=')!=-1){
				var eigenerStammName = document.getElementsByTagName('td')[tdNrStammName].innerHTML.replace(/[\S\s]*<font color="red">/,'').replace(/<\/font>[\S\s]*/,'');
				GM_setValue("KP_StammName", eigenerStammName);
			}
			// Uhrzeit anpassen
			var resetTime = 5;
			if(isSommerzeit(new Date())){
				resetTime = 6;
			}
			document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace('4:15', resetTime + ':15');
		}

		var layerCss = document.createElement("style");
		layerCss.setAttribute("type", "text/css");
		layerCss.innerHTML = '#Layer1 {position: absolute; left: -570px; top: 135px; min-height: 1000px; width: 567px; border: 0px; background-color: #215C28;}';
		document.getElementsByTagName('head')[0].appendChild(layerCss);

		var layerPos = document.body.offsetWidth / 2 - 286;
		var layerScript = document.createElement("script");
		layerScript.setAttribute("type", "text/javascript");
		layerScript.innerHTML = 'function moveIn(){ document.getElementById(\'Layer1\').style.left=' + layerPos + '; } function moveOut(){ document.getElementById(\'Layer1\').style.left=-570; }';
		document.getElementsByTagName('head')[0].appendChild(layerScript);

		var layerHtml = document.createElement("div");
		layerHtml.setAttribute("id", "Layer1");
		var layerHtmlCode = '<form id="layerForm" action="javascript:moveOut()" method="post"><center><h1>SZS Komfort Patch Konfiguration</h1><table width="90%" style="border-width: 0px;"><tr><td><b>Allgemeine Daten:</b></td></tr><tr><td width="50%">Username: </td><td width="50%"><input name="KP_UserName" value="' + GM_getValue("KP_UserName", "NoName") + '"></td></tr><tr><td>Stamm: </td><td><input name="KP_StammName" value="' + GM_getValue("KP_StammName", "") + '"></td></tr><tr><td>Talkampf-Hinweis (während TK):</td><td><input type="checkbox" name="KP_TKHinweis"';
		if(GM_getValue("KP_TKHinweis", false) == true){
			layerHtmlCode += ' checked';
		}
		layerHtmlCode += '></td></tr><tr><td>Stammkampf-Hinweis (Std vor Start): </td><td><input name="KP_SKHinweis" value="' + GM_getValue("KP_SKHinweis", "24") + '"></td></tr><tr><td>Magierkampf-Hinweis (Std vor Start): </td><td><input name="KP_MKHinweis" value="' + GM_getValue("KP_MKHinweis", "12") + '"></td></tr><tr><td>Reminder aktivieren:</td><td><input type="checkbox" name="KP_Reminder"';
		if(GM_getValue("KP_Reminder", false) == true){
			layerHtmlCode += ' checked';
		}
		layerHtmlCode += '></td></tr><tr><td>&nbsp;</td></tr><tr><td colspan="2"><b>In welchem Verhältnis sollen die Charakterpunkte verteilt werden?</b></td></tr><tr><td width="50%">Kraft: </td><td width="50%"><input name="KP_KraftPunkte" value="' + GM_getValue("KP_KraftPunkte", "1") + '"></td></tr><tr><td>Intelligenz: </td><td><input name="KP_IntelligenzPunkte" value="' + GM_getValue("KP_IntelligenzPunkte", "1") + '"></td></tr><tr><td>Geschwindigkeit: </td><td><input name="KP_GeschwindigkeitPunkte" value="' + GM_getValue("KP_GeschwindigkeitPunkte", "1") + '"></td></tr><tr><td>List: </td><td><input name="KP_ListPunkte" value="' + GM_getValue("KP_ListPunkte", "1") + '"></td></tr><tr><td>Ausdauer: </td><td><input name="KP_AusdauerPunkte" value="' + GM_getValue("KP_AusdauerPunkte", "1") + '"></td></tr><tr><td>Geschick: </td><td><input name="KP_GeschickPunkte" value="' + GM_getValue("KP_GeschickPunkte", "1") + '"></td></tr><tr><td>&nbsp;</td></tr><tr><td colspan="2"><b>Wie viele Ressis sollen NICHT gesichert werden?</b></td></tr><tr><td width="50%">Nahrung: </td><td width="50%"><input name="KP_NahrungRest" value="' + GM_getValue("KP_NahrungRest", "10") + '"></td></tr><tr><td>Gold: </td><td><input name="KP_GoldRest" value="' + GM_getValue("KP_GoldRest", "0") + '"></td></tr><tr><td>Holz: </td><td><input name="KP_HolzRest" value="' + GM_getValue("KP_HolzRest", "0") + '"></td></tr><tr><td>Stein: </td><td><input name="KP_SteinRest" value="' + GM_getValue("KP_SteinRest", "0") + '"></td></tr><tr><td>&nbsp;</td></tr><tr><td colspan="2"><b>Auf was soll beim Sichern abgerundet werden?</b></td></tr><tr><td width="50%">Nahrung: </td><td width="50%"><input name="KP_NahrungRund" value="' + GM_getValue("KP_NahrungRund", "100") + '"></td></tr><tr><td>Gold: </td><td><input name="KP_GoldRund" value="' + GM_getValue("KP_GoldRund", "100") + '"></td></tr><tr><td>&nbsp;</td></tr><tr><td colspan="2"><b>Zu welchem Preis sollen die Ressis auf den Markt gestellt werden?</b></td></tr><tr><td width="50%">Holz: </td><td><input name="KP_HolzPreis" value="' + GM_getValue("KP_HolzPreis", "100") + '"></td></tr><tr><td width="50%">Stein: </td><td><input name="KP_SteinPreis" value="' + GM_getValue("KP_SteinPreis", "100") + '"></td></tr></table><br><input type="submit" value="Daten speichern"></center></form>';
		layerHtml.innerHTML = layerHtmlCode;
		document.getElementsByTagName('body')[0].appendChild(layerHtml);

		var layerForm = document.getElementById('layerForm');
		layerForm.addEventListener('submit', saveConfig, true);


		// Oben
		if(document.getElementsByTagName('center')[0].innerHTML.indexOf('nur durch Werbung bleibt SteinZeitSpiel.de kostenfrei')!=-1){
			document.getElementsByTagName('center')[0].innerHTML = '<br>';
		} else {
			premium = true;
		}


		// Linkes Menü
		var tdNrLinkesMenue = 2;
		while(document.getElementsByTagName('td')[tdNrLinkesMenue].innerHTML.indexOf('<!-- linkes menu ANFANG -->')==-1){
			tdNrLinkesMenue++;
		}
		var lagerfeuerColor = 'red';
		if(document.getElementsByTagName('td')[tdNrLinkesMenue].innerHTML.indexOf('color:lime')!=-1){
			lagerfeuerColor = 'lime';
		}
		var linkesMenueHtml = document.getElementsByTagName('td')[tdNrLinkesMenue].innerHTML;
		var neuesMenue = document.createElement("td");
		neuesMenue.setAttribute("background", "/static/bgs.png");
		neuesMenue.setAttribute("valign", "top");
		neuesMenue.setAttribute("width", "97");
		var neuesMenueHtml = '<br>';
		if(premium){
			neuesMenueHtml += '<center><span id="ServerzeitSpan"></span></center>';
		}
		// Persönliches
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Persönliches</td></tr><tr><td><a href="news.php" class="menu">Logbuch</a><br><a class="menu" href="message.php">Nachrichten</a><br><a href="charakter.php" class="menu">Charakter</a><br><a class="menu" href="inventar.php">Inventar</a><br><a class="menu" href="artefakt.php">Artefakte</a><br><a class="menu" href="beruf.php">Beruf</a><br><a class="menu" href="karte.php">Karte</a><br><a class="menu" href="deinland.php">Land</a><br><a class="menu" href="profil.php">Profil</a><br><a class="menu" href="gbuch.php">Gästebuch</a><br>';
		if(premium){
			neuesMenueHtml += '<a class="menu" href="notizbuch.php">Notizbuch</a><br>';
		}
		neuesMenueHtml += '<a class="menu" href="javascript:moveOut();moveIn2();">Statistiken</a><br>';
		neuesMenueHtml += '<a class="menu" href="javascript:moveOut2();moveIn();">Komfort Patch</a><br></td></tr></tbody></table><br>';
		// Aktionen
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Aktionen</td></tr><tr><td>';
		if(linkesMenueHtml.indexOf('Köhlern')!=-1){
			neuesMenueHtml += '<a class="menu" href="holzfaeller.php">Holz fällen</a><br><a class="menu" href="koehlern.php">Köhlern</a><br><a class="menu" href="jagd.php">Jagen</a><br><a class="menu" href="wasser2.php">Wasser suchen</a><br>';
		} else if(linkesMenueHtml.indexOf('Kupfer')!=-1){
			neuesMenueHtml += '<a class="menu" href="steinmetz.php">Steine metzen</a><br><a class="menu" href="kupferding.php">Kupfer abbauen</a><br><a class="menu" href="jagd.php">Jagen</a><br><a class="menu" href="wasser2.php">Wasser suchen</a><br>';
		} else if(linkesMenueHtml.indexOf('Bronze')!=-1){
			neuesMenueHtml += '<a class="menu" href="wasser.php">Wasser suchen</a><br><a class="menu" href="bronze.php"><nobr>Bronze herstellen</nobr></a><br><a class="menu" href="jagd.php">Jagen</a><br>';
		} else if(linkesMenueHtml.indexOf('Zinn')!=-1){
			neuesMenueHtml += '<a class="menu" href="schamane.php">Trank brauen</a><br><a class="menu" href="zinnding.php">Zinn abbauen</a><br><!--<a class="menu" href="schamane.spenden.php">Opfergaben</a><br>--><a class="menu" href="jagd.php">Jagen</a><br><a class="menu" href="wasser2.php">Wasser suchen</a><br>';
		} else if(linkesMenueHtml.indexOf('Werkzeugbau')!=-1){
			neuesMenueHtml += '<a class="menu" href="waffenschmied.php">Waffe bauen</a><br><a class="menu" href="werkzeug.php">Werkzeug bauen</a><br><a class="menu" href="jagd.php">Jagen</a><br><a class="menu" href="wasser2.php">Wasser suchen</a><br>';
		} else {
			neuesMenueHtml += '<a class="menu" href="jagd.php">Jagen</a><br><a class="menu" href="wasser2.php">Wasser suchen</a><br>';
		}
		neuesMenueHtml += '<a class="menu" href="wandern.php">Wandern</a><br><a class="menu" href="schlafen.php">Schlafen</a><br><a class="menu" href="magier.php">Weiser Magier</a><br></td></tr></tbody></table><br>';
		// Kämpfe
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Kämpfe</td></tr><tr><td><a class="menu" href="kampf.php">Einzelkampf</a><br><a class="menu" href="grtal.php">Talkampf</a><br>';
		if(linkesMenueHtml.indexOf('stammjoinen')==-1){
			neuesMenueHtml += '<a class="menu" href="stamm.php?do=kampfuserauswahl">Stammkampf</a><br><a class="menu" href="stamm.magierkampf.php">Magierkampf</a><br>';
		}
		neuesMenueHtml += '</td></tr></tbody></table><br>';
		// Handel
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Handel</td></tr><tr><td><a class="menu" href="markt.php?do=rohstoffe&rohausw=1">Markt</a><br><a class="menu" href="http://www.looki.de/forum/tauschforum_f111/" target="_blank">Tauschforum</a><br><a class="menu" href="nahrung.php">Händler</a><br><a class="menu" href="waffenshop.php">Waffenhöhle</a><br><a class="menu" href="uebertragen.php">Übertragen</a><br></td></tr></tbody></table><br>';
		// Stamm
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Stamm</td></tr>';
		if(linkesMenueHtml.indexOf('stammjoinen')==-1){
			neuesMenueHtml += '<tr><td><a class="menu" href="stamm.php?do=uebersicht">Übersicht</a><br><a class="menu" href="stamm.php?do=nachricht">Nachrichten</a><br><a class="menu" href="stammforum.forum.php">StammForum</a><br><a class="menu" href="stamm.php?do=lager">Lager</a><br><a class="menu" href="stamm.php?do=waffenlager">Waffenlager</a><br><a class="menu" href="stamm.php?do=tranklager">Tranklager</a><br><a class="menu" href="stamm.php?do=werkzeuglager">Werkzeuglager</a><br><a class="menu" href="altar.php">Altar</a><br><a class="menu" href="weltwunder.php">Weltwunder</a><br><a class="menu" href="stamm.php?do=austreten">Austreten</a><br><a class="menu" style="color:'.concat(lagerfeuerColor).concat(';" href="stamm.php?do=lagerfeuer">Lagerfeuer</a><br></td></tr>');
		} else if(linkesMenueHtml.indexOf('Kochen')==-1){
			neuesMenueHtml += '<tr><td><a class="menu" href="hausbau.php">Haus bauen</a><br><a class="menu" href="stammjoinen.php">Stamm joinen</a><br></td></tr>';
		} else {
			neuesMenueHtml += '<tr><td><a class="menu" href="stammgruenden.php">Stamm gründen</a><br><a class="menu" href="stammjoinen.php">Stamm joinen</a><br></td></tr>';
		}
		neuesMenueHtml += '</tbody></table><br>';
		// Hilfe
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Hilfe</td></tr><tr><td><a class="menu" href="einsteiger.php">Einsteiger</a><br><a class="menu" href="http://www.looki.de/forum/der_rat_der_weisen_fragen_zum_steinzeitspiel_f108/das_1x1_der_steinzeit_230325.html" target="_blank">Das SZS 1x1</a><br><a class="menu" href="faq-sys.php">FAQ</a><br><a class="menu" href="regeln.php">Regeln</a><br></td></tr></tbody></table><br>';
		// Allgemeines
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Allgemeines</td></tr><tr><td><a class="menu" href="http://www.looki.de/forum/das_steinzeitspiel_f89/" target="_blank">Forum</a><br><a class="menu" href="userinfo.php">UserSuche</a><br><a class="menu" href="stamminfo.php">StammSuche</a><br><a class="menu" href="useronline.php">Online User</a><br><a class="menu" href="statistik.php">Statistiken</a><br><a class="menu" href="ipliste.php">IP-Liste</a><br><a class="menu" href="http://www.looki.de/forum/lagerdiebstahl_handelsbetrug_f129/liste_aller_lagerdiebe_und_handelsbetrueger_93131.html" target="_blank">Diebesliste</a><br><a class="menu" href="bug.php">Bug melden</a><br><a class="menu" href="cheater.php">Cheater melden</a><br><a class="menu" href="impressum.php">Impressum</a><br><a class="menu" href="logout.php">Logout</a><br></td></tr></tbody></table><br>';
		// Toplisten
		neuesMenueHtml += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td background="/static/menu.png"><img src="/static/menu2.png" alt="" align="absmiddle" height="30" width="1">Toplisten</td></tr><tr><td><a class="menu" href="top.php">UserTop</a><br><a class="menu" href="viptop.php">VIPTop</a><br><a class="menu" href="stammtop.php">StammTop</a><br><a class="menu" href="aktivespieler.php">Aktive Spieler</a><br><a class="menu" href="aktivpunkte.php">Aktive Stämme</a><br></td></tr></tbody></table><br>';
		neuesMenue.innerHTML = neuesMenueHtml;
		document.getElementsByTagName('tr')[2].replaceChild(neuesMenue, document.getElementsByTagName('td')[tdNrLinkesMenue]);


		// Rechtes Menü
		var tdNrRechtesMenue = tdNrLinkesMenue+1;
		while(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.indexOf('<!-- rechtes menu ANFANG -->')==-1){
			tdNrRechtesMenue++;
		}
		var rechtesMenueHtml = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML;
		rechtesMenueHtml = rechtesMenueHtml.replace(/(<tr>\s*<td colspan="2"><font color="red">Du hast noch Punkte übrig, die du verteilen kannst.<br><br>\s*<center>\s*<a href="charakter.php">\s*<small>\[Punkte verteilen\]<\/small><\/a><\/center><\/font><\/td>\s*<\/tr>\s*)*<tr>\s*<td colspan="2"><br>\s*Dein Alter:<br>\s*\d+ Jahre<br>\s*\d+ Monate<br>\s*<\/td>\s*<\/tr>\s*<\/tbody><\/table>\s*<br>/g,'</tbody></table>');
		rechtesMenueHtml = rechtesMenueHtml.replace(/(<tr>\s*<td colspan="2"><font color="red">Du hast noch Punkte übrig, die du verteilen kannst.<br><br>\s*<center>\s*<a href="charakter.php">\s*<small>\[Punkte verteilen\]<\/small><\/a><\/center><\/font><\/td>\s*<\/tr>\s*)*<tr>\s*<td colspan="2"><font color="red"><br><br>Du hast eine neue private Nachricht erhalten.<\/font><\/td>\s*<\/tr>\s*<\/tbody><\/table>/g,'<tr><td colspan="2" align="center"><font color="yellow">Neue Nachricht erhalten<br><br></font></td></tr></tbody></table>');
		rechtesMenueHtml = rechtesMenueHtml.replace('UserDaten</td>','<a href="charakter.php" class="menu">UserDaten</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace('Opfer</td>','<a href="altar.php" class="menu">Opfer</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace(/<!-- Opferzeit menu -->\s*<br>\s*<!-- Beispiel menu -->/g,'<!-- Opferzeit menu -->');
		rechtesMenueHtml = rechtesMenueHtml.replace('Freundesliste</td>','<a href="friendlist.php" class="menu">Freundesliste</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace('<br><center><a href="friendlist.php">[Bearbeiten]</a></center><br>','');
		rechtesMenueHtml = rechtesMenueHtml.replace(/Gamenews<\/td>/g,'<a target="_blank" href="http://www.looki.de/info/steinzeitspiel/news_archiv.html" class="menu">Gamenews</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace('Ã¤','ä');
		rechtesMenueHtml = rechtesMenueHtml.replace('UserGruppe</td>','<a href="geworbene.php" class="menu">UserGruppe</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace(/<br>\s*<\/td>\s*<\/tr>\s*<\/tbody><\/table>\s*<!-- wetter Menü-->/g,'<br><br></td></tr></tbody></table><!-- wetter Menü-->');
		rechtesMenueHtml = rechtesMenueHtml.replace('Wetter</td>','<a href="wetter.php" class="menu">Wetter</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace('Support</td>','<a target="_blank" href="http://www.looki.de/forum/das_steinzeitspiel_f89/" class="menu">Support</a></td>');
		rechtesMenueHtml = rechtesMenueHtml.replace('Support System</a>.','Support System</a>.<br><br>');
		rechtesMenueHtml = rechtesMenueHtml.replace('Vote</td>','<a target="_blank" href="http://www.galaxy-news.de/?page=charts&op=vote&game_id=97" class="menu">Vote</a></td>');
		document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = rechtesMenueHtml;


		// Müdigkeits-Update
		var muedigkeit = parseInt(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/[\S\s]*<font color="\w+">(\d+)<\/font>%<\/td>[\S\s]*/,'$1'));
		document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/<font color="(\w+)">(\d+)<\/font>%<\/td>/,'<font id="muede1" color="$1">$2 %</font></td>');


		// Rechtes Menü -> Wetter über Freundesliste anzeigen
		var tableNrWetter = 10;
		var tableNrFreunde = 10;
		var tableNrUserDaten = 10;
		while(document.getElementsByTagName('table')[tableNrWetter].innerHTML.indexOf('<!-- Titel des wetter Menü -->')==-1){
			if(document.getElementsByTagName('table')[tableNrWetter].innerHTML.indexOf('Freundesliste')!=-1){
				tableNrFreunde = tableNrWetter;
			}
			if(document.getElementsByTagName('table')[tableNrWetter].innerHTML.indexOf('<!-- Überschrift des Menüs "UserDaten" -->')!=-1){
				tableNrUserDaten = tableNrWetter;
			}
			tableNrWetter++;
		}
		document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/<a href="wetter.php"> <br>Wetter: [\wö]+<\/a>/g,'<br>');
		document.getElementsByTagName('td')[tdNrRechtesMenue].insertBefore(document.getElementsByTagName('table')[tableNrWetter], document.getElementsByTagName('table')[tableNrFreunde]);


		// Opferzeit ermitteln
		var waffenopferDate;
		var arbeitsopferDate;
		var ringopferDate;
		if(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.indexOf('opfer')!=-1){
			if(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.indexOf('Waffenopfer:')!=-1){
				var opferEnde = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/[\S\s]*Waffenopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
				var jahr = parseInt(opferEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
				var monat = parseInt(opferEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
				var tag = parseInt(opferEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
				var stunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
				var minuten = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
				var sekunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
				waffenopferDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
				document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/Waffenopfer:<\/td><\/tr><tr><td align="right"><span/,'Waffenopfer:</td></tr><tr><td align="right"><span id="WaffenopferSpan"');
			}
			if(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.indexOf('Arbeitsopfer:')!=-1){
				opferEnde = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/[\S\s]*Arbeitsopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
				jahr = parseInt(opferEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
				monat = parseInt(opferEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
				tag = parseInt(opferEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
				stunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
				minuten = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
				sekunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
				arbeitsopferDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
				document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/Arbeitsopfer:<\/td><\/tr><tr><td align="right"><span/,'Arbeitsopfer:</td></tr><tr><td align="right"><span id="ArbeitsopferSpan"');
			}
			if(document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.indexOf('Ringopfer:')!=-1){
				opferEnde = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/[\S\s]*Ringopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
				jahr = parseInt(opferEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
				monat = parseInt(opferEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
				tag = parseInt(opferEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
				stunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
				minuten = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
				sekunden = parseInt(opferEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
				ringopferDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
				document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML.replace(/Ringopfer:<\/td><\/tr><tr><td align="right"><span/,'Ringopfer:</td></tr><tr><td align="right"><span id="RingopferSpan"');
			}
		}


		// Artefakte
		if(aktuelleUrl.indexOf('artefakt.php')!=-1){
			var td22 = document.getElementsByTagName('td')[22];
			if(td22.innerHTML.indexOf('Deine Knochen werden nun auf dem Altar angeboten und warten darauf weiterverarbeitet zu werden.')!=-1){
				td22.innerHTML = td22.innerHTML.replace('warten darauf weiterverarbeitet zu werden.<br><br>', 'warten darauf weiterverarbeitet zu werden.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(td22.innerHTML.indexOf('Tage die Funktionen nutzen.')!=-1){
				var textOf22 = td22.innerHTML;
				var tage = parseInt(textOf22.replace(/[\S\s]*Du kannst jetzt /g, '').replace(/ Tage die Funktionen nutzen[\S\s]*/g, ''));
				var artefaktDate = new Date();
				artefaktDate.setDate(artefaktDate.getDate()+tage);
				if(textOf22.indexOf('Drachenblut')!=-1){
					GM_setValue("DrachenblutTime", artefaktDate.getTime().toString());
				} else if(textOf22.indexOf('Glück')!=-1){
					GM_setValue("GlueckTime", artefaktDate.getTime().toString());
				} else if(textOf22.indexOf('Meisterschmied')!=-1){
					GM_setValue("MeisterschmiedTime", artefaktDate.getTime().toString());
				}
				td22.innerHTML = textOf22.replace('Tage die Funktionen nutzen.', 'Tage die Funktionen nutzen.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(td22.innerHTML.indexOf('Hier siehst du eine Übersicht über deine Knochen und deine Artefakte')!=-1){
				GM_setValue("DrachenblutTime", "0");
				GM_setValue("GlueckTime", "0");
				GM_setValue("MeisterschmiedTime", "0");
				if(document.getElementsByTagName('td')[24].innerHTML.indexOf('Diese Artefakte hast du angelegt:')!=-1){
					var tdNummer = 26;
					while(document.getElementsByTagName('td')[tdNummer+1]!=null){
						if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('Drachenblut')!=-1){
							tdNummer++;
							if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('noch bis zum')!=-1){
								var artefaktEnde = document.getElementsByTagName('td')[tdNummer].innerHTML.replace(/<span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
								jahr = parseInt(artefaktEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
								monat = parseInt(artefaktEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
								tag = parseInt(artefaktEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
								stunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
								minuten = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
								sekunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
								var artefaktDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
								GM_setValue("DrachenblutTime", artefaktDate.getTime().toString());
							}
						} else if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('Glück')!=-1){
							tdNummer++;
							if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('noch bis zum')!=-1){
								var artefaktEnde = document.getElementsByTagName('td')[tdNummer].innerHTML.replace(/<span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
								jahr = parseInt(artefaktEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
								monat = parseInt(artefaktEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
								tag = parseInt(artefaktEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
								stunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
								minuten = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
								sekunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
								var artefaktDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
								GM_setValue("GlueckTime", artefaktDate.getTime().toString());
							}
						} else if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('Meisterschmied')!=-1){
							tdNummer++;
							if(document.getElementsByTagName('td')[tdNummer].innerHTML.indexOf('noch bis zum')!=-1){
								var artefaktEnde = document.getElementsByTagName('td')[tdNummer].innerHTML.replace(/<span title="noch bis zum (\d+\.\d+\.\d+) um (\d+:\d+:\d+)">[\S\s]*/g,'\$1 \$2');
								jahr = parseInt(artefaktEnde.replace(/^\d+\.\d+\./,'').replace(/ \d+:\d+:\d+$/,'').replace(/^0/,''));
								monat = parseInt(artefaktEnde.replace(/^\d+\./,'').replace(/\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,'')) - 1;
								tag = parseInt(artefaktEnde.replace(/\.\d+\.\d+ \d+:\d+:\d+$/,'').replace(/^0/,''));
								stunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ /,'').replace(/:\d+:\d+$/,'').replace(/^0/,''));
								minuten = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:/,'').replace(/:\d+$/,'').replace(/^0/,''));
								sekunden = parseInt(artefaktEnde.replace(/^\d+\.\d+\.\d+ \d+:\d+:/,'').replace(/^0/,''));
								var artefaktDate = new Date(jahr, monat, tag, stunden, minuten, sekunden);
								GM_setValue("MeisterschmiedTime", artefaktDate.getTime().toString());
							}
						}
						tdNummer++;
					}
				}
			}
		}


		// Inventar
		if(aktuelleUrl.indexOf('inventar.php')!=-1){
			var invToDo = GM_getValue("InventarTODO", "");
			if(invToDo!=""){
				GM_deleteValue("InventarTODO");
				document.location.href= 'http://szs.looki.de/' + invToDo;
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('falls dein Browser keine automatische Weiterleitung unterstützt')!=-1){
				document.location.href='http://szs.looki.de/inventar.php';
			}
		}
		if(aktuelleUrl.indexOf('inventar.php')!=-1 && aktuelleUrl.indexOf('aktion')==-1){
			var waffeAkt = document.getElementsByTagName('td')[25].innerHTML.replace(/\s*<\/*b>\s*/g, '');
			switch (waffeAkt){
				case "nichts": GM_setValue("Hand", "<font color=lime>nichts</font>");
				break;
				case "Stock":
				case "Stock mit Bronze":
				case "Keule":
				case "Speer mit Holzspitze":
				case "Speer mit Steinspitze":
				case "Pfeil und Bogen":
				case "Pfeil und Bogen PLUS":
				case "Pfeil und Bogen Bronze":
				case "Knochenspalter":
				case "Knochenspalter PLUS":
				case "Knochenspalter Bronze":
				case "Hammerfaust":
				case "Hammerfaust Bronze":
				case "Berserkerfaust":
				case "Götterzorn": GM_setValue("Hand", "<font color=red>" + waffeAkt + "</font>");
				break;
				case "Kupfer-Keil":
				case "Kupfer-Schaber":
				case "Kupfer-Hacke":
				case "Zinn-Keil":
				case "Zinn-Schaber":
				case "Kupfer-Kessel":
				case "Bronze-Kessel": GM_setValue("Hand", "<font color=yellow>" + waffeAkt + "</font>");
				break;
				default: GM_setValue("Hand", "Unbekannt");
			}

			var ringAkt = document.getElementsByTagName('td')[28].innerHTML.replace(/\s*<\/*b>\s*/g, '');
			if(waffeAkt == "nichts"){
				ringAkt = document.getElementsByTagName('td')[27].innerHTML.replace(/\s*<\/*b>\s*/g, '');
			}
			switch(ringAkt){
				case "keinen": GM_setValue("Finger", "<font color=lime>nichts</font>");
				break;
				case "Marktring":
				case "Stammkampfring":
				case "Talkampfring":
				case "Wasserring":
				case "Jagdring": GM_setValue("Finger", "<font color=lime>" + ringAkt + "</font>");
				break;
				default: GM_setValue("Finger", "Unbekannt");
			}

			// Waffe tauschen
			function clickA(linkHref, formNr){
				GM_setValue("InventarTODO", linkHref);
				document.getElementsByTagName('form')[formNr].submit();
			}

			if(waffeAkt != "nichts"){
				var tdNummer = 28;
				while(document.getElementsByTagName('td')[tdNummer]!=null){
					var html = document.getElementsByTagName('td')[tdNummer].innerHTML;
					if(html.indexOf('artgegen=hand">in die Hand nehmen</a>')!=-1){
						var linkHrefW1 = document.getElementsByTagName('td')[tdNummer].childNodes[1].getAttribute('href');
						document.getElementsByTagName('td')[tdNummer].innerHTML = '<a id="Waffe' + tdNummer + '" style="cursor:pointer;"><u>in die Hand nehmen</u></a>';
						var aWaffe = document.getElementById('Waffe' + tdNummer);
						aWaffe.addEventListener('click', (function(x) { return function(event){ clickA(x, 0); } })(linkHrefW1), true);
					}
					tdNummer++;
				}
			}
			if(ringAkt != "keinen"){
				var tdNummer = 28;
				var formNr = 0;
				if(waffeAkt != "nichts"){
					formNr = 1;
				}
				while(document.getElementsByTagName('td')[tdNummer]!=null){
					var html = document.getElementsByTagName('td')[tdNummer].innerHTML;
					if(html.indexOf('artgegen=ring">an einen Finger stecken</a>')!=-1){
						var linkHrefM1 = document.getElementsByTagName('td')[tdNummer].childNodes[1].getAttribute('href');
						document.getElementsByTagName('td')[tdNummer].innerHTML = '<a id="Ring' + tdNummer + '" style="cursor:pointer;"><u>an einen Finger stecken</u></a>';
						var aWaffe = document.getElementById('Ring' + tdNummer);
						aWaffe.addEventListener('click', (function(x) { return function(event){ clickA(x, formNr); } })(linkHrefM1), true);
					}
					tdNummer++;
				}
			}

			// Vorhandenes Inventar speichern
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Kupfer-Hacke')!=-1){
				GM_setValue("Kupfer-Hacke", true);
			} else {
				GM_setValue("Kupfer-Hacke", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Kupfer-Schaber')!=-1){
				GM_setValue("Kupfer-Schaber", true);
			} else {
				GM_setValue("Kupfer-Schaber", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Kupfer-Keil')!=-1){
				GM_setValue("Kupfer-Keil", true);
			} else {
				GM_setValue("Kupfer-Keil", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Zinn-Schaber')!=-1){
				GM_setValue("Zinn-Schaber", true);
			} else {
				GM_setValue("Zinn-Schaber", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Zinn-Keil')!=-1){
				GM_setValue("Zinn-Keil", true);
			} else {
				GM_setValue("Zinn-Keil", false);
			}

			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Wasserring')!=-1){
				GM_setValue("Wasserring", true);
			} else {
				GM_setValue("Wasserring", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Jagdring')!=-1){
				GM_setValue("Jagdring", true);
			} else {
				GM_setValue("Jagdring", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Talkampfring')!=-1){
				GM_setValue("Talkampfring", true);
			} else {
				GM_setValue("Talkampfring", false);
			}
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Stammkampfring')!=-1){
				GM_setValue("Stammkampfring", true);
			} else {
				GM_setValue("Stammkampfring", false);
			}
		}


		// Rechtes Menü -> Ausrüstung
		var hand = GM_getValue("Hand", "Unbekannt");
		var finger = GM_getValue("Finger", "Unbekannt");
		var ausruestung = document.createElement("table");
		ausruestung.setAttribute("border", "0");
		ausruestung.setAttribute("cellpadding", "0");
		ausruestung.setAttribute("cellspacing", "0");
		ausruestung.setAttribute("width", "100%");
		ausruestung.innerHTML = '<tbody>' +
		'<tr><td background="/static/menu.png"><img src="/static/menu2.png" align="absmiddle" height="30" width="1"><a href="inventar.php" class="menu">Ausrüstung</a></td></tr>' +
		'<tr><td>In der Hand:</td></tr>' +
		'<tr><td align="right"><span>' + hand + '</span></td></tr>' +
		'<tr><td>Am Finger:</td></tr>' +
		'<tr><td align="right"><span>' + finger + '</span></td></tr>' +
		'</tbody>';
		document.getElementsByTagName('td')[tdNrRechtesMenue].insertBefore(ausruestung, document.getElementsByTagName('table')[tableNrUserDaten+2]);
		var brElement = document.createElement("br");
		document.getElementsByTagName('td')[tdNrRechtesMenue].insertBefore(brElement, document.getElementsByTagName('table')[tableNrUserDaten+3]);


		// Werbung rechts
		var iframeNr = 0;
		while(document.getElementsByTagName('iframe')[iframeNr]!=null){
			if(document.getElementsByTagName('iframe')[iframeNr].getAttribute("name")=="iframejgwer"){
				document.getElementsByTagName('iframe')[iframeNr].setAttribute("width", "0");
				document.getElementsByTagName('iframe')[iframeNr].setAttribute("height", "0");
			}
			iframeNr++;
		}


		// Serverzeit & aktuelle Aktion ermitteln
		var centerTagNr = 2;
		while(document.getElementsByTagName('center')[centerTagNr].innerHTML.indexOf('ServerZeit:')==-1){
			centerTagNr++;
		}
		var serverzeit = document.getElementsByTagName('center')[centerTagNr].innerHTML.replace(/\s*Es ist der \d+ Tag des Monats\s+\d+\s+des\s+\d+\s+Jahres nach der \d+. Nacht des Nomaden.<br>ServerZeit:/,'').replace('Uhr','');
		var serverzeitArray = serverzeit.split(':');
		var serverzeitDate = new Date();
		serverzeitDate.setHours(serverzeitArray[0]);
		serverzeitDate.setMinutes(serverzeitArray[1]);
		serverzeitDate.setSeconds(serverzeitArray[2]);
		serverzeitDate.setMilliseconds(0);
		var abwServerzeit = (new Date()).getTime() - serverzeitDate.getTime();

		var nochUnterwegsHtml = document.getElementsByTagName('td')[23].innerHTML;
		var nochUnterwegs = 0;
		var remindVar = true;
		if(nochUnterwegsHtml.indexOf('Minuten')==-1 && nochUnterwegsHtml.indexOf('Sekunden')==-1){
			remindVar = false;
		} else if(nochUnterwegsHtml.indexOf('Minuten')!=-1){
			nochUnterwegs = parseInt(nochUnterwegsHtml.replace(/[\s\S]*Du bist noch c*a*\.*\s*/,'').replace(/ Minuten[\s\S]*/,''));
		}

		var ankunftszeitDate = new Date(serverzeitDate);
		ankunftszeitDate.setHours(serverzeitArray[0]);
		var serverzeitMinuten = parseInt(serverzeitArray[1]);
		if(serverzeitMinuten==0){
			serverzeitMinuten = parseInt(serverzeitArray[1].substr(1));
		}
		ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+parseInt(nochUnterwegs)+parseInt(1));
		ankunftszeitDate.setSeconds(0);
		ankunftszeitDate.setMilliseconds(0);

		if(nochUnterwegsHtml.indexOf('verletzt')!=-1){
			GM_setValue("Arbeit", "verletzt");
		} else if(nochUnterwegsHtml.indexOf('Kampf')!=-1 && GM_getValue("Arbeit", "").indexOf('kampf')==-1){
			var skTime = Math.floor(GM_getValue("NextSK", "0")) + 3660000;
			var differenz = Math.abs(ankunftszeitDate.getTime()-skTime);
			if(differenz < 65000){
				GM_setValue("Ankunftszeit", skTime.toString());
				GM_setValue("Arbeit", "im Stammkampf");
			} else {
				var mkEnde = 19;
				var tkEnde = 13;
				if(isSommerzeit(serverzeitDate)){
					mkEnde = 20;
					tkEnde = 14;
				}
				if(ankunftszeitDate.getDay()==1 && ankunftszeitDate.getHours()==mkEnde && (ankunftszeitDate.getMinutes()==0||ankunftszeitDate.getMinutes()==1)){
					ankunftszeitDate.setMinutes(1);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
					GM_setValue("Arbeit", "im Magierkampf");
				} else if(ankunftszeitDate.getHours()==tkEnde && (ankunftszeitDate.getMinutes()==0||ankunftszeitDate.getMinutes()==1)){
					ankunftszeitDate.setMinutes(1);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
					GM_setValue("Arbeit", "im Talkampf");
				}
			}
		}

		var berechneteZeit = Math.floor(GM_getValue("Ankunftszeit", "0"));
		var differenz = Math.abs(ankunftszeitDate.getTime()-berechneteZeit);
		if(differenz <= 60000){
			ankunftszeitDate = new Date(Math.floor(berechneteZeit));
		} else {
			GM_deleteValue("Arbeit");
			GM_deleteValue("Ankunftszeit");
		}


		// Rechtes Menü -> Artefakte
		var drachenblutTime = Math.floor(GM_getValue("DrachenblutTime", "0"));
		var glueckTime = Math.floor(GM_getValue("GlueckTime", "0"));
		var meisterschmiedTime = Math.floor(GM_getValue("MeisterschmiedTime", "0"));

		var serverZeitTime = serverzeitDate.getTime();
		if(drachenblutTime < serverZeitTime){
			drachenblutTime = 0;
		}
		if(glueckTime < serverZeitTime){
			glueckTime = 0;
		}
		if(meisterschmiedTime < serverZeitTime){
			meisterschmiedTime = 0;
		}

		if(drachenblutTime != 0 || glueckTime != 0 || meisterschmiedTime != 0){
			var artefakte = document.createElement("table");
			artefakte.setAttribute("border", "0");
			artefakte.setAttribute("cellpadding", "0");
			artefakte.setAttribute("cellspacing", "0");
			artefakte.setAttribute("width", "100%");
			var artefakteHtml = '<tbody>' +
			'<tr><td background="/static/menu.png"><img src="/static/menu2.png" align="absmiddle" height="30" width="1"><a href="artefakt.php" class="menu">Artefakte</a></td></tr>';
			if(drachenblutTime != 0){
				artefakteHtml += '<tr><td>Drachenblut:</td></tr>' +
				'<tr><td align="right"><span id="DrachenblutSpan">' + drachenblutTime + '</span></td></tr>';
			}
			if(glueckTime != 0){
				artefakteHtml += '<tr><td>Glück:</td></tr>' +
				'<tr><td align="right"><span id="GlueckSpan">' + glueckTime + '</span></td></tr>';
			}
			if(meisterschmiedTime != 0){
				artefakteHtml += '<tr><td>Meisterschmied:</td></tr>' +
				'<tr><td align="right"><span id="MeisterschmiedSpan">' + meisterschmiedTime + '</span></td></tr>';
			}
			artefakteHtml += '</tbody>';
			artefakte.innerHTML = artefakteHtml;
			document.getElementsByTagName('td')[tdNrRechtesMenue].insertBefore(artefakte, document.getElementsByTagName('table')[tableNrUserDaten+3]);
			var brElement = document.createElement("br");
			document.getElementsByTagName('td')[tdNrRechtesMenue].insertBefore(brElement, document.getElementsByTagName('table')[tableNrUserDaten+4]);
		}


		// Wetter (für Statistiken)
		if(aktuelleUrl.indexOf('news.php')!=-1){
			var wetterDate = ermittleWetterDate(new Date(serverzeitDate));
			var rechtesMenueHtml = document.getElementsByTagName('td')[tdNrRechtesMenue].innerHTML;
			var wetterAktuell = "";
			if(rechtesMenueHtml.indexOf('/static/wetter/1.jpg')!=-1){
				wetterAktuell = "Sonne";
			} else if(rechtesMenueHtml.indexOf('/static/wetter/2.jpg')!=-1){
				wetterAktuell = "Regen";
			} else if(rechtesMenueHtml.indexOf('/static/wetter/3.jpg')!=-1){
				wetterAktuell = "Schnee";
			} else if(rechtesMenueHtml.indexOf('/static/wetter/4.jpg')!=-1){
				wetterAktuell = "Nebel";
			} else if(rechtesMenueHtml.indexOf('/static/wetter/5.jpg')!=-1){
				wetterAktuell = "Bewoelkt";
			}
			var wetterArray = GM_SuperValue.get("KP_Wetter", new Array());
			var wetterString = format2(wetterDate.getDate()) + "." + format2(wetterDate.getMonth()+1) + "." + wetterDate.getFullYear() + " - " + wetterAktuell;
			while(wetterArray.length > 16){
				wetterArray.pop();
			}
			var isNaheUmstellung = false;
			var umstellungWetter = 6;
			if(isSommerzeit(serverzeitDate)){
				umstellungWetter = 7;
			}
			if(serverzeitDate.getHours() == umstellungWetter && (serverzeitDate.getMinutes() == 20 || serverzeitDate.getMinutes() == 21)){
				isNaheUmstellung = true;
			}
			if(wetterArray[0] != wetterString && !isNaheUmstellung){
				for(var i=wetterArray.length; i>0; i--){
					wetterArray[i] = wetterArray[i-1];
				}
				wetterArray[0] = wetterString;
			}
			GM_SuperValue.set("KP_Wetter", wetterArray);
		}


		// News (für Statistiken)
		if(aktuelleUrl.indexOf('news.php')!=-1){
			for(var tdNr = tdNrLinkesMenue; tdNr < tdNrRechtesMenue; tdNr++){
				if(document.getElementsByTagName('td')[tdNr].innerHTML.search(/^\s*\d+\.\d+\.\d+ - \d+:\d+<br><font color="red">NEU<\/font>\s*$/)!=-1){
					var matches = document.getElementsByTagName('td')[tdNr].innerHTML.match(/^\s*(\d+\.\d+\.\d+ - \d+:\d+)<br><font color="red">NEU<\/font>\s*$/);
					var dateString = matches[1];
					tdNr++;
					var ereignisString = document.getElementsByTagName('td')[tdNr].innerHTML.trim();
					var erkannt = saveAktion(dateString, ereignisString, false);
					if(erkannt){
						//document.getElementsByTagName('td')[tdNr-1].innerHTML += ' <div style="font-size:7px;color:lime">Stats +</div>';
					}
				} else if(document.getElementsByTagName('td')[tdNr].innerHTML.search(/^\s*\d+\.\d+\.\d+ - \d+:\d+<br>\s*$/)!=-1){
					var matches = document.getElementsByTagName('td')[tdNr].innerHTML.match(/^\s*(\d+\.\d+\.\d+ - \d+:\d+)<br>\s*$/);
					var dateString = matches[1];
					tdNr++;
					var ereignisString = document.getElementsByTagName('td')[tdNr].innerHTML.trim();

					var ereignisArray = GM_SuperValue.get("KP_Ereignisse", new Array());
					var ereignisVorhanden = false;
					for(var i=0; i<ereignisArray.length; i++){
						if(ereignisArray[i] == (dateString+ereignisString)){
							ereignisVorhanden = true;
							break;
						}
					}
					if(!ereignisVorhanden){
						var erkannt = saveAktion(dateString, ereignisString, false);
						if(erkannt){
							//document.getElementsByTagName('td')[tdNr-1].innerHTML = document.getElementsByTagName('td')[tdNr-1].innerHTML.replace('<br>', ' <div style="font-size:7px;color:lime">Stats +</div>');
						}
					} else {
						//document.getElementsByTagName('td')[tdNr-1].innerHTML = document.getElementsByTagName('td')[tdNr-1].innerHTML.replace('<br>', ' <div style="font-size:7px;color:lime">Stats OK</div>');
					}
				}
			}
		}

		
		// Aktivitäts-Statistik am Anfang eines neuen Monats / Jahrs verschieben
		if(GM_getValue("KP_Stat_EPMonat", -1) != serverzeitDate.getMonth()){
			moveEpStatsMonat();
			GM_setValue("KP_Stat_EPMonat", serverzeitDate.getMonth());
		}
		if(GM_getValue("KP_Stat_EPJahr", -1) != serverzeitDate.getFullYear()){
			moveEpStatsJahr();
			GM_setValue("KP_Stat_EPJahr", serverzeitDate.getFullYear());
		}


		// Aktivitäts-Statistik für stammlose
		if(document.getElementsByTagName('body')[0].innerHTML.indexOf('href="stamm.php?do=austreten"') == -1){
			var eigeneEp = parseInt(document.getElementsByTagName('td')[tdNrRechtesMenue+4].innerHTML.replace(/\./,''));
			GM_setValue("KP_Stat_Aktueller_Monat_EP_" + GM_getValue("KP_UserName", "NoName"), eigeneEp);
			GM_setValue("KP_Stat_Aktuelles_Jahr_EP_" + GM_getValue("KP_UserName", "NoName"), eigeneEp);
		}


		// Statistiken
		layerCss = document.createElement("style");
		layerCss.setAttribute("type", "text/css");
		layerCss.innerHTML = '#Layer2 {position: absolute; left: -570px; top: 135px; min-height: 1000px; width: 567px; border: 0px; background-color: #215C28;}';
		document.getElementsByTagName('head')[0].appendChild(layerCss);

		layerScript = document.createElement("script");
		layerScript.setAttribute("type", "text/javascript");
		layerScript.innerHTML = 'function moveIn2(){ document.getElementById(\'Layer2\').style.left=' + layerPos + '; } function moveOut2(){ document.getElementById(\'Layer2\').style.left=-570; }';
		document.getElementsByTagName('head')[0].appendChild(layerScript);

		layerHtml = document.createElement("div");
		layerHtml.setAttribute("id", "Layer2");
		document.getElementsByTagName('body')[0].appendChild(layerHtml);
		setStatHtml();


		// Statistiken - Wetter eintragen
		layerCss = document.createElement("style");
		layerCss.setAttribute("type", "text/css");
		layerCss.innerHTML = '#Layer3 {position: absolute; left: -570px; top: 135px; min-height: 1000px; width: 567px; border: 0px; background-color: #215C28;}';
		document.getElementsByTagName('head')[0].appendChild(layerCss);

		layerScript = document.createElement("script");
		layerScript.setAttribute("type", "text/javascript");
		layerScript.innerHTML = 'function moveIn3(){ document.getElementById(\'Layer3\').style.left=' + layerPos + '; } function moveOut3(){ document.getElementById(\'Layer3\').style.left=-570; }';
		document.getElementsByTagName('head')[0].appendChild(layerScript);

		layerHtml = document.createElement("div");
		layerHtml.setAttribute("id", "Layer3");
		document.getElementsByTagName('body')[0].appendChild(layerHtml);
		setStatWetterHtml();


		// Layer neu ausrichten, wenn sich Größe des Browserfensters ändert
		window.onresize = layerNeuAusrichten;


		// Charakter
		if(aktuelleUrl.indexOf('charakter.php')!=-1){
			var verteilbarePunkte = 0;
			try{ verteilbarePunkte = document.getElementsByTagName('td')[47].innerHTML.replace('<b>','').replace('</b>',''); }catch(e){}
			var gesamtFaktor = parseInt(GM_getValue("KP_KraftPunkte", "0")) + parseInt(GM_getValue("KP_IntelligenzPunkte", "0")) + parseInt(GM_getValue("KP_GeschwindigkeitPunkte", "0")) + parseInt(GM_getValue("KP_ListPunkte", "0")) + parseInt(GM_getValue("KP_AusdauerPunkte", "0")) + parseInt(GM_getValue("KP_GeschickPunkte", "0"));
			var uebrigePunkte = verteilbarePunkte%gesamtFaktor;
			verteilbarePunkte = verteilbarePunkte - uebrigePunkte;
			var kraft = verteilbarePunkte / gesamtFaktor * parseInt(GM_getValue("KP_KraftPunkte", "0"));
			var intelligenz = verteilbarePunkte / gesamtFaktor * parseInt(GM_getValue("KP_IntelligenzPunkte", "0"));
			var geschwindigkeit = verteilbarePunkte / gesamtFaktor * parseInt(GM_getValue("KP_GeschwindigkeitPunkte", "0"));
			var list = verteilbarePunkte / gesamtFaktor* parseInt(GM_getValue("KP_ListPunkte", "0"));
			var ausdauer = verteilbarePunkte / gesamtFaktor * parseInt(GM_getValue("KP_AusdauerPunkte", "0"));
			var geschick = verteilbarePunkte / gesamtFaktor * parseInt(GM_getValue("KP_GeschickPunkte", "0"));
			try{ document.getElementsByName('kraft')[0].value=kraft; }catch(e){}
			try{ document.getElementsByName('intelligenz')[0].value=intelligenz; }catch(e){}
			try{ document.getElementsByName('geschwindigkeit')[0].value=geschwindigkeit; }catch(e){}
			try{ document.getElementsByName('list')[0].value=list; }catch(e){}
			try{ document.getElementsByName('ausdauer')[0].value=ausdauer; }catch(e){}
			try{ document.getElementsByName('geschick')[0].value=geschick; }catch(e){}
		}


		// Markt
		if(aktuelleUrl.indexOf('markt.php')!=-1 && document.getElementsByTagName('td')[22].innerHTML.indexOf('Du bist im Moment unterwegs.')==-1){
			// Navigations-Links
			if(document.getElementsByTagName('td')[24].innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen Rohstoffmarkt') !=-1){
				document.getElementsByTagName('td')[24].innerHTML = document.getElementsByTagName('td')[24].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Rohstoffmarkt.</b>', '<font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Rohstoffmarkt.</b>').replace('Hier kannst du deine Rohstoffe anbieten, aber auch Rohstoffe kaufen.<br><br><br>','');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen Zaubertrankmarkt') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Zaubertrankmarkt.</b>', '<center><table width="97%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="100%"><font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Zaubertrankmarkt.</b>');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/die du dir auch leisten kannst![\S\s]*?<table[\S\s]*?<table[\S\s]*?action="markt.php"[\S\s]*?<table/g,'die du dir auch leisten kannst!<br><br><table');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<table width="97%" cellspacing="0" cellpadding="0" border="0">','<center><table width="97%" cellspacing="0" cellpadding="0" border="0">').replace('<!-- INHALT ENDE -->','<!-- INHALT ENDE --></center>');
				centerTagNr++;
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen Waffenmarkt') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Waffenmarkt.</b>', '<font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Waffenmarkt.</b>').replace('Hier kannst du Waffen aller Art kaufen.<br><br>','');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/die du dir auch leisten kannst![\S\s]*?<table[\S\s]*?<table[\S\s]*?action="markt.php"[\S\s]*?<table/g,'die du dir auch leisten kannst!<br><br><table');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<table width="97%" cellspacing="0" cellpadding="0" border="0">','<center><table width="97%" cellspacing="0" cellpadding="0" border="0">').replace('<!-- INHALT ENDE -->','<!-- INHALT ENDE --></center>');
				tdNrRechtesMenue-=2;
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen Werkzeugmarkt') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Werkzeugmarkt.</b>', '<center><table width="97%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="100%"><font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Werkzeugmarkt.</b>').replace('Hier kannst du Werkzeuge aller Art kaufen.<br><br>','');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/die du dir auch leisten kannst![\S\s]*?<table[\S\s]*?<table[\S\s]*?action="markt.php"[\S\s]*?<table/g,'die du dir auch leisten kannst!<br><br><table');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<table width="97%" cellspacing="0" cellpadding="0" border="0">','<center><table width="97%" cellspacing="0" cellpadding="0" border="0">').replace('<!-- INHALT ENDE -->','<!-- INHALT ENDE --></center>');
				centerTagNr++;
				tdNrRechtesMenue-=2;
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Waffenmarkt.</b>', '<font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Waffenmarkt.</b>').replace('Hier kannst du Waffen aller Art kaufen.<br><br>','');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<b>Du befindest dich auf dem steinzeitlichen Ringmarkt.</b>', '<font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Ringmarkt.</b>').replace('Hier kannst du je nach Angebot alle möglichen Ringe der Steinzeit kaufen.<br><br>','');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/die du dir auch leisten kannst![\S\s]*?<table[\S\s]*?<table[\S\s]*?action="markt.php"[\S\s]*?<table/g,'die du dir auch leisten kannst!<br><br><table');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<table width="97%" cellspacing="0" cellpadding="0" border="0">','<center><table width="97%" cellspacing="0" cellpadding="0" border="0">').replace('<!-- INHALT ENDE -->','<!-- INHALT ENDE --></center>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Hier siehst du eine Liste mit Ländern auf denen sich ein Markt befindet') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('Hier siehst du eine Liste mit Ländern auf denen sich ein Markt befindet.', '<center><table width="97%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="100%"><font size="2"><u><b>Markt-Auswahl:</b></u></font><br><br><b>Rohstoffe:</b><br><a href="markt.php?do=rohstoffe&amp;rohausw=1"><b>Wasser</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=2"><b>Holz</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=3"><b>Stein</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=4"><b>Kohle</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=5"><b>Kupfer</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=6"><b>Zinn</b></a> | <a href="markt.php?do=rohstoffe&amp;rohausw=7"><b>Bronze</b></a><br><br><b>Gegenstände:</b><br><a href="markt.php?do=waffen"><b>Waffen</b></a> | <a href="markt.php?do=werkzeug"><b>Werkzeuge</b></a> | <a href="markt.php?do=ringe"><b>Ringe</b></a> | <a href="markt.php?do=trank"><b>Zaubertränke</b></a> | <a href="markt.php?do=landverkauf"><b>Länder</b></a><br><br><br><b>Du befindest dich auf dem steinzeitlichen Ländermarkt.</b><br><br>Hier siehst du eine Liste mit Ländern auf denen sich ein Markt befindet.').replace('Hier kannst du deine Rohstoffe anbieten, aber auch Rohstoffe kaufen.<br><br><br>','');
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('<table width="97%" cellspacing="0" cellpadding="0" border="0">','<center><table width="97%" cellspacing="0" cellpadding="0" border="0">').replace('<!-- INHALT ENDE -->','<!-- INHALT ENDE --></center>');
				centerTagNr++;
			}

			// Ressis-Sicherung
			if(aktuelleUrl.indexOf('markt.php?do=rohstoffe')!=-1 && document.getElementsByTagName('td')[22].innerHTML.indexOf('Da dein Steini gerade beschäftigt ist, kannst du weder etwas auf den Markt stellen, noch etwas kaufen.')==-1){
				var holz = parseInt(document.getElementsByTagName('td')[39].innerHTML) - parseInt(GM_getValue("KP_HolzRest", "0"));
				var stein = parseInt(document.getElementsByTagName('td')[46].innerHTML) - parseInt(GM_getValue("KP_SteinRest", "0"));
				if(holz < 0){ holz = 0; }
				if(stein < 0){ stein = 0; }
				document.getElementsByName('mengeholz')[0].value=holz;
				document.getElementsByName('mengesteine')[0].value=stein;
				document.getElementsByName('preisholz')[0].value=parseInt(GM_getValue("KP_HolzPreis", "100"));
				document.getElementsByName('preissteine')[0].value=parseInt(GM_getValue("KP_SteinPreis", "100"));
			}

			// Back-Links
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('nichts gefunden') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br><font color=red>Da war wohl jemand schneller als du, die Ware ist bereits weg...</font><br><br><a href="javascript:history.go(-1)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('da war wohl jemand schneller') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br><font color=red>Da war wohl jemand schneller als du, die Ware ist bereits weg...</font><br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast die Ware gekauft') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast die Ware gekauft.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast die Waffe gekauft') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast die Waffe gekauft.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast den Ring gekauft') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast den Ring gekauft.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast den Trank gekauft') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast den Trank gekauft.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast das Werkzeug gekauft') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast das Werkzeug gekauft.<br><br><a href="javascript:history.go(-2)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Dein Rohstoff wird jetzt auf dem Markt angeboten') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Die Ware wird jetzt auf dem Markt angeboten.<br><br><a href="javascript:history.go(-1)">[ zurück ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du hast die Ware vom Markt genommen') !=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace(/<\/table><br>[\S\s]*/g, '</table><br>Du hast die Ware vom Markt genommen.<br><br><a href="javascript:history.go(-1)">[ zurück ]</a>');
			}
		}


		// Lager
		if(aktuelleUrl.indexOf('stamm.php')!=-1 && aktuelleUrl.indexOf('do=')==-1){
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Rohstoffe liegen jetzt im Stammlager')!=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML + '<br><a href="javascript:history.go(-1)">[ zurück ]</a>';
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Rohstoffe aus dem Lager genommen.')!=-1){
				if(GM_getValue("KP_Uebertragen", "NoName")!="NoName"){
					document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML + '<br><a href="uebertragen.php">[ an ' + GM_getValue("KP_Uebertragen", "NoName") + ' übertragen ]</a><br><br><a href="javascript:history.go(-1)">[ zurück ]</a>';
				} else {
					document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML + '<br><a href="javascript:history.go(-1)">[ zurück ]</a>';
				}
			}
		} else if(aktuelleUrl.indexOf('stamm.php?do=lager')!=-1 && aktuelleUrl.indexOf('lagerfeuer')==-1){
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du bist momentan unterwegs.')==-1){
				// Ressis-Sicherung
				var nahrung = parseInt(document.getElementsByTagName('td')[28].innerHTML.replace('<input name="menge_nahrung" value="" size="6" style="text-align:right" type="text"> von ', '')) - parseInt(GM_getValue("KP_NahrungRest", "10"));
				var gold = parseInt(document.getElementsByTagName('td')[32].innerHTML.replace('<input name="menge_geld" value="" size="6" style="text-align:right" type="text"> von ', '')) - parseInt(GM_getValue("KP_GoldRest", "0"));
				if(gold < 0 || isNaN(gold)){ gold = 0; }
				if(nahrung < 0 || isNaN(nahrung)){ nahrung = 0; }
				if(parseInt(GM_getValue("KP_GoldRund", "0")) > 0){
					while(gold%parseInt(GM_getValue("KP_GoldRund", "1")) != 0){ gold--; }
				}
				if(parseInt(GM_getValue("KP_NahrungRund", "0")) > 0){
					while(nahrung%parseInt(GM_getValue("KP_NahrungRund", "1")) != 0){ nahrung--; }
				}
				if(nahrung != 0){
					document.getElementsByName('menge_nahrung')[0].value=nahrung;
				}
				if(gold != 0){
					document.getElementsByName('menge_geld')[0].value=gold;
				}

				// Ressis-Entnahme
				var selectUserDiv = document.createElement("form");
				selectUserDiv.setAttribute('method', 'post');
				selectUserDiv.setAttribute('action', 'javascript:moveOut()');
				var selectUserDivHTML = 'Wessen gesicherte Ressis möchtest du entnehmen? <select id="kp_userselect">';
				selectUserDivHTML += '<option selected="selected">' + GM_getValue("KP_UserName", "NoName") + '</option>';

				var lagerText = document.getElementsByTagName('table')[14].innerHTML;
				var regExForUser = new RegExp('>([^<]+?) hat<br>[^=]+?<br>in das Lager verfrachtet([\\S\\s]*)');
				while(lagerText.search(regExForUser) != -1){
					var user4LagerSearch = lagerText.match(regExForUser);
					var user4Lager = user4LagerSearch[1];
					var nahrung = 0;
					var nahrungString = document.getElementsByTagName('table')[14].innerHTML.replace(user4Lager,'userNameGM').replace(user4Lager,'userNameGM').replace(/^[\S\s]*?userNameGM hat<br>/g,'').replace(/ Nahrung[\S\s]*/g,'').replace(/\./g,'');
					if(nahrungString.match(/^\d+$/g) != null){
						nahrung = parseInt(nahrungString);
					}
					var gold = 0;
					var goldString = document.getElementsByTagName('table')[14].innerHTML.replace(user4Lager,'userNameGM').replace(user4Lager,'userNameGM').replace(/^[\S\s]*?userNameGM hat<br>([\d\.]+ Nahrung<br>)*/g,'').replace(/ Gold[\S\s]*/g,'').replace(/\./g,'');
					if(goldString.match(/^\d+$/g) != null){
						gold = parseInt(goldString);
					}
					if(selectUserDivHTML.indexOf(user4Lager)==-1 && (nahrung != 0 || gold != 0)){
						selectUserDivHTML += '<option>' + user4Lager + '</option>';
					}
					lagerText = lagerText.replace(regExForUser, '$2');
				}

				selectUserDivHTML += '</select><input type="submit" value="Set">';
				selectUserDiv.innerHTML = selectUserDivHTML;
				selectUserDiv.addEventListener('submit', changeLagerUser, true);

				document.getElementsByTagName('div')[0].appendChild(selectUserDiv);

				changeLagerUser();
			}
		}


		// Übertragen (gesicherte Ressis)
		if(aktuelleUrl.indexOf('uebertragen.php')!=-1){
			var anUser = GM_getValue("KP_Uebertragen", "NoName");
			if(aktuelleUrl.indexOf('anrohstoffe')!=-1){
				anUser = aktuelleUrl.replace(/^[\S\s]*anrohstoffe=/g, '');
			} else if(anUser!='NoName'){
				document.getElementsByName('an')[0].value=anUser;
				GM_deleteValue("KP_Uebertragen");
			}
			if(anUser!='NoName'){
				var uebNahrung = GM_getValue("KP_Nahrung_"+anUser, 0);
				if(uebNahrung!=0){
					document.getElementsByName('nahrung')[0].value=uebNahrung;
				}
				var uebGold = GM_getValue("KP_Gold_"+anUser, 0);
				if(uebGold!=0){
					document.getElementsByName('geld')[0].value=uebGold;
				}
				GM_deleteValue("KP_Nahrung_"+anUser);
				GM_deleteValue("KP_Gold_"+anUser);
			}
		}


		// TK
		var talkampfStart = 11;
		var talkampfEnde = 13;
		if(isSommerzeit(serverzeitDate)){
			talkampfStart = 12;
			talkampfEnde = 14;
		}
		if(aktuelleUrl.indexOf('grtal.php')!=-1){
			// Beschreibung anpassen
			var tkBeschreibung = document.getElementsByTagName('td')[22].innerHTML.replace('10:00', talkampfStart).replace('10:00', talkampfStart).replace('10:00', talkampfStart).replace('12:00', talkampfEnde);
			if(tkBeschreibung.indexOf('Anmeldung zum Talkampf erst ab 12:05 möglich.')!=-1 || tkBeschreibung.indexOf('Hier kannst du dich zum Talkampf eintragen.')!=-1){
				tkBeschreibung += '<font color="yellow">TIPP: Wenn du dich zw. 12:05 Uhr und ' + talkampfEnde + ' Uhr anmeldest, nimmst du am Talkampf teil und kannst nebenbei noch arbeiten, jagen, o.a.</font>';
			}
			document.getElementsByTagName('td')[22].innerHTML = tkBeschreibung;

			// Teilnahme speichern
			if(tkBeschreibung.indexOf('Du bist für die Kämpfe im Tal angemeldet.')!=-1){
				GM_setValue("TKTeilnahme", serverzeitDate.getTime().toString());
			}
		}
		if(aktuelleUrl.indexOf('grtal.php?teil=true')!=-1){
			// Teilnahme speichern
			GM_setValue("TKTeilnahme", serverzeitDate.getTime().toString());
		}


		// SK
		if(aktuelleUrl.indexOf('stamm.php?do=kampfuserauswahl')!=-1){
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Ihr habt noch keinen Stamm herausgefordert bzw. seid herausgefordert worden.')!=-1){
				document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML.replace('Ihr habt noch keinen Stamm herausgefordert bzw. seid herausgefordert worden.', 'Ihr habt noch keinen Stamm herausgefordert bzw. seid herausgefordert worden.<br><br><a href="stamm.php?do=kampfsuche">[ Gegner wählen ]</a>');
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du bist unterwegs.')==-1){
				// Datum speichern
				var skdatum = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Am /,'').replace(/ - \d\d:\d\d Uhr kämpft ihr gegen [\S\s]*/,'');
				var skzeit = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Am \d\d\.\d\d\.\d\d\d\d - /,'').replace(/ Uhr kämpft ihr gegen [\S\s]*/,'');
				var skdatumArray = skdatum.split('.');
				var skzeitArray = skzeit.split(':');
				var skDate = new Date();
				skDate.setDate(skdatumArray[0].replace(/^0/,''));
				skDate.setMonth(parseInt(skdatumArray[1].replace(/^0/,''))-1);
				skDate.setFullYear(skdatumArray[2].replace(/^0/,''));
				skDate.setHours(skzeitArray[0].replace(/^0/,''));
				skDate.setMinutes(skzeitArray[1].replace(/^0/,''));
				skDate.setSeconds(0);
				skDate.setMilliseconds(0);
				GM_setValue("NextSK", skDate.getTime().toString());
				var gegner = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Am \d\d\.\d\d\.\d\d\d\d - \d\d:\d\d Uhr kämpft ihr gegen /,'').replace(/\. Dieser Kampf endet[\S\s]*/,'');
				GM_setValue("NextSKGegner", gegner);

				// Teilnahme speichern
				if(document.getElementsByTagName('td')[22].innerHTML.indexOf('nicht teilnehmen')!=-1){
					GM_setValue("SKTeilnahme", skDate.getTime().toString());
				}

				// EPs
				var gesamtMitglieder = 0;
				var gesamtEps = 0;
				var tdNr = 28;
				while(document.getElementsByTagName('td')[tdNr+1].innerHTML == '' || document.getElementsByTagName('td')[tdNr+1].innerHTML.indexOf('nicht teilnehmen')!=-1 || document.getElementsByTagName('td')[tdNr+1].innerHTML.indexOf('vom Kampf ausschliessen')!=-1){
					gesamtEps += Math.floor(document.getElementsByTagName('td')[tdNr].innerHTML);
					GM_setValue("EP_" + document.getElementsByTagName('td')[tdNr-1].innerHTML.replace('</a>','').replace(/<a href="userinfo.php\?userinfo=\d+">\s*(<font color="red">)*/g,'').replace('</font>','').trim(), document.getElementsByTagName('td')[tdNr].innerHTML.trim());
					document.getElementsByTagName('td')[tdNr].innerHTML = format1(document.getElementsByTagName('td')[tdNr].innerHTML);
					document.getElementsByTagName('td')[tdNr].align = 'right';
					gesamtMitglieder += 1;
					tdNr+=3;
				}
				gesamtEps = format1(gesamtEps);
				document.getElementsByTagName('td')[24].innerHTML = 'Name (' + gesamtMitglieder + ')';
				document.getElementsByTagName('td')[25].innerHTML = 'Erfahrung (' + gesamtEps + ')';
			}
		}
		if(aktuelleUrl.indexOf('stamm.php?do=kampfteilnehmen')!=-1){
			// Teilnahme speichern
			GM_setValue("SKTeilnahme", GM_getValue("NextSK", "0"));
			document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML + '<br><a href="javascript:history.go(-1)">[ zurück ]</a>';
		}
		if(aktuelleUrl.indexOf('stamm.php?do=nichtteil')!=-1){
			// Teilnahme löschen
			GM_deleteValue("SKTeilnahme");
			document.getElementsByTagName('td')[22].innerHTML = document.getElementsByTagName('td')[22].innerHTML + '<br><a href="javascript:history.go(-1)">[ zurück ]</a>';
		}


		// Stammübersicht (eigener Stamm)
		if(aktuelleUrl.indexOf('stamm.php?do=uebersicht')!=-1){
			// SK-Datum speichern
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Nächster Kampf: kein Kampf')==-1){
				var skdatum = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Nächster Kampf: /,'').replace(/ - \d\d:\d\d Uhr gegen: [\S\s]*/,'');
				var skzeit = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Nächster Kampf: \d\d\.\d\d\.\d\d\d\d - /,'').replace(/ Uhr gegen: [\S\s]*/,'');
				var skdatumArray = skdatum.split('.');
				var skzeitArray = skzeit.split(':');
				var skDate = new Date();
				skDate.setDate(skdatumArray[0].replace(/^0/,''));
				skDate.setMonth(parseInt(skdatumArray[1].replace(/^0/,''))-1);
				skDate.setFullYear(skdatumArray[2].replace(/^0/,''));
				skDate.setHours(skzeitArray[0].replace(/^0/,''));
				skDate.setMinutes(skzeitArray[1].replace(/^0/,''));
				skDate.setSeconds(0);
				skDate.setMilliseconds(0);
				GM_setValue("NextSK", skDate.getTime().toString());
				var gegner = document.getElementsByTagName('td')[22].innerHTML.replace(/[\S\s]*Nächster Kampf: \d\d\.\d\d\.\d\d\d\d - \d\d:\d\d Uhr gegen: <a href="stamminfo.php\?stammid=\d+">/,'').replace(/<\/a><br>Kampfstamm[\S\s]*/,'');
				GM_setValue("NextSKGegner", gegner);
			}

			// EPs etc.
			var gesamtMitglieder = 0;
			var gesamtEps = 0;
			var gesamtHolz = 0;
			var gesamtStein = 0;
			var gesamtGold = 0;
			var gesamtWasser = 0;
			var gesamtNahrung = 0;
			var gesamtOnline = 0;
			var tdNr = 35;
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('<a href="stamm.php?do=beschreibung">')!=-1){
				tdNr = 38;
			}
			var stammUserArray = new Array();
			var userWegArray = GM_SuperValue.get("KP_Stat_StammuserWeg", new Array());
			while(document.getElementsByTagName('td')[tdNr+6].innerHTML.indexOf('online')!=-1 || document.getElementsByTagName('td')[tdNr+6].innerHTML.indexOf('offline')!=-1){
				gesamtEps += Math.floor(document.getElementsByTagName('td')[tdNr].innerHTML);
				var aktUname = document.getElementsByTagName('td')[tdNr-1].innerHTML.replace('</a>','').replace(/<a href="userinfo.php\?userinfo=\d+">\s*(<font color="red">)*/g,'').replace('</font>','').trim();
				var aktUep = document.getElementsByTagName('td')[tdNr].innerHTML.trim();
				GM_setValue("EP_" + aktUname, aktUep);
				GM_setValue("KP_Stat_Aktueller_Monat_EP_" + aktUname, parseInt(aktUep));
				GM_setValue("KP_Stat_Aktuelles_Jahr_EP_" + aktUname, parseInt(aktUep));
				if(posOf(userWegArray, aktUname) != -1){
					userWegArray.splice(posOf(userWegArray, aktUname), 1);
				}
				stammUserArray.push(aktUname);
				gesamtHolz += Math.floor(document.getElementsByTagName('td')[tdNr+1].innerHTML);
				gesamtStein += Math.floor(document.getElementsByTagName('td')[tdNr+2].innerHTML);
				gesamtGold += Math.floor(document.getElementsByTagName('td')[tdNr+3].innerHTML);
				gesamtWasser += Math.floor(document.getElementsByTagName('td')[tdNr+4].innerHTML);
				gesamtNahrung += Math.floor(document.getElementsByTagName('td')[tdNr+5].innerHTML);
				document.getElementsByTagName('td')[tdNr].innerHTML = format1(document.getElementsByTagName('td')[tdNr].innerHTML);
				document.getElementsByTagName('td')[tdNr+1].innerHTML = format1(document.getElementsByTagName('td')[tdNr+1].innerHTML);
				document.getElementsByTagName('td')[tdNr+2].innerHTML = format1(document.getElementsByTagName('td')[tdNr+2].innerHTML);
				document.getElementsByTagName('td')[tdNr+3].innerHTML = format1(document.getElementsByTagName('td')[tdNr+3].innerHTML);
				document.getElementsByTagName('td')[tdNr+4].innerHTML = format1(document.getElementsByTagName('td')[tdNr+4].innerHTML);
				document.getElementsByTagName('td')[tdNr+5].innerHTML = format1(document.getElementsByTagName('td')[tdNr+5].innerHTML);
				document.getElementsByTagName('td')[tdNr].align = 'right';
				document.getElementsByTagName('td')[tdNr+1].align = 'right';
				document.getElementsByTagName('td')[tdNr+2].align = 'right';
				document.getElementsByTagName('td')[tdNr+3].align = 'right';
				document.getElementsByTagName('td')[tdNr+4].align = 'right';
				document.getElementsByTagName('td')[tdNr+5].align = 'right';
				document.getElementsByTagName('td')[tdNr+6].align = 'right';
				gesamtMitglieder += 1;
				if(document.getElementsByTagName('td')[tdNr+6].innerHTML.indexOf('online')!=-1){
					gesamtOnline += 1;
				}
				tdNr+=9;
			}
			tdNr = 35;
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('<a href="stamm.php?do=beschreibung">')!=-1){
				tdNr = 38;
			}
			var userArrayAlt = GM_SuperValue.get("KP_Stat_Stammuser", new Array());
			for(var i=0; i<userArrayAlt.length; i++){
				var user = userArrayAlt[i];
				var userWeg = true;
				if(posOf(stammUserArray, user) != -1){
					userWeg = false;
				}
				if(userWeg){
					userWegArray.push(user);
					//GM_deleteValue("KP_Stat_Vorvorletzter_Monat_EP_" + user);
					//GM_deleteValue("KP_Stat_Vorletzter_Monat_EP_" + user);
					//GM_deleteValue("KP_Stat_Letzter_Monat_EP_" + user);
					//GM_deleteValue("KP_Stat_Aktueller_Monat_EP_" + user);
					//GM_deleteValue("KP_Stat_Vorvorletztes_Jahr_EP_" + user);
					//GM_deleteValue("KP_Stat_Vorletztes_Jahr_EP_" + user);
					//GM_deleteValue("KP_Stat_Letztes_Jahr_EP_" + user);
					//GM_deleteValue("KP_Stat_Aktuelles_Jahr_EP_" + user);
				}
			}
			GM_SuperValue.set("KP_Stat_Stammuser", stammUserArray);
			GM_SuperValue.set("KP_Stat_StammuserWeg", userWegArray);
			GM_setValue("StammEP_" + GM_getValue("KP_StammName", "NoStamm"), gesamtEps);
			gesamtEps = format1(gesamtEps);
			gesamtHolz = format1(gesamtHolz);
			gesamtStein = format1(gesamtStein);
			gesamtGold = format1(gesamtGold);
			gesamtWasser = format1(gesamtWasser);
			gesamtNahrung = format1(gesamtNahrung);
			document.getElementsByTagName('td')[tdNr-11].innerHTML = '#<br><i>&Sigma;</i>';
			document.getElementsByTagName('td')[tdNr-10].innerHTML = 'Name <br><i>' + gesamtMitglieder + '</i>';
			document.getElementsByTagName('td')[tdNr-9].innerHTML = 'EP <br><i>' + gesamtEps + '</i>';
			document.getElementsByTagName('td')[tdNr-9].align = 'right';
			document.getElementsByTagName('td')[tdNr-8].innerHTML = 'Holz <br><i>' + gesamtHolz + '</i>';
			document.getElementsByTagName('td')[tdNr-8].align = 'right';
			document.getElementsByTagName('td')[tdNr-7].innerHTML = 'Stein <br><i>' + gesamtStein + '</i>';
			document.getElementsByTagName('td')[tdNr-7].align = 'right';
			document.getElementsByTagName('td')[tdNr-6].innerHTML = 'Gold <br><i>' + gesamtGold + '</i>';
			document.getElementsByTagName('td')[tdNr-6].align = 'right';
			document.getElementsByTagName('td')[tdNr-5].innerHTML = 'Wasser <br><i>' + gesamtWasser + '</i>';
			document.getElementsByTagName('td')[tdNr-5].align = 'right';
			document.getElementsByTagName('td')[tdNr-4].innerHTML = 'Nahrung <br><i>' + gesamtNahrung + '</i>';
			document.getElementsByTagName('td')[tdNr-4].align = 'right';
			document.getElementsByTagName('td')[tdNr-3].innerHTML = 'Status <br><i>' + gesamtOnline + '</i>';
			document.getElementsByTagName('td')[tdNr-3].align = 'right';
		}


		// Stammübersicht (fremder Stamm)
		if(aktuelleUrl.indexOf('stamminfo.php')!=-1 && document.getElementsByTagName('td')[22].innerHTML.indexOf('Hier werden Stammdaten angezeigt:')!=-1){
			var gesamtMitglieder = 0;
			var gesamtEps = 0;
			var gesamtOnline = 0;
			var tdNr = 43;
			while(document.getElementsByTagName('td')[tdNr+1].innerHTML.indexOf('online')!=-1 || document.getElementsByTagName('td')[tdNr+1].innerHTML.indexOf('offline')!=-1){
				gesamtEps += Math.floor(document.getElementsByTagName('td')[tdNr].innerHTML);
				GM_setValue("EP_" + document.getElementsByTagName('td')[tdNr-1].innerHTML.replace('</a>','').replace(/<a href="userinfo.php\?userinfo=\d+">\s*(<font color="red">)*/g,'').replace('</font>','').trim(), document.getElementsByTagName('td')[tdNr].innerHTML.trim());
				document.getElementsByTagName('td')[tdNr].innerHTML = format1(document.getElementsByTagName('td')[tdNr].innerHTML);
				document.getElementsByTagName('td')[tdNr].align = 'right';
				gesamtMitglieder += 1;
				if(document.getElementsByTagName('td')[tdNr+1].innerHTML.indexOf('online')!=-1){
					gesamtOnline += 1;
				}
				tdNr+=3;
			}
			GM_setValue("StammEP_" + document.getElementsByTagName('td')[28].innerHTML.trim(), gesamtEps);
			gesamtEps = format1(gesamtEps);
			document.getElementsByTagName('td')[39].innerHTML = 'Name (' + gesamtMitglieder + ')';
			document.getElementsByTagName('td')[40].innerHTML = 'Erfahrung (' + gesamtEps + ')';
			document.getElementsByTagName('td')[41].innerHTML = 'Status (' + gesamtOnline + ')';
		}


		// Stammnachrichten (SK-Datum speichern, SK-Ergebnis, MK-Ergebnis)
		if(aktuelleUrl.indexOf('stamm.php?do=nachricht')!=-1){
			var tdNr = 29;
			while(document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('UserDaten')==-1){
				if(document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('hat für euch einen Gegner ausgesucht, der Kampf geht in 24 Stunden los.')!=-1 || document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('Ihr wurdet zum Kampf aufgefordert. In 24 Std. beginnt der Kampf!')!=-1){
					if(document.getElementsByTagName('td')[tdNr-1].innerHTML.indexOf('<a href="userinfo.php?userinfo=0">System</a>')!=-1){
						var skdatum = document.getElementsByTagName('td')[tdNr-1].innerHTML.replace(/[\S\s]*<br>/,'').replace(/[\S\s]*font>/,'').replace(/ - \d\d:\d\d[\S\s]*/,'');
						var skzeit = document.getElementsByTagName('td')[tdNr-1].innerHTML.replace(/[\S\s]*<br>\d\d\.\d\d\.\d\d\d\d - /,'').replace(/[\S\s]*font>\d\d\.\d\d\.\d\d\d\d - /,'');
						var skdatumArray = skdatum.split('.');
						var skzeitArray = skzeit.split(':');
						var skDate = new Date();
						skDate.setDate(parseInt(skdatumArray[0].replace(/^0/,''))+1);
						skDate.setMonth(parseInt(skdatumArray[1].replace(/^0/,''))-1);
						skDate.setFullYear(skdatumArray[2].replace(/^0/,''));
						skDate.setHours(skzeitArray[0].replace(/^0/,''));
						skDate.setMinutes(skzeitArray[1].replace(/^0/,''));
						skDate.setSeconds(0);
						skDate.setMilliseconds(0);
						if(serverzeitDate.getTime()<skDate.getTime()){
							GM_setValue("NextSK", skDate.getTime().toString());
						}
					}
				} else if(document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('Der Kampf wurde verloren.')!=-1 || document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('Der Kampf wurde gewonnen.')!=-1){
					if(document.getElementsByTagName('td')[tdNr-1].innerHTML.indexOf('<a href="userinfo.php?userinfo=0">System</a>')!=-1){
						var gesamtTeilnehmer1 = 0;
						var gesamtEps1 = 0;
						var teilnehmer1 = new Array();
						var gesamtTeilnehmer2 = 0;
						var gesamtEps2 = 0;
						var teilnehmer2 = new Array();
						var text = document.getElementsByTagName('td')[tdNr].innerHTML.split(' ');
						var neuerText = "";
						var i = 0;
						while(text[i]!="angetreten:"){
							neuerText += text[i] + ' ';
							i++;
						}
						// Für den angreifenden Stamm sind angetreten:
						i++;
						while(text[i].indexOf('<br>')==-1 && text[i]!=""){
							if(text[i].indexOf('<font')==-1){
								var ep = GM_getValue("EP_" + text[i].replace('color="red"><b>', '').replace('</b></font></b></font>', ''), "0");
								var j = 1;
								var userNameKomplett = text[i];
								while(ep=="0" && text[i+j].indexOf('<br>')==-1 && text[i+j]!=""){
									userNameKomplett = userNameKomplett + " " + text[i+j];
									ep = GM_getValue("EP_" + userNameKomplett.replace('color="red"><b>', '').replace('</b></font></b></font>', ''), "0");
									if(ep != "0"){
										i+=j;
										text[i] = userNameKomplett;
									} else {
										j++
									}
								}
								teilnehmer1[gesamtTeilnehmer1] = text[i] + ' (' + format1(ep) + ' EP)';
								gesamtTeilnehmer1++;
								gesamtEps1 += Math.floor(ep);
							}
							i++;
						}
						while(text[i]!="angetreten:"){
							i++;
						}
						// Für den angegriffenen Stamm sind angetreten:
						i++;
						while(text[i].indexOf('<br>')==-1 && text[i]!=""){
							if(text[i].indexOf('<font')==-1){
								var ep = GM_getValue("EP_" + text[i].replace('color="red"><b>', '').replace('</b></font></b></font>', ''), "0");
								var j = 1;
								var userNameKomplett = text[i];
								while(ep=="0" && text[i+j].indexOf('<br>')==-1 && text[i+j]!=""){
									userNameKomplett = userNameKomplett + " " + text[i+j];
									ep = GM_getValue("EP_" + userNameKomplett.replace('color="red"><b>', '').replace('</b></font></b></font>', ''), "0");
									if(ep != "0"){
										i+=j;
										text[i] = userNameKomplett;
									} else {
										j++
									}
								}
								teilnehmer2[gesamtTeilnehmer2] = text[i] + ' (' + format1(ep) + ' EP)';
								gesamtTeilnehmer2++;
								gesamtEps2 += Math.floor(ep);
							}
							i++;
						}
						// Teilnehmer sortieren
						var n=0, z=0;
						while (n < teilnehmer1.length) {
							z=0;
							while (z < teilnehmer1.length - n - 1) {
								var epTn1 = parseInt(teilnehmer1[z].replace(/[\S\s]+\(/g, '').replace('.', '').replace(')', ''));
								var epTn2 = parseInt(teilnehmer1[z+1].replace(/[\S\s]+\(/g, '').replace('.', '').replace(')', ''));
								if (epTn1 < epTn2) {
									var hilfe = teilnehmer1[z];
									teilnehmer1[z] = teilnehmer1[z+1];
									teilnehmer1[z+1] = hilfe;
								}
								z++;
							}
							n++;
						}
						n=0, z=0;
						while (n < teilnehmer2.length) {
							z=0;
							while (z < teilnehmer2.length - n - 1) {
								var epTn1 = parseInt(teilnehmer2[z].replace(/[\S\s]+\(/g, '').replace('.', '').replace(')', ''));
								var epTn2 = parseInt(teilnehmer2[z+1].replace(/[\S\s]+\(/g, '').replace('.', '').replace(')', ''));
								if (epTn1 < epTn2) {
									var hilfe = teilnehmer2[z];
									teilnehmer2[z] = teilnehmer2[z+1];
									teilnehmer2[z+1] = hilfe;
								}
								z++;
							}
							n++;
						}
						// Text erzeugen
						neuerText += 'angetreten (' + gesamtTeilnehmer1 + ' Kämpfer, ' + format1(gesamtEps1) + ' EP): <br>';
						n = 1;
						for (var tn in teilnehmer1){
							neuerText += n++ + '. ' + teilnehmer1[tn].replace('color="red">', '<font color="red">') + '<br>';
						}
						neuerText += 'Für den angegriffenen Stamm sind angetreten (' + gesamtTeilnehmer2 + ' Kämpfer, ' + format1(gesamtEps2) + ' EP): <br>';
						n = 1;
						for (var tn in teilnehmer2){
							neuerText += n++ + '. ' + teilnehmer2[tn].replace('color="red">', '<font color="red">') + '<br>';
						}
						while(text[i]!=null){
							neuerText += text[i].replace('.<br>', '') + ' ';
							i++;
						}
						document.getElementsByTagName('td')[tdNr].innerHTML = neuerText;
					}
				} else if(document.getElementsByTagName('td')[tdNr].innerHTML.indexOf('wurde dabei verletzt. Der Stamm')!=-1){
					if(document.getElementsByTagName('td')[tdNr-1].innerHTML.indexOf('<a href="userinfo.php?userinfo=0">System</a>')!=-1){
						// Für Statistik
						var eigeneKills = 0;
						var eigeneAngriffe = 0;
						// Für Auswertung
						var kills = 0;
						var killers = new Array();
						var killedStaemme = new Array();
						var mkText = document.getElementsByTagName('td')[tdNr].innerHTML;
						mkText = mkText.replace(/wurde dabei verletzt\. Der Stamm/g, 'wurde dabei verletzt.<br>Der Stamm');
						var regEx = new RegExp('>(([^<]+?)(</b></font>)* \\(' + GM_getValue("KP_StammName", "NoStamm") + ', \\d+%\\) trifft auf [^<]+? \\([^<]+?, \\d+%\\) und fügt \\d+ Schaden zu.<br>)<font color="red">([^<]+?) \\(([^<]+?)\\) wurde dabei verletzt.<br>Der Stamm ' + GM_getValue("KP_StammName", "NoStamm") + ' erhält 50 Holz, 50 Stein, 20 Bronze');
						while(mkText.search(regEx) != -1){
							kills++;
							var killedStammSearch = mkText.match(regEx);
							if (killedStammSearch.length >=3){
								var killer = killedStammSearch[2];
								if(killer == GM_getValue("KP_UserName", "NoUser")){
									killer = '<font color=red><b>' + killer + '</b></font>';
									eigeneKills++;
								}
								if(killers[killer] != null){
									killers[killer]++;
								} else {
									killers[killer] = 1;
								}
								var killedStamm = killedStammSearch[5];
								if(killedStaemme[killedStamm] != null){
									killedStaemme[killedStamm]++;
								} else {
									killedStaemme[killedStamm] = 1;
								}
							}
							mkText = mkText.replace(regEx, '>$1<font color="lime">$4 ($5) wurde dabei verletzt.<br>Der Stamm ' + GM_getValue("KP_StammName", "NoStamm") + ' erhält 50 Holz, 50 Stein, 20 Bronze');
						}
						var verluste = 0;
						var killersGegner = new Array();
						var killingStaemme = new Array();
						var gekillte = new Array();
						var mkText2 = mkText;
						var regEx2 = new RegExp('^[\\S\\s]*?>([^<]+?) \\(([^<]+?), \\d+%\\) trifft auf (<font color="red"><b>)*([^<]+?)(</b></font>)* \\(' + GM_getValue("KP_StammName", "NoStamm") + ', \\d+%\\) und fügt \\d+ Schaden zu.<br><font color="red">(<font color="red"><b>)*[^<]+?(</b></font>)* \\(' + GM_getValue("KP_StammName", "NoStamm") + '\\) wurde dabei verletzt([\\S\\s]*)');
						while(mkText2.search(regEx2) != -1){
							verluste++;
							var killerGegner = mkText2.replace(regEx2, '$1 ($2)');
							if(killersGegner[killerGegner] != null){
								killersGegner[killerGegner]++;
							} else {
								killersGegner[killerGegner] = 1;
							}
							var killingStamm = mkText2.replace(regEx2, '$2');
							if(killingStaemme[killingStamm] != null){
								killingStaemme[killingStamm]++;
							} else {
								killingStaemme[killingStamm] = 1;
							}
							var gekillter = mkText2.replace(regEx2, '$4');
							if(gekillter == GM_getValue("KP_UserName", "NoUser")){
								gekillter = '<font color=red><b>' + gekillter + '</b></font>';
							}
							if(gekillte[gekillter] != null){
								gekillte[gekillter]++;
							} else {
								gekillte[gekillter] = 1;
							}
							mkText2 = mkText2.replace(regEx2, '$8');
						}
						var angriffe = 0;
						var angreifer = new Array();
						var angegriffene = new Array();
						var angegriffeneStaemme = new Array();
						var angriffeGegner = 0;
						var angreiferGegner = new Array();
						var angegriffeneGegner = new Array();
						var angreifendeStaemme = new Array();
						var regEx3 = new RegExp('^[\\S\\s]*?([^<>]+?)(</b></font>)* \\(' + GM_getValue("KP_StammName", "NoStamm") + ', \\d+%\\) trifft auf ([^<]+?) \\(([^<]+?), \\d+%\\) und fügt \\d+ Schaden zu.([\\S\\s]*)');
						var regEx4 = new RegExp('^[\\S\\s]*?([^<>]+?) \\(([^<]+?), \\d+%\\) trifft auf (<font color="red"><b>)*([^<]+?)(</b></font>)* \\(' + GM_getValue("KP_StammName", "NoStamm") + ', \\d+%\\) und fügt \\d+ Schaden zu.([\\S\\s]*)');
						mkText2 = mkText;
						while(mkText2.search(regEx3) != -1){
							angriffe++;
							var angreifer1 = mkText2.replace(regEx3, '$1');
							if(angreifer1 == GM_getValue("KP_UserName", "NoUser")){
								angreifer1 = '<font color=red><b>' + angreifer1 + '</b></font>';
								eigeneAngriffe++;
							}
							if(angreifer[angreifer1] != null){
								angreifer[angreifer1]++;
							} else {
								angreifer[angreifer1] = 1;
							}
							var angegriffener = mkText2.replace(regEx3, '$3 ($4)');
							if(angegriffene[angegriffener] != null){
								angegriffene[angegriffener]++;
							} else {
								angegriffene[angegriffener] = 1;
							}
							var angegriffenerStamm = mkText2.replace(regEx3, '$4');
							if(angegriffeneStaemme[angegriffenerStamm] != null){
								angegriffeneStaemme[angegriffenerStamm]++;
							} else {
								angegriffeneStaemme[angegriffenerStamm] = 1;
							}
							mkText2 = mkText2.replace(regEx3, '$5');
						}
						mkText2 = mkText;
						while(mkText2.search(regEx4) != -1){
							angriffeGegner++;
							var angreiferGegner1 = mkText2.replace(regEx4, '$1 ($2)');
							if(angreiferGegner[angreiferGegner1] != null){
								angreiferGegner[angreiferGegner1]++;
							} else {
								angreiferGegner[angreiferGegner1] = 1;
							}
							var angreifenderStamm = mkText2.replace(regEx4, '$2');
							if(angreifendeStaemme[angreifenderStamm] != null){
								angreifendeStaemme[angreifenderStamm]++;
							} else {
								angreifendeStaemme[angreifenderStamm] = 1;
							}
							var angegriffenerGegner = mkText2.replace(regEx4, '$4');
							if(angegriffenerGegner == GM_getValue("KP_UserName", "NoUser")){
								angegriffenerGegner = '<font color=red><b>' + angegriffenerGegner + '</b></font>';
							}
							if(angegriffeneGegner[angegriffenerGegner] != null){
								angegriffeneGegner[angegriffenerGegner]++;
							} else {
								angegriffeneGegner[angegriffenerGegner] = 1;
							}
							mkText2 = mkText2.replace(regEx4, '$6');
						}
						regEx = new RegExp(GM_getValue("KP_StammName", "NoStamm") + ', ','g');
						mkText = mkText.replace(regEx, '');
						mkText = mkText.replace(/ und fügt /g, '<br>und fügt ');
						mkText += '<br><br>---------- ERGEBNIS ----------';
						mkText += '<br><br>Kills gesamt: ' + kills;
						mkText += '<br><br>Killer: ';
						var killersSorted = getSortedKeys(killers);
						killersSorted.reverse();
						for (ks in killersSorted){
							mkText += '<br>' + killers[killersSorted[ks]] + ' x ' + killersSorted[ks];
						}
						mkText += '<br><br>Gekillte Stämme: ';
						var killedStaemmeSorted = getSortedKeys(killedStaemme);
						killedStaemmeSorted.reverse();
						for (ks in killedStaemmeSorted){
							mkText += '<br>' + killedStaemme[killedStaemmeSorted[ks]] + ' x ' + killedStaemmeSorted[ks];
						}
						mkText += '<br><br>Verluste gesamt: ' + verluste;
						mkText += '<br><br>Verluste: ';
						for (ks in gekillte){
							mkText += '<br>' + gekillte[ks] + ' x ' + ks;
						}
						mkText += '<br><br>Killer (Gegner): ';
						var killersGegnerSorted = getSortedKeys(killersGegner);
						killersGegnerSorted.reverse();
						for (ks in killersGegnerSorted){
							mkText += '<br>' + killersGegner[killersGegnerSorted[ks]] + ' x ' + killersGegnerSorted[ks];
						}
						mkText += '<br><br>Killende Stämme: ';
						var killingStaemmeSorted = getSortedKeys(killingStaemme);
						killingStaemmeSorted.reverse();
						for (ks in killingStaemmeSorted){
							mkText += '<br>' + killingStaemme[killingStaemmeSorted[ks]] + ' x ' + killingStaemmeSorted[ks];
						}
						mkText += '<br><br>Angriffe gesamt: ' + angriffe;
						mkText += '<br><br>Angreifer: ';
						var angreiferSorted = getSortedKeys(angreifer);
						angreiferSorted.reverse();
						for (ks in angreiferSorted){
							mkText += '<br>' + angreifer[angreiferSorted[ks]] + ' x ' + angreiferSorted[ks];
						}
						mkText += '<br><br>Angegriffene: ';
						var angegriffeneSorted = getSortedKeys(angegriffene);
						angegriffeneSorted.reverse();
						for (ks in angegriffeneSorted){
							mkText += '<br>' + angegriffene[angegriffeneSorted[ks]] + ' x ' + angegriffeneSorted[ks];
						}
						mkText += '<br><br>Angegriffene Stämme: ';
						var angegriffeneStaemmeSorted = getSortedKeys(angegriffeneStaemme);
						angegriffeneStaemmeSorted.reverse();
						for (ks in angegriffeneStaemmeSorted){
							mkText += '<br>' + angegriffeneStaemme[angegriffeneStaemmeSorted[ks]] + ' x ' + angegriffeneStaemmeSorted[ks];
						}
						mkText += '<br><br>Angriffe (Gegner) gesamt: ' + angriffeGegner;
						mkText += '<br><br>Angreifer (Gegner): ';
						var angreiferGegnerSorted = getSortedKeys(angreiferGegner);
						angreiferGegnerSorted.reverse();
						for (ks in angreiferGegnerSorted){
							mkText += '<br>' + angreiferGegner[angreiferGegnerSorted[ks]] + ' x ' + angreiferGegnerSorted[ks];
						}
						mkText += '<br><br>Angegriffene (vom Gegner): ';
						var angegriffeneGegnerSorted = getSortedKeys(angegriffeneGegner);
						angegriffeneGegnerSorted.reverse();
						for (ks in angegriffeneGegnerSorted){
							mkText += '<br>' + angegriffeneGegner[angegriffeneGegnerSorted[ks]] + ' x ' + angegriffeneGegnerSorted[ks];
						}
						mkText += '<br><br>Angreifende Stämme: ';
						var angreifendeStaemmeSorted = getSortedKeys(angreifendeStaemme);
						angreifendeStaemmeSorted.reverse();
						for (ks in angreifendeStaemmeSorted){
							mkText += '<br>' + angreifendeStaemme[angreifendeStaemmeSorted[ks]] + ' x ' + angreifendeStaemmeSorted[ks];
						}
						document.getElementsByTagName('td')[tdNr].innerHTML = mkText;
						// Für Statistik
						var mkZeit = document.getElementsByTagName('td')[tdNr-1].innerHTML.trim().replace(/[\S\s]+<br>/, '').replace('<font color="red">NEU</font>', '');
						var lastmkZeit = GM_getValue("LastMkZeit", "");
						if(mkZeit != lastmkZeit && mkText.indexOf(GM_getValue("KP_UserName", "NoUser")) != -1){
							saveAktion(mkZeit, eigeneKills + " Kills " + eigeneAngriffe + " Angriffe", false);
							GM_setValue("LastMkZeit", mkZeit);
						}
					}
				}
				// Userinfo statt Nachricht
				document.getElementsByTagName('td')[tdNr].innerHTML = document.getElementsByTagName('td')[tdNr].innerHTML.replace('message.php?empf=', 'userinfo.php?userinfo=');
				tdNr+=1;
			}
		}


		// Stammforum
		if(aktuelleUrl.indexOf('stammforum.topic.php?topicid=')!=-1){
			var topicId = aktuelleUrl.replace(/^.+topicid=(\d+).*$/g, '$1');
			var seite = '1';
			if(aktuelleUrl.indexOf('seite=')!=-1){
				seite = aktuelleUrl.replace(/^.+seite=(\d+).*$/g, '$1');
			}
			var maxSeite = '1';
			for(var aNr=0; aNr < document.getElementsByTagName('a').length; aNr++){
				var aHref = document.getElementsByTagName('a')[aNr].getAttribute('href');
				if(aHref.indexOf('stammforum.topic.php?topicid='+topicId+'&seite=')!=-1){
					maxSeite = aHref.replace(/^.+seite=(\d+).*$/g, '$1');
				}
			}
			if(seite >= maxSeite){
				var neusterBeitragString = '';
				for(var divNr=0; divNr < document.getElementsByTagName('div').length; divNr++){
					var divHtml = document.getElementsByTagName('div')[divNr].innerHTML;
					if(divHtml.search(/^\s*<i><a href="userinfo.php\?userinfo=\d+">.+?<\/a> \| \d+.\d+.\d+ um \d+:\d+ Uhr<\/i>\s*$/) != -1){
						neusterBeitragString = divHtml.replace(/^\s*<i><a href="userinfo.php\?userinfo=\d+">.+?<\/a> \| (\d+.\d+.\d+ um \d+:\d+ Uhr)<\/i>\s*$/,'$1').replace(/\s+/g,'');
					}
				}
				GM_setValue("KP_ReadTopic_" + topicId, neusterBeitragString);
			}
		} else if(aktuelleUrl.indexOf('stammforum.forum.php')!=-1){
			for(var tdNr=0; tdNr < document.getElementsByTagName('td').length; tdNr++){
				var tdElement = document.getElementsByTagName('td')[tdNr];
				if(tdElement.innerHTML.indexOf('stammforum.topic.php?topicid=')!=-1 && tdElement.getAttribute('class')=='beitrag'){
					var topicId = tdElement.innerHTML.replace(/^[\S\s]+topicid=(\d+)[\S\s]*$/, '$1');
					var seenTopics = GM_SuperValue.get("KP_SeenTopics", new Array());
					if(posOf(seenTopics, topicId) == -1){
						tdElement.innerHTML += ' <font color="red">*NEU*</font>';
						seenTopics.push(topicId);
						GM_SuperValue.set("KP_SeenTopics", seenTopics);
					} else {
						var neusterBeitragString = document.getElementsByTagName('td')[tdNr+3].innerHTML.replace(/\s+/g,'');
						if(GM_getValue("KP_ReadTopic_" + topicId, "") != neusterBeitragString){
							tdElement.innerHTML += ' <font color="yellow">*</font>';
						}
					}
				}
			}
		}


		// MK
		var mkStart = 17;
		var mkEnde = 19;
		if(isSommerzeit(serverzeitDate)){
			mkStart = 18;
			mkEnde = 20;
		}
		var magierkampfDate = new Date(serverzeitDate);
		magierkampfDate.setHours(mkStart);
		magierkampfDate.setMinutes(0);
		magierkampfDate.setSeconds(0);
		magierkampfDate.setMilliseconds(0);
		while(magierkampfDate.getDay()!=1){
			magierkampfDate.setTime(magierkampfDate.getTime()+86400000);
		}
		if(aktuelleUrl.indexOf('stamm.magierkampf.php')!=-1){
			// Beschreibung anpassen
			var mkBeschreibung = document.getElementsByTagName('td')[22].innerHTML.replace('16:00', mkStart).replace('18:00', mkEnde);
			var mkBeschreibung2 = mkBeschreibung.substring(mkBeschreibung.indexOf("Teilnehmer"));
			var anzTn = 0;
			while(mkBeschreibung2.indexOf("<tr>") < mkBeschreibung2.indexOf("</table>") && mkBeschreibung2.indexOf("<tr>") != -1){
				mkBeschreibung2 = mkBeschreibung2.substring(mkBeschreibung2.indexOf("<tr>")+4);
				anzTn++;
			}
			mkBeschreibung = mkBeschreibung.replace('Teilnehmer:', 'Teilnehmer: ' + anzTn);
			document.getElementsByTagName('td')[22].innerHTML = mkBeschreibung;

			// Teilnahme speichern
			if(aktuelleUrl.indexOf('stamm.magierkampf.php?action=anmelden')!=-1 || document.getElementsByTagName('td')[22].innerHTML.indexOf('vom Magierkampf austragen')!=-1){
				GM_setValue("MKTeilnahme", magierkampfDate.getTime().toString());
			}
		}


		// MK-Erinnerung
		var magierkampfTeilnahmeDate = new Date(Math.floor(GM_getValue("MKTeilnahme"), "0"));
		if(GM_getValue("KP_MKHinweis", "0") != "0"
		&& (magierkampfDate.getTime() != magierkampfTeilnahmeDate.getTime() && (serverzeitDate < magierkampfDate && magierkampfDate.getTime()/3600000 - serverzeitDate.getTime()/3600000 <= parseInt(GM_getValue("KP_MKHinweis", "12")))
		|| magierkampfDate.getTime() == magierkampfTeilnahmeDate.getTime() && (serverzeitDate < magierkampfDate && magierkampfDate.getTime()/60000 - serverzeitDate.getTime()/60000 <= 31))){
			var neuCenterTag = document.createElement('center');
			var neuCenterTagText = '<span style="color:yellow" id="MagierkampfSpan">Magierkampf beginnt demnächst!</span>';
			neuCenterTag.innerHTML = neuCenterTagText;
			document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
			centerTagNr++;
		} else {
			magierkampfDate = null;
		}


		// Ressis-Sichern-SK-Erinnerung
		var stammkampfDate = new Date(Math.floor(GM_getValue("NextSK"), "0"));
		var stammkampfTeilnahmeDate = new Date(Math.floor(GM_getValue("SKTeilnahme"), "0"));
		if(GM_getValue("KP_SKHinweis", "0") != "0" && stammkampfDate.getTime() == stammkampfTeilnahmeDate.getTime() && serverzeitDate.getTime() < stammkampfDate.getTime() && stammkampfDate.getTime()/3600000 - serverzeitDate.getTime()/3600000 <= parseInt(GM_getValue("KP_SKHinweis", "24"))){
			var eigeneEP = parseInt(GM_getValue("StammEP_" + GM_getValue("KP_StammName", "NoStamm"), "0"));
			var gegnerEP = parseInt(GM_getValue("StammEP_" + GM_getValue("NextSKGegner", "NoStamm"), "0"));
			var tdNrRess = tdNrRechtesMenue + 3;
			while(document.getElementsByTagName('td')[tdNrRess].innerHTML.indexOf('<img src="/static/rohstoff_icons/essen.gif" title="Nahrung">')==-1){
				tdNrRess++;
			}
			tdNrRess += 1;
			var eigeneNahrung = parseInt(document.getElementsByTagName('td')[tdNrRess].innerHTML.replace(/\./g,''));
			tdNrRess += 4;
			var eigeneGold = parseInt(document.getElementsByTagName('td')[tdNrRess].innerHTML.replace(/\./g,''));
			tdNrRess += 2;
			var eigeneHolz = parseInt(document.getElementsByTagName('td')[tdNrRess].innerHTML.replace(/\./g,''));
			tdNrRess += 2;
			var eigeneStein = parseInt(document.getElementsByTagName('td')[tdNrRess].innerHTML.replace(/\./g,''));
			var ressGesichert = false;
			if((eigeneNahrung < 20 || eigeneNahrung <= parseInt(GM_getValue("KP_NahrungRest", "0")) + parseInt(GM_getValue("KP_NahrungRund", "0")))
			&& (eigeneGold < 20 || eigeneGold <= parseInt(GM_getValue("KP_GoldRest", "0")) + parseInt(GM_getValue("KP_GoldRund", "0")))
			&& (eigeneHolz < 20 || eigeneHolz <= parseInt(GM_getValue("KP_HolzRest", "0")))
			&& (eigeneStein < 20 || eigeneStein <= parseInt(GM_getValue("KP_SteinRest", "0")))){
				ressGesichert = true;
			}
			var epDiff = Math.abs(gegnerEP - eigeneEP);
			if(gegnerEP >= eigeneEP && !ressGesichert){
				var neuCenterTag = document.createElement('center');
				var neuCenterTagText = '<span style="color:red" id="StammkampfRessSpan">Ressis sichern (Stammkampf-Gegner ist um ' + format1(epDiff) + ' EP stärker)!</span>';
				neuCenterTag.innerHTML = neuCenterTagText;
				document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
				centerTagNr++;
			} else if(gegnerEP >= 0.66*eigeneEP && !ressGesichert){
				var neuCenterTag = document.createElement('center');
				var neuCenterTagText = '<span style="color:yellow" id="StammkampfRessSpan">Evtl. Ressis sichern (Stammkampf-Gegner ist um ' + format1(epDiff) + ' EP schwächer)!</span>';
				neuCenterTag.innerHTML = neuCenterTagText;
				document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
				centerTagNr++;
			} else if(gegnerEP == 0 && !ressGesichert){
				var neuCenterTag = document.createElement('center');
				var neuCenterTagText = '<span style="color:yellow" id="StammkampfRessSpan">Evtl. Ressis sichern (Stärke des Stammkampf-Gegners wurde noch nicht ermittelt)!</span>';
				neuCenterTag.innerHTML = neuCenterTagText;
				document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
				centerTagNr++;
			}
		}


		// SK-Erinnerung
		if(GM_getValue("KP_SKHinweis", "0") != "0"
		&& (stammkampfDate.getTime() != stammkampfTeilnahmeDate.getTime() && (serverzeitDate < stammkampfDate && stammkampfDate.getTime()/3600000 - serverzeitDate.getTime()/3600000 <= parseInt(GM_getValue("KP_SKHinweis", "24")))
		|| stammkampfDate.getTime() == stammkampfTeilnahmeDate.getTime() && (serverzeitDate < stammkampfDate && stammkampfDate.getTime()/60000 - serverzeitDate.getTime()/60000 <= 31))){
			var neuCenterTag = document.createElement('center');
			var neuCenterTagText = '<span style="color:yellow" id="StammkampfSpan">Stammkampf beginnt demnächst!</span>';
			neuCenterTag.innerHTML = neuCenterTagText;
			document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
			centerTagNr++;
		} else {
			stammkampfDate = null;
		}


		// TK-Erinnerung
		var talkampfDate = new Date(serverzeitDate);
		talkampfDate.setHours(talkampfEnde);
		talkampfDate.setMinutes(0);
		talkampfDate.setSeconds(0);
		talkampfDate.setMilliseconds(0);
		if(GM_getValue("KP_TKHinweis", false) == true && serverzeitDate < talkampfDate && serverzeitDate.getHours() >= 12 && (serverzeitDate.getMinutes() >= 5 || serverzeitDate.getHours() > 12)){
			var neuCenterTag = document.createElement('center');
			var neuCenterTagText = '<span style="color:yellow" id="TalkampfSpan">Talkampf läuft gerade!</span>';
			neuCenterTag.innerHTML = neuCenterTagText;
			document.getElementsByTagName('td')[22].insertBefore(neuCenterTag, document.getElementsByTagName('td')[22].firstChild.nextSibling.nextSibling);
			centerTagNr++;
		} else {
			talkampfDate = null;
		}


		// Arbeit (Focus, Waffen-Warnung, etc.)
		if(aktuelleUrl.indexOf('holzfaeller.php')!=-1 || aktuelleUrl.indexOf('koehlern.php')!=-1 || aktuelleUrl.indexOf('jagd.php')!=-1 || aktuelleUrl.indexOf('wasser2.php')!=-1 || aktuelleUrl.indexOf('steinmetz.php')!=-1 || aktuelleUrl.indexOf('kupferding.php')!=-1 || aktuelleUrl.indexOf('wasser.php')!=-1 || aktuelleUrl.indexOf('bronze.php')!=-1 || aktuelleUrl.indexOf('schamane.php')!=-1 || aktuelleUrl.indexOf('zinnding.php')!=-1 || aktuelleUrl.indexOf('waffenschmied.php')!=-1 || aktuelleUrl.indexOf('werkzeug.php')!=-1){
			if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Zufallscode leider nicht richtig abgeschrieben') != -1){
				alert('FEHLER! Captcha war falsch!');
				document.location.href=aktuelleUrl;
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('zu müde') != -1){
				alert('FEHLER! Du bist zu müde und solltest einen Wachtrank trinken!');
				document.location.href='http://szs.looki.de/inventar.php';
			} else if(document.getElementsByName('zufallscode')[0] != null){
				// Waffenwarnung
				if(aktuelleUrl.indexOf('holzfaeller.php')!=-1 || aktuelleUrl.indexOf('koehlern.php')!=-1 || aktuelleUrl.indexOf('jagd.php')!=-1 || aktuelleUrl.indexOf('wasser2.php')!=-1 || aktuelleUrl.indexOf('steinmetz.php')!=-1 || aktuelleUrl.indexOf('wasser.php')!=-1){
					if(hand.indexOf('nichts') == -1){
						alert('ACHTUNG! Du hast eine Waffe oder falsches Werkzeug in der Hand!');
					}
				} else if(aktuelleUrl.indexOf('zinnding.php')!=-1){
					if(hand.indexOf('nichts') == -1 && hand.indexOf('Zinn') == -1){
						alert('ACHTUNG! Du hast eine Waffe oder falsches Werkzeug in der Hand!');
					}
					if(GM_getValue("Zinn-Schaber", false) == true && GM_getValue("Hand", "Unbekannt").indexOf('Zinn-Schaber') == -1){
						alert('ACHTUNG! Du hast deinen Zinn-Schaber vergessen!');
					} else if(GM_getValue("Zinn-Keil", false) == true && GM_getValue("Hand", "Unbekannt").indexOf('Zinn-Keil') == -1){
						alert('ACHTUNG! Du hast dein Zinn-Keil vergessen!');
					}
				} else if(aktuelleUrl.indexOf('kupferding.php')!=-1){
					if(hand.indexOf('nichts') == -1 && hand.indexOf('Kupfer') == -1){
						alert('ACHTUNG! Du hast eine Waffe oder falsches Werkzeug in der Hand!');
					}
					if(GM_getValue("Kupfer-Hacke", false) == true && GM_getValue("Hand", "Unbekannt").indexOf('Kupfer-Hacke') == -1){
						alert('ACHTUNG! Du hast deine Kupfer-Hacke vergessen!');
					} else if(GM_getValue("Kupfer-Schaber", false) == true && GM_getValue("Hand", "Unbekannt").indexOf('Kupfer-Schaber') == -1){
						alert('ACHTUNG! Du hast deinen Kupfer-Schaber vergessen!');
					} else if(GM_getValue("Kupfer-Keil", false) == true && GM_getValue("Hand", "Unbekannt").indexOf('Kupfer-Keil') == -1){
						alert('ACHTUNG! Du hast dein Kupfer-Keil vergessen!');
					}
				}
				// Bevorstehender SK oder MK
				var arbeitsAnkunftDate = new Date(ankunftszeitDate);
				arbeitsAnkunftDate.setMinutes(parseInt(serverzeitMinuten)+32);
				var skTime = Math.floor(GM_getValue("NextSK", "0"));
				var diff = Math.floor(skTime/60000 - serverzeitDate.getTime()/60000);
				if(diff >= -1 && diff <= 31){
					alert('ACHTUNG! Du verpasst einen Stammkampf!');
				}
				if(arbeitsAnkunftDate.getDay()==1 && ((arbeitsAnkunftDate.getHours()==mkStart&&arbeitsAnkunftDate.getMinutes()<=30) || (arbeitsAnkunftDate.getHours()==mkStart-1&&arbeitsAnkunftDate.getMinutes()>=59))){
					alert('ACHTUNG! Du verpasst den Magierkampf!');
				}
				// Fehlender Ring
				if(aktuelleUrl.indexOf('jagd.php')!=-1){
					if(GM_getValue("Jagdring", false) == true && GM_getValue("Finger", "Unbekannt").indexOf('Jagdring') == -1){
						alert('ACHTUNG! Du hast deinen Jagdring vergessen!');
					}
				} else if(aktuelleUrl.indexOf('wasser2.php')!=-1 || aktuelleUrl.indexOf('wasser.php')!=-1){
					if(GM_getValue("Wasserring", false) == true && GM_getValue("Finger", "Unbekannt").indexOf('Wasserring') == -1){
						alert('ACHTUNG! Du hast deinen Wasserring vergessen!');
					}
				}
				// Fehlendes Arbeitsopfer / Drachenblutartefakt
				if((arbeitsopferDate == null || arbeitsopferDate.getTime()<(ankunftszeitDate.getTime()+1860000)) && (drachenblutTime == 0 || drachenblutTime<(ankunftszeitDate.getTime()+1860000))){
					document.getElementsByTagName('td')[22].innerHTML += '<font color="yellow">ACHTUNG! Du könntest dich verletzen, da weder ein aktives Arbeitsopfer noch ein gültiges Artefakt des Drachenbluts hast.</font>';
				}
				// Focus
				document.getElementsByName('zufallscode')[0].focus();
			} else if(document.getElementsByTagName('td')[22].innerHTML.indexOf('Du bist jetzt') != -1 || document.getElementsByTagName('td')[22].innerHTML.indexOf('Du stellst jetzt') != -1 || document.getElementsByTagName('td')[22].innerHTML.indexOf('Du machst dich auf') != -1 || document.getElementsByTagName('td')[22].innerHTML.search(/Du bist für ca.\s*\d+ Minuten unterwegs/) != -1){
				remindVar=true;
				// Ankunftszeit setzen
				if(aktuelleUrl.indexOf('holzfaeller.php')!=-1){
					GM_setValue("Arbeit", "beim Holzfällen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('koehlern.php')!=-1){
					GM_setValue("Arbeit", "beim Köhlern");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('steinmetz.php')!=-1){
					GM_setValue("Arbeit", "beim Steine metzen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('kupferding.php')!=-1){
					GM_setValue("Arbeit", "beim Kupfer abbauen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('schamane.php')!=-1){
					GM_setValue("Arbeit", "beim Trank brauen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('zinnding.php')!=-1){
					GM_setValue("Arbeit", "beim Zinn abbauen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('jagd.php')!=-1){
					GM_setValue("Arbeit", "beim Jagen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('wasser2.php')!=-1 || aktuelleUrl.indexOf('wasser.php')!=-1){
					GM_setValue("Arbeit", "beim Wassersuchen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('bronze.php')!=-1){
					GM_setValue("Arbeit", "beim Bronze herstellen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('waffenschmied.php')!=-1){
					GM_setValue("Arbeit", "beim Waffe bauen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('werkzeug.php')!=-1){
					GM_setValue("Arbeit", "beim Werkzeug bauen");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				} else if(aktuelleUrl.indexOf('kampf.php')!=-1){
					GM_setValue("Arbeit", "im Einzelkampf");
					ankunftszeitDate.setMinutes(parseInt(serverzeitMinuten)+31);
					GM_setValue("Ankunftszeit", ankunftszeitDate.getTime().toString());
				}
				// Zu News wechseln
				document.location.href='http://szs.looki.de/news.php';
			}
		}


		// Restzeit, Serverzeit, Opferzeit, Reminder
		function countdown() {
			var startDatum=new Date((new Date).getTime()-abwServerzeit);

			// Restzeit
			var count = Math.floor(ankunftszeitDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
			var nochUnterwegs = false;
			if(count<0){count=0;}
			if(count>10){nochUnterwegs=true;}
			var seconds = count%60;
			count = Math.floor(count/60);
			var minutes = count%60;
			count = Math.floor(count/60);
			var hours = count%24;
			if(minutes == 0 && hours == 0){
				document.getElementsByTagName('td')[23].innerHTML = nochUnterwegsHtml.replace(/(\s*c*a*\.*\s*\d+ Minuten)|(wenige Sekunden)/, ' ' + seconds + ' Sekunden (bis ' + format2(ankunftszeitDate.getHours()) + ':' + format2(ankunftszeitDate.getMinutes()) + ' Uhr)').replace('auf Arbeit', GM_getValue("Arbeit", "auf Arbeit")).replace('unterwegs', GM_getValue("Arbeit", "unterwegs")).replace('im Kampf', GM_getValue("Arbeit", "im Kampf"));
			} else if(hours == 0){
				document.getElementsByTagName('td')[23].innerHTML = nochUnterwegsHtml.replace(/(\s*c*a*\.*\s*\d+ Minuten)|(wenige Sekunden)/, ' ' + minutes + ':' + format2(seconds) + ' Minuten (bis ' + format2(ankunftszeitDate.getHours()) + ':' + format2(ankunftszeitDate.getMinutes()) + ' Uhr)').replace('auf Arbeit', GM_getValue("Arbeit", "auf Arbeit")).replace('unterwegs', GM_getValue("Arbeit", "unterwegs")).replace('im Kampf', GM_getValue("Arbeit", "im Kampf"));
			} else {
				document.getElementsByTagName('td')[23].innerHTML = nochUnterwegsHtml.replace(/(\s*c*a*\.*\s*\d+ Minuten)|(wenige Sekunden)/, ' ' + hours + ':' + format2(minutes) + ':' + format2(seconds) + ' Stunden (bis ' + format2(ankunftszeitDate.getHours()) + ':' + format2(ankunftszeitDate.getMinutes()) + ' Uhr)').replace('auf Arbeit', GM_getValue("Arbeit", "auf Arbeit")).replace('unterwegs', GM_getValue("Arbeit", "unterwegs")).replace('im Kampf', GM_getValue("Arbeit", "im Kampf"));
			}

			// Serverzeit
			var servStd = startDatum.getHours();
			var servMin = startDatum.getMinutes();
			var servSek = startDatum.getSeconds();
			document.getElementsByTagName('center')[centerTagNr].innerHTML = 'Serverzeit: ' + format2(servStd) + ':' + format2(servMin) + ':' + format2(servSek) + ' Uhr';
			if(premium){
				document.getElementById('ServerzeitSpan').innerHTML = format2(servStd) + ':' + format2(servMin) + ':' + format2(servSek) + ' Uhr';
			}

			// Artefaktzeit
			if(drachenblutTime != 0){
				count = Math.floor(drachenblutTime/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'DrachenblutSpan');
			}
			if(glueckTime != 0){
				count = Math.floor(glueckTime/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'GlueckSpan');
			}
			if(meisterschmiedTime != 0){
				count = Math.floor(meisterschmiedTime/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'MeisterschmiedSpan');
			}

			// Opferzeit
			if(waffenopferDate != null){
				count = Math.floor(waffenopferDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'WaffenopferSpan');
			}
			if(arbeitsopferDate != null){
				count = Math.floor(arbeitsopferDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'ArbeitsopferSpan');
			}
			if(ringopferDate != null){
				count = Math.floor(ringopferDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printOpferzeit(count, 'RingopferSpan');
			}

			// Talkampfzeit
			if(talkampfDate != null){
				var tkAnmeldeZeit = Math.floor(GM_getValue("TKTeilnahme", "0")/3600000);
				var tkAnfangDate = new Date(talkampfDate);
				tkAnfangDate.setHours(12);
				var tkAnfangZeit = Math.floor(tkAnfangDate.getTime()/3600000);
				var angemeldet = false;
				if((tkAnfangZeit-tkAnmeldeZeit)<=22 || ((tkAnfangZeit-tkAnmeldeZeit)<=23 && !isSommerzeit(startDatum))){
					angemeldet = true;
				}
				count = Math.floor(talkampfDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printTalkampfzeit(count, 'TalkampfSpan', angemeldet);
			}

			// Stammkampfzeit
			if(stammkampfDate != null){
				var angemeldet = false;
				if(stammkampfDate.getTime() == stammkampfTeilnahmeDate.getTime()){
					angemeldet = true;
				}
				count = Math.floor(stammkampfDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printStammkampfzeit(count, 'StammkampfSpan', angemeldet);
			}

			// Magierkampfzeit
			if(magierkampfDate != null){
				var angemeldet = false;
				if(magierkampfDate.getTime() == magierkampfTeilnahmeDate.getTime()){
					angemeldet = true;
				}
				count = Math.floor(magierkampfDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
				printMagierkampfzeit(count, 'MagierkampfSpan', angemeldet);
			}

			// Müdigkeit
			var muedeDate = new Date(startDatum);
			if(muedeDate.getMinutes()%10 == 0){
				muedeDate.setMinutes(muedeDate.getMinutes()+10);
			}
			muedeDate.setSeconds(0);
			muedeDate.setMilliseconds(0);
			while(muedeDate.getMinutes()%10 != 0){
				muedeDate.setMinutes(muedeDate.getMinutes()+1);
			}
			count = Math.floor(muedeDate.getTime()/1000) - Math.floor(startDatum.getTime()/1000);
			updateMuedigkeit(count, muedigkeit, nochUnterwegs);

			// Reminder
			if(startDatum >= ankunftszeitDate && GM_getValue("KP_Reminder", false) && remindVar){
				// #Kommentar
				au.play();
				alert("Du bist im Steinzeitspiel wieder verfügbar!");
				//alert("Erinnerung");
				remindVar = false;
			}

			setTimeout(countdown,500);
		}
		countdown();


	}


}


function format1(n) {
	var nStr = Math.floor(n).toString();
	for (i=nStr.length-3; i>0; i-=3){
		nStr = nStr.substring(0,i) + "." + nStr.substring(i);
	}
	return nStr;
}


function format2(n) {
	s = "";
	if (n < 10){
		s += "0";
	}
	return (s + n).toString();
}


function getSortedKeys(obj) {
	var keys = []; for(var key in obj) keys.push(key);
	return keys.sort(function(a,b){return obj[a]-obj[b]});
}


function posOf(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == obj) {
			return i;
		}
	}
	return -1;
}


function isSommerzeit(d) {
	return (((new Date(1).getTimezoneOffset() / 60)==(d.getTimezoneOffset() / 60))?false:true);
}


function ermittleWetterDate(d) {
	var wetterDate = new Date(d);
	var umstellung = 6;
	if(isSommerzeit(wetterDate)){
		umstellung = 7;
	}
	if(wetterDate.getHours() < umstellung || (wetterDate.getHours() == umstellung && wetterDate.getMinutes < 21)){
		wetterDate.setDate(wetterDate.getDate()-1);
	}
	wetterDate.setHours(0);
	wetterDate.setMinutes(0);
	wetterDate.setSeconds(0);
	wetterDate.setMilliseconds(0);
	return wetterDate;
}


function moveEpStatsMonat(){
	var userArray = GM_SuperValue.get("KP_Stat_Stammuser", new Array());
	if(userArray.length == 0){
		userArray.push(GM_getValue("KP_UserName", "NoName"));
	}
	for(var i=0; i<userArray.length; i++){
		var user = userArray[i];
		GM_setValue("KP_Stat_Vorvorletzter_Monat_EP_" + user, GM_getValue("KP_Stat_Vorletzter_Monat_EP_" + user, 0));
		GM_setValue("KP_Stat_Vorletzter_Monat_EP_" + user, GM_getValue("KP_Stat_Letzter_Monat_EP_" + user, 0));
		GM_setValue("KP_Stat_Letzter_Monat_EP_" + user, GM_getValue("KP_Stat_Aktueller_Monat_EP_" + user, 0));
	}
	userArray = GM_SuperValue.get("KP_Stat_StammuserWeg", new Array());
	for(var i=0; i<userArray.length; i++){
		var user = userArray[i];
		GM_setValue("KP_Stat_Vorvorletzter_Monat_EP_" + user, GM_getValue("KP_Stat_Vorletzter_Monat_EP_" + user, 0));
		GM_setValue("KP_Stat_Vorletzter_Monat_EP_" + user, GM_getValue("KP_Stat_Letzter_Monat_EP_" + user, 0));
		GM_setValue("KP_Stat_Letzter_Monat_EP_" + user, GM_getValue("KP_Stat_Aktueller_Monat_EP_" + user, 0));
	}
}


function moveEpStatsJahr(){
	var userArray = GM_SuperValue.get("KP_Stat_Stammuser", new Array());
	if(userArray.length == 0){
		userArray.push(GM_getValue("KP_UserName", "NoName"));
	}
	for(var i=0; i<userArray.length; i++){
		var user = userArray[i];
		GM_setValue("KP_Stat_Vorvorletztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Vorletztes_Jahr_EP_" + user, 0));
		GM_setValue("KP_Stat_Vorletztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Letztes_Jahr_EP_" + user, 0));
		GM_setValue("KP_Stat_Letztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Aktuelles_Jahr_EP_" + user, 0));
	}
	userArray = GM_SuperValue.get("KP_Stat_StammuserWeg", new Array());
	for(var i=0; i<userArray.length; i++){
		var user = userArray[i];
		GM_setValue("KP_Stat_Vorvorletztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Vorletztes_Jahr_EP_" + user, 0));
		GM_setValue("KP_Stat_Vorletztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Letztes_Jahr_EP_" + user, 0));
		GM_setValue("KP_Stat_Letztes_Jahr_EP_" + user, GM_getValue("KP_Stat_Aktuelles_Jahr_EP_" + user, 0));
	}
}


function moveAktion(bez1, bez2){
	GM_setValue("KP_Stat_" + bez2 + "_KnochenMenge", GM_getValue("KP_Stat_" + bez1 + "_KnochenMenge", 0));
	GM_setValue("KP_Stat_" + bez2 + "_KnochenMogl", GM_getValue("KP_Stat_" + bez1 + "_KnochenMogl", 0));
	GM_setValue("KP_Stat_" + bez2 + "_GoldFundMenge", GM_getValue("KP_Stat_" + bez1 + "_GoldFundMenge", 0));
	GM_setValue("KP_Stat_" + bez2 + "_WasserFundMenge", GM_getValue("KP_Stat_" + bez1 + "_WasserFundMenge", 0));
	GM_setValue("KP_Stat_" + bez2 + "_RingMenge", GM_getValue("KP_Stat_" + bez1 + "_RingMenge", 0));
	GM_setValue("KP_Stat_" + bez2 + "_RingMogl", GM_getValue("KP_Stat_" + bez1 + "_RingMogl", 0));
	GM_setValue("KP_Stat_" + bez2 + "_EkGewonnenAnz", GM_getValue("KP_Stat_" + bez1 + "_EkGewonnenAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_EkVerlorenAnz", GM_getValue("KP_Stat_" + bez1 + "_EkVerlorenAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_EkAnz", GM_getValue("KP_Stat_" + bez1 + "_EkAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_TkGewonnenAnz", GM_getValue("KP_Stat_" + bez1 + "_TkGewonnenAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_TkVerlorenR2Anz", GM_getValue("KP_Stat_" + bez1 + "_TkVerlorenR2Anz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_TkVerlorenR1Anz", GM_getValue("KP_Stat_" + bez1 + "_TkVerlorenR1Anz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_TkAnz", GM_getValue("KP_Stat_" + bez1 + "_TkAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_SkGewonnenAnz", GM_getValue("KP_Stat_" + bez1 + "_SkGewonnenAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_SkVerlorenAnz", GM_getValue("KP_Stat_" + bez1 + "_SkVerlorenAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_SkAnz", GM_getValue("KP_Stat_" + bez1 + "_SkAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_MkKillsAnz", GM_getValue("KP_Stat_" + bez1 + "_MkKillsAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_MkAngriffeAnz", GM_getValue("KP_Stat_" + bez1 + "_MkAngriffeAnz", 0));
	GM_setValue("KP_Stat_" + bez2 + "_MkAnz", GM_getValue("KP_Stat_" + bez1 + "_MkAnz", 0));
	var wetterArray = new Array("", "Sonne", "Bewoelkt", "Nebel", "Regen", "Schnee");
	for(var i=0; i<wetterArray.length; i++){
		var wetter = wetterArray[i];
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitHolz" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitHolz" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitHolz" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitHolz" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitKohle" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitKohle" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitKohle" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitKohle" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitSteine" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitSteine" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitSteine" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitSteine" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitKupfer" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitKupfer" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitKupfer" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitKupfer" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitZinn" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitZinn" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitZinn" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitZinn" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitWasser" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitWasser" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitWasser" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitWasser" + wetter + "Menge", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitJagen" + wetter + "Anz", GM_getValue("KP_Stat_" + bez1 + "_ArbeitJagen" + wetter + "Anz", 0));
		GM_setValue("KP_Stat_" + bez2 + "_ArbeitJagen" + wetter + "Menge", GM_getValue("KP_Stat_" + bez1 + "_ArbeitJagen" + wetter + "Menge", 0));
	}
	var tierArray = new Array("Riesenflußpferd", "Mammut", "Mastodon", "Riesenfaultier", "Riesenbär", "Raubwaran", "Riesenschildkröte", "Alligator", "Wollhaariges_Nashorn", "Ur", "Gorilla", "Säbelzahntiger", "Berglöwe", "Höhlenbär", "Rentier", "Elch", "Schneeleopard", "Pferd", "Steppenwisent", "Büffel", "Auerochse", "Höhlenlöwe", "Bison", "Fleckenhyäne", "Riesenhirsch", "Goldschakal", "Luchs", "Reh", "Tapir", "Pekari", "Gazelle", "Antilope", "Eisfuchs", "Steppenkatze", "Waschbär", "Wildkatze", "Kaiman", "Ameisenbär", "Wolf", "Vogel", "Opossum", "Trappe", "Fischotter", "Gürteltier", "Feldhase", "Kaninchen", "Marder", "Biber", "Wiesel", "Flughund", "Fisch", "Ratte", "Hummer", "Wachtel", "Hamster", "Feldhamster", "Maus", "Krebs", "Eidechse", "Eichhörnchen");
	for(var i=0; i<tierArray.length; i++){
		var tier = tierArray[i];
		GM_setValue("KP_Stat_" + bez2 + "_Jagd_" + tier, GM_getValue("KP_Stat_" + bez1 + "_Jagd_" + tier, 0));
	}
	var osternArray = new Array("5Nahrung", "5Gold");
	for(var i=0; i<osternArray.length; i++){
		var ostern = osternArray[i];
		GM_setValue("KP_Stat_" + bez2 + "_EventOstern_" + ostern + "_Anz", GM_getValue("KP_Stat_" + bez1 + "_EventOstern_" + ostern + "_Anz", 0));
	}
	GM_setValue("KP_Stat_" + bez2 + "_OsternMogl", GM_getValue("KP_Stat_" + bez1 + "_OsternMogl", 0));
	var halloweenArray = new Array("5Nahrung", "7Nahrung", "3Gold", "Unbekannt");
	for(var i=0; i<halloweenArray.length; i++){
		var halloween = halloweenArray[i];
		GM_setValue("KP_Stat_" + bez2 + "_EventHalloween_" + halloween + "_Anz", GM_getValue("KP_Stat_" + bez1 + "_EventHalloween_" + halloween + "_Anz", 0));
	}
	GM_setValue("KP_Stat_" + bez2 + "_HalloweenMogl", GM_getValue("KP_Stat_" + bez1 + "_HalloweenMogl", 0));
	var weihnachtArray = new Array("Knecht Ruprecht", "Mann in roten Kleidern", "Rentier", "Schneemann");
	for(var i=0; i<weihnachtArray.length; i++){
		var weihnacht = weihnachtArray[i];
		GM_setValue("KP_Stat_" + bez2 + "_EventWeihnacht_" + weihnacht + "_Anz", GM_getValue("KP_Stat_" + bez1 + "_EventWeihnacht_" + weihnacht + "_Anz", 0));
	}
	GM_setValue("KP_Stat_" + bez2 + "_WeihnachtMogl", GM_getValue("KP_Stat_" + bez1 + "_WeihnachtMogl", 0));
}


function resetStats(statArt){
	GM_deleteValue("KP_Stat_" + statArt + "_KnochenMenge");
	GM_deleteValue("KP_Stat_" + statArt + "_KnochenMogl");
	GM_deleteValue("KP_Stat_" + statArt + "_GoldFundMenge");
	GM_deleteValue("KP_Stat_" + statArt + "_WasserFundMenge");
	GM_deleteValue("KP_Stat_" + statArt + "_RingMenge");
	GM_deleteValue("KP_Stat_" + statArt + "_RingMogl");
	GM_deleteValue("KP_Stat_" + statArt + "_EkGewonnenAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_EkVerlorenAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_EkAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_TkGewonnenAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_TkVerlorenR2Anz");
	GM_deleteValue("KP_Stat_" + statArt + "_TkVerlorenR1Anz");
	GM_deleteValue("KP_Stat_" + statArt + "_TkAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_SkGewonnenAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_SkVerlorenAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_SkAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_MkKillsAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_MkAngriffeAnz");
	GM_deleteValue("KP_Stat_" + statArt + "_MkAnz");
	var wetterArray = new Array("", "Sonne", "Bewoelkt", "Nebel", "Regen", "Schnee");
	for(var i=0; i<wetterArray.length; i++){
		var wetter = wetterArray[i];
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetter + "Menge");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetter + "Anz");
		GM_deleteValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetter + "Menge");
	}
	var tierArray = new Array("Riesenflußpferd", "Mammut", "Mastodon", "Riesenfaultier", "Riesenbär", "Raubwaran", "Riesenschildkröte", "Alligator", "Wollhaariges_Nashorn", "Ur", "Gorilla", "Säbelzahntiger", "Berglöwe", "Höhlenbär", "Rentier", "Elch", "Schneeleopard", "Pferd", "Steppenwisent", "Büffel", "Auerochse", "Höhlenlöwe", "Bison", "Fleckenhyäne", "Riesenhirsch", "Goldschakal", "Luchs", "Reh", "Tapir", "Pekari", "Gazelle", "Antilope", "Eisfuchs", "Steppenkatze", "Waschbär", "Wildkatze", "Kaiman", "Ameisenbär", "Wolf", "Vogel", "Opossum", "Trappe", "Fischotter", "Gürteltier", "Feldhase", "Kaninchen", "Marder", "Biber", "Wiesel", "Flughund", "Fisch", "Ratte", "Hummer", "Wachtel", "Hamster", "Feldhamster", "Maus", "Krebs", "Eidechse", "Eichhörnchen");
	for(var i=0; i<tierArray.length; i++){
		var tier = tierArray[i];
		GM_deleteValue("KP_Stat_" + statArt + "_Jagd_" + tier);
	}
	var osternArray = new Array("5Nahrung", "5Gold");
	for(var i=0; i<osternArray.length; i++){
		var ostern = osternArray[i];
		GM_deleteValue("KP_Stat_" + statArt + "_EventOstern_" + ostern + "_Anz");
	}
	GM_deleteValue("KP_Stat_" + statArt + "_OsternMogl");
	var halloweenArray = new Array("5Nahrung", "7Nahrung", "3Gold", "Unbekannt");
	for(var i=0; i<halloweenArray.length; i++){
		var halloween = halloweenArray[i];
		GM_deleteValue("KP_Stat_" + statArt + "_EventHalloween_" + halloween + "_Anz");
	}
	GM_deleteValue("KP_Stat_" + statArt + "_HalloweenMogl");
	var weihnachtArray = new Array("Knecht Ruprecht", "Mann in roten Kleidern", "Rentier", "Schneemann");
	for(var i=0; i<weihnachtArray.length; i++){
		var weihnacht = weihnachtArray[i];
		GM_deleteValue("KP_Stat_" + statArt + "_EventWeihnacht_" + weihnacht + "_Anz");
	}
	GM_deleteValue("KP_Stat_" + statArt + "_WeihnachtMogl");
}


function saveAktion(dateString, ereignisString, nurWetter){
	var aktuellDate = new Date();
	if(GM_getValue("KP_Stat_Aktueller_Monat", -1) != aktuellDate.getMonth()){
		moveAktion("Letzter_Monat", "Vorletzter_Monat");
		moveAktion("Aktueller_Monat", "Letzter_Monat");
		resetStats("Aktueller_Monat");
		GM_setValue("KP_Stat_Aktueller_Monat", aktuellDate.getMonth());
	}
	if(GM_getValue("KP_Stat_Aktuelles_Jahr", -1) != aktuellDate.getFullYear()){
		moveAktion("Letztes_Jahr", "Vorletztes_Jahr");
		moveAktion("Aktuelles_Jahr", "Letztes_Jahr");
		resetStats("Aktuelles_Jahr");
		GM_setValue("KP_Stat_Aktuelles_Jahr", aktuellDate.getFullYear());
	}

	var ereignisDate = new Date(dateString.substring(6,10), parseInt(dateString.substring(3,5))-1, dateString.substring(0,2), dateString.substring(13,15), dateString.substring(16), 0);
	var statArten = new Array("Gesamt");
	if(ereignisDate.getMonth() == aktuellDate.getMonth()){
		statArten.push("Aktueller_Monat");
	} else {
		statArten.push("Letzter_Monat");
	}
	if(ereignisDate.getFullYear() == aktuellDate.getFullYear()){
		statArten.push("Aktuelles_Jahr");
	} else {
		statArten.push("Letztes_Jahr");
	}

	var eventString = null;
	if(ereignisDate.getMonth()==3 && ereignisDate.getDate()>=6 && ereignisDate.getDate()<=13){
		eventString = "Ostern";
	} else if((ereignisDate.getMonth()==9 && ereignisDate.getDate()>=22) || (ereignisDate.getMonth()==10 && ereignisDate.getDate()<=7)){
		eventString = "Halloween";
	} else if(ereignisDate.getMonth()==11 && ereignisDate.getDate()>=15 && ereignisDate.getDate()<=26){
		eventString = "Weihnacht";
	}

	var wetterDate = ermittleWetterDate(ereignisDate);
	var wetterDateString = format2(wetterDate.getDate()) + "." + format2(wetterDate.getMonth()+1) + "." + wetterDate.getFullYear();
	var wetterString = '';
	var wetterArray = GM_SuperValue.get("KP_Wetter", new Array());
	for(var i in wetterArray){
		if(wetterArray[i]!=null && wetterArray[i].indexOf(wetterDateString)!=-1){
			wetterString = wetterArray[i].substring(13);
			break;
		}
	}

	var regExNachrichtVerschickt = new RegExp('^<div style="width:400px;overflow:auto;">\\s*Du hast an .+? diese Nachricht geschrieben:<br><i>[\\S\\s]*</i>\\s*</div>$');
	var regExNachrichtErhalten = new RegExp('^[\\S\\s]+>als Freund hinzufügen</a></i>\\s*</div>$');
	var regExArbeitHolz = new RegExp('^<font color="lime">Du warst auf Arbeit und hast <b>(\\d+)</b> Holzstücke mit nach\\s*Hause gebracht.</font>$');
	var regExArbeitKohle = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast (\\d+) Kohle hergestellt.</font>\\s*</div>$');
	var regExArbeitSteine = new RegExp('^<font color="lime">Du warst auf Arbeit und hast <b>(\\d+)</b> Steine mit nach\\s*Hause gebracht.</font>$');
	var regExArbeitKupfer = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast (\\d+) Kupfer abgebaut.</font>\\s*</div>$');
	var regExArbeitZinn = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast (\\d+) Zinn geschabt.</font>\\s*</div>$');
	var regExArbeitWasser = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast (\\d+) Liter Wasser geholt.</font>\\s*</div>$');
	var regExArbeitJagen = new RegExp('^<font color="lime">Du hast ein\\(e\\)\\s+<b>(.+)</b> gefangen und hast dafür <b>\\s*(\\d+) Nahrungspunkte</b> bekommen.</font>$');
	var regExArbeitJagen2 = new RegExp('^<font color="lime">Durch deinen Jagdring hast du zusätzlich ein\\(e\\)\\s+<b>(.+)</b> gefangen und hast dafür <b>\\s*(\\d+) Nahrungspunkte</b> bekommen.</font>$');
	var regExArbeitTrank = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast einen .+ gebraut.</font>\\s*</div>$');
	var regExArbeitBronze = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast 10 Stücke Bronze hergestellt.</font>\\s*</div>$');
	var regExArbeitWaffeWerkzeug = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du hast dieses? (Waffe|Werkzeug) gebaut: .+.</font>\\s*</div>$');
	var regExArtefakt = new RegExp('^[\\S\\s]*Du hast das Artefakt[\\S\\s]*$');
	var regExWeltwunder = new RegExp('^[\\S\\s]*Du hast eine weitere Stufe am Weltwunder gebaut[\\S\\s]*$');
	var regExKnochenFund = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Du gehst durch ein Gebüsch, dabei siehst du einen Knochen und steckst ihn ein.</font>\\s*</div>$');
	var regExGoldFund = new RegExp('^[\\S\\s]+Glückwunsch - du hast ein Goldstück auf der Jagd gefunden.[\\S\\s]+$');
	var regExWasserFund = new RegExp('^[\\S\\s]+Bei der Jagd hast du 1 Liter Wasser gefunden[\\S\\s]+$');
	var regExRingFund = new RegExp('^[\\S\\s]+Du hast einen .+ring gefunden.[\\S\\s]+$');
	var regExTkGewonnen = new RegExp('^<div style="width:400px;overflow:auto;">\\s*Runde 1 Start:[\\S\\s]*Runde 2 Start:[\\S\\s]*<br><br>Glückwunsch, du hast alle Kämpfe erfolgreich überstanden und bekommst \\d+ Holz, \\d+ Nahrung, \\d+ Steine und \\d+ Goldstücke.\\s*</div>$');
	var regExTkVerlorenR2 = new RegExp('^<div style="width:400px;overflow:auto;">\\s*Runde 1 Start:[\\S\\s]*Runde 2 Start:[\\S\\s]*Es entwickelt sich ein kleiner Kampf und du verlierst.<br><br>\\s*[\\S\\s]+</div>$');
	var regExTkVerlorenR1 = new RegExp('^<div style="width:400px;overflow:auto;">\\s*Runde 1 Start:[\\S\\s]*Es entwickelt sich ein kleiner Kampf und du verlierst.<br><br>\\s*</div>$');
	var regExSkGewonnen = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="lime">Ihr habt den Kampf gewonnen. Du hast 4 Erfahrungspunkte bekommen und 4 frei verteilbare Punkte .</font>\\s*</div>$');
	var regExSkVerloren = new RegExp('^<div style="width:400px;overflow:auto;">\\s*<font color="red">Du wurdest beim (Stammk)|Kampf .+ verloren. Allerdings hast Du 3 Erfahrungspunkte und 3 frei verteilbare Punkte bekommen</font>\\s*</div>$');
	var regExEkGewonnen = new RegExp('^[\\S\\s]+angegriffen[\\S\\s]+gewonnen[\\S\\s]+$');
	var regExEkVerloren = new RegExp('^[\\S\\s]+angegriffen[\\S\\s]+verloren[\\S\\s]+$');
	var regExMk = new RegExp('^(\\d+) Kills (\\d+) Angriffe$');
	var eventOstern1 = new RegExp('^[\\S\\s]+Du beobachtest den Osterhasen [\\S\\s]+? Du erhältst (\\d+) (\\S+) dafür[\\S\\s]+$');
	var eventOstern2 = new RegExp('^[\\S\\s]+Bei der Arbeit entdeckst Du plötzlich .+? als er/sie sich gerade sein/ihr Osterhasenkostüm anzieht. Damit Du nichts verrätst, gibt er/sie Dir (\\d+) (\\S+)stücke[\\S\\s]+$');
	var eventOstern3 = new RegExp('^[\\S\\s]+Das Tragen ist für den Osterhasen sehr erschwerlich, also nimmst Du ihm \\d+ \\S+ ab und hilfst ihm tragen! Für Deine aufopfernde Hilfe bekommst Du (\\d+) (\\S+)[\\S\\s]+$');
	var eventOstern4 = new RegExp('^[\\S\\s]+Du hast das Versteck vom Osterhasen gefunden und nimmst dir \\d+ \\S+ mit. Du erhältst (\\d+) (\\S+) dafür[\\S\\s]+$');
	var eventHalloween1 = new RegExp('^[\\S\\s]*eine*n* (.+?). Deine (\\S+) erhöht sich um (\\d+)[\\S\\s]*$');
	var eventHalloween2 = new RegExp('^[\\S\\s]*einen ausgehöhlten Kürbis. Du erhälst (\\d+) (\\S+)stücke[\\S\\s]*$');
	var eventHalloween3 = new RegExp('^[\\S\\s]*Du triffst auf eine*n* .+? , diese[rs] schenkt dir[\\S\\s]*$');
	var eventWeihnacht1 = new RegExp('^[\\S\\s]+Du triffst auf einen schwarz gekleideten Mann namens (.+?). Als er Dich plötzlich mit seiner Rute schlägt zerbricht diese. Du erhälst (\\d+) (\\S+) dafür[\\S\\s]+$');
	var eventWeihnacht2 = new RegExp('^[\\S\\s]+Du triffst auf ein (.+?) mit einer roten Nase und gold glänzendem Fell. Es stellt sich heraus das dass goldene im Fell eine Münze ist. Du erhälst (\\d+) (\\S+) dafür[\\S\\s]+$');
	var eventWeihnacht3 = new RegExp('^[\\S\\s]+Du siehst einen (.+?) der dich bei der Arbeit verspottet. Als du versuchst ihn zu treten merkst du das jemand unter dem Schnee einige Steine versteckt hat. Du erhälst (\\d+) (\\S+) dafür[\\S\\s]+$');
	var eventWeihnacht4 = new RegExp('^[\\S\\s]+Du triffst auf einen (.+?) mit einem sack auf dem Rücken. Nachdem du ihn freundlich anlächelst schenkt er dir eine Zuckerstange und Deine (\\S+) erhöht sich um (\\d+)[\\S\\s]+$');

	var matchFound = true;

	if(ereignisString.search(regExNachrichtVerschickt) == -1 && ereignisString.search(regExNachrichtErhalten) == -1){
		for(var i in statArten){
			var statArt = statArten[i];
			if(ereignisString.search(regExArbeitHolz) != -1){
				var matches = ereignisString.match(regExArbeitHolz);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitHolz" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitHolzMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitKohle) != -1){
				var matches = ereignisString.match(regExArbeitKohle);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitKohle" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKohleMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitSteine) != -1){
				var matches = ereignisString.match(regExArbeitSteine);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitSteine" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitSteineMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitKupfer) != -1){
				var matches = ereignisString.match(regExArbeitKupfer);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitKupfer" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitKupferMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitZinn) != -1){
				var matches = ereignisString.match(regExArbeitZinn);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitZinn" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitZinnMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitWasser) != -1){
				var matches = ereignisString.match(regExArbeitWasser);
				var menge = parseInt(matches[1]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitWasser" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitWasserMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitJagen) != -1){
				var matches = ereignisString.match(regExArbeitJagen);
				var tier = matches[1].replace(/\s+/g, '_');
				var menge = parseInt(matches[2]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Anz", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Anz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_Jagd_" + tier, GM_getValue("KP_Stat_" + statArt + "_Jagd_" + tier, 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_RingMogl", GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitJagen2) != -1){
				var matches = ereignisString.match(regExArbeitJagen2);
				var tier = matches[1].replace(/\s+/g, '_');
				var menge = parseInt(matches[2]);
				if(wetterString != ''){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Menge", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagen" + wetterString + "Menge", 0)+menge);
				}
				if(!nurWetter){
					GM_setValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", 0)+menge);
					GM_setValue("KP_Stat_" + statArt + "_Jagd_" + tier, GM_getValue("KP_Stat_" + statArt + "_Jagd_" + tier, 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_RingMogl", GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)+1);
					GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
					if(eventString != null){
						GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
					}
				}
			} else if(ereignisString.search(regExArbeitTrank) != -1 || ereignisString.search(regExArbeitBronze) != -1 || ereignisString.search(regExArbeitWaffeWerkzeug) != -1 || ereignisString.search(regExArtefakt) != -1 || ereignisString.search(regExWeltwunder) != -1){
				GM_setValue("KP_Stat_" + statArt + "_KnochenMogl", GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)+1);
				if(eventString != null){
					GM_setValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", GM_getValue("KP_Stat_" + statArt + "_" + eventString + "Mogl", 0)+1);
				}
			} else if(ereignisString.search(regExKnochenFund) != -1){
				GM_setValue("KP_Stat_" + statArt + "_KnochenMenge", GM_getValue("KP_Stat_" + statArt + "_KnochenMenge", 0)+1);
			} else if(ereignisString.search(regExGoldFund) != -1){
				GM_setValue("KP_Stat_" + statArt + "_GoldFundMenge", GM_getValue("KP_Stat_" + statArt + "_GoldFundMenge", 0)+1);
			} else if(ereignisString.search(regExWasserFund) != -1){
				GM_setValue("KP_Stat_" + statArt + "_WasserFundMenge", GM_getValue("KP_Stat_" + statArt + "_WasserFundMenge", 0)+1);
			} else if(ereignisString.search(regExRingFund) != -1){
				GM_setValue("KP_Stat_" + statArt + "_RingMenge", GM_getValue("KP_Stat_" + statArt + "_RingMenge", 0)+1);
			} else if(ereignisString.search(regExTkGewonnen) != -1){
				GM_setValue("KP_Stat_" + statArt + "_TkAnz", GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_TkGewonnenAnz", GM_getValue("KP_Stat_" + statArt + "_TkGewonnenAnz", 0)+1);
			} else if(ereignisString.search(regExTkVerlorenR2) != -1){
				GM_setValue("KP_Stat_" + statArt + "_TkAnz", GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_TkVerlorenR2Anz", GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR2Anz", 0)+1);
			} else if(ereignisString.search(regExTkVerlorenR1) != -1){
				GM_setValue("KP_Stat_" + statArt + "_TkAnz", GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_TkVerlorenR1Anz", GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR1Anz", 0)+1);
			} else if(ereignisString.search(regExSkGewonnen) != -1){
				GM_setValue("KP_Stat_" + statArt + "_SkAnz", GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_SkGewonnenAnz", GM_getValue("KP_Stat_" + statArt + "_SkGewonnenAnz", 0)+1);
			} else if(ereignisString.search(regExSkVerloren) != -1){
				GM_setValue("KP_Stat_" + statArt + "_SkAnz", GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_SkVerlorenAnz", GM_getValue("KP_Stat_" + statArt + "_SkVerlorenAnz", 0)+1);
			} else if(ereignisString.search(regExEkGewonnen) != -1){
				GM_setValue("KP_Stat_" + statArt + "_EkAnz", GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_EkGewonnenAnz", GM_getValue("KP_Stat_" + statArt + "_EkGewonnenAnz", 0)+1);
			} else if(ereignisString.search(regExEkVerloren) != -1){
				GM_setValue("KP_Stat_" + statArt + "_EkAnz", GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0)+1);
				GM_setValue("KP_Stat_" + statArt + "_EkVerlorenAnz", GM_getValue("KP_Stat_" + statArt + "_EkVerlorenAnz", 0)+1);
			} else if(ereignisString.search(regExMk) != -1){
				var matches = ereignisString.match(regExMk);
				var kills = parseInt(matches[1]);
				var angriffe = parseInt(matches[2]);
				GM_setValue("KP_Stat_" + statArt + "_MkKillsAnz", GM_getValue("KP_Stat_" + statArt + "_MkKillsAnz", 0)+kills);
				GM_setValue("KP_Stat_" + statArt + "_MkAngriffeAnz", GM_getValue("KP_Stat_" + statArt + "_MkAngriffeAnz", 0)+angriffe);
				GM_setValue("KP_Stat_" + statArt + "_MkAnz", GM_getValue("KP_Stat_" + statArt + "_MkAnz", 0)+1);
			} else if(ereignisString.search(eventOstern1) != -1 && eventString == "Ostern"){
				var matches = ereignisString.match(eventOstern1);
				var menge = matches[1];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventOstern2) != -1 && eventString == "Ostern"){
				var matches = ereignisString.match(eventOstern2);
				var menge = matches[1];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventOstern3) != -1 && eventString == "Ostern"){
				var matches = ereignisString.match(eventOstern3);
				var menge = matches[1];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventOstern4) != -1 && eventString == "Ostern"){
				var matches = ereignisString.match(eventOstern4);
				var menge = matches[1];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventOstern_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventHalloween1) != -1 && eventString == "Halloween"){
				var matches = ereignisString.match(eventHalloween1);
				var menge = matches[3];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventHalloween2) != -1 && eventString == "Halloween"){
				var matches = ereignisString.match(eventHalloween2);
				var menge = matches[1];
				var art = matches[2];
				GM_setValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventHalloween3) != -1 && eventString == "Halloween"){
				var matches = ereignisString.match(eventHalloween3);
				var menge = "";
				var art = "Unbekannt";
				GM_setValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventHalloween_" + menge + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventWeihnacht1) != -1 && eventString == "Weihnacht"){
				var matches = ereignisString.match(eventWeihnacht1);
				var art = matches[1];
				GM_setValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventWeihnacht2) != -1 && eventString == "Weihnacht"){
				var matches = ereignisString.match(eventWeihnacht2);
				var art = matches[1];
				GM_setValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventWeihnacht3) != -1 && eventString == "Weihnacht"){
				var matches = ereignisString.match(eventWeihnacht3);
				var art = matches[1];
				GM_setValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", 0)+1);
			} else if(ereignisString.search(eventWeihnacht4) != -1 && eventString == "Weihnacht"){
				var matches = ereignisString.match(eventWeihnacht4);
				var art = matches[1];
				GM_setValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_" + art + "_Anz", 0)+1);
			} else {
				matchFound = false;
			}
		}
	} else {
		matchFound = false;
	}
	if(matchFound && !nurWetter){
		var ereignisArray = GM_SuperValue.get("KP_Ereignisse", new Array());
		ereignisArray.unshift(dateString+ereignisString);
		for(var i=ereignisArray.length-1; i>=0; i--){
			var ereignisDate = new Date(ereignisArray[i].substring(6,10), ereignisArray[i].substring(3,5), ereignisArray[i].substring(0,2), ereignisArray[i].substring(13,15), ereignisArray[i].substring(16,18), 0);
			if((new Date()).getTime() - ereignisDate.getTime() > 691200000){
				ereignisArray.pop();
			} else {
				break;
			}
		}
		GM_SuperValue.set("KP_Ereignisse", ereignisArray);
		var ereignisArray2 = GM_SuperValue.get("KP_EreignisseWetter", new Array());
		for(var i=ereignisArray2.length-1; i>=0; i--){
			var ereignisDate2 = new Date(ereignisArray2[i].substring(6,10), ereignisArray2[i].substring(3,5), ereignisArray2[i].substring(0,2), ereignisArray2[i].substring(13,15), ereignisArray2[i].substring(16,18), 0);
			if((new Date()).getTime() - ereignisDate2.getTime() > 1296000000){
				ereignisArray2.pop();
			} else {
				break;
			}
		}
		if(wetterString=='' && (ereignisString.search(regExArbeitHolz)!=-1 || ereignisString.search(regExArbeitKohle)!=-1 || ereignisString.search(regExArbeitSteine)!=-1 || ereignisString.search(regExArbeitKupfer)!=-1 || ereignisString.search(regExArbeitZinn)!=-1 || ereignisString.search(regExArbeitWasser)!=-1 || ereignisString.search(regExArbeitJagen)!=-1 || ereignisString.search(regExArbeitJagen2)!=-1)){
			ereignisArray2.unshift(dateString+ereignisString);
			GM_SuperValue.set("KP_EreignisseWetter", ereignisArray2);
		}
	}
	if(wetterString!='' && nurWetter && (ereignisString.search(regExArbeitHolz)!=-1 || ereignisString.search(regExArbeitKohle)!=-1 || ereignisString.search(regExArbeitSteine)!=-1 || ereignisString.search(regExArbeitKupfer)!=-1 || ereignisString.search(regExArbeitZinn)!=-1 || ereignisString.search(regExArbeitWasser)!=-1 || ereignisString.search(regExArbeitJagen)!=-1 || ereignisString.search(regExArbeitJagen2)!=-1)){
		var ereignisArray2 = GM_SuperValue.get("KP_EreignisseWetter", new Array());
		for(var i=ereignisArray2.length-1; i>=0; i--){
			if(ereignisArray2[i]==(dateString+ereignisString)){
				ereignisArray2.splice(i, 1);
			}
		}
		GM_SuperValue.set("KP_EreignisseWetter", ereignisArray2);
	}
	return matchFound;
}

function setStatHtml(){
	var statArt = "Aktueller_Monat";
	if(document.getElementsByName('statArt')[0] != null){
		statArt = document.getElementsByName('statArt')[0].value;
	}
	var select2 = '';
	var select3 = '';
	var select4 = '';
	var select5 = '';
	var select6 = '';
	var select7 = '';
	var statArtAlt = 'Letzter_Monat';
	if(statArt == 'Letzter_Monat'){
		select2 = ' selected="selected"';
		statArtAlt = 'Vorletzter_Monat';
	} else if(statArt == 'Vorletzter_Monat'){
		select3 = ' selected="selected"';
		statArtAlt = 'Vorvorletzter_Monat';
	} else if(statArt == 'Aktuelles_Jahr'){
		select4 = ' selected="selected"';
		statArtAlt = 'Letztes_Jahr';
	} else if(statArt == 'Letztes_Jahr'){
		select5 = ' selected="selected"';
		statArtAlt = 'Vorletztes_Jahr';
	} else if(statArt == 'Vorletztes_Jahr'){
		select6 = ' selected="selected"';
		statArtAlt = 'Vorvorletztes_Jahr';
	} else if(statArt == 'Gesamt'){
		select7 = ' selected="selected"';
	}
	var statArt2 = "Aktionen";
	if(document.getElementsByName('statArt2')[0] != null){
		statArt2 = document.getElementsByName('statArt2')[0].value;
	}
	var select22 = '';
	var select23 = '';
	var select24 = '';
	var select25 = '';
	if(statArt2 == 'Jagd'){
		select22 = ' selected="selected"';
	} else if(statArt2 == 'Kämpfe'){
		select23 = ' selected="selected"';
	} else if(statArt2 == 'Events'){
		select24 = ' selected="selected"';
	} else if(statArt2 == 'Aktivität'){
		select25 = ' selected="selected"';
	}
	var layerHtmlCode = '<center><form id="layer2Form0" action="javascript:moveOut();" method="post">';
	layerHtmlCode += '<br>Welche Statistiken möchtest du sehen? <select name="statArt"><option value="Aktueller_Monat">Aktueller Monat</option><option value="Letzter_Monat"' + select2 + '>Letzter Monat</option><option value="Vorletzter_Monat"' + select3 + '>Vorletzter Monat</option><option value="Aktuelles_Jahr"' + select4 + '>Aktuelles Jahr</option><option value="Letztes_Jahr"' + select5 + '>Letztes Jahr</option><option value="Vorletztes_Jahr"' + select6 + '>Vorletztes Jahr</option><option value="Gesamt"' + select7 + '>Gesamt</option></select><select name="statArt2"><option value="Aktionen">Aktionen</option><option value="Jagd"' + select22 + '>Jagd</option><option value="Kämpfe"' + select23 + '>Kämpfe</option><option value="Events"' + select24 + '>Events</option><option value="Aktivität"' + select25 + '>Aktivität</option></select><input type="submit" value="Anzeigen"></form>';
	layerHtmlCode += '<form id="layer2Form" action="javascript:moveOut2();moveOut3();" method="post">';
	layerHtmlCode += '<h1>Statistiken (' + statArt.replace('_',' ') + ')</h1>';
	if(statArt2 == "Aktionen"){
		var ereignisArray2 = GM_SuperValue.get("KP_EreignisseWetter", new Array());
		if(ereignisArray2.length > 0){
			if(document.getElementById("Layer3")!=null){
				setStatWetterHtml();
				unsafeWindow.moveOut3();
			}
			layerHtmlCode += '<font color=yellow>Zu einigen Aktionen liegen keine Wetterdaten vor!</font><br><a href="javascript:moveIn3()">Wetterdaten eintragen</a><br><br>';
		}
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Besondere Ereignisse</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Menge</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var knochenMogl = GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0);
		layerHtmlCode += '<tr><td width="40%">Knochenfund</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_KnochenMenge", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_KnochenMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_KnochenMenge", 0) / knochenMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Holz fällen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitHolzAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Köhlern</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKohleAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Steine metzen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitSteineAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Kupfer abbauen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitKupferAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Zinn abbauen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitZinnAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Wasser suchen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitWasserAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
		if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)!=0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Jagen</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Wetter</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Ertrag</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSonneAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Sonne</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSonneAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSonneMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSonneMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSonneAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenBewoelktAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bewölkt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenBewoelktAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenBewoelktMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenBewoelktMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenBewoelktAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenNebelAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Nebel</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenNebelAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenNebelMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenNebelMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenNebelAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenRegenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Regen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenRegenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenRegenMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenRegenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenRegenAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSchneeAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schnee</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSchneeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSchneeMenge", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSchneeMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenSchneeAnz", 1)).toFixed(2).replace('.',',') + '</td></tr>';
			if(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)!=0) layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", 0)) + '</i></td><td align="right" width="20%"><i>' + (GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenMenge", 0) / GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 1)).toFixed(2).replace('.',',') + '</i></td></tr>';
			layerHtmlCode += '</table><br>';
		}
	} else if(statArt2 == "Jagd"){
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Besondere Ereignisse</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var ringMogl = GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0);
		layerHtmlCode += '<tr><td width="40%">Goldfund</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_GoldFundMenge", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_GoldFundMenge", 0) / ringMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">Wasserfund</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_WasserFundMenge", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_WasserFundMenge", 0) / ringMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">Ringfund</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMenge", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_RingMenge", 0) / ringMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Tieranzahl</b></td></tr>';
		var tiereAnz2 = GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0) - GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0);
		var tiereAnz1 = GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0) - tiereAnz2*2;
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var jagenAnz = GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0);
		layerHtmlCode += '<tr><td width="40%">2 Tiere</td><td align="right" width="20%">' + format1(tiereAnz2) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)) + '</td><td align="right" width="20%">' + (tiereAnz2 / jagenAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">1 Tier</td><td align="right" width="20%">' + format1(tiereAnz1) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_ArbeitJagenAnz", 0)) + '</td><td align="right" width="20%">' + (tiereAnz1 / jagenAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Tiere</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenflußpferd", 0)!=0) layerHtmlCode += '<tr><td width="40%">Riesenflußpferd (125 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenflußpferd", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenflußpferd", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Mammut", 0)!=0) layerHtmlCode += '<tr><td width="40%">Mammut (100 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Mammut", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Mammut", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Mastodon", 0)!=0) layerHtmlCode += '<tr><td width="40%">Mastodon (90 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Mastodon", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Mastodon", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenfaultier", 0)!=0) layerHtmlCode += '<tr><td width="40%">Riesenfaultier (80 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenfaultier", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenfaultier", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenbär", 0)!=0) layerHtmlCode += '<tr><td width="40%">Riesenbär (75 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenbär", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenbär", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Raubwaran", 0)!=0) layerHtmlCode += '<tr><td width="40%">Raubwaran (75 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Raubwaran", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Raubwaran", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenschildkröte", 0)!=0) layerHtmlCode += '<tr><td width="40%">Riesenschildkröte (75 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenschildkröte", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenschildkröte", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Alligator", 0)!=0) layerHtmlCode += '<tr><td width="40%">Alligator (60 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Alligator", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Alligator", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wollhaariges_Nashorn", 0)!=0) layerHtmlCode += '<tr><td width="40%">Wollhaariges Nashorn (60 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wollhaariges_Nashorn", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Wollhaariges_Nashorn", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ur", 0)!=0) layerHtmlCode += '<tr><td width="40%">Ur (60 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ur", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Ur", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gorilla", 0)!=0) layerHtmlCode += '<tr><td width="40%">Gorilla (50 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gorilla", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Gorilla", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Säbelzahntiger", 0)!=0) layerHtmlCode += '<tr><td width="40%">Säbelzahntiger (50 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Säbelzahntiger", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Säbelzahntiger", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Berglöwe", 0)!=0) layerHtmlCode += '<tr><td width="40%">Berglöwe (50 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Berglöwe", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Berglöwe", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenbär", 0)!=0) layerHtmlCode += '<tr><td width="40%">Höhlenbär (50 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenbär", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenbär", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Rentier", 0)!=0) layerHtmlCode += '<tr><td width="40%">Rentier (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Rentier", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Rentier", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Elch", 0)!=0) layerHtmlCode += '<tr><td width="40%">Elch (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Elch", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Elch", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Schneeleopard", 0)!=0) layerHtmlCode += '<tr><td width="40%">Schneeleopard (40 NP)	</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Schneeleopard", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Schneeleopard", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Pferd", 0)!=0) layerHtmlCode += '<tr><td width="40%">Pferd (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Pferd", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Pferd", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenwisent", 0)!=0) layerHtmlCode += '<tr><td width="40%">Steppenwisent (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenwisent", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenwisent", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Büffel", 0)!=0) layerHtmlCode += '<tr><td width="40%">Büffel (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Büffel", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Büffel", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Auerochse", 0)!=0) layerHtmlCode += '<tr><td width="40%">Auerochse (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Auerochse", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Auerochse", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenlöwe", 0)!=0) layerHtmlCode += '<tr><td width="40%">Höhlenlöwe (40 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenlöwe", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Höhlenlöwe", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Bison)", 0)!=0) layerHtmlCode += '<tr><td width="40%">Bison (35 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Bison", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Bison", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fleckenhyäne", 0)!=0) layerHtmlCode += '<tr><td width="40%">Fleckenhyäne (35 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fleckenhyäne", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Fleckenhyäne", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenhirsch", 0)!=0) layerHtmlCode += '<tr><td width="40%">Riesenhirsch (35 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenhirsch", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Riesenhirsch", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Goldschakal", 0)!=0) layerHtmlCode += '<tr><td width="40%">Goldschakal (35 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Goldschakal", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Goldschakal", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Luchs", 0)!=0) layerHtmlCode += '<tr><td width="40%">Luchs (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Luchs", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Luchs", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Reh", 0)!=0) layerHtmlCode += '<tr><td width="40%">Reh (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Reh", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Reh", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Tapir", 0)!=0) layerHtmlCode += '<tr><td width="40%">Tapir (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Tapir", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Tapir", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Pekari", 0)!=0) layerHtmlCode += '<tr><td width="40%">Pekari (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Pekari", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Pekari", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gazelle", 0)!=0) layerHtmlCode += '<tr><td width="40%">Gazelle (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gazelle", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Gazelle", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Antilope", 0)!=0) layerHtmlCode += '<tr><td width="40%">Antilope (30 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Antilope", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Antilope", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eisfuchs", 0)!=0) layerHtmlCode += '<tr><td width="40%">Eisfuchs (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eisfuchs", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Eisfuchs", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenkatze", 0)!=0) layerHtmlCode += '<tr><td width="40%">Steppenkatze (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenkatze", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Steppenkatze", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Waschbär", 0)!=0) layerHtmlCode += '<tr><td width="40%">Waschbär (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Waschbär", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Waschbär", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wildkatze", 0)!=0) layerHtmlCode += '<tr><td width="40%">Wildkatze (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wildkatze", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Wildkatze", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaiman", 0)!=0) layerHtmlCode += '<tr><td width="40%">Kaiman (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaiman", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaiman", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ameisenbär", 0)!=0) layerHtmlCode += '<tr><td width="40%">Ameisenbär (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ameisenbär", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Ameisenbär", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wolf", 0)!=0) layerHtmlCode += '<tr><td width="40%">Wolf (20 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wolf", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Wolf", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Vogel", 0)!=0) layerHtmlCode += '<tr><td width="40%">Vogel (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Vogel", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Vogel", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Opossum", 0)!=0) layerHtmlCode += '<tr><td width="40%">Opossum (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Opossum", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Opossum", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Trappe", 0)!=0) layerHtmlCode += '<tr><td width="40%">Trappe (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Trappe", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Trappe", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fischotter", 0)!=0) layerHtmlCode += '<tr><td width="40%">Fischotter (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fischotter", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Fischotter", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gürteltier", 0)!=0) layerHtmlCode += '<tr><td width="40%">Gürteltier (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Gürteltier", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Gürteltier", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhase", 0)!=0) layerHtmlCode += '<tr><td width="40%">Feldhase (15 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhase", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhase", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaninchen", 0)!=0) layerHtmlCode += '<tr><td width="40%">Kaninchen (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaninchen", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Kaninchen", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Marder", 0)!=0) layerHtmlCode += '<tr><td width="40%">Marder (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Marder", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Marder", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Biber", 0)!=0) layerHtmlCode += '<tr><td width="40%">Biber (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Biber", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Biber", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wiesel", 0)!=0) layerHtmlCode += '<tr><td width="40%">Wiesel (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wiesel", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Wiesel", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Flughund", 0)!=0) layerHtmlCode += '<tr><td width="40%">Flughund (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Flughund", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Flughund", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fisch", 0)!=0) layerHtmlCode += '<tr><td width="40%">Fisch (10 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Fisch", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Fisch", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ratte", 0)!=0) layerHtmlCode += '<tr><td width="40%">Ratte (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Ratte", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Ratte", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Hummer", 0)!=0) layerHtmlCode += '<tr><td width="40%">Hummer (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Hummer", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Hummer", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wachtel", 0)!=0) layerHtmlCode += '<tr><td width="40%">Wachtel (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Wachtel", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Wachtel", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Hamster", 0)!=0) layerHtmlCode += '<tr><td width="40%">Hamster (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Hamster", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Hamster", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhamster", 0)!=0) layerHtmlCode += '<tr><td width="40%">Feldhamster (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhamster", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Feldhamster", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Maus", 0)!=0) layerHtmlCode += '<tr><td width="40%">Maus (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Maus", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Maus", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Krebs", 0)!=0) layerHtmlCode += '<tr><td width="40%">Krebs (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Krebs", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Krebs", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eidechse", 0)!=0) layerHtmlCode += '<tr><td width="40%">Eidechse (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eidechse", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Eidechse", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		if(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eichhörnchen", 0)!=0) layerHtmlCode += '<tr><td width="40%">Eichhörnchen (5 NP)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_Jagd_Eichhörnchen", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_RingMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_Jagd_Eichhörnchen", 0) / GM_getValue("KP_Stat_" + statArt + "_RingMogl", 1)*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
	} else if(statArt2 == "Kämpfe"){
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Einzelkampf</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Teilnahmen</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var ekAnz = GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0);
		layerHtmlCode += '<tr><td width="40%">Gewonnen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EkGewonnenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EkGewonnenAnz", 0) / ekAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">Verloren</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EkVerlorenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EkVerlorenAnz", 0) / ekAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Talkampf</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Teilnahmen</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var tkAnz = GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0);
		layerHtmlCode += '<tr><td width="40%">Gewonnen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkGewonnenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_TkGewonnenAnz", 0) / tkAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">2.Runde verloren</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR2Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR2Anz", 0) / tkAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">1.Runde verloren</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR1Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_TkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_TkVerlorenR1Anz", 0) / tkAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Stammkampf</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Teilnahmen</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
		var skAnz = GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0);
		layerHtmlCode += '<tr><td width="40%">Gewonnen</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_SkGewonnenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_SkGewonnenAnz", 0) / skAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '<tr><td width="40%">Verloren</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_SkVerlorenAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_SkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_SkVerlorenAnz", 0) / skAnz*100).toFixed(2).replace('.',',') + ' %</td></tr>';
		layerHtmlCode += '</table><br>';
		layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Magierkampf</b></td></tr>';
		layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Teilnahmen</u></td><td align="right" width="20%"><u>Schnitt</u></td></tr>';
		var mkAnz = GM_getValue("KP_Stat_" + statArt + "_MkAnz", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_MkAnz", 0);
		layerHtmlCode += '<tr><td width="40%">Kills</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_MkKillsAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_MkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_MkKillsAnz", 0) / mkAnz).toFixed(2).replace('.',',') + '</td></tr>';
		layerHtmlCode += '<tr><td width="40%">Angriffe</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_MkAngriffeAnz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_MkAnz", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_MkAngriffeAnz", 0) / mkAnz).toFixed(2).replace('.',',') + '</td></tr>';
		layerHtmlCode += '</table><br>';
	} else if(statArt2 == "Events"){
		var osternMogl = GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0);
		var osternAnz = GM_getValue("KP_Stat_" + statArt + "_EventOstern_5Nahrung_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventOstern_5Gold_Anz", 0);
		var halloweenMogl = GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0);
		var halloweenAnz = GM_getValue("KP_Stat_" + statArt + "_EventHalloween_5Nahrung_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventHalloween_7Nahrung_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventHalloween_3Gold_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventHalloween_Unbekannt_Anz", 0);
		var weihnachtMogl = GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0) == 0 ? 1 : GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0);
		var weihnachtAnz = GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Knecht Ruprecht_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Mann in roten Kleidern_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Rentier_Anz", 0) + GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Schneemann_Anz", 0);
		if(GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0) != 0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Ostern</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
			layerHtmlCode += '<tr><td width="40%">Osterhase (5 Gold)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventOstern_5Gold_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "__EventOstern_5Gold_Anz", 0) / osternMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Osterhase (5 Nahrung)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventOstern_5Nahrung_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventOstern_5Nahrung_Anz", 0) / osternMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(osternAnz) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_OsternMogl", 0)) + '</i></td><td align="right" width="20%"><i>' + (osternAnz / osternMogl*100).toFixed(2).replace('.',',') + ' %</i></td></tr>';
			layerHtmlCode += '</table><br>';
		} else if(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0) != 0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Halloween</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
			layerHtmlCode += '<tr><td width="40%">Ausgehöhlter Kürbis (3 Gold)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventHalloween_3Gold_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventHalloween_3Gold_Anz", 0) / halloweenMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Bonbon (5 Nahrung)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventHalloween_5Nahrung_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventHalloween_5Nahrung_Anz", 0) / halloweenMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Lutscher (7 Nahrung)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventHalloween_7Nahrung_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventHalloween_7Nahrung_Anz", 0) / halloweenMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Unbekannt</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventHalloween_Unbekannt_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventHalloween_Unbekannt_Anz", 0) / halloweenMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(halloweenAnz) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_HalloweenMogl", 0)) + '</i></td><td align="right" width="20%"><i>' + (halloweenAnz / halloweenMogl*100).toFixed(2).replace('.',',') + ' %</i></td></tr>';
			layerHtmlCode += '</table><br>';
		} else if(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0) != 0){
			layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Weihnachten</b></td></tr>';
			layerHtmlCode += '<tr><td width="40%"><u>Ereignis</u></td><td align="right" width="20%"><u>Anzahl</u></td><td align="right" width="20%"><u>Möglichkeiten</u></td><td align="right" width="20%"><u>Quote</u></td></tr>';
			layerHtmlCode += '<tr><td width="40%">Knecht Ruprecht (5 Holz)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Knecht Ruprecht_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Knecht Ruprecht_Anz", 0) / weihnachtMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Mann in roten Kleidern (5 Nahrung)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Mann in roten Kleidern_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Mann in roten Kleidern_Anz", 0) / weihnachtMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Rentier (5 Gold)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Rentier_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Rentier_Anz", 0) / weihnachtMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%">Schneemann (5 Stein)</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Schneemann_Anz", 0)) + '</td><td align="right" width="20%">' + format1(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0)) + '</td><td align="right" width="20%">' + (GM_getValue("KP_Stat_" + statArt + "_EventWeihnacht_Schneemann_Anz", 0) / weihnachtMogl*100).toFixed(2).replace('.',',') + ' %</td></tr>';
			layerHtmlCode += '<tr><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(weihnachtAnz) + '</i></td><td align="right" width="20%"><i>' + format1(GM_getValue("KP_Stat_" + statArt + "_WeihnachtMogl", 0)) + '</i></td><td align="right" width="20%"><i>' + (weihnachtAnz / weihnachtMogl*100).toFixed(2).replace('.',',') + ' %</i></td></tr>';
			layerHtmlCode += '</table><br>';
		} else {
			layerHtmlCode += 'Keine Events im ausgewählten Zeitraum.<br><br>';
		}
	} else if(statArt2 == "Aktivität"){
		if(statArt == "Gesamt"){
			layerHtmlCode += 'Keine Anzeige möglich!<br>Aktivitäts-Statistik ist nur über einen bestimmten Zeitraum möglich!<br><br>';
		} else {
			if(document.getElementsByTagName('body')[0].innerHTML.indexOf('href="stamm.php?do=austreten"') == -1){
				layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Eigene Aktivität</b></td></tr>';
				layerHtmlCode += '<tr><td width="40%"><u>Name</u></td><td align="right" width="20%"><u>EP Alt</u></td><td align="right" width="20%"><u>EP Neu</u></td><td align="right" width="20%"><u>Zuwachs</u></td></tr>';
				var uname = GM_getValue("KP_UserName", "NoName");
				var altep = GM_getValue("KP_Stat_" + statArtAlt + "_EP_" + uname, 0);
				var neuep = GM_getValue("KP_Stat_" + statArt + "_EP_" + uname, 0);
				if(altep == 0){
					altep = neuep;
					if(altep != 0){
						if(GM_getValue("KP_Stat_Aktueller_Monat_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Aktueller_Monat_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Letzter_Monat_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Letzter_Monat_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Vorletzter_Monat_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Vorletzter_Monat_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Vorvorletzter_Monat_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Vorvorletzter_Monat_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Aktuelles_Jahr_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Aktuelles_Jahr_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Letztes_Jahr_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Letztes_Jahr_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Vorletztes_Jahr_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Vorletztes_Jahr_EP_" + uname, altep);
						}
						if(GM_getValue("KP_Stat_Vorvorletztes_Jahr_EP_" + uname, 0) == 0){
							GM_setValue("KP_Stat_Vorvorletztes_Jahr_EP_" + uname, altep);
						}
					}
				}
				var zuwachs = neuep - altep;
				layerHtmlCode += '<tr><td width="40%">' + uname + '</td><td align="right" width="20%">' + format1(altep) + '</td><td align="right" width="20%">' + format1(neuep) + '</td><td align="right" width="20%">+' + format1(zuwachs) + '</td></tr>';
				layerHtmlCode += '</table><br>';
			} else {
				var unameSelbst = GM_getValue("KP_UserName", "NoName");
				layerHtmlCode += '<table width="90%" style="border-width: 0px;"><tr><td colspan="4"><b>Stamm-Aktivität</b> <i>(Aktualisierung nur bei Aufruf der Stammübersicht)</i></td></tr>';
				layerHtmlCode += '<tr><td width="5%"><u>#</u></td><td width="35%"><u>Name</u></td><td align="right" width="20%"><u>EP Alt</u></td><td align="right" width="20%"><u>EP Neu</u></td><td align="right" width="20%"><u>Zuwachs</u></td></tr>';
				var userArray = GM_SuperValue.get("KP_Stat_Stammuser", new Array());
				if(userArray.length == 0){
					userArray.push(unameSelbst);
				}
				userArray.reverse();
				var userArrayNeu = new Array();
				var userAltEp = new Array();
				var userNeuEp = new Array();
				var epGesAlt = 0;
				var epGesNeu = 0;
				var zuwachsGes = 0;
				for(var i=0; i<userArray.length; i++){
					uname = userArray[i];
					altep = GM_getValue("KP_Stat_" + statArtAlt + "_EP_" + uname, 0);
					neuep = GM_getValue("KP_Stat_" + statArt + "_EP_" + uname, 0);
					if(altep == 0){
						altep = neuep;
						if(altep != 0){
							if(GM_getValue("KP_Stat_Aktueller_Monat_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Aktueller_Monat_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Letzter_Monat_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Letzter_Monat_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Vorletzter_Monat_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Vorletzter_Monat_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Vorvorletzter_Monat_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Vorvorletzter_Monat_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Aktuelles_Jahr_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Aktuelles_Jahr_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Letztes_Jahr_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Letztes_Jahr_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Vorletztes_Jahr_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Vorletztes_Jahr_EP_" + uname, altep);
							}
							if(GM_getValue("KP_Stat_Vorvorletztes_Jahr_EP_" + uname, 0) == 0){
								GM_setValue("KP_Stat_Vorvorletztes_Jahr_EP_" + uname, altep);
							}
						}
					}
					zuwachs = neuep - altep;
					userArrayNeu[uname] = zuwachs;
					userAltEp[uname] = altep;
					userNeuEp[uname] = neuep;
					epGesAlt += altep;
					epGesNeu += neuep;
					zuwachsGes += zuwachs;
				}
				var userArraySorted = getSortedKeys(userArrayNeu);
				userArraySorted.reverse();
				var pos = 1;
				for (x in userArraySorted){
					uname = userArraySorted[x];
					zuwachs = userArrayNeu[uname];
					var fontstring1 = '';
					var fontstring2 = '';
					if(uname == unameSelbst){
						fontstring1 = '<font color="red"><b>';
						fontstring2 = '</b></font>';
					}
					layerHtmlCode += '<tr><td width="5%">' + pos + '.</td><td width="35%">' + fontstring1 + uname + fontstring2 +'</td><td align="right" width="20%">' + format1(userAltEp[uname]) + '</td><td align="right" width="20%">' + format1(userNeuEp[uname]) + '</td><td align="right" width="20%">+' + format1(zuwachs) + '</td></tr>';
					pos++;
				}
				layerHtmlCode += '<tr><td width="5%"><i></i></td><td width="40%"><i>Gesamt</i></td><td align="right" width="20%"><i>' + format1(epGesAlt) + '</i></td><td align="right" width="20%"><i>' + format1(epGesNeu) + '</i></td><td align="right" width="20%"><i>+' + format1(zuwachsGes) + '</i></td></tr>';
				layerHtmlCode += '</table><br>';
			}
		}
	}
	layerHtmlCode += '<input type="submit" value="Ausblenden"></form></center>';
	document.getElementById("Layer2").innerHTML = layerHtmlCode;

	var layerForm = document.getElementById('layer2Form0');
	layerForm.addEventListener('submit', setStatHtml, true);
}


function setStatWetter(){
	var ereignisArray2 = GM_SuperValue.get("KP_EreignisseWetter", new Array());
	var wetterDate = new Date();
	for(var i=0; i<ereignisArray2.length; i++){
		var wetterDate2 = ermittleWetterDate(new Date(ereignisArray2[i].substring(6,10), parseInt(ereignisArray2[i].substring(3,5))-1, ereignisArray2[i].substring(0,2), ereignisArray2[i].substring(13,15), ereignisArray2[i].substring(16,18), 0));
		wetterDate2.setMilliseconds(0);
		if(wetterDate.getTime() != wetterDate2.getTime()){
			wetterDate = wetterDate2;
			var wetterDateString = format2(wetterDate.getDate()) + "." + format2(wetterDate.getMonth()+1) + "." + wetterDate.getFullYear();
			var wetter = "";
			if(document.getElementsByName('wetter'+wetterDateString)[0] != null){
				wetter = document.getElementsByName('wetter'+wetterDateString)[0].value;
				if(wetter!=""){
					var wetterArray = GM_SuperValue.get("KP_Wetter", new Array());
					var wetterString = format2(wetterDate.getDate()) + "." + format2(wetterDate.getMonth()+1) + "." + wetterDate.getFullYear() + " - " + wetter;
					wetterArray.push(wetterString);
					GM_SuperValue.set("KP_Wetter", wetterArray);
				}
			}
		}
		if(wetter!=""){
			saveAktion(ereignisArray2[i].substring(0,18), ereignisArray2[i].substring(18), true);
		}
	}
	setStatHtml();
}


function setStatWetterHtml(){
	var layerHtmlCode = '<center><h1>Wetter eingeben</h1><form id="layer3Form" action="javascript:moveOut3();" method="post">';
	layerHtmlCode += 'Das Wetter kannst du auf <a target="_blank" href="http://szstool.de/index.php?idcat=1&subcat=15">www.szstool.de</a> nachschauen!<br><br>';
	layerHtmlCode += '<table width="90%" style="border-width: 0px;">';
	var ereignisArray2 = GM_SuperValue.get("KP_EreignisseWetter", new Array());
	var wetterDate = new Date();
	for(var i=0; i<ereignisArray2.length; i++){
		var wetterDate2 = ermittleWetterDate(new Date(ereignisArray2[i].substring(6,10), parseInt(ereignisArray2[i].substring(3,5))-1, ereignisArray2[i].substring(0,2), ereignisArray2[i].substring(13,15), ereignisArray2[i].substring(16,18), 0));
		wetterDate2.setMilliseconds(0);
		if(wetterDate.getTime() != wetterDate2.getTime()){
			wetterDate = wetterDate2;
			var wetterDateString = format2(wetterDate.getDate()) + "." + format2(wetterDate.getMonth()+1) + "." + wetterDate.getFullYear();
			layerHtmlCode += '<tr><td align=right>' + wetterDateString + '</td>';
			layerHtmlCode += '<td><select name="wetter' + wetterDateString + '"><option value=""></option><option value="Sonne">Sonne</option><option value="Bewoelkt">Bewölkt</option><option value="Nebel">Nebel</option><option value="Regen">Regen</option><option value="Schnee">Schnee</option></select></td></tr>';
		}
	}
	layerHtmlCode += '</table><br>';
	layerHtmlCode += '<input type="submit" value="Auswerten"></form></center>';
	document.getElementById("Layer3").innerHTML = layerHtmlCode;

	var layerForm = document.getElementById('layer3Form');
	layerForm.addEventListener('submit', setStatWetter, true);
}


function layerNeuAusrichten(){
	location.href = location.href;
}


function printOpferzeit(count, spanId) {
	if(count<0){count=0;}
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	count = Math.floor(count/60);
	var hours = count%24;
	count = Math.floor(count/24);
	var days = count%7;
	document.getElementById(spanId).setAttribute('style','color:lime');
	var restZeitString = '';
	if(days > 0){
		restZeitString = days + ' T ' + format2(hours) + ':' + format2(minutes) + ':' + format2(seconds) + " Std";
	} else if (hours > 0){
		restZeitString = hours + ':' + format2(minutes) + ':' + format2(seconds) + " Std";
	} else if (minutes > 0){
		restZeitString = minutes + ':' + format2(seconds) + " Min";
		document.getElementById(spanId).setAttribute('style','color:yellow');
	} else {
		restZeitString = seconds + " Sek";
		document.getElementById(spanId).setAttribute('style','color:red');
	}
	document.getElementById(spanId).innerHTML = restZeitString;
}


function printTalkampfzeit(count, spanId, angemeldet) {
	if(count<0){count=0;}
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	count = Math.floor(count/60);
	var hours = count%24;
	document.getElementById(spanId).setAttribute('style','color:yellow');
	var restZeitString = '';
	if(hours > 0){
		restZeitString = hours + ':' + format2(minutes) + ':' + format2(seconds) + " Stunden";
	} else if (minutes > 0){
		restZeitString = minutes + ':' + format2(seconds) + " Minuten";
	} else {
		restZeitString = seconds + " Sekunden";
	}
	if(!angemeldet){
		restZeitString = "Talkampfanmeldung noch " + restZeitString + " möglich!";
	} else {
		restZeitString = "<font color=lime>Du bist noch " + restZeitString + " im Talkampf.</font>";
		if (hours == 0 && minutes < 31){
			if(GM_getValue("Hand", "Unbekannt").indexOf('color=red')==-1){
				restZeitString += "<br>Jetzt Waffe anlegen!";
			}
			if(GM_getValue("Finger", "Unbekannt").indexOf('Talkampfring')==-1 && GM_getValue("Talkampfring", false)){
				restZeitString += "<br>Jetzt Talkampfring anlegen!";
			}
		}
	}
	document.getElementById(spanId).innerHTML = restZeitString;
}


function printStammkampfzeit(count, spanId, angemeldet) {
	if(count<0){count=0;}
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	count = Math.floor(count/60);
	var hours = count%24;
	document.getElementById(spanId).setAttribute('style','color:yellow');
	var restZeitString = '';
	if(hours > 0){
		restZeitString = hours + ':' + format2(minutes) + ':' + format2(seconds) + " Stunden";
	} else if (minutes > 0){
		restZeitString = minutes + ':' + format2(seconds) + " Minuten";
	} else {
		restZeitString = seconds + " Sekunden";
	}
	if(!angemeldet){
		restZeitString = "Stammkampfanmeldung noch " + restZeitString + " möglich!";
	} else {
		restZeitString = "<font color=lime>Du hast in " + restZeitString + " einen Stammkampf.</font>";
		if (hours == 0 && minutes < 31){
			if(GM_getValue("Hand", "Unbekannt").indexOf('color=red')==-1){
				restZeitString += "<br>Jetzt Waffe anlegen!";
			}
			if(GM_getValue("Finger", "Unbekannt").indexOf('Stammkampfring')==-1 && GM_getValue("Stammkampfring", false)){
				restZeitString += "<br>Jetzt Stammkampfring anlegen!";
			}
		}
	}
	document.getElementById(spanId).innerHTML = restZeitString;
}


function printMagierkampfzeit(count, spanId, angemeldet) {
	if(count<0){count=0;}
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	count = Math.floor(count/60);
	var hours = count%24;
	count = Math.floor(count/24);
	var days = count%7;
	document.getElementById(spanId).setAttribute('style','color:yellow');
	var restZeitString = '';
	if(days > 0){
		restZeitString = days + ' Tage ' + format2(hours) + ':' + format2(minutes) + ':' + format2(seconds) + " Stunden";
	} else if(hours > 0){
		restZeitString = hours + ':' + format2(minutes) + ':' + format2(seconds) + " Stunden";
	} else if (minutes > 0){
		restZeitString = minutes + ':' + format2(seconds) + " Minuten";
	} else {
		restZeitString = seconds + " Sekunden";
	}
	if(!angemeldet){
		restZeitString = "Magierkampfanmeldung noch " + restZeitString + " möglich!";
	} else {
		restZeitString = "<font color=lime>Magierkampf beginnt in " + restZeitString + ".</font>";
		if (hours == 0 && minutes < 31){
			if(GM_getValue("Hand", "Unbekannt").indexOf('color=red')==-1){
				restZeitString += "<br>Jetzt Waffe anlegen!";
			}
		}
	}
	document.getElementById(spanId).innerHTML = restZeitString;
}


var muedeUpdateAusgefuehrt = false;
var muedigkeitNeu = -1;
function updateMuedigkeit(count, muedigkeit, nochUnterwegs) {
	if(muedigkeitNeu == -1){muedigkeitNeu=muedigkeit;}
	if(count<0){count=0;}
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	if (minutes > 0){
		if(minutes == 10){
			if(!muedeUpdateAusgefuehrt){
				if(nochUnterwegs){
					muedigkeitNeu += 2;
				} else {
					muedigkeitNeu -= 1;
				}
				var color = "lime";
				if(muedigkeitNeu>=100){
					muedigkeitNeu = 100;
				} else if(muedigkeitNeu<=0){
					muedigkeitNeu = 0;
				}
				if(muedigkeitNeu>=80){
					color = "red";
				} else if(muedigkeitNeu>60){
					color = "yellow";
				}
				document.getElementById('muede1').setAttribute('color',color);
				document.getElementById('muede1').innerHTML = muedigkeitNeu + " %";
				muedeUpdateAusgefuehrt = true;
			}
		} else {
			muedeUpdateAusgefuehrt = false;
		}
	}
}


function changeLagerUser(event) {
	var selectUser = document.getElementById('kp_userselect');
	var userName = selectUser.options[selectUser.selectedIndex].value;
	var nahrung = 0;
	var nahrungString = document.getElementsByTagName('table')[14].innerHTML.replace(userName,'userNameGM').replace(userName,'userNameGM').replace(/^[\S\s]*?userNameGM hat<br>/g,'').replace(/ Nahrung[\S\s]*/g,'').replace(/\./g,'');
	if(nahrungString.match(/^\d+$/g) != null){
		nahrung = parseInt(nahrungString);
	}
	var gold = 0;
	var goldString = document.getElementsByTagName('table')[14].innerHTML.replace(userName,'userNameGM').replace(userName,'userNameGM').replace(/^[\S\s]*?userNameGM hat<br>([\d\.]+ Nahrung<br>)*/g,'').replace(/ Gold[\S\s]*/g,'').replace(/\./g,'');
	if(goldString.match(/^\d+$/g) != null){
		gold = parseInt(goldString);
	}
	if((nahrung != 0 || gold != 0) && userName != GM_getValue("KP_UserName", "NoName")){
		GM_setValue("KP_Nahrung_" + userName, nahrung);
		GM_setValue("KP_Gold_" + userName, gold);
		GM_setValue("KP_Uebertragen", userName);
	}
	if(nahrung != 0){
		document.getElementsByName('menge_nahrung')[1].value=nahrung;
	} else {
		document.getElementsByName('menge_nahrung')[1].value='';
	}
	if(gold != 0){
		document.getElementsByName('menge_geld')[1].value=gold;
	} else {
		document.getElementsByName('menge_geld')[1].value='';
	}
}


function saveConfig(event) {
	var userName = document.getElementsByName('KP_UserName')[0];
	var stammName = document.getElementsByName('KP_StammName')[0];
	var tkHinweis = document.getElementsByName('KP_TKHinweis')[0];
	var skHinweis = document.getElementsByName('KP_SKHinweis')[0];
	var mkHinweis = document.getElementsByName('KP_MKHinweis')[0];
	var reminder = document.getElementsByName('KP_Reminder')[0];
	var kraftPunkte = document.getElementsByName('KP_KraftPunkte')[0];
	var intelligenzPunkte = document.getElementsByName('KP_IntelligenzPunkte')[0];
	var geschwindigkeitPunkte = document.getElementsByName('KP_GeschwindigkeitPunkte')[0];
	var listPunkte = document.getElementsByName('KP_ListPunkte')[0];
	var ausdauerPunkte = document.getElementsByName('KP_AusdauerPunkte')[0];
	var geschickPunkte = document.getElementsByName('KP_GeschickPunkte')[0];
	var holzpreis = document.getElementsByName('KP_HolzPreis')[0];
	var steinpreis = document.getElementsByName('KP_SteinPreis')[0];
	var holzrest = document.getElementsByName('KP_HolzRest')[0];
	var steinrest = document.getElementsByName('KP_SteinRest')[0];
	var nahrungrest = document.getElementsByName('KP_NahrungRest')[0];
	var goldrest = document.getElementsByName('KP_GoldRest')[0];
	var nahrungrund = document.getElementsByName('KP_NahrungRund')[0];
	var goldrund = document.getElementsByName('KP_GoldRund')[0];
	GM_setValue("KP_UserName", userName.value);
	GM_setValue("KP_StammName", stammName.value);
	GM_setValue("KP_TKHinweis", tkHinweis.checked);
	GM_setValue("KP_SKHinweis", skHinweis.value);
	GM_setValue("KP_MKHinweis", mkHinweis.value);
	GM_setValue("KP_Reminder", reminder.checked);
	GM_setValue("KP_KraftPunkte", kraftPunkte.value);
	GM_setValue("KP_IntelligenzPunkte", intelligenzPunkte.value);
	GM_setValue("KP_GeschwindigkeitPunkte", geschwindigkeitPunkte.value);
	GM_setValue("KP_ListPunkte", listPunkte.value);
	GM_setValue("KP_AusdauerPunkte", ausdauerPunkte.value);
	GM_setValue("KP_GeschickPunkte", geschickPunkte.value);
	GM_setValue("KP_HolzPreis", holzpreis.value);
	GM_setValue("KP_SteinPreis", steinpreis.value);
	GM_setValue("KP_HolzRest", holzrest.value);
	GM_setValue("KP_SteinRest", steinrest.value);
	GM_setValue("KP_NahrungRest", nahrungrest.value);
	GM_setValue("KP_GoldRest", goldrest.value);
	GM_setValue("KP_NahrungRund", nahrungrund.value);
	GM_setValue("KP_GoldRund", goldrund.value);
}


var GM_SuperValue = new function () {
	var JSON_MarkerStr  = 'ext_val: ';

	this.set = function (varName, varValue) {
		switch (typeof varValue) {
			case 'boolean':
			case 'string':
			GM_setValue (varName, varValue);
			break;
			case 'number':
			if (varValue === parseInt (varValue)  &&  Math.abs (varValue) < 2147483647){
				GM_setValue (varName, varValue);
				break;
			}
			case 'object':
			var safeStr = JSON_MarkerStr + JSON.stringify (varValue);
			GM_setValue (varName, safeStr);
			break;
			default:
			break;
		}
	}

	this.get = function (varName, defaultValue) {
		var varValue = GM_getValue (varName);
		if(!varValue) return defaultValue;
		if (typeof varValue == "string") {
			var regxp = new RegExp ('^' + JSON_MarkerStr + '(.+)$');
			var m = varValue.match (regxp);
			if (m  &&  m.length > 1) {
				varValue = JSON.parse ( m[1] );
				return varValue;
			}
		}
		return varValue;
	}
};


doService();