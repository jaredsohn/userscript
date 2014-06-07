// ==UserScript==
// @name        NURIKABE
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description Twitter wallpaper to mono-color for UserScript
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @version     2012.12.3.0
// @homepage    https://userscripts.org/scripts/show/139133
// @downloadURL https://userscripts.org/scripts/source/139133.user.js
// @installURL  https://userscripts.org/scripts/source/139133.user.js
// @updateURL   https://userscripts.org/scripts/source/139133.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://www.hatena.ne.jp/noromanba/)
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tango_pallette.svg/32px-Tango_pallette.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tango_pallette.svg/64px-Tango_pallette.svg.png
// ==/UserScript==

// Devel
// https://gist.github.com/3172886

// Icon (Public Domain by Tango Desktop Project)
// https://commons.wikimedia.org/wiki/File:Tango_pallette.svg
// http://tango.freedesktop.org

(function () {
    var bgImg;
    if (!(/^https?:\/\/twitter\.com\/[\w]+/.test(location.href)) ||
        !(bgImg = document.querySelector('.js-user-style-bg-img'))) {
        return;
    }

    bgImg.textContent = '';
})();