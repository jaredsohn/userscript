// ==UserScript==
// @name       Skip Surfline Ads
// @namespace  http://leecunliffe.com/
// @version    0.1
// @description  enter something useful
// @match      http://*.surfline.com/surf-news/*
// @copyright  2012+, You
// ==/UserScript==

var evt = document.createEvent ("HTMLEvents");
evt.initEvent("click", true, true);

unsafeWindow.jQuery(document).ready(function() {
	// hide ad and show content
    unsafeWindow.countdown_clear(); 
	unsafeWindow.jQuery('#slidesHide').show();
    
    // bind left and right keys to change slides
    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 37) { // left
            unsafeWindow.jQuery('a.prev')[0].dispatchEvent(evt);
        } else if (e.keyCode == 39) { // right
            unsafeWindow.jQuery('a.next')[0].dispatchEvent(evt);
        }
    }, false);
});