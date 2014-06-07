// ==UserScript==
// @author        Zxw
// @name          Reddit more comments ordered
// @description   Reddits more comments button orders the comments weirdly, this will change it to use whatever your default is
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/comments/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(document).load(function() {
    $('.morecomments a').removeAttr('onClick')
    
    $('.morecomments a').click(function(e) {
        e.preventDefault();
        var href = $(this).closest('.comment').find('.bylink').attr('href');
        var url = href + ' .comment:first';
        $(this).closest('.comment').load(url, function() {
            $(document).trigger('reset_reddit_score_indicator')
        });
    });
});