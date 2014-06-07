// ==UserScript==
// @name            Premium TV Sites Corrector
// @namespace       http://www.pete-b.co.uk/downloads/greasemonkey
// @description     Fixes Articles Page widths
// @include		http://*.premiumtv.co.uk/*
// ==/UserScript==

(function() {
function getElementsByClass(needle)
{
  var         my_array = document.getElementsByTagName("*");
  var         retvalue = new Array();
  var        i;
  var        j;

  for (i = 0, j = 0; i < my_array.length; i++)
  {
    var c = " " + my_array[i].className + " ";
    if (c.indexOf(" " + needle + " ") != -1)
      retvalue[j++] = my_array[i];
  }
  return retvalue;
}

var bodyBorder = getElementsByClass("bodyBorder");
var menu = getElementsByClass("menu");
if(bodyBorder.length > 0 && menu.length > 0) {
	bodyBorder[0].style.width = "100%";
}

var adverts = getElementsByClass("advertColumn");

if(adverts.length > 0) {
	for(i = 0; i<adverts.length; i++) {
		adverts[i].style.display = "none";
	}
}

var banner = getElementsByClass("bannerAdvert");

if(banner.length > 0) {
	for(i = 0; i<banner.length; i++) {
		banner[i].style.display = "none";
	}
}

var mainColumn = getElementsByClass("mainColumn");
if(mainColumn.length > 0) {
	mainColumn[0].style.paddingTop = "7px";
}

var teaserColumn = getElementsByClass("teaserColumn");
if(mainColumn.length > 0) {
	mainColumn[0].style.paddingTop = "7px";
}
})();
