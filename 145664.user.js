// ==UserScript==
// @name        TeamLiquid.net collapsed calendar
// @namespace   TLcalendar
// @description Automatically collapses all days in the event calendar except the day of the selected event or - if no event is selected - today
// @include     http://www.teamliquid.net/calendar/*
// @version     1
// ==/UserScript==

var toggleCollapse = function (element) {
jQuery(element).toggle();
if(jQuery(element).prev('div').children('.collapseToggle').text() == '+') {
    jQuery(element).prev('div').children('.collapseToggle').text('-');
    }
else {
    jQuery(element).prev('div').children('.collapseToggle').text('+');
    }
}

jQuery('div[id^="calendar_"]').not("#calendar_content").not("#calendar_div").not("#calendar_mdiv").prev('div').prepend('<div class="collapseToggle" style="float:left; width: 15px;">+</div>').click(function() { 
  toggleCollapse(jQuery(this).next('div')); 
}).next('div').hide();

if(window.location.hash) { 
 toggleCollapse(jQuery('a[name=' + window.location.hash.substring(1) + ']').parent('div'));
 jQuery('a[name=' + window.location.hash.substring(1) + ']').next('div').css('border', '3px dashed red');
 jQuery(window).scrollTop(jQuery('a[name=' + window.location.hash.substring(1) + ']').next('div').position().top)
}
else {
 var currentDate = new Date();
 jQuery('#calendar_'+ currentDate.getDate() +'content').prev('div').click();
}