// ==UserScript==
// @name           Buyuk resim
// @namespace      yapıların resimlerini büyütme eklentisi(orj name:velke obrazky ogame)
// @description    edit by:doominsert
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
      imgs[x].width = "200";
      imgs[x].height = "120";
  	}
  }
}

var imgp = document.getElementsByTagName("img");
for (var x = 0; x < imgp.length; x++) 
  {
  	if((imgp[x].getAttribute("width") == "200") &&
       (imgp[x].getAttribute("height") == "200"))
  	{
      imgp[x].width = "180";
      imgp[x].height = "350";
  	}
  }


