// ==UserScript==
// @name           HideAnnoyingThreads
// @namespace      vof.se
// @description    Döljer valfria trådar i "Aktiva trådar vyn"
// @include        http://www.vof.se/forum/search.php?search_id=active_topics
// @include        http://www.vof.se/forum/search.php?search_id=newposts
// ==/UserScript==

var hideUs = ["22", "15820"];


// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');
        
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        hideRows();
    }
}

//Checks if link contains t=[topicId] and hides the table-row.
function hideRows() {        
    var topics = $(".topictitle")
    for (var i=0; i < topics.length; i++)
    {        
        for (var j=0; j < hideUs.length; j++)
        {
            if (topics[i].href.search("t="+hideUs[j] ) != -1)
            {
                $(topics[i]).parent().parent().css("display","none");
            }
        }
    }
}