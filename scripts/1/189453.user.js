// ==UserScript==
// @name        Move redirect by kLeptO
// @namespace   moveredirect
// @description Disables redirect by default.
// @include     *.rune-server.org/postings.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==
$( document ).ready(function() {
    $("#redirect").click();
});