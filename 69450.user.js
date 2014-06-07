// ==UserScript==
// @name          Photobucket Filter Buster
// @description   All Sites: Change photobucket image URLs from img.photobucket.com to i543.photobucket.com.
// @include        *
// ==/UserScript==

(function()
{
    var images = document.getElementsByTagName("img")
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.indexOf("img.photobucket.com") > -1)
        {
            var url = images[i].src.replace("img.photobucket.com", "i543.photobucket.com")
            images[i].src= url;
        }
    }
})();
