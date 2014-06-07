// Hyundaiforum user script
// Version 0.9 beta 2
// 07.11.2010
//
//  Copyright (C) 2010  Martin Nyolt
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  See <http://www.gnu.org/licenses/gpl.txt> to get a copy of the GNU
//  General Public License
//
//
// --------------------------------------------------------------------
//
// Dies ist ein Greasemonkey user script.  Um es zu installieren wird
// Greasemonkey benötigt: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name          Hyundaiforum
// @namespace     de.PapaNappa.userScript
// @description   verbessert das Hyundaiforum, anpassbar
// @include       http://www.hyundaiforum.de/*
// ==/UserScript==

// ####################################################################

/* EINSTELLUNGEN
die folgenden Werte können nach eigenen belieben angepasst werden.
Zu jeder Einstellmöglichkeit ist eine kurze Erklärung angegeben.

Außerdem gibt es zu jeder Eigenschaft zwei Beispiele:

Standard:
  So wie die Zeile ursprünglich war als dieses Skript heruntegeladen wurde
Original:
  Wie die Einstellung zu setzen ist um das originale Verhalten der Website wiederherzustellen
*/

/* Breite des Forums
legt die Breite des gesamten Forums fest.
Die Angabe kann entweder in Prozent ("100%") oder Pixeln ("900px") erfolgen.

Standard:
  var Breite = "100%";
Original:
  var Breite = "900px";
*/

var Breite = "100%";

/* Volle Textbreite
Wenn auf true gesetzt bekommt das Eingabefeld, wenn man einen neuen Post verfassen will, immer die volle Breite.
Gilt genauso für das Eingabefeld bei "Schnell Antwort".

Standard:
  var volle_Textbreite = true;
Original:
  var volle_Textbreite = false;
*/

var volle_Textbreite = true;

/* versteckte Kategorien
legt fest welche Kategorien standardmäßig versteckt werden sollen

1: Allgemeines
2: Einbau, Umbau, Tuning, Reparatur
3: Das Hyundai Forum
4: Galerie / Showroom
5: Clubs und Treffen
6: Talk & Community
8: Angaben zum Forum und seinen Mitgliedern

Standard:
  var versteckte_Kategorien = "3,4,5,8";
Original:
  var versteckte_Kategorien = "";
*/

var versteckte_Kategorien = "3,4,5,8";

/* Kategorien speichern
Standardmäßig wird gespeichert werde Kategorien ein- und ausgeklappt
waren und sie werden beim nächsten Besuch wiederhergestellt. Setzt man
den Wert auf false, so wird nichts gespeichert

Standard:
  var speichere_Kategorien = true;
Original:
  var speichere_Kategorien = false;
*/

var speichere_Kategorien = true;

/* Post hervorheben
Wenn ein bestimmter Post angesprungen wird (z. B. beim klicken auf "Zum ersten ungelesenen Beitrag"), dann wird
die Zeile dadrüber ("Geschrieben; ...") farblich hervorgehoben.
Die Farbe kann in der Variable Highlight_Post angegeben werden, wird der Wert auf null gesetzt (siehe Beispiel),
dann wird der Post nicht markiert.

Standard:
  var Highlight_Post = "#70FF70";
Original:
  var Highlight_Post = null;
*/
var Highlight_Post = "#70FF70";

