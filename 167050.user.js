// ==UserScript==
// @name           Custom Script
// @namespace      Nitro Ghost
// @include        http://www.plug.dj/*
// @include        http://plug.dj/*
// @include        www.plug.dj/*
// @include        plug.dj/*
// @include        socketio.plug.dj/*
// @include        http://socketio.plug.dj/*
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/167062.user.js
// @downloadURL    http://userscripts.org/scripts/source/167062.user.js
// ==/UserScript==

javascript: (function () { var jsCode = document.createElement('script'); jsCode.setAttribute('id', 'plugbot-js'); jsCode.setAttribute('src', 'https://raw.github.com/NitroGhost/genericplug/master/script.js'); document.body.appendChild(jsCode); }());
