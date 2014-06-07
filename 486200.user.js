// ==UserScript==
// @name        BloodCat osu!
// @namespace   http*://osu.ppy.sh/s/*
// @description Download osu! songs from bloodcat instead of the osu! website, faster and no limit of number of maps!
// @include     http*://osu.ppy.sh/s/*
// @match       http*://osu.ppy.sh/s/*
// @version     1.0
// @grant       none
// ==/UserScript==


(function(){
    var dldivs = document.getElementsByClassName('beatmapDownloadButton');
    for (var i=0; i<dldivs.length;i++) {
       dldivs[i].innerHTML = dldivs[i].innerHTML.replace("/d/", "http://bloodcat.com/osu/m/");
    }
})();