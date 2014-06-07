// ==UserScript==
// @name           Plurk mani.uw.hu/i/kep.php integrator
// @namespace      http://userscripts.org/users/68673
// @description    Táblákat tartó szmájlik beszúrása a plurkbe
// @include        http://*.plurk.com/*
// @include        http://plurk.com/*
// ==/UserScript==

(function(){
    var reg = /\{([a-zA-Z0-9]+)\}/g;
    var replaceTabla = function() {
	if (reg.test(this.value))
	    this.value = this.value.replace(reg, 'http://mani.uw.hu/i/kep.php?t=$1#.gif ');
    };
    setTimeout(function() {
	    if (location.href.split('/')[3] == 'p')
		document.getElementById('input_permalink').addEventListener('keyup', replaceTabla, false);
	    else {
		document.getElementById('input_big').addEventListener('keyup', replaceTabla, false);
		document.getElementById('input_small').addEventListener('keyup', replaceTabla, false);
	    }
	}, 2000);
})();