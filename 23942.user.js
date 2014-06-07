// ==UserScript==
// @name           public_function
// @namespace      chyni
// @description    公共函数库
// @include        *
// ==/UserScript==
//--------------------------------------------------------------------------//
// 公用的函数
//--------------------------------------------------------------------------//
// 判断是否是IE
function isIE() {
    return document.all && window.external;
}

// 去除字符串两边的空格
String.prototype.trim = function() {
    var re = /(^\s*)|(\s*)$/g;
    return this.replace(re, "");
}

// 删除数组中某个元素
Array.prototype.remove = function(i) {
    var o = this[i];
    for (var j = i; j < this.length - 1; j ++) {
        this[j] = this[j + 1];
    }
    -- this.length;
    return o;
}

// 判断一个数组中是否存在相同的元素
Array.prototype.search = function(o) {
    for (var i = 0; i < this.length; i ++) {
        if (this[i] == o) {
            return i;
        }
    }

    return -1;
}

// html编码
function htmlEncode(s) {
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\'/g, "&#34;");

    return s;
}

// js编码
function jsEncode(s) {
    s = s.replace(/\\/g, "\\\\");
    s = s.replace(/\n/g, "\\n");
    s = s.replace(/\"/g, "\\\"");
    s = s.replace(/\'/g, "\\\'");
    return s;
}
