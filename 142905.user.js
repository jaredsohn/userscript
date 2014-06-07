// ==UserScript==
// @name           Flip Youtube
// @version        0.6
// @author         highfredo
// @run-at         document-end
// @include        http*://www.youtube.*/watch*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, Highfredo
// ==/UserScript==

GM_addStyle(".FY_flip { -webkit-transform: scaleX(-1); -moz-transform: scaleX(-1); -o-transform: scaleX(-1); transform: scaleX(-1); filter: FlipH; }");

function isHtml5(){
    return $(".html5-player").length>=1
}

function flip(){    
    var element = isHtml5() ? $("video") : $("embed")
        
    if(element.hasClass("FY_flip"))
        element.removeClass("FY_flip")
    else   
        element.addClass("FY_flip") 
}

function addButton(){  
    $("<span>", {
        class: "yt-uix-button-group",
        id: "flipContainer"
    }).appendTo("#watch-headline-user-info")   
    
    $("<button>", {
        class: "start yt-uix-button yt-uix-button-default",
        id: "flipButton",
        click: function(){ flip() }
    }).appendTo("#flipContainer")
    
    $("<span>", {
        class: "yt-uix-button-content",
        text: "Flip Video!"
    }).appendTo("#flipButton")  
}
addButton();