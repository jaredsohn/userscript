// ==UserScript==
// @name       Youtube Subscriptions Grid Lock
// @namespace  http://hersing.dk
// @version    0.1
// @description  Changes Youtube's new subscription look back to the old grid look
// @match      http://*/*
// @copyright  2013+, Daniel Green Hersing, http://hersing.dk
// @include     *youtube.com/*
// ==/UserScript==

var curUrl = window.location.href; 
var newUrl = "http://www.youtube.com/my_subscriptions";  
//Sets current URL (curUrl) and the URL for youtube's old grid look (newUrl)

if (curUrl == "http://www.youtube.com/feed/subscriptions?feature=mhee") {
    newUrl = "http://www.youtube.com/my_subscriptions";   
    window.location.href = newUrl;
    }
//If the current URL (curUrl) equals youtube's new subscription URL, it transfers the browser to the old grid look (newUrl)