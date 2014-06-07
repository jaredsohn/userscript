// ==UserScript==
// @name        nico recover straight header
// @namespace   https://flavors.me/noromanba
// @description get back '-' header from idiotic 'Z' header on nicovideo for UserScript
// @include     http://www.nicovideo.jp/*
// @version     2012.12.1.3
// @homepage    https://userscripts.org/scripts/show/153240
// @downloadURL https://userscripts.org/scripts/source/153240.user.js
// @installURL  https://userscripts.org/scripts/source/153240.user.js
// @updateURL   https://userscripts.org/scripts/source/153240.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://flavors.me/noromanba)
// @author      noromanba
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tug_of_war_pictogram.svg/32px-Tug_of_war_pictogram.svg.png
// @icon64      https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tug_of_war_pictogram.svg/64px-Tug_of_war_pictogram.svg.png
// ==/UserScript==

// Icon (Public Domain by Thadius856 & Parutakupiu)
// https://commons.wikimedia.org/wiki/File:Tug_of_war_pictogram.svg

// Devel
// https://gist.github.com/4178554

// nico ver 'Q' CSSs narrow-minded. don't care about
// - Browser Minimum Fontsize
// - Screen Name length
(function () {
    var addStyle  = (function () {
        var parent = document.head || document.body;

        var style = document.createElement('style');
        style.type = 'text/css';
        parent.appendChild(style);

        return function (css) {
            style.appendChild(document.createTextNode(css + '\n'));
        };
    })();

    var createStyle = function (sel, spec, overwrite) {
        var style = [],
            delim = overwrite ? ' !important; ' : '; ';
        for (s in spec) if (spec.hasOwnProperty(s)) {
            style.push(s + ': ' + spec[s] + delim);
        }
        if (style.length > 0) {
            style.unshift(sel + '{');
            style.push('}');
        }
        return style.join('');
    };

    // TODO handle huge minimum-font-size (15pt+)
    var straighten = function () {
        var container, payload;
        if (!(/^http:\/\/www\.nicovideo\.jp\//.test(location.href)) ||
            !(container = getComputedStyle(document.querySelector('#siteHeader'), '')) ||
            !(payload = getComputedStyle(document.querySelector('#siteHeaderInner'), '')) ||
            !(container.height > payload.height)) {
            return;
        }

        var menuitem = '#siteHeader #siteHeaderInner ul li a span';
        addStyle(createStyle(menuitem, {
            'padding-right': '0.2em',
            'padding-left' : '0.2em'
        }, true));
    };

    window.addEventListener('load', straighten, false);
})();