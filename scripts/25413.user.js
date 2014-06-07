// ==UserScript==
// @name           Unblock Gawker Media sites (Gizmodo, Lifehacker, etc.)
// @namespace      gawker.com
// @description    Gawker Media sites such as Gizmodo and Lifehacker fetch CSS, Javascript and images from gawker.com, which is blocked by certain web filters and proxies including WebSense. This script remaps those references to the original site.
// @include        http://gizmodo.com/*
// @include        http://valleyway.com/*
// @include        http://fleshbot.com/*
// @include        http://wonkette.com/*
// @include        http://defamer.com/*
// @include        http://kotaku.com/*
// @include        http://jalopnik.com/*
// @include        http://gridskipper.com/*
// @include        http://lifehacker.com/*
// @include        http://deadspin.com/*
// @include        http://consumerist.com/*
// @include        http://idolator.com/*
// @include        http://kinja.com/*
// @include        http://jezebel.com/*
// @include        http://io9.com/*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

// switch header links to CSS and Javascript
var head = document.getElementsByTagName('head')[0];
for (i = 0; i < head.childNodes.length; i++) {
   if (head.childNodes[i].href != null)
       head.childNodes[i].href = head.childNodes[i].href.replace('gawker.com', document.location.host);
}

// switch image links
document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/gawker\\.com/g, document.location.host);

