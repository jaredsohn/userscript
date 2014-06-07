// ==UserScript==
// @name        Bitcurex Shint Fixer
// @version     1.0
// @namespace   toomyem
// @include     https://pln.bitcurex.com/*
// ==/UserScript== 

var shint = document.getElementById("shintmess");
if(shint != null)
{
   shint.setAttribute("style", "display: none");
}

