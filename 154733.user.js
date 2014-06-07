// ==UserScript==
// @name       YouTube Subscription Startpage
// @namespace  YouTube.com
// @version    0.1
// @match      http://www.youtube.com/
// @run-at         document-start
// ==/UserScript==

//If you want to see the normal startpage I let you.
if(document.referrer != "http://www.youtube.com/feed/subscriptions/u")
    document.location = "http://www.youtube.com/feed/subscriptions/u";