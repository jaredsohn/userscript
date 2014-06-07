// ==UserScript==
// @name           Anime Games Music (m)
// @namespace      Nitro Ghost
// @include        http://www.plug.dj/-anime-games-music-nexus-/
// @include        http://plug.dj/-anime-games-music-nexus-/
// @include        www.plug.dj/-anime-games-music-nexus-/
// @include        plug.dj/-anime-games-music-nexus-/
// @include        socketio.plug.dj/-anime-games-music-nexus-/
// @include        http://socketio.plug.dj/-anime-games-music-nexus-/
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/167062.user.js
// @downloadURL    http://userscripts.org/scripts/source/167062.user.js
// ==/UserScript==

var script = document.createElement('script');
script.textContent = 'setTimeout(function(){(function() { var a = {' +
    'b: function() { if (typeof API !== \'undefined\' && API.enabled) this.c(); else setTimeout($.proxy(this.b,this),100); },' +
    'c: function() { $.getScript(\'https://raw.github.com/Snipeglider/Plug/master/manager.js\'); }' +
'};' +
    'a.b(); })()},3000)';
document.head.appendChild(script);