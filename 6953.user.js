// Version 1.0
// ==UserScript==
// @name           GrandStategy Country Finder
// @namespace      http://www.drnicwilliams.com
// @description    Clicking on a country name toggles the name on/off on the map
// @include        http://denizengames.com/grandstrategy/pages/playGame.faces*
// ==/UserScript==


var ahref = document.getElementById('cards_toggle');
if (ahref) {
	ahref = ahref.wrappedJSObject || ahref;
	ahref.parentNode.removeChild(ahref);
}
var mp_CardsTitle = document.getElementById('mp_CardsTitle');
mp_CardsTitle = mp_CardsTitle.wrappedJSObject || mp_CardsTitle;
mp_CardsTitle.innerHTML = "Cards ";
ahref = document.createElement('A');
ahref.id = "cards_toggle";
ahref.innerHTML = "Show";
ahref.style.fontSize = '70%';
ahref.href = "#";
ahref.addEventListener("click", function() {
	var mp_Countries = document.getElementById('mp_Countries');
	mp_Countries = mp_Countries.wrappedJSObject || mp_Countries;
	countries = {};
	for (var i = 0; i < mp_Countries.childNodes.length; i++) {
		var node = mp_Countries.childNodes[i];
		if (node.id && node.id.match(/^mp_t\d+$/) && node.childNodes.length > 0) {
			var details = {};
			var name = node.childNodes[0].childNodes[0].nodeValue;
			details.name = name;
			details.icon_id = 'mp_c' + node.id.match(/^mp_t(\d+)$/)[1];
			countries[node.id] = details;
		}
	}
	var mp_Cards = document.getElementById('mp_Cards');
	mp_Cards = mp_Cards.wrappedJSObject || mp_Cards;
	var mp_Cards_td = mp_Cards.getElementsByTagName('td');
	for (var i = 0; i < mp_Cards_td.length; i++) {
		var td = mp_Cards_td[i].wrappedJSObject || mp_Cards_td[i];
		var node = td.getElementsByTagName('span')[0].childNodes[0];
		var country = (node.nodeName == '#text') ? node.nodeValue : node.childNodes[0].nodeValue;
		var nameId = null;
		for (var key in countries) {
		  	var value = countries[key];
			if (value.name == country) {
				nameId = key;
				break;
			}
		};
		var title = document.getElementById(nameId);
		title = title.wrappedJSObject || title;
		title.style.display = 'block';
	}
}, false);
mp_CardsTitle.appendChild(ahref);


// XPCNativeWrapper