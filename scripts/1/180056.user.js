// ==UserScript==
// @name        Enable Context Menu
// @namespace   http://userscripts.org/users/498953
// @description Enable Context Menu
// @include     http://*
// @include	https://*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){

  $('[oncontextmenu]').removeAttr("oncontextmenu").css("background-color","red");
});