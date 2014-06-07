// ==UserScript==
// @name		百度网盘直链下载
// @description		点击按钮直接下载百度网盘文件
// @include		http://pan.baidu.com/s/*
// @include		http://pan.baidu.com/share/*
// @icon		http://pan.baidu.com/res/static/images/favicon.ico
// @require		http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @updateURL		https://userscripts.org/scripts/source/179244.user.js
// @namespace		http://www.crexyer.com/
// @copyright		2013+, Crexyer
// @version		20131005
// ==/UserScript==

$("#downFileButtom").after("<a title=\"右键复制链接\" hidefocus=\"true\" class=\"new-dbtn\" onclick=\"return //false;\" href=\"" + eval("(" + (disk.util.ViewShareUtils.viewShareData) + ")")["dlink"] + "\"><em class=\"icon-download\"></em><b>直链下载</b></a>");