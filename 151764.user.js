// ==UserScript==
// @name					SZS-Assistent
// @namespace			Steinzeitspiel
// @description		Assistent für das SteinZeitSpiel
// @author				KingMaxi [InGame-Nick]
// @version				0.9.2
// @include				http://szs.looki.de/*
// @exclude				http://szs.looki.de/impressum.php
// @exclude				http://szs.looki.de/logout.php
// @exclude				http://szs.looki.de/szsb.html*
// @exclude				http://szs.looki.de/szss.html*
// @exclude				http://szs.looki.de/premium_looki.php?m=*
// @resource			SoundA http://freewavesamples.com/files/90%27s-Office-Phone.wav
// @resource			SoundB http://freewavesamples.com/files/Gong.wav
// @resource			SoundC http://freewavesamples.com/files/Roland-JX-8P-Bell-C5.wav
// @updateURL			https://userscripts.org/scripts/source/151764.meta.js
// @downloadURL		https://userscripts.org/scripts/source/151764.user.js
// @grant					GM_getValue
// @grant					GM_setValue
// @grant					GM_deleteValue
// @grant					GM_listValues
// @grant					GM_getResourceURL
// @grant					GM_xmlhttpRequest
// @grant					GM_log
// @grant					GM_info
// ==/UserScript==

/*
changelog
v0.1			initial release [06.11.2012]
v0.2			several bugs fixed; new: SN-Wiederherstellung, wenn noch nicht abgeschickt [09.11.2012]
v0.3			few bugs fixed; new: Thread-, Post- und IGM-Wiederherstellung, wenn noch nicht abgeschickt; new: Kills in der MK-Auswertung werden nun sortiert [14.11.2012]
v0.4			bugs fixed; new: Skillsystem, erweiterte eigene Länderansicht [10.12.2012]
v0.5			bugs fixed; new/change: Frei definierbarer Name für eigene Länder, Änderung des Update-Timestamp in Länderübersicht, EP in SK-Auswertung, Skillsystem-Config versteht nun neben Dezimalunkt auch Dezimalkomma, Config-Dialog überarbeitet, Seitenzahlen im StammForum, SK-MK-Copy überarbeitet [10.01.2013]
v0.6			kleine Verbesserungen; new: Standardtätigkeit hinzugefügt; change: SK-MK-Copy zeigt Waffenstand erst 5h vor Kampf an [13.01.2013]
v0.6.1		fixed/change: SK-Copy bricht Script ab, wenn kein Kampf -> SK-MK-Copy mit Waffenstand-Checkbox [14.01.2013]
v0.6.2		kleine Verbesserungen; fixed: Thread nach erstem Lesen in Übersicht nicht vollständig als gelesen markiert, wenn Posts am Ende gelöscht wurden; fixed: falsches/überflüssiges Werkzeug-Alert, wenn man mehr als ein Werkzeug einer Klasse besitzt; fixed: Google Chrome-Bugs (u.a. SaveConfig, CSS) [16.01.2013]
v0.6.3		kleine Verbesserungen; fixed: InventarIMGHeight wird (manchmal) nicht umgesetzt, wenn Seite neu geladen (Chrome), fixed: Skillsystem läuft nicht, wenn ein SOLL-Wert == 0 [16.01.2013]
v0.7			kleine Verbesserungen; Codeoptimierung; new: Einfaches Auszahlen von Einlagerungen aus dem Lagerlog heraus; new: Übertragen-Seite kennt URL-Parameter für Ressis und Tränke; new: Versionsnummer und Autor im Einstellungsdialog; fixed: Lager-Seite bricht ab, wenn unterwegs und Premium; new: Ausrüstung, Opfer, Artefakte wahlweise zentriert oder im rechten Menu [26.01.2013]
v0.7.1		new: Links in IGM, SN und Forum werden verlinkt; fixed: SK-Zeit im Menu ohne Anmeldeerkennung (Premium) [28.01.2013]
v0.7.2		new: Reminder-Sound; new: Artefakt herstellen/weihen im Aktionen-Menu und als Standardtätigkeit hinzugefügt; new: Logbuch-Filter (nur/keine Nachrichten); fixed: kein Fokus auf Zufallscode, wenn kein aktives Arbeitsopfer oder gültiges Artefakt des Drachenbluts; fixed: Talkampf-Anmeldezeit wird falsch gespeichert; fixed: SK-Zeit im Menu ohne "kein Kampf"-Erkennung (Premium); fixed: Kupfer- und Bronzekessel werden als Ausrüstung nicht erkannt; fixed/change: einige Änderungen der Hinweise beim Starten eines Arbeitsgangs [05.02.2013]
v0.7.3		new: Freunde werden alphabetisch sortiert; change: Logbuch-Filter anders angeordnet; fixed: Zeitangaben werden manchmal falsch ausgelesen; fixed: Ist man unterwegs, werden Marktangebote nicht hervorgehoben (Premium); fixed: Artefakte herstellen/weihen wird nicht als Tätigkeit/Arbeit erkannt; fixed: Teilweise veraltete/falsche Tätigkeitsangabe im Tätigkeitscountdown; fixed: Activity-Reminder erinnert nicht, wenn man nach Tätigkeitsbeginn Seite nicht neu lädt; fixed: TK-Anmeldeanzeige zeigt manchmal falschen Status [14.02.2013]
v0.7.4		change: Freunde-Sortierung optional/einstellbar [15.02.2013]
v0.8			kleine Verbesserungen und Fixes; new: Onlinestatusfarbe von Freunden aktualisiert sich automatisch; new: one-click-Rohstoffesicherung auf Stammkampf-Seite (Markt/Lager: voreingetragene Werte entfernt); new: einstellbare Anzeige für Uhrzeit und SK-Zeit im Menu; new: Stamm-EP in StammTop; change: Stammkampfzeitbestimmung überarbeitet; change: SK-Auswertung überarbeitet (u. a. keine fehlenden Daten mehr, Bugfix); change: Auslesen von Ausrüstung und Artefakten verbessert [26.02.2013]
v0.8.1		ein paar Kleinigkeiten; change: one-click-Rohstoffsicherung aus- und alte Rohstoffsicherung wieder eingebaut (wg. Verstoß gegen Punkt 3 der Regeln) [02.03.2013]
v0.8.2		new: Message-Reminder und -sound; new: Sound "Glocke" hinzugefügt; new: Sound-Lautstärke einstellbar; fixed/change: Reminder-Hinweise kommen nur noch in einem Tab; change: Länderansicht überarbeitet (immer aktuelle Daten, keine frei definierbaren Namen mehr) [13.03.2013]
v0.8.3		new: SK-Gegner zur SK-Zeit im Menu hinzugefügt; fixed: Zeitangaben werden manchmal falsch ausgelesen; fixed: "MK läuft" wird bis 1h nach MK angezeigt [20.03.2013]
v0.8.4		fixed: 2 kleine Fehler, wenn man stammlos ist; fixed: SK-Bestimmung fehlerhaft, wenn Sonderzeichen in Gegnername; change: IGM-Wiederherstellung überarbeitet; change: Kommas aus SK-Auswertung entfernt um Kompatibilität mit anderen Programmen zu gewährleisten [25.03.2013]
v0.8.5		change: Tätigkeits-Countdown zeigt Zeiten >1h auch in min an; fixed: fehlerhafte ist-derzeit-unterwegs-Erkennung in MK-Startnachricht; fixed: einige Fehler im Bereich Text-/Nickerkennung; fixed: Problem mit Sonderzeichen bei IGM-Wiederherstellung; new: Script-eigener Versions-Check (+ Hinweis im linken Menu einstellbar) [09.04.2013]
v0.8.6		fixed: Fehler in SK-Auswertung, falsche Angreifer-/Verteidigeranzahl [21.04.2013]
v0.8.7		new: Direktlinks in Hinweise eingefügt (Arbeitsopfer, Waffenopfer); new: PN-Icons in Freundesliste; change: PN-Icons in SN verkleinert; new: gelb in den SN schreiben (sieht natürlich nur, wer auch das Script hat!); new: Stammname in SK-Auswertung; new: Logbuch-Filter zeigt neue Einträge ("NEU") immer an; fixed: KöhlerDingens wird in Länderansicht nicht erkannt; fixed: TK- + MK-Zeiten in Beschreibungstexten falsch [07.05.2013]
v0.8.8		new: Auswahlmöglichkeiten für Lagerauszahlungen (nur eigene, + andere, alle) [19.05.2013]
v0.8.9		fixed: Direktlinks werden beim zusammenfassen des Inventars angezeigt; new: SK-Auswertung opt-out (Performance); fixed: unvollständige SK-Auswertung, wenn SN-Seite zu früh verlassen wird; new: Waffen- und Werkzeugwarnung (opt-out); new: Landüberwachung; fixed: Menueintrag Lagerfeuer, wenn noch kein Lagerfeuer gebaut; new: CP für SOLL-Skillung; Codeoptimierung [11.06.2013]
v0.8.10		new: "Zufallscode nicht richtig" stärker hervorgehoben; new: PN-Icons im StammForum; new: Menupunkt farbig, wenn neuer GB-Eintrag; fixed: Bugs mit Quellcode-komprimierenden Internetanbietern; fixed: Fehler beim Auslösen von Hotkeys im neusten Firefox 22; fixed: HTML-Sonderzeichen in PN-Widerherstellungsvorschau [26.06.2013]
v0.8.11		new: Links zur Kartenansicht für Marktländer hinzugefügt; new: Durchschnittswerte in Stammübersicht; new: Status-Spalte in 2. Tabelle in Stammübersicht entfernt und Status mit Spalte 1 verknüpft; new: MK-Startnachricht speichert MK-Teilnehmer; fixed: Doppelte Klammern in SK-Auswertung beim Stammname; new/change: neue/erweiterte MK-Auswertung; new: Links im Logbuch (TK-Gegner, Nachricht an, Übertragungen) [22.08.2013]
v0.8.12		change: Links im Logbuch überarbeitet; fixed: Magierkill falsch/gar nicht gewertet; new: Magierkill in MK-Auswertung in orange hervorgehoben; new: Links im Logbuch für Marktein-/-verkäufe; zusätzliche Seitenaufrufe reduziert; new: Auofokus auf Eingabefeld beim Kaufen vom Markt [26.09.2013]
v0.8.13		fixed: Logbuch-Links, wenn Angebot nicht verkauft werden konnte; change: SK-Auswertung per Button, Option in Einstellungen entfernt [24.10.2013]
v0.8.14		fixed: TK-Anmeldung wird gespeichert, obwohl zu wenig Ressis; fixed: SK-Auswertung funktioniert nicht [24.10.2013]
v0.8.15		fixed: Logbuch-Links, wenn Angebot nicht verkauft werden konnte (jetzt aber :D); fixed: Logbuch-TK-Links zur Winterzeit nicht vorhanden; fixed: Sonderzeichen in Vorschau für gespeicherte PN; new: Wenn Zufallscode falsch eingegeben wurde, Weiter-/Zurückleitung zur Arbeitsseite; new: maximal mögliche Kaufmenge auf Marktkaufseite; new: Wenn Müdigkeit >= 80%, verlinkt zu st. Wachtrank; fixed: MK-Teilnehmerstand-Zeit manchmal falsch [22.01.2014]
v0.9			change: update- und downloadURL von http auf https geändert; fixed: Logbuchlinks (Sonderzeichennicks); fixed: Handling von URL-Parametern (Sonderzeichen); fixed: SK-Auswertung (Nick kann nicht gefunden weden); fixed: Abbrechen-Link flackert/wird ständig neu gesetzt; new: Inventar überarbeitet; new: Waffen-/Ringtausch; fixed: Konflikt zw. Übertragung und Jagdergebnis (Logbuch); fixed/new: Forum jetzt auch ohne Forenrechte nutzbar (beim Verlust der Forenrechte werden alte Beiträge ggf. als ungelesen markiert!); new: Weiterleitung zurück zur ursprünglichen Seite nach Direktlink; change: Rohstoffsicherung via Stammkampfseite (nicht mehr via Lager + Markt); new: Standardmengen- und preise für alle Rohstoffe; sowie ein paar Kleinigkeiten [16.04.2014]
v0.9.1		change: Waffen ab- statt aufsteigend im Inventar; change: Wachtränke vor Heiltränken im Inventar; fixed: Werkzeuge werden nicht angezeigt [17.04.2014]
v0.9.2		fixed: Anzahl Ringe/Waffen/Werkezuge, wenn gleicher Gegenstand in der Hand; fixed: Trankverkauf -> Geistertränke auf dem Markt -> Trankverlust (kritisch!) [18.04.2014]

------------------------------
Do not change anything further
------------------------------
*/

// Login-Focus
if(document.URL.indexOf('/login.php') != -1 && document.getElementsByName('code')[0]) {
	document.getElementsByName('code')[0].focus();
} else if(document.getElementsByTagName('a')[0].href.indexOf('login.php') != -1) {
// Weiterleitung zum Login
	window.location.href = 'http://szs.looki.de/login.php';

} else if(document.URL.indexOf('/charakter.php') != -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('top.location.href=\'charakter.php\'') != -1) {
// Charakterpunkte verteilt (Dein SteinzeitMensch hat sich verbessert.)
	window.location.href = 'http://szs.looki.de/charakter.php';

} else if(document.URL.indexOf('/login.php') == -1) {
	var scriptstarttime = new Date();


// CSS-Deklarationen
	var css = document.createElement('style');
	css.setAttribute('type', 'text/css');
	document.getElementsByTagName('head')[0].appendChild(css);
	css.innerHTML = 'body {margin:10px}';
	css.innerHTML += '#serverzeit {position:absolute; top:27px; font-size:14px; font-weight:bold; background-color:rgba(0, 0, 0, 0.6); padding: 3px 4px; border-radius:4px;}';
	css.innerHTML += '#reminder {position:absolute; top:27px; width:122px; font-size:14px; font-weight:bold; background-color:rgba(0, 0, 0, 0.6); padding: 3px 4px; border-radius:5px;}';
	css.innerHTML += '#tk_inner, #sk_inner, #mk_inner {position: absolute; right:4px;}';
	css.innerHTML += '#weather {position:absolute; top:29px; background-color:rgba(0, 0, 0, 0.6); padding: 6px 5px; border-radius:5px;}';
	css.innerHTML += '.green {color:#00ff00;}';
	css.innerHTML += '.yellow {color:#ffff00;}';
	css.innerHTML += '.orange {color:#ff8000;}';
	css.innerHTML += '.red {color:#ff0000;}';
	css.innerHTML += '.left {text-align:left;}';
	css.innerHTML += '.center {text-align:center;}';
	css.innerHTML += '.right {text-align:right;}';
	css.innerHTML += '.pn-icon {background:url(\'http://maxi.4tone.de/szs/img/pn-icon.png\') no-repeat transparent; display:inline-block; width:15px; height:10px;}';
	css.innerHTML += '.pn-icon-s {background:url(\'http://maxi.4tone.de/szs/img/pn-icon-s.jpg\') no-repeat transparent; display:inline-block; width:11px; height:7px}';
	css.innerHTML += '#scriptlaufzeit {font-size:9px; font-weight:normal;}';
	css.innerHTML += '.menuHeadline {background: url("/static/menu.png") repeat-x transparent; height:22px; margin-top:2px; padding-top:8px; text-align:center;}';
	css.innerHTML += '.menuItemContainer {margin-bottom:12px; padding:0 1px;}';
	css.innerHTML += '#infoanzeige table {background: url("/static/bgs.png") repeat transparent; width:100%; padding: 0 10px 5px 10px}';
	css.innerHTML += '#infoanzeige th:nth-child(2n+1) {background: url("/static/menu.png") repeat-x transparent; height:30px; font-size:11px;}';
	css.innerHTML += '#infoanzeige th:nth-child(2n) {width:50px;}';
	css.innerHTML += '#infoanzeige td:nth-child(2n+1) {vertical-align:top;}';
	css.innerHTML += '#aktuelleAktion {text-align:center; height:30px;}';
	css.innerHTML += '#site_extern {height: 100%; text-align:center; vertical-align:top; padding-left:10px; top:'+(window.pageYOffset)+'px}';
	css.innerHTML += '.headline {position:relative; font-size:18px; text-decoration:underline; padding-bottom:10px;}';
	css.innerHTML += '#quicklinks td {vertical-align:top; padding-right:5px;}';
	css.innerHTML += '#notice {position:relative; width:100%; top:0;}';
	css.innerHTML += '#configLayer {display:none; position:fixed; top:50px; width:500px; background-color:#215C28;}';
	css.innerHTML += '.border-right {background: url("/static/stab.png") repeat-y transparent; width:8px; height:100%; float:right;}';
	css.innerHTML += '.border-left {background: url("/static/stab.png") repeat-y transparent; width:8px; height:100%; float:left;}';
	css.innerHTML += '#config-main {height:100%; margin: 0 8px;}';
	css.innerHTML += '.border-top {background: url("/static/menu.png") repeat-x transparent; width:100%; height:30px;}';
	css.innerHTML += '.border-bottom {background: url("/static/menu.png") repeat-x transparent; width:100%; height:30px;}';
	css.innerHTML += '.close {padding:7px 5px 0 0; font-weight:bold; font-size:12px; float:right;}';
	css.innerHTML += '.close a {color:#ffffff; text-decoration:none;}';
	css.innerHTML += '.close a:hover {color:#ACACAC;}';
	css.innerHTML += '#config-content {padding:5px; width:472px; overflow:auto; margin-bottom:5px;}';
	css.innerHTML += 'h1 {font-size:16px; margin:0 0 15px 0;}';
	css.innerHTML += 'h2 {font-size:13px; margin:10px 0 2px; display:inline-block;}';
	css.innerHTML += '.configItemToggle {text-decoration:none;}';
	css.innerHTML += '.i1 {width:100%;}';
	css.innerHTML += '.i2 {width:55px;}';
	css.innerHTML += '.i1, .i2 {margin: 1px 0;}';
	css.innerHTML += '.tir {text-align:right;}';
	css.innerHTML += '.s {width:7px}';
	css.innerHTML += '#resetbuttons {text-align:center; margin: 30px 0 15px 0; padding-top: 10px; border-top: 2px solid #ABABAB;}';
	css.innerHTML += '#button_ResetConfig {position:relative; right:50px;}';
	css.innerHTML += '#button_DeleteAll {position:relative; left:40px;}';
	css.innerHTML += '.version {left:15px;}';
	css.innerHTML += '.scriptlink {left: 204px;}';
	css.innerHTML += '.author {right:20px;}';
	css.innerHTML += '.version, .scriptlink, .author {position:absolute; bottom:10px; font-size:10px;}';
	css.innerHTML += '#resSaveButton, #forumDataDel {margin:20px 0 10px 10px;}';
	css.innerHTML += '#forum-legend {margin-left:15px;}';
	css.innerHTML += '.postrecovery {text-align:center; font-size:10px; color:#ffff00; margin: 5px 0 15px;}';
	css.innerHTML += '.button {cursor:pointer;}';
	css.innerHTML += '.button.save { margin: 0 5px;}';
	css.innerHTML += '.kampfcopy {width:100%; height:150px;}';
	css.innerHTML += '#stammnachrichteneingabetable {width:95%;}';
	css.innerHTML += '#stammnachrichteneingabe {width:100%; height:200px;}';
	css.innerHTML += '#posteingabe {width:100%; height:300px;}';
	css.innerHTML += '.eigeneLaender thead td {font-weight:bold; text-align:center;}';
	css.innerHTML += '.eigeneLaender td {padding:3px 1px; text-align:center;}';
	css.innerHTML += 'table.inventar thead td {font-weight:bold; padding: 4px; text-align:center;}';
	css.innerHTML += 'table.inventar td {padding:0px 4px; text-align:center;}';
	css.innerHTML += '.configTable {width:100%}';
	css.innerHTML += '.greenDot {display:inline-block; background-color:#64c02c ; width:10px; height: 10px; border-radius:5px;}';
	css.innerHTML += '.redDot {display:inline-block; background-color:#db1100 ; width:10px; height: 10px; border-radius:5px;}';
	css.innerHTML += '.blueDot {display:inline-block; background-color:#1668df ; width:10px; height: 10px; border-radius:5px;}';
	css.innerHTML += '#topiceingabe {width:300px;}';
	css.innerHTML += '#contenteingabe {width:100%; height:300px;}';


// Hotkeys
var hotkeys = new Array(
	['Logbuch', 'http://szs.looki.de/news.php', 'l'],
	['Alte Logbucheintrage', 'http://szs.looki.de/news.php?alte=1', ''],
	['Profil', 'http://szs.looki.de/profil.php', 'p'],
	['Charakter', 'http://szs.looki.de/charakter.php', 'c'],
	['Inventar', 'http://szs.looki.de/inventar.php', 'i'],
	['Artefakte', 'http://szs.looki.de/artefakt.php', 'a'],
	['Karte', 'http://szs.looki.de/karte.php', ''],
	['Land', 'http://szs.looki.de/deinland.php', ''],
	['Jagd', 'http://szs.looki.de/jagd.php', 'j'],
	['Wasser suchen', 'http://szs.looki.de/wasser.php', 'w'],
	['Holz fällen', 'http://szs.looki.de/holzfaeller.php', ''],
	['Köhlern', 'http://szs.looki.de/koehlern.php', ''],
	['Steine metzen', 'http://szs.looki.de/steinmetz.php', ''],
	['Kupfer abbauen', 'http://szs.looki.de/kupferding.php', ''],
	['Bronze herstellen', 'http://szs.looki.de/bronze.php', ''],
	['Zinn abbauen', 'http://szs.looki.de/zinnding.php', ''],
	['Trank brauen', 'http://szs.looki.de/schamane.php', ''],
	['Waffe bauen', 'http://szs.looki.de/waffenschmied.php', ''],
	['Werkzeug bauen', 'http://szs.looki.de/werkzeug.php', ''],
	['Schlafen', 'http://szs.looki.de/schlafen.php', ''],
	['Einzelkampf', 'http://szs.looki.de/kampf.php', ''],
	['Talkampf', 'http://szs.looki.de/grtal.php', ''],
	['Stammkampf', 'http://szs.looki.de/stamm.php?do=kampfsuche', ''],
	['Magierkampf', 'http://szs.looki.de/stamm.magierkampf.php', ''],
	['Markt', 'http://szs.looki.de/markt.php', 'm'],
	['Händler', 'http://szs.looki.de/nahrung.php', ''],
	['Waffenhöhle', 'http://szs.looki.de/waffenshop.php', ''],
	['Nomade', 'http://szs.looki.de/nomade.php', ''],
	['StammÜbersicht', 'http://szs.looki.de/stamm.php?do=uebersicht', 'u'],
	['StammNachrichten', 'http://szs.looki.de/stamm.php?do=nachricht', 'n'],
	['Alte StammNachrichten', 'http://szs.looki.de/stamm.php?do=nachricht&alte=1', ''],
	['StammForum', 'http://szs.looki.de/stammforum.forum.php', 'f'],
	['Lager', 'http://szs.looki.de/stamm.php?do=lager', ''],
	['Waffenlager', 'http://szs.looki.de/stamm.php?do=waffenlager', ''],
	['Tranklager', 'http://szs.looki.de/stamm.php?do=tranklager', ''],
	['Werkzeuglager', 'http://szs.looki.de/stamm.php?do=werkzeuglager', ''],
	['Altar', 'http://szs.looki.de/altar.php', ''],
	['Weltwunder', 'http://szs.looki.de/weltwunder.php', ''],
	['Lagerfeuer', 'http://szs.looki.de/stamm.php?do=lagerfeuer', ''],
	['UserTop', 'http://szs.looki.de/top.php', '1'],
	['StammTop', 'http://szs.looki.de/stammtop.php', '2'],
	['Aktive Spieler', 'http://szs.looki.de/aktivespieler.php', '3'],
	['Aktive Stämme', 'http://szs.looki.de/aktivpunkte.php', '4'],
	['VIPTop', 'http://szs.looki.de/viptop.php', ''],
	['UserSuche', 'http://szs.looki.de/userinfo.php', ''],
	['StammSuche', 'http://szs.looki.de/stamminfo.php', ''],
	['OnlineUser', 'http://szs.looki.de/useronline.php', '']
);
GM_getValue("Assi_Hotkeys", "");
var strHotkeys = GM_getValue("Assi_Hotkeys", "");
strHotkeys = strHotkeys.split('|');
if(hotkeys.length == strHotkeys.length-1) {
	for(var i=0; i<hotkeys.length; i++) {
		hotkeys[i][2] = strHotkeys[i];
	}
}



// Standardelemente
	var wrap = document.getElementsByTagName('table')[0];
	wrap.setAttribute('id', 'wrap');
	var main = document.getElementsByTagName('table')[1];
	main.setAttribute('id', 'main');
	var i=0;
	while(document.getElementById('main').getElementsByTagName('td')[i].innerHTML.indexOf('<!-- INHALT ANFANG -->') == -1) {
		i++;
	}
	var content = document.getElementById('main').getElementsByTagName('td')[i];
	content.setAttribute('id', 'content');
	var aktuelleAktion = document.getElementById('content').getElementsByTagName('td')[0];
	aktuelleAktion.setAttribute('id', 'aktuelleAktion');
	aktuelleAktion.removeAttribute('align');
	var i=0;
	while(document.getElementById('main').getElementsByTagName('td')[i].innerHTML.indexOf('<!-- linkes menu ANFANG -->') == -1) {
		i++;
	}
	var menuLeft = main.getElementsByTagName('td')[i];
	var i=0;
	while(document.getElementById('main').getElementsByTagName('td')[i].innerHTML.indexOf('<!-- rechtes menu ANFANG -->') == -1) {
		i++;
	}
	var menuRight = main.getElementsByTagName('td')[i];
	var waffen = 'Stock#Stock mit Bronze#Keule#Speer mit Holzspitze#Speer mit Steinspitze#Pfeil und Bogen#Pfeil und Bogen PLUS#Pfeil und Bogen Bronze#Knochenspalter#Knochenspalter PLUS#Knochenspalter Bronze#Hammerfaust#Hammerfaust Bronze#Berserkerfaust#Götterzorn';
	var werkzeuge = 'Kupfer-Keil#Kupfer-Schaber#Kupfer-Hacke#Zinn-Keil#Zinn-Schaber#Kupferkessel#Bronzekessel';
	var ringe = 'Talkampfring#Stammkampfring#Wasserring#Jagdring#Marktring';
	var traenke = 'Wachtrank#starker Wachtrank#kleiner Heiltrank#mittlerer Heiltrank#starker Heiltrank#Holztrank#Steintrank#Zinntrank#Kupfertrank';
	var isPremiumSpieler = (document.getElementsByTagName('body')[0].getAttribute('onscroll') == null)? true : false;
	var i=0;
	while(document.getElementsByTagName('center')[i].innerHTML.indexOf('Jahres nach der 1. Nacht des Nomaden.') == -1) {
		i++;
	}
	var servertime = document.getElementsByTagName('center')[i].innerHTML;
	var audioA = document.createElement('audio');
	audioA.setAttribute('src', GM_getResourceURL("SoundA"));
	audioA.setAttribute('id', 'audioA');
	document.body.appendChild(audioA);
	var audioB = document.createElement('audio');
	audioB.setAttribute('src', GM_getResourceURL("SoundB"));
	audioB.setAttribute('id', 'audioB');
	document.body.appendChild(audioB);
	var audioC = document.createElement('audio');
	audioC.setAttribute('src', GM_getResourceURL("SoundC"));
	audioC.setAttribute('id', 'audioC');
	document.body.appendChild(audioC);



// Konfiguration
	var configLayer = document.createElement("div");
	configLayer.setAttribute("id", "configLayer");
	var configContent = '<h1>SZS-Assistent - Einstellungen</h1><form id="configForm" action="javascript:hideElement(\'configLayer\')" method="post">';
	// Allgemein
	configContent += '<h2>Allgemein</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Allgemein\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Allgemein\')">[-]</a><br>';
	configContent += '<div id="configItem-Allgemein" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	configContent += '<tr><td width="115px">Username</td><td colspan="2"><input class="i1" type="text" name="Assi_UserName" value="'+GM_getValue("Assi_UserName", "")+'"></td></tr>';
	configContent += '<tr><td>Stamm</td><td colspan="2"><input class="i1" type="text" name="Assi_StammName" value="'+GM_getValue("Assi_StammName", "")+'"></td></tr>';
	configContent += '<tr><td>Info-Anzeigen</td><td width="130px"><input type="radio" name="Assi_Infoanzeigen" value="menu"'+((GM_getValue("Assi_Infoanzeigen", "menu") == 'menu')? ' checked="checked"' : '')+'>im rechten Menu<br><input type="radio" name="Assi_Infoanzeigen" value="zentriert"'+((GM_getValue("Assi_Infoanzeigen", "menu") == 'zentriert')? ' checked="checked"' : '')+'>zentriert<br></td><td align="center">Position für Ausrüstung-, Opfer- und Artefakte-Info</td></tr>';
	configContent += '<tr><td>Freunde-Sortierung</td><td align="center"><input type="checkbox" name="Assi_FreundeSortierung"'+((GM_getValue("Assi_FreundeSortierung", false))? ' checked="checked"' : '')+'></td><td align="center">Alphabetisch</td></tr>';
	configContent += '<tr><td>Notizen anzeigen</td><td align="center"><input type="checkbox" name="Assi_Notizen"'+((GM_getValue("Assi_Notizen", false))? ' checked="checked"' : '')+'></td><td><br></td></tr>';
	configContent += '<tr><td>Hotkey-Timeout</td><td><input class="i2 tir" type="text" name="Assi_HotkeyTimeout" value="'+GM_getValue("Assi_HotkeyTimeout", "500")+'"> ms</td><td align="center">Zeit bis eine Hotkeyeingabe verfällt</td></tr>';
	configContent += '<tr><td>Bilderhöhe im Inventar</td><td><input class="i2 tir" type="text" name="Assi_InventarIMGheight" value="'+GM_getValue("Assi_InventarIMGheight", "50")+'"> Pixel</td><td align="center">0 = Standardgröße</td></tr>';
	configContent += '<tr><td>Lagerauszahlungen</td><td colspan="2"><input type="radio" name="Assi_Lagerauszahlungen" value="eigene"'+((GM_getValue("Assi_Lagerauszahlungen", "eigene") == 'eigene')? ' checked="checked"' : '')+'>Nur eigene Einzahlungen<br><input type="radio" name="Assi_Lagerauszahlungen" value="andere"'+((GM_getValue("Assi_Lagerauszahlungen", "eigene") == 'andere')? ' checked="checked"' : '')+'>eigene und andere: (Nicks mit Komma trennen)<input class="i1" type="text" name="Assi_LagerauszahlungenNicks" value="'+GM_getValue("Assi_LagerauszahlungenNicks", "")+'"><br><input type="radio" name="Assi_Lagerauszahlungen" value="alle"'+((GM_getValue("Assi_Lagerauszahlungen", "eigene") == 'alle')? ' checked="checked"' : '')+'>alle<br></td></tr>';
	configContent += '<tr><td>Uhrzeit links im Menu</td><td align="center"><input type="checkbox" name="Assi_MenuUhrzeit"'+((GM_getValue("Assi_MenuUhrzeit", false))? ' checked="checked"' : '')+'></td><td align="center"><br></td></tr>';
	configContent += '<tr><td>SK-Zeit rechts im Menu</td><td align="center"><input type="checkbox" name="Assi_MenuSKZeit"'+((GM_getValue("Assi_MenuSKZeit", false))? ' checked="checked"' : '')+'></td><td align="center"><br></td></tr>';
	configContent += '<tr><td>Version-Check</td><td align="center"><input type="checkbox" name="Assi_MenuVersionTip"'+((GM_getValue("Assi_MenuVersionTip", true))? ' checked="checked"' : '')+'></td><td align="center">Zeigt dir im Menu, ob eine neue Script-Version online ist.</td></tr>';
	configContent += '</table></div>';
	// Reminder
	configContent += '<h2>Reminder</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Reminder\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Reminder\')">[-]</a><br>';
	configContent += '<div id="configItem-Reminder" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	configContent += '<tr><td width="115px">Activity-Reminder</td><td width="180px" align="center"><input type="checkbox" name="Assi_ActivityReminder"'+((GM_getValue("Assi_ActivityReminder", false))? ' checked="checked"' : '')+'></td><td align="center">Hinweis, wenn du wieder verfügbar bist.</td></tr>';
	configContent += '<tr><td>Activity-Sound</td><td>';
		configContent += '<input type="radio" name="Assi_Remindersound" value=""'+((GM_getValue("Assi_Remindersound", "") == '')? ' checked="checked"':'')+'>Kein Sound<br>';
		configContent += '<input type="radio" name="Assi_Remindersound" value="SoundA"'+((GM_getValue("Assi_Remindersound", "") == 'SoundA')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Reminder\', \'audioA\')">Phone-Ring</a><br>';
		configContent += '<input type="radio" name="Assi_Remindersound" value="SoundB"'+((GM_getValue("Assi_Remindersound", "") == 'SoundB')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Reminder\', \'audioB\')">Gong</a><br>';
		configContent += '<input type="radio" name="Assi_Remindersound" value="SoundC"'+((GM_getValue("Assi_Remindersound", "") == 'SoundC')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Reminder\', \'audioC\')">Glocke</a><br>';
	configContent += '</td><td align="center">Wird zusätzlich zum Reminder abgespielt.</td></tr>';
	configContent += '<tr><td>Lautstärke</td><td><input class="i2 tir" type="text" name="Assi_ReminderSoundVolume" value="'+GM_getValue("Assi_ReminderSoundVolume", 100)+'"> %</td><td align="center">Lautstärke des <br>Activity-Sounds</td></tr>';
	configContent += '<tr><td>Standardtätigkeit</td><td>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value=""'+((GM_getValue("Assi_Standardtaetigkeit", "") == '')? ' checked="checked"':'')+'>Keine<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Jagen"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Jagen')? ' checked="checked"':'')+'>Jagen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Wasser"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Wasser')? ' checked="checked"':'')+'>Wasser suchen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Holz"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Holz')? ' checked="checked"':'')+'>Holz fällen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Stein"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Stein')? ' checked="checked"':'')+'>Steine metzen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Kohle"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Kohle')? ' checked="checked"':'')+'>Köhlern<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Kupfer"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Kupfer')? ' checked="checked"':'')+'>Kupfer abbauen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Zinn"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Zinn')? ' checked="checked"':'')+'>Zinn abbauen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Bronze"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Bronze')? ' checked="checked"':'')+'>Bronze herstellen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Trank"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Trank')? ' checked="checked"':'')+'>Trank brauen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Waffe"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Waffe')? ' checked="checked"':'')+'>Waffe bauen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Werkzeug"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Werkzeug')? ' checked="checked"':'')+'>Werkzeug bauen<br>';
		configContent += '<input type="radio" name="Assi_Standardtaetigkeit" value="Artefakt"'+((GM_getValue("Assi_Standardtaetigkeit", "") == 'Artefakt')? ' checked="checked"':'')+'>Artefakt herstellen/weihen<br>';
	configContent += '</td><td align="center">Diese Tätigkeit wird aufgerufen, wenn du wieder verfügbar bist.<br><br><br>Funktioniert nur mit aktiviertem Activity-Reminder!</td></tr>';
	configContent += '<tr><td>Message-Reminder</td><td align="center"><input type="checkbox" name="Assi_MessageReminder"'+((GM_getValue("Assi_MessageReminder", false))? ' checked="checked"' : '')+'></td><td align="center">Hinweis, wenn eine neue Nachricht eingeht.</td></tr>';
	configContent += '<tr><td>Message-Sound</td><td>';
		configContent += '<input type="radio" name="Assi_Messagesound" value=""'+((GM_getValue("Assi_Messagesound", "") == '')? ' checked="checked"':'')+'>Kein Sound<br>';
		configContent += '<input type="radio" name="Assi_Messagesound" value="SoundA"'+((GM_getValue("Assi_Messagesound", "") == 'SoundA')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Message\', \'audioA\')">Phone-Ring</a><br>';
		configContent += '<input type="radio" name="Assi_Messagesound" value="SoundB"'+((GM_getValue("Assi_Messagesound", "") == 'SoundB')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Message\', \'audioB\')">Gong</a><br>';
		configContent += '<input type="radio" name="Assi_Messagesound" value="SoundC"'+((GM_getValue("Assi_Messagesound", "") == 'SoundC')? ' checked="checked"':'')+'><a href="javascript:playSound(\'Message\', \'audioC\')">Glocke</a><br>';
	configContent += '</td><td align="center">Wird abgespielt, wenn eine neue Nachricht eingeht.<br>Unabhängig vom Hinweis!</td></tr>';
	configContent += '<tr><td>Lautstärke</td><td><input class="i2 tir" type="text" name="Assi_MessageSoundVolume" value="'+GM_getValue("Assi_MessageSoundVolume", 100)+'"> %</td><td align="center">Lautstärke des Message-Sounds</td></tr>';
	configContent += '<tr><td>Waffen- und Werkzeugwarnung</td><td align="center"><input type="checkbox" name="Assi_WaffenWerkzeugWarnung"'+((GM_getValue("Assi_WaffenWerkzeugWarnung", true))? ' checked="checked"' : '')+'></td><td align="center"><br></td></tr>';
	configContent += '<tr><td>Gästebucheintrag</td><td align="center"><input type="checkbox" name="Assi_Gaestebucheintrag"'+((GM_getValue("Assi_Gaestebucheintrag", true))? ' checked="checked"' : '')+'></td><td align="center">Hinweis bei neuem GB-Eintrag<br></td></tr>';
	configContent += '</table></div>';
	// Skillsystem
	configContent += '<h2>Skillsystem</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Skillsystem\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Skillsystem\')">[-]</a><br>';
	configContent += '<div id="configItem-Skillsystem" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	configContent += '<tr><td width="115px">Kraft</td><td><input class="i2 tir" type="text" name="Assi_Kraft" value="'+GM_getValue("Assi_Kraft", "")+'"></td><td rowspan="6" align="center">Trage hier Punkte oder Prozent ein um die Verteilung zu bestimmen.</td></tr>';
	configContent += '<tr><td>Intelligenz</td><td><input class="i2 tir" type="text" name="Assi_Intelligenz" value="'+GM_getValue("Assi_Intelligenz", "")+'"></td></tr>';
	configContent += '<tr><td>Geschwindigkeit</td><td><input class="i2 tir" type="text" name="Assi_Geschwindigkeit" value="'+GM_getValue("Assi_Geschwindigkeit", "")+'"></td></tr>';
	configContent += '<tr><td>List</td><td><input class="i2 tir" type="text" name="Assi_List" value="'+GM_getValue("Assi_List", "")+'"></td></tr>';
	configContent += '<tr><td>Ausdauer</td><td><input class="i2 tir" type="text" name="Assi_Ausdauer" value="'+GM_getValue("Assi_Ausdauer", "")+'"></td></tr>';
	configContent += '<tr><td>Geschick</td><td><input class="i2 tir" type="text" name="Assi_Geschick" value="'+GM_getValue("Assi_Geschick", "")+'"></td></tr>';
	configContent += '</table></div>';
	// Rohstoffsicherung
	configContent += '<h2>Rohstoffsicherung</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Rohstoffsicherung\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Rohstoffsicherung\')">[-]</a><br>';
	configContent += '<div id="configItem-Rohstoffsicherung" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	configContent += '<tr><td width="115px">Nahrung</td><td width="90px"><input class="i2 tir" type="text" name="Assi_NahrungRest" value="'+GM_getValue("Assi_NahrungRest", "50")+'"></td><td rowspan="4" align="center">Wieviele Rohstoffe sollen mindestens behalten werden?</td></tr>';
	configContent += '<tr><td>Gold</td><td><input class="i2 tir" type="text" name="Assi_GoldRest" value="'+GM_getValue("Assi_GoldRest", "50")+'"></td></tr>';
	configContent += '<tr><td>Holz</td><td><input class="i2 tir" type="text" name="Assi_HolzRest" value="'+GM_getValue("Assi_HolzRest", "0")+'"></td></tr>';
	configContent += '<tr><td>Stein</td><td><input class="i2 tir" type="text" name="Assi_SteinRest" value="'+GM_getValue("Assi_SteinRest", "0")+'"></td></tr>';
	configContent += '<tr><td>Nahrung</td><td><input class="i2 tir" type="text" name="Assi_NahrungRund" value="'+GM_getValue("Assi_NahrungRund", "100")+'"></td><td rowspan="2" align="center">Auf was soll beim Sichern abgerundet werden?<br>z. B. 10, 50, 100, ...</td></tr>';
	configContent += '<tr><td>Gold</td><td><input class="i2 tir" type="text" name="Assi_GoldRund" value="'+GM_getValue("Assi_GoldRund", "100")+'"></td></tr>';
	configContent += '<tr><td>Holz</td><td><input class="i2 tir" type="text" name="Assi_HolzPreis" value="'+GM_getValue("Assi_HolzPreis", "100")+'"> Gold</td><td rowspan="2" align="center">Zu welchem Preis sollen die Rohstoffe eingestellt werden?</td></tr>';
	configContent += '<tr><td>Stein</td><td><input class="i2 tir" type="text" name="Assi_SteinPreis" value="'+GM_getValue("Assi_SteinPreis", "100")+'"> Gold</td></tr>';
	configContent += '</table></div>';
	// Markt
	configContent += '<h2>Markt</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Markt\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Markt\')">[-]</a><br>';
	configContent += '<div id="configItem-Markt" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	configContent += '<tr><td width="115px">Wasser</td><td width="90px"><input class="i2 tir" type="text" name="Assi_MarktWasserPreis" value="'+GM_getValue("Assi_MarktWasserPreis", "")+'"> Gold</td><td rowspan="7" align="center">Gib hier die <b>aktuellen Marktpreise</b> an.<br><br>Angebote, deren Preis kleiner dem angegebenen Wert ist, werden hervorgehoben.</td></tr>';
	configContent += '<tr><td>Holz</td><td><input class="i2 tir" type="text" name="Assi_MarktHolzPreis" value="'+GM_getValue("Assi_MarktHolzPreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Stein</td><td><input class="i2 tir" type="text" name="Assi_MarktSteinPreis" value="'+GM_getValue("Assi_MarktSteinPreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kohle</td><td><input class="i2 tir" type="text" name="Assi_MarktKohlePreis" value="'+GM_getValue("Assi_MarktKohlePreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kupfer</td><td><input class="i2 tir" type="text" name="Assi_MarktKupferPreis" value="'+GM_getValue("Assi_MarktKupferPreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Zinn</td><td><input class="i2 tir" type="text" name="Assi_MarktZinnPreis" value="'+GM_getValue("Assi_MarktZinnPreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Bronze</td><td><input class="i2 tir" type="text" name="Assi_MarktBronzePreis" value="'+GM_getValue("Assi_MarktBronzePreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td width="115px">Wasser</td><td width="90px"><input class="i2 tir" type="text" name="Assi_MarktWasserverkaufsmenge" value="'+GM_getValue("Assi_MarktWasserverkaufsmenge", "")+'"> Gold</td><td rowspan="7" align="center">Gib hier die <b>Standardmengen</b> an, die du verkaufen möchtest.<br><br>Lässt du das Feld leer, wird keine Standardmenge beim Verkauf eingetragen/ausgewählt.</td></tr>';
	configContent += '<tr><td>Holz</td><td><input class="i2 tir" type="text" name="Assi_MarktHolzverkaufsmenge" value="'+GM_getValue("Assi_MarktHolzverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Stein</td><td><input class="i2 tir" type="text" name="Assi_MarktSteinverkaufsmenge" value="'+GM_getValue("Assi_MarktSteinverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kohle</td><td><input class="i2 tir" type="text" name="Assi_MarktKohleverkaufsmenge" value="'+GM_getValue("Assi_MarktKohleverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kupfer</td><td><input class="i2 tir" type="text" name="Assi_MarktKupferverkaufsmenge" value="'+GM_getValue("Assi_MarktKupferverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Zinn</td><td><input class="i2 tir" type="text" name="Assi_MarktZinnverkaufsmenge" value="'+GM_getValue("Assi_MarktZinnverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Bronze</td><td><input class="i2 tir" type="text" name="Assi_MarktBronzeverkaufsmenge" value="'+GM_getValue("Assi_MarktBronzeverkaufsmenge", "")+'"> Gold</td></tr>';
	configContent += '<tr><td width="115px">Wasser</td><td width="90px"><input class="i2 tir" type="text" name="Assi_MarktWasserverkaufspreis" value="'+GM_getValue("Assi_MarktWasserverkaufspreis", "")+'"> Gold</td><td rowspan="7" align="center">Gib hier die <b>Standardpreise</b> an, zu denen du deine Ware verkaufen möchtest.<br><br>Lässt du das Feld leer, wird kein Standardpreis beim Verkauf eingetragen.</td></tr>';
	configContent += '<tr><td>Holz</td><td><input class="i2 tir" type="text" name="Assi_MarktHolzverkaufspreis" value="'+GM_getValue("Assi_MarktHolzverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Stein</td><td><input class="i2 tir" type="text" name="Assi_MarktSteinverkaufspreis" value="'+GM_getValue("Assi_MarktSteinverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kohle</td><td><input class="i2 tir" type="text" name="Assi_MarktKohleverkaufspreis" value="'+GM_getValue("Assi_MarktKohleverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Kupfer</td><td><input class="i2 tir" type="text" name="Assi_MarktKupferverkaufspreis" value="'+GM_getValue("Assi_MarktKupferverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Zinn</td><td><input class="i2 tir" type="text" name="Assi_MarktZinnverkaufspreis" value="'+GM_getValue("Assi_MarktZinnverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '<tr><td>Bronze</td><td><input class="i2 tir" type="text" name="Assi_MarktBronzeverkaufspreis" value="'+GM_getValue("Assi_MarktBronzeverkaufspreis", "")+'"> Gold</td></tr>';
	configContent += '</table></div>';
	// Hotkeys
	configContent += '<h2>Hotkeys</h2> <a class="configItemToggle" href="javascript:showElement(\'configItem-Hotkeys\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'configItem-Hotkeys\')">[-]</a><br>';
	configContent += '<div id="configItem-Hotkeys" style="display:none;">';
	configContent += '<table class="configTable" border="1">';
	for(var i=0; i<hotkeys.length; i++) {
		configContent += '<tr>';
		configContent += '<td width="115px">'+hotkeys[i][0]+'</td><td><input class="i2 tir" type="text" name="Assi_Hotkeys['+i+']" value="'+hotkeys[i][2]+'"></td>';
		if(i == 0) configContent += '<td valign="top" rowspan="'+hotkeys.length+'" align="center">Definiere hier deine eigenen, ganz individuellen Hotkeys.<br><br><br>Erlaubte Zeichen:<br>- Zahlen: 0-9<br>- Buchstaben: a-z<br>- Sonderzeichen: <^#+-,.<br><br><br>Auch eine Zeichenfolge (z.B. a1, holz, etc.) ist möglich. Beachte, dass du diese innerhalb der Hotkey-Timeout-Zeit eingeben musst.<br><br>Doppelte Hotkeys sind nicht möglich, es wird immer der oberste zuerst ausgelöst. Ebenso sind Erweiterungen (z.B. h und h1) nicht möglich, da bei der ersten Übereinstimmung ausgelöst wird.</td>';
		configContent += '</tr>';
	}
	configContent += '</table></div><br>';
	configContent += '<br><input class="button" type="submit" value="Speichern"></form>';
	// Einstellungen zurücksetzen- und Alle Daten löschen-Button
	var strButtons = '<div id="resetbuttons"><input class="button" type="button" id="button_ResetConfig" value="Einstellungen zurücksetzen"><input class="button" type="button" id="button_DeleteAll" value="ALLE Daten löschen"></div>';
	configLayer.innerHTML = '<div class="border-left"></div><div class="border-right"></div><div id="config-main"><div class="border-top"><div class="close"><a href="javascript:hideElement(\'configLayer\')" title="Einstellungen schließen">[X]</a></div></div><div id="config-content">'+configContent+strButtons+'</div><div class="border-bottom"><span class="version">Version: '+GM_info.script.version+'</span><span class="scriptlink"><a href="http://userscripts.org/scripts/show/151764" target="_blank">SZS-Assistent</a></span><span class="author">by <a href="userinfo.php?userinfo=87836">KingMaxi</a></span></div></div>';
	document.getElementsByTagName('body')[0].appendChild(configLayer);
	// Javascript-Element -> showElement(), hideElement(), playSound()
	var configScript = document.createElement("script");
	configScript.setAttribute("type", "text/javascript");
	configScript.innerHTML = 'function showElement(what) { document.getElementById(what).style.display="block"; }\n';
	configScript.innerHTML += 'function hideElement(what) { document.getElementById(what).style.display="none"; }\n';
	configScript.innerHTML += 'function playSound(what, sound) { var volume = parseFloat(parseFloat(document.getElementsByName("Assi_"+what+"SoundVolume")[0].value.trim())/100); if(volume<0) volume=0; if(volume>1) volume=1; document.getElementById(sound).volume = volume; document.getElementById(sound).play(); }';
	document.getElementsByTagName('head')[0].appendChild(configScript);



// remove/change attributes in body-tag
	document.getElementsByTagName('body')[0].removeAttribute('onscroll');
	document.getElementsByTagName('body')[0].removeAttribute('marginwidth');
	document.getElementsByTagName('body')[0].removeAttribute('leftmargin');
	document.getElementsByTagName('body')[0].removeAttribute('topmargin');
	document.getElementsByTagName('body')[0].removeAttribute('bgcolor');
	document.getElementsByTagName('body')[0].removeAttribute('style');
// remove waste childNodes of body
	var elems = document.getElementsByTagName('body')[0].childNodes;
	for(var i=elems.length-1; i>=0; i--) {
		if(elems[i].tagName == 'BR' || elems[i].tagName == 'CENTER' || elems[i].tagName == 'SCRIPT' || elems[i].tagName == 'NOSCRIPT' || elems[i].tagName == 'IMG') {
			elems[i].parentNode.removeChild(elems[i]);
		}
	}
// header (remove ad + "nur durch Werbung bleibt SteinZeitSpiel.de kostenfrei.")
	if(!isPremiumSpieler) {
		var i = document.getElementsByTagName('center').length-1;
		while(i >= 0) {
			if(document.getElementsByTagName('center')[i].innerHTML.indexOf('nur durch Werbung bleibt SteinZeitSpiel.de kostenfrei.') != -1) {
				var elem_temp = document.getElementsByTagName('center')[i];
				if(typeof elem_temp == 'object') elem_temp.parentNode.removeChild(elem_temp);
				break;
			}
			i--;
		}
	}



// first table, wrap-table
	// left side (remove waste td)
	wrap.getElementsByTagName('td')[0].parentNode.removeChild(wrap.getElementsByTagName('td')[0]);
	// right side (replace/add notice)
	if(isPremiumSpieler) {
		var i=0;
		while(!(wrap.getElementsByTagName('td')[i].innerHTML.trim() == "" && wrap.getElementsByTagName('td')[i].getAttribute('valign') == 'top')) {
			i++;
		}
		var temp = wrap.getElementsByTagName('td')[i];
	} else {
		var temp = document.getElementById('site_extern').parentNode;
	}
	if(GM_getValue("Assi_Notizen", false)) {
		temp.innerHTML = '<div id="site_extern" style="position:relative"></div>';
		document.getElementById('site_extern').innerHTML = '<div class="headline">Notizen</div><textarea id="notice"></textarea>';
		if(GM_getValue("notice", "") != "") {
			document.getElementById('notice').value = GM_getValue("notice", "");
		}
	} else {
		temp.style.display = "none";
	}
// second table, main-table - change attributes (move main-container to left side)
	main.parentNode.setAttribute('width', '800');
	main.setAttribute('width', 800);
	main.removeAttribute('align');
	content.removeChild(content.getElementsByTagName('br')[0]);
	if(GM_getValue("Assi_Infoanzeigen", "menu") == 'zentriert') content.removeChild(content.getElementsByTagName('br')[0]);



// Serverzeit auslesen
	servertime = servertime.slice(servertime.indexOf('ServerZeit:')+11, servertime.indexOf('Uhr'));
	var servertimeArray = servertime.split(':');
	servertimeDate = new Date();
	servertimeDate.setHours(servertimeArray[0]);
	servertimeDate.setMinutes(servertimeArray[1]);
	servertimeDate.setSeconds(servertimeArray[2]);
	servertimeDate.setMilliseconds(0);
	var diffServertime = (new Date()).getTime()-servertimeDate.getTime(); // Zeitunterschied zwischen PC und Server



// Talkampf bestimmen
	var tkStart = 10;
	var tkEnde = 12;
	if(isSommerzeit(servertimeDate)) {
		tkStart = 12;
		tkEnde = 14;
	} else {
		tkStart = 11;
		tkEnde = 13;
	}
	var talkampfDate = new Date(servertimeDate);
	talkampfDate.setHours(tkStart);
	talkampfDate.setMinutes(0);
	talkampfDate.setSeconds(0);
	if(servertimeDate.getHours() >= tkEnde) {
		talkampfDate.setDate(talkampfDate.getDate()+1);
	}

// Stammkampf bestimmen
	if(GM_getValue("NextSK", "0") == "kein Kampf" || Math.floor(GM_getValue("NextSK", "0").split(',')[0])+3660000 < servertimeDate.getTime()) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/stamm.php?do=uebersicht",
			onload: function(response) {
				if(response.responseText.search(/Nächster Kampf: (\d+)\.(\d+)\.(\d+) \- (\d+):(\d+) Uhr gegen: <a href=stamminfo.php\?stammid=(\d+)>(.+)<\/a><br>Kampfstamm/) != -1) {
					var skStartDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), 0);
					GM_setValue("NextSK", skStartDate.getTime().toString()+","+RegExp.$6.trim()+","+RegExp.$7.trim());
				} else {
					GM_setValue("NextSK", "kein Kampf");
				}
			}
		});
	}
// Stammkampf-Teilnahme
	if(Math.floor(GM_getValue("SKTeilnahme", "0"))+3660000 < servertimeDate.getTime()) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/stamm.php?do=kampfuserauswahl",
			onload: function(response) {
				if(response.responseText.indexOf('Uhr kämpft ihr gegen') != -1) {
					if(response.responseText.indexOf('nicht teilnehmen') != -1) {
						GM_setValue("SKTeilnahme", GM_getValue("NextSK", "0").split(',')[0]);
					} else {
						GM_deleteValue("SKTeilnahme"); 
					}
				}
			}
		});
	}

// Magierkampf bestimmen
	var mkStart = 16;
	var mkEnde = 18;
	if(isSommerzeit(servertimeDate)) {
		mkStart = 18;
		mkEnde = 20;
	} else {
		mkStart = 17;
		mkEnde = 19;
	}
	var magierkampfDate = new Date(servertimeDate);
	if(servertimeDate.getDay() == 1 && servertimeDate.getHours() < mkEnde) {
		magierkampfDate.setHours(mkStart);
	} else {
		var day = (servertimeDate.getDay()==0)? 1 : (8-servertimeDate.getDay());
		magierkampfDate.setDate(magierkampfDate.getDate()+day);
		magierkampfDate.setHours(mkStart);
	}
	magierkampfDate.setMinutes(0);
	magierkampfDate.setSeconds(0);
	magierkampfDate.setMilliseconds(0);
// Magierkampf-Teilnahme
	if(Math.floor(GM_getValue("MKTeilnahme", "0"))+7260000 <= servertimeDate.getTime()) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/stamm.magierkampf.php",
			onload: function(response) {
				if(response.responseText.indexOf('zum Magierkampf eintragen') != -1) {
					if(response.responseText.indexOf('vom Magierkampf austragen') != -1) {
						GM_setValue("MKTeilnahme", magierkampfDate.getTime().toString());
					} else {
						GM_deleteValue("MKTeilnahme"); 
					}
				}
			}
		});
	}



