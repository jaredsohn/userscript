// ==UserScript==
// @name         sh-r
// @version      1.0
// @include      http://*.sofiawars.com/*
// @run-at       document-end
// ==/UserScript==

money = $('span[rel="money"]').text().replace(",","");
ore = $('span[rel="ore"]').text().replace(",","");
neft = $('span[rel="oil"]').text().replace(",","");


$('span[rel="money"]').text(k(money));
$('span[rel="ore"]').text(k(ore));
$('span[rel="oil"]').text(k(neft));

function k(num){
   return num>999?(num/1000).toFixed(1).replace('.',',')+'k':num
}
