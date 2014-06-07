// ==UserScript==
// @name           Zutatenumrechner für RezepteWiki.org
// @author  Finn Pauls [[Benutzer:Finn]]
// @namespace      text/javascript
// @description    Rechnet Zutaten für verschiedene Portionen um
// @include        http://www.rezeptewiki.org/wiki/*
// ==/UserScript==

//Zutatenumrechner einbinden
var include_file = document.createElement('script');
include_file.setAttribute('type','text/javascript');
include_file.appendChild(document.createTextNode("importScript('Benutzer:Finn/zutatenumrechner.js');"));
document.getElementsByTagName('head')[0].appendChild(include_file);

