// ==UserScript==
// @name TW Pro
// @description Varianta in romana a scriptului TW-PRO. Acest script este foarte util, va va arata cele mai bune iteme pentru munca selecatata. Este foarte exact si ia in calcul si seturile.
// @author NEXTON
// @namespace http://www.tw-pro.de/
// @include http://*.thewest.*/game.php*
// @include http://*.innogames.*/*
// @include http://*.the-west.*/game.php*

// ==/UserScript==

/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
der Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
orrder*/

var twpro_script=document.createElement('script');
twpro_script.type='text/javascript';
twpro_script.src='http://users.atw.hu/h15/hepike/j/TWPro.js?atw_rnd=168741642';
document.body.appendChild(twpro_script);