/* zusätzliche Links
Platziert zusätzliche Links über den Foren auf der Hauptseite und über den Beiträgen eines Forums.

Es gibt ingesamt vier Listen:
* Haupt_Links_Eingeloggt - die Links auf der Hauptseite wenn man eingeloggt ist
* Haupt_Links_Ausgeloggt - die Links auf der Hauptseite wenn man ausgeloggt ist
* Forum_Links_Eingeloggt - die Links über den Beiträgen wenn man eingeloggt ist
* Forum_Links_Ausgeloggt - die Links über den Beiträgen wenn man ausgeloggt ist

Standardmäßig werden, wenn man eingeloggt ist, die Links "Markiere alle Beiträge als gelesen" (Hauptseite)
bzw.  "Forum als gelesen markieren" (Foren) angezeigt, die auf den jeweiligen Seiten unten zu sehen sind.

Mit jeder zusätzlichen Zeile
  Haupt_Links_Eingeloggt["Text"] = "http://www.link.de/";
wird ein Link hinzugefügt.

In den Foren-Links wird ${FORUM} durch die Nummer des Forums ersetzt. So wird der standardmäßige
Link "Forum als gelesen markieren" umgesetzt.

Standard:
  var Haupt_Links_Eingeloggt = new Array();
  Haupt_Links_Eingeloggt["Markiere alle Beiträge als gelesen"] = "http://www.hyundaiforum.de/index.php?act=Login&CODE=05";

  var Haupt_Links_Ausgeloggt = new Array();

  var Forum_Links_Eingeloggt = new Array();
  Forum_Links_Eingeloggt["Forum als gelesen markieren"] = "http://www.hyundaiforum.de/index.php?act=Login&CODE=04&f=${FORUM}";

  var Forum_Links_Ausgeloggt = new Array();

Original:
  var Haupt_Links_Eingeloggt = new Array();
  var Haupt_Links_Ausgeloggt = new Array();
  var Forum_Links_Eingeloggt = new Array();
  var Forum_Links_Ausgeloggt = new Array();
*/

var Haupt_Links_Eingeloggt = new Array();
Haupt_Links_Eingeloggt["Markiere alle Beiträge als gelesen"] = "http://www.hyundaiforum.de/index.php?act=Login&CODE=05";

var Haupt_Links_Ausgeloggt = new Array();

var Forum_Links_Eingeloggt = new Array();
Forum_Links_Eingeloggt["Forum als gelesen markieren"] = "http://www.hyundaiforum.de/index.php?act=Login&CODE=04&f=${FORUM}";

var Forum_Links_Ausgeloggt = new Array();

/* Automatisch unsichtbar
Wenn auf true gesetzt, wird beim einloggen automatisch der Haken für die Privatssphäre gesetzt

Standard:
  var Automatisch_unsichtbar = true;
Original:
  var Automatisch_unsichtbar = false;
*/

var Automatisch_unsichtbar = true;

/* Platz sparen in einem Forum
Sorgt dafür, dass die beiden Buttons "Neues Thema" und "Umfrage" (falls vorhanden) in der selben Zeile sind wie die Boardregeln links.
Dadurch wird der Platz ein klein wenig besser ausgenutzt.

Standard:
  var Forum_PlatzSparen = true;
Original:
  var Forum_PlatzSparen = false;
*/

var Forum_PlatzSparen = true;

/* Kleine Regeln
Wenn auf true gesetzt werden alle übergroßen Foren-Regeln (besonders im Markt nützlich) normal dargestellt.

Standard:
  var kleine_Regeln = true;
Original:
  var kleine_Regeln = false;
*/

var kleine_Regeln = true;

// ####################################################################
// Ab hier beginnt der Code

var hiddenCategories = new Array();
{
	var cats_;
	if (speichere_Kategorien)
		cats_ = GM_getValue("hiddenCategories", versteckte_Kategorien);
	else
		cats_ = versteckte_Kategorien;
	
	var cats = cats_.split(",");
	for (var i = 0; i < cats.length; i++) {
		var cat = cats[i].replace(/ /g, "");
		if (cat != null && cat.length > 0)
			hiddenCategories[i] = parseInt(cat);
	}
}

function size(array) {
	var l = 0;
	for (var k in array) {
		l++;
	}
	return l;
}

var divOffset = 3;
var tableOffset = 0;
if (document.getElementById("banner") != null)
    divOffset++;

function getXPathHeading(id) {
    return "/html/body/table/tbody/tr/td/div[" + (id+divOffset) + "]/div";
}


function getXPathBody(id) {
    return "/html/body/table/tbody/tr/td/div[" + (id+divOffset) + "]/table";
}

function getSingleXPath(path) {
    var snapshotResults = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return snapshotResults.snapshotItem(0);
}

function wrap(fun, arg) {
    return function() {
        fun(arg);
    }
}

function updateHiddenCategories() {
	if (!speichere_Kategorien)
		return;
	
	var setting = "";
	for (var i = 0; i < hiddenCategories.length; i++)
		setting += hiddenCategories[i] + ",";
	
	GM_setValue("hiddenCategories", setting);
}

