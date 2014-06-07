// ==UserScript==
// @name           Stack Overflow - Views Prefix Fix
// @namespace      http://userscripts.org
// @description    Moves the prefix on "views" up so it's next to the actual number on Stack Overflow and related websites. Not necessary on Stack Exchange sites.
// @include        http://stackoverflow.com/
// @include        http://stackoverflow.com/?tab=*
// @include        http://stackoverflow.com/users/*
// @include        http://meta.stackoverflow.com/
// @include        http://meta.stackoverflow.com/?tab=*
// @include        http://meta.stackoverflow.com/users/*
// @include        http://serverfault.com/
// @include        http://serverfault.com/?tab=*
// @include        http://serverfault.com/users/*
// @include        http://superuser.com/
// @include        http://superuser.com/?tab=*
// @include        http://superuser.com/users/*
// ==/UserScript==

/* version 3/26/2010 */

var $ = (typeof unsafeWindow !== "undefined") ? unsafeWindow.$ : window.$;

$("div.views").each(function ()
{
	var divs = $(this).children("div");
	if(divs[1].innerHTML.length == 6)
	{
		divs[0].childNodes[0].innerHTML += divs[1].innerHTML.substr(0,1);
		divs[1].innerHTML = "views";
	}
});
