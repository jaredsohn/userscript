// ==UserScript==
// @name          HW Zone Refresh Stopper
// @description   removes the unnecessary refresh from HWZone's pages
// @include       http://hwzone.co.il/*
// @include       http://www.hwzone.co.il/*
// ==/UserScript==

unsafeWindow.refresh = function() {};
unsafeWindow.adblock = false;
unsafeWindow.getRealWidth = function() { return 1; };
unsafeWindow.popupPCSPECS = function() {};

var divs = document.getElementsByTagName('div');
var fromEnd = 2;

var idx = divs.length - 1 - fromEnd;
var re = /<!-- bl -->/;
if (re.test(document.body.innerHTML) == true)
{
	divs[idx].parentNode.removeChild(divs[idx]);
}