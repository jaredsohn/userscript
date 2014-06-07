// ==UserScript==
// @name          YouTube NO Ads!
// @namespace     http://userstyles.org
// @description	  A great script specially for YouTube, showing no ads whatsoever. 
// @author        QuestionMarkFTW
// @homepage      http://userstyles.org/styles/6717
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==

/*
#ad_creative_1
{ display: none !important; }
*/

var head = document.getElementsByTagName('head')[0];

head.innerHTML = "<style>* { border: 1px solid red; }</style>";

alert('Hello');