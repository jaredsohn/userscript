// ==UserScript==
// @name     TweetDeck Unread Notifications
// @include  https://tweetdeck.twitter.com
// @include  https://tweetdeck.twitter.com/*
// @grant    none
// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = ".tdUnreadUnread { background-color: #444444; }";
head.appendChild(style);

function animate_bg(ele, from, to) {
    ele.css("background-color", "rgba(68, 68, 68, " + (from += from > to ? -1 : 1) / 10 + ")"); 
    if(from != to)  
        setTimeout(function() { animate_bg(ele, from, to) }, 20);
}

var counter = 0;
var loadingTime = true;

unsafeWindow.tdUnreadRefresh = function() {
    var detail = $(".js-detail-content");
    $("article").each(function(i) {
        if (detail.length == 0) {
        if (!$(this).hasClass("tdUnreadUnread")) {
            $(this).addClass("tdUnreadUnread");
            if (!loadingTime) {
                counter++;
                $(this).mouseenter(function() {
                    counter--;
                    $(this).off("mouseenter");
                    animate_bg($(this),10,0);
                });
            } else animate_bg($(this),10,0);
        }
        }
    });
    
    if (counter>0) {
        document.title = "("+counter+") TweetDeck";
    } else {
        document.title = "TweetDeck";
    }
}
unsafeWindow.tdUnreadLoadingOver = function() {
    loadingTime = false;
}

setInterval("tdUnreadRefresh()",1000);
setTimeout("tdUnreadLoadingOver()",30000);