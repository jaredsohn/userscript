// ==UserScript==
// @name        Facepunch Thread Discover
// @namespace   @luastoned
// @description Preview the thread title for forum urls
// @include     http*://*facepunch.com/threads/*
// @include     http*://*facepunch.com/showthread*
// @version     1.2
// ==/UserScript==

var tblLinks = document.getElementsByTagName("a");
for (var i = 0; i < tblLinks.length; ++i)
{
	var thisLink = tblLinks[i];
	if (thisLink.title)
		continue;
		
	if (!thisLink.href.contains("facepunch.com/showthread"))
		continue;
		
	if (thisLink.parentElement.className.match("nodecontrols"))
		continue;
		
	if (thisLink.parentElement.className.match("information"))
		continue;
	
	thisLink.fuckIndex = i;
	thisLink.onmouseover = function()
	{
		var threadLink = this;
		this.onmouseover = function() {};
		
		httpGet(threadLink.href, function(str)
		{
			var threadTitle = str.match("<title>(.*)<\/title>")[1];
			threadLink.title = threadTitle
			threadLink.innerHTML += " -> " + threadTitle;
		});
		
	}
}

function httpGet(str, callback)
{
	var ajaxRequest = new XMLHttpRequest();	
	ajaxRequest.onreadystatechange = function()
	{
		if (ajaxRequest.readyState == 4)
			callback(ajaxRequest.responseText);
	}
	
	ajaxRequest.open("GET", str, true);
	ajaxRequest.send(null);
}