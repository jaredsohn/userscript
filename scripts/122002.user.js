// ==UserScript==
// @name           Fanfou Remove Logo's Beta
// @namespace      http://userscripts.org/scripts/show/122002
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// @include        http://userscripts.org/scripts/source/122002.meta.js
// @description    Remove the logo's beta in fanfou.
// @updateURL      http://userscripts.org/scripts/source/122002.meta.js
// @author         @imAdam
// @version        2012-01-02
// ==/UserScript==

// 去掉logo的測試版
GM_addStyle(".global-header-content { background: url(http://static2.fanfou.com/img/fanfou.png) no-repeat 0 0 !important; }");
