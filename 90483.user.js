// ==UserScript==
// @name listverse
// @include http://listverse.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle (".s-a{display:none !important;}");
AddStyle (".order-book{display:none !important;}");
AddStyle ("#rightbar{display:none !important;}");
AddStyle ("#content {width: 80% !important;}");
AddStyle (".bottom-ad {display:none !important;}");
AddStyle ("#idc-container {display:none !important;}");
AddStyle (".single-share {display:none !important;}");
AddStyle ("#subscribe-graphic {display:none !important;}");
AddStyle (".nav-bookstore {display:none !important;}");
AddStyle (".nav {width:800px !important;}");
AddStyle (".masthead {width:800px !important;}");
AddStyle (".top {width:800px !important;}");
AddStyle ("#ad {display:none !important;}");
AddStyle (".ad {display:none !important;}");
AddStyle (".also lists {display:none !important;}");
AddStyle (".hd-inner {width:0px; display:none !important;}");
AddStyle (".hd {width: 800px; display: none !important;}");
AddStyle (".wrapper {width: 800px;}");
AddStyle ("#carousel-nav {display:none !important;}");
AddStyle (".carousel-nav-outer {display:none !important;}");
AddStyle (".footer-inner2 {width: 800px;}");
AddStyle (".vert-ad {display:none !important;}");
AddStyle (".login-block {display:none !important;}");
AddStyle (".center-footer {width: 800px !important;}");
AddStyle (".footer-inner {width: 800px !important;}");
AddStyle ("#footer {width: 800px !important;}");
AddStyle (".header-inner {display:none !important;}");