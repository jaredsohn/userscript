// ==UserScript==
// @encoding    UTF-8
// @name        Remove peyvandha.ir
// @description Replaces censored content notice page (peyvandha.ir) of Islamic Republic of Iran with a more useful page.
// @namespace   http://userscripts.org/scripts/show/158535
// @include     *
// @version     0.3
// ==/UserScript==
// License: Public Domain
/*jslint browser: true*/
(function () {
    'use strict';
    function generateBlockedUsefulPage(loc) {
        var page = [],
            cache = 'https://webcache.googleusercontent.com/search?q=cache:' + loc,
            https = loc.replace('http://', 'https://');

        page.push('<p><a href="' + loc + '">This page</a> has been blocked by the Islamic Republic of Iran.</p>');

        page.push('<ul>');
        page.push('<li><a href="' + cache + '">Google web cache</a> (<a href="' + cache + '&strip=1">text only</a>)</li>');
        if (loc.indexOf('http://') === 0) {
            page.push('<li><a href="' + https + '">HTTP<big><b>S</b></big></a></li>');
        }
        page.push('</ul>');

        return page.join('');
    }

    var iframe = document.getElementsByTagName('iframe')[0];

    if (iframe !== undefined) {
        if (['http://10.10.34.34/'].filter(function (i) { return iframe.src.indexOf(i) !== -1; }).length > 0) {
            // one of filters addresses is matched
            // so its content is blocked
            document.head.innerHTML = '';
            document.body.innerHTML = generateBlockedUsefulPage(location.href);
        }
    }

    if (window.self === window.top) {
        // it is not iframe
        if (Array.prototype.filter.call(document.links, function (i) { return i.href.indexOf('//peyvandha.ir') !== -1; }).length > 5) {
            // there is more than 5 peyvandha.ir link on this page so it is blocked page
            location.href = 'data:text/html;charset=utf-8,' + generateBlockedUsefulPage(location.href);
        }
    }
}());