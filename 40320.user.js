// ==UserScript==
// @name           Reddit ad-frame delete 
// @namespace      77087
// @description    Delete the stupid Reddit ad-frame
// @include        http://www.reddit.com/*
ad_frame = document.getElementById('ad-frame');
ad_frame.style.display='none';
// ==/UserScript==