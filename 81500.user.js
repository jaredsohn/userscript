// ==UserScript==
// @name           Chrome Google Logo
// @namespace      URBANEAR
// @description    Changes the Google logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// ==/UserScript==
var Logo = document.getElementById('logo');
Logo.id = "Crazy Google";
Logo.border = 'no'
Logo.src = 'http://i100.photobucket.com/albums/m35/DwayneDaPlaya/Untitled-1-7.png';