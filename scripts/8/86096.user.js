// ==UserScript==
// @name           Removes everything from youtube except the video
// @include http://*.youtube.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
//removing ads and stuff
AddStyle ("#masthead_child_div {display:none;}");
AddStyle ("#homepage-side-content {display:none;}");
AddStyle ("#ad_creative_1 {display:none;}");
AddStyle ("#ad_creative_expand_btn_1 {display:none;}");
AddStyle ("#homepage-main-content {width: 100% !important;}");
AddStyle ("#comments-view {display: none;}");
AddStyle ("#comments-post {display: none;}");
AddStyle ("#watch-actions-left {display: none;}");
AddStyle ("#search-pva {display:none;}");
AddStyle ("#eow-title {display:none;}");
AddStyle ("#masthead-container {display:none;}");
AddStyle ("#alerts {display:none;}");
AddStyle ("#watch-main-container {display:none;}");
AddStyle ("#footer {display:none;}");
AddStyle ("#watch-headline-user-info {display:none;}");