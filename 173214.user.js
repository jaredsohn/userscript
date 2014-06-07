// ==UserScript==
// @name        Make AOL READER look like Google Reader
// @namespace   http://reader.aol.com/
// @include     http://reader.aol.com/*
// @version     1.0
// ==/UserScript==


//modificarile mele
GM_addStyle(".article-item-view .article-content { width: 98% !important; padding: 15px 20px 15px 20px !important;}");
GM_addStyle(".article-item-full .article-content { width: 98% !important; padding: 10px !important;}");
GM_addStyle(".article-body.clearfix { width: 98% !important;}");
GM_addStyle(".article-list-expanded .article-header.clearfix { display: none !important; font-size: 12.5px;}"); 
GM_addStyle(".article-item-full .article-header.clearfix { display: none !important; font-size: 12.5px;}"); 
GM_addStyle(".article-list-pane  {left: 320px !important;}");
GM_addStyle(".is-desktop .article-pane-full .article-header  {left: 820px;}");
GM_addStyle(".article-pane-full .article-item-full .article-header  {right: 0px;}");
GM_addStyle(".article-item-full .article-content, .article-item-view .article-content {max-width: 98% !important;}");

GM_addStyle(".feed-count.pull-right { padding-bottom: 1px; font-size:10px; font-weight: 'bold'; }");
GM_addStyle(".cat-nav-list .count { font-size: 12px; color:#226290 !important; font-weight: bold !important; font-family: arial, sans-serif !important;  }");
GM_addStyle(".category-item { font-size: 12px !important; color:red !important;  }");


GM_addStyle(".feed-header {left: 319px !important; right: 0px !important; }");
GM_addStyle(".feed-header h2, .article-header h2 {left: 319px !important; right: 0px !important; line-height: 44px !important; }");
GM_addStyle(".reader-ad-container {display: none !important;}");    //spatiu reclama
GM_addStyle("li#label-home, li#label-starred  {display: none !important;}");

GM_addStyle(".article-item-list {padding-top: 0px; padding-bottom: 0px}");
//GM_addStyle(".article-item-list a{color:black !important;}");
GM_addStyle(".article-item.article-item-list .title   {font-family: arial, sans-serif !important; font-weight: bold !important; color:rgb(0,0,32)}");
GM_addStyle(".article-item.article-item-list .content {font-family: arial, sans-serif !important; font-weight: normal !important;color:grey}");
GM_addStyle(".article-item.article-item-list.article-item-read .title {font-weight: bold !important; color: #cccccc !important;}");
GM_addStyle(".article-item.article-item-list.article-item-read .content {font-weight: normal !important; color: #cccccc !important; }");
GM_addStyle(".article-item-list .timeago {background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 30%, #FFFFFF 100%) repeat-x scroll 0 0 transparent; }");
GM_addStyle(".article-item-list.article-item-read .timeago {background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #FFFFFF 30%, #FFFFFF 100%) repeat-x scroll 0 0 transparent; }");
GM_addStyle(".article-item-list .article-wrap { padding-top:3px !important; padding-bottom:3px !important; font-size: 12px !important; }");

GM_addStyle(".nav-list .cat-label, .nav-list .feed-label { padding-bottom: 0.5px !important; }");
GM_addStyle(".nav-list .feed-label { padding: 0.5px 20px 0.5px 30px; }");
GM_addStyle(".nav-list .feed-label .feed-item { padding-bottom: 1px; padding-top: 1px; }");
GM_addStyle(".nav .nav-list, .nav {width: 319px !important;}");
GM_addStyle("#reader-container {margin-left: 319px !important; margin-right: 0px !important;}");
GM_addStyle(".nav {background: white !important; }");
GM_addStyle(".nav-list a, .nav-list .subscription-item, .nav-list .category-item {color: rgb(0,0,32) !important;  font-family: arial, sans-serif !important; font-weight: bold !important;}");
GM_addStyle(".nav-list a, .nav-list .subscription-item, .nav-list .category-item { font-family: arial, sans-serif;}");
GM_addStyle(".nav-list .cat-label, .nav-list .feed-label { padding: 3px 20px 3px 30px !important;}");
GM_addStyle(".nav-icon { top: 1px;}");
GM_addStyle(".nav-list ul {margin-left: 12px !important;}");

GM_addStyle(".article-item-view .article-title { margin-top: -5.5px !important ; margin-bottom: 5px !important; }");
GM_addStyle("h2.article-title a {color: #226290 !important ; }");
GM_addStyle("h2.article-title  { margin-top:2.5px; font-size: 18px !important; font-family: arial, sans-serif !important; font-weight: bold !important}");


GM_addStyle(".article-item-view .article-content, .article-item-full.article-item-read, .article-body h1, .article-body h2, .article-body h3, .article-body h4, .article-body h5, .article-body h6, .article-body p, .article-body blockquote, .article-body pre, .article-body ul {color: black !important; }");
GM_addStyle(".article-date, .article-tags {float: left; width: auto%; margin-right: 10px;}");
GM_addStyle(".article-tags {display:none;}");
GM_addStyle(".article-body.clearfix { clear: left; width: 100%;}");
GM_addStyle(".article-date i, .article-tags i, .article-author i { top: 0px !important; }");
GM_addStyle(".article-author span {margin-top: 0px !important; }");

GM_addStyle(".list-menu-item-feed .subscription-item { font-weight: normal; font-size: 12px;}");
GM_addStyle(".list-menu-item-feed.has-count .subscription-item { font-weight: bold;}");


GM_addStyle("#feed-details .pull-right  { float: right !important;}");
GM_addStyle(".dropdown-menu.layout-selection  { margin-left: 60px;}");
GM_addStyle(".dropdown-menu.layout-selection:before  { left: 21px;}");
GM_addStyle(".dropdown-menu.layout-selection:after  { left: 22px;}");


//GM_addStyle(".article-item.article-item-list.article-item-rendered.article-item-read {color: #999999 !important; background: #EEEEEE !important; font-weight: normal !important;}");
//GM_addStyle(".article-item-pane.article-item-read, .article-content .content {color: black;}");
//GM_addStyle(".article-item-pane .article-content .title {color: #1155CC !important; font-family: arial, sans-serif !important;}");
// GM_addStyle(".article-item-view .article-content {width: auto;}");


