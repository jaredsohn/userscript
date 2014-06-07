// ==UserScript==
// @name       Facebook Like Page Fixer
// @namespace  Nema
// @version    0.1.2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @description  Ova userskripta skida "zastitu" zbog koje morate lajkovati stranicu da biste vidjeli sliku.
// @match  http://*.fejsapp.com/
// @match  https://*.fejsapp.com/
// @copyright  Alex
// ==/UserScript==

$(document).ready(function ()
{
   $('#watermark').remove();
   $('#canvasHolder').remove();
});
