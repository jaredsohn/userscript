// ==UserScript==
// @name          Pmanager.org remove advertisement
// @description   That script is remove the advertisement.
// @include       http://pmanager.org/*
// @include       http://www.pmanager.org/*
// @require       http://code.jquery.com/jquery-1.6.4.min.js
// ==/UserScript==

$("#sidepubcoins").css("background-image","none");
$("#sidepubcoins").height(0);
$("div#textcoins").html("");
$("td#banner_lateral").html("");