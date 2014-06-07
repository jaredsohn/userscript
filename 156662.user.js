// ==UserScript==
// @name                 4chan Threaded
// @description        Puts posts under the post to which they're replying and indents them to make it easier to follow conversations on 4chan and various chan archives.
// @icon                  http://s3.amazonaws.com/uso_ss/icon/156662/large.png?1358322466
// @author              rorschach
// @namespace       http://userscripts.org/scripts/show/156662
// @include             http*://boards.4chan.org/*/res/*
// @include             http*://chanarchive.org/4chan/*/*/*
// @include             http*://archive.foolz.us/*
// @require             http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @downloadURL   https://userscripts.org/scripts/source/156662.user.js
// @updateURL       https://userscripts.org/scripts/source/156662.user.js
// @version            1.0.2
// ==/UserScript==

function indent(selector) {
    if (parseInt(selector.prev().css('margin-left')) <= 1000) {
        selector.css('margin-left', function(index) {
            return parseInt(selector.prev().css('margin-left'))+50;
        });
    } else {
        selector.css('margin-left', function(index) {
            return parseInt(selector.prev().css('margin-left'));
        });   
    }   
}

function find_quotelinks(selector, quote_selector) {
    return  $(selector).has(quote_selector);   
}

var op_id, id, postbox;

switch (location.host) {
        
    case 'boards.4chan.org':
    case 'chanarchive.org':
        op_id = $('.opContainer').attr('id').substring(2);
        
        $('.opContainer').css('display','inline-block');
        
        find_quotelinks('.postMessage','.quotelink').each(function() {
            
            id = $('.quotelink:eq(0)', this).attr('href').split('#p')[1];
            postbox = $(this).parent().parent();
            
            if (id != op_id) {
                $('#pc' + id).after(postbox);
                indent(postbox);
            }
            
        });
        break;
    case 'archive.foolz.us':
        var op_id = $('.post_data:eq(0) a[data-function="quote"]').attr('data-post');
        
        find_quotelinks('article[class^="post doc_id_"] .post_wrapper .text','.backlink').each(function() { 
            var id = $('.backlink:eq(0)', this).attr('href').replace('#','');
            var postbox = $(this).parent().parent();
            
            if (id != op_id) {
                $('article#' + id).after(postbox);
                indent(postbox);
            }
            
        });
        break;
}