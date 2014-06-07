// ==UserScript==
// @name         Access Flickr By Knight
// @include      *
// ==/UserScript==

(function(){var allImages=document.images;
if(allImages!=null){for(j=0;j<allImages.length;++j)
{
if (allImages [j].src.indexOf ("flickr.com") > 0)
{
allImages[j].src=allImages[j].src.replace("farm1.static.flickr.com","ch1.farm1.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm2.static.flickr.com","ch1.farm2.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm3.static.flickr.com","ch1.farm3.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm4.static.flickr.com","ch1.farm4.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm5.static.flickr.com","ch1.farm5.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm6.static.flickr.com","ch1.farm6.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm7.static.flickr.com","ch1.farm7.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm8.static.flickr.com","ch1.farm8.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm9.static.flickr.com","ch1.farm9.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm1.staticflickr.com","ch1.farm1.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm2.staticflickr.com","ch1.farm2.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm3.staticflickr.com","ch1.farm3.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm4.staticflickr.com","ch1.farm4.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm5.staticflickr.com","ch1.farm5.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm6.staticflickr.com","ch1.farm6.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm7.staticflickr.com","ch1.farm7.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm8.staticflickr.com","ch1.farm8.staticflickr.com");
allImages[j].src=allImages[j].src.replace("farm9.staticflickr.com","ch1.farm9.staticflickr.com");
}}}})();