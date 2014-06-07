// ==UserScript==
// @name          web xunfeng Helper
// @namespace     Watsilla
// @description   To register web xunfen as a possible handler for the following protocols:  qqdl, magnet & ed2k.
// @copyright     2011+, Qū Chāo (http://quchao.com) <chappell.wat#gmail.com>
// @license       GPL v3; http://www.gnu.org/copyleft/gpl.htm 
// @include       http://lixian.qq.com/*
// @compatibility Firefox 14.0.*
// @homepage      http://www.quchao.com/entry/web-thunder-helper/
// @version       1.1.0
// ==/UserScript==

(function(a){"registerProtocolHandler"in a?["qqdl","magnet","ed2k"].forEach(function(b){a.registerProtocolHandler(b,"http://lixian.qq.com/main.html?url=%s","\u0051\u0051\u65cb\u98ce\u79bb\u7ebf\u4e0b\u8f7d")}):alert("\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u8be5\u7279\u6027")})(navigator);