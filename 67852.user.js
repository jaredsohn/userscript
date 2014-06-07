// ==UserScript==
// @name           qzone
// @namespace      qzone.qq.com/
// @include        *.qzone.qq.com/*
// ==/UserScript==


head = document.getElementsByTagName('head')[0];

addCss('\
body {background : #C0DEED url(http://a3.twimg.com/a/1264550348/images/bg-clouds.png) repeat-x scroll 0 0} \
#OFPContainer {background : #C0DEED url(http://a3.twimg.com/a/1264550348/images/bg-clouds.png) repeat-x scroll 0 0} \
')

hide();

function addCss(css) {

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);

}

function hide() {

  //var titleBG = document.getElementById('titleBG')
  //titleBG.className = '';
  
  var _toolbar_placeholder = document.getElementById('_toolbar_placeholder')
  _toolbar_placeholder.style.display = 'none';
  
  var outerBox = document.getElementById('outerBox')
  outerBox.style.marginTop = '-165px';

}