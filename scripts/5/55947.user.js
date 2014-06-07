
// ==UserScript==
// @name           somee.com ad remover
// @namespace      http://www.skryt.se
// @description    Removes the top ad from the somee.com free account
// @include        http://*.somee.com/*
// ==/UserScript==


var ifr = document.getElementById('sm_frm1');

if (ifr)
{
    ifr.parentNode.removeChild(ifr);
}