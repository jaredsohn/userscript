// ==UserScript==
// @name			AMO Automatically Let Me Install Experimental Add-ons
// @author			Erik Vold
// @namespace		amoAutoLetMeInstall
// @include			http*://addons.mozilla.org/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-13
// @lastupdated		2010-01-13
// @description		Automatically checks the 'Let me install this experimental add-on.' checkboxes at addons.mozilla.org (AMO).
// ==/UserScript==

(function(){
	var eles = document.evaluate("//input[contains(@id,'confirm-')]",document,null,7,null);
	for(var i=0;i<eles.snapshotLength;i++){
		eles.snapshotItem(i).click();
	}
})();