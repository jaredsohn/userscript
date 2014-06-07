// ==UserScript==
// @name        Trakt.tv Ad Remover
// @namespace   pilnick.com
// @include     http://trakt.tv/*
// @version     1.0
// @grant       none
// ==/UserScript==

var div;

div = document.getElementById('grid-ad');
if(div!=null){div.parentNode.removeChild(div);}

div = document.getElementById('large-banner-ad');
if(div!=null){div.parentNode.removeChild(div);}

div = document.getElementById('small-banner-ad');
if(div!=null){div.parentNode.removeChild(div);}
