// ==UserScript==
// @name         贴吧神来一笔转文本
// @namespace    http://jixun.org/
// @version      1.0.0.4
// @description  可能会把表情误转? 如果发现还请报告。
// @include      *://tieba.com/*
// @include      *://tieba.baidu.com/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

addEventListener ('DOMContentLoaded', function () {
  var sl1b = document.querySelectorAll ('img[class^="BDE_Smiley"]'),
      sl1bPrefix = '[\u795E\u6765 1b] ',
      sl1bList = [
        '\u76F4\u5230\u6211\u7684\u819D\u76D6\u4E2D\u4E86\u4E00\u7BAD',
        '\u6211\u64E6!',
        '\u4F60\u61C2\u7684',
        '\u8FD9\u771F\u662F\u6781\u597D\u7684',
        '\u7ED9\u529B\uFF01',
        '\u4F60\u59B9',
        '\u611F\u89C9\u4E0D\u4F1A\u518D\u7231\u4E86',
        '\u697C\u4E0B\u600E\u4E48\u770B\uFF1F',
        '\u5475\u5475'
      ];
  
  for (var i=0; i<sl1b.length; i++) {
    var self = sl1b[i],
        str  = self.getAttribute ('text'),
        eText;
    
    // console.log (self.src); // 调试用
    if (!/(images\/qw_cat|imgsrc\.baidu)/i.test(self.src)) // 防止过滤表情…
      continue;
    
    if (!str) {
      var imgId = (self.src.match(/cat_(\d)+/)||[,''])[1];
      if (!imgId){
        continue;
      } else {
        try {
          str = sl1bList [parseInt(imgId) - 1];
        } catch (e) {
          str = '\u672A\u77E5\u7684\u56FE\u7247ID: ' + imgId;
        }
      }
    }
    self.parentNode.appendChild (document.createTextNode (sl1bPrefix + str), self);
    self.parentNode.removeChild (self);
  }
}, false);