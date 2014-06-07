// ==UserScript==
// @name           Secure connections on sites
// @namespace      http://userscripts.org/users/23652
// @description    Forces known sites to use a secure connection
// @include        http://*paypal.com/*
// @include        http://www.google.com/accounts/ServiceLogin?service=mail*
// @include        http://addons.mozilla.org/*
// @include        http://*isohunt.com/*
// @include        http://*evernote.com/*
// @include        http://*binsearch.info/*
// @include        http://*binsearch.net/*
// @include        http://mail.google.com/*
// @include        http://www.google.com/calendar/*
// @include        http://docs.google.com/*
// @include        http://spreadsheets.google.com/*
// @include        http://www.google.com/reader/*
// @include        http://www.google.com/bookmarks/*
// @include        http://www.google.com/history/*
// @include        http://www.google.com/notebook/*
// @include        http://groups.google.com/*
// @include        http://sites.google.com/*
// @include        http://*.facebook.com/*
// @include        http://www.opendns.com/*
// @include        http://eztv.it/*
// @include        http://orkut.com/*
// @include        http://www.orkut.co.in/*
// @include        http://*twitter.com/*
// @include        http://thepiratebay.org/*
// @include        http://*.zoho.com/*
// @include        http://*.wikileaks.org/*
// @include        http://alipay.com/*
// @include        http://*.xmarks.com/*
// @include        http://*friendfeed.com/*
// @include        http://twitpic.com/*
// @include        http://*.ovi.com/*
// @include        http://userscripts.org/*
// @include        https://*
// @exclude        http://music.ovi.com/*
// @exclude        http://share.ovi.com/* 
// @exclude        https://mail.google.com/*
// @exclude        https://addons.mozilla.org/*
// @exclude        http://store.ovi.com/*
// @exclude        https://www.blogger.com/*
// @exclude        http://www.facebook.com/l.php?u=*
// @copyright      JoeSimmons
// @version        1.0.5
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require        http://usocheckup.dune.net/29090.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

(function () {
    var url = window.location.href,
        rHttp = /^http:\/\//,
        isHttp = url.indexOf('http://') === 0,
        isHttps = url.indexOf('https://') === 0;

    if (isHttp) {
        window.location.replace( url.replace(rHttp, 'https://') );
    } else if (isHttps) {
        [].forEach.call(document.querySelectorAll('a[href^="http://"]'), function (link) {
            link.href = link.href.replace(rHttp, 'https://');
        });
    }
}());