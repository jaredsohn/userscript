// ==UserScript==
// @name           adfly
// @namespace      scruppy
// @description    Click skip ad
// @include        http://adf.ly/*
// ==/UserScript==

var button = document.getElementsByID("skip_ad_button")


if button != 0 
{
button.parentNode.submit()
}
else
{
var button = document.getElementsByID("skip_ad_button")
}

