// ==UserScript==
// @name           vkontakte_direct_external_links
// @author         DenisN
// @description    Removes stupid warnings about harmful external links.
// @namespace      http://userscripts.org/scripts/show/60802
// @include        http://vk.com/*
// @include        http://vkontakte.ru/*
// ==/UserScript==

function modifyLinks()
{
    var links = document.getElementsByTagName('a');
    var re = /http:\/\/vk.*?\/away\.php\?to=(.*)/;
    for (var i = 0, l = links.length; i < l; i++)
    {
    	links[i].href = unescape(links[i].href.replace(re, "$1"));
    }
}

document.addEventListener('DOMNodeInserted', modifyLinks, true);
modifyLinks();
