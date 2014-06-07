// ==UserScript==
// @name           Oniro Paradise
// @description    Permet de masquer les messages des nuisibles d'oniromancie.
// @include        http://www.rpg-maker.fr/*
// @namespace	   http://userscripts.org/users/349422
// @grant          none
// @version        1.0
// ==/UserScript==
var ids = [9460, 6456, 16949, 8211, 13725, 16929];
ids.include = function(value) {
	for(var i in this)
		if(this[i] == value)
			return true;
	return false;
}
function toggle_paradise(event, a) {
	if(event) a = this;
	if(a.paradise = !a.paradise) {
		a.parentNode.parentNode.style.height = "31px";
		a.innerHTML = "Afficher";
	} else {
		a.parentNode.parentNode.style.height = "";
		a.innerHTML = "Masquer";
	}
}
var elements = document.getElementsByTagName("table")
for(var i in elements)
	if(elements[i].className=="tableposts" && elements[i].innerHTML.match(/membre&amp;id=(\d+)/) && ids.include(RegExp.$1)) {
		var div = document.createElement("div");
		div.style.position = "relative";
		div.style.overflow = "hidden";
		var span = document.createElement("span");
		span.style.position = "absolute";
		span.style.top = "11px";
		span.style.right = "96px";
		span.style.fontSize = "10px";
		span.style.color = "#cedbef";
		var a = document.createElement("a");
		a.style.cursor = "pointer";
		a.addEventListener("click", toggle_paradise, true);
		span.appendChild(a);
		span.appendChild(document.createTextNode(" |"));
		div.appendChild(span);
		div.appendChild(elements[i].parentNode.replaceChild(div, elements[i]));
		toggle_paradise(false, a);
	}