// Logbuch
	if(document.URL.indexOf('/news.php') != -1) {
		// Filter-Links
		var i = 1;
		while(content.getElementsByTagName('a')[i].innerHTML.indexOf('Hilfe') == -1) {
			i++;
		}
		if(content.getElementsByTagName('a')[i+1].innerHTML.indexOf('Stammnachrichten') != -1) i++;
		var newDIV = document.createElement('div');
		newDIV.innerHTML = '<br><b>Logbuch-Filter:</b> <a href="news.php?alte=1&nachrichten=0">keine Nachrichten</a> | <a href="news.php?alte=1&nachrichten=1">nur Nachrichten</a><br>';
		content.insertBefore(newDIV, content.getElementsByTagName('a')[i].nextSibling);
		var logs = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
		logs[0].getElementsByTagName('td')[1].setAttribute('colspan', 2);
		for(var i=1; i<logs.length; i++) {
			logs[i].getElementsByTagName('td')[1].setAttribute('colspan', 2);
			// Filterung des Logbuchs
			if(logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('Nachricht') != -1) {
				// Nachrichten (PN)
				if(getURLParameter('nachrichten') == '0' && logs[i].getElementsByTagName('td')[0].innerHTML.indexOf('NEU') == -1) {
					logs[i].setAttribute('style', 'display:none;');
				} else {
					// Links setzen
					logs[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].setAttribute('style', 'width:100%; overflow:auto;');
					logs[i].getElementsByTagName('td')[1].innerHTML = logs[i].getElementsByTagName('td')[1].innerHTML.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?)/g, '<a class="menu" target="_blank" href="$1">$1</a>');
					// Profillinks für gesendete Nachrichten
					if(logs[i].getElementsByTagName('div')[0].innerHTML.split('<br>')[0].trim().search(/^Du hast an .* diese Nachricht geschrieben:/) != -1) {
						logs[i].getElementsByTagName('td')[1].removeAttribute('colspan');
						logs[i].innerHTML += '<td align="center"></td>';
						var pnzeilen = logs[i].getElementsByTagName('div')[0].innerHTML.split('<br>');
						pnzeilen[0] = pnzeilen[0].trim().replace(/^Du hast an (.*) diese Nachricht geschrieben:/, 'Du hast an <span id="pn_'+i+'"><a href="userinfo.php?s=$1">$1</a></span> diese Nachricht geschrieben:');
						var absender = RegExp.$1;
						logs[i].getElementsByTagName('td')[2].innerHTML = '<span id="pn_'+i+'-2"><a href="message.php?to='+absender+'">Nachricht</a><br><a href="uebertragen.php?anrohstoffe='+absender+'">Übertragen</a></span>';
						logs[i].getElementsByTagName('div')[0].innerHTML = pnzeilen.join('<br>');
						addLinksToLogbuch(absender, 'pn_'+i);
					}
				}
			} else {
				// keine Nachrichten (PN)
				if(getURLParameter('nachrichten') == '1' && logs[i].getElementsByTagName('td')[0].innerHTML.indexOf('NEU') == -1) {
					logs[i].setAttribute('style', 'display:none;');
				} else if((logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('Du hast an') != -1 && logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('übertragen.') != -1) || (logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('Du hast von') != -1 && logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('bekommen.') != -1)) {
					// Profillinks für Übertragungen
					logs[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].setAttribute('style', 'width:100%; overflow:auto;');
					logs[i].getElementsByTagName('td')[1].removeAttribute('colspan');
					logs[i].innerHTML += '<td align="center"></td>';
					logs[i].getElementsByTagName('td')[1].innerHTML = logs[i].getElementsByTagName('td')[1].innerHTML.replace(/Du hast (an|von) (.*) (\d)/, 'Du hast $1 <span id="res_'+i+'"><a href="userinfo.php?s=$2">$2</a></span><br>$3');
					var username = RegExp.$2;
					logs[i].getElementsByTagName('td')[2].innerHTML = '<span id="res_'+i+'-2"><a href="message.php?to='+username+'">Nachricht</a><br><a href="uebertragen.php?anrohstoffe='+username+'">Übertragen</a></span>';
					addLinksToLogbuch(username, 'res_'+i);
				} else if(logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('auf dem Markt') != -1 && logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('konnte nicht auf dem Markt verkauft werden') == -1) {
					// Profillinks für Marktein-/-verkäufe
					logs[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].setAttribute('style', 'width:100%; overflow:auto;');
					logs[i].getElementsByTagName('td')[1].removeAttribute('colspan');
					logs[i].innerHTML += '<td align="center"></td>';
					logs[i].getElementsByTagName('td')[1].innerHTML = logs[i].getElementsByTagName('td')[1].innerHTML.replace(/von (.*) auf dem Markt/, 'von <span id="markt_'+i+'"><a href="userinfo.php?s=$1">$1</a></span> auf dem Markt');
					var username = RegExp.$1;
					logs[i].getElementsByTagName('td')[2].innerHTML = '<span id="markt_'+i+'-2"><a href="message.php?to='+username+'">Nachricht</a><br><a href="uebertragen.php?anrohstoffe='+username+'">Übertragen</a></span>';
					addLinksToLogbuch(username, 'markt_'+i);
				} else if(logs[i].getElementsByTagName('td')[0].innerHTML.indexOf(tkEnde+':00') != -1 && logs[i].getElementsByTagName('td')[1].innerHTML.indexOf('Runde 1 Start:') != -1) {
					// Profillinks für TK-Gegner
					var tkzeilen = logs[i].getElementsByTagName('td')[1].innerHTML.split('<br>');
					for(var j=2; j<tkzeilen.length-2; j++) {
						if(tkzeilen[j].indexOf('Du triffst auf') != -1) {
							tkzeilen[j].search(/Du triffst auf (.*) \(Erfahrungspunkte: (\d*)/);
							var tkgegner = RegExp.$1;
							var tkgegnerep = RegExp.$2;
							tkzeilen[j] = 'Du triffst auf <span id=\"tk_'+i+'_'+j+'"><a href="userinfo.php?s='+encodeURI(tkgegner)+'">'+htmlspecialchars(tkgegner)+'</a></span> (Erfahrungspunkte: '+number_format(tkgegnerep, 0, ',', '.')+').';
							addLinksToLogbuch(tkgegner, 'tk_'+i+'_'+j);
						}
					}
					logs[i].getElementsByTagName('td')[1].innerHTML = tkzeilen.join('<br>');
				}
			}
		}
	}



// Nachrichten
	if(document.URL.indexOf('/message.php') != -1) {
		// Nachricht löschen, wenn abgeschickt
		if(content.innerHTML.search(/Deine Nachricht wurde an (.+) übermittelt./) != -1) {
			var currEmpf = RegExp.$1;
			var allEmpf = GM_getValue("Message_Empf", "#");
			if(allEmpf.indexOf('#'+currEmpf+'#') != -1) {
				GM_setValue("Message_Empf", GM_getValue("Message_Empf", "#").replace('#'+currEmpf+'#', '#'));
				GM_deleteValue("Message_"+currEmpf);
			} else {
				GM_setValue("Message_Empf", GM_getValue("Message_Empf", "#").replace('##', '#'));
				GM_deleteValue("Message_");
			}
		} else if(content.getElementsByTagName('input')[0] && content.getElementsByTagName('textarea')[0]) {
			content.getElementsByTagName('input')[0].setAttribute('id', 'empfeingabe');
			content.getElementsByTagName('textarea')[0].setAttribute('id', 'contenteingabe');
			// Lösche wiederherstellbare Nachricht
			if(getURLParameter('del') != null) {
				GM_setValue("Message_Empf", GM_getValue("Message_Empf", "#").replace('#'+decodeURI(getURLParameter('del'))+'#', '#'));
				GM_deleteValue("Message_"+decodeURI(getURLParameter('del')));
			}
			// Stelle ausgewählte Nachricht wieder her
			if(getURLParameter('to') != null) {
				document.getElementById('empfeingabe').value = decodeURI(getURLParameter('to'));
				document.getElementById('contenteingabe').value = GM_getValue("Message_"+decodeURI(getURLParameter('to')), "");
			}
			// Zeige Tabelle mit wiederherstellbaren Nachrichten
			if(GM_getValue("Message_Empf", "#") != '#') {
				var allEmpf = GM_getValue("Message_Empf", "#").split('#');
				var newDIV = document.createElement('div');
				newDIV.setAttribute('class', 'postrecovery');
				content.insertBefore(newDIV, content.getElementsByTagName('center')[0]);
				var newDIV_inner = 'Nicht abgeschickte Nachrichten wiederherstellen:<br><table border="1" style="margin:auto;"><tbody>';
				newDIV_inner += '<tr><td width="110px" align="center"><b>User</b></td><td width="120px" align="center"><b>Nachricht<b></td><td width="75px" align="center"><b>Löschen?</b></td></tr>';
				for(var i=1; i<allEmpf.length-1; i++) {
					if(allEmpf[i] == '') {
						newDIV_inner += '<tr><td align="center"><a href="message.php?to=">NoUser</a></td>';
					} else {
						newDIV_inner += '<tr><td align="center"><a href="message.php?to='+encodeURI(allEmpf[i])+'">'+htmlspecialchars(allEmpf[i])+'</a></td>';
					}
					newDIV_inner += '<td>'+htmlspecialchars(GM_getValue("Message_"+allEmpf[i], "").slice(0, 50))+'</td>';
					newDIV_inner += '<td align="center"><a href="message.php?del='+encodeURI(allEmpf[i])+'">Löschen</a></td></tr>';
				}
				newDIV_inner += '</tbody></table>';
				newDIV.innerHTML = newDIV_inner;
			}
			// Event-Listener
			document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
				var newEmpf = document.getElementById('empfeingabe').value.trim();
				var newMessage = document.getElementById('contenteingabe').value.trim();
				if(newEmpf == '' || newMessage == '') {
					e.preventDefault();
					alert('Empfänger oder Nachricht leer!');
					return false;
				} else {
					if(getURLParameter('to') == '') {
						GM_setValue("Message_Empf", GM_getValue("Message_Empf", "#").replace('##', '#'));
						GM_deleteValue("Message_");
					}
					var allEmpf = GM_getValue("Message_Empf", "#");
					if(allEmpf.indexOf('#'+newEmpf+'#') == -1) {
						GM_setValue("Message_Empf", allEmpf+newEmpf+'#');
					}
					GM_setValue("Message_"+newEmpf, newMessage);
					return true;
				}
			}, false);
			document.getElementById('contenteingabe').addEventListener('keyup', function() {
				var newEmpf = document.getElementById('empfeingabe').value.trim();
				var newMessage = document.getElementById('contenteingabe').value.trim();
				var allEmpf = GM_getValue("Message_Empf", "#");
				if(newMessage == '') {
					GM_setValue("Message_Empf", allEmpf.replace('#'+newEmpf+'#', '#'));
					GM_deleteValue("Message_"+newEmpf);
				} else {
					if(allEmpf.indexOf('#'+newEmpf+'#') == -1) {
						GM_setValue("Message_Empf", allEmpf+newEmpf+'#');
					}
					GM_setValue("Message_"+newEmpf, newMessage);
				}
			}, false);
		}
	}



// Charakter
	if(document.URL.indexOf('/charakter.php') != -1 && content.innerHTML.indexOf('Hier kannst du deinen Steinzeitmenschen') != -1) {
		// aktuelle Position speichern
		content.innerHTML.search(/Du stehst im Moment auf Land\:\sX\:\s(\d{1,3})\sY\:\s(\d{1,3})/);
		var x = RegExp.$1;
		var y = RegExp.$2;
		GM_setValue("AktuellePosition", x+"#"+y);
		// Skillsystem
		var gesamt_ep = parseInt(content.getElementsByTagName('td')[2].innerHTML, 10);
		var gesamt_cp = parseInt(content.getElementsByTagName('td')[4].innerHTML, 10);
		var kraft_ist = parseInt(content.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML, 10);
		var intelligenz_ist = parseInt(content.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML, 10);
		var geschwindigkeit_ist = parseInt(content.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML, 10);
		var list_ist = parseInt(content.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].innerHTML, 10);
		var ausdauer_ist = parseInt(content.getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML, 10);
		var geschick_ist = parseInt(content.getElementsByTagName('tr')[8].getElementsByTagName('td')[1].innerHTML, 10);
		var freie_cp = parseInt(content.getElementsByTagName('tr')[9].getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML, 10);
		var kraft_soll = parseFloat(GM_getValue("Assi_Kraft", "0").replace(/\,/, '.'));
		if(kraft_soll < 0 || isNaN(kraft_soll)) kraft_soll = 0;
		var intelligenz_soll = parseFloat(GM_getValue("Assi_Intelligenz", "0").replace(/\,/, '.'));
		if(intelligenz_soll < 0 || isNaN(intelligenz_soll)) kraft_soll = 0;
		var geschwindigkeit_soll = parseFloat(GM_getValue("Assi_Geschwindigkeit", "0").replace(/\,/, '.'));
		if(geschwindigkeit_soll < 0 || isNaN(geschwindigkeit_soll)) kraft_soll = 0;
		var list_soll = parseFloat(GM_getValue("Assi_List", "0").replace(/\,/, '.'));
		if(list_soll < 0 || isNaN(list_soll)) kraft_soll = 0;
		var ausdauer_soll = parseFloat(GM_getValue("Assi_Ausdauer", "0").replace(/\,/, '.'));
		if(ausdauer_soll < 0 || isNaN(ausdauer_soll)) kraft_soll = 0;
		var geschick_soll = parseFloat(GM_getValue("Assi_Geschick", "0").replace(/\,/, '.'));
		if(geschick_soll < 0 || isNaN(geschick_soll)) kraft_soll = 0;
		var gesamt_soll = kraft_soll+intelligenz_soll+geschwindigkeit_soll+list_soll+ausdauer_soll+geschick_soll;
		if(gesamt_soll == 0) gesamt_soll = 1;
		kraft_soll = kraft_soll/gesamt_soll;
		intelligenz_soll = intelligenz_soll/gesamt_soll;
		geschwindigkeit_soll = geschwindigkeit_soll/gesamt_soll;
		list_soll = list_soll/gesamt_soll;
		ausdauer_soll = ausdauer_soll/gesamt_soll;
		geschick_soll = geschick_soll/gesamt_soll;
		content.getElementsByTagName('tbody')[1].innerHTML += '<tr bgcolor="123014"><td>CP/EP-Verhältnis:</td><td>'+number_format((gesamt_cp-freie_cp)/gesamt_ep, 5)+'</td></tr>';
		content.getElementsByTagName('tr')[10].getElementsByTagName('td')[0].getElementsByTagName('b')[0].innerHTML = 'Freie CP:';
		content.getElementsByTagName('tr')[4].getElementsByTagName('td')[0].removeAttribute('width');
		content.getElementsByTagName('tbody')[2].innerHTML = '<tr bgcolor="173F1A"><td width="*" align="center"><b>Fertigkeit</b></td><td width="26%" align="center"><b>Charakterpunkte</b></td>'+((content.getElementsByTagName('input').length > 1)? '<td width="17%" align="center"><br></td>' : '')+'<td width="12%" align="center"><b>IST<b></td><td width="12%" align="center"><b>SOLL<b></td></tr>'+content.getElementsByTagName('tbody')[2].innerHTML;
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[1].innerHTML += '<td align="right">'+number_format(kraft_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(kraft_soll*100, 2, ',', '.', true)+' %</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[2].innerHTML += '<td align="right">'+number_format(intelligenz_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(intelligenz_soll*100, 2, ',', '.', true)+' %</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[3].innerHTML += '<td align="right">'+number_format(geschwindigkeit_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(geschwindigkeit_soll*100, 2, ',', '.', true)+' %</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[4].innerHTML += '<td align="right">'+number_format(list_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(list_soll*100, 2, ',', '.', true)+' %</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[5].innerHTML += '<td align="right">'+number_format(ausdauer_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(ausdauer_soll*100, 2, ',', '.', true)+' %</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tr')[6].innerHTML += '<td align="right">'+number_format(geschick_ist/(gesamt_cp-freie_cp)*100, 2, ',', '.', true)+' %</td><td align="right">'+number_format(geschick_soll*100, 2, ',', '.', true)+' %</td>';
		if(content.getElementsByTagName('input').length > 1) {
			// CP-Verteilung
			var kraft_ad = 0;
			var intelligenz_ad = 0;
			var geschwindigkeit_ad = 0;
			var list_ad = 0;
			var ausdauer_ad = 0;
			var geschick_ad = 0;
			for(var i=freie_cp; i>0; i--) {
				var fertigkeiten = new Array('Kraft', 'Intelligenz', 'Geschwindigkeit', 'List', 'Ausdauer', 'Geschick');
				var potenziale = new Array();
				potenziale[fertigkeiten[0]] = 1-((kraft_ist+kraft_ad)/(gesamt_cp*kraft_soll));
				potenziale[fertigkeiten[1]] = 1-((intelligenz_ist+intelligenz_ad)/(gesamt_cp*intelligenz_soll));
				potenziale[fertigkeiten[2]] = 1-((geschwindigkeit_ist+geschwindigkeit_ad)/(gesamt_cp*geschwindigkeit_soll));
				potenziale[fertigkeiten[3]] = 1-((list_ist+list_ad)/(gesamt_cp*list_soll));
				potenziale[fertigkeiten[4]] = 1-((ausdauer_ist+ausdauer_ad)/(gesamt_cp*ausdauer_soll));
				potenziale[fertigkeiten[5]] = 1-((geschick_ist+geschick_ad)/(gesamt_cp*geschick_soll));
				for(var j=0; j<fertigkeiten.length; j++) {
					for(k=j+1; k<fertigkeiten.length; k++) {
						if(potenziale[fertigkeiten[j]] < potenziale[fertigkeiten[k]]) {
							var z = fertigkeiten[j];
							fertigkeiten[j] = fertigkeiten[k];
							fertigkeiten[k] = z;
						}
					}
				}
				switch(fertigkeiten[0]) {
					case 'Kraft':
						kraft_ad++;
						break;
					case 'Intelligenz':
						intelligenz_ad++;
						break;
					case 'Geschwindigkeit':
						geschwindigkeit_ad++;
						break;
					case 'List':
						list_ad++;
						break;
					case 'Ausdauer':
						ausdauer_ad++;
						break;
					case 'Geschick':
						geschick_ad++;
						break;
					default:
						break;
				}
			}
			document.getElementsByName('kraft')[0].value = kraft_ad;
			document.getElementsByName('intelligenz')[0].value = intelligenz_ad;
			document.getElementsByName('geschwindigkeit')[0].value = geschwindigkeit_ad;
			document.getElementsByName('list')[0].value = list_ad;
			document.getElementsByName('ausdauer')[0].value = ausdauer_ad;
			document.getElementsByName('geschick')[0].value = geschick_ad;
		}
		// erforderliche CP bis Skillung erreicht
		var highestSkill = new Array();
		highestSkill.push(new Array((kraft_ist/(gesamt_cp*kraft_soll)), kraft_ist, kraft_soll));
		highestSkill.push(new Array((intelligenz_ist/(gesamt_cp*intelligenz_soll)), intelligenz_ist, intelligenz_soll));
		highestSkill.push(new Array((geschwindigkeit_ist/(gesamt_cp*geschwindigkeit_soll)), geschwindigkeit_ist, geschwindigkeit_soll));
		highestSkill.push(new Array((list_ist/(gesamt_cp*list_soll)), list_ist, list_soll));
		highestSkill.push(new Array((ausdauer_ist/(gesamt_cp*ausdauer_soll)), ausdauer_ist, ausdauer_soll));
		highestSkill.push(new Array((geschick_ist/(gesamt_cp*geschick_soll)), geschick_ist, geschick_soll));
		for(var i=0; i<highestSkill.length; i++) {
			for(j=i+1; j<highestSkill.length; j++) {
				if(highestSkill[i][0] < highestSkill[j][0]) {
					var z = highestSkill[i];
					highestSkill[i] = highestSkill[j];
					highestSkill[j] = z;
				}
			}
		}
		var erforderliche_cp = 0;
		(highestSkill[0][2] == kraft_soll)? erforderliche_cp += kraft_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*kraft_soll);
		(highestSkill[0][2] == intelligenz_soll)? erforderliche_cp += intelligenz_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*intelligenz_soll);
		(highestSkill[0][2] == geschwindigkeit_soll)? erforderliche_cp += geschwindigkeit_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*geschwindigkeit_soll);
		(highestSkill[0][2] == list_soll)? erforderliche_cp += list_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*list_soll);
		(highestSkill[0][2] == ausdauer_soll)? erforderliche_cp += ausdauer_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*ausdauer_soll);
		(highestSkill[0][2] == geschick_soll)? erforderliche_cp += geschick_ist : erforderliche_cp += Math.ceil(highestSkill[0][1]/highestSkill[0][2]*geschick_soll);
		content.getElementsByTagName('tbody')[1].innerHTML += '<tr bgcolor="173f1a"><td>benötigte CP für SOLL-Skillung:</td><td>'+number_format(erforderliche_cp)+' (noch: '+number_format(erforderliche_cp-gesamt_cp)+')</td></tr>';
	}



