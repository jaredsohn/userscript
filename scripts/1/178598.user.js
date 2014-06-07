// ==UserScript==
// @name       Youtube Logo to subscriptions
// @namespace  http*://www.youtube.com/
// @version    0.1
// @description  Changes the youtube logo to direct you to your subscriptions
// @match      http*://www.youtube.com/*
// @copyright  2012+, You
// ==/UserScript==
 
document.getElementById("logo-container").href = 'https://www.youtube.com/feed/subscriptions';