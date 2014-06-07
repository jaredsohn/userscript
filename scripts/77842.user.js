// ==UserScript==
// @name		mscan
// @namespace		localhost
// @description		mscan
// @include		http://*.ogame.*page=galaxy*
// @exclude		http://board.ogame.*
// @copyright		2010, Nate River
// @license		GNU GPL
// @version 		1.0
// @author 		Nate River
// @homepage 		
// ==/UserScript==

var $;
try {$ = unsafeWindow.$;}
catch(e) {$ = window.$;}
$("#galaxyContent").ajaxSuccess(function(e,xhr,settings) {
	var arrItems = document.getElementsByTagName('span');
	for (var i = 0; i < arrItems.length; i++) {
		if (arrItems[i].id == 'pos-moon') {
			var arrCoords = arrItems[i].innerHTML.split('[')[1].split(']')[0].split(':');
			objLink = document.createElement('li');
				objLink.innerHTML = '<a href="#" onclick="sendShips(6, ' + arrCoords[0] + ', ' + arrCoords[1] + ',' + arrCoords[2] + ', 3, 1);return false">mscan</a>';
			arrItems[i].parentNode.parentNode.parentNode.children[1].appendChild(objLink);
		}
	}
});