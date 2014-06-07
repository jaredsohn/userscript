// ==UserScript==
// @name           Friend Feed Target Window
// @namespace      http://www.kensheppardson.com
// @description    Force all FriendFeed links to open in a 'content' window
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @exclude        http://friendfeed.com/account*
// ==/UserScript==
var feedcontainer;
var links;
feedcontainer = document.getElementById('feedcontainer');
links = feedcontainer.getElementsByTagName('a');
for(i=0;i<links.length;i++)
{
    links[i].setAttribute('target','content');
}
