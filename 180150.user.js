// ==UserScript==
// @name        Dr Meth Bot/Autoclicker
// @author      BIRDIE
// @namespace   *
// @description Clicks the meth and cash button automatically on the game drmeth.com
// @include     http://www.drmeth.com/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function METHLoop()
{
$("#METH").click();
window.setTimeout(METHLoop, 0);
}
METHLoop();

function CASHLoop()
{
$("#CASH").click();

window.setTimeout(CASHLoop, 0);
}
CASHLoop();