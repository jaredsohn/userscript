// ==UserScript==
// @name 		Twitter blacklist
// @namespace	*twitter.*
// @description  Blacklists specific users' tweets.
// @include		*twitter.*
// ==/UserScript==

var className = 'js-stream-item stream-item stream-item expanding-stream-item';
var innerClass = 'class="tweet original-tweet js-stream-tweet js-actionable-tweet js-profile-popup-actionable js-original-tweet   focus';
var timeline = document.getElementsByClassName(className);

var blacklist = ['NeinQuarterly']; //list of blacklisted users. Format: ['user', 'user2', 'user3]

for (var i = 0; i < timeline.length; i++){
    tweet_user = timeline[i].getElementsByTagName('div')[0].getAttribute('data-screen-name');
    
    if (blacklist.indexOf(tweet_user) != -1){
        timeline[i].parentNode.removeChild(timeline[i]);
    }
}