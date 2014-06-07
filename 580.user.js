// Google Cache Continue
// $Id: google.cache.user.js 33 2005-12-29 16:54:00Z jon $
// Copyright (C) 2005 by Jonathon Ramsey (jonathon.ramsey@gmail.com)

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation; either version 2, or (at your
// option) any later version.

// This file is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this software; see the file COPYING. If not, write to
// the Free Software Foundation, Inc., 59 Temple Place - Suite 330,
// Boston, MA 02111-1307, USA.

// Thanks to Neil Klopfenstein for a fix to deal with the text only
// version of cached pages

// ==UserScript==
// @name           Google Cache Continue
// @namespace      htt://babylon.idlevice.co.uk/javascript/greasemonkey/
// @description    Add links to Google cache results to allow continuing using the cache; keeping search terms highlighted
// @include        http://*/search?*q=cache:*
// ==/UserScript==

(function() {
    /* Modify these vars to change the appearance of the cache links */
    var cacheLinkText = 'cache';
    var cacheLinkStyle = "\
a.googleCache {\
font:normal bold x-small sans-serif;\
color:red;\
background-color:yellow;\
padding:0 0.6ex 0.4ex 0.3ex;\
margin:0.3ex;\
}\
a.googleCache:hover {\
color:yellow;\
background-color:red;\
}\
p#googleCacheExplanation {\
border:1px solid green;\
padding:1ex 0.5ex;\
font-family:sans-serif;\
}\
";

    var parts = document.location.href.match(/http:\/\/[^\/]*\/([^\+]*)(\+[^&]*)/);
    var url = parts[1];
    var terms = parts[2];

    addStyles(cacheLinkStyle);

    if (googleHasNoCache()) {
        return addUncachedLink(url);
    }

    /* get a snapshot from the live dom */
    var links = document.evaluate("//a[@href]",
                                  document,
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
    var alter = false;
    var cached_text_only = false;
    var link, i;
    for (link = null, i = 0; (link = links.snapshotItem(i)); i++) {
        if (alter
            && linkIsHttp(link)) {
            addCacheLink(link, terms, cached_text_only, cacheLinkText);
        }
        if (isLastGoogleLink(link)) {
            alter = true;
            cached_text_only = isTextOnlyCache(link);
            addExplanation(link, cacheLinkText);
        }
    }

    function addStyles(cacheLinkStyle) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = cacheLinkStyle;
        document.body.appendChild(style);
    }

    function googleHasNoCache() {
        return 0 == document.title.indexOf('cache:');
    }

    function addUncachedLink(url) {
        var address = url.split('cache:')[1];
        var p = document.createElement('p');
        p.id = 'googleCacheExplanation';
        p.innerHTML = "<b>Uncached:</b> <a href='http://" + address + "'>" +
          address + '</a>';
        var suggestions = document.getElementsByTagName('ul')[0];
        var suggestion_header = suggestions.previousSibling.previousSibling;
        document.body.replaceChild(p, suggestion_header);
    }

    function linkIsHttp(link) {
        return 0 == link.href.search(/^http/);
    }

    function isLastGoogleLink(link) {
        return (-1 < link.text.indexOf('cached text') ||
                isTextOnlyCache(link));
    }

    function isTextOnlyCache(link) {
        return (-1 < link.text.indexOf('full cached page'));
    }

    function addExplanation(link, cacheLinkText) {
        var p = document.createElement('p');
        p.id = 'googleCacheExplanation';
        p.innerHTML = "Use <a href='" +
            document.location.href +
            "' class='googleCache'>" +
            cacheLinkText +
            "</a> links to continue using the Google cache.</a>";
        var tableCell = link.parentNode.parentNode.parentNode.parentNode;
        tableCell.appendChild(p);
    }
                                        
    function addCacheLink(link, terms, cached_text_only, cacheLinkText) {
        var cacheLink = document.createElement('a');
        cacheLink.href = getCacheLinkHref(link, terms, cached_text_only);
        cacheLink.appendChild(document.createTextNode(cacheLinkText));
        cacheLink.className = 'googleCache';
        link.parentNode.insertBefore(cacheLink, link.nextSibling);
    }

    function getCacheLinkHref(link, terms, cached_text_only) {
        var href = link.href.replace(/^http:\/\//, '');
        var fragment = '';
        if (hrefLinksToFragment(href)) {
            var parts = href.match(/([^#]*)#(.*)/, href);
            href = parts[1];
            fragment = '#' + parts[2];
        }
        var strip = '';
        if (cached_text_only) {
            strip = '&strip=1';
        }
        return 'http://www.google.com/search?q=cache:' +
          href + terms + fragment + strip;
    }

    function hrefLinksToFragment(href) {
        return (-1 < href.indexOf('#'));
    }

})();
