// ==UserScript==
// @name        批量离线下载迅雷快传资源 
// @namespace   roxser.co.cc
// @description 批量离线下载迅雷快传资源 
// @include     http://kuai.xunlei.com/d/*
// @version     2012.10.16
// @updateURL   https://userscripts.org/scripts/source/151350.meta.js
// @downloadURL https://userscripts.org/scripts/source/151350.user.js
// ==/UserScript==
var urls = ''
$('a.file_name').each(function(){
urls += $(this).attr('href') + '\n';
});
$('<textarea>' + urls + '</textarea>').appendTo('body');