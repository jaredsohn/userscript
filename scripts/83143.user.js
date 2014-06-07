// ==UserScript==
// @name		Block twitter followers suggestions
// @namespace 	http://www.twitter.com/almog/hideSuggestions
// @description Hides the followers suggestion bar from the twitter homepage.
// @include 	http://twitter.com/*
// ==/UserScript==
var recommendedUsers = document.getElementById("recommended_users");
recommendedUsers.style.display = "none";
