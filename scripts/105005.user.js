// ==UserScript==
// @name           InternalTagLinkRestyler
// @description    Change the appearence of internal 'tag' links from blogs and news sites
// @author         Mathieu Comandon <strycore@gmail.com>
// @namespace      http://strycore.com/greasemonkey/tagrestyler
// @include        http://*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated    2011-06-18
// @version 0.1
// ==/UserScript==

var host = window.location.host;
GM_addStyle('.internal-tag-link { color: #333 !important; text-decoration: none !important; border-bottom: 1px dotted #AAA }');
for (var i=0; i < document.links.length; i++) {
    link = document.links[i];
    if (link.href.indexOf(host + '/tag/') > 0 || link.href.indexOf(host + '/tags/') > 0) {
        link.className += "internal-tag-link";
    }
}
