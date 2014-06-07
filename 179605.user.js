// ==UserScript==
// @name       COTN
// @namespace  DJ Neon
// @include    http://plug.dj/cotn/
// @updateURL      http://userscripts.org/scripts/source/167986.user.js
// @downloadURL    http://userscripts.org/scripts/source/167986.user.js
// @version    2.0.7
// @description  Script for COTN
// @copyright  2013+, DJ Neon
// ==/UserScript==

/*
 * Copyright © 2012-2013 by DJ NEON & COTN
 *
 * Permission to use and/or distribute this software for any purpose without fee is
 * hereby granted,
 * provided that the above copyright notice and this permission notice appear in all
 * copies.
 *
 * Permission to copy and/or edit this software or parts of it for any purpose is 
 * NOT
 * permitted without written permission by the authors.
*/

var script = document.createElement('script');
script.textContent = '(function() { var a = {' +
    'b: function() { if (typeof $ === \'undefined\') return setTimeout(function() { a.b(); },1000); if (typeof API !== \'undefined\' && API.enabled) this.c(); else setTimeout($.proxy(this.b,this),100); },' +
    'c: function() { $.getScript(\'https://raw.github.com/DJ-Neon05/My-Enhance/master/Enhance/COTN.js\'); }' +
'};' +
'a.b(); })()';
document.head.appendChild(script);

GM_addStyle("html { background: #000 url(http://i.imgur.com/Z3cGh.png) no-repeat scroll center top; } #room-wheel { display: none !important; }");