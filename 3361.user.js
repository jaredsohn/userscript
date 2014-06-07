// ==UserScript==
// @author         menesis http://www.blogas.lt/menesis
// @name           ieskok.lt
// @description    Adds links to user profiles, and visited ones look different.
// @include        http://www.ieskok.lt/inod.php*
// @version        2006-02-27
// ==/UserScript==

/*
Makes ieskok.lt site more usable, so far makes real links to user profiles in addition to onclick events which open popups currently. So you can open them in tabs, and most importantly viewed users� links look different.
*/

var user_page = "http://www.ieskok.lt/show.php?lang=1&id=";

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addFixedStyle() {
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.setAttribute("title", "fixed");
	var css = document.createTextNode("a.fixed { font-family: Verdana !important; } a.fixed:visited { color: #aaaaaa !important; }");
	style.appendChild(css);
	document.getElementsByTagName("head")[0].appendChild(style);
}

function fixRoomLinks() {
	var zre = /z\(this,(\d+)\)/;
    var links = xpath("//td[@class='room']/a");
	for (var i = 0; i < links.snapshotLength; i++) {
	  var cur = links.snapshotItem(i);
	  var curOnclick = cur.getAttribute("onclick");
	  var matches = curOnclick.match(zre);
	  if (!matches)
	    continue;
	  var who = matches[1];
      cur.setAttribute("href", "http://www.ieskok.lt/show.php?lang=1&id=" + who);
      cur.setAttribute("onclick", "j(" + who + ", 1); return false;");
      cur.setAttribute("class", "fixed");
	}
}

function fixSeenLinks() {
	var jre = /j\((\d+),1\)/;
    var tds = xpath("//td[@class='td11' and @align='left']");
	for (var i = 0; i < tds.snapshotLength; i++) {
	  var cur = tds.snapshotItem(i);
	  var curOnclick = cur.parentNode.getAttribute("onclick");
	  var matches = curOnclick.match(jre);
	  if (!matches)
		continue;
	  var who = matches[1];

	  var textNode = cur.firstChild;
	  if (!textNode || textNode.nodeType != 3)
		continue;

	  var link = document.createElement("a");
      link.setAttribute("href", user_page + who);
	  link.setAttribute("class", "fixed");
	  link.setAttribute("onclick", "return false;");
	  cur.removeChild(textNode);
	  link.appendChild(textNode);
	  cur.appendChild(link);
	}
}

function fixSearchLinks() {
	var bre = /b\(this,(\d+)\)/;
    var links = xpath("//tr[@bgcolor='white' and @onclick]/td/em/..");
	for (var i = 0; i < links.snapshotLength; i++) {
	  var cur = links.snapshotItem(i);
	  var curOnclick = cur.parentNode.getAttribute("onclick");
	  var matches = curOnclick.match(bre);
	  if (!matches)
	    continue;
	  var who = matches[1];
	  
	  var link = document.createElement("a");
      link.setAttribute("href", user_page + who);
	  link.setAttribute("class", "fixed");
	  link.setAttribute("onclick", "return false;");
   	  var n = cur.firstChild; cur.removeChild(n); link.appendChild(n);
   	  n = cur.firstChild; cur.removeChild(n); link.appendChild(n);
	  cur.appendChild(link);
	}
}

(function() {
    if (window.location.href.indexOf("http://www.ieskok.lt/inod.php?mo=20") != -1)
		fixRoomLinks();
    else if (window.location.href == "http://www.ieskok.lt/inod.php?mo=220")
		fixSeenLinks();
    else if (window.location.href == "http://www.ieskok.lt/index.php?ccc=2")
		fixSearchLinks();
	else return;

    addFixedStyle();
})();
