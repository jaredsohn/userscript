// ==UserScript==
// @name         Remove Ignore Notice on Carolina Huddle
// @description  Removes the "This message is hidden because..." so that you can forget they ever existed. 
// @date         11/2/11
// @creator      rodeo
// @include      http://www.carolinahuddle.com/*
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