// ==UserScript==
// @name           Komplett.no - Bygg din egen PC
// @namespace      Mats
// @description    Fikser en del småting
// @include        http://www.komplett.no/k/config.aspx*
// ==/UserScript==
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://matsinator.110mb.com/Komplett.css';
cssNode.media = 'screen';
document.getElementsByTagName("head")[0].appendChild(cssNode);

