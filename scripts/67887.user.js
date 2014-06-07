// ==UserScript==

// @name           Roblox - Funny Money Script

// @namespace      http://userscripts.org/users/130357

// @description    Install this extention and then watch in amazement as you rapidly get more and more money on your Roblox acccount! Please note that this extention only makes it appear that you are making lots of money, it does not actually change the ammount of money in your Roblox account. Also, this script is the first userscript I have ever made, so it may be a bit buggy.

// @include        http://www.roblox.com/*
// @version       1.3

// ==/UserScript==
bux = document.getElementById("ctl00_ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink")
tix = document.getElementById("ctl00_ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink")

// Object IDs are different on the pages that are not under My Roblox
if (bux == null)
{
bux = document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink")
}
if (tix == null)
{
tix = document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink")
}

buxValue = bux.innerHTML
tixValue = tix.innerHTML

// Convert to Numbers
buxValue = buxValue.replace("ROBUX", "")
buxValue = buxValue.replace(" ", "")
buxValue = buxValue.replace(",", "")
buxValue = buxValue * 1

tixValue = tixValue.replace("Tickets", "")
tixValue = tixValue.replace(" ", "")
tixValue = tixValue.replace(",", "")
tixValue = tixValue * 1

buxSpeed = 30
tixSpeed = 19

// This function is taken from http://www.mredkj.com/javascript/nfbasic.html
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function doBuxCount()
{
	bux.innerHTML = addCommas(buxValue) + " ROBUX"
	buxValue++
	buxT = setTimeout("doBuxCount()", buxSpeed);
}

function doTixCount()
{
	tix.innerHTML = addCommas(tixValue) + " Tickets"
	tixValue++
	tixT = setTimeout("doTixCount()", tixSpeed);
}

doBuxCount()
doTixCount()