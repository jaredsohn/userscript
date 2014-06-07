// ==UserScript==
// @name           DotNet-News
// @namespace      DotNet-News
// @include        http://www.dotnet-news.com/*
// ==/UserScript==

var title = document.getElementById("_ctl2_LblTitre");
var div = title.nextSibling.nextSibling.nextSibling;
var link = div.getElementsByTagName("a")[0];

window.location = link.href;