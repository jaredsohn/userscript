// ==UserScript==
// @name           Pop-out Player
// @namespace      MefiMusicPlayerPopout
// @description    Adds a link to load the front-page player in a new window. Simple, but useful.
// @include        http://music.metafilter.com/*
// ==/UserScript==

(function() {
	function findPlaceToAdd() {
		el = document.getElementById("mp3player");
		if (el != null) return el;
		return null;
	}
	
	var q = findPlaceToAdd();
	
	if (q != null) {

		els = q.childNodes;
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.nodeType == 1 && el.hasAttribute('name')) {
				if (el.getAttribute('name') == 'movie') var loc = el.getAttribute('value');
				if (el.getAttribute('name') == 'flashvars') var vars = el.getAttribute('value');
			}
		}
	
		var p = document.createElement('p');
		var poplink = document.createElement('a');
		poplink.setAttribute('href',loc + "?" + vars);
		poplink.setAttribute('target','_blank');
		poplink.innerHTML += "Pop out the player <img border='0' src='http://www.suburbohemia.com/stuff/tab_add.png'/>";
		
		p.appendChild(poplink);
		q.parentNode.insertBefore(p, q.nextSibling);
		
	}
	
})();