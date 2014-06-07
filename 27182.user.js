// ==UserScript==
// @name           Facebook Mini-Feed Collapser
// @namespace      http://philonoism.blogspot.com
// @description    Make the Facebook Mini-Feed collapsible again.
// @include        http://www.facebook.com/*
// ==/UserScript==
var minifeed = document.getElementById('box_app_2341989679');
minifeed.className = 'profile_box clearfix flex_shut flex_header';
var feedtitlebar = minifeed.getElementsByTagName('div')[0];
var docurl = document.URL;
var profileid = docurl.slice(docurl.indexOf('id=')+3);
feedtitlebar.setAttribute('title','Click to Expand/Collapse');
feedtitlebar.setAttribute('onClick',"boxFlexToggle(this.parentNode, '" + profileid + "');");
