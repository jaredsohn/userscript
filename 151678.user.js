// ==UserScript==
// @name        Shut up Star-Comments
// @namespace   https://flavors.me/noromanba
// @description Turn off Hatena::Star-Comments
// @include     http://*
// @include     https://*.hatena.tld/*
// @version     2012.11.5.3
// @homepage    https://userscripts.org/scripts/show/151678
// @downloadURL https://userscripts.org/scripts/source/151678.user.js
// @installURL  https://userscripts.org/scripts/source/151678.user.js
// @updateURL   https://userscripts.org/scripts/source/151678.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://flavors.me/noromanba)
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hammer_and_sickle_on_a_red_star.svg/32px-Hammer_and_sickle_on_a_red_star.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hammer_and_sickle_on_a_red_star.svg/64px-Hammer_and_sickle_on_a_red_star.svg.png
// ==/UserScript==

// Icon (Public Domain by AzaToth)
// https://commons.wikimedia.org/wiki/File:Hammer_and_sickle_on_a_red_star.svg

// Bookmarklet
// http://let.hatelabo.jp/noromanba/let/gYC-xtnJpOf_Bw

// Devel
// https://gist.github.com/

(function () {
    // TODO lazy check or timer loop
    //if (!window.Hatena || !window.Hatena.Star) return;

    var addStyle  = (function () {
        var parent = document.head || document.body;

        var style = document.createElement('style');
        style.type = 'text/css';
        parent.appendChild(style);

        return function (css) {
            style.appendChild(document.createTextNode(css + '\n'));
        };
    })();

    // http://s.hatena.ne.jp/help#section5
    addStyle('.hatena-star-comment-container { display: none; }');
})();