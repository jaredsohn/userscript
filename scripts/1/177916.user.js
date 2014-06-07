// ==UserScript==
// @name        Cookie Clicker Click Only
// @author      JM
// @namespace   *
// @description Only click big cookie and golden cookie automatically.
// @include     http://orteil.dashnet.org/*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function Click_bigCookie()
{
$("#bigCookie").click();
window.setTimeout(Click_bigCookie, 4);
}
Click_bigCookie();

function Click_goldenCookie()
{
$("#goldenCookie").click();
window.setTimeout(Click_goldenCookie, 1000);
}
Click_goldenCookie();