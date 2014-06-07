// ==UserScript==
// @name        oDesk New Tab
// @namespace   http://se7en-soft.com
// @description Opens oDesk Search Results in a new tab.
// @include     https://*.odesk.com/jobs/*
// @version     1
// ==/UserScript==

(function(){
	setInterval(fixLinks, 1500);
})()

function fixLinks()
{
	var resultLinks = document.getElementsByClassName('oVisitedLink');
	for(var i = 0; i < resultLinks.length; i++)
	{
		var lnk = resultLinks[i];
		if(lnk.getAttribute('onClick') == undefined)
			lnk.setAttribute('onClick',"window.open('" + lnk.href + "');return false;");
	}
}