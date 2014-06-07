// ==UserScript==
// @name       YouTube Subscription Startpage - as default
// @namespace  http://userscripts.org/scripts/show/155587
// @version    1.1
// @match      http://www.youtube.com/
// @run-at         document-start
// ==/UserScript==


if(!(document.referrer != "http://www.youtube.com/feed/subscriptions/u" || document.referrer != "http://www.youtube.com/feed/subscriptions") && document.location == "http://www.youtube.com/")
    document.location = "http://www.youtube.com/feed/subscriptions/u";