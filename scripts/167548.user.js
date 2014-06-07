// ==UserScript==
// @id             www.coolapk.com-96914aa3-32d0-4076-96af-6767d4d4beca@CzBiX
// @name           CoolAPK Download
// @version        1.0
// @namespace      CzBiX
// @author         CzBiX
// @description    无需跳转,直接下载文件,
// @include        http://*.coolapk.com/apk/*
// @include        http://*.coolapk.com/game/*
// @run-at         document-end
// ==/UserScript==

var window = unsafeWindow;
var $ = document.querySelector;
var apkDownloadUrl = window.apkDownloadUrl;

var $pDown = $('.pDown'),
    $xDown = $('.xDown');
    
if ($pDown) $pDown.href = apkDownloadUrl;
if ($xDown) $xDown.href = apkDownloadUrl+'&extra=1';
