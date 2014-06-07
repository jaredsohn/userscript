// ==UserScript==
// @name          Customized dA - tmaric fire
// @namespace     http://userstyles.org
// @description	  This userstyle replaces the official dA logo with a tmaric fire. 
// @author        tmaric
// @homepage      http://userstyles.org/styles/9145
// @include       http://deviantart.com/*
// @include       https://deviantart.com/*
// @include       http://*.deviantart.com/*
// @include       https://*.deviantart.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* DEVIANTART SUBSCRIBED ------------------------------ This script removes the current header and replaces it with a custom made header. It also takes care of needed space in the top userbar. */ #topLeft-55 { background: transparent url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://imageshack.us/img/butansn.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat !important; } #top-55 #rockdock { /*Increase the number below if your headerimage is wider, it will move the text on the topbar to the right*/ padding: 0 169px !important; background: #3f534a url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat -18px 0 !important; } #midSection { background: transparent url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat 0 -27px !important; } #midSection #logoArea { background: transparent url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat 0 -25px !important; z-index: 999 !important; } #midSection #logoArea:hover { background: transparent url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat 0 -99px !important; } #midSection { background: transparent url(\"<a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" target="_blank"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img440.imageshack.us/my.php?image=34543792pw3.png" title="QuickPost"><img src="http://img440.imageshack.us/my.php?image=34543792pw3.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!\") no-repeat 0 -27px !important; } /* DEVIANTART UNSUBSCRIBED ------------------------------ I wouldn't want deviantART to lose there advertisement money, so I tried working my way around it. I replaced the ads with the midsection. */ #world.withad #ad-blocking-makes-fella-sad { position: absolute !important; top: 95px !important; } #world.withad #midSection { top: 27px !important; } /* CHATROOM ------------------------------ The chatroom gets his own little header as well. */ .chatroom #top-55 #rockdock { /*Increase the number below if your headerimage is wider, it will move the text on the topbar to the right*/ padding: 0 169px !important; background: #3f534a url(\"http://img67.imageshack.us/img67/6792/newheader2fb5.png\") no-repeat 0 bottom !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
