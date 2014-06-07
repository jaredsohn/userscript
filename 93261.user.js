// ==UserScript==
// @name           Scroogepunch 2010 v3
// @namespace      http://rewrite.name/
// @description    FIX THIS COMPWHIZIAHAAAAAAAAAAA
// @include        http://*.facepunch.com/*
// ==/UserScript==

// By @a2h_, enjoy the Chrome kludge if you're writing a userscript

if (typeof(google) == 'undefined')
{
	stupidHackDesignedForChrome();
}
else
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + stupidHackDesignedForChrome + ')();'));
	document.head.appendChild(script);
}

function stupidHackDesignedForChrome()
{
	(function($) {
		$(document).ready(function() {
			$("[id*=SNOW_flake]").remove();
			SNOW_no = 0;
			SNOW_Time = null;
			SNOW_Weather = null;
		});
	})(typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery);
}