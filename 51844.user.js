// ==UserScript==
// @name           Anonymouse Ads Remover
// @namespace      http://userscripts.org/users/47527
// @author         anh_surprised
// @include        http://*anonymouse.org/cgi-bin/anon-www.cgi/*
// ==/UserScript==

var el = document.getElementById('mouselayer');
el.parentNode.removeChild(el);

/* Previous version
(function(){
	document.getElementById('mouselayer').style.display="none";
})();*/