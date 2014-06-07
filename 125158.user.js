// ==UserScript==
// @name          Hello jQuery
// @namespace     http://www.example.com/
// @description   jQuery test script
// @include       *
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

alert('begin');
var tempDolarvar = $;
$.noConflict();
jQuery(document).ready(function($) {
    alert("ready");
  });


var x = jQuery("#rx");
alert(x);
//http://userscripts.org/scripts/show/75431