// Inventar
	// Ausrüstung auslesen
	if(!document.getElementsByName('zufallscode')[0]) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/inventar.php",
			onload: function(response) {
				// in der Hand
				var anfang = response.responseText.indexOf('Diesen Gegenstand hältst du in der Hand:');
				var ende = response.responseText.indexOf('Diesen Ring hast du am Finger:');
				var html = response.responseText.slice(anfang, ende);
				html.search(/<b>([\S\s]*)<\/b>/);
				var handAkt = RegExp.$1.replace(/<[\S\s]*>/g, '').trim();
				if(handAkt == 'nichts') {
					GM_setValue("Hand", "<font color=\"lime\">nichts</font>");
				} else if(waffen.indexOf(handAkt) != -1) {
					GM_setValue("Hand", "<font color=\"red\">"+handAkt+"</font>");
				} else if(werkzeuge.indexOf(handAkt) != -1) {
					GM_setValue("Hand", "<font color=\"yellow\">"+handAkt+"</font>");
				} else {
					GM_setValue("Hand", handAkt);
				}
				// am Finger
				anfang = response.responseText.indexOf('Diesen Ring hast du am Finger:');
				ende = response.responseText.indexOf('Ringe in der Truhe:');
				html = response.responseText.slice(anfang, ende);
				html.search(/<b>([\S\s]*)<\/b>/);
				var fingerAkt = RegExp.$1.replace(/<[\S\s]*>/g, '').trim();
				if(fingerAkt == 'keinen') {
					GM_setValue("Finger", "<font color=\"lime\">nichts</font>");
				} else if(ringe.indexOf(fingerAkt) != -1) {
					GM_setValue("Finger", "<font color=\"lime\">"+fingerAkt+"</font>");
				} else {
					GM_setValue("Finger", fingerAkt);
				}
			}
		});
	}
	// Inventar-Seite
	if(document.URL.indexOf('/inventar.php') != -1 && document.URL.indexOf('aktion') == -1 && content.innerHTML.indexOf('Inventar aufräumen') != -1) {
		content.innerHTML = content.innerHTML.replace(/\s*<br>\s*<br>\s*<br>\s*<br>\s*<br>\s*/g, '<br><br><br><br>').replace(/\s*<br>\s*<br>\s*<br>\s*<br>\s*/g, '<br><br><br>').replace(/\s*<br>\s*<br>\s*<br>\s*/g, '<br><br>');
		// vorhandenes Inventar speichern
		if(content.innerHTML.indexOf('Kupfer-Hacke') != -1) {
			GM_setValue("Kupfer-Hacke", true);
		} else {
			GM_setValue("Kupfer-Hacke", false);
		}
		if(content.innerHTML.indexOf('Kupfer-Schaber') != -1) {
			GM_setValue("Kupfer-Schaber", true);
		} else {
			GM_setValue("Kupfer-Schaber", false);
		}
		if(content.innerHTML.indexOf('Kupfer-Keil') != -1) {
			GM_setValue("Kupfer-Keil", true);
		} else {
			GM_setValue("Kupfer-Keil", false);
		}
		if(content.innerHTML.indexOf('Zinn-Schaber') != -1) {
			GM_setValue("Zinn-Schaber", true);
		} else {
			GM_setValue("Zinn-Schaber", false);
		}
		if(content.innerHTML.indexOf('Zinn-Keil') != -1) {
			GM_setValue("Zinn-Keil", true);
		} else {
			GM_setValue("Zinn-Keil", false);
		}
		if(content.innerHTML.indexOf('Wasserring') != -1) {
			GM_setValue("Wasserring", true);
		} else {
			GM_setValue("Wasserring", false);
		}
		if(content.innerHTML.indexOf('Jagdring') != -1) {
			GM_setValue("Jagdring", true);
		} else {
			GM_setValue("Jagdring", false);
		}
		if(content.innerHTML.indexOf('Talkampfring') != -1) {
			GM_setValue("Talkampfring", true);
		} else {
			GM_setValue("Talkampfring", false);
		}
		if(content.innerHTML.indexOf('Stammkampfring') != -1) {
			GM_setValue("Stammkampfring", true);
		} else {
			GM_setValue("Stammkampfring", false);
		}
		if(content.innerHTML.indexOf('Verringert deine Müdigkeit um 80%') != -1) {
			var html = content.innerHTML.slice(content.innerHTML.indexOf('Verringert deine Müdigkeit um 80%'));
			var anfang = html.indexOf('inventar.php?aktion=trinken2&amp;trankid=');
			var ende = html.indexOf('Trinken');
			GM_setValue("starkerWachtrank", html.slice(anfang+41, ende-2));
		} else {
			GM_setValue("starkerWachtrank", 0);
		}
		if(content.innerHTML.indexOf('Verringert deine Müdigkeit um 20%') != -1) {
			var html = content.innerHTML.slice(content.innerHTML.indexOf('Verringert deine Müdigkeit um 20%'));
			var anfang = html.indexOf('inventar.php?aktion=trinken2&amp;trankid=');
			var ende = html.indexOf('Trinken');
			GM_setValue("Wachtrank", html.slice(anfang+41, ende-2));
		} else {
			GM_setValue("Wachtrank", 0);
		}
		// Ausrüstung auslesen
		var handAkt = content.getElementsByTagName('table')[1].getElementsByTagName('b')[0].innerHTML.trim();
		var fingerAkt = content.getElementsByTagName('table')[2].getElementsByTagName('b')[0].innerHTML.trim();
		// Ringe auslesen
		var ringeInventar = new Array();
		var ringeZeilen = content.getElementsByTagName('table')[3].getElementsByTagName('tr');
		for(var i=1; i<ringeZeilen.length; i++) {
			var temp = new Array();
			temp[0] = ringeZeilen[i].getElementsByTagName('td')[0].innerHTML.trim();
			ringeZeilen[i].getElementsByTagName('a')[0].getAttribute('href').search(/id=(\d+)/);
			temp[1] = RegExp.$1;
			temp[2] = ringeZeilen[i].getElementsByTagName('td')[1].innerHTML.trim();
			temp[3] = ringeZeilen[i].getElementsByTagName('img')[0].getAttribute('src').trim();
			ringeInventar.push(temp);
		}
		// Waffen auslesen
		var waffenInventar = new Array();
		var waffenZeilen = content.getElementsByTagName('table')[4].getElementsByTagName('tr');
		for(var i=1; i<waffenZeilen.length; i++) {
			var temp = new Array();
			temp[0] = waffenZeilen[i].getElementsByTagName('td')[0].innerHTML.trim()
			waffenZeilen[i].getElementsByTagName('a')[0].getAttribute('href').search(/id=(\d+)/);
			temp[1] = RegExp.$1;
			temp[2] = waffenZeilen[i].getElementsByTagName('td')[1].innerHTML.trim();
			temp[3] = waffenZeilen[i].getElementsByTagName('img')[0].getAttribute('src').trim();
			waffenInventar.push(temp);
		}
		// Werkzeug auslesen
		var werkzeugeInventar = new Array();
		var werkzeugeZeilen = content.getElementsByTagName('table')[5].getElementsByTagName('tr');
		for(var i=1; i<werkzeugeZeilen.length; i++) {
			var temp = new Array();
			temp[0] = werkzeugeZeilen[i].getElementsByTagName('td')[0].innerHTML.trim();
			werkzeugeZeilen[i].getElementsByTagName('a')[0].getAttribute('href').search(/id=(\d+)/);
			temp[1] = RegExp.$1;
			temp[2] = werkzeugeZeilen[i].getElementsByTagName('td')[1].innerHTML.trim();
			temp[3] = werkzeugeZeilen[i].getElementsByTagName('img')[0].getAttribute('src').trim();
			werkzeugeInventar.push(temp);
		}
		// Tränke auslesen
		var traenkeInventar = new Array();
		var traenkeZeilen = content.getElementsByTagName('table')[6].getElementsByTagName('tr');
		for(var i=1; i<traenkeZeilen.length; i++) {
			var temp = new Array();
			temp[0] = traenkeZeilen[i].getElementsByTagName('td')[0].innerHTML.trim();
			traenkeZeilen[i].getElementsByTagName('a')[0].getAttribute('href').search(/id=(\d+)/);
			temp[1] = RegExp.$1;
			temp[2] = traenkeZeilen[i].getElementsByTagName('td')[1].innerHTML.trim();
			temp[3] = traenkeZeilen[i].getElementsByTagName('img')[0].getAttribute('src').trim();
			traenkeInventar.push(temp);
		}
		// Inventarcontent ändern
		var contentHTML = content.innerHTML;
		var ende = contentHTML.indexOf('Ringe in der Truhe');
		contentHTML = contentHTML.slice(0, ende);
		// Grafikhöhe anpassen
		var inventarIMGheight = parseInt(GM_getValue("Assi_InventarIMGheight", "0"), 10)
		if(inventarIMGheight < 0 || isNaN(inventarIMGheight)) inventarIMGheight = 0;
		contentHTML += '<b>Ringe:</b><br>';
		var tempContent = '';
		var ringe2 = ringe.split('#');
		for(var i=0; i<ringe2.length; i++) {
			for(var j=0; j<ringeInventar.length; j++) {
				if(ringe2[i] == ringeInventar[j][0]) {
					tempContent += '<tr><td>'+ringeInventar[j][0]+'</td><td class="center">'+ringeInventar[j][2]+'</td><td><img height='+inventarIMGheight+' src="'+ringeInventar[j][3]+'"></td><td><a href="inventar.php?aktion=take&id='+ringeInventar[j][1]+'&artgegen=ring">Anlegen</a></td><td><a href="inventar.php?aktion=verkaufen&id='+ringeInventar[j][1]+'">Verkaufen</a></td><td><a href="inventar.php?aktion=uebertragen&id='+ringeInventar[j][1]+'">Übertragen</a></td></tr>';
				}
			}
		}
		if(tempContent != '') {
			contentHTML += '<table class="inventar" border="1"><thead><tr bgcolor="#173f1a"><td>Name</td><td>Anzahl</td><td>Bild</td><td>Anlegen</td><td>Verkaufen</td><td>Übertragen</td></tr></thead></tbody>';
			contentHTML += tempContent;
			contentHTML += '</tbody></table>';
		} else {
			contentHTML += 'Keine Ringe vorhanden<br>';
		}
		contentHTML += '<br><br><b>Waffen:</b><br>';
		var tempContent = '';
		var waffen2 = waffen.split('#');
		waffen2.reverse();
		for(var i=0; i<waffen2.length; i++) {
			for(var j=0; j<waffenInventar.length; j++) {
				if(waffen2[i] == waffenInventar[j][0]) {
					tempContent += '<tr><td>'+waffenInventar[j][0]+'</td><td class="center">'+waffenInventar[j][2]+'</td><td><img height='+inventarIMGheight+' src="'+waffenInventar[j][3]+'"></td><td><a href="inventar.php?aktion=take&id='+waffenInventar[j][1]+'&artgegen=hand">Anlegen</a></td><td><a href="inventar.php?aktion=verkaufen&id='+waffenInventar[j][1]+'">Verkaufen</a></td><td><a href="inventar.php?aktion=uebertragen&id='+waffenInventar[j][1]+'">Übertragen</a></td><td><a href="inventar.php?aktion=stamm&id='+waffenInventar[j][1]+'">Einlagern</a></td></tr>';
				}
			}
		}
		if(tempContent != '') {
			contentHTML += '<table class="inventar" border="1"><thead><tr bgcolor="#173f1a"><td>Name</td><td>Anzahl</td><td>Bild</td><td>Anlegen</td><td>Verkaufen</td><td>Übertragen</td><td>Stammlager</td></tr></thead></tbody>';
			contentHTML += tempContent;
			contentHTML += '</tbody></table>';
		} else {
			contentHTML += 'Keine Waffen vorhanden<br>';
		}
		contentHTML += '<br><br><b>Werkzeuge:</b><br>';
		var tempContent = '';
		var werkzeuge2 = werkzeuge.split('#');
		for(var i=0; i<werkzeuge2.length; i++) {
			for(var j=0; j<werkzeugeInventar.length; j++) {
				if(werkzeuge2[i] == werkzeugeInventar[j][0]) {
					tempContent += '<tr><td>'+werkzeugeInventar[j][0]+'</td><td class="center">'+werkzeugeInventar[j][2]+'</td><td><img height='+inventarIMGheight+' src="'+werkzeugeInventar[j][3]+'"></td><td><a href="inventar.php?aktion=take&id='+werkzeugeInventar[j][1]+'&artgegen=hand">Anlegen</a></td><td><a href="inventar.php?aktion=verkaufen&id='+werkzeugeInventar[j][1]+'">Verkaufen</a></td><td><a href="inventar.php?aktion=uebertragen&id='+werkzeugeInventar[j][1]+'">Übertragen</a></td><td><a href="inventar.php?aktion=stamm&id='+werkzeugeInventar[j][1]+'">Einlagern</a></td></tr>';
				}
			}
		}
		if(tempContent != '') {
			contentHTML += '<table class="inventar" border="1"><thead><tr bgcolor="#173f1a"><td>Name</td><td>Anzahl</td><td>Bild</td><td>Anlegen</td><td>Verkaufen</td><td>Übertragen</td><td>Stammlager</td></tr></thead></tbody>';
			contentHTML += tempContent;
			contentHTML += '</tbody></table>';
		} else {
			contentHTML += 'Keine Werkzeuge vorhanden<br>';
		}
		contentHTML += '<br><br><b>Tränke:</b><br>';
		var tempContent = '';
		var traenke2 = traenke.split('#');
		for(var i=0; i<traenke2.length; i++) {
			for(var j=0; j<traenkeInventar.length; j++) {
				if(traenke2[i] == traenkeInventar[j][0]) {
					tempContent += '<tr><td>'+traenkeInventar[j][0]+'</td><td class="center">'+traenkeInventar[j][2]+'</td><td><img height='+inventarIMGheight+' src="'+traenkeInventar[j][3]+'"></td><td><a href="inventar.php?aktion=trinken2&trankid='+traenkeInventar[j][1]+'">Trinken</a></td><td><a href="inventar.php?aktion=trankverkaufen&id='+traenkeInventar[j][1]+'">Verkaufen</a></td><td><a href="inventar.php?aktion=uebertragen&id='+traenkeInventar[j][1]+'">Übertragen</a></td><td><a href="inventar.php?aktion=trankstamm&id='+traenkeInventar[j][1]+'">Einlagern</a></td></tr>';
				}
			}
		}
		if(tempContent != '') {
			contentHTML += '<table class="inventar" border="1"><thead><tr bgcolor="#173f1a"><td>Name</td><td>Anzahl</td><td>Bild</td><td>Trinken</td><td>Verkaufen</td><td>Übertragen</td><td>Stammlager</td></tr></thead></tbody>';
			contentHTML += tempContent;
			contentHTML += '</tbody></table>';
		} else {
			contentHTML += 'Keine Werkzeuge vorhanden<br>';
		}
		contentHTML += '<br><br><center>[<a href="inventar.php?aktion=zusammenfassen">Inventar aufräumen</a>]</center><br>';
		content.innerHTML = contentHTML;
		if(getURLParameter('szsa') == 'stwach') {
			if(GM_getValue("starkerWachtrank", 0) != 0) {
				window.location.href = 'http://szs.looki.de/inventar.php?aktion=trinken2&trankid='+GM_getValue("starkerWachtrank", 0);
			} else {
				alert("Du besitzt keinen starken Wachtrank mehr!");
			}
		}
	// "Trinken"-Button fokusieren
	} else if(document.URL.indexOf('inventar.php') != -1 && content.innerHTML.indexOf('Wie oft möchtest Du') != -1) {
		content.getElementsByTagName('input')[2].focus();
	// Trank-ID vom st. Wachtrank nicht gefunden -> Fehlernummer
	} else if(document.URL.indexOf('inventar.php') != -1 && content.innerHTML.indexOf('Es ist ein Fehler aufgetreten. Fehlernummer:') != -1 && getURLParameter('szsa') == 'stwach') {
		window.location.href = 'http://szs.looki.de/inventar.php?szsa=stwach';
	// Waffe/Ring ablegen -> bereits Waffe in der Hand/Ring am Finger
	} else if(document.URL.indexOf('inventar.php?aktion=take') != -1 && (content.innerHTML.indexOf('Du hast schon etwas in der Hand, bitte lege diesen Gegenstand erst in die Truhe.') != -1 || content.innerHTML.indexOf('Du trägst bereits einen Ring.') != -1)) {
		content.innerHTML += '<br><br><span class="yellow"><b>SZS-Assistent:</b> Es wird versucht die Gegenstände zu tauschen.<br>';
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://szs.looki.de/inventar.php",
			data: "aktion=intruhe&artgegen="+getURLParameter('artgegen'),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			onload: function(response) {
				var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
				var ende = response.responseText.indexOf('<!-- INHALT ENDE -->');
				var html = response.responseText.slice(anfang, ende);
				if(html.indexOf('Du hast den Gegenstand in die Truhe gelegt.') != -1) {
					window.location.href = document.URL;
				} else {
					content.innerHTML += '<br><br><span class="red"><b>Es ist ein Fehler aufgetreten!</b><br><br>Content:<br></span>'+html;
				}
			}
		});
	// schnellere Weiterleitung zurück zum Invenatar
	} else if(document.URL.indexOf('inventar.php') != -1 && (content.innerHTML.indexOf('falls dein Browser keine automatische Weiterleitung') != -1 || content.getElementsByTagName('meta')[0])) {
		window.setTimeout("window.location.href = 'http://szs.looki.de/inventar.php';", 50);
	// Direktlinks für Waffenopfer
	} else if(document.URL.indexOf('inventar.php') != -1 && content.innerHTML.indexOf('Die Götter erlauben Dir das Tragen dieser Waffe nicht.') != -1) {
		content.innerHTML += '<br><br><font color="yellow">Direktlinks:<br>- <a href="altar.php?do=waffenopfer&auswahl=1&szsa=link&url='+encodeURIComponent(document.URL)+'">kleines Waffenopfer</a> (Kosten: 50 Zinn + 50 Wasser)<br>- <a href="altar.php?do=waffenopfer&auswahl=2&szsa=link&url='+encodeURIComponent(document.URL)+'">großes Waffenopfer</a> (Kosten: 50 Bronze + 50 Wasser)</font>';
	}



// Artefakte
	if(!document.getElementsByName('zufallscode')[0]) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/artefakt.php",
			onload: function(response) {
				if(response.responseText.indexOf('Diese Artefakte hast du angelegt:') != -1) {
					var anfang = response.responseText.indexOf('Diese Artefakte hast du angelegt:');
					var html = response.responseText.slice(anfang);
					var zeilen = html.split('<tr');
					var i = 1;
					while(zeilen[i].indexOf('noch bis zum') != -1) {
						// Drachenblut
						if(zeilen[i].indexOf('Drachenblut') != -1) {
							zeilen[i].search(/<span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
							var artefaktDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
							GM_setValue("DrachenblutTime", artefaktDate.getTime().toString());
						// Glück
						} else if(zeilen[i].indexOf('Glück') != -1) {
							zeilen[i].search(/<span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
							var artefaktDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
							GM_setValue("GlueckTime", artefaktDate.getTime().toString());
						// Meisterschmied
						} else if(zeilen[i].indexOf('Meisterschmied') != -1) {
							zeilen[i].search(/<span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
							var artefaktDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
							GM_setValue("MeisterschmiedTime", artefaktDate.getTime().toString());
						}
						i++;
					}
				}
			}
		});
	}



// Altar
	if(document.URL.indexOf('/altar.php') != -1 && document.URL.indexOf('szsa=link') != -1 && (content.innerHTML.indexOf('Die Götter haben Dein Opfer angenommen.') != -1 || content.innerHTML.indexOf('Die Götter haben dein Opfer akzeptiert.') != -1)) {
		content.innerHTML += '<br><br><span class="yellow"><b>SZS-Assistent:</b> Du wirst auf die vorherige Seite weitergeleitet.<br>';
		window.setTimeout("window.location.href = '"+decodeURIComponent(getURLParameter('url'))+"';", 100);
	}



// Karte
	if(document.URL.indexOf('/karte.php') != -1) {
		// aktuelle Position speichern
		if(content.getElementsByTagName('table')[2].getElementsByTagName('tr')[5].getElementsByTagName('td')[5].innerHTML.indexOf('red') != -1) {
			var x = document.getElementsByName('x')[0].value;
			var y = document.getElementsByName('y')[0].value;
			GM_setValue("AktuellePosition", x+"#"+y);
		}
		// optimierte Marktländer-Darstellung + Entfernung zur aktuellen Position
		var x1 = document.getElementsByName('x')[0].value;
		var y1 = document.getElementsByName('y')[0].value;
		var marktlaender = content.getElementsByTagName('table')[3].getElementsByTagName('tr');
		marktlaender[0].innerHTML += '<td align="center"><b>Entf.</b></td>';
		for(var i=1; i<marktlaender.length; i++) {
			x2 = marktlaender[i].getElementsByTagName('td')[0].innerHTML.trim();
			y2 = marktlaender[i].getElementsByTagName('td')[1].innerHTML.trim();
			var distance = (Math.max(x1, x2)-Math.min(x1, x2))+(Math.max(y1, y2)-Math.min(y1, y2));
			marktlaender[i].innerHTML += '<td align="right">'+distance+'</td>';
			marktlaender[i].innerHTML += '<td align="center"><a href="karte.php?x='+x2+'&y='+y2+'">Karte</a></td>';
		}
	}



// Land
	if(document.URL.indexOf('/deinland.php') != -1) {
		var curr_coords = GM_getValue("AktuellePosition", "0#0").split('#');
		var laender = content.innerHTML.split('<br>');
		var str_newContent = '';
		if(curr_coords[0] != 0 && curr_coords[1] != 0) {
			str_newContent += 'Aktuelle Position: '+curr_coords[0]+' | '+curr_coords[1]+'<br><br>';
		}
		str_newContent += '<br><b>Dein(e) Landstück(e):</b><br><br><table class="eigeneLaender" border="1"><thead>';
		str_newContent += '<tr bgcolor="#173f1a">';
		str_newContent += '<td rowspan="2">ID</td>';
		str_newContent += '<td rowspan="2">X</td>';
		str_newContent += '<td rowspan="2">Y</td>';
		str_newContent += '<td rowspan="2">Entf.</td>';
		str_newContent += '<td colspan="9">Ausbau-Stufen</td>'
		str_newContent += '<td colspan="4">Rohstoffe</td>';
		str_newContent += '</tr><tr bgcolor="#173f1a">';
		str_newContent += '<td title="HolzhauDing"><img src="http://szs.looki.de/static/rohstoff_icons/holz.gif"></td>';
		str_newContent += '<td title="SteinhauDingens"><img src="http://szs.looki.de/static/rohstoff_icons/stein.gif"></td>';
		str_newContent += '<td title="KöhlerDingens"><img src="http://szs.looki.de/static/rohstoff_icons/kohle.gif"></td>';
		str_newContent += '<td title="Mine"><img src="http://szs.looki.de/static/rohstoff_icons/kupfer.gif"></td>';
		str_newContent += '<td title="ZinnDing"><img src="http://szs.looki.de/static/rohstoff_icons/zinn.gif"></td>';
		str_newContent += '<td title="BronzeDing"><img src="http://szs.looki.de/static/rohstoff_icons/bronze.gif"></td>';
		str_newContent += '<td title="SchamanenDingensDa">Tr.</td>';
		str_newContent += '<td title="Waffenbauplatz">Wa</td>';
		str_newContent += '<td title="Werkzeugbauplatz">We</td>';
		str_newContent += '<td title="Holz"><img src="http://szs.looki.de/static/rohstoff_icons/holz.gif"></td>';
		str_newContent += '<td title="Stein"><img src="http://szs.looki.de/static/rohstoff_icons/stein.gif"></td>';
		str_newContent += '<td title="Kupfer"><img src="http://szs.looki.de/static/rohstoff_icons/kupfer.gif"></td>';
		str_newContent += '<td title="Zinn"><img src="http://szs.looki.de/static/rohstoff_icons/zinn.gif"></td>';
		str_newContent += '</tr></thead><tbody>';
		var anzahlLaender = 0;
		var gesamtHolz = 0;
		var gesamtStein = 0;
		var gesamtKupfer = 0;
		var gesamtZinn = 0;
		var configLandControlFormInner = '<table class="eigeneLaender" border="1"><thead><tr bgcolor="#173f1a"><td>ID</td><td>X</td><td>Y</td><td>Holz</td><td>Stein</td><td>Kupfer</td><td>Zinn</td></tr></thead><tbody>';
		var landControlData = GM_getValue("LandControlData", "#").split('#');
		var landControlData2 = new Array();
		for(var i=1; i<landControlData.length-1; i++) {
			var temp = landControlData[i].split(',');
			landControlData2[temp[0]] = new Object();
			landControlData2[temp[0]]["Holz"] = temp[1];
			landControlData2[temp[0]]["Stein"] = temp[2];
			landControlData2[temp[0]]["Kupfer"] = temp[3];
			landControlData2[temp[0]]["Zinn"] = temp[4];
		}
		for(var i=0; i<laender.length; i++) {
			if(laender[i].indexOf('ID : ') != -1) {
				anzahlLaender++;
				laender[i] = laender[i].search(/ID : (\d{1,5}) X\: (\d{1,3}) Y\: (\d{1,3})/);
				var landid = RegExp.$1;
				var x = RegExp.$2;
				var y = RegExp.$3;
				str_newContent += '<tr id="land_'+landid+'"'+((curr_coords[0] == x && curr_coords[1] == y)? ' bgcolor="#3468a8"' : '')+'>';
				str_newContent += '<td><a href="landinfo.php?id='+landid+'">'+landid+'</a></td>';
				str_newContent += '<td>'+x+'</td>';
				str_newContent += '<td>'+y+'</td>';
				str_newContent += '<td>'+((curr_coords[0] == x && curr_coords[1] == y)? '-' : (Math.max(curr_coords[0], x)-Math.min(curr_coords[0], x))+(Math.max(curr_coords[1], y)-Math.min(curr_coords[1], y)))+'</td>';
				str_newContent += '<td colspan="14" align="center"><font color="yellow">Daten werden geladen</font></td>';
				str_newContent += '</tr>';
				configLandControlFormInner += '<tr'+((curr_coords[0] == x && curr_coords[1] == y)? ' bgcolor="#3468a8"' : '')+'>';
				configLandControlFormInner += '<td><a href="landinfo.php?id='+landid+'">'+landid+'</a></td>';
				configLandControlFormInner += '<td>'+x+'</td>';
				configLandControlFormInner += '<td>'+y+'</td>';
				configLandControlFormInner += '<td><input class="i2 tir" type="text" value="'+((landControlData2[landid])? landControlData2[landid]["Holz"] : '')+'"></td>';
				configLandControlFormInner += '<td><input class="i2 tir" type="text" value="'+((landControlData2[landid])? landControlData2[landid]["Stein"] : '')+'"></td>';
				configLandControlFormInner += '<td><input class="i2 tir" type="text" value="'+((landControlData2[landid])? landControlData2[landid]["Kupfer"] : '')+'"></td>';
				configLandControlFormInner += '<td><input class="i2 tir" type="text" value="'+((landControlData2[landid])? landControlData2[landid]["Zinn"] : '')+'"></td>';
				configLandControlFormInner += '</tr>';
				// Landinfos laden
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://szs.looki.de/landinfo.php?id="+landid,
					onload: function(response) {
						var id = response.finalUrl.replace(/\D*/, '');
						if(document.getElementById('land_'+id)) {
							var anfang = response.responseText.indexOf('Diese Dinge stehen auf deinem Land:');
							var ende = response.responseText.indexOf('Diese Dinge kannst du bauen:');
							var html = response.responseText.slice(anfang, ende);
							var landinfos = new Array();
							landinfos['Bauplatzvorbereitung'] = 0;
							landinfos['HolzhauDing'] = 0;
							landinfos['SteinhauDingens'] = 0;
							landinfos['KöhlerDingens'] = 0;
							landinfos['Mine'] = 0;
							landinfos['ZinnDing'] = 0;
							landinfos['BronzeDing'] = 0;
							landinfos['SchamanenDingensDa'] = 0;
							landinfos['Waffenbauplatz'] = 0;
							landinfos['Werkzeugbauplatz'] = 0;
							var dinge = html.split('<tr>');
							for(var i=1; i<dinge.length; i++) {
								dinge[i].search(/<td valign=top>\s*([A-Za-zö]*)\s*<\/td>/);
								var ding = RegExp.$1;
								dinge[i].search(/(\d+)/);
								var stufe = RegExp.$1;
								landinfos[ding] = stufe;
							}
							response.responseText.search(/Holz:\s*(\d*)<br>\s*Stein:\s*(\d*)<br>\s*Kupfer:\s*(\d*)<br>\s*Zinn:\s*(\d*)<br>/);
							var holz = parseInt(RegExp.$1, 10);
							var stein = parseInt(RegExp.$2, 10);
							var kupfer = parseInt(RegExp.$3, 10);
							var zinn = parseInt(RegExp.$4, 10);
							var str_landinfo = '';
							if(landinfos['Bauplatzvorbereitung'] == 0) {
								str_landinfo += '<td colspan="9" align="center">keine Bauplatzvorbereitung</td>';
							} else {
								str_landinfo += '<td>'+landinfos['HolzhauDing']+'</td>';
								str_landinfo += '<td>'+landinfos['SteinhauDingens']+'</td>';
								str_landinfo += '<td>'+landinfos['KöhlerDingens']+'</td>';
								str_landinfo += '<td>'+landinfos['Mine']+'</td>';
								str_landinfo += '<td>'+landinfos['ZinnDing']+'</td>';
								str_landinfo += '<td>'+landinfos['BronzeDing']+'</td>';
								str_landinfo += '<td>'+landinfos['SchamanenDingensDa']+'</td>';
								str_landinfo += '<td>'+landinfos['Waffenbauplatz']+'</td>';
								str_landinfo += '<td>'+landinfos['Werkzeugbauplatz']+'</td>';
							}
							str_landinfo += '<td'+((landControlData2[id] && holz <= landControlData2[id]["Holz"])? ' class="'+GM_getValue("LandControlColor", "red")+'"' : '')+'>'+number_format(holz)+'</td>';
							str_landinfo += '<td'+((landControlData2[id] && stein <= landControlData2[id]["Stein"])? ' class="'+GM_getValue("LandControlColor", "red")+'"' : '')+'>'+number_format(stein)+'</td>';
							str_landinfo += '<td'+((landControlData2[id] && kupfer <= landControlData2[id]["Kupfer"])? ' class="'+GM_getValue("LandControlColor", "red")+'"' : '')+'>'+number_format(kupfer)+'</td>';
							str_landinfo += '<td'+((landControlData2[id] && zinn <= landControlData2[id]["Zinn"])? ' class="'+GM_getValue("LandControlColor", "red")+'"' : '')+'>'+number_format(zinn)+'</td>';
							document.getElementById('land_'+id).getElementsByTagName('td')[4].outerHTML = str_landinfo;
							gesamtHolz += holz;
							gesamtStein += stein;
							gesamtKupfer += kupfer;
							gesamtZinn += zinn;
							anzahlLaender--;
							if(anzahlLaender == 0) {
								document.getElementById('gesamtHolz').innerHTML = number_format(gesamtHolz);
								document.getElementById('gesamtStein').innerHTML = number_format(gesamtStein);
								document.getElementById('gesamtKupfer').innerHTML = number_format(gesamtKupfer);
								document.getElementById('gesamtZinn').innerHTML = number_format(gesamtZinn);
							}
						}
					}
				});
				
			}
		}
		configLandControlFormInner += '</tbody></table>';
		str_newContent += '<tr><td>&Sigma;</td><td colspan="12"><br></td><td id="gesamtHolz"></td><td id="gesamtStein"></td><td id="gesamtKupfer"></td><td id="gesamtZinn"></td></tr>';
		str_newContent += '</tbody></table>';
		str_newContent += '<br><br><br><b>Landüberwachung:</b><br><br>Trage hier den Rohstoffwert ein, ab dem du gewarnt werden möchtest.<br>Der Menueintrag "Land" und der entsprechende Wert in der Tabelle oben werden <span class="'+GM_getValue("LandControlColor", "red")+'"><b>eingefärbt</b></span>.<br>Lasse ein Feld leer, wenn du keine Warnung erhalten möchtest.<br><br><form id="configLandControl" method="post" action="">'+configLandControlFormInner+'<br>Farbe:<input type="radio" name="configLandControlColor" value="red"'+((GM_getValue("LandControlColor", "red") == 'red')? ' checked="checked"':'')+'><span class="red">rot</span> <input type="radio" name="configLandControlColor" value="orange"'+((GM_getValue("LandControlColor", "red") == 'orange')? ' checked="checked"':'')+'><span class="orange">orange</span> <input type="radio" name="configLandControlColor" value="yellow"'+((GM_getValue("LandControlColor", "red") == 'yellow')? ' checked="checked"':'')+'><span class="yellow">gelb</span><br><br><input class="button" type="submit" value="Speichern"></form>';
		content.innerHTML = content.innerHTML.replace(/\s*Dein\(e\) Landstück\(e\):.*/, str_newContent);
		
		if(document.getElementById('configLandControl') && document.getElementById('configLandControl').addEventListener) {
			document.getElementById('configLandControl').addEventListener('submit', saveLandControlConfig, true);
		}
	}



