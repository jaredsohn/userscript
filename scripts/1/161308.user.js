// ==UserScript==
// @name       Subscriptions
// @namespace  Greatest Hits On Vinyl
// @version    4.0
// @description  Brings back Youtube my subscriptions grid look.
// @match           http://*.youtube.com/feed/subscriptions
// @match           https://*.youtube.com/feed/subscriptions
// @include         http://*.youtube.com/feed/subscriptions
// @include         https://*.youtube.com/feed/subscriptions
// @downloadURL     http://userscripts.org/scripts/source/161308.user.js
// @updateURL       http://userscripts.org/scripts/source/161308.meta.js
// @updateVersion   3.0
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'a.feed-author-bubble.yt-uix-sessionlink {    display: none;}div.branded-page-v2-secondary-col {    display: none;}div.feed-item-main {    margin: 0;    padding: 0;}.yt-lockup.yt-lockup-tile .yt-lockup-thumbnail {    float: none;    margin-bottom:17px;}#page {    width: 97.925%;}.yt-lockup-description {    display: none;}.feed-list-item {    float: left;    width: 165px;    height: 233px;    border: 0;    margin-top: 10px;}.feed-item-container .feed-item-main {    border: 0;}.feed-item-container .feed-item-main-content {    margin-top:-130px;}page {    width: 97.925%;}.feed-load-more-container {    float: left;}span.feed-item-time {    display: none;}.feed-item-main .feed-item-header {    height: 15px;    margin-bottom: 5px;    margin-top:115px;}.feed-item-actions-line {    color: rgba(0,0,0,0);}a.yt-user-name {    color: #555;}.feed-item-actions-line .feed-item-owner {    whitespace: nowrap;    overflow: hidden;}.yt-lockup-meta, .yt-lockup-description, .yt-lockup-badges {    float: left;} .site-left-aligned #page { width: 1103px!important;} div.content { margin-top: 100px!important;} .feed-item-container .feed-item-action-menu { right:120px!important;} .yt-uix-button-menu { left:-60px!important;}';
document.documentElement.appendChild(styleEl);