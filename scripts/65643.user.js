// Schneller Login für uni-klu Website | uni-klu fast login
// version 1
// 2010-01-03
// Thomas Hainscho
//
// --------------------------------------------------------------------
//
//// ==UserScript==
// @name           uni-klu schneller login
// @author         Thomas Hainscho
// @description	   Fügt das Login-Formular für alle Seiten hinzu, fügt Moodle-Link auf Startseite ein und entfernt die blaue Leiste über dem Bannerbild | Adds login form and a few link to the website of Klagenfurt university
// @include        http://uni-klu.ac.at/*
// ==/UserScript==


//Suche nach dem oberen mittleren div
//Ausschalten der blauen Navigationsleiste
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='LayerHeaderImage']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	if (thisDiv.getElementsByTagName("ul")[0]) { //Wenn es die Leiste gibt
		thisDiv.getElementsByTagName("ul")[0].style.display = 'none';
	}
}


//Suche nach dem oberen rechten div
//Hinzufügen der Loginfelder
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='LayerHeaderRight']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var loginformualar = document.createElement("div");
loginformualar.innerHTML = '<form action="https://sso.uni-klu.ac.at/cas/login" method="post" name="loginform" style="padding-left:1em; padding-top:25px; padding-bottom:5px;"><input type="hidden" name="service" value="https://campus.uni-klu.ac.at/j_spring_cas_security_check"/><input name="username" class="formfeld" id="username" value="" size="16" type="text" style="margin-right:4px; margin-bottom:3px;"><label for="username"></label>Username<input name="password" class="formfeld" id="password" value="" size="16" type="password" style="margin-right:4px; margin-bottom:3px;"><label for="password"></label>Passwort<br /><div style="margin-top:3px;"><input type="submit" value="Login" class="loginSubmit" name="login" id="login_link"/> <a href="https://www.uni-klu.ac.at/webmail/" id="webmail_link">Webmail</a></div></form>';
	
addGlobalStyle('#webmail_link { text-decoration:none; color:#000000; }');
addGlobalStyle('#webmail_link:hover { color:#ffffff; }');
addGlobalStyle('#login_link { background-color:#0f1f6a; color:white; border:1px solid #000000; font-size:0.9em; padding:2px 0px; width:35px; margin-right:4px }');
addGlobalStyle('#login_link:hover { border-color:#ffffff; }');

for (var i = 0; i < allDivs.snapshotLength; i++) {
	
	thisDiv = allDivs.snapshotItem(i);
		
	//Schaltet das Logo aus
	thisDiv.getElementsByTagName("a")[0].style.display = 'none';
	
	//Richtet den Abstand nach oben ein
	thisDiv.getElementsByTagName("ul")[0].style.paddingTop = '1em';
	
	//Schaltet den Intranet-Link auf unsichtbar
	thisDiv.getElementsByTagName("li")[0].style.display = 'none';
	webmail = thisDiv.getElementsByTagName("li")[1];
	thisDiv.getElementsByTagName("li")[1].style.display = 'none';
	
	//Fügt das Loginformular hinzu
	thisDiv.getElementsByTagName("ul")[0].insertBefore(loginformualar, thisDiv.getElementsByTagName("ul")[0].firstChild);
	
	//Abstand bei der Suche
	//thisDiv.getElementsByTagName("div")[0].style.paddingBottom = '-4px';
	thisDiv.getElementsByTagName("div")[2].style.paddingTop = '7px';
	thisDiv.getElementsByTagName("h1")[0].style.paddingLeft = '1em';

}

//Suche nach dem unteren rechten div
//Hinzufügen von Moodle-Link
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='LayerSiteRight']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
var moodlelink = document.createElement("li");
moodlelink.innerHTML = '<a href="https://elearning.uni-klu.ac.at/moodle/" class="link">Moodle</a>';
	
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	if (thisDiv.getElementsByTagName("ul")[1]) {
		//Fügt den Moodle-Link hinzu
		thisDiv.getElementsByTagName("ul")[1].insertBefore(moodlelink, thisDiv.getElementsByTagName("ul")[1].firstChild);
	}
}


//Hinzufügen Uni-Logo (Link auf die Startseite)
var bildlink = document.createElement("div");
bildlink.innerHTML = '<a href="http://www.uni-klu.ac.at"><img border="0" height="70%" width="70%" class="logo" alt="Alpen Adria Universität Klagenfurt - Logo" src="http://www.uni-klu.ac.at/main/bilder/struktur/logo_uniklgft.gif"/></a>';
document.getElementsByTagName("div")[2].insertBefore(bildlink, document.getElementsByTagName("div")[2].firstChild);


//Suche nach dem obenen linken div
//Ausrichtung der Elemente
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='LayerHeaderLogo']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	
	//Einrichten der Abstände
	thisDiv.getElementsByTagName("ul")[0].style.padding = "0";
	
	if (thisDiv.getElementsByTagName("img")[0]) {
		thisDiv.getElementsByTagName("img")[0].style.marginLeft = "12px";

	}
	

}


//Funktion zum Hinzufügen von CSS-Styles
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}