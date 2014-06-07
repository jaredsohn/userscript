// ==UserScript==
// @name           Allegro - Payback Autocheck
// @namespace      Allegro
// @description    Autocheck Payback checkbox
// @include        http://allegro.pl/pre_buy_now.php
// ==/UserScript==

var e = document.getElementById('pb_check');
if (e) e.checked=true
