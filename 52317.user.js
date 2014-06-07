// ==UserScript==
// @name         vBulletin - Full ignore modified for rakeback.com forums
// @namespace    http://userscripts.org/people/52317
// @description  Stops display of truncated posts from users on your ignore list modified for rakeback.com
// @source       http://userscripts.org/scripts/show/52317
// @identifier   http://userscripts.org/scripts/source/52317.user.js
// @version      1.0
// @date         2009-06-24
// @creator      Arne Dieckmann (aka "Mithrandir")
// @include      http://www.rakeback.com/poker-forum/*
// @exclude      http://www.rakeback.com/poker-forum/private.php
// ==/UserScript==

(function (){
var filterkey = "profile.php?userlist=ignore&amp;do=removelist&amp;u=";

var allElements, thisElement;
allElements = document.getElementsByTagName('tr');
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  if(thisElement.innerHTML.indexOf(filterkey)!=-1)
    {
    thisElement.parentNode.style.display = 'none';
    }
  }
}());