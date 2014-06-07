// ==UserScript==
// @name           Imagefap Direct Linker
// @namespace      blah
// @include        http://www.imagefap.com/gallery*
// ==/UserScript==
var all_hrefs;
all_hrefs = document.getElementsByTagName('a');
for (var i = 0; i < all_hrefs.length; i++)
{
if (all_hrefs[i].innerHTML.indexOf("<img")!=-1){
 all_hrefs[i].href=all_hrefs[i].getElementsByTagName("img")[0].src.replace("thumb","full")
}	
}


