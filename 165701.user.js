// ==UserScript==
// @name           TFLEnhancedLoader
// @namespace      PlugDJColgate
// @description    Autorun TFLEnhanced on plug.dj
// @author         Jeremy "Colgate" Richardson
// @author         Thomas "TAT" Andresen
// @include        http://plug.dj/thedark1337/
// @version        1.4
// ==/UserScript==

/*
Copyright © 2012-2013 by Jeremy "Colgate" Richardson and Thomas "TAT" Andresen

Permission to use and/or distribute this software for any purpose without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

Permission to copy and/or edit this software or parts of it for any purpose is NOT permitted
without written permission by the authors.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHORS DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHORS BE LIABLE
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

var script = document.createElement('script');
script.textContent = 'setTimeout(function(){(function() { var a = {' +
    'b: function() { if (typeof API !== \'undefined\' && API.enabled) this.c(); else setTimeout($.proxy(this.b,this),100); },' +
    'c: function() { console.log(\'TFLEnhanced Loader v.1.3 enabled!\'); $.getScript(\'https://raw.github.com/Colgate/TFL-Enhanced/master/TFLenhanced.js\'); }' +
'};' +
    'a.b(); })()},3000)';
document.head.appendChild(script);