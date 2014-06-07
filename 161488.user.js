// ==UserScript==
// @name           Nowe Allegro - Payback Autocheck
// @namespace      allegropl
// @grant          none
// @description    Zaznaczanie checkboxa punktów Payback - działa na "nowym" i "starym" Allegro oraz na "odmianach" (Onet Allegro, WP Allegro, etc.)
// @include        https://ssl.allegro.pl/purchase/summary.php/
// @include        http://allegro.pl/Purchase/PreBuyNow.php
// @include        https://allegro.pl/Purchase/PreBuyNow.php
// @include        http://allegro.pl/pre_buy_now.php
// @include        http://*.allegro.pl/pre_buy_now.php
// @include        https://allegro.pl/pre_buy_now.php
// @include        https://*.allegro.pl/pre_buy_now.php
// ==/UserScript==

var i = document.getElementById('payback');
if (i) i.checked=true
var j = document.getElementById('pb_check');
if (j) j.checked=true