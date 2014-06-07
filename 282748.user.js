// ==UserScript==
// @name           Google Ad Remover
// @namespace      http://hardi.anaski.net/
// @description    Removes ads from Google search result pages
// @version        1.2
// @author         Max Kueng
// @homepage       http://hardi.anaski.net/
// @include        http://*google.*/search*
// ==/UserScript==

(function () {
	var adbox0 = document.getElementById('mbEnd');
	var adbox1 = document.getElementById('tpa1');
	var adbox2 = document.getElementById('tpa2');
	var adbox3 = document.getElementById('tpa3'); // you kever know
	var adbox4 = document.getElementById('tpa4'); // you kever know
	// add more if needed
	
	if (adbox0) { adbox0.parentNode.removeChild(adbox0); }
	if (adbox1) { adbox1.parentNode.removeChild(adbox1); }
	if (adbox2) { adbox2.parentNode.removeChild(adbox2); }
	if (adbox3) { adbox3.parentNode.removeChild(adbox3); }
	if (adbox4) { adbox4.parentNode.removeChild(adbox4); }
	// add more if needed, too

}());

