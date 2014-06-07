// ==UserScript==
// @name dA All GIFs are Las
// @author Tommy Smith
// @description Ever wanted everything to be a La on devianTART? Well now you can!
// @version 0.2
// @include http*://deviantart.com/*
// @include http*://*.deviantart.com/*
// ==/UserScript==
var la = new Array("http://s.deviantart.net/emoticons/l/la.gif", "http://a.deviantart.net/avatars/l/a/lachoirplz.gif", "http://a.deviantart.net/avatars/l/a/labandplz.gif", "http://a.deviantart.net/avatars/l/a/lasingplz.gif", "http://a.deviantart.net/avatars/l/a/labeatplz.gif", "http://a.deviantart.net/avatars/l/a/larockplz.gif", "http://a.deviantart.net/avatars/l/a/ladrumplz.gif", "http://a.deviantart.net/avatars/l/a/laplayplz.gif", "http://a.deviantart.net/avatars/l/a/lawooplz.gif", "http://a.deviantart.net/avatars/n/e/newlaplz.gif", "http://a.deviantart.net/avatars/l/a/laplz.gif", "http://fc05.deviantart.net/fs71/f/2013/130/c/4/giant_la_by_web5ter-d64qtf0.gif");for(i=0;i<document.images.length;i++){document.images[i].src=la[(Math.round(Math.random()*(la.length-1)))];}