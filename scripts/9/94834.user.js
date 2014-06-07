// ==UserScript==
// @name           Remove youtube homepage adds
// @namespace      http://www.facebook.com
// @description    This will remove adds on youtube homepage
// @include        http://www.youtube.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


$(document).ready(function(){
   $("#homepage-side-content").css("display","none");
   $("#ad_creative_1").css("display","none");
});