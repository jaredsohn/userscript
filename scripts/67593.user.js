// ==UserScript==
// @name           Google logo go's loco
// @version        1.0
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @exclude        http://www.google.*/*q=*
// ==/UserScript==

(function () {
	var logo = document.getElementById("logo");	
        logo.src = 'http://www.thatsloco.com/google-loco.gif';
        logo.width = '276';
	logo.height = '110';
})();
