// ==UserScript==
// @name           Tumblr No Help
// @namespace      http://sidebr.tumblr.com/
// @description    Replaces the help icon's href to go to /inbox
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent =  tag.textContent;
	document.body.appendChild(tag);
}

embedElement("script", "$$('a[href=\"/help\"]')[0].setAttribute('href','/inbox');", false);