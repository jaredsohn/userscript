// ==UserScript==
// @name        Hatena::Group Phantom Redirector
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description If the member doesn't belong Hatena::Group, go to Hatena::Profile for UserScript
// @include     http://*.g.hatena.ne.jp/*
// @include     https://*.g.hatena.ne.jp/*
// @version     2012.7.24.231
// @homepage    https://userscripts.org/scripts/show/138407
// @downloadURL https://userscripts.org/scripts/source/138407.user.js
// @installURL  https://userscripts.org/scripts/source/138407.user.js
// @updateURL   https://userscripts.org/scripts/source/138407.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://www.hatena.ne.jp/noromanba/)
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/CERO_fear.png/32px-CERO_fear.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/CERO_fear.png/64px-CERO_fear.png
// ==/UserScript==

// Devel
// https://gist.github.com/3110603

// Icon (Public Domain by CERO)
// https://commons.wikimedia.org/wiki/File:CERO_fear.png

(function () {
    // strict HatenaID: /[a-zA-Z][\w-]{1,30}[a-zA-Z\d]/
    // loosed HatenaID: /[\w-]+/
    var hatenaId = (/^https?:\/\/[\w-]+\.g\.hatena\.ne\.jp\/([\w-]+)\//.exec(location.href) || [])[1];
    var isPhantom = document.querySelector('div.hatena-body div.day div.error');
    if (!hatenaId || !isPhantom) return;

    // FireFox must be needs location.protocol (not allowed like a img: '//www.hatena.ne.jp/')
    location.href = 'https://www.hatena.ne.jp/' + hatenaId + '/';
})();