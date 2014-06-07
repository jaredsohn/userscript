// ==UserScript==
// @name         vBulletin - Full ignore Canardpc.com
// @description  Stops display of truncated posts from users on your ignore list On Canardpc.com.
// @version      1.00
// @date         2012-10-04
// @creator      Arne Dieckmann (aka "Mithrandir") + Adapt by Jalkar
// @include      http://forum.canardpc.com/threads/*
// ==/UserScript==

(function (){
var filterkey = "?userlist=ignore&amp;do=removelist&amp;u=";

var allElements, thisElement;
allElements = document.getElementsByTagName('tr');
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  if(thisElement.innerHTML.indexOf(filterkey)!=-1)
    {
    thisElement.parentNode.style.display = 'none';
    }
  }

// for new vBulletin 4.x try this:
GM_addStyle('li.postbitignored {display: none !important;}');
}());