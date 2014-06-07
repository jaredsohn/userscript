// ==UserScript==
// @name       Feedly auto item marker
// @version    1.0
// @description  marks items as read according to a regular expression
// @match      http://www.feedly.com/home
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @copyright  2013+, Iddo Levin
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
    return;

function setFeedFilters(feedFilters) {
    localStorage.setItem("feedFilters", JSON.stringify(feedFilters));
}

function getFeedFilters() {
    var feedFilters;
    try {
        feedFilters = JSON.parse(localStorage.getItem("feedFilters"));
    } catch (e) {
        console.log("Failed parsing feed filters " + localStorage.getItem("feedFilters"));
    }
    if (!feedFilters) {
        feedFilters = {};
    }
    currentFeedId = getCurrentFeedId();
    if (!feedFilters[currentFeedId] && currentFeedId) {
        feedFilters[currentFeedId] = [];
    }
    return feedFilters;
}

function getCurrentFeedId() {
    return $("#feedlyPart0 .feedTitle").data("feedid");
}

function getCurrentFeedFilters() {
    var currentFeedFilters = getFeedFilters()[getCurrentFeedId()];
    if (!currentFeedFilters) {
        return [];
    }
    return currentFeedFilters;
}

function filterLoop()
{
    if ($("#filter").size() < 1) {
        // Add config button
        var button = $("<div>Filters</div>");
        button.attr("id", "filter");
        button.css({position:"fixed",top:0,left:0,'background-color':"white"});
        button.click(function() {
            setFeedFilters(JSON.parse(prompt("Set filters", JSON.stringify(getFeedFilters()))));
        });
        $("body").append(button);
    }
    
    var currentFeedFilters = getCurrentFeedFilters();
    if (currentFeedFilters.length > 0) {
        $(".u4Entry,.u5Entry").each(function() {
            var me = $(this);
            if (!me.data("tested")) { // Don't do expensive checks on an already checked item
                me.data("tested", true);
                
                var title=me.data("title");
                for (i=0; i<currentFeedFilters.length; i++) {
                    var regexp = new RegExp(currentFeedFilters[i],"i");
                    if (regexp.test(title)) {
                        var id=me.data("actionable"), burylink=$("span[data-buryentryid='"+id+"']");
                        burylink.click();
                        console.log("Removed " + title);
                    }
                }
            }
        });
    }
    setTimeout(filterLoop, 555);
}

$(document).ready(function() {
    filterLoop();
});