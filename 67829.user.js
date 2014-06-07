// ==UserScript==
// @name           renren
// @namespace      www.renren.com
// @include        *renren.com/*
// ==/UserScript==

head = document.getElementsByTagName('head')[0];

addCss('\
body {background : #C0DEED url(http://a3.twimg.com/a/1264550348/images/bg-clouds.png) repeat-x scroll 0 0} \
.blank-holder {display : none} \
#sidebar {display : none} \
.home-sidebar {display : none} \
#comfirm_diag {display : none} \
.blank-bar {display : none} \
')

home = getElementByClassName('home-body', 'opi');
home.className = '';
//logo();

function addCss(css) {

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);

}

function getElementByClassName(className, id) {

  var opi = document.getElementById(id).getElementsByTagName("div")
  for (var i=0; i<opi.length; i++) {
    if (opi[i].className == className) {
      return opi[i];
    }
  }

}

function logo() {

  var logo2 = document.getElementById('logo2').getElementsByTagName('img')[0];
  logo2.src='http://t.douban.com/view/photo/photo/public/p391491104.jpg';

}
