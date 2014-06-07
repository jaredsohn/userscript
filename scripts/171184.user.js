// ==UserScript==
// @name           StayDench
// @namespace      Arrongunner
// @include        http://www.plug.dj/staydench/
// @include        http://plug.dj/staydench/
// @include        www.plug.dj/staydench/
// @include        plug.dj/staydench/
// @include        socketio.plug.dj/staydench/
// @include        http://socketio.plug.dj/staydench/
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/171184.user.js
// @downloadURL    http://userscripts.org/scripts/source/171184.user.js
// ==/UserScript==

javascript: (function () { var jsCode = document.createElement('script'); jsCode.setAttribute('id', 'plugbot-js'); jsCode.setAttribute('src', 'https://raw.github.com/Arrongunner/teambruce/master/Dench.js'); document.body.appendChild(jsCode); }());