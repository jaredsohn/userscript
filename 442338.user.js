// ==UserScript==
// @name        obrazkiwnikach
// @namespace   obrazkiwnikach
// @description obrazkiwnikach
// @include     http://www.wykop.pl*
// @version     2.0.0.1
// @author      kapelushh
// @contributor Kulmegil
// @grant       unsafeWindow
// @grant       GM_getResourceURL
// @resource    Symbola http://s3-eu-west-1.amazonaws.com/tw-font/symbola/symbola.woff
// ==/UserScript==

var win = (typeof unsafeWindow !== 'undefined')? unsafeWindow : window, $ = win.$, fontUrl = GM_getResourceURL('Symbola');
if (fontUrl.slice(0,20) !== 'greasemonkey-script:') {
	fontUrl = 'data:application/font-woff;charset=utf-8;base64,'+fontUrl;
}

$(document.head).append('<style>@font-face {font-family: "EmojiSymbols"; src: url("'+fontUrl+'") format("woff"); font-style: normal;}</style>');

$('a[href$="/ludzie/pepoon/"][class*="color-"]:not(.gray), .userstory h2:contains("pepoon")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128013;</span>');
$('a[href$="/ludzie/kapelushh/"][class*="color-"]:not(.gray), .userstory h2:contains("kapelushh")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#127913;</span>');
$('a[href$="/ludzie/karro/"][class*="color-"]:not(.gray), .userstory h2:contains("karro")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128049;</span>');
$('a[href$="/ludzie/uchate/"][class*="color-"]:not(.gray), .userstory h2:contains("uchate")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128111;</span>');    
$('a[href$="/ludzie/omoshirokunaidesu/"][class*="color-"]:not(.gray), .userstory h2:contains("omoshirokunaidesu")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128039;</span>');
$('a[href$="/ludzie/kulmegil/"][class*="color-"]:not(.gray), .userstory h2:contains("kulmegil")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#9763;</span>');
$('a[href$="/ludzie/kamdz/"][class*="color-"]:not(.gray), .userstory h2:contains("kamdz")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128023;</span>');
$('a[href$="/ludzie/kerly/"][class*="color-"]:not(.gray), .userstory h2:contains("kerly")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128016;</span>');
$('a[href$="/ludzie/psi-nos/"][class*="color-"]:not(.gray), .userstory h2:contains("psi-nos")').append(' <span style="font-family: EmojiSymbols, Segoe UI Symbol">&#128123;</span>');