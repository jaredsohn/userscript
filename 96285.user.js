// ==UserScript==
// @name           Serienjunkies Entrypage Jumper
// @namespace      serienjunkies
// @include        http://serienjunkies.org/enter/
// @include        http://serienjunkies.org/*.php
// ==/UserScript==

var jumper = document.getElementsByTagName('a')[0].href;
window.location.href = jumper;