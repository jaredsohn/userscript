// ==UserScript==
// @name        Aol Reader Better Layout
// @namespace   http://reader.aol.com/
// @include     http://reader.aol.com/*
// @version     1.2
// ==/UserScript==


GM_addStyle(".nav .nav-list, .nav {width: 319px !important;}");
GM_addStyle("#reader-container {margin-left: 319px !important; margin-right: 0px !important;}");
GM_addStyle(".feed-header {left: 319px !important; right: 0px !important;}");
GM_addStyle(".reader-ad-container {display: none !important;}");
GM_addStyle("li#label-home, li#label-starred  {display: none !important;}");
GM_addStyle(".article-list-pane  {left: 320px !important;}");
GM_addStyle(".is-desktop .article-pane-full .article-header  {left: 820px;}");
GM_addStyle(".article-pane-full .article-item-full .article-header  {right: 0px;}");



GM_addStyle(".article-item-pane.article-item-read, body, .article-content .content {color: black;}");
GM_addStyle(".article-item-pane .article-content .title {color: #1155CC !important; font-family: arial, sans-serif;}");



GM_addStyle(".article-item.article-item-list.article-item-rendered.article-item-read {background: #EEEEEE !important; font-weight: normal !important;}");
GM_addStyle(".article-item.article-item-list.article-item-rendered.article-item p.title {font-size: 13px;color: black !important; font-weight: bold !important;}");
GM_addStyle(".article-item.article-item-list.article-item-rendered.article-item-read p.title {color: black !important; font-weight: normal !important;}");

GM_addStyle(".nav-list a, .nav-list .subscription-item, .nav-list .category-item {color: black !important; }");
GM_addStyle(".nav {background: white !important; }");
GM_addStyle(".article-item-list .timeago {background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 30%, #FFFFFF 100%) repeat-x scroll 0 0 transparent; }");
GM_addStyle(".article-item-list.article-item-read .timeago {background: linear-gradient(to right, rgba(238, 238, 238, 0) 0%, #EEEEEE 30%, #EEEEEE 100%) repeat-x scroll 0 0 transparent; }");


GM_addStyle("h2.article-title a {color: #1155CC !important; }");
// GM_addStyle(".article-item-read h2.article-title a {color: #444444 !important; }");


GM_addStyle(".article-item-view .article-content, .article-item-full.article-item-read, .article-body h1, .article-body h2, .article-body h3, .article-body h4, .article-body h5, .article-body h6, .article-body p, .article-body blockquote, .article-body pre, .article-body ul {color: black !important; }");

// GM_addStyle(".article-item-view .article-content {width: auto;}");
GM_addStyle(".article-date, .article-tags {float: left; width: auto%; margin-right: 20px;}");
GM_addStyle(".article-body.clearfix { clear: left; width: 100%;}");

GM_addStyle(".list-menu-item-feed .subscription-item { font-weight: normal; font-size: 13px;}");
GM_addStyle(".list-menu-item-feed.has-count .subscription-item { font-weight: bold;}");

GM_addStyle(".nav-list a, .nav-list .subscription-item, .nav-list .category-item { font-family: arial, sans-serif;}");
GM_addStyle(".nav-list .cat-label, .nav-list .feed-label { padding: 3px 20px 3px 30px;}");
GM_addStyle(".nav-icon { top: 1px;}");

GM_addStyle("#feed-details .pull-right  { float: left !important;}");
GM_addStyle(".dropdown-menu.layout-selection  { margin-left: 60px;}");
GM_addStyle(".dropdown-menu.layout-selection:before  { left: 21px;}");
GM_addStyle(".dropdown-menu.layout-selection:after  { left: 22px;}");
GM_addStyle("h2.article-title  { font-size: 1.5em;}");







