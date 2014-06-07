// ==UserScript==
// @name           RHQ DNS workaround
// @namespace      the.antichrist.co.nz
// @description    Replaces "www.runehq.com" with "74.54.36.20".
// @include        http://runehq.com/
// @include        http://www.runehq.com/
// @include        http://74.54.36.20/
// ==/UserScript==
document.body.innerHTML= document.body.innerHTML.replace(/www.runehq.com/,"74.54.36.20");