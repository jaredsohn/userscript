// ==UserScript==
// @name        DH DisscusionLover
// @namespace   http://userscripts.org/users/523132
// @description PIVOPIVOPIVOPIVO
// @include     http://www.databaze-her.cz/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==

var user = "user-bodkin";

$(".post:not(."+user+")").remove();

$(".post").css("background-color", "gold");
$(".post").css("background-image", "none");
$(".post").css("background-repeat", "none");
$(".post").css("font-size", "200%");

var ber = $(".post").length;

$("#discussion").prepend("<h1>Máš "+ ber +" Berušek!!!!!!</h1>");
