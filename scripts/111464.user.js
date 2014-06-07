// ==UserScript==
// @name           forums.php - Show OP
// @namespace      http://what.cd
// @description    forums.php - Show OP
// @include        http*://*what.cd/forums.php?*action=viewthread*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        0.2
// ==/UserScript==

(function() {
    function showOP() {
        var firstPage = $('div.linkbox > a');
        var qry = 'table.forum_post a[href^="user.php?"]';
        if (firstPage.length == 0 || firstPage.html().indexOf('First') == -1) {
            showOPCallback($(qry).attr('href').split('=')[1]);
            return;
        }

        $.get(firstPage.attr('href'), function(data) {
            showOPCallback($(qry, data).attr('href').split('=')[1]);
        }, 'html');
    }

    function showOPCallback(op) {
        $.each($('table.forum_post a[href^="user.php?id=' + op + '"]'), function() {
            $(this.parentNode).append(' (OP)');
        });
    }
    
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            showOP();
        }
    }

    GM_wait();
})();
