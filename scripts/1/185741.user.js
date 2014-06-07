// ==UserScript==
// @name        Wallbase Google Reverse Image Search
// @namespace   benbb
// @description Reverse Google Image Search for Wallbase Wallpapers
// @include     *wallbase.cc/wallpaper/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener ("load", main, false);

function main () {
    addLink();
}

function getWallpaperURL() {
    return document.querySelectorAll("img.wall")[0].getAttribute("src");
}

function addLink() {
    var googleLink = "http://google.com/searchbyimage?image_url=" + getWallpaperURL();
    var newHTML = '<a href="' + googleLink + '" class="simlink">Google Reverse Image Search</a>';
    var linkBox = document.querySelectorAll(".centr > div:nth-child(1)")[0];
    
    linkBox.innerHTML += newHTML;
}