// ==UserScript==
// @name         Tieba no Url Check
// @namespace    http://jixun.org/
// @version      0.2
// @description  Disable Tencent url Checker.
// @include      *://tieba.baidu.com/*
// @include      *://tieba.com/*
// @include      *://*.tieba.com/*
// @copyright    2012+, Jixun
// ==/UserScript==

unsafeWindow.$("#j_p_postlist").off('mouseenter').off('mouseleave');