// ==UserScript==
// @name           Tumblr Fanmove
// @namespace      http://sidebr.tumblr.com/
// @description    Moves the fanmail button
// @version        1.0
// @include        http://www.tumblr.com/dashboard/iframe*
// ==/UserScript==

/*

(C) 2012 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

Be aware, that this will move more than just the fanmail icon. YMMV

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent =  tag.textContent;
	document.body.appendChild(tag);
}

embedElement("script", "document.getElementsByTagName('img')[0].style.marginRight = '21px';", false);