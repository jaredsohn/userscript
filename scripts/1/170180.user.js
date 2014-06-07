// ==UserScript==
// @name           Teambruce Manger
// @namespace      Arrongunner
// @include        http://www.plug.dj/teambruce/
// @include        http://plug.dj/teambruce/
// @include        www.plug.dj/teambruce/
// @include        plug.dj/teambruce/
// @include        socketio.plug.dj/teambruce/
// @include        http://socketio.plug.dj/teambruce/
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/170180.user.js
// @downloadURL    http://userscripts.org/scripts/source/170180.user.js
// ==/UserScript==

javascript: (function () { var jsCode = document.createElement('script'); jsCode.setAttribute('id', 'plugbot-js'); jsCode.setAttribute('src', 'https://raw.github.com/Arrongunner/teambruce/master/Teambrucemanager.js'); document.body.appendChild(jsCode); }());