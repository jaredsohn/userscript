// ==UserScript==
// @name cracked.com sidebar
// @include http://cracked.com/*
// @include http://*.cracked.com/*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle (".mainFrame .mainFrameModule .rightColumn{width:18px;margin-left:18px;border:0px !important;background-color:white;overflow:hidden;");
AddStyle (".mainFrame .mainFrameModule .rightColumn:hover{width:300px;background-color:white;overflow:hidden;");
AddStyle (".module.GenericRRModule{border:0px !important;");
AddStyle (".widget-publication-list{position: absolute !important;");
AddStyle ("#persistent-share{display:none !important;}");
AddStyle ("#safePlace{margin-right: 30px;width:945px;");
AddStyle (".mainFrameModule article.module section p {font-size: 20px;");
AddStyle (".mainFrameModule article.module section p font {font-size: 15px;");
AddStyle ("*{color:white !important;background-color: rgb(31, 31, 31) !important;border-left: 0px !important;border-right: 0px !important;}");
AddStyle ("* a{color:rgb(103, 126, 250) !important}");
AddStyle (".gradientCover{height:0px !important;}");
AddStyle ("#homePersistent{position:fixed !important;right: 300px;}");

