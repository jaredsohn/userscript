// ==UserScript==
// @name      Kekeke Style Custom
// @version    0.3
// @description  Custom Style
// @match      http://kekeke.cc/*
// @copyright  2013, Allor
// ==/UserScript==


var styleEl = document.createElement('style');
styleEl.id = 'myStyle';
styleEl.type = 'text/css';
document.body.appendChild(styleEl);

//链接文本修饰
styleEl.innerHTML += '.message>.gwt-HTML>.external {display: inline-block;position: relative;overflow: hidden;width: 30px;height: 18px;text-decoration: none;top: 3px;}';
styleEl.innerHTML += '\n';
styleEl.innerHTML += '.message>.gwt-HTML>.external:before {background-color: #7AB900;color: #fff;content: "Link.";padding: 0px 8px;border-radius:9px;font-weight: bold;}';
styleEl.innerHTML += '\n';

//图片折叠隐藏
styleEl.innerHTML += '.media {border-spacing: 0;}';
styleEl.innerHTML += '\n';
styleEl.innerHTML += '.media>tbody>tr:last-child {display:none;}';
styleEl.innerHTML += '\n';
styleEl.innerHTML += '.media>tbody:hover tr:last-child {display:table-row;}';
styleEl.innerHTML += '\n';

//顶部bot栏滚动条和高度修改，每条信息占高44px
styleEl.innerHTML += 'div[style^="overflow"] {overflow:hidden !important;height:132px !important;}';
styleEl.innerHTML += '\n';