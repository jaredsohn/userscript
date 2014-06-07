// ==UserScript==
// @name           Dark Chrome Google Logo
// @namespace      URBANEAR
// @description    Changes the Google logo Dark Chrome Google Logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// ==/UserScript==
var Logo = document.getElementById('logo');
Logo.id = "Crazy Google";
Logo.border = 'no'
Logo.src = 'http://i100.photobucket.com/albums/m35/DwayneDaPlaya/Blk20Chrome.png';