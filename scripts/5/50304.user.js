// ==UserScript==
// @name Bring back the Septagon
// @description Changes the community forum banner
// @include http://*www.bungie.net*
// @include http://*halo3.org*
// ==/UserScript==

var imgs=document.evaluate(".//img",document.body,null, 4,null);
for(var img=imgs.iterateNext();img;img=imgs.iterateNext())
{
if (img.src.indexOf("/images/base_struct_images/themes/default/forums/HeaderTheSeptagon.jpg")!=-1) img.src="http://i442.photobucket.com/albums/qq144/Wolverfrog/Septagontest.jpg";

