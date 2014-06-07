// ==UserScript==
// @name        RemoveMyTweets
// @namespace   RemoveMyTweets
// @description Removes your own tweets from the timeline. Not triggered when viewing your profile page
// @include     https://twitter.com/
// @version     1.0
// @grant       none
// ==/UserScript==

var twitter_id = document.querySelectorAll(".account-group.js-mini-current-user")[1].dataset.userId;

setTimeout( function(){
    data = document.querySelectorAll("#stream-items-id > div > div.tweet");
    if (data.length > 0){
        remove_my_tweets(data);
    } else {
        setTimeout(arguments.callee , 300);
    }
} , 300);

function remove_my_tweets(el){
    for(i=0; i<el.length; i++){
        curr = el[i];
        if(curr.dataset.userId == twitter_id){
            curr.style.display = 'none';
        }
    }
}