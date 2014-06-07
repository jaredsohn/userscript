// ==UserScript==
// @name        Remove related pins
// @author      Mark Cervarich
// @namespace   http://markcerv.com
// @description Make the new "Related Pins" disappear from your Pinterest feed.
// @include     http://www.pinterest.com/*
// @match       http://www.pinterest.com/*
// @version     2013-11-18
// @copyright	2013+, Mark Cervarich
// @run-at      document-end
// @grant       none
// ==/UserScript==

// User editable variable
//
var repeat_every_x_seconds = 5;


// -- Please do not modify anything below here --
//
var total_removed = 0;

function hide_related_pins() {
    var num_related_found = $('.recommendationReasonWrapper').parent('.pinWrapper').length;
    $('.recommendationReasonWrapper').parent('.pinWrapper').remove();
    total_removed = num_related_found + total_removed;
    $('#KillRelated span').replaceWith("<span>related pins removed [<font color='red'>" + total_removed + "</font>]</span>");

}

function create_counter_div() {
    $('div.headerContainer div a#logo').after("<div id='KillRelated'><span>...</span></div>");
    $('#KillRelated').css({"left": "50%", "margin-left": "60px", "margin-top": "16px", "position": "absolute", "top": "-2px"});
}

// at load time
create_counter_div();
//hide_related_pins();

window.setInterval(function(){
  hide_related_pins();
}, (repeat_every_x_seconds * 1000));
