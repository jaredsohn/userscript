var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name modmail color coding
// @namespace modmailcolorcoding
// @description I can do colors!
// @include http://www.reddit.com/message/moderator*
// @include http://*.reddit.com/message/moderator*
// @include http://reddit.com/message/moderator*
// @version 1.5
// ==/UserScript==


function moddomainfiltering() {

//
// Enter the subreddits below, copy the names from the blue rounded boxes in modmail
//
var filtersubsgood=["/r/TheoryOfReddit","/r/someothersubyoumightwant"];

var filtersubsbad=["/r/CircleCabal","/r/SweedenHomeBrewing"];

$('.thing').each(function() {

 var subreddit = $(this).children('.subject').children('.correspondent').children('a').text();

if ($.inArray(subreddit, filtersubsgood) != -1) {
$(this).css('background-color', '#EFF7FF');

}

if ($.inArray(subreddit, filtersubsbad) != -1) {
$(this).css('background-color', '#FFED7C');

}    

  });

}
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + moddomainfiltering.toString() + ')();';
    document.head.appendChild(s)
});