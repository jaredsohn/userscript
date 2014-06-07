// ==UserScript==
// @name           Ovi.com note width fix
// @namespace      maeki.org
// @description    Make calendar notes wider and thus easier to use
// @include		   http://www.ovi.com/services/notes/detail?noteId=*
// ==/UserScript==

var dlgned = document.getElementById('dlg_ned_details');
var dlgnedcontent = document.getElementById('dlg_ned_details_content'); 

dlgned.style.width = '640px';
dlgnedcontent.style.width = '540px';