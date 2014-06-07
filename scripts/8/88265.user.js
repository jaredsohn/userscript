// ==UserScript==
// @name				DSmakeBBlistOnMap
// @author				Heinzel
// @namespace			http://userscripts.org
// @description			Damit kann man eine BB-Code Liste auf der Karte erstellen durch einfach Auswahl der Doerfer
// @include			http://de*.die-staemme.de/game.php?*screen=map*
// ==/UserScript==




Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return "\"" + x + "\"";
		}
	}
	
	return false;
}

function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
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
   document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}

function markVillage(link) {
	var container = link.parentNode;
	container.style.outline = "1px solid red";
	window.marked.push(container.id);
}

function getCoords() {
	var index = unescape(this).match(/var index = (\d+);/)[1];
	var link = window.links[index];
	var hover = link.getAttribute("onmouseover");
	var coord = hover.match(/\((\d{1,3}\|\d{1,3})\)/);
	if(!coord) { // fuer XX:YY:ZZ format der koords
		coord = hover.match(/\((\d{1,2}:\d{1,2}:\d{1,2})\)/)[1];
	} else {
		coord = coord[1];
	}
	
	if(getCookie("DSmakeBBlistOnMap_coords")) {
		var coords = unescape(getCookie("DSmakeBBlistOnMap_coords")).split(",");
	} else {
		var coords = [];
	}
	
	if(!coords.contains(coord)) {
		coords.push(coord);
		setCookie("DSmakeBBlistOnMap_coords", escape(coords.join(",")));
	}
	
	markVillage(link);
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
	
	var newWindow = window.document.open('', 'newWindow', 'dependent=yes,height=' + coords.length*22 + ',resizable=yes,scrollbars=yes,width=240');
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

	newWindow.document.close();
	
	eraseCookie("DSmakeBBlistOnMap_coords");
}

function gid(id) {
	return document.getElementById(id);
}

function addHandler() {
	// Falls gescrolled wurde, befinden sich die Links im Container 'mapNew'
	if(gid("mapOld").innerHTML != "") {
		window.links = gid("mapOld").getElementsByTagName("a");
	} else {
		window.links = gid("mapNew").getElementsByTagName("a");
	}
	var links = window.links;
	
	document.addEventListener('keypress', function(event) {
		if(event.which == 98) {
			for(var x = 0; x < links.length; x++) {
				if(links[x].href.match(/village=(\d+)&screen=info_village&id=(\d+)/)) {
					links[x].href = "javascript: var village=" + RegExp.$1 + "; var target=" + RegExp.$2 + "; var index = " + x + "; ";
					links[x].addEventListener('click', getCoords, false);
				}
			}
		}
	}, false);
	
	document.addEventListener('keyup', function(event) {
		if(event.which == 66) {
			// markierungen entfernen
			var ids = window.marked;
			if(ids.length != 0) {
				for(var x = 0; x < ids.length; x++) {
					var el = gid(ids[x]);
					el.style.outline = "";
					el.name = "";
				}
			}
			
			// links wieder herstellen
			var link = location.href.split("village=")[0];
			for(var x = 0; x < links.length; x++) {
				if(links[x].href.match(/village=(\d+).+?target=(\d+)/)) {
					links[x].href = link + "village=" + RegExp.$1 + "&screen=info_village&id=" + RegExp.$2;
				}
			}
			
			alertCoords();
		}
	}, false);

} 

function watchArrow() {
	window.setTimeout(addHandler, 2000);
}

function setArrowWatcher() {
	var arrows = _evaluate('//img[contains(@src, "map/map_")]');
	
	for(var x = 0; x < arrows.length; x++) {
		var link = arrows[x].parentNode;
		link.addEventListener("click", watchArrow, false);
	}
}

(function main() {
	window.marked = [];
	
	addHandler();
	setArrowWatcher();
})();