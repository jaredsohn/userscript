// ==UserScript==
// @name           ProxyCap Auto Refresh
// @description    ProxyCap Auto Refresh.
// @include        *127.0.0.1:20547*
// ==/UserScript==

function lll(){
	window.location.reload();
}
window.setInterval(lll, 1000);