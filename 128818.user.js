// ==UserScript==
// @name           Ogame login add remover
// @namespace      who.knows
// @include        http://ogame.*/
// @updateURL      http://userscripts.org/scripts/show/128818

// ==/UserScript==




function l() {
	var e = document.getElementById("fancybox-overlay");
	if(e != undefined) {
		e.style.display = 'none';
		document.getElementById("fancybox-wrap").style.display = 'none';
	} else {
		setTimeout(l, 100);
	}
}

l();
