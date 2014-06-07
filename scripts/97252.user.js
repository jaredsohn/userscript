// ==UserScript==
// @name           Xuite Blog Background un-fixed
// @namespace      http://blog.gslin.org/plugins/xuite-blog-background-un-fixed
// @description    Unset blog.xuite.net background fixed to speed up
// @include        http://blog.xuite.net/*
// @version        2011.0218.1
// ==/UserScript==

document.getElementsByTagName('body')[0].style.backgroundAttachment = 'scroll';
