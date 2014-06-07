// ==UserScript==
// @name          ITBbs.PcShow Ad Remover
// @namespace     http://ITBBS.PCSHOW.NET/
// @description	  Removes the ad in the posts when surfing ITBBS.PCSHOW.NET.
// @include       http://*itbbs.pcshow.net/*
// @exclude       
// ==/UserScript==
	
(function() {
 var ad_divs = document.getElementsByTagName('div');
 for(var i = 0; i < ad_divs.length; i++) {
  if(ad_divs[i].id.substr(0, 3) == 'ad_') {
	ad_divs[i].style.display="none";
	}
    }
})();