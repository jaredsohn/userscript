// ==UserScript==
// @name The West - TW Pro+ [SOM] [only HUN]
// @namespace C:\twpro.user.hun.js
// @description Script for thewest: TW Pro+ [SOM] [only HUN] (v2.0.1.4)
// @author Nexton/Lekensteyn/Sandevil/Pedro Ramirez/Puli/aka Y./Zyphir Randrott
// @website http://scripts-o-maniacs.leforum.eu
// @include http://*.thewest.*/game.php*
// @include http://*.thewest.*/forum.php*
// @include C:\twpro.user.hun.js
// @version 2.0.1.4

// ==/UserScript==

/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
der Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
orrder*/

var twpro_script=document.createElement('script');
twpro_script.type='text/javascript';
twpro_script.src='http://users.atw.hu/bcshc/west/TWPro.js';
document.body.appendChild(twpro_script);
