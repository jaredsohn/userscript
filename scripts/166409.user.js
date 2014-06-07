// ==UserScript==
// @name          HWM Title tooltip
// @description   Title tooltip
// @autor		  sw.East
// @version       0.01
// @include       http://*heroeswm.*/*
// @include       http://178.248.235.15/*
// @include       http://173.231.37.114/*
// @include       http://209.200.152.144/*
// @exclude		  http://*heroeswm.*/
// @exclude       http://178.248.235.15/
// @exclude       http://173.231.37.114/
// @exclude       http://209.200.152.144/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// css style
GM_addStyle('\
#tooltip{\
         position:absolute;\
	 left:-2000px;\
	 background:#dedede;\
	 padding:5px;\
	 border:1px solid #fff;\
	 width:auto;\
         max-width:670px;\
         z-index:5;\
}\
#tooltip p{\
         margin:0;\
	 padding:0;\
	 color:#fff;\
	 background:#222;\
	 padding:2px 7px;\
         text-align:left;\
 	 white-space: pre-wrap;\
');
// the end
  
// tooltip
$(function() {
// Default tooltip settings
var offsetX = 15;
var offsetY = 15;
var TooltipOpacity = 0.8;
 
// Select all tags having a title attribute
$('[title]').mouseenter(function(e) {
 
// Get the value of the title attribute
var Tooltip = $(this).attr('title');
if(Tooltip !== '') {
// Tooltip exists. Assign it to a custom attribute
$(this).attr('customTooltip',Tooltip);
 
// Empty title attribute (to ensure that native browser tooltip is not shown)
$(this).attr('title','');
}
 
// Assign customTooltip to variable
var customTooltip = $(this).attr('customTooltip');
 
// Tooltip exists?
if(customTooltip !== '') {
// Append tooltip element to body
$("body").append('<div id="tooltip"><p>' + customTooltip + '</p></div>');
 
// FadeIn effect for Tooltip
$('#tooltip').fadeIn('300');
$('#tooltip').fadeTo('20',TooltipOpacity);
}
 
}).mousemove(function(e) {
var X = e.pageX;
var Y = e.pageY;

 
// Assign tooltip position
$('#tooltip').css('left', X + offsetX );
$('#tooltip').css('top', Y + offsetY );
 
}).mouseleave(function() {
// Remove tooltip element
$("body").children('div#tooltip').remove();
});
});

	
$(document).ready(function(){

     //simple_tooltip("a img","tooltip");
     simple_tooltip("table img","tooltip");
});
// the end     