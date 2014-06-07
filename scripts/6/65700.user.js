// ==UserScript==
// @name          OpenSourceCMS No Ads
// @version       1.0.0
// @namespace	  http://www.shatter-blog.net
// @description   Removes the ads in demos of CMS on www.opensourcecms.com
// @include       http://www.opensourcecms.com/demo/*
// ==/UserScript==


// Let's start
demoURL = document.getElementsByTagName('frame')[1];
if (!demoURL) { return; }
window.location.href = demoURL.src;

