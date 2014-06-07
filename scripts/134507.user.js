// ==UserScript==
// @name        DamnFF
// @author      skacurt
// @description Makes media links for human being in FF
// @include     http://friendfeed.com/*
// @version     0.1
// ==/UserScript==

(function(){
	function makeMediaLinksForHumanBeing(e){
		var re = /^http:\/\/m\.friendfeed-media\.com\/([a-f0-9]{40})$/gi;
		var pNode = e.target.parentNode;
		if(re.test(pNode) && (window.attachEvent ? pNode.innerText : pNode.textContent) == "")
			pNode.href = pNode.href.replace(re, "http://damnff.appspot.com/#$1");
	}
	if(window.attachEvent){
		window.attachEvent("onclick", makeMediaLinksForHumanBeing);
	} else {
		window.addEventListener("click", makeMediaLinksForHumanBeing, false);
	}
})();