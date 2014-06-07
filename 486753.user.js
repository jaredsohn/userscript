// ==UserScript==
// @name        PixelJoint Better Rating Icons
// @namespace   http://userscripts.org/users/386946
// @include     http://pixeljoint.com/pixelart/*
// @include     http://www.pixeljoint.com/pixelart/*
// @version     1
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//GM_setValue("test01", "test01 val");
/*
console.log(GM_getValue("test01"));

console.log('hi1');


function pjRatecounterGet (x) {
    return GM_getValue(x);
};

function pjRatecounterSet (x,y) {
    GM_setValue(x, y);
};

console.log('hi2');
*/
$(document).ready(function() {
     //Rating Stars
    $("#ratings1 table tr td a img").attr('width', 21);
    
    
    oStarImages["up"].src = "http://i.imgur.com/0JtNLA9.gif";
    oStarImages["down"].src = "http://i.imgur.com/xM0WLKG.gif";
    
    $('img[src="/pixels/images/stars_down.gif"]').attr('src',oStarImages["down"].src);
    $('img[src="/pixels/images/stars_up.gif"]').attr('src',oStarImages["up"].src);
	
});