function showHide(id) {
    var body = getSingleXPath(getXPathBody(id));
    var head = getSingleXPath(getXPathHeading(id));
    var link = head.lastChild;
    var text;

    if (body.style.display == "none") {
        body.style.display = "";
        text = " (verbergen)";
		
		// remove id from array
		var index = hiddenCategories.indexOf(id);
		if (index >= 0)
			hiddenCategories.splice(index, 1);
    }
    else {
        body.style.display = "none";
        text = " (anzeigen)";
		
		// add id to array
		var index = hiddenCategories.indexOf(id);
		if (index < 0)
			hiddenCategories.push(id);
    }

    link.replaceChild(document.createTextNode(text), link.firstChild);
	updateHiddenCategories();
}

function addSHToDiv(id) {
    var head = getSingleXPath(getXPathHeading(id));
	if (head == null)
		return;
    var body = getSingleXPath(getXPathBody(id));
    
    var link = document.createElement("span");
    link.appendChild(document.createTextNode(" (verbergen)"));
    link.style.cursor = "pointer";
    link.style.fontSize = "85%";

    link.addEventListener("click", wrap(showHide, id), false);
	head.appendChild(link);

    if (hiddenCategories.indexOf(id) >= 0) {
        showHide(id);
	}
}

// removes a style and deletes consequtive <br>s
function cleanUp(node, style) {
	if (node == null)
		return;
	
	var styles = node.style;
	if (styles != null)
		node.style[style] = "";
	
	var hadBR = false;
	for (var i = 0; i < node.childNodes.length; i++) {
		var child = node.childNodes[i];
		
		if (child != null) {		
			var isBR = child.nodeName == "BR";
			if (hadBR && isBR) {
				node.removeChild(child);
				i--;
			}
			hadBR = isBR;
		}
		
		cleanUp(child, style);
	}
}

// make forum use the maximum width
var wrapper = getSingleXPath("/html/body/table");
wrapper.setAttribute("width", Breite);

// remove this annoying blinking from "Linklist"
var linkList = getSingleXPath("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/a/span");
if (linkList != null)
	linkList.removeAttribute("style");

// extract URL parameters
	
var GET = {};
{
    var s = window.location.search.substring(1).split('&');
    if(!s.length) return;
    for(var i  = 0; i < s.length; i++) {
        var parts = s[i].split('=');
        GET[unescape(parts[0])] = unescape(parts[1]);
    }
}

var hash = unescape(document.location.hash.substring(1));

// set some useful variables

var isMain = "http://www.hyundaiforum.de/index.php?act=idx".indexOf(document.URL) == 0;
if (!isMain && document.URL == "http://www.hyundaiforum.de/index.php?http://www.hyundaiforum.de/")
	isMain = true;

//var isLogin = document.URL.indexOf("http://www.hyundaiforum.de/index.php?act=Login&CODE=00") == 0;
var isLogin = GET["act"]=="Login" && GET["CODE"]=="00";
var loggedIn = getSingleXPath("/html/body/table/tbody/tr/td/table[2]/tbody/tr/td/strong/a") != null;

var forumID = GET["showforum"];
if (forumID == null && GET["act"] == "SF")
	forumID = GET["f"];
var isForum = forumID != null;

var hasSubForum = false;
if (isForum) {
	var subforums = getSingleXPath("/html/body/table/tbody/tr/td/div[4]");
	hasSubForum = subforums != null && subforums.getAttribute("class") == "tableborder";
}

var isTopic = getSingleXPath("/html/body/table/tbody/tr/td/div[4]/form/div/div[2]/textarea") != null;
var reply = getSingleXPath("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td[2]/a/img");

if (!isForum && reply != null) {
	var href = reply.parentNode.getAttribute("href");
	isTopic = href.indexOf("http://www.hyundaiforum.de/index.php?act=Post&CODE=02&f=") == 0;
}

var isNewTopic = getSingleXPath("/html/body/table/tbody/tr/td/form/table/tbody/tr[8]/td[2]/textarea") != null;
var isReply = getSingleXPath("/html/body/table/tbody/tr/td/form/table/tbody/tr[5]/td[2]/textarea") != null;

if (isNewTopic || isReply)
    isMain = false;

// add aditional links to the top of the page

var Links;
if (isMain)
	Links = loggedIn ? Haupt_Links_Eingeloggt : Haupt_Links_Ausgeloggt;
else if (isForum)
	Links = loggedIn ? Forum_Links_Eingeloggt : Forum_Links_Ausgeloggt;

