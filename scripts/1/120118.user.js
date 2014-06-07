// ==UserScript==
// @name           Bypass YouTube Age Verification
// @description   Bypass Youtube age verification by redirecting to nsfwyoutube.com
// @author          Mr. Comedian
// @include        *youtube.com*
// ==/UserScript==

if(document.getElementById('watch7-player-age-gate-content'))
	{
		location.href=location.href.replace("youtube","nsfwyoutube");
	}
if(document.getElementById('verify-details'))
	{
		location.href=location.href.replace("youtube","nsfwyoutube");
	}