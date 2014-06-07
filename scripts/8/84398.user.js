// ==UserScript==
// @name           Profile Searcher
// @namespace      Bluestone
// @description    Adds a search box to profiles to find old posts.
// @version        1.2
// @include        http*://facebook.com/*
// @include        http*://facebook.com
// @include        http*://facebook.com?*
// @include        http*://facebook.com#*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.com
// @include        http*://*.facebook.com?*
// @include        http*://*.facebook.com#*
// ==/UserScript==

var $;

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
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    
    // Are we currently searching?
    var done = true;
    // If people want more results after we find some, we need to know how much already exist on the page
    var alreadyExistingResults = 0;
    // All the query terms
    var queries = new Array();
    
    // Bind the search box, and an event listener
    $("div#content").bind("DOMSubtreeModified", function(){
      if ($("li#profile_search").length == 0) {
        $("ul#profile_tabs").append('<li style="float: right;" id="profile_search">\
                                       <span class="uiSearchInput textInput" style="border-color: #D8DFEA;">\
                                         <span style="border-top: none;">\
                                           <input style="text" placeholder="Search this profile" value="Search this profile" id="chrome_search" class="inputtext DOMControl_placeholder" />\
                                           <button type="submit" id="chrome_execute" />\
                                         </span>\
                                       </span>\
                                     </li>');
        finished();
        alreadyExistingResults = 0;
        queries = new Array();
      }
    });
    $("button#chrome_execute").live('click', executeSearch);
    $("input#chrome_search").live('keypress', maybeTheyClickedEnter);
    
    // Strip duplicates
    function uniqueArray(names) {
        var returnArray = new Array(); 
        for (i = 0; i < names.length; i++) {
            var alreadyOccurred = false;
            for (j = 0; j < i; j++) {
                if (names[i] == names[j]) {
                    alreadyOccurred = true;
                    break;
                }
            }
            if (!alreadyOccurred) returnArray.push(names[i]); 
        }
        return returnArray;
    }
    
    // Compare two *unique* arrays
    // Returns true if identical, false if not
    function compareUniqueArrays(a, b) {
        if (a.length != b.length) return false;
        for (var i in a) {
            found = false;
            for (var j in b) {
                if (a[i] == b[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }
    
    // Wrapper to prevent concurency
    function executeSearch() {
        if (!done) {
            finished();
        }
        done = false;
        var newQueries = uniqueArray($("input#chrome_search").val().split(/\s/));
        // Are we just searching for more?
        if (!compareUniqueArrays(queries, newQueries)) {
            alreadyExistingResults = 0
            queries = newQueries;
        }
        // Do an initial search
        $("input[name=view_all]").click();
        searchDOM(document, true);
        if (done) {
            alert("We found a result! If you want to keep searching, just hit the search button again.");
        // Okay, let's go!
        } else {
            $("div#content").bind("DOMNodeInserted", handleEvent); // Parse new elements when they appear
            searchRecursor(); // Loop around and get more elements
        }
    }
    
    // If they hit enter, do the search
    function maybeTheyClickedEnter(event) {
        if (event.which == 13) {
            $("button#chrome_execute").click();
        }
    }
    
    // jQuery's :contains is cool and all, but it's case sensitive. 
    $.expr[':'].icontains = function(obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
    };
    
    // Recursion is the easiest way to deal with Javascript's lack of a wait()
    function searchRecursor(){
        // If we moved to a new page, cancel
        if (done) {
            // Alert the user... gotta do this here, because browsers parallelize DOMNodeInserted
            alert("We found a result! If you want to keep searching, just hit the search button again.");
            return;
        }
        // Do this on every go. Yes, it taxes the CPU... but that's better than taxing bandwidth at the end
        // (Expand all comments)
        $("input[name=view_all]").click();
        // Do the rest
        setTimeout("searchRecursorTwo()", 2000);
    }
    
    // I know it's ugly. I blame Javascript.
    function searchRecursorTwo() {
        // If we moved to a new page, cancel
        if (done) {
            // Alert the user... gotta do this here, because browsers parallelize DOMNodeInserted
            alert("We found a result! If you want to keep searching, just hit the search button again.");
            return;
        }
        // Click it, give executeSearch some time, and move on
        if ($("div.uiMorePager a.lfloat").click().length > 0) {
            setTimeout("searchRecursor()", 2000);
        // If the button isn't there, then we're done
        } else {
           finished();
        }
    }
    
    // Wrapper for the event
    function handleEvent(event) {
        searchDOM(event.target);
    }
    
    // Search the given area
    function searchDOM(element, initial) {
        if (initial === undefined) initial = false;
        // If we moved to a new page, cancel
        if (done) return;
        if ($(element).is("div.UIStory, div.UIRecentActivity_Stream")) found = $(element);
        else found = $(element).find("div.UIStory, div.UIRecentActivity_Stream");
        if (found.length == 0) found = $(element).parents("div.UIStory, div.UIRecentActivity_Stream");
        for (var i in queries) {
            found = found.filter(":icontains('" + queries[i] + "')");
        }
        //if ($(element).is("div.UIStory, div.UIRecentActivity_Stream")) var found = $(element);
        //else var found = $(element).find("div.UIIntentionalStory, div.UIRecentActivity_Stream");
        if ((!initial && found.length > 0) || found.length > alreadyExistingResults) {
            // Display everything
            $("div#profile_stream_container div.hidden_elem").removeClass("hidden_elem");
            $("div#profile_stream_container a.UIStream_Chunk_Expand").remove();
            $("div#profile_stream_container span.text_exposed_link > a").click();
            // Get containers
            if (found.is("div.UIIntentionalStory, div.UIRecentActivity_Stream")) containers = found;
            else containers = found.parents("div.UIIntentionalStory, div.UIRecentActivity_Stream");
            // Scroll somewhere
            var scrollToIndex = (initial ? alreadyExistingResults : 0);
            window.scrollTo(0, containers.eq(scrollToIndex).position().top);
            // Highlight the found text
            for (var j in queries) {
                var regexp = new RegExp("(>[^<]*)(" + queries[j] + ")([^>]*<)", 'i');
                found.each(function() {
                    $(this).html($(this).html().replace(regexp, '$1<span style="background-color: yellow;">$2</span>$3'));
                });
            }
            // Highlight the found element
            containers.css("border", "2px solid yellow");
            // Update the amount of existing results, so people can keep searching 
            alreadyExistingResults += found.length;
            // We're done
            finished();
        }
    }
    
    // Finish searching
    function finished() {
        done = true; // Stop getting new stuff
        $("div#content").unbind("DOMNodeInserted", handleEvent); // Stop searching new stuff
    }
    
}