// ==UserScript==
// @name           Darkfox Browsing
// @namespace      Techercizer/kisaki
// @description    Modified from "White on Black Page" by gampolt, this script provides a more comprehensive modification with modified colors for additional suave. 
// @include        http://*
// ==/UserScript==

function addCss(cssCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

addCss('a{color: #4CBB17 !important} h1{color: #4CBB17 !important} h2{color: #4CBB17 !important} h3{color: #ADFF2F !important} h4{color: #7F00FF !important} h5{color: #7F00FF !important} div{color: #ffffff !important} span{color: #ffffff !important} pre{color: #ffffff !important} p{color: #ffffff !important} body{background: #080808 !important} *{color:white; background-color:#000000 !important}')