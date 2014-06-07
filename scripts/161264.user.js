// ==UserScript==
// @name        Hide Tweets
// @description Hide them!
// @version     1.3.3.7
// @author      @sinfocol
// @description Hide tweets from selected users, use lowercase!
// @include     http*://twitter.com/*
// @grant       none
// ==/UserScript==

(function() {
    var hideTweets = function() {
        var users = ['user1', 'user2', 'usern'];
        var divCollection = document.querySelectorAll('div.tweet[data-screen-name]');
        
        for (i = 0; i < divCollection.length; i++) {
            if (users.indexOf(divCollection[i].getAttribute("data-screen-name").toLowerCase()) !== -1) {
                divCollection[i].style.display = "none";
            }
        }
    }
    
    var timer = setInterval(function() {
        hideTweets();
    }, 1000);
})();