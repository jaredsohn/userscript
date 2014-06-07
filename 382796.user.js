// ==UserScript==
// @name       Auto-load all content on BrowserStack
// @namespace  https://www.browserstack.com/automate/builds/
// @version    0.1
// @description  auto-scroll down the page until the script see the string 'STOP_SESSION'
// @match      https://www.browserstack.com/automate/builds/*
// @copyright  2012+, You
// ==/UserScript==

var scrollToBottom = function() {
    
    GM_log("Scrolling to Bottom...");
    var stopSessionRegex = /STOP_SESSION/;
    
    //go to the bottom of the page if the re is not match
    if (stopSessionRegex.exec(document.documentElement.innerHTML) === null) {
        //go to the bottom of the page
        window.scrollTo(0,document.body.scrollHeight);
        window.setTimeout(scrollToBottom, 2000);
    }
}

window.setTimeout(function(){ scrollToBottom()}, 3000);