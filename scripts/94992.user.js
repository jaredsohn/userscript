// ==UserScript==
// @name          torrentz
// @namespace     torrentz
// @description   Remove Sponsored Links
// @include       *torrentz.eu/search*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==
$('div:contains("Sponsored Links")').remove();