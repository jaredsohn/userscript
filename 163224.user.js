// ==UserScript==
// @name        Google Search URL Fixer
// @namespace   https://userscripts.org/users/SystemDisc
// @description Rewrites Google Search results as to remove Google redirects
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     /^http[s]?:\/\/([a-z0-9]+\.)?google(\.[a-z]+)+\/search/
// @grant       none
// @downloadURL	https://userscripts.org/scripts/source/163224.user.js
// @updateURL	https://userscripts.org/scripts/source/163224.meta.js
// @version     1.81
// ==/UserScript==

this.$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

regex = /^http[s]?:\/\/([a-z0-9]+\.)?google(\.[a-z]+)+\/url/i;
$("#search a").each(function()
	{
		$(this).attr("onmousedown","");
		href = $(this).attr("href");
		if(href.match(regex))
		{
			if(href.indexOf("url=") != -1 && href.indexOf("&ei=") != -1)
			{
				$(this).attr("href",
					decodeURIComponent(href.substring(href.indexOf("url=")+4,
						href.indexOf("&ei="))));
			}
		}
	});