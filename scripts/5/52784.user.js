// ==UserScript==
// @name				DSmakeBBlistOnMap
// @author				
// @namespace			http://userscripts.org
// @description			Damit kann man eine BB-Code Liste auf der Karte erstellen durch einfach Auswahl der Doerfer
// @include			http://de*.die-staemme.de/game.php?*screen=map*
// ==/UserScript==



var links = document.getElementById("mapOld").getElementsByTagName("a");

Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return "\"" + x + "\"";
		}
	}
	
	return false;
}

function getCookie(name) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if(cookie.match(name + "=")) {
				var value = cookie.replace(name + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(name + "="))
			var value = cookie.replace(name + "=", "");
		else
			var value = false;
	}
	
	return value;
}

function setCookie(name, value) {
	document.cookie = name + "=" + value;
}

function eraseCookie(name) {
   document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function getCoords() {
	var index = unescape(this).match(/var index = (\d+);/)[1];
	var link = document.getElementById("mapOld").getElementsByTagName("a")[index];
	var hover = link.getAttribute("onmouseover");
	var coord = hover.match(/\d{1,3}\|\d{1,3}/);
	
	if(getCookie("DSmakeBBlistOnMap_coords")) {
		var coords = unescape(getCookie("DSmakeBBlistOnMap_coords")).split(",");
	} else {
		var coords = [];
	}
	
	if(!coords.contains(coord)) {
		coords.push(coord);
		setCookie("DSmakeBBlistOnMap_coords", escape(coords.join(",")));
	}
}

function alertCoords() {
	if(!getCookie("DSmakeBBlistOnMap_coords")) {
		return;
	}
	var coords = unescape(getCookie("DSmakeBBlistOnMap_coords")).split(",");
	var str = "";
	for(var x = 0; x < coords.length; x++) {
		str += "[village]" + coords[x] + "[/village]";
		str += (x == coords.length-1) ? "" : "\n";
	}
	
	var newWindow = window.open('', 'newWindow', 'dependent=yes,height=' + coords.length*22 + ',resizable=yes,scrollbars=yes,width=240');
	newWindow.document.write('<html><head><title>BB-Code Liste</title></head><body></body></html>');
	var doc = newWindow.document;
	
	var textarea = doc.createElement("textarea");
	textarea.cols = "25";
	textarea.rows = coords.length-1;
	textarea.style.textAlign = "center";
	textarea.style.marginRight = "auto";
	textarea.style.marginLeft = "auto";
	textarea.innerHTML = str;
	textarea.focus();
	textarea.select();
	doc.body.appendChild(textarea);
	
	eraseCookie("DSmakeBBlistOnMap_coords");
}

document.addEventListener('keypress', function(event) {
	try{
	if(event.which == 98) {
		for(var x = 0; x < links.length; x++) {
			if(links[x].href.match(/village=(\d+)&screen=info_village&id=(\d+)/)) {
				links[x].href = "javascript: var village=" + RegExp.$1 + "; var target=" + RegExp.$2 + "; var index = " + x + "; ";
				links[x].addEventListener('click', getCoords, false);
			}
		}
	}
	}catch(e){window.alert(e);}
}, false);

document.addEventListener('keyup', function(event) {
	if(event.which == 66) {
		var link = location.href.split("village=")[0];
		for(var x = 0; x < links.length; x++) {
			if(links[x].href.match(/village=(\d+).+?target=(\d+)/)) {
				links[x].href = link + "village=" + RegExp.$1 + "&screen=info_village&id=" + RegExp.$2;
			}
		}
		
		alertCoords();
	}
}, false);