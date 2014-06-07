// ==UserScript==
// @name       Replace Watch Later Link with Old Interface
// @namespace  http://metalfrog.us/scripts
// @version    0.1
// @description  YouTube recently changed the Watch Later link in the sidebar to act as a typical playlist, not a temporary collection of videos to watch later. The interface is still present (for now) so this swaps the link back to that page.
// @match      https://*.youtube.com/*
// @copyright  2014+, Keith J. Frank <keithjfrank@gmail.com>
// ==/UserScript==
window.addEventListener('DOMContentLoaded', function(){
    var watchLater = document.querySelectorAll('a[title="Watch Later"]');
    
    if(watchLater[0].href !== '/feed/watch_later'){
        watchLater[0].href = '/feed/watch_later';
    }
});
