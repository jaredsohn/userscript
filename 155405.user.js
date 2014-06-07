// ==UserScript==
// @name        Enable All Input Fields
// @namespace   http://userscripts.org/users/498953
// @description Enable All Input Fields
// @include     http://*
// @include		https://*
// @version     2
// ==/UserScript==

$(document).ready(function(){

  $('input[disabled]').removeAttr("disabled").css("background-color","red");
  $('input[readonly]').removeAttr("readonly").css("background-color","red");

  //also enable the disabled context menu (menu that appears on right clicking)
  $('[oncontextmenu]').removeAttr("oncontextmenu");
})();