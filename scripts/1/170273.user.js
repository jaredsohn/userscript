// ==UserScript==
// @name           ACFUN Full Title
// @description    鼠标放到ACFUN列表页的标题上的TOOLTIP改成显示完整标题（原为UP主和发布时间）
// @match          http://*.acfun.tv/*
// @author         233
// @version        1.1.1
// ==/UserScript==

// 2013年6月15日更新，对应ACFUN Ver 0.0.5.6 @ 5.10.2013的新列表页

(function(){
var myscript = document.createElement("script");
myscript.textContent = "$(document).on('mouseenter','a.title', function(){this.title=(this.innerText ? this.innerText : this.textContent);});//Created by 'ACFUN Full Title' UserScript";
document.body.appendChild(myscript);
})();