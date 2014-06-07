// ==UserScript==
// @name        Xunlei KuaiChuan Display Full Filename[modified]
// @namespace   qixinglu.com
// @description 迅雷快传上的下载链接显完整文件名
// @include     http://kuai.xunlei.com/d/*
// @include     http://kuai.xunlei.com/s/*
// @version     v20130413
// @updateURL   https://userscripts.org/scripts/source/149258.meta.js
// @downloadURL https://userscripts.org/scripts/source/149258.user.js
// ==/UserScript==

var addStyle = function(cssText) {
    var head = document.querySelector('head');
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = cssText;
    head.appendChild(style);
};

var fullName = function() {
    // 从 title 标签复制完整文件名
    var nodes = document.querySelectorAll('.c_2 a.file_name');
    var i, node;
    for (i = 0; i < nodes.length; i += 1) {
        node = nodes[i];
        node.textContent = node.title;
    }
};

var swapSizePriviewInfo = function() {
    // 交换「文件大小」和「云预览」信息位置
    var nodes = document.querySelectorAll('.c4');
    var i, node;
    for (i = 0; i < nodes.length; i += 1) {
        node = nodes[i];
        if (node.classList.length === 1) {
            node.parentNode.appendChild(node);
        }
    }
};

var filesCSS =
    '.adv_area, .file_right, .advl, .hot_list {' +
    '    display: none !important;' +
    '}' +
    '.file_left, .file_src, .file_src li {' +
    '    width: 100% !important;' +
    '    height: 100% !important;' +
    '}' +
    '.c_2, .c_2 a{' +
    '    width: auto !important;' +
    '}' +
    '.c4.status {' +
    '    width: 100px !important;' +
    '}' +
    '.c4 {' +
    '    float: right !important;' +
    '}';

var folderCSS =
    '.file_left, .downLoad_area {' +
    '    width: 100% !important;' +
    '}' +
    '.file_w, .file_list {' +
    '    height: 100% !important;' +
    '}';

if (location.href.indexOf('http://kuai.xunlei.com/s/') === 0) {
    addStyle(folderCSS);
} else {
    addStyle(filesCSS);
    fullName();
    swapSizePriviewInfo();
}