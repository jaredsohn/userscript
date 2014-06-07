// ==UserScript==
// @name           Gametrailers - Highlight posted-in threads
// @namespace      gametrailers
// @description    Highlights posted-in Gametrailers threads
// @author         Unsight
// @include        http://gametrailers.com/*
// @include        http://www.gametrailers.com/*
// @include        http://forums.gametrailers.com/*
// ==/UserScript==

function highlightContent() 
{
    //make sure there is no conflict between jQuery and other libraries
    $.noConflict();
        
    // Highlight previously posted-in topics
    highlightTopics();
}


//-----------------------------------------------------------------------------
// Highlight Previously Posted-In Topics
//-----------------------------------------------------------------------------

function highlightTopics()
{
    // Find each forum thread row
    $("div.showforum_thread_row").each(function() {    
    
        // See if the thread has been posted in
        var icon = $(this).children("div.showforum_thread_readicon").children("img").attr("src");
        var hasBeenPostedIn = icon.indexOf('thread_dot_new.gif')  != -1;
        
        //var currentUser = $("div#userinfo_text_title").text();
        //var lastPostedUser = $(this).find("div.showforum_thread_last_post_author a").text();
        
        // Highlight threads you have posted in
        if(hasBeenPostedIn)
        {
            $(this).css("background-color", "pink");
            $(this).find("div.showforum_thread_readicon").css("background-color", "pink");
            $(this).find("div.showforum_thread_last_post").css("background-color", "pink");
            $(this).find("div.showforum_thread_views").css("background-color", "pink");
        }
    });
}


//-----------------------------------------------------------------------------
// JQuery Helper Functions
//-----------------------------------------------------------------------------

// Check if jQuery's loaded
function GM_wait() 
{
    if( typeof unsafeWindow.jQuery == 'undefined' ) 
    {
        window.setTimeout( GM_wait, 100 );
    }
    else 
    {
        $ = unsafeWindow.jQuery; 
        highlightContent(); 
    }
}

//-----------------------------------------------------------------------------
// Begin running script
//-----------------------------------------------------------------------------


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Run script
GM_wait();