// Gästebuch
	if(document.URL.indexOf('/gbuch.php') != -1) {
		var entrys = document.getElementById('content').getElementsByTagName('table');
		for(var i=entrys.length-1; i>0; i--) {
			var data_entrys = GM_getValue("GBEntrys", "0#");
			data_entrys = (data_entrys == '')? '0#': data_entrys;
			entrys[i].getElementsByTagName('td')[0].innerHTML.search(/eintragid=(\d+)/);
			var entryid = parseInt(RegExp.$1, 10);
			if(data_entrys.indexOf('#'+entryid+'#') == -1) {
				entrys[i].getElementsByTagName('td')[1].setAttribute('bgcolor', '#3468a8');
				data_entrys += entryid+'#';
			}
			var isPageOne = (document.getElementById('content').getElementsByTagName('div')[1].getElementsByTagName('b')[0].innerHTML.trim() == '1')? true : false;
			entrys[i].getElementsByTagName('td')[0].innerHTML.search(/(\d+)\.(\d+)\.(\d+) - (\d+):(\d+)/);
			var entryDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), 0);
			var lastGBEntry = parseInt(data_entrys.split('#')[0], 10);
			if(lastGBEntry < entryDate.getTime() && isPageOne) {
				data_entrys = data_entrys.replace(/^\d+#/, entryDate.getTime().toString()+'#');
			}
			GM_setValue("GBEntrys", data_entrys);
		}
	}
	if(GM_getValue("Assi_Gaestebucheintrag", true)) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/gbuch.php",
			onload: function(response) {
				var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
				var ende = response.responseText.indexOf('<!-- INHALT ENDE -->');
				var html = response.responseText.slice(anfang, ende);
				var entrys = html.split('<table border="0" cellspacing="0" width="99%">');
				html = entrys[1];
				anfang = html.indexOf('</a>');
				ende = html.indexOf('löschen</a>');
				html = html.slice(anfang+6, ende).trim();
				html.search(/(\d+)\.(\d+)\.(\d+) - (\d+):(\d+)/);
				var lastGBDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), 0);
				var data_entrys = GM_getValue("GBEntrys", "0#");
				data_entrys = (data_entrys == '')? '0#': data_entrys;
				var lastGBEntry = parseInt(data_entrys.split('#')[0], 10);
				if(parseInt(lastGBEntry, 10) < lastGBDate.getTime()) {
					if(document.getElementById('guestbook')) document.getElementById('guestbook').setAttribute('class', 'menu yellow');
				}
			}
		});
	}



// Schlafen
	if(document.URL.indexOf('/schlafen.php') != -1) {
		// Automatisches einschlafen bzw. aufwachen, je nach vorhandenem Link
		if(content.innerHTML.indexOf('[jetzt schlafen legen]') != -1) {
			window.location.href = 'http://szs.looki.de/schlafen.php?aktion=schlafen';
		} else if(content.innerHTML.indexOf('[aufwachen]') != -1) {
			window.location.href = 'http://szs.looki.de/schlafen.php?aktion=aufwachen';
		}
	}



// Markt
	if(document.URL.indexOf('/markt.php?do=rohstoffe') != -1 && content.innerHTML.indexOf('Du bist im Moment unterwegs.') == -1) {
		var angebote = 4;
		if(content.innerHTML.indexOf('Da dein Steini gerade beschäftigt ist, kannst du weder etwas auf den Markt stellen, noch etwas kaufen.') == -1) {
			angebote = 12;
			// Standardverkaufspreise
			if(parseInt(GM_getValue("Assi_MarktWasserverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengewasser')[0].value = parseInt(GM_getValue("Assi_MarktWasserverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktHolzverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengeholz')[0].value = parseInt(GM_getValue("Assi_MarktHolzverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktSteinverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengesteine')[0].value = parseInt(GM_getValue("Assi_MarktSteinverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktKohleverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengekohle')[0].value = parseInt(GM_getValue("Assi_MarktKohleverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktKupferverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengekupfer')[0].value = parseInt(GM_getValue("Assi_MarktKupferverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktZinnverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengezinn')[0].value = parseInt(GM_getValue("Assi_MarktZinnverkaufsmenge", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktBronzeverkaufsmenge", ""), 10) > 0) {
				document.getElementsByName('mengebronze')[0].value = parseInt(GM_getValue("Assi_MarktBronzeverkaufsmenge", ""), 10);
			}
			// Standardverkaufsmengen
			if(parseInt(GM_getValue("Assi_MarktWasserverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preiswasser')[0].value = parseInt(GM_getValue("Assi_MarktWasserverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktHolzverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preisholz')[0].value = parseInt(GM_getValue("Assi_MarktHolzverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktSteinverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preissteine')[0].value = parseInt(GM_getValue("Assi_MarktSteinverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktKohleverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preiskohle')[0].value = parseInt(GM_getValue("Assi_MarktKohleverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktKupferverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preiskupfer')[0].value = parseInt(GM_getValue("Assi_MarktKupferverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktZinnverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preiszinn')[0].value = parseInt(GM_getValue("Assi_MarktZinnverkaufspreis", ""), 10);
			}
			if(parseInt(GM_getValue("Assi_MarktBronzeverkaufspreis", ""), 10) > 0) {
				document.getElementsByName('preisbronze')[0].value = parseInt(GM_getValue("Assi_MarktBronzeverkaufspreis", ""), 10);
			}
		}
		// Preise hervorheben
		if(content.innerHTML.indexOf('Du befindest dich auf dem steinzeitlichen Rohstoffmarkt.') != -1) {
			var angebote = content.getElementsByTagName('table')[angebote].getElementsByTagName('tr');
			for(var i=1; i<angebote.length; i++) {
				var rohstoff = angebote[i].getElementsByTagName('td')[1].innerHTML.trim();
				var preis = parseInt(angebote[i].getElementsByTagName('td')[2].innerHTML, 10);
				if(preis < parseInt(GM_getValue("Assi_Markt"+rohstoff+"Preis", "0"), 10)) {
					angebote[i].setAttribute('bgcolor', '#3468a8');
				}
			}
		}
	} else if(document.URL.indexOf('/markt.php?do=kaufen') != -1 && document.getElementsByName('amount')[0]) {
		var i = (isPremiumSpieler)? 1 : 0;
		var gold = parseInt(menuRight.getElementsByTagName('table')[1+i].getElementsByTagName('td')[7].innerHTML.trim().replace(/\./g, ''), 10);
		content.getElementsByTagName('b')[0].innerHTML.search(/für\s*(\d*) Gold/);
		var preis = RegExp.$1;
		content.innerHTML.search(/maximal (\d*) Stück/);
		var menge = RegExp.$1;
		if(gold/preis < menge) {
			content.innerHTML += '<br>Du besitzt '+gold+' Gold und kannst daher maximal <b>'+(parseInt(gold/preis, 10))+' Stück</b> kaufen.'
		}
		document.getElementsByName('amount')[0].focus();
	}



// Übertragen
	if(document.URL.indexOf('/uebertragen.php') != -1 && content.innerHTML.indexOf('Hier kannst du anderen Spielern Rohstoffe übertragen') != -1) {
		var nahrung = parseInt(getURLParameter('nahrung'), 10);
		if(!(nahrung <= 0 || isNaN(nahrung))) document.getElementsByName('nahrung')[0].value = nahrung;
		var wasser = parseInt(getURLParameter('wasser'), 10);
		if(!(wasser <= 0 || isNaN(wasser))) document.getElementsByName('wasser')[0].value = wasser;
		var gold = parseInt(getURLParameter('gold'), 10);
		if(!(gold <= 0 || isNaN(gold))) document.getElementsByName('geld')[0].value = gold;
		var holz = parseInt(getURLParameter('holz'), 10);
		if(!(holz <= 0 || isNaN(holz))) document.getElementsByName('holz')[0].value = holz;
		var stein = parseInt(getURLParameter('stein'), 10);
		if(!(stein <= 0 || isNaN(stein))) document.getElementsByName('stein')[0].value = stein;
		var kohle = parseInt(getURLParameter('kohle'), 10);
		if(!(kohle <= 0 || isNaN(kohle))) document.getElementsByName('kohle')[0].value = kohle;
		var kupfer = parseInt(getURLParameter('kupfer'), 10);
		if(!(kupfer <= 0 || isNaN(kupfer))) document.getElementsByName('kupfer')[0].value = kupfer;
		var zinn = parseInt(getURLParameter('zinn'), 10);
		if(!(zinn <= 0 || isNaN(zinn))) document.getElementsByName('zinn')[0].value = zinn;
		var bronze = parseInt(getURLParameter('bronze'), 10);
		if(!(bronze <= 0 || isNaN(bronze))) document.getElementsByName('bronze')[0].value = bronze;
		var klheil = parseInt(getURLParameter('klheil'), 10);
		if(!(klheil <= 0 || isNaN(klheil))) document.getElementsByName('klheil')[0].value = klheil;
		var mtheil = parseInt(getURLParameter('mtheil'), 10);
		if(!(mtheil <= 0 || isNaN(mtheil))) document.getElementsByName('mtheil')[0].value = mtheil;
		var stheil = parseInt(getURLParameter('stheil'), 10);
		if(!(stheil <= 0 || isNaN(stheil))) document.getElementsByName('stheil')[0].value = stheil;
		var wach = parseInt(getURLParameter('wach'), 10);
		if(!(wach <= 0 || isNaN(wach))) document.getElementsByName('wach')[0].value = wach;
		var stwach = parseInt(getURLParameter('stwach'), 10);
		if(!(stwach <= 0 || isNaN(stwach))) document.getElementsByName('stwach')[0].value = stwach;
		var holzt = parseInt(getURLParameter('holzt'), 10);
		if(!(holzt <= 0 || isNaN(holzt))) document.getElementsByName('holzt')[0].value = holzt;
		var kupfert = parseInt(getURLParameter('kupfert'), 10);
		if(!(kupfert <= 0 || isNaN(kupfert))) document.getElementsByName('kupfert')[0].value = kupfert;
		var zinnt = parseInt(getURLParameter('zinnt'), 10);
		if(!(zinnt <= 0 || isNaN(zinnt))) document.getElementsByName('zinnt')[0].value = zinnt;
		var steint = parseInt(getURLParameter('steint'), 10);
		if(!(steint <= 0 || isNaN(steint))) document.getElementsByName('steint')[0].value = steint;
	}



// Lager
	if(document.URL.indexOf('/stamm.php?do=lager') != -1 && content.innerHTML.indexOf('Hier kannst du Rohstoffe von dir in das Stammlager schieben, aber auch Rohstoffe entnehmen.') != -1) {
		// Links zum Rohstoffe übertragen
		var lagerlogs = content.getElementsByTagName('table')[4].getElementsByTagName('tr');
		lagerlogs[0].innerHTML += '<td></td>';
		for(var i=1; i<lagerlogs.length; i++) {
			lagerlogs[i].innerHTML += '<td></td>';
			var username = lagerlogs[i].getElementsByTagName('td')[0].innerHTML.split('<br>')[0].trim();
			if(lagerlogs[i].innerHTML.indexOf('in das Lager verfrachtet.') != -1 && (GM_getValue("Assi_UserName", "") == username || GM_getValue("Assi_Lagerauszahlungen", "eigene") == "alle" || (GM_getValue("Assi_Lagerauszahlungen", "eigene") == "andere" && (','+GM_getValue("Assi_LagerauszahlungenNicks", "")+',').indexOf(','+username+',') != -1))) {
				var texts = lagerlogs[i].getElementsByTagName('font')[0].innerHTML.split('<br>');
				var sURL = 'http://szs.looki.de/uebertragen.php?anrohstoffe='+username;
				var inputParam = '';
				for(var j=1; j<texts.length-1; j++) {
					var ress = texts[j].trim().split(' ');
					sURL += '&'+ress[1].trim().toLowerCase()+'='+ress[0].trim().replace(/\./g, '');
					inputParam += ' '+ress[1].trim().toLowerCase()+'="'+ress[0].trim().replace(/\./g, '')+'"';
				}
				lagerlogs[i].getElementsByTagName('td')[0].innerHTML = lagerlogs[i].getElementsByTagName('td')[0].innerHTML.replace(/.*<br>/, '<a href="'+sURL+'">'+username+'</a><br>');
				// Checkboxen zum Rohstoffe auszahlen
				lagerlogs[i].getElementsByTagName('td')[2].innerHTML += '<input id="take['+i+']" type="checkbox"'+inputParam+'>';
				document.getElementById('take['+i+']').addEventListener('change', function() {
					var nahrung = parseInt(document.getElementsByName('menge_nahrung')[1].value, 10);
					var nahrung2 = parseInt(this.getAttribute('nahrung'), 10);
					if(nahrung < 0 || isNaN(nahrung)) nahrung = 0;
					if(nahrung2 < 0 || isNaN(nahrung2)) nahrung2 = 0;
					var wasser = parseInt(document.getElementsByName('menge_wasser')[1].value, 10);
					var wasser2 = parseInt(this.getAttribute('wasser'), 10);
					if(wasser < 0 || isNaN(wasser)) wasser = 0;
					if(wasser2 < 0 || isNaN(wasser2)) wasser2 = 0;
					var gold = parseInt(document.getElementsByName('menge_geld')[1].value, 10);
					var gold2 = parseInt(this.getAttribute('gold'), 10);
					if(gold < 0 || isNaN(gold)) gold = 0;
					if(gold2 < 0 || isNaN(gold2)) gold2 = 0;
					var holz = parseInt(document.getElementsByName('menge_holz')[1].value, 10);
					var holz2 = parseInt(this.getAttribute('holz'), 10);
					if(holz < 0 || isNaN(holz)) holz = 0;
					if(holz2 < 0 || isNaN(holz2)) holz2 = 0;
					var stein = parseInt(document.getElementsByName('menge_stein')[1].value, 10);
					var stein2 = parseInt(this.getAttribute('stein'), 10);
					if(stein < 0 || isNaN(stein)) stein = 0;
					if(stein2 < 0 || isNaN(stein2)) stein2 = 0;
					var kohle = parseInt(document.getElementsByName('menge_kohle')[1].value, 10);
					var kohle2 = parseInt(this.getAttribute('kohle'), 10);
					if(kohle < 0 || isNaN(kohle)) kohle = 0;
					if(kohle2 < 0 || isNaN(kohle2)) kohle2 = 0;
					var kupfer = parseInt(document.getElementsByName('menge_kupfer')[1].value, 10);
					var kupfer2 = parseInt(this.getAttribute('kupfer'), 10);
					if(kupfer < 0 || isNaN(kupfer)) kupfer = 0;
					if(kupfer2 < 0 || isNaN(kupfer2)) kupfer2 = 0;
					var zinn = parseInt(document.getElementsByName('menge_zinn')[1].value, 10);
					var zinn2 = parseInt(this.getAttribute('zinn'), 10);
					if(zinn < 0 || isNaN(zinn)) zinn = 0;
					if(zinn2 < 0 || isNaN(zinn2)) zinn2 = 0;
					var bronze = parseInt(document.getElementsByName('menge_bronze')[1].value, 10);
					var bronze2 = parseInt(this.getAttribute('bronze'), 10);
					if(bronze < 0 || isNaN(bronze)) bronze = 0;
					if(bronze2 < 0 || isNaN(bronze2)) bronze2 = 0;
					if(this.checked) {
						document.getElementsByName('menge_nahrung')[1].value = nahrung+nahrung2;
						document.getElementsByName('menge_wasser')[1].value = wasser+wasser2;
						document.getElementsByName('menge_geld')[1].value = gold+gold2;
						document.getElementsByName('menge_holz')[1].value = holz+holz2;
						document.getElementsByName('menge_stein')[1].value = stein+stein2;
						document.getElementsByName('menge_kohle')[1].value = kohle+kohle2;
						document.getElementsByName('menge_kupfer')[1].value = kupfer+kupfer2;
						document.getElementsByName('menge_zinn')[1].value = zinn+zinn2;
						document.getElementsByName('menge_bronze')[1].value = bronze+bronze2;
					} else {
						document.getElementsByName('menge_nahrung')[1].value = nahrung-nahrung2;
						document.getElementsByName('menge_wasser')[1].value = wasser-wasser2;
						document.getElementsByName('menge_geld')[1].value = gold-gold2;
						document.getElementsByName('menge_holz')[1].value = holz-holz2;
						document.getElementsByName('menge_stein')[1].value = stein-stein2;
						document.getElementsByName('menge_kohle')[1].value = kohle-kohle2;
						document.getElementsByName('menge_kupfer')[1].value = kupfer-kupfer2;
						document.getElementsByName('menge_zinn')[1].value = zinn-zinn2;
						document.getElementsByName('menge_bronze')[1].value = bronze-bronze2;
					}
				}, false);
			}
		}
	}



// Talkampf
	if(document.URL.indexOf('/grtal.php') != -1) {
		// Beschreibung anpassen
		var tkBeschreibung = content.innerHTML.replace(/12:00/, tkEnde+':00').replace(/10:00/g, tkStart+':00');
		if(tkBeschreibung.indexOf('Anmeldung zum Talkampf erst ab 12:05 möglich.') != -1 || tkBeschreibung.indexOf('Hier kannst du dich zum Talkampf eintragen.') != -1) {
			tkBeschreibung += '<br><font color="yellow"><b>TIPP:</b><br> Wenn du dich zw. 12:05 Uhr und '+tkEnde+' Uhr anmeldest, nimmst du am Talkampf teil und kannst nebenbei noch arbeiten, jagen, o.a.</font>';
		}
		content.innerHTML = tkBeschreibung;
		// Teilnahme speichern
		if(tkBeschreibung.indexOf('Du bist für die Kämpfe im Tal angemeldet.') != -1) {
			GM_setValue("TKTeilnahme", talkampfDate.getTime().toString());
		}
	}
	if(document.URL.indexOf('/grtal.php?teil=true') != -1 && content.innerHTML.indexOf('Dafür hast du leider zu wenig Rohstoffe.') == -1) {
		// Teilnahme speichern
		GM_setValue("TKTeilnahme", talkampfDate.getTime().toString());
	}



// Stammkampf
	if(document.URL.indexOf('/stamm.php?do=kampfuserauswahl') != -1) {
		if(content.innerHTML.indexOf('Ihr habt noch keinen Stamm herausgefordert bzw. seid herausgefordert worden.') != -1) {
			window.location.href = 'http://szs.looki.de/stamm.php?do=kampfsuche';
		} else if(content.innerHTML.indexOf('Du bist unterwegs.') == -1 && content.innerHTML.indexOf('Der Kampf läuft schon.') == -1) {
			// EPs + Waffen
			var gesamtTeilnehmer = 0;
			var gesamtEPs = 0;
			var teilnehmer = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
			teilnehmer[0].innerHTML = teilnehmer[0].innerHTML+'<td>Waffen</td>';
			var strStammkampfTeilnehmer = servertimeDate.getTime().toString()+'#';
			for(var i=1; i<teilnehmer.length; i++) {
				gesamtEPs += Math.floor(teilnehmer[i].getElementsByTagName('td')[1].innerHTML);
				teilnehmer[i].getElementsByTagName('td')[1].innerHTML = number_format(Math.floor(teilnehmer[i].getElementsByTagName('td')[1].innerHTML));
				teilnehmer[i].getElementsByTagName('td')[1].align = 'right';
				gesamtTeilnehmer += 1;
				var nick = teilnehmer[i].getElementsByTagName('td')[0].innerHTML.trim();
				strStammkampfTeilnehmer += nick+'#';
				if(GM_getValue("StammWaffen", "").indexOf(nick) != -1) {
					var waffe = GM_getValue("StammWaffen", "");
					waffe = waffe.slice(waffe.indexOf(nick));
					waffe = waffe.slice(waffe.indexOf(',')+1);
					waffe = waffe.slice(0, waffe.indexOf('#'));
					teilnehmer[i].innerHTML = teilnehmer[i].innerHTML+'<td>'+waffe+'</td>';
				} else {
					teilnehmer[i].innerHTML = teilnehmer[i].innerHTML+'<td></td>';
				}
			}
			teilnehmer[0].getElementsByTagName('td')[0].innerHTML = '<b>Name</b> ('+gesamtTeilnehmer+')';
			teilnehmer[0].getElementsByTagName('td')[1].innerHTML = '<b>Erfahrung</b> ('+number_format(parseFloat(gesamtEPs))+')';
			teilnehmer[0].getElementsByTagName('td')[2].innerHTML = '<b>Optionen</b>';
			teilnehmer[0].getElementsByTagName('td')[3].innerHTML = '<b>in der Hand<font color="red">*</font></b>';
			GM_setValue("StammkampfTeilnehmer", strStammkampfTeilnehmer);
			// Rohstoffsicherung
			var i = (isPremiumSpieler)? 1 : 0;
			var nahrung = parseInt(menuRight.getElementsByTagName('table')[1+i].getElementsByTagName('td')[3].innerHTML.trim().replace(/\./g, ''), 10)-parseInt(GM_getValue("Assi_NahrungRest", "50"));;
			if(nahrung < 0 || isNaN(nahrung)) nahrung = 0;
				if(parseInt(GM_getValue("Assi_NahrungRund", "0")) > 0) {
					while(nahrung%parseInt(GM_getValue("Assi_NahrungRund", "1")) != 0) {
						nahrung--;
					}
				}
			var gold = parseInt(menuRight.getElementsByTagName('table')[1+i].getElementsByTagName('td')[7].innerHTML.trim().replace(/\./g, ''), 10)-parseInt(GM_getValue("Assi_GoldRest", "50"));
			if(gold < 0 || isNaN(gold)) gold = 0;
				if(parseInt(GM_getValue("Assi_GoldRund", "0")) > 0) {
					while(gold%parseInt(GM_getValue("Assi_GoldRund", "1")) != 0) {
						gold--;
					}
				}
			var holz = parseInt(menuRight.getElementsByTagName('table')[1+i].getElementsByTagName('td')[9].innerHTML.trim().replace(/\./g, ''), 10)-parseInt(GM_getValue("Assi_HolzRest", "50"));
			if(holz < 0 || isNaN(holz)) holz = 0;
			var stein = parseInt(menuRight.getElementsByTagName('table')[1+i].getElementsByTagName('td')[11].innerHTML.trim().replace(/\./g, ''), 10)-parseInt(GM_getValue("Assi_SteinRest", "50"));
			if(stein < 0 || isNaN(stein)) stein = 0;
			content.innerHTML += '<br><br><b>Ressis sichern:</b><br><br>';
			var input = document.createElement('input');
			content.appendChild(input);
			input.setAttribute('id', 'saveNahrungGoldButton');
			input.setAttribute('type', 'button');
			input.setAttribute('class', 'button save');
			input.setAttribute('value', 'Nahrung & Gold ins Lager');
			input.setAttribute('nahrung', nahrung);
			input.setAttribute('gold', gold);
			input.setAttribute('title', number_format(nahrung, 0, ',', '.')+' Nahrung & '+number_format(gold, 0, ',', '.')+' Gold');
			input.addEventListener('click', function() {
				var nahrung = parseInt(this.getAttribute('nahrung'), 10);
				var gold = parseInt(this.getAttribute('gold'), 10);
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://szs.looki.de/stamm.php",
					data: "do=lager_anbiet&menge_nahrung="+nahrung+"&menge_geld="+gold+"&art=anbieten",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					onload: function(response) {
						var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
						var ende = response.responseText.indexOf('<!-- INHALT ENDE -->')+20;
						var html = response.responseText.slice(anfang, ende);
						anfang = html.indexOf('</table>')+12;
						ende = html.length-20;
						html = html.slice(anfang, ende).trim();
						if(html == 'Deine ausgewählten Rohstoffe liegen jetzt im Stammlager.') {
							alert(number_format(nahrung)+' Nahrung und '+number_format(gold)+' Gold in das Lager verfrachtet.');
						} else {
							alert('Fehler:\n\n'+html+'\n\nNahrung: '+nahrung+'\nGold: '+gold);
						}
					}
				});
			});
			var input = document.createElement('input');
			content.appendChild(input);
			input.setAttribute('id', 'saveHolzButton');
			input.setAttribute('type', 'button');
			input.setAttribute('class', 'button save');
			input.setAttribute('value', 'Holz auf den Markt');
			input.setAttribute('holz', holz);
			input.setAttribute('title', number_format(holz, 0, ',', '.')+' Holz')
			input.addEventListener('click', function() {
				var holz = parseInt(this.getAttribute('holz'), 10);
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://szs.looki.de/markt.php",
					data: "do=rohverkauf&mengeholz="+holz+"&preisholz="+GM_getValue("Assi_HolzPreis", "100")+"&art=Holz+anbieten",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					onload: function(response) {
						var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
						var ende = response.responseText.indexOf('<!-- INHALT ENDE -->')+20;
						var html = response.responseText.slice(anfang, ende);
						anfang = html.indexOf('</table>')+12;
						ende = html.length-20;
						html = html.slice(anfang, ende).trim();
						if(html == 'Dein Rohstoff wird jetzt auf dem Markt angeboten.') {
							alert(number_format(holz)+' Holz zum Preis von '+number_format(GM_getValue("Assi_HolzPreis", "100"))+' Gold auf den Markt gestellt.');
						} else {
							alert('Fehler:\n\n'+html+'\n\nHolz: '+holz+'\nHolzpreis: '+GM_getValue("Assi_HolzPreis", "100"));
						}
					}
				});
			});
			var input = document.createElement('input');
			content.appendChild(input);
			input.setAttribute('id', 'saveSteinButton');
			input.setAttribute('type', 'button');
			input.setAttribute('class', 'button save');
			input.setAttribute('value', 'Steine auf den Markt');
			input.setAttribute('stein', stein);
			input.setAttribute('title', number_format(stein, 0, ',', '.')+' Steine')
			input.addEventListener('click', function() {
				var stein = parseInt(this.getAttribute('stein'), 10);
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://szs.looki.de/markt.php",
					data: "do=rohverkauf&mengesteine="+stein+"&preissteine="+GM_getValue("Assi_SteinPreis", "100")+"&art=Stein+anbieten",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					onload: function(response) {
						var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
						var ende = response.responseText.indexOf('<!-- INHALT ENDE -->')+20;
						var html = response.responseText.slice(anfang, ende);
						anfang = html.indexOf('</table>')+12;
						ende = html.length-20;
						html = html.slice(anfang, ende).trim();
						if(html == 'Dein Rohstoff wird jetzt auf dem Markt angeboten.') {
							alert(number_format(stein)+' Steine zum Preis von '+number_format(GM_getValue("Assi_SteinPreis", "100"))+' Gold auf den Markt gestellt.');
						} else {
							alert('Fehler:\n\n'+html+'\n\nSteine: '+stein+'\nSteinpreis: '+GM_getValue("Assi_SteinPreis", "100"));
						}
					}
				});
			});


			// Hinweis ausgeben
			var hinweisDIV = document.createElement('div');
			hinweisDIV.setAttribute('class', 'yellow');
			content.appendChild(hinweisDIV);
			hinweisDIV.innerHTML = '<br><br><font color="red"><b>* Hinweis:</b></font><br>Daten zuletzt aktualisiert vor ';
			var stammWaffenDate = new Date(parseInt(GM_getValue("StammWaffen", "").split('#')[0], 10));
			var count = Math.floor(servertimeDate.getTime()/1000)-Math.floor(stammWaffenDate.getTime()/1000);
			var seconds = count%60;
			count = Math.floor(count/60);
			var minutes = count%60;
			count = Math.floor(count/60);
			var hours = count%24;
			if(hours > 0) {
				hinweisDIV.innerHTML += hours+':'+format2(minutes)+':'+format2(seconds)+' Std';
			} else if(minutes > 0) {
				hinweisDIV.innerHTML += minutes+':'+format2(seconds)+' Min';
			} else {
				hinweisDIV.innerHTML += seconds+' Sek';
			}
			hinweisDIV.innerHTML += ' ('+format2(stammWaffenDate.getDate())+'.'+format2(stammWaffenDate.getMonth()+1)+'.'+stammWaffenDate.getFullYear()+' - '+format2(stammWaffenDate.getHours())+':'+format2(stammWaffenDate.getMinutes())+':'+format2(stammWaffenDate.getSeconds())+' Uhr)<br>';
			hinweisDIV.innerHTML += '-> via <a href="stamm.php?do=uebersicht">StammÜbersicht</a> aktualisieren<br>';
		}
	} else if(document.URL.indexOf('/stamm.php?do=kampfsuche') && content.innerHTML.indexOf('Ihr habt schon einen Stamm herausgefordert bzw. wurdet herausgefordert.') != -1) {
		window.location.href = 'http://szs.looki.de/stamm.php?do=kampfuserauswahl';
	}
	if(document.URL.indexOf('/stamm.php?do=kampfteilnehmen') != -1) {
		// Teilnahme speichern
		GM_setValue("SKTeilnahme", GM_getValue("NextSK", "0").split(',')[0]);
	}
	if(document.URL.indexOf('/stamm.php?do=nichtteil') != -1) {
		// Teilnahme löschen
		GM_deleteValue("SKTeilnahme");
	}



// Magierkampf
	if(document.URL.indexOf('/stamm.magierkampf.php') != -1 && content.innerHTML.indexOf('Du bist jetzt') == -1 && content.innerHTML.indexOf('Derzeit laufen die Magierkämpfe.') == -1 && document.URL.indexOf('action=update') == -1) {
		// Beschreibung anpassen
		content.innerHTML = content.innerHTML.replace('18:00', mkEnde+':00').replace('16:00', mkStart+':00');
		content.innerHTML = content.innerHTML.replace('<b>Teilnehmer:</b>', '');
		// Teilnehmer speichern + Waffen hinzufügen
		var strMagierkampfTeilnehmer = servertimeDate.getTime().toString()+'#';
		if(content.getElementsByTagName('table')[1]) {
			var gesamtTeilnehmer = 0;
			content.getElementsByTagName('table')[1].setAttribute('border', '1');
			var teilnehmer = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
			for(var i=0; i<teilnehmer.length; i++) {
				gesamtTeilnehmer++;
				var nick = teilnehmer[i].getElementsByTagName('td')[0].innerHTML.trim();
				strMagierkampfTeilnehmer += nick+'#';
				if(!teilnehmer[i].getElementsByTagName('td')[1]) {
					teilnehmer[i].innerHTML = teilnehmer[i].innerHTML+'<td></td>';
				}
				if(GM_getValue("StammWaffen", "").indexOf(nick) != -1) {
					var waffe = GM_getValue("StammWaffen", "");
					waffe = waffe.slice(waffe.indexOf(nick));
					waffe = waffe.slice(waffe.indexOf(',')+1);
					waffe = waffe.slice(0, waffe.indexOf('#'));
					teilnehmer[i].innerHTML = teilnehmer[i].innerHTML+'<td>'+waffe+'</td>';
				} else {
					teilnehmer[i].innerHTML = teilnehmer[i].innerHTML+'<td></td>';
				}
			}
			var headTD = document.createElement('tr');
			headTD.innerHTML = '<td><b>Teilnehmer</b> ('+gesamtTeilnehmer+')</td><td><b>Optionen</b></td><td><b>in der Hand<font color="red">*</font></b></td>';
			teilnehmer[0].parentNode.insertBefore(headTD, teilnehmer[0]);
		}
		GM_setValue("MagierkampfTeilnehmer", strMagierkampfTeilnehmer);
		var stammWaffenDate = new Date(parseInt(GM_getValue("StammWaffen", "").split('#')[0], 10));
		var hinweis = '<br><br><font color="red"><b>* Hinweis:</b></font><br><font color="yellow">Daten zuletzt aktualisiert vor ';
		var count = Math.floor(servertimeDate.getTime()/1000)-Math.floor(stammWaffenDate.getTime()/1000);
		var seconds = count%60;
		count = Math.floor(count/60);
		var minutes = count%60;
		count = Math.floor(count/60);
		var hours = count%24;
			if(hours > 0) {
				hinweis += hours+':'+format2(minutes)+':'+format2(seconds)+' Std';
			} else if(minutes > 0) {
				hinweis += minutes+':'+format2(seconds)+' Min';
			} else {
				hinweis += seconds+' Sek';
			}
		hinweis += ' ('+format2(stammWaffenDate.getDate())+'.'+format2(stammWaffenDate.getMonth()+1)+'.'+stammWaffenDate.getFullYear()+' - '+format2(stammWaffenDate.getHours())+':'+format2(stammWaffenDate.getMinutes())+':'+format2(stammWaffenDate.getSeconds())+' Uhr)<br>';
		hinweis += '-> via <a href="stamm.php?do=uebersicht">StammÜbersicht</a> aktualisieren<br>';
		content.innerHTML += hinweis;
		// Teilnahme speichern
		if(document.URL.indexOf('stamm.magierkampf.php?action=anmelden') != -1 || content.innerHTML.indexOf('vom Magierkampf austragen') != -1) {
			GM_setValue("MKTeilnahme", magierkampfDate.getTime().toString());
		}
	}



