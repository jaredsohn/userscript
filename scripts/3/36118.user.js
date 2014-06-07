// ==UserScript==
// @name          iGoogle_Fix
// @description	  Removes tabs from left side of iGoogle
// @include       http://www.google.com/*
// ==/UserScript==

var main = document.getElementById('col1');
if (main)
{
    document.getElementById('col1').style.display = "none";
}