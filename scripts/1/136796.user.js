// ==UserScript==
// @name        Hatena::Let Title Permalinker
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description Permalize title to homelink on Hatena::Let for UserScript
// @include     http://let.hatelabo.jp/*
// @version     2012.7.24.257
// @homepage    https://userscripts.org/scripts/show/136796
// @downloadURL https://userscripts.org/scripts/source/136796.user.js
// @installURL  https://userscripts.org/scripts/source/136796.user.js
// @updateURL   https://userscripts.org/scripts/source/136796.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://www.hatena.ne.jp/noromanba/)
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/View-refresh.svg/32px-View-refresh.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/View-refresh.svg/64px-View-refresh.svg.png
// ==/UserScript==

// Devel
// https://gist.github.com/2974153
//
// Icon (Public Domain by The people from the Tango! project)
// https://commons.wikimedia.org/wiki/File:View-refresh.svg

// http://let.hatelabo.jp/noromanba/let/gYC-yoLSuK2dBA/rev/gYC-yoLSuLGnBQ
(function () {
    var meta = (/^https?:\/\/let\.hatelabo\.jp\/([\w-]+)\/let\/([\w-]+)/.exec(location.href) || []).slice(1);
    if (meta.length < 2) return;

    var container = document.querySelector('.title');
    if (!container) return;

    var permalink = document.createElement('a');
    permalink.href = location.protocol + '//let.hatelabo.jp/' + meta[0] + '/let/' + meta[1];
    permalink.title = permalink.href.toString();

    var letName = container.firstChild;
    permalink.appendChild(document.createTextNode(letName.textContent));
    container.replaceChild(permalink, letName);
})();