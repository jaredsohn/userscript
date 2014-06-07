// ==UserScript==
// @name        testestest
// @author      trololo
// @namespace   *
// @include     http://clickingbad.nullism.com/*
// @description 
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function ClickLoop()
{
$("#make_btn").click();
window.setTimeout(ClickLoop, 1);
}
ClickLoop();
