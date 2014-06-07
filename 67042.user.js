// ==UserScript==
// @name           no persona
// @namespace      personas
// @description    Removes (quickly&dirty) personas attribute from HTML source
// @include        http://www.getpersonas.com/*
// @include        */personas/*
// ==/UserScript==

document.getElementsByTagName('body')[0].innerHTML =
document.getElementsByTagName('body')[0].innerHTML.replace(
/persona="\{\}"/g,' ');
