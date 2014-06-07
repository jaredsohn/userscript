// <![CDATA[
// ==UserScript==
// @name          Netvibes Toplink Remover
// @fullname      Netvibes Toplink Remover
// @author        Glenn Y. Rolland
// @version       2009-06-02.14
// @licence       GPL v2
// @namespace     http://userscripts.org/scripts/show/50706
// @description   Remove useless toplink (collapse, search, etc.) bar.
// @include       http://www.netvibes.com/*
// ==/UserScript==

window.setTimeout(function() {
	var topLinks = document.getElementById("topLinks");
	topLinks.style.visibility = 'hidden' ;
	topLinks.style.display = 'none';
}, 10 );

// ]]>