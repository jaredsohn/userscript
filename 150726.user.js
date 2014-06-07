// ==UserScript==
// @id             HideWeiboRecommend
// @name           HideWeiboRecommend
// @version        1.1
// @namespace      cye3s@mozilla
// @author         Cye3s
// @description    
// @include        http://weibo.com/*
// ==/UserScript==
GM_addStyle("div[class='W_layer'][stk-mask-key]{display:none; !important} div[style$='z-index: 10001;'][node-type='outer']{display:none; !important}");