// ==UserScript==
// @name        Howrse BannerAd Mover
// @namespace   myHowrse
// @description Moves the banner ad to the right.
// @include     http://www.howrse.com/*
// @exclude     http://www.howrse.com/member/forum/
// @exclude     http://www.howrse.com/member/forum/topics/*
// @author      daexion
// @version     1
// ==/UserScript==
var d = document.getElementById("banner"); 

if (d.hasAttribute("style")) d.setAttribute("style","margin-left: 96em;");