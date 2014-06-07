// ==UserScript==
// @name           kaskusBetaFixSakitMata
// @namespace      adamantoise
// @version 	   1.1.1
// @description    fix kaskus beta color which causes sakit mata
// @include        http://livebeta.kaskus.us/*
// What it does: 
//  -Change post text color from grey to black
//  -Change post background color from white to vbulletin's blue
//  -Change post header background to dark blue
//
// Changelog:
// v 1.1.1
// Forum padding right decreased
// Font size for post link, meta and stat decreased
//
// v 1.1
// Font type: verdana, dkk
// Forum thread link color: black
// Forum thread link visited color: grey
// Rate info: black, no shadow
//
// v 1.0.1
//  -Change background color darker(same as old kaskus)
// ==/UserScript==
GM_addStyle("body { color: black; background-color:#ff9999; font-family:verdana,geneva,lucida,arial,helvetica,sans-serif !important;}  #breadcrumb-wrap{color:black;} .post-entry{background-color: #F5F5FF;} .post-header{background-color:#457BB7 !important; background-image:none !important;} .link_thread_title {color:black !important; font-size:13px}  table#forum-home-table thead th {font-size:10px !important;padding-right:2px !important; } table#forum-home-table tbody a:visited {color:#6B6B6B !important} .rate span {color:black !important; text-shadow:none !important;}  .statistics,.last-post{font-size:11px !important;} table#forum-home-table tbody td {padding-right:5px !important} .meta{font-size:12px !important}");
