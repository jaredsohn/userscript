// ==UserScript==
// @name           Windows Live Banner Ad Remover
// @namespace      scross01.gmail.com
// @description    Windows Live Banner Ad remover
// @include        http://*.live.com/*
// @include        https://*.live.com/*
//
// Version History
// 1.0 Initial Version
// 2.0 Added Live Calendar
// 2.1 Additional support for Windows Live Mail
// ==/UserScript==

var banner;

// Windows Live Hotmail
if (document.getElementById("adHeader") != null)
{
	banner = document.getElementById("adHeader");
	banner.parentNode.removeChild(banner);
}
if (document.getElementById("dSideAdsDiv") != null)
{
	banner = document.getElementById("dSideAdsDiv");
	banner.parentNode.parentNode.removeChild(banner.parentNode);
}
// Windows Live Mail
if (document.getElementById("RadAd_TodayPage_Banner") != null)
{
	banner = document.getElementById("RadAd_TodayPage_Banner");
	banner.parentNode.removeChild(banner);
}
if (document.getElementById("cRadAdsToday") != null)
{
	banner = document.getElementById("cRadAdsToday");
	banner.parentNode.removeChild(banner);
}


// Windows Live Spaces
if (document.getElementById("AdContainer") != null) 
{
	banner = document.getElementById("AdContainer");
	banner.parentNode.removeChild(banner);
}
if (document.getElementById("DashboardAdPart") != null) 
{
	banner = document.getElementById("DashboardAdPart");
	banner.parentNode.removeChild(banner);
}


// Windows Live Gallery
if (document.getElementById("ctl00_HeaderNormal1_AdsContainer1_noAjaxAdsScript") != null)
{
	banner = document.getElementById("ctl00_HeaderNormal1_AdsContainer1_noAjaxAdsScript");
	banner.parentNode.parentNode.removeChild(banner.parentNode);
}
if (document.getElementById("ctl00_HeaderNormal1_AdsContainer1") != null)
{
	banner = document.getElementById("ctl00_HeaderNormal1_AdsContainer1");
	banner.parentNode.parentNode.removeChild(banner.parentNode);
}

// Windows Live SkyDrive
if (document.getElementById("adOuterContainer") != null)
{
	banner = document.getElementById("adOuterContainer");
	banner.parentNode.parentNode.parentNode.removeChild(banner.parentNode.parentNode);
}

// Windows Live Calendar
if (document.getElementById("RadAd_Banner") != null)
{
	banner = document.getElementById("RadAd_Banner");
	banner.parentNode.removeChild(banner);
}

// Windows Live Calendar Beta
if (document.getElementById("CalendarAdsTopContainer") != null)
{
	banner = document.getElementById("CalendarAdsTopContainer");
	banner.parentNode.removeChild(banner);
}