// Stammübersicht
	if(document.URL.indexOf('/stamm.php?do=uebersicht') != -1) {
		// SK-Datum speichern
		if(content.innerHTML.indexOf('Nächster Kampf: kein Kampf') == -1) {
			content.innerHTML.search(/Nächster Kampf: (\d+)\.(\d+)\.(\d+) \- (\d+):(\d+)/);
			var skStartDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), 0);
			var i=0;
			while(content.getElementsByTagName('a')[i].getAttribute('href').indexOf('stamminfo.php?stammid=') == -1) {
				i++;
			}
			var skGegner = content.getElementsByTagName('a')[i].innerHTML.trim();
			content.getElementsByTagName('a')[i].getAttribute('href').search(/stammid=(\d*)/);
			var newSPAN = document.createElement('span');
			newSPAN.innerHTML = ' (<span id="ep_skGegner"></span> EP)';
			content.insertBefore(newSPAN, content.getElementsByTagName('a')[i].nextSibling);
			getClanEPByClanId(RegExp.$1, 'ep_skGegner');
		} else {
			content.innerHTML = content.innerHTML.replace(/Nächster Kampf: kein Kampf/, 'Nächster Kampf: kein Kampf <a href="stamm.php?do=kampfsuche">[Gegnersuche]</a>');
		}
		// EPs etc.
		var gesamtEPs = 0;
		var gesamtHolz = 0;
		var gesamtStein = 0;
		var gesamtGold = 0;
		var gesamtWasser = 0;
		var gesamtNahrung = 0;
		var gesamtOnline = 0;
		var skTeilnehmerEP = 0;
		var gruender = 0;
		if(content.getElementsByTagName('table')[1].innerHTML.indexOf('Als Gründer kannst du hier das Passwort ändern:') != -1) gruender = 1;
		var mitglieder = content.getElementsByTagName('table')[1+gruender].getElementsByTagName('tr');
		for(var i=1; i<mitglieder.length; i++) {
			var user = mitglieder[i].getElementsByTagName('a')[0].innerHTML.replace(/<font color="red">/, '').replace(/<\/font>/, '').trim();
			var ep = mitglieder[i].getElementsByTagName('td')[2].innerHTML.trim();
			gesamtEPs += Math.floor(ep);
			gesamtHolz += Math.floor(mitglieder[i].getElementsByTagName('td')[3].innerHTML);
			gesamtStein += Math.floor(mitglieder[i].getElementsByTagName('td')[4].innerHTML);
			gesamtGold += Math.floor(mitglieder[i].getElementsByTagName('td')[5].innerHTML);
			gesamtWasser += Math.floor(mitglieder[i].getElementsByTagName('td')[6].innerHTML);
			gesamtNahrung += Math.floor(mitglieder[i].getElementsByTagName('td')[7].innerHTML);
			mitglieder[i].getElementsByTagName('td')[2].innerHTML = number_format(Math.floor(ep));
			mitglieder[i].getElementsByTagName('td')[3].innerHTML = number_format(Math.floor(mitglieder[i].getElementsByTagName('td')[3].innerHTML));
			mitglieder[i].getElementsByTagName('td')[4].innerHTML = number_format(Math.floor(mitglieder[i].getElementsByTagName('td')[4].innerHTML));
			mitglieder[i].getElementsByTagName('td')[5].innerHTML = number_format(Math.floor(mitglieder[i].getElementsByTagName('td')[5].innerHTML));
			mitglieder[i].getElementsByTagName('td')[6].innerHTML = number_format(Math.floor(mitglieder[i].getElementsByTagName('td')[6].innerHTML));
			mitglieder[i].getElementsByTagName('td')[7].innerHTML = number_format(Math.floor(mitglieder[i].getElementsByTagName('td')[7].innerHTML));
			mitglieder[i].getElementsByTagName('td')[2].align = 'right';
			mitglieder[i].getElementsByTagName('td')[3].align = 'right';
			mitglieder[i].getElementsByTagName('td')[4].align = 'right';
			mitglieder[i].getElementsByTagName('td')[5].align = 'right';
			mitglieder[i].getElementsByTagName('td')[6].align = 'right';
			mitglieder[i].getElementsByTagName('td')[7].align = 'right';
			mitglieder[i].getElementsByTagName('td')[8].align = 'right';
			if(mitglieder[i].getElementsByTagName('td')[8].innerHTML.indexOf('online') != -1) {
				gesamtOnline += 1;
			}
			if(GM_getValue("StammkampfTeilnehmer", "").indexOf(user) != -1) {
				skTeilnehmerEP += Math.floor(ep);
			}
		}
		var gesamtMitglieder = mitglieder.length-1;
		mitglieder[0].getElementsByTagName('td')[0].innerHTML = '<b>#<br>&Sigma;<br>\u2300</b>';
		mitglieder[0].getElementsByTagName('td')[1].innerHTML = '<b>Name</b><br><i>'+gesamtMitglieder+'</i><br><br>';
		mitglieder[0].getElementsByTagName('td')[2].innerHTML = '<center><b>EP</b></center><i>'+number_format(gesamtEPs)+'<br>'+number_format(gesamtEPs/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[3].innerHTML = '<center><b>Holz</b></center><i>'+number_format(gesamtHolz)+'<br>'+number_format(gesamtHolz/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[4].innerHTML = '<center><b>Stein</b></center><i>'+number_format(gesamtStein)+'<br>'+number_format(gesamtStein/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[5].innerHTML = '<center><b>Gold</b></center><i>'+number_format(gesamtGold)+'<br>'+number_format(gesamtGold/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[6].innerHTML = '<center><b>Wasser</b></center><i>'+number_format(gesamtWasser)+'<br>'+number_format(gesamtWasser/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[7].innerHTML = '<center><b>Nahrung</b></center><i>'+number_format(gesamtNahrung)+'<br>'+number_format(gesamtNahrung/gesamtMitglieder)+'</i>';
		mitglieder[0].getElementsByTagName('td')[8].innerHTML = '<b>Status</b><br><i>'+number_format(gesamtOnline)+'</i><br><br>';
		mitglieder[0].getElementsByTagName('td')[0].align = 'center';
		mitglieder[0].getElementsByTagName('td')[1].align = 'center';
		mitglieder[0].getElementsByTagName('td')[2].align = 'right';
		mitglieder[0].getElementsByTagName('td')[3].align = 'right';
		mitglieder[0].getElementsByTagName('td')[4].align = 'right';
		mitglieder[0].getElementsByTagName('td')[5].align = 'right';
		mitglieder[0].getElementsByTagName('td')[6].align = 'right';
		mitglieder[0].getElementsByTagName('td')[7].align = 'right';
		mitglieder[0].getElementsByTagName('td')[8].align = 'center';
		// SK+MK-Anmeldungen und StammWaffen für SK+MK
		var skTeilnehmerDate = new Date(parseInt(GM_getValue("StammkampfTeilnehmer", "").split('#')[0], 10));
		var mkTeilnehmerDate = new Date(parseInt(GM_getValue("MagierkampfTeilnehmer", "").split('#')[0], 10));
		var isOldSK = (skStartDate && skStartDate.getTime()-86400000 >= skTeilnehmerDate.getTime()) ? true : false; // 86.400.000 = 1d
		var isOldMK = (magierkampfDate.getTime()-604800000 >= mkTeilnehmerDate.getTime()) ? true : false; // 604.800.000 = 7d
		var strStammWaffen = servertimeDate.getTime().toString()+'#';
		var mitglieder = content.getElementsByTagName('table')[2+gruender].getElementsByTagName('tr');
		var skTeilnehmer = new Array();
		var skTeilnehmerOhneWaffe = new Array();
		var skNichtTeilnehmerOhneWaffeninfo = new Array();
		var skNichtTeilnehmerMitWaffeninfo = new Array();
		var skCountNichtTeilnehmerOhneWaffe = 0;
		var mkTeilnehmer = new Array();
		var mkTeilnehmerOhneWaffe = new Array();
		var mkNichtTeilnehmerOhneWaffeninfo = new Array();
		var mkNichtTeilnehmerMitWaffeninfo = new Array();
		var mkCountNichtTeilnehmerOhneWaffe = 0;
		for(var i=1; i<mitglieder.length; i++) {
			var nick = mitglieder[i].getElementsByTagName('a')[0].innerHTML.replace(/<font color="red">/, '').replace(/<\/font>/, '').trim();
			var waffe = mitglieder[i].getElementsByTagName('td')[3].innerHTML.trim();
			var status = mitglieder[i].getElementsByTagName('td')[8].getElementsByTagName('font')[0].getAttribute('color').trim();
			mitglieder[i].getElementsByTagName('td')[0].innerHTML = '<font color="'+status+'">'+i+'</font>';
			mitglieder[i].removeChild(mitglieder[i].getElementsByTagName('td')[8]);
			var skTD = document.createElement('td');
			skTD.setAttribute('align', 'center');
			if(!isOldSK) {
				if(GM_getValue("StammkampfTeilnehmer", "").indexOf(nick) != -1) {
					skTD.innerHTML = '<div class="greenDot"></div>';
					skTeilnehmer.push(nick);
					if(waffe == '' || waffen.indexOf(waffe) == -1) {
						skTeilnehmerOhneWaffe.push(nick);
					}
				} else {
					skTD.innerHTML = '<div class="redDot"></div>';
					skNichtTeilnehmerOhneWaffeninfo.push(nick);
					if(waffe == '' || waffen.indexOf(waffe) == -1) {
						skNichtTeilnehmerMitWaffeninfo.push(nick+"(*)");
						skCountNichtTeilnehmerOhneWaffe++;
					} else {
						skNichtTeilnehmerMitWaffeninfo.push(nick);
					}
				}
			}
			mitglieder[i].insertBefore(skTD, mitglieder[i].getElementsByTagName('td')[4]);
			var mkTD = document.createElement('td');
			mkTD.setAttribute('align', 'center');
			if(!isOldMK) {
				if(GM_getValue("MagierkampfTeilnehmer", "").indexOf(nick) != -1) {
					mkTD.innerHTML = '<div class="greenDot"></div>';
					mkTeilnehmer.push(nick);
					if(waffe == '' || waffen.indexOf(waffe) == -1) {
						mkTeilnehmerOhneWaffe.push(nick);
					}
				} else {
					mkTD.innerHTML = '<div class="redDot"></div>';
					mkNichtTeilnehmerOhneWaffeninfo.push(nick);
					if(waffe == '' || waffen.indexOf(waffe) == -1) {
						mkNichtTeilnehmerMitWaffeninfo.push(nick+"(*)");
						mkCountNichtTeilnehmerOhneWaffe++;
					} else {
						mkNichtTeilnehmerMitWaffeninfo.push(nick);
					}
				}
			}
			mitglieder[i].insertBefore(mkTD, mitglieder[i].getElementsByTagName('td')[5]);
			strStammWaffen += nick+','+waffe+'#';
		}
		GM_setValue("StammWaffen", strStammWaffen);
		mitglieder[0].innerHTML = mitglieder[0].innerHTML.replace(/<td>\s*in der Hand\s*<\/td>/, '<td></td><td></td><td></td>');
		mitglieder[0].getElementsByTagName('td')[0].innerHTML = '<b>#</b>';
		mitglieder[0].getElementsByTagName('td')[1].innerHTML = '<b>Name</b>';
		mitglieder[0].getElementsByTagName('td')[2].innerHTML = '<b>Beruf</b>';
		mitglieder[0].getElementsByTagName('td')[3].innerHTML = '<b>in der Hand</b>';
		mitglieder[0].getElementsByTagName('td')[4].innerHTML = '<b>SK<font color="red">*</font></b>';
		mitglieder[0].getElementsByTagName('td')[5].innerHTML = '<b>MK<font color="red">*</font></b>';
		mitglieder[0].getElementsByTagName('td')[6].innerHTML = '<b>Kicken</b>';
		mitglieder[0].getElementsByTagName('td')[7].innerHTML = '<b title="Lagerrechte">LR</b>';
		mitglieder[0].getElementsByTagName('td')[8].innerHTML = '<b title="Gründerrechte">GR</b>';
		mitglieder[0].getElementsByTagName('td')[9].innerHTML = '<b title="Forenrechte">FR</b>';
		mitglieder[0].removeChild(mitglieder[0].getElementsByTagName('td')[10]);
		mitglieder[0].getElementsByTagName('td')[0].align = 'center';
		mitglieder[0].getElementsByTagName('td')[1].align = 'center';
		mitglieder[0].getElementsByTagName('td')[2].align = 'center';
		mitglieder[0].getElementsByTagName('td')[3].align = 'center';
		mitglieder[0].getElementsByTagName('td')[4].align = 'center';
		mitglieder[0].getElementsByTagName('td')[5].align = 'center';
		mitglieder[0].getElementsByTagName('td')[6].align = 'center';
		mitglieder[0].getElementsByTagName('td')[7].align = 'center';
		mitglieder[0].getElementsByTagName('td')[8].align = 'center';
		mitglieder[0].getElementsByTagName('td')[9].align = 'center';
		var hinweis = '<br><br><font color="red"><b>* Hinweis:</b></font><br><font color="yellow">Teilnehmer-Daten zuletzt aktualisiert<br>';
		hinweis += '- SK: ';
		if(isOldSK) {
			hinweis += '<font color="red"><b>Veraltet! Vom letzten SK!</b></font>';
		} else {
			var count = Math.floor(servertimeDate.getTime()/1000)-Math.floor(skTeilnehmerDate.getTime()/1000);
			var seconds = count%60;
			count = Math.floor(count/60);
			var minutes = count%60;
			count = Math.floor(count/60);
			var hours = count%24;
			if(hours > 0) {
				hinweis += hours+':'+format2(minutes)+':'+format2(seconds)+' Std';
			} else if(minutes > 0) {
				hinweis += minutes+':'+format2(seconds)+' Min';
			} else {
				hinweis += seconds+' Sek';
			}
			hinweis += ' ('+format2(skTeilnehmerDate.getDate())+'.'+format2(skTeilnehmerDate.getMonth()+1)+'.'+skTeilnehmerDate.getFullYear()+' - '+format2(skTeilnehmerDate.getHours())+':'+format2(skTeilnehmerDate.getMinutes())+':'+format2(skTeilnehmerDate.getSeconds())+' Uhr)';
		}
		hinweis += ' -> via <a href="stamm.php?do=kampfuserauswahl">Stammkampf</a> aktualisieren<br>';
		hinweis += '- MK: ';
		if(isOldMK) {
			hinweis += '<font color="red"><b>Veraltet! Vom letzten MK!</b></font>';
		} else {
			var count = Math.floor(servertimeDate.getTime()/1000)-Math.floor(mkTeilnehmerDate.getTime()/1000);
			var seconds = count%60;
			count = Math.floor(count/60);
			var minutes = count%60;
			count = Math.floor(count/60);
			var hours = count%24;
			if(hours > 0) {
				hinweis += hours+':'+format2(minutes)+':'+format2(seconds)+' Std';
			} else if(minutes > 0) {
				hinweis += minutes+':'+format2(seconds)+' Min';
			} else {
				hinweis += seconds+' Sek';
			}
			hinweis += ' ('+format2(mkTeilnehmerDate.getDate())+'.'+format2(mkTeilnehmerDate.getMonth()+1)+'.'+mkTeilnehmerDate.getFullYear()+' - '+format2(mkTeilnehmerDate.getHours())+':'+format2(mkTeilnehmerDate.getMinutes())+':'+format2(mkTeilnehmerDate.getSeconds())+' Uhr)';
		}
		hinweis += ' -> via <a href="stamm.magierkampf.php">Magierkampf</a> aktualisieren</font><br><br>';
		content.innerHTML += hinweis+"<br>";
		var skCopyOhneWaffenstand = '';
		var skCopyMitWaffenstand = '';
		if(skStartDate) {
			skCopyOhneWaffenstand = 'Stammkampf: '+format2(skStartDate.getDate())+'.'+format2(skStartDate.getMonth()+1)+'.'+skStartDate.getFullYear()+' - '+format2(skStartDate.getHours())+':'+format2(skStartDate.getMinutes())+' Uhr';
			skCopyOhneWaffenstand += '\nGegner: '+skGegner;
			skCopyMitWaffenstand = skCopyOhneWaffenstand;
			if(isOldSK) {
				skCopyOhneWaffenstand += '\n\nVeraltete Teilnehmer-Daten vom letzten Stammkampf!';
				skCopyMitWaffenstand = skCopyOhneWaffenstand;
			} else {
				skCopyOhneWaffenstand += '\n\nTeilnehmer: '+skTeilnehmer.length+'/'+gesamtMitglieder+' ('+number_format(skTeilnehmerEP)+' EP)';
				skCopyOhneWaffenstand += '\n\nNICHT angemeldet ('+skNichtTeilnehmerOhneWaffeninfo.length+'): '+skNichtTeilnehmerOhneWaffeninfo.join(', ');
				skCopyOhneWaffenstand += '\n\nStand (Teilnehmer): '+format2(skTeilnehmerDate.getDate())+'.'+format2(skTeilnehmerDate.getMonth()+1)+'.'+skTeilnehmerDate.getFullYear()+' - '+format2(skTeilnehmerDate.getHours())+':'+format2(skTeilnehmerDate.getMinutes())+':'+format2(skTeilnehmerDate.getSeconds())+' Uhr';
				skCopyMitWaffenstand += '\n\nTeilnehmer: '+skTeilnehmer.length+'/'+gesamtMitglieder+' ('+number_format(skTeilnehmerEP)+' EP)'+'\ndavon OHNE Waffe: ('+skTeilnehmerOhneWaffe.length+'): '+skTeilnehmerOhneWaffe.join(', ');
				skCopyMitWaffenstand += '\n\nNICHT angemeldet ('+skNichtTeilnehmerMitWaffeninfo.length+'): '+skNichtTeilnehmerMitWaffeninfo.join(', ')+((skCountNichtTeilnehmerOhneWaffe > 0)? '\n(*) = ohne Waffe ('+skCountNichtTeilnehmerOhneWaffe+')':'');
				skCopyMitWaffenstand += '\n\nStand (Teilnehmer): '+format2(skTeilnehmerDate.getDate())+'.'+format2(skTeilnehmerDate.getMonth()+1)+'.'+skTeilnehmerDate.getFullYear()+' - '+format2(skTeilnehmerDate.getHours())+':'+format2(skTeilnehmerDate.getMinutes())+':'+format2(skTeilnehmerDate.getSeconds())+' Uhr';
				skCopyMitWaffenstand += '\nStand (Waffen): '+format2(servertimeDate.getDate())+'.'+format2(servertimeDate.getMonth()+1)+'.'+servertimeDate.getFullYear()+' - '+format2(servertimeDate.getHours())+':'+format2(servertimeDate.getMinutes())+':'+format2(servertimeDate.getSeconds())+' Uhr';
			}
		} else {
			skCopyOhneWaffenstand = 'Derzeit kein Stammkampf!';
			skCopyMitWaffenstand = skCopyOhneWaffenstand;
		}
		content.innerHTML += '<b>Stammkampf-Copy:</b> <input id="skcopycheckbox" type="checkbox">mit Waffenstand<br><textarea id="skcopy" class="kampfcopy"></textarea><br><br><br>';
		document.getElementById('skcopy').innerHTML = skCopyOhneWaffenstand;
		var mkCopyOhneWaffenstand = 'Magierkampf: '+format2(magierkampfDate.getDate())+'.'+format2(magierkampfDate.getMonth()+1)+'.'+magierkampfDate.getFullYear()+' - '+format2(magierkampfDate.getHours())+':'+format2(magierkampfDate.getMinutes())+' Uhr';
		var mkCopyMitWaffenstand = mkCopyOhneWaffenstand;
		if(isOldMK) {
			mkCopyOhneWaffenstand += '\n\nVeraltete Teilnehmer-Daten vom letzten Magierkampf!';
			mkCopyMitWaffenstand = mkCopyOhneWaffenstand;
		} else {
			mkCopyOhneWaffenstand += '\n\nTeilnehmer: '+mkTeilnehmer.length+'/'+gesamtMitglieder;
			mkCopyOhneWaffenstand += '\n\nNICHT angemeldet ('+mkNichtTeilnehmerOhneWaffeninfo.length+'): '+mkNichtTeilnehmerOhneWaffeninfo.join(', ');
			mkCopyOhneWaffenstand += '\n\nStand (Teilnehmer): '+format2(mkTeilnehmerDate.getDate())+'.'+format2(mkTeilnehmerDate.getMonth()+1)+'.'+mkTeilnehmerDate.getFullYear()+' - '+format2(mkTeilnehmerDate.getHours())+':'+format2(mkTeilnehmerDate.getMinutes())+':'+format2(mkTeilnehmerDate.getSeconds())+' Uhr';
			mkCopyMitWaffenstand += '\n\nTeilnehmer: '+mkTeilnehmer.length+'/'+gesamtMitglieder+'\ndavon OHNE Waffe ('+mkTeilnehmerOhneWaffe.length+'): '+mkTeilnehmerOhneWaffe.join(', ');
			mkCopyMitWaffenstand += '\n\nNICHT angemeldet ('+mkNichtTeilnehmerMitWaffeninfo.length+'): '+mkNichtTeilnehmerMitWaffeninfo.join(', ')+((mkCountNichtTeilnehmerOhneWaffe > 0)? '\n(*) = ohne Waffe ('+mkCountNichtTeilnehmerOhneWaffe+')':'');
			mkCopyMitWaffenstand += '\n\nStand (Teilnehmer): '+format2(mkTeilnehmerDate.getDate())+'.'+format2(mkTeilnehmerDate.getMonth()+1)+'.'+mkTeilnehmerDate.getFullYear()+' - '+format2(mkTeilnehmerDate.getHours())+':'+format2(mkTeilnehmerDate.getMinutes())+':'+format2(mkTeilnehmerDate.getSeconds())+' Uhr';
			mkCopyMitWaffenstand += '\nStand (Waffen): '+format2(servertimeDate.getDate())+'.'+format2(servertimeDate.getMonth()+1)+'.'+servertimeDate.getFullYear()+' - '+format2(servertimeDate.getHours())+':'+format2(servertimeDate.getMinutes())+':'+format2(servertimeDate.getSeconds())+' Uhr';
		}
		content.innerHTML += '<b>Magierkampf-Copy:</b> <input id="mkcopycheckbox" type="checkbox">mit Waffenstand<br><textarea id="mkcopy" class="kampfcopy"></textarea><br><br><br>';
		document.getElementById('mkcopy').innerHTML = mkCopyOhneWaffenstand;
		// Event-Listener
		document.getElementById('skcopycheckbox').addEventListener('change', function() {
			if(document.getElementById('skcopycheckbox').checked) {
				document.getElementById('skcopy').innerHTML = skCopyMitWaffenstand;
			} else {
				document.getElementById('skcopy').innerHTML = skCopyOhneWaffenstand;
			}
		}, false);
		document.getElementById('mkcopycheckbox').addEventListener('change', function() {
			if(document.getElementById('mkcopycheckbox').checked) {
				document.getElementById('mkcopy').innerHTML = mkCopyMitWaffenstand;
			} else {
				document.getElementById('mkcopy').innerHTML = mkCopyOhneWaffenstand;
			}
		}, false);
	}



// StammInfo
	if(document.URL.indexOf("/stamminfo.php") != -1 && content.innerHTML.indexOf('Hier werden Stammdaten angezeigt:') != -1) {
		var mitglieder = content.getElementsByTagName('table')[3].getElementsByTagName('tr');
		var gesamtEPs = 0;
		var gesamtOnline = 0;
		for(var i=1; i<mitglieder.length; i++) {
			var user = mitglieder[i].getElementsByTagName('a')[0].innerHTML.replace(/<font color="red">/, '').replace(/<\/font>/, '').trim();
			var ep = parseInt(mitglieder[i].getElementsByTagName('td')[1].innerHTML, 10);
			gesamtEPs += ep;
			mitglieder[i].getElementsByTagName('td')[1].innerHTML = number_format(Math.floor(ep));
			mitglieder[i].getElementsByTagName('td')[1].align = 'right';
			mitglieder[i].getElementsByTagName('td')[2].align = 'center';
			if(mitglieder[i].getElementsByTagName('td')[2].innerHTML.indexOf('online') != -1)
				gesamtOnline++;
		}
		var gesamtMitglieder = mitglieder.length-1;
		mitglieder[0].getElementsByTagName('td')[0].innerHTML = '<b>Name</b> ('+gesamtMitglieder+')';
		mitglieder[0].getElementsByTagName('td')[1].innerHTML = '<b>Erfahrung</b> ('+number_format(gesamtEPs)+')';
		mitglieder[0].getElementsByTagName('td')[2].innerHTML = '<b>Status</b> ('+gesamtOnline+')';
		mitglieder[0].getElementsByTagName('td')[0].align = 'center';
		mitglieder[0].getElementsByTagName('td')[1].align = 'center';
		mitglieder[0].getElementsByTagName('td')[2].align = 'center';
		var gesamtep = document.createElement('tr');
		gesamtep.innerHTML = '<td>Gesamt-EP</td><td>'+number_format(gesamtEPs)+' (\u2300 '+number_format(gesamtEPs/(mitglieder.length-1), 2)+')</td>';
		var mitgliederanzahl = document.createElement('tr');
		mitgliederanzahl.innerHTML = '<td>Mitgliederanzahl</td><td>'+gesamtMitglieder+' ('+gesamtOnline+' online)</td>';
		content.getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].insertBefore(mitgliederanzahl, content.getElementsByTagName('table')[2].getElementsByTagName('tr')[6]);
		content.getElementsByTagName('table')[2].getElementsByTagName('tbody')[0].insertBefore(gesamtep, content.getElementsByTagName('table')[2].getElementsByTagName('tr')[7]);
		content.getElementsByTagName('div')[0].setAttribute('style', 'overflow:auto; width:550px;');
	}



// UserInfo
	if(document.URL.indexOf('/userinfo.php') != -1) {
		if(content.innerHTML.indexOf('Userdaten:') != -1) {
			var user = content.getElementsByTagName('table')[4].getElementsByTagName('td')[3].innerHTML.trim();
			var i=0;
			while(content.getElementsByTagName('table')[4].getElementsByTagName('tr')[i].innerHTML.indexOf("Erfahrung:") == -1) {
				i++;
			}
			var ep = parseInt(content.getElementsByTagName('table')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML, 10);
			var realtage = content.getElementsByTagName('table')[4].getElementsByTagName('tr')[i+1].getElementsByTagName('td')[1].innerHTML.trim();
			realtage = realtage.split(' ');
			realtage = 15*parseInt(realtage[0], 10)+parseInt(realtage[4], 10)-197; // realtage == SZS-Monate, 197 -> Startalter (13M2T)
			if(realtage <= 0) realtage = 1;
			content.getElementsByTagName('table')[4].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML += ' (\u2300 '+number_format(ep/realtage, 2)+')';
			var beschreibung = content.getElementsByTagName('table')[5].getElementsByTagName('td')[0];
			beschreibung.innerHTML = '<div style="overflow:auto;width:550px;">'+beschreibung.innerHTML+'</div>';
		} else if(content.innerHTML.indexOf('Hier kannst du nach einem Steinzeitmenschen suchen.') != -1) {
			if(getURLParameter('s') != null) {
				document.getElementsByName('userdatenname')[0].value = decodeURI(getURLParameter('s'));
			}
			document.getElementsByName('userdatenname')[0].focus();
		}
	}



// Aktive Spieler & Stämme
	var resetZeit = 4;
	if(isSommerzeit(servertimeDate)) {
		resetZeit = 6;
	} else {
		resetZeit = 5;
	}
	if(document.URL.indexOf('/aktivespieler.php') != -1) {
		GM_setValue("Assi_UserName", content.getElementsByTagName('table')[1].getElementsByTagName('font')[0].innerHTML.trim());
		// Beschreibung anpassen
		content.innerHTML = content.innerHTML.replace('4:15 Uhr', resetZeit+':15 Uhr');
	}
	if(document.URL.indexOf('/aktivpunkte.php') != -1) {
		GM_setValue("Assi_StammName", content.getElementsByTagName('table')[1].getElementsByTagName('font')[0].innerHTML.trim());
		content.innerHTML = content.innerHTML.replace('4:15 Uhr', resetZeit+':15 Uhr');
	}



// Stammnachrichten (Profil-Links, IGM-Icons, SK-, MK-Auswertung)
	// Nachricht löschen, wenn abgeschickt
	if(document.URL.indexOf('/stamm.php') && content.innerHTML.indexOf('Die Nachricht wurde hinzugefügt.') != -1) {
		GM_deleteValue("Stammnachricht");
	}
	if(document.URL.indexOf('/stamm.php?do=nachricht') != -1) {
		content.getElementsByTagName('table')[1].setAttribute('id', 'stammnachrichteneingabetable');
		content.getElementsByTagName('textarea')[0].setAttribute('id', 'stammnachrichteneingabe');
		document.getElementById('stammnachrichteneingabetable').getElementsByTagName('td')[2].innerHTML += '<br><br><b>SZS-Assistent:</b> Willst du <font color="yellow">gelb</font> schreiben, beginne deine Nachricht mit <b>*gelb*</b> (mit *).<br>';
		document.getElementById('stammnachrichteneingabe').addEventListener('keyup', function() { GM_setValue("Stammnachricht", document.getElementById('stammnachrichteneingabe').value); }, false);
		// Letzte nicht abgeschickte StammNachricht wiederherstellen
		if(GM_getValue("Stammnachricht", "") != "") {
			var newDIV = document.createElement('div');
			newDIV.setAttribute('class', 'postrecovery');
			newDIV.innerHTML = 'Letzte nicht abgeschickte StammNachricht wiederhergestellt.';
			content.insertBefore(newDIV, content.getElementsByTagName('form')[0]);
			document.getElementById("stammnachrichteneingabe").value = GM_getValue("Stammnachricht", "");
		}
		var stammnachrichten = content.getElementsByTagName('table')[2].getElementsByTagName('tr');
		for(var i=1; i<stammnachrichten.length; i++) {
			var postDate = stammnachrichten[i].getElementsByTagName('td')[0].innerHTML.split('<br>')[1].trim();
			postDate = new Date(postDate.slice(6,10), parseInt(postDate.slice(3,5), 10)-1, parseInt(postDate.slice(0,2), 10), parseInt(postDate.slice(13,15), 10), parseInt(postDate.slice(16,18), 10), 0);
			var userID = stammnachrichten[i].getElementsByTagName('a')[0].getAttribute('href').slice(17);
			if(userID != 0) {
				// Profil-Link, PN-Icon
				stammnachrichten[i].getElementsByTagName('a')[0].setAttribute('href', 'userinfo.php?userinfo='+userID);
				var newA = document.createElement('a');
				newA.setAttribute('href', 'message.php?empf='+userID);
				newA.setAttribute('style', 'margin-left: 5px;');
				newA.setAttribute('title', 'Private Nachricht');
				var newSPAN = document.createElement('span');
				newSPAN.setAttribute('class', 'pn-icon');
				newA.appendChild(newSPAN);
				stammnachrichten[i].getElementsByTagName('td')[0].insertBefore(newA, stammnachrichten[i].getElementsByTagName('br')[0]);
				// Links verlinken
				stammnachrichten[i].getElementsByTagName('td')[1].innerHTML = stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?)/g, '<a class="menu" target="_blank" href="$1">$1</a>');
				// gelb Schreiben
				if(stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.indexOf('*gelb*') == 0) {
					stammnachrichten[i].getElementsByTagName('td')[1].innerHTML = '<div style="width:430px; overflow:auto; color:yellow;">'+stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.slice(6)+'</div>';
				} else {
					stammnachrichten[i].getElementsByTagName('td')[1].innerHTML = '<div style="width:430px; overflow:auto;">'+stammnachrichten[i].getElementsByTagName('td')[1].innerHTML+'</div>';
				}
			} else {
				// Stammkampfauswertung
				if(stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.indexOf('Der Kampf wurde') != -1) {
					var input = document.createElement('input');
					stammnachrichten[i].getElementsByTagName('td')[0].appendChild(input);
					input.setAttribute('id', 'skauswertung_'+i);
					input.setAttribute('type', 'button');
					input.setAttribute('class', 'button');
					input.setAttribute('value', 'Auswerten');
					input.setAttribute('snnum', i);
					if(!counterGesamtEP) var counterGesamtEP = new Array();
					if(!gesamtEP) var gesamtEP = new Array();
					if(!stammname) var stammname = new Array();
					input.addEventListener('click', function() {
						var snnum = this.getAttribute('snnum');
						gesamtEP[snnum+'a'] = 0;
						gesamtEP[snnum+'v'] = 0;
						stammname[snnum+'a'] = new Array();
						stammname[snnum+'v'] = new Array();
						var plotContent = stammnachrichten[snnum].getElementsByTagName('td')[1].getElementsByTagName('font');
						// Angreifer
						var angreifer = stammnachrichten[snnum].getElementsByTagName('td')[1].innerHTML.replace(/.*Für den angreifenden Stamm sind angetreten:\s*/, '').replace(/\s*<br>.*/, '');
						angreifer = angreifer.split(' ');
						for(var j=0; j<angreifer.length; j++) {
							if(angreifer[j] == '') {
								angreifer.splice(j, 1);
								j--;
							} else if(angreifer[j] == '<font') {
								angreifer.splice(j, 1);
								angreifer[j] = angreifer[j].replace('color="red">', '<font color="red">');
							}
							addDataForSKresult(angreifer[j].replace(/<font color="red"><b>/, '').replace(/<\/b><\/font>/, '').trim(), snnum+'a');
						}
						counterGesamtEP[snnum+'a'] = angreifer.length;
						// Verteidiger
						var verteidiger = stammnachrichten[snnum].getElementsByTagName('td')[1].innerHTML.replace(/.*Für den angegriffenen Stamm sind angetreten:\s*/, '').replace(/\s*\.<br>.*/, '');
						verteidiger = verteidiger.split(' ');
						for(var j=0; j<verteidiger.length; j++) {
							if(verteidiger[j] == '') {
								verteidiger.splice(j, 1);
								j--;
							} else if(verteidiger[j] == '<font') {
								verteidiger.splice(j, 1);
								verteidiger[j] = verteidiger[j].replace('color="red">', '<font color="red">');
							}
							addDataForSKresult(verteidiger[j].replace(/<font color="red"><b>/, '').replace(/<\/b><\/font>/, '').trim(), snnum+'v');
						}
						counterGesamtEP[snnum+'v'] = verteidiger.length;
						// Inhalt ausgeben
						var newContent = plotContent[0].outerHTML+'<br>';
						newContent += '<br><b>Für den angreifenden Stamm (<span id="stamm_'+snnum+'a"><font color="yellow">...</font></span>) sind angetreten ('+angreifer.length+'):</b><br>';
						for(var j=0; j<angreifer.length; j++) {
							newContent += angreifer[j]+' ';
						}
						newContent += '<br><br><b>Für den angegriffenen Stamm (<span id="stamm_'+snnum+'v"><font color="yellow">...</font></span>) sind angetreten ('+verteidiger.length+'):</b><br>';
						for(var j=0; j<verteidiger.length; j++) {
							newContent += verteidiger[j]+' ';
						}
						newContent += '<br><br><b>Angreifer-EP:</b> <span id="ep_'+snnum+'a"><font color="yellow">Daten werden geladen...</font></span>';
						newContent += '<br><b>Verteidiger-EP:</b> <span id="ep_'+snnum+'v"><font color="yellow">Daten werden geladen...</font></span>';
						newContent += '<br><br>'+plotContent[plotContent.length-1].outerHTML;
						stammnachrichten[snnum].getElementsByTagName('td')[1].innerHTML = newContent;
						this.parentNode.removeChild(this);
					}, false);
				// MK: Startnachricht
				} else if(stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.indexOf('Magierkampf') != -1) {
					var startnachricht = stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.split('<br>');
					var teilnehmeranzahl = 0;
					var newContent = '';
					var strMagierkampfTeilnehmer = postDate.getTime().toString()+"#";
					for(var j=0; j<startnachricht.length-1; j++) {
						if(startnachricht[j].indexOf('macht sich auf den Weg zum Magierkampf.') != -1) {
							teilnehmeranzahl++;
							newContent += startnachricht[j]+'<br>';
							var nick = startnachricht[j].replace(/<font color="red"><b>/, '').replace(/<\/b><\/font>/, '').trim();
							nick = nick.substring(0, nick.length-40);
							strMagierkampfTeilnehmer += nick+'#';
						} else {
							newContent += '<font color="red">'+startnachricht[j]+'</font><br>';
						}
					}
					if(parseInt(GM_getValue("MagierkampfTeilnehmer", "").split('#')[0], 10) <= postDate.getTime()) {
						GM_setValue("MagierkampfTeilnehmer", strMagierkampfTeilnehmer);
					}
					stammnachrichten[i].getElementsByTagName('td')[0].innerHTML += '<br><br><br><b>Teilnehmer:</b> '+teilnehmeranzahl+'<br>';
					if(document.getElementById('mkTeilnehmeranzahl')) document.getElementById('mkTeilnehmeranzahl').innerHTML = '('+teilnehmeranzahl+' Teilnehmer)';
					stammnachrichten[i].getElementsByTagName('td')[1].innerHTML = newContent;
				// MK: Ergebnisnachricht | MK-Auswertung
				} else if(stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.indexOf('50 Holz, 50 Stein, 20 Bronze.') != -1) {
					var mkEreignisse = stammnachrichten[i].getElementsByTagName('td')[1].innerHTML.split("<br>");
					mkEreignisse.pop();
					var killer_stamm = new Array(); // USERNAME
					var killer_gegner = new Array(); // USERNAME (STAMMNAME)
					var gekillteStaemme_stamm = new Array(); // STAMMNAME
					var killendeStaemme_gegner = new Array(); // STAMMNAME
					var angreifer_stamm = new Array(); // USERNAME
					var angreifer_gegner = new Array(); // USERNAME (STAMMNAME)
					var angegriffeneUser_stamm = new Array(); // USERNAME
					var angegriffeneUser_gegner = new Array(); // USERNAME (STAMMNAME)
					var angegriffeneStaemme_stamm = new Array(); // STAMMNAME
					var angreifendeStaemme_gegner = new Array(); // STAMMNAME
					var kills_stamm = 0;
					var kills_gegner = 0;
					var angriffe_stamm = 0;
					var angriffe_gegner = 0;
					var newContent = '';
					for(var j=0; j<mkEreignisse.length; j++) {
						if(mkEreignisse[j].indexOf('wurde dabei verletzt.') == -1) {
							// aktuelles mkEreignis ist Attacke
							mkEreignisse[j] = mkEreignisse[j].replace(/^<\/font>/, '');
							mkEreignisse[j].search(/(.*) \((.*), \d{1,3}%\) trifft auf (.*) \(((.*), )?\d{1,3}%\) und fügt (ihm )?\d{1,3} (S|s)chaden zu./);
							var user1 = RegExp.$1; // Angreifer
							var stamm1 = RegExp.$2;
							var user2 = RegExp.$3; // Verteidiger
							var stamm2 = RegExp.$5;
							if(user2 == 'Magier') stamm2 = '<font color="orange"><b>Magier</b></font>';
							if(stamm1 == GM_getValue("Assi_StammName", "")) {
								// Angriff des eigenen Stammes
								angriffe_stamm++;
								if(angreifer_stamm.indexOf(user1) == -1) {
									angreifer_stamm.push(user1);
									angreifer_stamm[user1] = 1;
								} else {
									angreifer_stamm[user1]++;
								}
								if(angegriffeneUser_gegner.indexOf(user2+' ('+stamm2+')') == -1) {
									angegriffeneUser_gegner.push(user2+' ('+stamm2+')');
									angegriffeneUser_gegner[user2+' ('+stamm2+')'] = 1;
								} else {
									angegriffeneUser_gegner[user2+' ('+stamm2+')']++;
								}
								if(angegriffeneStaemme_stamm.indexOf(stamm2) == -1) {
									angegriffeneStaemme_stamm.push(stamm2);
									angegriffeneStaemme_stamm[stamm2] = 1;
								} else {
									angegriffeneStaemme_stamm[stamm2]++;
								}
							} else {
								// Angriff eines gegnerischen Stammes
								angriffe_gegner++;
								if(angreifer_gegner.indexOf(user1+' ('+stamm1+')') == -1) {
									angreifer_gegner.push(user1+' ('+stamm1+')');
									angreifer_gegner[user1+' ('+stamm1+')'] = 1;
								} else {
									angreifer_gegner[user1+' ('+stamm1+')']++;
								}
								if(angegriffeneUser_stamm.indexOf(user2) == -1) {
									angegriffeneUser_stamm.push(user2);
									angegriffeneUser_stamm[user2] = 1;
								} else {
									angegriffeneUser_stamm[user2]++;
								}
								if(angreifendeStaemme_gegner.indexOf(stamm1) == -1) {
									angreifendeStaemme_gegner.push(stamm1);
									angreifendeStaemme_gegner[stamm1] = 1;
								} else {
									angreifendeStaemme_gegner[stamm1]++;
								}
							}
							if(j+1 < mkEreignisse.length && mkEreignisse[j+1].indexOf('wurde dabei verletzt.') != -1) {
								// aktuelles mkEreignis ist auch Kill
								if(stamm1 == GM_getValue("Assi_StammName", "")) {
									// Kill des eigenen Stammes
									if(user2 == 'Magier') {
										mkEreignisse[j+1] = mkEreignisse[j+1].replace(/^<font color="red">/, '<font color="orange">');
									} else {
										mkEreignisse[j+1] = mkEreignisse[j+1].replace(/^<font color="red">/, '<font color="lime">');
										mkEreignisse[j+1] += '</font>';
									}
									kills_stamm++;
									if(killer_stamm.indexOf(user1) == -1) {
										killer_stamm.push(user1);
										killer_stamm[user1] = 1;
									} else {
										killer_stamm[user1]++;
									}
									if(gekillteStaemme_stamm.indexOf(stamm2) == -1) {
										gekillteStaemme_stamm.push(stamm2);
										gekillteStaemme_stamm[stamm2] = 1;
									} else {
										gekillteStaemme_stamm[stamm2]++;
									}
								} else {
									// Kill eines gegnerischen Stammes
									mkEreignisse[j+1] += '</font>';
									kills_gegner++;
									if(killer_gegner.indexOf(user1+' ('+stamm1+')') == -1) {
										killer_gegner.push(user1+' ('+stamm1+')');
										killer_gegner[user1+' ('+stamm1+')'] = 1;
									} else {
										killer_gegner[user1+' ('+stamm1+')']++;
									}
									if(killendeStaemme_gegner.indexOf(stamm1) == -1) {
										killendeStaemme_gegner.push(stamm1);
										killendeStaemme_gegner[stamm1] = 1;
									} else {
										killendeStaemme_gegner[stamm1]++;
									}
								}
							}
						}
					}
					// Sortiere Arrays
					for(var k=0; k<killer_stamm.length; k++) {
						for(var l=k+1; l<killer_stamm.length; l++) {
							if(killer_stamm[killer_stamm[k]] < killer_stamm[killer_stamm[l]]) {
								var z = killer_stamm[k];
								killer_stamm[k] = killer_stamm[l];
								killer_stamm[l] = z;
							}
						}
					}
					for(var k=0; k<killer_gegner.length; k++) {
						for(var l=k+1; l<killer_gegner.length; l++) {
							if(killer_gegner[killer_gegner[k]] < killer_gegner[killer_gegner[l]]) {
								var z = killer_gegner[k];
								killer_gegner[k] = killer_gegner[l];
								killer_gegner[l] = z;
							}
						}
					}
					for(var k=0; k<gekillteStaemme_stamm.length; k++) {
						for(var l=k+1; l<gekillteStaemme_stamm.length; l++) {
							if(gekillteStaemme_stamm[gekillteStaemme_stamm[k]] < gekillteStaemme_stamm[gekillteStaemme_stamm[l]]) {
								var z = gekillteStaemme_stamm[k];
								gekillteStaemme_stamm[k] = gekillteStaemme_stamm[l];
								gekillteStaemme_stamm[l] = z;
							}
						}
					}
					for(var k=0; k<killendeStaemme_gegner.length; k++) {
						for(var l=k+1; l<killendeStaemme_gegner.length; l++) {
							if(killendeStaemme_gegner[killendeStaemme_gegner[k]] < killendeStaemme_gegner[killendeStaemme_gegner[l]]) {
								var z = killendeStaemme_gegner[k];
								killendeStaemme_gegner[k] = killendeStaemme_gegner[l];
								killendeStaemme_gegner[l] = z;
							}
						}
					}
					for(var k=0; k<angreifer_stamm.length; k++) {
						for(var l=k+1; l<angreifer_stamm.length; l++) {
							if(angreifer_stamm[angreifer_stamm[k]] < angreifer_stamm[angreifer_stamm[l]]) {
								var z = angreifer_stamm[k];
								angreifer_stamm[k] = angreifer_stamm[l];
								angreifer_stamm[l] = z;
							}
						}
					}
					for(var k=0; k<angreifer_gegner.length; k++) {
						for(var l=k+1; l<angreifer_gegner.length; l++) {
							if(angreifer_gegner[angreifer_gegner[k]] < angreifer_gegner[angreifer_gegner[l]]) {
								var z = angreifer_gegner[k];
								angreifer_gegner[k] = angreifer_gegner[l];
								angreifer_gegner[l] = z;
							}
						}
					}
					for(var k=0; k<angegriffeneUser_stamm.length; k++) {
						for(var l=k+1; l<angegriffeneUser_stamm.length; l++) {
							if(angegriffeneUser_stamm[angegriffeneUser_stamm[k]] < angegriffeneUser_stamm[angegriffeneUser_stamm[l]]) {
								var z = angegriffeneUser_stamm[k];
								angegriffeneUser_stamm[k] = angegriffeneUser_stamm[l];
								angegriffeneUser_stamm[l] = z;
							}
						}
					}
					for(var k=0; k<angegriffeneUser_gegner.length; k++) {
						for(var l=k+1; l<angegriffeneUser_gegner.length; l++) {
							if(angegriffeneUser_gegner[angegriffeneUser_gegner[k]] < angegriffeneUser_gegner[angegriffeneUser_gegner[l]]) {
								var z = angegriffeneUser_gegner[k];
								angegriffeneUser_gegner[k] = angegriffeneUser_gegner[l];
								angegriffeneUser_gegner[l] = z;
							}
						}
					}
					for(var k=0; k<angegriffeneStaemme_stamm.length; k++) {
						for(var l=k+1; l<angegriffeneStaemme_stamm.length; l++) {
							if(angegriffeneStaemme_stamm[angegriffeneStaemme_stamm[k]] < angegriffeneStaemme_stamm[angegriffeneStaemme_stamm[l]]) {
								var z = angegriffeneStaemme_stamm[k];
								angegriffeneStaemme_stamm[k] = angegriffeneStaemme_stamm[l];
								angegriffeneStaemme_stamm[l] = z;
							}
						}
					}
					for(var k=0; k<angreifendeStaemme_gegner.length; k++) {
						for(var l=k+1; l<angreifendeStaemme_gegner.length; l++) {
							if(angreifendeStaemme_gegner[angreifendeStaemme_gegner[k]] < angreifendeStaemme_gegner[angreifendeStaemme_gegner[l]]) {
								var z = angreifendeStaemme_gegner[k];
								angreifendeStaemme_gegner[k] = angreifendeStaemme_gegner[l];
								angreifendeStaemme_gegner[l] = z;
							}
						}
					}
					// Inhalt + Auswertung ausgeben
					var newContent = '<b><u>MK-Ereignisse</u></b> <a class="configItemToggle" href="javascript:showElement(\'mkEreignisse\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'mkEreignisse\')">[-]</a><br><br><div id="mkEreignisse" style="height:350px; overflow:auto;">'+mkEreignisse.join('<br>')+'</div>';
					newContent += '<br><br><br><b><u>MK-Auswertung</u></b> <span id="mkTeilnehmeranzahl"></span> <a class="configItemToggle" href="javascript:showElement(\'mkAuswertung\')">[+]</a> <a class="configItemToggle" href="javascript:hideElement(\'mkAuswertung\')">[-]</a><br><br><div id="mkAuswertung" style="height:400px; overflow:auto;">';
					newContent += '<b>Killer (Stamm):</b> '+kills_stamm+' Kills<br>';
					for(var k=0; k<killer_stamm.length; k++) {
						newContent += killer_stamm[killer_stamm[k]]+'x '+killer_stamm[k]+'<br>';
					}
					newContent += '<br><br><b>Killer (Gegner):</b> '+kills_gegner+' Kills<br>';
					for(var k=0; k<killer_gegner.length; k++) {
						newContent += killer_gegner[killer_gegner[k]]+'x '+killer_gegner[k]+'<br>';
					}
					newContent += '<br><br><b>Gekillte Stämme (Stamm):</b><br>';
					for(var k=0; k<gekillteStaemme_stamm.length; k++) {
						newContent += gekillteStaemme_stamm[gekillteStaemme_stamm[k]]+'x '+gekillteStaemme_stamm[k]+'<br>';
					}
					newContent += '<br><br><b>Killende Stämme (Gegner):</b><br>';
					for(var k=0; k<killendeStaemme_gegner.length; k++) {
						newContent += killendeStaemme_gegner[killendeStaemme_gegner[k]]+'x '+killendeStaemme_gegner[k]+'<br>';
					}
					newContent += '<br><br><b>Angreifer (Stamm):</b> '+angriffe_stamm+' Angriffe<br>';
					for(var k=0; k<angreifer_stamm.length; k++) {
						newContent += angreifer_stamm[angreifer_stamm[k]]+'x '+angreifer_stamm[k]+'<br>';
					}
					newContent += '<br><br><b>Angreifer (Gegner):</b> '+angriffe_gegner+' Angriffe<br>';
					for(var k=0; k<angreifer_gegner.length; k++) {
						newContent += angreifer_gegner[angreifer_gegner[k]]+'x '+angreifer_gegner[k]+'<br>';
					}
					newContent += '<br><br><b>Angegriffene User (Stamm):</b><br>';
					for(var k=0; k<angegriffeneUser_stamm.length; k++) {
						newContent += angegriffeneUser_stamm[angegriffeneUser_stamm[k]]+'x '+angegriffeneUser_stamm[k]+'<br>';
					}
					newContent += '<br><br><b>Angegriffene User (Gegner):</b><br>';
					for(var k=0; k<angegriffeneUser_gegner.length; k++) {
						newContent += angegriffeneUser_gegner[angegriffeneUser_gegner[k]]+'x '+angegriffeneUser_gegner[k]+'<br>';
					}
					newContent += '<br><br><b>Angegriffene Stämme (Stamm):</b><br>';
					for(var k=0; k<angegriffeneStaemme_stamm.length; k++) {
						newContent += angegriffeneStaemme_stamm[angegriffeneStaemme_stamm[k]]+'x '+angegriffeneStaemme_stamm[k]+'<br>';
					}
					newContent += '<br><br><b>Angreifende Stämme (Gegner):</b><br>';
					for(var k=0; k<angreifendeStaemme_gegner.length; k++) {
						newContent += angreifendeStaemme_gegner[angreifendeStaemme_gegner[k]]+'x '+angreifendeStaemme_gegner[k]+'<br>';
					}
					newContent += '<br><br><b>Einnahmen</b><br>- Holz: '+(50*kills_stamm)+'<br>- Stein: '+(50*kills_stamm)+'<br>- Bronze: '+(20*kills_stamm)+'<br></div>';
					stammnachrichten[i].getElementsByTagName("td")[1].innerHTML = newContent;
				}
			}
		}
	}



// StammForum - Forum
	if(document.URL.indexOf('/stammforum.forum.php') != -1) {
		var threads = content.getElementsByTagName('table')[3].getElementsByTagName('tr');
		var data_topics = GM_getValue("topics");
		data_topics = data_topics? data_topics:'';
		for(var i=1; i<threads.length; i++) {
			var numPages = Math.ceil((parseInt(threads[i].getElementsByTagName('td')[3].innerHTML, 10)+1)/25);
			var topicid = threads[i].getElementsByTagName('a')[0].getAttribute('href').slice(29);
			if(data_topics.indexOf('#'+topicid+'.') == -1) {
				threads[i].getElementsByTagName('td')[0].innerHTML = '<div class="blueDot"></div>';
			} else {
				var lastposttime = threads[i].getElementsByTagName('td')[4].innerHTML.trim();
				lastposttime = new Date(lastposttime.slice(3,5)+' '+lastposttime.slice(0,2)+', '+lastposttime.slice(6,10)+' '+lastposttime.slice(14,19)+':00');
				var datatime = data_topics.slice(data_topics.indexOf('#'+topicid+'.')+1);
				datatime = parseInt(datatime.slice(datatime.indexOf('.')+1, datatime.indexOf('#')), 10);
				if(lastposttime.getTime()>datatime) {
					threads[i].getElementsByTagName('td')[0].innerHTML = '<div class="redDot"></div>';
				} else {
					threads[i].getElementsByTagName('td')[0].innerHTML = '<div class="greenDot"></div>';
				}
			}
			// Hinzufügen von Seitenzahlen
			if(numPages > 1) {
				threads[i].getElementsByTagName('td')[1].innerHTML += ' (';
				for(var j=1; j<=numPages; j++) {
					threads[i].getElementsByTagName('td')[1].innerHTML += '<a href="stammforum.topic.php?topicid='+topicid+'&seite='+j+'">'+j+'</a>';
					if(j != numPages) threads[i].getElementsByTagName('td')[1].innerHTML += ' ';
				}
				threads[i].getElementsByTagName('td')[1].innerHTML += ')';
			}
		}
		//Legende
		var legend = document.createElement('div');
		legend.setAttribute('id', 'forum-legend');
		legend.innerHTML = '<div class="blueDot"></div> = neues Thema<br>';
		legend.innerHTML += '<div class="redDot"></div> = neue Beiträge im Thema<br>';
		legend.innerHTML += '<div class="greenDot"></div> = Thema gelesen<br>';
		content.insertBefore(legend, content.getElementsByTagName('table')[5]);
		// Forendaten löschen-Button
		var input = document.createElement('input');
		content.insertBefore(input, document.getElementById('forum-legend').nextSibling);
		input.setAttribute('id', 'forumDataDel');
		input.setAttribute('type', 'button');
		input.setAttribute('class', 'button');
		input.setAttribute('value', 'Forendaten zurücksetzen');
		input.addEventListener('click', function() {
			var really = confirm('Es werden alle Daten zu gelesenen Beiträgen und Themen gelöscht!');
			if(really) {
				GM_deleteValue('topics');
				GM_deleteValue('posts');
			}
		}, false);
	}


// StammForum - Topic
	if(document.URL.indexOf('/stammforum.topic.php?topicid=') != -1 && getURLParameter('topicid') != '') {
		var data_posts = GM_getValue("posts", "#");
		var posts = content.getElementsByTagName('table')[3].getElementsByTagName('tr');
		for(var i=1; i<posts.length; i+=3) {
			var postid = posts[i+1].getElementsByTagName('a')[0].getAttribute('href').slice(22)+'.';
			var postDate = posts[i+1].getElementsByTagName('i')[0].innerHTML.slice(posts[i+1].getElementsByTagName('i')[0].innerHTML.indexOf('|')+1).trim();
			postid += (new Date(postDate.slice(3,5)+' '+postDate.slice(0,2)+', '+postDate.slice(6,10)+' '+postDate.slice(14,19)+':00')).getTime()+'.';
			postid += hashCode(posts[i+2].innerHTML);
			if(posts[i+1].getElementsByTagName('a')[1]) {
				var postid_old = posts[i+1].getElementsByTagName('a')[1].getAttribute('href').slice(29);
			} else {
				var postid_old = '0';
			}
			var hasread = true;
			var newTD = document.createElement('td');
			if(data_posts.indexOf('#'+postid+'#') == -1 && data_posts.indexOf('#'+postid_old+'#') == -1) {
				hasread = false;
				newTD.innerHTML = '<div class="redDot"></div>';
				posts[i+0].getElementsByTagName('td')[0].setAttribute('bgcolor', '#3468a8');
				data_posts += postid+'#';
			} else {
				newTD.innerHTML = '<div class="greenDot"></div>';
				// Speichere neue postid, falls nur alte bisher vorhanden
				if(data_posts.indexOf('#'+postid+'#') == -1 && data_posts.indexOf('#'+postid_old+'#') != -1) {
					data_posts += postid+'#';
				}
			}
			var lastposttime = posts[i+1].getElementsByTagName('i')[0].innerHTML.slice(posts[i+1].getElementsByTagName('i')[0].innerHTML.indexOf('|')+1).trim();
			lastposttime = new Date(lastposttime.slice(3,5)+' '+lastposttime.slice(0,2)+', '+lastposttime.slice(6,10)+' '+lastposttime.slice(14,19)+':00');
			posts[i+1].insertBefore(newTD, posts[i+1].getElementsByTagName('td')[0]);
			posts[i].getElementsByTagName('td')[4].innerHTML = posts[i].getElementsByTagName('td')[4].innerHTML.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?)/g, '<a class="menu" target="_blank" href="$1">$1</a>');
			var nick = posts[i+1].getElementsByTagName('a')[0].innerHTML.trim();
			var userid = posts[i+1].getElementsByTagName('a')[0].getAttribute('href').replace(/\D*/, '');
			var privatePostLink = '<a title="Private Nachricht" href="message.php?empf='+userid+'"><span class="pn-icon-s"></span></a>';
			posts[i+1].getElementsByTagName('i')[0].innerHTML = posts[i+1].getElementsByTagName('i')[0].innerHTML.replace('</a>', '</a>&nbsp;&nbsp;'+privatePostLink);
		}
		GM_setValue("posts", data_posts); // #postid#
		var data_topics = GM_getValue('topics');
		data_topics = data_topics? data_topics:'#';
		var topicid = getURLParameter('topicid');
		var isLastPage = content.getElementsByTagName('table')[1].getElementsByTagName('td')[1].innerHTML.trim().match(/<\/b>$/)? true : false;
		if(data_topics.indexOf('#'+topicid+'.') == -1) {
			if(isLastPage) {
				data_topics += topicid+'.'+servertimeDate.getTime()+'#';
			} else {
				data_topics += topicid+'.'+lastposttime.getTime()+'#';
			}
		} else {
			var datatime = data_topics.slice(data_topics.indexOf('#'+topicid+'.')+1);
			datatime = parseInt(datatime.slice(datatime.indexOf('.')+1, datatime.indexOf('#')), 10);
			if(lastposttime.getTime()>datatime && !isLastPage) {
				data_topics = data_topics.replace(new RegExp('\#'+topicid+'\.([0-9]+)\#'), '#'+topicid+'.'+lastposttime.getTime()+'#');
			} else if(isLastPage) {
				data_topics = data_topics.replace(new RegExp('\#'+topicid+'\.([0-9]+)\#'), '#'+topicid+'.'+servertimeDate.getTime()+'#');
			}
		}
		GM_setValue("topics", data_topics);
	}



