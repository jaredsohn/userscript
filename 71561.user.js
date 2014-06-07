// ==UserScript==
// @name			lachschon.de widescreen
// @namespace		http://www.lachschon.de/
// @description		Optimierung von lachschon.de für eine Auflösung ab 1680px
// @include			http://www.lachschon.de/*
// @exclude			http://www.lachschon.de/community/*
// @author			Floppy
// @version			0.1.5
// ==/UserScript==

// Info fürOpera-User:
// Dieses Script in einen beliebigen Ordner kopieren, und diesen im Opera unter "Einstellungen... / Erweitert / Inhalte / JavaScript-Optionen... / User-JavaScript-Verzeichnis" angeben.


// Das Skript wird nur bei einer Auflösung >= 1680 aktiv
if ((screen.width) >= 1680) {

// Greasemonkey Benutzereinstellungen
if (navigator.userAgent.indexOf("Opera") == -1) {
	var stretch_images = GM_getValue('stretch_images',true);

	GM_registerMenuCommand("Bilderzoom an/aus", function() { 
		if (GM_getValue('stretch_images',true) == true)	{
			GM_setValue('stretch_images',false); 
			alert('Bilderzoom deaktiviert.\r\nBitte Seite neu laden.');
		}
		else {
			GM_setValue('stretch_images',true);
			alert('Bilderzoom aktiviert.\r\nBitte Seite neu laden.'); 
		}
	});
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// Funktion zum Ersetzen des Regel-Popups beim Schreiben in das Kommentarfeld
function removeToggleNotice() {

	// Prüft, ob das Kommentarfeld überhaupt vorhanden ist, und bricht andernfalls ab. Ebenso auf den Communityseiten (Gästebuch etc.).
	rulesOrgField = document.getElementById("id_comment");
	var splitURL = document.URL.split("user");
	var splitURLForum = document.URL.split("forum");
	if ( (!rulesOrgField) || (splitURL[1]) || (splitURLForum[1])) { return; }

	// Erzeugen des neuen Regelhinweises
	var rulesDiv = document.createElement("div");
	var rulesHeading = document.createElement("div");
	var rulesHeadingText = document.createTextNode("Regeln");
	var rulesText = document.createTextNode("Kommentare zur Reihenfolge der Kommentare führen zur Sperrung, es sei denn, man hat den ersten Kommentar gepostet. Kommentare können bis zu 5 Minuten lang bearbeitet werden. Ein Kommentar darf höchstens ein [img]-Tag enthalten. Ein Kommentar darf maximal 20 Smilies enthalten.");

	// Zuweisen einer CSS ID, um den neuen Regelhinweis per CSS ansprechen zu können
	rulesDiv.setAttribute("id","rulesDiv");
	rulesHeading.setAttribute("id","rulesHeading");

	// Einfügen des neuen Regelhinweises in die HTML Seite
	document.getElementsByTagName("fieldset")[1].appendChild(rulesDiv);
	document.getElementById("rulesDiv").appendChild(rulesHeading);
	document.getElementById("rulesHeading").appendChild(rulesHeadingText);
	document.getElementById("rulesDiv").appendChild(rulesText);

	// Verhindern, dass das alte Regel-Popup aufgerufen wird
	addGlobalStyle('#comment_notice { display:none ! important; }');
}

// Ausführen der Regel-Ersetzungsfunktion
removeToggleNotice();


// Image-ID aus der URL holen, damit das Haupt-Bild per getElementByID angesprochen werden kann
function getImageID() {
	var splitURL = document.URL.split("item/");
	if (splitURL[1] != null) {
		var splitURLID = splitURL[1].split("-");
		return splitURLID[0];
	}
	else return 0;
}
// Ausführen:
imageID = getImageID();

// Wird auf jeder Seite benötigt
addGlobalStyle('body { margin: 0 !important; padding: 0 !important; position:relative !important; top:0px !important; left:0 !important;}'); 
addGlobalStyle('#page { width:1470px ! important; margin: 0 !important; padding: 0 !important; position:absolute !important; top:0px !important; left:0px !important;}');  // Breite der gesamten Seite
addGlobalStyle('#main_content { width:1208px ! important; padding-top:0px; }');  // Breite der Galerie
addGlobalStyle('#sidebar { margin-left:1232px ! important; }');  // Abstand der Sidebar zum linken Bildrand
// addGlobalStyle('#skyskraper { margin-left:610px ! important; margin-top:115px ! important; }');  // Oberer Abstand der rechts hochkant stehenden Werbung
addGlobalStyle('#skyskraper { margin-left:610px ! important; margin-top:115px ! important; display: none ! important; }');  // Oberer Abstand der rechts hochkant stehenden Werbung

// Startseite, Tags-Seite
addGlobalStyle('div#tags { width:1180px ! important; }');  // Breite der Tag-Cloud auf der Startseite


// Kommentare (Bilder, Videos, Witze und Gaestebuch)
addGlobalStyle('h1 {margin-bottom:0px;}');  // Schafft noch ein bisschen Platz zwischen Bild und Seitenheader
if (!(document.getElementById("guestbook"))) {
	addGlobalStyle('ul#comments { width:540px ! important; float:right ! important; }');  // Breite der einzelnen Kommentare
	addGlobalStyle('#comments { width:540px; float:right; padding:0px; margin-right:55px;}');  //  Breite und Position der Kommentare
}
addGlobalStyle('h3 { width:540px; display:inline-block !important; float:left !important; clear:none !important; margin-left:14px; }');  // Überschrift "Kommentar" positionieren
addGlobalStyle('span#comment { width:550px; display:inline-block; padding-bottom:0.5em; border-bottom:1px solid lightgrey; margin-left:14px; }');  // Bildkommentar positionieren
addGlobalStyle('h3#comment { width:530px; display:inline-block; padding-bottom:0.1em; border:0px; margin-left:15px; }');  // Überschrift "Kommentar schreiben" positionieren

// Breite des Containers, in dem der Kommentar geschrieben wird
document.getElementsByTagName("fieldset")[1].style.width = "560px";
document.getElementsByTagName("fieldset")[1].style.cssFloat = "left";
document.getElementsByTagName("fieldset")[1].style.marginLeft = "15px";
// addGlobalStyle('fieldset { float:left; width:560px; }');  // Breite des Containers, in dem der Kommentar geschrieben wird

addGlobalStyle('.pageselection { width:600px; display:inline-block; }');
addGlobalStyle('#comment { width:590px; display:inline-block; padding-bottom:0.5em; border-bottom:1px solid lightgrey; }');  // Bildkommentar positionieren


addGlobalStyle('#rulesDiv { width:500px ! important; padding-top:0.5em; color:#aaaaaa; }');  // Breite der Regeln unter dem Kommentarfeld
addGlobalStyle('#rulesHeading { padding-top:0.5em; font-weight:bold; padding-bottom:0.5em; color:#aaaaaa; }');  // Regelüberschrift unter dem Kommentarfeld


// Forum
addGlobalStyle('#forum-list { width:70% ! important; }');  // Breite der Foren-Uebersicht
addGlobalStyle('#thread-list { width:70% ! important; }');  // Breite der Themen eines Boards
addGlobalStyle('#post-list { width:70% ! important; }');  // Breite der Beitrags-Posts
addGlobalStyle('.bbcode-buttons { width:900px ! important; float:left; }');  // BBCode-Buttons positionieren


// Bilderseiten
// Nur, falls der Browser nicht Opera ist
if (navigator.userAgent.indexOf("Opera") == -1) {
	if (GM_getValue('stretch_images',true) == true)	{
		addGlobalStyle('#item' + imageID + ' { width:600px; float:left; padding-bottom:10px; padding-top:18px; padding-right:0px; }');  // Bild kann rechts von den Kommentaren umflossen werden
	}
	else {
		addGlobalStyle('#item' + imageID + ' { max-width:600px; float:left; padding-bottom:10px; padding-top:18px; padding-right:0px; }');  // Bild kann rechts von den Kommentaren umflossen werden
	}
}
// Für Opera
else {
	addGlobalStyle('#item' + imageID + ' { width:600px; float:left; padding-bottom:10px; padding-top:18px; padding-right:25px; }');  // Bild kann rechts von den Kommentaren umflossen werden
}

// Witzeseiten
addGlobalStyle('div.joke { width:600px; float:left; padding-bottom:10px; padding-top:18px; margin-right:10px; }');  // Witztext kann rechts von den Kommentaren umflossen werden


// Videoseiten
addGlobalStyle('#item-video { width:586px; float:left; padding-bottom:10px; padding-top:18px; padding-right:25px; }');  // Video kann rechts von den Kommentaren umflossen werden

// Userseiten
/*
addGlobalStyle('#infobar { width:600px; float:left; padding-right:25px; }');  // Unserinfo kann rechts von den Kommentaren umflossen werden
addGlobalStyle('h3 { width:570px; display:inline-block; padding-bottom:0.1em; border:0px; }');  // Überschriften können rechts von den Kommentaren umflossen werden
addGlobalStyle('#guestbook { width: 550px; float: right; }');  //  Breite der Kommentare
*/

}