// ==UserScript==
// @name           twitterFriends
// @namespace      icaaq.com
// @description    Adds scroll on http://twitter.com/friends
// @include        http://twitter.com/*
// ==/UserScript==
(function(){
  if(document.getElementById("friends")){
	document.getElementById("friends").style.overflow = "auto";
  }
})();