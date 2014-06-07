// ==UserScript==
// @name           CustomGoogleReader Design
// @namespace      GreaderNew
// @description    Fixes some aspects of google reader redesign of november 2011
// @include        http*://www.google.*/reader/*
// ==/UserScript==


GM_addStyle("#viewer-top-controls-container { margin-top:0;top:5px;}");
GM_addStyle("#viewer-header  { margin-top:0;top:5px;height:40px}");
//GM_addStyle(".card {padding:5px; border:1px dashed #cacaca}");
//GM_addStyle("#current-entry {border-color:#cdcdcd;}");
//GM_addStyle("#current-entry .card {background-color: #ebebeb !important;}");

GM_addStyle(".entry-date{margin-right:10px}");
GM_addStyle(".entry .entry-container{padding-bottom:2px}");
GM_addStyle(".entry .entry-icons{width:auto;}");
GM_addStyle(".card .card-content{padding:0 5px}");
GM_addStyle(".entry .entry-title{max-width: 90%;}");
GM_addStyle(".cards .entry {padding-bottom:3px}");
 GM_addStyle("#entries {padding:0;margin:0px 2px}");
 GM_addStyle(".entry-author {display:none}");
 GM_addStyle("#entries.cards .entry {margin:5px !important}");

GM_addStyle(".entry .entry-body, .entry .entry-title, .entry .entry-likers{max-width: none !important;}");

