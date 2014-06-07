// ==UserScript==
// @name           SetsDB
// @description    SetsDB - Hacks Be Gone. (AKA: vislip.nl or XJZ.nl)
// @include        http://www.vislip.nl/*
// @include        http://clb1.com/*
// ==/UserScript==

//GM_addStyle("_BODY {cursor: default;}");

var basehref = document.location.href;
try{
	if(basehref.split("http://").length > 2)
		{
			window.top.location.href = "http://" + basehref.split("http://")[2];
		}
}
catch(err){}

function eventHandler(e)
{
	if(e.which ==1)
	{
		var isLink = false, thishref = "", thistarget = "";
	
		if(e.target.tagName == "A" || e.target.tagName == "IMG" || e.target.tagName == "DIV")
		{
			if(e.target.tagName == "IMG")
			{
				if(e.target.parentNode)
				{
					if(e.target.parentNode.tagName == "A")
					{
						isLink = true;
						thishref = e.target.parentNode.href;
						thistarget = e.target.parentNode.target;
					}
				}
			}
			if(e.target.tagName == "DIV")
			{
				if(e.target.parentNode)
				{
					if(e.target.parentNode.tagName == "A")
					{
						isLink = true;
						thishref = e.target.parentNode.href;
						thistarget = e.target.parentNode.target;
					}
				}
			}
			else if(e.target.tagName == "A")
			{
				isLink = true;
				thishref = e.target.href;
				thistarget = e.target.target;
			}
			if (e.cancelable && isLink)
			{
				e.preventDefault();
				
				if(thishref.split("http://").length > 2)
				{
					thishref = "http://" +  thishref.split("http://")[2];
				}
				if(thishref.match("imagevenue"))
				{
					GM_openInTab(thishref);
				}
				else
				{
					window.top.location.href =  thishref;
				}
			}
		}
	}
}
document.addEventListener('click', eventHandler, false);