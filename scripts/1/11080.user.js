// ==UserScript==
// @name           Google Black Theme
// @namespace      blackTheme
// @include        http://www.google.fi/*
// ==/UserScript==

function addRow(str) {
	if (this.innerHTML.length) {
		this.innerHTML += str;
	} else {
		this.innerHTML = str;
	}

	this.innerHTML += "\n";
}

function getElementsWithTagNameAndProperty(tagName, prop, searchText) {
	var els = document.getElementsByTagName(tagName);
	var retEls = new Array();
	var j = 0;

	for (var i=0; i < els.length; i++) {
		if (els[i].getAttribute(prop)) {
			var p = els[i].getAttribute(prop);
			if (searchText) {
				if (p.search(searchText) != -1) retEls[j++] = els[i];
			} else {
				retEls[j++] = els[i];
			}
		}
	}
	return retEls;
}

var hStyle = document.createElement("style");
hStyle.type = "text/css";
hStyle.addRow = addRow;

hStyle.addRow("body { background-color: #000; color: #fff; }");
hStyle.addRow("a, span.i { color: #fff !important; }");
hStyle.addRow("div,td { color: #ccc !important; }");
hStyle.addRow("b { color: #fff !important; }");
hStyle.addRow(".a, .a b, font[color=\"#008000\"] { color: #f84 }");
hStyle.addRow(".t, table[bgcolor], table td[bgcolor] { background-color: #777; border: none; }");
hStyle.addRow("#navbar div, #logo span { background: transparent url(file:///C:/Documents%20and%20Settings/Administrator/Application%20Data/Mozilla/Firefox/Profiles/4sw055ws.Firefox/gm_scripts/googleBlack.png) no-repeat scroll 0% !important; }");
hStyle.addRow("input[type=text] { background-color: #333; color: #fff; padding: 2px; border: solid 1px #ccc; }");
hStyle.addRow("input[type=submit] { background-color: #333; color: #fff; border: solid 1px #ccc; }");
hStyle.addRow("font[color=\"#000000\"] { color: #fff; }");
hStyle.addRow("td a span { color: #fff !important; }");

document.documentElement.firstChild.appendChild(hStyle);


// Remove images by citeria

var a = new Array();
a[0] = '("img", "alt", ".*Google.*")';
a[1] = '("img", "src", "/groups/img/nav[^.]*\\\\.gif")';
a[2] = '("img", "src", "/images/[^.]*\\\\.gif")';

for (var i=0; i < a.length; i++) {
	var els = eval("getElementsWithTagNameAndProperty" + a[i] + ";");
	for (var j=0; j < els.length; j++) {
		els[j].style.visibility = "hidden";
	}
}

