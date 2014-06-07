// ==UserScript==
// @name           Film4vnToDailyMotion
// @namespace      http://online.film4vn.us/
// @description    film4vn scripts redirected to dailymotion hosting page, so they can be downloaded more easily
// @include        http://online.film4vn.us/*
// ==/UserScript==



// if this page has in it the an actual video
if(unsafeWindow.so==undefined){;}
else {

//retrieve the URL from the page being loaded
var swfurl = unsafeWindow.so.getAttribute("swf")

//replace the 'swf' in the URL with 'movie'
var videourl = swfurl.replace("/swf/","/video/")

//redirect the actual page to the dailymotion website
window.location = videourl

}
