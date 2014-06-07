// ==UserScript==
// @name        Twitter Contextualizer
// @namespace   http://williamblasko.com
// @description Keep context when clicking "view new tweets"
// @include     /^https?://twitter\.com/.*$/
// @version     1.1.1
// ==/UserScript==

(function() {
    $(function() {
        var streamContainer     = $(".stream-container"),
            firstTweetContainer = $(".tweet:first").parent(),
            newTweetsClicked    = false;

        $("body").ajaxComplete(function(event, xmlHttpRequest, ajaxOptions) {
            if (newTweetsClicked && ajaxOptions.url.indexOf("/i/resolve.json") !== -1) {
                newTweetsClicked = false;
                var center = $(firstTweetContainer).offset().top;
                var height = $(firstTweetContainer).height();
                var bottom = center + height;
                var winHeight = $(window).height();
                var newPos = bottom-winHeight;

                $('html, body').animate({
                  scrollTop: newPos
                }, 500);
            }
        });

        streamContainer.delegate(".new-tweets-bar:parent", "click", function(event) {
            firstTweetContainer = $(".tweet:first").parent();
            firstTweetContainer.css({
                backgroundColor: "lightgrey"
            });
            newTweetsClicked = true;
        });
    });
})();