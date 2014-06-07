// ==UserScript==
// @name        Map Maker - Enter clicks blue button
// @description Pressing Enter key clicks the last blue (submit/save/next) button visible on the page
// @namespace	bozar
// @include		http://www.google.com/mapmaker*
// @include		http://www.google.pl/mapmaker*
// @version		1.0.0
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==
$(document).bind("keydown", bindHotkey);

function bindHotkey(e){  
    if(e.keyCode == 13){      
        e.preventDefault();
        var b = $(".kd-button-submit:visible");           
        //console.log(b.length + " buttons found. clicking last!");
        b.last().click();     
    }
}