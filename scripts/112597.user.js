// ==UserScript==
// @name           Tumblr No Confetti
// @namespace      http://sidebr.tumblr.com/
// @description    No Confetti
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent =  tag.textContent;
	document.body.appendChild(tag);
}

embedElement("script", "snowStorm.stop();", false);