// StammForum - Thread wiederherstellen
	if(document.URL.indexOf('/stammforum.post.php') != -1 && document.URL.indexOf('topicid=') == -1) {
		// Thread löschen, wenn abgeschickt
		if(content.innerHTML.indexOf('Dein Thema wurde hinzugefügt') != -1) {
			GM_deleteValue("Thread_Topic");
			GM_deleteValue("Thread_Content");
		} else {
			content.getElementsByTagName('input')[0].setAttribute('id', 'topiceingabe');
			content.getElementsByTagName('textarea')[0].setAttribute('id', 'contenteingabe');
			document.getElementById('topiceingabe').addEventListener('keyup', function() { GM_setValue("Thread_Topic", document.getElementById('topiceingabe').value); }, false);
			document.getElementById('contenteingabe').addEventListener('keyup', function() { GM_setValue("Thread_Content", document.getElementById('contenteingabe').value); }, false);
			// Letztes nicht abgeschicktes Thema wiederherstellen
			if(GM_getValue("Thread_Topic", "") != "" || GM_getValue("Thread_Content", "") != "") {
				var newDIV = document.createElement('div');
				newDIV.setAttribute('class', 'postrecovery');
				newDIV.innerHTML = 'Letztes nicht abgeschicktes Thema wiederhergestellt.';
				content.insertBefore(newDIV, content.getElementsByTagName('form')[0]);
				document.getElementById("topiceingabe").value = GM_getValue("Thread_Topic", "");
				document.getElementById("contenteingabe").value = GM_getValue("Thread_Content", "");
			}
		}
	}



// StammForum - Post wiederherstellen
	if(document.URL.indexOf('/stammforum.post.php?topicid=') != -1 && content.innerHTML.indexOf('Ein paar Worte solltest du wenigstens schreiben.') == -1) {
		var topicid = getURLParameter('topicid');
		// Post löschen, wenn abgeschickt
		if(content.innerHTML.indexOf('Dein Post wurde hinzugefügt') != -1) {
			GM_deleteValue("Post_"+topicid);
		} else {
			content.getElementsByTagName('textarea')[0].setAttribute('id', 'posteingabe');
			document.getElementById('posteingabe').addEventListener('keyup', function() { GM_setValue("Post_"+topicid, document.getElementById('posteingabe').value); }, false);
			// Letzten nicht abgeschickten Post wiederherstellen
			if(GM_getValue("Post_"+topicid, "") != "") {
				var newDIV = document.createElement('div');
				newDIV.setAttribute('class', 'postrecovery');
				newDIV.innerHTML = 'Letzten nicht abgeschickten Post wiederhergestellt.';
				content.insertBefore(newDIV, content.getElementsByTagName('form')[0]);
				document.getElementById("posteingabe").value = GM_getValue("Post_"+topicid, "");
			}
		}
	}



// UserTop
	if(document.URL.indexOf('/top.php') != -1) {
		var spieler = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
		for(var i=1; i<spieler.length; i++) {
			var user = spieler[i].getElementsByTagName('a')[0].innerHTML.replace(/<font color="red">/, '').replace(/<\/font>/, '').trim();
			var ep = spieler[i].getElementsByTagName('td')[3].innerHTML.trim();
			spieler[i].getElementsByTagName('td')[3].innerHTML = number_format(ep);
		}
	}



// StammTop
	if(document.URL.indexOf('/stammtop.php') != -1) {
		var clans = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
		clans[0].innerHTML = '<td><b>Pos.</b></td><td align="center"><b>Stammname<b></td><td align="center"><b>Gründer</b></td><td align="center"><b>Gesamt-EP</b></td><td align="center"><b>Siege</b></td><td align="center"><b>Niederl.</b></td><td align="center"><b>Diff.</b></td>';
		for(var i=1; i<clans.length; i++) {
			clans[i].getElementsByTagName('td')[3].setAttribute('align', 'right');
			clans[i].getElementsByTagName('td')[4].setAttribute('align', 'right');
			clans[i].getElementsByTagName('td')[5].setAttribute('align', 'right');
			clans[i].getElementsByTagName('a')[0].getAttribute('href').search(/stammid=(\d*)/);
			var clanid = RegExp.$1;
			var newTD = document.createElement('td');
			newTD.setAttribute('align', 'right');
			newTD.innerHTML = '<span id="ep_'+i+'"></span>';
			clans[i].insertBefore(newTD, clans[i].getElementsByTagName('td')[3]);
			getClanEPByClanId(clanid, 'ep_'+i);
		}
	}



// OnlineUser
	if(document.URL.indexOf('/useronline.php') != -1) {
		content.getElementsByTagName('table')[1].removeAttribute('width');
		var spieler = content.getElementsByTagName('table')[1].getElementsByTagName('tr');
		for(var i=1; i<spieler.length; i++) {
			var user = spieler[i].getElementsByTagName('a')[0].innerHTML.trim();
			var ep = spieler[i].getElementsByTagName('td')[1].innerHTML.trim();
			spieler[i].getElementsByTagName('td')[1].innerHTML = number_format(ep);
			spieler[i].getElementsByTagName('td')[1].setAttribute('align', 'right');
		}
	}



// aktuelle Aktion
	var aktionHTML = aktuelleAktion.innerHTML;
	var remainActivityMin = 0;
	remindActivity = true;
	GM_setValue("RemindActivity", true);
	if(aktionHTML.indexOf('Minuten') == -1 && aktionHTML.indexOf('Sekunden') == -1) {
		remindActivity = false;
		GM_setValue("RemindActivity", false);
	} else if(aktionHTML.indexOf('Minuten') != -1) {
		aktionHTML.search(/Du bist noch (ca\.\s)*(\d+) Minuten/);
		remainActivityMin = parseInt(RegExp.$2, 10);
	}
	if(remindActivity) {
		document.getElementById('aktuelleAktion').innerHTML = 'Du bist noch <span id="countdown"></span>. [<a href="status.php?do=abbrechen"><font color="red">Abbrechen</font></a>]';
	}
	var activityEndDate = new Date(servertimeDate);
	activityEndDate.setMinutes(servertimeDate.getMinutes()+remainActivityMin+1);
	activityEndDate.setSeconds(0);
	activityEndDate.setMilliseconds(0);
	if(aktionHTML.indexOf('verletzt') != -1) {
		GM_setValue("Arbeit", "verletzt");
	} else if(aktionHTML.indexOf('Kampf') != -1 && GM_getValue("Arbeit", "").indexOf('kampf') == -1) {
		var skEndTime = Math.floor(GM_getValue("NextSK", "0").split(',')[0])+3660000; // SK-Länge: 61 min
		var differenz = Math.abs(activityEndDate.getTime()-skEndTime);
		if(differenz < 65000) {
			GM_setValue("Ankunftszeit", skEndTime.toString());
			GM_setValue("Arbeit", "im Stammkampf");
		} else {
			if(activityEndDate.getDay() == 1 && activityEndDate.getHours() == mkEnde && (activityEndDate.getMinutes() == 0 || activityEndDate.getMinutes() == 1)) {
				activityEndDate.setMinutes(1);
				GM_setValue("Ankunftszeit", activityEndDate.getTime().toString());
				GM_setValue("Arbeit", "im Magierkampf");
			} else if(activityEndDate.getHours() == tkEnde && (activityEndDate.getMinutes() == 0 || activityEndDate.getMinutes() == 1)) {
				activityEndDate.setMinutes(1);
				GM_setValue("Ankunftszeit", activityEndDate.getTime().toString());
				GM_setValue("Arbeit", "im Talkampf");
			}
		}
	}



