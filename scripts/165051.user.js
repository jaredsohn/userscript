// ==UserScript==
// @name         百晓生小说网文字广告屏蔽
// @namespace    http://jixun.org/
// @version      1.2.2.0
// @description  恩，尝试作，如果误杀请报告给作者。
// @include      *://www.bxs.cc/*/*.html
// @copyright    2012+, Jixun
// @run-at       document-end
// ==/UserScript==

// 翻页兼容
(function () {
 // 检查是否在文章页面，不在就返回
 if (!(/^\/(\d+)\/(\d+)\.html/i.test(location.pathname)))
  return;
 
 // 窗口
 try {
  var win = unsafeWindow;
 } catch (e) {
  var win = window;
 }
 
 // jQuery, 1.3.1 用起来好不爽…
 var $ = win.$;
 console.log ('jQuery version: ', $.fn.jquery);
 
 // 双击自动滚动屏蔽
 win.Scrolling = function () {};
 
 // 文本内容元素
 var $ele = $('div#content');
 
 // 样式调整
 $('body').append('<style>#main{margin-bottom:80px;}'
				  + '#weekhot{display:none !important;}</style>');
 
 // 移除非必需元素
 $('div#content a, #txtright, #msg, #banner, #topnav, #downdesk,'
   + ' #addbook, #addvote, a[onclick^="report"], #footer').remove();
 
 // 文本清理
 $ele.html($ele.html().replace(/<br>/g, '<br>\n').replace(/<!--(.+?)-->/g, '')
		   .replace (/ (.+|)/g, '')
		   .replace(/(百晓生|bxs\.cc|『|』|【|】|\*)/g,'')
		   .replace(/<script(.+?)<\/script>/g, '').replace(/\[\](.+|)/g, '')
		   .replace(/&nbsp;&nbsp;&nbsp;&nbsp;(请记住我们的网址：|搜索“”|请记住：\(bxs\))(.+|)/g, '')
		   .replace(/好看的小说尽在(.+|)/g, '')
		   .replace(/(读书阁)/g, '')
		   .replace(/㊣(\d+|)/g, '')
		   .replace(/\((.+?|)www\.(.+?|)\)/g, '')
		   .replace(/www\.(.+|)/g, '')
		   .replace(/([a-z0-9 ]+|)(无弹窗|最新更新)(.+|)/gi, ''));
 
 // 淡灰色背景配色
 $('<option value="lightgray" style="background: lightgray;">淡灰</option>')
 .insertAfter ($('.select .gray'));
 
})();