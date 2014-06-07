// ==UserScript==
// @name           Boston.Com Real Estate JS Link -> Direct Link
// @namespace      evildonald.net
// @description    Boston.Com Real Estate JS Link -> Direct Link
// @include        http://re.boston.com/*
// ==/UserScript==

var aList = document.getElementsByTagName('a');

for ( index = 0; index < aList.length; index++)
{
	var control = aList[index];
	
	if(control.href.indexOf('LookDetails') > -1)
	{		
		control.removeAttribute('onclick');
		var linkId = control.href.replace(/javascript:LookDetails\('/gi, "").replace(/',[0-9]+\)/gi, "");
		control.href = "View_Ulisting.asp?lid=" + linkId;		
	}
}

