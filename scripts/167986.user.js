// ==UserScript==
// @name           Custom Script
// @namespace      DerekZil
// @include        http://www.plug.dj/*
// @include        http://plug.dj/*
// @include        www.plug.dj/*
// @include        plug.dj/*
// @include        socketio.plug.dj/*
// @include        http://socketio.plug.dj/*
// @version        1.0
// @updateURL      http://userscripts.org/scripts/source/167986.user.js
// @downloadURL    http://userscripts.org/scripts/source/167986.user.js
// ==/UserScript==

javascript: (function () { var jsCode = document.createElement('script'); jsCode.setAttribute('id', 'plugbot-js'); jsCode.setAttribute('src', 'https://raw.github.com/DerekZil/Plug/master/derekzil.js'); document.body.appendChild(jsCode); }());