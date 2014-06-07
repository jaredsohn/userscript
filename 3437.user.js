// ==UserScript==
// @name           No Blank
// @namespace      http://simplesideias.com.br/greasemonkey/noblank
// @description    If you hate blank pages, this script is for you! Created by Nando Vieira - simplesideas.com.br.
// @include        *
// ==/UserScript==

var links   = document.getElementsByTagName('a');
var len     = links.length;

if (len == 0) return;

for (var i = 0; i < len; i++)
    if (links[i].target == '_blank' || links[i].target == '_new')
        links[i].target = '_self';