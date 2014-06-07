// ==UserScript==
// @name        arkWikiMon
// @description Autologin wikiMon
// @namespace   chooz
// @author      chooz
// @version     1.1.201309
// @updateURL   http://userscripts.org/scripts/source/156471.user.js
// @include     http://wikimonetique.gicm.net:8080/wikimonetique/Login.jsp*
// ==/UserScript==

if (document.getElementsByName('uid').length == 1) {
	document.getElementsByName('uid')[0].value = '';
	document.getElementsByName('passwd')[0].value = '';
	document.getElementsByName('action')[0].click();
//	document.forms[0].submit();  // ne fonctionne pas ==> recharge en boucle
}

