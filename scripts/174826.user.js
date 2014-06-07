// ==UserScript==
// @name           pluglt
// @namespace      PlugDJCheat
// @description    Lithuanian plug.dj
// @author         Cheat
// @include        http://plug.dj/*
// @version        1.0.0
// ==/UserScript==

/*
Fell free to use and share this script :]
*/

var script = document.createElement('script');
script.textContent = 'setTimeout(function(){(function() { var a = {' +
    'b: function() { if (typeof API !== \'undefined\' && API.enabled) this.c(); else setTimeout($.proxy(this.b,this),100); },' +
    'c: function() { console.log(\'TFLEnhanced Loader v.1.3 enabled!\'); $.getScript(\'https://raw.github.com/Cheat-/Lt-plug-dj-script/master/lovelt\'); }' +
'};' +
    'a.b(); })()},3000)';
document.head.appendChild(script);