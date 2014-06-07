// ==UserScript==
// @name           Roblox Money Signature
// @namespace      PlusJon
// @description    Automatically adds a signature to Forum Posts that states your current ROBUX and Tix.
// @include        *.roblox.com*
// @version        1.25
// ==/UserScript==

// Update Log

// 1.25: Extended horizontal line
// 1.20: Fixed grammatical error
// 1.15: Added horizontal line just before siggy
// 1.05: Fixed grammatical errors

(function() {

	var tix = document.getElementById('ctl00_cphBanner_MenuRedesign_BannerAlertsAndOptionsLoginView_BannerAlertsAndOptions_Authenticated_TicketsAlertCaption').innerHTML.replace(/,/g, "");
	var robux = document.getElementById('RobuxAlertCaption').innerHTML.replace(/,/g, "");
	var br = "\n";
	var line = "_____________________________________________________________________________";
	
	var sig = br + br + line + br + "I have R$" + robux + " and T$" + tix + "!";

	if(document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody')) {
		document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').defaultValue = sig;
	}
})();