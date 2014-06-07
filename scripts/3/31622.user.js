// ==UserScript==
// @name           heise-center-expand-width
// @namespace      heise
// @include        http://www.heise.de/*/meldung/*
// @include        http://www.heise.de/*/foren/*
// @include        http://www.heise.de/newsticker/classic/
// @include        http://www.heise.de/foren/*
// @exclude       http://www.heise.de/foren/
// ==/UserScript==
(function(){
 style=document.createElement("style");
 //style.innerHTML="#mitte_rechts, #bannerzone, #sitemap {display: None !important;} #mitte_links {width: 100% /* set your favourite width here */ !important;} #container_content {margin: 0;background: none !Important;width: 100%} #mitte {background: white !important;width: 100%} .adbottom{display: None}, #container{position: relative !important; top: -100px !important; width: 90% !important; margin: 0 auto !important; }";
 style.innerHTML="#container  {position: relative !important;top: -100px !important;width: 90% !important;margin: 0 auto !important;}#mitte{width:100% !important;margin-left: 0 !important;background: none !Important;}#container_content{width: 100% !important;margin: 0;background: none !Important;}#mitte_links{width: 100% !important;background: none !Important;}#mitte_rechts{width: 0px !important;display: none !important;}#sitemap{display: none !important;}#bannerzone{display: none !important;}"
 document.getElementsByTagName("head")[0].appendChild(style);
 })();
