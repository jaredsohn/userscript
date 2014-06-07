// ==UserScript==
// @name        identify liked posts
// @namespace   waltzy
// @description Adds red circle to the top of posts you've already liked so you don't have to scroll to the bottom
// @include     http://www.tumblr.com/dashboard*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

   function checkLikedPosts() {
$(".liked:not(.redcircle)").parents(".post").find(".post_info").prepend(
    "<span style='background-color: red; display: inline-block; width: 20px; height: 20px; border-radius: 10px'></span>");
   $(".liked:not(.redcircle)").addClass("redcircle");
   }
 

setInterval(checkLikedPosts, 300);


