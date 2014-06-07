// ==UserScript==
// @name       Add Trade Comments to Dota2Lounge
// @version    1.4
// @description  Usually you have to hover over trades to see their description, this script adds that text below the trade title line so you can quickly browse trades. Also scrolls to top whenever a new page of results is loaded. 
// @match      http://dota2lounge.com/*
// @copyright  2014+, Brad Zacher
// ==/UserScript==

function addDescs() {
    $('.tradeheader').each(function() {
        // don't add description to trades that are done
        if (!$(this).hasClass('D2LdescriptionBoxDone')) {
            // trim and make newlines html compliant
            var title = $(this).attr('title').trim().replace(/\n/g, '<br />');
            if (title.length !== 0) {
                $(this).append('<br /><span style="font-size: 120%; font-weight: bold; outline: black solid 1px; background-color: white;">' + title + '</span>');
            }
            
            // mark the trade as done
            $(this).addClass('D2LdescriptionBoxDone');
        }
    });
}

// for some reason doing it on load doesn't work for some people... 
$(document).ready(function() {
    // add description to be visible on the page
    addDescs();
    
    // scroll to top when next page is opened
    $('.simplePagerNav a').click(function() {
        window.scrollTo(0,0);
    });
});

// for infinite scroll page - whenever new data is successfully fetched, just redo the entire content.
$(document).ajaxSuccess(function() {
    addDescs();
});