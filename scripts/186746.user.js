// ==UserScript==
// @name       北邮人评教脚本
// @namespace  http://wizmann.tk
// @version    0.1
// @description 全五星好评
// @match      http://byjw.bupt.edu.cn:8080/*
// @copyright  Wizmann
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(function() {
    $('input[value$="_0.99"]').attr('checked', true);
});