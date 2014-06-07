// ==UserScript==
// @name la Résistance! (ZNR)
// @namespace NicolasZN
// @description Remove Ryan's madness
// @include http://resources.zetaboards.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
jQ_ready();

function jQ_ready() {
if ( $("#setskin").val() == 1200009 ) {
$("#cat-246 .h2left").css('background-image','url(http://209.85.62.24/28094/5/0/p336527/H2HeadWind.png)');
}
}