// ==UserScript==
// @name           Twitter Savior
// @namespace      bjornstar
// @description    Twitter Savior saves you from tweets that contains words you don't want to see. Original by bjornstar, updated by Fugiman.
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://twitter.com/*
// @include        https://*.twitter.com/*
// ==/UserScript==
function needsToBeSaved(target) {
    var $target = unsafeWindow.$(target);
    var blacklist = new Array('hobbit');
    if(!$target.hasClass("stream-item"))
        return;
    var matches = [];
    var currentVal = $target.html();
    for(var i=0;i<blacklist.length;i++) {
        if(currentVal.toLowerCase().indexOf(blacklist[i])>=0)
            matches.push(blacklist[i]);
    }
    if(matches.length) {
        var save_id = $target.attr("id");
        var notice = document.createElement('div');
        notice.className = 'stream-item';
        notice.innerHTML = '<div class="tweet"><div class="content"><p class="js-tweet-text">You have been saved from this post as it contained: "' + matches.join('", "') + '". <a onclick="javascript:p=this.parentNode.parentNode.parentNode;console.log(p);p.style.display=\'none\';p.parentNode.nextSibling.style.display=\'\';return false;" style="font-style:italic" href="#">Click here</a> if you cannot resist the temptation.</p></div></div>';
        target.parentNode.insertBefore(notice, target);
        $target.css("display", "none");
        return
    }
}
function nodeInserted(event) {
    needsToBeSaved(event.target);
}
Array.prototype.slice.call(document.getElementById("stream-items-id").children).forEach(needsToBeSaved);
document.getElementById("stream-items-id").addEventListener("DOMNodeInserted", nodeInserted);