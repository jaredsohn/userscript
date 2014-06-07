// ==UserScript==
// @name           Remove DetikNews Ads
// @description    Removes ads from DetikNews.com
// @include        http://www.detiknews.com/*
// ==/UserScript==

(function() 
{
  var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
  style.innerHTML = '#floater, #framebannerA, #bannerB1content, #bannerB2content, #bannerD2content, #framebannercontent, #framerunningtxtdalam, #framebannerdown { display: none; }';
	head.appendChild(style);
	
	var embeds = document.getElementsByTagName("embed");
	
	for(var i = 0; i < embeds.length; i++)
	  embeds.style.display = none;
	
	frameset = document.getElementsByTagName('frameset')[0];
  if (frameset) {
    contentFrame = document.getElementsByTagName('frame')[0];
    document.location.href = contentFrame.src;
  }
})();