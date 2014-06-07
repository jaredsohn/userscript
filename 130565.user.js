// ==UserScript==
// @name RetkiKartta-Track
// @description Track maker
// @homepage http://github.com/Zetruger/retkikartta-track
// @author Ivan Chistyakov <zetruger@gmail.com>
// @license The MIT License (http://opensource.org/licenses/mit-license)
// @version 1.0
// @include http://www.retkikartta.fi/*
// ==/UserScript==

var divTrack = document.querySelector('div#welcomeContainerDiv');
var divMap = document.querySelector('div#map');
var divPosition = document.querySelector('div#mapMousePosition');
if (divTrack && divMap && divPosition) {
	divTrack.innerHTML = '';
	divMap.ondblclick = function () {
		var t = divPosition.innerText;
		divTrack.innerHTML = divTrack.innerHTML + '<br/>' + t.substr(t.indexOf('lat: ') + 5, 8) + ',' + t.substr(t.indexOf('lon: ') + 5, 8);
	}
}
