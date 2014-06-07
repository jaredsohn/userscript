// ==UserScript==
// @name           Shortnews Video-Werbung ausblenden
// @namespace      http://nohomepageyet.de
// @description    Blendet die Video-Werbung unterhalb der Artikel aus.
// @include        http://www.shortnews.de/id/*
// ==/UserScript==

window.addEventListener(
    'load', 
    function() 
	{	
		var adDiv = document.getElementById('snackTVWidgetFrame_0');
		adDiv.style.display = 'none';
                adDiv.parentNode.removeChild(adDiv);
	}, true);