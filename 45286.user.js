// ==UserScript==
// @name           Partis title fix
// @namespace      partis
// @description    Fixes a partis title
// @include        http://*partis.si/torrent/podrobno/*
// ==/UserScript==

runPartisFix = function() {
	var newTitle = document.getElementsByClassName('h11')[0].innerHTML;
	if (newTitle != '') {
		document.title = newTitle.replace(/\./gi, ' ');;
	}
}

runPartisFix();