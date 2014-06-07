// ==UserScript==
// @name           YouTube Title Exposer
// @namespace      reddit
// @author         Bauer
// @description    Shows the title of a YouTube link on mouse hover
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==


/**
 * Wait for jQuery to initialise (on reddit) instead of 
 * loading up our own.
 *
 * @note:   If you're going to run this on other domains, 
 *          you'll need to load an instance of jQuery and
 *          attach the `main` function to the `document.ready`
 *          event
 */
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(GM_wait,100);
    } else { 
        $ = unsafeWindow.jQuery; main(); 
    }
} GM_wait();

/**
 * start doing stuff here!
 */
function main() {      
    
    // for every link posted by a user
    // see if it s a youtube url, and if so
    // match the `v` (video id) value and
    // then attempt to set the title of that
    // anchor object
    
    $(".usertext-body .md a").each(function() {

        var href = $(this).attr("href");
        
        if(href.match(/^http:\/\/(www\.)?youtube\.com\/.*/i)) {
            
            var regVideo = /v=(\w+)/i;
            var match = regVideo.exec(href);
            
            if (match != null) {
                videoID = match[1];
                _setVidTitle(this, videoID);
            }
            
        }
        
    });
}

/**
 * Asynchronously set the video title of a given object
 * @obj The object
 * @q The query of the YouTube video
 */
function _setVidTitle(obj, q) {
        
    // make a jsonp call to the youtube data api
    // by searching for the YouTube ID as a query.
    // this returns the video details. we're only
    // interested in the title atm.
    
    var ytData = "http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q=" + q +
    "&callback=?";
    
    var currentTitle = $(obj).attr("title");
    
    
    $.getJSON(ytData, function(data) {
        
        var result = data.data.items[0];
        
        title   = "YouTube - " + result.title;
        id      = result.id;
        
        if(id == q) {
            var newTitle = (currentTitle == "" ? title : 
                currentTitle + " / " + title);
            
            $(obj).attr("title", newTitle);
        }
        
    });

}
