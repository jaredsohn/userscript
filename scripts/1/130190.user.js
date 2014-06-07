// ==UserScript==
// @name          Twinoid No Wall
// @description	  Waaaaaaaaaaa I hate change
// @author        coro
// @include       http://twinoid.com/*
// @run-at        document-start
// ==/UserScript==

(function() {
	var css = '.tid_twinoidWall .tid_wallEvent { display: none; }';
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
})();