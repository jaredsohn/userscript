// ==UserScript==
// @name  Youtube Subscriptions - Force grid layout
// @namespace     http://stylebot.me/styles/3276
// @description   Youtube have now forced users to use the new "feed" subscriptions page. It's not perfect but this returns the layout to a simpler grid format.
// @include   http://www.youtube.com/feed/*
// @include   https://www.youtube.com/feed/*
// @author        Bulk70
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'a.feed-author-bubble.yt-uix-sessionlink {    display: none;}div.branded-page-v2-secondary-col {    display: none;}div.feed-item-main {    margin: 0;    padding: 0;}.yt-lockup.yt-lockup-tile .yt-lockup-thumbnail {    float: none;    margin-bottom:17px;}#page {    width: 97.925%;}.yt-lockup-description {    display: none;}.feed-list-item {    float: left;    width: 165px;    height: 195px;    border: 0;    margin-top: 10px;}.feed-item-container .feed-item-main {    border: 0;}.feed-item-container .feed-item-main-content {    margin-top:-130px;}page {    width: 97.925%;}.feed-load-more-container {    float: left;}span.feed-item-time {    display: none;}.feed-item-main .feed-item-header {    height: 15px;    margin-bottom: 5px;    margin-top:115px;}.feed-item-actions-line {    color: rgba(0,0,0,0);}a.yt-user-name {    color: #555;}.feed-item-actions-line .feed-item-owner {    whitespace: nowrap;    overflow: hidden;}.yt-lockup-meta, .yt-lockup-description, .yt-lockup-badges {    float: left;} .site-left-aligned #page { width: 1103px!important;} div.content { margin-top: 100px!important;} .feed-item-container .feed-item-action-menu { right:120px!important;} .yt-uix-button-menu { left:-60px!important;}';
document.documentElement.appendChild(styleEl);