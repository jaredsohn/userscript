// ==UserScript==
// @name           Tayar Remove Scripts
// @namespace      http://tribla.4free.co.il
// @description    Remove all banners for tayar.co.il
// @include        http://www.tayar.co.il/*
// ==/UserScript==

var s = document.body.innerHTML;
//regX = /<(?:!(?:--[\s\S]*?--\s*)?(>)\s*|(?:script|style|SCRIPT|STYLE)[\s\S]*?<\/(?:script|style|SCRIPT|STYLE)>)/g;
//var Reggggg=/<object[\s\S]*?object>/ig;
Reggggg = /<(?:!(?:--[\s\S]*?--\s*)?(>)\s*|(?:object|iframe)[\s\S]*?<\/(?:object|iframe)>)/g;
s = s.replace(Reggggg,'');
//s = s.replace(/(\/mlinks\/clickOnLink[^>]+)>[^<]+/ig,'$1');
document.body.innerHTML=s;

