// ==UserScript==
// @name        Google Images Link Fix
// @namespace   NPstuff
// @include     *.google.*/search*
// @version     1
// @require     http://www.zoidberg25.com/jquery-1.11.0.min.js
// ==/UserScript==

imglink = $('.hdtb_mitem > .qs:contains("Images")');
linkurl = imglink.attr('href');
imglinkactive = $('.hdtb_mitem.hdtb_msel');
imglinkactivetext = imglinkactive.text();


if (imglinkactivetext == 'Images') {
imglinkactive.remove();
$('.hdtb_mitem:contains("Web")').after("<div class=\"hdtb_mitem hdtb_msel\">Images</div>");
} else {
imglink.remove();
$('.hdtb_mitem:contains("Web")').after("<div class=\"hdtb_mitem\"><a href=\"" + linkurl + "\" class=\"q qs\">Images</a></div>");
}