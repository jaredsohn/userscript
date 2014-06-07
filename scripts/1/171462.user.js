// ==UserScript==
// @name        YouTube Redirect
// @namespace   95.211.209.53-e85f8079-b847-455f-b080-8467e2977711@sanitysama
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1
// @run-at      document-start
// ==/UserScript==

//User preference. Choose a homepage:
var home = "http://www.youtube.com/feed/subscriptions"
         // http://www.youtube.com/feed/subscriptions
         // http://www.youtube.com/feed/subscriptions/activity
         // http://www.youtube.com/inbox

//redirect
if(window.location.href == 'http://www.youtube.com/' || window.location.href == 'https://www.youtube.com/'){
    window.location.replace(home);
}
//global logo href
document.addEventListener("DOMContentLoaded", function () {
    if(document.location.href.indexOf('http://www.youtube.com/feed/subscriptions') == -1) { //if url is NOT /feed/sub...
        document.getElementById("logo-container").href=home; // ...then change logo href to pref
    }
    else {
        document.getElementById("logo-container").href="/#";
    }
}, false);