// ==UserScript==
// @name           Global Script
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

var script = document.createElement('script');
script.textContent = 'setTimeout(function(){(function() { var a = {' +
    'b: function() { if (typeof API !== \'undefined\' && API.enabled) this.c(); else setTimeout($.proxy(this.b,this),100); },' +
    'c: function() { console.log(\'EDMbassy Script Enabled!\'); $.getScript(\'https://raw.github.com/NitroGhost/genericplug/master/script.js\'); }' +
'};' +
    'a.b(); })()},3000)';
document.head.appendChild(script);