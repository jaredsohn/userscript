// ==UserScript==
// @name       kinopoisk.ru cleaner
// @description  kinopoisk.ru no advert, no shit
// @version 1.0
// @date 2012-08-17
// @homepageURL  http://userscripts.org/scripts/show/141656
// @updateURL    https://userscripts.org/scripts/source/141656.meta.js
// @include      http://kinopoisk.ru/*
// @include      http://www.kinopoisk.ru/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$("<style type='text/css' charset='utf-8'>"+
  "body { background-image:none !important; background-color: #000 !important; }"+
  "html { background-image:none !important; }"+
  "#top .brand { position:relative !important; display:none !important; height:0px !important; }"+
  "#top .master { top:11px !important; }"+
  "#top .png_block {top:0px !important; }"+
  "#top { height:119px !important; }"+
  "#top .menu { top: 11px !important; }"+
  "#top_form { top: 23px !important; }"+
  "#menu_top_help { top: 28px !important; }"+
  ".png form .line_brand { display:none !important; }"+
  ".ny2011 { top:-9px !important; }"+
  ".logo { top:19px !important; }"+
  ".filmfans { display:none !important; }"+
  ".search { width:272px  !important; }"+
  ".search_line_image {display:none !important; }"+
  ""+
  "</style>").appendTo('head');