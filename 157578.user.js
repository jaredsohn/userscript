// ==UserScript==
// @name        Tumblr - Fetch Fix
// @namespace   http://userstyles.org/styles/userjs/43008
// @description Lets user actually go to Draft and Reblog
// @include     http://www.tumblr.com/dashboard
// @include     http://www.tumblr.com/blog/*/drafts
// @version     1
// ==/UserScript==


var elems = document.getElementsByTagName('*');
var length = elems.length;

for(i = 0; i < length; i++)
{
    if(elems[i].title == 'Reblog' || elems[i].title == 'Edit') {
        var sLink = elems[i].href;
        elems[i].addEventListener('click', function() {
            window.location = this.href;
        });
    }
}
