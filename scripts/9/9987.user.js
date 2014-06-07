// ==UserScript==
// @name           Travian Quick Maps v1.2b
// @author		   ondy1985 <ondy1985 (at) gmail (dot) com>
// @namespace      ondy1985-travian
// @description    Adds "show on a map" button next to each player or alliance
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*
// @exclude        http://www.travian.*
// ==/UserScript==

function getServerName() {
	return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
}
var url;

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 800, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;
var out = "";

function append(elem, color) {	
	var child = document.createElement("a");
	child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");		
	child.setAttribute("href", url);
	child.setAttribute("style", "display: inline; margin-left: 5px; color: " + color + ";");
	child.innerHTML = "#";
	elem.parentNode.insertBefore(child,elem.nextSibling);
}

for (var i = 0; i < document.links.length; i++) {
	var a = document.links[i];
	var server = getServerName();
	if (a.parentNode.className != 'txt_menue' && a.parentNode.className != 'menu' ) {
		if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
			var who = "id:" + a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');
			url = "http://travmap.shishnet.org/map.php?lang=en&server="+server+"&alliance="+who+"&groupby=player&casen=on&format=svg&";		
			append(a, 'blue');			
		} else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
			var who = "id:" + a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
			url = "http://travmap.shishnet.org/map.php?lang=en&server="+server+"&player="+who+"&groupby=player&casen=on&format=svg&";
			append(a, 'red');
		}
	}
}	
