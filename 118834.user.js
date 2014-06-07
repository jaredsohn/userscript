// ==UserScript==
// @name           GoogleReaderCompact
// @description    Keep the google reader interface more compact, gains vertical space with only one toolbar 
// @namespace      http://lorentz
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// @version        0.7
// ==/UserScript==

var style = [];
 
if (document.getElementById('gbqlw')){ //new version
  var add = document.getElementById('lhn-add-subscription');
  document.getElementById('logo-section').appendChild(add);
  style[style.length] = '.jfk-button {cursor:pointer}'
  style[style.length] = '#lhn-add-subscription{padding:0; margin:0 0 0 55px; display:inline-block; position: static}';
  style[style.length] = '#lhn-add-subscription-section {display:none}'
  style[style.length] = '#chrome-view-links .jfk-button-checked{display:none}'
  style[style.length] = '#chrome-view-links > * > div {margin-right:16px}'
}
else { //old version
  var box = document.getElementById('search');
  box.appendChild( document.getElementById('viewer-top-controls')  )
  var add = document.getElementById('lhn-add-subscription');
  document.getElementById('top-bar').insertBefore(add, box);
  add.innerHTML = '+'


  style[style.length] = '#search {white-space:nowrap;height:31px; overflow-x:auto; overflow-y:hidden}'

  style[style.length] = '#viewer-top-controls {display: inline-block}'
  style[style.length] = '#search > * {vertical-align:top}'
  style[style.length] = '#chrome-view-links .jfk-button-checked{display:none}'
  style[style.length] = '#chrome-view-links > span >div {margin-right: 10px; width:34px}'
  style[style.length] = '#lhn-add-subscription{left:145px; top:14px; width: 10px; height: 10px; padding:0; margin:0; line-height: 10px}'
  style[style.length] = '.jfk-button {min-width:0; cursor:pointer}'
  style[style.length] = '#lhn-add-subscription-section, #viewer-header-container {display:none}'
  style[style.length] = '#logo {margin-left:10px;}'
  style[style.length] = '#search {margin-left:160px;}'
  style[style.length] = '#search-input{width:200px}'
  style[style.length] = '#item-up-down-buttons>div {display:block;height:12px;width:30px;margin:0; line-height: 13px;}'
  style[style.length] = '#item-up-down-buttons{margin-right:10px;}'
}


var head = document.getElementsByTagName('head')[0];
head.innerHTML = head.innerHTML + '<style type="text/css">' + style.join('\n') + '</style>';
