// ==UserScript==
// @name           Remove Detik Ads
// @description    Removes ads from Detik.com
// @include        http://*.detik.com/*
// ==/UserScript==

(function() 
{
  var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
style.innerHTML = '#floater, #floaterkiri, #bannerA, #navmenu1, #navmenu2, #navmenu3, #microsite1, #bannerB1, #bannerB2, #bannerB3, #bannerB4, #content1D, #microsite2, #promo1, #allnews { display: none; }\r\n#content1C { width: 100% }';
	head.appendChild(style);
	
  frameset = document.getElementsByTagName('frameset')[0];
  if (frameset) {
    bottomFrame = document.getElementsByTagName('frame')[1];
    document.location.href = bottomFrame.src;
  }
})();