// ==UserScript==
// @name       LinkedIn Non-Member Hider
// @namespace  http://www.joshuahutt.com/
// @version    0.1
// @description This hides those pesky "Invite X to join LinkedIn" cards, when you only want to see people with whom you can actually connect.
// @match      http*://*.linkedin.com/
// @copyright  2014+, Joshua Hutt
// ==/UserScript==

function HideNonMembers() {
    $('li.card').each(function() {
        var h = $(this).find('.headline').text();
        if (h.indexOf('Invite') > -1) {
            var a = [];
            $(this).remove();
        }
    });
}

// var document length
(function() {
    var $body = $('body');
    var bodyHeight = $body.height();

    $(document).scroll(function() {
        setTimeout(function() {
            if (bodyHeight < $body.height()) {
                bodyHeight = $body.height();
                HideNonMembers();
            }
        }, 500);
    });

    HideNonMembers();

})();