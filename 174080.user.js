// ==UserScript==
// @name           TinyChat cleaner
// @description    Cleans up TinyChat using jQuery
// @id             TheFatHobbits
// @version        1.1
// @namespace      TheFatHobbits
// @author         @TheFatHobbits
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include         https://tinychat.com/*
// @include         http://tinychat.com/*
// ==/UserScript==

// resize the height to fit the screen
function resizeTinyChat()
{
    var clientHeight = (jq("body").height() - 75) + "px";
    jq("#chat").css("height", clientHeight);
}

// main cleanup function
function cleanTinyChat()
{
    // modify css styles
    jq("#wrapper").css("width","100%");
    jq("#left_block").css("width","100%");
    jq("body").css("background", "black");
    jq("#tinychat").css("background", "black");

    // remove unncecessary elements
    jq("#navigation .button:contains('Upgrade')").remove()
    jq("#navigation .button.green").remove()
    jq("#navigation .button.orange").remove()
    jq("#navigation .button.purple").remove()
    jq("#category-bar").remove();
    jq("#footer").remove();
    jq("#right_block").remove();
    jq("#room_header").remove();
    jq("#ad_banner").remove();
    jq("#body_footer_ad").remove();
    jq("#chat-info").remove();
    jq("#goods").remove();    

    
    resizeTinyChat();
    // add resize event
    jq(window).resize(resizeTinyChat);
}

var jq = $.noConflict();

cleanTinyChat();
