// ==UserScript==
// @name        gihyooon
// @namespace   https://flavors.me/noromanba
// @description expand narrow width on gihyo.jp for UserScript
// @include     http://gihyo.jp/*
// @version     2012.12.13.2
// @homepage    https://userscripts.org/scripts/show/154046
// @downloadURL https://userscripts.org/scripts/source/154046.user.js
// @installURL  https://userscripts.org/scripts/source/154046.user.js
// @updateURL   https://userscripts.org/scripts/source/154046.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @author      noromanba
// @copyright   (c) 2012 noromanba (https://flavors.me/noromanba)
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Karate_silhouette.svg/32px-Karate_silhouette.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Karate_silhouette.svg/64px-Karate_silhouette.svg.png
// ==/UserScript==

// Icon (Public Domain by http://openclipart.org/)
// https://commons.wikimedia.org/wiki/Image:Karate_silhouette.svg

// Bookmarklet
// http://let.hatelabo.jp/noromanba/let/gYC-xvKp-Zn9aQ

// Devel
// https://gist.github.com/4274383

(function () {
    if (!(/^http:\/\/gihyo\.jp\/\w+\/\w+\//.test(location.href))) return;

    var addStyle  = (function () {
        var parent = document.head || document.body;
        var style = document.createElement('style');
        style.type = 'text/css';
        parent.appendChild(style);
        return function (css) {
            style.appendChild(document.createTextNode(css + '\n'));
        };
    })();

    addStyle('#main #primary { width: 100%; }');
})();

