// ==UserScript==
// @name        ZltyMelon auto-kody
// @namespace   marki555
// @description Automaticky vyplni validacne kody
// @include     https://www.zltymelon.sk/aukcie/*
// @icon	https://www.zltymelon.sk/favicon.ico
// @version     0.1
// ==/UserScript==

// tr " " "\n" <zm >zm2
// awk '{ if ($1 ~ /^[0-9]+$/) { i=$1 } else { print "codes["i"]=\""$1"\";" } }' zm2
var codes=new Array();

// **** sem vlozte vase validacne kody:
codes[1]="xxxxxx";
codes[2]="yyyyyy";
// ...
codes[100]="zzzzzz";

// search for code number
var code = document.getElementById('frm-formAuctionBid-validCode');
var srch=/>Valida.ný kód pozícia ([0-9]+)</;
if (srch.test(document.body.innerHTML)) {
  var res=srch.exec(document.body.innerHTML);
  if (!code.value.length) code.value=codes[res[1]];
}
