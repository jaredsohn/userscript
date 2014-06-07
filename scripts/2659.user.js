// ==UserScript==
// @name		gsmls.com Usability 1
// @namespace	http://gsmlsusability.loc
// @description	Changes pages to use GET instead of POST. Allows easy IM, email, or bookmark for these pages.
// @include		http://publicstage.gsmls.marketlinx.com/counties.asp*
// @include		http://publicstage.gsmls.marketlinx.com/communities.asp*
// @include		http://new.gsmls.com/public/communities.jsp*
// @include		http://new.gsmls.com/public/selectaCounty.jsp*
// @date          2006-01-13
// @version       0.1.0
// @GM_version    0.6.4
// ==/UserScript==

(function() {
	document.forms.namedItem("form1").method = "get";
}) ();


