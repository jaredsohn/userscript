// ==UserScript==
// @name        Youtube unplaylister
// @namespace   http://canttaketheskyfrom.me/
// @description Disables the playlist bar and playlist autoplay on Youtube, unless a "Play All" link is used.
// @include     http*://*.youtube.com/playlist?*
// @include     http*://*.youtube.com/results?*
// @include     http*://*.youtube.com/watch?*
// @include     http*://*.youtube.com/user/*
// @version     0.8.2
// @grant       none
// ==/UserScript==

/**===Configuration===**/
var enable_play_all =  true; //option for "Play All" links, the only(?) case in which a playlist is desired

/***** Global variables *****/
var to_remove = ["playnext=", "list=", "index=", "feature="]; //URL parameters to be removed to strip all playlist features, must be lowercase. Probably overkill, just removing the "list" parameter would be enough. But it's prettier this way.
var dirty_optimizer = to_remove.length; //optimizing. Hahaha. Maybe.
var dirty_optimizer_minus_one = dirty_optimizer--; //sue me

/***** Remove the playlist bar from the video page (which conveniently also disables playlist autoplay) unless a "Play All" link was used to reach this page *****/
function video_page() {
    if (window.location.href.indexOf("&play_all=true") == -1) { //if we didn't come here through a "Play All" link
        var div = document.getElementById("playlist"); //get the playlister-bar element, if it exists
        if (div) { //if we found one…
            div.parentNode.removeChild(div); //…remove it
        }
    }
    if (enable_play_all) { //if "Play All" links are enabled
        var list_links = document.querySelectorAll('a[href*="&list="], a[href*="?list="]'); //links whose href contain either "&list=" or "?list="
        for (var i = 0; i < list_links.length; i++) { //iterate over all the links
            list_links[i].href += "&play_all=true"; //add hint for video page handling (see above)
        }
    }
}

/***** Remove all(?) playlist elements from links on playlist pages, except "Play All" links, if enabled *****/
function playlist_page() {
    var list_links = document.querySelectorAll('a[href*="&list="]'); //links whose href contain "&list="
    for (var i = 0; i < list_links.length; i++) { //iterate over all the links
       if ( enable_play_all && (list_links[i].href.indexOf("&index=") == -1) ) { //if this is a "Play All" link
           list_links[i].href += "&play_all=true"; //add hint for video page handling
           continue; //skip this iteration of the loop
       }
       var segments = list_links[i].href.split('&'); //split the link up into segments at the "&"
       for (var j = 1; j < segments.length; j++) { //iterate over the segments, skipping the first one, which is the base URL
           for (var k = 0; k < dirty_optimizer_minus_one; k++) { //iterate over the parameters that should be removed, skipping the last one which is never used on the playlist page
               if (!segments[j].toLowerCase().indexOf(to_remove[k])) { //see if the segment begins with one of the parameters we want removed
                   segments.splice(j, 1); //remove that segment
                   j--; //decrease the counter, since we removed one segment
                   break; //we found one word, there won't be any others in here
               }
           }
       }
       list_links[i].href = segments.join("&"); //rejoin all the seperate segments with the necessary "&"
    }
}

/***** Remove all(?) playlist elements from links on search result pages, except "Play All" links, if enabled *****/
function results_page() {
    var list_links = document.querySelectorAll('a[href*="&list="]'); //links whose href contain "&list="
    for (var i = 0; i < list_links.length; i++) { //iterate over all the links
       if (enable_play_all && list_links[i].href.indexOf("&feature=results_main") != -1) { //if this is a "Play All" link
           list_links[i].href += "&play_all=true"; //add hint for video page handling
           continue; //skip this iteration of the loop
       }
       var segments = list_links[i].href.split('&'); //split the link up into segments at the "&"
       for (var j = 1; j < segments.length; j++) { //iterate over the segments, skipping the first one, which is the base URL
           for (var k = 0; k < dirty_optimizer; k++) { //iterate over the parameters that should be removed
               if (!segments[j].toLowerCase().indexOf(to_remove[k])) { //see if the segment begins with one of the parameters we want removed
                   segments.splice(j, 1); //remove that segment
                   j--; //decrease the counter, since we removed one segment
                   break; //we found one word, there won't be any others in here
               }
           }
       }
       list_links[i].href = segments.join("&"); //rejoin all the seperate segments with the necessary "&"
    }
}

/***** Remove all(?) playlist elements from links on user pages, except "Play All" links, if enabled  *****/
function user_page() {
    playlist_page(); //so far there doesn't seem to be any difference in handling these two, so we just call playlist_page()
}

/***** Main - this is run when the DOM has finished loading (or so I hope) *****/
if (window.location.href.indexOf("youtube.com/watch?") != -1) { //if we are on a video page
    video_page();
} else if (window.location.href.indexOf("youtube.com/playlist?") != -1) { //if we are on a playlist page
    playlist_page();
} else if (window.location.href.indexOf("youtube.com/results?") != -1) { //if we are on a search results page
    results_page();
} else if (window.location.href.indexOf("youtube.com/user/") != -1) { //if we are on a user page
    user_page();
}