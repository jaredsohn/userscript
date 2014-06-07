// ==UserScript==
// @name           Рынок предприятий
// @include        http://virtonomic*.*/*/main/unit_market/list
// @include        http://virtonomic*.*/*/main/unit_market/list/*
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
$("table.grid>tbody>tr>td>a").each(function(){
if(/(main\/unit\/view)/.test(this.href)){
var src_img=this.parentNode.getElementsByTagName('a')[0].getElementsByTagName('img')[0].src;
switch(src_img.slice(-10)){
case "ehouse.gif":break;
case "s/shop.gif":this.href+="/trading_hall";break;
case "es/lab.gif":break;
default          :this.href+="/manufacture";break;
}}})