// ==UserScript==
// @author	   Or Parnes
// @name           Remove eye icon @ tapuz.co.il forums
// @namespace      **
// @include        *tapuz.co.il*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var rules = document.createTextNode('.message-indicators, .message-read-counter { display: none !important; }');
style.type = 'text/css';
if (style.styleSheet)
{
	style.styleSheet.cssText = rules.nodeValue;
}
else
{
	style.appendChild(rules);
}


head.appendChild(style);