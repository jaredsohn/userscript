// ==UserScript==
// @name Garmin Connect Activity to Metric v3
// @namespace PADB
// @description Redirect Statute activity to Metric activity on Garmin Connect site
// @include http://connect.garmin.com/activity/*
// ==/UserScript==
if(document.getElementsByClassName("userMetrics")[0].innerHTML.search("Metric") != -1)
{
	window.location.href = window.location.href + "?actionMethod=page/user/signin.xhtml:userSwitcher.switchSystem";
}



