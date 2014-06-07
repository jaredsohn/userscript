// ==UserScript==
// @name			Userscripts.org Remove 'Share' Tab
// @author			Erik Vergobbi Vold
// @namespace		userscriptsOrgRemoveShareTab
// @include			http://userscripts.org/scripts/*
// @include			http://userscripts.org/topics/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-21
// @lastupdated		2009-10-22
// @homepageURL http://userscripts.org/scripts/show/60295
// @description		Removes the 'Share' tab from userscript pages on userscripts.org
// ==/UserScript==

var userscriptsOrgRemoveShareTab={
	init: function(){
		var scriptNav = document.getElementById("script-nav");
		if (!scriptNav) return;
		var shareTab=document.evaluate('.//li/a[contains(text(),"Share")]',scriptNav,null,9,null).singleNodeValue;
		if(!shareTab) return;
		scriptNav.removeChild(shareTab.parentNode);
	}
};
userscriptsOrgRemoveShareTab.init();