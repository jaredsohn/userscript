// ==UserScript==
// @name           Crazy Google Logo
// @namespace      Genequil
// @description    Changes the Google logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// ==/UserScript==
var Logo = document.getElementById('logo');
Logo.id = "Crazy Google";
Logo.border = 'no'
Logo.src = 'http://i44.tinypic.com/2ppwln5.gif';