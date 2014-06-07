var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit profile subreddit filter
// @namespace redditsubredditfilter
// @description I am a fish!
// @include http://www.reddit.com/user/*
// @include http://www.reddit.com/u/*
// @include http://reddit.com/user/*
// @include http://*.reddit.com/u/*
// @include http://reddit.com/u/*
// @include http://*.reddit.com/user/*
// @version 1.0
// ==/UserScript==


function domainfiltering() {

//
// Enter the subreddits below, subreddits should be entered as how they also appear in the list. 
//
var filtersubs=["reportthespammers","TheoryOfModeration"];

$('.thing').each(function() {

 var subreddit = $(this).children('.entry').children('.tagline').children('.subreddit.hover').text();

if ($.inArray(subreddit, filtersubs) != -1) {
$(this).css('display', 'none');

}


  });

}
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + domainfiltering.toString() + ')();';
    document.head.appendChild(s)
});