// ==UserScript==
// @name           TI_SNOT_FR
// @namespace      http://www.ruckus.com
// @description    This is not Fuck Ruckus
// @include        http://www.ruckus.com/*
// ==/UserScript==

function addGlobalStyle(css) { 
  var head, style; 
  head = document.getElementsByTagName('head')[0]; 
  if (!head) { return; } 
  style = document.createElement('style'); 
  style.type = 'text/css'; 
  style.innerHTML = css; head.appendChild(style); 
  } 
  
// CSS Tweaking for optimal viewing on my screen
addGlobalStyle('#TV { height:0px;}');
addGlobalStyle('#RightAd300 { height:0px;}');
addGlobalStyle('#bannerad { height:0px;}');
addGlobalStyle('#static3 { height:800px;}');
addGlobalStyle('#noleft { width:780px;}');
addGlobalStyle('#adbar { height:0px;}');

// Albums are sooo helpful
addGlobalStyle('#RecentAlbumReviews { height:800px;}');

// The link just doesn't work on my browser, this should help
RedirectUser();