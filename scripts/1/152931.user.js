// ==UserScript==
// @name        Show images on reichelt.de immediately
// @description reichelt.de uses annoying lazy loading of images with slow fade-in. This script makes all images visible instantly.
// @include     *://*.reichelt.de/*
// @version     1
// ==/UserScript==


function showLazyImages()
{
    var allLazyImages = document.getElementsByClassName('lazy');

    while(allLazyImages.length > 0)
    {
        allLazyImages[0].src=allLazyImages[0].attributes['data-original'].value;
        allLazyImages[0].classList.remove('lazy');
    }
}

showLazyImages();

