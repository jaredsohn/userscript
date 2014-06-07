// ==UserScript==
// @name           Remove Google Background
// @namespace      http://www.prdesignz.com
// @include        http://*.google.*
// ==/UserScript==



(function () {

	var intv = unsafeWindow.setInterval('if(document.getElementById("fpdi")) {document.getElementById("fpdi").parentNode.removeChild(document.getElementById("fpdi"));document.getElementById("logo").style.backgroundImage="url(\'http://www.google.com/intl/en_com/images/srpr/logo1w.png\')";}', 1);
	unsafeWindow.setTimeout('clearInterval('+intv+');', 5000);
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "#fctr, #fctr a, .sblc a, #cpFooter a, #cpf a, #prm a, #addlang, #addlang a, #fctr p {color:black !important;text-shadow:none !important;} #cpf {display:none !important;}";
    document.getElementsByTagName('body')[0].appendChild(style);
})();