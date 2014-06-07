// ==UserScript==
// @name           Disable Small Tag in ZB Posts
// @namespace      http://resources.zetaboards.com/
// @description    Disables the infernal [small] tag inside of ZB posts
// @include        http://*zetaboards.com/*
// @include        http://*invisionfree.com/*
// @include        http://forums.planetnexus.net/*
// @include        http://zbcode.com/*
// @include        http://zbforums.com/*
// @include        http://outlineforum.com/*
// @include        http://graphicforce.org/*
// @include        http://hogwartsnewzealand.com/*
// @include        http://bigboardsresources.com/*
// ==/UserScript==
var $ = unsafeWindow.jQuery;

$('td.c_post small').each(function () { 
    this.style.fontSize = "100%";
});