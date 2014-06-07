// ==UserScript==
// @name         vBulletin - Full ignore
// @namespace    http://userscripts.org/people/5587
// @description  Stops display of truncated posts from users on your ignore list. (Now works on BoredofStudies)
// @version      1.01
// @date         2008-03-29
// @creator      Arne Dieckmann (aka "Mithrandir")
// @include      *boredofstudies.org*
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