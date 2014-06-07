// ==UserScript==

// @name           vkontakte_direct_external_links_v2
// @author         DenisN
// @namespace      http://userscripts.org/scripts/show/76593
// @description    Removes stupid warnings about harmful external links.
// @include        http://vk.com/away.php*
// @include        http://vkontakte.ru/away.php*

// ==/UserScript==



function redirect()
{
	newBody = "Перенаправление...";
	document.body.innerHTML = newBody;
	var re = /http:\/\/vk.*?\/away\.php\?to=(.*)/;

	document.location.href = unescape(document.location.href.replace(re, "$1"));
}

redirect();
