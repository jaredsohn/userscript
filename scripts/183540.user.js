// ==UserScript==
// @name           Flair Buttons
// @description    Add flair-edit buttons to users in subs you moderate
// @author         MrDerk
// @include        http://*.reddit.com/*
// @include        http://www.reddit.com/*
// @version        1.1
// ==/UserScript==

function addFlairButtons(ele) {
        if (ele == null) ele = document;
        var subReddit = location.href.split('/')[4];
        if (( pageType() == 'comments' || pageType() == 'linklist' )) {
                var allLists = ele.querySelectorAll('ul.flat-list.buttons');
                for (var i=0, len=allLists.length; i<len; i++) {
                        appendFlair(allLists[i],subReddit);
                }
        }
}

function appendFlair(buttonList,subReddit) {
        var flair = document.createElement('li');
        buttonList.appendChild(flair);

        if (pageType() == 'comments') {
                var authorContainer = buttonList.parentNode;
        } else {
                var authorContainer = buttonList.previousSibling;
        }

        var author = authorContainer.querySelector('.author').text;

        var a = document.createElement('a');
        // a.setAttribute('class', 'option');
        a.setAttribute('title', "Edit this user's flair");
        a.setAttribute('target', '_blank');
        a.setAttribute('href', 'http://www.reddit.com/r/' + subReddit + '/about/flair/?name=' + author);
        a.innerHTML = 'user flair';
        flair.appendChild(a);
}

// Borrowed this function from RES
// http://reddit.honestbleeps.com
function pageType() {
        if (typeof(this.pageTypeSaved) == 'undefined') {
                var pageType = '';
                var currURL = location.href;
                var commentsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i);
                var inboxRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.\/]*/i);
                var profileRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.]*\/?(comments)?\/?$/i);
                var submitRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*\/submit\/?$/i);
                var prefsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/prefs\/?/i);
                if (commentsRegex.test(currURL)) {
                        pageType = 'comments'
                } else if (profileRegex.test(currURL)) {
                        pageType = 'profile';
                } else if (inboxRegex.test(currURL)) {
                        pageType = 'inbox';
                } else if (submitRegex.test(currURL)) {
                        pageType = 'submit';
                } else if (prefsRegex.test(currURL)) {
                        pageType = 'prefs';
                } else {
                        pageType = 'linklist';
                }
                this.pageTypeSaved = pageType;
        }
        return this.pageTypeSaved;
}



// Test for "moderator" class first
var mod = document.getElementsByClassName('moderator');
if (mod.length > 0) {
        addFlairButtons();
} else {
// Look for nsfw buttons if we're not in a subreddit we mod
        nsfwButtons = document.getElementsByClassName('marknsfw-button')
        for (var i=0, len=nsfwButtons.length; i<len; i++) {
                var buttonList = nsfwButtons[i].parentNode.parentNode
                var subReddit = buttonList.parentNode.querySelector('p.tagline>a.subreddit').text
                appendFlair(buttonList,subReddit);
        }
}