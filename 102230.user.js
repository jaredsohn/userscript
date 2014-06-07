// ==UserScript==
// @name           dw
// @description    Usuwa obrazki w badaniach, stoczni i budynkach by sledziu1
// @include        http://*/darkwarez/*.pl*
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
  		tds[i].style.display = "none";
  	}
  }
}