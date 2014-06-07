// ==UserScript==
// @name         Unlock AdFly In India
// @author       Amanat Khan
// @description  Unblock adf.ly in Countries like in India
// @run-at       document-start
// @include      http://*adf.ly*
// @version      1.0
// ==/UserScript==
(function(){
	if(document.location.href.indexOf("http://adf.ly")==0)
		document.location.href=document.location.href.replace('http://','http://v2.');
})();