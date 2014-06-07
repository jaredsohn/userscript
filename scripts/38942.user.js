// ==UserScript==
// @name           Teamnun Twitpic
// @namespace      http://colinrobinson.me.uk/twitpic.user.js

// @description    Replace ad image with teamnun badge

// @include        http://twitpic.com/*

// @include        https://twitpic.com/*

// @include        http://*.twitpic.com/*

// @include        https://*.twitpic.com/*

// ==/UserScript==


var newad = document.getElementById('view-photo-ad');
//var ad = document.getElementById('ad');
//var hack = document.getElementById('content-container').getElementsByTagName('script')[0].parentNode.parentNode.parentNode.getElementsByTagName('div')[13];
//
if (newad) {
	newad.innerHTML = '<p><img src="http://farm4.static.flickr.com/3239/3120752571_61bc4c3b83_o.png"</></p>';
//	alert("new ad found");
//}else if (ad){
//	ad.innerHTML = '<p><img src="http://farm4.static.flickr.com/3239/3120752571_61bc4c3b83_o.png"</></p>';
//	alert("ad found");
//}else if (hack){	
//	hack.innerHTML = '<p><img src="http://farm4.static.flickr.com/3239/3120752571_61bc4c3b83_o.png"</></p>';
//	alert("hack found");
}else{
//	alert("nothing found");
}


