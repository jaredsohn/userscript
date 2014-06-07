// ==UserScript==
// @name         Unlock AdFly
// @namespace    http://userscripts.org/users/522904
// @description  Unlocks adf.ly links that are blocked in some countries like India
// @include      *adf.ly*
// @grant        none
// @run-at       document-start
// @updateURL    http://userscripts.org/scripts/source/172198.meta.js
// @downloadURL  https://userscripts.org/scripts/source/172198.user.js
// @version      1.0.0
// @icon         https://adf.ly/favicon.ico
// ==/UserScript==

(function(){
	if(document.location.href.indexOf("http://adf.ly")==0)
		document.location.href=document.location.href.replace('http://','https://');
})();