// ==UserScript==
// @name			Userscripts.org Remove Post Actions Bar
// @author			Erik Vergobbi Vold
// @namespace		usoRemovePostActionsBar
// @include			http://userscripts.org/scripts/show/*
// @match			http://userscripts.org/scripts/show/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-24
// @lastupdated		2009-12-18
// @description		Removes the post actions bar at the bottom of userscript 'about' pages of userscripts.org
// ==/UserScript==

(function(){
	var pa=document.evaluate("//div[@id='content']/div[contains(@class,'postactions')]",document,null,9,null).singleNodeValue;
	if (!pa) return;
	pa.parentNode.removeChild(pa);
})();