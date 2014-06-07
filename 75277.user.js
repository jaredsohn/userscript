// ==UserScript==
// @namespace       ajorpheus
// @require	        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @name            CleanKeepTube 
// @description     Cleans up keep-tube.com
// @include         http://keep-tube.com/*
// ==/UserScript==

$("document").ready(function(){
    // Remove header and footer
    $("iframe,h3#thumbnail_header,div#footer,div#header").remove()

    $("h3#download_header ~ table").remove()
    
    // Clean up crap background and remove space at the top
    $("div#main").css("background-image","url()");
    $("div#main_inner").css("padding-top","0");

    // Remove 'Sharing Link' stuff
    $("img[src*=sm-share-en.gif]").parent().parent().remove()

    // Cleanup the sidebar
    $("ul.mainlinks","div#secondaryContent_2columns").eq(0).siblings().remove()
    $("div#columnC_2columns").remove();

    // Clean out a few of the things I don't ever use
    $("div#columnA_2columns").find("center").eq(1).remove() 
    $("div#columnA_2columns").find("center").eq(0).remove() 

    // Move the Download format options above the video thumbnail
    $("div#columnA_2columns").find("center").show();
    var vidFormats = $("div#columnA_2columns").find("center").eq(1);
    $("div#columnA_2columns").find("center").eq(0).prev().before(vidFormats.html())
    vidFormats.remove();

    // Finally remove some of the stuff at the bottom of the page
    //$("#download_header").nextAll().andSelf().remove();

    $("div.dlbox").siblings("h4").eq(0).remove()

    //Remove all br to compress space
    $("div#columnA_2columns > br").remove()

    // Remove the two new flash objects
    $("object").remove()
});