// Opferzeit ermitteln
	var waffenopferKleinDate;
	var waffenopferGrossDate;
	var arbeitsopferDate;
	var ringopferDate;
	if(menuRight.innerHTML.indexOf('opfer') != -1) {
		if(menuRight.innerHTML.indexOf('kl. Waffenopfer:') != -1) {
			menuRight.innerHTML.search(/kl\. Waffenopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
			waffenopferKleinDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
		}
		if(menuRight.innerHTML.indexOf('gr. Waffenopfer:') != -1) {
			menuRight.innerHTML.search(/gr\. Waffenopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
			waffenopferGrossDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
		}
		if(menuRight.innerHTML.indexOf('Arbeitsopfer:') != -1) {
			menuRight.innerHTML.search(/Arbeitsopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
			arbeitsopferDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
		}
		if(menuRight.innerHTML.indexOf('Ringopfer:') != -1) {
			menuRight.innerHTML.search(/Ringopfer:<\/td><\/tr><tr><td align="right"><span title="noch bis zum (\d+)\.(\d+)\.(\d+) um (\d+):(\d+):(\d+)">/);
			ringopferDate = new Date(RegExp.$3, parseInt(RegExp.$2, 10)-1, parseInt(RegExp.$1, 10), parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10));
		}
}



// Arbeit (Focus, Waffen-Warnung, etc.)
	if(document.URL.indexOf('/jagd.php')!=-1 || document.URL.indexOf('/holzfaeller.php')!=-1 || document.URL.indexOf('/koehlern.php')!=-1 || document.URL.indexOf('/steinmetz.php')!=-1 || document.URL.indexOf('/kupferding.php')!=-1 || document.URL.indexOf('/wasser.php')!=-1 || document.URL.indexOf('/wasser2.php')!=-1 || document.URL.indexOf('/bronze.php')!=-1 || document.URL.indexOf('/schamane.php')!=-1 || document.URL.indexOf('/zinnding.php')!=-1 || document.URL.indexOf('/waffenschmied.php')!=-1 || document.URL.indexOf('/werkzeug.php')!=-1 || document.URL.indexOf('/kampf')!=-1 || document.URL.indexOf('/altar.artefakt.php')!=-1 || document.URL.indexOf('/bau.php')!=-1) {
			if(document.getElementsByName('zufallscode')[0]) {
				var str_alert = 'ACHTUNG!\n';
				var hand = GM_getValue("Hand", "Unbekannt");
				var finger = GM_getValue("Finger", "Unbekannt");
				// Waffenwarnung
				if(GM_getValue("Assi_WaffenWerkzeugWarnung", true)) {
					if(document.URL.indexOf('jagd.php')!=-1 || document.URL.indexOf('holzfaeller.php')!=-1 || document.URL.indexOf('koehlern.php')!=-1 || document.URL.indexOf('steinmetz.php')!=-1 || document.URL.indexOf('wasser.php')!=-1 || document.URL.indexOf('wasser2.php')!=-1) {
						if(hand.indexOf('nichts') == -1) {
							str_alert += '- Du hast eine Waffe oder ein falsches Werkzeug in der Hand!\n';
						}
					} else if(document.URL.indexOf('zinnding.php') != -1) {
						if(hand.indexOf('nichts') == -1 && hand.indexOf('Zinn') == -1) {
							str_alert += '- Du hast eine Waffe oder ein falsches Werkzeug in der Hand!\n';
						}
						if(GM_getValue("Zinn-Schaber", false)) {
							if(hand.indexOf('Zinn-Schaber') == -1) {
								str_alert += '- Du hast deinen Zinn-Schaber vergessen!\n';
							}
						} else if(GM_getValue("Zinn-Keil", false)) {
							if(hand.indexOf('Zinn-Keil') == -1) {
								str_alert += '- Du hast deinen Zinn-Keil vergessen!\n';
							}
						}
					} else if(document.URL.indexOf('kupferding.php') != -1) {
						if(hand.indexOf('nichts') == -1 && hand.indexOf('Kupfer') == -1) {
							str_alert += '- Du hast eine Waffe oder ein falsches Werkzeug in der Hand!\n';
						}
						if(GM_getValue("Kupfer-Hacke", false)) {
							if(hand.indexOf('Kupfer-Hacke') == -1) {
								str_alert += '- Du hast deine Kupfer-Hacke vergessen!\n';
							}
						} else if(GM_getValue("Kupfer-Schaber", false)) {
							if(hand.indexOf('Kupfer-Schaber') == -1) {
								str_alert += '- Du hast deinen Kupfer-Schaber vergessen!\n';
							}
						} else if(GM_getValue("Kupfer-Keil", false)) {
							if(hand.indexOf('Kupfer-Keil') == -1) {
								str_alert += '- Du hast deinen Kupfer-Keil vergessen!\n';
							}
						}
					}
				}
				// Fehlender Ring
				if(document.URL.indexOf('jagd.php')!=-1) {
					if(GM_getValue("Jagdring", false) && finger.indexOf('Jagdring') == -1) {
						str_alert += '- Du hast deinen Jagdring vergessen!\n';
					}
				} else if(document.URL.indexOf('wasser.php')!=-1 || document.URL.indexOf('wasser2.php')!=-1) {
					if(GM_getValue("Wasserring", false) && finger.indexOf('Wasserring') == -1) {
						str_alert += '- Du hast deinen Wasserring vergessen!\n';
					}
				}
				// Bevorstehender SK oder MK
				var activityEndDate2 = new Date(activityEndDate);
				activityEndDate2.setMinutes(parseInt(servertimeDate.getMinutes(), 10)+31);
				var skStartTime = Math.floor(GM_getValue("NextSK", "0").split(',')[0]);
				var diff = Math.floor(skStartTime/60000-servertimeDate.getTime()/60000);
				if(diff >= -1 && diff <= 31) {
					str_alert += '- Du verpasst einen Stammkampf!\n';
					if(parseInt(GM_getValue("SKTeilnahme", "0"), 10)+3600000 < servertimeDate.getTime()) {
						str_alert += '- Du bist noch nicht zum Stammkampf angemeldet!\n';
					}
				}
				if(activityEndDate2.getDay() == 1 && ((activityEndDate2.getHours() == mkStart && activityEndDate2.getMinutes() <= 30) || (activityEndDate2.getHours() == mkStart-1 && activityEndDate2.getMinutes() >= 59))) {
					str_alert += '- Du verpasst den Magierkampf!\n';
					if(parseInt(GM_getValue("MKTeilnahme", "0"), 10)+7200000 < servertimeDate.getTime()) {
						str_alert += '- Du bist noch nicht zum Magierkampf angemeldet!\n';
					}
				}
				if(str_alert.length > 9 && getURLParameter('szsa') != "codefalsch") {
					alert(str_alert);
				}
				// Fehlendes Arbeitsopfer / Drachenblutartefakt
				var drachenblutTime = Math.floor(GM_getValue("DrachenblutTime", "0"));
				if(drachenblutTime < servertimeDate.getTime()) {
					drachenblutTime = 0;
				}
				if(getURLParameter('szsa') == "codefalsch") {
					content.innerHTML += '<span class="red">Du hast den Zufallscode leider nicht richtig abgeschrieben und wurdest daher hierher um-/zurückgeleitet.</span><br><br>';
					if(str_alert.length > 9) {
						content.innerHTML += '<span class="yellow">'+str_alert.replace(/\n/g, '<br>')+'<span><br><br>';
					}
				}
				if((arbeitsopferDate == null || arbeitsopferDate.getTime() < (activityEndDate.getTime()+1800000)) && (drachenblutTime == 0 || drachenblutTime < (activityEndDate.getTime()+1800000))) {
					content.innerHTML += '<font color="yellow">ACHTUNG! Du könntest dich verletzen, da du weder ein aktives Arbeitsopfer noch ein gültiges Artefakt des Drachenbluts hast.<br><br>Direktlink: <a href="altar.php?do=arbeits&auswahl=1&szsa=link&url='+encodeURIComponent(document.URL)+'">Arbeitsopfer</a> (Kosten: 2 Zinn, 2 Wasser und 2 Kupfer)</font><br>';
				}
				// Focus
				document.getElementsByName('zufallscode')[0].focus();
			} else if(content.innerHTML.indexOf('Du bist für') != -1 || content.innerHTML.indexOf('Du bist jetzt') != -1 || content.innerHTML.indexOf('Du machst dich auf') != -1 || content.innerHTML.indexOf('Du stellst jetzt') != -1 || content.innerHTML.indexOf('Du weihst jetzt') != -1) {
				remindActivity = true;
				GM_setValue("RemindActivity", true);
				// Ankunftszeit setzen
				activityEndDate.setMinutes(parseInt(servertimeDate.getMinutes(), 10)+31);
				GM_setValue("Ankunftszeit", activityEndDate.getTime().toString());
				// Tätigkeit setzen
				if(document.URL.indexOf('/jagd.php') != -1) {
					GM_setValue("Arbeit", "auf der Jagd");
					if(content.innerHTML.indexOf('60 Minuten') != -1) {
						activityEndDate.setMinutes(parseInt(servertimeDate.getMinutes(), 10)+61);
						GM_setValue("Ankunftszeit", activityEndDate.getTime().toString());
					} else if(content.innerHTML.indexOf('120 Minuten') != -1) {
						activityEndDate.setMinutes(parseInt(servertimeDate.getMinutes(), 10)+121);
						GM_setValue("Ankunftszeit", activityEndDate.getTime().toString());
					}
				} else if(document.URL.indexOf('/holzfaeller.php') != -1) {
					GM_setValue("Arbeit", "beim Holzfällen");
				} else if(document.URL.indexOf('/koehlern.php') != -1) {
					GM_setValue("Arbeit", "beim Köhlern");
				} else if(document.URL.indexOf('/steinmetz.php') != -1) {
					GM_setValue("Arbeit", "beim Steine metzen");
				} else if(document.URL.indexOf('/kupferding.php') != -1) {
					GM_setValue("Arbeit", "beim Kupfer abbauen");
				} else if(document.URL.indexOf('/wasser.php') != -1 || document.URL.indexOf('wasser2.php') != -1) {
					GM_setValue("Arbeit", "beim Wassersuchen");
				} else if(document.URL.indexOf('/bronze.php') != -1) {
					GM_setValue("Arbeit", "beim Bronze herstellen");
				} else if(document.URL.indexOf('/schamane.php') != -1) {
					GM_setValue("Arbeit", "beim Trank brauen");
				} else if(document.URL.indexOf('/zinnding.php') != -1) {
					GM_setValue("Arbeit", "beim Zinn abbauen");
				} else if(document.URL.indexOf('/waffenschmied.php') != -1) {
					GM_setValue("Arbeit", "beim Waffe bauen");
				} else if(document.URL.indexOf('/werkzeug.php') != -1) {
					GM_setValue("Arbeit", "beim Werkzeug bauen");
				} else if(document.URL.indexOf('/kampf.php') != -1) {
					GM_setValue("Arbeit", "im Einzelkampf");
				} else if(document.URL.indexOf('/altar.artefakt.php') != -1 && content.innerHTML.indexOf('weihst') != -1) {
					GM_setValue("Arbeit", "beim Artefakt weihen");
				} else if(document.URL.indexOf('/altar.artefakt.php') != -1 && content.innerHTML.indexOf('stellst') != -1) {
					GM_setValue("Arbeit", "beim Artefakt herstellen");
				} else {
					GM_setValue("Arbeit", "auf Arbeit");
				}
			} else if(content.innerHTML.indexOf('Du hast den Zufallscode leider nicht richtig abgeschrieben.') != -1) {
				content.innerHTML = content.innerHTML.replace('Du hast den Zufallscode leider nicht richtig abgeschrieben.', '<span class="red">Du hast den Zufallscode leider nicht richtig abgeschrieben.</span>');
				window.location.href = document.URL+'?szsa=codefalsch';
			}
	}



// Header-Inlays
	var kopf = document.getElementsByTagName('img')[0].parentNode;
	// Serverzeit
	var strInlay = '<div id="serverzeit"'+((menuLeft.innerHTML.indexOf('color:red') != -1)? ' class="red" title="Lagerfeuer aus"' : '')+'></div>';
	// Reminder
	strInlay += '<div id="reminder">';
	strInlay += '<div id="reminder_tk"'+((parseInt(GM_getValue("TKTeilnahme", "0"), 10)+7200000 < servertimeDate.getTime())? ' class="red" title="Nicht angemeldet!"' : '')+'>TK: <span id="tk_inner"></span></div>';
	strInlay += '<div id="reminder_sk"'+((parseInt(GM_getValue("SKTeilnahme", "0"), 10)+3600000 < servertimeDate.getTime() && GM_getValue("NextSK", "0") != 'kein Kampf')? ' class="red" title="Nicht angemeldet!"' : '')+'>SK: <span id="sk_inner"></span></div>';
	strInlay += '<div id="reminder_mk"'+((parseInt(GM_getValue("MKTeilnahme", "0"), 10)+7200000 < servertimeDate.getTime())? ' class="red" title="Nicht angemeldet!"' : '')+'>MK: <span id="mk_inner"></span></div>';
	strInlay += '</div>';
	kopf.innerHTML += strInlay;
	// Wetter
	var wetterGrafik = document.getElementsByTagName('img')[0].src.replace('_kopf', '');
	var wetterText = 'Lorem ipsum...';
	switch(wetterGrafik) {
		case 'http://szs.looki.de/static/wetter/1.jpg':
			wetterText = 'Sonne';
			break;
		case 'http://szs.looki.de/static/wetter/2.jpg':
			wetterText = 'Regen';
			break;
		case 'http://szs.looki.de/static/wetter/3.jpg':
			wetterText = 'Schnee';
			break;
		case 'http://szs.looki.de/static/wetter/4.jpg':
			wetterText = 'Nebel';
			break;
		case 'http://szs.looki.de/static/wetter/5.jpg':
			wetterText = 'bewölkt';
			break;
		default:
			wetterText = '<font color="red">Fehler</font>';
			break;
	}
	var wetterDIV = document.createElement('div');
	wetterDIV.setAttribute('id', 'weather');
	wetterDIV.innerHTML = '<a href="wetter.php"><img src="'+wetterGrafik+'" height="40px"></a><br><center><a href="wetter.php">'+wetterText+'</a></center>';
	kopf.appendChild(wetterDIV);



// Linkes Menü
	var lagerfeuerColor = (menuLeft.innerHTML.indexOf('color:lime') != -1)? 'lime' : 'red';
	// Persönliches
	var leftMenuHTML = '';
	// Uhrzeit
	if(GM_getValue("Assi_MenuUhrzeit", false)) {
		leftMenuHTML += '<div style="text-align:center; margin: 10px 0;">'+servertimeDate.getHours()+':'+format2(servertimeDate.getMinutes())+':'+format2(servertimeDate.getSeconds())+' Uhr</div>';
	}
	leftMenuHTML += '<div class="menuHeadline">Persönliches</div><div class="menuItemContainer">';
	leftMenuHTML += '<a class="menu" href="news.php">Logbuch</a><br>';
	leftMenuHTML += '<a class="menu" href="message.php">Nachrichten</a><br>';
	leftMenuHTML += '<a class="menu" href="profil.php">Profil</a><br>';
	leftMenuHTML += '<a class="menu" href="charakter.php">Charakter</a><br>';
	leftMenuHTML += '<a class="menu" href="inventar.php">Inventar</a><br>';
	leftMenuHTML += '<a class="menu" href="artefakt.php">Artefakte</a><br>';
	leftMenuHTML += '<a class="menu" href="beruf.php">Beruf</a><br>';
	leftMenuHTML += '<a class="menu" href="karte.php">Karte</a><br>';
	leftMenuHTML += '<a class="menu" id="landControl" href="deinland.php">Land</a><br>';
	leftMenuHTML += '<a class="menu" id="guestbook" href="gbuch.php">Gästebuch</a><br>';
	if(isPremiumSpieler) {
		leftMenuHTML += '<a class="menu" href="notizbuch.php">Notizbuch</a><br>';
	}
	leftMenuHTML += '<a class="menu" href="javascript:showElement(\'configLayer\')">SZS-Assistent</a><br>';
	if(GM_getValue("Assi_MenuVersionTip", true)) leftMenuHTML += '<div id="neueVersion" align="center" style="display:none"></div>';
	leftMenuHTML += '</div>';
	//Aktionen
	leftMenuHTML += '<div class="menuHeadline">Aktionen</div><div class="menuItemContainer">';
	if(menuLeft.innerHTML.indexOf('Köhlern') != -1) {
		leftMenuHTML += '<a class="menu" href="holzfaeller.php">Holz fällen</a><br>';
		leftMenuHTML += '<a class="menu" href="koehlern.php">Köhlern</a><br>';
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
		leftMenuHTML += '<a class="menu" href="wasser2.php">Wasser suchen</a><br>';
	} else if(menuLeft.innerHTML.indexOf('Kupfer') != -1) {
		leftMenuHTML += '<a class="menu" href="steinmetz.php">Steine metzen</a><br>';
		leftMenuHTML += '<a class="menu" href="kupferding.php">Kupfer abbauen</a><br>';
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
		leftMenuHTML += '<a class="menu" href="wasser2.php">Wasser suchen</a><br>';
	} else if(menuLeft.innerHTML.indexOf('Bronze') != -1) {
		leftMenuHTML += '<a class="menu" href="wasser.php">Wasser suchen</a><br>';
		leftMenuHTML += '<a class="menu" href="bronze.php"><nobr>Bronze herstellen</nobr></a><br>';
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
	} else if(menuLeft.innerHTML.indexOf('Zinn') != -1) {
		leftMenuHTML += '<a class="menu" href="zinnding.php">Zinn abbauen</a><br>';
		leftMenuHTML += '<a class="menu" href="schamane.php">Trank brauen</a><br>';
		leftMenuHTML += '<a class="menu" href="altar.artefakt.php">Artefakt weihen</a><br>';
		//leftMenuHTML += '<!--<a class="menu" href="schamane.spenden.php">Opfergaben</a><br>-->';
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
		leftMenuHTML += '<a class="menu" href="wasser2.php">Wasser suchen</a><br>';
	} else if(menuLeft.innerHTML.indexOf('Waffen bauen') != -1) {
		leftMenuHTML += '<a class="menu" href="waffenschmied.php">Waffe bauen</a><br>';
		leftMenuHTML += '<a class="menu" href="werkzeug.php">Werkzeug bauen</a><br>';
		leftMenuHTML += '<a class="menu" href="altar.artefakt.php">Artefakt herstellen</a><br>';
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
		leftMenuHTML += '<a class="menu" href="wasser2.php">Wasser suchen</a><br>';
	} else {
		leftMenuHTML += '<a class="menu" href="jagd.php">Jagen</a><br>';
		leftMenuHTML += '<a class="menu" href="wasser2.php">Wasser suchen</a><br>';
	}
	if(menuLeft.innerHTML.indexOf('kochen.php') != -1) {
		leftMenuHTML += '<a class="menu" href="kochen.php">Kochen</a><br>';
	}
	leftMenuHTML += '<a class="menu" href="wandern.php">Wandern</a><br>';
	leftMenuHTML += '<a class="menu" href="schlafen.php">Schlafen</a><br>';
	leftMenuHTML += '<a class="menu" href="magier.php">Weiser Magier</a><br>';
	leftMenuHTML += '</div>';
	// Kämpfe
	leftMenuHTML += '<div class="menuHeadline">Kämpfe</div><div class="menuItemContainer">';
	leftMenuHTML += '<a class="menu" href="kampf.php">Einzelkampf</a><br>';
	leftMenuHTML += '<a class="menu" href="grtal.php">Talkampf</a><br>';
	if(menuLeft.innerHTML.indexOf('stammjoinen') == -1) {
		if(parseInt(GM_getValue("NextSK", "0").split(',')[0], 10)+3600000 < servertimeDate.getTime() || GM_getValue("NextSK", "0") == "kein Kampf") {
			leftMenuHTML += '<a class="menu" href="stamm.php?do=kampfsuche">Stammkampf</a><br>';
		} else {
			leftMenuHTML += '<a class="menu" href="stamm.php?do=kampfuserauswahl">Stammkampf</a><br>';
		}
		leftMenuHTML += '<a class="menu" href="stamm.magierkampf.php">Magierkampf</a><br>';
	}
	leftMenuHTML += '</div>';
	// Handel
	leftMenuHTML += '<div class="menuHeadline">Handel</div><div class="menuItemContainer">';
	leftMenuHTML += '<a class="menu" href="markt.php">Markt</a><br>';
	leftMenuHTML += '<a class="menu" href="http://www.looki.de/forum/tauschforum_f111/" target="_blank">Tauschforum</a><br>';
	leftMenuHTML += '<a class="menu" href="nahrung.php">Händler</a><br>';
	leftMenuHTML += '<a class="menu" href="waffenshop.php">Waffenhöhle</a><br>';
	leftMenuHTML += '<a class="menu" href="uebertragen.php">Übertragen</a><br>';
	leftMenuHTML += '<a class="menu" href="nomade.php">Nomade</a><br>';
	leftMenuHTML += '<a class="menu" href="http://www.looki.de/forum/lagerdiebstahl_handelsbetrug_f129/liste_aller_lagerdiebe_und_handelsbetrueger_93131.html" target="_blank">Diebesliste</a><br>';
	leftMenuHTML += '</div>';
	// Stamm
	leftMenuHTML += '<div class="menuHeadline">Stamm</div><div class="menuItemContainer">';
	if(menuLeft.innerHTML.indexOf('stammjoinen.php') == -1) {
		leftMenuHTML += '<a class="menu" href="stamm.php?do=uebersicht">Übersicht</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=nachricht">Nachrichten</a><br>';
		leftMenuHTML += '<a class="menu" href="stammforum.forum.php">StammForum</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=lager">Lager</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=waffenlager">Waffenlager</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=tranklager">Tranklager</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=werkzeuglager">Werkzeuglager</a><br>';
		leftMenuHTML += '<a class="menu" href="altar.php">Altar</a><br>';
		leftMenuHTML += '<a class="menu" href="weltwunder.php">Weltwunder</a><br>';
		leftMenuHTML += '<a class="menu" href="stamm.php?do=austreten">Austreten</a><br>';
		if(menuLeft.innerHTML.indexOf('stamm.php?do=lagerfeuerbauen') == -1) {
			leftMenuHTML += '<a class="menu" style="color:'+lagerfeuerColor+'" href="stamm.php?do=lagerfeuer">Lagerfeuer</a><br>';
		} else {
			leftMenuHTML += '<a class="menu" href="stamm.php?do=lagerfeuerbauen">Lagerfeuer</a><br>';
		}
	} else if(menuLeft.innerHTML.indexOf('hausbau.php') == -1) {
		leftMenuHTML += '<a class="menu" href="hausbau.php">Haus bauen</a><br>';
		leftMenuHTML += '<a class="menu" href="stammjoinen.php">Stamm joinen</a><br>';
	} else {
		leftMenuHTML += '<a class="menu" href="stammgruenden.php">Stamm gründen</a><br>';
		leftMenuHTML += '<a class="menu" href="stammjoinen.php">Stamm joinen</a><br>';
	}
	leftMenuHTML += '</div>';
	// Toplisten
	leftMenuHTML += '<div class="menuHeadline">Toplisten</div><div class="menuItemContainer">';
	leftMenuHTML += '<a class="menu" href="top.php">UserTop</a><br>';
	leftMenuHTML += '<a class="menu" href="stammtop.php">StammTop</a><br>';
	leftMenuHTML += '<a class="menu" href="aktivespieler.php">Aktive Spieler</a><br>';
	leftMenuHTML += '<a class="menu" href="aktivpunkte.php">Aktive Stämme</a><br>';
	leftMenuHTML += '<a class="menu" href="viptop.php">VIPTop</a><br>';
	leftMenuHTML += '</div>';
		// Sonstiges
	leftMenuHTML += '<div class="menuHeadline">Sonstiges</div><div class="menuItemContainer">';
	leftMenuHTML += '<a class="menu" href="userinfo.php">UserSuche</a><br>';
	leftMenuHTML += '<a class="menu" href="stamminfo.php">StammSuche</a><br>';
	leftMenuHTML += '<a class="menu" href="useronline.php">OnlineUser</a><br>';
	leftMenuHTML += '</div>';
	menuLeft.innerHTML = leftMenuHTML;



// Info-Anzeigen (Ausrüstung, Opfer, Artefakte)
	if(GM_getValue("Assi_Infoanzeigen", "menu") == 'zentriert') {
		var infoanzeigeDIV = document.createElement('div');
		infoanzeigeDIV.setAttribute('id', 'infoanzeige');
		content.insertBefore(infoanzeigeDIV, content.firstChild);
		// Ausrüstung
		var hand = GM_getValue("Hand", "Unbekannt");
		var finger = GM_getValue("Finger", "Unbekannt");
		var infoanzeigeHEAD = '<th><a class="menu" href="inventar.php">Ausrüstung</a></th>';
		var infoanzeigenBODY = '<td><div>Hand: '+hand+'</div><div>Finger: '+finger+'</div></td>';
		// Opfer
		if(waffenopferKleinDate != null || waffenopferGrossDate != null || arbeitsopferDate != null || ringopferDate != null) {
			infoanzeigeHEAD += '<th></th><th><a class="menu" href="altar.php">Opfer</a></th>';
			infoanzeigenBODY += '<td></td><td>';
			if(waffenopferKleinDate != null) infoanzeigenBODY += '<div title="kleines Waffenopfer bis '+format2(waffenopferKleinDate.getDate())+'.'+format2(waffenopferKleinDate.getMonth()+1)+'.'+waffenopferKleinDate.getFullYear()+' - '+format2(waffenopferKleinDate.getHours())+':'+format2(waffenopferKleinDate.getMinutes())+':'+format2(waffenopferKleinDate.getSeconds())+'">kl. WO: <span id="WaffenopferKleinSpan"></span></div>';
			if(waffenopferGrossDate != null) infoanzeigenBODY += '<div title="großes Waffenopfer bis '+format2(waffenopferGrossDate.getDate())+'.'+format2(waffenopferGrossDate.getMonth()+1)+'.'+waffenopferGrossDate.getFullYear()+' - '+format2(waffenopferGrossDate.getHours())+':'+format2(waffenopferGrossDate.getMinutes())+':'+format2(waffenopferGrossDate.getSeconds())+'">gr. WO: <span id="WaffenopferGrossSpan"></span></div>';
			if(arbeitsopferDate != null) infoanzeigenBODY += '<div title="Arbeitsopfer bis '+format2(arbeitsopferDate.getDate())+'.'+format2(arbeitsopferDate.getMonth()+1)+'.'+arbeitsopferDate.getFullYear()+' - '+format2(arbeitsopferDate.getHours())+':'+format2(arbeitsopferDate.getMinutes())+':'+format2(arbeitsopferDate.getSeconds())+'">AO: <span id="ArbeitsopferSpan"></span></div>';
			if(ringopferDate != null) infoanzeigenBODY += '<div title="Ringopfer bis '+format2(ringopferDate.getDate())+'.'+format2(ringopferDate.getMonth()+1)+'.'+ringopferDate.getFullYear()+' - '+format2(ringopferDate.getHours())+':'+format2(ringopferDate.getMinutes())+':'+format2(ringopferDate.getSeconds())+'">RO: <span id="RingopferSpan"></span></div>';
			infoanzeigenBODY += '</td>';
		}
		// Artefakte
		var drachenblutDate = new Date(parseInt(GM_getValue("DrachenblutTime", "0"), 10));
		var glueckDate = new Date(parseInt(GM_getValue("GlueckTime", "0"), 10));
		var meisterschmiedDate = new Date(parseInt(GM_getValue("MeisterschmiedTime", "0"), 10));
		if(drachenblutDate.getTime() < servertimeDate.getTime()) drachenblutDate = null;
		if(glueckDate.getTime() < servertimeDate.getTime()) glueckDate = null;
		if(meisterschmiedDate.getTime() < servertimeDate.getTime()) meisterschmiedDate = null;
		if(drachenblutDate != null || glueckDate != null || meisterschmiedDate != null) {
			infoanzeigeHEAD += '<th></th><th><a class="menu" href="artefakt.php">Artefakte</a></th>';
			infoanzeigenBODY += '<td></td><td>';
			if(drachenblutDate != null) infoanzeigenBODY += '<div title="Drachenblut bis '+format2(drachenblutDate.getDate())+'.'+format2(drachenblutDate.getMonth()+1)+'.'+drachenblutDate.getFullYear()+' - '+format2(drachenblutDate.getHours())+':'+format2(drachenblutDate.getMinutes())+':'+format2(drachenblutDate.getSeconds())+'">DB: <span id="DrachenblutSpan"></span></div>';
			if(glueckDate != null) infoanzeigenBODY += '<div title="Glück bis '+format2(glueckDate.getDate())+'.'+format2(glueckDate.getMonth()+1)+'.'+glueckDate.getFullYear()+' - '+format2(glueckDate.getHours())+':'+format2(glueckDate.getMinutes())+':'+format2(glueckDate.getSeconds())+'">Gl: <span id="GlueckSpan"></span></div>';
			if(meisterschmiedDate != null) infoanzeigenBODY += '<div title="Meisterschmied bis '+format2(meisterschmiedDate.getDate())+'.'+format2(meisterschmiedDate.getMonth()+1)+'.'+meisterschmiedDate.getFullYear()+' - '+format2(meisterschmiedDate.getHours())+':'+format2(meisterschmiedDate.getMinutes())+':'+format2(meisterschmiedDate.getSeconds())+'">MS: <span id="MeisterschmiedSpan"></span></div>';
			infoanzeigenBODY += '</td>';
		}
		var infoanzeigeHTML = '<table><thead><tr>'+infoanzeigeHEAD+'</tr></thead><tbody><tr>'+infoanzeigenBODY+'</tr></tbody></table>';
		document.getElementById('infoanzeige').innerHTML = infoanzeigeHTML;
	}



// Rechtes Menü
	var i = (isPremiumSpieler)? 1 : 0;
	var ep = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[1].innerHTML.trim();
	var nahrung = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[3].innerHTML.trim();
	var wasser = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[5].innerHTML.trim();
	var gold = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[7].innerHTML.trim();
	var holz = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[9].innerHTML.trim();
	var stein = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[11].innerHTML.trim();
	var kohle = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[13].innerHTML.trim();
	var kupfer = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[15].innerHTML.trim();
	var zinn = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[17].innerHTML.trim();
	var bronze = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[19].innerHTML.trim();
	var muedigkeit = parseInt(menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[21].getElementsByTagName('font')[0].innerHTML, 10);
	var muedeColor = menuRight.getElementsByTagName("table")[1+i].getElementsByTagName('td')[21].getElementsByTagName('font')[0].getAttribute('color');
	var muedeUpdateAusgefuehrt = false;
	var muedigkeitNeu = -1;
	var isFreieCP = (menuRight.getElementsByTagName("table")[0+i].innerHTML.indexOf("Du hast noch Punkte übrig, die du verteilen kannst.") != -1)? true : false;
	var isNeueNachricht = (menuRight.getElementsByTagName("table")[0+i].innerHTML.indexOf("Du hast eine neue private Nachricht erhalten.") != -1)? true : false;
	if(isNeueNachricht) {
		GM_setValue("RemindNewMessage", false);
	} else {
		GM_setValue("RemindNewMessage", true);
	}
	var rightMenuHTML = '';
	// SK-Zeit
	if(GM_getValue("Assi_MenuSKZeit", false) && GM_getValue("NextSK", "") != "") {
		rightMenuHTML += '<div style="text-align:center; margin: 10px 0;">';
		if(GM_getValue("NextSK") == 'kein Kampf') {
			rightMenuHTML += '<a class="menu" href="stamm.php?do=kampfsuche"><font color="#ffff00">kein Kampf</font></a>';
		} else {
			var stammkampfDate = new Date(Math.floor(GM_getValue("NextSK", "0").split(',')[0]));
			if(parseInt(GM_getValue("SKTeilnahme", "0"), 10)+3600000 < servertimeDate.getTime()) {
				rightMenuHTML += '<a class="menu" href="stamm.php?do=kampfuserauswahl"><font color="#ffff00">'+format2(stammkampfDate.getDate())+'.'+format2(stammkampfDate.getMonth()+1)+'.'+stammkampfDate.getFullYear().toString().slice(2)+' - '+format2(stammkampfDate.getHours())+':'+format2(stammkampfDate.getMinutes())+'</font></a>';
			} else {
				rightMenuHTML += '<font color="#00ff00">'+format2(stammkampfDate.getDate())+'.'+format2(stammkampfDate.getMonth()+1)+'.'+stammkampfDate.getFullYear().toString().slice(2)+' - '+format2(stammkampfDate.getHours())+':'+format2(stammkampfDate.getMinutes())+'</font>';
			}
			rightMenuHTML += '<br><a class="menu" href="stamminfo.php?stammid='+GM_getValue("NextSK", "0").split(',')[1]+'">'+GM_getValue("NextSK", "0").split(',')[2]+'</a>';
		}
		rightMenuHTML += '</div>';
	}
	// UserDaten
	rightMenuHTML += '<div class="menuHeadline"><a class="menu" href="charakter.php">UserDaten</a></div><div class="menuItemContainer">';
	rightMenuHTML += '<table width="100%" cellspacing="0" cellpadding="0"><tbody>'
	rightMenuHTML += '<tr><td><img title="Erfahrung" src="/static/rohstoff_icons/erfahrung.gif"></td><td align="right">'+ep+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Nahrung" src="/static/rohstoff_icons/essen.gif"></td><td align="right">'+nahrung+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Wasser" src="/static/rohstoff_icons/wasser.gif"></td><td align="right">'+wasser+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Gold" src="/static/rohstoff_icons/gold.gif"></td><td align="right">'+gold+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Holz" src="/static/rohstoff_icons/holz.gif"></td><td align="right">'+holz+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Stein" src="/static/rohstoff_icons/stein.gif"></td><td align="right">'+stein+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Kohle" src="/static/rohstoff_icons/kohle.gif"></td><td align="right">'+kohle+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Kupfer" src="/static/rohstoff_icons/kupfer.gif"></td><td align="right">'+kupfer+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Zinn" src="/static/rohstoff_icons/zinn.gif"></td><td align="right">'+zinn+'</td></tr>';
	rightMenuHTML += '<tr><td><img title="Bronze" src="/static/rohstoff_icons/bronze.gif"></td><td align="right">'+bronze+'</td></tr>';
	if(muedigkeit < 80) {
		rightMenuHTML += '<tr><td><img title="Müdigkeit" src="/static/rohstoff_icons/muedigkeit.gif"></td><td align="right"><font id="muede" color="'+muedeColor+'">'+muedigkeit+'%</font></td></tr>';
	} else {
		rightMenuHTML += '<tr><td><img title="Müdigkeit" src="/static/rohstoff_icons/muedigkeit.gif"></td><td align="right"><a class="menu" href="http://szs.looki.de/inventar.php?aktion=trinken2&trankid='+GM_getValue("starkerWachtrank", 0)+'&szsa=stwach"><font id="muede" color="'+muedeColor+'">'+muedigkeit+'%</font></a></td></tr>';
	}
	rightMenuHTML += '</tbody></table>';
	if(isFreieCP) rightMenuHTML += '<br><div align="center"><a class="menu" href="charakter.php"><font color="red">CP verteilen!</font></a></div>';
	rightMenuHTML += '<div id="neueNachricht" align="center" style="display:'+((isNeueNachricht)? 'block' : 'none')+'"><br><a class="menu" href="news.php"><font color="yellow">Neue Nachricht erhalten</font></a></div>';
	rightMenuHTML += '</div>';
	// Info-Anzeigen
	if(GM_getValue("Assi_Infoanzeigen", "menu") == 'menu') {
		// Ausrüstung
		var hand = GM_getValue("Hand", "Unbekannt");
		var finger = GM_getValue("Finger", "Unbekannt");
		rightMenuHTML += '<div class="menuHeadline"><a class="menu" href="inventar.php">Ausrüstung</a></div><div class="menuItemContainer">';
		rightMenuHTML += '<div>In der Hand:<div align="right">'+hand+'</div></div>';
		rightMenuHTML += '<div>Am Finger:<div align="right">'+finger+'</div></div>';
		rightMenuHTML += '</div>';
		// Opfer
		if(waffenopferKleinDate != null || waffenopferGrossDate != null || arbeitsopferDate != null || ringopferDate != null) {
			rightMenuHTML += '<div class="menuHeadline"><a class="menu" href="altar.php">Opfer</a></div><div class="menuItemContainer">';
			if(waffenopferKleinDate != null) rightMenuHTML += '<div title="kleines Waffenopfer bis '+format2(waffenopferKleinDate.getDate())+'.'+format2(waffenopferKleinDate.getMonth()+1)+'.'+waffenopferKleinDate.getFullYear()+' - '+format2(waffenopferKleinDate.getHours())+':'+format2(waffenopferKleinDate.getMinutes())+':'+format2(waffenopferKleinDate.getSeconds())+'">kl. Waffenopfer: <div id="WaffenopferKleinSpan" align="right"></div></div>';
			if(waffenopferGrossDate != null) rightMenuHTML += '<div title="großes Waffenopfer bis '+format2(waffenopferGrossDate.getDate())+'.'+format2(waffenopferGrossDate.getMonth()+1)+'.'+waffenopferGrossDate.getFullYear()+' - '+format2(waffenopferGrossDate.getHours())+':'+format2(waffenopferGrossDate.getMinutes())+':'+format2(waffenopferGrossDate.getSeconds())+'">gr. Waffenopfer: <div id="WaffenopferGrossSpan" align="right"></div></div>';
			if(arbeitsopferDate != null) rightMenuHTML += '<div title="Arbeitsopfer bis '+format2(arbeitsopferDate.getDate())+'.'+format2(arbeitsopferDate.getMonth()+1)+'.'+arbeitsopferDate.getFullYear()+' - '+format2(arbeitsopferDate.getHours())+':'+format2(arbeitsopferDate.getMinutes())+':'+format2(arbeitsopferDate.getSeconds())+'">Arbeitsopfer: <div id="ArbeitsopferSpan" align="right"></div></div>';
			if(ringopferDate != null) rightMenuHTML += '<div title="Ringopfer bis '+format2(ringopferDate.getDate())+'.'+format2(ringopferDate.getMonth()+1)+'.'+ringopferDate.getFullYear()+' - '+format2(ringopferDate.getHours())+':'+format2(ringopferDate.getMinutes())+':'+format2(ringopferDate.getSeconds())+'">Ringopfer: <div id="RingopferSpan" align="right"></div></div>';
			rightMenuHTML += '</div>';
		}
		// Artefakte
		var drachenblutDate = new Date(parseInt(GM_getValue("DrachenblutTime", "0"), 10));
		var glueckDate = new Date(parseInt(GM_getValue("GlueckTime", "0"), 10));
		var meisterschmiedDate = new Date(parseInt(GM_getValue("MeisterschmiedTime", "0"), 10));
		if(drachenblutDate.getTime() < servertimeDate.getTime()) drachenblutDate = null;
		if(glueckDate.getTime() < servertimeDate.getTime()) glueckDate = null;
		if(meisterschmiedDate.getTime() < servertimeDate.getTime()) meisterschmiedDate = null;
		if(drachenblutDate != null || glueckDate != null || meisterschmiedDate != null) {
			rightMenuHTML += '<div class="menuHeadline"><a class="menu" href="artefakt.php">Artefakte</a></div><div class="menuItemContainer">';
			if(drachenblutDate != null) rightMenuHTML += '<div title="Drachenblut bis '+format2(drachenblutDate.getDate())+'.'+format2(drachenblutDate.getMonth()+1)+'.'+drachenblutDate.getFullYear()+' - '+format2(drachenblutDate.getHours())+':'+format2(drachenblutDate.getMinutes())+':'+format2(drachenblutDate.getSeconds())+'">Drachenblut: <div id="DrachenblutSpan" align="right"></div></div>';
			if(glueckDate != null) rightMenuHTML += '<div title="Glück bis '+format2(glueckDate.getDate())+'.'+format2(glueckDate.getMonth()+1)+'.'+glueckDate.getFullYear()+' - '+format2(glueckDate.getHours())+':'+format2(glueckDate.getMinutes())+':'+format2(glueckDate.getSeconds())+'">Glück: <div id="GlueckSpan" align="right"></div></div>';
			if(meisterschmiedDate != null) rightMenuHTML += '<div title="Meisterschmied bis '+format2(meisterschmiedDate.getDate())+'.'+format2(meisterschmiedDate.getMonth()+1)+'.'+meisterschmiedDate.getFullYear()+' - '+format2(meisterschmiedDate.getHours())+':'+format2(meisterschmiedDate.getMinutes())+':'+format2(meisterschmiedDate.getSeconds())+'">Meisterschmied: <div id="MeisterschmiedSpan" align="right"></div></div>';
			rightMenuHTML += '</div>';
		}
	}
	// Freundesliste
	var i = 1;
	while(menuRight.getElementsByTagName('table')[i+1].innerHTML.indexOf('Freundesliste</td>') == -1) {
		i++
	}
	i++;
	var freunde = menuRight.getElementsByTagName('table')[i].getElementsByTagName('a');
	var freunde2 = new Array();
	rightMenuHTML += '<div class="menuHeadline"><a class="menu" href="friendlist.php">Freunde</a></div><div id="freunde" class="menuItemContainer">';
	for(var i=0; i<freunde.length-1; i++) {
		var temp = new Array();
		temp[0] = freunde[i].getElementsByTagName('font')[0].innerHTML.trim().toLowerCase();
		temp[1] = freunde[i].getElementsByTagName('font')[0].innerHTML.trim();
		temp[2] = freunde[i].getAttribute('href');
		temp[3] = (freunde[i].getElementsByTagName('font')[0].getAttribute('color') == 'lime')? 'green':'red';
		freunde2.push(temp);
	}
	if(GM_getValue("Assi_FreundeSortierung", false)) freunde2.sort();
	for(var i=0; i<freunde2.length; i++) {
		var userid = freunde2[i][2].replace(/\D*/, '');
		rightMenuHTML += '<nobr><a id="freund_'+userid+'" class="menu '+freunde2[i][3]+'" href="'+freunde2[i][2]+'">'+freunde2[i][1]+'</a> <a href="message.php?empf='+userid+'" title="Private Nachricht"><span class="pn-icon-s"></span></a></nobr><br>';
	}
	rightMenuHTML += '</div>';
	// Hilfe
	rightMenuHTML += '<div class="menuHeadline">Hilfe</div><div class="menuItemContainer">';
	rightMenuHTML += '<a class="menu" href="einsteiger.php">Einsteiger</a><br>';
	rightMenuHTML += '<a class="menu" href="http://www.looki.de/forum/der_rat_der_weisen_fragen_zum_steinzeitspiel_f108/das_1x1_der_steinzeit_230325.html" target="_blank">Das SZS 1x1</a><br>';
	rightMenuHTML += '<a class="menu" href="faq-sys.php">FAQ</a><br>';
	rightMenuHTML += '<a class="menu" href="regeln.php">Regeln</a><br>';
	rightMenuHTML += '</div>';
	// Allgemeines
	rightMenuHTML += '<div class="menuHeadline">Allgemeines</div><div class="menuItemContainer">';
	rightMenuHTML += '<a class="menu" href="http://www.looki.de/forum/das_steinzeitspiel_f89/" target="_blank">Forum</a><br>';
	rightMenuHTML += '<a class="menu" href="http://www.szstool.de" target="_blank">SZS-Tool</a><br>';
	rightMenuHTML += '<a class="menu" href="ipliste.php">IP-Liste</a><br>';
	rightMenuHTML += '<a class="menu" href="statistik.php">Statistiken</a><br>';
	rightMenuHTML += '<a class="menu" href="gamenews.php">Gamenews</a><br>';
	rightMenuHTML += '<a class="menu" href="geworbene.php">Geworbene</a><br>';
	rightMenuHTML += '<a class="menu" target="_blank" href="http://www.galaxy-news.de/?page=charts&op=vote&game_id=97">Vote #1</a><br>';
	rightMenuHTML += '<a class="menu" target="_blank" href="http://voting.gdynamite.de/redirect/28/">Vote #2</a><br>';
	rightMenuHTML += '<a class="menu" href="http://www.looki.de/support.html" target="_blank">Support</a><br>';
	rightMenuHTML += '<a class="menu" href="cheater.php">Cheater melden</a><br>';
	rightMenuHTML += '<a class="menu" href="bug.php">Bug melden</a><br>';
	rightMenuHTML += '<a class="menu" href="impressum.php">Impressum</a><br>';
	rightMenuHTML += '<br><a class="menu" href="logout.php">Logout</a><br>';
	rightMenuHTML += '</div>';
	menuRight.innerHTML = rightMenuHTML;



// Scriptversion-Check
	if(GM_getValue("Assi_MenuVersionTip", true)) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/151764.meta.js",
			onload: function(response) {
				if(response.responseText.indexOf('// @version') != -1) {
					var html = response.responseText.slice(response.responseText.indexOf('// @version')+11);
					var versionOnline = html.slice(0, html.indexOf('//')).trim();
					var versionOffline = GM_info.script.version;
					var vOn = versionOnline.split(".");
					var vOff = versionOffline.split(".");
					var isNewVersion = 0;
					var i = 0;
					while(typeof vOn[i] != 'undefined' || typeof vOff[i] != 'undefined') {
						if(parseInt(vOn[i], 10) == parseInt(vOff[i], 10)) {
							i++;
							continue;
						} else {
							isNewVersion = (parseInt(vOn[i], 10) > parseInt(vOff[i], 10));
							break;
						}
						i++;
					}
					if(isNewVersion) {
						document.getElementById('neueVersion').style.display = 'block';
						document.getElementById('neueVersion').innerHTML = '<br><a class="menu" href="http://userscripts.org/scripts/show/151764" target="_blank"><font color="yellow">Neue Version verfügbar!</font></a>';
					}
				}
			}
		});
	}


// Event-Listener (global)
	if(window.addEventListener) {
		window.addEventListener('resize', pageUpdate, false);
		window.addEventListener('scroll', pageUpdate, false);
	}
	if(document.getElementById('notice') && document.getElementById('notice').addEventListener) {
		document.getElementById('notice').addEventListener('keyup', function() { GM_setValue("notice", document.getElementById('notice').value); }, false);
	}
	if(document.addEventListener) {
		var hotkey = '';
		var hotkeyTime = 0;
		document.addEventListener('keyup', handleHotkey, false);
	}
	if(document.getElementById('configForm') && document.getElementById('configForm').addEventListener) {
		document.getElementById('configForm').addEventListener('submit', saveConfig, true);
	}
	if(document.getElementById('button_ResetConfig') && document.getElementById('button_ResetConfig').addEventListener) {
		document.getElementById('button_ResetConfig').addEventListener('click', resetConfig, false);
	}
	if(document.getElementById('button_DeleteAll') && document.getElementById('button_DeleteAll').addEventListener) {
		document.getElementById('button_DeleteAll').addEventListener('click', deleteAllData, false);
	}



// Scriptlaufzeit
	var scriptendtime = new Date();
	document.getElementById('reminder').innerHTML += '<div id="scriptlaufzeit">Scriptlaufzeit: '+(scriptendtime.getTime()-scriptstarttime.getTime())+' ms</div>';


	pageUpdate();
	countdown();
	setTimeout(updateFriendStatus, 60000);
	setTimeout(checkForNewMessage, 10000);
	checkLandControl();
} // Main-Ende






