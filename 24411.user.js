// ==UserScript==
// @name           Windows Live Mail Fixes
// @namespace      http://localhost/
// @description    Fixes Bugs in the Windows Live Mail e-mail client
// @include        http://by108w.bay108.mail.live.com/mail/mail.aspx*
// ==/UserScript==

window.setInterval(
function()
{
	//Correct sidebar height
	window.frames[2].document.getElementById("SideBar").style.height="70%";
	//Remove ads at top
	window.frames[2].document.getElementById("RadAd_TodayPage_Banner").style.display="none";
	window.frames[2].document.getElementById("RadAd_Banner").style.display="none";
},1000);