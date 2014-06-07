// ==UserScript==
// @name           Remove Banners and Ads
// @namespace      http://myspace.com/
// @description    Remove Banners and Ads
// @include        http://*.myspace.com/*
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
{
	thisElement = iframes[i];
	thisElement.src = "";
	thisElement.style.visibility = 'hidden';
}
var dosubmit = false;
var dochapra = false;
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++)
{
	thisElement = inputs[i];
	if(thisElement.type == "submit" && thisElement.value == "Add to Friends")
	{
		if(dochapra == false)
		{
			thisElement.parentNode.parentNode.parentNode.parentNode.parentNode.submit();
		}
		dosubmit = true;
	}
	else if (thisElement.name == "CAPTCHAResponse")
	{
		dochapra = true;
	}
	else if (thisElement.name == "lastName")
	{
		dochapra = true;
	}
}