/* FUNCTIONS */
function countdown() {
	var countdownDate = new Date((new Date()).getTime()-diffServertime);

// serverzeit
	document.getElementById('serverzeit').innerHTML = 'Serverzeit: '+countdownDate.getHours()+':'+format2(countdownDate.getMinutes())+':'+format2(countdownDate.getSeconds())+' Uhr';


// Restarbeitszeit
	var count = Math.floor(activityEndDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
	var nochUnterwegs = false;
	if(count<0) count=0;
	if(count>10) nochUnterwegs=true;
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count;
	var countdownHTML = '';
	if(minutes > 0) {
		//document.getElementById('aktuelleAktion').innerHTML = aktionHTML.replace(/(\s(ca\.\s)*\d+ Minuten)|(wenige Sekunden)/, ' '+minutes+':'+format2(seconds)+' Minuten (bis '+format2(activityEndDate.getHours())+':'+format2(activityEndDate.getMinutes())+' Uhr)').replace('.<a', '. <a');
		countdownHTML = minutes+':'+format2(seconds)+' Minuten (bis '+format2(activityEndDate.getHours())+':'+format2(activityEndDate.getMinutes())+' Uhr) ';
	} else {
		//document.getElementById('aktuelleAktion').innerHTML = aktionHTML.replace(/(\s(ca\.\s)*\d+ Minuten)|(wenige Sekunden)/, ' '+seconds+' Sekunden (bis '+format2(activityEndDate.getHours())+':'+format2(activityEndDate.getMinutes())+' Uhr)').replace('.<a', '. <a');
		countdownHTML = seconds+' Sekunden (bis '+format2(activityEndDate.getHours())+':'+format2(activityEndDate.getMinutes())+' Uhr) ';
	}
	if(Math.floor(GM_getValue("Ankunftszeit", "0"))+180000 > activityEndDate.getTime()) {
		countdownHTML += GM_getValue("Arbeit", "auf Arbeit");
	} else {
		countdownHTML += 'unterwegs';
	}
	if(document.getElementById('countdown')) document.getElementById('countdown').innerHTML = countdownHTML;


// Müdigkeit
	var muedeDate = new Date(countdownDate);
	if(muedeDate.getMinutes()%10 == 0) {
		muedeDate.setMinutes(muedeDate.getMinutes()+10);
	}
	muedeDate.setSeconds(0);
	muedeDate.setMilliseconds(0);
	while(muedeDate.getMinutes()%10 != 0) {
		muedeDate.setMinutes(muedeDate.getMinutes()+1);
	}
	count = Math.floor(muedeDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
	if(muedigkeitNeu == -1) muedigkeitNeu=muedigkeit;
	if(count<0) count=0;
	var seconds = count%60;
	count = Math.floor(count/60);
	var minutes = count%60;
	if (minutes > 0) {
		if(minutes == 10) {
			if(!muedeUpdateAusgefuehrt) {
				if(nochUnterwegs) {
					 muedigkeitNeu += 2;
				} else {
					 muedigkeitNeu -= 1;
				}
				var color = 'lime';
				if(muedigkeitNeu >= 100) {
					 muedigkeitNeu = 100;
				} else if(muedigkeitNeu <= 0) {
					 muedigkeitNeu = 0;
				}
				if(muedigkeitNeu >= 80) {
					 color = 'red';
				} else if(muedigkeitNeu > 60) {
					 color = 'yellow';
				}
				document.getElementById('muede').setAttribute('color', color);
				document.getElementById('muede').innerHTML = muedigkeitNeu + '%';
				muedeUpdateAusgefuehrt = true;
			}
		} else {
			muedeUpdateAusgefuehrt = false;
		}
	}


// Artefaktzeit
	if(drachenblutDate != null) {
		count = Math.floor(drachenblutDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'DrachenblutSpan');
	}
	if(glueckDate != null) {
		count = Math.floor(glueckDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'GlueckSpan');
	}
	if(meisterschmiedDate != null) {
		count = Math.floor(meisterschmiedDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'MeisterschmiedSpan');
	}


// Opferzeit
	if(waffenopferKleinDate != null) {
		count = Math.floor(waffenopferKleinDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'WaffenopferKleinSpan');
	}
	if(waffenopferGrossDate != null) {
		count = Math.floor(waffenopferGrossDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'WaffenopferGrossSpan');
	}
	if(arbeitsopferDate != null) {
		count = Math.floor(arbeitsopferDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'ArbeitsopferSpan');
	}
	if(ringopferDate != null) {
		count = Math.floor(ringopferDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		printCountdownZeit(count, 'RingopferSpan');
	}


// Activity-Reminder
	if(countdownDate >= activityEndDate && GM_getValue("Assi_ActivityReminder", false) && remindActivity && GM_getValue("RemindActivity", false)) {
		remindActivity = false;
		GM_setValue("RemindActivity", false);
		var volume = parseFloat(GM_getValue("Assi_ReminderSoundVolume", 100)/100);
		if(volume<0) volume=0;
		if(volume>1) volume=1;
		switch(GM_getValue("Assi_Remindersound", "")) {
			case 'SoundA':
				audioA.volume = volume;
				audioA.play();
				break;
			case 'SoundB':
				audioB.volume = volume;
				audioB.play();
				break;
			case 'SoundC':
				audioC.volume = volume;
				audioC.play();
				break;
			default:
				break;
		}
		if(GM_getValue("Assi_Standardtaetigkeit", "") == "") {
			alert('Du bist wieder verfügbar!');
		} else {
			if(confirm('Du bist wieder verfügbar!\n\nStandardtätigkeit aufrufen?')) {
				var url = '';
				switch(GM_getValue("Assi_Standardtaetigkeit", "")) {
					case 'Jagen':
						url = 'http://szs.looki.de/jagd.php';
						break;
					case 'Wasser':
						url = 'http://szs.looki.de/wasser.php';
						break;
					case 'Holz':
						url = 'http://szs.looki.de/holzfaeller.php';
						break;
					case 'Stein':
						url = 'http://szs.looki.de/steinmetz.php';
						break;
					case 'Kohle':
						url = 'http://szs.looki.de/koehlern.php';
						break;
					case 'Kupfer':
						url = 'http://szs.looki.de/kupferding.php';
						break;
					case 'Zinn':
						url = 'http://szs.looki.de/zinnding.php';
						break;
					case 'Bronze':
						url = 'http://szs.looki.de/bronze.php';
						break;
					case 'Trank':
						url = 'http://szs.looki.de/schamane.php';
						break;
					case 'Waffe':
						url = 'http://szs.looki.de/waffenschmied.php';
						break;
					case 'Werkzeug':
						url = 'http://szs.looki.de/werkzeug.php';
						break;
					case 'Artefakt':
						url = 'http://szs.looki.de/altar.artefakt.php';
						break;
					default:
						url = '';
						break;
				}
				if(url.indexOf('http://szs.looki.de/wasser.php') == 0 && main.innerHTML.indexOf('<a class="menu" href="wasser2.php">Wasser suchen</a>') != -1) {
					url = 'http://szs.looki.de/wasser2.php';
				}
				if(url != '') window.location.href = url;
			}
		}
	}


// Talkampf-Reminder
	var tk_inner = document.getElementById('tk_inner');
	if(talkampfDate.getTime()-countdownDate.getTime() >= 0) {
		var count = Math.floor(talkampfDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		if(count<0) count=0;
		var seconds = count%60;
		count = Math.floor(count/60);
		var minutes = count%60;
		count = Math.floor(count/60);
		var hours = count%24;
		if(hours >=5) {
			tk_inner.setAttribute('class', 'green');
		} else if(hours >=2) {
			tk_inner.setAttribute('class', 'yellow');
		} else if(hours >=1) {
			tk_inner.setAttribute('class', 'orange');
		} else {
			tk_inner.setAttribute('class', 'red');
		}
		tk_inner.innerHTML = hours+':'+format2(minutes)+':'+format2(seconds);
	} else {
		tk_inner.setAttribute('class', 'green');
		tk_inner.innerHTML = 'TK läuft';
	}


// Stammkampf-Reminder
	var sk_inner = document.getElementById('sk_inner');
	if(GM_getValue("NextSK")) {
		if(GM_getValue("NextSK") != 'kein Kampf') {
			var stammkampfDate = new Date(Math.floor(GM_getValue("NextSK", "0").split(',')[0]));
			if(stammkampfDate.getTime()-countdownDate.getTime() >= 0) {
				var count = Math.floor(stammkampfDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
				if(count<0) count=0;
				var seconds = count%60;
				count = Math.floor(count/60);
				var minutes = count%60;
				count = Math.floor(count/60);
				var hours = count%24;
				var sk_inner = document.getElementById('sk_inner');
				if(hours >=5) {
					sk_inner.setAttribute('class', 'green');
				} else if(hours >=2) {
					sk_inner.setAttribute('class', 'yellow');
				} else if(hours >=1) {
					sk_inner.setAttribute('class', 'orange');
				} else {
					sk_inner.setAttribute('class', 'red');
				}
				sk_inner.innerHTML = hours+':'+format2(minutes)+':'+format2(seconds);
			} else if(stammkampfDate.getTime()-countdownDate.getTime() >= -3600000) { // == 1h
				sk_inner.setAttribute('class', 'green');
				sk_inner.innerHTML = 'SK läuft';
			} else {
				sk_inner.setAttribute('class', 'red');
				sk_inner.innerHTML = 'old data';
			}
		} else {
			sk_inner.setAttribute('class', 'yellow');
			sk_inner.innerHTML = 'kein Kampf';
		}
	} else {
		sk_inner.setAttribute('class', 'orange');
		sk_inner.innerHTML = 'no data';
	}


// Magierkampf-Reminder
	var mk_inner = document.getElementById('mk_inner');
	if(magierkampfDate.getTime()-countdownDate.getTime() >= 0) {
		var count = Math.floor(magierkampfDate.getTime()/1000)-Math.floor(countdownDate.getTime()/1000);
		if(count<0) count=0;
		var seconds = count%60;
		count = Math.floor(count/60);
		var minutes = count%60;
		count = Math.floor(count/60);
		var hours = count%24;
		count = Math.floor(count/24);
		hours = hours+24*count;
		if(hours >=5) {
			mk_inner.setAttribute('class', 'green');
		} else if(hours >=2) {
			mk_inner.setAttribute('class', 'yellow');
		} else if(hours >=1) {
			mk_inner.setAttribute('class', 'orange');
		} else {
			mk_inner.setAttribute('class', 'red');
		}
		mk_inner.innerHTML = hours+':'+format2(minutes)+':'+format2(seconds);
	} else {
		mk_inner.setAttribute('class', 'green');
		mk_inner.innerHTML = 'MK läuft';
	}


	setTimeout(countdown, 500);
}



function updateFriendStatus() {
	var freunde = document.getElementById('freunde').getElementsByTagName('a');
	for(var i=0; i<freunde.length; i++) {
		var userid = freunde[i].getAttribute('href').replace(/\D*/, '');
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/extern/userbildinformationen.php?userid="+userid,
			onload: function(response) {
				var id = response.finalUrl.replace(/\D*/, '');
				if(document.getElementById('freund_'+id)) {
					if(response.responseText.indexOf('Online') != -1) {
						document.getElementById('freund_'+id).setAttribute('class', 'menu green');
					} else {
						document.getElementById('freund_'+id).setAttribute('color', 'menu red');
					}
				}
			}
		});
	}
	setTimeout(updateFriendStatus, 60000);
}



function checkForNewMessage() {
	if(document.getElementById('neueNachricht').style.display == 'none') {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/statistik.php",
			onload: function(response) {
				if(response.responseText.indexOf('Du hast eine neue private Nachricht erhalten.') != -1) {
					document.getElementById('neueNachricht').style.display = 'block';
					if(GM_getValue("RemindNewMessage", false)) {
						GM_setValue("RemindNewMessage", false);
						var volume = parseFloat(GM_getValue("Assi_MessageSoundVolume", 100)/100);
						if(volume<0) volume=0;
						if(volume>1) volume=1;
						switch(GM_getValue("Assi_Messagesound", "")) {
							case 'SoundA':
								audioA.volume = volume;
								audioA.play();
								break;
							case 'SoundB':
								audioB.volume = volume;
								audioB.play();
								break;
							case 'SoundC':
								audioC.volume = volume;
								audioC.play();
								break;
							default:
								break;
						}
						if(GM_getValue("Assi_MessageReminder", false)) {
							alert('Du hast eine neue Nachricht erhalten!');
						}
					}
				}
			}
		});
	}
	setTimeout(checkForNewMessage, 10000);
}



function checkLandControl() {
	var landControlData = GM_getValue("LandControlData", "#").split('#');
	var landids = new Array();
	var landControlData2 = new Array();
	for(var i=1; i<landControlData.length-1; i++) {
		var temp = landControlData[i].split(',');
		landids.push(temp[0]);
		landControlData2[temp[0]] = new Object();
		landControlData2[temp[0]]["Holz"] = temp[1];
		landControlData2[temp[0]]["Stein"] = temp[2];
		landControlData2[temp[0]]["Kupfer"] = temp[3];
		landControlData2[temp[0]]["Zinn"] = temp[4];
	}
	for(var i=0; i<landids.length; i++) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://szs.looki.de/landinfo.php?id="+landids[i],
			onload: function(response) {
				var id = response.finalUrl.replace(/\D*/, '');
				response.responseText.search(/Holz:\s*(\d*)<br>\s*Stein:\s*(\d*)<br>\s*Kupfer:\s*(\d*)<br>\s*Zinn:\s*(\d*)<br>/);
				var holz = parseInt(RegExp.$1, 10);
				var stein = parseInt(RegExp.$2, 10);
				var kupfer = parseInt(RegExp.$3, 10);
				var zinn = parseInt(RegExp.$4, 10);
				if((landControlData2[id]["Holz"] != "" && holz <= landControlData2[id]["Holz"]) || (landControlData2[id]["Stein"] != "" && stein <= landControlData2[id]["Stein"]) || (landControlData2[id]["Kupfer"] != "" && kupfer <= landControlData2[id]["Kupfer"]) || (landControlData2[id]["Zinn"] != "" && zinn <= landControlData2[id]["Zinn"])) {
					if(document.getElementById('landControl')) document.getElementById('landControl').setAttribute('class', 'menu '+GM_getValue("LandControlColor", "red"));
				}
			}
		});
	}
}



function printCountdownZeit(count, spanId) {
	if(document.getElementById(spanId)) {
		if(count<0) count=0;
		var seconds = count%60;
		count = Math.floor(count/60);
		var minutes = count%60;
		count = Math.floor(count/60);
		var hours = count%24;
		count = Math.floor(count/24);
		var days = Math.floor(count);
		document.getElementById(spanId).setAttribute('style', 'color:lime');
		var restZeitString = '';
		if(days > 0) {
			 restZeitString = days+'T '+format2(hours)+':'+format2(minutes)+':'+format2(seconds)+' Std';
		} else if (hours > 0) {
			 restZeitString = hours+':'+format2(minutes)+':'+format2(seconds)+' Std';
		} else if (minutes > 0) {
			 restZeitString = minutes+':'+format2(seconds)+' Min';
			 document.getElementById(spanId).setAttribute('style','color:yellow');
		} else {
			 restZeitString = seconds+' Sek';
			 document.getElementById(spanId).setAttribute('style','color:red');
		}
		document.getElementById(spanId).innerHTML = restZeitString;
	}
}



function handleHotkey(e) {
	if(String(e.target).indexOf('[object HTMLBodyElement]') != -1) {
		var keyCode = e.keyCode ? e.keyCode : (e.charCode ? e.charCode : e.which);
		var hotkeyTime2 = (new Date).getTime();
		if(hotkey == '') {
			hotkeyTime = (new Date).getTime();
		}
		if(keyCode == 27 || hotkeyTime2-hotkeyTime > parseInt(GM_getValue("Assi_HotkeyTimeout", "500"), 10)) {
			hotkey = '';
		} else {
			hotkey += keyCodeToChar(keyCode);
			if(hotkey != '') {
				var url = '';
				for(var i=0; i<hotkeys.length; i++) {
					if(hotkey == hotkeys[i][2] && e.altKey == false && e.ctrlKey == false && e.shiftKey == false) {
						url = hotkeys[i][1];
						break;
					}
				}
				if(url.indexOf('http://szs.looki.de/wasser.php') == 0 && main.innerHTML.indexOf('<a class="menu" href="wasser2.php">Wasser suchen</a>') != -1) {
					url = 'http://szs.looki.de/wasser2.php';
				} else if(url.indexOf('http://szs.looki.de/stamm.php?do=kampfsuche') == 0 && main.innerHTML.indexOf('<a class="menu" href="stamm.php?do=kampfuserauswahl">Stammkampf</a>') != -1) {
					url = 'http://szs.looki.de/stamm.php?do=kampfuserauswahl';
				}
				if(url != '') window.location.href = url;
			}
		}
	}
}



function keyCodeToChar(key) {
	var i, keys, c;
	if(key>=48 && key<=57) {
		i = 48;
		keys = '0123456789';
		c = keys.charAt(key-i);
	} else if(key>=96 && key<=105) {
		i = 96;
		keys = '0123456789';
		c = keys.charAt(key-i);
	} else if(key>=65 && key<=90) {
		i = 65;
		keys = 'abcdefghijklmnopqrstuvwxyz';
		c = keys.charAt(key-i);
	} else {
		switch(key) {
		case 37:
			c = 'LEFT';
			break;
		case 38:
			c = 'UP';
			break;
		case 39:
			c = 'RIGHT';
			break;
		case 40:
			c = 'DOWN';
			break;
		case 60:
			c = '<';
		case 160:
			c = '^';
			break;
		case 163:
			c = '#';
			break;
		case 171:
			c = '+';
			break;
		case 173:
			c = '-';
			break;
		case 188:
			c = ',';
			break;
		case 190:
			c = '.';
			break;
		default:
			c = ''; // ehem. false
			break;
		}
	}
	return c;
}



function pageUpdate() {
	var sp = (GM_getValue("Assi_Notizen", false))? 0 : window.innerWidth/2-390;
	if(document.getElementById('serverzeit'))
		document.getElementById('serverzeit').setAttribute('style', 'left: '+(sp+300)+'px');
	if(document.getElementById('reminder'))
		document.getElementById('reminder').setAttribute('style', 'left: '+(sp+550)+'px');
	if(document.getElementById('weather'))
		document.getElementById('weather').setAttribute('style', 'left: '+(sp+730)+'px');
	if(document.getElementById('notice'))
		document.getElementById('notice').setAttribute('style', 'height: '+(window.innerHeight-document.getElementById('notice').offsetTop-25)+'px');
	if(document.getElementById('configLayer')) {
		if(document.getElementById('configLayer').getAttribute('style') && document.getElementById('configLayer').getAttribute('style').indexOf('display: block') != -1) {
			document.getElementById('configLayer').setAttribute('style', 'display: block; left: '+(sp+160)+'px; height: '+(window.innerHeight-120)+'px');
		} else {
			document.getElementById('configLayer').setAttribute('style', 'display: none; left: '+(sp+160)+'px; height: '+(window.innerHeight-120)+'px');
		}
	}
	if(document.getElementById('config-content'))
		document.getElementById('config-content').setAttribute('style', 'height: '+(window.innerHeight-120-75)+'px');
}



function addDataForSKresult(username, id) {
	username = username.trim();
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://szs.looki.de/userinfo.php",
		data: "userdatenname="+escape(username),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		onload: function(response) {
			var anfang = response.responseText.indexOf('Stamm:');
			var ende = response.responseText.indexOf('Erfahrung:');
			if(anfang != -1 && ende != -1) {
				var html = response.responseText.slice(anfang, ende);
				html.search(/<a href="stamminfo.php\?stammid=\d+">(.+)<\/a>/);
				var stamm = RegExp.$1.trim();
				if(typeof stammname[id][stamm] == 'undefined') {
					stammname[id].push(stamm);
					stammname[id][stamm] = 1;
				} else {
					stammname[id][stamm]++;
				}
				anfang = response.responseText.indexOf('Erfahrung:');
				ende = response.responseText.indexOf('Alter (im Spiel):');
				html = response.responseText.slice(anfang, ende);
				html.search(/<td>\s*(\d*)\s*<\/td>/);
				var ep = parseInt(RegExp.$1, 10);
				if(ep < 0 || isNaN(ep)) ep = 0;
				gesamtEP[id] += ep;
				counterGesamtEP[id]--;
				if(counterGesamtEP[id] == 0 && document.getElementById('ep_'+id) && document.getElementById('stamm_'+id)) {
					document.getElementById('ep_'+id).innerHTML = number_format(gesamtEP[id]);
					// Sortiere Stammnamen
					if(stammname[id].length > 1) {
						for(var i=0; i<stammname[id].length; i++) {
							for(var j=i+1; j<stammname[id].length; j++) {
								if(stammname[id][stammname[id][i]] < stammname[id][stammname[id][j]]) {
									var z = stammname[id][i];
									stammname[id][i] = stammname[id][j];
									stammname[id][j] = z;
								}
							}
						}
					}
					document.getElementById('stamm_'+id).innerHTML = stammname[id][0];
				}
			} else {
				var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
				var ende = response.responseText.indexOf('<!-- INHALT ENDE -->');
				var html = response.responseText.slice(anfang, ende);
				if(html.indexOf('Diesen Steinzeitmenschen habe ich nicht gefunden.') == -1) {
					html.search(new RegExp('href=userinfo.php\\?userinfo=(\\d+)>'+username+'<\\/a>'));
					var userid = parseInt(RegExp.$1, 10);
					addDataForSKresult2(userid, id);
				} else {
					// Steinzeitmensch konnte nicht gefunden werden
					counterGesamtEP[id]--;
					
				}
			}
		}
	});
}

function addDataForSKresult2(userid, id) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://szs.looki.de/userinfo.php?userinfo="+userid,
		onload: function(response) {
			var anfang = response.responseText.indexOf('Stamm:');
			var ende = response.responseText.indexOf('Erfahrung:');
			var html = response.responseText.slice(anfang, ende);
			html.search(/<a href="stamminfo.php\?stammid=\d+">(.+)<\/a>/);
			var stamm = RegExp.$1.trim();
			if(typeof stammname[id][stamm] == 'undefined') {
				stammname[id].push(stamm);
				stammname[id][stamm] = 1;
			} else {
				stammname[id][stamm]++;
			}
			anfang = response.responseText.indexOf('Erfahrung:');
			ende = response.responseText.indexOf('Alter (im Spiel):');
			html = response.responseText.slice(anfang, ende);
			html.search(/<td>\s*(\d*)\s*<\/td>/);
			var ep = parseInt(RegExp.$1, 10);
			if(ep < 0 || isNaN(ep)) ep = 0;
			gesamtEP[id] += ep;
			counterGesamtEP[id]--;
			if(counterGesamtEP[id] == 0 && document.getElementById('ep_'+id) && document.getElementById('stamm_'+id)) {
				document.getElementById('ep_'+id).innerHTML = number_format(gesamtEP[id]);
				// Sortiere Stammnamen
				if(stammname[id].length > 1) {
					for(var i=0; i<stammname[id].length; i++) {
						for(var j=i+1; j<stammname[id].length; j++) {
							if(stammname[id][stammname[id][i]] < stammname[id][stammname[id][j]]) {
								var z = stammname[id][i];
								stammname[id][i] = stammname[id][j];
								stammname[id][j] = z;
							}
						}
					}
				}
				document.getElementById('stamm_'+id).innerHTML = stammname[id][0];
			}
		}
	});
}



function getClanEPByClanId(clanid, id) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://szs.looki.de/extern/memberstamm.php?stammid="+clanid,
		onload: function(response) {
			var anfang = response.responseText.indexOf('("');
			var html = response.responseText.slice(anfang);
			var users = html.split('document.write');
			var gesamtEP = 0;
			for(var i=1; i<users.length-1; i++) {
				users[i].search(/ffffff\s>(\d*)<\/font>/);
				var ep = parseInt(RegExp.$1, 10);
				if(ep < 0 || isNaN(ep)) ep = 0;
				gesamtEP += ep;
			}
			if(document.getElementById(id)) document.getElementById(id).innerHTML = number_format(gesamtEP);
		}
	});
}



function addLinksToLogbuch(username, id) {
	username = username.trim();
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://szs.looki.de/userinfo.php",
		data: "userdatenname="+escape(username),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		onload: function(response) {
			var anfang = response.responseText.indexOf('ID:');
			var ende = response.responseText.indexOf('Username:');
			if(anfang != -1 && ende != -1) {
				html = response.responseText.slice(anfang, ende);
				html.search(/<td>\s*(\d*)\s*<\/td>/);
				var userid = parseInt(RegExp.$1, 10);
			} else {
				var anfang = response.responseText.indexOf('<!-- INHALT ANFANG -->');
				var ende = response.responseText.indexOf('<!-- INHALT ENDE -->');
				var html = response.responseText.slice(anfang, ende);
				if(html.indexOf('Diesen Steinzeitmenschen habe ich nicht gefunden.') == -1) {
					html.search(new RegExp('href=userinfo.php\\?userinfo=(\\d+)>'+username+'<\\/a>'));
					var userid = parseInt(RegExp.$1, 10);
				} else {
					var userid = 0;
				}
			}
			if(userid > 0 && document.getElementById(id)) {
				if(id.indexOf('tk') == 0) {
					document.getElementById(id).innerHTML = '<a href="userinfo.php?userinfo='+userid+'">'+htmlspecialchars(username)+'</a>';
				} else if(id.indexOf('res') == 0 || id.indexOf('pn') == 0 || id.indexOf('markt') == 0) {
					document.getElementById(id).innerHTML = '<a href="userinfo.php?userinfo='+userid+'">'+htmlspecialchars(username)+'</a>';
					document.getElementById(id+'-2').innerHTML = '<a href="message.php?empf='+userid+'">Nachricht</a><br><a href="uebertragen.php?anrohstoffe='+htmlspecialchars(username)+'">Übertragen</a>';
				}
			}
		}
	});
}



function number_format(number, laenge, sep, th_sep, fix) {
/*
	out: String
	in:	number as float
			laenge as integer (optional)
			sep as String (optional)
			th_sep as String (optional)
			fix as boolean (optional)
*/
	if(!laenge) laenge = 0;
	if(!sep) sep = ',';
	if(!th_sep) th_sep = '.';
	number = Math.round(number*Math.pow(10, laenge))/Math.pow(10, laenge);
	str_number = number+'';
	arr_int = str_number.split('.');
	if(!arr_int[0]) arr_int[0] = '0';
	if(!arr_int[1]) arr_int[1] = '';
	if(arr_int[1].length < laenge && fix) {
		nachkomma = arr_int[1];
		for(var i=arr_int[1].length+1; i<=laenge; i++) {
			nachkomma += '0';
		}
		arr_int[1] = nachkomma;
	}
	if(th_sep != '' && arr_int[0].length > 3) {
		Begriff = arr_int[0];
		arr_int[0] = '';
		for(var j=3; j<Begriff.length; j+=3) {
			extrakt = Begriff.slice(Begriff.length-j, Begriff.length-j+3);
			arr_int[0] = th_sep+extrakt+arr_int[0]+'';
		}
		str_first = Begriff.substr(0, (Begriff.length%3 == 0)? 3 : (Begriff.length%3));
		arr_int[0] = str_first+arr_int[0];
	}
	return arr_int[0]+((arr_int[1].length>0)? sep : '')+arr_int[1];
}



function format2(n) {
	if(n<10) n = '0'+n;
	return n.toString();
}



function isSommerzeit(d) {
	return (((new Date(1).getTimezoneOffset()) != (d.getTimezoneOffset()))? true : false);
}



function getURLParameter(name) {
	if(location.search) {
		var params = location.search.substring(1).split('&');
		for(var i=0; i<params.length; i++) {
			var param = params[i].split('=');
			if(param[0] == name) {
				return param[1];
			}
		}
		return null;
	} else {
		return null;
	}
}



function htmlspecialchars(str) {
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}



function hashCode(str) {
	var hash = 0, chr;
	str += '';
	if(str.length == 0) return hash;
	for(var i=0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}



function getRadioValue(rObj) {
	for(var i=0; i<rObj.length; i++) {
		if(rObj[i].checked)
			return rObj[i].value;
	}
	return false;
}



function saveConfig() {
	GM_setValue("Assi_UserName", document.getElementsByName('Assi_UserName')[0].value.trim());
	GM_setValue("Assi_StammName", document.getElementsByName('Assi_StammName')[0].value.trim());
	GM_setValue("Assi_Infoanzeigen", getRadioValue(document.getElementsByName('Assi_Infoanzeigen')));
	GM_setValue("Assi_FreundeSortierung", document.getElementsByName('Assi_FreundeSortierung')[0].checked);
	GM_setValue("Assi_Notizen", document.getElementsByName('Assi_Notizen')[0].checked);
	GM_setValue("Assi_HotkeyTimeout", document.getElementsByName('Assi_HotkeyTimeout')[0].value.trim());
	GM_setValue("Assi_InventarIMGheight", document.getElementsByName('Assi_InventarIMGheight')[0].value.trim());
	GM_setValue("Assi_Lagerauszahlungen", getRadioValue(document.getElementsByName('Assi_Lagerauszahlungen')));
	GM_setValue("Assi_LagerauszahlungenNicks", document.getElementsByName('Assi_LagerauszahlungenNicks')[0].value.trim().replace(/\s?,\s?/g, ','));
	GM_setValue("Assi_MenuUhrzeit", document.getElementsByName('Assi_MenuUhrzeit')[0].checked);
	GM_setValue("Assi_MenuSKZeit", document.getElementsByName('Assi_MenuSKZeit')[0].checked);
	GM_setValue("Assi_MenuVersionTip", document.getElementsByName('Assi_MenuVersionTip')[0].checked);
	GM_setValue("Assi_ActivityReminder", document.getElementsByName('Assi_ActivityReminder')[0].checked);
	GM_setValue("Assi_Remindersound", getRadioValue(document.getElementsByName('Assi_Remindersound')));
	GM_setValue("Assi_ReminderSoundVolume", document.getElementsByName('Assi_ReminderSoundVolume')[0].value.trim());
	GM_setValue("Assi_Standardtaetigkeit", getRadioValue(document.getElementsByName('Assi_Standardtaetigkeit')));
	GM_setValue("Assi_MessageReminder", document.getElementsByName('Assi_MessageReminder')[0].checked);
	GM_setValue("Assi_Messagesound", getRadioValue(document.getElementsByName('Assi_Messagesound')));
	GM_setValue("Assi_MessageSoundVolume", document.getElementsByName('Assi_MessageSoundVolume')[0].value.trim());
	GM_setValue("Assi_WaffenWerkzeugWarnung", document.getElementsByName('Assi_WaffenWerkzeugWarnung')[0].checked);
	GM_setValue("Assi_Gaestebucheintrag", document.getElementsByName('Assi_Gaestebucheintrag')[0].checked);
	GM_setValue("Assi_Kraft", document.getElementsByName('Assi_Kraft')[0].value.trim());
	GM_setValue("Assi_Intelligenz", document.getElementsByName('Assi_Intelligenz')[0].value.trim());
	GM_setValue("Assi_Geschwindigkeit", document.getElementsByName('Assi_Geschwindigkeit')[0].value.trim());
	GM_setValue("Assi_List", document.getElementsByName('Assi_List')[0].value.trim());
	GM_setValue("Assi_Ausdauer", document.getElementsByName('Assi_Ausdauer')[0].value.trim());
	GM_setValue("Assi_Geschick", document.getElementsByName('Assi_Geschick')[0].value.trim());
	GM_setValue("Assi_NahrungRest", document.getElementsByName('Assi_NahrungRest')[0].value.trim());
	GM_setValue("Assi_GoldRest", document.getElementsByName('Assi_GoldRest')[0].value.trim());
	GM_setValue("Assi_HolzRest", document.getElementsByName('Assi_HolzRest')[0].value.trim());
	GM_setValue("Assi_SteinRest", document.getElementsByName('Assi_SteinRest')[0].value.trim());
	GM_setValue("Assi_NahrungRund", document.getElementsByName('Assi_NahrungRund')[0].value.trim());
	GM_setValue("Assi_GoldRund", document.getElementsByName('Assi_GoldRund')[0].value.trim());
	GM_setValue("Assi_HolzPreis", document.getElementsByName('Assi_HolzPreis')[0].value.trim());
	GM_setValue("Assi_SteinPreis", document.getElementsByName('Assi_SteinPreis')[0].value.trim());
	GM_setValue("Assi_MarktWasserPreis", document.getElementsByName('Assi_MarktWasserPreis')[0].value.trim());
	GM_setValue("Assi_MarktHolzPreis", document.getElementsByName('Assi_MarktHolzPreis')[0].value.trim());
	GM_setValue("Assi_MarktSteinPreis", document.getElementsByName('Assi_MarktSteinPreis')[0].value.trim());
	GM_setValue("Assi_MarktKohlePreis", document.getElementsByName('Assi_MarktKohlePreis')[0].value.trim());
	GM_setValue("Assi_MarktKupferPreis", document.getElementsByName('Assi_MarktKupferPreis')[0].value.trim());
	GM_setValue("Assi_MarktZinnPreis", document.getElementsByName('Assi_MarktZinnPreis')[0].value.trim());
	GM_setValue("Assi_MarktBronzePreis", document.getElementsByName('Assi_MarktBronzePreis')[0].value.trim());
	GM_setValue("Assi_MarktWasserverkaufsmenge", document.getElementsByName('Assi_MarktWasserverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktHolzverkaufsmenge", document.getElementsByName('Assi_MarktHolzverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktSteinverkaufsmenge", document.getElementsByName('Assi_MarktSteinverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktKohleverkaufsmenge", document.getElementsByName('Assi_MarktKohleverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktKupferverkaufsmenge", document.getElementsByName('Assi_MarktKupferverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktZinnverkaufsmenge", document.getElementsByName('Assi_MarktZinnverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktBronzeverkaufsmenge", document.getElementsByName('Assi_MarktBronzeverkaufsmenge')[0].value.trim());
	GM_setValue("Assi_MarktWasserverkaufspreis", document.getElementsByName('Assi_MarktWasserverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktHolzverkaufspreis", document.getElementsByName('Assi_MarktHolzverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktSteinverkaufspreis", document.getElementsByName('Assi_MarktSteinverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktKohleverkaufspreis", document.getElementsByName('Assi_MarktKohleverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktKupferverkaufspreis", document.getElementsByName('Assi_MarktKupferverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktZinnverkaufspreis", document.getElementsByName('Assi_MarktZinnverkaufspreis')[0].value.trim());
	GM_setValue("Assi_MarktBronzeverkaufspreis", document.getElementsByName('Assi_MarktBronzeverkaufspreis')[0].value.trim());
	var strHotkeys = '';
	for(var i=0; i<hotkeys.length; i++) {
		strHotkeys += document.getElementsByName('Assi_Hotkeys['+i+']')[0].value.trim()+'|';
	}
	GM_setValue("Assi_Hotkeys", strHotkeys);
	alert('Einstellungen gespeichert!\n\nSeite neu laden, damit Änderungen wirksam werden.');
}



function resetConfig() {
	var really = confirm('Es werden alle Einstellungen zurückgesetzt/gelöscht!');
	if(really) {
		GM_deleteValue("Assi_UserName");
		GM_deleteValue("Assi_StammName");
		GM_deleteValue("Assi_Infoanzeigen");
		GM_deleteValue("Assi_FreundeSortierung");
		GM_deleteValue("Assi_Notizen");
		GM_deleteValue("Assi_HotkeyTimeout");
		GM_deleteValue("Assi_InventarIMGheight");
		GM_deleteValue("Assi_Lagerauszahlungen");
		GM_deleteValue("Assi_LagerauszahlungenNicks");
		GM_deleteValue("Assi_MenuUhrzeit");
		GM_deleteValue("Assi_MenuSKZeit");
		GM_deleteValue("Assi_MenuVersionTip");
		GM_deleteValue("Assi_ActivityReminder");
		GM_deleteValue("Assi_Remindersound");
		GM_deleteValue("Assi_ReminderSoundVolume");
		GM_deleteValue("Assi_Standardtaetigkeit");
		GM_deleteValue("Assi_MessageReminder");
		GM_deleteValue("Assi_Messagesound");
		GM_deleteValue("Assi_MessageSoundVolume");
		GM_deleteValue("Assi_WaffenWerkzeugWarnung");
		GM_deleteValue("Assi_Gaestebucheintrag");
		GM_deleteValue("Assi_Kraft");
		GM_deleteValue("Assi_Intelligenz");
		GM_deleteValue("Assi_Geschwindigkeit");
		GM_deleteValue("Assi_List");
		GM_deleteValue("Assi_Ausdauer");
		GM_deleteValue("Assi_Geschick");
		GM_deleteValue("Assi_NahrungRest");
		GM_deleteValue("Assi_GoldRest");
		GM_deleteValue("Assi_HolzRest");
		GM_deleteValue("Assi_SteinRest");
		GM_deleteValue("Assi_NahrungRund");
		GM_deleteValue("Assi_GoldRund");
		GM_deleteValue("Assi_HolzPreis");
		GM_deleteValue("Assi_SteinPreis");
		GM_deleteValue("Assi_MarktWasserPreis");
		GM_deleteValue("Assi_MarktHolzPreis");
		GM_deleteValue("Assi_MarktSteinPreis");
		GM_deleteValue("Assi_MarktKohlePreis");
		GM_deleteValue("Assi_MarktKupferPreis");
		GM_deleteValue("Assi_MarktZinnPreis");
		GM_deleteValue("Assi_MarktBronzePreis");
		GM_deleteValue("Assi_Hotkeys");
		GM_deleteValue("Assi_MarktWasserverkaufsmenge");
		GM_deleteValue("Assi_MarktHolzverkaufsmenge");
		GM_deleteValue("Assi_MarktSteinverkaufsmenge");
		GM_deleteValue("Assi_MarktKohleverkaufsmenge");
		GM_deleteValue("Assi_MarktKupferverkaufsmenge");
		GM_deleteValue("Assi_MarktZinnverkaufsmenge");
		GM_deleteValue("Assi_MarktBronzeverkaufsmenge");
		GM_deleteValue("Assi_MarktWasserverkaufspreis");
		GM_deleteValue("Assi_MarktHolzverkaufspreis");
		GM_deleteValue("Assi_MarktSteinverkaufspreis");
		GM_deleteValue("Assi_MarktKohleverkaufspreis");
		GM_deleteValue("Assi_MarktKupferverkaufspreis");
		GM_deleteValue("Assi_MarktZinnverkaufspreis");
		GM_deleteValue("Assi_MarktBronzeverkaufspreis");
	}
}



function deleteAllData() {
	var really = confirm('Es werden ALLE Daten des SZS-Assistenten gelöscht!\n- Einstellungen\n- Notizen\n- Forendaten\n- Landüberwachung');
	if(really) {
		var keys = GM_listValues();
		for(var i=0; i<key.length(); i++) {
			GM_deleteValue(keys[i]);
		}
	}
}



function saveLandControlConfig() {
	var laender = document.getElementById('configLandControl').getElementsByTagName('tr');
	var laender_str = '#';
	for(var i=1; i<laender.length; i++) {
		var landid = laender[i].getElementsByTagName('a')[0].innerHTML;
		var holz = parseInt(laender[i].getElementsByTagName('input')[0].value, 10);
		if(holz < 0 || isNaN(holz)) holz = "";
		var stein = parseInt(laender[i].getElementsByTagName('input')[1].value, 10);
		if(stein < 0 || isNaN(stein)) stein = "";
		var kupfer = parseInt(laender[i].getElementsByTagName('input')[2].value, 10);
		if(kupfer < 0 || isNaN(kupfer)) kupfer = "";
		var zinn = parseInt(laender[i].getElementsByTagName('input')[3].value, 10);
		if(zinn < 0 || isNaN(zinn)) zinn = "";
		if(holz != "" || stein != "" || kupfer != "" || zinn != "") {
			laender_str += landid+','+holz+','+stein+','+kupfer+','+zinn+'#';
		}
	}
	GM_setValue("LandControlData", laender_str);
	GM_setValue("LandControlColor", getRadioValue(document.getElementsByName('configLandControlColor')));
}