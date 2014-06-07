// ==UserScript==
// @name youtube sidebar removal
// @include http://youtube.com/*
// @include https://youtube.com/*
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

//Top bar
AddStyle ("#masthead_child_div {display:none !important;}");
AddStyle ("#ad_creative_1 {display:none !important;}");

//Video sidebar
AddStyle ("#video-sidebar {display:none !important;}");

//footer
AddStyle ("#footer {display:none !important;}");

//left side
AddStyle ("#channel {display:none !important;}");
AddStyle ("#subscriptions-full {display:none !important;}");
AddStyle ("#channel {display:none !important;}");
AddStyle ("#guide-builder-promo {display:none !important;}");
AddStyle ("#video-sidebar {display:none !important;}");
AddStyle (".guide {display:none !important;}");

//center goodness
AddStyle (".guide-background {display:none !important;}");

//Feed
AddStyle ("#feed {margin-left: 20px !important;}");
AddStyle ("#feed {margin-right: 20px !important;}");
AddStyle ("#feed {width: 800px !important;}");

//Show uploads only
AddStyle (".feed-header-subscribe {display:none !important;}");

//sidebar recommended
AddStyle ("#homepage-side-content {display:none !important;}");

//width
AddStyle ("#homepage-main-content {width: 800px !important;}");

//recommended
AddStyle (".top-videos-module {display: none !important;}");