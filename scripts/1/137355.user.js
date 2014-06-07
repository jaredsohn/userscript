// ==UserScript==
// @name           Kill Popup
// @description Kill any popup from website when click
// @namespace      no_popup_cs
// @include        http://*.*/*
// @icon      http://bomtan.org/images/favicon.png
// @author	CuongSmith
// @version	1.0
// ==/UserScript==
function noPopupCS(e){}
window.onload = function()
{
document.body.onclick = noPopupCS;
}



