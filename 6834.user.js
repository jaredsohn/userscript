// ==UserScript==
// @name          Tabulas Comment Popup
// @namespace     http://tabulas.com/~dodozhang21
// @description   Makes the comment link open in a popup window so you don't have to leave the page.
// @include       http://*.tabulas.com/*
// ==/UserScript==

(function(){
	var l = document.getElementsByTagName("a");
	var uim = "";
	var cand = null;
	var LeftPosition = (screen.width) ? (screen.width-500)/2 : 0;
	var TopPosition = (screen.height) ? (screen.height-500)/2 : 0;
	var i = 0;
	for (i = 0; i<l.length; i++) {
		cand = l[i];
		if (uim = cand.getAttribute('href')) {
			if(uim.search("#comment") >= 0) {
				cand.setAttribute('href', "#");
				cand.setAttribute('onclick', "window.open('"+uim+"','tabulasComments','left="+LeftPosition+",top="+TopPosition+",width=500,height=500,toolbar=0,resizable=yes,scrollbars=yes');return false");
			}
		}
	}
})();

