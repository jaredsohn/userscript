// ==UserScript==
// @name           Edit Appearance new kaskus
// @namespace      jason
// @version 	   1.3
// @description    to reduce the contrast Kaskus Beta
// @include        http://kaskus.co.id/*
// What it does: 
//  -Change post text color from grey to black
//  -Change post background color from white to vbulletin's blue
//  -Change post header background to dark blue
//
// Changelog:
// V 5.5
// text selection color fix
//
// v 1.2
// only post text using verdana
// visited link color removed
// 
// v 1.1.2
// minor adjustments
//
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
GM_addStyle("body { color: black; background-image:url('http://www.gamersbin.com/attachments/f137/11972d1312681110-jungle-night-crysis-wallpaper-jungle-night-wallpaper-jungle-night.jpg'); }  a:visited {color:none !important} #breadcrumb-wrap{color:black;} #breadcrumb-wrap a:visited{color:rgb(213, 3, 3);} .post-entry{background-color: #D0D0D1;} .post-header{background-color:#E20005!important; background-image:none !important;} .link_thread_title {color:black !important; } .rate span {color:black !important; text-shadow:none !important;}  .entry-content{font-family:verdana,geneva,lucida,arial,helvetica,sans-serif !important; font-size:100% !important;}  .post-title a, .post-content a{color:black !important} .reputation-table a:visited{color:rgb(213, 3, 3) !important;} ::selection{background:#3396fe; color:white}::-moz-selection{background:#3396fe; color:white}");

