// ==UserScript==
// @name           Facebook auto poke (FR)
// @namespace      http://userscripts.org/users/103529
// @description    Automatically poke back all facebook pokes (original version from http://userscripts.org/scripts/show/37119 by Jason Chu)
// @include	 https://*.facebook.com/home.php*
// @include      http://*.facebook.com/home.php*
// @version      0.4
// @require        http://updater.usotools.co.cc/55552.js
// ==/UserScript==
//

var post_form_id = document.getElementById('post_form_id');

var allAnchorElements = document.getElementsByTagName('a');

for (var i = 0; i < allAnchorElements.length; i++) {
	var currentElement = allAnchorElements[i];
  if (currentElement.firstChild != null) {
	  if (currentElement.firstChild.nodeValue == 'envoyer un poke en retour') {
		  var pokeId = currentElement.href.match(/id=([0-9]*)/)[1];
		  GM_xmlhttpRequest({'method': 'POST', 'url': 'http://www.facebook.com/ajax/poke.php', 'headers': {'Content-type': 'application/x-www-form-urlencoded'}, 'data':'uid=' + pokeId + '&pokeback=1&post_form_id=' + post_form_id.value});
  	}
  }
}