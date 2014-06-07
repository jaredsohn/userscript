// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/GreaseMokey/Manage User Scripts,
// select "Etsy Header", and click Uninstall.
//
// --------------------------------------------------------------------
//
// 
//
// ==UserScript==
// @name          Etsy Convo Sig 
// @description   Adds Signature to the Etsy Conversation
// @include       http://*.etsy.com*
// @author        David Eddy (ed209m atgm 'ale)
// @version       0.3
// 
// ==/UserScript==
//
$("seller-contact last").click(function () {

$("#convo-overlay-send").html($("#convo-overlay-send").html()+'<span id=sig>Sig</span>');

 $("#sig").click(function(){


});
