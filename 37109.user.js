// ==UserScript==
// @name           Gawker No Sidebar
// @namespace      http://userscripts.org
// @description    Removes the sidebar from Gawker Media sites including Lifehacker.
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

if(tag = document.getElementById("sidebar"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("sitemeter"))
{
	tag.parentNode.removeChild(tag);
}

if(tag = document.getElementById("main"))
{
	tag.style.cssFloat = "left";
}

if(tag = document.getElementById("container"))
{
	tag.style.margin = "2px auto 0 8px";
}

if(tag = document.getElementById("content_container"))
{
	tag.style.width = "0px";
}