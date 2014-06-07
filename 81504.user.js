// ==UserScript==
// @name           Daft Punk Google Logo
// @namespace      URBANEAR
// @description    Changes the Google logo to Daft Punk Logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// ==/UserScript==
var Logo = document.getElementById('logo');
Logo.id = "Daftpunk Google";
Logo.border = 'no'
Logo.src = 'http://i100.photobucket.com/albums/m35/DwayneDaPlaya/DaftPunk20Google.png';