// ==UserScript==
// @name			Auto Expand Navigation For Google Analytics
// @author			Erik Vergobbi Vold (erikvvold@gmail.com)
// @datecreated		2009-08-13
// @lastupdated		2009-12-18
// @namespace		gaNavAutoExpand
// @include			https://www.google.com/analytics/reporting/*
// @match			https://www.google.com/analytics/reporting/*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will automatically expand the subnavigation items that are expandable.
// ==/UserScript==

(function(){
	var report_nav_div = document.getElementById( "report_nav_div" );
	if(!report_nav_div) return false;
	var navItems = document.evaluate( "//a[@class='expandable']", report_nav_div, null, 7, null );
	if (navItems.snapshotLength == 0) return false;

	var simulateClick = function( el ) {
		var customEvent = document.createEvent("MouseEvents");
		customEvent.initMouseEvent(	"click",
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

	for (var i = navItems.snapshotLength - 1; i >= 0; i--) {
		simulateClick( navItems.snapshotItem(i) );
	}
})();