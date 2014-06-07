// ==UserScript==
// @name          BoSTard Ignorer
// @description	  Removes posts by people on your ignore list, instead of just replacing them with a message that the post is hidden.  Removes some posts that reply to people on your ignore list. Based off the NNYFans Enhancer
// @include       http://community.boredofstudies.org/*
// @creator      Arne Dieckmann (aka "Mithrandir") [Adapted for BoS]
// @exclude       
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

