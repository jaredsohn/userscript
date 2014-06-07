// ==UserScript==
// @name			AMO Automatically Ignore Version Check
// @author			Erik Vold
// @namespace		amoAutoIgnoreVersionCheck
// @include			http*://addons.mozilla.org/*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-18
// @lastupdated		2013-07-13
// @homepageURL         http://userscripts.org/scripts/show/66743
// @description		Automatically clicks the 'Ignore Version Check' links at addons.mozilla.org (AMO).
// ==/UserScript==

(function(){
	var simulateClick = function( el ) {
	   var customEvent = document.createEvent("MouseEvents");
	   customEvent.initMouseEvent(   "click",
	                        true,
	                        true,
	                        unsafeWindow,
	                        1,
	                        0,
	                        0,
	                        0,
	                        0,
	                        false,
	                        false,
	                        false,
	                        false,
	                        0,
	                        undefined
	                     );
	   el.dispatchEvent( customEvent );
	};
	var eles = document.evaluate("//a[contains(@class,'ignore-check')]",document,null,7,null);
	for(var i=0;i<eles.snapshotLength;i++) simulateClick(eles.snapshotItem(i));
})();