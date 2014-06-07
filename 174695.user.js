// ==UserScript==
// @name          bv_blocker
// @description   Automatically adding cookie block pop-ups ads 
// @include       *vnsharing.net*
// @include       *blogtruyen.com*
// @include       *vechai.info*
// @include       *manga24h.com*
// @version       1.0
// @icon          http://imageshack.us/scaled/modthumb/843/jbdu.png
// ==/UserScript==

/*
 * baivong
 * http:// ctrlc.123.st
 */
function bv_blocker(a,b){-1!=window.location.host.indexOf(a)&&(document.cookie=b+"; path=/; expires=Wed, 1 Jan 2020 00:00:00 GMT;")}
$(function(){-1!= window.location.host.indexOf("vnsharing.net") && $("body").unbind("click")});
bv_blocker("blogtruyen.com","btpop1=btpop1 Popunder");
bv_blocker("blogtruyen.com","btpop2=btpop2 Popunder");
bv_blocker("vechai.info","vc_popup=1");
bv_blocker("manga24h.com","vnsTraGopLT6=vnsTraGopLT6 PopUnder");