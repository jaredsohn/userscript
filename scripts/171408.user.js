// ==UserScript==
// @name       piratebay autosort
// @version    0.1
// @description Sort by seeds
// @author		Marcos Campos
// @match      http://thepiratebay.sx/*
// @include      http://thepiratebay.sx/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function ()
{
    // search field on frontpage
    s = document.getElementsByName("orderby");
    if (s)
    {
        s[0].value = "7";
    }
}, false);