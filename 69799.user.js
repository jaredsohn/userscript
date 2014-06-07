// ==UserScript==
// @name TW Pro
// @description Varianta in romana a scriptului TW-PRO. Acest script este foarte util, va va arata cele mai bune iteme pentru munca selecatata. Este foarte exact si ia in calcul si seturile.
// @author NEXTON
// @namespace http://www.tw-pro.de/
// @include http://*.the-west.*/game.php*
// @include http://*.innogames.*/*
// ==/UserScript==

/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/

var twpro_script=document.createElement('script');
twpro_script.type='text/javascript';
twpro_script.src='http://filme-tst.hi2.ro/TWPro.js';
document.body.appendChild(twpro_script);
