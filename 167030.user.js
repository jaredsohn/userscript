// ==UserScript==
// @name       ExMoose Sidebar Fix
// @version    0.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description  This moves the side bar back to its rightful place
// @match      http://www.reddit.com/r/exmuslim/*
// ==/UserScript==

$.expr[':']['nth-of-type'] = function(elem, i, match) {
    if (match[3].indexOf("n") === -1) return i + 1 == match[3];
    var parts = match[3].split("+");
    return (i + 1 - (parts[1] || 0)) % parseInt(parts[0], 10) === 0;
};

$(document).ready( function(){    
$('.side').css('float', 'right');
$('h6:nth-of-type(1)').css('left', '0px');
});