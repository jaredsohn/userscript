// ==UserScript==
// @name        Howrse BannerAd Border Removal
// @namespace   myHowrse
// @description Removes the border around the Banner Ad on Howrse.
// @include     http://*.howrse.com/*
// @exclude     http://*.howrse.com/member/forum/
// @exclude     http://*.howrse.com/member/forum/topics/*
// @author      daexion
// @version     2
// ==/UserScript==

bannerAd = document.getElementById("banner");
subBanner = bannerAd.getElementsByTagName("div");
subBanner[1].setAttribute("style","min-height:90px;");