// ==UserScript==
// @name        monteluce
// @namespace   monteluce
// @description changes the color of the availability
// @include     http://www.homeaway.co.uk/p86729
// @version     1
// @grant       none
// ==/UserScript==
$('.cal-content-wrapper').css('background-color','white');
$('#calendars').find('th').css('background-color','black');
$('#calendars').find('th').css('text-transform','uppercase');
$('.day-label').css('color','#EEE');





