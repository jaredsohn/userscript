// ==UserScript==
// @name           lines
// @namespace      orkut
// @description    lines theme for orkut
// @include        http://www.orkut.com/*
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML.replace(/http\:\/\/img4\.orkut\.com\/castroskin002\.css/, 'http://kde-look.org/CONTENT/content-files/71301-oxygen4.css');
o=document.getElementsById("scrapText");
o.className="scrapText";
