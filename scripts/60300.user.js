// ==UserScript==
// @name		Update UserScript.org 'Browse All Members' Link To Be Sort By Scripts
// @author		Erik Vold
// @datecreated	2009-08-21
// @lastupdated	2009-08-22
// @namespace	userscriptsOrgBrowseMembersLinkSortByScripts
// @include		http://userscripts.org/users
// @version		0.1
// @description	This userscript will update userscripts.org's 'browse all members' link to be sort by scripts.
// ==/UserScript==

(function(){
	var a=document.evaluate("//a[contains(text(),'browse all members')]",document,null,9,null).singleNodeValue;
	if(!a) return;
	a.href="/users?sort=scripts";
})();