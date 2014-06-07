// ==UserScript==
// @name           gblock
// @namespace      http://github.com/
// @description    Perfect package to enjoy HD videos in YouTube. Always watching or downloading the highest quality format ( 4K / HD 1080p / HD 720p / HQ FLV / MP4 iPod ). Add download icons in video list page.
// @include        http://*.google.com/*
// @include        https://*.google.com.hk/*
// @version        3.5.4
// ==/UserScript==


var url = window.location.href.toLowerCase();    
//alert(url);   
http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0CCQQFjAB&url=http%3A%2F%2Fwww.sss.gov.ph%2F&ei=wUmDUOD6FtGXiAe01oF4&usg=AFQjCNHZV-DdjkSvdMBwfqXxbj1upGN71g&sig2=WJfu_cw7scPowpLebVKHJQ&cad=rjt/
if (url.indexOf("www.google.com.hk") >= 0 || url.indexOf("www.google.com") >= 0 || url.indexOf("/search") >= 0 || url.indexOf("/url") >= 0) 
{ 
    var all = document.querySelectorAll("#ires h3 a, #ires .fc a");
    for (var i = 0; i < all.length; i ++) 
    { 
		all[i].addEventListener('mousedown', function(e){
			if(/http:\/\/www\.google\.com\/url\?.*/.test(e.target.href)){
				e.target.href.replace(/^http:/, 'https');
			}
		});
        all[i].onmousedown = null; 
		all[i].setAttribute("onmousedown", " ");
    }
}