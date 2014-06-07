// ==UserScript==
// @name           Rusko Google Logo
// @namespace      URBANEAR
// @description    Changes the Google logo to Rusko Google Logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// ==/UserScript==
var Logo = document.getElementById('logo');
Logo.id = "Rusko Google Logo";
Logo.border = 'no'
Logo.src = 'http://i100.photobucket.com/albums/m35/DwayneDaPlaya/rusko-1.png';