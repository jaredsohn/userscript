// ==UserScript==
// @name           Spoiler Bending
// @namespace      http://www.reddit.com/r/thelastairbender/
// @description    Includes the spoiler thumbnail on /r/thelastairbender posts when browsing the front page.
// @author         badjokemostlikely
// @version        1.0
//
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
//
// @icon           http://i.imgur.com/iTQ64km.png
// @iconURL        http://i.imgur.com/iTQ64km.png
// ==/UserScript==
 
var tlaSpoilers = function(context) {
        var thumb;
        var subreddit;
       
        Array.prototype.slice.call(context.getElementsByClassName("over18"), 0).forEach(function(post) {
                subreddit = post.getElementsByClassName('subreddit').item(0);
               
                if (subreddit == 'http://www.reddit.com/r/thelastairbender/') {
                        // Changing the NSFW stamp.
                        var nsfwStamp = post.getElementsByTagName('acronym').item(0);
                       
                        nsfwStamp.innerHTML = 'SPOILER';
                        nsfwStamp.setAttribute('style', 'border: #5F99CF 1px solid !important; color: #5F99CF;');
                        nsfwStamp.setAttribute('title', '');
                       
                        // Changing the thumbnail
                        thumb = post.getElementsByClassName('thumbnail').item(0);
                        thumb.style.backgroundImage    = "url(http://i.imgur.com/iTQ64km.png)";
                        thumb.style.backgroundPosition = "0 0";
                }
        });
}
 
if (window.location.href.match(/(\.com\/?|\.com\/\?(.+)?)$|(\/r\/(all|random|friends|Dashboard))|\/user\//g)) {
        document.addEventListener('DOMNodeInserted', function (event) {
                if (event.target.nodeType == Node.ELEMENT_NODE && event.target.className.indexOf('sitetable') >= 0) {
                        tlaSpoilers(event.target);
                }
        });
 
        tlaSpoilers(document);
}