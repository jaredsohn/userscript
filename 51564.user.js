// ==UserScript==

// @name           Inhabilitar Skin Default de EGW

// @namespace      http://userscripts.org/scripts/show/51564

// @description    Inhabilita el codigo CSS por defecto de EGW. Esto hace que se puedan aplicar las skins con stylish

// @include        http://www.emugamesworld.*

// @exclude        http://www.emugamesworld.com/forum/chatbox.php

// ==/UserScript==

javascript:var i=0;if(document.styleSheets.length>0){cs=!document.styleSheets[1].disabled;for(i=0;i < document.styleSheets.length;i++) document.styleSheets[i].disabled=cs;};void(cs=true);