// ==UserScript==
// @name           velke obrazky ogame
// @namespace      velke obrazky ogame
// @description    velke obrazky planet v přehlede/big img of planet in overview
// @include        http://*/game/*.php*
// ==/UserScript==

var imgp = document.getElementsByTagName("img");
for (var x = 0; x < imgp.length; x++) 
  {
  	if((imgp[x].getAttribute("width") == "200") &&
       (imgp[x].getAttribute("height") == "200"))
  	{
      imgp[x].width = "200";
      imgp[x].height = "400";
  	}
  }
