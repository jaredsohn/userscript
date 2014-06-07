// ==UserScript==
// @name           Tumblr No Second Copyright Footer
// @namespace      http://sidebr.tumblr.com/
// @description    Do you guys really need two? 
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/blog*
// ==/UserScript==

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent =  tag.textContent;
	document.body.appendChild(tag);
}

embedElement("script", "$('sidebar_footer_nav').hide();", false);