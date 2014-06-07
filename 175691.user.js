// ==UserScript==
// @name       Feedly Middle Click Mark as Read
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://cloud.feedly.com/*
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(function() {
    $(document).on('mouseup', '.u0Entry .title', function(e) {
        var $entry = $(this).closest('.u0Entry');
        var $markAsRead = $entry.find('[title="Mark as read and hide"]');
        $markAsRead.attr('data-markasreadentryid', $markAsRead.data('buryentryid'));
        $markAsRead.removeAttr('data-buryentryid');
        $markAsRead.click();
    });
});