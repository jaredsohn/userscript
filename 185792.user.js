// ==UserScript==
// @name        Descarlozador
// @namespace   descarlozador
// @include     http://meiobit.com/*
// @version     1
// @run-at		document-end
// @grant       none
// ==/UserScript==

listaposts = document.getElementById("posts").children
for(i=0; i < listaposts.length; i++) {
    if (listaposts[i].getElementsByClassName("title")[0]) {
		if (listaposts[i].getElementsByClassName("date")[0].textContent.match(/(Cardoso)/i)) {
			listaposts[i].style.display = "none";
		}
	}
}