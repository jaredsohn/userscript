// ==UserScript==
// @name           StarCraft II Beta Key Watch
// @namespace      
// @description    Fuck you Jeff.
// @include *
// ==/UserScript==

// key is 26 alphanumeric + 4 hyphens
var keyRegEx = new RegExp('([A-Z0-9]){6}\-([A-Z0-9]){4}\-([A-Z0-9]){6}\-([A-Z0-9]){4}\-([A-Z0-9]){6}', 'gim');
var html = document.body.innerHTML;
var matches = html.match(keyRegEx);

if(matches != null && matches.length > 0) {
	if(matches[0] != GM_getValue('last-key')) {
		GM_setValue('last-key', matches[0]);
		GM_xmlhttpRequest({
			method: "POST",
			url: "https://us.battle.net/account/management/add-game.xml",
			data: "gameKey="+ matches[0],
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				alert(response.responseText.indexOf("The authentication key you entered has already been claimed"));
			}
		});
	}
}