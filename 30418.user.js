// ==UserScript==
// @name          Hotmail Remove Junk and Login Directly to Inbox by DemianGod
// @description	  Hotmail Remove Junk and Login Directly to Inbox
// @include       http://*.mail.live.*
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
var logo = document.getElementById('adHeader');
logo.style.display = "none";
var logo = document.getElementById('uxp_hdr_jewelParent');
logo.style.display = "none";
var logo = document.getElementById('uxp_hdr_tabs');
logo.style.display = "none";
var logo = document.getElementById('CustComm_120x60');
logo.style.display = "none";
var logo = document.getElementById('CustComm_300x125_TodayPage');
logo.style.display = "none";
var logo = document.getElementById('RadAd_Today300');
logo.style.display = "none";
var logo = document.getElementById('MsnTodayHeader');
logo.style.display = "none";
var logo = document.getElementById('tabContentContainer');
logo.style.display = "none";

var srch = "000000000001";
var replc = ""
var url1,url2;
url1 = [srch];
url2 = [replc];
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	window.location = tmp;
	}
	}
    }