// ==UserScript==
// @name           Better WeiPhone
// @version        0.1
// @namespace      http://jiapad.com
// @description    改善威锋网的界面，删除广告等等
// @author         shawjia
// @include        http://bbs.weiphone.com/*
// ==/UserScript==

function removeNodeByClass(tag, class) {
  var selector = tag + '.' + class;
  var node = document.querySelector(selector);
  if (node) {
    node.parentNode.removeChild(node);
  }
}

function removeNodeById(tag, id) {
  var selector = tag + '#' + id;
  var node = document.querySelector(selector);
  if (node) {
    node.parentNode.removeChild(node);
  }
}

// 删除巨大的 head
removeNodeById('div', 'head');

// 删除导航条
removeNodeById('div', 'navB')

// 删除横幅
removeNodeByClass('div', 'tac.mb5');

// 删除infobox
removeNodeById('div', 'infobox');

// 删除商家广告栏
removeNodeByClass('div', 'ad-box')
