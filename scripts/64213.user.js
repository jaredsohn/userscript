// ==UserScript==
// @name           Twitter News Ticker
// @namespace      Twitter News Ticker
// @description    You dimtwit
// @include        http://www.bungie.net/fanclub/315885/Group/GroupHome.aspx
// @include        http://www.bungie.net/fanclub/315885/Forums/topics.aspx?forumID=322571
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://robby118.netau.net/jquery.newsticker.js
// ==/UserScript==

$(document).ready( function(){ $('#twitter_update_list').innerfade({ animationtype: 'slide', speed: 1000, timeout: 2700, type: 'sequence', containerheight: 'auto' });} ); 

var blogger = document.createElement('script'); 
var callback = document.createElement('script'); 
var tweettweet = document.createElement('div');
blogger.src = 'http://twitter.com/javascripts/blogger.js';
blogger.type = 'text/javascript'; 
// If you want some moar tweet tweetz to display, change the "5" to any number between 1 and 20
callback.src = 'http://twitter.com/statuses/user_timeline/etstweets.json?callback=twitterCallback2&count=5';
callback.type = 'text/javascript'; 
tweettweet.id = 'twitter_div';
tweettweet.innerHTML = '<h2>Latest Tweets <a href="http://www.twitter.com/etstweets"><img src="/images/base_struct_images/arrow_2.gif"></a></h2><ul id="twitter_update_list"></ul>';
document.getElementsByTagName('head')[0].appendChild(blogger); 
document.getElementsByTagName('head')[0].appendChild(callback); 
document.getElementById("ctl00_dashboardNav").appendChild(tweettweet);

GM_addStyle("#twitter_div { background: #000; height: 164px; width: 902px; margin: 0 auto 0;} #twitter_div h2 { border-bottom: 1px solid #1F6B95; font-weight: bold; color: #1F6B95; } #twitter_div img:hover { opacity: 0.4; } #twitter_div ul { list-style-type: none; }")
// I use this too much. But it sure makes things purrrtty!

// pewp