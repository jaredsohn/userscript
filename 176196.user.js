// ==UserScript==
// @name                MTurkForum.com Plus
// @author              Chet Manley
// @version             0.1
// @description         Style tweaks and keyboard shortcuts for MTurkForum.com
// @include             http://mturkforum.com/*
// @require				http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1, 2013-08-20		Style tweaks and keyboard shortcuts on MTurkForum.com
//                      ---------------------------------------------------------------------------

$(document).ready(function () {
    $('body').attr('style', 'max-width: 90%;');
    $('a.quickreply').hide().next().hide();

    $(window).keyup(function (e) {
        if (!$('input, textarea').is(':focus')) {
            var key = (e.keyCode ? e.keyCode : e.which);
            switch (key) {
                case 37: // Left arrow - Previous page
                    if ($('span.prev_next a[rel="prev"]').attr('href')) {
                        window.location.href = $('span.prev_next a[rel="prev"]').attr('href');
                    }
                    break;
                case 39: // Right arrow - Next page
                    if ($('span.prev_next a[rel="next"]').attr('href')) {
                        window.location.href = $('span.prev_next a[rel="next"]').attr('href');
                    }
                    break;
                case 73: // I - Inbox
                    window.location.href = 'http://mturkforum.com/private.php';
                    break;
                case 82: // R - Start a reply
                    $('#vB_Editor_QR_textarea').focus();
                    break;
                case 83: // S - Settings
                    window.location.href = 'http://mturkforum.com/usercp.php';
                    break;
                default:
                    break;
            }
        }
    });
});