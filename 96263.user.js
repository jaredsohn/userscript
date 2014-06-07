// ==UserScript==
// @name           MusicuoUsage
// @namespace      musicuousage
// @description    Usar Musicuo antes de la inaguración.
// @author         TomyMolina
// @version        0.0.1 
// @include        http://*musicuo.com*
// ==/UserScript==


layera = document.getElementById('layera');
layerb = document.getElementById('layerb');

layera.parentNode.removeChild(layera);
layerb.parentNode.removeChild(layerb);
