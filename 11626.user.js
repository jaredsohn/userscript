// ==UserScript==
// @name           Male obrazki ogame
// @namespace      male obrazki ogame
// @description    Male obrazki w stocznia/badania/budynki by sledziu1
// @include        http://*/game/*.php*
// ==/UserScript==

var tds = document.getElementsByTagName("td");
for (var i = 0; i < tds.length; i++) 
{
	var imgs = tds[i].getElementsByTagName("img");
  for (var x = 0; x < imgs.length; x++) 
  {
  	if((imgs[x].getAttribute("width") == "120") &&
       (imgs[x].getAttribute("height") == "120") &&
       (tds[i].getElementsByTagName("img").length == 1))
  	{
      imgs[x].width = "70";
      imgs[x].height = "70";
  	}
  }
}
