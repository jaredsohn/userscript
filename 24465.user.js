// ==UserScript==
// @name         vBulletin - Full ignore
// @namespace    https://userscripts.org/people/5587
// @description  Stops display of truncated posts from users on your ignore list.
// @downloadURL  https://userscripts.org/scripts/source/24465.user.js
// @grant        GM_addStyle
// @include      */showthread.php*
// @updateURL    https://userscripts.org/scripts/source/24465.meta.js
// @version      1.0.2
// @date         2013-03-19
// @creator      Arne Dieckmann (aka "Mithrandir")
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