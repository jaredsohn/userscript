// ==UserScript==
// @name           hideautoreview
// @namespace      hideautoreview
// @description    Hides pages that were automatically reviewed
// @include        http://wiki.teamliquid.net/starcraft2/index.php?title=Special:Log&type=review*
// ==/UserScript==
var comments = document.getElementsByClassName("comment");
for(i=0;i<comments.length;i++) {
	if (comments[i].textContent.indexOf("(automatic)") == 1) {
		comments[i].parentNode.style.display = "none";
	}
}