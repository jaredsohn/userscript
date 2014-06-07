// ==UserScript==
//
// Retweet This v1.0
// -----------------
// A simple script from Sean O to allow for easy retweeting from twitter.com
// Just hover over tweet and click the 'RT' link
//
// http://www.sean-o.com
//
//
// @name           Twitter - Retweet This
// @namespace      http://www.sean-o.com
// @description    Retweet Interesting Tweets on Twitter
// @include        http://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// greasemonkey needs to wait until jQuery is loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout( GM_wait, 100 );
    } else {
        $ = unsafeWindow.jQuery;
        runMain();
    }
}
GM_wait();

// main script
function runMain() {
	$('.actions a:odd').each(function(){
	    // gather original tweet info
	    var thiss = $(this);
	    var origHREF = thiss.attr('href');
	    var origAuthor = thiss.parent().parent().parent().find('.screen-name').text();
	    var origTweet = thiss.parent().parent().parent().find('.entry-content').text();
	
	    // strip @replies
	    origTweet = origTweet.replace(/@\w{1,}\s/,'');
	
	    // add RT element
	    var retweet = 'RT @' + origAuthor + ': ' + origTweet;
	    var newEl = $('<a>')
	        .text('RT')
	        .attr({
	        	alt : 'Retweet This',
	        	title : 'Retweet This'
	        })
	        .addClass('RT')
	        .click(function(){
	        	// populate status & focus on click
	        	if ( $('#status').length == 1) {
	            	$('#status').val(retweet).focus();
	            // if not on user's page, open new tab/window with retweet populated
	            } else {
	            	var newURL = 'http://twitter.com/home?status=' + escape(retweet);
	            	window.open(newURL);
	            }
	        });
	    thiss.after(newEl);
	
	    // append style to color and nudge action links to fit
	    $('<style type="text/css"></style>')
	        .text('.RT { color: #999999;} .actions a { margin-top: -4px; }')
	        .appendTo('head');
	});
}