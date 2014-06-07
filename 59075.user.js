// ==UserScript==
// @name           ynet-black-theme
// @namespace      http://shmulik.zekar.co.cc/ynet-black-theme
// @include        http://*.ynet.co.il/*
// @include        http://*.mynet.co.il/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    black theme to Ynet.co.il, also fix scrolling bug and remove some ads
// ==/UserScript==

if (window.top==window.self)
{
  var style="";
  //scrolling bug fixer
  style += "html{overflow:auto !important;}";
  style += "#mainCont{padding-top:2em;overflow:auto !important;height:auto !important;}";
  style += "#mainSpacer{height:auto !important;}"
  //black theme
  style += "body{background:#000 !important}";
  style += "#mainCont{background:#fff;margin:auto !important;width:830px !important;-moz-box-shadow: 0pt 0pt 50px white;-moz-border-radius:20px}";
  //width of Mynet homepage (temp)
  if (location.href.substr(0,28) =="http://www.mynet.co.il/home/")
    style += "#mainCont{width:1000px !important;";
  //hide some ads
  style +="div[id^=ads]{display:none;}"
  GM_addStyle(style);
}