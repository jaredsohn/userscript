// ==UserScript==
// @name           Alt to title
// @namespace      xkcd
// @description    Changes the alt tag, to the actual title - for bookmarkin
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// ==/UserScript==

// start of title code
var allTitles, thisTitle;
GM_log("start");
allTitles = document.getElementsByTagName('title');
for (var i = 0; i < allTitles.length; i++) {
    thisTitle = allTitles[i];
}
// the last title... hopefully the only title, should be in the 'thisTitle' variable
// start of comic code
var allImages, thisImage, comicImage, comicAlt, comicTitle, imgSrc;
comicImage=false;
allImages = document.getElementsByTagName('img');

for (var i = 0; i < allImages.length; i++) {
    thisImage = allImages[i];
    imgSrc = thisImage.getAttribute("src");
    if (imgSrc.substr(0,28)=="http://imgs.xkcd.com/comics/") {
	    comicImage=thisImage;
    }// comic image should now be in correct variable
}
comicAlt=comicImage.getAttribute("alt");
comicTitle=comicImage.getAttribute("title");
document.title="XKCD: \"" + comicAlt + "\" - " + comicTitle;