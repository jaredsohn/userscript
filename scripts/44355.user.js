// ==UserScript==
// @name           minimal-gmail
// @namespace      gmail
// @include        http://mail.google.com/* 
// @include        https://mail.google.com/*
// ==/UserScript==

/* SORRY BUT TODAY (2010-10-01 not work)
function removeGBar() {
	if (document.getElementById("gbar")) {
		var oHead = document.getElementById("gbar").parentNode.parentNode.parentNode.parentNode;
		oHead.style.display = "none";
		var i = 0;
		var oItem = oHead.nextSibling.firstChild.firstChild;
		while (oItem) {
			if (i != 2) {
				oItem.style.display = "none";
			}
			i++;
			oItem = oItem.nextSibling;
		}
		oHead.nextSibling.firstChild.childNodes[2].style.width = "100%";
	} else {
		setTimeout(function(){removeGBar()},200);
	}
}

window.addEventListener('load', removeGBar, true);
*/
// TODO: dont want work :P
// window.addEventListener('resize', removeGBar, true);
