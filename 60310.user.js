// ==UserScript==
// @name		Userscripts.org Fancy Create Guide Button
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-22
// @namespace	usoFancyCreateNewGuideBtn
// @include		http://userscripts.org/guides?*
// @include		http://userscripts.org/guides#*
// @include		http://userscripts.org/guides
// @version		0.1
// @description	This userscript will make the 'create new guide' button more pleasant to look at.
// ==/UserScript==

(function(){
	var usoFancyCreateNewGuideBtn = {
		init: function(){
			var link=document.evaluate('//a[contains(text(),"create new guide") and contains(@href,"/guides/new")]', document, null, 9, null).singleNodeValue;
			if(!link) return;
			link.innerHTML+=" &raquo;";
			link.className+=" awesome small orange";
		}
	}
	usoFancyCreateNewGuideBtn.init();
})();