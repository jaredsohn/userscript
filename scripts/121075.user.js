// ==UserScript==
// @name            XboxMB Easy IMGS
// @namespace       Uzi/easyimgs
// @description     Makes using images on XboxMB easier!
// @include         http://www.xboxmb.com/newreply.php?do=newreply&noquote&p=*
// @include         http://xboxmb.com/newreply.php?do=newreply&noquote&p=*
// @include         http://www.xboxmb.com/newreply.php?do=newreply&p=*
// @include         http://xboxmb.com/newreply.php?do=newreply&p=*
// @include         http://www.xboxmb.com/newthread.php?do=newthread*
// @include         http://xboxmb.com/newthread.php?do=newthread*
// @include         http://xboxmb.com/showthread.php*
// @require         http://code.jquery.com/jquery-1.7.1.min.js
// @version         1.0
// ==/UserScript==

$(document).ready(function() {
    console.log('this is a test');
    $('form').bind('submit', function(e) {

        var textarea = $(e.currentTarget).find('textarea');
        var bbcode = textarea.val();

        var urlsPat = /(\[imgs\]([\s\S]*?)\[\/imgs\])/gi;
        var linkPat = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

        textarea.val(
        bbcode.replace(urlsPat, function(url) {
            return $.trim(url.replace(linkPat, '[IMG]$1[/IMG]').replace(/\[(\/*)imgs\]/gi, ''));
        }));
        
    });
});