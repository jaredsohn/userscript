// ==UserScript==
// @id             178Redirect@hldingyetian
// @name           178重定向
// @version        1.0
// @namespace     hldingyetian
// @author         hldingyetian
// @description    重定向178视频链接，远离点击图片！！！！
// @include        http://lol.178.com/*
// @run-at         document-start
// ==/UserScript==



document.location.href = document.location.href.replace('lol.178.com', '178.v.playradio.cn');