if (Links != null && size(Links) > 0) {
	var nav = document.getElementById("navstrip");
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	tr.appendChild(td1);
	tr.appendChild(td2);
	table.appendChild(tr);

	table.setAttribute("width", "100%");

	var linkDiv = document.createElement("div");
	linkDiv.style.fontWeight = "bold";
	linkDiv.style.textAlign = "right";

	linkDiv.appendChild(document.createTextNode(" · "));

	for (link_text in Links) {
		var href = Links[link_text];
		href = href.replace(/\$\{FORUM\}/g, forumID);
		var link = document.createElement("a");
		link.setAttribute("href", href);
		link.appendChild(document.createTextNode(link_text));
		linkDiv.appendChild(link);
		linkDiv.appendChild(document.createTextNode(" · "));
	}

	nav.parentNode.replaceChild(table, nav);
	td1.appendChild(nav);
	td2.appendChild(linkDiv);
	divOffset--;
	tableOffset++;
}

if ((isForum && !hasSubForum || isTopic) && Forum_PlatzSparen) {
// put the div inside the table below
var div = getSingleXPath("/html/body/table/tbody/tr/td/div["+divOffset+"]");

if (div.getAttribute("class") != "tableborder" && div.getAttribute("class") != "wrapmini") {
	div.parentNode.removeChild(div.nextSibling.nextSibling);

	var td1 = getSingleXPath("/html/body/table/tbody/tr/td/table["+(3+tableOffset)+"]/tbody/tr/td");
	var td2 = getSingleXPath("/html/body/table/tbody/tr/td/table["+(3+tableOffset)+"]/tbody/tr/td[2]");
	if (td1 != null && td2 != null) {
		td1.removeAttribute("width");
		td1.removeAttribute("nowrap");
		td1.style.verticalAlign="bottom";
		td2.removeAttribute("width");
		td2.style.verticalAlign="bottom";

		var tdn = document.createElement("td");
		td1.parentNode.insertBefore(tdn, td1.nextSibling);
	
		div.parentNode.removeChild(div);
		tdn.appendChild(div);
	
		if (kleine_Regeln) 
			cleanUp(div, "fontSize");
	}
}
} // Forum_PlatzSparen

if (isMain) {

// add show / hide

// start and end IDs of the different forum categories
var CStart = 1;
var CEnd = 0;

for (var cat = getSingleXPath(getXPathHeading(CStart)).parentNode; cat != null; cat = cat.nextSibling) {
	if (cat.nodeName != "DIV")
		continue;
		
	if (cat.getAttribute("class") == "tableborder")
		CEnd++;
	
	if (cat.getAttribute("class") != "tableborder")
		break;
}

for (var i = CStart; i <= CEnd; i++) {
    addSHToDiv(i);
}
// statistics
addSHToDiv(8);

} // isMain


var selectedPost = hash;
if (isTopic && Highlight_Post != null && selectedPost != null) {
var posts = document.getElementsByName(selectedPost);

if (posts != null && posts.length > 0) {
	var post = posts[0];
	var postTD1 = post.parentNode;
	var postTD2 = postTD1.nextSibling.nextSibling;
	
	postTD1.style.backgroundColor = Highlight_Post;
	postTD2.style.backgroundColor = Highlight_Post;
	for (var i = 0; i < postTD2.childNodes.length; i++) {
		var child = postTD2.childNodes[i];
		if (child.nodeName == "DIV")
			child.style.backgroundColor = Highlight_Post;
	}
}
} // Highlight_Post

if ((isNewTopic || isReply || isTopic ) && volle_Textbreite) {
	var xpath;
	if (isNewTopic)
		xpath = "/html/body/table/tbody/tr/td/form/table/tbody/tr[8]/td[2]/textarea";
	else if (isReply)
		xpath = "/html/body/table/tbody/tr/td/form/table/tbody/tr[5]/td[2]/textarea";
	else if (isTopic)
		xpath = "/html/body/table/tbody/tr/td/div[4]/form/div/div[2]/textarea";
		
	var area = getSingleXPath(xpath);
	area.style.width = "99%";
}

if (isLogin && Automatisch_unsichtbar) {

var form = document.forms.namedItem("LOGIN");
var input = form.elements.namedItem("Privacy");
input.checked = true;

} // isLogin