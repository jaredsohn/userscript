// ==UserScript==
// @id             gizmodoyoutubefix
// @name           Gizmodo youtube info bar fix
// @version        1.0
// @namespace      V@no
// @author         V@no
// @description    Add youtube info bar with vote capability
// @include        http://gizmodo.com/*
// @include        http://jalopnik.com/*
// @include        http://io9.com/*
// @include        http://jezebel.com/*
// @include        http://kotaku.com/*
// @include        http://deadspin.com/*
// @include        http://gawker.com/*
// @run-at         document-end
// ==/UserScript==

var o = document.getElementsByClassName("youtube");
for (var i = 0; i < o.length; i++)
{
	o[i].src = o[i].src.replace("&showinfo=0", "");
}