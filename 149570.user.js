// ==UserScript==
// @name           Tumblr Detach
// @namespace      http://sidebr.tumblr.com/
// @description    Detaches 'right_column'
// @version        final
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*

(C) 2012 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

*/
function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent =  tag.textContent;
	document.body.appendChild(tag);
}

embedElement("script", "$('right_column').setAttribute('style', 'display:block;position:fixed;margin-left:646px;top:91px;width:215px');", false);