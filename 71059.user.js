// ==UserScript==
// @name           Reddit subreddit count
// @namespace      http://userscript.org/user/citricsquid
// @description    Counts all subreddits a user is subscribed to
// @include        http://*reddit.com/reddits/mine*
// ==/UserScript==

var subscriptions = document.getElementsByClassName('subscription-box')[0];
var subreddits = subscriptions.getElementsByTagName('li');

var box = document.getElementsByClassName('infobar')[0];
var msg = box.getElementsByClassName('md')[0];
msg.innerHTML += '<p>In total subscribed to '+subreddits.length+' subreddits.</p>';
