// ==UserScript==
// @name         起点一键全文阅读
// @namespace    http://jixun.org/
// @version      1.1
// @description  一键「全文阅读」
// @include      *://*qidian.com/Book/*.aspx*
// @include      *://*qdmm.com/mmweb/*.aspx*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

// 感谢 @caliban 一直在跟进该脚本 ;w;

addEventListener('DOMContentLoaded', function () {
    /*
     *   a => 原始「点击阅读按钮」的 Li 列表元素
     *   b => 复制后的 Li 元素
     *   c => 用于修改 b 属性的元素
     */
    var a = document.querySelector('div[class="opt"] ul li'),
        b = a.cloneNode(true),
        c = b.querySelector ('a');
    
    c.textContent = '全文阅读';
    c.href = 'http://down1.qidian.com/bookall/' + location.pathname.match(/\d+/)[0] + '.htm';
    c.title = c.title.replace('的章节列表', ' 全文阅读');
    c.removeAttribute ('onclick');
    // c.target = '_blank';
    // 如果需要默认在新窗口开启请取消注释上一行。
    a.parentNode.insertBefore(b, a);
}, false);
