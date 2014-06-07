// ==UserScript==
// @name           UnTweetALink
// @namespace      ALjzQGjZuZACSNJyeWmIzbx2wbYBaktuPf0MerCqIb8VvaSymIEjI3eT1FBTEQd
// @description    Remove that annoying tweetalink-Frame
// @include        http://tweetalink.com/go/*
// ==/UserScript==

window.location = document.getElementsByTagName("frame")[1].src;