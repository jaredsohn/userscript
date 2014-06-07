// ==UserScript==
// @name           Last.fm LineBreaker
// @namespace      http://www.last.fm/
// @description    Brings back the line breaks in last.fm shoutboxes
// @include        http://www.last.fm/user/*
// @include        http://www.last.fm/music/*
// @include        http://www.last.fm/tag/*
// @include        http://www.last.fm/group/*
// @include        http://www.lastfm.*/user/*
// @include        http://www.lastfm.*/music/*
// @include        http://www.lastfm.*/tag/*
// @include        http://www.lastfm.*/group/*
// ==/UserScript==

var shoutList = document.getElementById("shoutList").getElementsByTagName("li");
if (shoutList)
{
  for (var i = 0; i < shoutList.length; i++)
  {
    var shoutBody = shoutList[i].getElementsByTagName("blockquote")[0];
    
    shoutBody.innerHTML = shoutBody.innerHTML.replace(/^\s+|\s+$/g,"").replace(/\n/g, "\n<br />");
}
}