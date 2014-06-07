// ==UserScript==
// @author        Zxw
// @name          Reddit Score Indicator
// @description   Gives a color indicator to each comment showing how upvoted it is.
// @include       http://www.reddit.com/r/*/comments/*
// @include       http://www.reddit.com/comments/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function get_highest_score() {
    var highest_score = 0;
    $('.commentarea .score.unvoted').each(function() {
        var score = parseInt($(this).text());
        highest_score = Math.max(score, highest_score);
    });
    return highest_score;
}

function create_indicators() {
    var highest_score = get_highest_score();
    
    $('.comment').each(function() {
    	var score = parseInt($(this).find('.score.unvoted:first').text());
        var colour = score / highest_score;
        colour = Math.sqrt(1 - ((colour - 1) * (colour - 1)));
        colour = parseInt(colour * 255);
        colour = 255 - colour;

        
        $(this).find('.md:first').css({
            "border-left-color": "rgb(255, " + colour + ', ' + colour + ")",
            "border-left-style": "solid",
            "border-left-width": "5px",
            "padding-left": "5px",
        });
    });
}

$(document).ready(function() {
    //Lets other scripts reset the indicators
    $(document).bind('reset_reddit_score_indicator', create_indicators);
    
    create_indicators();
});