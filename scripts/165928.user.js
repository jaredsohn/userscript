var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit unmoderated filter
// @namespace redditunmoderated
// @description Some various changes to reddit
// @include http://www.reddit.com/r/mod/about/unmoderated*
// @include http://*.reddit.com/r/mod/about/unmoderated*
// @include http://reddit.com/r/mod/about/unmoderated*
// @version 1.0
// ==/UserScript==


function unmoderatedfilter() {

//
// Enter the subs below
//
var filtersubs=["AdviceAnimals","Someothersub"];

$('.thing').each(function() {

 var subname = $(this).children('.entry').children('.tagline').children('a.subreddit').text();

if ($.inArray(subname, filtersubs) != -1) {
$(this).css('display', 'none');
}


    });

}
// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + unmoderatedfilter.toString() + ')();';
    document.head.appendChild(s)
});