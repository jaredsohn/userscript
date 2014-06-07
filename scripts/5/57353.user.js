// ==UserScript==
// @name          Reddit Hive Mindless
// @namespace     Peter Swire
// @description   Hides the Downvote/Upvote Counter in the comments page
// @include       http://*reddit.com/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
for (i = 0; i < divs.length; i++){
  if(divs[i].className == 'linkinfo'){
	  divs[i].style.display = 'none';
  }
}

