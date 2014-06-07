// ==UserScript==
// @name       AOC_AddClockToForum
// @namespace  http://antonkolesnikov.com
// @version    0.22
// @description  Add msk clock to aoc forum
// @match      http*://forum.ageofclones.com/*
// @copyright  2013+, Anton K.
// @updateURL http://valentinakolesnikova.com/userscripts/aoc/AOC_AddClockToForum.meta.js
// @downloadURL http://valentinakolesnikova.com/userscripts/aoc/AOC_AddClockToForum.user.js
// ==/UserScript==

function updateClockMsk(){
    var mskTzOffset=4;
    var d = new Date();
    var dx = d.toGMTString();
    dx = dx.substr(0,dx.length -3);
    d.setTime(Date.parse(dx));
    d.setHours(d.getHours() + mskTzOffset);
    var timeString = d.toTimeString().substr(0, 8);
    $('#clockMsk').text(timeString);
}

$(document).ready(function() {
    var placeholderForClock = $("<li>").insertBefore($("div.contents .panel .icons .notifications"))
    var clockMsk = $("<span>").attr("id", "clockMsk").css({margin: "0 0 0 8px", "font-size": "10px", color: "#6699cc", "font-weight": "bold"});
    
    $("div.extra-info-wrapper").css("width", "60%")
    clockMsk.appendTo(placeholderForClock);
    
    updateClockMsk();
    setInterval(updateClockMsk, 1000);
});