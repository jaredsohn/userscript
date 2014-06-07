var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit new domain filter
// @namespace redditnewdomain
// @description Some various changes to reddit
// @include http://reddit.com/r/*/new
// @include http://*.reddit.com/r/*/new
// @include http://*.reddit.com/new
// @include http://reddit.com/new
// @include http://reddit.com/r/*/new/
// @include http://*.reddit.com/r/*/new/
// @include http://*.reddit.com/new/
// @include http://reddit.com/new/
// @version 1.2
// ==/UserScript==


function domainfiltering() {

//
// Enter the domains below, domains should be entered as how they also appear in the list. 
//
var filterdomains=["theatlantic.com","guardian.co.uk"];

$('.thing.link').each(function() {

 var domain = $(this).children('.entry').children('.title').children('.domain').children('a').text();

if ($.inArray(domain, filterdomains) != -1) {
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