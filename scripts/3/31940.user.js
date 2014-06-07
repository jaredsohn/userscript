// Google Cache Continue Redux L10N
// Based on Google Cache Continue Redux by Jeffery To
// Also based on Google Cache Continue by Jonathon Ramsey

// Copyright (C) 2005, 2008 by
//   Jonathon Ramsey (jonathon.ramsey@gmail.com)
//   Jeffery To (jeffery.to @gmail.com)
//   Johans Marvin Taboada Villca (jmt4b04d4v@gmail.com)

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

// (Comment by Jonathon Ramsey:)
// Thanks to Neil Klopfenstein for a fix to deal with the text only
// version of cached pages

// More L10N by: Johans Marvin Taboada Villca (jmt4b04d4v@gmail.com)
// Description:  Updated script <Google Cache Continue Redux> 
//               [http://userscripts.org/scripts/show/30878]
//               was missing some string translations, just that.
// Web sites:    http://ajayu.memi.umss.edu.bo/jmtaboadav/
//               http://softwarelibre.org.bo/jmtaboadav/

// ==UserScript==
// @name           Google Cache Continue Redux L10N
// @namespace      http://softwarelibre.org.bo/jmtaboadav/greasemonkey/
// @description    Add links to Google cache results to allow continuing using the cache, keeping search terms highlighted
// @include        http://*/search?*q=cache:*
// @include        http://*/search?*q=cache%3A*
// @include        http://*/search?*q=cache%3a*
// ==/UserScript==

(function() {
    /* Modify these if you use Google in a language other than English */
    /*var google = {
        noCacheTitle: 'Google Search',
        textOnlyLinkText: 'Text-only version',
        fullLinkText: 'Full version'
    };
    var moreL10N = {
        cacheLinkText: 'cache',
        uncachedLinkHTMLLabel: 'Uncached',
        explanationHTMLLabelPrefix: 'Use',
        explanationHTMLLabelSufix: 'links to continue using the Google cache'
    };*/
    /* Default is Spanish */
    var google = {
        noCacheTitle: 'Búsqueda en Google',
        textOnlyLinkText: 'Versión de solo texto',
        fullLinkText: 'Versión completa'
    };
    var moreL10N = {
            cacheLinkText: 'caché',
            uncachedLinkHTMLLabel: 'Página sin caché',
            explanationHTMLLabelPrefix: 'Utilice los enlaces',
            explanationHTMLLabelSufix: 'para continuar utilizando el caché de Google'
    };

    /* Modify these to change the appearance of the cache links */
    var cacheLink = {
        text: moreL10N.cacheLinkText,
        style: '\
            a.googleCache {\
                position: static !important;\
                display: inline !important;\
                visibility: visible !important;\
                margin: 0.3ex !important;\
                padding: 0 0.6ex 0.4ex 0.3ex !important;\
                border: none !important;\
                font: normal bold x-small sans-serif !important;\
                background: yellow !important;\
                color: red !important;\
                text-align: left !important;\
                text-decoration: none !important;\
                text-transform: none !important;\
                letter-spacing: normal !important;\
                word-spacing: normal !important;\
                vertical-align: baseline !important;\
                cursor: auto !important;\
            }\
            a.googleCache:hover {\
                color: yellow !important;\
                background-color: red !important;\
            }\
            p#googleCacheExplanation {\
                position: static !important;\
                display: block !important;\
                visibility: visible !important;\
                width: auto !important;\
                height: auto !important;\
                margin: 1em 0;\
                padding: 1ex 0.5ex;\
                border: 1px solid #3366CC;\
                font-family: inherit !important;\
                font-style: normal !important;\
                font-variant: normal !important;\
                font-weight: normal !important;\
                font-stretch: normal !important;\
                font-size: inherit !important;\
                font-size-adjust: none !important;\
                line-height: inherit !important;\
                background: transparent !important;\
                color: black !important;\
                text-align: left !important;\
                text-decoration: none !important;\
                text-transform: none !important;\
                letter-spacing: normal !important;\
                word-spacing: normal !important;\
                vertical-align: baseline !important;\
                cursor: auto !important;\
            }\
        '
    };

    var cacheTerm = null;
    var url = null;
    var q = null;
    var links, alter, link;
    var parts, len, p, i;

    parts = document.location.search.substring(1).split('&');
    len = parts.length;
    for (i = 0; i < parts.length; i++) {
        p = parts[i].split('=');
        if (p[0] == 'q') {
            q = p[1];
            break;
        }
    }

    if (q == null) {
        return;
    }

    parts = q.split('+');
    len = parts.length;
    for (i = 0; i < len; i++) {
        p = decodeURIComponent(parts[i]);
        if (p.indexOf('cache:') == 0) {
            cacheTerm = parts[i];
            url = p.substring(6);
            break;
        }
    }

    if (cacheTerm == null) {
        return;
    }

    addStyles(cacheLink.style);

    if (googleHasNoCache()) {
        return addUncachedLink();
    }

    /* get a snapshot from the live dom */
    links = document.evaluate("//a[@href]",
                              document,
                              null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
    alter = false;
    link = null;
    for (i = 0; (link = links.snapshotItem(i)); i++) {
        if (alter) {
            if (linkIsHttp(link)) {
                addCacheLink(link);
            }
        } else {
            if (isLastGoogleLink(link)) {
                alter = true;
                addExplanation(link);
            }
        }
    }

    function addStyles(rules) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = rules;
        document.body.appendChild(style);
    }

    function googleHasNoCache() {
        var title = document.title;
        return (title.indexOf('cache:' + url) > -1 &&
            title.search(new RegExp(' - ' + google.noCacheTitle + '$')) >
            -1);
    }

    function addUncachedLink() {
        var p = document.createElement('p');
        p.id = 'googleCacheExplanation';
        p.innerHTML = '<b>' + moreL10N.uncachedLinkHTMLLabel + 
            ':</b> <a href="http://' + url + '">' +
            url + '</a>';
        var suggestion_header =
            document.getElementsByTagName('ul')[0].previousSibling.previousSibling;
        suggestion_header.parentNode.replaceChild(p, suggestion_header);
    }

    function linkIsHttp(link) {
        return (link.protocol == 'http:');
    }

    function isLastGoogleLink(link) {
        return (link.text == google.textOnlyLinkText ||
            link.text == google.fullLinkText);
    }

    function addExplanation(link) {
        var p = document.createElement('p');
        p.id = 'googleCacheExplanation';
        p.innerHTML = moreL10N.explanationHTMLLabelPrefix + ' <a href="' +
            document.location.href +
            '" class="googleCache">' +
            cacheLink.text +
            '</a> ' + moreL10N.explanationHTMLLabelSufix + '.</a>';
        link.parentNode.parentNode.appendChild(p);
    }

    function addCacheLink(link) {
        var a = document.createElement('a');
        a.href = getCacheLinkHref(link);
        a.appendChild(document.createTextNode(cacheLink.text));
        a.className = 'googleCache';
        link.parentNode.insertBefore(a, link.nextSibling);
    }

    function getCacheLinkHref(link) {
        var curHref = document.location.href;
        var curHash = document.location.hash;
        var href = link.href.replace(/^http:\/\//, '');
        var hash = link.hash;
        var fragment = '';
        if (curHash) {
            curHref = curHref.replace(curHash, '');
        }
        if (hash) {
            href = href.replace(hash, '');
            fragment = hash;
        }
        return curHref.replace(cacheTerm,
            encodeURIComponent('cache:' + href)) + fragment;
    }

})();
