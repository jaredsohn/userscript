// ==UserScript==
// @name ed-footnote-disabler
// @namespace karmarulez
// @description eksi duyuru footnote gizleyici by fader
// @include http://www.eksiduyuru.com/*
// ==/UserScript==


var $$ = document.getElementsByTagName('div');

for($ in $$)
{
try
{
if($$[$].className=='footnote')
$$[$].style.display='none';
}
catch (e)
{
}
}
