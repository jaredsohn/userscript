// ==UserScript==
// @name       Facebook Pictrue
// @namespace  http://hack2brain.blogspot.com/
// @version    0.2
// @description  Enlarge closed facebook profile Picture
// @match      https://www.facebook.com/*
// @copyright  2013, kh3dr0n
// @lastUpdate 15 september 2013
// ==/UserScript==
document.addEventListener('DOMContentLoaded',function(){
if(document.getElementById("profile_pic_education") != null || document.querySelector(".photoContainer") != null){
    url = document.querySelector(".profilePic").src;
	nurl = url.substr(0,url.indexOf("/c")) + url.substr(url.indexOf("/s160x160")+9);
    nurl = nurl.substr(0,nurl.length - 5) + "b.jpg";
    document.querySelector(".profilePicThumb").innerHTML = "<a href='" + nurl + "' target='_blank'>" + document.querySelector(".profilePicThumb").innerHTML + "</a>";
}
});