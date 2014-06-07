// ==UserScript==
// @name           Walla Remove Scripts
// @namespace      http://tribla.4free.co.il
// @description    Remove all banners for walla.co.il
// @include        http://*.walla.co.il/*
// ==/UserScript==

var s = document.body.innerHTML;
Reggggg = /<(?:!(?:--[\s\S]*?--\s*)?(>)\s*|(?:object|script|iframe)[\s\S]*?<\/(?:object|script|iframe)>)/g;
s = s.replace(Reggggg,'');
document.body.innerHTML=s;