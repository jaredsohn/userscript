// Copyright (c) Steve McLenithan 2006
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Pandora Tuner Only
// @namespace      http://userscripts.org/users/10789
// @description   Hide everything but the pandora tuner.
// @include       http://www.pandora.com/*
// ==/UserScript==

var tuner = document.getElementById('tuner').innerHTML;
var newBody = 
'<html>' +
'<head>' +
'<title>Pandora</title>' +
'</head>' +
'<body>' + tuner +
'</body>' +
'</html>';


window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true);

DisableStyles();


function DisableStyles()
{
	var stylesheets, all, element;
	
	// this disables all externally linked stylesheets
	stylesheets = document.styleSheets;
	for (var i = 0; i < stylesheets.length; i++) 
	{
		stylesheets[i].disabled = true;
	}
	all = document.getElementsByTagName('*');
	for (var i = 0; i < all.length; i++) 
	{
		element = all[i];
		if (element.nodeName == 'STYLE') 
		{
			// this removes <style> elements defined anywhere on the page
			element.parentNode.removeChild(element);
		}
	}
}