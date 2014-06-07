// ==UserScript==
// @name         Yun Pan WAP Redirect
// @description  重定向百度云盘的 WAP 页面到普通页面
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2014 wenLiangcan
// @updateURL    http://userscripts.org/scripts/source/452505.user.js
// @downloadURL  http://userscripts.org/scripts/source/452505.user.js
// @include      http://*
// @include      https://*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    if (/^http:\/\/pan\.baidu\.com\/wap\/link\?.*?$/.test(document.URL)) {
        window.location.href = document.URL.replace('wap', 'share');
    }
    else if (/^http:\/\/pan\.baidu\.com\/wap\/share\/.*?$/.test(document.URL)) {
        window.location.href = document.URL.replace('wap/', '');
    }
})();