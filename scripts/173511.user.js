// ==UserScript==
// @name        Show images on golem.de immediately
// @description golem.de uses annoying lazy loading of images. This script makes all images visible instantly.
// @include     *://*.golem.de/*
// @version     1
// ==/UserScript==


function showLazyImages()
{
    var allLazyImages = document.getElementsByClassName("golem-data-afterload");

    while(allLazyImages.length > 0)
    {
        allLazyImages[0].src=allLazyImages[0].attributes["data-src"].value;
        allLazyImages[0].classList.remove("golem-data-afterload");
    }
}

showLazyImages();
