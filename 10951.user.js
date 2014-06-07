// ==UserScript==
// @name           Twit.tv mp3 redirect stripper
// @namespace      Namespace
// @description    My corporate "bad url" list doesn't like podtrac.com so I had to strip it manually.  Small GMScript to clear it for direct right-click saving.
// @include        http://www.twit.tv/*
// @include        http://twit.tv/*
// ==/UserScript==

var allDivs;
allDivs = document.getElementsByTagName('a');

for (var i = 1; i < allDivs.length; i++)
{
  thisDiv = allDivs[i];

  if(thisDiv.href.match(/redirect.mp3\//))
  {
    var myRE = new RegExp('redirect.mp3\/([^"]+)', "");
    var results = thisDiv.href.match(myRE);
    
    thisDiv.href = 'http://'+results[1];
  }

  if(thisDiv.href.match(/redirect.mp3./))
  {
    var myRE = new RegExp('redirect.mp3.([^"]+)', "");
    var results = thisDiv.href.match(myRE);
    
    thisDiv.href = results[1];
  }
}
