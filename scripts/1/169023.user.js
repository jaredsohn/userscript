// ==UserScript==
// @name        LWN comments enhancer
// @namespace   http://userscripts.org/users/519325
// @description Few enhancements for LWN comments
// @include     http://lwn.net/Articles/*
// @version     2
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==
console.log('LWN comments enhancer activated.');
var VALUE_NAME = 'hiddenAuthors';
var vals = GM_listValues();
if (vals.indexOf(VALUE_NAME) == -1) {
    GM_setValue(VALUE_NAME, JSON.stringify([]));
}

function mask(author) {
    var val = JSON.parse(GM_getValue(VALUE_NAME));
    return val.indexOf(author) >= 0;
}

function addToHiddenList(author) {
    var val = JSON.parse(GM_getValue(VALUE_NAME));
    if (val.indexOf(author) >= 0) {
        return;
    }
    val.push(author);
    GM_setValue(VALUE_NAME, JSON.stringify(val));
}

function removeFromHiddenList(author) {
    var val = JSON.parse(GM_getValue(VALUE_NAME));
    if (val.indexOf(author) >= 0) {
        val.splice(val.indexOf(author), 1);
        GM_setValue(VALUE_NAME, JSON.stringify(val));
    }
}

function hideComment(com) {
    if (com.find('.hiddenCommentToggle').length > 0) {
        return;
    }
    var content = com.find('.FormattedComment');
    if (content.length === 0) {
        com.find('.CommentBody')
            .contents()
            .filter(function () {
                return this.nodeType == 3  || this.className != 'CommentPoster';
            })
            .slice(1)
            .wrapAll('<div class="FormattedComment"></div>');
        content = com.find('.FormattedComment');

    }
    $('<a class="hiddenCommentToggle"><i>Toggle comment...</i></a>')
        .click(function () {
            $(this).prev('.FormattedComment').toggle();
            $(this).parent().parent().find('.CommentReplyButton').toggle();
        })
        .insertAfter(content);
    content.hide();
    com.find('.CommentReplyButton').hide();
}

function showComment(com) {
    if (com.find('.hiddenCommentToggle').length === 0) {
        return;
    }
    com.find('.FormattedComment').show();
    com.find('.CommentReplyButton').show();
    
    if (! mask(com.find('p.CommentPoster b').html())) {
        com.find('.hiddenCommentToggle').remove();
    }
}

function main() {
    $('div.CommentBox').each(function (index) {
        var comment = $(this);
        var anchorName = comment.prev('a[name*=CommAnchor]').attr('name');
        if (anchorName === undefined) {
            anchorName = comment.prev('p').find('a[name*=CommAnchor]').attr('name');
        }
        comment.find('p.CommentPoster b').first().each(function (index) {
            var poster = $(this), n, span;
            if (comment.find('.commentEnhancerLink').length > 0) {
                if (mask(poster.html()) && comment.find('.commentEnhancerLink a').html() == 'unignore' ) {
                    return;
                } else if (!mask(poster.html()) && comment.find('.commentEnhancerLink a').html() == 'ignore' ) {
                    return;
                } else {
                    comment.find('.commentEnhancerLink').remove();
                }
            }
            if (mask(poster.html())) {
                n = $('<a href="#' + anchorName + '">unignore</a>')
                    .data('poster', poster.html())
                    .click(function () {
                        removeFromHiddenList($(this).data('poster'));
                        $(this).parent('span').remove();
                        main();
                    });
                span = $('<span class="commentEnhancerLink"> (</span>').append(n).append(')');
                poster.after(span);
                hideComment(comment);
            } else {
                n = $('<a href="#' + anchorName + '">ignore</a>')
                    .data('poster', poster.html())
                    .click(function () {
                        addToHiddenList($(this).data('poster'));
                        $(this).parent('span').remove();
                        main();
                    });
                span = $('<span class="commentEnhancerLink"> (</span>').append(n).append(')');
                poster.after(span);
                showComment(comment);
            }
        });
    });
}

main();