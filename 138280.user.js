// ==UserScript==
// @name       MiOS Docs
// @namespace  http://docs5.mios.com/
// @version    0.1
// @description  Add thumbnails
// @include    http://docs5.mios.com/*
// @copyright  2012+, Daniel
// ==/UserScript==
function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
	
	AddStyle("img.thumb {width:30%; height:30%;}");
	AddStyle("img.thumb:hover {width:60%; height:60%; display:inline;}");