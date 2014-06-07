// ==UserScript==
// @name           dmm_nobuttons
// @version        0.2
// @description    Removes Facebook Like & Google+1 buttons from dmm.com
// @include        http://*dmm.*/*
// ==/UserScript==

(function() {
    var ignoreTags=["fb-like","g-plusone"];

    for(var i=0;i<ignoreTags.length;i++){
	buttons=document.getElementsByClassName(ignoreTags[i]);
	
	for(var j=0;j<buttons.length;j++){
	    buttons[j].parentNode.removeChild(buttons[j]);
	    console.log("finished removing "+ignoreTags[i]+" tag.");
	}
    }
})();