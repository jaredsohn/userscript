// ==UserScript==
// @name        Aol Reader Optimized
// @namespace   http://reader.aol.com/
// @include     http://reader.aol.com/*
// @include     https://reader.aol.com/*
// @downloadURL	https://userscripts.org/scripts/source/182757.user.js
// @updateURL	https://userscripts.org/scripts/source/182757.meta.js
// @version     1.2
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".nav .nav-list, .nav {width: 250px !important;}");
GM_addStyle(".nav .nav-list {top: 32px !important;}");
GM_addStyle(".nav-controls {padding-top: 2px !important; padding-bottom: 2px !important;}");
GM_addStyle("#reader-container {margin-left: 250px !important; margin-right: 0px !important; margin-top: 42px !important;}");
GM_addStyle(".header {height: 40px !important; }");
GM_addStyle(".profile, .app-logo, .searcher {margin-top: 2px !important; }");
GM_addStyle(".feed-content .btn-group-wrap {margin-top: 2px !important; }");
GM_addStyle(".feed-header h2, .article-header h2{line-height: 28px !important; }");
GM_addStyle(".searcher {margin-left-value: 240px !important; }");
GM_addStyle(".feed-header {left: 250px !important; right: 0px !important; height: 31px !important;}");
GM_addStyle(".reader-ad-container {display: none !important;}");
GM_addStyle(".app-logo, .beta-icon {background: none !important;}");
GM_addStyle("li#label-home, li#label-starred, li#label-discover {display: none !important;}");
GM_addStyle(".article-list {left: 251px !important; margin-top: 31px !important;}");
GM_addStyle(".article-content {width: 95% !important;}");
GM_addStyle(".article-list-pane  {left: 251px !important;}");
GM_addStyle(".article-wrap  {padding: 0px !important;}");
GM_addStyle(".is-desktop .article-pane-full .article-header  {left: 820px;}");
GM_addStyle(".article-pane-full .article-item-full .article-header  {right: 0px;}");
GM_addStyle(".article-item-pane .article-content .title {color: #1155CC !important; font-family: Segoe UI, Segoe UI !important; }");
GM_addStyle(".article-item-list .title {font-weight: 500 !important; color: black !important;}");
GM_addStyle(".nav-list li.has-count > div {font-weight: 500 !important; color: black !important;}");
GM_addStyle("h1, h2, h3, h4, h5, h6 { font-family: 'Segoe UI','Segoe UI',Segoe UI,Segoe UI,Segoe UI !important; }");
GM_addStyle("p { font-family: Segoe UI,Segoe UI,Segoe UI !important; }");
GM_addStyle(".nav, .feed-header {top: 40px !important; }");
GM_addStyle(".article-item-list .timeago {background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 30%, #FFFFFF 100%) repeat-x scroll 0 0 transparent; line-height: 22px !important; }");
GM_addStyle(".article-item-list .article-list-body {line-height: 22px; !important; }");
GM_addStyle(".article-item-list .article-item-read .timeago {background: linear-gradient(to right, rgba(238, 238, 238, 0) 0%, #EEEEEE 30%, #EEEEEE 100%) repeat-x scroll 0 0 transparent; }");
GM_addStyle(".article-date, .article-tags {float: left; width: auto%; margin-right: 20px;}");
GM_addStyle(".article-body.clearfix { clear: left; width: 100%;}");
GM_addStyle(".nav-list a, .nav-list .subscription-item, .nav-list .category-item { font-family: Segoe UI, Segoe UI !important;}");
GM_addStyle("body {font-family: Segoe UI, Segoe UI, Segoe UI !important;}");
GM_addStyle("nav {font-family: Segoe UI, Segoe UI, Segoe UI !important;}");
GM_addStyle(".article-item-list .origin, .article-item-list .title { font-family: 'Segoe UI','Segoe UI',Segoe UI,Segoe UI,Segoe UI !important;}");
GM_addStyle(".article-item-list .origin { width: 60px !important;}");
GM_addStyle(".nav-list .cat-label, .nav-list .feed-label { padding: 3px 20px 3px 30px;}");
GM_addStyle(".nav-icon { top: 1px;}");
GM_addStyle("#feed-details .pull-right  { float: left !important;}");
GM_addStyle(".dropdown-menu.layout-selection  { margin-left: 60px;}");
GM_addStyle(".dropdown-menu.layout-selection:before  { left: 21px;}");
GM_addStyle(".dropdown-menu.layout-selection:after  { left: 22px;}");
GM_addStyle(".article-item-read .article-content .article-title a { color: gray !important; }");
GM_addStyle(".article-body p, .article-body div { display: table; }");
GM_addStyle(".article-body * img { margin-bottom: 0 !important; }");
GM_addStyle(".article-item-list.article-item-active .article-wrap{ margin: 0px 10px !important; }");
