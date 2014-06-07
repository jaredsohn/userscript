// ==UserScript==
// @name           Tweakers Tracker FIX
// @namespace      http://tweakers.net
// @description    BY STRUNKIE
// @author         Kevin Meijer
// @copyright      (C) 2012  Kevin Meijer
// @include        *tweakers.net*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        0.2
// ==/UserScript==

$(document).ready(function(){
    document.getElementById("trackerPopupButton").click();
    setTimeout(function(){addPop()}, 400);
});

function addPop(){
    var trackerHTML = $('.trackerPopup').html();
    var trackerPopupCSS = "float:left; position: absolute; display:block;"
    
    //remove old shit
    $('.trackerPopup').remove();
    
    $('.trackerPopup').removeClass('popup');
    $('#contentArea').append('<div class="trackerPopup fixed" style="' + trackerPopupCSS + '">' + trackerHTML + '</div>').css('position', 'relative')
   
}

enableTracker();