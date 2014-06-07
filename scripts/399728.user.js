// ==UserScript==
// @name           Bulk hide from Facebook Timeline
// @namespace      https://github.com/darylharrison
// @include        https://www.facebook.com/*/allactivity
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant          none
// @version        0.2 (works on Facebook as of 2014-01-01)
// ==/UserScript==
/*

This is a userscript that I quickly hacked together to bulk hide activities from your Facebook Timeline.

The script adds the following links to the activity log:
- "Hide all activity from this month" above each month
- "Hide all activity from this year" above each year

Make sure you first scroll far enough down the activity log page such that the entire month or year you
wish to hide is loaded. Click on one of these links and the script will hide all activity for that month
or year. You will be able to follow the script's progress - just don't interfere with the page while it's
busy!

The script will sometimes miss a few activities if the dropdown to hide activites does not load fast enough.
It should be easy enough to find these stragglers on your Timeline and then hide them manually.

You will need to use Firefox with the Greasemonkey extension and then visit the following URL to install:
https://github.com/darylharrison/Bulk-hide-from-Facebook-Timeline/raw/master/bulk_hide_from_facebook_timeline.user.js
In theory it should work in Chrome but I have not tested it.

Please feel free to improve it as you see fit :)

-Daryl

*/

(function() {

try {
    setTimeout(main, 2000);
} catch (exception) {
    console.log(exception);
}

function main() {
    $(".fbTimelineSection").prepend('<a class="hideAllBtn" style="font-size:16px" href"#">Hide all activity from this month</a>');
    $("div[id^=\"year\"]").prepend('<a class="hideAllBtn" style="font-size:16px" href"#">Hide all activity from this year</a>');
    $(".hideAllBtn").click(function() {
        hideAll($(this).parent());
    });
    console.log("Ready");
}

function hideAll(section) {
    $(section).find('a[aria-label="Allowed on Timeline"]').each(function(i) {
        var dropdownBtn = this;
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $(dropdownBtn).offset().top-200,
            }, 100);
            clickLink(dropdownBtn); // click the dropdown button
            setTimeout(function() {
                $(dropdownBtn).parent().find('a[ajaxify*=\"action=hide\"]').each(function() {
                    clickLink(this); // then click the "Hide from Timeline" button
                });
            }, 1000);
        }, i*2000);
    });
}

function clickLink(elem) {
    var clickEvent = document.createEvent("HTMLEvents");
    clickEvent.initEvent("click", true, true);
    elem.dispatchEvent(clickEvent);
}

})();