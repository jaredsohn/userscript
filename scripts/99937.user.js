// ==UserScript==
// @name           fonattackgoldthing
// @namespace      http://fallofnations.com
// @include        http://www.fallofnations.com/game/index.asp?action=attack*
// ==/UserScript==

wat = unsafeWindow.document.location.href.match(/^http:\/\/www\.fallofnations\.com\/game\/index\.asp\?action=attack\&target=(.*?)\&type=(.*?)\&turns=(.*?)\&attack=Attack.*$/);
if(wat != null) {
	unsafeWindow.jQuery.post('/game/index.asp?action=attack', { target: wat[1], type: wat[2], turns: wat[3]});
} else {
	unsafeWindow.jQuery('document').ready(function() {
		omnom = document.getElementById("contentcolumn").getElementsByTagName('form')[0];
		omnom.innerHTML = "<input type='hidden' value='attack' name='action'>" + omnom.innerHTML;
		omnom.setAttribute("action", "/game/index.asp");
		omnom.setAttribute("onsubmit", "return true;");
		omnom.setAttribute("method", "get");
	});
}
delete wat;
