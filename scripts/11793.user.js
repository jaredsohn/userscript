// ==UserScript==
// @name           Netflix No User Reviews
// @namespace      http://www.hotgreenpeas.com/stuff
// @description    Hides user reviews of movies on Netflix.
// @include        http://netflix.com/Movie/*
// @include        http://*.netflix.com/Movie/*
// ==/UserScript==

var userReviews = document.getElementById("mdpMemberReviews");
if (userReviews){

	userReviews.parentNode.removeChild(userReviews);
}
