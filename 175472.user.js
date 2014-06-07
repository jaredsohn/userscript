// ==UserScript==
// @name         exp
// @version      1.0
// @include      http://*.sofiawars.com/player/
// @author       Герганката & Mr_Rage
// @run-at       document-end
// ==/UserScript==

if(/([0-9]+)\/([0-9]+)/.test($(".exp").text())) {
   var from = parseInt(RegExp.$1,10);
   var to = parseInt(RegExp.$2, 10);
   $('.exp .bar').before(' (' +(to - from)+ ')' );	
}

/*
var ep = $('.pers-statistics .bars div .exp .bar div .percent').width()-1;
var ep2 = "%";
$('.exp .bar').before(''+ep+''+ep2+'');
*/