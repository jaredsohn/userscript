// GreaseMonkey Script: FusionReactor - Slow Requests - Click Details Fix
// Author: Jeff S.
// Date: October 16, 2009
//
// --------------------------------------------------------------------
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FusionReactor - Slow Requests - Click Details Fix",
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FusionReactor - Slow Requests - Click Details Fix
// @namespace     http://groups.google.com/group/fusionreactor/
// @description   Allows "Click Detail" functionality on the "Slow Requests" page
// @include       */fusionreactor/fmetrics.cfm?mode=slow 
// ==/UserScript==


window.addEventListener(
	"load",
	function() {
		if(typeof clickDetails != "function") {
			document.body.appendChild(document.createElement('script')).innerHTML= "function clickDetails(id){document.location='/fusionreactor/frequestdetail.cfm?id='+id+'&backUrl='+escape('/fusionreactor/fmetrics.cfm?mode=slow');}";
		}
	},
	true
);