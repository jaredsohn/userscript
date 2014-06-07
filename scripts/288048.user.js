// ==UserScript==
// @name       Dilbert Navigation Buttons
// @namespace  http://chrismgonzales.wordpress.com
// @version    1.0
// @description  This script adds the ability to navigate dilbert commics using the arrow keys.
// @match      http://dilbert.com/strips/comic/*
// @copyright  2014+, Chris Gonzales
// ==/UserScript==

$(document).keydown(function(e){
    //left
    if (e.keyCode == 37) {
       var address = $(".STR_Prev")[0].href;
        window.location.href = address;
       return false;
    }
    //right
    else if(e.keyCode == 39) {
       var address = $(".STR_Next")[0].href;
       window.location.href = address;
       return false;
    }
});