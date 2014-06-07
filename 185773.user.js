// ==UserScript==
// @name        Nintendo Miiverse Image Harvester
// @version     1.1
// @description Allows images to be downloaded when clicked on Miiverse.
// @include     https://miiverse.nintendo.net/posts/*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

if($(".post-content-memo"))
{
    var postMemo = $(".post-content-memo img").attr("src");
    
	$(".post-content-memo").wrap("<a href=\""+postMemo+"\" download=\"postMemo.png\"></a>");
}

if($(".screenshot-container"))
{
    var postImage = $(".screenshot-container img").attr("src");
    
	$(".screenshot-container").wrap("<a href=\""+postImage+"\" download=\"postImage.jpg\" \"></a>");
}