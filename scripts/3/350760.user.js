// ==UserScript==
// @name          Twitter Fixer
// @namespace     http://yurifrl.com
// @description   Clears Twitter's elements and Hide all tweets from users without having to unfollow them..
// @include       http://*twitter.com/*
// @include       https://*twitter.com/*
// @version       2.1
// @grant       none
// ==/UserScript==

var usernames = ["username","goes","here"];

function addCSS (css)
{
    unsafeWindow.addEventListener('load', function ()
    {
        var style = document.createElement('style');

        style.type = 'text/css';
        style.textContent = css;

        document.getElementsByTagName("head")[0].appendChild(style);
    }, false);
}

addCSS('.wrapper.wrapper-home.white { width: 82%}');
addCSS('.wrapper.wrapper-connect.white { width: 82%}');
addCSS('.dashboard {width: 100%; float : left;}');
addCSS('.content-main  {width: 100%; float : left;}');

addCSS('.Footer.module {display: none !important;}');
addCSS('.module.trends {display: none !important;}');
addCSS('.module.wtf-module.js-wtf-module.has-content {display: none !important;}');
addCSS('.module.profile-card.component.profile-header.profile-page-header {left: -15% !important;}');

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