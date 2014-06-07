// ==UserScript==
// @name         clickAll
// @description  Clicks all of the links to turn them purple
// ==/UserScript==

(function($) {
    function cancelClicks(event) {
        event.preventDefault();
    }

    // Capture click events for every link on the page and
    // prevent the browser from following the link.
    $('body').delegate('a', 'click', cancelClicks);

    // Iterate over every link and trigger a click.  This code
    // is adapted from:
    // https://developer.mozilla.org/en/DOM/document.createEvent
    $('a').each(function() {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var anchor = this; 
        anchor.dispatchEvent(evt);
    });

    // Remove the cancelClicks handler so that non-JavaScript
    // links will behave normally again.
    $('body').undelegate('a', 'click', cancelClicks);
})(jQuery);