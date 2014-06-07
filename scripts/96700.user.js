// ==UserScript==
// @name           discuz-deconfuse
// @namespace      http://userscripts.org/users/291370
// @include        */viewthread.php?tid=*
// @include        */thread-*
// ==/UserScript==

var trash = new Array();
deconfuse();

function deconfuse() {
	if(location.href){
		window.ua=navigator.userAgent;
		window.URL = location.href;
		if(ua.match(/Chrom(ium|e)|Iron/)){
			window.addEventListener("load", clean, false);
		} else if(ua.match("Gecko")) {
			window.addEventListener("load", clean, false);
		} else if(ua.match("Opera")) {
			document.addEventListener("DOMContentLoaded", clean, false);
		}
	}
	clean();
}

function clean() {
	//find span trash
	var sTags = document.getElementsByTagName("SPAN");
	for (var a = 0; a < sTags.length; a++) {
		elem = sTags[a];
		if (!elem.innerHTML.match("<") && elem.style.display == "none") {
			trash.push(elem);
		}
	}
	//find font trash
	var fTags = document.getElementsByTagName("FONT");
	for (var a = 0; a < fTags.length; a++) {
		elem = fTags[a];
		if (elem.style.fontSize=="0px") {
			trash.push(elem);
		}
	}
	//fuck the trash
	for (var a = 0; a<trash.length;a++) {
		elem = trash.pop();
		elem.parentNode.removeChild(elem);
	}
}
