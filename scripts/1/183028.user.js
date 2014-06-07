// ==UserScript==
// @name      Wykop.pl Rainbow
// @version   1
// @include	  http://*.wykop.pl/*
// @include	  https://*.wykop.pl/*
// @copyright 2013+, eMBee
// @run-at	  document-end
// ==/UserScript==

$(function() {
  $('#header-con').css({"background": "linear-gradient(#FF0000,#FF8000,#FFFF00,#7FFF00,#00FF00,#0080FF,#0000FF,#7F00FF,#FF00FF,#FF0080)"});
});