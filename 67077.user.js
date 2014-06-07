// ==UserScript==
// @name           reddit-comments
// @namespace      http://www.userscripts.org/user/seand
// @description    allows you to see a comment's parent without scrolling up
// @include        http://*reddit.com/*/comments/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// add css styles
var head = $('head:first');
if(head) {
    var css =  '.show-parent {';
        //css +=  'text-decoration: underline;';
        css +=  'font-weight: bold;';
        css += '}';
        
        css += '.scroll-to-parent {';
        css +=  'margin-left: 4px;';
        css +=  'font-weight: bold;';
        css += '}';
        
        css += '#parent-overlay {';
        css +=  'z-index: 10;';
        css +=  'position: absolute;';
        css +=  '-moz-border-radius: 3px;';
        css +=  '-webkit-border-radius: 3px;';
        css +=  'background-color: #000;';
        css +=  'opacity: 0.6;';
        css += '}';
        
        css += '#parent-text {';
        css +=  'z-index: 11;';
        css +=  'position: absolute;';
        css +=  '-moz-border-radius: 3px;';
        css +=  '-webkit-border-radius: 3px;';
        css +=  'background-color: #fff;';
        css +=  'padding: 5px;';
        css +=  'max-height: 250px;';
        css +=  'overflow: auto;';
        css += '}';
        
        // copied from reddit css to keep the style
        css += '#parent-text .author {';
        css +=  'font-weight: bold;';
        css += '}';
        
        css += '#parent-text .expand {';
        css +=  'display: none;';
        css += '}';
        
        css += '#parent-text .buttons li {';
        css +=  'border: medium none;';
        css +=  'display: inline;';
        css +=  'padding-right: 4px;';
        css += '}';
        
        css += '#parent-text .buttons li + li {';
        css +=  'padding-left: 4px;';
        css += '}';
        
        css += '#parent-text .buttons li a {';
        css +=  'color: #888888;';
        css +=  'font-weight: bold;';
        css +=  'padding: 0 1px;';
        css += '}';
        
    $('<style type="text/css"></style>').html(css).appendTo(head);
}

var shownParent = null;
var parentEntry = null;

// create the overlay and divs within
$('<div id="parent-overlay"></div><div id="parent-text"></div>').appendTo('.content .commentarea').hide();

$('<a class="show-parent" href="javascript:;">show parent</a>')
    .appendTo('.commentarea .listing > .comment > .entry .tagline')
    .hide();
$('.show-parent').live('click', function() {
    var commentWrapper = $(this).parents('.comment:first');
    var parentWrapper = commentWrapper.parents('.comment:first');
    if(parentWrapper.length) {
        if($(this).html() === 'show parent') {
            var offset = $(this).parent().offset();
            parentEntry = parentWrapper.find('.entry');
            parentWrapper = parentEntry.find('.noncollapsed');
            var parentCommentHeight = (parentWrapper.height() > 250) ? 250 : parentWrapper.height();
            var top = offset.top - parentCommentHeight - 15;
            var left = offset.left - 30;
            $('#parent-text').css('top', top)
                             .css('left', left)
                             .html(parentWrapper.html())
                             .show();
            $('<a class="scroll-to-parent" href="javascript:;">scroll to</a>')
                .appendTo($('#parent-text').find('.tagline'))
                .bind('click', function() {
                    if(parentEntry != null) {
                        $("html, body").animate({
                          scrollTop: parentEntry.offset().top + "px"
                        }, {
                          duration: 200,
                          easing: "swing"
                        });
                    }
                });
            $('#parent-overlay').css('top', top - 5)
                                .css('left', left - 5)
                                .width($('#parent-text').width() + 20)
                                .height(parentCommentHeight + 20)
                                .show();
            
            if(shownParent != null) {
                shownParent.html('show parent').hide();
            }
            shownParent = $(this);
            $(this).html('hide parent').show();
        } else {
            $(this).html('show parent');
            $('#parent-text').hide();
            $('#parent-overlay').hide();
            shownParent = null;
            parentEntry = null;
        }
    }
});

$('.entry').live('mouseover', function() {
   $(this).find('a.show-parent').show();
});
$('.entry').live('mouseout', function() {
    $(this).find('a.show-parent').hide();
});
