// ==UserScript==
// @name       YouTube - Open Links in New Tab as Default
// @namespace  www.youtube.com
// @version    0.3
// @description  Set all the links on youtube to open in a new tab when clicked.
// @include    *www.youtube.com*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  Gonso_x3
// ==/UserScript==

var yt_default = "www.youtube.com/";
var yt_homepage = "https://www.youtube.com/feed/subscriptions/";

if (window.location.hostname+window.location.pathname == yt_default){
  window.location.replace(yt_homepage);
}
var yt_full = window.location.protocol + "//" + yt_default;
var yt_links = document.querySelectorAll("a[href='/'], a[href='"+yt_full+"']");
for (var yt_i = 0; yt_i < yt_links.length; yt_i++) {
  yt_links[yt_i].setAttribute("href",yt_homepage);
}


// Open all Video-Links in new Tab

if (window.location.href == yt_homepage){
	var list = document.getElementById('feed').getElementsByTagName('a');

	for(var i = 0; i < list.length; i++) {
		list[i].setAttribute('target','_blank');
	}
}