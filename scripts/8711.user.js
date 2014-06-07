// ==UserScript==
// @name           Basecamp: Custom Header Tab
// @namespace      http://forum.basecamphq.com/forums/3/topics/273?page=1#posts-1109
// @description    Created by Daniel Drucker of the Highrise Forum, and repurposed by TMG of the Basecamp Forum: Adds a custom tab to Basecamp's header.
// @include        http://*.clientsection.com/*
// @include        http://*.grouphub.com/*
// @include        http://*.projectpath.com/*
// @include        http://*.seework.com/*
// @include        http://*.updatelog.com/*
// @include        https://*.clientsection.com/*
// @include        https://*.grouphub.com/*
// @include        https://*.projectpath.com/*
// @include        https://*.seework.com/*
// @include        http://*.updatelog.com/*
// ==/UserScript==

// By dmd
 (function() {
 var mainTabs = document.getElementById('MainTabs');
 mainTabs.innerHTML = mainTabs.innerHTML+'<li><a href="http://www.msn.com" class="">MSN</a></li>';
 
 })();