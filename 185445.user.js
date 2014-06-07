// ==UserScript==
// @name          TvFedor RuTracker RSS button
// @namespace     tvfedorrutrackerbutton
// @match         http://rutracker.org/forum/viewtopic.php?t=*
// @run-at        document-end
// ==/UserScript==

var place = document.getElementsByClassName("row3 pad_4")[0];

if(place)
{
	var our = document.createElement("a");
	our.href = "#";
	our.className = "med";
	our.innerHTML = "Отслеживать в Фёдоре		·		";
	our.onclick = function onclick(event) {var script=document.createElement("script");script.type="text/javascript";script.src="http://tvfedor.ru/desktop.bundles/bookmarklet/_bookmarklet.js?" + Math.floor(Math.random()*99999);document.head.appendChild(script);return false;}

	place.insertBefore(our, place.firstElementChild);
}