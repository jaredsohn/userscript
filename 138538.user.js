// ==UserScript==
// @name        TweetWally.com Remove Sidebar & Refresh
// @namespace   TweetWally.com Remove Sidebar & Refresh
// @description This removes the sidebar and refreshes the page every 60 seconds
// @include     http://*.tweetwally.com/*
// @exclude     http://www.tweetwally.com/*
// @exclude     http://www.tweetwally.com/logout/*
// @exclude     http://www.tweetwally.com/manage/*
// @exclude     http://*.tweetwally.com/iphone
// @version     1
// ==/UserScript==
setTimeout(function() { document.location.reload(); } , 60000);
document.getElementById('tweet_sidebar_16').style.display = 'none';
GM_addStyle("div.tweet_container {left: 20px; padding-bottom: 20px; position: absolute; right: 20px !important; top: 20px;}");