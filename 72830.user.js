// ==UserScript==
// @name           4F Forum
// @namespace      4fuckr
// @description    Annafilter
// @include        http://forum.4fuckr.com/*
// ==/UserScript==



(function() {
	var allT;
	var plonk = new Array();
	allT = document.getElementsByTagName('table');
	for (var i = 0; i < allT.length; i++) {
	    if(allT[i].innerHTML.match(/Diese Nachricht ist versteckt, da sich <strong>(\w+)<\/strong> auf Ihrer <a href=\"profile/)){
		    allT[i].style.display="none";
	    	
	    	//Add ignored user to list of ignored users
	    	plonk[RegExp.$1] = RegExp.$1;
	    	}
		}

	// Remove posts that quote a user on the ignore list
	for (var i = 0; i < allT.length; i++) {
		for (var x in plonk) {
		    if(allT[i].innerHTML.match("Zitat von <strong>"+plonk[x])){
			    allT[i].style.display="none";
	    		}
    		}
    	}
    	
})();
