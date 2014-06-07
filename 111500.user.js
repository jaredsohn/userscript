// ==UserScript==
// @name           What.CD Forums - Show OP for Firefox
// @namespace      http://what.cd
// @description    What.CD Forums - Show OP for Firefox
// @include        http*://*what.cd/forums.php?*action=viewthread*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        0.2
// ==/UserScript==

(function() {
    /* We find the link to the user profile of the OP,
     * and from that we take their userid.
     */
    var qry = 'table.forum_post a[href^="user.php?"]';

    // We check for a linkbox to see if we're on the first page.
    var firstPage = $('div.linkbox > a');

    /* If we're on the first page then
     * either the thread is exactly one page (so there are no links), or
     * there are links but there is no 'First' link.
     */
    if (firstPage.length == 0 || firstPage.html().indexOf('First') == -1) {
        showOPCallback($(qry).attr('href').split('=')[1]);
        return;
    }

    // We're not on the first page, so grab it and find the OP.
    $.get(firstPage.attr('href'), function(data) {
        showOPCallback($(qry, data).attr('href').split('=')[1]);
    }, 'html');

    // Run through the posts, finding and tagging OP's posts.
    function showOPCallback(op) {
        $.each($('table.forum_post a[href^="user.php?id=' + op + '"]'), function() {
            $(this.parentNode).append(' (OP)');
        });
    }
    
})();

