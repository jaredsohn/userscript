// ==UserScript==
// @name           FlickrHidePhotoStats
// @namespace      http://www.flickr.com/alesadam
// @description    Hides the stats on the photo page.
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

(function () {
    var photoStoryStats = document.getElementById("photo-story-stats");
    if (photoStoryStats) {
        photoStoryStats.style.display = "none";
        photoStoryStats.style.visibility = "hidden";
    }
})();
