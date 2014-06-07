// ==UserScript==
// @name           AdFly Skipper
// @namespace      adfly_skipper
// @description    Desista do AdFly...
// @include        http://adf.ly/*
// @author		   Luis Felipe Zaguini Nunes Ferreira
// @twitter		   _LuisFelipeZ
// ==/UserScript==

window.location = document.getElementsByTagName("script")[0].innerHTML.match(/\surl\s=\s'([^']+)/)[1];