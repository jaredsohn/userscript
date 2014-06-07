// ==UserScript==
// @name           Gerrit no TR
// @namespace      datagutt
// @description    Remove translation commits from gerrit.
// @author         datagutt
// @match 	       http://review.cyanogenmod.org/*
// @match	       https://android-review.googlesource.com/*
// @version        0.7
// @date           2013-6-21
// ==/UserScript==
var previousHash;
function doMagic(){	
	var list = document.querySelectorAll('tr td:nth-of-type(3) .gwt-InlineHyperlink');
	[].forEach.call(list, function(el){
		if(el.outerText.toLowerCase().match(/translation/)){
			/* Yo dawg... */
			var parent = el.parentNode.parentNode;
			if(parent && parent.parentNode){
				parent.parentNode.removeChild(parent);
			}
		}
	});
};
function check(){
	if(window.location.hash.match("#/q/")){
		doMagic();
	}
};
window.onhashchange = check;
check();
setTimeout(check, 500);