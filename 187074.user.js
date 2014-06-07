// ==UserScript==
// @name        Tweet Hider
// @namespace   http://grabbag.me/
// @description Hide all tweets from users without having to unfollow them.
// @include     http*://twitter.com/
// @version     1.0
// @grant       none
// ==/UserScript==

var usernames = ["TwitterUsernames","GoHere!","SeparatedByCommas"];

window.setInterval(function(){
    for (index=0;index<usernames.length;++index)
    {
        var rem = document.getElementsByClassName('tweet');
        var i = 0;
        
        while(rem[i]) 
        {
        //alert(rem[0].dataset.screenName);
        if (rem[i].dataset.screenName == usernames[index])
          {
               rem[i].parentNode.removeChild(rem[i]);
          }
          else
          {
            i=i+1;
          }
        }
    }
}, 1000);
