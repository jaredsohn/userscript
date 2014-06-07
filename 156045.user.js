// ==UserScript==
// @name       djolenec vrtic 2
// @namespace  nothing
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version    1.0
// @description  skript bre!
// @include      http://11april-nbgd.edu.rs/glasanje/
// @copyright  stevan pavlovic, 2013
// ==/UserScript==
$('input:radio[value="40"]').attr('checked', true);
$('input:button[name="vote"]').click();
setTimeout(function() {
location.href = "http://11april-nbgd.edu.rs/glasanje/";
}, 3000);	