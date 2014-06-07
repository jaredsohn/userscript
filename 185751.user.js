// ==UserScript==
// @name		Changes web Pages white Background
// @version		1.0.0
// @description		Changes web Pages white Background
// @match		(http(s)?://)?(([w]){3}\.)?([a-z]+\.)?([a-z]+)\.([a-z]+)(/*){0,}
// @grant		GM_getValue
// @grant		GM_setValue
// @copyright		2012+, You
// @require		http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==
//$.noConflict();
$(document).ready(function($) {
status=1;
setInterval(function(){
setTimeout(function(){
if(status == 1){
    main($);
    status=0;
}
}, 1000);
}, 1000);
});

function main($){
    var back_color;
    back_color = rgb2hex($('body').css('background-color'));
    //console.info($('body').css('background-color'),rgb2hex($('body').css('background-color')));
	if (back_color == '#ffffff'){
        //console.info("Changing background color from " ,back_color , " to #2C3539");
        $('body').css('background-color','#2c3539');
        fix($);
	}
}


function fix($){
    var elem_color;
    $("*").each(function() {
        elem_color = rgb2hex($(this).css('color'));
        //console.info('Checking color for: ', $(this), "->", elem_color);
        $(this).css('color','#ffffff');
});
}

function rgb2hex(rgb) {
var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}