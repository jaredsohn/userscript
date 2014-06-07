// ==UserScript==
// @name           Retweets Tab Recovery
// @namespace      http://leeiio.me
// @version        0.2
// @description    Get back of your "Retweets" tab
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var stream_tab = document.querySelector('.stream-tabs'),
search_tab = document.querySelector('.stream-tab-searches'),
activity_tab = document.querySelector('.stream-tab-activity'),
retweets_li = document.createElement('li');
retweets_li.className = 'stream-tab stream-tab stream-tab-retweets dropdown-link';
retweets_li.innerHTML = '<a class="tab-text" title="Retweets" href="#">Retweets<i></i></a>';
stream_tab.insertBefore(retweets_li,search_tab);
stream_tab.appendChild(activity_tab);