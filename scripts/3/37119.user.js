// ==UserScript==
// @name           Facebook auto poke
// @namespace      http://userscripts.org/users/72778
// @description    Automatically poke back all facebook pokes
// @include        http://www.facebook.com/*
// ==/UserScript==
//

var post_form_id = document.getElementById('post_form_id');

var allAnchorElements = document.getElementsByTagName('a');

for (var i = 0; i < allAnchorElements.length; i++) {
	var currentElement = allAnchorElements[i];
	if (currentElement.firstChild.nodeValue == 'poke back') {
		var pokeId = currentElement.href.match(/id=([0-9]*)/)[1];
		GM_xmlhttpRequest({'method': 'POST', 'url': 'http://www.facebook.com/ajax/poke.php', 'headers': {'Content-type': 'application/x-www-form-urlencoded'}, 'data':'uid=' + pokeId + '&pokeback=1&post_form_id=' + post_form_id.value});
	}
}
