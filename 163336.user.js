// ==UserScript==
// @name           YouTube DIV Remover
// @description   YouTube DIV Remover
// @copyright      theone2013
// @namespace  theone
// @version          1.0.0
// @include          http://*.youtube.com/*
// @include          https://*.youtube.com/*
// ==/UserScript==

var recChannel = document.getElementsByClassName('branded-page-related-channels branded-page-gutter-padding');
for (i=0; i<recChannel.length; i++)
{ 
    recChannel[i].innerHTML = "";
}