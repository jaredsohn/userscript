// ==UserScript==
// @name         Mountain Dew Facebook 
// @namespace    mtDewFacebook
// @require      http://code.jquery.com/jquery-latest.min.js
// @include      *facebook.com*
// @author       Jeremy Barr
// @description  This userscript is meant to be an example on how to use jQuery in a userscript.
// ==/UserScript==

//mt dew color scheme (approxi5:36 PM 8/24/2012mate)
var mtDewGreen = '#339933';
var mtDewDarkGreen = '#006633';
var mtDewLightGreen = '#99CC33';
var mtDewRed = "#FF3333";

//$(document).ready(function(){

//store all the links 
$allLinks = $('a');

$('.fbTimelineSection').css('background-color',mtDewDarkGreen);
$('.fbTimelineSection').css('border-color',mtDewGreen);

$('.timelineLayout').css('background-color','black');

//Right Column Timeline
$('.fbTimelineScrubber').css('background','gray'); 

// Timeline attributes
$timelineUnits = $('.timelineUnitContainer');
$timelineUnits.css('border-color',mtDewLightGreen);
$timelineUnits.css('background',mtDewLightGreen); 
$timelineUnits.children().css('border-color',mtDewLightGreen); 
$('.topBorder').css('background', mtDewLightGreen); 
$('.bottomBorder').css('background', mtDewLightGreen);

$('.-cx-PRIVATE-fbTimelineExternalShareUnit__root').css('background', 'purple');
$('.selected').css('color', 'purple');

$('.back').css('background-color', mtDewGreen);
$('.back').css('border-color', 'yellow');


$('#pagelet_side_ads').hide();  //hide ads, yes its that easy!
$allLinks.css('color', mtDewRed);
//}
