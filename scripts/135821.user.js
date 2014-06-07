// ==UserScript==
// @name       TradeMe Google reminder
// @namespace  http://drsr/
// @version    0.2
// @description  Add a Google Calendar reminder link to Trademe auction pages
// @include    /http:\/\/www\.trademe\.co\.nz\/.*\/[Ll]isting.*/
// @include    /http:\/\/www\.trademe\.co\.nz\/.*\/auction-.*/
// @include    /http:\/\/www\.trademe\.co\.nz\/a\.aspx.*/
// @grant      GM_addStyle
// @copyright  public domain
// ==/UserScript==

var $ = unsafeWindow.jQuery;

// replace trademe's JS error handler
window.onerror=function(msg, url, linenumber){
    console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
};

function getCloseDateTime() {
    var closeDateTime = null;
    // format of closing time is "Closes: Sat 16 Jun, 3:05 pm." and optionally " This auction may auto-extend"
    var closing = $("#BidBuyNow_closingContainer").text();
    if (closing && closing.indexOf("Closes:") > -1) {
        // get just date and time without dayname but including am/pm
        var closeTime = /Closes:\s+\w+\s+(.*m)\..*/.exec(closing);
        if (closeTime) {
            closeTime = closeTime[1];
            // insert year
            var timeParts = closeTime.split(",");
            closeDateTime = new Date(timeParts[0] + " " + new Date().getFullYear() + " " + timeParts[1]);
        }
    }
    return closeDateTime;
}

/*
 *  Return a date string as yyyymmddThhmmssZ in UTC.
 *  based on http://stackoverflow.com/questions/5661487/converting-date-time-to-rfc3339-format-using-either-jquery-or-java-script
 */
// Add leading zero to single digit numbers
function addZ(n) {
    return (n<10) ? '0'+n : ''+n;
}
function dateToUTCString(d) {

    return d.getUTCFullYear() + 
           addZ(d.getUTCMonth() + 1) + 
           addZ(d.getUTCDate()) +
           'T' + 
           addZ(d.getUTCHours()) + 
           addZ(d.getUTCMinutes()) + 
           addZ(d.getUTCSeconds()) +
           'Z';
}

function addReminderLink(reminderTime) {
    var auctionTitle = $("#ListingTitle_title").text().trim();

    var utcDate = dateToUTCString(reminderTime);

    // Link format: http://support.google.com/calendar/bin/answer.py?hl=en&answer=2476685
    // annoyingly Google Calendar web app won't auto-link to either HTML or plain link in the title or details, 
    // but other calendar and browser apps e.g. Android should when they popup the reminder
    var reminderLink = "http://www.google.com/calendar/event?action=TEMPLATE" + 
        "&text=TM: " + escape(auctionTitle) +  
        "&dates=" + utcDate + "/" + utcDate +
        "&details=" + escape(location.href); 

    GM_addStyle(".tmgr_addToGoogle {padding-top:5px;}");
    // TODO better layout
    $("#SaveToWatchlist_SaveToWatchlistButton")
        .after('<div id="tmgr_addToGoogle" class="tmgr_addToGoogle">' + 
                   '<a href="' + reminderLink + '">' +
                       '<img src="http://www.google.com/calendar/images/ext/gc_button2.gif">' +
                   '</a>' +
               '</div>');
}


var reminderTime = getCloseDateTime();
if (reminderTime) {
    addReminderLink(reminderTime);
}