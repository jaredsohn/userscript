// ==UserScript==
// @name         Access Flickr Over GFW
// @include      *
// ==/UserScript==

(function(){var allImages=document.images;
if(allImages!=null){for(j=0;j<allImages.length;++j)
{
if (allImages [j].src.indexOf ("flickr.com") > 0)
{
allImages[j].src=allImages[j].src.replace("farm3.static.flickr.com","76.13.18.78");
allImages[j].src=allImages[j].src.replace("farm5.static.flickr.com","76.13.18.79");}}}})();