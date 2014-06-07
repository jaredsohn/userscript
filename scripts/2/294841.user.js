// ==UserScript==
// @name       Dota 2 Subscribe to Guide
// @namespace  http://reddit.com/u/doctorjokie/
// @version    0.1
// @description  Adds a subscribe button the results page for a given author to shorten the subscription process.  Currently does not know if already subscribed.
// @match      http://steamcommunity.com/*
// @copyright  2013+, doctorjokie
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require    http://cachedcommons.org/cache/jquery-cookie/0.0.0/javascripts/jquery-cookie.js
// ==/UserScript==

var appId = 570;

function main() {
    
    $('.workshopItemTitle').append(function(){
        var guideId, element;
        guideId = getGuideId(this);
        element = "<a href='#' class='gm_subscribe' id='gm_" + guideId + "'>Subscribe</a>";
        return element;
    });
    
    $('.gm_subscribe').addClass('btn_green_white_innerfade btn_border_2px btn_medium');
    
    $('.gm_subscribe').click(function() {
        
        var guideId, idPosition, sessionId, guideUrl;
        guideId = getGuideId(this);
        sessionId = $.cookie("sessionid");
        
        $.post( "http://steamcommunity.com/sharedfiles/subscribe", { id: guideId, appid: appId, sessionid: sessionId } )
        .done(function(data) {
            $("#gm_" + guideId).text("Subscribed");
        });
        
        return false;
    });    
}


function getGuideId(element) {
    
    var guideUrl, idPosition, guideId;
    guideUrl = $(element).closest(".workshopItemCollection").attr("onclick");
    console.log(guideUrl);
    
    idPosition = guideUrl.search("id=");
    guideId = guideUrl.substring(idPosition+3, guideUrl.length-1);
    
    return guideId;
}

main();