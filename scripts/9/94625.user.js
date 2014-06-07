// ==UserScript==
// @name           delete_old_tweets
// @namespace      http://twitter.com/ichiyonnana
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function getElementsByClass(searchClass) {
  var classElements = new Array();
  var allElements = document.getElementsByTagName("*");
  for (i = 0, j = 0; i < allElements.length; i++) {
    if (allElements[i].className == searchClass) {
      classElements[j] = allElements[i];
      j++;
    }
  }
  return classElements;
}

function removeAllChilds(parent) {  
  var child = parent.firstChild;
  while (child.nextSibling) {
	  parent.removeChild(child.nextSibling);
  }

  parent.removeChild(child);
}

function removeOldTweets(){
  removeAllChilds(getElementsByClass('stream-items')[0]);
}

( function(){
  var element = document.createElement('div'); 
  element.id = "delete_old_tweets"; 
  element.innerHTML = "delete old tweets"; 
  element.onclick = removeOldTweets;
  document.getElementById('global-nav').appendChild(element);
}) ();
