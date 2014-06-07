// ==UserScript==
// @name           heise-expand-width
// @namespace      heise
// @include        http://www.heise.de/*/meldung/*
// @include        http://www.heise.de/*/foren/*
// ==/UserScript==
(function(){ style=document.createElement("style"); style.innerHTML="#mitte_rechts, #bannerzone, #sitemap {display: None !important;}#mitte_links {width: 100% !important;} #container_content {top: 5px !important;left:5px !important;width: 95% !important;margin-left: 3em !important;}#container {width: 95% !important;}#mitte {background: none !important;width: 100% !important;}.adbottom{display: None}ul.forum_navi, ul.forum_navi *{background: #003399 !important;color: white !important;}";
 document.getElementsByTagName("head")[0].appendChild(style);
 })();