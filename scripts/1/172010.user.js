// ==UserScript==
// @name         Disable Facebook feed + reminders
// @namespace    http://giant.io
// @version      0.3
// @description  Disables the loading of the news feed and reminders on Facebook
// @match        https://www.facebook.com/*
// @grant        none
// @copyright    2013+, muloka
// ==/UserScript==

var content_area, news_feed, content_col, right_col;

// Remove news feed
content_area = document.getElementById("contentArea");
news_feed = document.getElementById("pagelet_home_stream");
content_area.removeChild(news_feed);


// Remove reminders
content_col = document.getElementById("contentCol");
right_col = document.getElementById("rightCol");
content_col.removeChild(right_col);