// ==UserScript==
// @name          Windows Live Mail AD Hider With Calendar
// @namespace     http://by117w.bay117.mail.live.com/
// @description   Hides AD'S on top And Keep the Calendar By Alexonlu@hotmail.com
// @include       http://*.mail.live.com/* 
// @include       https://*.mail.live.com/* 
// ==/UserScript==

(function()
{	
	//Remove top AD
	document.getElementById("RadAd_Banner").style.display='none';
	document.getElementById("RadAd_TodayPage_Banner").style.display='none';
	//Remove Today Page AD
	document.getElementById("CustComm_120x60").style.display='none';
       document.getElementById("CustComm_300x125_SMCPage").style.display='none';
	document.getElementById("RadAd_Today300").style.display='none';
	document.getElementById("RadAd_SMC600").style.display='none';
	document.getElementById("CustComm_300x125_TodayPage").style.display='none';
})()