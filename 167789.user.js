// ==UserScript==
// @name        Xunlei KuaiChuan Checked Links Text
// @namespace   qixinglu.com
// @description 在新标签页显示迅雷快传中已勾选链接文本
// @grant       none
// @include     http://kuai.xunlei.com/d/*
// ==/UserScript==

var addStyle = function(cssText) {
    var head = document.querySelector('head');
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = cssText;
    head.appendChild(style);
};

var replaceButton = function() {
    // 复制按钮，避免处理点击事件而弹出下载迅雷提示
    var orignalButton = document.querySelector('.general_btn');
    var newButton = orignalButton.cloneNode();

    newButton.addEventListener('click', function() {
        var rows = document.querySelectorAll('.file_src li');
        var i, row;
        var links = [];
        for (i = 0; i < rows.length; i += 1) {
            row = rows[i];
            if (row.querySelector('input.file_chk').checked) {
                links.push(row.querySelector('a.file_name').href);
            }
        }
        var text = 'data:text/plain,' + encodeURIComponent(links.join('\n'));
        window.open(text);
    });

    orignalButton.parentNode.replaceChild(newButton, orignalButton);
};

// 需要用到这个脚本都不需要显示「高速下载」按钮，隐藏掉。
var fileCSS = 'a.high_btn, .adb_txt { display: none; }';

// 干掉「离线下载」按钮的菜单
document.querySelector('.oper_list').remove();

addStyle(fileCSS);
replaceButton();
