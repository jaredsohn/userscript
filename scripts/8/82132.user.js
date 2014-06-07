// ==UserScript==
// @name          enable copy
// @version       0.0.1
// @include 	  http://rent.soufun.com/*
// ==/UserScript==
document.body.onmousedown = function()
{
    document.body.oncopy = null;
}


