// ==UserScript==
// @name           Banditi + Spel
// @namespace      Gangsterklaas
// @description    Veranderingen
// @version        1.0
// @include        http://*banditi.nl/*
// ==/UserScript==

var content = document.getElementById ('content');
content.innerHTML = '<div class="tabs_menu"><div class="buttons" style="margin-left:5px;"><a href="http://forum.banditi.nl/?m_log=1" target="_blank">Nederland</a></div></div>';
