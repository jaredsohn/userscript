// ==UserScript==
// @name           Remove all spiders
// @namespace      kwierso@kwiersoisawesome.com
// @description    Removes all spiders
// @include        http://roosterteeth.com/*
// @include        http://*.roosterteeth.com/*
// @include        http://strangerhood.com/*
// @include        http://achievementhunter.com/*
// @include        http://redvsblue.com/*
// @include        http://roosterteethcomics.com/*
// ==/UserScript==

(function() {
    var images = document.getElementsByTagName("img");
    
    for(i in images)
        images[i].src = "http://farm2.static.flickr.com/1156/533230958_38914f7e6b.jpg";
})();