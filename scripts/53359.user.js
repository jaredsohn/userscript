// ==UserScript==
// @name           Gawker No Sidebar
// @namespace      http://userscripts.org
// @description    Removes the left sidebar from Gawker Media sites including Lifehacker, and then centers the page's main content.
// @include        http://lifehacker.com/*
// @include        http://valleywag.com/*
// @include        http://jalopnik.com/*
// @include        http://consumerist.com/*
// @include        http://gizmodo.com/*
// @include        http://jezebel.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://io9.com/*
// @include        http://gawker.com/*
// @include        http://defamer.com/*
// @include        http://fleshbot.com/*
// ==/UserScript==

var tag;
var css = "background: none !important; margin-left: auto !important; margin-right: auto !important";

if(tag = document.getElementById("content_container"))
	tag.style.cssText = css;
else if (tag = document.getElementById("container"))
	tag.style.cssText = css;

document.getElementById("sidebar").parentNode.removeChild(document.getElementById("sidebar"));
