// ==UserScript==
// @name           Reddit gonewild Open All Links
// @namespace      sixbysevenandahalf
// @description    Opens all of a submitter's links on reddit gonewild
// @include        http://*.reddit.com/r/gonewild/comments/*
// ==/UserScript==

var userControlsAdded = false;

function XPATHExec(xpath, func, item) 
{
	if (arguments.length < 3) item = document;
	var result = document.evaluate(xpath, item, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < result.snapshotLength; i++) 
	{
		func(result.snapshotItem(i));
	}
}

function LoadPage()
{
	if (GM_getValue(document.location.href) != true)
	{
		OpenAllLinks();
		
		GM_setValue(document.location.href, true);
	}
	if (!userControlsAdded)
	{
		XPATHExec("//div[@id='siteTable']//p[@class='tagline']/..", CreateUserControls);
	}
}

function CreateUserControls(p)
{
	var boldedLink = document.createElement("b");
	
	var link = document.createElement("a");
	link.textContent = "Open all submitter links...";
	link.href = "#";
	link.addEventListener("click", function(){OpenAllLinks();}, false);
  
	boldedLink.appendChild(link)
	p.appendChild(boldedLink);
  
	userControlsAdded = true;
}

function OpenAllLinks()
{
	XPATHExec("//div[@class='expando']//a[not(contains(@href,'/r/gonewild'))]", OpenLink); 
	XPATHExec("//div[@id='siteTable']//a[contains(@class,'thumbnail') and not(contains(@href,'/r/gonewild'))]", OpenLink);
	XPATHExec("//a[contains(@class,'submitter')]/../../form[@class='usertext']//a[not(contains(@href,'/r/gonewild'))]", 

OpenLink);
}

function OpenLink(a)
{
	GM_openInTab(a.href);
}

LoadPage();
