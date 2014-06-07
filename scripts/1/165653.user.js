// ==UserScript==
// @name       twitchScripts
// @namespace  *www.twitch.tv/
// @version    0.1
// @description  enter something useful
// @include		*twitch.tv/*
// @copyright  2012+, GDur
// ==/UserScript==
var jQuery = "jQuery";

// because these scripts will run when the 
var incjectedOnLoad = function($) {
    
    // remove the headline in order to have more space
    var headline = $("#broadcast_meta");
    
    if (headline) {
        
        // will add the title of the headline to the bottom right unter the player
        var logoPath = $("#lateload0").attr("src");
        var style = 'background: url(\''+logoPath+'\') no-repeat 0 0; background-size:30px 30px; padding-left: 32px;';
        $("#channel_stats").append('<span class="stat" id="headline" style="'+style+'" original-title="Channel Views">'+$(".js-title").html()+"</span>");

        // remove the headline
        $(headline).remove();
    }   
    
    // close the add instead of removing it
    $('.ad_contain.nothidden').hide();
    
    
    function cons(a) {
        var willLog = true;
        if (willLog){ console.log("Twitch Greasemonkey - " + a);}
    }
} 

// injection of the code
var body = document.getElementsByTagName("body")[0];
if (body) {    
    var script = document.createElement('script');
    // the IIFE will execute the function immediate
    script.innerHTML = "(" + incjectedOnLoad.toString() + ")(jQuery);";
    body.appendChild(script);
}
function cons(a) {
    var willLog = true;
    if (willLog){ console.log("Twitch Greasemonkey - " + a);}
}
function doForEachTagName(tagName, fn) {
    var divs = document.getElementsByTagName(tagName);
    for (var j = 0; j < divs.length; j++) {
        fn(divs[j]);
    }
}